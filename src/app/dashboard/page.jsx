import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  // Fetch telemetry counts
  const [inquiryCount, newInquiries, articleCount, projectCount, memberCount] =
    await Promise.all([
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: "NEW_INTAKE" } }),
      prisma.article.count(),
      prisma.caseStudy.count(),
      prisma.teamMember.count(),
    ]);

  const recentInquiries = await prisma.inquiry.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      telemetryCode: true,
      fullName: true,
      company: true,
      discipline: true,
      budgetRange: true,
      status: true,
      createdAt: true,
    },
  });

  return (
    <div className="min-h-screen w-full bg-[#080808] text-white p-4 sm:p-8 selection:bg-accent selection:text-black">
      {/* Top Bar */}
      <header className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="size-9 rounded-[3px] bg-white/5 border border-white/15 flex items-center justify-center text-white hover:border-accent transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
              <path d="M4 4H20V8H8V16H16V12H12V8H20V20H4V4Z" fill="currentColor" />
              <rect x="17" y="13" width="3" height="3" fill="#FF4A00" />
            </svg>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-roc text-xl font-bold tracking-tight uppercase text-white">
                MISSION CONTROL
              </h1>
              <span className="font-azeret text-[9px] tracking-[0.2em] px-2 py-0.5 rounded-[2px] bg-accent/15 border border-accent/40 text-accent uppercase font-bold">
                {user?.role || "OPERATOR"}
              </span>
            </div>
            <p className="font-azeret text-[10px] tracking-[0.15em] text-white/40 uppercase">
              OPERATIONS COCKPIT // GERAT SOFTWARE SOLUTIONS PLC
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="font-roc text-sm text-white font-medium">{user?.name}</div>
            <div className="font-azeret text-[9px] tracking-[0.15em] text-white/40 uppercase">
              {user?.email}
            </div>
          </div>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="py-2 px-3 bg-white/[0.04] hover:bg-white/10 border border-white/15 text-white font-azeret text-[10px] tracking-[0.15em] uppercase rounded-[2px] transition-colors"
            >
              LOGOUT
            </button>
          </form>
        </div>
      </header>

      {/* Main Cockpit */}
      <main className="w-full max-w-7xl mx-auto py-8 flex flex-col gap-8">
        {/* KPI Metrics Strip */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative bg-[#121212] border border-white/10 p-5 rounded-[3px]">
            <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30" />
            <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
              TOTAL INTAKES
            </div>
            <div className="font-roc text-3xl sm:text-4xl font-bold text-white mt-1">
              {inquiryCount.toString().padStart(2, "0")}
            </div>
            <div className="font-azeret text-[9px] tracking-[0.15em] text-accent mt-2 flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              <span>{newInquiries} AWAITING TRIAGE</span>
            </div>
          </div>

          <div className="relative bg-[#121212] border border-white/10 p-5 rounded-[3px]">
            <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30" />
            <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
              PORTFOLIO WORKS
            </div>
            <div className="font-roc text-3xl sm:text-4xl font-bold text-white mt-1">
              {projectCount.toString().padStart(2, "0")}
            </div>
            <div className="font-azeret text-[9px] tracking-[0.15em] text-emerald-400 mt-2">
              ACTIVE CASE STUDIES
            </div>
          </div>

          <div className="relative bg-[#121212] border border-white/10 p-5 rounded-[3px]">
            <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30" />
            <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
              RESEARCH INSIGHTS
            </div>
            <div className="font-roc text-3xl sm:text-4xl font-bold text-white mt-1">
              {articleCount.toString().padStart(2, "0")}
            </div>
            <div className="font-azeret text-[9px] tracking-[0.15em] text-white/50 mt-2">
              PUBLICATIONS LIVE
            </div>
          </div>

          <div className="relative bg-[#121212] border border-white/10 p-5 rounded-[3px]">
            <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30" />
            <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
              ENGINEERING ROSTER
            </div>
            <div className="font-roc text-3xl sm:text-4xl font-bold text-white mt-1">
              {memberCount.toString().padStart(2, "0")}
            </div>
            <div className="font-azeret text-[9px] tracking-[0.15em] text-white/50 mt-2">
              PRACTITIONERS & LEADS
            </div>
          </div>
        </section>

        {/* Operational Modules Navigation */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/dashboard/inquiries"
            className="group relative bg-[#121212] border border-white/10 hover:border-accent p-6 rounded-[3px] transition-all"
          >
            <span className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase">
              MODULE 01 // CRM
            </span>
            <h2 className="font-roc text-xl font-bold uppercase text-white group-hover:text-accent mt-1 transition-colors">
              CLIENT INTAKE & COMMUNICATIONS
            </h2>
            <p className="font-roc text-xs text-white/60 mt-2 leading-relaxed">
              Triage website leads, access 1-click WhatsApp and call triggers, and log team notes.
            </p>
            <div className="mt-4 flex items-center gap-2 font-azeret text-[10px] tracking-[0.15em] text-white/40 group-hover:text-white uppercase transition-colors">
              <span>OPEN PIPELINE</span>
              <span>→</span>
            </div>
          </Link>

          <Link
            href="/dashboard/insights"
            className="group relative bg-[#121212] border border-white/10 hover:border-accent p-6 rounded-[3px] transition-all"
          >
            <span className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase">
              MODULE 02 // CMS
            </span>
            <h2 className="font-roc text-xl font-bold uppercase text-white group-hover:text-accent mt-1 transition-colors">
              RESEARCH & INSIGHTS PUBLISHING
            </h2>
            <p className="font-roc text-xs text-white/60 mt-2 leading-relaxed">
              Author technical whitepapers with split-screen Markdown, math formulas, and code syntax.
            </p>
            <div className="mt-4 flex items-center gap-2 font-azeret text-[10px] tracking-[0.15em] text-white/40 group-hover:text-white uppercase transition-colors">
              <span>MANAGE ARTICLES</span>
              <span>→</span>
            </div>
          </Link>

          <Link
            href="/dashboard/portfolio"
            className="group relative bg-[#121212] border border-white/10 hover:border-accent p-6 rounded-[3px] transition-all"
          >
            <span className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase">
              MODULE 03 // CMS
            </span>
            <h2 className="font-roc text-xl font-bold uppercase text-white group-hover:text-accent mt-1 transition-colors">
              PORTFOLIO & PRODUCTS
            </h2>
            <p className="font-roc text-xs text-white/60 mt-2 leading-relaxed">
              Maintain case studies, impact metrics, tech stack badges, and vector deliverable assets.
            </p>
            <div className="mt-4 flex items-center gap-2 font-azeret text-[10px] tracking-[0.15em] text-white/40 group-hover:text-white uppercase transition-colors">
              <span>MANAGE SHOWCASE</span>
              <span>→</span>
            </div>
          </Link>

          <Link
            href="/dashboard/team"
            className="group relative bg-[#121212] border border-white/10 hover:border-accent p-6 rounded-[3px] transition-all"
          >
            <span className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase">
              MODULE 04 // CMS
            </span>
            <h2 className="font-roc text-xl font-bold uppercase text-white group-hover:text-accent mt-1 transition-colors">
              TEAM & LEADERSHIP ROSTER
            </h2>
            <p className="font-roc text-xs text-white/60 mt-2 leading-relaxed">
              Manage leadership profiles, engineering practitioner specialties, and 4:5 headshots.
            </p>
            <div className="mt-4 flex items-center gap-2 font-azeret text-[10px] tracking-[0.15em] text-white/40 group-hover:text-white uppercase transition-colors">
              <span>MANAGE TEAM</span>
              <span>→</span>
            </div>
          </Link>

          <Link
            href="/dashboard/services"
            className="group relative bg-[#121212] border border-white/10 hover:border-accent p-6 rounded-[3px] transition-all"
          >
            <span className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase">
              MODULE 05 // CMS
            </span>
            <h2 className="font-roc text-xl font-bold uppercase text-white group-hover:text-accent mt-1 transition-colors">
              PRACTICE PILLARS & SERVICES
            </h2>
            <p className="font-roc text-xs text-white/60 mt-2 leading-relaxed">
              Edit the 6 practice pillars, capabilities table matrix, and creative service packages.
            </p>
            <div className="mt-4 flex items-center gap-2 font-azeret text-[10px] tracking-[0.15em] text-white/40 group-hover:text-white uppercase transition-colors">
              <span>MANAGE SERVICES</span>
              <span>→</span>
            </div>
          </Link>

          <Link
            href="/dashboard/settings"
            className="group relative bg-[#121212] border border-white/10 hover:border-accent p-6 rounded-[3px] transition-all"
          >
            <span className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase">
              MODULE 06 // SYSTEM
            </span>
            <h2 className="font-roc text-xl font-bold uppercase text-white group-hover:text-accent mt-1 transition-colors">
              TELEMETRY, RBAC & AUDIT LOGS
            </h2>
            <p className="font-roc text-xs text-white/60 mt-2 leading-relaxed">
              Configure ticker tokens, review mutation audit trails, and manage team member access.
            </p>
            <div className="mt-4 flex items-center gap-2 font-azeret text-[10px] tracking-[0.15em] text-white/40 group-hover:text-white uppercase transition-colors">
              <span>SYSTEM SETTINGS</span>
              <span>→</span>
            </div>
          </Link>
        </section>

        {/* Recent Inquiries Preview Table */}
        <section className="bg-[#121212] border border-white/10 rounded-[3px] p-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <div>
              <h3 className="font-roc text-lg font-bold uppercase text-white">
                RECENT INTAKE TELEMETRY
              </h3>
              <p className="font-azeret text-[10px] tracking-[0.15em] text-white/40 uppercase">
                LATEST INQUIRIES RECEIVED ACROSS PLATFORM
              </p>
            </div>
            <Link
              href="/dashboard/inquiries"
              className="font-azeret text-[10px] tracking-[0.2em] text-accent hover:underline uppercase"
            >
              VIEW ALL INTAKES →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans">
              <thead>
                <tr className="border-b border-white/10 font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
                  <th className="py-2.5 px-3">TELEMETRY CODE</th>
                  <th className="py-2.5 px-3">CLIENT / COMPANY</th>
                  <th className="py-2.5 px-3">DISCIPLINE</th>
                  <th className="py-2.5 px-3">BUDGET RANGE</th>
                  <th className="py-2.5 px-3">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-azeret text-xs">
                {recentInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3 text-accent font-semibold tracking-wider">
                      {inq.telemetryCode}
                    </td>
                    <td className="py-3 px-3 text-white">
                      <div>{inq.fullName}</div>
                      {inq.company && (
                        <div className="text-[10px] text-white/40">{inq.company}</div>
                      )}
                    </td>
                    <td className="py-3 px-3 text-white/70">{inq.discipline}</td>
                    <td className="py-3 px-3 text-white/70">{inq.budgetRange}</td>
                    <td className="py-3 px-3">
                      <span className="inline-block px-2 py-0.5 rounded-[2px] text-[9px] tracking-wider uppercase font-bold bg-white/10 text-white/80">
                        {inq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
