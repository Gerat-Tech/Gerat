"use client";

import React from "react";
import SectionLabel from "@/components/common/SectionLabel";
import FadeUp from "@/components/motion/FadeUp";
import SplitText from "@/components/motion/SplitText";

export default function OurStory() {
  return (
    <section
      aria-label="Our Story"
      className="relative w-full py-24 sm:py-32 md:py-36 border-b border-white/10 overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Section Label & Display Headline */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <SectionLabel index="01" label="OUR STORY" />
            <div className="space-y-2">
              <SplitText
                text="WE STARTED WITH"
                as="h2"
                delay={0.1}
                stagger={0.035}
                className="font-parkinsans text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight uppercase leading-[0.96] text-white"
              />
              <SplitText
                text="A SIMPLE IDEA."
                as="div"
                delay={0.25}
                stagger={0.035}
                wordClassName="text-accent"
                className="font-parkinsans text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight uppercase leading-[0.96]"
              />
            </div>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="lg:col-span-6 flex flex-col gap-8 lg:pt-8 lg:border-l lg:border-white/10 lg:pl-12">
            <FadeUp delay={0.2} y={16}>
              <p className="font-artific text-lg sm:text-xl text-white/90 leading-relaxed">
                Businesses do not need more technology for the sake of technology. They need better tools for the work they already do, clearer digital experiences, and systems that can grow with them. Gerat was started to bring those pieces together.
              </p>
            </FadeUp>

            <FadeUp delay={0.3} y={16}>
              <p className="font-artific text-base sm:text-lg text-white/60 leading-relaxed">
                We are starting small, building carefully, and creating the foundation for a company that can grow with the businesses it serves.
              </p>
            </FadeUp>

            <FadeUp delay={0.4} y={16}>
              <div className="pt-4 border-t border-white/10 flex items-center gap-3 text-xs font-parkinsans uppercase tracking-[0.2em] text-accent">
                <span className="size-2 rounded-full bg-accent" />
                <span>FOUNDED IN ADDIS ABABA · EST. 2026</span>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
