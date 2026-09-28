"use client";

import React, { useRef } from "react";
import { Phone } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import SectionLabel from "../common/SectionLabel";
import SplitText from "../motion/SplitText";
import FadeUp from "../motion/FadeUp";
import Magnetic from "../motion/Magnetic";
import GeratLogo from "../common/GeratLogo";
import { useNav } from "@/context/NavContext";

/**
 * Section 06: FINAL CTA ("WHAT HAPPENS NEXT")
 *
 * Distinct Interaction Pattern:
 * - Deep Perspective Anchor with Watermark Parallax
 * - Dual Magnetic Conversion Buttons (Start a Project & Call Us Now)
 * - Scroll-linked scale settling as user scrolls towards the footer
 * - Atmospheric bottom gradient bridging smoothly into the cinematic footer reveal
 */
export default function FinalCTA() {
  const { openContact } = useNav();
  const ctaRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });

  // Parallax drift on the background watermark mark
  const watermarkY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-36, 36]
  );

  // Subtle perspective settling as user approaches the bottom edge
  const ctaScale = useTransform(
    scrollYProgress,
    [0.7, 1],
    prefersReducedMotion ? [1, 1] : [1, 0.99]
  );

  return (
    <section
      ref={ctaRef}
      id="contact"
      aria-label="Contact and Next Steps"
      data-dark-card="true"
      className="w-full bg-[#300F0A] text-[#F1DFD9] relative scroll-mt-24 overflow-hidden"
    >
      <motion.div
        style={{
          scale: ctaScale,
        }}
        className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-20 sm:py-28 md:py-36 overflow-hidden will-change-transform"
      >
        {/* Background Bridge Watermark Accent with Parallax Float */}
        <motion.div
          style={{ y: watermarkY }}
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none translate-x-1/4 will-change-transform"
        >
          <GeratLogo variant="mark" className="w-[520px] h-[520px] text-[#F1DFD9]" />
        </motion.div>

        <div className="relative z-10 max-w-3xl flex flex-col gap-6 sm:gap-8">
          <SectionLabel label="WHAT HAPPENS NEXT" />

          <div className="space-y-1 sm:space-y-2">
            <SplitText
              text="HAVE SOMETHING"
              as="h2"
              delay={0.1}
              stagger={0.04}
              className="font-parkinsans text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight uppercase leading-[1.04] text-[#F1DFD9]"
            />
            <SplitText
              text="WORTH BUILDING?"
              as="div"
              delay={0.25}
              stagger={0.04}
              wordClassName="text-accent"
              className="font-parkinsans text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight uppercase leading-[1.04]"
            />
          </div>

          <FadeUp delay={0.35} y={16} className="max-w-xl">
            <p className="font-artific text-base sm:text-lg text-[#F1DFD9]/85 leading-relaxed font-normal">
              Tell us what you are trying to improve, build, or scale. We will start with the business problem and work forward from there.
            </p>
          </FadeUp>

          <FadeUp delay={0.5} y={16} className="pt-2">
            {/* Bold Primary Action Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
              <Magnetic maxDisplacement={10}>
                <button
                  type="button"
                  onClick={() => openContact()}
                  className="group relative isolate inline-flex items-center justify-center font-parkinsans text-xs sm:text-sm uppercase tracking-[0.2em] px-8 sm:px-10 py-4 bg-accent text-[#F1DFD9] font-bold hover:bg-[#F1DFD9] hover:text-[#300F0A] border-2 border-accent hover:border-[#F1DFD9] transition-all duration-300 rounded-full shadow-[0_12px_36px_rgba(234,91,21,0.35)] select-none cursor-pointer"
                >
                  <span className="transition-colors duration-300 group-hover:!text-[#300F0A]">
                    START A PROJECT
                  </span>
                  <span className="ml-2.5 transition-all duration-300 group-hover:translate-x-1.5 group-hover:!text-[#300F0A]">
                    →
                  </span>
                </button>
              </Magnetic>

              <Magnetic maxDisplacement={10}>
                <a
                  href="tel:+251929298030"
                  className="group relative isolate inline-flex items-center justify-center font-parkinsans text-xs sm:text-sm uppercase tracking-[0.2em] px-7 sm:px-9 py-4 bg-transparent text-[#F1DFD9] font-bold hover:bg-[#F1DFD9] hover:text-[#300F0A] border-2 border-[#F1DFD9]/35 hover:border-[#F1DFD9] transition-all duration-300 rounded-full shadow-md select-none cursor-pointer"
                >
                  <Phone className="w-4 h-4 mr-2.5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="transition-colors duration-300 group-hover:!text-[#300F0A]">
                    CALL US NOW
                  </span>
                </a>
              </Magnetic>
            </div>
          </FadeUp>
        </div>
      </motion.div>
    </section>
  );
}
