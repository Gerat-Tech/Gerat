"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionLabel from "../common/SectionLabel";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";

const DEFAULT_FOUNDERS = [
  {
    id: "hruy-daniel",
    name: "HRUY DANIEL",
    role: "CHIEF EXECUTIVE OFFICER",
    specialty: "Strategy & Venture Growth",
    image: "/image/team/leadership/hiruy.jpeg",
  },
  {
    id: "ekd",
    name: "EKD",
    role: "CHIEF OPERATING OFFICER",
    specialty: "Operations & Strategic Execution",
    image: "/image/team/leadership/EKD.jpg",
  },
  {
    id: "dawit-teklebrhan",
    name: "DAWIT TEKLEBRHAN",
    role: "CHIEF TECHNOLOGY OFFICER",
    specialty: "Systems & Technical Architecture",
    image: "/image/team/leadership/Dawit.jpeg",
  },
  {
    id: "yohannes-tadesse",
    name: "YOHANNES TADESSE",
    role: "HEAD OF ARTIFICIAL INTELLIGENCE",
    specialty: "Applied AI & Knowledge Systems",
    image: "/image/team/leadership/Nisiha.jpeg",
  },
  {
    id: "solomon-kassahun",
    name: "SOLOMON KASSAHUN",
    role: "HEAD OF ENTERPRISE ENGINEERING",
    specialty: "Distributed Cloud & Business Platforms",
    image: "/image/team/leadership/hosea.jpeg",
  },
];

/**
 * Section 06: FIVE FOUNDERS — THE PEOPLE BEHIND GERAT
 * Clean, intentional 5-person composition echoing the brand's five-part identity.
 * Minimal and focused on the homepage, deferring deep biographies to /about#founders.
 */
export default function OurLeadership({ initialLeaders = null }) {
  const [fetchedLeaders, setFetchedLeaders] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/team?active=true", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.members)) {
          const execs = data.members.filter(
            (m) => m.division === "EXECUTIVE_LEADERSHIP"
          );
          const list = execs.length > 0 ? execs : data.members;
          if (list.length > 0) {
            setFetchedLeaders(list);
          }
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const rawList =
    fetchedLeaders !== null && fetchedLeaders.length > 0
      ? fetchedLeaders
      : initialLeaders !== null && initialLeaders.length > 0
      ? initialLeaders
      : DEFAULT_FOUNDERS;

  const founders = rawList.slice(0, 5).map((leader, idx) => {
    const fallback = DEFAULT_FOUNDERS[idx] || DEFAULT_FOUNDERS[0];
    return {
      id: leader.id || fallback.id,
      name: (leader.name || fallback.name).toUpperCase(),
      role: (leader.roleTitle || leader.role || fallback.role).toUpperCase(),
      specialty: leader.focusTag || leader.specialty || fallback.specialty,
      image: leader.photoUrl || leader.image || fallback.image,
    };
  });

  return (
    <section
      id="founders"
      aria-label="The Founders"
      className="relative w-full bg-[var(--bg)] text-[var(--text-primary)] py-24 sm:py-32 md:py-36 border-b border-white/10 scroll-mt-20 overflow-hidden"
    >
      <span id="leadership" className="sr-only" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-20 pb-10 border-b border-white/10">
          <div className="flex flex-col gap-4 max-w-2xl">
            <SectionLabel index="06" label="THE FOUNDERS" />
            <div className="space-y-2">
              <SplitText
                text="FIVE FOUNDERS."
                as="h2"
                delay={0.1}
                stagger={0.035}
                className="font-parkinsans text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight uppercase leading-[0.96]"
              />
              <SplitText
                text="ONE DIRECTION."
                as="div"
                delay={0.25}
                stagger={0.035}
                wordClassName="text-accent"
                className="font-parkinsans text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight uppercase leading-[0.96]"
              />
            </div>
            <FadeUp delay={0.35} y={16}>
              <p className="font-artific text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mt-2 max-w-xl">
                Gerat was started by five founders who bring different strengths to one shared idea: build useful technology, build it well, and build a company that can grow.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.35} y={16}>
            <Link
              href="/about#founders"
              className="group inline-flex items-center gap-2 font-parkinsans text-xs sm:text-sm uppercase tracking-[0.2em] text-white/70 hover:text-accent transition-colors duration-300 pb-1 border-b border-white/20 hover:border-accent"
            >
              <span>MEET THE FOUNDERS</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 text-accent">
                →
              </span>
            </Link>
          </FadeUp>
        </div>

        {/* 5-Person Composition Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-6">
          {founders.map((founder, idx) => (
            <FadeUp key={founder.id} delay={0.1 + idx * 0.08} y={20}>
              <div className="group relative flex flex-col rounded-[4px] border border-white/10 bg-[#1a0a07] overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
                {/* Founder Photo */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#120504]">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a07] via-transparent to-transparent opacity-80" />
                </div>

                {/* Founder Details */}
                <div className="p-5 sm:p-6 flex flex-col gap-2">
                  <div className="font-parkinsans text-xs font-bold text-accent uppercase tracking-[0.2em]">
                    0{idx + 1}
                  </div>
                  <h3 className="font-parkinsans text-base sm:text-lg font-semibold uppercase tracking-tight text-white group-hover:text-accent transition-colors duration-200">
                    {founder.name}
                  </h3>
                  <div className="font-artific text-xs uppercase tracking-wider text-white/60 line-clamp-1">
                    {founder.role}
                  </div>
                  <div className="font-artific text-xs text-white/40 pt-2 border-t border-white/10 line-clamp-2">
                    {founder.specialty}
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
