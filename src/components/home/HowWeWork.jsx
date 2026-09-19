"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "../common/SectionLabel";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";
import { useNav } from "@/context/NavContext";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Layers,
  Compass,
  Code2,
  Rocket,
  ShieldCheck,
} from "lucide-react";

const PROCESS_STAGES = [
  {
    step: "01",
    name: "DISCOVER",
    phaseTag: "PHASE I · THE BLUEPRINT",
    headline: "WE LISTEN BEFORE WE WRITE A SINGLE LINE OF CODE.",
    narrative:
      "Before touching Figma or drafting code, we immerse ourselves in how your business actually operates. We identify operational bottlenecks, interview key stakeholders, and define what measurable success looks like.",
    deliverables: [
      "Operational Architecture & Requirements Brief",
      "Technical Feasibility & Integration Matrix",
      "Milestone Roadmap & Delivery Timelines",
    ],
    clientExperience:
      "What you receive: Structured discovery workshops, private Notion workspace, and crystal-clear scope alignment.",
    icon: Compass,
    schematic: "discover",
  },
  {
    step: "02",
    name: "DESIGN",
    phaseTag: "PHASE II · THE ARCHITECTURE",
    headline: "DESIGNING THE EXPERIENCE. DEFINING THE SYSTEM.",
    narrative:
      "We turn operational clarity into intuitive visual systems and user journeys. From high-fidelity wireframes to complete design tokens, every interface is engineered to communicate credibility and convert users.",
    deliverables: [
      "Interactive High-Fidelity Prototypes",
      "Design Token Library & Design System",
      "User Journey Maps & Ergonomic Screen Flows",
    ],
    clientExperience:
      "What you receive: Clickable Figma prototypes you can test on your phone before a single line of code is committed.",
    icon: Layers,
    schematic: "design",
  },
  {
    step: "03",
    name: "BUILD",
    phaseTag: "PHASE III · THE CONSTRUCTION",
    headline: "ENGINEERED FOR PERFORMANCE. BUILT WITHOUT SHORTCUTS.",
    narrative:
      "Our software engineers build modern Next.js, Node, and database architectures with clean component structures. Clean code, sub-second response times, complete type safety, and zero fragile workarounds.",
    deliverables: [
      "Production Next.js & React Component Architecture",
      "Type-Safe API Endpoints & Database Schemas",
      "Automated Unit, Smoke & Integration Test Suites",
    ],
    clientExperience:
      "What you receive: Weekly async Loom video walkthroughs and private staging environment URLs updated with every sprint.",
    icon: Code2,
    schematic: "build",
  },
  {
    step: "04",
    name: "LAUNCH",
    phaseTag: "PHASE IV · THE OPENING",
    headline: "RIGOROUSLY TESTED. DEPLOYED WITH ZERO SURPRISES.",
    narrative:
      "We stress-test the system under realistic peak loads, audit cross-browser compatibility, and verify all security measures before going live. The result is a smooth, zero-downtime release ready for real customers.",
    deliverables: [
      "Comprehensive Security & Speed Audit",
      "Sub-Second Core Web Vitals Optimization",
      "Zero-Downtime DNS Cutover & Production Rollout",
    ],
    clientExperience:
      "What you receive: Pre-launch checklist walkthrough, live DNS switchover, and real-time traffic monitoring verification.",
    icon: Rocket,
    schematic: "launch",
  },
  {
    step: "05",
    name: "SUPPORT",
    phaseTag: "PHASE V · THE PARTNERSHIP",
    headline: "WE CARE ABOUT WHAT HAPPENS AFTER THE LAUNCH.",
    narrative:
      "Our relationship doesn't end when the site goes live. We provide complete code ownership, thorough documentation, staff training, and ongoing technical support so your platform expands as your business grows.",
    deliverables: [
      "100% Intellectual Property & Source Code Ownership",
      "Comprehensive Documentation & Admin Training",
      "Proactive Monitoring & System Scaling Roadmap",
    ],
    clientExperience:
      "What you receive: Direct Slack / WhatsApp access with your lead engineer, rapid response times, and regular health checkups.",
    icon: ShieldCheck,
    schematic: "support",
  },
];

function BlueprintSchematic({ type }) {
  switch (type) {
    case "discover":
      return (
        <svg
          className="w-full h-full text-accent"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Blueprint Drafting Grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="400" height="300" fill="url(#grid)" />

          {/* Compass Drafting Arcs */}
          <circle cx="200" cy="150" r="100" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="150" r="60" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2" />
          <circle cx="200" cy="150" r="20" stroke="currentColor" strokeWidth="1.5" />

          {/* Crosshair Alignment Ticks */}
          <line x1="50" y1="150" x2="350" y2="150" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
          <line x1="200" y1="30" x2="200" y2="270" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
          <line x1="90" y1="140" x2="90" y2="160" stroke="currentColor" strokeWidth="1.5" />
          <line x1="310" y1="140" x2="310" y2="160" stroke="currentColor" strokeWidth="1.5" />

          {/* Problem Framing Nodes */}
          <rect x="80" y="70" width="80" height="40" rx="2" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.05" />
          <text x="120" y="94" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="monospace" letterSpacing="1">
            PROBLEM
          </text>

          <rect x="240" y="70" width="80" height="40" rx="2" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.05" />
          <text x="280" y="94" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="monospace" letterSpacing="1">
            OBJECTIVE
          </text>

          <rect x="160" y="210" width="80" height="40" rx="2" stroke="var(--accent)" strokeWidth="1.5" fill="var(--accent)" fillOpacity="0.1" />
          <text x="200" y="234" textAnchor="middle" fill="var(--accent)" fontSize="9" fontFamily="monospace" letterSpacing="1" fontWeight="bold">
            ROADMAP
          </text>

          {/* Vector Flow Connecting Arrows */}
          <path d="M120 110 V150 H180" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
          <path d="M280 110 V150 H220" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
          <path d="M200 170 V210" stroke="var(--accent)" strokeWidth="1.5" />
          <circle cx="200" cy="150" r="4" fill="var(--accent)" />
        </svg>
      );

    case "design":
      return (
        <svg
          className="w-full h-full text-accent"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Interface Browser Skeleton */}
          <rect x="40" y="35" width="320" height="230" rx="4" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" fill="currentColor" fillOpacity="0.03" />
          
          {/* Header Bar */}
          <line x1="40" y1="70" x2="360" y2="70" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
          <circle cx="58" cy="52" r="3.5" fill="currentColor" fillOpacity="0.4" />
          <circle cx="72" cy="52" r="3.5" fill="currentColor" fillOpacity="0.4" />
          <circle cx="86" cy="52" r="3.5" fill="currentColor" fillOpacity="0.4" />

          {/* Layout Grid Columns */}
          <rect x="60" y="90" width="130" height="60" rx="2" stroke="var(--accent)" strokeWidth="1.2" fill="var(--accent)" fillOpacity="0.08" />
          <line x1="75" y1="108" x2="150" y2="108" stroke="var(--accent)" strokeWidth="2" />
          <line x1="75" y1="120" x2="170" y2="120" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2" />
          <line x1="75" y1="132" x2="140" y2="132" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2" />

          <rect x="210" y="90" width="130" height="60" rx="2" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="275" cy="120" r="16" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />

          {/* Design Token Circles */}
          <circle cx="80" cy="180" r="12" fill="var(--accent)" />
          <circle cx="120" cy="180" r="12" fill="currentColor" fillOpacity="0.3" />
          <circle cx="160" cy="180" r="12" fill="currentColor" fillOpacity="0.1" />

          {/* Typography Scale Guides */}
          <line x1="210" y1="175" x2="340" y2="175" stroke="currentColor" strokeWidth="3" />
          <line x1="210" y1="190" x2="310" y2="190" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
          <line x1="210" y1="202" x2="280" y2="202" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2" />

          {/* Measurement Dimensions */}
          <path d="M50 88 H54 M52 88 V152 M50 152 H54" stroke="var(--accent)" strokeWidth="1" />
          <text x="46" y="124" textAnchor="end" fill="var(--accent)" fontSize="8" fontFamily="monospace">60px</text>
        </svg>
      );

    case "build":
      return (
        <svg
          className="w-full h-full text-accent"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bridge Truss Infrastructure Graphic */}
          {/* Left Pylon & Right Pylon */}
          <rect x="60" y="80" width="20" height="180" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
          <rect x="320" y="80" width="20" height="180" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />

          {/* Bridge Roadway Deck */}
          <rect x="40" y="200" width="320" height="12" fill="var(--accent)" fillOpacity="0.2" stroke="var(--accent)" strokeWidth="1.5" />

          {/* Suspension Cables & Truss Triangles */}
          <path d="M70 80 Q 200 190 330 80" stroke="var(--accent)" strokeWidth="2" fill="none" />
          <line x1="120" y1="140" x2="120" y2="200" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2" />
          <line x1="160" y1="170" x2="160" y2="200" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2" />
          <line x1="200" y1="185" x2="200" y2="200" stroke="var(--accent)" strokeWidth="2" />
          <line x1="240" y1="170" x2="240" y2="200" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2" />
          <line x1="280" y1="140" x2="280" y2="200" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2" />

          {/* Code Blocks Moving Across the Bridge */}
          <rect x="140" y="90" width="120" height="40" rx="2" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" />
          <text x="200" y="114" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="monospace" letterSpacing="1">
            {"<EngineeredCode />"}
          </text>

          {/* Pipeline Pulses */}
          <circle cx="200" cy="206" r="5" fill="var(--accent)" />
          <circle cx="120" cy="206" r="3.5" fill="currentColor" />
          <circle cx="280" cy="206" r="3.5" fill="currentColor" />
        </svg>
      );

    case "launch":
      return (
        <svg
          className="w-full h-full text-accent"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Orbital Broadcast Vectors */}
          <circle cx="200" cy="220" r="140" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
          <circle cx="200" cy="220" r="100" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="220" r="60" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />

          {/* Ascent Trajectory Line */}
          <path d="M200 240 L200 60" stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="6 3" />
          <polygon points="200,45 192,65 208,65" fill="var(--accent)" />

          {/* Domain & CDN Edge Nodes */}
          <rect x="60" y="90" width="80" height="36" rx="2" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.05" />
          <text x="100" y="112" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="monospace">
            DNS · LIVE
          </text>
          <circle cx="100" cy="80" r="3.5" fill="#10B981" />

          <rect x="260" y="90" width="80" height="36" rx="2" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.05" />
          <text x="300" y="112" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="monospace">
            CDN · EDGE
          </text>
          <circle cx="300" cy="80" r="3.5" fill="#10B981" />

          {/* Performance Status Gauge */}
          <rect x="150" y="170" width="100" height="36" rx="2" stroke="var(--accent)" strokeWidth="1.5" fill="var(--accent)" fillOpacity="0.1" />
          <text x="200" y="192" textAnchor="middle" fill="var(--accent)" fontSize="10" fontFamily="monospace" fontWeight="bold">
            100% HEALTH
          </text>
        </svg>
      );

    case "support":
      return (
        <svg
          className="w-full h-full text-accent"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Continuous Resilient Bridge & Heartbeat Pulse */}
          <path d="M40 210 H360" stroke="currentColor" strokeWidth="2" />
          <path d="M40 210 L120 120 L200 210 L280 120 L360 210" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />

          {/* Heartbeat Uptime Waveform */}
          <path
            d="M50 90 H140 L155 60 L175 125 L195 75 L210 100 L220 90 H350"
            stroke="var(--accent)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Central Beacon Node */}
          <circle cx="200" cy="90" r="22" stroke="var(--accent)" strokeWidth="1.5" fill="var(--accent)" fillOpacity="0.08" />
          <circle cx="200" cy="90" r="6" fill="var(--accent)" />

          {/* Support Badges */}
          <rect x="60" y="140" width="100" height="32" rx="2" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" fill="currentColor" fillOpacity="0.03" />
          <text x="110" y="160" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="monospace">
            24/7 MONITORING
          </text>

          <rect x="240" y="140" width="100" height="32" rx="2" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" fill="currentColor" fillOpacity="0.03" />
          <text x="290" y="160" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="monospace">
            CODE HANDOVER
          </text>
        </svg>
      );

    default:
      return null;
  }
}

export default function HowWeWork() {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const { openContact } = useNav();

  const currentStage = PROCESS_STAGES[activeStageIdx];

  const handleNext = () => {
    if (activeStageIdx < PROCESS_STAGES.length - 1) {
      setActiveStageIdx((prev) => prev + 1);
    } else {
      openContact();
    }
  };

  const handlePrev = () => {
    if (activeStageIdx > 0) {
      setActiveStageIdx((prev) => prev - 1);
    }
  };

  return (
    <section
      id="process"
      aria-label="How We Work"
      className="relative w-full bg-[var(--bg)] text-white py-24 sm:py-32 border-b border-white/10"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-14 lg:mb-18 max-w-3xl">
          <SectionLabel index="05" label="HOW WE WORK" />
          <div className="space-y-1">
            <SplitText
              text="FROM BLUEPRINT"
              as="h2"
              className="font-artific text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight uppercase leading-[0.92]"
            />
            <SplitText
              text="TO BRIDGE."
              as="h2"
              wordClassName="text-accent"
              className="font-artific text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight uppercase leading-[0.92]"
            />
          </div>
          <FadeUp delay={0.2}>
            <p className="font-parkinsans text-base sm:text-lg text-white/70 leading-relaxed pt-2">
              A clear, collaborative process from the first conversation to a finished system built to hold weight.
            </p>
          </FadeUp>
        </div>

        {/* Milestone Rail / Interactive Connected Bridge Span */}
        <div className="mb-10 sm:mb-12">
          {/* Desktop/Tablet Horizontal Rail */}
          <div className="relative border-y border-white/10 py-3 sm:py-4 overflow-x-auto no-scrollbar">
            {/* Active Progress Connector Path */}
            <div className="hidden md:block absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/10 pointer-events-none" />
            <div
              className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-accent transition-all duration-500 pointer-events-none"
              style={{
                width: `${((activeStageIdx + 1) / PROCESS_STAGES.length) * 100}%`,
              }}
            />

            <div className="flex items-center justify-between gap-3 min-w-[640px] md:min-w-0">
              {PROCESS_STAGES.map((stage, idx) => {
                const isActive = activeStageIdx === idx;
                const isCompleted = idx < activeStageIdx;
                const IconComponent = stage.icon;

                return (
                  <button
                    key={stage.step}
                    type="button"
                    onClick={() => setActiveStageIdx(idx)}
                    className={`group relative flex items-center gap-3 px-4 py-3 rounded-[3px] border transition-all duration-300 outline-none text-left z-10 ${
                      isActive
                        ? "border-accent bg-accent/15 text-white shadow-[0_0_20px_rgba(234,91,21,0.2)]"
                        : isCompleted
                        ? "border-accent/40 bg-[var(--surface)] text-white/80 hover:border-accent/80"
                        : "border-white/10 bg-[var(--surface)] text-white/50 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    <div
                      className={`size-7 rounded-[2px] flex items-center justify-center font-parkinsans text-[11px] font-bold transition-colors ${
                        isActive
                          ? "bg-accent text-white"
                          : isCompleted
                          ? "bg-accent/20 text-accent"
                          : "bg-white/5 text-white/40 group-hover:text-white"
                      }`}
                    >
                      {stage.step}
                    </div>

                    <div className="flex flex-col">
                      <span className="font-artific text-xs sm:text-sm font-bold tracking-tight uppercase text-white">
                        {stage.name}
                      </span>
                      <span className="font-parkinsans text-[9px] tracking-[0.15em] text-white/50 uppercase">
                        {stage.phaseTag.split("·")[1]?.trim() || "MILESTONE"}
                      </span>
                    </div>

                    <IconComponent
                      className={`size-4 ml-1 transition-colors ${
                        isActive
                          ? "text-accent"
                          : isCompleted
                          ? "text-accent/60"
                          : "text-white/20 group-hover:text-white/50"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stage Storyboard Panel (Two-Column Layout) */}
        <div className="relative bg-[var(--surface)] border border-white/10 rounded-[3px] p-6 sm:p-8 lg:p-12 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.step}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Narrative Story Beat & Milestones */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    <span className="font-parkinsans text-[11px] tracking-[0.25em] text-accent font-bold uppercase">
                      {currentStage.phaseTag}
                    </span>
                    <span className="font-parkinsans text-[10px] tracking-[0.2em] text-white/30 uppercase">
                      STEP {currentStage.step} OF 05
                    </span>
                  </div>

                  <h3 className="font-artific text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight uppercase text-white mt-4 leading-[1.08]">
                    {currentStage.headline}
                  </h3>

                  <p className="font-parkinsans text-sm sm:text-base text-white/70 leading-relaxed mt-4">
                    {currentStage.narrative}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="pt-4 border-t border-white/10">
                  <span className="font-parkinsans text-[9px] tracking-[0.2em] text-white/40 uppercase block mb-3 font-semibold">
                    KEY MILESTONES & OUTPUTS
                  </span>
                  <ul className="space-y-2">
                    {currentStage.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 font-parkinsans text-xs sm:text-sm text-white/80"
                      >
                        <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Client Experience Callout */}
                <div className="p-4 bg-accent/5 border-l-2 border-accent rounded-r-[2px] font-parkinsans text-xs sm:text-sm text-white/85 leading-relaxed">
                  <span className="text-accent font-semibold block mb-0.5 text-[10px] tracking-[0.15em] uppercase">
                    THE CLIENT EXPERIENCE
                  </span>
                  {currentStage.clientExperience}
                </div>

                {/* Stepper Navigation Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={activeStageIdx === 0}
                    className={`inline-flex items-center gap-2 px-5 py-3 border font-parkinsans text-[11px] uppercase tracking-[0.2em] rounded-[2px] transition-all ${
                      activeStageIdx === 0
                        ? "border-white/10 text-white/30 cursor-not-allowed bg-transparent"
                        : "border-white/20 text-white hover:border-accent hover:text-accent bg-transparent"
                    }`}
                  >
                    <ArrowLeft className="size-3.5" />
                    <span>PREVIOUS</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-bold font-parkinsans text-[11px] uppercase tracking-[0.2em] rounded-[2px] hover:bg-white hover:text-black transition-all"
                  >
                    <span>
                      {activeStageIdx === PROCESS_STAGES.length - 1
                        ? "START YOUR PROJECT"
                        : `NEXT: ${PROCESS_STAGES[activeStageIdx + 1]?.name}`}
                    </span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Architectural Blueprint Graphic */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-full aspect-[4/3] max-w-[420px] bg-black/40 border border-white/15 rounded-[4px] p-4 flex flex-col justify-between overflow-hidden shadow-2xl">
                  {/* Decorative Architectural Metadata Header */}
                  <div className="flex items-center justify-between font-parkinsans text-[8px] tracking-[0.2em] text-white/40 uppercase pb-2 border-b border-white/10">
                    <span>SCHEMATIC · {currentStage.schematic.toUpperCase()}</span>
                    <span className="text-accent font-bold">SCALE 1:1</span>
                  </div>

                  {/* Dynamic SVG Schematic Render */}
                  <div className="relative flex-1 flex items-center justify-center p-2">
                    <BlueprintSchematic type={currentStage.schematic} />
                  </div>

                  {/* Decorative Blueprint Footer */}
                  <div className="flex items-center justify-between font-parkinsans text-[8px] tracking-[0.2em] text-white/30 uppercase pt-2 border-t border-white/10">
                    <span>STATUS: VALIDATED</span>
                    <span>GERAT SPEC 2026</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
