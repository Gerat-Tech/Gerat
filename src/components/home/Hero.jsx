"use client";

import React from "react";
import Link from "next/link";
import HeroDataField from "../three/HeroDataField";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";
import Magnetic from "../motion/Magnetic";
import GeratLogo from "../common/GeratLogo";
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
      className="relative min-h-[100dvh] w-full bg-[var(--bg)] text-white flex flex-col justify-between overflow-hidden pt-28 sm:pt-32 pb-10"
    >
      {/* Background 3D Procedural Particle Scene (Spec §11) */}
      <HeroDataField />

      {/* Main Editorial Hero Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 my-auto">
        <div className="max-w-4xl flex flex-col gap-6 sm:gap-8">
          {/* Eyebrow Telemetry (Spec §10) */}
          <FadeUp delay={0.1} y={16}>
            <div className="inline-flex items-center gap-3 font-artific text-[10px] sm:text-[11px] tracking-[0.25em] text-white/50 uppercase font-medium">
              <span className="size-1.5 rounded-[1px] bg-accent" />
              <span className="text-white/80">GERAT SOFTWARE SOLUTION</span>
              <span className="text-white/20">·</span>
              <span className="hidden sm:inline">ADDIS ABABA · EST. 2026</span>
            </div>
          </FadeUp>

          {/* Main Asymmetrical Headline (Spec §10, §17) */}
          <div className="space-y-1 sm:space-y-2">
            <SplitText
              text="WE BUILD THE BRIDGE."
              as="h1"
              delay={0.2}
              stagger={0.04}
              className="font-parkinsans text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-medium sm:font-semibold tracking-tight uppercase leading-[0.92]"
            />
            <SplitText
              text="YOU CROSS IT."
              as="div"
              delay={0.35}
              stagger={0.04}
              wordClassName="text-accent"
              className="font-parkinsans text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-medium sm:font-semibold tracking-tight uppercase leading-[0.92]"
            />
          </div>

          {/* Supporting Statement (Content Guide §5, §77) */}
          <FadeUp delay={0.45} y={24} className="max-w-2xl">
            <p className="font-artific text-base sm:text-lg md:text-xl text-white/80 font-normal leading-relaxed">
              We connect your business to the people it serves — through digital
              experiences, intelligent tools, business systems, and strong brands.
            </p>
          </FadeUp>

          {/* Interactive CTA Buttons (Content Guide §5 & Mobile-First) */}
          <FadeUp delay={0.6} y={24}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 pt-2">
              {/* Primary Contact CTA - Highest Focus */}
              <Magnetic maxDisplacement={8}>
                <button
                  type="button"
                  onClick={openContact}
                  data-cursor-text="INQUIRE"
                  className="group relative isolate inline-flex items-center justify-center font-parkinsans text-[11px] sm:text-[12px] uppercase tracking-[0.2em] px-7 sm:px-9 py-3.5 bg-accent text-white font-bold border border-accent hover:bg-[#300F0A] hover:border-[#300F0A] transition-all duration-300 rounded-[2px] text-center shadow-md select-none cursor-pointer"
                >
                  <span>START A PROJECT</span>
                  <span className="ml-2.5 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </Magnetic>

              {/* Secondary Explore Work CTA - Less Focused, Links to Section 03 Selected Work */}
              <Magnetic maxDisplacement={8}>
                <Link
                  href="#portfolio"
                  data-cursor-text="EXPLORE"
                  className="group relative isolate inline-flex items-center justify-center font-parkinsans text-[11px] sm:text-[12px] uppercase tracking-[0.2em] px-6 sm:px-8 py-3.5 bg-transparent text-white/80 hover:text-white border border-white/20 hover:border-accent hover:text-accent transition-all duration-300 rounded-[2px] text-center select-none"
                >
                  <span>SEE WHAT WE BUILD</span>
                  <span className="ml-2 text-white/40 group-hover:text-accent group-hover:translate-y-0.5 transition-all duration-300">
                    ↓
                  </span>
                </Link>
              </Magnetic>
            </div>
          </FadeUp>

          {/* Capabilities Metadata Tags (Image 2 Fix — 4 Core Pillars) */}
          <FadeUp delay={0.7} y={16}>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 pt-4 font-parkinsans text-[9px] sm:text-[10px] tracking-[0.2em] text-white/40 uppercase">
              <span className="hover:text-white transition-colors">DIGITAL</span>
              <span className="text-white/20">·</span>
              <span className="hover:text-white transition-colors">INTELLIGENCE</span>
              <span className="text-white/20">·</span>
              <span className="hover:text-white transition-colors">SYSTEMS</span>
              <span className="text-white/20">·</span>
              <span className="hover:text-white transition-colors">BRAND</span>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Bottom Architectural Anchor (Spec §10) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 mt-8">
        <div className="w-full border-t border-white/10 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 font-parkinsans text-[10px] tracking-[0.2em] text-white/50 uppercase">
            <span className="animate-bounce text-accent">↓</span>
            <span>SCROLL TO EXPLORE</span>
          </div>

          <div className="flex items-center gap-6 text-right">
            <p className="hidden md:block max-w-sm font-parkinsans text-[9px] text-white/40 uppercase tracking-[0.15em] leading-relaxed">
              DIGITAL EXPERIENCES, INTELLIGENT TOOLS, BUSINESS SYSTEMS, AND BRAND IDENTITIES.
            </p>
            <div className="size-7 rounded-[2px] border border-white/15 bg-white/5 flex items-center justify-center text-accent">
              <GeratLogo variant="mark" className="size-4 text-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
