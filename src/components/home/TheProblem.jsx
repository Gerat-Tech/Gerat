"use client";

import React from "react";
import SectionLabel from "../common/SectionLabel";
import SplitText from "../motion/SplitText";
import FadeUp from "../motion/FadeUp";

/**
 * Section 02: THE PROBLEM ("THE GAP") — V2 Storytelling Flow
 * Establishes why Gerat exists: turning business friction into working technology.
 */
export default function TheProblem() {
  return (
    <section
      id="gap"
      aria-label="The Problem"
      className="relative w-full bg-[var(--surface)] text-white py-24 sm:py-32 md:py-40 border-b border-white/10 overflow-hidden"
    >
      {/* Subtle background architectural accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-4xl flex flex-col gap-6 sm:gap-8">
          <SectionLabel index="02" label="THE GAP" />

          <div className="space-y-2">
            <SplitText
              text="GOOD BUSINESSES"
              as="h2"
              delay={0.1}
              stagger={0.04}
              className="font-parkinsans text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight uppercase leading-[0.95]"
            />
            <SplitText
              text="NEED GOOD SYSTEMS."
              as="div"
              delay={0.25}
              stagger={0.04}
              wordClassName="text-accent"
              className="font-parkinsans text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight uppercase leading-[0.95]"
            />
          </div>

          <FadeUp delay={0.35} y={20} className="max-w-2xl">
            <p className="font-artific text-base sm:text-lg md:text-xl text-white/75 leading-relaxed font-normal">
              A business can lose time in disconnected tools, unclear processes, weak digital experiences, or technology that cannot grow with it. Gerat exists to close that gap.
            </p>
          </FadeUp>

          <FadeUp delay={0.5} y={20} className="max-w-2xl pt-2">
            <div className="inline-flex items-center gap-3 border-l-2 border-accent pl-4 sm:pl-6 py-1">
              <p className="font-parkinsans text-base sm:text-lg md:text-xl text-white font-medium tracking-tight uppercase">
                We turn business needs into technology people can actually use.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
