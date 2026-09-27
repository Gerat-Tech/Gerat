"use client";

import React, { useState, useEffect, useRef } from "react";
import SectionLabel from "../common/SectionLabel";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";
import { useNav } from "@/context/NavContext";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "UNDERSTAND",
    description:
      "We learn how the business works, where the friction is, and what the technology needs to achieve.",
    tagline: "Problem discovery & business alignment",
  },
  {
    number: "02",
    title: "DEFINE",
    description:
      "We turn the problem into a clear scope, user experience, technical direction, and delivery plan.",
    tagline: "Architecture, scoping & UX direction",
  },
  {
    number: "03",
    title: "BUILD",
    description:
      "We design and engineer the product, system, or brand with the right level of technology for the job.",
    tagline: "Engineering, system design & execution",
  },
  {
    number: "04",
    title: "SUPPORT",
    description:
      "We help with launch, handover, improvements, and the next stage of the system.",
    tagline: "Telemetry, handover & sustained scale",
  },
];

/**
 * Section 04: THE PROCESS ("HOW WE WORK") — Receivio Floating Container Alignment
 *
 * Eliminates muddy brown tones in favor of the official brand palette:
 * - Floating container card on warm canvas (rounded-[32px])
 * - Soft rounded step cards (rounded-2xl)
 * - Vibrant Flame Orange (#EA5B15) active phase indicators and progress bar
 * - Pill CTA buttons (rounded-full)
 */
export default function HowWeWork() {
  const { openContact } = useNav();
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight * 0.45;
      stepRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          setActiveStep(idx);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="process"
      aria-label="How We Work"
      className="w-full px-4 sm:px-6 md:px-8 lg:px-12 my-12 sm:my-20 md:my-24 scroll-mt-24"
    >
      <div className="w-full max-w-[1360px] mx-auto bg-[var(--surface)] text-[var(--text-primary)] p-8 sm:p-14 md:p-18 rounded-[32px] border border-[var(--border-subtle)] shadow-[0_24px_64px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: Sticky Narrative & Step Progress Indicator */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col items-start gap-6 sm:gap-8 pt-2">
            <SectionLabel index="03" label="THE PROCESS" />

            <div className="w-full space-y-2">
              <SplitText
                text="START WITH THE PROBLEM."
                as="h2"
                delay={0.1}
                stagger={0.035}
                className="font-parkinsans text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight uppercase leading-[0.98] text-[var(--text-primary)]"
              />
              <SplitText
                text="BUILD THE RIGHT THING."
                as="div"
                delay={0.25}
                stagger={0.035}
                wordClassName="text-accent"
                className="font-parkinsans text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight uppercase leading-[0.98]"
              />
            </div>

            <FadeUp delay={0.3} y={16}>
              <p className="font-artific text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-md">
                We keep the process clear: understand the business, shape the solution, build it well, then stay close after launch.
              </p>
            </FadeUp>

            {/* Step Progress Tracker */}
            <div className="w-full max-w-sm pt-4 hidden sm:flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-parkinsans font-bold text-[var(--text-muted)] uppercase tracking-[0.2em]">
                <span>Phase Progress</span>
                <span className="text-accent">
                  {PROCESS_STEPS[activeStep].number} / 04
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {PROCESS_STEPS.map((step, idx) => (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => {
                      stepRefs.current[idx]?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }}
                    className={`h-2 rounded-full transition-all duration-300 text-left ${
                      idx === activeStep
                        ? "bg-accent shadow-[0_0_12px_rgba(234,91,21,0.6)]"
                        : idx < activeStep
                        ? "bg-accent/40"
                        : "bg-[var(--border-strong)] hover:bg-[var(--text-muted)]"
                    }`}
                    aria-label={`Jump to step ${step.number}: ${step.title}`}
                  />
                ))}
              </div>
            </div>

            {/* Primary Action Button */}
            <FadeUp delay={0.4} y={16}>
              <button
                type="button"
                onClick={() => openContact({ discipline: "general", subOption: "PROCESS" })}
                className="group relative isolate inline-flex items-center gap-3 font-parkinsans text-xs uppercase tracking-[0.2em] px-8 py-3.5 bg-accent hover:bg-white hover:text-[#300F0A] text-white font-bold rounded-full shadow-md hover:shadow-accent/25 transition-all duration-300 cursor-pointer mt-2"
              >
                <span>START A PROJECT</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </FadeUp>
          </div>

          {/* RIGHT COLUMN: 4 Step Cards Sequence */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8 w-full">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.number}
                  ref={(el) => (stepRefs.current[idx] = el)}
                  className={`relative flex flex-col justify-between rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 transition-all duration-500 border ${
                    isActive
                      ? "bg-[var(--surface-2)] border-accent shadow-[0_16px_40px_rgba(234,91,21,0.12)] scale-[1.01]"
                      : "bg-[var(--surface-2)]/60 border-[var(--border-subtle)] opacity-75 hover:opacity-100 hover:border-[var(--border-medium)]"
                  }`}
                >
                  {/* Top: Step Number & Tagline */}
                  <div className="flex items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
                    <span className="font-parkinsans text-xs sm:text-sm font-bold tracking-[0.25em] text-accent uppercase">
                      STEP {step.number}
                    </span>
                    <span className="font-artific text-xs text-[var(--text-muted)] tracking-wide uppercase font-medium">
                      {step.tagline}
                    </span>
                  </div>

                  {/* Middle: Step Headline */}
                  <div className="py-6">
                    <h3 className="font-parkinsans text-2xl sm:text-3xl md:text-4xl font-semibold uppercase tracking-tight text-[var(--text-primary)]">
                      {step.title}
                    </h3>
                    <p className="font-artific text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mt-4 max-w-xl">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom: Status Indicator */}
                  <div className="flex items-center gap-2 pt-4 border-t border-[var(--border-subtle)] text-[11px] font-parkinsans uppercase tracking-[0.15em] text-[var(--text-muted)]">
                    <span
                      className={`size-2.5 rounded-full ${
                        isActive ? "bg-accent animate-pulse" : "bg-[var(--border-strong)]"
                      }`}
                    />
                    <span className={isActive ? "text-accent font-bold" : ""}>
                      {isActive ? "ACTIVE STAGE" : `PHASE ${step.number}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
