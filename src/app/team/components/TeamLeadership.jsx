"use client";

import React, { useState, useEffect } from "react";
import FadeUp from "@/components/motion/FadeUp";
import { leadershipTeam as defaultLeadership } from "@/content";

export default function TeamLeadership({ initialLeaders = null }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fetchedLeaders, setFetchedLeaders] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/team?active=true")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && data.members && data.members.length > 0) {
          const execs = data.members.filter((m) => m.division === "EXECUTIVE_LEADERSHIP");
          const list = execs.length > 0 ? execs : data.members.slice(0, 3);
          const normalized = list.map((m) => ({
            name: m.name,
            role: m.roleTitle,
            specialty: m.focusTag,
            bio: m.bio,
            image: m.photoUrl || "/image/team/leadership/WQF__0000_Founder-IgorTulchinsky.webp",
          }));
          setFetchedLeaders(normalized);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const leadership =
    fetchedLeaders && fetchedLeaders.length > 0
      ? fetchedLeaders
      : initialLeaders && initialLeaders.length > 0
      ? initialLeaders
      : defaultLeadership;

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-16 text-white">
      <div className="flex flex-col gap-3 mb-12">
        <span className="font-azeret text-[10px] tracking-[0.25em] text-accent uppercase">
          01 // EXECUTIVE ARCHITECTS
        </span>
        <h2 className="font-roc text-3xl sm:text-4xl font-bold uppercase tracking-tight">
          LEADERSHIP & ENGINEERING DIRECTORS
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {leadership.map((leader, idx) => {
          const isSelected = activeIdx === idx;
          return (
            <FadeUp key={leader.name} delay={0.1 * idx} y={20}>
              <div
                tabIndex={0}
                onMouseEnter={() => setActiveIdx(idx)}
                onFocus={() => setActiveIdx(idx)}
                className={`group relative flex flex-col bg-[#0d0d0d] border rounded-[4px] overflow-hidden transition-all duration-400 p-6 sm:p-8 cursor-pointer outline-none h-full ${
                  isSelected
                    ? "border-accent shadow-[0_0_24px_rgba(255,74,0,0.15)]"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                {/* Precision Corner Accents */}
                <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30 group-hover:border-accent transition-colors" />
                <span className="absolute top-0 right-0 size-2 border-t border-r border-white/30 group-hover:border-accent transition-colors" />
                <span className="absolute bottom-0 left-0 size-2 border-b border-l border-white/30 group-hover:border-accent transition-colors" />
                <span className="absolute bottom-0 right-0 size-2 border-b border-r border-white/30 group-hover:border-accent transition-colors" />

                {/* Portrait */}
                <div className="relative aspect-4/5 w-full overflow-hidden bg-black/60 rounded-[2px] mb-6">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 font-azeret text-[9px] tracking-[0.2em] text-white/60 bg-black/70 px-2 py-0.5 border border-white/10">
                    0{idx + 1}
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-2">
                  <span className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase">
                    {leader.role}
                  </span>
                  <h3 className="font-roc text-xl sm:text-2xl font-bold tracking-tight uppercase text-white">
                    {leader.name}
                  </h3>
                  <span className="font-azeret text-[8px] tracking-[0.15em] text-white/40 uppercase">
                    {leader.specialty}
                  </span>
                  <p className="font-roc text-xs text-white/65 leading-relaxed pt-2">
                    {leader.bio}
                  </p>
                </div>
              </div>
            </FadeUp>
          );
        })}
      </div>
    </section>
  );
}
