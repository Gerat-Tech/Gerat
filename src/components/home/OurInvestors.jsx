"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "../common/Card";

export default function OurInvestors() {
  // const sectionRef = useRef(null);

  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);

  //   ScrollTrigger.create({
  //     trigger: sectionRef.current,
  //     start: "top top",
  //     end: "+=200%",
  //     pin: true,
  //     scrub: true,
  //   });
  // }, []);

  const investorData = [
    {
      bg: "bg-teal-400",
      title: "Foresight that converts",
      img: "/image/home/investor/home-1.svg",
      number: "01",
      text: "Access to breakthrough companies before markets see them–backed by networks that execute.",
    },
    {
      bg: "bg-red-400",
      title: "Vetted and supported",
      img: "/image/home/investor/home-2.svg",
      number: "02",
      text: "Four to seven ventures annually, each comprehensively evaluated and backed with full infrastructure to scale.",
    },
    {
      bg: "bg-gray-100",
      title: "Transparent and Accelerated.",
      img: "/image/home/investor/home-3.svg",
      number: "03",
      text: "Direct operator access, shared diligence, and portfolio companies build to compress time to value.",
    },
  ];

  return (
    <section
      // ref={sectionRef}
      className="w-full min-h-screen overflow-hidden bg-black py-[120px] md:py-[200px]"
    >
      <div className="max-w-9xl mx-auto flex justify-between">
        {/* left side content  */}
        <div className="px-10">
          <div className="">
            <h2 className=" text-[14px] font-normal mb-4 uppercase text-white/80">
              for Investors
            </h2>
            <p className="uppercase font-normal text-[40px] max-w-[500px] text-white leading-10">
              Invest in
              <br />
              tomorrow’s
              <br />
              category creators.
            </p>
            <div className=" mt-4 mb-8 w-full max-w-[450px] h-[1px] bg-white/20 " />
            <p className="max-w-[450px] text-[12px] font-azeret text-white/50 uppercase">
              Join our investor circle and gain pre-market access to ventures
              creating new markets in AI, Biotech, blockchain and frontier tech.
            </p>
          </div>

          <div className="mt-8 ">
            <a
              href="https://www.worldquantfoundry.com/portfolio"
              className="group relative isolate inline-block hover:animate-glitch-hover motion-reduce:hover:animate-none"
            >
              <div className="px-[20px] py-[10px]">
                {/* DOT */}
                <div className="bg-white button--dot size-[10px] -translate-x-[24px] rounded-[3px] opacity-0 blur-[20px] transition-all duration-400 ease-in-out group-hover:-translate-x-[5px] group-hover:opacity-100 group-hover:blur-0" />

                {/* TEXT */}
                <div className="p2-mono text-white relative isolate flex -translate-x-[5px] overflow-hidden transition-transform duration-400 ease-in-out group-hover:translate-x-[5px]">
                  <span className=" text-[12px] uppercase transition-transform duration-400 ease-in-out group-hover:-translate-y-full">
                    connect with us
                  </span>

                  <span className="absolute inset-0 text-[12px] uppercase translate-y-full transition-transform duration-400 ease-in-out group-hover:translate-y-0">
                    connect with us
                  </span>
                </div>
              </div>

              {/* CORNER  */}

              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white" />
            </a>
          </div>
        </div>

        {/* RIGHT SIDE - SCROLLABLE CARDS */}
        <div>
          <div className="h-full  pr-2 space-y-4">
            <div className="h-full pr-2 space-y-4">
              {investorData.map((card) => (
                <Card key={card.number} {...card} />
                // <Card/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
