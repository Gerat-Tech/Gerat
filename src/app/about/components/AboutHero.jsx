"use client";

import React from "react";
import FadeUp from "@/components/motion/FadeUp";
import SplitText from "@/components/motion/SplitText";
import SectionLabel from "@/components/common/SectionLabel";
import { useNav } from "@/context/NavContext";

export default function AboutHero() {
  const { openContact } = useNav();

  const scrollToFounders = (e) => {
    e.preventDefault();
    const el = document.getElementById("founders");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      aria-label="About Hero"
      className="relative w-full pt-36 sm:pt-44 md:pt-48 pb-20 sm:pb-28 border-b border-white/10 overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[160px] pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-4xl flex flex-col gap-6 sm:gap-8">
          <SectionLabel label="ABOUT GERAT" />

          <div className="space-y-3">
            <SplitText
              text="A NEW COMPANY."
              as="h1"
              delay={0.1}
              stagger={0.035}
              className="font-parkinsans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight uppercase leading-[0.94] text-white"
            />
            <SplitText
              text="A CLEAR DIRECTION."
              as="div"
              delay={0.25}
              stagger={0.035}
              wordClassName="text-accent"
              className="font-parkinsans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight uppercase leading-[0.94]"
            />
          </div>

          <FadeUp delay={0.35} y={16}>
            <p className="font-artific text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed">
              Gerat is a software and IT solutions company building useful digital products, intelligent tools, business systems, and brand identities for growing businesses.
            </p>
          </FadeUp>

          <FadeUp delay={0.45} y={16}>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#founders"
                onClick={scrollToFounders}
                className="group relative isolate inline-flex items-center gap-3 font-parkinsans text-xs sm:text-sm uppercase tracking-[0.2em] text-white px-7 py-4 bg-accent hover:bg-accent/90 transition-all duration-300 rounded-[2px] font-semibold cursor-pointer shadow-lg"
              >
                <span>MEET THE FOUNDERS</span>
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>

              <button
                type="button"
                onClick={() => openContact({ discipline: "general", subOption: "ABOUT" })}
                className="group inline-flex items-center gap-3 font-parkinsans text-xs sm:text-sm uppercase tracking-[0.2em] text-white/80 hover:text-white px-7 py-4 border border-white/20 hover:border-accent hover:bg-accent/10 transition-all duration-300 rounded-[2px] cursor-pointer"
              >
                <span>START A CONVERSATION</span>
                <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
