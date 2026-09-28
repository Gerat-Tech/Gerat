"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * CurvedSectionTransition
 *
 * Implements the fluid, scroll-driven section transition inspired by Receivio:
 * - Starts as a smooth, elegant, circular/elliptical horizon arc rising into the section above
 * - Progressively straightens into a flat horizontal boundary as the user scrolls down
 * - Absolute positioning so it overlaps without causing layout shifts or scroll feedback loops
 * - Initial SSR path ensures the curve is immediately rendered before hydration
 */
export default function CurvedSectionTransition({
  fill = "#F1DFD9",
  stroke = "transparent",
  showStroke = false,
  offset = ["start end", "start 25%"],
  defaultMaxArch = 50,
  className = "",
}) {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track the boundary entering the viewport:
  // "start end": top of the transition container touches the bottom of the viewport
  // "start 25%": transition container approaches reading level
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset,
  });

  // Morph control point Y from -100 (smooth upward parabolic dome reaching apex at y=0)
  // down to 100 (perfectly straight flat horizontal line at y=100)
  const curveY = useTransform(scrollYProgress, [0, 0.85], [-100, 100]);
  const pathD = useTransform(
    curveY,
    (y) => `M 0 100 Q 720 ${y} 1440 100 L 1440 105 L 0 105 Z`
  );

  return (
    <div
      ref={containerRef}
      className={`absolute -top-20 sm:-top-24 md:-top-28 lg:-top-32 xl:-top-36 left-0 right-0 w-full h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 pointer-events-none select-none z-20 overflow-visible ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-full block overflow-visible"
      >
        <motion.path
          d={mounted ? pathD : "M 0 100 Q 720 -100 1440 100 L 1440 105 L 0 105 Z"}
          fill={fill}
        />
        {showStroke && stroke && (
          <motion.path
            d={mounted ? pathD : "M 0 100 Q 720 -100 1440 100"}
            fill="none"
            stroke={stroke}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
    </div>
  );
}
