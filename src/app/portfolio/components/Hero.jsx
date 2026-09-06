"use client";

export default function Hero() {
  return (
    <div className="relative  mx-auto pt-[160px] md:pt-[220px] px-10 ">
      {/* TOP CONTENT */}
      <div className="flex gap-[24px]">
        {/* LEFT SPACER */}
        <div className="hidden w-full max-w-[207px] shrink-0 md:block" />

        {/* TEXT */}
        <div className="max-w-[896px]">
          <h1 className="flex items-center gap-[10px] text-sm uppercase text-white/60 font-mono">
            <span className="w-[10px] h-[10px] bg-gray-300 rounded-[3px]" />
            Portfolio
          </h1>

          <div className="mt-[20px] md:mt-[24px] uppercase text-[28px] md:text-[50px] text-white/80 font-normal leading-12">
            Born at the edge of exponential. Where zero becomes one.
          </div>
        </div>
      </div>

      {/* SCROLL TEXT */}
      <p className="mt-[32px] md:mt-[40px] border-b border-white/20 pb-[8px] text-[12px] uppercase text-white/60 font-azeret">
        Scroll to explore
      </p>
    </div>
  );
}
