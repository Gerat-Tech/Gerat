"use client";

import React, { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  "ALL DISCIPLINES",
  "ENTERPRISE ERP",
  "PUBLIC SECTOR",
  "AI & RAG NETWORKS",
  "BRAND & IDENTITY",
  "DISTRIBUTED CORE",
  "FINTECH SWITCH",
  "HEALTHCARE INFRASTRUCTURE",
  "INDUSTRIAL IOT",
];

export default function PortfolioClientView({ initialCaseStudies = [] }) {
  const [caseStudies, setCaseStudies] = useState(initialCaseStudies);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL DISCIPLINES");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "table"
  const [isUpdating, setIsUpdating] = useState(false);

  // Filter case studies
  const filtered = caseStudies.filter((item) => {
    let matchesFilter = true;
    if (activeFilter === "FEATURED") matchesFilter = item.featured === true;
    else if (activeFilter === "ENTERPRISE") matchesFilter = item.category.includes("ENTERPRISE");
    else if (activeFilter === "BRAND") matchesFilter = item.category.includes("BRAND");

    const matchesCategory =
      categoryFilter === "ALL DISCIPLINES" || item.category === categoryFilter;

    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.slug.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase()) ||
      item.metric.toLowerCase().includes(search.toLowerCase()) ||
      item.techStack.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesCategory && matchesSearch;
  });

  // Toggle Featured status
  const handleToggleFeatured = async (id, currentFeatured) => {
    setIsUpdating(true);
    const newFeatured = !currentFeatured;

    setCaseStudies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, featured: newFeatured } : c))
    );

    try {
      const res = await fetch(`/api/portfolio/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: newFeatured }),
      });
      if (!res.ok) throw new Error("Update failed");
    } catch {
      setCaseStudies(initialCaseStudies);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete case study
  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete case study "${title}"?`)) return;

    setCaseStudies((prev) => prev.filter((c) => c.id !== id));
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    } catch {
      setCaseStudies(initialCaseStudies);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Search & Filter Strip */}
      <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px] flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Quick Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1">
          {[
            { key: "ALL", label: "ALL CASE STUDIES" },
            { key: "FEATURED", label: "HOMEPAGE FEATURED" },
            { key: "ENTERPRISE", label: "ENTERPRISE ERP" },
            { key: "BRAND", label: "BRAND & IDENTITY" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              className={`py-1.5 px-3 rounded-[2px] font-azeret text-[10px] tracking-[0.15em] uppercase transition-colors ${
                activeFilter === tab.key
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

      {/* Secondary Search & Category Dropdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-azeret text-xs">
        <div className="sm:col-span-2">
          <input
            type="text"
            placeholder="Search showcase by title, metric, technology stack, or summary..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#121212] border border-white/10 px-4 py-2.5 text-white rounded-[2px] focus:border-accent outline-none"
          />
        </div>

        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-[#121212] border border-white/10 px-3 py-2.5 text-white rounded-[2px] focus:border-accent outline-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* GRID VIEW */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group bg-[#121212] border border-white/10 hover:border-accent/40 rounded-[3px] overflow-hidden flex flex-col justify-between transition-all"
            >
              <div>
                {/* Image Banner */}
                <div className="relative aspect-16/9 bg-black/60 overflow-hidden border-b border-white/10">
                  <img
                    src={item.imageUrl || "/image/portfolioPage/US-AUT-3.webp"}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 font-mono text-[9px] tracking-wider bg-black/80 px-2 py-0.5 rounded-[2px] text-white/90 border border-white/20">
                    {item.num || item.displayIndex}
                  </div>
                  <div className="absolute top-2.5 right-2.5 font-azeret text-[9px] tracking-[0.15em] bg-black/80 px-2 py-0.5 rounded-[2px] text-accent border border-accent/30 uppercase">
                    {item.category}
                  </div>
                  {item.featured && (
                    <div className="absolute bottom-2.5 left-2.5 font-azeret text-[8px] tracking-[0.2em] bg-accent text-black font-bold px-2 py-0.5 rounded-[1px] uppercase">
                      HOMEPAGE
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col gap-3">
                  <div className="font-azeret text-[9px] tracking-[0.15em] text-white/40 uppercase">
                    {item.tags}
                  </div>

                  <h3 className="font-roc text-lg font-bold uppercase text-white group-hover:text-accent transition-colors leading-tight">
                    {item.title}
                  </h3>

                  <div className="font-roc text-xs font-bold text-accent uppercase tracking-tight">
                    {item.metric}
                  </div>

                  <p className="font-sans text-xs text-white/60 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="font-mono text-[9px] text-white/40 truncate">
                    {item.techStack}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 border-t border-white/10 bg-black/30 flex items-center justify-between font-azeret text-[9px] tracking-[0.15em] uppercase">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => handleToggleFeatured(item.id, item.featured)}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    {item.featured ? "UNFEATURE" : "FEATURE"}
                  </button>
                  <span className="text-white/20">|</span>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.title)}
                    className="text-rose-400/60 hover:text-rose-400 transition-colors"
                  >
                    DELETE
                  </button>
                </div>

                <Link
                  href={`/dashboard/portfolio/${item.id}`}
                  className="py-1 px-2.5 bg-white/[0.05] hover:bg-white/10 border border-white/15 text-white rounded-[2px] transition-colors"
                >
                  EDIT CASE STUDY →
                </Link>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-3 p-12 bg-[#121212] border border-white/10 rounded-[3px] text-center font-azeret text-xs text-white/40 uppercase tracking-widest">
              NO CASE STUDIES MATCHING FILTER
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
                <th className="py-3 px-4">INDEX</th>
                <th className="py-3 px-4">CASE STUDY TITLE</th>
                <th className="py-3 px-4">DISCIPLINE</th>
                <th className="py-3 px-4">PRIMARY METRIC</th>
                <th className="py-3 px-4">HOMEPAGE</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-mono text-accent font-semibold">
                    {item.displayIndex}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-roc text-sm font-bold text-white uppercase">
                      {item.title}
                    </div>
                    <div className="font-azeret text-[9px] text-white/40 truncate max-w-sm">
                      {item.tags}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-azeret text-[10px] text-white/70">
                    {item.category}
                  </td>
                  <td className="py-3 px-4 font-roc text-xs font-bold text-accent">
                    {item.metric}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-azeret text-[9px] px-2 py-0.5 rounded-[2px] uppercase font-bold ${
                        item.featured
                          ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-400"
                          : "bg-white/5 text-white/30"
                      }`}
                    >
                      {item.featured ? "FEATURED" : "STANDARD"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-azeret text-[9px] tracking-wider uppercase">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/portfolio#${item.slug}`}
                        target="_blank"
                        className="text-white/40 hover:text-accent transition-colors"
                      >
                        VIEW ↗
                      </Link>
                      <Link
                        href={`/dashboard/portfolio/${item.id}`}
                        className="py-1 px-2 bg-white/[0.05] hover:bg-white/10 border border-white/15 text-white rounded-[2px]"
                      >
                        EDIT
                      </Link>
                    </div>
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
