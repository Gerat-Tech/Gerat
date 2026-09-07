"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ServicesClientView({ initialPillars = [] }) {
  const [pillars, setPillars] = useState(initialPillars);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const filtered = pillars.filter((p) => {
    const matchesFilter =
      filter === "ALL"
        ? true
        : filter === "ACTIVE"
        ? p.active === true
        : p.active === false;

    const matchesSearch =
      p.num.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleToggleActive = async (id, currentActive) => {
    setIsUpdating(true);
    const newActive = !currentActive;

    setPillars((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: newActive } : p))
    );

    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: newActive }),
      });
      if (!res.ok) throw new Error("Update failed");
    } catch {
      setPillars(initialPillars);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete pillar "${title}"?`)) return;

    setPillars((prev) => prev.filter((p) => p.id !== id));
    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    } catch {
      setPillars(initialPillars);
    }
  };

  const parseDeliverables = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === "string" && val.startsWith("[")) {
      try {
        return JSON.parse(val);
      } catch {
        return val.split("\n").filter(Boolean);
      }
    }
    return val.split("\n").filter(Boolean);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Search & Filter Bar */}
      <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px] flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex items-center gap-2">
          {["ALL", "ACTIVE", "HIDDEN"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`py-1.5 px-3 rounded-[2px] font-azeret text-[10px] tracking-[0.15em] uppercase transition-colors ${
                filter === f
                  ? "bg-accent text-black font-bold"
                  : "bg-white/[0.04] hover:bg-white/10 text-white/70"
              }`}
            >
              {f} PILLARS
            </button>
          ))}
        </div>

        {/* Public view shortcut */}
        <a
          href="/services"
          target="_blank"
          rel="noopener noreferrer"
          className="font-azeret text-[10px] tracking-[0.15em] text-white/50 hover:text-accent uppercase flex items-center gap-1"
        >
          <span>VIEW LIVE /SERVICES PAGE</span>
          <span>↗</span>
        </a>
      </div>

      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search pillars by index, title, tagline, or scope..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#121212] border border-white/10 px-4 py-2.5 text-white font-azeret text-xs rounded-[2px] focus:border-accent outline-none"
        />
      </div>

      {/* Grid of Practice Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((pillar) => {
          const deliverables = parseDeliverables(pillar.deliverables);
          return (
            <div
              key={pillar.id}
              className="group relative bg-[#121212] border border-white/10 hover:border-accent/40 rounded-[3px] p-6 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-azeret text-xs font-bold text-accent">
                      PRACTICE // {pillar.num}
                    </span>
                    <span className="font-mono text-[9px] text-white/30">
                      (ORDER: {pillar.order})
                    </span>
                  </div>

                  <span
                    className={`font-azeret text-[8px] tracking-wider px-2 py-0.5 rounded-[2px] uppercase font-bold ${
                      pillar.active
                        ? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-400"
                        : "bg-white/10 text-white/40"
                    }`}
                  >
                    {pillar.active ? "ACTIVE" : "HIDDEN"}
                  </span>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <span className="font-azeret text-[9px] tracking-[0.15em] text-white/50 uppercase">
                    {pillar.tagline}
                  </span>
                  <h3 className="font-roc text-lg font-bold uppercase text-white group-hover:text-accent transition-colors leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-xs text-white/70 line-clamp-3 leading-relaxed mt-1">
                    {pillar.desc}
                  </p>
                </div>

                {deliverables.length > 0 && (
                  <div className="pt-3 border-t border-white/5 mb-4">
                    <span className="font-azeret text-[8px] tracking-[0.2em] text-white/40 uppercase block mb-2">
                      SAMPLE DELIVERABLES ({deliverables.length})
                    </span>
                    <ul className="space-y-1 font-azeret text-[9px] tracking-wider text-white/50">
                      {deliverables.slice(0, 3).map((d, i) => (
                        <li key={i} className="truncate flex items-center gap-1.5">
                          <span className="text-accent">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                      {deliverables.length > 3 && (
                        <li className="text-white/30 italic">
                          +{deliverables.length - 3} more items...
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {pillar.deepLink && (
                  <div className="font-mono text-[9px] text-accent/80 truncate mb-4">
                    LINK: {pillar.deepLink}
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-azeret text-[9px] tracking-[0.15em] uppercase">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => handleToggleActive(pillar.id, pillar.active)}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    {pillar.active ? "DEACTIVATE" : "ACTIVATE"}
                  </button>
                  <span className="text-white/20">|</span>
                  <button
                    type="button"
                    onClick={() => handleDelete(pillar.id, pillar.title)}
                    className="text-rose-400/60 hover:text-rose-400 transition-colors"
                  >
                    DELETE
                  </button>
                </div>

                <Link
                  href={`/dashboard/services/${pillar.id}`}
                  className="py-1 px-2.5 bg-white/[0.05] hover:bg-white/10 border border-white/15 text-white rounded-[2px] transition-colors"
                >
                  EDIT PILLAR →
                </Link>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-3 p-12 bg-[#121212] border border-white/10 rounded-[3px] text-center font-azeret text-xs text-white/40 uppercase tracking-widest">
            NO PRACTICE PILLARS MATCHING QUERY
          </div>
        )}
      </div>
    </div>
  );
}
