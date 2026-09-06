"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  "ENTERPRISE ERP",
  "PUBLIC SECTOR",
  "AI & RAG NETWORKS",
  "BRAND & IDENTITY",
  "DISTRIBUTED CORE",
  "FINTECH SWITCH",
  "HEALTHCARE INFRASTRUCTURE",
  "INDUSTRIAL IOT",
];

export default function CaseStudyEditor({ initialCaseStudy = null }) {
  const router = useRouter();

  // Form state
  const [title, setTitle] = useState(initialCaseStudy?.title || "");
  const [slug, setSlug] = useState(initialCaseStudy?.slug || "");
  const [isSlugLocked, setIsSlugLocked] = useState(Boolean(initialCaseStudy?.id));
  const [displayIndex, setDisplayIndex] = useState(initialCaseStudy?.displayIndex || "01");
  const [num, setNum] = useState(initialCaseStudy?.num || "01 / 09");
  const [category, setCategory] = useState(initialCaseStudy?.category || "ENTERPRISE ERP");
  const [tags, setTags] = useState(initialCaseStudy?.tags || "ENTERPRISE LOGISTICS & OPERATIONS");
  const [metric, setMetric] = useState(
    initialCaseStudy?.metric || "12M+ RECORDS // SUB-SECOND VERIFICATION"
  );
  const [metricDetail, setMetricDetail] = useState(
    initialCaseStudy?.metricDetail || "12M+ RECORDS SECURED // 99.999% UPTIME"
  );
  const [summary, setSummary] = useState(
    initialCaseStudy?.summary ||
      "A distributed, high-throughput systems architecture purpose-built for enterprise verification and resilient operations."
  );
  const [problem, setProblem] = useState(
    initialCaseStudy?.problem ||
      "Legacy fragmented databases created operational bottlenecks and vulnerable data integrity."
  );
  const [architecture, setArchitecture] = useState(
    initialCaseStudy?.architecture ||
      "Engineered an event-driven distributed ledger with cryptographic verification and automated reconciliation."
  );
  const [techStack, setTechStack] = useState(
    initialCaseStudy?.techStack || "DISTRIBUTED POSTGRES // NEXT.JS // GO"
  );
  const [stackBadges, setStackBadges] = useState(
    initialCaseStudy?.stackBadges
      ? typeof initialCaseStudy.stackBadges === "string" && initialCaseStudy.stackBadges.startsWith("[")
        ? JSON.parse(initialCaseStudy.stackBadges).join(", ")
        : initialCaseStudy.stackBadges
      : "Go, PostgreSQL, Kafka, Docker, TimescaleDB"
  );
  const [imageUrl, setImageUrl] = useState(
    initialCaseStudy?.imageUrl || "/image/portfolioPage/US-AUT-3.webp"
  );
  const [impact, setImpact] = useState(
    initialCaseStudy?.impact ||
      "Reduced processing times by 95% with zero data discrepancies across distributed nodes."
  );
  const [year, setYear] = useState(initialCaseStudy?.year || "2026");
  const [status, setStatus] = useState(initialCaseStudy?.status || "PRODUCTION // STABLE");
  const [featured, setFeatured] = useState(Boolean(initialCaseStudy?.featured));
  const [order, setOrder] = useState(initialCaseStudy?.order || 1);

  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState("architecture"); // "architecture" | "problem"
  const [toastMessage, setToastMessage] = useState("");

  const handleTitleChange = (val) => {
    setTitle(val);
    if (!isSlugLocked) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      showToast("Error: Title is required.");
      return;
    }

    setIsSaving(true);
    const badgesArray = stackBadges
      .split(",")
      .map((b) => b.trim())
      .filter(Boolean);

    const payload = {
      title: title.trim(),
      slug: slug.trim() || undefined,
      displayIndex: displayIndex.trim(),
      num: num.trim(),
      category,
      tags: tags.trim(),
      metric: metric.trim(),
      metricDetail: metricDetail.trim() || metric.trim(),
      summary: summary.trim(),
      problem: problem.trim(),
      architecture: architecture.trim(),
      techStack: techStack.trim(),
      stackBadges: badgesArray,
      imageUrl: imageUrl.trim(),
      impact: impact.trim(),
      year: year.trim(),
      status: status.trim(),
      featured,
      order: Number(order) || 0,
    };

    try {
      const isNew = !initialCaseStudy?.id;
      const url = isNew ? "/api/portfolio" : `/api/portfolio/${initialCaseStudy.id}`;
      const method = isNew ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save case study.");
      }

      showToast("Case study saved successfully!");
      if (isNew && data.caseStudy?.id) {
        router.push(`/dashboard/portfolio/${data.caseStudy.id}`);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      showToast(`Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!initialCaseStudy?.id) return;
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/portfolio/${initialCaseStudy.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete case study.");
      }
      router.push("/dashboard/portfolio");
    } catch (err) {
      console.error(err);
      showToast(`Error: ${err.message}`);
      setIsDeleting(false);
    }
  };

  const parsedBadges = stackBadges
    .split(",")
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161616] border border-accent text-white px-4 py-3 rounded-[3px] font-azeret text-xs tracking-wider shadow-2xl flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1 font-azeret text-[10px] tracking-[0.15em] text-white/50">
            <Link href="/dashboard/portfolio" className="hover:text-white transition-colors">
              ← PORTFOLIO CMS
            </Link>
            <span>/</span>
            <span className="text-accent uppercase font-bold">
              {initialCaseStudy?.id ? `EDIT CASE STUDY [${displayIndex}]` : "NEW CASE STUDY"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-roc text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight">
              {title || "UNTITLED CASE STUDY"}
            </h1>
            <span className="font-azeret text-[9px] tracking-[0.2em] px-2 py-0.5 rounded-[2px] bg-white/[0.05] border border-white/15 text-white/80 uppercase">
              {status}
            </span>
            {featured && (
              <span className="font-azeret text-[9px] tracking-[0.2em] px-2 py-0.5 rounded-[2px] bg-accent/20 border border-accent/50 text-accent font-bold uppercase">
                FEATURED ON HOMEPAGE
              </span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2 font-azeret text-[10px] tracking-[0.15em] uppercase font-bold">
          <Link
            href="/portfolio"
            target="_blank"
            className="py-2 px-3 bg-white/[0.04] hover:bg-white/10 border border-white/15 text-white/80 rounded-[2px] transition-colors flex items-center gap-1.5"
          >
            <span>VIEW SHOWCASE ↗</span>
          </Link>

          {initialCaseStudy?.id && (
            <button
              type="button"
              disabled={isDeleting || isSaving}
              onClick={handleDelete}
              className="py-2 px-3 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/40 text-rose-400 rounded-[2px] transition-colors disabled:opacity-40"
            >
              {isDeleting ? "DELETING..." : "DELETE"}
            </button>
          )}

          <button
            type="button"
            disabled={isSaving}
            onClick={handleSave}
            className="py-2 px-5 bg-accent hover:bg-[#ff5c1a] text-black rounded-[2px] transition-colors disabled:opacity-40"
          >
            {isSaving ? "SAVING..." : "SAVE CASE STUDY"}
          </button>
        </div>
      </div>

      {/* Main Split-Screen Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Index & Title Section */}
          <div className="bg-[#121212] border border-white/10 p-5 rounded-[3px] flex flex-col gap-4 font-azeret text-xs">
            <span className="text-[10px] tracking-[0.2em] text-accent uppercase font-bold border-b border-white/10 pb-2">
              CORE IDENTIFIERS & SEQUENCING
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  DISPLAY INDEX:
                </label>
                <input
                  type="text"
                  required
                  placeholder="01"
                  value={displayIndex}
                  onChange={(e) => setDisplayIndex(e.target.value)}
                  className="bg-black/60 border border-white/15 px-3 py-2 text-white font-mono text-xs rounded-[2px] focus:border-accent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  COUNTER BADGE:
                </label>
                <input
                  type="text"
                  placeholder="01 / 09"
                  value={num}
                  onChange={(e) => setNum(e.target.value)}
                  className="bg-black/60 border border-white/15 px-3 py-2 text-white font-mono text-xs rounded-[2px] focus:border-accent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  SORT ORDER:
                </label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  className="bg-black/60 border border-white/15 px-3 py-2 text-white font-mono text-xs rounded-[2px] focus:border-accent outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                CASE STUDY TITLE:
              </label>
              <input
                type="text"
                required
                placeholder="e.g. NATIONAL DIGITAL RECORDS ENGINE"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="bg-black/60 border border-white/15 px-3 py-2.5 text-white font-roc text-lg font-bold uppercase rounded-[2px] focus:border-accent outline-none tracking-tight"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                    SLUG:
                  </label>
                  <label className="flex items-center gap-1 text-[9px] text-white/40 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSlugLocked}
                      onChange={(e) => setIsSlugLocked(e.target.checked)}
                      className="accent-accent"
                    />
                    <span>LOCK</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="national-digital-records"
                  className="bg-black/60 border border-white/15 px-3 py-2 text-white font-mono text-xs rounded-[2px] focus:border-accent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  DISCIPLINE CATEGORY:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-black/60 border border-white/15 px-3 py-2 text-white text-xs rounded-[2px] focus:border-accent outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                SECONDARY TAGLINE:
              </label>
              <input
                type="text"
                placeholder="e.g. PUBLIC SECTOR & INSTITUTIONAL"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="bg-black/60 border border-white/15 px-3 py-2 text-white text-xs rounded-[2px] focus:border-accent outline-none"
              />
            </div>
          </div>

          {/* Metrics & Architecture Section */}
          <div className="bg-[#121212] border border-white/10 p-5 rounded-[3px] flex flex-col gap-4 font-azeret text-xs">
            <span className="text-[10px] tracking-[0.2em] text-accent uppercase font-bold border-b border-white/10 pb-2">
              TELEMETRY METRICS & ARCHITECTURAL SPECS
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  PRIMARY METRIC CHIP:
                </label>
                <input
                  type="text"
                  required
                  placeholder="12M+ RECORDS // SUB-SECOND VERIFICATION"
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                  className="bg-black/60 border border-white/15 px-3 py-2 text-accent font-roc font-bold text-sm uppercase rounded-[2px] focus:border-accent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  METRIC DETAIL (FULL BANNER):
                </label>
                <input
                  type="text"
                  placeholder="12M+ RECORDS SECURED // 99.999% UPTIME"
                  value={metricDetail}
                  onChange={(e) => setMetricDetail(e.target.value)}
                  className="bg-black/60 border border-white/15 px-3 py-2 text-white text-xs rounded-[2px] focus:border-accent outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                EXECUTIVE SUMMARY:
              </label>
              <textarea
                rows={3}
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="bg-black/60 border border-white/15 p-3 text-white font-sans text-xs rounded-[2px] focus:border-accent outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  PROBLEM TOPOLOGY:
                </label>
                <textarea
                  rows={4}
                  required
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="bg-black/60 border border-white/15 p-3 text-white font-sans text-xs rounded-[2px] focus:border-accent outline-none resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  ENGINEERED ARCHITECTURE:
                </label>
                <textarea
                  rows={4}
                  required
                  value={architecture}
                  onChange={(e) => setArchitecture(e.target.value)}
                  className="bg-black/60 border border-white/15 p-3 text-white font-sans text-xs rounded-[2px] focus:border-accent outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                VERIFIABLE IMPACT & OUTCOME:
              </label>
              <textarea
                rows={2}
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
                className="bg-black/60 border border-white/15 p-3 text-white font-sans text-xs rounded-[2px] focus:border-accent outline-none resize-none"
              />
            </div>
          </div>

          {/* Tech Stack & Assets */}
          <div className="bg-[#121212] border border-white/10 p-5 rounded-[3px] flex flex-col gap-4 font-azeret text-xs">
            <span className="text-[10px] tracking-[0.2em] text-accent uppercase font-bold border-b border-white/10 pb-2">
              TECHNOLOGY STACK & VISUAL ASSETS
            </span>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                INLINE TECH LINE (CARD HEADER):
              </label>
              <input
                type="text"
                placeholder="DISTRIBUTED POSTGRES // NEXT.JS // GO"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                className="bg-black/60 border border-white/15 px-3 py-2 text-white font-mono text-xs rounded-[2px] focus:border-accent outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                STACK BADGES (COMMA SEPARATED):
              </label>
              <input
                type="text"
                placeholder="Go, PostgreSQL, Kafka, Docker, TimescaleDB"
                value={stackBadges}
                onChange={(e) => setStackBadges(e.target.value)}
                className="bg-black/60 border border-white/15 px-3 py-2 text-white text-xs rounded-[2px] focus:border-accent outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  HERO IMAGE URL:
                </label>
                <input
                  type="text"
                  placeholder="/image/portfolioPage/US-AUT-3.webp"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="bg-black/60 border border-white/15 px-3 py-2 text-white text-xs rounded-[2px] focus:border-accent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  RELEASE YEAR:
                </label>
                <input
                  type="text"
                  placeholder="2026"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="bg-black/60 border border-white/15 px-3 py-2 text-white text-xs rounded-[2px] focus:border-accent outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div className="flex items-center gap-2">
                <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  STATUS:
                </label>
                <input
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="bg-black/60 border border-white/15 px-2.5 py-1 text-white text-xs rounded-[2px]"
                />
              </div>

              <label className="flex items-center gap-2 text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="accent-accent"
                />
                <span className="text-[10px] tracking-[0.1em] uppercase font-bold text-accent">
                  FEATURE ON HOMEPAGE
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Live Card Preview (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="sticky top-28 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-azeret text-[10px] tracking-[0.2em] text-accent uppercase font-bold">
                LIVE SHOWCASE CARD PREVIEW
              </span>
              <span className="font-azeret text-[9px] text-white/40 uppercase">
                INDEX: {displayIndex}
              </span>
            </div>

            {/* Rendered Preview Card */}
            <div className="bg-[#0e0e0e] border border-white/15 rounded-[4px] overflow-hidden flex flex-col shadow-2xl">
              {/* Precision Corner Accents */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-black/80 border-b border-white/10">
                <img
                  src={imageUrl || "/image/portfolioPage/US-AUT-3.webp"}
                  alt={title}
                  className="w-full h-full object-cover grayscale contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 left-3 font-azeret text-[9px] tracking-[0.2em] text-accent bg-black/90 px-2 py-0.5 border border-accent/40 rounded-[1px] uppercase">
                  {category}
                </div>

                <div className="absolute top-3 right-3 font-azeret text-[9px] tracking-[0.15em] text-white/70 bg-black/80 px-2 py-0.5 border border-white/20 rounded-[1px]">
                  {num}
                </div>

                <div className="absolute bottom-3 left-3 right-3 font-roc text-xs sm:text-sm font-bold tracking-tight text-accent uppercase">
                  {metric}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col gap-4">
                <div>
                  <div className="font-azeret text-[9px] tracking-[0.15em] text-white/40 uppercase">
                    {tags}
                  </div>
                  <h3 className="font-roc text-lg font-bold uppercase text-white tracking-tight leading-tight mt-1">
                    {title || "TITLE PREVIEW"}
                  </h3>
                  <p className="font-sans text-xs text-white/70 leading-relaxed mt-2">
                    {summary}
                  </p>
                </div>

                {/* Problem vs Architecture Tab Preview */}
                <div className="bg-black/50 border border-white/10 p-3 rounded-[3px] flex flex-col gap-2 font-azeret text-[10px]">
                  <div className="flex border-b border-white/10 gap-3 pb-1.5">
                    <button
                      type="button"
                      onClick={() => setActivePreviewTab("architecture")}
                      className={`uppercase tracking-wider transition-colors ${
                        activePreviewTab === "architecture"
                          ? "text-accent font-bold"
                          : "text-white/40 hover:text-white"
                      }`}
                    >
                      ARCHITECTURE
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePreviewTab("problem")}
                      className={`uppercase tracking-wider transition-colors ${
                        activePreviewTab === "problem"
                          ? "text-accent font-bold"
                          : "text-white/40 hover:text-white"
                      }`}
                    >
                      PROBLEM
                    </button>
                  </div>
                  <p className="font-sans text-xs text-white/80 leading-relaxed">
                    {activePreviewTab === "architecture" ? architecture : problem}
                  </p>
                </div>

                {/* Badges Preview */}
                {parsedBadges.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5 font-azeret text-[9px]">
                    {parsedBadges.map((b, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-white/[0.04] border border-white/15 text-white/70 rounded-[2px]"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
