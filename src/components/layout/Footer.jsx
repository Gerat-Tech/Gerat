"use client";

import React from "react";
import Link from "next/link";
import GeratLogo from "../common/GeratLogo";
import { siteConfig } from "@/content/site";

/**
 * V2 Receivio-Inspired High-Contrast Footer
 *
 * Resolves Image 5:
 * - Guaranteed high-contrast dark container (data-dark-footer="true")
 * - 100% visible Gerat logo mark and typography (no washed-out white on Almond)
 * - 3-column structured navigation including Team
 * - Large centered Gerat signature mark at bottom with crisp visibility
 * - Institutional copyright colophon
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
      data-dark-footer="true"
      className="w-full bg-[#160705] text-[#FAF6ED] rounded-t-[36px] sm:rounded-t-[48px] border-t border-white/10 overflow-hidden mt-12 sm:mt-16"
    >
      {/* Upper Content Grid: Brand Statement & 3-Column Navigation */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Brand Summary Column */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-col gap-5">
            <Link
              href="/"
              className="inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm max-w-fit"
              aria-label="Gerat Software Solution Homepage"
            >
              <GeratLogo
                variant="badge"
                color="#FAF6ED"
                badgeColor="#EA5B15"
                textColor="#FAF6ED"
                className="h-9 w-auto hover:opacity-90 transition-opacity"
              />
            </Link>
            <p className="font-artific text-sm text-[#FAF6ED]/80 leading-relaxed max-w-sm">
              We design and engineer digital experiences, intelligent tools, business platforms, and brand identities built around your business.
            </p>
            <div className="pt-2 font-artific text-xs text-[#FAF6ED]/50 uppercase tracking-[0.15em] space-y-1">
              <div>BOLE SUBCITY · ADDIS ABABA, ETHIOPIA</div>
              <div>{siteConfig.contact.inquiries.toUpperCase()}</div>
            </div>
          </div>

          {/* 3-Column Navigation Grid */}
          <div className="md:col-span-7 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            {/* Column 01: Navigation */}
            <div className="flex flex-col gap-4">
              <span className="font-parkinsans text-xs tracking-[0.25em] text-accent uppercase font-bold">
                NAVIGATION
              </span>
              <ul className="flex flex-col gap-3 font-parkinsans text-xs tracking-[0.15em] text-[#FAF6ED]/80 uppercase font-medium">
                {navLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="hover:text-accent transition-colors duration-200 inline-block py-0.5"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 02: Services */}
            <div className="flex flex-col gap-4">
              <span className="font-parkinsans text-xs tracking-[0.25em] text-accent uppercase font-bold">
                SERVICES
              </span>
              <ul className="flex flex-col gap-3 font-parkinsans text-xs tracking-[0.15em] text-[#FAF6ED]/80 uppercase font-medium">
                {serviceLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="hover:text-accent transition-colors duration-200 inline-block py-0.5"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 03: Connect */}
            <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
              <span className="font-parkinsans text-xs tracking-[0.25em] text-accent uppercase font-bold">
                CONNECT
              </span>
              <ul className="flex flex-col gap-3 font-parkinsans text-xs tracking-[0.15em] text-[#FAF6ED]/80 uppercase font-medium">
                {connectLinks.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="hover:text-accent transition-colors duration-200 inline-flex items-center gap-1.5 py-0.5"
                    >
                      <span>{item.name}</span>
                      {item.external && (
                        <span className="text-[10px] text-[#FAF6ED]/40 hover:text-accent">
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

      {/* Large Centered Brand Signature Mark (100% Visible & Elegant) */}
      <div className="w-full border-t border-white/10 pt-10 sm:pt-14 pb-8 overflow-hidden select-none pointer-events-none">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex justify-center items-center">
          <div className="w-full max-w-4xl opacity-25 hover:opacity-35 transition-opacity duration-500">
            <GeratLogo
              variant="primary"
              color="#FAF6ED"
              badgeColor="#EA5B15"
              textColor="#FAF6ED"
              className="w-full h-auto text-[#FAF6ED]"
            />
          </div>
        </div>
      </div>

      {/* Institutional Legal Colophon */}
      <div className="w-full border-t border-white/10 bg-[#0d0403]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-parkinsans text-[11px] tracking-[0.18em] text-[#FAF6ED]/60 uppercase font-medium">
          <div>© {new Date().getFullYear()} GERAT SOFTWARE SOLUTION. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-4 text-[#FAF6ED]/50 text-[10px]">
            <span>TECHNOLOGY IS A TOOL. MAKE IT USEFUL.</span>
            <span>·</span>
            <span>ADDIS ABABA · EST. 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
