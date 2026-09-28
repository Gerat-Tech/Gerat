"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Layers, Zap, ShieldCheck } from "lucide-react";

/**
 * Section: WHY GERÄT ("WHY BUSINESSES CHOOSE GERÄT")
 * 
 * Recreated with exact precision from Receivio's signature 2-column sticky architecture:
 * - Background: Solid brand Almond (HEX #F1DFD9)
 * - Sticky left column anchored during scroll with eyebrow pill, headline, and subtitle
 * - Right column with 3 stacked high-contrast white cards with spring appear animations
 * - Background sweeping ambient ribbon in Flame Orange with scroll-driven parallax transform
 * - Content addresses Gerät's comprehensive service spectrum (Brand & Creative, Digital Experiences,
 *   Business Systems, and AI & Intelligent Tools) explaining why clients choose us.
 */

const REASONS = [
  {
    id: "01",
    badgeColor: "bg-[#FFDFD4] text-[#EA5B15]",
    icon: Layers,
    title: "One Unified Team. Brand To Engineering.",
    tagline: "INTEGRATED DIGITAL CREATION",
    description:
      "Most businesses hire a branding agency, a web designer, and a third-party development shop—resulting in fragmented vision, dropped handoffs, and wasted budget. Gerät unifies brand identity, modern digital products, business systems, and AI automation under one team, ensuring seamless continuity from first visual touchpoint to scalable operational code.",
  },
  {
    id: "02",
    badgeColor: "bg-[#0217FE] text-white",
    icon: Zap,
    title: "Useful Over Complicated. Built For Real ROI.",
    tagline: "PURPOSE-DRIVEN LEVERAGE",
    description:
      "Gerät takes its name from the tool philosophy: an instrument made for a clear purpose. We don't sell vanity design or bloated feature lists. Whether we are launching an executive brand identity, a high-converting web platform, an ERP workflow, or an intelligent AI tool, every deliverable is engineered to remove operational friction and generate measurable revenue.",
  },
  {
    id: "03",
    badgeColor: "bg-[#300F0A] text-[#F1DFD9]",
    icon: ShieldCheck,
    title: "Zero Lock-In. You Own 100% Of Everything.",
    tagline: "COMPLETE ASSET & IP FREEDOM",
    description:
      "We believe clients must own their digital destiny. When we complete an engagement, you receive unencumbered ownership of all vector brand guidelines, Figma design systems, clean production source code, and database schemas. No hostage codebases, no vendor lock-in, and zero artificial recurring licensing fees.",
  },
];

export default function WhyGerat() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll-linked parallax transform for the sweeping background ribbon
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const ribbonX = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-60, 60]);
  const ribbonRotate = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-3, 3]);
  const ribbonScale = useTransform(scrollYProgress, [0, 0.5, 1], prefersReducedMotion ? [1, 1, 1] : [0.95, 1.02, 0.97]);

  return (
    <section
      id="why"
      ref={sectionRef}
      aria-label="Why Choose Gerät"
      className="relative w-full bg-[#F1DFD9] text-[#300F0A] py-20 sm:py-28 lg:py-36 overflow-hidden scroll-mt-24 border-t border-[#300F0A]/10"
    >
      {/* =========================================================================
          BACKGROUND: Sweeping Decorative Ribbon with Scroll Parallax on Almond
         ========================================================================= */}
      <motion.div
        style={{ x: ribbonX, rotate: ribbonRotate, scale: ribbonScale }}
        aria-hidden="true"
        className="absolute -bottom-24 -left-28 sm:-left-16 w-[700px] sm:w-[950px] lg:w-[1200px] h-[500px] sm:h-[650px] pointer-events-none select-none z-0 opacity-80"
      >
        <svg
          viewBox="0 0 1200 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="geratRibbonAlmond" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EA5B15" stopOpacity="0.45" />
              <stop offset="35%" stopColor="#FF7A33" stopOpacity="0.32" />
              <stop offset="70%" stopColor="#EA5B15" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#F1DFD9" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M -100 680 C 140 500, 380 390, 540 450 C 700 510, 640 680, 480 700 C 320 720, 200 550, 280 400 C 360 250, 620 230, 940 330 C 1060 370, 1180 430, 1260 490"
            stroke="url(#geratRibbonAlmond)"
            strokeWidth="44"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* =========================================================================
          MAIN CONTAINER: 1080px Max-Width Responsive Grid
         ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-14 xl:gap-16">
          
          {/* =====================================================================
              LEFT COLUMN: Sticky Title, Eyebrow Pill & Editorial Statement
             ===================================================================== */}
          <div className="w-full lg:w-[460px] lg:flex-shrink-0 lg:sticky lg:top-28 lg:self-start flex flex-col items-start gap-5 sm:gap-6">
            
            {/* Eyebrow Badge Pill (No dot) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: "spring",
                damping: 24,
                stiffness: 120,
                mass: 0.3,
              }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-[#300F0A]/15 shadow-xs"
            >
              <span className="font-parkinsans text-xs tracking-[0.2em] uppercase font-bold text-[#300F0A]">
                Why Choose Gerät
              </span>
            </motion.div>

            {/* Main Section Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: "spring",
                damping: 24,
                stiffness: 110,
                mass: 0.3,
                delay: 0.08,
              }}
              className="font-parkinsans text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-bold tracking-tight uppercase leading-[1.06] text-[#300F0A]"
            >
              Why Businesses <br className="hidden sm:block" />
              <span className="text-accent">Choose Gerät.</span>
            </motion.h2>

            {/* Supporting Editorial Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: "spring",
                damping: 24,
                stiffness: 110,
                mass: 0.3,
                delay: 0.16,
              }}
              className="font-artific text-base sm:text-lg text-[#300F0A]/80 leading-relaxed max-w-md"
            >
              You don&apos;t need fragmented agencies, vanity design, or rigid software that creates dependencies. We bring brand strategy, digital experiences, business systems, and AI automation together under one roof to build digital assets that actually grow your business.
            </motion.p>
          </div>

          {/* =====================================================================
              RIGHT COLUMN: The 3 Stacked White Value Cards
             ===================================================================== */}
          <div className="w-full flex-1 flex flex-col gap-5 sm:gap-6">
            {REASONS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    type: "spring",
                    damping: 26,
                    stiffness: 110,
                    mass: 0.35,
                    delay: prefersReducedMotion ? 0 : index * 0.12,
                  }}
                  whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.25 } }}
                  className="w-full bg-white border border-[#300F0A]/12 rounded-2xl sm:rounded-3xl p-7 sm:p-9 md:p-10 shadow-[0_8px_30px_rgba(48,15,10,0.05)] hover:shadow-[0_20px_45px_rgba(48,15,10,0.12)] transition-all duration-300 flex flex-col gap-6"
                >
                  {/* Card Icon Header */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xs ${item.badgeColor}`}
                    >
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <span className="font-parkinsans text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-bold text-[#EA5B15]">
                      {item.tagline}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col gap-2.5">
                    <h3 className="font-parkinsans text-xl sm:text-2xl font-bold tracking-tight text-[#300F0A]">
                      {item.title}
                    </h3>
                    <p className="font-artific text-sm sm:text-[15px] leading-relaxed text-[#300F0A]/75">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
