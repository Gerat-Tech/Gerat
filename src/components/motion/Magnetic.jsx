"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

/**
 * Editorial Subtle Magnetic Attraction Wrapper (Spec ref: §24)
 * Clamps maximum displacement to 6–12px with gentle spring physics.
 * Automatically disabled on touch screens and prefers-reduced-motion.
 */
export default function Magnetic({
  children,
  strength = 0.25,
  maxDisplacement = 8,
  className = "",
}) {
  const ref = useRef(null);
  const [isEnabled, setIsEnabled] = useState(false);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setIsEnabled(!isTouch && !prefersReducedMotion);
  }, []);

  const handleMouseMove = (e) => {
    if (!isEnabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    // Clamp displacement strictly within bounds
    const clampedX = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaX));
    const clampedY = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaY));

    x.set(clampedX);
    y.set(clampedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!isEnabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
