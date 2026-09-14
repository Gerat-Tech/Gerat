"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SectionLabel from "../common/SectionLabel";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";
import { leadershipTeam as DEFAULT_LEADERS } from "@/content/team";

export default function OurLeadership({ initialLeaders = null }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fetchedLeaders, setFetchedLeaders] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/team?active=true")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && data.members && data.members.length > 0) {
          const execs = data.members.filter((m) => m.division === "EXECUTIVE_LEADERSHIP");
          const list = execs.length > 0 ? execs : data.members.slice(0, 4);
          const mapped = list.map((m) => ({
            name: m.name,
            role: m.roleTitle,
            specialty: m.focusTag,
            bio: m.bio,
            image: m.photoUrl || "/image/team/leadership/WQF__0000_Founder-IgorTulchinsky.webp",
          }));
          setFetchedLeaders(mapped);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const leaders =
    fetchedLeaders && fetchedLeaders.length > 0
      ? fetchedLeaders
      : initialLeaders && initialLeaders.length > 0
      ? initialLeaders
      : DEFAULT_LEADERS;

  return (
    <section
      id="leadership"
      aria-label="Leadership"
      className="relative w-full bg-[var(--bg)] text-white py-24 sm:py-32 border-b border-white/10"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 lg:mb-20">
          <div className="flex flex-col gap-4 max-w-2xl">
            <SectionLabel index="05" label="LEADERSHIP" />
            <SplitText
              text="ENGINEERING LEADERSHIP."
              as="h2"
              className="font-artific text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[0.95]"
            />
            <SplitText
              text="DOMAIN EXPERIENCE."
              as="h2"
              wordClassName="text-accent"
              className="font-artific text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[0.95]"
            />
          </div>

          <FadeUp delay={0.3}>
            <Link
              href="/team"
              className="group relative isolate inline-flex items-center font-parkinsans text-[11px] uppercase tracking-[0.2em] px-6 py-3 border border-white/20 hover:border-accent hover:bg-accent/10 text-white/90 hover:text-white transition-all duration-300 rounded-[2px]"
            >
              <span>MEET ALL ENGINEERS & ADVISORS</span>
              <span className="ml-2 text-white/40 group-hover:text-accent group-hover:translate-x-1 transition-all">
                →
              </span>
              <span className="absolute -top-[1px] -left-[1px] size-1.5 border-t border-l border-white/40 group-hover:border-accent" />
              <span className="absolute -bottom-[1px] -right-[1px] size-1.5 border-b border-r border-white/40 group-hover:border-accent" />
            </Link>
          </FadeUp>
        </div>

        {/* Editorial Leader Showcase Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map((leader, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <div
                key={leader.name}
                tabIndex={0}
                onMouseEnter={() => setActiveIdx(idx)}
                onFocus={() => setActiveIdx(idx)}
                className={`group relative flex flex-col bg-[var(--surface)] border rounded-[4px] overflow-hidden transition-all duration-400 p-6 sm:p-8 cursor-pointer outline-none ${
                  isSelected
                    ? "border-accent shadow-[0_0_24px_rgba(234,91,21,0.12)]"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                {/* Precision Corner Accents */}
                <span
                  className={`absolute top-0 left-0 size-2 border-t border-l transition-colors duration-300 ${
                    isSelected ? "border-accent" : "border-white/20"
                  }`}
                />
                <span
                  className={`absolute top-0 right-0 size-2 border-t border-r transition-colors duration-300 ${
                    isSelected ? "border-accent" : "border-white/20"
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 size-2 border-b border-l transition-colors duration-300 ${
                    isSelected ? "border-accent" : "border-white/20"
                  }`}
                />
                <span
                  className={`absolute bottom-0 right-0 size-2 border-b border-r transition-colors duration-300 ${
                    isSelected ? "border-accent" : "border-white/20"
                  }`}
                />

                {/* Portrait */}
                <div className="relative aspect-4/5 w-full overflow-hidden bg-black/60 rounded-[2px] mb-6">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 font-parkinsans text-[9px] tracking-[0.2em] text-white/50 bg-black/60 px-2 py-0.5 border border-white/10">
                    0{idx + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <span className="font-parkinsans text-[9px] tracking-[0.2em] text-accent uppercase font-bold">
                    {leader.role}
                  </span>
                  <h3 className="font-artific text-xl font-bold tracking-tight uppercase text-white">
                    {leader.name}
                  </h3>
                  <span className="font-parkinsans text-[8px] tracking-[0.15em] text-white/40 uppercase">
                    {leader.specialty}
                  </span>
                  <p className="font-parkinsans text-xs text-white/60 leading-relaxed pt-2">
                    {leader.bio}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
