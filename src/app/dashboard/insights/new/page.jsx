import React from "react";
import prisma from "@/lib/prisma";
import ArticleEditor from "../components/ArticleEditor";

export const metadata = {
  title: "New Whitepaper Publication // Gerat Mission Control",
  description: "Compose and publish technical whitepapers and field dispatches",
};

export default async function NewArticlePage() {
  const authors = await prisma.user.findMany({
    select: { id: true, name: true, role: true },
    orderBy: { name: "asc" },
  });

  return <ArticleEditor authors={authors} />;
}
