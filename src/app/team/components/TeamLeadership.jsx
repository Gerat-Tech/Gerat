"use client";

import React, { useState, useEffect } from "react";
import FadeUp from "@/components/motion/FadeUp";
import { leadershipTeam as defaultLeadership } from "@/content";

export default function TeamLeadership({ initialLeaders = null }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fetchedLeaders, setFetchedLeaders] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/team?active=true", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && data.members && data.members.length > 0) {
          const execs = data.members.filter((m) => m.division === "EXECUTIVE_LEADERSHIP");
          const list = execs.length > 0 ? execs : data.members;
          const normalized = list.map((m) => ({
            name: m.name,
            role: m.roleTitle,
            specialty: m.focusTag,
            bio: m.bio,
            email: m.email,
            linkedinUrl: m.linkedinUrl,
            githubUrl: m.githubUrl,
            twitterUrl: m.twitterUrl,
            image: m.photoUrl || "/image/team/leadership/Dawit.jpeg",
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

  const gridColsClass =
    leadership.length === 5
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : leadership.length === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : leadership.length === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-3";

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-16 text-white">
      <div className="flex flex-col gap-3 mb-12">
        <span className="font-artific text-[10px] tracking-[0.25em] text-accent uppercase font-medium">
          EXECUTIVE ARCHITECTS
        </span>
        <h2 className="font-parkinsans text-3xl sm:text-4xl font-semibold uppercase tracking-tight text-[var(--text-primary)]">
          LEADERSHIP & ENGINEERING DIRECTORS
        </h2>
      </div>

      <div className={`grid grid-cols-1 ${gridColsClass} gap-6 lg:gap-8`}>
        {leadership.map((leader, idx) => {
          const isSelected = activeIdx === idx;
          return (
            <FadeUp key={leader.name} delay={0.1 * idx} y={20}>
              <div
                tabIndex={0}
                onMouseEnter={() => setActiveIdx(idx)}
                onFocus={() => setActiveIdx(idx)}
                className={`group relative flex flex-col bg-[var(--surface)] border rounded-[4px] overflow-hidden transition-all duration-400 p-6 sm:p-8 cursor-pointer outline-none h-full justify-between ${
                  isSelected
                    ? "border-accent shadow-[0_0_24px_rgba(234,91,21,0.15)]"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <div>
                  {/* Portrait */}
                  <div className="relative aspect-4/5 w-full overflow-hidden bg-black/60 rounded-[2px] mb-6">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "/image/team/leadership/Dawit.jpeg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-2">
                    <span className="font-artific text-[9px] tracking-[0.2em] text-accent uppercase font-medium">
                      {leader.role}
                    </span>
                    <h3 className="font-parkinsans text-xl sm:text-2xl font-semibold tracking-tight uppercase text-white">
                      {leader.name}
                    </h3>
                    <span className="font-artific text-[9px] tracking-[0.15em] text-white/50 uppercase">
                      {leader.specialty}
                    </span>
                    <p className="font-artific text-xs sm:text-sm text-white/70 leading-relaxed pt-2">
                      {leader.bio}
                    </p>
                  </div>
                </div>

                {/* Connect Vectors */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-artific text-[9px] tracking-[0.18em] text-white/40 uppercase font-medium">
                    CONNECT
                  </span>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {leader.email && (
                      <a
                        href={`mailto:${leader.email}`}
                        className="size-7 rounded-[2px] bg-white/[0.04] hover:bg-accent hover:text-white border border-white/10 flex items-center justify-center text-white/70 transition-colors"
                        title={`Email ${leader.name}`}
                        aria-label={`Email ${leader.name}`}
                      >
                        <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="16" x="2" y="4" rx="2"/>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L1 7"/>
                        </svg>
                      </a>
                    )}
                    {leader.twitterUrl && (
                      <a
                        href={leader.twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="size-7 rounded-[2px] bg-white/[0.04] hover:bg-accent hover:text-white border border-white/10 flex items-center justify-center text-white/70 transition-colors"
                        title="Twitter / X"
                        aria-label="Twitter / X profile"
                      >
                        <svg className="size-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    )}
                    {leader.linkedinUrl && (
                      <a
                        href={leader.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="size-7 rounded-[2px] bg-white/[0.04] hover:bg-accent hover:text-white border border-white/10 flex items-center justify-center text-white/70 transition-colors"
                        title="LinkedIn"
                        aria-label="LinkedIn profile"
                      >
                        <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z"/>
                        </svg>
                      </a>
                    )}
                    {leader.githubUrl && (
                      <a
                        href={leader.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="size-7 rounded-[2px] bg-white/[0.04] hover:bg-accent hover:text-white border border-white/10 flex items-center justify-center text-white/70 transition-colors"
                        title="GitHub"
                        aria-label="GitHub profile"
                      >
                        <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </FadeUp>
          );
        })}
      </div>
    </section>
  );
}
