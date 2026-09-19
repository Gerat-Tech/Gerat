"use client";

import React from "react";
import SectionLabel from "../common/SectionLabel";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";

const steps = [
  {
    step: "01",
    title: "DISCOVER",
    description:
      "We understand the business, the people, the problem, and what success should look like.",
  },
  {
    step: "02",
    title: "DESIGN",
    description:
      "We turn that understanding into a clear experience, visual direction, and realistic plan.",
  },
  {
    step: "03",
    title: "BUILD",
    description:
      "We design and engineer the digital product, intelligent tool, or business platform.",
  },
  {
    step: "04",
    title: "LAUNCH",
    description:
      "We test, refine, and prepare it for real users and real-world conditions.",
  },
  {
    step: "05",
    title: "SUPPORT",
    description:
      "We stay involved as the product grows and the business changes.",
  },
];

export default function HowWeWork() {
  return (
    <section
      id="process"
      aria-label="How We Work"
      className="relative w-full bg-[var(--bg)] text-white py-24 sm:py-32 border-b border-white/10"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-16 lg:mb-20 max-w-3xl">
          <SectionLabel index="05" label="HOW WE WORK" />
          <SplitText
            text="FROM BLUEPRINT"
            as="h2"
            className="font-artific text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[0.95]"
          />
          <SplitText
            text="TO BRIDGE."
            as="h2"
            wordClassName="text-accent"
            className="font-artific text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[0.95]"
          />
          <FadeUp delay={0.2}>
            <p className="font-parkinsans text-base sm:text-lg text-white/70 leading-relaxed pt-2">
              A clear process, from the first conversation to the finished system.
            </p>
          </FadeUp>
        </div>

        {/* Process Step Grid (5 Clear Stages) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {steps.map((item, idx) => (
            <FadeUp key={item.step} delay={0.08 * idx} y={20}>
              <div className="group relative bg-[var(--surface)] border border-white/10 hover:border-accent/60 p-6 sm:p-7 rounded-[4px] flex flex-col justify-between min-h-[230px] transition-all duration-300">
                {/* Step Index & Indicator */}
                <div className="flex items-center justify-between">
                  <span className="font-parkinsans text-[12px] tracking-[0.2em] text-accent font-bold">
                    STEP · {item.step}
                  </span>
                  <div className="size-1.5 rounded-[1px] bg-white/20 group-hover:bg-accent transition-colors" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2.5 my-auto pt-4">
                  <h3 className="font-artific text-xl sm:text-2xl font-bold tracking-tight uppercase text-white group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-parkinsans text-xs sm:text-sm text-white/65 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom line */}
                <div className="w-full h-[1px] bg-white/10 group-hover:bg-accent/40 transition-colors mt-4" />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
