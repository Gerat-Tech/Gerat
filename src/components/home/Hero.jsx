"use client";

import React from "react";
import Link from "next/link";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";
import Magnetic from "../motion/Magnetic";
import GeratLogo from "../common/GeratLogo";
import { useNav } from "@/context/NavContext";

/**
 * Section 01: HERO — THE PROMISE (V2 Redesign)
 * A spacious, calm, and breathable opening statement.
 * Replaces the busy 3D canvas with an elegant architectural composition.
 */
export default function Hero() {
  const { openContact } = useNav();

  const handleExploreClick = (e) => {
    e.preventDefault();
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[100dvh] w-full bg-[var(--bg)] text-white flex flex-col justify-between overflow-hidden pt-32 sm:pt-40 pb-12"
    >
      {/* Calm, architectural ambient background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[400px] bg-accent/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute right-0 top-1/3 w-[350px] h-[350px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      {/* Main Editorial Hero Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 my-auto">
        <div className="max-w-4xl flex flex-col gap-6 sm:gap-8">
          {/* Eyebrow Label */}
          <FadeUp delay={0.1} y={16}>
            <div className="inline-flex items-center gap-3 font-artific text-[10px] sm:text-[11px] tracking-[0.25em] text-white/50 uppercase font-medium">
              <span className="text-accent font-semibold">GERAT SOFTWARE SOLUTION</span>
              <span className="text-white/20">·</span>
              <span className="hidden sm:inline text-white/70">ADDIS ABABA · EST. 2026</span>
            </div>
          </FadeUp>

          {/* Main Headline */}
          <div className="space-y-1 sm:space-y-2">
            <SplitText
              text="BUILD WHAT MOVES"
              as="h1"
              delay={0.15}
              stagger={0.035}
              className="font-parkinsans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight uppercase leading-[0.92]"
            />
            <SplitText
              text="YOUR BUSINESS FORWARD."
              as="div"
              delay={0.3}
              stagger={0.035}
              wordClassName="text-accent"
              className="font-parkinsans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight uppercase leading-[0.92]"
            />
          </div>

          {/* Supporting Statement */}
          <FadeUp delay={0.45} y={20} className="max-w-2xl">
            <p className="font-artific text-base sm:text-lg md:text-xl text-white/75 font-normal leading-relaxed">
              We build websites, AI solutions, business systems, and brand identities that help businesses work better and grow with confidence.
            </p>
          </FadeUp>

          {/* Interactive CTA Buttons */}
          <FadeUp delay={0.6} y={20}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 pt-2">
              {/* Primary Contact CTA */}
              <Magnetic maxDisplacement={8}>
                <button
                  type="button"
                  onClick={openContact}
                  className="group relative isolate inline-flex items-center justify-center font-parkinsans text-[11px] sm:text-[12px] uppercase tracking-[0.2em] px-8 sm:px-10 py-4 bg-accent text-white font-bold hover:bg-white hover:text-black border border-accent hover:border-white transition-all duration-300 rounded-[2px] text-center shadow-lg select-none cursor-pointer"
                >
                  <span>START A PROJECT</span>
                  <span className="ml-2.5 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </Magnetic>

              {/* Secondary Explore CTA */}
              <Magnetic maxDisplacement={8}>
                <button
                  type="button"
                  onClick={handleExploreClick}
                  className="group relative isolate inline-flex items-center justify-center font-parkinsans text-[11px] sm:text-[12px] uppercase tracking-[0.2em] px-7 sm:px-9 py-4 bg-transparent text-white/80 hover:text-white border border-white/20 hover:border-accent hover:text-accent transition-all duration-300 rounded-[2px] text-center select-none cursor-pointer"
                >
                  <span>EXPLORE WHAT WE BUILD</span>
                  <span className="ml-2 text-white/40 group-hover:text-accent group-hover:translate-y-0.5 transition-all duration-300">
                    ↓
                  </span>
                </button>
              </Magnetic>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Bottom Architectural Anchor Bar */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 mt-12">
        <div className="w-full border-t border-white/10 pt-5 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleExploreClick}
            className="flex items-center gap-3 font-parkinsans text-[10px] tracking-[0.2em] text-white/50 hover:text-accent uppercase transition-colors cursor-pointer"
          >
            <span className="text-accent animate-bounce">↓</span>
            <span>SCROLL TO EXPLORE</span>
          </button>

          <div className="flex items-center gap-4 text-right">
            <span className="hidden sm:inline font-parkinsans text-[9px] text-white/40 uppercase tracking-[0.18em]">
              DIGITAL · AI · SYSTEMS · BRAND
            </span>
            <div className="size-7 rounded-[2px] border border-white/15 bg-white/5 flex items-center justify-center text-accent">
              <GeratLogo variant="mark" className="size-4 text-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
