import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import ServicesClientView from "./components/ServicesClientView";

export const metadata = {
  title: "Practice Pillars CMS // Gerat Mission Control",
  description: "Curate, engineer, and publish core service capabilities and specifications",
};

export default async function ServicesDashboardPage() {
  const pillars = await prisma.servicePillar.findMany({
    orderBy: [{ order: "asc" }, { num: "asc" }],
  });

  const total = pillars.length;
  const activeCount = pillars.filter((p) => p.active).length;
  const specLinked = pillars.filter((p) => Boolean(p.deepLink)).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-roc text-2xl sm:text-3xl font-bold tracking-tight uppercase text-white">
              PRACTICE PILLARS CMS
            </h1>
            <span className="font-azeret text-[9px] tracking-[0.2em] px-2 py-0.5 rounded-[2px] bg-accent/15 border border-accent/40 text-accent uppercase font-bold">
              SERVICES GOVERNANCE
            </span>
          </div>
          <p className="font-azeret text-[10px] tracking-[0.15em] text-white/40 uppercase mt-1">
            MANAGE CORE DISCIPLINES 01–06, ARCHITECTURAL DELIVERABLES, AND DEEP SPECIFICATION LINKS
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/services/new"
            className="py-2 px-4 bg-accent hover:bg-[#ff5c1a] text-black font-azeret text-[10px] tracking-[0.15em] font-bold uppercase rounded-[2px] transition-colors flex items-center gap-1.5"
          >
            <span>+ CONFIGURE PILLAR</span>
          </Link>
        </div>
      </div>

      {/* KPI Ribbon */}
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
          <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
            TOTAL PRACTICE PILLARS
          </div>
          <div className="font-roc text-2xl sm:text-3xl font-bold text-white mt-1">
            {total.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
          <div className="font-azeret text-[9px] tracking-[0.2em] text-emerald-400 uppercase">
            ACTIVE ON /WHY-WQF
          </div>
          <div className="font-roc text-2xl sm:text-3xl font-bold text-emerald-400 mt-1">
            {activeCount.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
          <div className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase">
            SPECIFICATION ROUTES LINKED
          </div>
          <div className="font-roc text-2xl sm:text-3xl font-bold text-accent mt-1">
            {specLinked.toString().padStart(2, "0")}
          </div>
        </div>
      </section>

      {/* Client View Component */}
      <ServicesClientView initialPillars={pillars} />
    </div>
  );
}
