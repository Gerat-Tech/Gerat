import React from "react";
import prisma from "@/lib/prisma";
import InsightsClientView from "./components/InsightsClientView";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Research & Technical Blueprints | Gerat Software Solutions PLC",
  description:
    "Technical whitepapers, distributed systems analyses, and engineering blueprints authored by the software practitioners at Gerat.",
};

export default async function InsightsPage() {
  let initialArticles = null;

  try {
    const articles = await prisma.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      include: {
        author: {
          select: { id: true, name: true, role: true },
        },
      },
    });

    if (articles && articles.length > 0) {
      initialArticles = articles.map((a) => ({
        ...a,
        readTime: a.readingTime,
        image: a.coverImageUrl,
        author: a.author?.name || "Gerät Engineering",
      }));
    }
  } catch (error) {
    console.error("InsightsPage SSR Prisma fetch error:", error);
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-accent selection:text-black">
      <InsightsClientView initialArticles={initialArticles} />
      <Footer />
    </div>
  );
}
