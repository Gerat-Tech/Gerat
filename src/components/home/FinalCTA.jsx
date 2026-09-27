"use client";

import React from "react";
import SectionLabel from "../common/SectionLabel";
import SplitText from "../motion/SplitText";
import FadeUp from "../motion/FadeUp";
import Magnetic from "../motion/Magnetic";
import GeratLogo from "../common/GeratLogo";
import { useNav } from "@/context/NavContext";

/**
 * Section 07: FINAL CTA ("WHAT HAPPENS NEXT") — Receivio Floating Container Alignment
 *
 * Renders as a powerful, deep Coffee Bean floating card (#300F0A) with pill CTA
 * and brand mark integration, setting up direct conversion into the contact drawer.
 */
export default function FinalCTA() {
  const { openContact } = useNav();

  return (
    <section
      id="contact"
      aria-label="Contact and Next Steps"
      className="w-full px-4 sm:px-6 md:px-8 lg:px-12 my-12 sm:my-20 md:my-24 scroll-mt-24"
    >
      <div
        data-dark-card="true"
        className="relative w-full max-w-[1360px] mx-auto bg-[#300F0A] text-[#FAF6ED] p-8 sm:p-14 md:p-18 lg:p-20 rounded-[32px] border border-white/10 shadow-[0_24px_64px_rgba(48,15,10,0.3)] overflow-hidden"
      >
        {/* Background Bridge Watermark Accent */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.07] pointer-events-none translate-x-1/4"
        >
          <GeratLogo variant="mark" className="w-[600px] h-[600px] text-white" />
        </div>

        <div className="relative z-10 max-w-4xl flex flex-col gap-6 sm:gap-8">
          <SectionLabel index="07" label="WHAT HAPPENS NEXT" />

          <div className="space-y-1 sm:space-y-2">
            <SplitText
              text="HAVE SOMETHING"
              as="h2"
              delay={0.1}
              stagger={0.04}
              className="font-parkinsans text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight uppercase leading-[0.95] text-white"
            />
            <SplitText
              text="WORTH BUILDING?"
              as="div"
              delay={0.25}
              stagger={0.04}
              wordClassName="text-accent"
              className="font-parkinsans text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight uppercase leading-[0.95]"
            />
          </div>

          <FadeUp delay={0.35} y={20} className="max-w-2xl">
            <p className="font-artific text-base sm:text-lg md:text-xl text-[#FAF6ED]/85 leading-relaxed font-normal">
              Tell us what you are trying to improve, build, or simplify. We will start with the problem and work from there.
            </p>
          </FadeUp>

          <FadeUp delay={0.5} y={20} className="pt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Magnetic maxDisplacement={10}>
                <button
                  type="button"
                  onClick={() => openContact()}
                  className="group relative isolate inline-flex items-center justify-center font-parkinsans text-xs sm:text-sm uppercase tracking-[0.2em] px-9 sm:px-11 py-4 bg-accent text-white font-bold hover:bg-white hover:text-[#300F0A] border border-accent hover:border-white transition-all duration-300 rounded-full shadow-xl select-none cursor-pointer"
                >
                  <span>START A PROJECT</span>
                  <span className="ml-2.5 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </Magnetic>

              <div className="flex flex-wrap items-center gap-2">
                {["DIGITAL", "AI", "SYSTEMS", "BRAND"].map((discipline) => (
                  <span
                    key={discipline}
                    className="px-3.5 py-1 rounded-full bg-white/10 text-[10px] font-parkinsans uppercase tracking-[0.18em] text-[#FAF6ED]/70"
                  >
                    {discipline}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
