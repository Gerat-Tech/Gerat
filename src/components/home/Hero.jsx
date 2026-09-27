"use client";

import React from "react";
import BrandBridgeAnimation from "../common/BrandBridgeAnimation";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";
import Magnetic from "../motion/Magnetic";
import { useNav } from "@/context/NavContext";

/**
 * Section 01: HERO — THE PROMISE
 *
 * Editorial layout featuring:
 * - Left-aligned typography and brand statement
 * - Official Brand Bridge 3-wave animation placed on the right side
 * - Small, clean eyebrow tag with no red dot and no city tag
 * - High-contrast responsive styling adapting between light and dark modes
 * - Direct action controls into the contact drawer and capabilities section
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
      className="relative min-h-[96dvh] w-full bg-[var(--surface)] text-[var(--text-primary)] flex flex-col justify-center overflow-hidden pt-36 sm:pt-44 md:pt-48 pb-20 sm:pb-28"
    >
      {/* Ambient Flame Glow Background */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent/[0.06] rounded-full blur-[140px] pointer-events-none"
      />

      {/* Main Editorial Hero Content: 2-Column Responsive Layout */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Eyebrow, Main Headline, Subhead, Pill CTAs */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6 sm:gap-8">
            {/* Eyebrow Label (Small font, no red dot, no ADDIS ABABA) */}
            <FadeUp delay={0.1} y={16}>
              <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 w-fit">
                <span className="font-parkinsans text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-bold text-accent">
                  GERAT SOFTWARE SOLUTION
                </span>
              </div>
            </FadeUp>

            {/* Main Editorial Headline */}
            <div className="space-y-1 sm:space-y-2">
              <SplitText
                text="BUILD WHAT MOVES"
                as="h1"
                delay={0.15}
                stagger={0.035}
                className="font-parkinsans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight uppercase leading-[0.92] text-[var(--text-primary)]"
              />
              <SplitText
                text="YOUR BUSINESS FORWARD."
                as="div"
                delay={0.3}
                stagger={0.035}
                wordClassName="text-accent"
                className="font-parkinsans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight uppercase leading-[0.92] text-[var(--text-primary)]"
              />
            </div>

            {/* Supporting Statement */}
            <FadeUp delay={0.45} y={20} className="max-w-2xl">
              <p className="font-artific text-base sm:text-lg md:text-xl text-[var(--text-secondary)] font-normal leading-relaxed">
                We build websites, AI solutions, business systems, and brand identities that help businesses work better and grow with confidence.
              </p>
            </FadeUp>

            {/* Interactive Action Buttons */}
            <FadeUp delay={0.6} y={20}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 pt-2">
                {/* Primary Contact CTA */}
                <Magnetic maxDisplacement={8}>
                  <button
                    type="button"
                    onClick={openContact}
                    className="group relative isolate inline-flex items-center justify-center font-parkinsans text-xs sm:text-sm uppercase tracking-[0.2em] px-8 sm:px-10 py-4 bg-accent text-white font-bold rounded-full shadow-lg hover:shadow-accent/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer select-none"
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
                    className="group relative isolate inline-flex items-center justify-center font-parkinsans text-xs sm:text-sm uppercase tracking-[0.2em] px-7 sm:px-9 py-4 bg-transparent text-[var(--text-primary)] hover:text-accent font-semibold rounded-full border border-[var(--border-strong)] hover:border-accent transition-all duration-300 cursor-pointer select-none"
                  >
                    <span>EXPLORE WHAT WE BUILD</span>
                    <span className="ml-2 text-accent group-hover:translate-y-0.5 transition-transform duration-300">
                      ↓
                    </span>
                  </button>
                </Magnetic>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Official Brand Bridge 3-Wave Logo Animation */}
          <div className="lg:col-span-5 xl:col-span-4 flex items-center justify-center lg:justify-end pt-6 lg:pt-0">
            <FadeUp delay={0.35} y={24} className="w-full max-w-[340px] sm:max-w-[420px]">
              <div className="relative p-6 sm:p-8 rounded-3xl bg-[var(--surface-2)]/70 border border-[var(--border-subtle)] shadow-[0_20px_50px_rgba(234,91,21,0.08)] backdrop-blur-sm group hover:border-accent/40 transition-all duration-300">
                <BrandBridgeAnimation className="w-full h-auto" interactive={true} />
                <div className="pt-4 text-center">
                  <span className="font-artific text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] font-medium group-hover:text-accent transition-colors">
                    THE BRIDGE · PURPOSE TO SYSTEM
                  </span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
