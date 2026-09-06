"use client";

import React from "react";
import Link from "next/link";
import SectionLabel from "../common/SectionLabel";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";

import { portfolioProjects } from "@/content";

const featuredProjects = portfolioProjects.slice(0, 3).map((p, idx) => ({
  ...p,
  id: `0${idx + 1}`,
  description: p.summary || p.description,
}));

export default function OurPortfolio() {
  return (
    <section
      id="portfolio"
      aria-label="Selected Work"
      className="relative w-full bg-[#080808] text-white py-24 sm:py-32 border-b border-white/10"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 lg:mb-20">
          <div className="flex flex-col gap-4 max-w-2xl">
            <SectionLabel index="03" label="SELECTED WORK" />
            <SplitText
              text="PROVEN DIGITAL SYSTEMS."
              as="h2"
              className="font-roc text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[0.95]"
            />
            <SplitText
              text="DEPLOYED AT SCALE."
              as="h2"
              wordClassName="text-accent"
              className="font-roc text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[0.95]"
            />
          </div>

          <FadeUp delay={0.3}>
            <Link
              href="/portfolio"
              className="group relative isolate inline-flex items-center font-azeret text-[11px] uppercase tracking-[0.2em] px-6 py-3 border border-white/20 hover:border-accent hover:bg-accent/10 text-white/90 hover:text-white transition-all duration-300 rounded-[2px]"
            >
              <span>VIEW ALL CASE STUDIES</span>
              <span className="ml-2 text-white/40 group-hover:text-accent group-hover:translate-x-1 transition-all">
                →
              </span>
              <span className="absolute -top-[1px] -left-[1px] size-1.5 border-t border-l border-white/40 group-hover:border-accent" />
              <span className="absolute -bottom-[1px] -right-[1px] size-1.5 border-b border-r border-white/40 group-hover:border-accent" />
            </Link>
          </FadeUp>
        </div>

        {/* Featured Case Study Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredProjects.map((project, idx) => (
            <FadeUp key={project.id} delay={0.15 * idx} y={30}>
              <Link
                href="/portfolio"
                className="group relative flex flex-col bg-[#111111] border border-white/10 hover:border-accent/60 rounded-[4px] overflow-hidden transition-all duration-400 h-full"
              >
                {/* Precision Corner Accents */}
                <span className="absolute top-0 left-0 size-2 border-t border-l border-white/20 group-hover:border-accent transition-colors z-20" />
                <span className="absolute top-0 right-0 size-2 border-t border-r border-white/20 group-hover:border-accent transition-colors z-20" />
                <span className="absolute bottom-0 left-0 size-2 border-b border-l border-white/20 group-hover:border-accent transition-colors z-20" />
                <span className="absolute bottom-0 right-0 size-2 border-b border-r border-white/20 group-hover:border-accent transition-colors z-20" />

                {/* Media Container */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-black/60">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 font-azeret text-[10px] tracking-[0.2em] text-white/70 bg-black/60 px-2.5 py-1 rounded-[1px] border border-white/10">
                    {project.id}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 gap-6">
                  <div className="flex flex-col gap-3">
                    <div className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase">
                      {project.category}
                    </div>
                    <h3 className="font-roc text-xl font-bold tracking-tight uppercase text-white group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-roc text-xs sm:text-sm text-white/70 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
                    <div className="font-azeret text-[9px] tracking-[0.15em] text-white/50 uppercase">
                      {project.metric}
                    </div>
                    <div className="font-azeret text-[8px] tracking-[0.2em] text-white/30 uppercase">
                      {project.tech}
                    </div>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
