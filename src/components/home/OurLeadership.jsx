"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const DEFAULT_PARTNERS = [
  {
    id: "hruy-daniel",
    name: "HRUY DANIEL",
    role: "FOUNDER & CHIEF EXECUTIVE OFFICER",
    title: "FOUNDER & CHIEF EXECUTIVE OFFICER",
    tag: "STRATEGY & VENTURE",
    bio: "Directs Gerat's vision, partnerships, and business growth, helping organizations turn strategy into reliable digital ventures.",
    image: "/image/team/leadership/hiruy.jpeg",
    position: "center 20%",
  },
  {
    id: "ekd",
    name: "EKD",
    role: "CO-FOUNDER & CHIEF OPERATING OFFICER",
    title: "CO-FOUNDER & CHIEF OPERATING OFFICER",
    tag: "OPERATIONS & STRATEGIC EXECUTION",
    bio: "Oversees company-wide execution, strategic program management, and operational delivery across all engineering and client ventures.",
    image: "/image/team/leadership/EKD.jpg",
    position: "center 20%",
  },
  {
    id: "dawit-teklebrhan",
    name: "DAWIT TEKLEBRHAN",
    role: "CO-FOUNDER & CHIEF TECHNOLOGY OFFICER",
    title: "CO-FOUNDER & CHIEF TECHNOLOGY OFFICER",
    tag: "SYSTEMS ARCHITECTURE",
    bio: "Leads engineering and technical architecture, focusing on reliable digital products, intelligent tools, and business systems.",
    image: "/image/team/leadership/Dawit.jpeg",
    position: "center 20%",
  },
  {
    id: "yohannes-tadesse",
    name: "YOHANNES TADESSE",
    role: "CO-FOUNDER & HEAD OF ARTIFICIAL INTELLIGENCE",
    title: "CO-FOUNDER & HEAD OF ARTIFICIAL INTELLIGENCE",
    tag: "APPLIED AI & RAG",
    bio: "Guides applied artificial intelligence and data systems, building practical tools that make information accessible and actionable.",
    image: "/image/team/leadership/Nisiha.jpeg",
    position: "center 20%",
  },
  {
    id: "solomon-kassahun",
    name: "SOLOMON KASSAHUN",
    role: "CO-FOUNDER & HEAD OF ENTERPRISE ENGINEERING",
    title: "CO-FOUNDER & HEAD OF ENTERPRISE ENGINEERING",
    tag: "DISTRIBUTED CLOUD & ERP",
    bio: "Oversees business platforms, operations engineering, and secure system integrations that keep company workflows running smoothly.",
    image: "/image/team/leadership/hosea.jpeg",
    position: "center 20%",
  },
];

/**
 * Concise role badges for slit cards to ensure crisp presentation without collision
 */
function getShortRole(role) {
  if (!role) return "";
  const upper = role.toUpperCase().trim();
  if (upper.includes("CHIEF EXECUTIVE OFFICER") || upper.includes("CEO")) {
    return upper.includes("CO-FOUNDER") ? "CO-FOUNDER & CEO" : "FOUNDER & CEO";
  }
  if (upper.includes("CHIEF OPERATING OFFICER") || upper.includes("COO")) {
    return upper.includes("CO-FOUNDER") ? "CO-FOUNDER & COO" : "OPERATING OFFICER";
  }
  if (upper.includes("CHIEF TECHNOLOGY OFFICER") || upper.includes("CTO")) {
    return upper.includes("CO-FOUNDER") ? "CO-FOUNDER & CTO" : "CHIEF TECH OFFICER";
  }
  if (upper.includes("ARTIFICIAL INTELLIGENCE") || upper.includes("AI")) {
    return upper.includes("CO-FOUNDER") ? "CO-FOUNDER & HEAD OF AI" : "HEAD OF AI";
  }
  if (upper.includes("ENTERPRISE") || upper.includes("ERP")) {
    return upper.includes("CO-FOUNDER") ? "CO-FOUNDER & HEAD OF ERP" : "HEAD OF ERP";
  }
  if (upper.length <= 22) return upper;
  return upper
    .replace("CHIEF TECHNOLOGY OFFICER", "CTO")
    .replace("CHIEF OPERATING OFFICER", "COO")
    .replace("CHIEF EXECUTIVE OFFICER", "CEO")
    .replace("ARTIFICIAL INTELLIGENCE", "AI")
    .replace("ENTERPRISE ENGINEERING", "ERP")
    .slice(0, 24);
}

/**
 * Kinetic Leadership Section
 *
 * Replicates the editorial dual-state layout:
 * - Resting state: Top manifesto intro with corner-bracketed button,
 *   and headline split across horizontal letterbox slits with floating VIEW badge.
 * - Active state: Morphs dynamically into a 2-column layout with the active leader in full portrait
 *   and full bio on the left, and remaining leaders in letterbox slits beside the continuing headline on the right.
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
          const list = execs.length > 0 ? execs : data.members;
          setFetchedLeaders(list);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const rawList =
    (fetchedLeaders && fetchedLeaders.length > 0 && fetchedLeaders) ||
    (initialLeaders && initialLeaders.length > 0 && initialLeaders) ||
    DEFAULT_PARTNERS;

  const partners = rawList.map((leader, idx) => {
    const defaultItem = DEFAULT_PARTNERS[idx] || DEFAULT_PARTNERS[0];
    const resolvedImage =
      leader.photoUrl || leader.image || defaultItem.image || "/image/team/leadership/Dawit.jpeg";

    return {
      id: leader.id || `leader-${idx}`,
      name: leader.name || defaultItem.name,
      role: leader.roleTitle || leader.role || defaultItem.role,
      title: leader.roleTitle || leader.role || defaultItem.title,
      tag: leader.focusTag || leader.specialty || leader.tag || defaultItem.tag,
      bio: leader.bio || defaultItem.bio,
      image: resolvedImage,
      position: leader.position || defaultItem.position || "center 20%",
    };
  });

  const activePartner =
    expandedIndex !== null
      ? partners.find((p) => p.id === expandedIndex) || partners[0]
      : null;

  const remainingPartners =
    expandedIndex !== null
      ? partners.filter((p) => p.id !== expandedIndex)
      : [];

  // Responsive grid columns based on number of leaders
  const gridColsClass =
    partners.length === 5
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
      : partners.length === 4
      ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-4"
      : partners.length === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-2 sm:grid-cols-3";

  return (
    <section
      id="leadership"
      aria-label="Our Leadership Team"
      className="relative w-full bg-[#0d0706] text-[#faf6ed] border-t border-b border-white/10 overflow-hidden py-14 sm:py-18 md:py-20 select-none"
    >
      {/* Top Label Bar */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 mb-8 sm:mb-10">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 font-parkinsans text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-white/60">
          <span>OUR LEADERSHIP TEAM</span>
          <span className="text-accent text-[10px]">DIRECTORS & ARCHITECTS</span>
        </div>
      </div>

      {/* Intro Manifesto & Corner-Bracketed Button */}
      <div className="w-full max-w-[640px] mx-auto px-4 text-center mb-8 sm:mb-10 flex flex-col items-center gap-6">
        <p className="font-parkinsans text-[12px] sm:text-[13px] text-white/60 uppercase tracking-[0.16em] leading-relaxed max-w-[500px]">
          The founders and engineering directors behind Gerat. Turning technical precision
          into dependable systems that endure.
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
             RESTING STATE: Centered Headlines + Slits
             ============================================================ */
          <div className="flex flex-col items-center w-full">
            {/* Top Line of Headline */}
            <div className="w-full text-center max-w-[980px] font-parkinsans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium sm:font-semibold tracking-tight uppercase leading-[1.05] text-white">
              <div>WE ARCHITECT THE FOUNDATIONS</div>
              <div>BEFORE THEY&apos;RE VISIBLE.</div>
            </div>

            {/* Horizontal Slits Row */}
            <div className={`grid ${gridColsClass} gap-3 sm:gap-4 md:gap-5 w-full max-w-[1240px] my-8 sm:my-10`}>
              {partners.map((partner, pIdx) => {
                const isHovered = hoveredIndex === partner.id;
                const isLastInOdd = partners.length === 5 && pIdx === 4;
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
                    className={`group/slit relative h-[115px] sm:h-[135px] md:h-[145px] w-full cursor-pointer rounded-[2px] overflow-hidden border border-white/15 hover:border-accent transition-all duration-300 bg-[#111111] outline-hidden focus-visible:ring-1 focus-visible:ring-accent ${
                      isLastInOdd ? "col-span-2 sm:col-span-1 lg:col-span-1" : ""
                    }`}
                  >
                    {/* Cropped Letterbox Image focusing on eyes/portrait */}
                    <div className="w-full h-full overflow-hidden rounded-[2px] bg-[#1a1a1a]">
                      <img
                        src={partner.image}
                        alt={partner.name}
                        loading="lazy"
                        className="w-full h-full object-cover grayscale contrast-115 group-hover/slit:scale-105 group-hover/slit:grayscale-0 transition-all duration-500"
                        style={{ objectPosition: partner.position }}
                        onError={(e) => {
                          e.target.src = "/image/team/leadership/Dawit.jpeg";
                        }}
                      />
                    </div>

                    {/* Floating Pill VIEW Badge */}
                    <div
                      className={`absolute top-2.5 right-2.5 z-20 transition-all duration-300 pointer-events-none ${
                        isHovered
                          ? "opacity-100 translate-y-0 scale-100"
                          : "opacity-0 translate-y-1 scale-90"
                      }`}
                    >
                      <div className="flex items-center justify-center bg-[#EA5B15] text-white px-2 py-0.5 rounded-[2px] shadow-lg border border-white/20">
                        <span className="font-parkinsans text-[8.5px] sm:text-[9px] tracking-[0.2em] uppercase font-bold text-white">
                          VIEW
                        </span>
                      </div>
                    </div>

                    {/* Bottom Metadata in Slit - Stacked Column so role never overlaps name */}
                    <div
                      data-dark-overlay="true"
                      className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-2.5 sm:p-3 flex flex-col justify-end z-10 pointer-events-none"
                    >
                      <span
                        className="font-parkinsans text-[10px] sm:text-[11px] tracking-[0.16em] uppercase font-bold text-white dark-overlay-text force-text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] truncate"
                        style={{ color: "#FAF6ED" }}
                      >
                        {partner.name}
                      </span>
                      <span
                        className="font-parkinsans text-[8.5px] sm:text-[9.5px] tracking-[0.18em] uppercase text-accent font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] truncate mt-0.5"
                        style={{ color: "#EA5B15" }}
                        title={partner.role}
                      >
                        {getShortRole(partner.role)}
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
             ACTIVE / EXPANDED STATE: 2-Column Morph
             ============================================================ */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center w-full max-w-[1280px] mx-auto animate-in fade-in zoom-in-95 duration-400">
            {/* Left Column: Full Portrait Card of Active Leader */}
            <div className="lg:col-span-5 flex flex-col items-start w-full">
              <div className="relative aspect-4/5 w-full max-w-[460px] mx-auto lg:mx-0 rounded-[3px] overflow-hidden bg-[#111111] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
                {/* Full Portrait Image */}
                <img
                  src={activePartner.image}
                  alt={activePartner.name}
                  className="w-full h-full object-cover object-top grayscale contrast-110"
                  onError={(e) => {
                    e.target.src = "/image/team/leadership/Dawit.jpeg";
                  }}
                />

                {/* Bottom-Right Badge: [ROLE] */}
                <div
                  data-dark-overlay="true"
                  className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 max-w-[calc(100%-1.5rem)] flex items-center bg-black/85 backdrop-blur-xs px-2.5 sm:px-3 py-1.5 border border-white/25 rounded-[2px]"
                >
                  <span
                    className="font-parkinsans text-[9px] sm:text-[10px] tracking-[0.18em] text-[#faf6ed] uppercase font-bold dark-overlay-text truncate"
                    style={{ color: "#FAF6ED" }}
                    title={activePartner.role}
                  >
                    {activePartner.role}
                  </span>
                </div>
              </div>

              {/* Bottom Metadata & Bio */}
              <div className="w-full max-w-[460px] mt-4 flex flex-col gap-2.5 px-1">
                <div className="flex items-center justify-between gap-4 font-parkinsans">
                  <span className="font-bold text-white text-[13px] sm:text-[14px] tracking-[0.18em] uppercase truncate">
                    {activePartner.name}
                  </span>

                  <button
                    onClick={() => setExpandedIndex(null)}
                    className="text-white/50 hover:text-accent transition-colors cursor-pointer text-[10px] tracking-[0.15em] uppercase shrink-0 py-0.5 px-1"
                    title="Close expanded view"
                  >
                    [ CLOSE × ]
                  </button>
                </div>

                {activePartner.tag && (
                  <div className="font-artific text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-accent font-medium">
                    {activePartner.tag}
                  </div>
                )}

                {activePartner.bio && (
                  <p className="font-artific text-xs sm:text-sm text-white/75 leading-relaxed pt-0.5">
                    {activePartner.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Headline + Remaining Slits */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Top Headline */}
              <div className="font-parkinsans text-3xl sm:text-4xl md:text-5xl font-medium sm:font-semibold tracking-tight uppercase leading-[1.05] text-white">
                <div>WE ARCHITECT THE FOUNDATIONS</div>
                <div>BEFORE THEY&apos;RE VISIBLE.</div>
              </div>

              {/* The Remaining Letterbox Slits */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 my-6 sm:my-8">
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
                      className="group/slit relative h-[95px] sm:h-[110px] w-full cursor-pointer rounded-[2px] overflow-hidden border border-white/15 hover:border-accent transition-all duration-300 bg-[#111111] outline-hidden focus-visible:ring-1 focus-visible:ring-accent"
                    >
                      <div className="w-full h-full overflow-hidden rounded-[2px] bg-[#1a1a1a]">
                        <img
                          src={partner.image}
                          alt={partner.name}
                          loading="lazy"
                          className="w-full h-full object-cover grayscale contrast-115 group-hover/slit:scale-105 group-hover/slit:grayscale-0 transition-all duration-500"
                          style={{ objectPosition: partner.position }}
                          onError={(e) => {
                            e.target.src = "/image/team/leadership/Dawit.jpeg";
                          }}
                        />
                      </div>

                      {/* Floating Pill VIEW Badge */}
                      <div
                        className={`absolute top-2 right-2 z-20 transition-all duration-300 pointer-events-none ${
                          isHovered
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-1 scale-90"
                        }`}
                      >
                        <span className="inline-flex items-center bg-[#EA5B15] text-white font-parkinsans text-[8px] sm:text-[8.5px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-[2px] shadow-md border border-white/20">
                          VIEW
                        </span>
                      </div>

                      <div className="absolute inset-0 bg-black/20 group-hover/slit:bg-transparent transition-colors pointer-events-none rounded-[2px]" />

                      {/* Bottom Metadata in Slit */}
                      <div
                        data-dark-overlay="true"
                        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-2 sm:p-2.5 flex flex-col justify-end z-10 pointer-events-none"
                      >
                        <span
                          className="font-parkinsans text-[9px] sm:text-[10px] tracking-[0.16em] uppercase font-bold text-white dark-overlay-text force-text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] truncate"
                          style={{ color: "#FAF6ED" }}
                        >
                          {partner.name}
                        </span>
                        <span
                          className="font-parkinsans text-[8px] sm:text-[8.5px] tracking-[0.16em] uppercase text-accent font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] truncate mt-0.5"
                          style={{ color: "#EA5B15" }}
                          title={partner.role}
                        >
                          {getShortRole(partner.role)}
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
