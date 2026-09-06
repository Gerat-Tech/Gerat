"use client";

import React from "react";
import SectionLabel from "@/components/common/SectionLabel";
import SplitText from "@/components/motion/SplitText";
import FadeUp from "@/components/motion/FadeUp";
import { useNav } from "@/context/NavContext";
import { servicePillars } from "@/content";

export default function ServicesOverview() {
  const { openContact } = useNav();

  return (
    <div className="w-full text-white">
      {/* Services Hero */}
      <section className="relative w-full max-w-[1440px] mx-auto pt-32 sm:pt-40 pb-16 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex flex-col gap-6 max-w-4xl">
          <SectionLabel index="02" label="SERVICES & PLATFORM ARCHITECTURE" />

          <div className="space-y-1 sm:space-y-2">
            <SplitText
              text="PURPOSE-BUILT DIGITAL SYSTEMS."
              as="h1"
              className="font-roc text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight uppercase leading-[0.92]"
            />
            <SplitText
              text="MISSION-CRITICAL DELIVERY."
              as="div"
              wordClassName="text-accent"
              className="font-roc text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight uppercase leading-[0.92]"
            />
          </div>

          <FadeUp delay={0.3} y={16}>
            <p className="font-roc text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
              We engineer bespoke digital platforms, enterprise software, and
              applied AI systems designed to solve foundational operational
              challenges for institutions, enterprises, and public services.
            </p>
          </FadeUp>

          <FadeUp delay={0.4} y={16}>
            <button
              type="button"
              onClick={openContact}
              className="inline-flex items-center font-azeret text-[11px] uppercase tracking-[0.2em] px-8 py-4 bg-accent text-white font-bold hover:bg-white hover:text-black transition-all rounded-[2px]"
            >
              <span>DISCUSS YOUR SYSTEM REQUIREMENTS</span>
              <span className="ml-2">→</span>
            </button>
          </FadeUp>
        </div>

        <div className="mt-12 pt-4 border-t border-white/10 flex items-center justify-between font-azeret text-[10px] tracking-[0.2em] text-white/40 uppercase">
          <span>PILLARS // 04 CORE ENGINEERING PRACTICES</span>
          <span>EXPLORE ARCHITECTURE ↓</span>
        </div>
      </section>

      {/* Pillars Deck */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pb-24 sm:pb-36">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicePillars.map((pillar, idx) => (
            <FadeUp key={pillar.num} delay={0.1 * idx} y={24}>
              <div className="group relative bg-[#0e0e0e] border border-white/10 hover:border-accent/60 p-8 sm:p-10 rounded-[4px] flex flex-col justify-between min-h-[380px] transition-all duration-300 h-full">
                {/* Precision Corner Accents */}
                <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30 group-hover:border-accent transition-colors" />
                <span className="absolute top-0 right-0 size-2 border-t border-r border-white/30 group-hover:border-accent transition-colors" />
                <span className="absolute bottom-0 left-0 size-2 border-b border-l border-white/30 group-hover:border-accent transition-colors" />
                <span className="absolute bottom-0 right-0 size-2 border-b border-r border-white/30 group-hover:border-accent transition-colors" />

                <div className="flex items-center justify-between">
                  <span className="font-azeret text-[11px] tracking-[0.2em] text-accent font-bold">
                    PRACTICE // {pillar.num}
                  </span>
                  <div className="size-2 rounded-[1px] bg-white/20 group-hover:bg-accent transition-colors" />
                </div>

                <div className="flex flex-col gap-3 my-6">
                  <span className="font-azeret text-[9px] tracking-[0.2em] text-white/50 uppercase">
                    {pillar.tagline}
                  </span>
                  <h2 className="font-roc text-2xl sm:text-3xl font-bold tracking-tight uppercase text-white group-hover:text-accent transition-colors">
                    {pillar.title}
                  </h2>
                  <p className="font-roc text-xs sm:text-sm text-white/70 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <span className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase block mb-3">
                    CORE DELIVERABLES
                  </span>
                  <ul className="space-y-1.5 font-azeret text-[10px] tracking-[0.15em] text-white/60">
                    {pillar.deliverables.map((del) => (
                      <li key={del} className="flex items-center gap-2">
                        <span className="text-accent">•</span>
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </div>
  );
}
