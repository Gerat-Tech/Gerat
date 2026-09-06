"use client";

import React from "react";
import SectionLabel from "@/components/common/SectionLabel";
import SplitText from "@/components/motion/SplitText";
import FadeUp from "@/components/motion/FadeUp";

export default function InsightsHero({ activeCategory, onSelectCategory }) {
  const categories = [
    "ALL ARTICLES",
    "SYSTEM ARCHITECTURE",
    "APPLIED AI",
    "ENTERPRISE ERP",
    "SECURITY",
  ];

  return (
    <div className="relative w-full max-w-[1440px] mx-auto pt-32 sm:pt-40 pb-12 px-4 sm:px-6 md:px-8 lg:px-10 text-white">
      <div className="flex flex-col gap-6 max-w-4xl">
        <SectionLabel index="05" label="RESEARCH & TECHNICAL BLUEPRINTS" />

        <div className="space-y-1 sm:space-y-2">
          <SplitText
            text="SYSTEM ARCHITECTURE,"
            as="h1"
            className="font-roc text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight uppercase leading-[0.92]"
          />
          <SplitText
            text="APPLIED AI & ENGINEERING."
            as="div"
            wordClassName="text-accent"
            className="font-roc text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight uppercase leading-[0.92]"
          />
        </div>

        <FadeUp delay={0.3} y={16}>
          <p className="font-roc text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
            Technical analyses, architectural design patterns, and engineering
            whitepapers authored by the software practitioners at Gerat Software
            Solutions PLC.
          </p>
        </FadeUp>

        {/* Category Filters */}
        <FadeUp delay={0.4} y={16}>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-4 font-azeret text-[10px] tracking-[0.2em] uppercase select-none">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onSelectCategory(cat)}
                  className={`px-4 py-2 border rounded-[2px] transition-all duration-300 ${
                    isSelected
                      ? "border-accent bg-accent text-white font-bold"
                      : "border-white/15 text-white/60 hover:text-white hover:border-white/40 bg-white/[0.02]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </FadeUp>
      </div>

      <div className="mt-12 pt-4 border-t border-white/10 flex items-center justify-between font-azeret text-[10px] tracking-[0.2em] text-white/40 uppercase">
        <span>PUBLICATIONS // TECHNICAL ARCHIVES</span>
        <span>SCROLL TO READ ARTICLES ↓</span>
      </div>
    </div>
  );
}
