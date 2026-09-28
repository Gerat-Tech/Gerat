"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Official Gerat Brand Bridge Animation
 *
 * Implements the 3-wave brand mark geometry as an interactive,
 * high-precision architectural vector system:
 * - Wave 1 (Discovery & Purpose)
 * - Wave 2 (Architecture & Systems)
 * - Wave 3 (Sustained Engineering & Scale)
 *
 * Enhanced with:
 * - Concentric architectural guide arcs & system coordinates
 * - Staggered harmonic undulation physics
 * - Dynamic data pulse traveling across the suspension arch
 * - Living radar-ring nexus nodes at key structural anchor points
 * - Interactive hover reactivity with warm Almond aura bloom
 */
export default function BrandBridgeAnimation({
  className = "w-full max-w-[560px] h-auto",
  interactive = true,
}) {
  const wavePaths = [
    {
      id: "wave-1",
      d: "M306.66,219.97v17.34c-29.32,0-53.09-20.88-53.09-46.64h-27.15c0,25.76-23.77,46.64-53.09,46.64v-17.34c29.32,0,53.09-20.88,53.09-46.64h27.15c0,25.76,23.77,46.64,53.09,46.64Z",
      yRange: [0, -6, 0],
      scaleRange: [1, 1.025, 1],
      duration: 3.8,
      delay: 0,
    },
    {
      id: "wave-2",
      d: "M306.66,254.65v17.34c-29.32,0-53.09-20.88-53.09-46.64h-27.15c0,25.76-23.77,46.64-53.09,46.64v-17.34c29.32,0,53.09-20.88,53.09-46.64h27.15c0,25.76,23.77,46.64,53.09,46.64Z",
      yRange: [0, -4, 0],
      scaleRange: [1, 1.018, 1],
      duration: 3.8,
      delay: 0.35,
    },
    {
      id: "wave-3",
      d: "M306.66,289.33v17.34c-29.32,0-53.09-20.88-53.09-46.64h-27.15c0,25.76-23.77,46.64-53.09,46.64v-17.34c29.32,0,53.09-20.88,53.09-46.64h27.15c0,25.76,23.77,46.64,53.09,46.64Z",
      yRange: [0, -2.5, 0],
      scaleRange: [1, 1.012, 1],
      duration: 3.8,
      delay: 0.7,
    },
  ];

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Ambient Multi-Layered Almond Aura */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#F1DFD9]/25 blur-[72px] rounded-full pointer-events-none scale-90 transform-gpu animate-pulse"
        style={{ animationDuration: "5s" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-4 bg-[#FAF6ED]/15 blur-[48px] rounded-full pointer-events-none"
      />

      <motion.svg
        viewBox="120 140 240 195"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_12px_32px_rgba(48,15,10,0.22)] overflow-visible"
        aria-label="Gerat Brand Bridge Animation"
        whileHover={interactive ? { scale: 1.035, transition: { duration: 0.3 } } : undefined}
      >
        <defs>
          {/* Main Sculpted Almond Gradient */}
          <linearGradient id="bridgeGradientMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF7" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#F1DFD9" stopOpacity="1" />
            <stop offset="70%" stopColor="#EAD3CB" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#D9BFB6" stopOpacity="0.9" />
          </linearGradient>

          {/* Traveling Shimmer Light Gradient */}
          <linearGradient id="travelingGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Soft Bloom Filter */}
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Architectural Blueprint Coordinates & Compass Radii (Background) */}
        <g opacity="0.22" className="pointer-events-none">
          {/* Subtle Outer Radius Arc */}
          <circle
            cx="240"
            cy="240"
            r="88"
            stroke="#F1DFD9"
            strokeWidth="0.8"
            strokeDasharray="3 5"
          />
          {/* Subtle Inner Orbit */}
          <circle
            cx="240"
            cy="240"
            r="60"
            stroke="#F1DFD9"
            strokeWidth="0.6"
            strokeDasharray="2 4"
          />
          {/* Architectural Axis Crosshairs */}
          <line
            x1="240"
            y1="145"
            x2="240"
            y2="330"
            stroke="#F1DFD9"
            strokeWidth="0.5"
            strokeDasharray="2 6"
          />
          <line
            x1="125"
            y1="240"
            x2="355"
            y2="240"
            stroke="#F1DFD9"
            strokeWidth="0.5"
            strokeDasharray="2 6"
          />
        </g>

        {/* 2. The 3 Brand Bridge Waves */}
        {wavePaths.map((wave) => (
          <motion.path
            key={wave.id}
            d={wave.d}
            fill="url(#bridgeGradientMain)"
            initial={{ opacity: 0.9, y: 0 }}
            animate={{
              opacity: [0.88, 1, 0.88],
              y: wave.yRange,
              scaleY: wave.scaleRange,
            }}
            transition={{
              duration: wave.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: wave.delay,
            }}
            className="origin-center"
          />
        ))}

        {/* 3. Dynamic Structural Connection Thread Linking Key Nodes Across Apex */}
        <motion.path
          d="M 173 220 Q 240 162 307 220"
          fill="none"
          stroke="#300F0A"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          opacity="0.55"
          animate={{ strokeDashoffset: [0, -32] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        />

        {/* 4. Living Radar-Ring Signal Nodes */}
        {/* Left Shoulder Node (cx=173, cy=220) */}
        <g>
          {/* Radar Ring 1 */}
          <motion.circle
            cx="173"
            cy="220"
            r="3"
            fill="none"
            stroke="#F1DFD9"
            strokeWidth="1"
            animate={{ r: [3, 14], opacity: [0.75, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 0 }}
          />
          {/* Outer Halo */}
          <circle cx="173" cy="220" r="4.5" fill="#F1DFD9" opacity="0.6" />
          {/* Core Dot */}
          <motion.circle
            cx="173"
            cy="220"
            r="3"
            fill="#300F0A"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>

        {/* Center Apex Keystone Node (cx=240, cy=186) */}
        <g>
          {/* Radar Ring 1 */}
          <motion.circle
            cx="240"
            cy="186"
            r="4"
            fill="none"
            stroke="#F1DFD9"
            strokeWidth="1.2"
            animate={{ r: [4, 18], opacity: [0.85, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
          />
          {/* Radar Ring 2 */}
          <motion.circle
            cx="240"
            cy="186"
            r="4"
            fill="none"
            stroke="#300F0A"
            strokeWidth="0.8"
            animate={{ r: [4, 13], opacity: [0.55, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 1.1 }}
          />
          {/* Outer Halo */}
          <circle cx="240" cy="186" r="6" fill="#F1DFD9" opacity="0.8" />
          {/* Core Dot */}
          <motion.circle
            cx="240"
            cy="186"
            r="3.8"
            fill="#300F0A"
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />
          {/* Center Micro Spark */}
          <circle cx="240" cy="186" r="1.2" fill="#FAF6ED" />
        </g>

        {/* Right Shoulder Node (cx=307, cy=220) */}
        <g>
          {/* Radar Ring 1 */}
          <motion.circle
            cx="307"
            cy="220"
            r="3"
            fill="none"
            stroke="#F1DFD9"
            strokeWidth="1"
            animate={{ r: [3, 14], opacity: [0.75, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
          />
          {/* Outer Halo */}
          <circle cx="307" cy="220" r="4.5" fill="#F1DFD9" opacity="0.6" />
          {/* Core Dot */}
          <motion.circle
            cx="307"
            cy="220"
            r="3"
            fill="#300F0A"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          />
        </g>

        {/* 5. Traveling Signal Pulse Packet Traversing Left to Right */}
        <motion.circle
          r="2.2"
          fill="#300F0A"
          animate={{
            cx: [173, 240, 307],
            cy: [220, 186, 220],
            opacity: [0, 0.95, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </div>
  );
}

