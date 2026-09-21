"use client";

import React from "react";
import Link from "next/link";
import { useNav } from "@/context/NavContext";
import Magnetic from "../motion/Magnetic";
import GeratLogo from "../common/GeratLogo";

/**
 * Editorial Master Footer (Spec §34, Content Replacement §11)
 * Combines full-bleed brand CTA, precision navigation, and institutional legal footer.
 */
export default function Footer() {
  const { openContact } = useNav();

  const navLinks = [
    { name: "SERVICES", href: "/services" },
    { name: "PORTFOLIO", href: "/portfolio" },
    { name: "TEAM", href: "/team" },
    { name: "INSIGHTS", href: "/insights" },
  ];

  return (
    <footer className="w-full bg-[var(--bg)] text-white border-t border-white/10 overflow-hidden">
      {/* Upper Master Call to Action (Flame Orange Banner with White & Dark Brown Typography) */}
      <div className="w-full bg-accent text-white border-b border-black/10">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-14 sm:py-18 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="inline-flex items-center font-artific text-[10px] sm:text-[11px] tracking-[0.25em] text-[#300F0A] uppercase font-bold">
                <span>START A PROJECT</span>
              </div>

              <h2 className="font-parkinsans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight uppercase leading-[0.94] text-white">
                READY TO CONNECT <br />
                <span className="text-[#300F0A] font-bold">WHAT COMES NEXT?</span>
              </h2>

              <p className="font-artific text-base sm:text-lg text-white/95 max-w-xl leading-relaxed">
                Let&apos;s build the bridge together. We turn complex business challenges
                into digital products, intelligent tools, business systems, and recognizable brands.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-4">
              <Magnetic maxDisplacement={10}>
                <button
                  type="button"
                  onClick={openContact}
                  data-cursor-text="CONTACT"
                  className="group relative isolate inline-flex items-center justify-center font-parkinsans text-[12px] uppercase tracking-[0.2em] px-9 py-4 bg-[#300F0A] text-white font-bold hover:bg-white hover:text-[#300F0A] border border-[#300F0A] transition-all duration-300 rounded-[2px] shadow-xl"
                >
                  <span>START A PROJECT</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </Magnetic>

              <span className="font-artific text-[10px] tracking-[0.18em] text-[#300F0A] uppercase font-bold">
                DIRECT RESPONSE · 24-48 HOUR REVIEW
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Navigation & Information Row */}
      <div className="w-full border-t border-white/10 bg-[var(--surface)]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
            {/* Brand column */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <Link href="/" className="inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm" aria-label="Gerat Software Solution">
                <GeratLogo variant="badge" className="h-8 w-auto text-white hover:text-accent transition-colors duration-300" />
              </Link>
              <p className="font-parkinsans text-[10px] text-white/50 leading-relaxed uppercase tracking-[0.15em] max-w-xs">
                BRAND · DIGITAL · INTELLIGENCE · SYSTEMS
              </p>
            </div>

            {/* Navigation links */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <span className="font-parkinsans text-[10px] tracking-[0.2em] text-white/40 uppercase mb-1">
                NAVIGATION
              </span>
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="font-parkinsans text-[11px] tracking-[0.2em] text-white/70 hover:text-accent transition-colors uppercase"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Services (Aligned with 4 Pillars) */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <span className="font-parkinsans text-[10px] tracking-[0.2em] text-accent uppercase mb-1">
                SERVICES
              </span>
              <ul className="flex flex-col gap-2 font-parkinsans text-[10px] tracking-[0.15em] text-white/60 uppercase">
                <li>
                  <Link href="/services/digital-experiences" className="hover:text-white transition-colors">
                    DIGITAL EXPERIENCES
                  </Link>
                </li>
                <li>
                  <Link href="/services/ai-tools" className="hover:text-white transition-colors">
                    AI & INTELLIGENT TOOLS
                  </Link>
                </li>
                <li>
                  <Link href="/services/business-systems" className="hover:text-white transition-colors">
                    BUSINESS SYSTEMS
                  </Link>
                </li>
                <li>
                  <Link href="/services/brand-creative" className="hover:text-white transition-colors">
                    BRAND & CREATIVE
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Office */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <span className="font-parkinsans text-[10px] tracking-[0.2em] text-white/40 uppercase mb-1">
                CONTACT
              </span>
              <ul className="font-parkinsans text-[10px] tracking-[0.15em] text-white/50 space-y-2 uppercase">
                <li>BOLE SUBCITY · ADDIS ABABA</li>
                <li>INFO@GERAT.COM</li>
                <li>+2519 2929 8030</li>
                <li className="text-accent">DIRECT REVIEW · 24-48 HOURS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Colophon */}
      <div className="w-full border-t border-white/5 bg-[var(--bg)]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-parkinsans text-[10px] tracking-[0.15em] text-white/40 uppercase">
          <div>© 2026 GERAT SOFTWARE SOLUTION. ALL RIGHTS RESERVED.</div>
          <div className="text-white/30">ADDIS ABABA · EST. 2026</div>
        </div>
      </div>
    </footer>
  );
}
