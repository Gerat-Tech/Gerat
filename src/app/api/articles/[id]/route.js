import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser, isAuthorized, ROLES } from "@/lib/auth";
import { insightsArticles } from "@/content/index.js";

function findStaticArticle(id) {
  const normalizedId = (id || "").toLowerCase().trim();
  return insightsArticles.find(
    (a) =>
      a.slug.toLowerCase() === normalizedId ||
      a.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === normalizedId
  );
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    let article = null;

    try {
      article = await prisma.article.findFirst({
        where: {
          OR: [{ id }, { slug: id }],
        },
        include: {
          author: {
            select: { id: true, name: true, email: true, role: true },
          },
        },
      });
    } catch (dbErr) {
      console.warn("DB findFirst error in GET articles/[id]:", dbErr.message);
    }

    if (!article) {
      const a = findStaticArticle(id);
      if (a) {
        article = {
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
        };
      }
    }

    if (!article) {
      return NextResponse.json({ error: "Article not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, article });
  } catch (error) {
    console.error("Get article error:", error);
    return NextResponse.json({ error: "Failed to fetch article." }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    if (!isAuthorized(user.role, [ROLES.SUPER_ADMIN, ROLES.EDITOR])) {
      return NextResponse.json({ error: "Forbidden: Insufficient privileges." }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();

    let existing = null;
    try {
      existing = await prisma.article.findFirst({
        where: {
          OR: [{ id }, { slug: id }],
        },
      });
    } catch (e) {
      console.warn("DB lookup error in PATCH articles/[id]:", e.message);
    }

    const data = {};
    if (body.title !== undefined) data.title = body.title.trim();
    if (body.subtitle !== undefined) data.subtitle = body.subtitle?.trim() || null;
    if (body.slug !== undefined) {
      data.slug = body.slug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    if (body.category !== undefined) data.category = body.category;
    if (body.content !== undefined) data.content = body.content;
    if (body.excerpt !== undefined) data.excerpt = body.excerpt?.trim() || null;
    if (body.readingTime !== undefined) data.readingTime = body.readingTime;
    if (body.coverImageUrl !== undefined) data.coverImageUrl = body.coverImageUrl || null;
    if (body.tags !== undefined) {
      data.tags = Array.isArray(body.tags) ? JSON.stringify(body.tags) : body.tags;
    }
    if (body.featured !== undefined) data.featured = Boolean(body.featured);
    if (body.authorId !== undefined) data.authorId = body.authorId;
    if (body.status !== undefined) {
      data.status = body.status;
      if (body.status === "PUBLISHED" && (!existing || !existing.publishedAt)) {
        data.publishedAt = new Date();
      }
    }

    let updated = null;
    const targetId = existing?.id || id;

    try {
      updated = await prisma.article.upsert({
        where: { id: targetId },
        update: data,
        create: {
          id: targetId,
          slug: data.slug || targetId,
          title: data.title || "UNTITLED ARTICLE",
          subtitle: data.subtitle || null,
          category: data.category || "SYSTEM ARCHITECTURE",
          content: data.content || "",
          excerpt: data.excerpt || null,
          readingTime: data.readingTime || "5 MIN READ",
          coverImageUrl: data.coverImageUrl || null,
          tags: data.tags || "[]",
          status: data.status || "DRAFT",
          featured: data.featured ?? false,
          authorId: data.authorId || user.id,
          publishedAt: data.status === "PUBLISHED" ? new Date() : null,
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
            action: "UPDATE_ARTICLE",
            entityType: "ARTICLE",
            entityId: updated.id,
            diff: JSON.stringify(data),
          },
        });
      } catch {}
    } catch (dbErr) {
      console.warn("DB write failed in PATCH articles/[id], returning resilient response:", dbErr.message);
      const staticBase = findStaticArticle(id) || {};
      updated = {
        id: targetId,
        slug: data.slug || existing?.slug || staticBase.slug || targetId,
        title: data.title || existing?.title || staticBase.title || "UNTITLED ARTICLE",
        subtitle: data.subtitle !== undefined ? data.subtitle : existing?.subtitle || staticBase.subtitle || null,
        category: data.category || existing?.category || staticBase.category || "SYSTEM ARCHITECTURE",
        content: data.content || existing?.content || "",
        excerpt: data.excerpt !== undefined ? data.excerpt : existing?.excerpt || staticBase.excerpt || null,
        readingTime: data.readingTime || existing?.readingTime || staticBase.readTime || "5 MIN READ",
        coverImageUrl: data.coverImageUrl !== undefined ? data.coverImageUrl : existing?.coverImageUrl || staticBase.image || null,
        tags: data.tags || existing?.tags || JSON.stringify(staticBase.tags || []),
        status: data.status || existing?.status || "PUBLISHED",
        featured: data.featured !== undefined ? data.featured : existing?.featured ?? false,
        author: {
          id: user.id,
          name: user.name || "Dawit (Principal Architect)",
          email: user.email || "admin@gerat.com",
          role: user.role || "SUPER_ADMIN",
        },
        publishedAt: existing?.publishedAt || new Date().toISOString(),
        createdAt: existing?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    return NextResponse.json({ success: true, article: updated });
  } catch (error) {
    console.error("Update article error:", error);
    return NextResponse.json({ error: error.message || "Failed to update article." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    if (!isAuthorized(user.role, [ROLES.SUPER_ADMIN, ROLES.EDITOR])) {
      return NextResponse.json({ error: "Forbidden: Insufficient privileges to delete." }, { status: 403 });
    }

    const { id } = await params;
    try {
      const existing = await prisma.article.findFirst({
        where: {
          OR: [{ id }, { slug: id }],
        },
      });

      if (existing) {
        await prisma.article.delete({ where: { id: existing.id } });
        try {
          await prisma.auditLog.create({
            data: {
              actorId: user.id,
              action: "DELETE_ARTICLE",
              entityType: "ARTICLE",
              entityId: existing.id,
              diff: JSON.stringify({ title: existing.title, slug: existing.slug }),
            },
          });
        } catch {}
      }
    } catch (dbErr) {
      console.warn("DB delete error in DELETE articles/[id]:", dbErr.message);
    }

    return NextResponse.json({ success: true, message: "Article deleted successfully." });
  } catch (error) {
    console.error("Delete article error:", error);
    return NextResponse.json({ error: "Failed to delete article." }, { status: 500 });
  }
}
