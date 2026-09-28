"use client";

import React from "react";
import Link from "next/link";
import SectionLabel from "../common/SectionLabel";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";

const PRINCIPLES = [
  {
    num: "01",
    title: "USEFUL",
    desc: "Technology should solve a real problem before it tries to impress.",
  },
  {
    num: "02",
    title: "CLEAR",
    desc: "Good systems are easier to understand, use, and improve.",
  },
  {
    num: "03",
    title: "STRONG",
    desc: "Good foundations matter because businesses have to live with what we build.",
  },
  {
    num: "04",
    title: "GROWING",
    desc: "We build with the next stage in mind, not only today's requirement.",
  },
];

/**
 * Section 05: THE GERAT POINT OF VIEW ("WHAT WE BELIEVE")
 *
 * Renders as a dramatic dark floating container card (#300F0A Coffee Bean)
 * that creates a rhythm pause across the warm Almond canvas.
 * Crisp white and ivory typography with Flame Orange accents.
 */
export default function OurEthos() {
  return (
    <section
      id="about"
      aria-label="What We Believe"
      data-dark-card="true"
      className="w-full bg-[#300F0A] text-[#F1DFD9] relative scroll-mt-24"
    >
      <span id="ethos" className="sr-only" />

      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-16 sm:pt-24 pb-28 sm:pb-36 overflow-hidden">
        {/* Subtle Warm Ambient Glow */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none"
        />

        <div className="relative z-10 w-full">
          {/* Top Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 pb-6 border-b border-white/15">
            <div className="flex flex-col gap-3.5 max-w-2xl">
              <SectionLabel label="WHAT WE BELIEVE" />
              <div className="space-y-1 sm:space-y-1.5">
                <SplitText
                  text="USEFUL OVER"
                  as="h2"
                  delay={0.1}
                  stagger={0.035}
                  className="font-parkinsans text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight uppercase leading-[1.08] text-white"
                />
                <SplitText
                  text="COMPLICATED."
                  as="div"
                  delay={0.25}
                  stagger={0.035}
                  wordClassName="text-accent"
                  className="font-parkinsans text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight uppercase leading-[1.08]"
                />
              </div>
            </div>

            <FadeUp delay={0.3} y={16}>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 font-parkinsans text-xs uppercase tracking-[0.18em] text-white px-6 py-3 bg-accent hover:bg-white hover:text-[#300F0A] border border-accent hover:border-white rounded-full transition-all duration-300 font-bold shadow-md cursor-pointer select-none"
              >
                <span>LEARN MORE ABOUT US</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </FadeUp>
          </div>

          {/* 4 Editorial Principles Grid (Guaranteed High Contrast & Proportional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {PRINCIPLES.map((item, idx) => (
              <FadeUp key={item.num} delay={0.1 + idx * 0.08} y={20}>
                <div className="ethos-card flex flex-col justify-between h-full min-h-[190px] sm:min-h-[210px] p-6 sm:p-7 rounded-2xl bg-[#220B07] border border-white/15 hover:border-accent/80 transition-all duration-300 group shadow-[0_12px_28px_rgba(0,0,0,0.18)]">
                  {/* Top: Principle Indicator */}
                  <div className="flex items-center justify-between pb-3">
                    <span className="size-2 rounded-full bg-accent" />
                  </div>

                  {/* Middle: Principle Title & Body */}
                  <div className="space-y-2.5">
                    <h3 className="font-parkinsans text-lg sm:text-xl font-semibold uppercase tracking-tight text-white group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="font-artific text-xs sm:text-sm text-white/85 leading-relaxed group-hover:text-white transition-colors duration-300">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
