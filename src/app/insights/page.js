import React from "react";
import prisma from "@/lib/prisma";
import InsightsClientView from "./components/InsightsClientView";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Research & Technical Blueprints | Gerat Software Solution",
  description:
    "Technical whitepapers, distributed systems analyses, and engineering blueprints authored by the software practitioners at Gerat.",
};

export default async function InsightsPage() {
  let initialArticles = null;

  try {
    const totalCount = await prisma.article.count();
    if (totalCount > 0) {
      const articles = await prisma.article.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        include: {
          author: {
            select: { id: true, name: true, role: true },
          },
        },
      });

      initialArticles = articles.map((a) => ({
        ...a,
        readTime: a.readingTime,
        image: a.coverImageUrl,
        author: a.author?.name || "Gerat Engineering",
      }));
    }
  } catch (error) {
    console.error("InsightsPage SSR Prisma fetch error:", error);
  }

  return (
    <div className="bg-[var(--bg)] min-h-screen text-[var(--text-primary)] selection:bg-accent selection:text-black">
      <InsightsClientView initialArticles={initialArticles} />
      <Footer />
    </div>
  );
}
