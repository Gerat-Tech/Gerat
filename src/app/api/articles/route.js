import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser, isAuthorized, ROLES } from "@/lib/auth";

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

    const articles = await prisma.article.findMany({
      where,
      include: {
        author: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, articles });
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
        ROLES.EDITOR,
        ROLES.OPERATIONS_LEAD,
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

    return NextResponse.json({ success: true, article }, { status: 201 });
  } catch (error) {
    console.error("Create article error:", error);
    return NextResponse.json({ error: "Failed to create article." }, { status: 500 });
  }
}
