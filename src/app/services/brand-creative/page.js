"use client";

import React, { useState } from "react";
import Link from "next/link";
import SectionLabel from "@/components/common/SectionLabel";
import FadeUp from "@/components/motion/FadeUp";
import SplitText from "@/components/motion/SplitText";
import Footer from "@/components/layout/Footer";
import { useNav } from "@/context/NavContext";
import { brandCreativeFamily } from "@/content";
import { Flame, CheckCircle2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// =============================================================================
// TRANSFORMATION STORY ENGINE DATA
// =============================================================================
const TRANSFORMATION_STAGES = [
  {
    id: "positioning",
    num: "01",
    tagline: "STRATEGIC POSITIONING",
    title: "Finding The Uncontested Angle",
    summary:
      "Before sketching a single concept, we rigorously interrogate your market, customers, and unit economics to find an authentic, defensible position.",
    before:
      "“We do everything for everyone” — generic copy, prolonged sales cycles, and pricing pressure from undifferentiated competitors.",
    after:
      "Laser-focused value thesis, high emotional resonance with tier-one buyers, and commanding pricing leverage.",
    deliverables: [
      "Brand Value Thesis & Narrative Architecture",
      "Competitive Differentiation Blueprint",
      "Ideal Client Archetypes & Persona Profiles",
      "Executive Elevator Statements & Core Pitch",
    ],
    impact: "Eliminates messaging confusion across investor pitches, sales meetings, and hiring.",
    ctaPreset: { discipline: "brand", subOption: "BRAND STRATEGY" },
  },
  {
    id: "visual-identity",
    num: "02",
    tagline: "VISUAL ARCHITECTURE",
    title: "The Unmistakable Visual Anchor",
    summary:
      "Crafting an indelible visual language engineered with mathematical balance, distinct silhouettes, and intentional color psychology that commands immediate recall.",
    before:
      "Stock template icons, conflicting fonts, uncoordinated colors across screens, print, and presentations.",
    after:
      "Bespoke geometric logomark, harmonious typographic hierarchy, and standardized dark/light color systems.",
    deliverables: [
      "Master Primary & Secondary Logomark Suite",
      "Mathematical Construction Grids & Clear Space",
      "Primary, Secondary & Neutral Color Systems",
      "Typographic Hierarchy & Licensing Framework",
    ],
    impact: "Builds instant, cumulative brand recognition and enterprise credibility across all touchpoints.",
    ctaPreset: { discipline: "brand", subOption: "LOGO & BRAND IDENTITY" },
  },
  {
    id: "digital-bridge",
    num: "03",
    tagline: "DIGITAL INTERFACE BRIDGES",
    title: "Bridging Identity Directly To Code",
    summary:
      "Most agency brands die inside a static PDF. We translate identity rules directly into living design tokens, React components, and responsive digital products.",
    before:
      "Jarring disconnect between branding PDFs and actual software; clunky UI, sluggish load times, and endless design debt.",
    after:
      "Direct code parity: unified CSS/Tailwind variables, accessible contrast ratios (WCAG AA), and 60fps micro-interactions.",
    deliverables: [
      "CSS & Tailwind Design Token Architecture",
      "Figma UI Primitives & Web Component Kit",
      "High-DPI App Icons, Favicons & Vector Web Assets",
      "Micro-Interaction & Motion Guidelines",
    ],
    impact: "Accelerates frontend engineering velocity by up to 40% with zero visual translation loss.",
    ctaPreset: { discipline: "brand", subOption: "GRAPHIC DESIGN" },
  },
  {
    id: "market-longevity",
    num: "04",
    tagline: "SUSTAINED AUTHORITY",
    title: "Flawless Execution Everywhere",
    summary:
      "Equipping your teams with turnkey marketing collateral, investor presentations, and clear operational governance so your brand stays world-class forever.",
    before:
      "Scattered Google Slides, ad-hoc social graphics, and inconsistent sales decks that dilute enterprise trust.",
    after:
      "Cohesive investor pitch decks, turnkey sales collateral, and a definitive brand manual anyone on your team can execute.",
    deliverables: [
      "Institutional Pitch Deck & Keynote Templates",
      "Executive Stationery & Digital Letterhead",
      "Multi-Platform Social Media Grid Systems",
      "Comprehensive Brand Governance Manual (PDF/Web)",
    ],
    impact: "Empowers internal teams and external partners to produce on-brand work without micro-management.",
    ctaPreset: { discipline: "brand", subOption: "PERSONAL BRANDING" },
  },
];

// =============================================================================
// BESPOKE SVG SCHEMATICS
// =============================================================================

function PositioningRadarSchematic() {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center p-4">
      <svg viewBox="0 0 400 320" className="w-full h-full max-h-[320px]" fill="none">
        <defs>
          <pattern id="posGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[var(--text-primary)] opacity-5" />
          </pattern>
        </defs>
        <rect width="400" height="320" fill="url(#posGrid)" />

        <circle cx="200" cy="160" r="130" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-[var(--text-primary)] opacity-15" />
        <circle cx="200" cy="160" r="95" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-[var(--text-primary)] opacity-25" />
        <circle cx="200" cy="160" r="60" stroke="currentColor" strokeWidth="1" className="text-[var(--text-primary)] opacity-30" />
        <circle cx="200" cy="160" r="25" stroke="currentColor" strokeWidth="1" className="text-[var(--text-primary)] opacity-40" />

        <line x1="20" y1="160" x2="380" y2="160" stroke="currentColor" strokeWidth="1" className="text-[var(--text-primary)] opacity-20" />
        <line x1="200" y1="20" x2="200" y2="300" stroke="currentColor" strokeWidth="1" className="text-[var(--text-primary)] opacity-20" />

        <text x="32" y="152" fill="currentColor" className="text-[var(--text-muted)] text-[8px] font-parkinsans tracking-widest uppercase">COMMODITY</text>
        <text x="300" y="152" fill="currentColor" className="text-[var(--text-muted)] text-[8px] font-parkinsans tracking-widest uppercase">DIFFERENTIATED</text>
        <text x="206" y="32" fill="currentColor" className="text-[var(--text-muted)] text-[8px] font-parkinsans tracking-widest uppercase">HIGH LEVERAGE</text>
        <text x="206" y="295" fill="currentColor" className="text-[var(--text-muted)] text-[8px] font-parkinsans tracking-widest uppercase">PRICE TAKER</text>

        <g opacity="0.4">
          <circle cx="110" cy="210" r="4" fill="currentColor" className="text-[var(--text-muted)]" />
          <circle cx="125" cy="225" r="3" fill="currentColor" className="text-[var(--text-muted)]" />
          <circle cx="95" cy="235" r="3.5" fill="currentColor" className="text-[var(--text-muted)]" />
          <circle cx="140" cy="215" r="3" fill="currentColor" className="text-[var(--text-muted)]" />
          <circle cx="120" cy="245" r="2.5" fill="currentColor" className="text-[var(--text-muted)]" />
          <text x="75" y="260" fill="currentColor" className="text-[var(--text-dim)] text-[8px] font-parkinsans tracking-wider uppercase">MARKET NOISE</text>
        </g>

        <g>
          <circle cx="285" cy="85" r="28" stroke="#EA5B15" strokeWidth="1" strokeDasharray="3 3" opacity="0.6">
            <animate attributeName="r" values="20;32;20" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="285" cy="85" r="14" stroke="#EA5B15" strokeWidth="1.5" fill="#EA5B15" fillOpacity="0.15" />
          
          <path d="M 285 62 L 285 75 M 285 95 L 285 108 M 262 85 L 275 85 M 295 85 L 308 85" stroke="#EA5B15" strokeWidth="1.5" />
          <circle cx="285" cy="85" r="3.5" fill="#EA5B15" />

          <rect x="235" y="40" width="145" height="20" rx="2" fill="var(--surface-2)" stroke="#EA5B15" strokeWidth="1" />
          <text x="245" y="53" fill="#EA5B15" className="text-[8px] font-parkinsans font-bold tracking-widest uppercase">
            UNCONTESTED POSITION
          </text>
        </g>
      </svg>
    </div>
  );
}

function VisualArchitectureSchematic() {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center p-4">
      <svg viewBox="0 0 400 320" className="w-full h-full max-h-[320px]" fill="none">
        <defs>
          <pattern id="archGrid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[var(--text-primary)] opacity-5" />
          </pattern>
        </defs>
        <rect width="400" height="320" fill="url(#archGrid)" />

        <rect x="90" y="50" width="220" height="220" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-[var(--text-primary)] opacity-20" />
        <line x1="90" y1="50" x2="310" y2="270" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" className="text-[var(--text-primary)] opacity-15" />
        <line x1="310" y1="50" x2="90" y2="270" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" className="text-[var(--text-primary)] opacity-15" />

        <circle cx="200" cy="160" r="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-[var(--text-primary)] opacity-25" />
        <circle cx="200" cy="160" r="62" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-[var(--text-primary)] opacity-35" />
        <circle cx="200" cy="160" r="38" stroke="currentColor" strokeWidth="1" className="text-[var(--text-primary)] opacity-40" />

        <line x1="65" y1="50" x2="65" y2="270" stroke="#EA5B15" strokeWidth="1" opacity="0.7" />
        <line x1="60" y1="50" x2="70" y2="50" stroke="#EA5B15" strokeWidth="1" opacity="0.7" />
        <line x1="60" y1="270" x2="70" y2="270" stroke="#EA5B15" strokeWidth="1" opacity="0.7" />
        <text x="45" y="165" fill="#EA5B15" className="text-[8px] font-parkinsans tracking-widest uppercase font-bold" transform="rotate(-90 45 165)">
          CLEAR SPACE (X)
        </text>

        <path
          d="M200 80 C230 130 250 170 240 210 C230 245 200 255 180 235 C160 215 165 190 185 175 C195 165 200 150 195 130 C180 155 145 195 155 235 C165 270 210 275 235 250 C265 220 265 160 200 80 Z"
          fill="#EA5B15"
          fillOpacity="0.85"
          stroke="#EA5B15"
          strokeWidth="2"
        />

        <circle cx="200" cy="80" r="3" fill="var(--surface)" stroke="#EA5B15" strokeWidth="1.5" />
        <circle cx="240" cy="210" r="3" fill="var(--surface)" stroke="#EA5B15" strokeWidth="1.5" />
        <circle cx="180" cy="235" r="3" fill="var(--surface)" stroke="#EA5B15" strokeWidth="1.5" />
        <circle cx="155" cy="235" r="3" fill="var(--surface)" stroke="#EA5B15" strokeWidth="1.5" />

        <rect x="135" y="280" width="130" height="22" rx="2" fill="var(--surface-2)" stroke="var(--border-medium)" strokeWidth="1" />
        <text x="145" y="294" fill="currentColor" className="text-[8px] font-parkinsans tracking-widest text-[var(--text-primary)] font-bold uppercase">
          BEZIER PRECISION · 100%
        </text>
      </svg>
    </div>
  );
}

function DigitalInterfaceBridgeSchematic() {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center p-4">
      <svg viewBox="0 0 400 320" className="w-full h-full max-h-[320px]" fill="none">
        <g transform="translate(30, 40)">
          <rect width="100" height="90" rx="2" fill="var(--surface-2)" stroke="var(--border-medium)" strokeWidth="1" />
          <text x="10" y="20" fill="#EA5B15" className="text-[8px] font-parkinsans font-bold tracking-wider">TOKEN LAYER</text>
          <text x="10" y="38" fill="currentColor" className="text-[7px] font-parkinsans text-[var(--text-secondary)]">--flame: #EA5B15;</text>
          <text x="10" y="52" fill="currentColor" className="text-[7px] font-parkinsans text-[var(--text-secondary)]">--font: &apos;Artific&apos;;</text>
          <text x="10" y="66" fill="currentColor" className="text-[7px] font-parkinsans text-[var(--text-secondary)]">--radius: 2px;</text>
          <text x="10" y="80" fill="currentColor" className="text-[7px] font-parkinsans text-[var(--text-secondary)]">--contrast: 14.2:1;</text>
        </g>

        <path d="M 130 85 L 175 85 L 175 160 L 210 160" stroke="#EA5B15" strokeWidth="1.5" strokeDasharray="4 2" />
        <circle cx="170" cy="85" r="3" fill="#EA5B15">
          <animate attributeName="cx" values="130;210" dur="2s" repeatCount="indefinite" />
        </circle>

        <g transform="translate(210, 115)">
          <rect width="160" height="90" rx="2" fill="var(--surface-2)" stroke="#EA5B15" strokeWidth="1" />
          <text x="12" y="22" fill="#EA5B15" className="text-[8px] font-parkinsans font-bold tracking-wider">REACT PRIMITIVE</text>
          <text x="12" y="38" fill="currentColor" className="text-[7px] font-parkinsans text-[var(--text-secondary)]">&lt;Button variant=&quot;flame&quot;&gt;</text>
          <rect x="12" y="48" width="136" height="26" rx="2" fill="#EA5B15" />
          <text x="32" y="64" fill="#FFFFFF" className="text-[8px] font-parkinsans font-bold tracking-widest uppercase">
            ENTERPRISE CTA →
          </text>
        </g>

        <path d="M 290 205 L 290 230 L 130 230 L 130 250" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="text-[var(--text-primary)] opacity-25" />

        <g transform="translate(50, 240)">
          <rect width="300" height="55" rx="2" fill="var(--surface-3)" stroke="var(--border-medium)" strokeWidth="1" />
          <circle cx="12" cy="12" r="3" fill="currentColor" className="text-[var(--text-muted)] opacity-50" />
          <circle cx="20" cy="12" r="3" fill="currentColor" className="text-[var(--text-muted)] opacity-50" />
          <circle cx="28" cy="12" r="3" fill="currentColor" className="text-[var(--text-muted)] opacity-50" />
          <text x="40" y="15" fill="currentColor" className="text-[8px] font-parkinsans text-[var(--text-muted)]">https://app.client.com</text>
          
          <rect x="40" y="24" width="80" height="20" rx="2" fill="var(--surface)" />
          <rect x="130" y="24" width="140" height="20" rx="2" fill="#EA5B15" fillOpacity="0.2" stroke="#EA5B15" strokeWidth="0.5" />
          <text x="145" y="37" fill="#EA5B15" className="text-[7px] font-parkinsans font-bold tracking-wider">WCAG AA · 60 FPS RENDER</text>
        </g>
      </svg>
    </div>
  );
}

function MarketAuthorityConstellationSchematic() {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center p-4">
      <svg viewBox="0 0 400 320" className="w-full h-full max-h-[320px]" fill="none">
        <circle cx="200" cy="160" r="110" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-[var(--text-primary)] opacity-20" />
        <circle cx="200" cy="160" r="60" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-[var(--text-primary)] opacity-30" />

        <circle cx="200" cy="160" r="28" fill="#EA5B15" fillOpacity="0.15" stroke="#EA5B15" strokeWidth="1.5" />
        <circle cx="200" cy="160" r="12" fill="#EA5B15" />
        <text x="200" y="185" textAnchor="middle" fill="#EA5B15" className="text-[7px] font-parkinsans font-bold tracking-widest uppercase">
          BRAND CORE
        </text>

        <line x1="200" y1="160" x2="200" y2="50" stroke="#EA5B15" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.6" />
        <g transform="translate(140, 32)">
          <rect width="120" height="24" rx="2" fill="var(--surface-2)" stroke="var(--border-medium)" strokeWidth="1" />
          <text x="10" y="16" fill="currentColor" className="text-[8px] font-parkinsans text-[var(--text-primary)] font-bold uppercase">
            PITCH DECKS & KEYNOTES
          </text>
        </g>

        <line x1="200" y1="160" x2="310" y2="120" stroke="#EA5B15" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.6" />
        <g transform="translate(305, 108)">
          <rect width="85" height="24" rx="2" fill="var(--surface-2)" stroke="var(--border-medium)" strokeWidth="1" />
          <text x="8" y="16" fill="currentColor" className="text-[8px] font-parkinsans text-[var(--text-primary)] font-bold uppercase">
            WEB & APPS
          </text>
        </g>

        <line x1="200" y1="160" x2="290" y2="245" stroke="#EA5B15" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.6" />
        <g transform="translate(265, 235)">
          <rect width="115" height="24" rx="2" fill="var(--surface-2)" stroke="var(--border-medium)" strokeWidth="1" />
          <text x="10" y="16" fill="currentColor" className="text-[8px] font-parkinsans text-[var(--text-primary)] font-bold uppercase">
            SOCIAL & CAMPAIGNS
          </text>
        </g>

        <line x1="200" y1="160" x2="110" y2="245" stroke="#EA5B15" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.6" />
        <g transform="translate(35, 235)">
          <rect width="125" height="24" rx="2" fill="var(--surface-2)" stroke="var(--border-medium)" strokeWidth="1" />
          <text x="10" y="16" fill="currentColor" className="text-[8px] font-parkinsans text-[var(--text-primary)] font-bold uppercase">
            STATIONERY & SIGNAGE
          </text>
        </g>

        <line x1="200" y1="160" x2="90" y2="120" stroke="#EA5B15" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.6" />
        <g transform="translate(15, 108)">
          <rect width="115" height="24" rx="2" fill="var(--surface-2)" stroke="#EA5B15" strokeWidth="1" />
          <text x="8" y="16" fill="#EA5B15" className="text-[8px] font-parkinsans font-bold uppercase">
            GOVERNANCE MANUAL
          </text>
        </g>
      </svg>
    </div>
  );
}

const FAQ_ITEMS = [
  {
    q: "Why is a logo not a brand?",
    a: "A logo is a single visual mark. A brand identity is the complete operational system around it — including color theory, typographic hierarchy, graphic layout rules, tone of voice, and physical/digital application guidelines that build cumulative enterprise trust over time.",
  },
  {
    q: "Do we receive full source files and intellectual property ownership?",
    a: "Yes. Upon project completion and final milestone clearance, all bespoke vector assets (SVG, EPS, Adobe Illustrator / Figma source packages) and full commercial intellectual property rights are permanently transferred to your company.",
  },
  {
    q: "How does brand design connect to web and software development?",
    a: "At Gerat, brand architects work directly alongside our frontend and software engineers. Design tokens, color spaces, and component geometries translate directly into CSS variables, Tailwind configurations, and production React components without translation loss.",
  },
  {
    q: "What is the typical timeline for an identity engagement?",
    a: "A foundational Logo & Brand Identity engagement typically spans 3 to 6 weeks, structured through iterative milestone sprints: Architectural Discovery, Conceptual Directions, System Refinement, and Final Production Asset Handoff.",
  },
];

export default function BrandCreativePage() {
  const { openContact } = useNav();
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  const activeStory = TRANSFORMATION_STAGES[activeStoryIdx];

  return (
    <div className="bg-[var(--bg)] min-h-screen text-[var(--text-primary)] selection:bg-accent selection:text-black">
      {/* Hero Section */}
      <section className="relative w-full max-w-[1440px] mx-auto pt-36 sm:pt-44 pb-20 px-4 sm:px-6 md:px-8 lg:px-10 border-b border-[var(--border-subtle)]">
        <div className="flex flex-col gap-6 max-w-4xl">
          <SectionLabel index="04" label="BRAND & CREATIVE" />

          <div className="space-y-2">
            <SplitText
              text="GIVE YOUR BUSINESS"
              as="h1"
              className="font-parkinsans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight uppercase leading-[0.92]"
            />
            <SplitText
              text="SOMETHING PEOPLE"
              as="div"
              className="font-parkinsans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight uppercase leading-[0.92]"
            />
            <SplitText
              text="CAN RECOGNIZE."
              as="div"
              wordClassName="text-accent"
              className="font-parkinsans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight uppercase leading-[0.92]"
            />
          </div>

          <FadeUp delay={0.3} y={16}>
            <p className="font-artific text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              We create brand identities and visual systems that make businesses clearer, more consistent, and easier to remember across every medium they touch.
            </p>
          </FadeUp>

          <FadeUp delay={0.4} y={16}>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={() =>
                  openContact({
                    discipline: "brand",
                    subOption: "LOGO & BRAND IDENTITY",
                  })
                }
                className="inline-flex items-center font-parkinsans text-[11px] uppercase tracking-[0.2em] px-8 py-4 bg-accent text-white font-bold hover:bg-[var(--text-primary)] hover:text-[var(--bg)] transition-all rounded-[2px]"
              >
                <span>BUILD YOUR BRAND</span>
                <span className="ml-2">→</span>
              </button>

              <Link
                href="/portfolio?category=BRAND+%26+IDENTITY"
                className="inline-flex items-center font-parkinsans text-[11px] uppercase tracking-[0.2em] px-8 py-4 border border-[var(--border-medium)] bg-transparent text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all rounded-[2px]"
              >
                <span>VIEW WORK</span>
              </Link>
            </div>
          </FadeUp>
        </div>

        <div className="mt-16 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between font-parkinsans text-[10px] tracking-[0.2em] text-[var(--text-dim)] uppercase">
          <span>SERVICES · BRAND & CREATIVE</span>
          <span>EXPLORE TRANSFORMATION ↓</span>
        </div>
      </section>

      {/* 6 Core Disciplines Section */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-14 sm:py-18 md:py-20 border-b border-[var(--border-subtle)]">
        <div className="flex flex-col gap-4 mb-10 sm:mb-12">
          <span className="font-parkinsans text-[10px] tracking-[0.25em] text-accent uppercase font-bold">
            DISCIPLINE CATALOG
          </span>
          <h2 className="font-parkinsans text-3xl sm:text-5xl font-semibold tracking-tight uppercase">
            THE CREATIVE SERVICE FAMILY.
          </h2>
          <p className="font-artific text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl">
            Thoughtful design capabilities engineered to give your business credibility, presence, and consistency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brandCreativeFamily.map((item, idx) => {
            const presetMap = {
              "brand-strategy": { discipline: "brand", subOption: "BRAND STRATEGY" },
              "logo-design": { discipline: "brand", subOption: "LOGO & BRAND IDENTITY" },
              "brand-identity": { discipline: "brand", subOption: "LOGO & BRAND IDENTITY" },
              "graphic-design": { discipline: "brand", subOption: "GRAPHIC DESIGN" },
              "social-design": { discipline: "brand", subOption: "SOCIAL & MARKETING DESIGN" },
              "personal-branding": { discipline: "brand", subOption: "PERSONAL BRANDING" },
            };
            const preset = presetMap[item.id] || { discipline: "brand" };

            return (
              <FadeUp key={item.id} delay={0.08 * idx} y={24}>
                <div className="group relative bg-[var(--surface)] border border-[var(--border-subtle)] hover:border-accent/80 p-8 rounded-[2px] flex flex-col justify-between min-h-[420px] transition-all duration-300 h-full">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                      <span className="font-parkinsans text-[10px] tracking-[0.2em] text-accent font-bold">
                        DISCIPLINE
                      </span>
                      <span className="font-parkinsans text-[9px] tracking-[0.2em] text-[var(--text-dim)] uppercase">
                        SPEC 2026
                      </span>
                    </div>

                    <h3 className="font-parkinsans text-2xl font-semibold tracking-tight uppercase text-[var(--text-primary)] mt-5 transition-colors">
                      {item.title}
                    </h3>

                    <p className="font-artific text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mt-2">
                      {item.longDesc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[var(--border-subtle)] mt-6">
                    <span className="font-parkinsans text-[9px] tracking-[0.2em] text-[var(--text-dim)] uppercase block mb-3 font-semibold">
                      CORE DELIVERABLES
                    </span>
                    <ul className="space-y-1.5 font-parkinsans text-[10px] tracking-[0.05em] text-[var(--text-secondary)]">
                      {item.deliverables.map((del) => (
                        <li key={del} className="flex items-center gap-2">
                          <span className="text-accent font-bold">•</span>
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
                      {item.id === "personal-branding" ? (
                        <Link
                          href="/services/personal-branding"
                          className="font-parkinsans text-[10px] tracking-[0.2em] text-accent hover:text-[var(--text-primary)] uppercase font-bold transition-colors inline-flex items-center gap-1"
                        >
                          EXPLORE PERSONAL BRANDING →
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => openContact(preset)}
                          className="font-parkinsans text-[10px] tracking-[0.2em] text-accent hover:text-[var(--text-primary)] uppercase font-bold transition-colors inline-flex items-center gap-1"
                        >
                          {item.cta} →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          BRAND TRANSFORMATION STORY ENGINE (REPLACES RIGID PACKAGE SECTION)
          Interactive narrative showing how we take a company from noise to authority
          ===================================================================== */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-24 sm:py-32 border-b border-[var(--border-subtle)]">
        <div className="flex flex-col gap-4 mb-16">
          <SectionLabel index="03" label="THE BRAND TRANSFORMATION" />
          <h2 className="font-parkinsans text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight uppercase leading-[0.98]">
            FROM NOISE TO <span className="text-accent">AUTHORITY.</span>
          </h2>
          <p className="font-artific text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            How we systematically transform ambitious enterprises from overlooked market noise into category-defining, recognized industry leaders.
          </p>
        </div>

        {/* Milestone Stage Switcher Rail */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {TRANSFORMATION_STAGES.map((stage, idx) => {
            const isActive = activeStoryIdx === idx;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStoryIdx(idx)}
                className={`relative text-left p-4 sm:p-5 rounded-[2px] border transition-all duration-300 min-h-[48px] ${
                  isActive
                    ? "bg-[var(--surface-2)] border-accent shadow-sm"
                    : "bg-[var(--surface)] border-[var(--border-subtle)] hover:border-[var(--border-medium)]"
                }`}
              >
                {isActive && (
                  <span className="absolute top-0 left-0 right-0 h-[2px] bg-accent" />
                )}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-parkinsans text-[10px] tracking-[0.2em] font-bold uppercase ${
                      isActive ? "text-accent" : "text-[var(--text-dim)]"
                    }`}
                  >
                    STAGE {stage.num}
                  </span>
                  {isActive && <Flame className="size-3.5 text-accent" />}
                </div>
                <div className="font-parkinsans text-sm sm:text-base font-semibold tracking-tight uppercase text-[var(--text-primary)]">
                  {stage.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Narrative & Interactive Visual Canvas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStory.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[var(--surface)] border border-[var(--border-subtle)] p-6 sm:p-8 lg:p-10 rounded-[2px]"
          >
            {/* Left Column: Narrative & Transformation Data */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="font-parkinsans text-[10px] tracking-[0.25em] text-accent uppercase font-bold block mb-2">
                  {activeStory.tagline}
                </span>
                <h3 className="font-parkinsans text-2xl sm:text-4xl font-semibold tracking-tight uppercase text-[var(--text-primary)] leading-tight">
                  {activeStory.title}
                </h3>
                <p className="font-artific text-sm text-[var(--text-secondary)] leading-relaxed mt-4">
                  {activeStory.summary}
                </p>

                {/* Before vs After Contrast Engine */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-[var(--border-subtle)]">
                  <div className="p-4 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-[2px]">
                    <span className="font-parkinsans text-[9px] tracking-[0.2em] text-[var(--text-dim)] uppercase block mb-1.5 font-bold">
                      BEFORE TRANSFORMATION
                    </span>
                    <p className="font-artific text-xs text-[var(--text-secondary)] leading-relaxed">
                      {activeStory.before}
                    </p>
                  </div>

                  <div className="p-4 bg-[var(--surface-2)] border border-accent/40 rounded-[2px]">
                    <span className="font-parkinsans text-[9px] tracking-[0.2em] text-accent uppercase block mb-1.5 font-bold">
                      AFTER TRANSFORMATION
                    </span>
                    <p className="font-artific text-xs text-[var(--text-primary)] leading-relaxed font-medium">
                      {activeStory.after}
                    </p>
                  </div>
                </div>

                {/* Deliverables Checklist */}
                <div className="mt-6 pt-6 border-t border-[var(--border-subtle)]">
                  <span className="font-parkinsans text-[9px] tracking-[0.2em] text-[var(--text-dim)] uppercase block mb-3 font-semibold">
                    KEY STAGE DELIVERABLES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeStory.deliverables.map((del) => (
                      <div key={del} className="flex items-start gap-2">
                        <CheckCircle2 className="size-3.5 text-accent shrink-0 mt-0.5" />
                        <span className="font-parkinsans text-xs text-[var(--text-secondary)] leading-tight">
                          {del}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Strategic Takeaway & Stage Action */}
              <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="size-4 text-accent shrink-0" />
                  <span className="font-parkinsans text-xs text-[var(--text-primary)] font-medium">
                    {activeStory.impact}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => openContact(activeStory.ctaPreset)}
                  className="font-parkinsans text-[10px] tracking-[0.2em] uppercase font-bold px-5 py-2.5 bg-accent text-white hover:bg-[var(--text-primary)] hover:text-[var(--bg)] transition-all rounded-[2px] shrink-0"
                >
                  START STAGE {activeStory.num} →
                </button>
              </div>
            </div>

            {/* Right Column: Bespoke Interactive SVG Schematic */}
            <div className="lg:col-span-6 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-[2px] flex items-center justify-center p-4 relative overflow-hidden">
              <span className="absolute top-4 right-4 font-parkinsans text-[9px] tracking-[0.2em] text-[var(--text-dim)] uppercase font-bold">
                SCHEMATIC · STAGE {activeStory.num}
              </span>
              {activeStoryIdx === 0 && <PositioningRadarSchematic />}
              {activeStoryIdx === 1 && <VisualArchitectureSchematic />}
              {activeStoryIdx === 2 && <DigitalInterfaceBridgeSchematic />}
              {activeStoryIdx === 3 && <MarketAuthorityConstellationSchematic />}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* FAQ Accordion Section */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div className="text-center flex flex-col items-center gap-3">
            <span className="font-parkinsans text-[10px] tracking-[0.25em] text-accent uppercase font-bold">
              OPERATIONAL CLARITY
            </span>
            <h2 className="font-parkinsans text-3xl sm:text-5xl font-semibold tracking-tight uppercase">
              FREQUENTLY ASKED QUESTIONS.
            </h2>
          </div>

          <div className="space-y-4 pt-6">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="border border-[var(--border-subtle)] bg-[var(--surface)] p-6 rounded-[2px] transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-parkinsans text-lg font-medium uppercase text-[var(--text-primary)] hover:text-accent transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="font-parkinsans text-xs text-accent ml-4 font-bold">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="font-artific text-sm text-[var(--text-secondary)] leading-relaxed mt-4 pt-4 border-t border-[var(--border-subtle)]">
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
