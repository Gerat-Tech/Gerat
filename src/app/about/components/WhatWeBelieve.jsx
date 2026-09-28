"use client";

import React, { useState } from "react";
import FadeUp from "@/components/motion/FadeUp";
import SplitText from "@/components/motion/SplitText";

const PRINCIPLES = [
  {
    id: "01",
    title: "SOLVE THE REAL PROBLEM",
    tags: "PRACTICAL PURPOSE · IMMEDIATE UTILITY · MEASURABLE OUTCOMES",
    description:
      "We start with the actual business bottleneck, not the technology trend. If a solution does not create tangible value, it does not belong in your system.",
  },
  {
    id: "02",
    title: "MAKE COMPLEX THINGS CLEAR",
    tags: "INTUITIVE INTERFACES · CLEAN ARCHITECTURE · FRICTIONLESS FLOWS",
    description:
      "Good software and design reduce cognitive load. We transform complicated workflows into direct, reliable tools that your team and customers understand and enjoy.",
  },
  {
    id: "03",
    title: "STRONG FOUNDATIONS FIRST",
    tags: "STABLE BACKBONE · SCALABLE INFRASTRUCTURE · RESILIENT CODE",
    description:
      "Quick shortcuts become tomorrow's technical debt. We engineer every platform with structural stability so it effortlessly carries the weight of future growth.",
  },
  {
    id: "04",
    title: "STAY ACCOUNTABLE",
    tags: "LONG-TERM PARTNERSHIP · CLIENT EMPOWERMENT · ENDURING SUPPORT",
    description:
      "Our commitment does not end when your product goes live. We equip you with complete ownership, clear documentation, and proactive support as your business scales.",
  },
];

/**
 * What We Believe Section
 * Redesigned to match the reference layout:
 * - Warm Cream background (#FAF6ED)
 * - Deep Coffee Bean typography (#300F0A) with Flame Orange accent (#EA5B15)
 * - Eyebrow with small geometric orange square (NO red dots)
 * - Large 2-line display headline with subhead paragraph
 * - Clean horizontal row cards with left column (Title + Tags) and right column (Description + Arrow/Explore)
 * - Active row highlight with left orange border and subtle warm background tint
 */
export default function WhatWeBelieve() {
  const [activeRow, setActiveRow] = useState(1);

  return (
    <section
      id="what-we-believe"
      aria-label="What We Believe"
      className="w-full bg-[#FAF6ED] text-[#300F0A] relative scroll-mt-24 py-20 sm:py-28 lg:py-36 border-b border-[#300F0A]/10 overflow-hidden"
      style={{ backgroundColor: "#FAF6ED" }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* =====================================================================
            SECTION HEADER (Matching Screenshot Hierarchy)
           ===================================================================== */}
        <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-20">
          {/* Eyebrow: Tracked Label (Zero dots) */}
          <div className="mb-5 sm:mb-6">
            <span className="font-artific text-xs uppercase tracking-[0.22em] font-semibold text-[#300F0A]/70">
              WHAT WE BELIEVE
            </span>
          </div>

          {/* Large Display Headline */}
          <div className="space-y-1 sm:space-y-2">
            <SplitText
              text="SIMPLE PRINCIPLES."
              as="h2"
              delay={0.1}
              stagger={0.035}
              className="font-parkinsans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight uppercase leading-[1.08] text-[#300F0A]"
            />
            <SplitText
              text="HIGH STANDARDS."
              as="div"
              delay={0.25}
              stagger={0.035}
              wordClassName="text-accent"
              className="font-parkinsans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight uppercase leading-[1.08]"
            />
          </div>

          {/* Subhead Paragraph */}
          <FadeUp delay={0.35} y={15}>
            <p className="mt-5 sm:mt-6 font-artific text-sm sm:text-base md:text-lg text-[#300F0A]/70 max-w-2xl leading-relaxed">
              Every business needs a strong foundation, a clear path, and systems that can carry what comes next.
            </p>
          </FadeUp>
        </div>

        {/* =====================================================================
            HORIZONTAL ROWS LIST (Exact Screenshot Accordion Style)
           ===================================================================== */}
        <div className="w-full border-t border-[#300F0A]/10">
          {PRINCIPLES.map((principle, idx) => {
            const isActive = activeRow === idx;

            return (
              <div
                key={principle.id}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                onClick={() => setActiveRow(idx)}
                onMouseEnter={() => setActiveRow(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveRow(idx);
                  }
                }}
                className={`group relative w-full border-b border-[#300F0A]/10 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#F1DFD9]/25 border-l-[3px] border-l-accent pl-5 sm:pl-7 pr-4 sm:pr-8 py-8 sm:py-10"
                    : "bg-transparent border-l-[3px] border-l-transparent hover:bg-[#F1DFD9]/15 pl-5 sm:pl-7 pr-4 sm:pr-8 py-8 sm:py-10"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-12">
                  {/* Left Column: Title and Subtitle Tags */}
                  <div className="lg:col-span-5 space-y-2">
                    <h3
                      className={`font-parkinsans text-xl sm:text-2xl md:text-[26px] font-bold uppercase tracking-tight transition-colors duration-200 ${
                        isActive ? "text-[#300F0A]" : "text-[#300F0A]/90 group-hover:text-[#300F0A]"
                      }`}
                    >
                      {principle.title}
                    </h3>
                    <p className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#300F0A]/55 font-medium">
                      {principle.tags}
                    </p>
                  </div>

                  {/* Right Column: Narrative Description and Action Indicator */}
                  <div className="lg:col-span-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8">
                    <p className="font-artific text-sm sm:text-base text-[#300F0A]/75 leading-relaxed max-w-xl">
                      {principle.description}
                    </p>

                    {/* Right Action: Arrow Indicator */}
                    <div className="flex items-center shrink-0 self-end sm:self-center">
                      <span
                        className={`text-xl transition-all duration-300 ${
                          isActive
                            ? "text-accent translate-x-1"
                            : "text-[#300F0A]/30 group-hover:text-accent group-hover:translate-x-1"
                        }`}
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
