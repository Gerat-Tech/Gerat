"use client";

import React from "react";
import Link from "next/link";
import GeratLogo from "../common/GeratLogo";
import CurvedSectionTransition from "../common/CurvedSectionTransition";
import { siteConfig } from "@/content/site";

/**
 * V2 Flame Orange Signature Footer
 *
 * Implements the user's explicit direction:
 * - Vibrant Flame Orange background (#EA5B15 / data-orange-footer="true")
 * - High-contrast white typography with deep Coffee Bean (#300F0A) accent headers & hover states
 * - Official pure white brand logo (Badge + Wordmark)
 * - 3-column structured navigation (Navigation, Services, Connect)
 * - Large embossed white brand watermark signature mark
 * - Institutional legal colophon in deeper orange (#D44E0E)
 */
export default function Footer() {
  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "SERVICES", href: "/services" },
    { name: "ABOUT", href: "/about" },
    { name: "TEAM", href: "/about#founders" },
  ];

  const serviceLinks = [
    { name: "DIGITAL EXPERIENCES", href: "/services/digital-experiences" },
    { name: "AI & INTELLIGENT TOOLS", href: "/services/ai-tools" },
    { name: "BUSINESS SYSTEMS", href: "/services/business-systems" },
    { name: "BRAND & CREATIVE", href: "/services/brand-creative" },
  ];

  const connectLinks = [
    { name: "LINKEDIN", href: "https://linkedin.com/company/gerat", external: true },
    { name: "GITHUB", href: "https://github.com/gerat-technologies", external: true },
    { name: "TELEGRAM", href: "https://t.me/geratsolutions", external: true },
    { name: "EMAIL", href: `mailto:${siteConfig.contact.inquiries}`, external: false },
  ];

  return (
    <footer
      aria-label="Site Footer"
      data-orange-footer="true"
      className="w-full bg-[#EA5B15] text-white overflow-hidden relative shadow-[0_-20px_60px_rgba(234,91,21,0.2)]"
    >
      {/* Dynamic Scroll-Morphing Arched Transition into Flame Orange Footer */}
      <CurvedSectionTransition
        fill="#EA5B15"
        stroke="rgba(255, 255, 255, 0.25)"
        showStroke={true}
        defaultMaxArch={52}
      />

      {/* Upper Content Grid: Brand Statement & 3-Column Navigation */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-16 sm:pt-24 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Brand Summary Column */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-col gap-6">
            <Link
              href="/"
              className="inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-sm max-w-fit"
              aria-label="Gerat Software Solution Homepage"
            >
              <GeratLogo
                variant="badge"
                color="#FFFFFF"
                className="h-10 w-auto text-white hover:opacity-90 transition-opacity"
              />
            </Link>
            <p className="font-artific text-sm sm:text-base text-white/95 leading-relaxed max-w-sm">
              We design and engineer digital experiences, intelligent tools, business platforms, and brand identities built around your business.
            </p>
            <div className="pt-2 font-artific text-xs text-white/80 uppercase tracking-[0.15em] space-y-1 font-medium">
              <div>BOLE SUBCITY · ADDIS ABABA, ETHIOPIA</div>
              <div>{siteConfig.contact.inquiries.toUpperCase()}</div>
            </div>
          </div>

          {/* 3-Column Navigation Grid */}
          <div className="md:col-span-7 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            {/* Column 01: Navigation */}
            <div className="flex flex-col gap-4">
              <span className="font-parkinsans text-xs tracking-[0.25em] text-[#300F0A] uppercase font-bold">
                NAVIGATION
              </span>
              <ul className="flex flex-col gap-3.5 font-parkinsans text-xs tracking-[0.15em] text-white/95 uppercase font-medium">
                {navLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="hover:text-[#300F0A] transition-colors duration-200 inline-block py-0.5"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 02: Services */}
            <div className="flex flex-col gap-4">
              <span className="font-parkinsans text-xs tracking-[0.25em] text-[#300F0A] uppercase font-bold">
                SERVICES
              </span>
              <ul className="flex flex-col gap-3.5 font-parkinsans text-xs tracking-[0.15em] text-white/95 uppercase font-medium">
                {serviceLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="hover:text-[#300F0A] transition-colors duration-200 inline-block py-0.5"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 03: Connect */}
            <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
              <span className="font-parkinsans text-xs tracking-[0.25em] text-[#300F0A] uppercase font-bold">
                CONNECT
              </span>
              <ul className="flex flex-col gap-3.5 font-parkinsans text-xs tracking-[0.15em] text-white/95 uppercase font-medium">
                {connectLinks.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="hover:text-[#300F0A] transition-colors duration-200 inline-flex items-center gap-1.5 py-0.5 group"
                    >
                      <span>{item.name}</span>
                      {item.external && (
                        <span className="text-[10px] text-white/70 group-hover:text-[#300F0A]">
                          ↗
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent White Brand Signature (100% Visible on Flame Orange) */}
      <div className="w-full border-t border-white/20 py-16 sm:py-24 overflow-hidden select-none">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex justify-center items-center">
          <div className="w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl opacity-100 hover:scale-[1.01] transition-transform duration-300">
            <GeratLogo
              variant="primary"
              color="#FFFFFF"
              badgeColor="#FFFFFF"
              textColor="#FFFFFF"
              className="w-full h-auto text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
            />
          </div>
        </div>
      </div>

      {/* Institutional Legal Colophon Bar */}
      <div className="w-full border-t border-white/20 bg-[#D44E0E]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-parkinsans text-[11px] tracking-[0.18em] text-white/90 uppercase font-medium">
          <div>© {new Date().getFullYear()} GERAT SOFTWARE SOLUTION. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-4 text-white/80 text-[10px]">
            <span>TECHNOLOGY IS A TOOL. MAKE IT USEFUL.</span>
            <span>·</span>
            <span>ADDIS ABABA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
