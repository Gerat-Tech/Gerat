import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getCurrentUser, isAuthorized, ROLES } from "@/lib/auth";

import { insightsArticles } from "@/content/index.js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const where = {};
    if (status && status !== "ALL") {
      where.status = status;
    }
    if (category && category !== "ALL ARTICLES") {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { subtitle: { contains: search } },
        { excerpt: { contains: search } },
      ];
    }

    let articles = null;
    let dbAvailable = false;
    try {
      const totalCount = await prisma.article.count();
      if (totalCount > 0) {
        dbAvailable = true;
        articles = await prisma.article.findMany({
          where,
          include: {
            author: {
              select: { id: true, name: true, email: true, role: true },
            },
          },
          orderBy: { createdAt: "desc" },
        });
      }
    } catch (dbErr) {
      console.warn("Prisma article findMany failed, falling back to static content:", dbErr.message);
    }

    if (!dbAvailable) {
      articles = insightsArticles.map((a) => ({
        id: a.slug,
        slug: a.slug,
        title: a.title,
        subtitle: a.subtitle || null,
        category: a.category,
        content: `# ${a.title}\n\n${a.excerpt}\n\n### Abstract & Findings\n\nThis research paper documents institutional and enterprise implementation observations by Gerat Software Solution.`,
        excerpt: a.excerpt,
        readingTime: a.readTime,
        coverImageUrl: a.image,
        tags: JSON.stringify(a.tags || []),
        status: "PUBLISHED",
        featured: Boolean(a.featured),
        authorId: "usr_super_admin_gerat",
        author: {
          id: "usr_super_admin_gerat",
          name: "Dawit (Principal Architect)",
          email: "admin@gerat.com",
          role: "SUPER_ADMIN",
        },
        publishedAt: a.date ? new Date(a.date).toISOString() : new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      if (category && category !== "ALL ARTICLES") {
        articles = articles.filter((a) => a.category === category);
      }
      if (search) {
        const lower = search.toLowerCase();
        articles = articles.filter(
          (a) =>
            a.title.toLowerCase().includes(lower) ||
            (a.subtitle && a.subtitle.toLowerCase().includes(lower)) ||
            (a.excerpt && a.excerpt.toLowerCase().includes(lower))
        );
      }
    }

    return NextResponse.json({ success: true, articles: articles || [] });
  } catch (error) {
    console.error("Fetch articles error:", error);
    return NextResponse.json({ error: "Failed to fetch articles." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    if (
      !isAuthorized(user.role, [
        ROLES.SUPER_ADMIN,
        ROLES.OPERATIONS_LEAD,
        ROLES.EDITOR,
      ])
    ) {
      return NextResponse.json(
        { error: "Insufficient permissions to publish articles." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      title,
      subtitle,
      slug: customSlug,
      category = "SYSTEM ARCHITECTURE",
      content = "",
      excerpt = "",
      readingTime: customReadingTime,
      coverImageUrl,
      tags,
      status = "DRAFT",
      featured = false,
      authorId,
    } = body;

    if (!title?.trim()) {
      return NextResponse.json({ error: "Article title is required." }, { status: 400 });
    }

    // Auto-generate slug from title if not explicitly supplied
    let slug = customSlug?.trim()
      ? customSlug
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      : title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

    // Ensure slug uniqueness
    const existing = await prisma.article.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    // Calculate reading time
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    const readingTime =
      customReadingTime || `${Math.max(1, Math.ceil(wordCount / 200))} MIN READ`;

    const article = await prisma.article.create({
      data: {
        title: title.trim(),
        subtitle: subtitle?.trim() || null,
        slug,
        category,
        content,
        excerpt: excerpt?.trim() || (content ? content.slice(0, 180) + "..." : null),
        readingTime,
        coverImageUrl: coverImageUrl || null,
        tags: Array.isArray(tags) ? JSON.stringify(tags) : tags || null,
        status,
        featured: Boolean(featured),
        authorId: authorId || user.id,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
      },
      include: {
        author: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

    // Record audit log
    try {
      await prisma.auditLog.create({
        data: {
          actorId: user.id,
          action: "CREATE_ARTICLE",
          entityType: "ARTICLE",
          entityId: article.id,
          diff: JSON.stringify({ title: article.title, slug: article.slug, status: article.status }),
        },
      });
    } catch {}

    try {
      revalidatePath("/articles");
      revalidatePath("/");
      revalidatePath("/dashboard/articles");
    } catch {}

    return NextResponse.json({ success: true, article }, { status: 201 });
  } catch (error) {
    console.error("Create article error:", error);
    return NextResponse.json({ error: "Failed to create article." }, { status: 500 });
  }
}
