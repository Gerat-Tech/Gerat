"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Magnetic from "@/components/motion/Magnetic";
import FadeUp from "@/components/motion/FadeUp";
import SplitText from "@/components/motion/SplitText";
import { useNav } from "@/context/NavContext";

/**
 * About Page Final Conversion Card
 * Scroll-choreographed to ease seamlessly into the cinematic footer
 */
export default function AboutCTA() {
  const { openContact } = useNav();
  const ctaRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });

  const cardScale = useTransform(
    scrollYProgress,
    [0.7, 1],
    prefersReducedMotion ? [1, 1] : [1, 0.985]
  );
  const cardOpacity = useTransform(
    scrollYProgress,
    [0.85, 1],
    prefersReducedMotion ? [1, 1] : [1, 0.92]
  );

  return (
    <section
      ref={ctaRef}
      id="contact"
      aria-label="Start What's Next"
      className="w-full px-4 sm:px-6 md:px-8 lg:px-12 my-12 sm:my-20 md:my-24 scroll-mt-24"
    >
      <motion.div
        style={{
          scale: cardScale,
          opacity: cardOpacity,
        }}
        data-dark-card="true"
        className="relative w-full max-w-[1360px] mx-auto py-14 sm:py-20 md:py-24 px-6 sm:px-10 bg-[#160705] text-[#FAF6ED] rounded-2xl sm:rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(48,15,10,0.25)] overflow-hidden text-center flex flex-col items-center will-change-transform"
      >
        {/* Background Watermark Waves */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none"
        >
          <svg
            viewBox="0 0 800 300"
            className="w-full max-w-4xl h-auto"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M50 200 C200 50, 600 50, 750 200" />
            <path d="M100 230 C250 80, 550 80, 700 230" />
            <path d="M150 260 C300 110, 500 110, 650 260" />
          </svg>
        </div>

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-parkinsans text-[11px] uppercase tracking-[0.2em] mb-5 font-bold">
          <span>START THE CONVERSATION</span>
        </div>

        {/* Display Headline */}
        <div className="max-w-3xl space-y-1.5 sm:space-y-2">
          <SplitText
            text="LET'S BUILD"
            as="h2"
            delay={0.1}
            stagger={0.035}
            className="font-parkinsans text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-semibold tracking-tight uppercase leading-[1.08] text-white"
          />
          <SplitText
            text="WHAT'S NEXT."
            as="div"
            delay={0.25}
            stagger={0.035}
            wordClassName="text-accent"
            className="font-parkinsans text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-semibold tracking-tight uppercase leading-[1.08]"
          />
        </div>

        {/* Narrative Copy */}
        <FadeUp delay={0.35} y={16}>
          <p className="font-artific text-sm sm:text-base text-[#FAF6ED]/80 max-w-lg leading-relaxed mt-4 mb-7">
            Have a business problem, digital idea, or system that needs work? Start the conversation.
          </p>
        </FadeUp>

        {/* Magnetic Pill Action Button */}
        <FadeUp delay={0.45} y={16}>
          <Magnetic maxDisplacement={10}>
            <button
              type="button"
              onClick={() => openContact({ discipline: "general", subOption: "ABOUT" })}
              className="group relative isolate inline-flex items-center gap-2.5 font-parkinsans text-xs uppercase tracking-[0.18em] px-7 sm:px-8 py-3.5 bg-accent text-white font-bold hover:bg-white hover:text-[#160705] transition-all duration-300 rounded-full cursor-pointer shadow-[0_8px_30px_rgba(234,91,21,0.3)]"
            >
              <span>START A PROJECT</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </Magnetic>
        </FadeUp>
      </motion.div>
    </section>
  );
}
