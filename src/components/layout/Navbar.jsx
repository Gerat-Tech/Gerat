"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ContactDrawer from "./ContactDrawer";
import NavItem from "../common/NavItem";
import GeratLogo from "../common/GeratLogo";
import { useNav } from "@/context/NavContext";

/**
 * V2 Editorial Navigation Bar
 * Features contextual anchor-based navigation, adaptive sticky-scroll compression,
 * active in-page section awareness, and a streamlined mobile experience.
 */
export default function Navbar() {
  const {
    isMenuOpen,
    setIsMenuOpen,
    isContactOpen,
    setIsContactOpen,
    contactPreset,
    openContact,
    closeContact,
  } = useNav();

  const [hovered, setHovered] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const [announcement, setAnnouncement] = useState(null);

  const isHomePage = pathname === "/";

  const navLinks = [
    {
      name: "SERVICES",
      label: "Services",
      href: isHomePage ? "#services" : "/#services",
      targetId: "services",
    },
    {
      name: "ABOUT",
      label: "About",
      href: "/about", // supports #about anchor navigation
      targetId: null,
    },
    {
      name: "TEAM",
      label: "Team",
      href: isHomePage ? "#founders" : "/about#founders",
      targetId: "founders",
    },
  ];

  // Fetch optional announcement from SiteConfig
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
              link: data.configMap.ANNOUNCEMENT_LINK || "/services",
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

  // Section observer on the home page for active indicator
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection(null);
      return;
    }

    const sectionIds = ["services", "founders"];
    const handleScrollActive = () => {
      const scrollPos = window.scrollY + 200;
      let current = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            current = id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScrollActive, { passive: true });
    handleScrollActive();
    return () => window.removeEventListener("scroll", handleScrollActive);
  }, [isHomePage]);

  // Handle scroll behavior (hide on scroll down past viewport, show on scroll up)
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

  // Handle anchor clicks smoothly on Home page
  const handleNavClick = (e, link) => {
    if (isHomePage && link.targetId) {
      e.preventDefault();
      const el = document.getElementById(link.targetId) || document.querySelector(link.href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      if (isMenuOpen) setIsMenuOpen(false);
    } else {
      if (isMenuOpen) setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 w-full z-[120] bg-[#EA5B15] transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "shadow-[0_4px_24px_rgba(48,15,10,0.18)] border-b border-[#300F0A]/15 py-2.5 sm:py-3"
            : "border-b border-[#300F0A]/10 py-3.5 sm:py-4"
        }`}
      >
        {/* Global Announcement Banner from SiteConfig */}
        {announcement?.enabled && announcement?.text && (
          <div className="w-full bg-[#300F0A]/95 backdrop-blur-md border-b border-[#F1DFD9]/20 text-[10px] sm:text-[11px] font-parkinsans uppercase tracking-[0.2em] py-2 px-4 text-center text-[#F1DFD9] flex items-center justify-center gap-2 sm:gap-3 shadow-md">
            <span className="truncate max-w-[70vw] sm:max-w-none">{announcement.text}</span>
            {announcement.link && (
              <Link
                href={announcement.link}
                className="text-[#F1DFD9] hover:underline underline-offset-2 transition-colors ml-1 whitespace-nowrap font-bold"
              >
                VIEW →
              </Link>
            )}
          </div>
        )}

        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo - Official Badge Logo in Almond #F1DFD9 */}
            <Link
              href="/"
              className="flex items-center text-[#F1DFD9] group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F1DFD9] rounded-sm py-1"
              aria-label="Gerat Software Solution - Home"
            >
              <GeratLogo
                variant="badge"
                color="#F1DFD9"
                badgeColor="#F1DFD9"
                textColor="#F1DFD9"
                className="h-8 sm:h-9 w-auto text-[#F1DFD9] group-hover:opacity-90 transition-opacity duration-300"
              />
            </Link>

            {/* Desktop Navigation Links (>= 1024px) */}
            <nav
              className="hidden lg:flex items-center gap-1 mx-6 text-[#F1DFD9]"
              aria-label="Main Navigation"
            >
              <ul className="flex items-center gap-1">
                {navLinks.map((link, index) => {
                  const isCurrent = isHomePage
                    ? (link.targetId && activeSection === link.targetId)
                    : link.name === "ABOUT"
                    ? pathname === "/about"
                    : link.targetId === "founders"
                    ? pathname === "/about"
                    : pathname.startsWith("/services");

                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link)}
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

            {/* Right Action: Clean CONTACT Pill CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                type="button"
                onClick={openContact}
                className="group relative isolate inline-flex items-center justify-center font-parkinsans text-[11px] uppercase tracking-[0.2em] px-6 py-2.5 font-bold transition-all duration-300 rounded-full shadow-md select-none cursor-pointer bg-[#300F0A] text-[#F1DFD9] hover:bg-[#F1DFD9] hover:text-[#300F0A] border-2 border-[#300F0A] hover:border-[#F1DFD9]"
                aria-label="Contact Gerat"
              >
                <span className="transition-colors duration-300 group-hover:!text-[#300F0A]">CONTACT</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle (< 1024px) */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative size-10 rounded-full border border-[#300F0A]/20 bg-[#300F0A]/10 flex flex-col items-center justify-center gap-1.5 text-[#F1DFD9] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F1DFD9] hover:border-[#300F0A]/40 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <span
                className={`w-4 h-[1.5px] bg-[#F1DFD9] transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-[3.75px]" : ""
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-[#F1DFD9] transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-[3.75px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay (Streamlined V2 Navigation) */}
      <div
        className={`fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl transition-all duration-500 ease-(--ease-primary) flex flex-col justify-between pt-28 pb-10 px-6 lg:hidden overflow-y-auto ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto [clip-path:inset(0_0_0_0)]"
            : "opacity-0 pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col gap-6 my-auto max-w-sm w-full mx-auto text-center">
          <div className="font-parkinsans text-[10px] tracking-[0.25em] text-[#F1DFD9]/60 uppercase mb-2">
            GERAT · NAVIGATION
          </div>

          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isCurrent = isHomePage
                ? (link.targetId && activeSection === link.targetId)
                : link.name === "ABOUT"
                ? pathname === "/about"
                : link.targetId === "founders"
                ? pathname === "/about"
                : pathname.startsWith("/services");

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative py-3.5 px-6 font-parkinsans text-xs tracking-[0.2em] uppercase border transition-all duration-300 rounded-full ${
                    isCurrent
                      ? "border-accent text-[#F1DFD9] bg-accent/20 font-semibold"
                      : "border-[#F1DFD9]/15 text-[#F1DFD9]/80 hover:text-[#F1DFD9] hover:border-[#F1DFD9]/40 bg-[#F1DFD9]/[0.04]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Primary Mobile CTA Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                openContact();
              }}
              className="relative w-full py-4 px-6 font-parkinsans text-xs tracking-[0.25em] uppercase font-bold text-[#F1DFD9] bg-[#300F0A] hover:bg-[#F1DFD9] hover:text-[#300F0A] border border-[#F1DFD9]/30 transition-all duration-300 rounded-full shadow-lg"
            >
              CONTACT →
            </button>
          </div>
        </div>

        <div className="text-center font-parkinsans text-[10px] tracking-[0.18em] text-white/40 uppercase">
          © 2026 GERAT SOFTWARE SOLUTION · ADDIS ABABA
        </div>
      </div>

      {/* Global Contact Drawer */}
      <ContactDrawer open={isContactOpen} setOpen={setIsContactOpen} preset={contactPreset} />
    </>
  );
}
