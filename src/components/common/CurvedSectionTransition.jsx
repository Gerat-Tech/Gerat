"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * CurvedSectionTransition
 *
 * Implements the fluid, scroll-driven section transition inspired by Receivio:
 * - Starts as a smooth, shallow curved/arched edge as the section enters the viewport
 * - Progressively straightens into a flat horizontal boundary as the section scrolls into position
 * - Fluid, subtle, with no hard cut
 * - Responsive arch height adapting between mobile, tablet, and desktop
 */
export default function CurvedSectionTransition({
  fill = "var(--surface)",
  stroke = "var(--border-subtle)",
  showStroke = true,
  defaultMaxArch = 48,
  className = "",
}) {
  const transitionRef = useRef(null);
  const [maxArch, setMaxArch] = useState(defaultMaxArch);

  useEffect(() => {
    const updateArch = () => {
      if (window.innerWidth < 640) {
        setMaxArch(Math.min(defaultMaxArch, 24));
      } else if (window.innerWidth < 1024) {
        setMaxArch(Math.min(defaultMaxArch, 36));
      } else {
        setMaxArch(defaultMaxArch);
      }
    };
    updateArch();
    window.addEventListener("resize", updateArch, { passive: true });
    return () => window.removeEventListener("resize", updateArch);
  }, [defaultMaxArch]);

  // Track the transition boundary entering the viewport:
  // "start end": boundary touches bottom of viewport (scrollYProgress = 0)
  // "start 25%": boundary reaches upper quarter of viewport (scrollYProgress = 1)
  const { scrollYProgress } = useScroll({
    target: transitionRef,
    offset: ["start end", "start 25%"],
  });

  // Dynamic curve height: morphs from shallow arch (maxArch) down to 0 (flat horizontal)
  const curveHeight = useTransform(scrollYProgress, [0, 0.85], [maxArch, 0]);

  return (
    <div
      ref={transitionRef}
      className={`w-full overflow-hidden shrink-0 pointer-events-none select-none relative z-20 ${className}`}
      aria-hidden="true"
    >
      <motion.div
        style={{ height: curveHeight }}
        className="w-full overflow-hidden -mb-[1px]"
      >
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          {/* Smooth quadratic curve arching upwards in center and tapering to edges */}
          <path
            d="M 0 60 Q 720 0 1440 60 L 1440 60 L 0 60 Z"
            fill={fill}
          />
          {showStroke && stroke && (
            <path
              d="M 0 60 Q 720 0 1440 60"
              fill="none"
              stroke={stroke}
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />
          )}
        </svg>
      </motion.div>
    </div>
  );
}
