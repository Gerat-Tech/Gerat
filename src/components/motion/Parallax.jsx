"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Editorial Parallax Layer (Spec §21)
 * Restrained subtle displacement (-20px to +20px) preserving spatial coherence
 */
export default function Parallax({
  children,
  offset = 24, // max pixel displacement
  className = "",
  ...props
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  if (prefersReducedMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative ${className}`} {...props}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
