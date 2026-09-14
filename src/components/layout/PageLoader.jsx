"use client";

import React, { useEffect, useState } from "react";

/**
 * Editorial Page Loader (Spec §9)
 * Short, high-performance, deterministic loader (0.6 - 0.8s)
 * Displays technical telemetry and brand mark, then lifts mask cleanly.
 */
export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      const hasLoaded = sessionStorage.getItem("gerat_loaded");
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (hasLoaded || prefersReducedMotion) {
        setTimeout(() => {
          setLoading(false);
          setHidden(true);
        }, 0);
        return;
      }
    } catch {}

    // Fast deterministic progress sequence (Spec §9: ~600ms total)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate through progress
        const step = Math.floor(Math.random() * 25) + 15;
        return Math.min(prev + step, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const exitTimer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("gerat_loaded", "true");
      }, 250);

      const removeTimer = setTimeout(() => {
        setHidden(true);
      }, 850);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [progress]);

  if (hidden) return null;

  return (
    <aside
      aria-label="Loading page"
      className={`fixed inset-0 z-[500] bg-[var(--bg)] flex flex-col items-center justify-between p-8 sm:p-12 transition-transform duration-700 ease-(--ease-primary) ${
        loading ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top Telemetry */}
      <div className="w-full flex items-center justify-between font-parkinsans text-[10px] tracking-[0.2em] text-white/40 uppercase">
        <span>GERAT OS // v0.1</span>
        <span>SYS_INIT</span>
      </div>

      {/* Center Brand Monogram & Status */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative size-16 sm:size-20 flex items-center justify-center border border-white/15 rounded-[2px] bg-white/[0.02]">
          {/* Animated scanline */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/20 to-transparent animate-pulse" />

          {/* Geometric Emblem */}
          <svg
            className="size-8 sm:size-10 text-white"
            viewBox="150 150 180 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M306.66,219.97v17.34c-29.32,0-53.09-20.88-53.09-46.64h-27.15c0,25.76-23.77,46.64-53.09,46.64v-17.34c29.32,0,53.09-20.88,53.09-46.64h27.15c0,25.76,23.77,46.64,53.09,46.64Z"
              fill="currentColor"
            />
            <path
              d="M306.66,254.65v17.34c-29.32,0-53.09-20.88-53.09-46.64h-27.15c0,25.76-23.77,46.64-53.09,46.64v-17.34c29.32,0,53.09-20.88,53.09-46.64h27.15c0,25.76,23.77,46.64,53.09,46.64Z"
              fill="currentColor"
            />
            <path
              d="M306.66,289.33v17.34c-29.32,0-53.09-20.88-53.09-46.64h-27.15c0,25.76-23.77,46.64-53.09,46.64v-17.34c29.32,0,53.09-20.88,53.09-46.64h27.15c0,25.76,23.77,46.64,53.09,46.64Z"
              fill="var(--accent, #ea5b15)"
            />
          </svg>

          {/* Precision Framing Brackets */}
          <span className="absolute -top-[1px] -left-[1px] size-2 border-t border-l border-white" />
          <span className="absolute -top-[1px] -right-[1px] size-2 border-t border-r border-white" />
          <span className="absolute -bottom-[1px] -left-[1px] size-2 border-b border-l border-white" />
          <span className="absolute -bottom-[1px] -right-[1px] size-2 border-b border-r border-white" />
        </div>

        <div className="flex flex-col items-center gap-1.5 text-center">
          <span className="font-artific text-[18px] sm:text-[20px] font-bold tracking-[0.2em] text-white">
            GERAT
          </span>
          <span className="font-parkinsans text-[9px] sm:text-[10px] tracking-[0.25em] text-white/50 uppercase">
            SOFTWARE SOLUTION
          </span>
        </div>
      </div>

      {/* Bottom Progress Bar & Counter */}
      <div className="w-full max-w-xs flex flex-col gap-2">
        <div className="flex items-center justify-between font-parkinsans text-[10px] tracking-[0.15em] text-white/50">
          <span>{progress < 100 ? "CONFIGURING..." : "SYSTEM READY"}</span>
          <span className="text-accent font-bold">{progress}%</span>
        </div>
        <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
