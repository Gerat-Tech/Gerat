"use client";

import React, { useState, useEffect } from "react";
import FadeUp from "@/components/motion/FadeUp";
import { engineeringSpecialists as defaultSpecialists } from "@/content";

export default function AdvisorAndTeam() {
  const [fetchedSpecialists, setFetchedSpecialists] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/team?active=true")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && data.members && data.members.length > 0) {
          const nonExecs = data.members.filter(
            (m) => m.division !== "EXECUTIVE_LEADERSHIP"
          );
          if (nonExecs.length > 0) {
            const normalized = nonExecs.map((m) => ({
              role: m.roleTitle || m.name,
              discipline: m.focusTag || m.division.replace("_", " "),
              focus: m.bio,
              image: m.photoUrl || "/image/team/advisors/WQF__0000_Advisor-MarkCarney.webp",
            }));
            setFetchedSpecialists(normalized);
          }
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const engineeringSpecialists = fetchedSpecialists || defaultSpecialists;

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-16 text-white border-t border-white/10">
      <div className="flex flex-col gap-3 mb-12">
        <span className="font-azeret text-[10px] tracking-[0.25em] text-accent uppercase">
          02 // SPECIALIZED DISCIPLINES
        </span>
        <h2 className="font-roc text-3xl sm:text-4xl font-bold uppercase tracking-tight">
          CORE ENGINEERING PRACTITIONERS
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {engineeringSpecialists.map((member, idx) => (
          <FadeUp key={member.role + idx} delay={0.08 * idx} y={20}>
            <div className="group relative bg-[#0a0a0a] border border-white/10 hover:border-accent/60 p-6 rounded-[3px] flex flex-col justify-between min-h-[300px] transition-all duration-300">
              {/* Precision Corner Accents */}
              <span className="absolute top-0 left-0 size-1.5 border-t border-l border-white/30 group-hover:border-accent transition-colors" />
              <span className="absolute top-0 right-0 size-1.5 border-t border-r border-white/30 group-hover:border-accent transition-colors" />
              <span className="absolute bottom-0 left-0 size-1.5 border-b border-l border-white/30 group-hover:border-accent transition-colors" />
              <span className="absolute bottom-0 right-0 size-1.5 border-b border-r border-white/30 group-hover:border-accent transition-colors" />

              {/* Photo Thumbnail + Index */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="size-16 rounded-[2px] overflow-hidden bg-black/60 shrink-0 border border-white/10">
                  <img
                    src={member.image}
                    alt={member.role}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
                <span className="font-azeret text-[10px] tracking-[0.2em] text-white/40">
                  ENG // 0{idx + 1}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 my-auto">
                <span className="font-azeret text-[8px] tracking-[0.2em] text-accent uppercase">
                  {member.discipline}
                </span>
                <h3 className="font-roc text-lg font-bold tracking-tight uppercase text-white group-hover:text-accent transition-colors">
                  {member.role}
                </h3>
                <p className="font-roc text-xs text-white/65 leading-relaxed pt-1">
                  {member.focus}
                </p>
              </div>

              <div className="w-full h-[1px] bg-white/10 group-hover:bg-accent/40 transition-colors mt-4" />
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
