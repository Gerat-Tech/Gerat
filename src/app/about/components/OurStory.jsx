"use client";

import React, { useState } from "react";
import Link from "next/link";
import FadeUp from "@/components/motion/FadeUp";
import SplitText from "@/components/motion/SplitText";

const STORY_CARDS = [
  {
    id: "foundation",
    category: "FOUNDATION · STABILITY",
    title: "FOUNDATIONAL STABILITY",
    description:
      "Support is our backbone. We measure success by real-world system reliability, clear communication, and dependable day-to-day operation.",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 text-accent stroke-current stroke-[1.8]"
      >
        <path d="M20 6L6 34H34L20 6Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 14V34" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 26H28" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "bridge",
    category: "CONNECTION · THE BRIDGE",
    title: "THE DIGITAL BRIDGE",
    description:
      "We connect traditional operations to modern technology, bridging the gap between everyday business workflows and digital scale.",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 text-accent stroke-current stroke-[1.8]"
      >
        <path d="M6 30H34" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 30V18C10 12.4772 14.4772 8 20 8C25.5228 8 30 12.4772 30 18V30" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 18V30" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "scale",
    category: "GROWTH · ADAPTABILITY",
    title: "BUILT TO SCALE",
    description:
      "Solutions engineered for sustainable growth. From clear visual identities to business systems, everything expands smoothly without breaking.",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 text-accent stroke-current stroke-[1.8]"
      >
        <path d="M12 26L20 18L28 26" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 18L20 10L28 18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "support",
    category: "PARTNERSHIP · OWNERSHIP",
    title: "DEDICATED SUPPORT",
    description:
      "We care about what happens after the launch. We stay involved with clear handover, clean documentation, and dedicated ongoing support.",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 text-accent stroke-current stroke-[1.8]"
      >
        <circle cx="20" cy="20" r="3" fill="currentColor" />
        <circle cx="20" cy="8" r="2.5" />
        <circle cx="31.4" cy="16.3" r="2.5" />
        <circle cx="27" cy="29.7" r="2.5" />
        <circle cx="13" cy="29.7" r="2.5" />
        <circle cx="8.6" cy="16.3" r="2.5" />
        <path d="M20 11V17M28.9 17.2L22.6 19.1M25.3 27.2L21.3 22.4M14.7 27.2L18.7 22.4M11.1 17.2L17.4 19.1" strokeLinecap="round" />
      </svg>
    ),
  },
];

/**
 * Our Story Section (Aligned with Exact Reference Design)
 * 
 * - Background: Solid brand Almond (#F1DFD9)
 * - Header: "BUILT TO HOLD WEIGHT." with right-side editorial narrative & CTA button
 * - Cards: 4 interactive cards with ivory background (#FAF6ED), line-drawn icons,
 *   subtle borders, and active expansion.
 * - Clean typography, generous whitespace, zero red dots.
 */
export default function OurStory() {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section
      id="our-story"
      aria-label="Our Story"
      className="w-full bg-[#F1DFD9] text-[#300F0A] relative scroll-mt-24 py-20 sm:py-28 lg:py-36 border-b border-[#300F0A]/10 overflow-hidden"
      style={{ backgroundColor: "#F1DFD9" }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* =====================================================================
            TOP HEADER: 2-Column Editorial Alignment (As in Reference Image)
           ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-12 sm:mb-16 lg:mb-20">
          {/* Left Column: Eyebrow with small dash + Big Display Headline */}
          <div className="lg:col-span-6 flex flex-col gap-3 sm:gap-4">
            {/* Clean Eyebrow: Small orange bar + clean text, zero red dots */}
            <div className="inline-flex items-center gap-2 text-xs font-parkinsans uppercase tracking-[0.25em] font-bold text-[#300F0A]/90">
              <span className="w-3.5 h-[2px] bg-accent" />
              <span>WHY GERAT</span>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <SplitText
                text="BUILT TO"
                as="h2"
                delay={0.1}
                stagger={0.035}
                className="font-parkinsans text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold tracking-tight uppercase leading-[0.98] text-[#300F0A]"
              />
              <SplitText
                text="HOLD WEIGHT."
                as="div"
                delay={0.25}
                stagger={0.035}
                wordClassName="text-accent"
                className="font-parkinsans text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold tracking-tight uppercase leading-[0.98]"
              />
            </div>
          </div>

          {/* Right Column: Editorial Paragraph + Action Button */}
          <div className="lg:col-span-6 flex flex-col gap-4 lg:pt-8 lg:max-w-xl">
            <FadeUp delay={0.2} y={16}>
              <h3 className="font-parkinsans text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#300F0A]">
                We care about what happens after the launch.
              </h3>
            </FadeUp>

            <FadeUp delay={0.3} y={16}>
              <p className="font-artific text-sm sm:text-base text-[#300F0A]/75 leading-relaxed">
                A good website can look impressive. A good system has to keep working. We build with reliability, clarity, and the next stage of your business in mind.
              </p>
            </FadeUp>

            <FadeUp delay={0.4} y={16}>
              <div className="pt-2">
                <Link
                  href="/about#founders"
                  className="group inline-flex items-center gap-2.5 font-parkinsans text-xs uppercase tracking-[0.18em] px-6 py-3 border border-[#300F0A]/20 hover:border-accent hover:bg-accent hover:text-white text-[#300F0A] font-bold rounded-full transition-all duration-300 shadow-2xs cursor-pointer"
                >
                  <span>START A PROJECT</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* =====================================================================
            INTERACTIVE EXPANDING 4-CARD ACCORDION GRID (Reference Matching)
           ===================================================================== */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 w-full items-stretch min-h-[440px] sm:min-h-[480px]">
          {STORY_CARDS.map((card, idx) => {
            const isActive = activeCard === idx;
            return (
              <div
                key={card.id}
                onClick={() => setActiveCard(idx)}
                onMouseEnter={() => setActiveCard(idx)}
                className={`relative rounded-2xl bg-[#FAF6ED] transition-all duration-500 ease-out cursor-pointer flex flex-col justify-between p-6 sm:p-8 overflow-hidden select-none ${
                  isActive
                    ? "lg:flex-[2.2] border border-accent ring-1 ring-accent/60 shadow-[0_16px_40px_rgba(48,15,10,0.12)] -translate-y-0.5"
                    : "lg:flex-1 border border-[#300F0A]/12 hover:border-[#300F0A]/30 opacity-90 hover:opacity-100"
                }`}
              >
                {/* Center Graphic & Explore Badge */}
                <div className="flex-1 flex flex-col items-center justify-center py-6 sm:py-8 gap-4">
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    {card.icon}
                  </div>

                  {/* Circular EXPLORE badge when card is active */}
                  {isActive && (
                    <div className="size-16 rounded-full bg-[#EADBCE]/60 border border-[#300F0A]/10 flex items-center justify-center text-[10px] font-parkinsans uppercase tracking-[0.2em] font-bold text-[#300F0A]/80 shadow-2xs animate-fade-in">
                      EXPLORE
                    </div>
                  )}
                </div>

                {/* Bottom Metadata & Text Content */}
                <div className="flex flex-col gap-1.5 pt-4 border-t border-[#300F0A]/8">
                  <div className="font-artific text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                    {card.category}
                  </div>

                  <h4 className="font-parkinsans text-lg sm:text-xl font-bold uppercase tracking-tight text-[#300F0A]">
                    {card.title}
                  </h4>

                  <p
                    className={`font-artific text-xs sm:text-sm text-[#300F0A]/75 leading-relaxed pt-1 transition-opacity duration-300 ${
                      isActive ? "opacity-100 line-clamp-4" : "line-clamp-3 sm:line-clamp-2"
                    }`}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
