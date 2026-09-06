import React from "react";
import prisma from "@/lib/prisma";
import ServicesOverview from "./components/ServicesOverview";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Platform & Engineering Services | Gerat Software Solutions PLC",
  description:
    "Explore Gerat's four core engineering practices: Enterprise Software Architecture, Domain-Grounded AI & RAG, Custom ERP, and Public-Sector Platforms.",
};

export default async function WhyWQF() {
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
    console.error("WhyWQF SSR Prisma fetch error:", error);
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-accent selection:text-black">
      <ServicesOverview initialPillars={initialPillars} />
      <Footer />
    </div>
  );
}
