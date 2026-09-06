"use client";

import React, { useState } from "react";
import Link from "next/link";
import SectionLabel from "../common/SectionLabel";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";
import Magnetic from "../motion/Magnetic";
import { useNav } from "@/context/NavContext";
import { ArrowRight, Compass, Sparkles, Layers, UserCheck } from "lucide-react";

const creativeCards = [
  {
    id: "strategy",
    num: "01",
    icon: Compass,
    title: "BRAND STRATEGY",
    subtitle: "DISCOVERY // POSITIONING // AUDIENCE",
    description:
      "Define what the brand stands for, who it serves, and what makes it distinct. We engineer the strategic foundation that informs every visual and digital asset.",
    tags: ["Market Positioning", "Value Proposition", "Messaging Pillars", "Audience Mapping"],
    link: "/services/brand-creative",
  },
  {
    id: "identity",
    num: "02",
    icon: Sparkles,
    title: "LOGO & BRAND IDENTITY",
    subtitle: "VECTOR ARCHITECTURE // TOKENS // SCALABILITY",
    description:
      "A distinctive visual architecture designed to command recognition across digital, print, and real-world touchpoints — from primary marks to typography systems.",
    tags: ["Primary/Secondary Logos", "Design Token Standards", "Typography Hierarchy", "Brand Style Guide"],
    link: "/services/brand-creative",
  },
  {
    id: "graphic",
    num: "03",
    icon: Layers,
    title: "GRAPHIC DESIGN & COLLATERAL",
    subtitle: "CLARITY // EDITORIAL DECKS // PROFILES",
    description:
      "Purpose-built visual communication that makes complex institutional information clear, credible, and visually cohesive across physical and digital formats.",
    tags: ["Corporate Profiles", "Investor Pitch Decks", "Technical Whitepapers", "Annual Reports"],
    link: "/services/brand-creative",
  },
  {
    id: "personal",
    num: "04",
    icon: UserCheck,
    title: "PERSONAL BRANDING FOR LEADERS",
    subtitle: "EXECUTIVE PRESENCE // AUTHORITY // NARRATIVE",
    description:
      "Turn your story and technical mastery into an authoritative digital presence. Structured positioning, visual monograms, and executive platforms for founders.",
    tags: ["Personal Monogram", "Photography Direction", "LinkedIn Architecture", "Executive Website"],
    link: "/services/personal-branding",
  },
];

/**
 * Brand & Creative Section (Spec: docs/GERAT_BRAND_CREATIVE_PERSONAL_BRANDING_SPEC.md §15)
 * Seamlessly integrates creative, logo, and personal branding into the home page.
 */
export default function BrandCreativeSection() {
  const { openContact } = useNav();
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section
      id="brand-creative"
      aria-label="Brand and Creative Services"
      className="relative w-full bg-[#050505] text-white py-24 sm:py-32 border-b border-white/10"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16 lg:mb-20 max-w-4xl">
          <SectionLabel index="04" label="BRAND & CREATIVE ARCHITECTURE" />

          <div className="space-y-1 sm:space-y-2">
            <SplitText
              text="BUILD THE PRODUCT."
              as="h2"
              className="font-roc text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight uppercase leading-[0.95]"
            />
            <SplitText
              text="BUILD THE BRAND."
              as="h2"
              className="font-roc text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight uppercase leading-[0.95]"
            />
            <SplitText
              text="BUILD THE PRESENCE."
              as="h2"
              wordClassName="text-accent"
              className="font-roc text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight uppercase leading-[0.95]"
            />
          </div>

          <FadeUp delay={0.2} y={16}>
            <p className="font-roc text-base sm:text-lg text-white/70 leading-relaxed pt-2 max-w-3xl">
              A strong digital product starts long before the interface. We help businesses,
              products, and technology leaders define how they look, communicate, and show
              up — then connect that identity directly into the digital experiences and
              software architectures we engineer.
            </p>
          </FadeUp>
        </div>

        {/* 4 Monolithic Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {creativeCards.map((card, idx) => {
            const Icon = card.icon;
            const isHovered = hoveredCard === card.id;

            return (
              <FadeUp key={card.id} delay={0.1 * idx} y={24}>
                <div
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative bg-[#0c0c0c] border transition-all duration-300 p-8 sm:p-10 rounded-[2px] flex flex-col justify-between min-h-[380px] h-full ${
                    isHovered ? "border-accent/80 bg-[#111111]" : "border-white/10 hover:border-white/30"
                  }`}
                >
                  {/* Precision Corner Brackets */}
                  <span className="absolute top-0 left-0 size-2.5 border-t border-l border-white/30 group-hover:border-accent transition-colors" />
                  <span className="absolute top-0 right-0 size-2.5 border-t border-r border-white/30 group-hover:border-accent transition-colors" />
                  <span className="absolute bottom-0 left-0 size-2.5 border-b border-l border-white/30 group-hover:border-accent transition-colors" />
                  <span className="absolute bottom-0 right-0 size-2.5 border-b border-r border-white/30 group-hover:border-accent transition-colors" />

                  {/* Top Bar: Icon & Index */}
                  <div>
                    <div className="flex items-center justify-between pb-6 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-[2px] bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all duration-300">
                          <Icon className="size-4" />
                        </div>
                        <span className="font-azeret text-[10px] tracking-[0.2em] text-white/50 uppercase">
                          DISCIPLINE // {card.num}
                        </span>
                      </div>
                      <span className="font-azeret text-[10px] tracking-[0.2em] text-white/30">
                        GERAT_STUDIO
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-col gap-3 my-6">
                      <span className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase font-bold">
                        {card.subtitle}
                      </span>
                      <h3 className="font-roc text-2xl sm:text-3xl font-medium tracking-tight uppercase text-white group-hover:text-white transition-colors">
                        {card.title}
                      </h3>
                      <p className="font-roc text-sm text-white/70 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {/* Deliverable Tags & Direct Link */}
                  <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-white/5 border border-white/10 font-azeret text-[9px] tracking-[0.1em] uppercase text-white/60 group-hover:text-white group-hover:border-white/20 transition-colors rounded-[1px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <Link
                        href={card.link}
                        className="inline-flex items-center gap-2 font-azeret text-[10px] tracking-[0.2em] uppercase text-accent hover:text-white transition-colors"
                      >
                        <span>LEARN MORE</span>
                        <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <button
                        type="button"
                        onClick={openContact}
                        className="font-azeret text-[9px] tracking-[0.15em] text-white/40 hover:text-accent uppercase transition-colors"
                      >
                        COMMISSION →
                      </button>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* Global Section Bottom Bar & CTAs */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-emerald-400" />
            <span className="font-azeret text-[10px] tracking-[0.2em] text-white/60 uppercase">
              STUDIO CAPACITY // INTAKE OPEN FOR Q4 & 2026
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Magnetic maxDisplacement={6}>
              <Link
                href="/services/brand-creative"
                className="px-6 py-3 bg-white text-black font-azeret text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-accent hover:text-white transition-all rounded-[2px]"
              >
                EXPLORE BRAND & CREATIVE
              </Link>
            </Magnetic>

            <Magnetic maxDisplacement={6}>
              <Link
                href="/services/personal-branding"
                className="px-6 py-3 border border-white/20 bg-transparent text-white/80 font-azeret text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-black transition-all rounded-[2px]"
              >
                FOUNDER BRANDING
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
