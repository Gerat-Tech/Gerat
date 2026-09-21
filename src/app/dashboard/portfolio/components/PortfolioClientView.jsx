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
  const [toast, setToast] = useState(null);

  const showToast = (message, isError = false) => {
    setToast({ message, isError });
    setTimeout(() => setToast(null), 3500);
  };

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
    const target = caseStudies.find((c) => c.id === id);

    setCaseStudies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, featured: newFeatured } : c))
    );

    try {
      const res = await fetch(`/api/portfolio/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: newFeatured }),
      });
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Failed to update status (HTTP ${res.status})`);
      }
      const data = await res.json();
      if (data.caseStudy) {
        setCaseStudies((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, featured: Boolean(data.caseStudy.featured) } : c
          )
        );
      }
      showToast(
        newFeatured
          ? `"${target?.title || "Case study"}" is now FEATURED on the homepage.`
          : `"${target?.title || "Case study"}" UNFEATURED (removed from homepage).`
      );
    } catch (err) {
      setCaseStudies((prev) =>
        prev.map((c) => (c.id === id ? { ...c, featured: currentFeatured } : c))
      );
      showToast(err.message || "Failed to update featured status. Please try again.", true);
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
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Failed to delete case study (HTTP ${res.status})`);
      }
      showToast(`Case study "${title}" removed.`);
    } catch (err) {
      setCaseStudies(initialCaseStudies);
      showToast(err.message || "Failed to delete case study.", true);
    }
  };

  const featuredCount = caseStudies.filter((c) => c.featured).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Search & Filter Strip */}
      <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px] flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Quick Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1">
          {[
            { key: "ALL", label: `ALL CASE STUDIES (${caseStudies.length})` },
            { key: "FEATURED", label: `HOMEPAGE FEATURED (${featuredCount})` },
            { key: "ENTERPRISE", label: "ENTERPRISE ERP" },
            { key: "BRAND", label: "BRAND & IDENTITY" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              className={`py-1.5 px-3 rounded-[2px] font-parkinsans text-[10px] tracking-[0.15em] uppercase transition-colors ${
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
        <div className="flex items-center gap-2 font-parkinsans text-[10px] tracking-[0.15em] uppercase">
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-parkinsans text-xs">
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
                  <div className="absolute top-2.5 right-2.5 font-parkinsans text-[9px] tracking-[0.15em] bg-black/80 px-2 py-0.5 rounded-[2px] text-accent border border-accent/30 uppercase">
                    {item.category}
                  </div>
                  {item.featured && (
                    <div className="absolute bottom-2.5 left-2.5 font-parkinsans text-[8px] tracking-[0.2em] bg-accent text-black font-bold px-2 py-0.5 rounded-[1px] uppercase">
                      HOMEPAGE
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col gap-3">
                  <div className="font-parkinsans text-[9px] tracking-[0.15em] text-white/40 uppercase">
                    {item.tags}
                  </div>

                  <h3 className="font-parkinsans text-lg font-bold uppercase text-white group-hover:text-accent transition-colors leading-tight">
                    {item.title}
                  </h3>

                  <div className="font-artific text-xs font-bold text-accent uppercase tracking-tight">
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
              <div className="p-4 border-t border-white/10 bg-black/30 flex items-center justify-between font-parkinsans text-[9px] tracking-[0.15em] uppercase">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => handleToggleFeatured(item.id, item.featured)}
                    className={`font-parkinsans text-[9px] px-2.5 py-1 rounded-[2px] transition-all font-bold uppercase cursor-pointer ${
                      item.featured
                        ? "bg-accent text-black hover:bg-accent/80 shadow-sm"
                        : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/15"
                    }`}
                  >
                    {item.featured ? "★ UNFEATURE" : "☆ FEATURE"}
                  </button>
                  <span className="text-white/20">|</span>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.title)}
                    className="text-rose-400/60 hover:text-rose-400 transition-colors cursor-pointer"
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
            <div className="col-span-full p-12 bg-[#121212] border border-dashed border-white/15 rounded-[3px] text-center flex flex-col items-center justify-center gap-2">
              <span className="font-parkinsans text-[10px] tracking-[0.2em] text-accent uppercase font-bold">
                HOMEPAGE SPOTLIGHT // NO ACTIVE ITEMS
              </span>
              <div className="font-parkinsans text-sm uppercase text-white font-semibold">
                {activeFilter === "FEATURED"
                  ? "THERE ARE NO FINISHED PROJECTS FEATURED NOW"
                  : "NO CASE STUDIES MATCHING FILTER"}
              </div>
              <p className="font-artific text-xs text-white/50 max-w-md">
                {activeFilter === "FEATURED"
                  ? "Completed projects featured from this dashboard will be spotlighted on the homepage. Toggle \"FEATURE\" on any project below to display it."
                  : "Try clearing your search query or selecting a different category."}
              </p>
            </div>
          )}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === "table" && (
        <div className="bg-[#121212] border border-white/10 rounded-[3px] overflow-x-auto">
          <table className="w-full text-left border-collapse font-parkinsans text-xs">
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
                    <div className="font-artific text-sm font-bold text-white uppercase">
                      {item.title}
                    </div>
                    <div className="font-parkinsans text-[9px] text-white/40 truncate max-w-sm">
                      {item.tags}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-parkinsans text-[10px] text-white/70">
                    {item.category}
                  </td>
                  <td className="py-3 px-4 font-artific text-xs font-bold text-accent">
                    {item.metric}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() => handleToggleFeatured(item.id, item.featured)}
                      className={`font-parkinsans text-[9px] px-2.5 py-1 rounded-[2px] uppercase font-bold transition-all cursor-pointer ${
                        item.featured
                          ? "bg-accent text-black hover:bg-accent/80 shadow-sm"
                          : "bg-white/5 text-white/40 hover:text-white hover:bg-white/10 border border-white/10"
                      }`}
                      title={item.featured ? "Click to remove from homepage" : "Click to feature on homepage"}
                    >
                      {item.featured ? "★ FEATURED" : "☆ UNFEATURED"}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right font-parkinsans text-[9px] tracking-wider uppercase">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleToggleFeatured(item.id, item.featured)}
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-[2px] uppercase transition-colors cursor-pointer ${
                          item.featured
                            ? "text-accent hover:underline"
                            : "text-white/40 hover:text-white"
                        }`}
                      >
                        {item.featured ? "UNFEATURE" : "FEATURE"}
                      </button>
                      <span className="text-white/20">|</span>
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
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 px-4 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="font-parkinsans text-[10px] tracking-[0.2em] text-accent uppercase font-bold">
                        HOMEPAGE SPOTLIGHT // NO ACTIVE ITEMS
                      </span>
                      <div className="font-parkinsans text-sm uppercase text-white font-semibold">
                        {activeFilter === "FEATURED"
                          ? "THERE ARE NO FINISHED PROJECTS FEATURED NOW"
                          : "NO CASE STUDIES MATCHING FILTER"}
                      </div>
                      <p className="font-artific text-xs text-white/50 max-w-md">
                        {activeFilter === "FEATURED"
                          ? "Completed projects featured from this dashboard will be spotlighted on the homepage."
                          : "Try selecting another discipline or clearing your search."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Floating Action Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-[3px] border font-parkinsans text-xs tracking-wider uppercase font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200 ${
            toast.isError
              ? "bg-rose-950/90 border-rose-500/50 text-rose-200"
              : "bg-emerald-950/90 border-emerald-500/50 text-emerald-200"
          }`}
        >
          <span>{toast.isError ? "⚠" : "✓"}</span>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
