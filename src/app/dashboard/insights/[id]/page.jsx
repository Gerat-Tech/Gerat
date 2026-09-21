import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ArticleEditor from "../components/ArticleEditor";
import { insightsArticles } from "@/content/index.js";
import { SYSTEM_PRESET_USERS } from "@/lib/auth";

function findStaticArticle(id) {
  const normalizedId = (id || "").toLowerCase().trim();
  return insightsArticles.find(
    (a) =>
      a.slug.toLowerCase() === normalizedId ||
      a.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === normalizedId
  );
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  let article = null;

  try {
    article = await prisma.article.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      select: { title: true },
    });
  } catch {}

  if (!article) {
    const a = findStaticArticle(id);
    if (a) {
      article = { title: a.title };
    }
  }

  if (!article) {
    return { title: "Article Not Found · Gerat Mission Control" };
  }

  return {
    title: `Edit: ${article.title} · Gerat Mission Control`,
    description: "Edit technical whitepaper publication",
  };
}

export default async function EditArticlePage({ params }) {
  const { id } = await params;

  let article = null;
  let authors = [];

  try {
    const results = await Promise.all([
      prisma.article.findFirst({
        where: {
          OR: [{ id }, { slug: id }],
        },
        include: {
          author: {
            select: { id: true, name: true, role: true },
          },
        },
      }),
      prisma.user.findMany({
        select: { id: true, name: true, role: true },
        orderBy: { name: "asc" },
      }),
    ]);
    article = results[0];
    authors = results[1];
  } catch (err) {
    console.warn("EditArticlePage DB lookup error:", err.message);
  }

  if (authors.length === 0) {
    authors = SYSTEM_PRESET_USERS.map((u) => ({
      id: u.id,
      name: u.name,
      role: u.role,
    }));
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
        authorId: authors[0]?.id || "usr_super_admin_gerat",
        author: authors[0] || {
          id: "usr_super_admin_gerat",
          name: "Dawit (Principal Architect)",
          role: "SUPER_ADMIN",
        },
        publishedAt: a.date ? new Date(a.date).toISOString() : new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  }

  if (!article) {
    notFound();
  }

  return <ArticleEditor initialArticle={article} authors={authors} />;
}
