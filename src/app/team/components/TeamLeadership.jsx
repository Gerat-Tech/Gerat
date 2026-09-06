"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TeamLeadership() {
  const bottomBorderRef = useRef(null);
  const rightBorderRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    // Bottom border animation
    gsap.from(bottomBorderRef.current, {
      scaleX: 0,
      duration: 0.8,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: bottomBorderRef.current,
        start: "top 70%",
      },
    });

    // Responsive animation
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.from(rightBorderRef.current, {
        scaleY: 0,
        duration: 0.8,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: rightBorderRef.current,
          start: "top 70%",
        },
      });
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.from(rightBorderRef.current, {
        scaleX: 0,
        duration: 0.8,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: rightBorderRef.current,
          start: "top 70%",
        },
      });
    });
  }, []);

  const team = [
    {
      name: "Igor Tulchinsky",
      role: "Founder",
      img: "/image/team/leadership/WQF__0000_Founder-IgorTulchinsky.webp",
    },
    {
      name: "Amir Husain",
      role: "Chairman",
      img: "/image/team/leadership/WQF__0004_Chairman-and-Co-Founder_Amir-Husain-2.webp",
    },
    {
      name: "Steven Lau",
      role: "CEO",
      img: "/image/team/leadership/WQF__0005_CEO-and-Co-Founder_Steven-Lau.webp",
    },
  ];

  return (
    <section className="pt-[120px]">
      <div className="group relative isolate grid grid-cols-12 gap-y-[24px] pb-[24px] md:pb-0 lg:gap-x-[40px]">
        {/* Bottom Border */}
        <div
          ref={bottomBorderRef}
          className="absolute bottom-0 left-0 h-px w-full bg-white/20 origin-left"
        />

        {/* LEFT SIDE */}
        <div className="relative col-span-12 flex flex-col gap-[12px] pb-[32px] md:py-[40px] lg:col-span-3 lg:pr-[32px] lg:pb-0">
          {/* Right Border */}
          <div
            ref={rightBorderRef}
            className="absolute right-0 bottom-0 h-px w-full bg-white/20 origin-left lg:top-0 lg:h-full lg:w-px lg:origin-top"
          />

          <div className="flex items-center gap-[1ch] text-sm font-mono">
            <h2>leadership</h2>
            <p className="text-white/60">[03]</p>
          </div>

          <p className="text-white/60 text-sm max-w-[250px]">
            The leaders driving WorldQuant Foundry's mission forward—each
            bringing decades of experience.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <ul className="col-span-12 grid md:grid-cols-3 gap-y-[24px] gap-x-[16px] lg:col-span-9 lg:gap-x-[24px]">
          {team.map((member, index) => (
            <li
              key={index}
              className="relative flex flex-col gap-[8px] md:gap-[20px]"
            >
              {/* IMAGE */}
              <img
                src={member.img}
                alt={member.name}
                className="aspect-[0.8/1] object-cover w-full"
              />

              {/* TEXT */}
              <div className="flex flex-col items-start gap-[4px]">
                <h3 className="text-sm md:text-base">{member.name}</h3>

                <div className="flex items-start gap-[8px]">
                  <div className="w-[8px] h-[8px] border-b border-l border-white/40"></div>
                  <p className="text-white/60 text-xs md:text-sm">
                    {member.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
