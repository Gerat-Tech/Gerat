"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import SectionLabel from "@/components/common/SectionLabel";
import FadeUp from "@/components/motion/FadeUp";
import SplitText from "@/components/motion/SplitText";

const DEFAULT_FOUNDERS = [
  {
    id: "hruy-daniel",
    name: "HRUY DANIEL",
    role: "CHIEF EXECUTIVE OFFICER",
    responsibility: "Strategy & Venture Growth",
    bio: "Directs Gerat's vision, partnerships, and business growth, helping organizations turn strategy into reliable digital ventures.",
    image: "/image/team/leadership/hiruy.jpeg",
  },
  {
    id: "ekd",
    name: "EKD",
    role: "CHIEF OPERATING OFFICER",
    responsibility: "Operations & Strategic Execution",
    bio: "Oversees company-wide execution, strategic program management, and operational delivery across all engineering and client ventures.",
    image: "/image/team/leadership/EKD.jpg",
  },
  {
    id: "dawit-teklebrhan",
    name: "DAWIT TEKLEBRHAN",
    role: "CHIEF TECHNOLOGY OFFICER",
    responsibility: "Systems & Technical Architecture",
    bio: "Leads engineering and technical architecture, focusing on reliable digital products, intelligent tools, and business systems.",
    image: "/image/team/leadership/Dawit.jpeg",
  },
  {
    id: "yohannes-tadesse",
    name: "YOHANNES TADESSE",
    role: "HEAD OF ARTIFICIAL INTELLIGENCE",
    responsibility: "Applied AI & Knowledge Systems",
    bio: "Guides applied artificial intelligence and data systems, building practical tools that make information accessible and actionable.",
    image: "/image/team/leadership/Nisiha.jpeg",
  },
  {
    id: "solomon-kassahun",
    name: "SOLOMON KASSAHUN",
    role: "HEAD OF ENTERPRISE ENGINEERING",
    responsibility: "Distributed Cloud & Business Platforms",
    bio: "Oversees business platforms, operations engineering, and secure system integrations that keep company workflows running smoothly.",
    image: "/image/team/leadership/hosea.jpeg",
  },
];

export default function TheFounders() {
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
      : DEFAULT_FOUNDERS;

  const founders = rawList.slice(0, 5).map((leader, idx) => {
    const fallback = DEFAULT_FOUNDERS[idx] || DEFAULT_FOUNDERS[0];
    return {
      id: leader.id || fallback.id,
      name: (leader.name || fallback.name).toUpperCase(),
      role: (leader.roleTitle || leader.role || fallback.role).toUpperCase(),
      responsibility: leader.focusTag || leader.specialty || fallback.responsibility,
      bio: leader.bio || fallback.bio,
      image: leader.photoUrl || leader.image || fallback.image,
    };
  });

  return (
    <section
      id="founders"
      aria-label="The Founders"
      className="relative w-full py-24 sm:py-32 md:py-36 border-b border-white/10 scroll-mt-24 overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl flex flex-col gap-6 mb-16 sm:mb-20 pb-8 border-b border-white/10">
          <SectionLabel index="05" label="THE FOUNDERS" />
          <div className="space-y-2">
            <SplitText
              text="FIVE FOUNDERS."
              as="h2"
              delay={0.1}
              stagger={0.035}
              className="font-parkinsans text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight uppercase leading-[0.96] text-white"
            />
            <SplitText
              text="ONE VISION."
              as="div"
              delay={0.25}
              stagger={0.035}
              wordClassName="text-accent"
              className="font-parkinsans text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight uppercase leading-[0.96]"
            />
          </div>

          <FadeUp delay={0.35} y={16}>
            <div className="space-y-3 max-w-2xl">
              <p className="font-artific text-base sm:text-lg text-white/80 leading-relaxed">
                Five founders came together with different strengths and one direction: build useful technology and build Gerat for the long term.
              </p>
              <p className="font-artific text-xs sm:text-sm uppercase tracking-[0.15em] text-accent font-medium">
                Different strengths. Shared ownership. One company we are building together.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* 5 Founder Detailed Profiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {founders.map((founder, idx) => (
            <FadeUp key={founder.id} delay={0.1 + idx * 0.08} y={20}>
              <div className="flex flex-col h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-2)] overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)] group">
                {/* Photo Header */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#120504]">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a07] via-transparent to-transparent opacity-90" />
                  <div className="absolute top-4 left-4 font-parkinsans text-xs font-bold text-accent uppercase tracking-[0.2em] bg-black/60 px-2.5 py-1 rounded-[2px] border border-white/10">
                    0{idx + 1}
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow gap-6">
                  <div className="space-y-2">
                    <h3 className="font-parkinsans text-xl sm:text-2xl font-semibold uppercase tracking-tight text-white group-hover:text-accent transition-colors duration-200">
                      {founder.name}
                    </h3>
                    <div className="font-artific text-xs uppercase tracking-wider text-accent font-medium">
                      {founder.role}
                    </div>
                    <div className="font-artific text-xs text-white/50 uppercase tracking-wide pt-1">
                      {founder.responsibility}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="font-artific text-sm text-white/75 leading-relaxed">
                      {founder.bio}
                    </p>
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
