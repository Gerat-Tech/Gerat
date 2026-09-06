"use client";

import React, { useEffect, useRef, useState } from "react";
import FadeUp from "@/components/motion/FadeUp";
import { useNav } from "@/context/NavContext";
import { portfolioProjects as allProjects } from "@/content";

export default function PortfolioShowcase({ activeCategory = "ALL DISCIPLINES" }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const itemsRef = useRef([]);
  const { openContact } = useNav();

  const filteredProjects =
    activeCategory === "ALL DISCIPLINES"
      ? allProjects
      : allProjects.filter((p) => {
          if (activeCategory === "AI & RAG" || activeCategory === "AI & RAG NETWORKS") {
            return p.category === "AI & RAG" || p.category === "AI & RAG NETWORKS";
          }
          return p.category === activeCategory;
        });

  // Observer to update active item in sticky sidebar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = itemsRef.current.indexOf(entry.target);
            if (idx !== -1) setActiveIdx(idx);
          }
        });
      },
      { threshold: 0.3 }
    );

    itemsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [filteredProjects]);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pb-24 sm:pb-36 flex flex-col lg:flex-row gap-8 lg:gap-12">
      {/* Sticky Navigation Sidebar (Spec §18) */}
      <aside className="hidden lg:block w-72 shrink-0">
        <nav className="sticky top-28 flex flex-col gap-8 bg-[#0a0a0a] border border-white/10 p-6 rounded-[3px]">
          <div className="font-azeret text-[10px] tracking-[0.2em] text-white/40 uppercase">
            DIRECTORY // {filteredProjects.length} CASE STUDIES
          </div>

          <ul className="flex flex-col gap-1.5">
            {filteredProjects.map((p, i) => {
              const isActive = activeIdx === i;
              return (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    className={`group flex items-center justify-between py-2 px-3 rounded-[2px] font-azeret text-[11px] tracking-[0.15em] uppercase transition-all duration-300 ${
                      isActive
                        ? "bg-accent/15 text-white border-l-2 border-accent"
                        : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    <span className="truncate max-w-[160px]">{p.title}</span>
                    <span className="text-[9px] text-white/40 group-hover:text-accent">
                      {p.index}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={openContact}
              className="w-full py-3 px-4 bg-accent text-white font-azeret text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-black transition-colors rounded-[2px]"
            >
              START A PROJECT →
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Case Study Cards Feed */}
      <div className="flex-1 flex flex-col gap-12 sm:gap-16">
        {filteredProjects.map((p, i) => (
          <article
            key={p.id}
            id={p.id}
            ref={(el) => (itemsRef.current[i] = el)}
            className="group relative bg-[#0e0e0e] border border-white/10 hover:border-accent/60 rounded-[4px] overflow-hidden transition-all duration-400"
          >
            {/* Precision Corner Accents */}
            <span className="absolute top-0 left-0 size-2.5 border-t border-l border-white/30 group-hover:border-accent transition-colors z-20" />
            <span className="absolute top-0 right-0 size-2.5 border-t border-r border-white/30 group-hover:border-accent transition-colors z-20" />
            <span className="absolute bottom-0 left-0 size-2.5 border-b border-l border-white/30 group-hover:border-accent transition-colors z-20" />
            <span className="absolute bottom-0 right-0 size-2.5 border-b border-r border-white/30 group-hover:border-accent transition-colors z-20" />

            {/* Media Banner */}
            <div className="relative aspect-16/9 sm:aspect-21/9 w-full overflow-hidden bg-black">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover object-center opacity-75 group-hover:opacity-100 group-hover:scale-102 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-black/30 to-transparent" />

              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-3">
                <span className="font-azeret text-[10px] tracking-[0.2em] text-white/80 bg-black/80 backdrop-blur-md px-3 py-1 border border-white/15 rounded-[1px]">
                  {p.num}
                </span>
                <span className="font-azeret text-[9px] tracking-[0.2em] text-accent bg-black/80 backdrop-blur-md px-3 py-1 border border-accent/40 rounded-[1px] uppercase">
                  {p.category}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-10 flex flex-col gap-6">
              {/* Title & Impact Metric */}
              <div className="flex flex-col gap-2">
                <span className="font-azeret text-[10px] tracking-[0.2em] text-white/40 uppercase">
                  {p.tags}
                </span>
                <h2 className="font-roc text-2xl sm:text-4xl font-bold tracking-tight uppercase text-white group-hover:text-accent transition-colors">
                  {p.title}
                </h2>
                <div className="font-azeret text-[10px] sm:text-[11px] tracking-[0.15em] text-accent font-semibold pt-1">
                  IMPACT // {p.metric}
                </div>
              </div>

              {/* Architecture & Problem Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div className="flex flex-col gap-2">
                  <span className="font-azeret text-[9px] tracking-[0.2em] text-white/50 uppercase">
                    OPERATIONAL CHALLENGE
                  </span>
                  <p className="font-roc text-xs sm:text-sm text-white/70 leading-relaxed">
                    {p.problem}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="font-azeret text-[9px] tracking-[0.2em] text-white/50 uppercase">
                    {p.category === "BRAND & IDENTITY" || p.category === "PERSONAL BRAND"
                      ? "CREATIVE & STRATEGIC RESOLUTION"
                      : "ENGINEERED RESOLUTION"}
                  </span>
                  <p className="font-roc text-xs sm:text-sm text-white/70 leading-relaxed">
                    {p.architecture}
                  </p>
                </div>
              </div>

              {/* Stack & Deliverables Badges */}
              {p.stack && p.stack.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  {p.stack.map((item) => (
                    <span
                      key={item}
                      className="font-azeret text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-[2px] bg-white/[0.04] border border-white/10 text-white/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}

              {/* Technology & Action Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                <div className="font-azeret text-[9px] sm:text-[10px] tracking-[0.2em] text-white/40 uppercase">
                  {p.category === "BRAND & IDENTITY" || p.category === "PERSONAL BRAND" ? "DELIVERABLES" : "STACK"}: {p.tech}
                </div>

                <button
                  type="button"
                  onClick={openContact}
                  className="inline-flex items-center font-azeret text-[10px] sm:text-[11px] uppercase tracking-[0.2em] px-5 py-2.5 border border-white/20 hover:border-accent hover:bg-accent/15 text-white transition-all rounded-[2px]"
                >
                  <span>
                    {p.category === "BRAND & IDENTITY"
                      ? "INQUIRE ABOUT BRAND IDENTITY"
                      : p.category === "PERSONAL BRAND"
                      ? "INQUIRE ABOUT PERSONAL BRANDING"
                      : "INQUIRE ABOUT THIS ARCHITECTURE"}
                  </span>
                  <span className="ml-2 text-accent">→</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
