"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
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
 * Section 02: THE BRIDGE ("WHAT GERAT BUILDS") — Receivio Convex Morph Alignment
 *
 * Implements:
 * - Dynamic scroll-morphing convex dome top edge that straightens out upon scroll
 * - High-contrast typography: titles are 100% visible in light and dark modes
 * - Expansive, relaxed vertical spacing (longer & easy for eyes)
 * - Soft rounded scroll-stack cards with generous breathing room
 * - Flame Orange accents throughout
 */
export default function OurFocus({ initialPillars = null }) {
  const { openContact } = useNav();
  const [fetchedPillars, setFetchedPillars] = useState(null);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start 25%"],
  });

  // Dynamic curve height: morphs from 90px convex dome down to 0px (straight)
  const curveHeight = useTransform(scrollYProgress, [0, 0.85], [90, 0]);

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
      ref={containerRef}
      id="services"
      aria-label="What We Build"
      className="w-full px-4 sm:px-6 md:px-8 lg:px-12 my-20 sm:my-32 md:my-40 scroll-mt-24"
    >
      <span id="capabilities" className="sr-only" />

      {/* Dynamic Scroll-Morphing Convex Dome Curve (Receivio Model) */}
      <div className="w-full max-w-[1360px] mx-auto overflow-hidden">
        <motion.div
          style={{ height: curveHeight }}
          className="w-full overflow-hidden shrink-0 pointer-events-none -mb-1"
        >
          <svg
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            className="w-full h-full fill-[var(--surface)] text-[var(--surface)]"
          >
            <path d="M 0 90 Q 720 0 1440 90 L 1440 90 L 0 90 Z" />
          </svg>
        </motion.div>
      </div>

      <div className="w-full max-w-[1360px] mx-auto bg-[var(--surface)] text-[var(--text-primary)] p-10 sm:p-16 md:p-22 rounded-b-[36px] sm:rounded-b-[48px] border-x border-b border-[var(--border-subtle)] shadow-[0_24px_64px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Section Header */}
        <div className="flex flex-col gap-5 mb-16 sm:mb-22 max-w-3xl">
          <SectionLabel index="02" label="THE BRIDGE" />
          <div className="space-y-2">
            <SplitText
              text="FROM BUSINESS NEED"
              as="h2"
              delay={0.1}
              stagger={0.035}
              className="font-parkinsans text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight uppercase leading-[0.96] text-[var(--text-primary)]"
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
            <p className="font-artific text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              We bring design, engineering, AI, and business thinking together around the problem that needs solving.
            </p>
          </FadeUp>
        </div>

        {/* Sticky Scroll-Stack Cards Container (Longer & Easy for Eyes) */}
        <div className="flex flex-col gap-10 sm:gap-14 relative pb-12">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.num || idx}
              style={{ top: `calc(96px + ${idx * 24}px)` }}
              className="sticky transition-all duration-300 rounded-3xl sm:rounded-[32px] border border-[var(--border-medium)] bg-[var(--surface-2)] shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-10 sm:p-14 md:p-16 min-h-[380px] sm:min-h-[440px] flex flex-col justify-between hover:border-accent/60 group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
                {/* Left Column: Number, Title, Description */}
                <div className="flex flex-col gap-5 max-w-xl">
                  <div className="flex items-center gap-3">
                    <span className="font-parkinsans text-xs sm:text-sm font-bold tracking-[0.25em] text-accent uppercase">
                      SERVICE {pillar.num || `0${idx + 1}`}
                    </span>
                    <span className="text-[var(--text-dim)]">/</span>
                    <span className="font-parkinsans text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
                      04
                    </span>
                  </div>

                  {/* High-Contrast Headline */}
                  <h3 className="font-parkinsans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-tight text-[var(--text-primary)] group-hover:text-accent transition-colors leading-[1.06]">
                    {pillar.title}
                  </h3>

                  <p className="font-artific text-base sm:text-lg text-[var(--text-secondary)] leading-[1.8] pt-1">
                    {pillar.desc}
                  </p>
                </div>

                {/* Right Column: Deliverables & CTA */}
                <div className="flex flex-col justify-between gap-8 md:min-w-[300px] lg:min-w-[360px] pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-[var(--border-subtle)] md:pl-10">
                  <div>
                    <span className="font-parkinsans text-xs tracking-[0.2em] text-[var(--text-muted)] uppercase block mb-4 font-semibold">
                      KEY DELIVERABLES
                    </span>
                    <ul className="space-y-3.5">
                      {(pillar.deliverables || []).map((item) => (
                        <li
                          key={item}
                          className="font-parkinsans text-xs sm:text-sm tracking-[0.08em] text-[var(--text-primary)] flex items-center gap-3"
                        >
                          <span className="size-2 rounded-full bg-accent shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-6 border-t border-[var(--border-subtle)]">
                    <Link
                      href={pillar.deepLink || "/services"}
                      className="inline-flex items-center gap-2 font-parkinsans text-xs sm:text-sm tracking-[0.2em] uppercase font-bold text-accent hover:text-[var(--text-primary)] transition-colors"
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
                      className="font-parkinsans text-xs uppercase tracking-[0.18em] px-5 py-2.5 rounded-full bg-accent/15 text-accent hover:bg-accent hover:text-white font-bold transition-all duration-200 cursor-pointer"
                    >
                      INQUIRE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
