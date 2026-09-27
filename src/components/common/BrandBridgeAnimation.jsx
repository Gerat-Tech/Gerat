"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Official Gerat Brand Bridge Animation
 *
 * Implements the 3-wave brand mark geometry from `docs/brand/` as an interactive,
 * organic vector animation representing "The Bridge" from business need to working system:
 * - Wave 1 (Discovery & Need)
 * - Wave 2 (Architecture & Engineering)
 * - Wave 3 (Sustained System & Scale)
 */
export default function BrandBridgeAnimation({
  className = "w-full max-w-[540px] h-auto",
  color = "#EA5B15",
  interactive = true,
}) {
  const wavePaths = [
    {
      id: "wave-1",
      d: "M306.66,219.97v17.34c-29.32,0-53.09-20.88-53.09-46.64h-27.15c0,25.76-23.77,46.64-53.09,46.64v-17.34c29.32,0,53.09-20.88,53.09-46.64h27.15c0,25.76,23.77,46.64,53.09,46.64Z",
      delay: 0,
    },
    {
      id: "wave-2",
      d: "M306.66,254.65v17.34c-29.32,0-53.09-20.88-53.09-46.64h-27.15c0,25.76-23.77,46.64-53.09,46.64v-17.34c29.32,0,53.09-20.88,53.09-46.64h27.15c0,25.76,23.77,46.64,53.09,46.64Z",
      delay: 0.18,
    },
    {
      id: "wave-3",
      d: "M306.66,289.33v17.34c-29.32,0-53.09-20.88-53.09-46.64h-27.15c0,25.76-23.77,46.64-53.09,46.64v-17.34c29.32,0,53.09-20.88,53.09-46.64h27.15c0,25.76,23.77,46.64,53.09,46.64Z",
      delay: 0.36,
    },
  ];

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Ambient Flame Glow Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-accent/15 blur-[64px] rounded-full pointer-events-none scale-75 transform-gpu"
      />

      <svg
        viewBox="140 160 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_8px_24px_rgba(234,91,21,0.25)] overflow-visible"
        aria-label="Gerat Brand Bridge Animation"
      >
        <defs>
          <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EA5B15" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#FF7A38" stopOpacity="1" />
            <stop offset="100%" stopColor="#EA5B15" stopOpacity="0.85" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 3 Animated Waves */}
        {wavePaths.map((wave, idx) => (
          <motion.path
            key={wave.id}
            d={wave.d}
            fill="url(#bridgeGradient)"
            initial={{ opacity: 0.8, scale: 0.98 }}
            animate={{
              opacity: [0.8, 1, 0.8],
              scale: [0.99, 1.015, 0.99],
              y: [0, -3, 0],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: wave.delay,
            }}
            whileHover={
              interactive
                ? {
                    scale: 1.04,
                    filter: "url(#glow)",
                    transition: { duration: 0.25 },
                  }
                : undefined
            }
            className="cursor-pointer origin-center"
          />
        ))}

        {/* Dynamic Bridge Anchor Nodes */}
        <motion.circle
          cx="173"
          cy="220"
          r="3"
          fill="#FAF6ED"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="240"
          cy="190"
          r="3.5"
          fill="#FAF6ED"
          animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.circle
          cx="307"
          cy="220"
          r="3"
          fill="#FAF6ED"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </svg>
    </div>
  );
}
