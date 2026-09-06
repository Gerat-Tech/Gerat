"use client";

import React, { useState } from "react";
import Link from "next/link";
import SectionLabel from "@/components/common/SectionLabel";
import FadeUp from "@/components/motion/FadeUp";
import SplitText from "@/components/motion/SplitText";
import Footer from "@/components/layout/Footer";
import { useNav } from "@/context/NavContext";
import { brandCreativeFamily, creativeServicePackages } from "@/content";
import { ArrowRight, CheckCircle2, ShieldCheck, FileCheck, Layers, Sparkles } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "Why is a logo not a brand?",
    a: "A logo is a single visual symbol. A brand identity is the complete operational system around it — including color theory, typographic hierarchy, graphic layout rules, tone of voice, and physical/digital application guidelines that build cumulative trust over time.",
  },
  {
    q: "Do we receive full source files and intellectual property ownership?",
    a: "Yes. Upon project completion and final milestone clearance, all bespoke vector assets (SVG, EPS, Adobe Illustrator / Figma source packages) and full commercial usage rights are permanently transferred to your company.",
  },
  {
    q: "How does brand design connect to web and software development?",
    a: "At Gerat, brand architects work directly alongside our frontend and software engineers. Design tokens, color spaces, and component geometries translate directly into Tailwind/CSS variables and production React components without translation loss.",
  },
  {
    q: "What is the typical timeline for an identity engagement?",
    a: "A foundational Logo & Brand Identity engagement typically spans 3 to 6 weeks, structured through iterative milestone sprints: Architectural Discovery, Conceptual Directions, System Refinement, and Final Production Asset Handoff.",
  },
];

export default function BrandCreativePage() {
  const { openContact } = useNav();
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-accent selection:text-black">
      {/* Hero Section */}
      <section className="relative w-full max-w-[1440px] mx-auto pt-36 sm:pt-44 pb-20 px-4 sm:px-6 md:px-8 lg:px-10 border-b border-white/10">
        <div className="flex flex-col gap-6 max-w-4xl">
          <SectionLabel index="04" label="BRAND & CREATIVE ARCHITECTURE" />

          <div className="space-y-2">
            <SplitText
              text="MAKE THE RIGHT"
              as="h1"
              className="font-roc text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight uppercase leading-[0.92]"
            />
            <SplitText
              text="FIRST IMPRESSION."
              as="div"
              className="font-roc text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight uppercase leading-[0.92]"
            />
            <SplitText
              text="THEN MAKE IT EVERYWHERE."
              as="div"
              wordClassName="text-accent"
              className="font-roc text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight uppercase leading-[0.92]"
            />
          </div>

          <FadeUp delay={0.3} y={16}>
            <p className="font-roc text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
              We engineer monolithic visual identities, precision vector logo systems, and editorial graphic
              architectures that make businesses, products, and leaders recognizable, credible, and consistent
              across every medium they touch.
            </p>
          </FadeUp>

          <FadeUp delay={0.4} y={16}>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={openContact}
                className="inline-flex items-center font-azeret text-[11px] uppercase tracking-[0.2em] px-8 py-4 bg-accent text-white font-bold hover:bg-white hover:text-black transition-all rounded-[2px]"
              >
                <span>INITIATE BRAND ENGAGEMENT</span>
                <span className="ml-2">→</span>
              </button>

              <Link
                href="/portfolio"
                className="inline-flex items-center font-azeret text-[11px] uppercase tracking-[0.2em] px-8 py-4 border border-white/20 bg-transparent text-white hover:border-white transition-all rounded-[2px]"
              >
                <span>VIEW CASE STUDIES</span>
              </Link>
            </div>
          </FadeUp>
        </div>

        <div className="mt-16 pt-4 border-t border-white/10 flex items-center justify-between font-azeret text-[10px] tracking-[0.2em] text-white/40 uppercase">
          <span>DISCIPLINES // 06 CREATIVE PRACTICES</span>
          <span>FROM IDENTITY TO INFRASTRUCTURE ↓</span>
        </div>
      </section>

      {/* 6 Core Disciplines Section */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-24 sm:py-32 border-b border-white/10">
        <div className="flex flex-col gap-4 mb-16">
          <span className="font-azeret text-[10px] tracking-[0.25em] text-accent uppercase">
            DISCIPLINE CATALOG
          </span>
          <h2 className="font-roc text-3xl sm:text-5xl font-medium tracking-tight uppercase">
            THE CREATIVE SERVICE FAMILY.
          </h2>
          <p className="font-roc text-sm sm:text-base text-white/60 max-w-2xl">
            Modular, high-precision design capabilities engineered to function as the front-end of product development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brandCreativeFamily.map((item, idx) => (
            <FadeUp key={item.id} delay={0.08 * idx} y={24}>
              <div className="group relative bg-[#0d0d0d] border border-white/10 hover:border-accent/80 p-8 rounded-[2px] flex flex-col justify-between min-h-[420px] transition-all duration-300 h-full">
                {/* Precision Corner Accents */}
                <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30 group-hover:border-accent transition-colors" />
                <span className="absolute top-0 right-0 size-2 border-t border-r border-white/30 group-hover:border-accent transition-colors" />
                <span className="absolute bottom-0 left-0 size-2 border-b border-l border-white/30 group-hover:border-accent transition-colors" />
                <span className="absolute bottom-0 right-0 size-2 border-b border-r border-white/30 group-hover:border-accent transition-colors" />

                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="font-azeret text-[10px] tracking-[0.2em] text-accent font-bold">
                      DISCIPLINE // {item.num}
                    </span>
                    <span className="font-azeret text-[9px] tracking-[0.2em] text-white/30 uppercase">
                      SPEC 2026
                    </span>
                  </div>

                  <h3 className="font-roc text-2xl font-medium tracking-tight uppercase text-white mt-5 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-roc text-xs sm:text-sm text-white/70 leading-relaxed mt-2">
                    {item.longDesc}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6">
                  <span className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase block mb-3">
                    CORE DELIVERABLES
                  </span>
                  <ul className="space-y-1.5 font-azeret text-[10px] tracking-[0.1em] text-white/60">
                    {item.deliverables.map((del) => (
                      <li key={del} className="flex items-center gap-2">
                        <span className="text-accent">•</span>
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={openContact}
                      className="font-azeret text-[10px] tracking-[0.2em] text-accent hover:text-white uppercase transition-colors"
                    >
                      {item.cta} →
                    </button>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Production Packages Section */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-24 sm:py-32 border-b border-white/10">
        <div className="flex flex-col gap-4 mb-16">
          <span className="font-azeret text-[10px] tracking-[0.25em] text-accent uppercase">
            STRUCTURED ENGAGEMENTS
          </span>
          <h2 className="font-roc text-3xl sm:text-5xl font-medium tracking-tight uppercase">
            INTEGRATED SERVICE PACKAGES.
          </h2>
          <p className="font-roc text-sm sm:text-base text-white/60 max-w-2xl">
            Targeted delivery frameworks connecting identity directly to digital execution and production deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creativeServicePackages.map((pkg, idx) => (
            <FadeUp key={pkg.id} delay={0.1 * idx} y={20}>
              <div className="relative bg-[#0c0c0c] border border-white/10 p-6 rounded-[2px] flex flex-col justify-between h-full hover:border-white/30 transition-colors">
                <div>
                  <span className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase font-bold">
                    {pkg.tagline}
                  </span>
                  <h3 className="font-roc text-xl font-medium tracking-tight uppercase text-white mt-1">
                    {pkg.name}
                  </h3>
                  <p className="font-roc text-xs text-white/60 mt-3 leading-relaxed">
                    {pkg.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6">
                  <span className="font-azeret text-[8px] tracking-[0.2em] text-white/40 uppercase block mb-3">
                    PACKAGE INCLUSIONS
                  </span>
                  <ul className="space-y-1.5 font-azeret text-[9px] tracking-[0.05em] text-white/70">
                    {pkg.included.map((inc) => (
                      <li key={inc} className="flex items-center gap-1.5">
                        <CheckCircle2 className="size-3 text-accent shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={openContact}
                    className="w-full mt-6 py-2.5 bg-white/5 border border-white/10 font-azeret text-[9px] tracking-[0.2em] uppercase text-white hover:bg-accent hover:text-black hover:border-accent transition-all rounded-[2px]"
                  >
                    SELECT PACKAGE
                  </button>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Production Deliverables & File Formats Matrix */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-24 sm:py-32 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <SectionLabel index="05" label="PRODUCTION STANDARDS" />
            <h2 className="font-roc text-3xl sm:text-5xl font-medium tracking-tight uppercase leading-[1.05]">
              ZERO AMBIGUITY. <br />
              <span className="text-accent">PRODUCTION-READY HANDOFF.</span>
            </h2>
            <p className="font-roc text-sm sm:text-base text-white/70 leading-relaxed">
              We do not deliver isolated images. Every brand identity engagement concludes with a comprehensive,
              operationally structured asset repository configured for seamless cross-agency and in-house deployment.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 font-azeret text-[10px]">
            <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-[2px] flex flex-col gap-3">
              <FileCheck className="size-5 text-accent" />
              <span className="tracking-[0.2em] text-white font-bold uppercase">VECTOR MASTER ASSETS</span>
              <p className="text-white/60 leading-relaxed font-roc text-xs">
                Resolution-independent SVG, EPS, and native AI source files for billboards, vehicle wraps, and precision screens.
              </p>
            </div>

            <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-[2px] flex flex-col gap-3">
              <Layers className="size-5 text-accent" />
              <span className="tracking-[0.2em] text-white font-bold uppercase">DESIGN TOKEN LIBRARIES</span>
              <p className="text-white/60 leading-relaxed font-roc text-xs">
                CSS variables, hex/RGB color swatches, and typography token configurations compatible with modern web frameworks.
              </p>
            </div>

            <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-[2px] flex flex-col gap-3">
              <Sparkles className="size-5 text-accent" />
              <span className="tracking-[0.2em] text-white font-bold uppercase">DIGITAL APPLICATION KITS</span>
              <p className="text-white/60 leading-relaxed font-roc text-xs">
                Favicons, mobile app icons, high-converting social media templates, and responsive email signatures.
              </p>
            </div>

            <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-[2px] flex flex-col gap-3">
              <ShieldCheck className="size-5 text-accent" />
              <span className="tracking-[0.2em] text-white font-bold uppercase">BRAND GUIDELINES BIBLE</span>
              <p className="text-white/60 leading-relaxed font-roc text-xs">
                Strict layout geometries, clear space rules, typography hierarchies, and do/don&apos;t compliance instructions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div className="text-center flex flex-col items-center gap-3">
            <span className="font-azeret text-[10px] tracking-[0.25em] text-accent uppercase">
              OPERATIONAL CLARITY
            </span>
            <h2 className="font-roc text-3xl sm:text-5xl font-medium tracking-tight uppercase">
              FREQUENTLY ASKED QUESTIONS.
            </h2>
          </div>

          <div className="space-y-4 pt-6">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="border border-white/10 bg-[#0a0a0a] p-6 rounded-[2px] transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-roc text-lg font-medium uppercase text-white hover:text-accent transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="font-azeret text-xs text-accent ml-4">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="font-roc text-sm text-white/70 leading-relaxed mt-4 pt-4 border-t border-white/10">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Master Footer */}
      <Footer />
    </div>
  );
}
