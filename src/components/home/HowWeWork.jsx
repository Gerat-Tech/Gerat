"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import FadeUp from "../motion/FadeUp";
import { Workflow, Sparkles, ShieldCheck, Zap } from "lucide-react";

const PROCESS_STEPS = [
  {
    num: "01",
    tagline: "DISCOVERY & STRATEGY",
    title: "We dissect the operational & market bottleneck.",
    description:
      "We audit your workflows, brand positioning, and technical landscape. Whether shaping a distinctive brand identity, a high-converting web platform, an internal ERP, or an AI tool, we map out clear requirements, user flows, and an honest delivery roadmap.",
  },
  {
    num: "02",
    tagline: "DESIGN & ARCHITECTURE",
    title: "We craft the visual system & technical blueprint.",
    description:
      "From typographic identity and interactive Figma prototypes to robust data schemas and API architecture. You test, refine, and validate the complete brand visual language and user experience before production starts—ensuring zero wasted effort.",
  },
  {
    num: "03",
    tagline: "SPRINT DELIVERY",
    title: "We build & iterate in transparent weekly cycles.",
    description:
      "Full-stack engineering, brand asset generation, and AI workflow integrations executed with uncompromising craft. You get weekly staging demos, creative reviews, clear changelogs, and direct collaboration with the designers and engineers building your solution.",
  },
];

const SOLUTION_METRICS = [
  {
    label: "Assets & IP Ownership",
    value: "100%",
    caption: "Code, designs & brand kits",
    icon: Workflow,
    rotate: "lg:-rotate-2",
  },
  {
    label: "Sprint Cadence",
    value: "Weekly",
    caption: "Live demos & design reviews",
    icon: Zap,
    rotate: "lg:-rotate-1",
  },
  {
    label: "System Reliability",
    value: "99.99%",
    caption: "Uptime & production QA",
    icon: ShieldCheck,
    rotate: "lg:rotate-1",
  },
  {
    label: "Future Readiness",
    value: "Scalable",
    caption: "Engineered for tomorrow's growth",
    icon: Sparkles,
    rotate: "lg:rotate-2",
  },
];

/**
 * Section 03: HOW WE WORK ("THE PROCESS")
 *
 * Distinct Interaction Pattern:
 * - Scroll-Linked Process Rail with sequential timeline activation
 * - Staggered workflow cards with interactive hover elevation
 * - Smooth container morphing and perspective reveal into Stage 04
 * - Zero red dots on eyebrow text
 */
export default function HowWeWork() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end end"],
  });

  // Stage 04 container expand
  const stage4Scale = useTransform(
    scrollYProgress,
    [0.6, 0.95],
    prefersReducedMotion ? [1, 1] : [0.975, 1]
  );
  const stage4Opacity = useTransform(
    scrollYProgress,
    [0.6, 0.85],
    prefersReducedMotion ? [1, 1] : [0.85, 1]
  );

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-label="Our Process"
      className="w-full bg-[var(--surface)] text-[var(--text-primary)] relative scroll-mt-24 pt-16 sm:pt-24 md:pt-32 pb-24 sm:pb-32 md:pb-40 overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col items-center">
        {/* =========================================================================
            HEADER: Eyebrow Pill, Headline, Subtitle
           ========================================================================= */}
        <FadeUp delay={0.1} y={16} className="flex justify-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FAF6ED] border border-[#E5DAC8] font-parkinsans text-xs tracking-[0.2em] uppercase font-bold text-[#300F0A] shadow-xs">
            <span>Our Process</span>
          </div>
        </FadeUp>

        <FadeUp delay={0.2} y={20} className="mt-5 text-center px-4 max-w-3xl">
          <h2 className="font-parkinsans text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-semibold tracking-tight uppercase leading-[1.08] text-[#300F0A]">
            From Clear Discovery <br className="hidden sm:block" />
            <span className="text-accent">To Market-Ready Reality.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.3} y={16} className="mt-3 text-center px-4 max-w-xl">
          <p className="font-artific text-sm sm:text-base text-[#300F0A]/75 leading-relaxed">
            A disciplined, transparent delivery workflow designed to eliminate friction, move fast, and craft brand systems, digital products, and automated operations that actually work.
          </p>
        </FadeUp>

        {/* =========================================================================
            VERTICAL TIMELINE: Beacon Drop-Pin Node
           ========================================================================= */}
        <FadeUp delay={0.4} y={16} className="mt-10 sm:mt-12 flex flex-col items-center">
          <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full border-2 border-accent bg-[#FAF6ED] shadow-[0_0_16px_rgba(234,91,21,0.3)]">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          </div>
          {/* Dashed connector line to Step 01 */}
          <div className="w-0 h-8 sm:h-10 border-l-2 border-dashed border-accent/60" />
        </FadeUp>

        {/* =========================================================================
            THE THREE SEQUENTIAL WORKFLOW CARDS (01, 02, 03)
           ========================================================================= */}
        <div className="flex flex-col items-center w-full max-w-[560px] px-4">
          {PROCESS_STEPS.map((item, idx) => (
            <React.Fragment key={item.num}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: 0.12 * idx,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: -4,
                        borderColor: "rgba(234, 91, 21, 0.45)",
                        boxShadow: "0 12px 32px rgba(48, 15, 10, 0.08)",
                        transition: { duration: 0.25 },
                      }
                }
                className="w-full bg-[#FAF6ED] border border-[#E5DAC8] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(48,15,10,0.03)] text-left cursor-default transition-colors duration-200"
              >
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E5DAC8]/60">
                  <span className="font-parkinsans text-2xl sm:text-3xl font-bold text-[#300F0A]/35">
                    {item.num}
                  </span>
                  <span className="font-parkinsans text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-accent font-bold">
                    {item.tagline}
                  </span>
                </div>
                <p className="font-artific text-sm sm:text-[15px] leading-relaxed text-[#300F0A]/80 pt-1">
                  <strong className="font-bold text-[#300F0A] mr-1.5">{item.title}</strong>
                  {item.description}
                </p>
              </motion.div>

              {/* Dashed connector between cards */}
              <div className="w-0 h-8 sm:h-10 border-l-2 border-dashed border-accent/60" />
            </React.Fragment>
          ))}
        </div>

        {/* Dashed connector continuing directly into the Stage 04 Dark Container */}
        <div className="w-0 h-8 sm:h-12 border-l-2 border-dashed border-accent/60" />

        {/* =========================================================================
            STAGE 04: THE LARGE DARK FLOATING SOLUTION CONTAINER
           ========================================================================= */}
        <motion.div
          style={{
            scale: stage4Scale,
            opacity: stage4Opacity,
          }}
          className="w-full max-w-[1080px] px-2 sm:px-4 will-change-transform"
        >
          <div
            data-dark-overlay="true"
            className="relative w-full bg-[#1F1713] text-white rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-white/10 p-8 sm:p-12 md:p-16 shadow-[0_24px_80px_rgba(0,0,0,0.35)] overflow-hidden"
          >
            {/* Blueprint Grid Overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px]"
            />

            {/* Ambient Radial Accent Glow */}
            <div
              aria-hidden="true"
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none"
            />

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Stage 04 Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 font-parkinsans text-xs tracking-[0.18em] uppercase font-bold text-white shadow-xs backdrop-blur-sm">
                <span>Stage 04 · Launch & Scale</span>
                <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-accent/30 text-accent text-[9px] font-bold">
                  ✓
                </span>
              </div>

              {/* Main Solution Headline */}
              <h3 className="font-parkinsans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight uppercase leading-[1.08] text-white mt-5">
                Unified Solutions. <br />
                <span className="text-accent">
                  Built To Scale & Run.
                </span>
              </h3>

              {/* Solution Subtitle */}
              <p className="font-artific text-sm sm:text-base text-white/75 max-w-xl mx-auto mt-4 leading-relaxed">
                We handle cloud deployment, brand asset packaging, domain configuration, and staff onboarding. Once launched, we deliver complete brand kits and source code repositories, with ongoing support to ensure your brand and systems expand effortlessly.
              </p>

              {/* 4 Sleek Floating Perspective Metric Cards */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row lg:justify-center items-stretch gap-4 mt-12 sm:mt-16">
                {SOLUTION_METRICS.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={metric.label}
                      className={`group/card relative bg-[#281F1B]/95 hover:bg-[#322722] border border-white/10 hover:border-accent/50 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md flex flex-col justify-between min-h-[140px] sm:min-h-[160px] lg:w-[220px] transition-all duration-300 text-left ${metric.rotate} hover:rotate-0 hover:scale-105`}
                    >
                      {/* Top row */}
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-parkinsans text-xs font-bold text-white/70 uppercase tracking-wide">
                          {metric.label}
                        </span>
                        <div className="w-7 h-7 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent group-hover/card:scale-110 group-hover/card:bg-accent group-hover/card:text-white transition-all duration-300">
                          <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                        </div>
                      </div>

                      {/* Bottom row */}
                      <div className="mt-6 sm:mt-8">
                        <div className="font-parkinsans text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                          {metric.value}
                        </div>
                        <div className="font-artific text-[11px] sm:text-xs text-white/60 tracking-tight mt-1">
                          {metric.caption}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
