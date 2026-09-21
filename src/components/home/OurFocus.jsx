"use client";

import React, { useState } from "react";
import Link from "next/link";
import SectionLabel from "../common/SectionLabel";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";

const capabilities = [
  {
    index: "01",
    title: "DIGITAL EXPERIENCES",
    tags: "WEBSITES · WEB APPLICATIONS · CUSTOMER PORTALS · DIGITAL PRODUCTS",
    description:
      "Websites and digital products that make your business easier to discover, understand, and use.",
    link: "/services/digital-experiences",
  },
  {
    index: "02",
    title: "AI & INTELLIGENT TOOLS",
    tags: "PRACTICAL AI · KNOWLEDGE SYSTEMS · INTELLIGENT SEARCH · AUTOMATION",
    description:
      "Practical AI that helps people find information, automate repetitive work, and make better use of what they already know.",
    link: "/services/ai-tools",
  },
  {
    index: "03",
    title: "BUSINESS SYSTEMS",
    tags: "OPERATIONS PLATFORMS · ERP · WORKFLOW SYSTEMS · CUSTOM SOFTWARE",
    description:
      "Software that connects operations, people, and information so businesses can work with less friction.",
    link: "/services/business-systems",
  },
  {
    index: "04",
    title: "BRAND & CREATIVE",
    tags: "BRAND STRATEGY · LOGO & IDENTITY · GRAPHIC DESIGN · PERSONAL BRANDING",
    description:
      "A clear identity that helps people recognize your business — from the logo to the way it shows up online.",
    link: "/services/brand-creative",
  },
];

export default function OurFocus() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section
      id="capabilities"
      aria-label="What We Build"
      className="relative w-full bg-[var(--bg)] text-white py-14 sm:py-18 md:py-20 border-b border-white/10"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-10 sm:mb-12 max-w-3xl">
          <SectionLabel label="WHAT WE BUILD" />
          <SplitText
            text="HOW WE BUILD"
            as="h2"
            className="font-parkinsans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium sm:font-semibold tracking-tight uppercase leading-[0.95]"
          />
          <SplitText
            text="THE BRIDGE."
            as="h2"
            wordClassName="text-accent"
            className="font-parkinsans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium sm:font-semibold tracking-tight uppercase leading-[0.95]"
          />
          <FadeUp delay={0.2} y={16}>
            <p className="font-artific text-base sm:text-lg text-white/75 leading-relaxed pt-2">
              Every business needs a strong foundation, a clear path, and
              systems that can carry what comes next.
            </p>
          </FadeUp>
        </div>

        {/* Interactive Capability Rows Table (4 Core Pillars) */}
        <div className="w-full border-t border-white/10">
          {capabilities.map((item, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <Link
                key={item.title}
                href={item.link}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(idx)}
                onBlur={() => setHoveredIndex(null)}
                className={`group relative block border-b border-white/10 py-6 sm:py-8 px-4 sm:px-6 transition-all duration-300 outline-none ${
                  isHovered ? "bg-white/[0.03]" : "bg-transparent"
                }`}
              >
                {/* Active Indicator Accent Line */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[2px] bg-accent transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-baseline">
                  {/* Column 1: Title & Tags */}
                  <div className="lg:col-span-6 flex flex-col gap-1.5">
                    <h3 className="font-parkinsans text-xl sm:text-2xl font-semibold tracking-tight uppercase text-white group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <span className="font-artific text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-white/50 uppercase font-medium">
                      {item.tags}
                    </span>
                  </div>

                  {/* Column 2: Description */}
                  <div className="lg:col-span-5 font-artific text-xs sm:text-sm text-white/70 group-hover:text-white/95 leading-relaxed transition-colors pt-1 lg:pt-0">
                    {item.description}
                  </div>

                  {/* Column 3: Trailing Arrow */}
                  <div className="hidden lg:flex lg:col-span-1 justify-end font-parkinsans text-sm text-white/30 group-hover:text-accent group-hover:translate-x-1 transition-all">
                    →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Capabilities Link */}
        <FadeUp delay={0.3} y={16}>
          <div className="mt-8 sm:mt-10 flex items-center justify-between">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-parkinsans text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
            >
              <span>EXPLORE ALL SERVICES & SOLUTIONS</span>
              <span className="text-accent">→</span>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
