"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import GeratLogo from "../common/GeratLogo";
import { siteConfig } from "@/content/site";

/**
 * High-Brilliance Flame Orange Signature Footer
 *
 * Designed with full 100% contrast & zero dimming:
 * - Pure vibrant Flame Orange background (#EA5B15) with zero dark overlays or washed-out filters
 * - Full 100% solid opacity across all typography, navigation links, and brand marks
 * - Prominent, crisp, pure white Grand Gerät Logo (#FFFFFF) commanding primary visual focus
 * - 3-column structured navigation (Navigation, Services, Connect) in high-contrast white & coffee bean headers
 * - Smooth native scroll responsiveness with restrained physical settling (zero opacity fading)
 */
export default function Footer() {
  const footerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Track the scroll progress as the user enters and traverses the footer
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // Calm physical glide & scale (NO opacity dimming — stays 100% bright & crisp)
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.85],
    prefersReducedMotion ? [0, 0] : [40, 0]
  );
  const contentScale = useTransform(
    scrollYProgress,
    [0, 0.9],
    prefersReducedMotion ? [1, 1] : [0.99, 1]
  );

  // Progressive physical settling of the grand Gerat logo at 100% solid brilliance
  const grandLogoScale = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    prefersReducedMotion ? [1, 1] : [0.94, 1]
  );
  const grandLogoY = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    prefersReducedMotion ? [0, 0] : [24, 0]
  );

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
      ref={footerRef}
      aria-label="Site Footer"
      data-orange-footer="true"
      className="w-full bg-[#EA5B15] text-white overflow-hidden relative shadow-[0_-20px_60px_rgba(234,91,21,0.25)]"
    >
      {/* Main High-Brilliance Footer Shell */}
      <motion.div
        style={{
          y: contentY,
          scale: contentScale,
        }}
        className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-14 sm:pt-20 lg:pt-28 pb-10 sm:pb-14 lg:pb-16 flex flex-col justify-between will-change-transform opacity-100"
      >
        {/* Upper Content Grid: Brand Statement & 3-Column Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start pb-8 sm:pb-12">
          {/* Brand Summary Column */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-col gap-4">
            <Link
              href="/"
              className="inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-sm max-w-fit"
              aria-label="Gerat Software Solution Homepage"
            >
              <GeratLogo
                variant="badge"
                color="#FFFFFF"
                badgeColor="#FFFFFF"
                textColor="#FFFFFF"
                className="h-9 w-auto text-white hover:opacity-90 transition-opacity"
              />
            </Link>
            <p className="font-artific text-sm text-white/95 leading-relaxed max-w-sm">
              We design and engineer digital experiences, intelligent tools, business platforms, and brand identities built around your business.
            </p>
            <div className="font-artific text-xs text-white/85 uppercase tracking-[0.15em] space-y-0.5 font-medium">
              <div>BOLE SUBCITY · ADDIS ABABA, ETHIOPIA</div>
              <div>{siteConfig.contact.inquiries.toUpperCase()}</div>
            </div>
          </div>

          {/* 3-Column Navigation Grid */}
          <div className="md:col-span-7 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            {/* Column: Navigation */}
            <div className="flex flex-col gap-3">
              <span className="font-parkinsans text-xs tracking-[0.25em] text-[#300F0A] uppercase font-bold">
                NAVIGATION
              </span>
              <ul className="flex flex-col gap-2.5 font-parkinsans text-xs tracking-[0.15em] text-white uppercase font-semibold">
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

            {/* Column: Services */}
            <div className="flex flex-col gap-3">
              <span className="font-parkinsans text-xs tracking-[0.25em] text-[#300F0A] uppercase font-bold">
                SERVICES
              </span>
              <ul className="flex flex-col gap-2.5 font-parkinsans text-xs tracking-[0.15em] text-white uppercase font-semibold">
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

            {/* Column: Connect */}
            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <span className="font-parkinsans text-xs tracking-[0.25em] text-[#300F0A] uppercase font-bold">
                CONNECT
              </span>
              <ul className="flex flex-col gap-2.5 font-parkinsans text-xs tracking-[0.15em] text-white uppercase font-semibold">
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
                        <span className="text-[10px] text-white/80 group-hover:text-[#300F0A]">
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

        {/* Center: Grand Pure White Brand Wordmark (100% Solid Brilliance & Clear Focus) */}
        <div className="w-full flex justify-center items-center py-0 select-none overflow-hidden">
          <motion.div
            style={{
              scale: grandLogoScale,
              y: grandLogoY,
            }}
            className="w-full max-w-4xl hover:scale-[1.01] transition-transform duration-500 will-change-transform opacity-100"
          >
            <GeratLogo
              variant="primary"
              color="#FFFFFF"
              badgeColor="#FFFFFF"
              textColor="#FFFFFF"
              className="w-full h-auto text-white drop-shadow-[0_12px_44px_rgba(48,15,10,0.18)]"
            />
          </motion.div>
        </div>

        {/* Bottom Colophon Bar: Clean, Seamless, Institutional Brand Anchor */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-parkinsans text-[11px] tracking-[0.18em] text-white uppercase font-semibold border-t border-white/15">
          <div>© {new Date().getFullYear()} GERAT SOFTWARE SOLUTION. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-4 text-white/90 text-[10px]">
            <span>TECHNOLOGY IS A TOOL. MAKE IT USEFUL.</span>
            <span>·</span>
            <span>ADDIS ABABA</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
