"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ServicePillarEditor({ initialData = null, isNew = false }) {
  const router = useRouter();

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

  const [formData, setFormData] = useState({
    num: initialData?.num || "01",
    title: initialData?.title || "",
    tagline: initialData?.tagline || "",
    desc: initialData?.desc || "",
    deliverablesText: initialData?.deliverables
      ? parseDeliverables(initialData.deliverables).join("\n")
      : "",
    deepLink: initialData?.deepLink || "",
    order: initialData?.order ?? 0,
    active: initialData?.active ?? true,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deliverablesArray = formData.deliverablesText
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    const payload = {
      num: formData.num,
      title: formData.title,
      tagline: formData.tagline,
      desc: formData.desc,
      deliverables: deliverablesArray,
      deepLink: formData.deepLink || null,
      order: Number(formData.order) || 0,
      active: Boolean(formData.active),
    };

    try {
      const url = isNew ? "/api/services" : `/api/services/${initialData.id}`;
      const method = isNew ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save practice pillar.");
      }

      setSuccess(true);
      if (isNew) {
        router.push(`/dashboard/services/${data.pillar.id}`);
      } else {
        router.refresh();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/services"
              className="font-azeret text-[10px] text-white/50 hover:text-white uppercase tracking-wider"
            >
              ← PRACTICE PILLARS
            </Link>
            <span className="text-white/30 font-mono">/</span>
            <span className="font-azeret text-[10px] text-accent uppercase tracking-wider">
              {isNew ? "NEW PILLAR CONFIGURATION" : `PILLAR ${formData.num} // ${formData.title || "UNTITLED"}`}
            </span>
          </div>
          <h1 className="font-roc text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mt-1">
            {isNew ? "CONFIGURE PRACTICE PILLAR" : "EDIT PRACTICE PILLAR"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="py-2 px-6 bg-accent hover:bg-[#ff5c1a] text-black font-azeret text-[10px] tracking-[0.15em] font-bold uppercase rounded-[2px] transition-colors disabled:opacity-50"
          >
            {saving ? "SAVING CONFIGURATION..." : isNew ? "CREATE PILLAR" : "SAVE CHANGES"}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-950/40 border border-rose-500/50 rounded-[2px] font-azeret text-xs text-rose-300">
          SYSTEM ERROR: {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/50 rounded-[2px] font-azeret text-xs text-emerald-300">
          PRACTICE PILLAR CONFIGURATION SAVED SUCCESSFULLY.
        </div>
      )}

      {/* Split-Screen Workspace: Form vs Live Public Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Configuration Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col gap-6">
          {/* Section 1: Pillar Meta */}
          <div className="bg-[#121212] border border-white/10 p-6 rounded-[3px] flex flex-col gap-4">
            <div className="font-azeret text-[10px] tracking-[0.2em] text-accent uppercase font-bold border-b border-white/10 pb-2">
              01 // PILLAR SPECIFICATION & POSITIONING
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-azeret text-[10px] tracking-[0.15em] text-white/50 uppercase mb-1">
                  INDEX NUMBER (e.g. 01) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="01"
                  value={formData.num}
                  onChange={(e) => setFormData({ ...formData, num: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 px-3 py-2 text-white font-mono text-xs rounded-[2px] focus:border-accent outline-none"
                />
              </div>

              <div>
                <label className="block font-azeret text-[10px] tracking-[0.15em] text-white/50 uppercase mb-1">
                  DISPLAY ORDER
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 px-3 py-2 text-white font-mono text-xs rounded-[2px] focus:border-accent outline-none"
                />
              </div>

              <div>
                <label className="block font-azeret text-[10px] tracking-[0.15em] text-white/50 uppercase mb-1">
                  VISIBILITY STATE
                </label>
                <select
                  value={formData.active ? "true" : "false"}
                  onChange={(e) => setFormData({ ...formData, active: e.target.value === "true" })}
                  className="w-full bg-black/60 border border-white/15 px-3 py-2 text-white font-azeret text-xs rounded-[2px] focus:border-accent outline-none"
                >
                  <option value="true">ACTIVE (VISIBLE ON PUBLIC SITE)</option>
                  <option value="false">HIDDEN / ARCHIVED</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-azeret text-[10px] tracking-[0.15em] text-white/50 uppercase mb-1">
                PILLAR TITLE *
              </label>
              <input
                type="text"
                required
                placeholder="DIGITAL PLATFORMS & PRODUCT ENGINEERING"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-black/60 border border-white/15 px-3 py-2 text-white font-roc text-sm uppercase rounded-[2px] focus:border-accent outline-none"
              />
            </div>

            <div>
              <label className="block font-azeret text-[10px] tracking-[0.15em] text-white/50 uppercase mb-1">
                TAGLINE / SUB-DISCIPLINE *
              </label>
              <input
                type="text"
                required
                placeholder="ENTERPRISE ARCHITECTURE // WEB & MOBILE"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-black/60 border border-white/15 px-3 py-2 text-white font-mono text-xs uppercase rounded-[2px] focus:border-accent outline-none"
              />
            </div>
          </div>

          {/* Section 2: Narrative & Scope */}
          <div className="bg-[#121212] border border-white/10 p-6 rounded-[3px] flex flex-col gap-4">
            <div className="font-azeret text-[10px] tracking-[0.2em] text-accent uppercase font-bold border-b border-white/10 pb-2">
              02 // NARRATIVE & SCOPE BREAKDOWN
            </div>

            <div>
              <label className="block font-azeret text-[10px] tracking-[0.15em] text-white/50 uppercase mb-1">
                DESCRIPTION / ARCHITECTURAL SCOPE
              </label>
              <textarea
                rows={4}
                placeholder="Detailed description of practice objectives, delivery methodology, and enterprise capability..."
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                className="w-full bg-black/60 border border-white/15 p-3 text-white font-sans text-xs rounded-[2px] focus:border-accent outline-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block font-azeret text-[10px] tracking-[0.15em] text-white/50 uppercase mb-1">
                CORE DELIVERABLES (ONE PER LINE)
              </label>
              <textarea
                rows={5}
                placeholder={"Next.js & React Enterprise Frontends\nDistributed Microservices Architecture\nReal-Time Telemetry & Event Streams\nSub-Second Page Performance Hardening"}
                value={formData.deliverablesText}
                onChange={(e) => setFormData({ ...formData, deliverablesText: e.target.value })}
                className="w-full bg-black/60 border border-white/15 p-3 text-white font-mono text-xs rounded-[2px] focus:border-accent outline-none leading-relaxed"
              />
              <span className="font-azeret text-[9px] text-white/40 mt-1 block">
                Line breaks will automatically parse into the bulleted checklist on the public /services page.
              </span>
            </div>

            <div>
              <label className="block font-azeret text-[10px] tracking-[0.15em] text-white/50 uppercase mb-1">
                DEEP LINK URL (OPTIONAL SPECIFICATION ROUTE)
              </label>
              <input
                type="text"
                placeholder="/services/brand-creative or /services/personal-branding"
                value={formData.deepLink}
                onChange={(e) => setFormData({ ...formData, deepLink: e.target.value })}
                className="w-full bg-black/60 border border-white/15 px-3 py-2 text-white font-mono text-xs rounded-[2px] focus:border-accent outline-none"
              />
            </div>
          </div>
        </form>

        {/* Right: Live Public Deck Card Preview */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="font-azeret text-[10px] tracking-[0.2em] text-white/40 uppercase font-bold flex items-center justify-between">
            <span>LIVE PUBLIC DECK PREVIEW</span>
            <span className="text-accent">{formData.active ? "● ACTIVE" : "○ HIDDEN"}</span>
          </div>

          <div className="relative bg-[#0e0e0e] border border-white/15 p-8 rounded-[4px] flex flex-col justify-between min-h-[380px] transition-all">
            {/* Precision Corner Accents */}
            <span className="absolute top-0 left-0 size-2 border-t border-l border-accent" />
            <span className="absolute top-0 right-0 size-2 border-t border-r border-accent" />
            <span className="absolute bottom-0 left-0 size-2 border-b border-l border-accent" />
            <span className="absolute bottom-0 right-0 size-2 border-b border-r border-accent" />

            <div>
              <div className="flex items-center justify-between">
                <span className="font-azeret text-[11px] tracking-[0.2em] text-accent font-bold">
                  PRACTICE // {formData.num || "00"}
                </span>
                <div className="size-2 rounded-[1px] bg-accent" />
              </div>

              <div className="flex flex-col gap-3 my-6">
                <span className="font-azeret text-[9px] tracking-[0.2em] text-white/50 uppercase">
                  {formData.tagline || "PRACTICE TAGLINE // CADRE"}
                </span>
                <h2 className="font-roc text-2xl font-bold tracking-tight uppercase text-white leading-tight">
                  {formData.title || "PRACTICE PILLAR TITLE"}
                </h2>
                <p className="font-roc text-xs sm:text-sm text-white/70 leading-relaxed">
                  {formData.desc || "Operational overview of this specialized engineering pillar..."}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <span className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase block mb-3">
                  CORE DELIVERABLES
                </span>
                {deliverablesArray.length > 0 ? (
                  <ul className="space-y-1.5 font-azeret text-[10px] tracking-[0.15em] text-white/60">
                    {deliverablesArray.map((del, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-accent">•</span>
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="font-azeret text-[10px] text-white/30 italic">
                    No deliverables defined yet
                  </div>
                )}

                {formData.deepLink && (
                  <div className="mt-4 pt-3 border-t border-white/5">
                    <span className="inline-flex items-center gap-1.5 font-azeret text-[9px] tracking-[0.2em] uppercase text-accent">
                      <span>VIEW SPECIFICATION →</span>
                    </span>
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
