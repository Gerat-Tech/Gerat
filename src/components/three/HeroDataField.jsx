"use client";

import React, { useEffect, useRef, useState } from "react";
import Hero3DFallback from "./Hero3DFallback";

/**
 * 3D Parametric Logo Wave Sculpture
 *
 * Modeled directly after the user's reference image (media_1789851276659.png),
 * shaped in Gerat's iconic 3-wave harmonic bridge geometry.
 *
 * Renders an ordered parametric dot cloud with true 3D perspective projection,
 * depth sorting, smooth orbital rotation, and responsive mouse parallax tilt.
 *
 * Engineered with high-contrast dual-mode palettes:
 * - Dark mode: Brilliant Warm Almond (#FAF6ED) dots with vibrant Flame Orange (#EA5B15) crests.
 * - Light mode: Crisp Coffee Bean (#300F0A) dots with Flame Orange (#EA5B15) accents.
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

    // Pointer target with spring interpolation (smooth tilt parallax)
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
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

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / width - 0.5;
      const ny = (e.clientY - rect.top) / height - 0.5;
      pointer.targetX = nx * 1.2;
      pointer.targetY = ny * 1.0;
    };

    const onPointerLeave = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
    };

    const onScroll = () => {
      scrollY = window.scrollY * 0.15;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // =========================================================================
    // Parametric 3D Point Generation: Gerat 3-Wave Harmonic Sculpture
    // =========================================================================
    const numRings = 52;
    const dotsPerRing = 34;
    const baseModelPoints = [];

    // Generate rings along a 3D harmonic wave spine path
    for (let r = 0; r < numRings; r++) {
      const t = (r / numRings) * Math.PI * 2;

      // 3-Wave Harmonic Spine (incorporating Gerat's 3-wave peaks)
      const spineRadiusX = 220;
      const spineRadiusY = 160;
      const spineRadiusZ = 140;

      // The 3-wave harmonic crests via Math.sin(3 * t)
      const waveOffset = Math.sin(3 * t) * 60;

      const spineX = Math.cos(t) * (spineRadiusX + waveOffset * 0.3);
      const spineY = Math.sin(t) * (spineRadiusY + waveOffset * 0.5);
      const spineZ = Math.sin(2 * t) * spineRadiusZ + Math.cos(3 * t) * 45;

      // Tangent vector along spine for ring orientation
      const dt = 0.01;
      const tNext = t + dt;
      const waveNext = Math.sin(3 * tNext) * 60;
      const nextX = Math.cos(tNext) * (spineRadiusX + waveNext * 0.3);
      const nextY = Math.sin(tNext) * (spineRadiusY + waveNext * 0.5);
      const nextZ = Math.sin(2 * tNext) * spineRadiusZ + Math.cos(3 * tNext) * 45;

      const tx = nextX - spineX;
      const ty = nextY - spineY;
      const tz = nextZ - spineZ;
      const tLen = Math.hypot(tx, ty, tz) || 1;
      const dirX = tx / tLen;
      const dirY = ty / tLen;
      const dirZ = tz / tLen;

      // Normal vectors perpendicular to tangent
      let normX = -dirY;
      let normY = dirX;
      let normZ = 0;
      const nLen = Math.hypot(normX, normY, normZ) || 1;
      normX /= nLen;
      normY /= nLen;

      // Binormal vector
      const binormX = dirY * normZ - dirZ * normY;
      const binormY = dirZ * normX - dirX * normZ;
      const binormZ = dirX * normY - dirY * normX;

      // Ring radius with 3-wave modulation
      const ringRadius = 55 + Math.sin(3 * t) * 22;

      for (let d = 0; d < dotsPerRing; d++) {
        const theta = (d / dotsPerRing) * Math.PI * 2;
        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);

        // Point coordinates in 3D relative to spine
        const px = spineX + (normX * cosTheta + binormX * sinTheta) * ringRadius;
        const py = spineY + (normY * cosTheta + binormY * sinTheta) * (ringRadius * 0.75);
        const pz = spineZ + (normZ * cosTheta + binormZ * sinTheta) * ringRadius;

        // Is this dot on the crest of the 3 waves? (Upper perimeter of the swell)
        const isCrest = sinTheta > 0.65 && Math.sin(3 * t) > 0.2;
        const isAccentRing = r % 8 === 0;

        baseModelPoints.push({
          x: px,
          y: py,
          z: pz,
          isAccent: isCrest || (isAccentRing && d % 4 === 0),
        });
      }
    }

    // Pre-allocated rendered points for sorting
    const renderPoints = baseModelPoints.map((p) => ({
      x: 0,
      y: 0,
      z: 0,
      screenX: 0,
      screenY: 0,
      size: 0,
      alpha: 0,
      isAccent: p.isAccent,
    }));

    let time = 0;

    // Render loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.007;

      // Smooth pointer lerp
      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Detect theme for high-contrast visibility
      const isLightMode =
        typeof document !== "undefined" &&
        (document.documentElement.classList.contains("light") ||
          document.documentElement.classList.contains("site-light"));

      // 3D Rotation angles: gentle orbital drift + interactive pointer tilt
      const yaw = time * 0.45 + pointer.x * 0.65;
      const pitch = 0.35 + Math.sin(time * 0.3) * 0.15 + pointer.y * 0.45;
      const roll = Math.cos(time * 0.25) * 0.1;

      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const cosR = Math.cos(roll);
      const sinR = Math.sin(roll);

      // Center offset: Positioned slightly to the right to balance hero typography
      const centerX = width * (width < 768 ? 0.5 : 0.65);
      const centerY = height * 0.44 - scrollY;
      const focalLength = 550;

      // Transform, rotate & project points
      const count = baseModelPoints.length;
      for (let i = 0; i < count; i++) {
        const bp = baseModelPoints[i];
        const rp = renderPoints[i];

        // 1. Rotate Y (Yaw)
        let x1 = bp.x * cosY + bp.z * sinY;
        let y1 = bp.y;
        let z1 = -bp.x * sinY + bp.z * cosY;

        // 2. Rotate X (Pitch)
        let x2 = x1;
        let y2 = y1 * cosP - z1 * sinP;
        let z2 = y1 * sinP + z1 * cosP;

        // 3. Rotate Z (Roll)
        let x3 = x2 * cosR - y2 * sinR;
        let y3 = x2 * sinR + y2 * cosR;
        let z3 = z2;

        rp.x = x3;
        rp.y = y3;
        rp.z = z3;

        // Perspective projection
        const scale = focalLength / (focalLength + z3 + 260);
        rp.screenX = centerX + x3 * scale;
        rp.screenY = centerY + y3 * scale;

        // Depth-dependent size and opacity
        const depthNorm = Math.max(0, Math.min(1, (z3 + 300) / 600));
        rp.size = Math.max(1.1, (1.2 + depthNorm * 2.4) * (width < 768 ? 0.85 : 1.0));

        // Visibility opacities: high contrast in BOTH modes!
        if (isLightMode) {
          rp.alpha = 0.35 + depthNorm * 0.55; // 0.35 to 0.90 in Light Mode
        } else {
          rp.alpha = 0.40 + depthNorm * 0.58; // 0.40 to 0.98 in Dark Mode
        }
      }

      // Depth-sort points back to front for proper occlusion and depth feel
      renderPoints.sort((a, b) => a.z - b.z);

      // Ambient warm radial bloom at the core of the 3D sculpture
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        20,
        centerX,
        centerY,
        Math.min(width, height) * 0.42
      );
      if (isLightMode) {
        glowGrad.addColorStop(0, "rgba(234, 91, 21, 0.08)");
        glowGrad.addColorStop(0.5, "rgba(234, 91, 21, 0.02)");
        glowGrad.addColorStop(1, "rgba(241, 223, 217, 0)");
      } else {
        glowGrad.addColorStop(0, "rgba(234, 91, 21, 0.16)");
        glowGrad.addColorStop(0.5, "rgba(234, 91, 21, 0.04)");
        glowGrad.addColorStop(1, "rgba(13, 7, 6, 0)");
      }
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw all 3D points
      for (let i = 0; i < count; i++) {
        const p = renderPoints[i];

        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, p.size, 0, Math.PI * 2);

        if (p.isAccent) {
          // Vibrant Flame Orange (#EA5B15) crests and accents
          ctx.fillStyle = `rgba(234, 91, 21, ${Math.min(1.0, p.alpha * 1.25)})`;
        } else if (isLightMode) {
          // Deep Coffee Bean (#300F0A) in Light Mode
          ctx.fillStyle = `rgba(48, 15, 10, ${p.alpha})`;
        } else {
          // Warm Almond (#FAF6ED) in Dark Mode
          ctx.fillStyle = `rgba(250, 246, 237, ${p.alpha})`;
        }

        ctx.fill();
      }

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
        className="w-full h-full object-cover opacity-95 transition-opacity duration-700"
      />
    </div>
  );
}
