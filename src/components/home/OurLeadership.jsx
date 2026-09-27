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
 *
 * Receivio Floating Container Alignment:
 * - Floating rounded card container (rounded-[32px])
 * - Soft rounded founder cards (rounded-2xl)
 * - Pill action button to deep-dive into /about#founders
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
      className="w-full px-4 sm:px-6 md:px-8 lg:px-12 my-20 sm:my-32 md:my-40 scroll-mt-24"
    >
      <span id="leadership" className="sr-only" />

      <div className="w-full max-w-[1360px] mx-auto bg-[var(--surface)] text-[var(--text-primary)] p-10 sm:p-16 md:p-22 rounded-[36px] sm:rounded-[44px] border border-[var(--border-subtle)] shadow-[0_24px_64px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 sm:mb-18 pb-8 border-b border-[var(--border-subtle)]">
          <div className="flex flex-col gap-4 max-w-2xl">
            <SectionLabel index="05" label="THE FOUNDERS" />
            <div className="space-y-1 sm:space-y-2">
              <SplitText
                text="FIVE FOUNDERS."
                as="h2"
                delay={0.1}
                stagger={0.035}
                className="font-parkinsans text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight uppercase leading-[0.96] text-[var(--text-primary)]"
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
              className="group inline-flex items-center gap-2 font-parkinsans text-xs uppercase tracking-[0.2em] px-7 py-3.5 bg-accent hover:bg-white hover:text-[#300F0A] text-white font-bold rounded-full shadow-md hover:shadow-accent/25 transition-all duration-300"
            >
              <span>MEET THE FOUNDERS</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </FadeUp>
        </div>

        {/* 5-Person Composition Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
          {founders.map((founder, idx) => (
            <FadeUp key={founder.id} delay={0.1 + idx * 0.08} y={20}>
              <div className="group relative flex flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-2)] overflow-hidden transition-all duration-300 hover:border-accent/60 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] hover:-translate-y-1">
                {/* Founder Photo */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/10">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-2)] via-transparent to-transparent opacity-70" />
                </div>

                {/* Founder Details */}
                <div className="p-5 flex flex-col gap-1.5">
                  <div className="font-parkinsans text-xs font-bold text-accent uppercase tracking-[0.2em]">
                    0{idx + 1}
                  </div>
                  <h3 className="font-parkinsans text-base font-semibold uppercase tracking-tight text-[var(--text-primary)] group-hover:text-accent transition-colors duration-200">
                    {founder.name}
                  </h3>
                  <div className="font-artific text-xs uppercase tracking-wider text-[var(--text-muted)] line-clamp-1">
                    {founder.role}
                  </div>
                  <div className="font-artific text-xs text-[var(--text-secondary)] pt-2 border-t border-[var(--border-subtle)] line-clamp-2">
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
