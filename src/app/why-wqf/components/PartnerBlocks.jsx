"use client";

import { useEffect, useRef } from "react";

export default function PartnerBlocks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // simple placeholder animation
    let animationFrame;
    let t = 0;

    function draw() {
      if (!ctx) return;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < 100; i++) {
        const x = w / 2 + Math.sin(i + t) * 100;
        const y = h / 2 + Math.cos(i + t) * 100;
        ctx.fillRect(x, y, 2, 2);
      }

      t += 0.02;
      animationFrame = requestAnimationFrame(draw);
    }

    draw();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section className="container mx-auto grid gap-[80px] pb-[120px] md:grid-cols-2 md:gap-[24px] md:pb-[200px] px-4">
      {/* LEFT SIDE (Sticky Canvas) */}
      {/* <div>
        <div className="sticky top-0 pt-[80px] md:pt-[100px]">
          <div className="relative isolate flex aspect-square w-full max-w-[553px] items-center justify-center">
            <h1 className="text-white">Particle animation will be here</h1>
            <canvas
              ref={canvasRef}
              width={600}
              height={600}
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </div> */}
      <div>
        <div className="h-full mr-100  flex items-center justify-center ">
          <div className="bg-white/30 p-4 text-white">
            <p>wave particle animation will be here</p>
            <p>I will come back here, once the structure is ready</p>

            <p className="mt-12 text-2xl text-blue-200">
              Developer — Rafikul Shaikh
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (Content) */}
      <div className="flex flex-col gap-[80px] md:gap-[200px] md:pt-[100px] md:pl-[60px]">
        {/* BLOCK 1 */}
        <div className="max-w-[507px]">
          <h3 className="uppercase text-[18px] md:text-[40px] font-semibold">
            Who we partner with.
          </h3>

          <p className="mt-[32px] border-t border-white/20 pt-[24px] md:mt-[40px] md:pt-[32px] text-sm md:text-base">
            Universities, accelerators, research institutions, and
            corporations—from industry pioneers to leading enterprises. We work
            with organizations ready to redefine markets, rather than follow
            them.
          </p>
        </div>

        {/* BLOCK 2 */}
        <div className="max-w-[507px]">
          <h3 className="uppercase text-[18px] md:text-[40px] font-semibold">
            What you gain.
          </h3>

          <p className="mt-[32px] border-t border-white/20 pt-[24px] md:mt-[40px] md:pt-[32px] text-sm md:text-base">
            Exposure to innovation before it's obvious. Access to applied
            research and emerging talent solving problems that don't have
            solutions yet. Better positioning than partnering with companies
            already in market—because you see what's next while there's still
            time to lead it.
          </p>
        </div>

        {/* BLOCK 3 */}
        <div className="max-w-[507px]">
          <h3 className="uppercase text-[18px] md:text-[40px] font-semibold">
            Proven track record.
          </h3>

          <p className="mt-[32px] border-t border-white/20 pt-[24px] md:mt-[40px] md:pt-[32px] text-sm md:text-base">
            Value creation opportunities identified before they become
            competitive necessities. Access to what creates value next—before it
            becomes what everyone needs. That head start is what defines who
            leads and who follows.
          </p>
        </div>
      </div>
    </section>
  );
}
