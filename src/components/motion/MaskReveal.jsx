"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Mask Reveal Family (Spec §15, §16 Family B)
 * Geometric clip-path wipe for imagery, heroes, and editorial headings
 * Duration: 700-1000ms, Easing: cubic-bezier(0.22, 1, 0.36, 1)
 */
export default function MaskReveal({
  children,
  className = "",
  direction = "bottom", // 'bottom' | 'right' | 'inset'
  delay = 0,
  duration = 0.85,
  once = true,
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

  const clipVariants = {
    bottom: {
      initial: "inset(0% 0% 100% 0%)",
      animate: "inset(0% 0% 0% 0%)",
    },
    right: {
      initial: "inset(0% 100% 0% 0%)",
      animate: "inset(0% 0% 0% 0%)",
    },
    inset: {
      initial: "inset(12% 12% 12% 12%)",
      animate: "inset(0% 0% 0% 0%)",
    },
  };

  const selected = clipVariants[direction] || clipVariants.bottom;

  return (
    <Component
      initial={{ clipPath: selected.initial, opacity: 0.4 }}
      whileInView={{ clipPath: selected.animate, opacity: 1 }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
