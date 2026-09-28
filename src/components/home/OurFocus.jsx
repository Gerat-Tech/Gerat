"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CurvedSectionTransition from "../common/CurvedSectionTransition";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";
import { useNav } from "@/context/NavContext";
import {
  Globe,
  Layout,
  Smartphone,
  Sparkles,
  Bot,
  Workflow,
  Database,
  CheckCircle2,
  AlertCircle,
  Palette,
} from "lucide-react";

const V2_DEFAULT_PILLARS = [
  {
    num: "01",
    discipline: "digital",
    title: "DIGITAL EXPERIENCES",
    desc: "Websites, web applications, customer portals, and digital products that make your business easier to discover, understand, and use.",
    deliverables: ["Websites", "Web applications", "Customer portals", "Digital products"],
    deepLink: "/services/digital-experiences",
    actionLabel: "EXPLORE DIGITAL",
  },
  {
    num: "02",
    discipline: "intelligence",
    title: "AI & INTELLIGENT TOOLS",
    desc: "Practical AI that helps people find information, automate repetitive work, and make better use of what they already know.",
    deliverables: ["AI assistants", "RAG & knowledge systems", "Workflow automation", "Document intelligence"],
    deepLink: "/services/ai-tools",
    actionLabel: "EXPLORE AI & TOOLS",
  },
  {
    num: "03",
    discipline: "systems",
    title: "BUSINESS SYSTEMS",
    desc: "Connected software that unites operations, inventory, client management, and automated workflows so your business runs with less friction.",
    deliverables: ["ERP & operational platforms", "Internal tools", "Workflow systems", "API & system integrations"],
    deepLink: "/services/business-systems",
    actionLabel: "EXPLORE SYSTEMS",
  },
  {
    num: "04",
    discipline: "brand",
    title: "BRAND & CREATIVE",
    desc: "Clear identities and visual systems that make businesses recognizable, credible, and memorable across every medium.",
    deliverables: ["Brand strategy", "Logo & visual identity", "Marketing design", "Founder & personal branding"],
    deepLink: "/services/brand-creative",
    actionLabel: "EXPLORE BRAND",
  },
];

/**
 * Visual Preview 1: DIGITAL EXPERIENCES
 * Modeled directly on Receivio Card 1:
 * Soft tinted container with horizontal software capability tiles
 */
function DigitalExperiencesVisual() {
  const tools = [
    { icon: Globe, name: "Websites" },
    { icon: Layout, name: "Portals" },
    { icon: Smartphone, name: "Mobile UI" },
  ];

  return (
    <div className="w-full h-[140px] sm:h-[155px] rounded-2xl bg-[#EBE2D3]/70 border border-[#DFD4C3] p-3 sm:p-4 flex items-center justify-center select-none overflow-hidden">
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-3 w-full">
        {tools.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.name}
              className="bg-[#FAF6ED] rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-[#DDD1BE] shadow-2xs flex items-center gap-2.5 flex-1 min-w-[110px] justify-center transition-all duration-200 hover:border-[#EA5B15]/40 hover:-translate-y-0.5"
            >
              <div className="size-6 rounded-lg bg-[#300F0A]/5 flex items-center justify-center text-[#EA5B15]">
                <Icon className="size-3.5" strokeWidth={1.75} />
              </div>
              <span className="font-parkinsans text-xs font-bold text-[#300F0A]">
                {t.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Visual Preview 2: AI & INTELLIGENT TOOLS
 * Modeled on Receivio:
 * Clean, breathable setting with clear AI capability tiles
 */
function AiIntelligentToolsVisual() {
  return (
    <div className="w-full h-[140px] sm:h-[155px] rounded-2xl bg-[#EBE2D3]/70 border border-[#DFD4C3] p-3 sm:p-4 flex items-center justify-center select-none overflow-hidden">
      <div className="flex items-center justify-center gap-2.5 w-full">
        <div className="bg-[#FAF6ED] rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-[#DDD1BE] shadow-2xs flex items-center gap-2.5 flex-1 justify-center transition-all duration-200 hover:border-[#EA5B15]/40 hover:-translate-y-0.5">
          <div className="size-6 rounded-lg bg-[#EA5B15]/10 flex items-center justify-center text-[#EA5B15]">
            <Sparkles className="size-3.5" strokeWidth={1.75} />
          </div>
          <span className="font-parkinsans text-xs font-bold text-[#300F0A]">
            AI Assistants
          </span>
        </div>
        <div className="bg-[#FAF6ED] rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-[#DDD1BE] shadow-2xs flex items-center gap-2.5 flex-1 justify-center transition-all duration-200 hover:border-[#EA5B15]/40 hover:-translate-y-0.5">
          <div className="size-6 rounded-lg bg-[#300F0A]/5 flex items-center justify-center text-[#EA5B15]">
            <Bot className="size-3.5" strokeWidth={1.75} />
          </div>
          <span className="font-parkinsans text-xs font-bold text-[#300F0A]">
            Automation
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Visual Preview 3: BUSINESS SYSTEMS
 * Modeled on Receivio:
 * Clean, breathable setting with connected operational systems tiles
 */
function BusinessSystemsVisual() {
  return (
    <div className="w-full h-[140px] sm:h-[155px] rounded-2xl bg-[#EBE2D3]/70 border border-[#DFD4C3] p-3 sm:p-4 flex items-center justify-center select-none overflow-hidden">
      <div className="flex items-center justify-center gap-2.5 w-full">
        <div className="bg-[#FAF6ED] rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-[#DDD1BE] shadow-2xs flex items-center gap-2.5 flex-1 justify-center transition-all duration-200 hover:border-[#EA5B15]/40 hover:-translate-y-0.5">
          <div className="size-6 rounded-lg bg-[#EA5B15]/10 flex items-center justify-center text-[#EA5B15]">
            <Workflow className="size-3.5" strokeWidth={1.75} />
          </div>
          <span className="font-parkinsans text-xs font-bold text-[#300F0A]">
            Core ERP
          </span>
        </div>
        <div className="bg-[#FAF6ED] rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-[#DDD1BE] shadow-2xs flex items-center gap-2.5 flex-1 justify-center transition-all duration-200 hover:border-[#EA5B15]/40 hover:-translate-y-0.5">
          <div className="size-6 rounded-lg bg-[#300F0A]/5 flex items-center justify-center text-[#EA5B15]">
            <Database className="size-3.5" strokeWidth={1.75} />
          </div>
          <span className="font-parkinsans text-xs font-bold text-[#300F0A]">
            Data Sync
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Visual Preview 4: BRAND & CREATIVE
 * Modeled directly on Receivio Card 4:
 * 3 layered, offset document cards with skeleton lines and status icons
 */
function BrandCreativeVisual() {
  return (
    <div className="w-full h-[140px] sm:h-[155px] rounded-2xl bg-[#EBE2D3]/70 border border-[#DFD4C3] p-2 sm:p-3 flex items-center justify-center select-none overflow-hidden">
      <div className="flex items-center justify-center gap-2 sm:gap-3 py-1">
        {/* Document 1 (Tilted Left) */}
        <div className="w-24 sm:w-28 h-24 sm:h-26 bg-[#FAF6ED] border border-[#DDD1BE] rounded-xl p-2.5 shadow-2xs flex flex-col justify-between -rotate-4 transform hover:rotate-0 transition-transform duration-300">
          <div className="space-y-1.5 pt-1">
            <div className="h-1.5 bg-[#300F0A]/15 rounded-full w-4/5" />
            <div className="h-1.5 bg-[#300F0A]/10 rounded-full w-3/5" />
            <div className="h-1.5 bg-[#300F0A]/10 rounded-full w-full" />
          </div>
          <div className="flex items-center justify-between pt-1">
            <CheckCircle2 className="size-3 text-emerald-600" />
            <span className="text-[7.5px] font-parkinsans font-bold text-[#300F0A]/40 uppercase">Spec</span>
          </div>
        </div>

        {/* Document 2 (Center Elevated) */}
        <div className="w-26 sm:w-30 h-26 sm:h-28 bg-[#FAF6ED] border border-[#EA5B15]/40 rounded-xl p-2.5 shadow-sm flex flex-col justify-between z-10 scale-105 hover:scale-110 transition-transform duration-300">
          <div className="space-y-1.5 pt-1">
            <div className="h-1.5 bg-[#EA5B15]/30 rounded-full w-full" />
            <div className="h-1.5 bg-[#300F0A]/15 rounded-full w-4/5" />
            <div className="h-1.5 bg-[#300F0A]/10 rounded-full w-2/3" />
          </div>
          <div className="flex items-center justify-between pt-1">
            <AlertCircle className="size-3 text-[#EA5B15]" />
            <span className="text-[7.5px] font-parkinsans font-bold text-[#EA5B15] uppercase">Tokens</span>
          </div>
        </div>

        {/* Document 3 (Tilted Right) */}
        <div className="w-24 sm:w-28 h-24 sm:h-26 bg-[#FAF6ED] border border-[#DDD1BE] rounded-xl p-2.5 shadow-2xs flex flex-col justify-between rotate-4 transform hover:rotate-0 transition-transform duration-300">
          <div className="space-y-1.5 pt-1">
            <div className="h-1.5 bg-[#300F0A]/15 rounded-full w-3/4" />
            <div className="h-1.5 bg-[#300F0A]/10 rounded-full w-full" />
            <div className="h-1.5 bg-[#300F0A]/10 rounded-full w-1/2" />
          </div>
          <div className="flex items-center justify-between pt-1">
            <CheckCircle2 className="size-3 text-emerald-600" />
            <span className="text-[7.5px] font-parkinsans font-bold text-[#300F0A]/40 uppercase">Type</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Section: THE BRIDGE ("WHAT GERAT BUILDS") — Receivio Style Alignment
 *
 * Implements:
 * - Dimmed warm off-white card background: #F6F0E2 (exact Receivio spec)
 * - Tight card spacing: gap-3 sm:gap-3.5 md:gap-4
 * - Generous 40px internal card padding matching Receivio
 * - Direct Receivio-aligned visuals (software dock in Card 1, fanned document stack in Card 4)
 * - Zero numbers ("01", "02", "03", "04") and zero red dots after eyebrow text
 * - Dynamic scroll-morphing curved transition from Hero into Services
 */
export default function OurFocus({ initialPillars = null }) {
  const { openContact } = useNav();
  const [fetchedPillars, setFetchedPillars] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/services?active=true", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.pillars) && data.pillars.length > 0) {
          const normalized = data.pillars.map((p) => {
            let dels = [];
            if (Array.isArray(p.deliverables)) {
              dels = p.deliverables;
            } else if (typeof p.deliverables === "string" && p.deliverables.startsWith("[")) {
              try {
                dels = JSON.parse(p.deliverables);
              } catch {
                dels = p.deliverables.split("\n").filter(Boolean);
              }
            } else if (p.deliverables) {
              dels = p.deliverables.split("\n").filter(Boolean);
            }

            const defaultMatch = V2_DEFAULT_PILLARS.find((v) => v.num === p.num) || V2_DEFAULT_PILLARS[0];

            return {
              ...p,
              num: p.num || "01",
              discipline: defaultMatch.discipline,
              title: p.title,
              desc: p.desc || p.tagline,
              deliverables: dels.length > 0 ? dels : defaultMatch.deliverables,
              deepLink: p.deepLink || defaultMatch.deepLink,
              actionLabel: p.actionLabel || defaultMatch.actionLabel,
            };
          });
          setFetchedPillars(normalized);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const pillars =
    fetchedPillars !== null && fetchedPillars.length > 0
      ? fetchedPillars
      : initialPillars !== null && initialPillars.length > 0
      ? initialPillars
      : V2_DEFAULT_PILLARS;

  const p1 = pillars.find((p) => p.num === "01") || V2_DEFAULT_PILLARS[0];
  const p2 = pillars.find((p) => p.num === "02") || V2_DEFAULT_PILLARS[1];
  const p3 = pillars.find((p) => p.num === "03") || V2_DEFAULT_PILLARS[2];
  const p4 = pillars.find((p) => p.num === "04") || V2_DEFAULT_PILLARS[3];

  return (
    <section
      id="services"
      aria-label="What We Build"
      className="w-full bg-[#F1DFD9] text-[#300F0A] relative scroll-mt-24 overflow-visible"
    >
      <span id="capabilities" className="sr-only" />

      {/* Dynamic Scroll-Morphing Arched Transition from Hero into Services */}
      <CurvedSectionTransition
        fill="#F1DFD9"
        showStroke={false}
      />

      <div className="w-full max-w-[1080px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-24">
        {/* Top Eyebrow Pill (Clean text, NO red dot) */}
        <FadeUp delay={0.05} y={16}>
          <div className="flex justify-center mb-4 sm:mb-5">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#300F0A]/[0.06] border border-[#300F0A]/12 text-[#300F0A] font-parkinsans text-xs tracking-[0.2em] uppercase font-bold">
              OUR SERVICES
            </div>
          </div>
        </FadeUp>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-1 sm:space-y-1.5 mb-3 sm:mb-4">
          <SplitText
            text="FROM BUSINESS NEED"
            as="h2"
            delay={0.1}
            stagger={0.03}
            className="font-parkinsans text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-semibold tracking-tight uppercase leading-[1.06] text-[#300F0A]"
          />
          <SplitText
            text="TO WORKING SYSTEM."
            as="div"
            delay={0.25}
            stagger={0.03}
            wordClassName="text-[#EA5B15]"
            className="font-parkinsans text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-semibold tracking-tight uppercase leading-[1.06] text-[#300F0A]"
          />
        </div>

        {/* Subtitle Statement */}
        <FadeUp delay={0.35} y={16}>
          <p className="font-artific text-xs sm:text-sm md:text-base text-[#300F0A]/75 text-center max-w-xl mx-auto leading-relaxed mb-8 sm:mb-12">
            We bring design, engineering, AI, and business thinking together around the problem that needs solving. Four core disciplines built to work seamlessly as one.
          </p>
        </FadeUp>

        {/* 2x2 Asymmetric Bento Cards Grid (Receivio Proportions: 1080px container, tight gap-3 to gap-4) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-3.5 md:gap-4 items-stretch">
          {/* Card 1: DIGITAL EXPERIENCES (Wide top card - col-span-7) */}
          <FadeUp delay={0.1} y={24} className="md:col-span-7 flex">
            <div
              style={{ backgroundColor: "#F6F0E2" }}
              className="w-full bg-[#F6F0E2] rounded-3xl border border-[#E5DAC8] p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-[0_4px_20px_rgba(48,15,10,0.03)] hover:shadow-[0_16px_40px_rgba(48,15,10,0.06)] hover:border-[#EA5B15]/30 transition-all duration-300 group"
            >
              <div>
                {/* Visual Representation (Receivio Dock Alignment) */}
                <DigitalExperiencesVisual />

                {/* Content */}
                <div className="space-y-2 mt-6 sm:mt-8">
                  <h3 className="font-parkinsans text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#300F0A] group-hover:text-[#EA5B15] transition-colors">
                    {p1.title}
                  </h3>
                  <p className="font-artific text-xs sm:text-[13px] md:text-sm text-[#300F0A]/75 leading-relaxed">
                    {p1.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 mt-6 border-t border-[#300F0A]/8 flex items-center justify-between gap-3">
                <Link
                  href={p1.deepLink || "/services/digital-experiences"}
                  className="inline-flex items-center gap-1.5 font-parkinsans text-xs tracking-[0.16em] uppercase font-bold text-[#EA5B15] hover:text-[#300F0A] transition-colors"
                >
                  <span>{p1.actionLabel || "EXPLORE DIGITAL"}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <button
                  type="button"
                  onClick={() => openContact({ discipline: "digital" })}
                  className="font-parkinsans text-[11px] uppercase tracking-[0.15em] px-4 py-1.5 rounded-full bg-[#300F0A]/[0.05] text-[#300F0A] hover:bg-[#EA5B15] hover:text-[#FFFFFF] font-bold transition-all duration-200 cursor-pointer"
                >
                  INQUIRE
                </button>
              </div>
            </div>
          </FadeUp>

          {/* Card 2: AI & INTELLIGENT TOOLS (Narrow top card - col-span-5) */}
          <FadeUp delay={0.18} y={24} className="md:col-span-5 flex">
            <div
              style={{ backgroundColor: "#F6F0E2" }}
              className="w-full bg-[#F6F0E2] rounded-3xl border border-[#E5DAC8] p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-[0_4px_20px_rgba(48,15,10,0.03)] hover:shadow-[0_16px_40px_rgba(48,15,10,0.06)] hover:border-[#EA5B15]/30 transition-all duration-300 group"
            >
              <div>
                {/* Visual Representation */}
                <AiIntelligentToolsVisual />

                {/* Content */}
                <div className="space-y-2 mt-6 sm:mt-8">
                  <h3 className="font-parkinsans text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#300F0A] group-hover:text-[#EA5B15] transition-colors">
                    {p2.title}
                  </h3>
                  <p className="font-artific text-xs sm:text-[13px] md:text-sm text-[#300F0A]/75 leading-relaxed">
                    {p2.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 mt-6 border-t border-[#300F0A]/8 flex items-center justify-between gap-3">
                <Link
                  href={p2.deepLink || "/services/ai-tools"}
                  className="inline-flex items-center gap-1.5 font-parkinsans text-xs tracking-[0.16em] uppercase font-bold text-[#EA5B15] hover:text-[#300F0A] transition-colors"
                >
                  <span>{p2.actionLabel || "EXPLORE AI & TOOLS"}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <button
                  type="button"
                  onClick={() => openContact({ discipline: "intelligence" })}
                  className="font-parkinsans text-[11px] uppercase tracking-[0.15em] px-4 py-1.5 rounded-full bg-[#300F0A]/[0.05] text-[#300F0A] hover:bg-[#EA5B15] hover:text-[#FFFFFF] font-bold transition-all duration-200 cursor-pointer"
                >
                  INQUIRE
                </button>
              </div>
            </div>
          </FadeUp>

          {/* Card 3: BUSINESS SYSTEMS (Narrow bottom card - col-span-5) */}
          <FadeUp delay={0.24} y={24} className="md:col-span-5 flex">
            <div
              style={{ backgroundColor: "#F6F0E2" }}
              className="w-full bg-[#F6F0E2] rounded-3xl border border-[#E5DAC8] p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-[0_4px_20px_rgba(48,15,10,0.03)] hover:shadow-[0_16px_40px_rgba(48,15,10,0.06)] hover:border-[#EA5B15]/30 transition-all duration-300 group"
            >
              <div>
                {/* Visual Representation */}
                <BusinessSystemsVisual />

                {/* Content */}
                <div className="space-y-2 mt-6 sm:mt-8">
                  <h3 className="font-parkinsans text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#300F0A] group-hover:text-[#EA5B15] transition-colors">
                    {p3.title}
                  </h3>
                  <p className="font-artific text-xs sm:text-[13px] md:text-sm text-[#300F0A]/75 leading-relaxed">
                    {p3.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 mt-6 border-t border-[#300F0A]/8 flex items-center justify-between gap-3">
                <Link
                  href={p3.deepLink || "/services/business-systems"}
                  className="inline-flex items-center gap-1.5 font-parkinsans text-xs tracking-[0.16em] uppercase font-bold text-[#EA5B15] hover:text-[#300F0A] transition-colors"
                >
                  <span>{p3.actionLabel || "EXPLORE SYSTEMS"}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <button
                  type="button"
                  onClick={() => openContact({ discipline: "systems" })}
                  className="font-parkinsans text-[11px] uppercase tracking-[0.15em] px-4 py-1.5 rounded-full bg-[#300F0A]/[0.05] text-[#300F0A] hover:bg-[#EA5B15] hover:text-[#FFFFFF] font-bold transition-all duration-200 cursor-pointer"
                >
                  INQUIRE
                </button>
              </div>
            </div>
          </FadeUp>

          {/* Card 4: BRAND & CREATIVE (Wide bottom card - col-span-7) */}
          <FadeUp delay={0.32} y={24} className="md:col-span-7 flex">
            <div
              style={{ backgroundColor: "#F6F0E2" }}
              className="w-full bg-[#F6F0E2] rounded-3xl border border-[#E5DAC8] p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-[0_4px_20px_rgba(48,15,10,0.03)] hover:shadow-[0_16px_40px_rgba(48,15,10,0.06)] hover:border-[#EA5B15]/30 transition-all duration-300 group"
            >
              <div>
                {/* Visual Representation (Receivio Fanned Cards Alignment) */}
                <BrandCreativeVisual />

                {/* Content */}
                <div className="space-y-2 mt-6 sm:mt-8">
                  <h3 className="font-parkinsans text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#300F0A] group-hover:text-[#EA5B15] transition-colors">
                    {p4.title}
                  </h3>
                  <p className="font-artific text-xs sm:text-[13px] md:text-sm text-[#300F0A]/75 leading-relaxed">
                    {p4.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 mt-6 border-t border-[#300F0A]/8 flex items-center justify-between gap-3">
                <Link
                  href={p4.deepLink || "/services/brand-creative"}
                  className="inline-flex items-center gap-1.5 font-parkinsans text-xs tracking-[0.16em] uppercase font-bold text-[#EA5B15] hover:text-[#300F0A] transition-colors"
                >
                  <span>{p4.actionLabel || "EXPLORE BRAND"}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <button
                  type="button"
                  onClick={() => openContact({ discipline: "brand" })}
                  className="font-parkinsans text-[11px] uppercase tracking-[0.15em] px-4 py-1.5 rounded-full bg-[#300F0A]/[0.05] text-[#300F0A] hover:bg-[#EA5B15] hover:text-[#FFFFFF] font-bold transition-all duration-200 cursor-pointer"
                >
                  INQUIRE
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
