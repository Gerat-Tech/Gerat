"use client";

import React from "react";
import { usePageTransition } from "@/context/PageTransitionContext";

/**
 * Editorial Route Transition Overlay (Spec §32, §33)
 * Elegant dark wipe curtain with accent progress line between page navigations.
 */
export default function TransitionOverlay() {
  const { isTransitioning } = usePageTransition();

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[250] pointer-events-none transition-all duration-400 ease-(--ease-primary) ${
        isTransitioning
          ? "opacity-100 bg-black/40 backdrop-blur-[2px]"
          : "opacity-0"
      }`}
    >
      {/* Top accent progress line */}
      <div
        className={`h-[2px] bg-accent transition-all duration-400 ease-out ${
          isTransitioning ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
      />
    </div>
  );
}
