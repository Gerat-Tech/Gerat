"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function subscribeTouchMotion(callback) {
  if (typeof window === "undefined") return () => {};
  const touchQuery = window.matchMedia("(pointer: coarse)");
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  touchQuery.addEventListener("change", callback);
  motionQuery.addEventListener("change", callback);
  return () => {
    touchQuery.removeEventListener("change", callback);
    motionQuery.removeEventListener("change", callback);
  };
}

function getCursorEnabled() {
  if (typeof window === "undefined") return false;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return !isTouch && !prefersReduced;
}

/**
 * Editorial Precision Custom Cursor (Spec ref: §22)
 * Features a high-precision dot, spring-interpolated trailing ring, and contextual label support.
 * Automatically disabled on touch screens and under prefers-reduced-motion.
 */
export default function CustomCursor() {
  const isEnabled = useSyncExternalStore(subscribeTouchMotion, getCursorEnabled, () => false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Motion coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring for the outer ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target;
      if (!target) return;

      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      );

      if (interactive) {
        setIsHovered(true);
        const text = interactive.getAttribute("data-cursor-text");
        setCursorText(text || "");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible, isEnabled]);

  if (!isEnabled || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Precision Core Dot (Locks directly to pointer) */}
      <motion.div
        className="fixed top-0 left-0 size-1.5 rounded-full bg-accent pointer-events-none z-20"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.6 : isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer Spring Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-10 flex items-center justify-center rounded-full border border-white/40 bg-white/[0.03] backdrop-blur-[1px]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorText ? 64 : isHovered ? 44 : 26,
          height: cursorText ? 64 : isHovered ? 44 : 26,
          borderColor: isHovered
            ? "var(--accent, #ff4a00)"
            : "rgba(255, 255, 255, 0.35)",
          backgroundColor: isHovered
            ? "rgba(255, 74, 0, 0.08)"
            : "rgba(255, 255, 255, 0.02)",
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
        }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="font-azeret text-[8px] tracking-[0.2em] font-bold text-accent uppercase text-center"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
