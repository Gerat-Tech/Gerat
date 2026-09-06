"use client";

import React from "react";
import SectionLabel from "../common/SectionLabel";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";
import { useNav } from "@/context/NavContext";

const techStack = [
  { name: "REACT & NEXT.JS", category: "FRONTEND & APPLICATION" },
  { name: "PYTHON & FASTAPI", category: "AI & INTELLIGENT BACKEND" },
  { name: "POSTGRESQL & TIMESCALE", category: "RELATIONAL & TIME-SERIES" },
  { name: "APACHE KAFKA", category: "EVENT STREAMING & TELEMETRY" },
  { name: "QDRANT & WEAVIATE", category: "VECTOR SEARCH & RAG" },
  { name: "DOCKER & KUBERNETES", category: "CLOUD ORCHESTRATION" },
  { name: "TAILWIND & GSAP", category: "CHOREOGRAPHY & MOTION" },
  { name: "ZERO-TRUST CRYPTO", category: "SYSTEM HARDENING & AUDIT" },
];

export default function Partners() {
  const { openContact } = useNav();

  return (
    <section
      id="ecosystem"
      aria-label="Technology Ecosystem"
      className="relative w-full bg-[#070707] text-white py-24 sm:py-32"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <SectionLabel index="06" label="TECHNOLOGY & ECOSYSTEM" />
            <SplitText
              text="MODERN INFRASTRUCTURE."
              as="h2"
              className="font-roc text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[0.95]"
            />
            <SplitText
              text="STANDARDIZED FOUNDATIONS."
              as="h2"
              wordClassName="text-accent"
              className="font-roc text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[0.95]"
            />
          </div>

          <div className="lg:col-span-5 flex flex-col items-start gap-6 lg:border-l lg:border-white/10 lg:pl-10 pt-2">
            <FadeUp delay={0.2}>
              <p className="font-roc text-base text-white/70 leading-relaxed">
                We build exclusively with proven, open, and battle-tested
                technologies that guarantee vendor independence, high auditability,
                and long-term operational viability.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <button
                type="button"
                onClick={openContact}
                className="group relative isolate inline-flex items-center font-azeret text-[11px] uppercase tracking-[0.2em] px-6 py-3 bg-white text-black font-semibold hover:bg-accent hover:text-white transition-all duration-300 rounded-[2px]"
              >
                <span>COMMISSION A BUILD</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
                <span className="absolute -top-[1px] -left-[1px] size-1.5 border-t border-l border-white group-hover:border-accent" />
                <span className="absolute -bottom-[1px] -right-[1px] size-1.5 border-b border-r border-white group-hover:border-accent" />
              </button>
            </FadeUp>
          </div>
        </div>

        {/* Tech Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {techStack.map((tech, idx) => (
            <FadeUp key={tech.name} delay={0.06 * idx} y={16}>
              <div className="group relative bg-[#0f0f0f] border border-white/10 hover:border-accent/60 p-6 rounded-[3px] flex flex-col justify-between min-h-[120px] transition-all duration-300">
                <span className="absolute top-0 left-0 size-1.5 border-t border-l border-white/20 group-hover:border-accent transition-colors" />
                <span className="absolute bottom-0 right-0 size-1.5 border-b border-r border-white/20 group-hover:border-accent transition-colors" />

                <span className="font-azeret text-[8px] sm:text-[9px] tracking-[0.2em] text-white/40 uppercase">
                  {tech.category}
                </span>

                <h3 className="font-roc text-lg font-bold tracking-tight uppercase text-white group-hover:text-accent transition-colors">
                  {tech.name}
                </h3>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
