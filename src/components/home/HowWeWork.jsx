"use client";

import React from "react";
import SectionLabel from "../common/SectionLabel";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";

const steps = [
  {
    step: "01",
    title: "UNDERSTAND",
    description:
      "We begin with the operational problem, user behaviors, institutional constraints, and the real-world deployment environment.",
  },
  {
    step: "02",
    title: "DEFINE",
    description:
      "We convert the challenge into an authoritative system model: technical specifications, schema architecture, data pipelines, and milestone priorities.",
  },
  {
    step: "03",
    title: "DESIGN",
    description:
      "We design the human interface and system mechanics in lockstep, masking architectural complexity behind clear, high-density workflows.",
  },
  {
    step: "04",
    title: "BUILD",
    description:
      "Engineering transforms models into hardened software utilizing modern React/Next.js frontends, distributed backends, and fault-tolerant databases.",
  },
  {
    step: "05",
    title: "VALIDATE",
    description:
      "We stress-test against peak transaction loads, edge scenarios, usability standards, and zero-trust cryptographic audit requirements.",
  },
  {
    step: "06",
    title: "EVOLVE",
    description:
      "Launch is day zero. We analyze live operational telemetry, refine performance bottlenecks, and scale the platform alongside institutional growth.",
  },
];

export default function HowWeWork() {
  return (
    <section
      id="process"
      aria-label="How We Work"
      className="relative w-full bg-[#080808] text-white py-24 sm:py-32 border-b border-white/10"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-16 lg:mb-20 max-w-3xl">
          <SectionLabel index="04" label="HOW WE WORK" />
          <SplitText
            text="FROM PROBLEM TO"
            as="h2"
            className="font-roc text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[0.95]"
          />
          <SplitText
            text="WORKING SYSTEM."
            as="h2"
            wordClassName="text-accent"
            className="font-roc text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[0.95]"
          />
          <FadeUp delay={0.2}>
            <p className="font-roc text-base sm:text-lg text-white/70 leading-relaxed pt-2">
              A disciplined, multi-stage engineering method designed to eliminate
              ambiguity, de-risk complex integrations, and ship dependable
              software.
            </p>
          </FadeUp>
        </div>

        {/* Process Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((item, idx) => (
            <FadeUp key={item.step} delay={0.08 * idx} y={20}>
              <div className="group relative bg-[#101010] border border-white/10 hover:border-accent/60 p-8 rounded-[4px] flex flex-col justify-between min-h-[240px] transition-all duration-300">
                {/* Precision Corner Accents */}
                <span className="absolute top-0 left-0 size-2 border-t border-l border-white/20 group-hover:border-accent transition-colors" />
                <span className="absolute top-0 right-0 size-2 border-t border-r border-white/20 group-hover:border-accent transition-colors" />
                <span className="absolute bottom-0 left-0 size-2 border-b border-l border-white/20 group-hover:border-accent transition-colors" />
                <span className="absolute bottom-0 right-0 size-2 border-b border-r border-white/20 group-hover:border-accent transition-colors" />

                {/* Step Index & Indicator */}
                <div className="flex items-center justify-between">
                  <span className="font-azeret text-[12px] tracking-[0.2em] text-accent font-bold">
                    STEP // {item.step}
                  </span>
                  <div className="size-1.5 rounded-[1px] bg-white/20 group-hover:bg-accent transition-colors" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2.5 my-auto pt-4">
                  <h3 className="font-roc text-2xl font-bold tracking-tight uppercase text-white group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-roc text-xs sm:text-sm text-white/65 leading-relaxed">
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
