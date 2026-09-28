"use client";

import React from "react";
import SectionLabel from "../common/SectionLabel";
import SplitText from "../motion/SplitText";
import FadeUp from "../motion/FadeUp";

/**
 * Section 02: THE PROBLEM ("THE GAP") — Receivio Floating Container Alignment
 *
 * Establishes why Gerat exists: turning business friction into working technology.
 * Renders as a floating rounded card container on the warm canvas with generous margins.
 */
export default function TheProblem() {
  return (
    <section
      id="gap"
      aria-label="The Problem"
      className="w-full px-4 sm:px-6 md:px-8 lg:px-12 my-12 sm:my-20 md:my-24 scroll-mt-24"
    >
      <div className="relative w-full max-w-[1360px] mx-auto bg-[var(--surface)] text-[var(--text-primary)] p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl border border-[var(--border-subtle)] shadow-[0_16px_40px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Subtle background ambient glow */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-96 h-96 bg-accent/[0.05] rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"
        />

        <div className="relative z-10 max-w-3xl flex flex-col gap-5 sm:gap-6">
          <SectionLabel label="THE GAP" />

          <div className="space-y-1.5 sm:space-y-2">
            <SplitText
              text="GOOD BUSINESSES"
              as="h2"
              delay={0.1}
              stagger={0.04}
              className="font-parkinsans text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight uppercase leading-[1.08] text-[var(--text-primary)]"
            />
            <SplitText
              text="NEED GOOD SYSTEMS."
              as="div"
              delay={0.25}
              stagger={0.04}
              wordClassName="text-accent"
              className="font-parkinsans text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight uppercase leading-[1.08]"
            />
          </div>

          <FadeUp delay={0.35} y={16} className="max-w-xl">
            <p className="font-artific text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-normal">
              A business can lose time in disconnected tools, unclear processes, weak digital experiences, or technology that cannot grow with it. Gerat exists to close that gap.
            </p>
          </FadeUp>

          <FadeUp delay={0.5} y={16} className="max-w-xl pt-1">
            <div className="inline-flex items-center gap-3 border-l-2 border-accent pl-4 sm:pl-5 py-1">
              <p className="font-parkinsans text-sm sm:text-base text-[var(--text-primary)] font-medium tracking-tight uppercase">
                We turn business needs into technology people can actually use.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
