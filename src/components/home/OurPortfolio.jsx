"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function OurPortfolio() {
  const data = [
    {
      title: "Alpha Deal",
      desc: "Private asset analysis, reimagined.",
      color: "#1c412e",
    },
    {
      title: "Edda",
      desc: "Social-first audiobook platform.",
      color: "#5640ff",
    },
    {
      title: "Novyra",
      desc: "Precision oncology matching.",
      color: "#fffebe",
    },

    {
      title: "Alpha Deal",
      desc: "Private asset analysis, reimagined.",
      color: "#1c412e",
    },
    {
      title: "Edda",
      desc: "Social-first audiobook platform.",
      color: "#5640ff",
    },
    {
      title: "Novyra",
      desc: "Precision oncology matching.",
      color: "#fffebe",
    },
  ];

  return (
    <section className="overflow-hidden bg-[#dadada]  pt-[170px] pb-[120px] md:pb-[200px]">
      <div className=" text-black container mx-auto">
        {/* HEADER */}

        <div className="mx-auto mb-[80px] flex max-w-[668px] flex-col items-center gap-[15px] text-center md:mb-[100px]">
          <h2 className="p1-mono">Our portfolio</h2>

          <p className="text-3xl mb-[24px] text-balance uppercase md:mb-[32px]">
            Our companies don't just enter markets. They define them.
          </p>

          <a
            href="https://www.worldquantfoundry.com/portfolio"
            className="group relative isolate block hover:animate-glitch-hover motion-reduce:hover:animate-none"
          >
            <div className="flex h-[40px] items-center justify-center px-[20px]">
              {/* DOT */}
              <div className="bg-black button--dot size-[10px] -translate-x-[24px] rounded-[3px] opacity-0 blur-[20px] transition-all duration-400 ease-in-out group-hover:-translate-x-[5px] group-hover:opacity-100 group-hover:blur-0" />

              {/* TEXT */}
              <div className="p2-mono text-black relative isolate flex -translate-x-[5px] overflow-hidden transition-transform duration-400 ease-in-out group-hover:translate-x-[5px]">
                <span className="transition-transform duration-400 ease-in-out group-hover:-translate-y-full">
                  Explore our portfolio
                </span>

                <span className="absolute inset-0 translate-y-full transition-transform duration-400 ease-in-out group-hover:translate-y-0">
                  Explore our portfolio
                </span>
              </div>
            </div>

            {/* CORNER  */}

            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-black" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black" />
          </a>
        </div>

        {/* SLIDER */}

        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={40}
          className="overflow-visible"
        >
          {data.map((item, i) => (
            <SwiperSlide key={i} className="!w-[300px]">
              <div
                className="group flex h-[500px] w-[350px]  flex-col items-center justify-center gap-5 bg-white/40 rounded-xl p-6 transition-all duration-300 hover:bg-green-900"
                style={{ backgroundColor: item.color }}
              >
                <h3 className="ppercase font-semibold">{item.title}</h3>
                <p className="text-sm opacity-70 text-center">{item.desc}</p>

                {/* <button className="mt-6 px-4 py-2 border border-white opacity-0 group-hover:opacity-100 transition">
                  Website
                </button> */}
                <a
                  href="https://joinedda.com/"
                  target="_blank"
                  className="mt-auto text-sm "
                >
                  Website
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="mt-30 flex items-center justify-between md:justify-center md:gap-[32px]">
          <button className=" font-light opacity-70">
            <ArrowLeft className="w-6 h-6" />
          </button>

          <p className="font-mono text-sm md:hidden">01 / 06</p>

          <button className=" font-light opacity-70">
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
