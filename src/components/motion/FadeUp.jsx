"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Lift Reveal Family (Spec §15, §16 Family A)
 * Smooth upward translation (24-40px) and opacity fade
 * Duration: 500-700ms, Easing: cubic-bezier(0.22, 1, 0.36, 1)
 */
export default function FadeUp({
  children,
  className = "",
  delay = 0,
  duration = 0.65,
  y = 32,
  once = true,
  threshold = 0.15,
  as = "div",
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (prefersReducedMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
