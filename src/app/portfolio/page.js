import React from "react";
import prisma from "@/lib/prisma";
import PortfolioClientView from "./components/PortfolioClientView";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Portfolio & Case Studies | Gerat Software Solution",
  description:
    "Explore digital products, business platforms, intelligent tools, and brand identity systems built by Gerat.",
};

export default async function PortfolioPage() {
  let initialProjects = null;

  try {
    const caseStudies = await prisma.caseStudy.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    if (caseStudies && caseStudies.length > 0) {
      initialProjects = caseStudies.map((cs) => ({
        ...cs,
        id: cs.slug || cs.id,
        index: cs.displayIndex,
        image: cs.imageUrl,
        tech: cs.techStack,
        stack:
          typeof cs.stackBadges === "string" && cs.stackBadges.startsWith("[")
            ? JSON.parse(cs.stackBadges)
            : Array.isArray(cs.stackBadges)
            ? cs.stackBadges
            : cs.stackBadges
            ? cs.stackBadges.split(",").map((s) => s.trim())
            : [],
      }));
    }
  } catch (error) {
    console.error("PortfolioPage SSR Prisma fetch error:", error);
  }

  return (
    <div className="bg-[var(--bg)] min-h-screen text-[var(--text-primary)] selection:bg-accent selection:text-black">
      <PortfolioClientView initialProjects={initialProjects} />
      <Footer />
    </div>
  );
}
