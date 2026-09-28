"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";
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
    specialty: "Strategy, Brand Positioning & Growth",
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
    specialty: "Operations, Execution & Client Delivery",
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
    specialty: "Systems Architecture & Digital Platforms",
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
    specialty: "Applied AI, Knowledge Systems & Automation",
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
    specialty: "Business Systems, Cloud & Integrations",
    image: "/image/team/leadership/hosea.jpeg",
    email: "solomon@gerat.com",
    twitter: "https://x.com/geratsolutions",
    telegram: "https://t.me/geratsolutions",
    whatsapp: "https://wa.me/251929298030",
    linkedin: "https://linkedin.com/company/gerat",
  },
];

/**
 * Section: THE TEAM (OUR LEADERSHIP)
 *
 * Grounded in pure White (#FFFFFF) canvas with Almond (#F1DFD9) cards:
 * - Background: Solid pure White (#FFFFFF)
 * - Section label: High-contrast eyebrow pill in brand Almond (#F1DFD9)
 * - Action button: MEET THE TEAM (links to /about#founders)
 * - Cards: Warm Almond (#F1DFD9) with crisp borders (#300F0A/12)
 * - Direct contact methods for every team member (Email, Telegram, WhatsApp, X, LinkedIn)
 * - Multidisciplinary representation across all 4 services (Brand, Digital, Systems, AI)
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
      aria-label="The Team"
      className="w-full bg-[#FAF6ED] text-[#300F0A] relative scroll-mt-24 border-t border-[#300F0A]/10"
      style={{ backgroundColor: "#FAF6ED" }}
    >
      <span id="leadership" className="sr-only" />
      <span id="about" className="sr-only" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-14 sm:pt-20 pb-20 sm:pb-28">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 pb-6 border-b border-[#300F0A]/12">
          <div className="flex flex-col gap-3.5 max-w-2xl">
            {/* High-Contrast Almond Eyebrow Badge Pill (No dot) */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#F1DFD9] border border-[#300F0A]/15 shadow-xs w-fit">
              <span className="font-parkinsans text-xs tracking-[0.2em] uppercase font-bold text-[#300F0A]">
                The Team
              </span>
            </div>

            <div className="space-y-1 sm:space-y-1.5">
              <SplitText
                text="FIVE FOUNDERS."
                as="h2"
                delay={0.1}
                stagger={0.035}
                className="font-parkinsans text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight uppercase leading-[1.08] text-[#300F0A]"
              />
              <SplitText
                text="ONE DIRECTION."
                as="div"
                delay={0.25}
                stagger={0.035}
                wordClassName="text-accent"
                className="font-parkinsans text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight uppercase leading-[1.08]"
              />
            </div>
            <FadeUp delay={0.35} y={16}>
              <p className="font-artific text-sm sm:text-base text-[#300F0A]/80 leading-relaxed mt-1 max-w-lg">
                Gerät was founded by five partners uniting leadership across brand strategy, digital experiences, enterprise systems, and applied intelligence—delivering comprehensive multidisciplinary craft to every client engagement.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.35} y={16}>
            <Link
              href="/about#founders"
              className="group inline-flex items-center gap-2 font-parkinsans text-xs uppercase tracking-[0.18em] px-6 py-3.5 bg-[#300F0A] hover:bg-accent text-[#F1DFD9] hover:text-white font-bold rounded-full shadow-md hover:shadow-accent/25 transition-all duration-300"
            >
              <span>MEET THE TEAM</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </FadeUp>
        </div>

        {/* 5-Person Composition Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {founders.map((founder, idx) => (
            <FadeUp key={founder.id} delay={0.1 + idx * 0.08} y={20}>
              <div className="group relative flex flex-col justify-between rounded-2xl border border-[#300F0A]/12 bg-[#F1DFD9] overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-[0_16px_36px_rgba(48,15,10,0.12)] hover:-translate-y-1 h-full">
                {/* Founder Photo */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#300F0A]/5">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F1DFD9] via-transparent to-transparent opacity-90" />
                </div>

                {/* Founder Details */}
                <div className="p-5 flex flex-col justify-between flex-grow gap-2.5">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-parkinsans text-base font-semibold uppercase tracking-tight text-[#300F0A] group-hover:text-accent transition-colors duration-200">
                      {founder.name}
                    </h3>
                    <div className="font-artific text-xs uppercase tracking-wider text-accent font-bold line-clamp-1">
                      {founder.role}
                    </div>
                    <div className="font-artific text-xs text-[#300F0A]/80 pt-2 border-t border-[#300F0A]/12 line-clamp-2">
                      {founder.specialty}
                    </div>
                  </div>

                  {/* Direct Contact Methods */}
                  <div className="flex items-center gap-1.5 pt-3 border-t border-[#300F0A]/12 mt-auto">
                    {founder.email && (
                      <a
                        href={`mailto:${founder.email}`}
                        aria-label={`Email ${founder.name}`}
                        className="size-7 rounded-full bg-white/80 hover:bg-accent text-[#300F0A] hover:text-white border border-[#300F0A]/10 flex items-center justify-center transition-all duration-200 shadow-2xs"
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
                        className="size-7 rounded-full bg-white/80 hover:bg-accent text-[#300F0A] hover:text-white border border-[#300F0A]/10 flex items-center justify-center transition-all duration-200 shadow-2xs"
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
                        className="size-7 rounded-full bg-white/80 hover:bg-accent text-[#300F0A] hover:text-white border border-[#300F0A]/10 flex items-center justify-center transition-all duration-200 shadow-2xs"
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
                        className="size-7 rounded-full bg-white/80 hover:bg-accent text-[#300F0A] hover:text-white border border-[#300F0A]/10 flex items-center justify-center transition-all duration-200 shadow-2xs"
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
                        className="size-7 rounded-full bg-white/80 hover:bg-accent text-[#300F0A] hover:text-white border border-[#300F0A]/10 flex items-center justify-center transition-all duration-200 shadow-2xs"
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
