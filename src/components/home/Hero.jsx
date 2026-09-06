"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "../common/Button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-[#050505] text-white overflow-hidden"
    >
      {/* BACKGROUND */}
      {/* <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1500px] rounded-full border border-white/5" />
      </div> */}

      {/* CENTER CONTENT */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between  px-10 mx-auto py-16 lg:h-[640px]">
        <motion.h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl  font-normal uppercase">
          Forging Companies <br /> That
        </motion.h1>

        <motion.h1 className=" mt-30 text-3xl sm:text-4xl md:text-6xl lg:text-7xl  font-normal uppercase text-right">
          Pull The <br /> Future Forward
        </motion.h1>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="absolute bottom-0 left-0 w-full px-8 lg:px-10 pt-10 pb-8 z-10">
        <div className="w-full border-t border-white/40"></div>

        <div className="mt-4 flex flex-col lg:flex-row gap-6 lg:gap-0 justify-between items-start lg:items-center">
          {/* CONTACT */}

          <Button
            padding="px-7 py-3"
            textColor="text-white/80"
            bgColor="bg-white"
            borderColor="border-white"
          >
            Contact Us
          </Button>

          <div className="flex items-center justify-between gap-6 sm:gap-10 lg:gap-40">
            {/* TEXT */}
            <p className="max-w-[480px] text-[11px] text-white/60 font-azeret uppercase text-left leading-3.5 tracking-normal">
              WorldQuant Foundry is a venture lab that empowers breakthrough
              founders to pull the future forward. Capital. Connections.
              Mentorship. Full-stack support. We deliver more than resources—we
              create the infrastructure for scale.
            </p>

            {/* LOGO */}
            <LogoIcon />
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoIcon() {
  return (
    <svg className="w-[70px] h-[70px]" viewBox="0 0 65 65" fill="none">
      <path
        d="M39.13 43.55C39.13 41.0371 41.1671 39 43.68 39H47.45C49.9629 39 52 36.9629 52 34.45L52 4.55C52 2.03711 54.0371 0 56.55 0L60.45 0C62.9629 0 65 2.03711 65 4.55001V34.45C65 36.9629 62.9629 39 60.45 39H56.68C54.1671 39 52.13 41.0371 52.13 43.55L52.13 60.45C52.13 62.9629 50.0929 65 47.58 65L43.68 65C41.1671 65 39.13 62.9629 39.13 60.45L39.13 43.55Z"
        fill="currentColor"
      />
      <path
        d="M13.13 43.55C13.13 41.0371 15.1671 39 17.68 39H21.45C23.9629 39 26 36.9629 26 34.45L26 4.55C26 2.03711 28.0371 0 30.55 0L34.45 0C36.9629 0 39 2.03711 39 4.55L39 34.45C39 36.9629 36.9629 39 34.45 39H30.68C28.1671 39 26.13 41.0371 26.13 43.55L26.13 60.45C26.13 62.9629 24.0929 65 21.58 65H17.68C15.1671 65 13.13 62.9629 13.13 60.45L13.13 43.55Z"
        fill="currentColor"
      />
      <path
        d="M0 4.55C0 2.0371 2.03711 0 4.55 0L8.45 0C10.9629 0 13 2.0371 13 4.55L13 21.45C13 23.9629 10.9629 26 8.45 26H4.55C2.0371 26 0 23.9629 0 21.45L0 4.55Z"
        fill="currentColor"
      />
    </svg>
  );
}
