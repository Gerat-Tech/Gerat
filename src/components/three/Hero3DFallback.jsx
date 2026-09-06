"use client";

import React from "react";

/**
 * Editorial 3D Fallback (Spec §45)
 * Rendered when WebGL is unavailable, in reduced-motion mode, or on low-power devices.
 * Architectural network grid with subtle static glowing nodes.
 */
export default function Hero3DFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none opacity-40"
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            id="nexusGlow"
            cx="65%"
            cy="45%"
            r="45%"
            fx="65%"
            fy="45%"
          >
            <stop offset="0%" stopColor="#ff4a00" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#ff4a00" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#050505" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="gridLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient Radial Bloom */}
        <rect width="1440" height="900" fill="url(#nexusGlow)" />

        {/* Perspective Grid Vectors */}
        <g stroke="url(#gridLine)" strokeWidth="1">
          <line x1="900" y1="400" x2="1440" y2="100" />
          <line x1="900" y1="400" x2="1440" y2="300" />
          <line x1="900" y1="400" x2="1440" y2="500" />
          <line x1="900" y1="400" x2="1440" y2="700" />
          <line x1="900" y1="400" x2="1440" y2="900" />
          <line x1="900" y1="400" x2="1000" y2="900" />
          <line x1="900" y1="400" x2="600" y2="900" />
          <line x1="900" y1="400" x2="200" y2="900" />
          <line x1="900" y1="400" x2="0" y2="600" />
          <line x1="900" y1="400" x2="0" y2="300" />
          <line x1="900" y1="400" x2="300" y2="0" />
          <line x1="900" y1="400" x2="800" y2="0" />
          <line x1="900" y1="400" x2="1200" y2="0" />
        </g>

        {/* Concentric Node Rings */}
        <circle
          cx="900"
          cy="400"
          r="120"
          stroke="rgba(255,255,255,0.06)"
          strokeDasharray="4 4"
        />
        <circle
          cx="900"
          cy="400"
          r="240"
          stroke="rgba(255,255,255,0.04)"
          strokeDasharray="6 6"
        />
        <circle
          cx="900"
          cy="400"
          r="380"
          stroke="rgba(255,255,255,0.02)"
          strokeDasharray="8 8"
        />

        {/* Central Core Nodes */}
        <circle cx="900" cy="400" r="4" fill="#ff4a00" />
        <circle cx="960" cy="380" r="2" fill="#ffffff" opacity="0.6" />
        <circle cx="850" cy="450" r="2.5" fill="#ffffff" opacity="0.5" />
        <circle cx="1020" cy="430" r="3" fill="#ff4a00" opacity="0.7" />
        <circle cx="820" cy="320" r="2" fill="#ffffff" opacity="0.4" />
      </svg>
    </div>
  );
}
