import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import InquiriesClientView from "./components/InquiriesClientView";

export const metadata = {
  title: "Inquiries & CRM Pipeline // Gerat Mission Control",
  description: "Lead Triage, Telemetry Intake, and Client Engagement Management",
};

export default async function InquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      assignedTo: {
        select: { id: true, name: true, role: true },
      },
      notes: {
        select: { id: true },
      },
      communications: {
        select: { id: true },
      },
    },
  });

  // Calculate high-level pipeline stats
  const total = inquiries.length;
  const newIntakes = inquiries.filter((i) => i.status === "NEW_INTAKE").length;
  const inNegotiation = inquiries.filter((i) =>
    ["DISCOVERY_SCHEDULED", "PROPOSAL_SENT", "IN_NEGOTIATION"].includes(i.status)
  ).length;
  const commissioned = inquiries.filter((i) => i.status === "COMMISSIONED").length;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-roc text-2xl sm:text-3xl font-bold tracking-tight uppercase text-white">
              CLIENT INTAKE & CRM PIPELINE
            </h1>
            <span className="font-azeret text-[9px] tracking-[0.2em] px-2 py-0.5 rounded-[2px] bg-accent/15 border border-accent/40 text-accent uppercase font-bold">
              LIVE TELEMETRY
            </span>
          </div>
          <p className="font-azeret text-[10px] tracking-[0.15em] text-white/40 uppercase mt-1">
            CAPTURE, QUALIFY, AND ADVANCE CLIENT COMMISSIONS ACROSS ALL DISCIPLINES
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="py-2 px-3 bg-white/[0.04] hover:bg-white/10 border border-white/15 text-white/80 font-azeret text-[10px] tracking-[0.15em] uppercase rounded-[2px] transition-colors"
          >
            ← COCKPIT
          </Link>
        </div>
      </div>

      {/* KPI Stats Ribbon */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
          <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
            TOTAL INTAKES
          </div>
          <div className="font-roc text-2xl sm:text-3xl font-bold text-white mt-1">
            {total.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
          <div className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase">
            NEW / UNTRIAGED
          </div>
          <div className="font-roc text-2xl sm:text-3xl font-bold text-accent mt-1">
            {newIntakes.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
          <div className="font-azeret text-[9px] tracking-[0.2em] text-cyan-400 uppercase">
            ACTIVE PIPELINE
          </div>
          <div className="font-roc text-2xl sm:text-3xl font-bold text-cyan-400 mt-1">
            {inNegotiation.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
          <div className="font-azeret text-[9px] tracking-[0.2em] text-emerald-400 uppercase">
            COMMISSIONED
          </div>
          <div className="font-roc text-2xl sm:text-3xl font-bold text-emerald-400 mt-1">
            {commissioned.toString().padStart(2, "0")}
          </div>
        </div>
      </section>

      {/* Client View Component (Kanban + Table with Search & Filters) */}
      <InquiriesClientView initialInquiries={inquiries} />
    </div>
  );
}
