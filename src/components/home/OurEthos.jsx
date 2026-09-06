"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../common/Button";

const cardData = [
  {
    id: 1,
    number: "01 / 04",
    title: "Exponential Foresight",
    description:
      "We spot industry trends before they permeate the industry. Transform them into companies that matter. Some call it foresight. We call it pattern recognition at scale.",
    bg: "bg-[#111111]",
    textColor: "text-white",
    img: "https://worldquant-foundry.files.svdcdn.com/production/images/exponential-foresight-icon.svg",
  },
  {
    id: 2,
    number: "02 / 04",
    title: "Full-stack support",
    description:
      "Brand, marketing, performance, legal, ops, finance, funding, and development. Tech founders need tailored support—and a dedicated team from day one.",
    bg: "bg-[#00f2ea]", // Electric Teal
    textColor: "text-black",
    img: "https://worldquant-foundry.files.svdcdn.com/production/images/full-stack-support-icon.svg",
  },
  {
    id: 3,
    number: "03 / 04",
    title: "Financial stability",
    description:
      "Breakthrough thinking shouldn't compete with rent. That’s why we pay salaries from the start. You focus on building. We handle everything else.",
    bg: "bg-[#ff4d4d]", // Infrared Red
    textColor: "text-white",
    img: "https://worldquant-foundry.files.svdcdn.com/production/images/financial-support-icon.svg",
  },
  {
    id: 4,
    number: "04 / 04",
    title: "Intelligent iteration",
    description:
      "Know what you want to build? Start today. No drawn-out program or slow-moving curriculum. Just ruthless focus on product-market fit and market entry.",
    bg: "bg-[#f5f5f5]", // Off-white
    textColor: "text-black",
    img: "https://worldquant-foundry.files.svdcdn.com/production/images/intelligent-iteration-icon.svg",
  },
];

export default function OurEthos() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section className="relative w-full mx-auto bg-[#dadada]  pt-[220px] pb-[200px] md:py[220px] px-6 md:px-10 text-black overflow-hidden rounded-t-[20px]">
      <div className="max-w-[1400px] ">
        {/* HEADER BLOCK */}
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-start">
          <div className=" flex flex-col gap-3">
            <h2 className=" font-azeret text-[12px] uppercase  text-black">
              Our ethos
            </h2>
            <p className=" text-4xl md:text-3xl font-medium uppercase tracking-tighter leading-none">
              Vision matters.
              <br />
              Velocity wins.
            </p>
          </div>
          <div className="flex flex-col items-start pt-6 border-t border-black/80">
            <p className=" md:text-sm  text-black/80 uppercase  mb-8 max-w-3xl">
              Our comprehensive founder platform shifts the odds. With
              infrastructure that works. With experts who've been there. With
              the right pressure—pushing you forward, not under. This isn't an
              accelerator. It's complete company building.
            </p>

            {/* CORNER BUTTON */}

            <Button
              padding="px-7 py-3"
              textColor="text-black/80"
              bgColor="bg-black"
              borderColor="border-black"
            >
              Join Us
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
              animate={{
                // When a card is active, it takes 40%. When another is active, this one shrinks to 20%
                width:
                  activeCard === null
                    ? "25%"
                    : activeCard === card.id
                      ? "40%"
                      : "20%",
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[600px] shrink-0 overflow-hidden first:rounded-l-[20px] last:rounded-r-[20px]"
            >
              <div
                className={`relative h-full transition-all duration-500 ease-in-out ${card.bg} ${card.textColor}
                  w-[100vw] md:w-[450px] lg:w-[500px]  left-1/2 -translate-x-1/2`}
              >
                {/* <div className="flex flex-col items-center justify-between p-10 h-full text-center"> */}
                {/* //title , card number and description */}
                {/* </div> */}

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
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
