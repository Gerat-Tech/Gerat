"use client";

import React, { useState } from "react";
import Link from "next/link";
import SectionLabel from "../common/SectionLabel";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";

const leaders = [
  {
    name: "DAWIT TEKLEBRHAN",
    role: "FOUNDER & CHIEF EXECUTIVE OFFICER",
    specialty: "ENTERPRISE SYSTEMS ARCHITECTURE // STRATEGY",
    bio: "Guiding the architectural vision and engineering standards across Gerat's digital infrastructure platforms and client solutions.",
    image: "/image/team/leadership/WQF__0000_Founder-IgorTulchinsky.webp",
  },
  {
    name: "YOHANNES TADESSE",
    role: "HEAD OF ARTIFICIAL INTELLIGENCE",
    specialty: "RAG PIPELINES // VECTOR RETRIEVAL // LLMS",
    bio: "Directing the applied AI laboratory, specialized RAG networks, and domain-grounded intelligence models for institutional workflows.",
    image: "/image/team/leadership/WQF__0004_Chairman-and-Co-Founder_Amir-Husain-2.webp",
  },
  {
    name: "SOLOMON KASSAHUN",
    role: "HEAD OF ENTERPRISE ENGINEERING",
    specialty: "DISTRIBUTED CLOUD // ERP PLATFORMS // SECURITY",
    bio: "Overseeing cloud-native infrastructure, high-concurrency database deployments, and rigorous cryptographic verification standards.",
    image: "/image/team/leadership/WQF__0005_CEO-and-Co-Founder_Steven-Lau.webp",
  },
];

export default function OurLeadership() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section
      id="leadership"
      aria-label="Leadership"
      className="relative w-full bg-[#050505] text-white py-24 sm:py-32 border-b border-white/10"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 lg:mb-20">
          <div className="flex flex-col gap-4 max-w-2xl">
            <SectionLabel index="04" label="LEADERSHIP" />
            <SplitText
              text="ENGINEERING LEADERSHIP."
              as="h2"
              className="font-roc text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[0.95]"
            />
            <SplitText
              text="DOMAIN EXPERIENCE."
              as="h2"
              wordClassName="text-accent"
              className="font-roc text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[0.95]"
            />
          </div>

          <FadeUp delay={0.3}>
            <Link
              href="/team"
              className="group relative isolate inline-flex items-center font-azeret text-[11px] uppercase tracking-[0.2em] px-6 py-3 border border-white/20 hover:border-accent hover:bg-accent/10 text-white/90 hover:text-white transition-all duration-300 rounded-[2px]"
            >
              <span>MEET ALL ENGINEERS & ADVISORS</span>
              <span className="ml-2 text-white/40 group-hover:text-accent group-hover:translate-x-1 transition-all">
                →
              </span>
              <span className="absolute -top-[1px] -left-[1px] size-1.5 border-t border-l border-white/40 group-hover:border-accent" />
              <span className="absolute -bottom-[1px] -right-[1px] size-1.5 border-b border-r border-white/40 group-hover:border-accent" />
            </Link>
          </FadeUp>
        </div>

        {/* Editorial Leader Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {leaders.map((leader, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <div
                key={leader.name}
                tabIndex={0}
                onMouseEnter={() => setActiveIdx(idx)}
                onFocus={() => setActiveIdx(idx)}
                className={`group relative flex flex-col bg-[#0f0f0f] border rounded-[4px] overflow-hidden transition-all duration-400 p-6 sm:p-8 cursor-pointer outline-none ${
                  isSelected
                    ? "border-accent shadow-[0_0_24px_rgba(255,74,0,0.12)]"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                {/* Precision Corner Accents */}
                <span
                  className={`absolute top-0 left-0 size-2 border-t border-l transition-colors duration-300 ${
                    isSelected ? "border-accent" : "border-white/20"
                  }`}
                />
                <span
                  className={`absolute top-0 right-0 size-2 border-t border-r transition-colors duration-300 ${
                    isSelected ? "border-accent" : "border-white/20"
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 size-2 border-b border-l transition-colors duration-300 ${
                    isSelected ? "border-accent" : "border-white/20"
                  }`}
                />
                <span
                  className={`absolute bottom-0 right-0 size-2 border-b border-r transition-colors duration-300 ${
                    isSelected ? "border-accent" : "border-white/20"
                  }`}
                />

                {/* Portrait */}
                <div className="relative aspect-4/5 w-full overflow-hidden bg-black/60 rounded-[2px] mb-6">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 font-azeret text-[9px] tracking-[0.2em] text-white/50 bg-black/60 px-2 py-0.5 border border-white/10">
                    0{idx + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <span className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase">
                    {leader.role}
                  </span>
                  <h3 className="font-roc text-xl font-bold tracking-tight uppercase text-white">
                    {leader.name}
                  </h3>
                  <span className="font-azeret text-[8px] tracking-[0.15em] text-white/40 uppercase">
                    {leader.specialty}
                  </span>
                  <p className="font-roc text-xs text-white/60 leading-relaxed pt-2">
                    {leader.bio}
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
