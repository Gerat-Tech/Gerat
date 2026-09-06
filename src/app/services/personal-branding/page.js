"use client";

import React, { useState } from "react";
import Link from "next/link";
import SectionLabel from "@/components/common/SectionLabel";
import FadeUp from "@/components/motion/FadeUp";
import SplitText from "@/components/motion/SplitText";
import Footer from "@/components/layout/Footer";
import { useNav } from "@/context/NavContext";
import { portfolioProjects } from "@/content";
import {
  Compass,
  Sparkles,
  Camera,
  Share2,
  Globe,
  FileText,
  Rocket,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const PERSONAL_MODULES = [
  {
    num: "01",
    title: "EXECUTIVE POSITIONING",
    icon: Compass,
    subtitle: "STORY // EXPERTISE // NARRATIVE",
    description:
      "Define what you want to be known for. We map your accomplishments, audience, core message, and point of view into an undeniable positioning blueprint.",
    deliverables: [
      "Audience & Market Mapping",
      "Executive Story Architecture",
      "Core Point-of-View Definition",
      "Strategic Thought-Leadership Pillars",
    ],
  },
  {
    num: "02",
    title: "PERSONAL VISUAL IDENTITY",
    icon: Sparkles,
    subtitle: "TYPOGRAPHIC MONOGRAM // PALETTE",
    description:
      "A sophisticated, name-based visual system. Monogram mark, bespoke typography pairing, and color harmony designed for high-caliber credibility.",
    deliverables: [
      "Personal Monogram / Emblem",
      "Typographic Style System",
      "Refined Color Hierarchy",
      "Personal Brand Usage Guide",
    ],
  },
  {
    num: "03",
    title: "PHOTOGRAPHY DIRECTION",
    icon: Camera,
    subtitle: "EDITORIAL PORTRAITS // SHOT LISTS",
    description:
      "Comprehensive creative direction for your photo sessions. Wardrobe guidance, location scoping, and shot lists tailored to executive publications and speaking.",
    deliverables: [
      "Creative Wardrobe & Mood Direction",
      "Contextual Shot List Framework",
      "Studio & Environmental Scoping",
      "Platform-Specific Crop Guidelines",
    ],
  },
  {
    num: "04",
    title: "LINKEDIN PROFILE BRANDING",
    icon: Share2,
    subtitle: "CONVERSION SURFACE // BANNER SYSTEM",
    description:
      "Transforming your LinkedIn profile from an analog résumé into a high-authority conversion asset that commands immediate respect from peers and investors.",
    deliverables: [
      "High-Impact Executive Banner Design",
      "Structured Headline & About Copywriting",
      "Featured Section Content Strategy",
      "Consistent Visual Post Framework",
    ],
  },
  {
    num: "05",
    title: "EXECUTIVE PERSONAL WEBSITE",
    icon: Globe,
    subtitle: "SOVEREIGN DIGITAL ASSET // NEXT.JS",
    description:
      "A fast, bespoke personal website built on modern web standards. Houses your biography, portfolio, media appearances, speaking engagements, and contact pipeline.",
    deliverables: [
      "Bespoke High-Performance Website",
      "Interactive Bio & Media Kit",
      "Keynote Speaking & Advisory Inquiries",
      "Sub-Second Mobile Optimization",
    ],
  },
  {
    num: "06",
    title: "CONTENT & THOUGHT LEADERSHIP",
    icon: FileText,
    subtitle: "EDITORIAL PILLARS // TEMPLATES",
    description:
      "Structured templates, carousel systems, and editorial calendars that empower you to publish authoritative technical insights without endless operational friction.",
    deliverables: [
      "Monthly Topic Matrix",
      "Technical Carousel Templates",
      "Newsletter Layout Blueprint",
      "Ghostwriting / Editorial Framework",
    ],
  },
  {
    num: "07",
    title: "LAUNCH & ASSET ROLLOUT",
    icon: Rocket,
    subtitle: "STAGE // PRESS // ANNOUNCEMENT",
    description:
      "A coordinated digital unveiling of your refreshed personal brand across social platforms, digital collateral, email signatures, and industry press.",
    deliverables: [
      "Launch Announcement Strategy",
      "Speaker One-Pager PDF",
      "Executive Email Signature Kit",
      "Digital Media Asset Archive",
    ],
  },
];

const TARGET_PERSONAS = [
  {
    role: "TECH FOUNDERS & CEOS",
    benefit: "Attract tier-1 institutional capital, recruit top engineering talent, and build category leadership.",
  },
  {
    role: "EXECUTIVE DIRECTORS",
    benefit: "Cement board credibility, command higher speaking honorariums, and shape industry policy.",
  },
  {
    role: "CONSULTANTS & ADVISORS",
    benefit: "Win high-ticket corporate advisory retainers and eliminate price-driven sales negotiations.",
  },
  {
    role: "RESEARCHERS & ARCHITECTS",
    benefit: "Translate deep technical mastery into recognized public authority and high-profile keynote opportunities.",
  },
];

export default function PersonalBrandingPage() {
  const { openContact } = useNav();
  const executiveCase = portfolioProjects.find((p) => p.id === "meridian-executive");

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-accent selection:text-black">
      {/* Hero Section */}
      <section className="relative w-full max-w-[1440px] mx-auto pt-36 sm:pt-44 pb-20 px-4 sm:px-6 md:px-8 lg:px-10 border-b border-white/10">
        <div className="flex flex-col gap-6 max-w-4xl">
          <SectionLabel index="05" label="EXECUTIVE PRESENCE & PERSONAL BRANDING" />

          <div className="space-y-2">
            <SplitText
              text="YOUR NAME IS PART"
              as="h1"
              className="font-roc text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight uppercase leading-[0.92]"
            />
            <SplitText
              text="OF YOUR BUSINESS."
              as="div"
              className="font-roc text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight uppercase leading-[0.92]"
            />
            <SplitText
              text="MAKE IT COUNT."
              as="div"
              wordClassName="text-accent"
              className="font-roc text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight uppercase leading-[0.92]"
            />
          </div>

          <FadeUp delay={0.3} y={16}>
            <p className="font-roc text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
              We help founders, executives, consultants, and technology leaders turn their
              life&apos;s work and technical mastery into an undeniable, recognizable personal brand
              that opens doors to capital, partnerships, and high-stakes opportunities.
            </p>
          </FadeUp>

          <FadeUp delay={0.4} y={16}>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={openContact}
                className="inline-flex items-center font-azeret text-[11px] uppercase tracking-[0.2em] px-8 py-4 bg-accent text-white font-bold hover:bg-white hover:text-black transition-all rounded-[2px]"
              >
                <span>COMMISSION PERSONAL BRANDING</span>
                <span className="ml-2">→</span>
              </button>

              <Link
                href="/portfolio"
                className="inline-flex items-center font-azeret text-[11px] uppercase tracking-[0.2em] px-8 py-4 border border-white/20 bg-transparent text-white hover:border-white transition-all rounded-[2px]"
              >
                <span>VIEW EXECUTIVE PROFILES</span>
              </Link>
            </div>
          </FadeUp>
        </div>

        <div className="mt-16 pt-4 border-t border-white/10 flex items-center justify-between font-azeret text-[10px] tracking-[0.2em] text-white/40 uppercase">
          <span>FRAMEWORK // 07 MODULAR CAPABILITY PILLARS</span>
          <span>DISCOVER METHODOLOGY ↓</span>
        </div>
      </section>

      {/* Target Audience / Personas Section */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-20 sm:py-28 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TARGET_PERSONAS.map((p, idx) => (
            <FadeUp key={p.role} delay={0.1 * idx} y={16}>
              <div className="p-6 bg-[#0c0c0c] border border-white/10 rounded-[2px] h-full flex flex-col justify-between">
                <div>
                  <span className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase font-bold">
                    PROFILE // 0{idx + 1}
                  </span>
                  <h3 className="font-roc text-lg font-medium tracking-tight uppercase text-white mt-1">
                    {p.role}
                  </h3>
                  <p className="font-roc text-xs text-white/60 mt-3 leading-relaxed">
                    {p.benefit}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-white/40 font-azeret text-[9px]">
                  <CheckCircle2 className="size-3 text-accent" />
                  <span>TARGETED OUTCOME</span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* 7 Modular Framework Pillars */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-24 sm:py-32 border-b border-white/10">
        <div className="flex flex-col gap-4 mb-16 max-w-3xl">
          <SectionLabel index="06" label="THE 7-PILLAR PERSONAL BRAND ENGINE" />
          <h2 className="font-roc text-3xl sm:text-5xl font-medium tracking-tight uppercase leading-[1.05]">
            MODULAR ARCHITECTURE. <br />
            <span className="text-accent">BUILT AROUND YOUR TIME.</span>
          </h2>
          <p className="font-roc text-sm sm:text-base text-white/70 leading-relaxed">
            Busy executives do not have 20 hours a week to produce content. We design high-efficiency
            systems that extract your insights with minimal time commitment while maximizing institutional impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PERSONAL_MODULES.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <FadeUp key={mod.num} delay={0.08 * idx} y={24}>
                <div className="group relative bg-[#0c0c0c] border border-white/10 hover:border-accent/80 p-8 rounded-[2px] flex flex-col justify-between min-h-[380px] transition-all duration-300 h-full">
                  <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30 group-hover:border-accent transition-colors" />
                  <span className="absolute top-0 right-0 size-2 border-t border-r border-white/30 group-hover:border-accent transition-colors" />
                  <span className="absolute bottom-0 left-0 size-2 border-b border-l border-white/30 group-hover:border-accent transition-colors" />
                  <span className="absolute bottom-0 right-0 size-2 border-b border-r border-white/30 group-hover:border-accent transition-colors" />

                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div className="flex items-center gap-2.5">
                        <div className="size-8 rounded-[2px] bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-colors">
                          <Icon className="size-3.5" />
                        </div>
                        <span className="font-azeret text-[10px] tracking-[0.2em] text-white/50 uppercase">
                          MODULE // {mod.num}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5">
                      <span className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase font-bold">
                        {mod.subtitle}
                      </span>
                      <h3 className="font-roc text-2xl font-medium tracking-tight uppercase text-white mt-1">
                        {mod.title}
                      </h3>
                      <p className="font-roc text-xs sm:text-sm text-white/70 leading-relaxed mt-2">
                        {mod.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 mt-6">
                    <span className="font-azeret text-[8px] tracking-[0.2em] text-white/40 uppercase block mb-2.5">
                      DELIVERABLES
                    </span>
                    <ul className="space-y-1.5 font-azeret text-[9px] tracking-[0.08em] text-white/60">
                      {mod.deliverables.map((del) => (
                        <li key={del} className="flex items-center gap-2">
                          <span className="text-accent">•</span>
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* Featured Case Study Spotlight */}
      {executiveCase && (
        <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-24 sm:py-32 border-b border-white/10">
          <div className="bg-[#0b0b0b] border border-white/10 p-8 sm:p-12 rounded-[2px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <span className="font-azeret text-[10px] tracking-[0.25em] text-accent uppercase font-bold">
                  FLAGSHIP CASE STUDY // {executiveCase.category}
                </span>
                <h2 className="font-roc text-3xl sm:text-4xl font-medium tracking-tight uppercase text-white">
                  {executiveCase.title}
                </h2>
                <p className="font-roc text-sm text-white/70 leading-relaxed max-w-xl">
                  {executiveCase.summary}
                </p>

                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-6 font-azeret text-[10px]">
                  <div>
                    <span className="text-white/40 block">METRIC IMPACT:</span>
                    <span className="text-accent font-bold tracking-widest">{executiveCase.metric}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">DEPLOYMENT:</span>
                    <span className="text-white">{executiveCase.status}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 font-azeret text-[10px] tracking-[0.2em] uppercase text-white hover:text-accent transition-colors"
                  >
                    <span>EXPLORE COMPLETE PORTFOLIO</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#141414] border border-white/10 p-6 rounded-[2px] flex flex-col gap-3 font-azeret text-[10px]">
                <span className="text-accent uppercase tracking-[0.2em]">CASE BREAKDOWN</span>
                <div className="text-white/60 space-y-2 font-roc text-xs">
                  <p><strong className="text-white">Challenge:</strong> {executiveCase.problem}</p>
                  <p><strong className="text-white">Solution:</strong> {executiveCase.architecture}</p>
                  <p><strong className="text-white">Result:</strong> {executiveCase.impact}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-20 sm:py-28 text-center flex flex-col items-center gap-6">
        <span className="font-azeret text-[10px] tracking-[0.25em] text-accent uppercase">
          ELEVATE YOUR VISIBILITY
        </span>
        <h2 className="font-roc text-3xl sm:text-5xl font-medium tracking-tight uppercase max-w-2xl">
          READY TO TURN YOUR STORY INTO AN ASSET?
        </h2>
        <p className="font-roc text-sm sm:text-base text-white/60 max-w-md">
          Direct consultation with our executive branding directors. We map your trajectory in an introductory review.
        </p>
        <button
          type="button"
          onClick={openContact}
          className="mt-2 px-10 py-4 bg-accent text-white font-azeret text-xs uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-all rounded-[2px]"
        >
          BOOK A PERSONAL BRAND CONSULTATION
        </button>
      </section>

      {/* Master Footer */}
      <Footer />
    </div>
  );
}
