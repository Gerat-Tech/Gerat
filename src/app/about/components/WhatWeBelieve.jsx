"use client";

import React from "react";
import SectionLabel from "@/components/common/SectionLabel";
import FadeUp from "@/components/motion/FadeUp";
import SplitText from "@/components/motion/SplitText";

const BELIEFS = [
  {
    num: "01",
    title: "SOLVE THE REAL PROBLEM.",
    desc: "Start with the business need, not the technology trend.",
  },
  {
    num: "02",
    title: "MAKE COMPLEX THINGS CLEAR.",
    desc: "Good software should reduce friction, not create more of it.",
  },
  {
    num: "03",
    title: "BUILD WITH THE NEXT STEP IN MIND.",
    desc: "Design systems that can evolve as the business grows.",
  },
  {
    num: "04",
    title: "STAY ACCOUNTABLE.",
    desc: "The relationship does not end when the product goes live.",
  },
];

export default function WhatWeBelieve() {
  return (
    <section
      aria-label="What We Believe"
      className="relative w-full py-24 sm:py-32 md:py-36 bg-[#130604] text-[#FAF6ED] border-b border-white/10 overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl flex flex-col gap-4 mb-16 sm:mb-20 pb-8 border-b border-white/10">
          <SectionLabel index="04" label="WHAT WE BELIEVE" />
          <div className="space-y-2">
            <SplitText
              text="SIMPLE PRINCIPLES."
              as="h2"
              delay={0.1}
              stagger={0.035}
              className="font-parkinsans text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight uppercase leading-[0.96]"
            />
            <SplitText
              text="HIGH STANDARDS."
              as="div"
              delay={0.25}
              stagger={0.035}
              wordClassName="text-accent"
              className="font-parkinsans text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight uppercase leading-[0.96]"
            />
          </div>
        </div>

        {/* 4 Beliefs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {BELIEFS.map((item, idx) => (
            <FadeUp key={item.num} delay={0.1 + idx * 0.08} y={20}>
              <div className="flex flex-col justify-between p-8 sm:p-10 rounded-[4px] border border-white/10 bg-[#1c0c08] hover:border-accent/60 transition-all duration-300 group">
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <span className="font-parkinsans text-xs font-bold tracking-[0.25em] text-accent uppercase">
                    PRINCIPLE {item.num}
                  </span>
                  <span className="size-1.5 rounded-full bg-white/20 group-hover:bg-accent transition-colors" />
                </div>

                <div className="pt-6 space-y-3">
                  <h3 className="font-parkinsans text-xl sm:text-2xl font-semibold uppercase tracking-tight text-white group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-artific text-base text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
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
