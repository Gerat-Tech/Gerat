"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      // Your canvas logic here...
    }
  }, []);
  // Example navigation links to keep the JSX clean
  const navLinks = [
    { name: "WHY WQF", href: "/why-wqf" },
    { name: "PORTFOLIO", href: "/portfolio" },
    { name: "TEAM", href: "/about" },
    { name: "INSIGHTS", href: "/insights" },
    { name: "Contact", href: "#contact" },
  ];

  const legalLinks = [
    {
      name: "Whistleblower Protection Statement",
      href: "/legal/whistleblower-protection-statement",
    },
    { name: "Privacy Policy", href: "/legal/privacy-policy" },
    { name: "Terms and Conditions", href: "/legal/terms-and-conditions" },
    { name: "Cookie Policy", href: "/legal/cookie-policy" },
  ];

  return (
    <footer className="bg-[#0a0a0a] relative grid lg:grid-cols-2">
      {/* Decorative Canvas Element */}

      <canvas className="hidden size-full lg:block" ref={canvasRef}></canvas>

      <div
        className="bg-[#ff4d00] text-[#0a0a0a] grid w-full grid-cols-2 gap-[12px] gap-y-[60px]
            rounded-t-[20px] px-[10px] pt-[30px] pb-[10px] md:min-h-[666px] md:gap-[32px] md:gap-y-[210px]
              md:rounded-bl-[20px] md:pt-[40px] md:pb-[30px] lg:px-[24px] xl:px-[40px]"
      >
        {/* Left Section: CTA */}
        <div className="flex w-full flex-col items-start justify-start gap-[12px]">
          <h2 className="text-xl font-bold uppercase tracking-tighter">
            Own what’s next.
          </h2>
          <p className="font-mono text-sm mb-auto">
            Breakthrough founders. Pre-market investors. Transformative
            partners. Reach out, and let's move.
          </p>

          <div className="mt-[18px] w-full max-w-[200px] md:mt-0">
            <button
              className="group/button relative isolate flex h-[40px] items-center justify-center px-[20px] border border-current overflow-hidden transition-all duration-400"
              onClick={() => console.log("Open Modal")}
            >
              <div className="flex items-center justify-center">
                {/* Glitch/Slide Animation Text */}
                <div className="font-mono text-sm relative isolate flex overflow-hidden transition-transform duration-400 group-hover/button:translate-x-[5px]">
                  <span className="transition-transform duration-400 group-hover/button:-translate-y-full">
                    Contact Us
                  </span>
                  <span className="absolute inset-0 translate-y-full transition-transform duration-400 group-hover/button:translate-y-0">
                    Contact Us
                  </span>
                </div>
              </div>
              {/* Corner Accents (SVGs) */}
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  className={`absolute size-[9px] ${getCornerClass(i)} opacity-100`}
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path d="M0.5 0.2V9.2M0.2 0.5H9.2" stroke="currentColor" />
                </svg>
              ))}
            </button>
          </div>
        </div>

        {/* Emblem/Logo Section */}
        <div className="ml-auto max-w-[90px] md:order-1 md:col-start-2 md:ml-0 md:max-w-full md:items-end md:gap-0">
          <svg
            className="w-full h-auto max-h-[290px] aspect-square block"
            viewBox="0 0 65 65"
            fill="none"
          >
            <path
              d="M39.13 43.55C39.13 41.0371 41.1671 39 43.68 39H47.45C49.9629 39 52 36.9629 52 34.45L52 4.55C52 2.03711 54.0371 0 56.55 0L60.45 0C62.9629 0 65 2.03711 65 4.55001V34.45C65 36.9629 62.9629 39 60.45 39H56.68C54.1671 39 52.13 41.0371 52.13 43.55L52.13 60.45C52.13 62.9629 50.0929 65 47.58 65L43.68 65C41.1671 65 39.13 62.9629 39.13 60.45L39.13 43.55Z"
              fill="currentColor"
            />
            <path
              d="M13.13 43.55C13.13 41.0371 15.1671 39 17.68 39H21.45C23.9629 39 26 36.9629 26 34.45L26 4.55C26 2.03711 28.0371 0 30.55 0L34.45 0C36.9629 0 39 2.03711 39 4.55L39 34.45C39 36.9629 36.9629 39 34.45 39H30.68C28.1671 39 26.13 41.0371 26.13 43.55L26.13 60.45C26.13 62.9629 24.0929 65 21.58 65H17.68C15.1671 65 13.13 62.9629 13.13 60.45L13.13 43.55Z"
              fill="currentColor"
            />
            <path
              d="M0 4.55C0 2.0371 2.03711 0 4.55 0L8.45 0C10.9629 0 13 2.0371 13 4.55L13 21.45C13 23.9629 10.9629 26 8.45 26H4.55C2.0371 26 0 23.9629 0 21.45L0 4.55Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Main Nav Links */}
        <nav className="order-1 col-span-2 flex flex-col gap-[32px] md:order-2 md:col-span-1 md:justify-end">
          <ul className="flex flex-col gap-[4px]">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="group/button text-2xl font-bold relative isolate flex items-center gap-[8px] uppercase"
                >
                  <div className="bg-[#0a0a0a] -mt-[3.5px] size-[25px] -translate-x-full rounded-[8px] opacity-0 blur-[32px] transition-all duration-500 group-hover/button:translate-x-0 group-hover/button:opacity-100 group-hover/button:blur-[0px]"></div>
                  <div className="relative isolate flex -translate-x-[33px] overflow-hidden transition-transform duration-500 group-hover/button:translate-x-0">
                    <span className="transition-transform duration-500 group-hover/button:-translate-y-full">
                      {link.name}
                    </span>
                    <span
                      className="absolute inset-0 translate-y-full transition-transform duration-500 group-hover/button:translate-y-0"
                      aria-hidden="true"
                    >
                      {link.name}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <p className="text-xs font-mono opacity-60">
              <span>Site by</span>{" "}
              <a
                href="https://serieseight.com"
                target="_blank"
                className="opacity-100 hover:underline"
              >
                Series Eight
              </a>
            </p>
            <p className="text-xs font-mono opacity-60">
              Copyright © 2026 WorldQuant Foundry
            </p>
          </div>
        </nav>

        {/* Legal & Ventures Section */}
        <div className="contents flex-col items-end gap-[40px] md:order-3 md:flex md:justify-between">
          <div className="order-3 flex w-full flex-col gap-[10px] md:order-1">
            <p className="text-xs font-mono">From worldquant</p>
            <ul className="flex flex-col gap-[4px]">
              {["Ventures", "University"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="group/button text-lg font-bold relative isolate flex items-center gap-[8px] uppercase"
                  >
                    <div className="bg-[#0a0a0a] size-[16px] -translate-x-full rounded-[4px] opacity-0 blur-[32px] transition-all duration-500 group-hover/button:translate-x-0 group-hover/button:opacity-100 group-hover/button:blur-[0px]"></div>
                    <div className="relative isolate flex -translate-x-[24px] overflow-hidden transition-transform duration-500 group-hover/button:translate-x-0">
                      <span className="transition-transform duration-500 group-hover/button:-translate-y-full">
                        {item}
                      </span>
                      <span className="absolute inset-0 translate-y-full transition-transform duration-500 group-hover/button:translate-y-0">
                        {item}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <ul className="order-3 flex w-full max-w-[273px] flex-col items-start gap-[6px] md:order-2">
            {legalLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="group/button font-mono text-xs relative block transition-all"
                >
                  <span className="relative isolate before:absolute before:bottom-0 before:left-0 before:h-px before:w-full before:origin-left before:scale-x-0 before:bg-current before:transition-transform before:duration-400 group-hover/button:before:scale-x-100">
                    {link.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

// Helper for corner SVGs positioning
const getCornerClass = (i, number) => {
  const positions = [
    "top-0 left-0",
    "top-0 right-0 rotate-90",
    "bottom-0 right-0 rotate-180",
    "bottom-0 left-0 -rotate-90",
  ];
  return positions[i];
};
