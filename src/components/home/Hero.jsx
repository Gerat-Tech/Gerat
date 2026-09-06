"use client";

import React from "react";
import Link from "next/link";
import HeroDataField from "../three/HeroDataField";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";
import Magnetic from "../motion/Magnetic";
import { useNav } from "@/context/NavContext";

/**
 * Editorial Deep-Tech Hero Section (Spec §10, §11, Content Replacement §2)
 * Features asymmetrical headline typography, procedural data-flow particle scene,
 * interactive CTA controls, and technical telemetry metadata.
 */
export default function Hero() {
  const { openContact } = useNav();

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[100dvh] w-full bg-[#050505] text-white flex flex-col justify-between overflow-hidden pt-28 sm:pt-32 pb-10"
    >
      {/* Background 3D Procedural Particle Scene (Spec §11) */}
      <HeroDataField />

      {/* Main Editorial Hero Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 my-auto">
        <div className="max-w-4xl flex flex-col gap-6 sm:gap-8">
          {/* Eyebrow Telemetry (Spec §10) */}
          <FadeUp delay={0.1} y={16}>
            <div className="inline-flex items-center gap-3 font-azeret text-[10px] sm:text-[11px] tracking-[0.25em] text-white/50 uppercase">
              <span className="size-1.5 rounded-[1px] bg-accent animate-corner-pulse" />
              <span className="text-white/80">GERAT SOFTWARE SOLUTIONS PLC</span>
              <span className="text-white/20">|</span>
              <span className="hidden sm:inline">SYS_REF // 2026</span>
            </div>
          </FadeUp>

          {/* Main Asymmetrical Headline (Spec §10, §17) */}
          <div className="space-y-1 sm:space-y-2">
            <SplitText
              text="TECHNOLOGY THAT MOVES"
              as="h1"
              delay={0.2}
              stagger={0.04}
              className="font-roc text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight uppercase leading-[0.92]"
            />
            <SplitText
              text="REAL SYSTEMS."
              as="div"
              delay={0.35}
              stagger={0.04}
              wordClassName="text-accent"
              className="font-roc text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight uppercase leading-[0.92]"
            />
          </div>

          {/* Supporting Statement (Content §2) */}
          <FadeUp delay={0.45} y={24} className="max-w-2xl">
            <p className="font-roc text-base sm:text-lg md:text-xl text-white/70 font-normal leading-relaxed">
              We design and engineer digital systems for businesses,
              enterprises, and public-sector operations — turning complex
              workflows into intelligent, scalable, and resilient digital
              products.
            </p>
          </FadeUp>

          {/* Interactive CTA Buttons (Spec §10, §23) */}
          <FadeUp delay={0.6} y={24}>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              {/* Primary Contact CTA */}
              <Magnetic maxDisplacement={8}>
                <button
                  type="button"
                  onClick={openContact}
                  data-cursor-text="INQUIRE"
                  className="group relative isolate inline-flex items-center justify-center font-azeret text-[11px] sm:text-[12px] uppercase tracking-[0.2em] px-6 sm:px-8 py-3.5 bg-white text-black font-semibold border border-white hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 rounded-[2px]"
                >
                  <span>START A PROJECT</span>
                  {/* Precision Corner Accents */}
                  <span className="absolute -top-[1px] -left-[1px] size-2 border-t border-l border-white group-hover:border-accent" />
                  <span className="absolute -top-[1px] -right-[1px] size-2 border-t border-r border-white group-hover:border-accent" />
                  <span className="absolute -bottom-[1px] -left-[1px] size-2 border-b border-l border-white group-hover:border-accent" />
                  <span className="absolute -bottom-[1px] -right-[1px] size-2 border-b border-r border-white group-hover:border-accent" />
                </button>
              </Magnetic>

              {/* Secondary Portfolio CTA */}
              <Magnetic maxDisplacement={8}>
                <Link
                  href="/portfolio"
                  data-cursor-text="EXPLORE"
                  className="group relative isolate inline-flex items-center justify-center font-azeret text-[11px] sm:text-[12px] uppercase tracking-[0.2em] px-6 sm:px-8 py-3.5 bg-transparent text-white/80 hover:text-white border border-white/20 hover:border-white/60 transition-all duration-300 rounded-[2px]"
                >
                  <span>EXPLORE WORK</span>
                  <span className="ml-2 text-white/40 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300">
                    →
                  </span>
                  <span className="absolute -top-[1px] -left-[1px] size-1.5 border-t border-l border-white/40" />
                  <span className="absolute -bottom-[1px] -right-[1px] size-1.5 border-b border-r border-white/40" />
                </Link>
              </Magnetic>
            </div>
          </FadeUp>

          {/* Capabilities Metadata Tags (Spec §2, §4) */}
          <FadeUp delay={0.7} y={16}>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 font-azeret text-[9px] sm:text-[10px] tracking-[0.2em] text-white/40 uppercase">
              <span>ARTIFICIAL INTELLIGENCE</span>
              <span className="text-white/20">//</span>
              <span>RAG SYSTEMS</span>
              <span className="text-white/20">//</span>
              <span>ENTERPRISE ERP</span>
              <span className="text-white/20">//</span>
              <span>GOVERNMENT TECH</span>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Bottom Architectural Anchor (Spec §10) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 mt-8">
        <div className="w-full border-t border-white/10 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 font-azeret text-[10px] tracking-[0.2em] text-white/50 uppercase">
            <span className="animate-bounce text-accent">↓</span>
            <span>SCROLL TO EXPLORE</span>
          </div>

          <div className="flex items-center gap-6 text-right">
            <p className="hidden md:block max-w-sm font-azeret text-[9px] text-white/40 uppercase tracking-[0.15em] leading-relaxed">
              OPERATING AT THE INTERSECTION OF DEEP ENGINEERING, ARCHITECTURAL DESIGN, AND MISSION-CRITICAL SOFTWARE.
            </p>
            <div className="size-7 rounded-[2px] border border-white/15 bg-white/5 flex items-center justify-center text-white/80">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none">
                <path d="M3 5V19H19V13H11V11H21V5H3Z" fill="currentColor" />
                <rect x="13" y="15" width="4" height="4" fill="var(--accent, #ff4a00)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
