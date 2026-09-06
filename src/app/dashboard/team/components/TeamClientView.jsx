"use client";

import React, { useState } from "react";
import Link from "next/link";

const DIVISIONS = [
  { key: "ALL", label: "ALL CADRES" },
  { key: "EXECUTIVE_LEADERSHIP", label: "EXECUTIVE LEADERSHIP" },
  { key: "ENGINEERING_PRACTITIONER", label: "ENGINEERING PRACTITIONERS" },
  { key: "CREATIVE_DIRECTOR", label: "CREATIVE & BRAND" },
  { key: "ADVISOR", label: "ADVISORS" },
];

export default function TeamClientView({ initialMembers = [] }) {
  const [members, setMembers] = useState(initialMembers);
  const [divisionFilter, setDivisionFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "table"
  const [isUpdating, setIsUpdating] = useState(false);

  const filtered = members.filter((m) => {
    const matchesDiv = divisionFilter === "ALL" || m.division === divisionFilter;
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.roleTitle.toLowerCase().includes(search.toLowerCase()) ||
      m.focusTag.toLowerCase().includes(search.toLowerCase()) ||
      m.bio.toLowerCase().includes(search.toLowerCase());

    return matchesDiv && matchesSearch;
  });

  const handleToggleActive = async (id, currentActive) => {
    setIsUpdating(true);
    const newActive = !currentActive;

    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, active: newActive } : m))
    );

    try {
      const res = await fetch(`/api/team/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: newActive }),
      });
      if (!res.ok) throw new Error("Update failed");
    } catch {
      setMembers(initialMembers);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to remove ${name} from the roster?`)) return;

    setMembers((prev) => prev.filter((m) => m.id !== id));
    try {
      const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    } catch {
      setMembers(initialMembers);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Search & Filter Strip */}
      <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px] flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Division Tabs */}
        <div className="flex flex-wrap items-center gap-1">
          {DIVISIONS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setDivisionFilter(tab.key)}
              className={`py-1.5 px-3 rounded-[2px] font-azeret text-[10px] tracking-[0.15em] uppercase transition-colors ${
                divisionFilter === tab.key
                  ? "bg-accent text-black font-bold"
                  : "bg-white/[0.04] hover:bg-white/10 text-white/70"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* View Mode */}
        <div className="flex items-center gap-2 font-azeret text-[10px] tracking-[0.15em] uppercase">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1.5 rounded-[2px] transition-colors ${
              viewMode === "grid"
                ? "bg-white/20 text-white font-bold"
                : "bg-white/[0.03] text-white/40 hover:text-white"
            }`}
          >
            GRID
          </button>
          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={`px-3 py-1.5 rounded-[2px] transition-colors ${
              viewMode === "table"
                ? "bg-white/20 text-white font-bold"
                : "bg-white/[0.03] text-white/40 hover:text-white"
            }`}
          >
            TABLE
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search team by name, specialty, role, or biographical focus..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#121212] border border-white/10 px-4 py-2.5 text-white font-azeret text-xs rounded-[2px] focus:border-accent outline-none"
        />
      </div>

      {/* GRID VIEW */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((m) => (
            <div
              key={m.id}
              className="group bg-[#121212] border border-white/10 hover:border-accent/40 rounded-[3px] overflow-hidden flex flex-col justify-between transition-all"
            >
              <div>
                <div className="relative aspect-4/3 bg-black/60 overflow-hidden border-b border-white/10">
                  <img
                    src={m.photoUrl || "/image/team/leadership/WQF__0000_Founder-IgorTulchinsky.webp"}
                    alt={m.name}
                    className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 font-azeret text-[8px] tracking-[0.2em] bg-black/80 px-2 py-0.5 rounded-[2px] text-accent border border-accent/30 uppercase">
                    {m.division.replace("_", " ")}
                  </div>
                  <div className="absolute top-2.5 right-2.5">
                    <span
                      className={`font-azeret text-[8px] tracking-wider px-2 py-0.5 rounded-[2px] uppercase font-bold ${
                        m.active
                          ? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-400"
                          : "bg-white/10 text-white/40"
                      }`}
                    >
                      {m.active ? "ACTIVE" : "HIDDEN"}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-2.5">
                  <h3 className="font-roc text-lg font-bold uppercase text-white group-hover:text-accent transition-colors leading-tight">
                    {m.name}
                  </h3>

                  <div className="font-azeret text-[10px] tracking-[0.1em] text-white/50 uppercase">
                    {m.roleTitle}
                  </div>

                  <div className="font-mono text-[9px] text-accent truncate">
                    {m.focusTag}
                  </div>

                  <p className="font-sans text-xs text-white/60 line-clamp-2 leading-relaxed pt-2 border-t border-white/5">
                    {m.bio}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/10 bg-black/30 flex items-center justify-between font-azeret text-[9px] tracking-[0.15em] uppercase">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => handleToggleActive(m.id, m.active)}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    {m.active ? "DEACTIVATE" : "ACTIVATE"}
                  </button>
                  <span className="text-white/20">|</span>
                  <button
                    type="button"
                    onClick={() => handleDelete(m.id, m.name)}
                    className="text-rose-400/60 hover:text-rose-400 transition-colors"
                  >
                    REMOVE
                  </button>
                </div>

                <Link
                  href={`/dashboard/team/${m.id}`}
                  className="py-1 px-2.5 bg-white/[0.05] hover:bg-white/10 border border-white/15 text-white rounded-[2px] transition-colors"
                >
                  EDIT PROFILE →
                </Link>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-3 p-12 bg-[#121212] border border-white/10 rounded-[3px] text-center font-azeret text-xs text-white/40 uppercase tracking-widest">
              NO ROSTER PROFILES MATCHING FILTER
            </div>
          )}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === "table" && (
        <div className="bg-[#121212] border border-white/10 rounded-[3px] overflow-x-auto">
          <table className="w-full text-left border-collapse font-azeret text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-black/40 text-[9px] tracking-[0.2em] text-white/40 uppercase">
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">NAME</th>
                <th className="py-3 px-4">ROLE TITLE</th>
                <th className="py-3 px-4">CADRE</th>
                <th className="py-3 px-4">DISCIPLINE FOCUS</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4">
                    <span
                      className={`font-azeret text-[8px] tracking-wider px-2 py-0.5 rounded-[2px] uppercase font-bold ${
                        m.active
                          ? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-400"
                          : "bg-white/10 text-white/40"
                      }`}
                    >
                      {m.active ? "ACTIVE" : "HIDDEN"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-roc text-sm font-bold text-white uppercase">{m.name}</div>
                  </td>
                  <td className="py-3 px-4 font-azeret text-[10px] text-white/70">{m.roleTitle}</td>
                  <td className="py-3 px-4 font-azeret text-[9px] text-accent">
                    {m.division.replace("_", " ")}
                  </td>
                  <td className="py-3 px-4 font-mono text-[9px] text-white/50 truncate max-w-xs">
                    {m.focusTag}
                  </td>
                  <td className="py-3 px-4 text-right font-azeret text-[9px] tracking-wider uppercase">
                    <Link
                      href={`/dashboard/team/${m.id}`}
                      className="py-1 px-2.5 bg-white/[0.05] hover:bg-white/10 border border-white/15 text-white rounded-[2px]"
                    >
                      EDIT
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
