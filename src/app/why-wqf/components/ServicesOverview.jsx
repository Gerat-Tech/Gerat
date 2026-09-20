"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SectionLabel from "@/components/common/SectionLabel";
import SplitText from "@/components/motion/SplitText";
import FadeUp from "@/components/motion/FadeUp";
import { useNav } from "@/context/NavContext";
import { servicePillars as defaultPillars } from "@/content";

export default function ServicesOverview({ initialPillars = null }) {
  const { openContact } = useNav();
  const [fetchedPillars, setFetchedPillars] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/services?active=true")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && data.pillars && data.pillars.length > 0) {
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
    fetchedPillars && fetchedPillars.length > 0
      ? fetchedPillars
      : initialPillars && initialPillars.length > 0
      ? initialPillars
      : defaultPillars;

  return (
    <div className="w-full text-white">
      {/* Services Hero */}
      <section className="relative w-full max-w-[1440px] mx-auto pt-32 sm:pt-40 pb-16 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex flex-col gap-6 max-w-4xl">
          <SectionLabel index="01" label="SERVICES" />

          <div className="space-y-1 sm:space-y-2">
            <SplitText
              text="WHAT WE"
              as="h1"
              className="font-artific text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight uppercase leading-[0.92]"
            />
            <SplitText
              text="BUILD."
              as="div"
              wordClassName="text-accent"
              className="font-artific text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight uppercase leading-[0.92]"
            />
          </div>

          <FadeUp delay={0.3} y={16}>
            <p className="font-parkinsans text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
              From the way your business looks to the systems behind how it works, Gerat brings brand, design, software, and intelligent technology together.
            </p>
          </FadeUp>

          <FadeUp delay={0.4} y={16}>
            <button
              type="button"
              onClick={openContact}
              className="inline-flex items-center font-parkinsans text-[11px] uppercase tracking-[0.2em] px-8 py-4 bg-accent text-white font-bold hover:bg-white hover:text-black transition-all rounded-[2px]"
            >
              <span>START A PROJECT</span>
              <span className="ml-2">→</span>
            </button>
          </FadeUp>
        </div>

        <div className="mt-12 pt-4 border-t border-white/10 flex items-center justify-between font-parkinsans text-[10px] tracking-[0.2em] text-white/40 uppercase">
          <span>SERVICES · CORE PILLARS</span>
          <span>EXPLORE WHAT WE BUILD ↓</span>
        </div>
      </section>

      {/* Pillars Deck */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicePillars.map((pillar, idx) => (
            <FadeUp key={pillar.title} delay={0.1 * idx} y={24}>
              <div className="group relative bg-[var(--surface)] border border-white/10 hover:border-accent/60 p-8 sm:p-10 rounded-[4px] flex flex-col justify-between min-h-[360px] transition-all duration-300 h-full">
                <div className="flex items-center justify-between">
                  <span className="font-parkinsans text-[11px] tracking-[0.2em] text-accent font-bold">
                    SERVICE PILLAR
                  </span>
                  <div className="size-2 rounded-[1px] bg-white/20 group-hover:bg-accent transition-colors" />
                </div>

                <div className="flex flex-col gap-3 my-6">
                  <span className="font-parkinsans text-[9px] tracking-[0.2em] text-white/50 uppercase">
                    {pillar.tagline}
                  </span>
                  <h2 className="font-artific text-2xl sm:text-3xl font-bold tracking-tight uppercase text-white group-hover:text-accent transition-colors">
                    {pillar.title}
                  </h2>
                  <p className="font-parkinsans text-xs sm:text-sm text-white/70 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <span className="font-parkinsans text-[9px] tracking-[0.2em] text-white/40 uppercase block mb-3">
                    CORE DELIVERABLES
                  </span>
                  <ul className="space-y-1.5 font-parkinsans text-[10px] tracking-[0.15em] text-white/60">
                    {(pillar.deliverables || []).map((del) => (
                      <li key={del} className="flex items-center gap-2">
                        <span className="text-accent">•</span>
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>

                  {pillar.deepLink && (
                    <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <Link
                        href={
                          pillar.num === "01"
                            ? "/services/digital-experiences"
                            : pillar.num === "02"
                            ? "/services/ai-tools"
                            : pillar.num === "03"
                            ? "/services/business-systems"
                            : pillar.num === "04"
                            ? "/services/brand-creative"
                            : pillar.deepLink
                        }
                        className="inline-flex items-center gap-1.5 font-parkinsans text-[10px] tracking-[0.2em] uppercase text-accent hover:text-white font-bold transition-colors"
                      >
                        <span>
                          {pillar.num === "01" && "EXPLORE DIGITAL →"}
                          {pillar.num === "02" && "EXPLORE AI & TOOLS →"}
                          {pillar.num === "03" && "EXPLORE BUSINESS SYSTEMS →"}
                          {pillar.num === "04" && "EXPLORE BRAND & CREATIVE →"}
                        </span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          const presetMap = {
                            "01": { discipline: "digital", subOption: "Website" },
                            "02": { discipline: "intelligence", subOption: "AI Assistant" },
                            "03": { discipline: "systems", subOption: "Custom ERP" },
                            "04": { discipline: "brand", subOption: "LOGO & BRAND IDENTITY" },
                          };
                          openContact(presetMap[pillar.num] || { discipline: "digital" });
                        }}
                        className="font-parkinsans text-[9px] tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors"
                      >
                        START PROJECT →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </div>
  );
}
