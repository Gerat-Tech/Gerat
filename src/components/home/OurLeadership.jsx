"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const DEFAULT_PARTNERS = [
  {
    id: 0,
    name: "Igor Tulchinsky",
    role: "Founder",
    title: "FOUNDER & CO-ARCHITECT",
    tag: "LEADERSHIP",
    image: "/image/home/leadership/WQF__0000_Founder-IgorTulchinsky.webp",
    position: "50% 33%",
  },
  {
    id: 1,
    name: "Amir Husain",
    role: "Chairman",
    title: "CHAIRMAN & CO-FOUNDER",
    tag: "GOVERNANCE",
    image: "/image/home/leadership/WQF__0004_Chairman-and-Co-Founder_Amir-Husain-2.webp",
    position: "50% 27%",
  },
  {
    id: 2,
    name: "Steven Lau",
    role: "CEO",
    title: "CHIEF EXECUTIVE OFFICER",
    tag: "OPERATIONS",
    image: "/image/home/leadership/WQF__0005_CEO-and-Co-Founder_Steven-Lau.webp",
    position: "50% 30%",
  },
];

/**
 * Kinetic Leadership Section
 *
 * Replicates the editorial dual-state layout:
 * - Resting state: Top triple ticker, manifesto intro with corner-bracketed button,
 *   and headline split across a 3-slit horizontal letterbox eyes crop with floating VIEW badge.
 * - Active state: Morphs dynamically into a 2-column layout with the active leader in full portrait
 *   on the left, and remaining leaders in letterbox slits beside the continuing headline on the right.
 */
export default function OurLeadership({ initialLeaders = null }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [fetchedLeaders, setFetchedLeaders] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/team?active=true")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && data.members && data.members.length > 0) {
          const execs = data.members.filter(
            (m) => m.division === "EXECUTIVE_LEADERSHIP"
          );
          const list = execs.length > 0 ? execs : data.members.slice(0, 3);
          setFetchedLeaders(list);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const partners = DEFAULT_PARTNERS.map((p, idx) => {
    const override = fetchedLeaders?.[idx] || initialLeaders?.[idx];
    if (override) {
      return {
        ...p,
        name: override.name || p.name,
        role: override.roleTitle || override.role || p.role,
        image: p.image, // Retain calibrated eye crop position image
      };
    }
    return p;
  });

  const activePartner =
    expandedIndex !== null
      ? partners.find((p) => p.id === expandedIndex) || partners[0]
      : null;

  const remainingPartners =
    expandedIndex !== null
      ? partners.filter((p) => p.id !== expandedIndex)
      : [];

  return (
    <section
      id="leadership"
      aria-label="Our Leadership Team"
      className="relative w-full bg-[#0d0706] text-[#faf6ed] border-t border-b border-white/10 overflow-hidden py-14 sm:py-18 md:py-20 select-none"
    >
      {/* Top Label Bar (1x only) */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 mb-8 sm:mb-10">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 font-parkinsans text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-white/60">
          <span>OUR LEADERSHIP TEAM</span>
        </div>
      </div>

      {/* Intro Manifesto & Corner-Bracketed Button */}
      <div className="w-full max-w-[640px] mx-auto px-4 text-center mb-8 sm:mb-10 flex flex-col items-center gap-6">
        <p className="font-parkinsans text-[12px] sm:text-[13px] text-white/60 uppercase tracking-[0.16em] leading-relaxed max-w-[500px]">
          A global network of advisors, operators, and architects. The people
          who built what&apos;s now, helping you build what&apos;s next.
        </p>

        {/* Corner-Bracketed "MEET THE TEAM" Button */}
        <Link
          href="/team"
          className="group relative isolate inline-flex items-center justify-center font-parkinsans text-[12px] sm:text-[13px] uppercase tracking-[0.25em] text-white/80 hover:text-white px-8 py-3.5 transition-colors duration-300"
        >
          <span className="relative z-10 overflow-hidden h-[18px] inline-flex flex-col">
            <span className="transition-transform duration-400 ease-in-out group-hover:-translate-y-full">
              MEET THE TEAM
            </span>
            <span className="absolute inset-0 transition-transform duration-400 ease-in-out translate-y-full group-hover:translate-y-0 text-accent">
              MEET THE TEAM
            </span>
          </span>

          {/* 4 Corner Tick Brackets */}
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/60 group-hover:border-accent transition-colors duration-300" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-white/60 group-hover:border-accent transition-colors duration-300" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-white/60 group-hover:border-accent transition-colors duration-300" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/60 group-hover:border-accent transition-colors duration-300" />
        </Link>
      </div>

      {/* Main Kinetic Display Area */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {expandedIndex === null ? (
          /* ============================================================
             RESTING STATE (Image 2): Centered Headlines + 3 Slits
             ============================================================ */
          <div className="flex flex-col items-center w-full">
            {/* Top Line of Headline */}
            <div className="w-full text-center max-w-[980px] font-parkinsans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium sm:font-semibold tracking-tight uppercase leading-[1.05] text-white">
              <div>WE ARCHITECT THE FOUNDATIONS</div>
              <div>BEFORE THEY&apos;RE VISIBLE.</div>
            </div>

            {/* 3 Horizontal Slits Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-[1240px] my-8 sm:my-10">
              {partners.map((partner) => {
                const isHovered = hoveredIndex === partner.id;
                return (
                  <div
                    key={partner.id}
                    onMouseEnter={() => setHoveredIndex(partner.id)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setExpandedIndex(partner.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setExpandedIndex(partner.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${partner.name}`}
                    className="group/slit relative h-[105px] sm:h-[125px] md:h-[135px] w-full cursor-pointer rounded-[2px] overflow-visible border border-white/15 hover:border-accent transition-all duration-300 bg-[#111111] outline-hidden focus-visible:ring-1 focus-visible:ring-accent"
                  >
                    {/* Cropped Letterbox Image focusing on eyes */}
                    <div className="w-full h-full overflow-hidden rounded-[2px]">
                      <img
                        src={partner.image}
                        alt={partner.name}
                        loading="lazy"
                        className="w-full h-full object-cover grayscale contrast-125 group-hover/slit:scale-105 group-hover/slit:grayscale-0 transition-all duration-500"
                        style={{ objectPosition: partner.position }}
                      />
                    </div>

                    {/* Floating Pill VIEW Badge */}
                    <div
                      className={`absolute -top-3.5 right-3 z-20 transition-all duration-300 pointer-events-none ${
                        isHovered
                          ? "opacity-100 translate-y-0 scale-100"
                          : "opacity-0 translate-y-2 scale-90"
                      }`}
                    >
                      <div className="flex items-center justify-center bg-[#EA5B15] text-white px-2.5 py-1 rounded-[2px] shadow-lg border border-white/20">
                        <span className="font-parkinsans text-[9px] tracking-[0.2em] uppercase font-bold text-white">
                          VIEW
                        </span>
                      </div>
                    </div>

                    {/* Bottom Metadata in Slit */}
                    <div
                      data-dark-overlay="true"
                      className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-3 flex items-end justify-between z-10 pointer-events-none"
                    >
                      <span
                        className="font-parkinsans text-[10px] tracking-[0.18em] uppercase font-bold text-white dark-overlay-text force-text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                        style={{ color: "#FAF6ED" }}
                      >
                        {partner.name}
                      </span>
                      <span
                        className="font-parkinsans text-[9px] tracking-[0.2em] uppercase text-accent font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] shrink-0 ml-2"
                        style={{ color: "#EA5B15" }}
                      >
                        {partner.role}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Line of Headline */}
            <div className="w-full text-center max-w-[980px] font-parkinsans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium sm:font-semibold tracking-tight uppercase leading-[1.05] text-white">
              <div>TRANSFORM THEM INTO</div>
              <div>SYSTEMS THAT ENDURE.</div>
            </div>
          </div>
        ) : (
          /* ============================================================
             ACTIVE / EXPANDED STATE (Image 3): 2-Column Morph
             ============================================================ */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center w-full max-w-[1280px] mx-auto animate-in fade-in zoom-in-95 duration-400">
            {/* Left Column: Full Portrait Card of Active Leader */}
            <div className="lg:col-span-5 flex flex-col items-start w-full">
              <div className="relative aspect-4/5 w-full max-w-[460px] mx-auto lg:mx-0 rounded-[3px] overflow-hidden bg-[#111111] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
                {/* Full Portrait Image */}
                <img
                  src={activePartner.image}
                  alt={activePartner.name}
                  className="w-full h-full object-cover grayscale contrast-115"
                />

                {/* Top-Right Badge: [ROLE] */}
                <div
                  data-dark-overlay="true"
                  className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-10 flex items-center bg-black/85 backdrop-blur-xs px-3 py-1.5 border border-white/25 rounded-[2px]"
                >
                  <span
                    className="font-parkinsans text-[10px] tracking-[0.2em] text-[#faf6ed] uppercase font-bold dark-overlay-text"
                    style={{ color: "#FAF6ED" }}
                  >
                    {activePartner.role}
                  </span>
                </div>
              </div>

              {/* Bottom Metadata Strip */}
              <div className="w-full max-w-[460px] mt-4 flex items-center justify-between font-parkinsans text-[11px] uppercase tracking-[0.2em] text-white/70 px-1">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-white tracking-[0.18em]">
                    {activePartner.name}
                  </span>
                  <span className="text-white/25">|</span>
                  <span className="text-accent">{activePartner.tag}</span>
                </div>

                <button
                  onClick={() => setExpandedIndex(null)}
                  className="text-white/40 hover:text-white transition-colors cursor-pointer text-[10px] tracking-[0.15em] hover:text-accent flex items-center gap-1"
                  title="Close expanded view"
                >
                  [ CLOSE × ]
                </button>
              </div>
            </div>

            {/* Right Column: Headline + Remaining 2 Slits */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Top Headline */}
              <div className="font-parkinsans text-3xl sm:text-4xl md:text-5xl font-medium sm:font-semibold tracking-tight uppercase leading-[1.05] text-white">
                <div>WE ARCHITECT THE FOUNDATIONS</div>
                <div>BEFORE THEY&apos;RE VISIBLE.</div>
              </div>

              {/* The Remaining 2 Letterbox Slits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-6 sm:my-8">
                {remainingPartners.map((partner) => {
                  const isHovered = hoveredIndex === partner.id;
                  return (
                    <div
                      key={partner.id}
                      onMouseEnter={() => setHoveredIndex(partner.id)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => setExpandedIndex(partner.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setExpandedIndex(partner.id);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Switch to ${partner.name}`}
                      className="group/slit relative h-[95px] sm:h-[110px] w-full cursor-pointer rounded-[2px] overflow-visible border border-white/15 hover:border-accent transition-all duration-300 bg-[#111111] outline-hidden focus-visible:ring-1 focus-visible:ring-accent"
                    >
                      <div className="w-full h-full overflow-hidden rounded-[2px]">
                        <img
                          src={partner.image}
                          alt={partner.name}
                          loading="lazy"
                          className="w-full h-full object-cover grayscale contrast-125 group-hover/slit:scale-105 group-hover/slit:grayscale-0 transition-all duration-500"
                          style={{ objectPosition: partner.position }}
                        />
                      </div>

                      {/* Floating Pill VIEW Badge */}
                      <div
                        className={`absolute -top-3.5 right-3 z-20 transition-all duration-300 pointer-events-none ${
                          isHovered
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-2 scale-90"
                        }`}
                      >
                        <span className="inline-flex items-center bg-white text-black group-hover/slit:bg-accent group-hover/slit:text-white font-parkinsans text-[9px] font-bold uppercase tracking-[0.16em] px-2.5 py-0.5 rounded-full shadow-md transition-colors">
                          VIEW
                        </span>
                      </div>

                      <div className="absolute inset-0 bg-black/20 group-hover/slit:bg-transparent transition-colors pointer-events-none rounded-[2px]" />

                      {/* Bottom Metadata in Slit */}
                      <div
                        data-dark-overlay="true"
                        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-2.5 sm:p-3 flex items-end justify-between z-10 pointer-events-none"
                      >
                        <span
                          className="font-parkinsans text-[9px] sm:text-[10px] tracking-[0.18em] uppercase font-bold text-white dark-overlay-text force-text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                          style={{ color: "#FAF6ED" }}
                        >
                          {partner.name}
                        </span>
                        <span
                          className="font-parkinsans text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-accent font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] shrink-0 ml-2"
                          style={{ color: "#EA5B15" }}
                        >
                          {partner.role}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Headline */}
              <div className="font-parkinsans text-3xl sm:text-4xl md:text-5xl font-medium sm:font-semibold tracking-tight uppercase leading-[1.05] text-white">
                <div>TRANSFORM THEM INTO</div>
                <div>SYSTEMS THAT ENDURE.</div>
              </div>

              {/* Bottom Tagline & Collapse Bar */}
              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 font-parkinsans text-[10px] tracking-[0.2em] uppercase text-white/50">
                <span>THE ARCHITECTS OF GERAT&apos;S SYSTEMIC EXCELLENCE.</span>
                <button
                  onClick={() => setExpandedIndex(null)}
                  className="text-accent hover:text-white transition-colors cursor-pointer font-bold"
                >
                  RESET VIEW ↑
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
