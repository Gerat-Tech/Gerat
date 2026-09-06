import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import StatusBadge from "@/components/dashboard/common/StatusBadge";

export default async function DashboardPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const user = await getCurrentUser();
  const role = user?.role || "OPERATOR";
  const isUnauthorized = resolvedSearchParams?.unauthorized === "true";
  const attemptedDomain = resolvedSearchParams?.domain || "";

  // Fetch role-relevant counts
  const isOpsOrAdmin = role === "SUPER_ADMIN" || role === "OPERATIONS_LEAD";

  const [
    inquiryCount,
    newInquiries,
    urgentInquiries,
    articleCount,
    projectCount,
    memberCount,
  ] = await Promise.all([
    isOpsOrAdmin ? prisma.inquiry.count() : 0,
    isOpsOrAdmin ? prisma.inquiry.count({ where: { status: "NEW_INTAKE" } }) : 0,
    isOpsOrAdmin ? prisma.inquiry.count({ where: { priority: "CRITICAL_ENTERPRISE" } }) : 0,
    prisma.article.count(),
    prisma.caseStudy.count(),
    prisma.teamMember.count(),
  ]);

  let recentInquiries = [];
  let recentArticles = [];

  if (isOpsOrAdmin) {
    recentInquiries = await prisma.inquiry.findMany({
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
        priority: true,
        createdAt: true,
      },
    });
  } else {
    recentArticles = await prisma.article.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        category: true,
        readingTime: true,
        published: true,
        createdAt: true,
      },
    });
  }

  // Header Title & Action Button based on Role
  let cockpitTitle = "EXECUTIVE COCKPIT";
  let cockpitSubtitle = `LOGGED IN AS ${user?.name || "ARCHITECT"} // STUDIO MASTER COMMAND`;
  let headerAction = (
    <Link
      href="/dashboard/inquiries"
      className="w-fit py-2 px-4 bg-accent hover:bg-black hover:text-white text-white font-azeret text-[10px] tracking-[0.15em] uppercase font-bold transition-all rounded-[2px] flex items-center gap-2"
    >
      <span>TRIAGE NEW LEADS ({newInquiries})</span>
      <span>→</span>
    </Link>
  );

  if (role === "OPERATIONS_LEAD") {
    cockpitTitle = "OPERATIONS COCKPIT";
    cockpitSubtitle = `LOGGED IN AS ${user?.name || "OPERATIONS LEAD"} // CLIENT INTAKE & COMMERCIAL PIPELINE`;
    headerAction = (
      <Link
        href="/dashboard/inquiries"
        className="w-fit py-2 px-4 bg-accent hover:bg-black hover:text-white text-white font-azeret text-[10px] tracking-[0.15em] uppercase font-bold transition-all rounded-[2px] flex items-center gap-2"
      >
        <span>OPEN KANBAN PIPELINE ({newInquiries} NEW)</span>
        <span>→</span>
      </Link>
    );
  } else if (role === "TECHNICAL_EDITOR") {
    cockpitTitle = "ENGINEERING COCKPIT";
    cockpitSubtitle = `LOGGED IN AS ${user?.name || "LEAD ARCHITECT"} // RESEARCH & TECHNICAL CMS`;
    headerAction = (
      <Link
        href="/dashboard/insights/new"
        className="w-fit py-2 px-4 bg-accent hover:bg-black hover:text-white text-white font-azeret text-[10px] tracking-[0.15em] uppercase font-bold transition-all rounded-[2px] flex items-center gap-2"
      >
        <span>+ AUTHOR NEW WHITEPAPER</span>
        <span>→</span>
      </Link>
    );
  } else if (role === "CREATIVE_EDITOR") {
    cockpitTitle = "CREATIVE COCKPIT";
    cockpitSubtitle = `LOGGED IN AS ${user?.name || "CREATIVE DIRECTOR"} // BRAND SHOWCASE & ASSET CMS`;
    headerAction = (
      <Link
        href="/dashboard/portfolio/new"
        className="w-fit py-2 px-4 bg-accent hover:bg-black hover:text-white text-white font-azeret text-[10px] tracking-[0.15em] uppercase font-bold transition-all rounded-[2px] flex items-center gap-2"
      >
        <span>+ CREATE CASE STUDY</span>
        <span>→</span>
      </Link>
    );
  } else if (role === "VIEWER") {
    cockpitTitle = "STUDIO OVERVIEW";
    cockpitSubtitle = `LOGGED IN AS ${user?.name || "OBSERVER"} // INTERNAL STUDIO DIRECTORY`;
    headerAction = (
      <Link
        href="/"
        target="_blank"
        className="w-fit py-2 px-4 bg-accent hover:bg-black hover:text-white text-white font-azeret text-[10px] tracking-[0.15em] uppercase font-bold transition-all rounded-[2px] flex items-center gap-2"
      >
        <span>VIEW PUBLIC SITE</span>
        <span>↗</span>
      </Link>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* RBAC Unauthorized Interception Alert Banner */}
      {isUnauthorized && (
        <div className="p-4 rounded-[3px] bg-red-500/10 border border-red-500/40 text-red-600 font-azeret text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">⛔</span>
            <span>
              <strong>CLEARANCE RESTRICTED:</strong> Your role ({role}) does not possess clearance to access {attemptedDomain || "that domain"}. Intercepted by Gerat RBAC.
            </span>
          </div>
          <span className="text-[10px] tracking-widest uppercase opacity-80">ACCESS GUARD</span>
        </div>
      )}

      {/* Page Title & Mission Statement */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-roc text-2xl sm:text-3xl font-bold tracking-tight uppercase text-white">
              {cockpitTitle}
            </h1>
            <span className="font-azeret text-[9px] tracking-[0.2em] px-2 py-0.5 rounded-[2px] bg-accent/15 border border-accent/40 text-accent uppercase font-bold">
              {role}
            </span>
          </div>
          <p className="font-azeret text-[10px] tracking-[0.15em] text-white/40 uppercase mt-1">
            {cockpitSubtitle}
          </p>
        </div>

        {headerAction}
      </div>

      {/* KPI Metrics Strip tailored per role */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {role === "OPERATIONS_LEAD" ? (
          <>
            <div className="relative bg-[#121212] border border-white/10 p-5 rounded-[3px]">
              <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30" />
              <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
                AWAITING TRIAGE
              </div>
              <div className="font-roc text-3xl sm:text-4xl font-bold text-accent mt-1">
                {newInquiries.toString().padStart(2, "0")}
              </div>
              <div className="font-azeret text-[9px] tracking-[0.15em] text-accent mt-2 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                <span>UNREAD INTAKES</span>
              </div>
            </div>

            <div className="relative bg-[#121212] border border-white/10 p-5 rounded-[3px]">
              <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30" />
              <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
                TOTAL LEADS
              </div>
              <div className="font-roc text-3xl sm:text-4xl font-bold text-white mt-1">
                {inquiryCount.toString().padStart(2, "0")}
              </div>
              <div className="font-azeret text-[9px] tracking-[0.15em] text-emerald-500 mt-2">
                ACROSS ALL CHANNELS
              </div>
            </div>

            <div className="relative bg-[#121212] border border-white/10 p-5 rounded-[3px]">
              <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30" />
              <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
                CRITICAL LEADS
              </div>
              <div className="font-roc text-3xl sm:text-4xl font-bold text-white mt-1">
                {urgentInquiries.toString().padStart(2, "0")}
              </div>
              <div className="font-azeret text-[9px] tracking-[0.15em] text-amber-500 mt-2">
                ENTERPRISE PRIORITY
              </div>
            </div>

            <div className="relative bg-[#121212] border border-white/10 p-5 rounded-[3px]">
              <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30" />
              <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
                TEAM ARCHITECTS
              </div>
              <div className="font-roc text-3xl sm:text-4xl font-bold text-white mt-1">
                {memberCount.toString().padStart(2, "0")}
              </div>
              <div className="font-azeret text-[9px] tracking-[0.15em] text-white/50 mt-2">
                AVAILABLE FOR ASSIGNMENT
              </div>
            </div>
          </>
        ) : role === "TECHNICAL_EDITOR" ? (
          <>
            <div className="relative bg-[#121212] border border-white/10 p-5 rounded-[3px]">
              <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30" />
              <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
                RESEARCH WHITEPAPERS
              </div>
              <div className="font-roc text-3xl sm:text-4xl font-bold text-white mt-1">
                {articleCount.toString().padStart(2, "0")}
              </div>
              <div className="font-azeret text-[9px] tracking-[0.15em] text-emerald-500 mt-2">
                PUBLICATIONS LIVE
              </div>
            </div>

            <div className="relative bg-[#121212] border border-white/10 p-5 rounded-[3px]">
              <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30" />
              <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
                ENGINEERING CASE STUDIES
              </div>
              <div className="font-roc text-3xl sm:text-4xl font-bold text-white mt-1">
                {projectCount.toString().padStart(2, "0")}
              </div>
              <div className="font-azeret text-[9px] tracking-[0.15em] text-accent mt-2">
                ACTIVE SHOWCASES
              </div>
            </div>

            <div className="relative bg-[#121212] border border-white/10 p-5 rounded-[3px]">
              <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30" />
              <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
                TECHNICAL PILLARS
              </div>
              <div className="font-roc text-3xl sm:text-4xl font-bold text-white mt-1">
                03
              </div>
              <div className="font-azeret text-[9px] tracking-[0.15em] text-white/50 mt-2">
                SYSTEMS, AI & CLOUD
              </div>
            </div>

            <div className="relative bg-[#121212] border border-white/10 p-5 rounded-[3px]">
              <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30" />
              <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
                ACTIVE PRACTITIONERS
              </div>
              <div className="font-roc text-3xl sm:text-4xl font-bold text-white mt-1">
                {memberCount.toString().padStart(2, "0")}
              </div>
              <div className="font-azeret text-[9px] tracking-[0.15em] text-white/50 mt-2">
                ENGINEERING ROSTER
              </div>
            </div>
          </>
        ) : role === "CREATIVE_EDITOR" ? (
          <>
            <div className="relative bg-[#121212] border border-white/10 p-5 rounded-[3px]">
              <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30" />
              <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
                PORTFOLIO WORKS
              </div>
              <div className="font-roc text-3xl sm:text-4xl font-bold text-white mt-1">
                {projectCount.toString().padStart(2, "0")}
              </div>
              <div className="font-azeret text-[9px] tracking-[0.15em] text-emerald-500 mt-2">
                ACTIVE CASE STUDIES
              </div>
            </div>

            <div className="relative bg-[#121212] border border-white/10 p-5 rounded-[3px]">
              <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30" />
              <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
                DESIGN INSIGHTS
              </div>
              <div className="font-roc text-3xl sm:text-4xl font-bold text-white mt-1">
                {articleCount.toString().padStart(2, "0")}
              </div>
              <div className="font-azeret text-[9px] tracking-[0.15em] text-accent mt-2">
                CREATIVE ESSAYS LIVE
              </div>
            </div>

            <div className="relative bg-[#121212] border border-white/10 p-5 rounded-[3px]">
              <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30" />
              <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
                CREATIVE PILLARS
              </div>
              <div className="font-roc text-3xl sm:text-4xl font-bold text-white mt-1">
                03
              </div>
              <div className="font-azeret text-[9px] tracking-[0.15em] text-white/50 mt-2">
                BRAND, TOKENS & ADVISORY
              </div>
            </div>

            <div className="relative bg-[#121212] border border-white/10 p-5 rounded-[3px]">
              <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30" />
              <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
                CREATIVE DIRECTORS
              </div>
              <div className="font-roc text-3xl sm:text-4xl font-bold text-white mt-1">
                {memberCount.toString().padStart(2, "0")}
              </div>
              <div className="font-azeret text-[9px] tracking-[0.15em] text-white/50 mt-2">
                STUDIO PRACTITIONERS
              </div>
            </div>
          </>
        ) : (
          /* SUPER_ADMIN / VIEWER default metrics */
          <>
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
              <div className="font-azeret text-[9px] tracking-[0.15em] text-emerald-500 mt-2">
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
          </>
        )}
      </section>

      {/* Operational Modules Navigation — STRICTLY FILTERED BY ROLE */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Module 01: CRM (Only for SUPER_ADMIN and OPERATIONS_LEAD) */}
        {isOpsOrAdmin && (
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
        )}

        {/* Module 02: Research & Insights (SUPER_ADMIN, TECHNICAL_EDITOR, CREATIVE_EDITOR, VIEWER) */}
        {role !== "OPERATIONS_LEAD" && (
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
        )}

        {/* Module 03: Portfolio & Showcase (SUPER_ADMIN, TECHNICAL_EDITOR, CREATIVE_EDITOR, VIEWER) */}
        {role !== "OPERATIONS_LEAD" && (
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
        )}

        {/* Module 04: Team & Roster (SUPER_ADMIN, OPERATIONS_LEAD, VIEWER) */}
        {(role === "SUPER_ADMIN" || role === "OPERATIONS_LEAD" || role === "VIEWER") && (
          <Link
            href="/dashboard/team"
            className="group relative bg-[#121212] border border-white/10 hover:border-accent p-6 rounded-[3px] transition-all"
          >
            <span className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase">
              MODULE 04 // {role === "OPERATIONS_LEAD" ? "REF" : "CMS"}
            </span>
            <h2 className="font-roc text-xl font-bold uppercase text-white group-hover:text-accent mt-1 transition-colors">
              {role === "OPERATIONS_LEAD" ? "TEAM PRACTITIONER DIRECTORY" : "TEAM & LEADERSHIP ROSTER"}
            </h2>
            <p className="font-roc text-xs text-white/60 mt-2 leading-relaxed">
              {role === "OPERATIONS_LEAD"
                ? "Reference practitioner disciplines to assign appropriate technical leads to client briefs."
                : "Manage leadership profiles, engineering practitioner specialties, and 4:5 headshots."}
            </p>
            <div className="mt-4 flex items-center gap-2 font-azeret text-[10px] tracking-[0.15em] text-white/40 group-hover:text-white uppercase transition-colors">
              <span>{role === "OPERATIONS_LEAD" ? "VIEW DIRECTORY" : "MANAGE TEAM"}</span>
              <span>→</span>
            </div>
          </Link>
        )}

        {/* Module 05: Practice Pillars (All Roles, adapted) */}
        <Link
          href="/dashboard/services"
          className="group relative bg-[#121212] border border-white/10 hover:border-accent p-6 rounded-[3px] transition-all"
        >
          <span className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase">
            MODULE 05 // {role === "OPERATIONS_LEAD" ? "REF" : "CMS"}
          </span>
          <h2 className="font-roc text-xl font-bold uppercase text-white group-hover:text-accent mt-1 transition-colors">
            {role === "OPERATIONS_LEAD" ? "PRACTICE PILLARS & SCOPE" : "PRACTICE PILLARS & SERVICES"}
          </h2>
          <p className="font-roc text-xs text-white/60 mt-2 leading-relaxed">
            {role === "OPERATIONS_LEAD"
              ? "Reference the 6 practice pillars and deliverables matrix when scoping client proposals."
              : "Edit the 6 practice pillars, capabilities table matrix, and creative service packages."}
          </p>
          <div className="mt-4 flex items-center gap-2 font-azeret text-[10px] tracking-[0.15em] text-white/40 group-hover:text-white uppercase transition-colors">
            <span>{role === "OPERATIONS_LEAD" ? "VIEW PILLARS" : "MANAGE SERVICES"}</span>
            <span>→</span>
          </div>
        </Link>

        {/* Module 06: System Settings (STRICTLY SUPER_ADMIN ONLY) */}
        {role === "SUPER_ADMIN" && (
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
        )}
      </section>

      {/* Bottom Data Section: Inquiries for Ops/Admin, Publications for Editors */}
      {isOpsOrAdmin ? (
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
              className="font-azeret text-[10px] tracking-[0.2em] text-accent hover:underline uppercase font-bold"
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
                  <th className="py-2.5 px-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-azeret text-xs">
                {recentInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3 text-accent font-semibold tracking-wider">
                      {inq.telemetryCode}
                    </td>
                    <td className="py-3 px-3 text-white">
                      <div className="font-semibold">{inq.fullName}</div>
                      {inq.company && (
                        <div className="text-[10px] text-white/40">{inq.company}</div>
                      )}
                    </td>
                    <td className="py-3 px-3 text-white/70">{inq.discipline}</td>
                    <td className="py-3 px-3 text-white/70">{inq.budgetRange}</td>
                    <td className="py-3 px-3">
                      <StatusBadge status={inq.status} />
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        href={`/dashboard/inquiries/${inq.id}`}
                        className="inline-flex items-center px-2.5 py-1 bg-white/[0.03] hover:bg-accent hover:text-black border border-white/15 text-white/80 font-azeret text-[9px] tracking-wider uppercase rounded-[2px] transition-colors"
                      >
                        OPEN DOSSIER →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section className="bg-[#121212] border border-white/10 rounded-[3px] p-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <div>
              <h3 className="font-roc text-lg font-bold uppercase text-white">
                RECENT STUDIO PUBLICATIONS
              </h3>
              <p className="font-azeret text-[10px] tracking-[0.15em] text-white/40 uppercase">
                RESEARCH ARTICLES & ARCHITECTURAL WHITEPAPERS
              </p>
            </div>
            <Link
              href="/dashboard/insights"
              className="font-azeret text-[10px] tracking-[0.2em] text-accent hover:underline uppercase font-bold"
            >
              VIEW ALL ARTICLES →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans">
              <thead>
                <tr className="border-b border-white/10 font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
                  <th className="py-2.5 px-3">ARTICLE TITLE</th>
                  <th className="py-2.5 px-3">CATEGORY</th>
                  <th className="py-2.5 px-3">READ TIME</th>
                  <th className="py-2.5 px-3">STATUS</th>
                  <th className="py-2.5 px-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-azeret text-xs">
                {recentArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3 text-white font-semibold">
                      {art.title}
                    </td>
                    <td className="py-3 px-3 text-accent text-[10px] uppercase font-bold">
                      {art.category}
                    </td>
                    <td className="py-3 px-3 text-white/70">{art.readingTime}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-[2px] font-azeret text-[9px] font-bold tracking-wider uppercase ${art.published ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" : "bg-amber-500/20 text-amber-400 border border-amber-500/40"}`}>
                        {art.published ? "PUBLISHED" : "DRAFT"}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        href={`/dashboard/insights/${art.id}`}
                        className="inline-flex items-center px-2.5 py-1 bg-white/[0.03] hover:bg-accent hover:text-black border border-white/15 text-white/80 font-azeret text-[9px] tracking-wider uppercase rounded-[2px] transition-colors"
                      >
                        EDIT ARTICLE →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
