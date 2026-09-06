"use client";

import React from "react";
import FadeUp from "@/components/motion/FadeUp";
import { useNav } from "@/context/NavContext";

const principles = [
  {
    num: "01",
    title: "PRODUCTION RIGOR OVER PROTOTYPES",
    desc: "We do not ship flimsy demonstrations. Every system is built on production-hardened foundations, comprehensive automated tests, and verified recovery procedures.",
  },
  {
    num: "02",
    title: "DETERMINISTIC INTELLIGENCE",
    desc: "AI systems must be verifiable. We design domain-grounded retrieval pipelines with strict citation accountability, transparent confidence bounds, and zero unverified hallucination.",
  },
  {
    num: "03",
    title: "ARCHITECTURAL SOVEREIGNTY",
    desc: "Our clients retain complete ownership of their data, algorithms, and deployed infrastructure. We champion open standards and eliminate toxic vendor lock-in.",
  },
  {
    num: "04",
    title: "RADICAL TRANSPARENCY",
    desc: "From git commit feeds to real-time build telemetry, our engineering workflows are open to our partners. Direct engineering collaboration without intermediary noise.",
  },
];

export default function TeamEthos() {
  const { openContact } = useNav();

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-20 text-white border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        <div className="lg:col-span-6 flex flex-col gap-4">
          <span className="font-azeret text-[10px] tracking-[0.25em] text-accent uppercase">
            03 // OPERATIONAL DOCTRINE
          </span>
          <h2 className="font-roc text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-[0.95]">
            HOW OUR ARCHITECTS THINK & BUILD.
          </h2>
        </div>

        <div className="lg:col-span-6 flex flex-col items-start gap-6 lg:border-l lg:border-white/10 lg:pl-10">
          <p className="font-roc text-base text-white/70 leading-relaxed">
            Engineering excellence is not an accident—it is the direct result of
            strict architectural doctrine, uncompromising code review, and deep
            domain respect.
          </p>
          <button
            type="button"
            onClick={openContact}
            className="group relative isolate inline-flex items-center font-azeret text-[11px] uppercase tracking-[0.2em] px-6 py-3 border border-white/20 hover:border-accent hover:bg-accent/10 text-white transition-all rounded-[2px]"
          >
            <span>JOIN OUR ENGINEERING CORPS</span>
            <span className="ml-2 text-accent">→</span>
            <span className="absolute -top-[1px] -left-[1px] size-1.5 border-t border-l border-white/40 group-hover:border-accent" />
            <span className="absolute -bottom-[1px] -right-[1px] size-1.5 border-b border-r border-white/40 group-hover:border-accent" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {principles.map((p, idx) => (
          <FadeUp key={p.num} delay={0.08 * idx} y={20}>
            <div className="group relative bg-[#0c0c0c] border border-white/10 hover:border-accent/60 p-6 rounded-[3px] flex flex-col justify-between min-h-[220px] transition-all duration-300">
              <span className="absolute top-0 left-0 size-1.5 border-t border-l border-white/20 group-hover:border-accent" />
              <span className="absolute bottom-0 right-0 size-1.5 border-b border-r border-white/20 group-hover:border-accent" />

              <span className="font-azeret text-[11px] tracking-[0.2em] text-accent font-bold">
                {p.num} //
              </span>

              <div className="flex flex-col gap-2 my-auto pt-3">
                <h3 className="font-roc text-base font-bold tracking-tight uppercase text-white group-hover:text-accent transition-colors">
                  {p.title}
                </h3>
                <p className="font-roc text-xs text-white/60 leading-relaxed">
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
