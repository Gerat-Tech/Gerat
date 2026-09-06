"use client";

import React from "react";
import SectionLabel from "@/components/common/SectionLabel";
import SplitText from "@/components/motion/SplitText";
import FadeUp from "@/components/motion/FadeUp";

/**
 * Editorial Team Hero (Spec §28, Content Replacement §6)
 */
export default function TeamHero() {
  return (
    <div className="relative w-full max-w-[1440px] mx-auto pt-32 sm:pt-40 pb-12 px-4 sm:px-6 md:px-8 lg:px-10 text-white">
      <div className="flex flex-col gap-6 max-w-4xl">
        <SectionLabel index="04" label="LEADERSHIP & ENGINEERING" />

        <div className="space-y-1 sm:space-y-2">
          <SplitText
            text="ENGINEERED WITH RIGOR."
            as="h1"
            className="font-roc text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight uppercase leading-[0.92]"
          />
          <SplitText
            text="LED BY PRACTITIONERS."
            as="div"
            wordClassName="text-accent"
            className="font-roc text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight uppercase leading-[0.92]"
          />
        </div>

        <FadeUp delay={0.3} y={16}>
          <p className="font-roc text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
            A specialized collective of software architects, artificial
            intelligence researchers, and distributed systems specialists
            designing and deploying high-stakes digital products for
            institutions, enterprises, and public services.
          </p>
        </FadeUp>
      </div>

      {/* Sub-Header Anchor Rule */}
      <div className="mt-12 pt-4 border-t border-white/10 flex items-center justify-between font-azeret text-[10px] tracking-[0.2em] text-white/40 uppercase">
        <span>COLLECTIVE // SYSTEM ARCHITECTS & RESEARCHERS</span>
        <span>SCROLL TO MEET THE TEAM ↓</span>
      </div>
    </div>
  );
}
