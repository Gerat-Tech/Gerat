"use client";

import React from "react";

/**
 * Continuous Editorial Marquee Ticker (Spec §25)
 * Pure CSS translation, pauses on hover, zero JS frame overhead.
 */
export default function Marquee() {
  const items = [
    "ARTIFICIAL INTELLIGENCE",
    "BRAND STRATEGY & IDENTITY",
    "ENTERPRISE ERP",
    "LOGO & DESIGN SYSTEMS",
    "GOVERNMENT TECHNOLOGY",
    "PERSONAL BRANDING FOR FOUNDERS",
    "HIGH-CONCURRENCY ARCHITECTURE",
    "EDITORIAL GRAPHIC DESIGN",
    "REAL-TIME TELEMETRY",
    "FROM IDENTITY TO INFRASTRUCTURE",
  ];

  return (
    <div
      aria-label="Capabilities Ticker"
      className="w-full bg-[#080808] border-y border-white/10 py-4 overflow-hidden select-none"
    >
      <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
        {/* Render twice for seamless looping */}
        {[...items, ...items].map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="flex items-center gap-8 font-azeret text-[11px] sm:text-[12px] tracking-[0.25em] uppercase text-white/70 hover:text-white transition-colors"
          >
            <span>{item}</span>
            <span className="size-1.5 rounded-[1px] bg-accent/80 shrink-0" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
