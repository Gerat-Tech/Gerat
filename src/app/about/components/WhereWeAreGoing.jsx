"use client";

import React from "react";
import SectionLabel from "@/components/common/SectionLabel";
import FadeUp from "@/components/motion/FadeUp";
import SplitText from "@/components/motion/SplitText";

const DIRECTION_POINTS = [
  {
    tag: "01",
    title: "BUILD",
    desc: "Deliver real products and systems that solve real business needs.",
  },
  {
    tag: "02",
    title: "LEARN",
    desc: "Improve through every engagement and every iteration.",
  },
  {
    tag: "03",
    title: "GROW",
    desc: "Expand our capabilities without losing the quality that earned trust.",
  },
];

export default function WhereWeAreGoing() {
  return (
    <section
      aria-label="Where We Are Going"
      className="relative w-full py-24 sm:py-32 md:py-36 border-b border-white/10 overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-2xl flex flex-col gap-3.5 mb-12 sm:mb-16 pb-6 border-b border-white/10">
          <SectionLabel label="WHERE WE ARE GOING" />
          <div className="space-y-1 sm:space-y-1.5">
            <SplitText
              text="STARTING NOW."
              as="h2"
              delay={0.1}
              stagger={0.035}
              className="font-parkinsans text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight uppercase leading-[1.08] text-white"
            />
            <SplitText
              text="BUILDING FOR WHAT COMES NEXT."
              as="div"
              delay={0.25}
              stagger={0.035}
              wordClassName="text-accent"
              className="font-parkinsans text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight uppercase leading-[1.08]"
            />
          </div>

          <FadeUp delay={0.35} y={16}>
            <p className="font-artific text-sm sm:text-base text-white/80 leading-relaxed mt-1 max-w-xl">
              Gerat is at the beginning of its journey. Our focus now is simple: earn trust through the work, build strong systems, learn from every project, and grow into a technology company known for reliability, clarity, and useful innovation.
            </p>
          </FadeUp>
        </div>

        {/* 3 Direction Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {DIRECTION_POINTS.map((point, idx) => (
            <FadeUp key={point.tag} delay={0.1 + idx * 0.08} y={20}>
              <div className="flex flex-col justify-between h-full p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#1a0a07] hover:border-accent/50 transition-all duration-300 group shadow-[0_12px_28px_rgba(0,0,0,0.15)] min-h-[170px]">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="font-parkinsans text-xs font-bold tracking-[0.2em] text-accent uppercase">
                    FOCUS
                  </span>
                  <span className="size-1.5 rounded-full bg-white/20 group-hover:bg-accent transition-colors" />
                </div>

                <div className="pt-4 space-y-2">
                  <h3 className="font-parkinsans text-lg sm:text-xl font-semibold uppercase tracking-tight text-white group-hover:text-accent transition-colors">
                    {point.title}
                  </h3>
                  <p className="font-artific text-xs sm:text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                    {point.desc}
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
