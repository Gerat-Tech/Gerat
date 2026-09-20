"use client";

import React, { useState } from "react";
import Link from "next/link";
import SectionLabel from "@/components/common/SectionLabel";
import FadeUp from "@/components/motion/FadeUp";
import SplitText from "@/components/motion/SplitText";
import Footer from "@/components/layout/Footer";
import { useNav } from "@/context/NavContext";
import {
  Globe,
  Smartphone,
  LayoutDashboard,
  Code2,
  ShoppingCart,
  FileText,
  Zap,
  Layers,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

const DIGITAL_DISCIPLINES = [
  {
    num: "01",
    title: "HIGH-PERFORMANCE CORPORATE WEBSITES",
    longDesc:
      "Modern, responsive corporate websites engineered with Next.js, sub-second load speeds, and editorial typography that positions your brand as an industry authority.",
    deliverables: [
      "Custom Responsive Desktop & Mobile Layouts",
      "Sub-Second Page Load Speeds & Edge CDN Caching",
      "Core Web Vitals Optimization (95+ Lighthouse)",
      "Technical SEO Architecture & Social Metadata",
    ],
    cta: "START WEBSITE PROJECT",
    icon: Globe,
  },
  {
    num: "02",
    title: "CUSTOM SAAS & WEB APPLICATIONS",
    longDesc:
      "Scalable web applications built with modern React, type-safe API backends, and responsive touch interfaces designed to handle high concurrency with zero lag.",
    deliverables: [
      "Modular Frontend Component Architecture",
      "Role-Based Access Control (RBAC) & Sessions",
      "Interactive Real-Time Client Dashboards",
      "Scalable Database Schema & REST/GraphQL APIs",
    ],
    cta: "BUILD WEB APPLICATION",
    icon: Code2,
  },
  {
    num: "03",
    title: "CUSTOMER PORTALS & CLIENT DASHBOARDS",
    longDesc:
      "Secure, private self-serve hubs allowing your clients to view real-time account data, track orders, manage billing, and submit requests without support bottlenecks.",
    deliverables: [
      "Two-Factor Authentication & Encrypted Sessions",
      "Live Operational Status Telemetry",
      "Automated Report & PDF Invoice Generation",
      "Self-Serve User & Profile Management",
    ],
    cta: "DEPLOY CLIENT PORTAL",
    icon: LayoutDashboard,
  },
  {
    num: "04",
    title: "MOBILE-FIRST & NATIVE-FEEL INTERFACES",
    longDesc:
      "Ergonomic web interfaces crafted specifically for mobile viewports, featuring thumb-zone navigation, bottom drawers, and fluid 60fps gesture interactions.",
    deliverables: [
      "Thumb-Zone Ergonomic Navigation Layouts",
      "48px Minimum Touch Target Compliance",
      "Offline Progressive Web App (PWA) Caching",
      "Hardware-Accelerated Fluid Micro-Interactions",
    ],
    cta: "DESIGN MOBILE INTERFACE",
    icon: Smartphone,
  },
  {
    num: "05",
    title: "E-COMMERCE & TRANSACTION PLATFORMS",
    longDesc:
      "Frictionless purchasing flows, automated payment gateway integrations, and real-time inventory management designed to maximize conversion rates.",
    deliverables: [
      "Seamless Checkout & Multi-Currency Gateways",
      "Automated Order Processing & Webhooks",
      "Real-Time Stock Availability Syncing",
      "Customer Cart Retention & Recovery Workflows",
    ],
    cta: "LAUNCH COMMERCE PLATFORM",
    icon: ShoppingCart,
  },
  {
    num: "06",
    title: "CMS & SELF-SERVE PUBLISHING SYSTEMS",
    longDesc:
      "Intuitive editorial consoles that give non-technical marketing and leadership teams total freedom to publish blogs, update case studies, and modify copy in seconds.",
    deliverables: [
      "Custom Headless CMS Architecture",
      "Visual Markdown & Rich-Text Editors",
      "Scheduled Publishing & Preview Environments",
      "Granular Author & Editor Role Permissions",
    ],
    cta: "CONFIGURE EDITORIAL CMS",
    icon: FileText,
  },
];

const STANDARDS = [
  {
    icon: Zap,
    title: "SUB-SECOND LOAD SPEEDS",
    desc: "Global edge CDN distribution, asset minification, and automatic modern image compression (AVIF/WebP) ensure instant page transitions.",
  },
  {
    icon: Layers,
    title: "MODULAR COMPONENT ARCHITECTURE",
    desc: "Built with clean Next.js and Tailwind CSS token systems. Fully extensible, maintainable code with zero unnecessary third-party dependencies.",
  },
  {
    icon: ShieldCheck,
    title: "ACCESSIBILITY & SEMANTIC STANDARDS",
    desc: "Strict adherence to WCAG 2.1 AA guidelines, high-contrast typography palettes, keyboard navigability, and screen-reader semantics.",
  },
  {
    icon: BarChart3,
    title: "INTEGRATED ANALYTICS & VISIBILITY",
    desc: "Privacy-first event tracking, Core Web Vitals monitoring, structured schema.org microdata, and search engine crawler optimizations.",
  },
];

const FAQ_ITEMS = [
  {
    q: "How long does a typical website or web application take to build?",
    a: "Corporate marketing websites typically launch in 3 to 6 weeks. Complex custom web applications and client portals typically span 8 to 14 weeks, delivered in transparent 2-week milestone sprints.",
  },
  {
    q: "Will our internal team be able to update content without writing code?",
    a: "Yes. Every website we build includes an intuitive administrative cockpit and CMS controls that allow non-technical team members to edit text, upload media, publish articles, and update case studies effortlessly.",
  },
  {
    q: "Do we own the full source code and digital infrastructure?",
    a: "100%. Upon project completion, all Git repositories, deployment scripts, design tokens, and intellectual property are permanently transferred directly to your organization.",
  },
  {
    q: "How do you ensure the site performs well on mobile networks?",
    a: "We engineer mobile-first with static pre-rendering, responsive image breakpoints, minimal JavaScript payloads, and touch-target optimization for 375px+ displays.",
  },
];

export default function DigitalExperiencesPage() {
  const { openContact } = useNav();
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="bg-[var(--bg)] min-h-screen text-[var(--text-primary)] selection:bg-accent selection:text-black">
      {/* Hero Section */}
      <section className="relative w-full max-w-[1440px] mx-auto pt-36 sm:pt-44 pb-20 px-4 sm:px-6 md:px-8 lg:px-10 border-b border-white/10">
        <div className="flex flex-col gap-6 max-w-4xl">
          <SectionLabel index="01" label="DIGITAL EXPERIENCES" />

          <div className="space-y-2">
            <SplitText
              text="EXPERIENCES THAT CONVERT."
              as="h1"
              className="font-artific text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight uppercase leading-[0.92]"
            />
            <SplitText
              text="PRODUCTS THAT"
              as="div"
              className="font-artific text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight uppercase leading-[0.92]"
            />
            <SplitText
              text="SCALE TO MILLIONS."
              as="div"
              wordClassName="text-accent"
              className="font-artific text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight uppercase leading-[0.92]"
            />
          </div>

          <FadeUp delay={0.3} y={16}>
            <p className="font-parkinsans text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
              We design and engineer responsive websites, client portals, and web applications that make your business easier to discover, understand, and use.
            </p>
          </FadeUp>

          <FadeUp delay={0.4} y={16}>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => openContact({ discipline: "digital", subOption: "Website" })}
                className="inline-flex items-center font-parkinsans text-[11px] uppercase tracking-[0.2em] px-8 py-4 bg-accent text-white font-bold hover:bg-white hover:text-black transition-all rounded-[2px]"
              >
                <span>START YOUR DIGITAL PROJECT</span>
                <span className="ml-2">→</span>
              </button>

              <Link
                href="/portfolio?category=ALL+DISCIPLINES"
                className="inline-flex items-center font-parkinsans text-[11px] uppercase tracking-[0.2em] px-8 py-4 border border-white/20 bg-transparent text-white hover:border-white transition-all rounded-[2px]"
              >
                <span>VIEW WORK</span>
              </Link>
            </div>
          </FadeUp>
        </div>

        <div className="mt-16 pt-4 border-t border-white/10 flex items-center justify-between font-parkinsans text-[10px] tracking-[0.2em] text-white/40 uppercase">
          <span>SERVICES · DIGITAL EXPERIENCES</span>
          <span>EXPLORE DISCIPLINES ↓</span>
        </div>
      </section>

      {/* 6 Core Disciplines Section */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-14 sm:py-18 md:py-20 border-b border-white/10">
        <div className="flex flex-col gap-4 mb-10 sm:mb-12">
          <span className="font-parkinsans text-[10px] tracking-[0.25em] text-accent uppercase">
            CAPABILITY CATALOG
          </span>
          <h2 className="font-artific text-3xl sm:text-5xl font-medium tracking-tight uppercase">
            DIGITAL SOLUTIONS THAT DELIVER.
          </h2>
          <p className="font-parkinsans text-sm sm:text-base text-white/60 max-w-2xl">
            From high-conversion corporate web platforms to bespoke SaaS architectures, we build software that turns visitors into clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DIGITAL_DISCIPLINES.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <FadeUp key={item.title} delay={0.08 * idx} y={24}>
                <div className="group relative bg-[var(--surface)] border border-white/10 hover:border-accent/80 p-8 rounded-[2px] flex flex-col justify-between min-h-[420px] transition-all duration-300 h-full">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <span className="font-parkinsans text-[10px] tracking-[0.2em] text-accent font-bold">
                        DISCIPLINE
                      </span>
                      <IconComp className="size-4 text-white/40 group-hover:text-accent transition-colors" />
                    </div>

                    <h3 className="font-artific text-2xl font-medium tracking-tight uppercase text-white mt-5 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>

                    <p className="font-parkinsans text-xs sm:text-sm text-white/70 leading-relaxed mt-2">
                      {item.longDesc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 mt-6">
                    <span className="font-parkinsans text-[9px] tracking-[0.2em] text-white/40 uppercase block mb-3 font-semibold">
                      CORE DELIVERABLES
                    </span>
                    <ul className="space-y-1.5 font-parkinsans text-[10px] tracking-[0.1em] text-white/60">
                      {item.deliverables.map((del) => (
                        <li key={del} className="flex items-center gap-2">
                          <span className="text-accent">•</span>
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() =>
                          openContact({
                            discipline: "digital",
                            subOption: item.title.includes("PORTAL")
                              ? "Customer Portal"
                              : item.title.includes("APPLICATION")
                              ? "Web Application"
                              : item.title.includes("WEBSITE")
                              ? "Website"
                              : "Digital Product",
                          })
                        }
                        className="font-parkinsans text-[10px] tracking-[0.2em] text-accent hover:text-white uppercase transition-colors"
                      >
                        {item.cta} →
                      </button>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* Production Standards Matrix */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-24 sm:py-32 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <SectionLabel index="02" label="ENGINEERING PRINCIPLES" />
            <h2 className="font-artific text-3xl sm:text-5xl font-medium tracking-tight uppercase leading-[1.05]">
              ZERO COMPROMISE. <br />
              <span className="text-accent">BUILT FOR REAL SPEED.</span>
            </h2>
            <p className="font-parkinsans text-sm sm:text-base text-white/70 leading-relaxed">
              We never use heavy page builders or fragile template kits. Every digital experience is custom-coded with clean React components, semantic HTML, and rigorous performance budgets.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 font-parkinsans text-[10px]">
            {STANDARDS.map((std) => {
              const IconComp = std.icon;
              return (
                <div
                  key={std.title}
                  className="p-6 bg-[var(--surface)] border border-white/10 rounded-[2px] flex flex-col gap-3"
                >
                  <IconComp className="size-5 text-accent" />
                  <span className="tracking-[0.2em] text-white font-bold uppercase">
                    {std.title}
                  </span>
                  <p className="text-white/60 leading-relaxed font-parkinsans text-xs">
                    {std.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div className="text-center flex flex-col items-center gap-3">
            <span className="font-parkinsans text-[10px] tracking-[0.25em] text-accent uppercase">
              OPERATIONAL CLARITY
            </span>
            <h2 className="font-artific text-3xl sm:text-5xl font-medium tracking-tight uppercase">
              FREQUENTLY ASKED QUESTIONS.
            </h2>
          </div>

          <div className="space-y-4 pt-6">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="border border-white/10 bg-[var(--surface)] p-6 rounded-[2px] transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-artific text-lg font-medium uppercase text-white hover:text-accent transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="font-parkinsans text-xs text-accent ml-4">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="font-parkinsans text-sm text-white/70 leading-relaxed mt-4 pt-4 border-t border-white/10">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Master Footer */}
      <Footer />
    </div>
  );
}
