"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SectionLabel from "../common/SectionLabel";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";

import { portfolioProjects as defaultProjects } from "@/content";

const defaultFeatured = defaultProjects.slice(0, 3).map((p, idx) => ({
  ...p,
  id: `0${idx + 1}`,
  description: p.summary || p.description,
}));

export default function OurPortfolio({ initialProjects = null }) {
  const [fetchedProjects, setFetchedProjects] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/portfolio?featured=true", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.caseStudies)) {
          const mapped = data.caseStudies.slice(0, 3).map((p, idx) => ({
            ...p,
            id: p.displayIndex || `0${idx + 1}`,
            image: p.imageUrl || p.image,
            description: p.summary || p.description,
            tech: p.techStack || p.tech || "",
            stack:
              typeof p.stackBadges === "string" && p.stackBadges.startsWith("[")
                ? JSON.parse(p.stackBadges)
                : Array.isArray(p.stackBadges)
                ? p.stackBadges
                : p.stackBadges
                ? p.stackBadges.split(",").map((s) => s.trim())
                : [],
          }));
          setFetchedProjects(mapped);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const featuredProjects =
    fetchedProjects !== null
      ? fetchedProjects
      : initialProjects !== null
      ? initialProjects
      : defaultFeatured;

  // Hide the section completely on the homepage if no project is featured
  if (!featuredProjects || featuredProjects.length === 0) {
    return null;
  }

  return (
    <section
      id="portfolio"
      aria-label="Selected Work"
      className="relative w-full bg-[var(--bg)] text-white py-14 sm:py-18 md:py-20 border-b border-white/10"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="flex flex-col gap-4 max-w-2xl">
            <SectionLabel label="SELECTED WORK" />
            <SplitText
              text="WE BUILD THINGS"
              as="h2"
              className="font-parkinsans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium sm:font-semibold tracking-tight uppercase leading-[0.95]"
            />
            <SplitText
              text="PEOPLE ACTUALLY USE."
              as="h2"
              wordClassName="text-accent"
              className="font-parkinsans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium sm:font-semibold tracking-tight uppercase leading-[0.95]"
            />
            <FadeUp delay={0.2} y={16}>
              <p className="font-artific text-base sm:text-lg text-white/75 leading-relaxed pt-2">
                A few examples of the products, platforms, and experiences we&apos;ve helped shape.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.3}>
            <Link
              href="/portfolio"
              className="group relative isolate inline-flex items-center font-parkinsans text-[11px] uppercase tracking-[0.2em] px-6 py-3 border border-white/20 hover:border-accent hover:bg-accent/10 text-white/90 hover:text-white transition-all duration-300 rounded-[2px]"
            >
              <span>VIEW ALL CASE STUDIES</span>
              <span className="ml-2 text-white/40 group-hover:text-accent group-hover:translate-x-1 transition-all">
                →
              </span>
            </Link>
          </FadeUp>
        </div>

        {/* Featured Case Study Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredProjects.map((project, idx) => (
            <FadeUp key={project.id} delay={0.15 * idx} y={30}>
              <Link
                href="/portfolio"
                className="group relative flex flex-col bg-[var(--surface)] border border-white/10 hover:border-accent/60 rounded-[4px] overflow-hidden transition-all duration-400 h-full"
              >
                {/* Media Container */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-black/60">
                  <img
                    src={project.image || "/image/portfolioPage/stratahub-featured.webp"}
                    alt={project.title}
                    className="w-full h-full object-cover object-center opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "/image/portfolioPage/stratahub-featured.webp";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 gap-6">
                  <div className="flex flex-col gap-3">
                    <div className="font-artific text-[9px] tracking-[0.2em] text-accent uppercase font-medium">
                      {project.category}
                    </div>
                    <h3 className="font-parkinsans text-xl font-semibold tracking-tight uppercase text-white group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-artific text-xs sm:text-sm text-white/70 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
                    <div className="font-parkinsans text-[9px] tracking-[0.15em] text-white/50 uppercase">
                      {project.metric}
                    </div>
                    <div className="font-parkinsans text-[8px] tracking-[0.2em] text-white/30 uppercase">
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
