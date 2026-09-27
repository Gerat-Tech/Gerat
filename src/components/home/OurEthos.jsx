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
      className="w-full px-4 sm:px-6 md:px-8 lg:px-12 my-20 sm:my-32 md:my-40 scroll-mt-24"
    >
      <span id="ethos" className="sr-only" />

      <div
        data-dark-card="true"
        className="relative w-full max-w-[1360px] mx-auto bg-[#300F0A] text-[#FAF6ED] p-10 sm:p-16 md:p-22 rounded-[36px] sm:rounded-[44px] border border-white/10 shadow-[0_24px_64px_rgba(48,15,10,0.3)] overflow-hidden"
      >
        {/* Subtle Warm Ambient Glow */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none"
        />

        <div className="relative z-10 w-full">
          {/* Top Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 sm:mb-18 pb-8 border-b border-white/15">
            <div className="flex flex-col gap-4 max-w-3xl">
              <SectionLabel index="04" label="WHAT WE BELIEVE" />
              <div className="space-y-1 sm:space-y-2">
                <SplitText
                  text="USEFUL OVER"
                  as="h2"
                  delay={0.1}
                  stagger={0.035}
                  className="font-parkinsans text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight uppercase leading-[0.96] text-[#FAF6ED]"
                />
                <SplitText
                  text="COMPLICATED."
                  as="div"
                  delay={0.25}
                  stagger={0.035}
                  wordClassName="text-accent"
                  className="font-parkinsans text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight uppercase leading-[0.96]"
                />
              </div>
            </div>

            <FadeUp delay={0.3} y={16}>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 font-parkinsans text-xs uppercase tracking-[0.2em] text-[#FAF6ED] hover:text-white px-6 py-3 bg-white/10 hover:bg-accent rounded-full transition-all duration-300 font-bold shadow-sm"
              >
                <span>LEARN MORE ABOUT US</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </FadeUp>
          </div>

          {/* 4 Editorial Principles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {PRINCIPLES.map((item, idx) => (
              <FadeUp key={item.num} delay={0.1 + idx * 0.08} y={20}>
                <div className="flex flex-col justify-between h-full min-h-[280px] p-8 sm:p-9 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-accent/60 transition-all duration-300 group">
                  {/* Top: Principle Index */}
                  <div className="flex items-center justify-between pb-8">
                    <span className="font-parkinsans text-xs font-bold tracking-[0.25em] text-accent uppercase">
                      PRINCIPLE {item.num}
                    </span>
                    <span className="size-2 rounded-full bg-white/20 group-hover:bg-accent transition-colors duration-300" />
                  </div>

                  {/* Middle: Principle Title */}
                  <div className="space-y-4">
                    <h3 className="font-parkinsans text-2xl sm:text-3xl font-semibold uppercase tracking-tight text-[#FAF6ED] group-hover:text-white transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="font-artific text-base text-[#FAF6ED]/75 leading-[1.8] group-hover:text-[#FAF6ED]/95 transition-colors duration-300">
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
