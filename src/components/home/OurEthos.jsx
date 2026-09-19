"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionLabel from "../common/SectionLabel";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";
import { useNav } from "@/context/NavContext";

const ethosCards = [
  {
    id: 1,
    number: "01 · 04",
    title: "FOUNDATIONAL STABILITY",
    short: "FOUNDATION · STABILITY",
    description:
      "Support is our backbone. We measure success by real-world system reliability, clear communication, and dependable day-to-day operation.",
    bg: "bg-[var(--surface)]",
    border: "border-white/15",
    icon: (
      <svg className="size-12 text-accent" viewBox="0 0 48 48" fill="none">
        {/* Tent / Arch structural motif */}
        <path d="M24 6L6 38H42L24 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M24 6V38" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
        <path d="M15 38L24 22L33 38" stroke="var(--accent, #ea5b15)" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="24" cy="22" r="2.5" fill="var(--accent, #ea5b15)" />
      </svg>
    ),
  },
  {
    id: 2,
    number: "02 · 04",
    title: "THE DIGITAL BRIDGE",
    short: "CONNECTION · THE BRIDGE",
    description:
      "We connect traditional operations to modern technology, bridging the gap between everyday business workflows and digital scale.",
    bg: "bg-[var(--surface)]",
    border: "border-white/15",
    icon: (
      <svg className="size-12 text-white" viewBox="0 0 48 48" fill="none">
        {/* Interconnected digital bridge */}
        <path d="M8 36V22C8 16 16 16 24 16C32 16 40 16 40 22V36" stroke="currentColor" strokeWidth="1.5" />
        <line x1="8" y1="36" x2="40" y2="36" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
        <line x1="16" y1="18" x2="16" y2="36" stroke="var(--accent, #ea5b15)" strokeWidth="1.5" />
        <line x1="32" y1="18" x2="32" y2="36" stroke="var(--accent, #ea5b15)" strokeWidth="1.5" />
        <circle cx="24" cy="16" r="3" fill="var(--accent, #ea5b15)" />
      </svg>
    ),
  },
  {
    id: 3,
    number: "03 · 04",
    title: "BUILT TO SCALE",
    short: "GROWTH · ADAPTABILITY",
    description:
      "Solutions engineered for sustainable growth. From clear visual identities to business systems, everything expands smoothly without breaking.",
    bg: "bg-[var(--surface)]",
    border: "border-white/15",
    icon: (
      <svg className="size-12 text-accent" viewBox="0 0 48 48" fill="none">
        {/* Ascending stepped chevrons (Logo motif) */}
        <path d="M12 36L24 24L36 36" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 26L24 16L34 26" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 16L24 8L32 16" stroke="var(--accent, #ea5b15)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 4,
    number: "04 · 04",
    title: "DEDICATED SUPPORT",
    short: "PARTNERSHIP · OWNERSHIP",
    description:
      "We care about what happens after the launch. We stay involved with clear handover, clean documentation, and dedicated ongoing support.",
    bg: "bg-[var(--surface)]",
    border: "border-white/15",
    icon: (
      <svg className="size-12 text-white" viewBox="0 0 48 48" fill="none">
        {/* Converging collaboration nodes */}
        <circle cx="24" cy="24" r="4" fill="var(--accent, #ea5b15)" />
        <circle cx="24" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="39" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="33" cy="37" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="15" cy="37" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="9" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="24" y1="11" x2="24" y2="20" stroke="var(--accent, #ea5b15)" strokeWidth="1.2" />
        <line x1="37" y1="20" x2="28" y2="23" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
        <line x1="31" y1="35" x2="26" y2="27" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
        <line x1="17" y1="35" x2="22" y2="27" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
        <line x1="11" y1="20" x2="20" y2="23" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
      </svg>
    ),
  },
];

export default function OurEthos() {
  const [activeCard, setActiveCard] = useState(null);
  const { openContact } = useNav();

  return (
    <section
      id="ethos"
      aria-label="Why Gerat"
      className="relative w-full bg-[var(--bg)] text-white py-24 sm:py-32 border-b border-white/10"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-20 items-start">
          <div className="lg:col-span-6 flex flex-col gap-4">
            <SectionLabel index="02" label="WHY GERAT" />
            <SplitText
              text="BUILT TO"
              as="h2"
              className="font-artific text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[0.95]"
            />
            <SplitText
              text="HOLD WEIGHT."
              as="h2"
              wordClassName="text-accent"
              className="font-artific text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[0.95]"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col items-start gap-6 lg:border-l lg:border-white/10 lg:pl-10 pt-2">
            <FadeUp delay={0.2}>
              <div className="flex flex-col gap-3 max-w-xl">
                <p className="font-artific text-lg sm:text-xl text-white font-medium">
                  We care about what happens after the launch.
                </p>
                <p className="font-parkinsans text-base sm:text-lg text-white/70 leading-relaxed">
                  A good website can look impressive. A good system has to keep working.
                  We build with reliability, clarity, and the next stage of your business in mind.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <button
                type="button"
                onClick={openContact}
                className="group relative isolate inline-flex items-center font-parkinsans text-[11px] uppercase tracking-[0.2em] px-6 py-3 border border-white/20 hover:border-accent hover:bg-accent/10 text-white/90 hover:text-white transition-all duration-300 rounded-[2px]"
              >
                <span>START A PROJECT</span>
                <span className="ml-2 text-white/40 group-hover:text-accent group-hover:translate-x-1 transition-all">
                  →
                </span>
              </button>
            </FadeUp>
          </div>
        </div>

        {/* Expandable Accordion Card Deck */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-3 min-h-[480px]">
          {ethosCards.map((card) => {
            const isActive = activeCard === card.id;
            return (
              <motion.div
                key={card.id}
                onMouseEnter={() => setActiveCard(card.id)}
                onMouseLeave={() => setActiveCard(null)}
                animate={{
                  flex: activeCard === null ? 1 : isActive ? 2.2 : 0.8,
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-[4px] border transition-colors duration-400 overflow-hidden cursor-pointer p-6 sm:p-8 flex flex-col justify-between ${
                  card.bg
                } ${
                  isActive
                    ? "border-accent shadow-[0_0_24px_rgba(234,91,21,0.15)]"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                {/* Top Card Header */}
                <div className="flex items-center justify-between">
                  <span className="font-parkinsans text-[10px] tracking-[0.2em] text-white/50">
                    {card.number}
                  </span>
                  <div className="size-2 rounded-[1px] bg-white/20 group-hover:bg-accent transition-colors" />
                </div>

                {/* Center Visual Icon */}
                <div className="my-8 flex items-center justify-center py-4">
                  {card.icon}
                </div>

                {/* Bottom Card Content */}
                <div className="flex flex-col gap-3">
                  <span className="font-parkinsans text-[9px] tracking-[0.25em] text-accent uppercase">
                    {card.short}
                  </span>
                  <h3 className="font-artific text-xl sm:text-2xl font-bold tracking-tight uppercase text-white leading-tight">
                    {card.title}
                  </h3>
                  <p className="font-parkinsans text-xs sm:text-sm text-white/70 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
