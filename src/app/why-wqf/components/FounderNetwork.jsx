"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/common/Button";

const cardData = [
  {
    id: 1,

    title: "Domain Experts Who Deliver",
    description:
      "Serial founders and sector leaders who've been there. Direct mentorship that accelerates. Real customer connections that convert. Not just contacts—but commitments.",
    bg: "bg-[#111111]",
    textColor: "text-white",
    img: "https://worldquant-foundry.files.svdcdn.com/production/images/domain-experts-icon.svg", // approximate
  },
  {
    id: 2,
    title: "High-Caliber Cohort",
    description:
      "Visionaries who match your energy and drive, connected through accelerators, universities, and beyond. Community-oriented success, not competition.",
    bg: "bg-[#6f9ea6]", // teal shade from image
    textColor: "text-black",
    img: "https://worldquant-foundry.files.svdcdn.com/production/images/high-caliber-cohort-icon.svg", // approximate
  },
  {
    id: 3,
    title: "Supported and In Control",
    description:
      "The right pressure pushes you forward, not under. Your company. Your vision. Your decisions. We're here to help you win.",
    bg: "bg-[#f26b3f]", // orange shade from image
    textColor: "text-black",
    img: "https://worldquant-foundry.files.svdcdn.com/production/images/supported-control-icon.svg", // approximate
  },
];
export default function FounderNetwork() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section className="relative w-full mx-auto pt-[120px] pb-[80px] md:py-[200px] px-6 md:px-10 text-black overflow-hidden rounded-t-[20px]">
      <div className="max-w-[1400px] ">
        {/* HEADER BLOCK */}
        <div className=" text-white grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-start">
          <div className=" flex flex-col gap-3">
            <p className=" text-4xl md:text-[40px] font-medium uppercase tracking-tighter leading-none">
              Connections that
              <br />
              move you forward.
            </p>
          </div>
          <div className="flex flex-col items-start pt-6 border-t border-white/80">
            <p className=" md:text-sm  text-white/80 uppercase  mb-8 max-w-3xl">
              Mentorship from those who've built it. Community that matches your
              drive. Support that keeps you in control.
            </p>

            {/* CORNER BUTTON */}
            <Button
              padding="px-7 py-3"
              textColor="text-white/80"
              bgColor="bg-white"
              borderColor="border-white"
            >
              Build with us
            </Button>
          </div>
        </div>

        {/* EXPANDABLE CARDS LIST */}

        <ul className="flex flex-col md:flex-row h-auto md:h-[600px] relative">
          {cardData.map((card) => (
            <motion.li
              key={card.id}
              onMouseEnter={() => setActiveCard(card.id)}
              onMouseLeave={() => setActiveCard(null)}
              style={{ width: "100%", zIndex: 10 + card.id }}
              animate={{
                width:
                  activeCard === null
                    ? "35%"
                    : activeCard === card.id
                      ? "40%"
                      : "20%",
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`relative h-[500px] md:h-full shrink-0 overflow-hidden rounded-[24px] ${card.bg} ${card.textColor} transition-all duration-500
              md:-ml-[120px] first:ml-0 hover:z-50`}
              style={{ width: "100%", zIndex: 10 + card.id }}
            >
              <div className="flex flex-col items-center justify-between p-10 h-full text-center">
                <h3 className="text-2xl font-medium uppercase tracking-tighter max-w-[200px]">
                  {card.title}
                </h3>

                {/* Illustration placeholder */}
                <div className="w-full h-48 flex items-center justify-center">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="max-h-full object-contain"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <span className="font-mono text-[10px] opacity-60">
                    {card.number}
                  </span>
                  <p className="text-[11px] uppercase font-azeret tracking-wider leading-relaxed opacity-80 max-w-[280px]">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
