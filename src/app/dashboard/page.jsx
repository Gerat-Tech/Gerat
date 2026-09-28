import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import StatusBadge from "@/components/dashboard/common/StatusBadge";

export default async function DashboardPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const user = await getCurrentUser();
  const rawRole = user?.role || "OPERATOR";
  const role =
    rawRole === "EDITOR" || rawRole === "TECHNICAL_EDITOR" || rawRole === "CREATIVE_EDITOR"
      ? "OPERATIONS_LEAD"
      : rawRole;

  const isUnauthorized = resolvedSearchParams?.unauthorized === "true";
  const attemptedDomain = resolvedSearchParams?.domain || "";

  let inquiryCount = 0;
  let newInquiries = 0;
  let urgentInquiries = 0;
  let memberCount = 0;
  let pillarCount = 0;
  let recentInquiries = [];

  try {
    const counts = await Promise.all([
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: "NEW_INTAKE" } }),
      prisma.inquiry.count({ where: { priority: "CRITICAL_ENTERPRISE" } }),
      prisma.teamMember.count(),
      prisma.servicePillar.count(),
    ]);

    [
      inquiryCount,
      newInquiries,
      urgentInquiries,
      memberCount,
      pillarCount,
    ] = counts;

    recentInquiries = await prisma.inquiry.findMany({
      take: 6,
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
  } catch (error) {
    console.error("Dashboard overview data fetch error:", error);
  }

  // Header Title & Action Button based on Role
  let cockpitTitle = "EXECUTIVE COCKPIT";
  let cockpitSubtitle = `LOGGED IN AS ${user?.name || "SUPER ADMIN"} · STUDIO MASTER COMMAND`;
  let headerAction = (
    <Link
      href="/dashboard/inquiries"
      className="w-fit py-2 px-4 bg-accent hover:bg-black hover:text-white text-white font-parkinsans text-[10px] tracking-[0.15em] uppercase font-bold transition-all rounded-[2px] flex items-center gap-2"
    >
      <span>TRIAGE NEW LEADS ({newInquiries})</span>
      <span>→</span>
    </Link>
  );

  if (role === "OPERATIONS_LEAD") {
    cockpitTitle = "OPERATIONS COCKPIT";
    cockpitSubtitle = `LOGGED IN AS ${user?.name || "OPERATIONS LEAD"} · CLIENT INTAKE & COMMERCIAL PIPELINE`;
    headerAction = (
      <Link
        href="/dashboard/inquiries"
        className="w-fit py-2 px-4 bg-accent hover:bg-black hover:text-white text-white font-parkinsans text-[10px] tracking-[0.15em] uppercase font-bold transition-all rounded-[2px] flex items-center gap-2"
      >
        <span>OPEN KANBAN PIPELINE ({newInquiries} NEW)</span>
        <span>→</span>
      </Link>
    );
  } else if (role === "VIEWER") {
    cockpitTitle = "STUDIO OVERVIEW";
    cockpitSubtitle = `LOGGED IN AS ${user?.name || "OBSERVER"} · INTERNAL STUDIO DIRECTORY`;
    headerAction = (
      <Link
        href="/"
        target="_blank"
        className="w-fit py-2 px-4 bg-accent hover:bg-black hover:text-white text-white font-parkinsans text-[10px] tracking-[0.15em] uppercase font-bold transition-all rounded-[2px] flex items-center gap-2"
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
        <div className="p-4 rounded-[3px] bg-red-500/10 border border-red-500/40 text-red-600 font-parkinsans text-xs flex items-center justify-between">
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
            <h1 className="font-parkinsans text-2xl sm:text-3xl font-semibold tracking-tight uppercase text-white">
              {cockpitTitle}
            </h1>
            <span className="font-parkinsans text-[9px] tracking-[0.2em] px-2 py-0.5 rounded-[2px] bg-accent/15 border border-accent/40 text-accent uppercase font-bold">
              {role}
            </span>
          </div>
          <p className="font-parkinsans text-[10px] tracking-[0.15em] text-white/40 uppercase mt-1">
            {cockpitSubtitle}
          </p>
        </div>

        {headerAction}
      </div>

      {/* KPI Metrics Strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="relative bg-[#121212] border border-white/10 p-5 rounded-[3px]">
          <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30" />
          <div className="font-parkinsans text-[9px] tracking-[0.2em] text-white/40 uppercase">
            AWAITING TRIAGE
          </div>
          <div className="font-artific text-3xl sm:text-4xl font-bold text-accent mt-1">
            {newInquiries.toString().padStart(2, "0")}
          </div>
          <div className="font-parkinsans text-[9px] tracking-[0.15em] text-accent mt-2">
            <span>UNREAD INTAKES</span>
          </div>
        </div>

        <div className="relative bg-[#121212] border border-white/10 p-5 rounded-[3px]">
          <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30" />
          <div className="font-parkinsans text-[9px] tracking-[0.2em] text-white/40 uppercase">
            TOTAL INTAKES
          </div>
          <div className="font-artific text-3xl sm:text-4xl font-bold text-white mt-1">
            {inquiryCount.toString().padStart(2, "0")}
          </div>
          <div className="font-parkinsans text-[9px] tracking-[0.15em] text-emerald-500 mt-2">
            ACROSS ALL CHANNELS
          </div>
        </div>

        <div className="relative bg-[#121212] border border-white/10 p-5 rounded-[3px]">
          <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30" />
          <div className="font-parkinsans text-[9px] tracking-[0.2em] text-white/40 uppercase">
            CRITICAL LEADS
          </div>
          <div className="font-artific text-3xl sm:text-4xl font-bold text-white mt-1">
            {urgentInquiries.toString().padStart(2, "0")}
          </div>
          <div className="font-parkinsans text-[9px] tracking-[0.15em] text-amber-500 mt-2">
            ENTERPRISE PRIORITY
          </div>
        </div>

        <div className="relative bg-[#121212] border border-white/10 p-5 rounded-[3px]">
          <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30" />
          <div className="font-parkinsans text-[9px] tracking-[0.2em] text-white/40 uppercase">
            TEAM ROSTER
          </div>
          <div className="font-artific text-3xl sm:text-4xl font-bold text-white mt-1">
            {memberCount.toString().padStart(2, "0")}
          </div>
          <div className="font-parkinsans text-[9px] tracking-[0.15em] text-white/50 mt-2">
            PRACTITIONERS & LEADS
          </div>
        </div>
      </section>

      {/* Operational Modules Navigation — CRM, Team, Services, Settings */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Module 01: CRM */}
        <Link
          href="/dashboard/inquiries"
          className="group relative bg-[#121212] border border-white/10 hover:border-accent p-6 rounded-[3px] transition-all"
        >
          <span className="font-parkinsans text-[9px] tracking-[0.2em] text-accent uppercase">
            MODULE 01 · CRM
          </span>
          <h2 className="font-parkinsans text-xl font-bold uppercase text-white group-hover:text-accent mt-1 transition-colors">
            CLIENT INTAKE & COMMUNICATIONS
          </h2>
          <p className="font-artific text-xs text-white/60 mt-2 leading-relaxed">
            Triage incoming website leads, review project scopes, access direct contact triggers, and log internal team notes.
          </p>
          <div className="mt-4 flex items-center gap-2 font-parkinsans text-[10px] tracking-[0.15em] text-white/40 group-hover:text-white uppercase transition-colors">
            <span>OPEN PIPELINE</span>
            <span>→</span>
          </div>
        </Link>

        {/* Module 02: Team & Roster */}
        <Link
          href="/dashboard/team"
          className="group relative bg-[#121212] border border-white/10 hover:border-accent p-6 rounded-[3px] transition-all"
        >
          <span className="font-parkinsans text-[9px] tracking-[0.2em] text-accent uppercase">
            MODULE 02 · {role === "OPERATIONS_LEAD" ? "REF" : "CMS"}
          </span>
          <h2 className="font-parkinsans text-xl font-bold uppercase text-white group-hover:text-accent mt-1 transition-colors">
            {role === "OPERATIONS_LEAD" ? "TEAM PRACTITIONER DIRECTORY" : "TEAM & LEADERSHIP ROSTER"}
          </h2>
          <p className="font-artific text-xs text-white/60 mt-2 leading-relaxed">
            {role === "OPERATIONS_LEAD"
              ? "Reference practitioner disciplines and skillsets to assign technical leads to client briefs."
              : "Manage leadership profiles, practitioner specialties, social handles, and headshots."}
          </p>
          <div className="mt-4 flex items-center gap-2 font-parkinsans text-[10px] tracking-[0.15em] text-white/40 group-hover:text-white uppercase transition-colors">
            <span>{role === "OPERATIONS_LEAD" ? "VIEW DIRECTORY" : "MANAGE TEAM"}</span>
            <span>→</span>
          </div>
        </Link>

        {/* Module 03: Practice Pillars */}
        <Link
          href="/dashboard/services"
          className="group relative bg-[#121212] border border-white/10 hover:border-accent p-6 rounded-[3px] transition-all"
        >
          <span className="font-parkinsans text-[9px] tracking-[0.2em] text-accent uppercase">
            MODULE 03 · {role === "OPERATIONS_LEAD" ? "REF" : "CMS"}
          </span>
          <h2 className="font-parkinsans text-xl font-bold uppercase text-white group-hover:text-accent mt-1 transition-colors">
            {role === "OPERATIONS_LEAD" ? "PRACTICE PILLARS & SCOPE" : "PRACTICE PILLARS & SERVICES"}
          </h2>
          <p className="font-artific text-xs text-white/60 mt-2 leading-relaxed">
            {role === "OPERATIONS_LEAD"
              ? "Reference the practice pillars, capabilities matrix, and deliverables when scoping proposals."
              : "Edit the practice pillars, capabilities table matrix, and service deliverables."}
          </p>
          <div className="mt-4 flex items-center gap-2 font-parkinsans text-[10px] tracking-[0.15em] text-white/40 group-hover:text-white uppercase transition-colors">
            <span>{role === "OPERATIONS_LEAD" ? "VIEW PILLARS" : "MANAGE SERVICES"}</span>
            <span>→</span>
          </div>
        </Link>

        {/* Module 04: System Settings (Super Admin Only) */}
        {role === "SUPER_ADMIN" && (
          <Link
            href="/dashboard/settings"
            className="group relative bg-[#121212] border border-white/10 hover:border-accent p-6 rounded-[3px] transition-all sm:col-span-2 lg:col-span-3"
          >
            <span className="font-parkinsans text-[9px] tracking-[0.2em] text-accent uppercase">
              MODULE 04 · SYSTEM CONTROL
            </span>
            <h2 className="font-parkinsans text-xl font-bold uppercase text-white group-hover:text-accent mt-1 transition-colors">
              SYSTEM SETTINGS, USER GOVERNANCE & AUDIT LOGS
            </h2>
            <p className="font-artific text-xs text-white/60 mt-2 leading-relaxed max-w-2xl">
              Configure real-time Telegram / Discord / webhook notification alerts, provision and manage operators, review immutable mutation audit trails, and maintain brand parameters.
            </p>
            <div className="mt-4 flex items-center gap-2 font-parkinsans text-[10px] tracking-[0.15em] text-white/40 group-hover:text-white uppercase transition-colors">
              <span>MANAGE SYSTEM</span>
              <span>→</span>
            </div>
          </Link>
        )}
      </section>

      {/* Bottom Data Section: Always Inquiries Telemetry */}
      <section className="bg-[#121212] border border-white/10 rounded-[3px] p-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div>
            <h3 className="font-parkinsans text-lg font-bold uppercase text-white">
              RECENT INTAKE TELEMETRY
            </h3>
            <p className="font-parkinsans text-[10px] tracking-[0.15em] text-white/40 uppercase">
              LATEST CLIENT INQUIRIES RECEIVED ACROSS PLATFORM
            </p>
          </div>
          <Link
            href="/dashboard/inquiries"
            className="font-parkinsans text-[10px] tracking-[0.2em] text-accent hover:underline uppercase font-bold"
          >
            VIEW ALL INTAKES ({inquiryCount}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans">
            <thead>
              <tr className="border-b border-white/10 font-parkinsans text-[9px] tracking-[0.2em] text-white/40 uppercase">
                <th className="py-2.5 px-3">TELEMETRY CODE</th>
                <th className="py-2.5 px-3">CLIENT / COMPANY</th>
                <th className="py-2.5 px-3">DISCIPLINE</th>
                <th className="py-2.5 px-3">BUDGET RANGE</th>
                <th className="py-2.5 px-3">STATUS</th>
                <th className="py-2.5 px-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-parkinsans text-xs">
              {recentInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-white/40 font-parkinsans text-xs uppercase tracking-wider">
                    No inquiries recorded in the intake telemetry registry yet.
                  </td>
                </tr>
              ) : (
                recentInquiries.map((inq) => (
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
                        className="inline-flex items-center px-2.5 py-1 bg-white/[0.03] hover:bg-accent hover:text-black border border-white/15 text-white/80 font-parkinsans text-[9px] tracking-wider uppercase rounded-[2px] transition-colors"
                      >
                        OPEN DOSSIER →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
