"use client";

import React, { useState, useEffect } from "react";

const DEFAULT_ITEMS = [
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

/**
 * Continuous Editorial Marquee Ticker (Spec §25)
 * Pure CSS translation, pauses on hover, zero JS frame overhead.
 * Automatically loads dynamic tokens from SiteConfig with fallback.
 */
export default function Marquee({ customItems = null }) {
  const [fetchedItems, setFetchedItems] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/settings/config")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && data.configMap?.MARQUEE_TOKENS) {
          try {
            const parsed = JSON.parse(data.configMap.MARQUEE_TOKENS);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setFetchedItems(parsed);
            }
          } catch {}
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const items = customItems || fetchedItems || DEFAULT_ITEMS;

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
