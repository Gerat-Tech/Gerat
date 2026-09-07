import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser, isAuthorized, ROLES } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

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

    if (
      !isAuthorized(user.role, [
        ROLES.SUPER_ADMIN,
        ROLES.EDITOR,
      ])
    ) {
      return NextResponse.json({ error: "Forbidden: Insufficient privileges." }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Article not found." }, { status: 404 });
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
    if (body.content !== undefined) {
      data.content = body.content;
      // Auto-recalculate reading time unless custom supplied
      if (!body.readingTime) {
        const wordCount = body.content.trim().split(/\s+/).filter(Boolean).length;
        data.readingTime = `${Math.max(1, Math.ceil(wordCount / 200))} MIN READ`;
      }
    }
    if (body.excerpt !== undefined) data.excerpt = body.excerpt?.trim() || null;
    if (body.readingTime !== undefined) data.readingTime = body.readingTime;
    if (body.coverImageUrl !== undefined) data.coverImageUrl = body.coverImageUrl || null;
    if (body.tags !== undefined) {
      data.tags = Array.isArray(body.tags) ? JSON.stringify(body.tags) : body.tags || null;
    }
    if (body.featured !== undefined) data.featured = Boolean(body.featured);
    if (body.authorId !== undefined) data.authorId = body.authorId;

    if (body.status !== undefined) {
      data.status = body.status;
      if (body.status === "PUBLISHED" && !existing.publishedAt) {
        data.publishedAt = new Date();
      }
    }

    const updated = await prisma.article.update({
      where: { id },
      data,
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
          entityId: id,
          diff: JSON.stringify(data),
        },
      });
    } catch {}

    return NextResponse.json({ success: true, article: updated });
  } catch (error) {
    console.error("Update article error:", error);
    return NextResponse.json({ error: "Failed to update article." }, { status: 500 });
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
    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Article not found." }, { status: 404 });
    }

    await prisma.article.delete({ where: { id } });

    // Record audit log
    try {
      await prisma.auditLog.create({
        data: {
          actorId: user.id,
          action: "DELETE_ARTICLE",
          entityType: "ARTICLE",
          entityId: id,
          diff: JSON.stringify({ title: existing.title, slug: existing.slug }),
        },
      });
    } catch {}

    return NextResponse.json({ success: true, message: "Article deleted successfully." });
  } catch (error) {
    console.error("Delete article error:", error);
    return NextResponse.json({ error: "Failed to delete article." }, { status: 500 });
  }
}
