"use client";

import { useEffect, useRef } from "react";

export default function TeamEthos() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // basic placeholder animation (replace with Three.js later)
    let animationFrame;
    let t = 0;

    const draw = () => {
      if (!ctx) return;

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2 + Math.sin(t) * 60,
        canvas.height / 2,
        120,
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
    <section className="relative isolate mt-[120px] overflow-hidden rounded-[20px] bg-gray-200 py-[120px] md:mt-[200px] md:pt-[200px] md:pb-[400px]">
      {/* Canvas Background */}
      {/* <div className="pointer-events-none absolute inset-0 -z-10 w-full h-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{
            maskImage:
              "linear-gradient(0deg, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        />
      </div> */}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Section 1 */}
        <div className="mx-auto max-w-[993px] text-black text-center">
          <h2 className="text-sm uppercase tracking-widest">our ethos</h2>

          <p className="mt-[12px] text-2xl md:text-4xl uppercase font-semibold">
            We've built the businesses. Raised the rounds. Shipped the products.
          </p>

          <p className="mx-auto mt-[24px] max-w-[550px] md:mt-[32px] text-base">
            We know exponential technology doesn't wait—advanced computing,
            blockchain, biotech, and robotics move faster than convention. We've
            been in your seat. We know where you need to go and how to get you
            there.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mx-auto mt-[120px] max-w-[700px] text-black text-center md:mt-[504px]">
          <h2 className="uppercase text-lg md:text-xl font-semibold">
            Entrepreneurship demands everything. The stakes are real. This game
            is binary: you deliver or you disappear.
          </h2>

          <p className="mx-auto mt-[24px] max-w-[574px] md:mt-[32px] text-base">
            WorldQuant Foundry shifts those odds. With infrastructure that
            works. With advisors who've been there. With the right
            pressure—pushing you forward, not under.
            <br />
            <br />
            We give founders what they need to focus: operational support that
            removes distraction, resources that arrive when required, and
            relationships that convert to results.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mx-auto mt-[120px] max-w-[1050px] text-black text-center md:mt-[504px]">
          <h2 className="uppercase text-2xl md:text-3xl font-semibold">
            The future moves fast. Building it needs to move faster. That's why
            we exist. To match that speed with founders who demand it.
          </h2>
        </div>
      </div>
    </section>
  );
}
