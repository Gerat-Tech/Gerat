"use client";

import React from "react";
import { useNav } from "@/context/NavContext";

/**
 * Section 05: How We Work (Methodology)
 *
 * Implements the 2-column layout from user reference image (media_1789850867395.png):
 * - Left column: 3 large rounded cards (Slate Petrol, Flame Orange, Almond Ivory)
 *   with bold headlines, geometric icons, and crisp descriptions.
 * - Right column: Sticky manifesto panel with display headline, divider,
 *   supporting manifesto text, and corner-bracketed "BUILD WITH US" button.
 * - Background: Subtle cosmic dot constellation.
 */
export default function HowWeWork() {
  const { openContact } = useNav();

  const cards = [
    {
      number: "01",
      title: "MOVE AT THE SPEED OF BREAKTHROUGH.",
      description:
        "Comprehensive systems audit, technical feasibility, and scalable architecture before writing a single line of code.",
      bgColor: "bg-[#2A3942] text-[#FAF6ED]",
      dividerColor: "border-white/20",
      numberColor: "text-white/70",
      textColor: "text-white/80",
      // Pixel / geometric blueprint grid icon
      icon: (
        <svg
          viewBox="0 0 32 32"
          className="size-8 text-white/90 shrink-0"
          fill="currentColor"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="12" height="12" rx="2" />
          <rect x="18" y="2" width="12" height="12" rx="2" />
          <rect x="2" y="18" width="12" height="12" rx="2" />
          <rect x="18" y="18" width="12" height="12" rx="2" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "FULL-STACK INFRASTRUCTURE, READY FROM DAY ONE.",
      description:
        "Production-hardened microservices, secure database topologies, and automated deployment pipelines engineered for endurance.",
      bgColor: "bg-accent text-white",
      dividerColor: "border-white/30",
      numberColor: "text-white/80",
      textColor: "text-white/90",
      // Ascending bar chart / signal towers icon
      icon: (
        <svg
          viewBox="0 0 32 32"
          className="size-8 text-white shrink-0"
          fill="currentColor"
          aria-hidden="true"
        >
          <rect x="4" y="18" width="6" height="12" rx="1.5" />
          <rect x="13" y="10" width="6" height="20" rx="1.5" />
          <rect x="22" y="2" width="6" height="28" rx="1.5" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "CONNECTIONS THAT MOVE YOU FORWARD.",
      description:
        "Full telemetry instrumentation, continuous monitoring, and dedicated operational partnership as your business scales.",
      bgColor: "bg-[#FAF6ED] text-[#300F0A]",
      dividerColor: "border-[#300F0A]/20",
      numberColor: "text-[#300F0A]/70",
      textColor: "text-[#300F0A]/85",
      // Target / crosshair geometric icon
      icon: (
        <svg
          viewBox="0 0 32 32"
          className="size-8 text-[#300F0A] shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          aria-hidden="true"
        >
          <circle cx="16" cy="16" r="12" />
          <circle cx="16" cy="16" r="5" fill="currentColor" />
          <line x1="16" y1="0" x2="16" y2="7" strokeLinecap="round" />
          <line x1="16" y1="25" x2="16" y2="32" strokeLinecap="round" />
          <line x1="0" y1="16" x2="7" y2="16" strokeLinecap="round" />
          <line x1="25" y1="16" x2="32" y2="16" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="process"
      aria-label="How We Work"
      className="relative w-full py-20 sm:py-28 md:py-36 bg-[var(--bg)] text-[var(--text-primary)] border-b border-white/10 overflow-hidden"
    >
      {/* Subtle Cosmic Dot Constellation Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-25 select-none"
      >
        <svg
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="constellationDots"
              x="0"
              y="0"
              width="64"
              height="64"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="12" cy="18" r="1.2" fill="currentColor" opacity="0.6" />
              <circle cx="48" cy="42" r="1.5" fill="currentColor" opacity="0.4" />
              <circle cx="32" cy="56" r="1.0" fill="currentColor" opacity="0.5" />
              <circle cx="58" cy="12" r="1.2" fill="currentColor" opacity="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#constellationDots)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: 3 Large Rounded Cards */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8 w-full">
            {cards.map((card) => (
              <div
                key={card.number}
                className={`relative flex flex-col justify-between rounded-[26px] sm:rounded-[30px] p-8 sm:p-10 md:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_18px_48px_rgba(0,0,0,0.25)] min-h-[260px] sm:min-h-[290px] ${card.bgColor}`}
              >
                {/* Top Row: Headline + Geometric Icon */}
                <div className="flex items-start justify-between gap-6">
                  <h3 className="font-artific text-2xl sm:text-3xl md:text-[32px] font-bold uppercase tracking-tight leading-[1.08] max-w-[420px]">
                    {card.title}
                  </h3>
                  {card.icon}
                </div>

                {/* Bottom Row: Divider, Step Index & Description */}
                <div className="mt-8 sm:mt-12">
                  <div className={`border-t ${card.dividerColor} pt-4 sm:pt-5`}>
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span
                        className={`font-parkinsans text-xs sm:text-sm font-bold uppercase tracking-[0.2em] shrink-0 ${card.numberColor}`}
                      >
                        {card.number}
                      </span>
                      <p
                        className={`font-parkinsans text-xs sm:text-sm uppercase tracking-[0.08em] leading-relaxed ${card.textColor}`}
                      >
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: Sticky Manifesto & Corner-Bracketed Button */}
          <div className="lg:col-span-5 lg:sticky lg:top-36 flex flex-col items-start gap-6 sm:gap-8 pt-2">
            {/* Small Monospace Label */}
            <div className="font-parkinsans text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-accent font-bold">
              [05] METHODOLOGY
            </div>

            {/* Display Headline */}
            <div className="w-full">
              <h2 className="font-artific text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight leading-[1.04] text-[var(--text-primary)]">
                BUILD FAST, WITH ZERO FRICTION AND TOTAL FOCUS.
              </h2>
              {/* Horizontal Rule */}
              <div className="w-full border-t border-white/20 mt-6 sm:mt-8" />
            </div>

            {/* Monospace Manifesto Paragraph */}
            <p className="font-parkinsans text-[11px] sm:text-[12px] uppercase tracking-[0.16em] text-[var(--text-secondary)] leading-relaxed max-w-[440px]">
              SKIP THE NOISE AND BUILD WITH A LAUNCH-READY TEAM, DEEP RESOURCES,
              AND IMMEDIATE MARKET ACCESS FROM DAY ONE.
            </p>

            {/* Corner-Bracketed "BUILD WITH US" Button */}
            <button
              type="button"
              onClick={() =>
                openContact({
                  discipline: "systems",
                  subOption: "ENTERPRISE ERP",
                })
              }
              className="group relative isolate inline-flex items-center justify-center font-parkinsans text-[12px] sm:text-[13px] uppercase tracking-[0.25em] text-[var(--text-primary)] hover:text-accent px-8 py-3.5 transition-colors duration-300 cursor-pointer mt-2"
            >
              <span className="relative z-10 overflow-hidden h-[18px] inline-flex flex-col">
                <span className="transition-transform duration-400 ease-in-out group-hover:-translate-y-full">
                  BUILD WITH US
                </span>
                <span className="absolute inset-0 transition-transform duration-400 ease-in-out translate-y-full group-hover:translate-y-0 text-accent font-bold">
                  BUILD WITH US
                </span>
              </span>

              {/* 4 Corner Brackets */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-current opacity-70 group-hover:opacity-100 group-hover:border-accent transition-all duration-300" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-current opacity-70 group-hover:opacity-100 group-hover:border-accent transition-all duration-300" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-current opacity-70 group-hover:opacity-100 group-hover:border-accent transition-all duration-300" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-current opacity-70 group-hover:opacity-100 group-hover:border-accent transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
