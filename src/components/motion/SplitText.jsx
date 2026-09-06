"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Editorial Split Text Animation (Spec §17)
 * Splits headlines into staged words with overflow clipping
 * Preserves accessibility via aria-label on parent and aria-hidden on animated spans
 */
export default function SplitText({
  text,
  className = "",
  wordClassName = "",
  stagger = 0.05,
  delay = 0,
  duration = 0.7,
  as: Component = "h2",
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion || !text) {
    return <Component className={className}>{text}</Component>;
  }

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: "115%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <Component className={className} aria-label={text}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="inline-flex flex-wrap gap-x-[0.25em] overflow-hidden"
        aria-hidden="true"
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em]">
            <motion.span variants={wordVariants} className={`inline-block ${wordClassName}`}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}
