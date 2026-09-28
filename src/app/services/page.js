import React from "react";
import prisma from "@/lib/prisma";
import ServicesOverview from "@/components/services/ServicesOverview";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Services | Gerat Software Solution",
  description:
    "From digital experiences to AI, business systems, and brand identity, we bring the right capabilities together around the problem you need to solve.",
  openGraph: {
    title: "Services — Technology Built Around Your Business | Gerat",
    description:
      "From digital experiences to AI, business systems, and brand identity, we bring the right capabilities together around the problem you need to solve.",
    url: "https://www.gerat.com/services",
    siteName: "Gerat Software Solution",
    locale: "en_US",
    type: "website",
  },
};

export default async function ServicesPage() {
  let initialPillars = null;

  try {
    const totalCount = await prisma.servicePillar.count();
    if (totalCount > 0) {
      const pillars = await prisma.servicePillar.findMany({
        where: { active: true },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      });

      initialPillars = pillars.map((p) => {
        let dels = [];
        if (Array.isArray(p.deliverables)) {
          dels = p.deliverables;
        } else if (typeof p.deliverables === "string" && p.deliverables.startsWith("[")) {
          try {
            dels = JSON.parse(p.deliverables);
          } catch {
            dels = p.deliverables.split("\n").filter(Boolean);
          }
        } else if (p.deliverables) {
          dels = p.deliverables.split("\n").filter(Boolean);
        }

        return {
          ...p,
          deliverables: dels,
        };
      });
    }
  } catch (error) {
    console.error("ServicesPage SSR Prisma fetch error:", error);
  }

  return (
    <div className="bg-[var(--bg)] min-h-screen text-[var(--text-primary)] selection:bg-accent selection:text-black">
      <ServicesOverview initialPillars={initialPillars} />
      <Footer />
    </div>
  );
}
