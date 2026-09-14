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
    number: "01 / 04",
    title: "SYSTEM RESILIENCE",
    short: "SUPPORT // THE TENT",
    description:
      "Support is our backbone. We stand behind our clients with unwavering commitment, offering guidance, structural reliability, and fault-tolerant stability every step of the way.",
    bg: "bg-[var(--surface)]",
    border: "border-white/15",
    icon: (
      <svg className="size-12 text-accent" viewBox="0 0 48 48" fill="none">
        {/* Tent / Arch structural motif */}
        <path d="M24 6L6 38H42L24 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M24 6V38" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
        <path d="M15 38L24 22L33 38" stroke="var(--accent, #ea5b15)" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="24" cy="22" r="2.5" fill="var(--accent, #ea5b15)" />
      </svg>
    ),
  },
  {
    id: 2,
    number: "02 / 04",
    title: "DIGITAL BRIDGE",
    short: "BRIDGE // THE DIGITAL WORLD",
    description:
      "We connect ideas to execution, traditional industries to cutting-edge technology, bridging the gap between local enterprise and global digital scale.",
    bg: "bg-[var(--surface)]",
    border: "border-white/15",
    icon: (
      <svg className="size-12 text-white" viewBox="0 0 48 48" fill="none">
        {/* Interconnected digital bridge */}
        <path d="M8 36V22C8 16 16 16 24 16C32 16 40 16 40 22V36" stroke="currentColor" strokeWidth="1.5" />
        <line x1="8" y1="36" x2="40" y2="36" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
        <line x1="16" y1="18" x2="16" y2="36" stroke="var(--accent, #ea5b15)" strokeWidth="1.5" />
        <line x1="32" y1="18" x2="32" y2="36" stroke="var(--accent, #ea5b15)" strokeWidth="1.5" />
        <circle cx="24" cy="16" r="3" fill="var(--accent, #ea5b15)" />
      </svg>
    ),
  },
  {
    id: 3,
    number: "03 / 04",
    title: "BUILT TO SCALE",
    short: "SCALABILITY // ZERO DECAY",
    description:
      "From modular software architectures to monolithic brand identities, everything we build scales seamlessly. Architectures that effortlessly absorb exponential expansion.",
    bg: "bg-[var(--surface)]",
    border: "border-white/15",
    icon: (
      <svg className="size-12 text-accent" viewBox="0 0 48 48" fill="none">
        {/* Ascending stepped chevrons (Logo motif) */}
        <path d="M12 36L24 24L36 36" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 26L24 16L34 26" stroke="white" strokeOpacity="0.6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 16L24 8L32 16" stroke="var(--accent, #ea5b15)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 4,
    number: "04 / 04",
    title: "5 FOUNDERS UNITED",
    short: "FOUNDERS // COLLECTIVE MASTERY",
    description:
      "Five founders united by a single vision: engineering transformative software, institutional-grade infrastructure, and visionary brands with sovereign digital ownership.",
    bg: "bg-[var(--surface)]",
    border: "border-white/15",
    icon: (
      <svg className="size-12 text-white" viewBox="0 0 48 48" fill="none">
        {/* 5 converging founder nodes */}
        <circle cx="24" cy="24" r="4" fill="var(--accent, #ea5b15)" />
        <circle cx="24" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="39" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="33" cy="37" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="15" cy="37" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="9" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="24" y1="11" x2="24" y2="20" stroke="var(--accent, #ea5b15)" strokeWidth="1.2" />
        <line x1="37" y1="20" x2="28" y2="23" stroke="white" strokeOpacity="0.5" strokeWidth="1.2" />
        <line x1="31" y1="35" x2="26" y2="27" stroke="white" strokeOpacity="0.5" strokeWidth="1.2" />
        <line x1="17" y1="35" x2="22" y2="27" stroke="white" strokeOpacity="0.5" strokeWidth="1.2" />
        <line x1="11" y1="20" x2="20" y2="23" stroke="white" strokeOpacity="0.5" strokeWidth="1.2" />
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
      aria-label="Our Ethos"
      className="relative w-full bg-[var(--bg)] text-white py-24 sm:py-32 border-b border-white/10"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-20 items-start">
          <div className="lg:col-span-6 flex flex-col gap-4">
            <SectionLabel index="01" label="ETHOS" />
            <SplitText
              text="ENGINEERED FOR RIGOR."
              as="h2"
              className="font-artific text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[0.95]"
            />
            <SplitText
              text="ARCHITECTED FOR SCALE."
              as="h2"
              wordClassName="text-accent"
              className="font-artific text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[0.95]"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col items-start gap-6 lg:border-l lg:border-white/10 lg:pl-10 pt-2">
            <FadeUp delay={0.2}>
              <p className="font-parkinsans text-base sm:text-lg text-white/70 leading-relaxed max-w-xl">
                We reject fragile digital facades. Gerat designs and deploys
                mission-critical systems that withstand real-world operational
                stress, maintain domain precision, and deliver lasting
                competitive sovereignty.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <button
                type="button"
                onClick={openContact}
                className="group relative isolate inline-flex items-center font-parkinsans text-[11px] uppercase tracking-[0.2em] px-6 py-3 border border-white/20 hover:border-accent hover:bg-accent/10 text-white/90 hover:text-white transition-all duration-300 rounded-[2px]"
              >
                <span>CONSULT WITH OUR ARCHITECTS</span>
                <span className="ml-2 text-white/40 group-hover:text-accent group-hover:translate-x-1 transition-all">
                  →
                </span>
                <span className="absolute -top-[1px] -left-[1px] size-1.5 border-t border-l border-white/40 group-hover:border-accent" />
                <span className="absolute -bottom-[1px] -right-[1px] size-1.5 border-b border-r border-white/40 group-hover:border-accent" />
              </button>
            </FadeUp>
          </div>
        </div>

        {/* Expandable Accordion Card Deck (Spec §26) */}
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
                {/* Precision Corner Accents */}
                <span
                  className={`absolute top-0 left-0 size-2 border-t border-l transition-colors duration-300 ${
                    isActive ? "border-accent" : "border-white/20"
                  }`}
                />
                <span
                  className={`absolute top-0 right-0 size-2 border-t border-r transition-colors duration-300 ${
                    isActive ? "border-accent" : "border-white/20"
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 size-2 border-b border-l transition-colors duration-300 ${
                    isActive ? "border-accent" : "border-white/20"
                  }`}
                />
                <span
                  className={`absolute bottom-0 right-0 size-2 border-b border-r transition-colors duration-300 ${
                    isActive ? "border-accent" : "border-white/20"
                  }`}
                />

                {/* Top Card Header */}
                <div className="flex items-center justify-between">
                  <span className="font-parkinsans text-[10px] tracking-[0.2em] text-white/50">
                    {card.number}
                  </span>
                  <div className="size-2 rounded-[1px] bg-white/20 group-hover:bg-accent" />
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
