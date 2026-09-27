"use client";

import React from "react";
import SectionLabel from "@/components/common/SectionLabel";
import FadeUp from "@/components/motion/FadeUp";
import SplitText from "@/components/motion/SplitText";

const BRIDGE_TENETS = [
  {
    num: "01",
    title: "SUPPORT",
    desc: "Technology should help people do their work better.",
  },
  {
    num: "02",
    title: "CONNECTION",
    desc: "Good systems connect people, information, and processes.",
  },
  {
    num: "03",
    title: "SCALABILITY",
    desc: "What works today should leave room for tomorrow.",
  },
  {
    num: "04",
    title: "OWNERSHIP",
    desc: "We care about what happens after delivery, not only the launch.",
  },
];

export default function TheBridge() {
  return (
    <section
      aria-label="The Gerat Idea"
      className="relative w-full py-24 sm:py-32 md:py-36 border-b border-white/10 overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-20 pb-8 border-b border-white/10">
          <div className="flex flex-col gap-4 max-w-2xl">
            <SectionLabel index="03" label="THE GERAT IDEA" />
            <div className="space-y-2">
              <SplitText
                text="WE BUILD"
                as="h2"
                delay={0.1}
                stagger={0.035}
                className="font-parkinsans text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight uppercase leading-[0.96] text-white"
              />
              <SplitText
                text="THE BRIDGE."
                as="div"
                delay={0.25}
                stagger={0.035}
                wordClassName="text-accent"
                className="font-parkinsans text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight uppercase leading-[0.96]"
              />
            </div>
            <FadeUp delay={0.35} y={16}>
              <p className="font-artific text-base sm:text-lg text-white/70 leading-relaxed mt-2 max-w-xl">
                Our brand is built around the idea of a bridge: connecting a business to better digital experiences, better systems, and better ways of working.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* 4 Core Tenets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {BRIDGE_TENETS.map((tenet, idx) => (
            <FadeUp key={tenet.num} delay={0.1 + idx * 0.08} y={20}>
              <div className="flex flex-col justify-between h-full p-8 rounded-[4px] border border-white/10 bg-[#190a07] hover:border-accent/50 hover:bg-[#220d09] transition-all duration-300 group">
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <span className="font-parkinsans text-xs font-bold tracking-[0.25em] text-accent uppercase">
                    TENET {tenet.num}
                  </span>
                  <span className="size-1.5 rounded-full bg-white/20 group-hover:bg-accent transition-colors" />
                </div>

                <div className="pt-6 space-y-3">
                  <h3 className="font-parkinsans text-2xl font-semibold uppercase tracking-tight text-white group-hover:text-accent transition-colors">
                    {tenet.title}
                  </h3>
                  <p className="font-artific text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                    {tenet.desc}
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
