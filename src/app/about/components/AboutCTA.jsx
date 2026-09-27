"use client";

import React from "react";
import Magnetic from "@/components/motion/Magnetic";
import FadeUp from "@/components/motion/FadeUp";
import SplitText from "@/components/motion/SplitText";
import { useNav } from "@/context/NavContext";

export default function AboutCTA() {
  const { openContact } = useNav();

  return (
    <section
      id="contact"
      aria-label="Start What's Next"
      className="w-full px-4 sm:px-6 md:px-8 lg:px-12 my-12 sm:my-20 md:my-24 scroll-mt-24"
    >
      <div
        data-dark-card="true"
        className="relative w-full max-w-[1360px] mx-auto py-20 sm:py-28 md:py-32 px-6 sm:px-12 bg-[#160705] text-[#FAF6ED] rounded-[32px] border border-white/10 shadow-[0_24px_64px_rgba(48,15,10,0.3)] overflow-hidden text-center flex flex-col items-center"
      >
        {/* Background Watermark Waves */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none"
        >
          <svg
            viewBox="0 0 800 300"
            className="w-full max-w-5xl h-auto"
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent font-parkinsans text-xs uppercase tracking-[0.25em] mb-6 font-bold">
          <span>START THE CONVERSATION</span>
        </div>

        {/* Display Headline */}
        <div className="max-w-4xl space-y-2">
          <SplitText
            text="LET'S BUILD"
            as="h2"
            delay={0.1}
            stagger={0.035}
            className="font-parkinsans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight uppercase leading-[0.92] text-white"
          />
          <SplitText
            text="WHAT'S NEXT."
            as="div"
            delay={0.25}
            stagger={0.035}
            wordClassName="text-accent"
            className="font-parkinsans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight uppercase leading-[0.92]"
          />
        </div>

        {/* Narrative Copy */}
        <FadeUp delay={0.35} y={16}>
          <p className="font-artific text-base sm:text-lg md:text-xl text-[#FAF6ED]/80 max-w-xl leading-relaxed mt-6 mb-10">
            Have a business problem, digital idea, or system that needs work? Start the conversation.
          </p>
        </FadeUp>

        {/* Magnetic Pill Action Button */}
        <FadeUp delay={0.45} y={16}>
          <Magnetic maxDisplacement={10}>
            <button
              type="button"
              onClick={() => openContact({ discipline: "general", subOption: "ABOUT" })}
              className="group relative isolate inline-flex items-center gap-3 font-parkinsans text-xs sm:text-sm uppercase tracking-[0.2em] px-10 py-4.5 bg-accent text-white font-bold hover:bg-white hover:text-[#160705] transition-all duration-300 rounded-full cursor-pointer shadow-[0_12px_40px_rgba(234,91,21,0.35)]"
            >
              <span>START A PROJECT</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </Magnetic>
        </FadeUp>
      </div>
    </section>
  );
}
