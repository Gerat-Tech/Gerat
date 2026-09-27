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
 * A short, editorial, high-contrast dark section that articulates
 * the 4 founding beliefs of Gerat with large typography and calm pacing.
 */
export default function OurEthos() {
  return (
    <section
      id="about"
      aria-label="What We Believe"
      className="relative w-full bg-[#1b0906] text-[#FAF6ED] py-24 sm:py-32 md:py-36 border-b border-white/10 scroll-mt-20 overflow-hidden"
    >
      <span id="ethos" className="sr-only" />

      {/* Subtle Warm Ambient Glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-20 pb-10 border-b border-white/10">
          <div className="flex flex-col gap-4 max-w-3xl">
            <SectionLabel index="05" label="WHAT WE BELIEVE" />
            <SplitText
              text="USEFUL OVER"
              as="h2"
              delay={0.1}
              stagger={0.035}
              className="font-parkinsans text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight uppercase leading-[0.96]"
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

          <FadeUp delay={0.3} y={16}>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 font-parkinsans text-xs sm:text-sm uppercase tracking-[0.2em] text-[#FAF6ED]/70 hover:text-accent transition-colors duration-300 pb-1 border-b border-white/20 hover:border-accent"
            >
              <span>LEARN MORE ABOUT US</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 text-accent">
                →
              </span>
            </Link>
          </FadeUp>
        </div>

        {/* 4 Editorial Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {PRINCIPLES.map((item, idx) => (
            <FadeUp key={item.num} delay={0.1 + idx * 0.08} y={20}>
              <div className="flex flex-col justify-between h-full pt-6 border-t border-white/15 hover:border-accent/60 transition-colors duration-300 group">
                {/* Top: Principle Index */}
                <div className="flex items-center justify-between pb-8">
                  <span className="font-parkinsans text-xs font-bold tracking-[0.25em] text-accent uppercase">
                    PRINCIPLE {item.num}
                  </span>
                  <span className="size-1.5 rounded-full bg-white/20 group-hover:bg-accent transition-colors duration-300" />
                </div>

                {/* Middle: Principle Title */}
                <div className="space-y-4">
                  <h3 className="font-parkinsans text-2xl sm:text-3xl font-semibold uppercase tracking-tight text-[#FAF6ED] group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="font-artific text-sm sm:text-base text-[#FAF6ED]/70 leading-relaxed group-hover:text-[#FAF6ED]/90 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
