"use client";

import React, { useEffect, useRef, useState } from "react";
import Hero3DFallback from "./Hero3DFallback";

/**
 * Procedural Data-Flow Particle Field (Spec §11, §12)
 * High-performance generative particle simulation representing complex operations
 * converging into structured digital systems.
 */
export default function HeroDataField() {
  const canvasRef = useRef(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [reducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

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

    // Pointer target and spring-interpolated coordinates (Spec §11: 5-12% influence)
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = 0;

    // Responsive particle count (Spec §11: 8k-12k desktop, 3k-5k mobile)
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 2200 : 5500;
    const particles = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75); // Spec §12
      width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.parentElement.offsetHeight || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Initialize particles along spiral flow trajectories
    const centerX = width * 0.65;
    const centerY = height * 0.45;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 30 + Math.pow(Math.random(), 1.5) * (Math.max(width, height) * 0.65);
      const isAccent = Math.random() < 0.12; // 12% accent particles (#ff4a00)

      particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        originX: centerX + Math.cos(angle) * radius,
        originY: centerY + Math.sin(angle) * radius,
        radius,
        angle,
        speed: (0.0008 + Math.random() * 0.002) * (Math.random() < 0.5 ? 1 : -1),
        radialSpeed: 0.15 + Math.random() * 0.35,
        size: isAccent ? Math.random() * 2 + 1.2 : Math.random() * 1.5 + 0.6,
        alpha: isAccent ? Math.random() * 0.7 + 0.3 : Math.random() * 0.45 + 0.1,
        isAccent,
        driftSeed: Math.random() * 100,
      });
    }

    // Pointer move listener
    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.targetX = (e.clientX - rect.left - width * 0.5) * 0.08;
      pointer.targetY = (e.clientY - rect.top - height * 0.5) * 0.08;
    };

    const onScroll = () => {
      scrollY = window.scrollY * 0.15;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // IntersectionObserver to pause when offscreen (Spec §12)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    let time = 0;

    // Render loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.01;

      // Spring interpolation for pointer (Spec §11: no direct snap)
      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Current dynamic epicenter
      const curCenterX = (width * 0.62) + pointer.x;
      const curCenterY = (height * 0.45) + pointer.y - scrollY * 0.3;

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Orbit and drift
        p.angle += p.speed;
        p.radius += Math.sin(time + p.driftSeed) * 0.2;

        const targetX = curCenterX + Math.cos(p.angle) * p.radius;
        const targetY = curCenterY + Math.sin(p.angle) * (p.radius * 0.75);

        // Gentle drag toward target
        p.x += (targetX - p.x) * 0.08;
        p.y += (targetY - p.y) * 0.08;

        // Render point
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (p.isAccent) {
          ctx.fillStyle = `rgba(255, 74, 0, ${p.alpha})`;
        } else {
          ctx.fillStyle = `rgba(240, 240, 240, ${p.alpha})`;
        }

        ctx.fill();
      }

      // Draw subtle orbital rings around epicenter
      ctx.beginPath();
      ctx.arc(curCenterX, curCenterY, 90, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(curCenterX, curCenterY, 220, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 74, 0, 0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
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
        className="w-full h-full object-cover opacity-85"
      />
    </div>
  );
}
