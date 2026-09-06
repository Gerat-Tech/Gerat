"use client";

import React, { useState } from "react";
import FadeUp from "@/components/motion/FadeUp";

const leadership = [
  {
    name: "DAWIT TEKLEBRHAN",
    role: "FOUNDER & CHIEF EXECUTIVE OFFICER",
    specialty: "SYSTEMS ARCHITECTURE // STRATEGY",
    bio: "Directing the firm's architectural doctrine, technology roadmaps, and enterprise partnerships. Over a decade of experience designing scalable digital platforms across enterprise and institutional spheres.",
    image: "/image/team/leadership/WQF__0000_Founder-IgorTulchinsky.webp",
  },
  {
    name: "YOHANNES TADESSE",
    role: "HEAD OF ARTIFICIAL INTELLIGENCE",
    specialty: "APPLIED RAG // VECTOR RETRIEVAL // LLMS",
    bio: "Leading Gerat's applied machine learning research and domain-grounded knowledge retrieval laboratory. Expert in high-precision semantic chunking and localized model deployment.",
    image: "/image/team/leadership/WQF__0004_Chairman-and-Co-Founder_Amir-Husain-2.webp",
  },
  {
    name: "SOLOMON KASSAHUN",
    role: "HEAD OF ENTERPRISE ENGINEERING",
    specialty: "DISTRIBUTED CLOUD // ERP PLATFORMS // SECURITY",
    bio: "Overseeing high-throughput transactional backends, cloud-native deployments, and strict zero-trust cryptographic architectures for mission-critical operations.",
    image: "/image/team/leadership/WQF__0005_CEO-and-Co-Founder_Steven-Lau.webp",
  },
];

export default function TeamLeadership() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-16 text-white">
      <div className="flex flex-col gap-3 mb-12">
        <span className="font-azeret text-[10px] tracking-[0.25em] text-accent uppercase">
          01 // EXECUTIVE ARCHITECTS
        </span>
        <h2 className="font-roc text-3xl sm:text-4xl font-bold uppercase tracking-tight">
          LEADERSHIP & ENGINEERING DIRECTORS
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {leadership.map((leader, idx) => {
          const isSelected = activeIdx === idx;
          return (
            <FadeUp key={leader.name} delay={0.1 * idx} y={20}>
              <div
                tabIndex={0}
                onMouseEnter={() => setActiveIdx(idx)}
                onFocus={() => setActiveIdx(idx)}
                className={`group relative flex flex-col bg-[#0d0d0d] border rounded-[4px] overflow-hidden transition-all duration-400 p-6 sm:p-8 cursor-pointer outline-none h-full ${
                  isSelected
                    ? "border-accent shadow-[0_0_24px_rgba(255,74,0,0.15)]"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                {/* Precision Corner Accents */}
                <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30 group-hover:border-accent transition-colors" />
                <span className="absolute top-0 right-0 size-2 border-t border-r border-white/30 group-hover:border-accent transition-colors" />
                <span className="absolute bottom-0 left-0 size-2 border-b border-l border-white/30 group-hover:border-accent transition-colors" />
                <span className="absolute bottom-0 right-0 size-2 border-b border-r border-white/30 group-hover:border-accent transition-colors" />

                {/* Portrait */}
                <div className="relative aspect-4/5 w-full overflow-hidden bg-black/60 rounded-[2px] mb-6">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 font-azeret text-[9px] tracking-[0.2em] text-white/60 bg-black/70 px-2 py-0.5 border border-white/10">
                    0{idx + 1}
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-2">
                  <span className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase">
                    {leader.role}
                  </span>
                  <h3 className="font-roc text-xl sm:text-2xl font-bold tracking-tight uppercase text-white">
                    {leader.name}
                  </h3>
                  <span className="font-azeret text-[8px] tracking-[0.15em] text-white/40 uppercase">
                    {leader.specialty}
                  </span>
                  <p className="font-roc text-xs text-white/65 leading-relaxed pt-2">
                    {leader.bio}
                  </p>
                </div>
              </div>
            </FadeUp>
          );
        })}
      </div>
    </section>
  );
}
