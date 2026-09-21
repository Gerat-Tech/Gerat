"use client";

import React from "react";
import { useNav } from "@/context/NavContext";

/**
 * Section 05: How We Work (Methodology)
 *
 * Implements the 2-column layout from user reference image (media_1789850867395.png),
 * utilizing the official brand color palette from (media_1789894686718.png):
 * - Card 01: Coffee bean (#300F0A) with Warm Almond text (#FAF6ED)
 * - Card 02: Flame (#EA5B15) with crisp pure white text (#FFFFFF)
 * - Card 03: Almond (#F1DFD9) with deep Coffee Bean text (#300F0A)
 *
 * Fully aligned with Gerat Software Solution's engineering mission:
 * "Software architecture built for endurance."
 */
export default function HowWeWork() {
  const { openContact } = useNav();

  const cards = [
    {
      number: "01",
      title: "ARCHITECTURAL CLARITY BEFORE CODE.",
      description:
        "We audit operations, identify system bottlenecks, and blueprint your complete data flow and integration architecture before committing a single line of code.",
      cardTheme: "coffee",
      cardClass: "card-coffee bg-[#300F0A] text-[#FAF6ED] border border-white/10",
      titleStyle: { color: "#FAF6ED" },
      textStyle: { color: "rgba(250, 246, 237, 0.88)" },
      numberStyle: { color: "#EA5B15" },
      dividerClass: "border-white/20",
      isDark: true,
      // Blueprint grid icon in Flame Orange
      icon: (
        <svg
          viewBox="0 0 32 32"
          className="size-8 text-accent shrink-0"
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
      title: "PRODUCTION-HARDENED SYSTEMS, BUILT TO ENDURE.",
      description:
        "We construct resilient web experiences, intelligent tools, and scalable business backends with zero shortcuts, high test coverage, and automated deployment pipelines.",
      cardTheme: "flame",
      cardClass: "card-flame bg-accent text-white border border-accent/30",
      titleStyle: { color: "#FFFFFF" },
      textStyle: { color: "rgba(255, 255, 255, 0.92)" },
      numberStyle: { color: "#FFFFFF" },
      dividerClass: "border-white/30",
      isDark: true,
      // Ascending signal towers / system architecture icon
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
      title: "OBSERVABILITY, HANDOVER & SUSTAINED SCALE.",
      description:
        "We don't abandon you at launch. We provide full telemetry, comprehensive documentation, team onboarding, and ongoing architectural stewardship as your business grows.",
      cardTheme: "almond",
      cardClass: "card-almond bg-[#F1DFD9] text-[#300F0A] border border-[#300F0A]/15 shadow-md",
      titleStyle: { color: "#300F0A" },
      textStyle: { color: "#4E241C" },
      numberStyle: { color: "#EA5B15" },
      dividerClass: "border-[#300F0A]/20",
      isDark: false,
      // Geometric target / crosshair icon in Coffee Bean
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
      className="relative w-full py-14 sm:py-18 md:py-20 bg-[var(--bg)] text-[var(--text-primary)] border-b border-white/10 overflow-hidden"
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
          {/* LEFT COLUMN: 3 Large Rounded Cards (Coffee bean, Flame, Almond) */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8 w-full">
            {cards.map((card, idx) => (
              <div
                key={card.title}
                data-dark-card={card.isDark ? "true" : undefined}
                className={`relative flex flex-col justify-between rounded-[26px] sm:rounded-[30px] p-8 sm:p-10 md:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_18px_48px_rgba(0,0,0,0.25)] min-h-[260px] sm:min-h-[290px] ${card.cardClass}`}
              >
                {/* Top Row: Headline + Geometric Icon */}
                <div className="flex items-start justify-between gap-6">
                  <h3
                    style={card.titleStyle}
                    className="font-parkinsans text-2xl sm:text-3xl md:text-[32px] font-semibold uppercase tracking-tight leading-[1.08] max-w-[420px]"
                  >
                    {card.title}
                  </h3>
                  {card.icon}
                </div>

                {/* Bottom Row: Divider & Description */}
                <div className="mt-8 sm:mt-12">
                  <div className={`border-t ${card.dividerClass} pt-4 sm:pt-5`}>
                    <p
                      style={card.textStyle}
                      className="font-artific text-xs sm:text-sm uppercase tracking-[0.08em] leading-relaxed card-subtext"
                    >
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: Sticky Manifesto & Corner-Bracketed Button */}
          <div className="lg:col-span-5 lg:sticky lg:top-36 flex flex-col items-start gap-6 sm:gap-8 pt-2">
            {/* Small Monospace Label */}
            <div className="font-artific text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-accent font-medium">
              METHODOLOGY
            </div>

            {/* Display Headline */}
            <div className="w-full">
              <h2 className="font-parkinsans text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight leading-[1.04] text-[var(--text-primary)]">
                WE ARCHITECT RIGOROUSLY. WE DELIVER RAPIDLY.
              </h2>
              {/* Horizontal Rule */}
              <div className="w-full border-t border-white/20 mt-6 sm:mt-8" />
            </div>

            {/* Monospace Manifesto Paragraph */}
            <p className="font-artific text-[12px] sm:text-[13px] tracking-[0.04em] text-[var(--text-secondary)] leading-relaxed max-w-[440px]">
              SKIP THE FRAGILE PROTOTYPES. WE ENGINEER MISSION-CRITICAL PLATFORMS
              WITH TRANSPARENT MILESTONES AND DIRECT ACCESS TO PRINCIPAL ARCHITECTS
              FROM DAY ONE.
            </p>

            {/* Corner-Bracketed "START A PROJECT" Button */}
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
                  START A PROJECT
                </span>
                <span className="absolute inset-0 transition-transform duration-400 ease-in-out translate-y-full group-hover:translate-y-0 text-accent font-bold">
                  START A PROJECT
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
