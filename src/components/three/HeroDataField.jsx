"use client";

import React, { useEffect, useRef, useState } from "react";
import Hero3DFallback from "./Hero3DFallback";

/**
 * Architectural Topological Horizon Grid (Option 1)
 *
 * Replaces heavy particle swarm with a serene, high-precision
 * mathematical coordinate wireframe. Renders an undulating perspective mesh
 * inspired by architectural blueprints and structural endurance.
 */
export default function HeroDataField() {
  const canvasRef = useRef(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setTimeout(() => setReducedMotion(true), 0);
      }
    }
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setHasWebGL(false);
      return;
    }

    let animationFrameId;
    let isVisible = true;
    let width = 0;
    let height = 0;

    // Pointer target and spring-interpolated coordinates (5% influence for serenity)
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, isHovered: false };
    let scrollY = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.parentElement?.offsetHeight || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Pointer movement listener with gentle spring tracking
    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / width - 0.5;
      const ny = (e.clientY - rect.top) / height - 0.5;
      pointer.targetX = nx * 120;
      pointer.targetY = ny * 60;
      pointer.isHovered = true;
    };

    const onPointerLeave = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
      pointer.isHovered = false;
    };

    const onScroll = () => {
      scrollY = window.scrollY * 0.12;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // Pause rendering when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // Grid configuration: 26 transverse rows x 32 longitudinal columns
    const cols = 32;
    const rows = 26;

    // Pre-allocated coordinate matrices for peak rendering efficiency
    const projectedPoints = [];
    for (let r = 0; r < rows; r++) {
      projectedPoints[r] = [];
      for (let c = 0; c < cols; c++) {
        projectedPoints[r][c] = { x: 0, y: 0, alpha: 0 };
      }
    }

    let time = 0;

    // Render loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.008;

      // Spring lerp for smooth parallax
      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Detect light mode for adaptive stroke contrast
      const isLightMode =
        typeof document !== "undefined" &&
        (document.documentElement.classList.contains("light") ||
          document.documentElement.classList.contains("site-light"));

      const baseStrokeColor = isLightMode
        ? "48, 15, 10" // Coffee Bean
        : "250, 246, 237"; // Warm Almond
      const accentColor = "234, 91, 21"; // Flame Orange

      // Horizon epicenter (balanced slightly to the right of hero text)
      const vanishX = width * 0.64 + pointer.x;
      const vanishY = height * 0.36 + pointer.y - scrollY;
      const focalLength = 380;

      // 1. Calculate projected coordinates with mathematical wave elevation
      for (let r = 0; r < rows; r++) {
        // z advances from horizon (far) to foreground (near)
        const zNorm = r / (rows - 1);
        const z = 120 + Math.pow(zNorm, 1.8) * 850;
        const scale = focalLength / (focalLength + z);

        const rowAlpha = Math.min(1, Math.pow(zNorm, 1.2));

        for (let c = 0; c < cols; c++) {
          const cNorm = (c / (cols - 1)) * 2 - 1; // -1 to +1
          const spreadWidth = width * (1.2 + zNorm * 0.8);
          const worldX = cNorm * spreadWidth * 0.6;

          // Harmonic sine/cosine topological wave
          const waveFreqX = 0.0028;
          const waveFreqZ = 0.0042;
          const elevation =
            Math.sin(worldX * waveFreqX + time * 0.9) *
              Math.cos(z * waveFreqZ + time * 0.6) *
              36 +
            Math.sin((worldX + z) * 0.002 + time * 0.4) * 16;

          // Elevation relative to camera plane
          const worldY = 90 + zNorm * 220 + elevation;

          const screenX = vanishX + worldX * scale;
          const screenY = vanishY + worldY * scale;

          projectedPoints[r][c].x = screenX;
          projectedPoints[r][c].y = screenY;
          projectedPoints[r][c].alpha = rowAlpha;
        }
      }

      // 2. Draw Transverse Curves (Latitude Elevation Contours)
      for (let r = 0; r < rows; r++) {
        const isAccentRow = r % 7 === 0;
        const pts = projectedPoints[r];
        const rowAlpha = pts[0].alpha;

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);

        for (let c = 1; c < cols; c++) {
          // Smooth curve through points
          const prev = pts[c - 1];
          const curr = pts[c];
          const midX = (prev.x + curr.x) * 0.5;
          const midY = (prev.y + curr.y) * 0.5;
          ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
        }
        ctx.lineTo(pts[cols - 1].x, pts[cols - 1].y);

        if (isAccentRow) {
          ctx.strokeStyle = `rgba(${accentColor}, ${0.12 * rowAlpha})`;
          ctx.lineWidth = 1.2;
        } else {
          ctx.strokeStyle = `rgba(${baseStrokeColor}, ${0.055 * rowAlpha})`;
          ctx.lineWidth = 0.85;
        }
        ctx.stroke();
      }

      // 3. Draw Longitudinal Perspective Splines (Depth Lines)
      for (let c = 0; c < cols; c++) {
        const isAccentCol = c % 6 === 0;

        ctx.beginPath();
        ctx.moveTo(projectedPoints[0][c].x, projectedPoints[0][c].y);

        for (let r = 1; r < rows; r++) {
          const pt = projectedPoints[r][c];
          ctx.lineTo(pt.x, pt.y);
        }

        const colAlpha = isAccentCol ? 0.16 : 0.045;
        ctx.strokeStyle = isAccentCol
          ? `rgba(${accentColor}, ${colAlpha})`
          : `rgba(${baseStrokeColor}, ${colAlpha})`;
        ctx.lineWidth = isAccentCol ? 1.0 : 0.75;
        ctx.stroke();
      }

      // 4. Draw Precision Vertex Nodes at Select Intersections
      for (let r = 4; r < rows; r += 4) {
        for (let c = 3; c < cols; c += 5) {
          const pt = projectedPoints[r][c];
          const pulse = 0.5 + 0.5 * Math.sin(time * 2 + r * 1.5 + c * 2.1);
          const isOrange = (r + c) % 2 === 0;

          // Subtle glowing crosshair node
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, isOrange ? 2.0 : 1.4, 0, Math.PI * 2);
          ctx.fillStyle = isOrange
            ? `rgba(${accentColor}, ${0.45 * pt.alpha * pulse})`
            : `rgba(${baseStrokeColor}, ${0.35 * pt.alpha * pulse})`;
          ctx.fill();

          // Subtle pulse ring for accent nodes
          if (isOrange && pulse > 0.7) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 4 + pulse * 4, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${accentColor}, ${0.12 * (1 - pulse) * pt.alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // 5. Delicate ambient horizon glow
      const glowGradient = ctx.createRadialGradient(
        vanishX,
        vanishY + 40,
        10,
        vanishX,
        vanishY + 40,
        width * 0.45
      );
      glowGradient.addColorStop(0, `rgba(${accentColor}, 0.04)`);
      glowGradient.addColorStop(0.5, `rgba(${accentColor}, 0.01)`);
      glowGradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reducedMotion]);

  if (reducedMotion || !hasWebGL) {
    return <Hero3DFallback />;
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover opacity-90 transition-opacity duration-700"
      />
    </div>
  );
}
