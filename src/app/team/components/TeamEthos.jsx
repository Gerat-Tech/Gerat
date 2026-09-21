"use client";

import React from "react";
import FadeUp from "@/components/motion/FadeUp";
import { useNav } from "@/context/NavContext";

const principles = [
  {
    num: "01",
    title: "RIGOR OVER SHORTCUTS",
    desc: "We build on solid foundations, clean architecture, and thorough testing so software keeps working long after launch.",
  },
  {
    num: "02",
    title: "PRACTICAL INTELLIGENCE",
    desc: "AI must be reliable and useful. We design tools with verified accuracy and clear application to everyday business work.",
  },
  {
    num: "03",
    title: "FULL CLIENT OWNERSHIP",
    desc: "Our clients retain complete ownership of their code, design assets, and systems. We build independent solutions with zero unnecessary lock-in.",
  },
  {
    num: "04",
    title: "CLEAR COLLABORATION",
    desc: "Direct communication with the people doing the work. Transparent timelines, regular updates, and clear milestones without intermediary noise.",
  },
];

export default function TeamEthos() {
  const { openContact } = useNav();

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-20 text-white border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        <div className="lg:col-span-6 flex flex-col gap-4">
          <span className="font-artific text-[10px] tracking-[0.25em] text-accent uppercase font-medium">
            HOW WE WORK
          </span>
          <h2 className="font-parkinsans text-3xl sm:text-5xl font-semibold uppercase tracking-tight leading-[0.95]">
            HOW WE THINK & BUILD.
          </h2>
        </div>

        <div className="lg:col-span-6 flex flex-col items-start gap-6 lg:border-l lg:border-white/10 lg:pl-10">
          <p className="font-artific text-base text-white/75 leading-relaxed">
            Excellence in technology and design is the result of clear communication, thoughtful architecture, and care for what comes next.
          </p>
          <button
            type="button"
            onClick={openContact}
            className="group relative isolate inline-flex items-center font-parkinsans text-[11px] uppercase tracking-[0.2em] px-6 py-3 border border-white/20 hover:border-accent hover:bg-accent/10 text-white transition-all rounded-[2px]"
          >
            <span>START A PROJECT</span>
            <span className="ml-2 text-accent">→</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {principles.map((p, idx) => (
          <FadeUp key={p.num} delay={0.08 * idx} y={20}>
            <div className="group relative bg-[var(--surface)] border border-white/10 hover:border-accent/60 p-6 rounded-[3px] flex flex-col justify-between min-h-[220px] transition-all duration-300">
              <span className="font-artific text-[11px] tracking-[0.2em] text-accent font-medium">
                {p.num}
              </span>

              <div className="flex flex-col gap-2 my-auto pt-3">
                <h3 className="font-parkinsans text-base font-semibold tracking-tight uppercase text-white group-hover:text-accent transition-colors">
                  {p.title}
                </h3>
                <p className="font-artific text-xs sm:text-sm text-white/70 leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="w-full h-[1px] bg-white/10 group-hover:bg-accent/30 transition-colors mt-3" />
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
