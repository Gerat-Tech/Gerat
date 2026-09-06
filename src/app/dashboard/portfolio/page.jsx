import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import PortfolioClientView from "./components/PortfolioClientView";

export const metadata = {
  title: "Portfolio & Showcase CMS // Gerat Mission Control",
  description: "Curate, engineer, and publish flagship case studies and product showcases",
};

export default async function PortfolioDashboardPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  const total = caseStudies.length;
  const featured = caseStudies.filter((c) => c.featured).length;
  const enterprise = caseStudies.filter((c) => c.category.includes("ENTERPRISE")).length;
  const production = caseStudies.filter((c) => c.status.includes("PRODUCTION")).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-roc text-2xl sm:text-3xl font-bold tracking-tight uppercase text-white">
              FLAGSHIP PORTFOLIO CMS
            </h1>
            <span className="font-azeret text-[9px] tracking-[0.2em] px-2 py-0.5 rounded-[2px] bg-accent/15 border border-accent/40 text-accent uppercase font-bold">
              SHOWCASE CURATION
            </span>
          </div>
          <p className="font-azeret text-[10px] tracking-[0.15em] text-white/40 uppercase mt-1">
            MANAGE PROPRIETARY CLIENT ENGAGEMENTS, TECHNICAL METRICS, AND HOMEPAGE SPOTLIGHTS
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/portfolio/new"
            className="py-2 px-4 bg-accent hover:bg-[#ff5c1a] text-black font-azeret text-[10px] tracking-[0.15em] font-bold uppercase rounded-[2px] transition-colors flex items-center gap-1.5"
          >
            <span>+ NEW CASE STUDY</span>
          </Link>
        </div>
      </div>

      {/* KPI Ribbon */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
          <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
            TOTAL CASE STUDIES
          </div>
          <div className="font-roc text-2xl sm:text-3xl font-bold text-white mt-1">
            {total.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
          <div className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase">
            HOMEPAGE FEATURED
          </div>
          <div className="font-roc text-2xl sm:text-3xl font-bold text-accent mt-1">
            {featured.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
          <div className="font-azeret text-[9px] tracking-[0.2em] text-blue-400 uppercase">
            ENTERPRISE ARCHITECTURE
          </div>
          <div className="font-roc text-2xl sm:text-3xl font-bold text-blue-400 mt-1">
            {enterprise.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
          <div className="font-azeret text-[9px] tracking-[0.2em] text-emerald-400 uppercase">
            PRODUCTION VERIFIED
          </div>
          <div className="font-roc text-2xl sm:text-3xl font-bold text-emerald-400 mt-1">
            {production.toString().padStart(2, "0")}
          </div>
        </div>
      </section>

      {/* Client View Component */}
      <PortfolioClientView initialCaseStudies={caseStudies} />
    </div>
  );
}
