import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ArticleEditor from "../components/ArticleEditor";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const article = await prisma.article.findUnique({
    where: { id },
    select: { title: true },
  });

  if (!article) {
    return { title: "Article Not Found // Gerat Mission Control" };
  }

  return {
    title: `Edit: ${article.title} // Gerat Mission Control`,
    description: "Edit technical whitepaper publication",
  };
}

export default async function EditArticlePage({ params }) {
  const { id } = await params;

  const [article, authors] = await Promise.all([
    prisma.article.findUnique({
      where: { id },
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

  if (!article) {
    notFound();
  }

  return <ArticleEditor initialArticle={article} authors={authors} />;
}
