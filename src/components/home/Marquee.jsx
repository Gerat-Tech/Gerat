"use client";

import React, { useState, useEffect } from "react";

const DEFAULT_ITEMS = [
  "DIGITAL EXPERIENCES",
  "AI & INTELLIGENT TOOLS",
  "BUSINESS SYSTEMS",
  "BRAND & CREATIVE",
  "WEBSITES & PRODUCTS",
  "PRACTICAL AI",
  "OPERATIONS & ERP",
  "IDENTITY & STRATEGY",
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
      className="w-full bg-[var(--surface)] border-y border-white/10 py-4 overflow-hidden select-none"
    >
      <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
        {/* Render twice for seamless looping */}
        {[...items, ...items].map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="flex items-center gap-8 font-parkinsans text-[11px] sm:text-[12px] tracking-[0.25em] uppercase text-white/70 hover:text-white transition-colors"
          >
            <span>{item}</span>
            <span className="text-white/20 select-none font-light" aria-hidden="true">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}
