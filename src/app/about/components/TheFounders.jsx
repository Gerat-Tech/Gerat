"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import SectionLabel from "@/components/common/SectionLabel";
import FadeUp from "@/components/motion/FadeUp";
import SplitText from "@/components/motion/SplitText";
import { Mail } from "lucide-react";

function XIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TelegramIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.2.301-.778.978-.954 1.179-.176.2-.352.226-.653.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.238-.244-.588-.493-.509-.678-.519l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.511c0 1.482 1.08 2.911 1.23 3.112.15.2 2.124 3.243 5.145 4.549.719.311 1.28.497 1.718.636.722.23 1.378.197 1.898.12.578-.087 1.78-.727 2.03-1.43.251-.703.251-1.305.176-1.43-.075-.125-.276-.2-.577-.35zM12.042 2C6.516 2 2.03 6.486 2.03 12.012c0 1.98.577 3.824 1.578 5.378L2 22l4.783-1.554a9.96 9.96 0 004.859 1.266h.004c5.524 0 10.012-4.488 10.012-10.014 0-2.673-1.042-5.186-2.934-7.078A9.94 9.94 0 0012.042 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 0 0-1.66 1.64 1.64 1.64 0 0 0 1.66 1.64 1.64 1.64 0 0 0 1.65-1.64 1.64 1.64 0 0 0-1.65-1.64z" />
    </svg>
  );
}

const DEFAULT_FOUNDERS = [
  {
    id: "hruy-daniel",
    name: "HRUY DANIEL",
    role: "CHIEF EXECUTIVE OFFICER",
    responsibility: "Strategy, Brand Positioning & Growth",
    bio: "Directs Gerat's vision, partnerships, and business growth, helping organizations turn strategy into reliable digital ventures.",
    image: "/image/team/leadership/hiruy.jpeg",
    email: "hruydaniel@gerat.com",
    twitter: "https://x.com/geratsolutions",
    telegram: "https://t.me/geratsolutions",
    whatsapp: "https://wa.me/251929298030",
    linkedin: "https://linkedin.com/company/gerat",
  },
  {
    id: "ekd",
    name: "EKD",
    role: "CHIEF OPERATING OFFICER",
    responsibility: "Operations, Execution & Client Delivery",
    bio: "Oversees company-wide execution, strategic program management, and operational delivery across all engineering and client ventures.",
    image: "/image/team/leadership/EKD.jpg",
    email: "ekd@gerat.com",
    twitter: "https://x.com/geratsolutions",
    telegram: "https://t.me/geratsolutions",
    whatsapp: "https://wa.me/251929298030",
    linkedin: "https://linkedin.com/company/gerat",
  },
  {
    id: "dawit-teklebrhan",
    name: "DAWIT TEKLEBRHAN",
    role: "CHIEF TECHNOLOGY OFFICER",
    responsibility: "Systems Architecture & Digital Platforms",
    bio: "Leads engineering and technical architecture, focusing on reliable digital products, intelligent tools, and business systems.",
    image: "/image/team/leadership/Dawit.jpeg",
    email: "dawit@gerat.com",
    twitter: "https://x.com/geratsolutions",
    telegram: "https://t.me/geratsolutions",
    whatsapp: "https://wa.me/251929298030",
    linkedin: "https://linkedin.com/company/gerat",
  },
  {
    id: "yohannes-tadesse",
    name: "YOHANNES TADESSE",
    role: "HEAD OF ARTIFICIAL INTELLIGENCE",
    responsibility: "Applied AI, Knowledge Systems & Automation",
    bio: "Guides applied artificial intelligence and data systems, building practical tools that make information accessible and actionable.",
    image: "/image/team/leadership/Nisiha.jpeg",
    email: "yohannes@gerat.com",
    twitter: "https://x.com/geratsolutions",
    telegram: "https://t.me/geratsolutions",
    whatsapp: "https://wa.me/251929298030",
    linkedin: "https://linkedin.com/company/gerat",
  },
  {
    id: "solomon-kassahun",
    name: "SOLOMON KASSAHUN",
    role: "HEAD OF ENTERPRISE ENGINEERING",
    responsibility: "Business Systems, Cloud & Integrations",
    bio: "Oversees business platforms, operations engineering, and secure system integrations that keep company workflows running smoothly.",
    image: "/image/team/leadership/hosea.jpeg",
    email: "solomon@gerat.com",
    twitter: "https://x.com/geratsolutions",
    telegram: "https://t.me/geratsolutions",
    whatsapp: "https://wa.me/251929298030",
    linkedin: "https://linkedin.com/company/gerat",
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
      email: leader.email || fallback.email,
      twitter: leader.twitterUrl || leader.twitter || fallback.twitter,
      telegram: leader.telegramUrl || leader.telegram || fallback.telegram,
      whatsapp: leader.whatsappUrl || leader.whatsapp || fallback.whatsapp,
      linkedin: leader.linkedinUrl || leader.linkedin || fallback.linkedin,
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
        <div className="max-w-2xl flex flex-col gap-3.5 mb-12 sm:mb-16 pb-6 border-b border-white/10">
          <SectionLabel label="THE FOUNDERS" />
          <div className="space-y-1 sm:space-y-1.5">
            <SplitText
              text="FIVE FOUNDERS."
              as="h2"
              delay={0.1}
              stagger={0.035}
              className="font-parkinsans text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight uppercase leading-[1.08] text-white"
            />
            <SplitText
              text="ONE VISION."
              as="div"
              delay={0.25}
              stagger={0.035}
              wordClassName="text-accent"
              className="font-parkinsans text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight uppercase leading-[1.08]"
            />
          </div>

          <FadeUp delay={0.35} y={16}>
            <div className="space-y-2 max-w-xl">
              <p className="font-artific text-sm sm:text-base text-white/80 leading-relaxed">
                Five founders came together uniting leadership across brand strategy, digital experiences, enterprise systems, and applied AI—building Gerät for long-term impact.
              </p>
              <p className="font-artific text-xs uppercase tracking-[0.15em] text-accent font-medium">
                Multidisciplinary craft. Shared ownership. One company we are building together.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* 5 Founder Detailed Profiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                </div>

                {/* Body Details */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow gap-4">
                  <div className="space-y-1.5">
                    <h3 className="font-parkinsans text-lg sm:text-xl font-semibold uppercase tracking-tight text-white group-hover:text-accent transition-colors duration-200">
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

                  {/* Direct Contact Methods */}
                  <div className="flex items-center gap-2 pt-4 border-t border-white/10 mt-auto">
                    {founder.email && (
                      <a
                        href={`mailto:${founder.email}`}
                        aria-label={`Email ${founder.name}`}
                        className="size-8 rounded-full bg-white/10 hover:bg-accent text-white flex items-center justify-center transition-all duration-200"
                        title="Email"
                      >
                        <Mail className="size-3.5" />
                      </a>
                    )}
                    {founder.telegram && (
                      <a
                        href={founder.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${founder.name} on Telegram`}
                        className="size-8 rounded-full bg-white/10 hover:bg-accent text-white flex items-center justify-center transition-all duration-200"
                        title="Telegram"
                      >
                        <TelegramIcon className="size-3.5" />
                      </a>
                    )}
                    {founder.whatsapp && (
                      <a
                        href={founder.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${founder.name} on WhatsApp`}
                        className="size-8 rounded-full bg-white/10 hover:bg-accent text-white flex items-center justify-center transition-all duration-200"
                        title="WhatsApp"
                      >
                        <WhatsAppIcon className="size-3.5" />
                      </a>
                    )}
                    {founder.twitter && (
                      <a
                        href={founder.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${founder.name} on X`}
                        className="size-8 rounded-full bg-white/10 hover:bg-accent text-white flex items-center justify-center transition-all duration-200"
                        title="X (Twitter)"
                      >
                        <XIcon className="size-3" />
                      </a>
                    )}
                    {founder.linkedin && (
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${founder.name} on LinkedIn`}
                        className="size-8 rounded-full bg-white/10 hover:bg-accent text-white flex items-center justify-center transition-all duration-200"
                        title="LinkedIn"
                      >
                        <LinkedinIcon className="size-3.5" />
                      </a>
                    )}
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
