"use client";

import { useEffect, useRef } from "react";

export default function TeamHero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // simple demo animation
    let animationFrame;
    let t = 0;

    const draw = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(255,255,255,0.1)";
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2 + Math.sin(t) * 50,
        canvas.height / 2,
        100,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      t += 0.02;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="relative  pt-[160px] md:pt-[220px] px-10 ">
      <div className="max-w-[1280px]">
        {/* Heading */}
        <h1 className="text-off-white/60 flex items-center gap-[10px] text-sm font-mono">
          <span className="bg-gray-400 w-[10px] h-[10px] rounded-[3px]" />
          About WorldQuant Foundry
        </h1>

        {/* Main Title */}
        <div className="mt-[20px] md:mt-[24px] uppercase text-2xl md:text-3xl text-gray-300">
          From zero to one, or from one to exponential, WorldQuant Foundry turns
          capability into victory. We empower founders, working with them from
          idea to impact.
        </div>
      </div>

      {/* Scroll text */}
      <p className="mt-[32px] md:mt-[40px] border-b border-white/20 pb-[8px] text-white/60 text-sm font-mono">
        Scroll to explore
      </p>

      {/* Right paragraph */}
      <p className="mt-[20px] md:mt-[24px] ml-auto md:mr-[115px] max-w-[553px] text-white/60 text-base font-mono">
        The companies we build don&apos;t enter markets; they define them. The
        enterprises we partner with understand that transformation isn&apos;t
        optional—it's survival.
        <br />
        <br />
        Vision matters. But velocity wins.
      </p>

      {/* Canvas */}
      {/* <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 w-full h-full"
        style={{
          maskImage:
            "linear-gradient(0deg, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}
      /> */}
    </div>
  );
}
