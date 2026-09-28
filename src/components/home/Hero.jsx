"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import BrandBridgeAnimation from "../common/BrandBridgeAnimation";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";
import Magnetic from "../motion/Magnetic";
import { useNav } from "@/context/NavContext";

/**
 * Section 01: HERO — THE PROMISE
 *
 * Cinematic scroll-choreographed layout featuring:
 * - Fluid scroll-linked exit scaling and subtle depth compression
 * - Left-aligned typography and brand statement with staggered word reveals
 * - Official Brand Bridge 3-wave animation on the right with subtle vertical parallax
 * - Parallax ambient glow layer providing organic spatial depth
 * - Magnetic action controls into the contact drawer and about page
 */
export default function Hero() {
  const { openContact } = useNav();
  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Track hero scroll lifecycle from entry to exit
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Calm scroll-linked exit choreography: subtle compression and depth
  const heroScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 0.985]
  );
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.85],
    prefersReducedMotion ? [1, 1] : [1, 0.88]
  );
  const bridgeWaveY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 52]
  );
  const glowScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 1.15]
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[88vh] sm:min-h-[90vh] lg:min-h-[92vh] w-full bg-[#EA5B15] text-[#300F0A] flex flex-col justify-start pt-32 sm:pt-36 lg:pt-40 pb-28 sm:pb-32 lg:pb-36 overflow-visible"
    >
      {/* Ambient Almond Glow Background with Parallax Scale */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <motion.div
          style={{ scale: glowScale }}
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#F1DFD9]/15 rounded-full blur-[140px] will-change-transform"
        />
      </div>

      {/* Main Editorial Hero Content: 2-Column Responsive Layout */}
      <motion.div
        style={{
          scale: heroScale,
          opacity: heroOpacity,
        }}
        className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-2 sm:pt-4 will-change-transform"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Eyebrow, Main Headline, Subhead, Pill CTAs */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col gap-6 sm:gap-8">
            {/* Main Editorial Headline (Enlarged, Bold & High Impact) */}
            <div className="space-y-1 sm:space-y-2">
              <SplitText
                text="BUILD WHAT MOVES"
                as="h1"
                delay={0.15}
                stagger={0.035}
                className="font-parkinsans text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] font-bold tracking-tight uppercase leading-[0.96] text-[#300F0A]"
              />
              <SplitText
                text="YOUR BUSINESS FORWARD."
                as="div"
                delay={0.3}
                stagger={0.035}
                wordClassName="text-[#F1DFD9]"
                className="font-parkinsans text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] font-bold tracking-tight uppercase leading-[0.96] text-[#300F0A]"
              />
            </div>

            {/* Supporting Statement */}
            <FadeUp delay={0.45} y={20} className="max-w-xl">
              <p className="font-artific text-sm sm:text-base text-[#300F0A]/90 font-medium leading-relaxed">
                We build websites, AI solutions, business systems, and brand identities that help businesses work better and grow with confidence.
              </p>
            </FadeUp>

            {/* Interactive Action Buttons */}
            <FadeUp delay={0.6} y={20}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5 pt-2">
                {/* Primary Contact CTA */}
                <Magnetic maxDisplacement={8}>
                  <button
                    type="button"
                    onClick={openContact}
                    className="group relative isolate inline-flex items-center justify-center font-parkinsans text-xs sm:text-sm uppercase tracking-[0.18em] px-7 sm:px-9 py-3.5 sm:py-4 bg-[#300F0A] text-[#F1DFD9] font-bold rounded-full border-2 border-[#300F0A] shadow-[0_10px_28px_rgba(48,15,10,0.3)] hover:bg-[#F1DFD9] hover:border-[#F1DFD9] hover:shadow-[0_14px_36px_rgba(48,15,10,0.4)] hover:scale-[1.03] transition-all duration-300 cursor-pointer select-none"
                  >
                    <span className="transition-colors duration-300 group-hover:!text-[#300F0A]">
                      START A PROJECT
                    </span>
                    <span className="ml-2.5 transition-all duration-300 group-hover:translate-x-1 group-hover:!text-[#300F0A]">
                      →
                    </span>
                  </button>
                </Magnetic>

                {/* Secondary About CTA */}
                <Magnetic maxDisplacement={8}>
                  <Link
                    href="/about"
                    className="group relative isolate inline-flex items-center justify-center font-parkinsans text-xs sm:text-sm uppercase tracking-[0.18em] px-7 sm:px-8 py-3.5 sm:py-4 bg-transparent text-[#300F0A] font-bold rounded-full border-2 border-[#300F0A]/50 hover:border-[#300F0A] hover:bg-[#300F0A] hover:shadow-[0_10px_26px_rgba(48,15,10,0.2)] hover:scale-[1.03] transition-all duration-300 cursor-pointer select-none"
                  >
                    <span className="transition-colors duration-300 group-hover:!text-[#F1DFD9]">
                      ABOUT US
                    </span>
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:!text-[#F1DFD9]">
                      →
                    </span>
                  </Link>
                </Magnetic>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Official Brand Bridge 3-Wave Logo Animation with Parallax Float */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center lg:justify-end pt-6 lg:pt-0">
            <motion.div
              style={{ y: bridgeWaveY }}
              className="w-full max-w-[360px] sm:max-w-[440px] md:max-w-[480px] lg:max-w-[500px] xl:max-w-[540px] will-change-transform"
            >
              <FadeUp delay={0.35} y={24}>
                <div className="relative flex flex-col items-center justify-center bg-transparent group">
                  <BrandBridgeAnimation className="w-full h-auto" interactive={true} />
                </div>
              </FadeUp>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
