"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SectionLabel from "../common/SectionLabel";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";
import { useNav } from "@/context/NavContext";

const V2_DEFAULT_PILLARS = [
  {
    num: "01",
    title: "DIGITAL EXPERIENCES",
    desc: "Websites, web applications, portals, and digital products that make your business easier to discover, understand, and use.",
    deliverables: ["Websites", "Web applications", "Customer portals", "Digital products"],
    deepLink: "/services/digital-experiences",
    actionLabel: "EXPLORE DIGITAL",
  },
  {
    num: "02",
    title: "AI & INTELLIGENT TOOLS",
    desc: "Practical AI for finding information, automating work, understanding documents, and turning existing knowledge into useful tools.",
    deliverables: ["AI assistants", "RAG & knowledge systems", "Workflow automation", "Document intelligence"],
    deepLink: "/services/ai-tools",
    actionLabel: "EXPLORE AI & TOOLS",
  },
  {
    num: "03",
    title: "BUSINESS SYSTEMS",
    desc: "Connected software for the work behind the business — operations, workflows, inventory, billing, and integrations.",
    deliverables: ["ERP & operational platforms", "Internal tools", "Workflow systems", "API & system integrations"],
    deepLink: "/services/business-systems",
    actionLabel: "EXPLORE SYSTEMS",
  },
  {
    num: "04",
    title: "BRAND & CREATIVE",
    desc: "Clear brand systems that make a business recognizable, credible, and consistent across digital and physical touchpoints.",
    deliverables: ["Brand strategy", "Logo & visual identity", "Marketing design", "Founder & personal branding"],
    deepLink: "/services/brand-creative",
    actionLabel: "EXPLORE BRAND",
  },
];

/**
 * Section 03: THE BRIDGE ("WHAT GERAT BUILDS") — V2 Sticky Scroll-Stack Cards
 * Presents the 4 core service pillars one by one as the user scrolls,
 * creating a focused, story-like experience.
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

            return {
              ...p,
              num: p.num || "01",
              title: p.title,
              desc: p.desc || p.tagline,
              deliverables: dels.length > 0 ? dels : (V2_DEFAULT_PILLARS.find(v => v.num === p.num)?.deliverables || []),
              deepLink: p.deepLink || (
                p.num === "01" ? "/services/digital-experiences" :
                p.num === "02" ? "/services/ai-tools" :
                p.num === "03" ? "/services/business-systems" :
                "/services/brand-creative"
              ),
              actionLabel: (
                p.num === "01" ? "EXPLORE DIGITAL" :
                p.num === "02" ? "EXPLORE AI & TOOLS" :
                p.num === "03" ? "EXPLORE SYSTEMS" :
                "EXPLORE BRAND"
              ),
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

  return (
    <section
      id="services"
      aria-label="What We Build"
      className="relative w-full bg-[var(--bg)] text-white py-24 sm:py-32 md:py-36 border-b border-white/10 scroll-mt-20 overflow-hidden"
    >
      <span id="capabilities" className="sr-only" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16 sm:mb-20 max-w-3xl">
          <SectionLabel index="03" label="THE BRIDGE" />
          <div className="space-y-2">
            <SplitText
              text="FROM BUSINESS NEED"
              as="h2"
              delay={0.1}
              stagger={0.035}
              className="font-parkinsans text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight uppercase leading-[0.96]"
            />
            <SplitText
              text="TO WORKING SYSTEM."
              as="div"
              delay={0.25}
              stagger={0.035}
              wordClassName="text-accent"
              className="font-parkinsans text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight uppercase leading-[0.96]"
            />
          </div>
          <FadeUp delay={0.35} y={16}>
            <p className="font-artific text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
              We bring design, engineering, AI, and business thinking together around the problem that needs solving.
            </p>
          </FadeUp>
        </div>

        {/* Sticky Scroll-Stack Cards Container */}
        <div className="flex flex-col gap-8 sm:gap-12 relative pb-12">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.num || idx}
              style={{ top: `calc(88px + ${idx * 24}px)` }}
              className="sticky transition-all duration-300 rounded-[4px] border border-white/15 bg-[#1f1310] shadow-[0_16px_40px_rgba(0,0,0,0.6)] p-8 sm:p-12 md:p-14 hover:border-accent/60 group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                {/* Left Column: Number, Title, Description */}
                <div className="flex flex-col gap-4 max-w-xl">
                  <div className="flex items-center gap-3">
                    <span className="font-parkinsans text-xs sm:text-sm font-bold tracking-[0.25em] text-accent uppercase">
                      SERVICE {pillar.num || `0${idx + 1}`}
                    </span>
                    <span className="text-white/20">/</span>
                    <span className="font-parkinsans text-[10px] tracking-[0.2em] text-white/40 uppercase">
                      04
                    </span>
                  </div>

                  <h3 className="font-parkinsans text-2xl sm:text-4xl font-semibold uppercase tracking-tight text-white group-hover:text-accent transition-colors leading-[1.05]">
                    {pillar.title}
                  </h3>

                  <p className="font-artific text-sm sm:text-base text-white/75 leading-relaxed pt-1">
                    {pillar.desc}
                  </p>
                </div>

                {/* Right Column: Deliverables & CTA */}
                <div className="flex flex-col justify-between gap-6 md:min-w-[280px] lg:min-w-[340px] pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-8">
                  <div>
                    <span className="font-parkinsans text-[9px] tracking-[0.2em] text-white/40 uppercase block mb-3">
                      KEY DELIVERABLES
                    </span>
                    <ul className="space-y-2">
                      {(pillar.deliverables || []).map((item) => (
                        <li
                          key={item}
                          className="font-parkinsans text-[11px] sm:text-[12px] tracking-[0.1em] text-white/70 flex items-center gap-2.5"
                        >
                          <span className="size-1.5 rounded-full bg-accent/80 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <Link
                      href={pillar.deepLink || "/services"}
                      className="inline-flex items-center gap-1.5 font-parkinsans text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-bold text-accent hover:text-white transition-colors"
                    >
                      <span>{pillar.actionLabel || "LEARN MORE"}</span>
                      <span>→</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        const presetMap = {
                          "01": { discipline: "digital" },
                          "02": { discipline: "intelligence" },
                          "03": { discipline: "systems" },
                          "04": { discipline: "brand" },
                        };
                        openContact(presetMap[pillar.num] || { discipline: "digital" });
                      }}
                      className="font-parkinsans text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors cursor-pointer"
                    >
                      INQUIRE →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Hub CTA */}
        <FadeUp delay={0.2} y={20}>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="font-artific text-xs sm:text-sm text-white/50 max-w-md text-center sm:text-left">
              Need a combination of digital experiences, intelligence, and brand systems? We design tailored architectures.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/services"
                className="inline-flex items-center font-parkinsans text-[11px] uppercase tracking-[0.2em] px-7 py-3.5 bg-white/5 hover:bg-white hover:text-black border border-white/20 hover:border-white text-white font-bold transition-all rounded-[2px]"
              >
                <span>VIEW ALL SERVICES</span>
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
