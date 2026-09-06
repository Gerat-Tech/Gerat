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
    short: "FAULT-TOLERANT ARCHITECTURE",
    description:
      "Software engineered for high-stakes operational reliability. Fault-tolerant distributed backends, deterministic data pipelines, and zero-compromise system integrity.",
    bg: "bg-[#0f0f0f]",
    border: "border-white/15",
    icon: (
      <svg className="size-12 text-accent" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" stroke="currentColor" strokeWidth="1.5" />
        <rect x="14" y="14" width="20" height="20" stroke="white" strokeOpacity="0.4" strokeWidth="1" />
        <circle cx="24" cy="24" r="4" fill="currentColor" />
        <line x1="8" y1="24" x2="14" y2="24" stroke="currentColor" strokeWidth="1.5" />
        <line x1="34" y1="24" x2="40" y2="24" stroke="currentColor" strokeWidth="1.5" />
        <line x1="24" y1="8" x2="24" y2="14" stroke="currentColor" strokeWidth="1.5" />
        <line x1="24" y1="34" x2="24" y2="40" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 2,
    number: "02 / 04",
    title: "DOMAIN-NATIVE AI",
    short: "GROUNDED INTELLIGENCE",
    description:
      "Artificial intelligence grounded in verified institutional data. Purpose-engineered RAG knowledge networks, contextual LLM pipelines, and verifiable audit trails.",
    bg: "bg-[#141414]",
    border: "border-white/15",
    icon: (
      <svg className="size-12 text-white" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="34" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="34" cy="34" r="4" stroke="currentColor" strokeWidth="1.5" />
        <line x1="22" y1="17" x2="16" y2="31" stroke="var(--accent, #ff4a00)" strokeWidth="1.5" />
        <line x1="26" y1="17" x2="32" y2="31" stroke="var(--accent, #ff4a00)" strokeWidth="1.5" />
        <line x1="18" y1="34" x2="30" y2="34" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
        <circle cx="24" cy="25" r="2" fill="var(--accent, #ff4a00)" />
      </svg>
    ),
  },
  {
    id: 3,
    number: "03 / 04",
    title: "INDUSTRIAL VELOCITY",
    short: "PRODUCTION SPEED",
    description:
      "Rapid prototype-to-production cycles without cutting architectural corners. Fast, high-density feedback loops backed by production-grade engineering standards.",
    bg: "bg-[#111111]",
    border: "border-white/15",
    icon: (
      <svg className="size-12 text-accent" viewBox="0 0 48 48" fill="none">
        <path d="M12 36L36 12M36 12H18M36 12V30" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
        <line x1="12" y1="24" x2="24" y2="12" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
        <circle cx="12" cy="36" r="3" fill="white" />
      </svg>
    ),
  },
  {
    id: 4,
    number: "04 / 04",
    title: "INSTITUTIONAL SCALE",
    short: "NATIONAL WORKLOADS",
    description:
      "Architected from day one for national, institutional, and enterprise workflows. High concurrency, massive data throughput, and airtight regulatory security posture.",
    bg: "bg-[#161616]",
    border: "border-white/15",
    icon: (
      <svg className="size-12 text-white" viewBox="0 0 48 48" fill="none">
        <rect x="10" y="26" width="8" height="14" stroke="currentColor" strokeWidth="1.5" />
        <rect x="20" y="18" width="8" height="22" stroke="var(--accent, #ff4a00)" strokeWidth="1.5" />
        <rect x="30" y="10" width="8" height="30" stroke="currentColor" strokeWidth="1.5" />
        <line x1="6" y1="40" x2="42" y2="40" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
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
      className="relative w-full bg-[#090909] text-white py-24 sm:py-32 border-b border-white/10"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-20 items-start">
          <div className="lg:col-span-6 flex flex-col gap-4">
            <SectionLabel index="01" label="ETHOS" />
            <SplitText
              text="ENGINEERED FOR RIGOR."
              as="h2"
              className="font-roc text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[0.95]"
            />
            <SplitText
              text="ARCHITECTED FOR SCALE."
              as="h2"
              wordClassName="text-accent"
              className="font-roc text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[0.95]"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col items-start gap-6 lg:border-l lg:border-white/10 lg:pl-10 pt-2">
            <FadeUp delay={0.2}>
              <p className="font-roc text-base sm:text-lg text-white/70 leading-relaxed max-w-xl">
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
                className="group relative isolate inline-flex items-center font-azeret text-[11px] uppercase tracking-[0.2em] px-6 py-3 border border-white/20 hover:border-accent hover:bg-accent/10 text-white/90 hover:text-white transition-all duration-300 rounded-[2px]"
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
                    ? "border-accent shadow-[0_0_24px_rgba(255,74,0,0.15)]"
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
                  <span className="font-azeret text-[10px] tracking-[0.2em] text-white/50">
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
                  <span className="font-azeret text-[9px] tracking-[0.25em] text-accent uppercase">
                    {card.short}
                  </span>
                  <h3 className="font-roc text-xl sm:text-2xl font-bold tracking-tight uppercase text-white leading-tight">
                    {card.title}
                  </h3>
                  <p className="font-roc text-xs sm:text-sm text-white/70 leading-relaxed">
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
