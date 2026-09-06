"use client";

import React, { useState } from "react";
import Link from "next/link";
import StatusBadge from "@/components/dashboard/common/StatusBadge";

const STATUS_TABS = [
  { key: "ALL", label: "ALL PUBLICATIONS" },
  { key: "PUBLISHED", label: "PUBLISHED" },
  { key: "DRAFT", label: "DRAFTS" },
  { key: "IN_REVIEW", label: "IN REVIEW" },
  { key: "ARCHIVED", label: "ARCHIVED" },
];

const CATEGORIES = [
  "ALL CATEGORIES",
  "SYSTEM ARCHITECTURE",
  "BRAND ARCHITECTURE",
  "APPLIED AI",
  "INFRASTRUCTURE",
  "ENTERPRISE ERP",
  "CYBERSECURITY",
  "DESIGN ENGINEERING",
  "FIELD DISPATCH",
];

export default function ArticlesClientView({ initialArticles = [] }) {
  const [articles, setArticles] = useState(initialArticles);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL CATEGORIES");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "table"
  const [isUpdating, setIsUpdating] = useState(false);

  // Filter articles
  const filtered = articles.filter((art) => {
    const matchesStatus = statusFilter === "ALL" || art.status === statusFilter;
    const matchesCategory =
      categoryFilter === "ALL CATEGORIES" || art.category === categoryFilter;
    const matchesSearch =
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.slug.toLowerCase().includes(search.toLowerCase()) ||
      (art.excerpt && art.excerpt.toLowerCase().includes(search.toLowerCase())) ||
      (art.author?.name && art.author.name.toLowerCase().includes(search.toLowerCase()));

    return matchesStatus && matchesCategory && matchesSearch;
  });

  // Quick toggle status
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    setIsUpdating(true);

    // Optimistic update
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );

    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Status update failed");
    } catch {
      setArticles(initialArticles);
    } finally {
      setIsUpdating(false);
    }
  };

  // Quick delete article
  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setArticles((prev) => prev.filter((a) => a.id !== id));
    try {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    } catch {
      setArticles(initialArticles);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Search & Filter Control Strip */}
      <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px] flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setStatusFilter(tab.key)}
              className={`py-1.5 px-3 rounded-[2px] font-azeret text-[10px] tracking-[0.15em] uppercase transition-colors ${
                statusFilter === tab.key
                  ? "bg-accent text-black font-bold"
                  : "bg-white/[0.04] hover:bg-white/10 text-white/70"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1.5 rounded-[2px] font-azeret text-[10px] tracking-[0.15em] uppercase transition-colors ${
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
            className={`px-3 py-1.5 rounded-[2px] font-azeret text-[10px] tracking-[0.15em] uppercase transition-colors ${
              viewMode === "table"
                ? "bg-white/20 text-white font-bold"
                : "bg-white/[0.03] text-white/40 hover:text-white"
            }`}
          >
            TABLE
          </button>
        </div>
      </div>

      {/* Secondary Filter: Search & Category Dropdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-azeret text-xs">
        <div className="sm:col-span-2">
          <input
            type="text"
            placeholder="Search blueprints by title, abstract, keyword, or author..."
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
          {filtered.map((art) => (
            <div
              key={art.id}
              className="group bg-[#121212] border border-white/10 hover:border-accent/40 rounded-[3px] overflow-hidden flex flex-col justify-between transition-all"
            >
              {/* Card Header & Thumbnail */}
              <div>
                <div className="relative aspect-16/9 bg-black/60 overflow-hidden border-b border-white/10">
                  {art.coverImageUrl ? (
                    <img
                      src={art.coverImageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-azeret text-[10px] text-white/20">
                      NO COVER IMAGE
                    </div>
                  )}
                  <div className="absolute top-2.5 left-2.5">
                    <StatusBadge status={art.status} />
                  </div>
                  <div className="absolute top-2.5 right-2.5 font-azeret text-[9px] tracking-[0.15em] bg-black/80 px-2 py-0.5 rounded-[2px] text-accent border border-accent/30 uppercase">
                    {art.category}
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between font-azeret text-[9px] tracking-[0.15em] text-white/40 uppercase">
                    <span>{art.author?.name || "Gerät Architect"}</span>
                    <span>{art.readingTime || "5 MIN READ"}</span>
                  </div>

                  <h2 className="font-roc text-lg font-bold uppercase text-white group-hover:text-accent transition-colors leading-tight">
                    {art.title}
                  </h2>

                  {art.excerpt && (
                    <p className="font-sans text-xs text-white/60 line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 border-t border-white/10 bg-black/30 flex items-center justify-between font-azeret text-[9px] tracking-[0.15em] uppercase">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => handleToggleStatus(art.id, art.status)}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    {art.status === "PUBLISHED" ? "UNPUBLISH" : "QUICK PUBLISH"}
                  </button>
                  <span className="text-white/20">|</span>
                  <button
                    type="button"
                    onClick={() => handleDelete(art.id, art.title)}
                    className="text-rose-400/60 hover:text-rose-400 transition-colors"
                  >
                    DELETE
                  </button>
                </div>

                <Link
                  href={`/dashboard/insights/${art.id}`}
                  className="py-1 px-2.5 bg-white/[0.05] hover:bg-white/10 border border-white/15 text-white rounded-[2px] transition-colors"
                >
                  EDIT BLUEPRINT →
                </Link>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-3 p-12 bg-[#121212] border border-white/10 rounded-[3px] text-center font-azeret text-xs text-white/40 uppercase tracking-widest">
              NO BLUEPRINTS MATCHING SPECIFIED FILTER
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
                <th className="py-3 px-4">PUBLICATION TITLE</th>
                <th className="py-3 px-4">CATEGORY</th>
                <th className="py-3 px-4">AUTHOR</th>
                <th className="py-3 px-4">READ TIME</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filtered.map((art) => (
                <tr key={art.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4">
                    <StatusBadge status={art.status} />
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-roc text-sm font-bold text-white uppercase">
                      {art.title}
                    </div>
                    <div className="font-azeret text-[9px] text-white/40 truncate max-w-sm">
                      /{art.slug}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-azeret text-[10px] text-white/70">
                    {art.category}
                  </td>
                  <td className="py-3 px-4 font-azeret text-[10px] text-white/60">
                    {art.author?.name || "Architect"}
                  </td>
                  <td className="py-3 px-4 font-azeret text-[10px] text-white/40">
                    {art.readingTime || "5 MIN READ"}
                  </td>
                  <td className="py-3 px-4 text-right font-azeret text-[9px] tracking-wider uppercase">
                    <div className="flex items-center justify-end gap-2">
                      {art.status === "PUBLISHED" && (
                        <Link
                          href={`/insights/${art.slug}`}
                          target="_blank"
                          className="text-white/40 hover:text-accent transition-colors"
                        >
                          VIEW ↗
                        </Link>
                      )}
                      <Link
                        href={`/dashboard/insights/${art.id}`}
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
