"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SectionLabel from "@/components/common/SectionLabel";
import SplitText from "@/components/motion/SplitText";
import FadeUp from "@/components/motion/FadeUp";
import { useNav } from "@/context/NavContext";
import { servicePillars as defaultPillars, approachSteps, serviceFaqs } from "@/content/services";

/**
 * V2 Services Overview
 *
 * Implements full V2 Services Page Spec:
 * 1. Hero: "TECHNOLOGY BUILT AROUND YOUR BUSINESS."
 * 2. 4 Core Service Pillars with exact V2 capabilities & outcomes
 * 3. "How We Select the Right Approach" sequence
 * 4. Concise FAQ section
 * 5. Closing project inquiry CTA
 */
export default function ServicesOverview({ initialPillars = null }) {
  const { openContact } = useNav();
  const [fetchedPillars, setFetchedPillars] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

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

            return {
              ...p,
              deliverables: dels,
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

  const servicePillars =
    fetchedPillars !== null && fetchedPillars.length > 0
      ? fetchedPillars
      : initialPillars !== null && initialPillars.length > 0
      ? initialPillars
      : defaultPillars;

  return (
    <div className="w-full text-white">
      {/* 01. Services Hero */}
      <section
        aria-label="Services Hero"
        className="relative w-full max-w-[1440px] mx-auto pt-36 sm:pt-44 md:pt-48 pb-20 sm:pb-28 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/10 overflow-hidden"
      >
        <div className="flex flex-col gap-6 max-w-4xl">
          <SectionLabel label="WHAT WE BUILD" />

          <div className="space-y-2">
            <SplitText
              text="TECHNOLOGY BUILT"
              as="h1"
              delay={0.1}
              stagger={0.035}
              className="font-parkinsans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight uppercase leading-[0.94] text-white"
            />
            <SplitText
              text="AROUND YOUR BUSINESS."
              as="div"
              delay={0.25}
              stagger={0.035}
              wordClassName="text-accent"
              className="font-parkinsans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight uppercase leading-[0.94]"
            />
          </div>

          <FadeUp delay={0.35} y={16}>
            <p className="font-artific text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed">
              From digital experiences to AI, business systems, and brand identity, we bring the right capabilities together around the problem you need to solve.
            </p>
          </FadeUp>

          <FadeUp delay={0.45} y={16}>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => openContact({ discipline: "general", subOption: "SERVICES" })}
                className="group inline-flex items-center gap-3 font-parkinsans text-xs sm:text-sm uppercase tracking-[0.2em] px-8 py-4 bg-accent text-white font-bold hover:bg-accent/90 transition-all duration-300 rounded-[2px] cursor-pointer shadow-lg"
              >
                <span>START A PROJECT</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </FadeUp>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex items-center justify-between font-parkinsans text-xs tracking-[0.2em] text-white/40 uppercase">
          <span>WHAT WE BUILD · 4 CORE DISCIPLINES</span>
          <span>EXPLORE SERVICES ↓</span>
        </div>
      </section>

      {/* 02. The 4 Service Pillars */}
      <section
        id="offerings"
        aria-label="Core Services"
        className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-24 sm:py-32 border-b border-white/10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {servicePillars.map((pillar, idx) => (
            <FadeUp key={pillar.num || idx} delay={0.1 * idx} y={20}>
              <div className="group relative bg-[#180a07] border border-white/10 hover:border-accent/60 p-8 sm:p-10 md:p-12 rounded-[4px] flex flex-col justify-between min-h-[460px] transition-all duration-300 h-full shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
                {/* Header: Service Number & Tagline */}
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <span className="font-parkinsans text-xs font-bold tracking-[0.25em] text-accent uppercase">
                      SERVICE {pillar.num || `0${idx + 1}`}
                    </span>
                    <span className="font-artific text-xs text-white/50 uppercase tracking-wider">
                      {pillar.tagline}
                    </span>
                  </div>

                  {/* Title & Core Proposition */}
                  <div className="py-6 space-y-3">
                    <h2 className="font-parkinsans text-2xl sm:text-3xl font-semibold tracking-tight uppercase text-white group-hover:text-accent transition-colors">
                      {pillar.title}
                    </h2>
                    {pillar.headline && (
                      <p className="font-parkinsans text-sm sm:text-base font-medium text-white/90 uppercase tracking-tight">
                        {pillar.headline}
                      </p>
                    )}
                    <p className="font-artific text-sm sm:text-base text-white/70 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Capabilities List */}
                  <div className="pt-4 border-t border-white/10">
                    <span className="font-parkinsans text-[11px] tracking-[0.2em] text-white/40 uppercase block mb-3 font-semibold">
                      CAPABILITIES
                    </span>
                    <ul className="space-y-2 font-artific text-xs sm:text-sm text-white/60">
                      {(pillar.deliverables || []).map((del) => (
                        <li key={del} className="flex items-center gap-2 group-hover:text-white/80 transition-colors">
                          <span className="size-1 rounded-full bg-accent/80" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Outcome Statement & Deep Link */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  {pillar.outcome && (
                    <p className="font-artific text-xs text-white/50 italic mb-6">
                      “{pillar.outcome}”
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <Link
                      href={pillar.deepLink || "/services"}
                      className="group/link inline-flex items-center gap-2 font-parkinsans text-xs uppercase tracking-[0.2em] text-white/80 hover:text-accent transition-colors"
                    >
                      <span>EXPLORE SERVICE</span>
                      <span className="text-accent transition-transform duration-300 group-hover/link:translate-x-1">
                        →
                      </span>
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        openContact({
                          discipline:
                            pillar.num === "01"
                              ? "digital"
                              : pillar.num === "02"
                              ? "ai"
                              : pillar.num === "03"
                              ? "systems"
                              : "creative",
                          subOption: pillar.title,
                        })
                      }
                      className="font-parkinsans text-[11px] uppercase tracking-[0.15em] text-accent/80 hover:text-accent transition-colors"
                    >
                      INQUIRE
                    </button>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* 03. How We Select the Right Approach */}
      <section
        aria-label="Approach Selection"
        className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-24 sm:py-32 border-b border-white/10"
      >
        <div className="flex flex-col gap-6 max-w-3xl mb-16 sm:mb-20 pb-8 border-b border-white/10">
          <SectionLabel index="02" label="OUR APPROACH" />
          <div className="space-y-2">
            <SplitText
              text="NOT EVERY BUSINESS"
              as="h2"
              delay={0.1}
              stagger={0.035}
              className="font-parkinsans text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight uppercase leading-[0.96] text-white"
            />
            <SplitText
              text="NEEDS EVERYTHING."
              as="div"
              delay={0.25}
              stagger={0.035}
              wordClassName="text-accent"
              className="font-parkinsans text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight uppercase leading-[0.96]"
            />
          </div>
          <FadeUp delay={0.35} y={16}>
            <p className="font-artific text-base sm:text-lg text-white/80 leading-relaxed mt-2">
              We do not force a fixed package. We start with the problem, then combine the capabilities that actually fit the business.
            </p>
          </FadeUp>
        </div>

        {/* 4-Step Approach Sequence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {approachSteps.map((step, idx) => (
            <FadeUp key={step.num} delay={0.1 + idx * 0.08} y={20}>
              <div className="flex flex-col justify-between h-full p-8 rounded-[4px] border border-white/10 bg-[#170a07] hover:border-accent/50 transition-all duration-300 group">
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <span className="font-parkinsans text-xs font-bold tracking-[0.25em] text-accent uppercase">
                    PHASE {step.num}
                  </span>
                  <span className="size-1.5 rounded-full bg-white/20 group-hover:bg-accent transition-colors" />
                </div>

                <div className="pt-6 space-y-3">
                  <h3 className="font-parkinsans text-2xl font-semibold uppercase tracking-tight text-white group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <div className="font-artific text-xs font-medium text-accent uppercase tracking-wider">
                    {step.question}
                  </div>
                  <p className="font-artific text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                    {step.desc}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* 04. Concise FAQ Section */}
      <section
        aria-label="Frequently Asked Questions"
        className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-24 sm:py-32 border-b border-white/10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <SectionLabel index="03" label="FAQ" />
            <h2 className="font-parkinsans text-3xl sm:text-5xl font-semibold tracking-tight uppercase leading-[0.96] text-white">
              COMMON <span className="text-accent">QUESTIONS.</span>
            </h2>
            <p className="font-artific text-base text-white/70 leading-relaxed max-w-md">
              Clear answers on how we engage, our scope, and how we support what we build after launch.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            {serviceFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-[4px] border border-white/10 bg-[#160906] overflow-hidden transition-colors duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 font-parkinsans text-base sm:text-lg font-semibold uppercase tracking-tight text-white hover:text-accent transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="text-accent text-xl font-mono shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 sm:px-7 pb-6 pt-2 border-t border-white/5">
                      <p className="font-artific text-sm sm:text-base text-white/80 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 05. Closing CTA */}
      <section
        aria-label="Closing Project CTA"
        className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-24 sm:py-32 text-center flex flex-col items-center"
      >
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-accent/15 border border-accent/30 text-accent font-artific text-xs uppercase tracking-[0.25em] mb-4">
            <span>GET IN TOUCH</span>
          </div>

          <h2 className="font-parkinsans text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight uppercase leading-[0.94] text-white">
            TELL US WHAT YOU ARE <span className="text-accent">BUILDING.</span>
          </h2>

          <p className="font-artific text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed pt-2 pb-8">
            Have a business problem, digital idea, or system that needs work? Start the conversation.
          </p>

          <div>
            <button
              type="button"
              onClick={() => openContact({ discipline: "general", subOption: "SERVICES_CTA" })}
              className="group inline-flex items-center gap-3 font-parkinsans text-xs sm:text-sm uppercase tracking-[0.2em] px-10 py-5 bg-accent text-white font-bold hover:bg-accent/90 transition-all duration-300 rounded-[2px] cursor-pointer shadow-[0_12px_40px_rgba(234,91,21,0.35)]"
            >
              <span>START A PROJECT</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
