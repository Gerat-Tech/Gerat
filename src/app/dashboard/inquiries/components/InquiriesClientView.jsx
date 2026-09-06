"use client";

import React, { useState } from "react";
import Link from "next/link";
import StatusBadge from "@/components/dashboard/common/StatusBadge";

const STAGES = [
  { key: "NEW_INTAKE", label: "NEW INTAKE", accent: "border-accent" },
  { key: "TRIAGED", label: "TRIAGED", accent: "border-blue-500" },
  { key: "DISCOVERY_SCHEDULED", label: "DISCOVERY CALL", accent: "border-purple-500" },
  { key: "PROPOSAL_SENT", label: "PROPOSAL SENT", accent: "border-amber-500" },
  { key: "IN_NEGOTIATION", label: "NEGOTIATION", accent: "border-cyan-500" },
  { key: "COMMISSIONED", label: "COMMISSIONED", accent: "border-emerald-500" },
  { key: "ARCHIVED", label: "ARCHIVED", accent: "border-zinc-700" },
];

export default function InquiriesClientView({ initialInquiries = [] }) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [viewMode, setViewMode] = useState("kanban"); // "kanban" | "table"
  const [search, setSearch] = useState("");
  const [disciplineFilter, setDisciplineFilter] = useState("ALL");

  // Filter inquiries
  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.fullName.toLowerCase().includes(search.toLowerCase()) ||
      (inq.company && inq.company.toLowerCase().includes(search.toLowerCase())) ||
      inq.telemetryCode.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase());

    const matchesDiscipline =
      disciplineFilter === "ALL" ||
      inq.discipline.toUpperCase().includes(disciplineFilter.toUpperCase());

    return matchesSearch && matchesDiscipline;
  });

  const handleAdvanceStage = async (id, currentStatus) => {
    const stageOrder = STAGES.map((s) => s.key);
    const currentIndex = stageOrder.indexOf(currentStatus);
    if (currentIndex === -1 || currentIndex >= stageOrder.length - 1) return;

    const nextStatus = stageOrder[currentIndex + 1];

    // Optimistic UI update
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: nextStatus } : item))
    );

    try {
      await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
    } catch {
      // Revert on error
      setInquiries(initialInquiries);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Control Bar: Search, Filter, View Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-[#121212] border border-white/10 rounded-[3px]">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, company, or telemetry code..."
            className="w-full bg-black/50 border border-white/10 px-3.5 py-2 pl-9 rounded-[2px] font-sans text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
          />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="size-4 text-white/30 absolute left-3 top-2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filters & View Toggles */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Discipline Select */}
          <select
            value={disciplineFilter}
            onChange={(e) => setDisciplineFilter(e.target.value)}
            className="bg-black/50 border border-white/10 text-white px-3 py-2 rounded-[2px] font-azeret text-[10px] tracking-wider uppercase outline-none focus:border-accent"
          >
            <option value="ALL">ALL DISCIPLINES</option>
            <option value="ARCHITECTURE">SOFTWARE ARCHITECTURE</option>
            <option value="AI">AI & RAG NETWORKS</option>
            <option value="ERP">CUSTOM ERP</option>
            <option value="PUBLIC">PUBLIC SECTOR</option>
            <option value="BRAND">BRAND & IDENTITY</option>
            <option value="PERSONAL">PERSONAL BRANDING</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-white/10 rounded-[2px] bg-black/40 p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("kanban")}
              className={`px-3 py-1.5 font-azeret text-[9px] tracking-wider uppercase rounded-[1px] transition-colors ${
                viewMode === "kanban"
                  ? "bg-accent text-white font-bold"
                  : "text-white/50 hover:text-white"
              }`}
            >
              KANBAN
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`px-3 py-1.5 font-azeret text-[9px] tracking-wider uppercase rounded-[1px] transition-colors ${
                viewMode === "table"
                  ? "bg-accent text-white font-bold"
                  : "text-white/50 hover:text-white"
              }`}
            >
              DATA GRID
            </button>
          </div>
        </div>
      </div>

      {/* View Mode Rendering */}
      {viewMode === "kanban" ? (
        /* Kanban Pipeline Columns */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3 overflow-x-auto pb-6">
          {STAGES.map((stage) => {
            const stageInquiries = filtered.filter((i) => i.status === stage.key);

            return (
              <div
                key={stage.key}
                className="flex flex-col bg-[#0e0e0e] border border-white/10 rounded-[3px] min-w-[260px] h-[calc(100vh-320px)] min-h-[500px]"
              >
                {/* Stage Column Header */}
                <div className={`p-3 border-b border-white/10 flex items-center justify-between border-t-2 ${stage.accent}`}>
                  <span className="font-azeret text-[10px] tracking-[0.15em] font-semibold text-white/80 uppercase">
                    {stage.label}
                  </span>
                  <span className="font-azeret text-[10px] tracking-wider text-white/40 px-1.5 py-0.5 rounded bg-white/5">
                    {stageInquiries.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="flex-1 p-2.5 overflow-y-auto flex flex-col gap-2.5 divide-y-0">
                  {stageInquiries.length === 0 ? (
                    <div className="h-28 flex items-center justify-center border border-dashed border-white/5 rounded text-center p-3">
                      <span className="font-azeret text-[9px] tracking-widest text-white/20 uppercase">
                        NO INTAKES
                      </span>
                    </div>
                  ) : (
                    stageInquiries.map((inq) => {
                      const cleanPhone = inq.phone.replace(/[^0-9+]/g, "");
                      const encodedWa = encodeURIComponent(
                        `Hello ${inq.fullName}, this is Gerat Software Solutions PLC regarding your inquiry for ${inq.discipline} (Ref: ${inq.telemetryCode}). We would like to schedule a discovery discussion.`
                      );

                      return (
                        <div
                          key={inq.id}
                          className="group relative bg-[#141414] border border-white/10 hover:border-accent p-3.5 rounded-[3px] transition-all flex flex-col gap-2.5 shadow-sm"
                        >
                          {/* Card Header: Code & Date */}
                          <div className="flex items-center justify-between">
                            <span className="font-azeret text-[9px] tracking-widest text-accent font-bold">
                              {inq.telemetryCode}
                            </span>
                            <span className="font-azeret text-[8px] tracking-wider text-white/30">
                              {new Date(inq.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>

                          {/* Client & Company */}
                          <div>
                            <div className="font-roc text-sm font-semibold text-white group-hover:text-accent transition-colors leading-tight">
                              {inq.fullName}
                            </div>
                            {inq.company && (
                              <div className="font-azeret text-[9px] tracking-wider text-white/40 truncate">
                                {inq.company}
                              </div>
                            )}
                          </div>

                          {/* Discipline & Budget */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-azeret text-[8px] tracking-wider px-1.5 py-0.5 rounded-[1px] bg-white/[0.04] border border-white/10 text-white/70 uppercase truncate max-w-[170px]">
                              {inq.discipline}
                            </span>
                            <span className="font-azeret text-[8px] tracking-wider px-1.5 py-0.5 rounded-[1px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                              {inq.budgetRange}
                            </span>
                          </div>

                          {/* 1-Click Action Buttons Strip */}
                          <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-1.5">
                            <div className="flex items-center gap-1">
                              {/* 1-Click WhatsApp Trigger */}
                              <a
                                href={`https://wa.me/${cleanPhone.replace("+", "")}?text=${encodedWa}`}
                                target="_blank"
                                rel="noreferrer"
                                title="Chat on WhatsApp"
                                className="size-6 bg-emerald-500/15 hover:bg-emerald-500 hover:text-black text-emerald-400 border border-emerald-500/40 rounded-[2px] flex items-center justify-center transition-colors"
                              >
                                <span className="font-azeret text-[9px] font-bold">W</span>
                              </a>

                              {/* 1-Click Phone Call Trigger */}
                              <a
                                href={`tel:${cleanPhone}`}
                                title={`Direct Dial: ${inq.phone}`}
                                className="size-6 bg-blue-500/15 hover:bg-blue-500 hover:text-white text-blue-400 border border-blue-500/40 rounded-[2px] flex items-center justify-center transition-colors"
                              >
                                <span className="font-azeret text-[9px] font-bold">☎</span>
                              </a>
                            </div>

                            <div className="flex items-center gap-1">
                              {/* Open Full Dossier */}
                              <Link
                                href={`/dashboard/inquiries/${inq.id}`}
                                className="py-1 px-2 bg-white/[0.04] hover:bg-white/10 text-white font-azeret text-[8px] tracking-wider uppercase rounded-[2px] transition-colors"
                              >
                                DOSSIER →
                              </Link>

                              {/* Advance Stage Button */}
                              {stage.key !== "COMMISSIONED" && stage.key !== "ARCHIVED" && (
                                <button
                                  type="button"
                                  onClick={() => handleAdvanceStage(inq.id, inq.status)}
                                  title="Advance to next pipeline stage"
                                  className="size-6 bg-white/[0.03] hover:bg-accent hover:text-black border border-white/10 text-white/50 rounded-[2px] flex items-center justify-center transition-colors"
                                >
                                  →
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Data Grid Table View */
        <div className="bg-[#121212] border border-white/10 rounded-[3px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans">
              <thead>
                <tr className="border-b border-white/10 font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase bg-black/40">
                  <th className="py-3 px-4">TELEMETRY CODE</th>
                  <th className="py-3 px-4">CLIENT NAME & COMPANY</th>
                  <th className="py-3 px-4">DISCIPLINE</th>
                  <th className="py-3 px-4">TIMELINE & BUDGET</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-azeret text-xs">
                {filtered.map((inq) => {
                  const cleanPhone = inq.phone.replace(/[^0-9+]/g, "");
                  const encodedWa = encodeURIComponent(
                    `Hello ${inq.fullName}, this is Gerat Software Solutions PLC regarding your inquiry for ${inq.discipline} (Ref: ${inq.telemetryCode}).`
                  );

                  return (
                    <tr key={inq.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 text-accent font-semibold tracking-wider">
                        {inq.telemetryCode}
                      </td>
                      <td className="py-3.5 px-4 text-white">
                        <div className="font-semibold text-sm">{inq.fullName}</div>
                        <div className="text-[10px] text-white/40">
                          {inq.company || "Direct Client"} {"//"} {inq.phone}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-white/70">
                        <span className="inline-block px-2 py-0.5 rounded-[2px] bg-white/[0.03] border border-white/10 text-[9px]">
                          {inq.discipline}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-white/70">
                        <div className="text-[11px] text-emerald-400 font-semibold">{inq.budgetRange}</div>
                        <div className="text-[9px] text-white/40">{inq.timeline}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={inq.status} />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <a
                            href={`https://wa.me/${cleanPhone.replace("+", "")}?text=${encodedWa}`}
                            target="_blank"
                            rel="noreferrer"
                            className="size-7 bg-emerald-500/15 hover:bg-emerald-500 hover:text-black text-emerald-400 border border-emerald-500/40 rounded-[2px] flex items-center justify-center transition-colors text-[10px] font-bold"
                            title="Chat on WhatsApp"
                          >
                            W
                          </a>
                          <a
                            href={`tel:${cleanPhone}`}
                            className="size-7 bg-blue-500/15 hover:bg-blue-500 hover:text-white text-blue-400 border border-blue-500/40 rounded-[2px] flex items-center justify-center transition-colors text-[10px]"
                            title="Call client"
                          >
                            ☎
                          </a>
                          <Link
                            href={`/dashboard/inquiries/${inq.id}`}
                            className="py-1.5 px-3 bg-white/[0.04] hover:bg-accent hover:text-black border border-white/15 text-white font-azeret text-[9px] tracking-wider uppercase rounded-[2px] transition-colors"
                          >
                            OPEN DOSSIER →
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
