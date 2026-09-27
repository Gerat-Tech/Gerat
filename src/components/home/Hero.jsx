"use client";

import React from "react";
import HeroDataField from "../three/HeroDataField";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";
import Magnetic from "../motion/Magnetic";
import { useNav } from "@/context/NavContext";

/**
 * Section 01: HERO — THE PROMISE
 *
 * Editorial layout featuring:
 * - Left-aligned typography and brand statement
 * - 3D Parametric Logo Wave Sculpture positioned in the right field
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
      className="relative min-h-[96dvh] w-full bg-[var(--surface)] text-[var(--text-primary)] flex flex-col justify-between overflow-hidden pt-32 sm:pt-40 md:pt-44 pb-12 sm:pb-16 border-b border-[var(--border-subtle)]"
    >
      {/* 3D Procedural Logo Wave Sculpture (Rendered in right field) */}
      <HeroDataField />

      {/* Main Editorial Hero Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 my-auto">
        <div className="max-w-3xl sm:max-w-4xl flex flex-col gap-6 sm:gap-8">
          {/* Eyebrow Label (No EST. 2026) */}
          <FadeUp delay={0.1} y={16}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 w-fit">
              <span className="size-2 rounded-full bg-accent animate-pulse" />
              <span className="font-parkinsans text-[11px] sm:text-xs tracking-[0.2em] uppercase font-bold text-accent">
                GERAT SOFTWARE SOLUTION · ADDIS ABABA
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
      </div>
    </section>
  );
}
