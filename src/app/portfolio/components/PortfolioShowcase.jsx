"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/common/Button";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioShowcase() {
  const [active, setActive] = useState(0);
  const itemsRef = useRef([]);

  // Intersection Observer (sidebar active state)
  useEffect(() => {
    const items = itemsRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = items.indexOf(entry.target);
            setActive(index);
          }
        });
      },
      { threshold: 0.5 },
    );

    items.forEach((item) => item && observer.observe(item));

    return () => observer.disconnect();
  }, []);

  // GSAP ScrollTrigger
  useEffect(() => {
    itemsRef.current.forEach((el) => {
      if (!el) return;

      const wrapper = el.querySelector(".logo-wrapper");

      ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        // pin: wrapper,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
    });
  }, []);

  const projects = [
    {
      id: "alpha-deal",
      title: "ALPHA DEAL",
      num: "01 / 06",
      image: "/image/portfolioPage/Alph-1_2026-02-17-164533_rxel.webp",
    },
    {
      id: "edda",
      title: "EDDA",
      num: "02 / 06",
      image: "/image/portfolioPage/edda-featured.webp",
    },
    {
      id: "novyra",
      title: "NOVYRA",
      num: "03 / 06",
      image: "/image/portfolioPage/novyra-featured.webp",
    },
    {
      id: "stratahub",
      title: "Stratahub",
      num: "04 / 06",
      image: "/image/portfolioPage/remix-labs-featured.webp",
    },
    {
      id: "remix-labs",
      title: "Remix labs",
      num: "05 / 06",
      image: "/image/portfolioPage/stratahub-featured.webp",
    },
    {
      id: "us-autonomous-systems",
      title: "US AUTONOMOUS SYSTEMS",
      num: "06 / 06",
      image: "/image/portfolioPage/US-AUT-3.webp",
    },
  ];

  return (
    <div className=" px-10 flex gap-[24px] pb-[120px] md:pb-[200px]">
      {/* SIDEBAR */}
      <aside className="hidden w-full max-w-[207px] shrink-0 lg:block">
        <nav className="sticky top-0 pt-[64px]">
          <ul className="mb-35 flex flex-col ">
            {projects.map((p, i) => (
              <li key={p.id}>
                <a
                  href={`#${p.id}`}
                  className={`font-azeret text-[12px] text-off-white border-l pl-[16px] transition ${
                    active !== i ? "border-transparent opacity-40" : ""
                  }`}
                >
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
          <Button
            padding="px-6 py-3  "
            textColor="text-white/80"
            bgColor="bg-white"
            borderColor="border-white"
          >
            Build with us
          </Button>
        </nav>
      </aside>

      {/* CONTENT */}
      <ul className="flex flex-1 flex-col gap-[8px] pt-[32px] md:gap-[16px] md:pt-[64px]">
        {projects.map((p, i) => (
          <li
            key={p.id}
            id={p.id}
            ref={(el) => (itemsRef.current[i] = el)}
            className="group relative overflow-hidden rounded-[20px]"
          >
            {/* IMAGE */}

            <img
              src={p.image}
              className=" aspect-[1130/700] object-cover w-full"
              alt={p.title}
            />

            {/* OVERLAY */}
            <div className="bg-black/40 absolute inset-0 flex flex-col p-[32px]">
              {/* TITLE */}
              <div className="flex justify-between">
                <h2 className="text-white text-xl uppercase">{p.title}</h2>
                <span className="text-white">{p.num}</span>
              </div>

              {/* BUTTON */}
              <button className="mt-[36px] text-white">
                {" "}
                Find out more →{" "}
              </button>

              {/* CENTER LOGO (PINNED) */}

              <div className="logo-wrapper fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
                {" "}
                <div className="logo size-[100px]">
                  <div className="w-full h-full bg-white/20 rounded-full"></div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
