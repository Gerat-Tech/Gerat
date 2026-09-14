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
      {/* Upper Master Call to Action */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2.5 font-parkinsans text-[10px] tracking-[0.25em] text-accent uppercase">
              <span className="size-1.5 rounded-[1px] bg-accent" />
              <span>COMMISSION A SYSTEM</span>
            </div>

            <h2 className="font-artific text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight uppercase leading-[0.92] text-white">
              FROM IDENTITY <br />
              <span className="text-accent">TO INFRASTRUCTURE.</span>
            </h2>

            <p className="font-parkinsans text-base sm:text-lg text-white/70 max-w-xl leading-relaxed">
              Have an ambitious venture, brand, or mission-critical system worth building?
              Gerat turns complex challenges into identities and architectures people can see, use, and trust.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-4">
            <Magnetic maxDisplacement={10}>
              <button
                type="button"
                onClick={openContact}
                data-cursor-text="CONTACT"
                className="group relative isolate inline-flex items-center justify-center font-parkinsans text-[12px] uppercase tracking-[0.2em] px-8 py-4 bg-accent text-white font-bold hover:bg-white hover:text-black transition-all duration-300 rounded-[2px]"
              >
                <span>START A PROJECT</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
                <span className="absolute -top-[1px] -left-[1px] size-2 border-t border-l border-white" />
                <span className="absolute -top-[1px] -right-[1px] size-2 border-t border-r border-white" />
                <span className="absolute -bottom-[1px] -left-[1px] size-2 border-b border-l border-white" />
                <span className="absolute -bottom-[1px] -right-[1px] size-2 border-b border-r border-white" />
              </button>
            </Magnetic>

            <span className="font-parkinsans text-[10px] tracking-[0.15em] text-white/40 uppercase">
              DIRECT RESPONSE · 24-48 HOUR REVIEW
            </span>
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
                MONOLITHIC BRAND IDENTITIES, DOMAIN AI & ENTERPRISE DIGITAL ARCHITECTURES.
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

            {/* Brand & Creative links (Spec §24) */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <span className="font-parkinsans text-[10px] tracking-[0.2em] text-accent uppercase mb-1">
                BRAND & CREATIVE
              </span>
              <ul className="flex flex-col gap-2 font-parkinsans text-[10px] tracking-[0.15em] text-white/60 uppercase">
                <li>
                  <Link href="/services/brand-creative" className="hover:text-white transition-colors">
                    • BRAND STRATEGY
                  </Link>
                </li>
                <li>
                  <Link href="/services/brand-creative" className="hover:text-white transition-colors">
                    • LOGO & BRAND IDENTITY
                  </Link>
                </li>
                <li>
                  <Link href="/services/brand-creative" className="hover:text-white transition-colors">
                    • GRAPHIC DESIGN & COLLATERAL
                  </Link>
                </li>
                <li>
                  <Link href="/services/personal-branding" className="hover:text-white transition-colors">
                    • FOUNDER PERSONAL BRANDING
                  </Link>
                </li>
              </ul>
            </div>

            {/* Engineering Disciplines */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <span className="font-parkinsans text-[10px] tracking-[0.2em] text-white/40 uppercase mb-1">
                ENGINEERING
              </span>
              <ul className="font-parkinsans text-[10px] tracking-[0.15em] text-white/50 space-y-2 uppercase">
                <li>• ENTERPRISE CLOUD & ERP</li>
                <li>• DOMAIN-GROUNDED RAG & AI</li>
                <li>• REAL-TIME TELEMETRY BUSES</li>
                <li>• CIVIC GOVERNANCE PLATFORMS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Colophon */}
      <div className="w-full border-t border-white/5 bg-[var(--bg)]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-parkinsans text-[10px] tracking-[0.15em] text-white/40 uppercase">
          <div>© 2026 GERAT SOFTWARE SOLUTION. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
