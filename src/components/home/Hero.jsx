"use client";

import React from "react";
import { motion } from "framer-motion";
import FadeUp from "../motion/FadeUp";
import Magnetic from "../motion/Magnetic";
import BrandBridgeAnimation from "../common/BrandBridgeAnimation";
import { useNav } from "@/context/NavContext";

/**
 * Section 01: HERO — THE PROMISE (Receivio Alignment)
 *
 * Designed around Receivio's centered display geometry:
 * - Centered Display Headline with soft rounded pill highlight badge
 * - Centered, breathable value proposition subheadline
 * - Centered pill action buttons in Flame Orange & high-contrast outline
 * - Interactive Brand Bridge 3-wave animation fanned with 4 capability cards and floating pill tags
 * - Convex curved arc bottom transition into the page canvas below
 */
export default function Hero() {
  const { openContact } = useNav();

  const handleExploreClick = (e) => {
    e.preventDefault();
    const el = document.getElementById("gap") || document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const capabilityPreview = [
    { num: "01", title: "Digital Experiences", tag: "Web & Apps" },
    { num: "02", title: "AI & Intelligent Tools", tag: "Practical AI" },
    { num: "03", title: "Business Systems", tag: "ERP & Integrations" },
    { num: "04", title: "Brand & Creative", tag: "Identity Systems" },
  ];

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative w-full min-h-[96dvh] bg-[var(--surface)] text-[var(--text-primary)] flex flex-col justify-between overflow-hidden pt-32 sm:pt-40 md:pt-44 pb-16 sm:pb-24 rounded-b-[40px] sm:rounded-b-[64px] md:rounded-b-[88px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border-b border-[var(--border-subtle)]"
    >
      {/* Ambient Flame Glow Background */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-accent/[0.07] rounded-full blur-[140px] pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col items-center text-center my-auto">
        {/* Eyebrow Label */}
        <FadeUp delay={0.1} y={16}>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6 sm:mb-8">
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            <span className="font-parkinsans text-[11px] sm:text-xs tracking-[0.2em] uppercase font-bold text-accent">
              GERAT SOFTWARE SOLUTION · EST. 2026
            </span>
          </div>
        </FadeUp>

        {/* Centered Display Headline with Soft Pill Highlight Badge (Receivio Alignment) */}
        <FadeUp delay={0.2} y={20} className="max-w-4xl">
          <h1 className="font-parkinsans text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-semibold tracking-tight uppercase leading-[1.02] text-[var(--text-primary)]">
            Build what moves your business{" "}
            <span className="inline-flex items-center px-4 sm:px-6 py-0.5 sm:py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-serif lowercase italic align-middle tracking-normal text-3xl sm:text-5xl md:text-6xl mx-1 shadow-xs">
              forward
            </span>
          </h1>
        </FadeUp>

        {/* Centered Subheadline */}
        <FadeUp delay={0.35} y={16} className="max-w-2xl mt-5 sm:mt-6">
          <p className="font-artific text-base sm:text-lg md:text-xl text-[var(--text-secondary)] font-normal leading-relaxed">
            We build websites, AI solutions, business systems, and brand identities that help businesses work better and grow with confidence.
          </p>
        </FadeUp>

        {/* Centered Pill Action Buttons */}
        <FadeUp delay={0.45} y={16}>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-8">
            {/* Primary Action Button */}
            <Magnetic maxDisplacement={8}>
              <button
                type="button"
                onClick={openContact}
                className="group relative isolate inline-flex items-center justify-center font-parkinsans text-xs sm:text-sm uppercase tracking-[0.2em] px-8 sm:px-10 py-4 bg-accent text-white font-bold rounded-full shadow-lg hover:shadow-accent/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer select-none"
              >
                <span>START A PROJECT</span>
                <span className="ml-2.5 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </Magnetic>

            {/* Secondary Action Button */}
            <Magnetic maxDisplacement={8}>
              <button
                type="button"
                onClick={handleExploreClick}
                className="group relative isolate inline-flex items-center justify-center font-parkinsans text-xs sm:text-sm uppercase tracking-[0.2em] px-7 sm:px-9 py-4 bg-transparent text-[var(--text-primary)] hover:text-accent font-semibold rounded-full border border-[var(--border-strong)] hover:border-accent transition-all duration-300 cursor-pointer select-none"
              >
                <span>EXPLORE WHAT WE BUILD</span>
                <span className="ml-2 text-accent group-hover:translate-y-0.5 transition-transform duration-300">
                  ↓
                </span>
              </button>
            </Magnetic>
          </div>
        </FadeUp>

        {/* Interactive Capability Deck & Brand Bridge Animation (Receivio Card Stack Model) */}
        <FadeUp delay={0.6} y={24} className="w-full max-w-4xl mt-12 sm:mt-16 relative">
          {/* Floating Pill Tags */}
          <div className="hidden md:block absolute -top-6 left-8 z-20">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--border-medium)] text-[10px] font-parkinsans uppercase tracking-[0.15em] text-[var(--text-secondary)] shadow-sm">
              Useful over complicated
            </span>
          </div>
          <div className="hidden md:block absolute -top-8 right-12 z-20">
            <span className="inline-block px-3.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-[10px] font-parkinsans uppercase tracking-[0.15em] text-accent font-semibold shadow-sm">
              Direct founder access
            </span>
          </div>
          <div className="hidden md:block absolute -bottom-4 right-1/4 z-20">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--border-medium)] text-[10px] font-parkinsans uppercase tracking-[0.15em] text-[var(--text-secondary)] shadow-sm">
              Built for endurance
            </span>
          </div>

          {/* Central Animated Brand Bridge Geometry */}
          <div className="w-full max-w-[280px] sm:max-w-[340px] mx-auto mb-6">
            <BrandBridgeAnimation className="w-full h-auto" interactive={true} />
          </div>

          {/* Fanned 4 Capability Preview Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
            {capabilityPreview.map((cap, idx) => (
              <motion.div
                key={cap.num}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="group flex flex-col items-start text-left p-4 sm:p-5 rounded-2xl bg-[var(--surface-2)] border border-[var(--border-subtle)] hover:border-accent/50 shadow-xs transition-colors"
              >
                <span className="font-parkinsans text-[10px] font-bold text-accent uppercase tracking-[0.2em]">
                  {cap.num}
                </span>
                <span className="font-parkinsans text-xs sm:text-sm font-semibold uppercase tracking-tight text-[var(--text-primary)] mt-1.5 line-clamp-1">
                  {cap.title}
                </span>
                <span className="font-artific text-[11px] text-[var(--text-muted)] mt-1">
                  {cap.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
