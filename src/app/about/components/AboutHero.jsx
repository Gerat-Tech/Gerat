"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import FadeUp from "@/components/motion/FadeUp";

export default function AboutHero() {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Subtle scroll parallax for architectural depth
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 50]);
  const bgScale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1.02, 1.06]);

  return (
    <section
      ref={containerRef}
      aria-label="About Hero"
      data-dark-section="true"
      className="relative w-full min-h-[92vh] flex flex-col justify-between pt-32 sm:pt-36 pb-10 sm:pb-14 border-b border-white/10 overflow-hidden bg-[#140604]"
      style={{ backgroundColor: "#140604" }}
    >
      {/* =========================================================================
          BACKGROUND: High-Fidelity Architectural Bridge (Crisp, Vibrant, Unblurred)
         ========================================================================= */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <Image
          src="/image/about/background.png"
          alt="Gerät Architectural Bridge and Digital Infrastructure"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center select-none"
        />

        {/* Focused radial contrast mask: keeps architectural beams crisp on the perimeter while focusing contrast for center typography */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_48%,rgba(20,6,4,0.48)_0%,rgba(20,6,4,0.85)_100%)]" />

        {/* Top subtle vignette from header */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#140604]/90 to-transparent" />

        {/* Bottom gentle feather into next section (compact to avoid swallowing text) */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/50 to-transparent" />
      </motion.div>

      {/* =========================================================================
          CENTERED HERO TYPOGRAPHY: Maximum Impact & Razor-Sharp Visibility
         ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col items-center justify-center text-center my-auto py-12">
        <div className="flex flex-col items-center gap-5 sm:gap-7">
          {/* Big Welcome Statement */}
          <FadeUp delay={0.08} y={20}>
            <div
              className="font-parkinsans text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[92px] font-black uppercase tracking-tight leading-[0.98] drop-shadow-[0_6px_36px_rgba(0,0,0,0.9)]"
              style={{ color: "#F1DFD9" }}
            >
              WELCOME TO GERÄT
            </div>
          </FadeUp>

          {/* Headline: We build the bridge. You cross it. */}
          <div className="space-y-1.5 sm:space-y-2">
            <div
              className="font-parkinsans text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
              style={{ color: "#FFFFFF" }}
            >
              WE BUILD THE BRIDGE.
            </div>
            <div
              className="font-parkinsans text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-[1.08] drop-shadow-[0_0_35px_rgba(234,91,21,0.65)]"
              style={{ color: "#EA5B15" }}
            >
              YOU CROSS IT.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
