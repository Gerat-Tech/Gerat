import React from "react";
import prisma from "@/lib/prisma";
import ServicesOverview from "@/app/why-wqf/components/ServicesOverview";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Services · Digital, AI, Business Systems & Brand | Gerat Software Solution",
  description:
    "From the way your business looks to the systems behind how it works, Gerat brings brand, design, software, and intelligent technology together.",
};

export default async function ServicesPage() {
  let initialPillars = null;

  try {
    const pillars = await prisma.servicePillar.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });

    if (pillars && pillars.length > 0) {
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
