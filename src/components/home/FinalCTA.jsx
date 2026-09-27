"use client";

import React from "react";
import SectionLabel from "../common/SectionLabel";
import SplitText from "../motion/SplitText";
import FadeUp from "../motion/FadeUp";
import Magnetic from "../motion/Magnetic";
import GeratLogo from "../common/GeratLogo";
import { useNav } from "@/context/NavContext";

/**
 * Section 07: FINAL CTA ("WHAT HAPPENS NEXT") — V2 Storytelling Flow
 * Provides a strong, calm visual closing that brings back the bridge motif
 * and invites direct conversation.
 */
export default function FinalCTA() {
  const { openContact } = useNav();

  return (
    <section
      id="contact"
      aria-label="Contact and Next Steps"
      className="relative w-full bg-[#300F0A] text-white py-24 sm:py-32 md:py-40 border-b border-black/20 overflow-hidden"
    >
      {/* Background Bridge Watermark Accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none translate-x-1/4">
        <GeratLogo variant="mark" className="w-[600px] h-[600px] text-white" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-4xl flex flex-col gap-6 sm:gap-8">
          <SectionLabel index="07" label="WHAT HAPPENS NEXT" />

          <div className="space-y-2">
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
            <p className="font-artific text-base sm:text-lg md:text-xl text-white/80 leading-relaxed font-normal">
              Tell us what you are trying to improve, build, or simplify. We will start with the problem and work from there.
            </p>
          </FadeUp>

          <FadeUp delay={0.5} y={20} className="pt-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Magnetic maxDisplacement={10}>
                <button
                  type="button"
                  onClick={() => openContact()}
                  className="group relative isolate inline-flex items-center justify-center font-parkinsans text-xs sm:text-sm uppercase tracking-[0.2em] px-8 sm:px-10 py-4 bg-accent text-white font-bold hover:bg-white hover:text-[#300F0A] border border-accent hover:border-white transition-all duration-300 rounded-[2px] shadow-xl select-none cursor-pointer"
                >
                  <span>START A PROJECT</span>
                  <span className="ml-2.5 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </Magnetic>

              <div className="flex items-center gap-3 font-parkinsans text-[10px] tracking-[0.2em] text-white/50 uppercase">
                <span>DIGITAL</span>
                <span>·</span>
                <span>AI</span>
                <span>·</span>
                <span>SYSTEMS</span>
                <span>·</span>
                <span>BRAND</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
