"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ContactDrawer from "./ContactDrawer";
import NavItem from "../common/NavItem";
import { useNav } from "@/context/NavContext";

/**
 * Editorial Navigation Bar (Spec §8)
 * Features adaptive sticky-scroll compression, active route indicators,
 * corner-accent hover styling, and a full-screen mobile menu.
 */
export default function Navbar() {
  const {
    isMenuOpen,
    setIsMenuOpen,
    isContactOpen,
    setIsContactOpen,
    openContact,
    closeContact,
  } = useNav();
  const [hovered, setHovered] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/settings/config")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && data.configMap) {
          if (data.configMap.ANNOUNCEMENT_ENABLED === "true") {
            setAnnouncement({
              enabled: true,
              text: data.configMap.ANNOUNCEMENT_TEXT || "SYSTEM ADVISORY: Q3 ARCHITECTURAL ENGAGEMENT SCHEDULE OPEN",
              link: data.configMap.ANNOUNCEMENT_LINK || "/why-wqf",
            });
          } else {
            setAnnouncement(null);
          }
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, [pathname]);

  const navLinks = [
    { name: "SERVICES", href: "/why-wqf" },
    { name: "PORTFOLIO", href: "/portfolio" },
    { name: "TEAM", href: "/team" },
    { name: "INSIGHTS", href: "/insights" },
  ];

  // Handle scroll behavior (Spec §8: hide on scroll down past viewport, show on scroll up)
  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    const scrollDelta = currentY - lastScrollY.current;
    const windowHeight = window.innerHeight;

    // Compact mode triggers after 40px scroll
    setIsScrolled(currentY > 40);

    // Hide/show logic past first viewport
    if (currentY > windowHeight * 0.8) {
      if (scrollDelta > 10 && !isMenuOpen) {
        setIsVisible(false); // Scrolling down
      } else if (scrollDelta < -10) {
        setIsVisible(true);  // Scrolling up
      }
    } else {
      setIsVisible(true);
    }

    lastScrollY.current = currentY;
  }, [isMenuOpen]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, setIsMenuOpen]);

  // Handle escape key to close menu or drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isContactOpen) closeContact();
        if (isMenuOpen) setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isContactOpen, closeContact, isMenuOpen, setIsMenuOpen]);

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 w-full z-[120] transition-all duration-400 ease-(--ease-primary) ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Global Announcement Banner from SiteConfig */}
        {announcement?.enabled && announcement?.text && (
          <div className="w-full bg-[#0d0d0d]/95 backdrop-blur-md border-b border-accent/40 text-[10px] sm:text-[11px] font-azeret uppercase tracking-[0.2em] py-2 px-4 text-center text-white/90 flex items-center justify-center gap-2 sm:gap-3 shadow-md">
            <span className="inline-block size-1.5 rounded-full bg-accent animate-pulse shrink-0" />
            <span className="truncate max-w-[70vw] sm:max-w-none">{announcement.text}</span>
            {announcement.link && (
              <Link
                href={announcement.link}
                className="text-accent hover:text-white underline underline-offset-2 transition-colors ml-1 whitespace-nowrap font-bold"
              >
                VIEW →
              </Link>
            )}
          </div>
        )}

        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 pt-3 sm:pt-4">
          <div
            className={`mx-auto flex items-center justify-between transition-all duration-500 ease-(--ease-primary) ${
              isScrolled
                ? "bg-[#111111]/85 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] rounded-xl py-2 px-4 sm:px-6 md:w-fit"
                : "bg-transparent border-b border-white/10 pb-3 sm:pb-4 px-2"
            }`}
          >
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 text-white group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
              aria-label="Gerat Software Solutions PLC - Home"
            >
              {/* Gerat Monogram Icon */}
              <div className="size-8 rounded-[4px] bg-white/5 border border-white/15 flex items-center justify-center text-white group-hover:border-accent transition-colors duration-300 shrink-0">
                <GeratMonogram />
              </div>

              {/* Logo Typography (Collapses smoothly when scrolled in center mode) */}
              <div
                className={`flex flex-col overflow-hidden transition-all duration-400 ${
                  isScrolled ? "hidden sm:flex" : "flex"
                }`}
              >
                <span className="font-roc text-[14px] sm:text-[15px] font-bold tracking-[0.18em] leading-tight text-white group-hover:text-accent transition-colors">
                  GERAT
                </span>
                <span className="font-azeret text-[8px] tracking-[0.22em] text-white/50 leading-tight">
                  SOFTWARE SOLUTIONS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (>= 1024px) */}
            <nav
              className="hidden lg:flex items-center gap-1 mx-4"
              aria-label="Main Navigation"
            >
              <ul className="flex items-center gap-1">
                {navLinks.map((link, index) => {
                  const isCurrent = pathname === link.href;
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        aria-current={isCurrent ? "page" : undefined}
                      >
                        <NavItem
                          label={link.name}
                          isActive={hovered === index}
                          isCurrent={isCurrent}
                          onMouseEnter={() => setHovered(index)}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right Action: Contact CTA Button */}
            <div className="hidden lg:flex items-center">
              <button
                type="button"
                onClick={openContact}
                className="relative group/btn font-azeret text-[11px] uppercase tracking-[0.2em] px-4 py-2 text-white/90 border border-white/20 hover:border-accent hover:text-white bg-white/5 hover:bg-accent/10 transition-all duration-300 rounded-[2px] select-none"
              >
                <span>CONTACT</span>
                {/* Micro corner indicators */}
                <span className="absolute -top-[1px] -left-[1px] size-1.5 border-t border-l border-white/60 group-hover/btn:border-accent" />
                <span className="absolute -bottom-[1px] -right-[1px] size-1.5 border-b border-r border-white/60 group-hover/btn:border-accent" />
              </button>
            </div>

            {/* Mobile Hamburger Toggle (< 1024px) */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative size-10 rounded-[3px] border border-white/15 bg-white/5 flex items-center justify-center text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <div className="size-2 bg-white rounded-[1px] group-hover:bg-accent transition-colors" />

              {/* Animated Corner Brackets */}
              <span
                className={`absolute top-1 left-1 size-2 border-t border-l border-white/60 transition-transform duration-300 ${
                  isMenuOpen ? "rotate-45" : ""
                }`}
              />
              <span
                className={`absolute top-1 right-1 size-2 border-t border-r border-white/60 transition-transform duration-300 ${
                  isMenuOpen ? "-rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-1 left-1 size-2 border-b border-l border-white/60 transition-transform duration-300 ${
                  isMenuOpen ? "-rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-1 right-1 size-2 border-b border-r border-white/60 transition-transform duration-300 ${
                  isMenuOpen ? "rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay (Spec §8 Mobile) */}
      <div
        className={`fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl transition-all duration-500 ease-(--ease-primary) flex flex-col justify-between pt-24 pb-8 px-6 lg:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto [clip-path:inset(0_0_0_0)]"
            : "opacity-0 pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col gap-6 my-auto max-w-md w-full mx-auto">
          <div className="mono-meta text-center text-white/40 mb-2">
            NAVIGATION
          </div>

          <div className="grid grid-cols-2 gap-3">
            {navLinks.map((link) => {
              const isCurrent = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`relative p-5 text-center font-azeret text-[12px] tracking-[0.2em] uppercase border transition-all duration-300 rounded-[2px] ${
                    isCurrent
                      ? "border-accent text-white bg-accent/10"
                      : "border-white/15 text-white/80 hover:text-white hover:border-white/40 bg-white/[0.02]"
                  }`}
                >
                  {/* Corner accents */}
                  <span className="absolute top-0 left-0 size-1.5 border-t border-l border-white/50" />
                  <span className="absolute top-0 right-0 size-1.5 border-t border-r border-white/50" />
                  <span className="absolute bottom-0 left-0 size-1.5 border-b border-l border-white/50" />
                  <span className="absolute bottom-0 right-0 size-1.5 border-b border-r border-white/50" />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Creative Quick Links on Mobile */}
          <div className="flex flex-col gap-1.5 pt-1">
            <span className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase text-center">
              CREATIVE & IDENTITY
            </span>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/services/brand-creative"
                onClick={() => setIsMenuOpen(false)}
                className="py-2.5 px-2 text-center font-azeret text-[10px] tracking-[0.1em] uppercase border border-white/10 text-white/70 hover:text-white rounded-[2px] bg-white/[0.01]"
              >
                BRAND & LOGO
              </Link>
              <Link
                href="/services/personal-branding"
                onClick={() => setIsMenuOpen(false)}
                className="py-2.5 px-2 text-center font-azeret text-[10px] tracking-[0.1em] uppercase border border-white/10 text-white/70 hover:text-white rounded-[2px] bg-white/[0.01]"
              >
                FOUNDER BRAND
              </Link>
            </div>
          </div>

          {/* Full-width Contact Drawer Trigger on Mobile */}
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              openContact();
            }}
            className="relative w-full p-4 mt-2 text-center font-azeret text-[12px] tracking-[0.2em] uppercase border border-accent/80 text-white bg-accent/20 hover:bg-accent/30 transition-all rounded-[2px]"
          >
            <span className="absolute top-0 left-0 size-1.5 border-t border-l border-accent" />
            <span className="absolute top-0 right-0 size-1.5 border-t border-r border-accent" />
            <span className="absolute bottom-0 left-0 size-1.5 border-b border-l border-accent" />
            <span className="absolute bottom-0 right-0 size-1.5 border-b border-r border-accent" />
            START A PROJECT / CONTACT
          </button>
        </div>

        <div className="text-center font-azeret text-[10px] tracking-[0.15em] text-white/40 uppercase">
          © 2026 GERAT SOFTWARE SOLUTIONS PLC
        </div>
      </div>

      {/* Global Contact Drawer */}
      <ContactDrawer open={isContactOpen} setOpen={setIsContactOpen} />
    </>
  );
}

/**
 * Clean architectural Gerat monogram
 */
function GeratMonogram() {
  return (
    <svg
      className="size-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 5V19H19V13H11V11H21V5H3Z"
        fill="currentColor"
      />
      <rect
        x="13"
        y="15"
        width="4"
        height="4"
        fill="var(--accent, #ff4a00)"
      />
    </svg>
  );
}
