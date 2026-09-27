"use client";

import React from "react";
import SectionLabel from "@/components/common/SectionLabel";
import FadeUp from "@/components/motion/FadeUp";
import SplitText from "@/components/motion/SplitText";

export default function WhatGeratMeans() {
  return (
    <section
      aria-label="What Gerat Means"
      className="relative w-full py-24 sm:py-32 md:py-36 border-b border-white/10 overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-4xl flex flex-col gap-6 sm:gap-8">
          <SectionLabel index="02" label="THE NAME" />

          <div className="space-y-2">
            <SplitText
              text="A NAME BUILT"
              as="h2"
              delay={0.1}
              stagger={0.035}
              className="font-parkinsans text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight uppercase leading-[0.96] text-white"
            />
            <SplitText
              text="AROUND USEFULNESS."
              as="div"
              delay={0.25}
              stagger={0.035}
              wordClassName="text-accent"
              className="font-parkinsans text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight uppercase leading-[0.96]"
            />
          </div>

          <FadeUp delay={0.35} y={16}>
            <p className="font-artific text-lg sm:text-xl md:text-2xl text-white/85 leading-relaxed max-w-3xl">
              Gerat takes its name inspiration from the German word <span className="text-accent font-semibold italic">Gerät</span> — a tool, device, or piece of equipment made for a purpose. That idea fits how we think about software: it should be useful, purposeful, and built to do a job well.
            </p>
          </FadeUp>

          {/* Highlight Brand Motto Card */}
          <FadeUp delay={0.45} y={16}>
            <div className="mt-6 p-8 sm:p-10 rounded-[4px] border border-accent/30 bg-[#210c08] shadow-[0_16px_40px_rgba(0,0,0,0.4)] max-w-2xl">
              <div className="font-artific text-xs uppercase tracking-[0.25em] text-accent mb-3 font-semibold">
                THE GERAT MOTTO
              </div>
              <div className="font-parkinsans text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-white leading-snug">
                “TECHNOLOGY IS A TOOL. MAKE IT USEFUL.”
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
