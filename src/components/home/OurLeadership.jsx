"use client";

import React, { useState } from "react";

export default function OurLeadership() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const partners = [
    {
      name: "Igor Tulchinsky",
      role: "Founder",
      image: "/image/home/leadership/WQF__0000_Founder-IgorTulchinsky.webp",
      position: "50% 33%",
    },
    {
      name: "Amir Husain",
      role: "Chairman",
      image:
        "/image/home/leadership/WQF__0004_Chairman-and-Co-Founder_Amir-Husain-2.webp",
      position: "50% 27%",
    },

    {
      name: "Steven Lau",
      role: "CEO",
      image:
        "/image/home/leadership/WQF__0005_CEO-and-Co-Founder_Steven-Lau.webp",

      position: "50% 30%",
    },
  ];
  return (
    <section className="w-full min-h-screen bg-black rounded-t-[2xl]">
      <div className="flex flex-row justify-between p-8">
        <h2 className="text-[16px] font-normal">Our Leadership</h2>
        <h2 className="text-[16px] font-normal">Our Leadership</h2>
        <h2 className="text-[16px] font-normal">Our Leadership</h2>
      </div>
      <div className=" mt-20 flex  flex-col items-center gap-[15px] text-center md:mb-[100px]">
        <p className="max-w-[330px] text-[12px] font-azeret text-white/60 ">
          A global network of advisors, operators and investors. The people who
          built what’s now, helping you build what’s next.
        </p>

        <div
          className="m-4 p2-mono text-white/70 text-[14px] relative isolate flex -translate-x-[5px] 
            overflow-hidden transition-transform duration-400 ease-in-out group-hover:translate-x-[5px]"
        >
          <span className=" px-6 py-3 uppercase transition-transform duration-400 ease-in-out group-hover:-translate-y-full">
            meet the team
          </span>

          <span className="absolute inset-0 px-6 py-3 uppercase translate-y-full transition-transform duration-400 ease-in-out group-hover:translate-y-0">
            meet the team
          </span>

          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white" />
        </div>
      </div>

      {/* part: Partners image and text  */}
      <div className="flex flex-col gap-10">
        {/* Top Title */}
        <div className="md:text-4xl text-3xl font-bold mx-auto hidden max-w-[666px] text-center uppercase md:block">
          <div className="overflow-clip">
            <div className="transition-transform duration-500">
              We spot trends before
            </div>
          </div>
          <div className="overflow-clip">
            <div className="transition-transform duration-500">
              they're trends.{" "}
              <span className="md:hidden">
                Transform them into companies that matter.
              </span>
            </div>
          </div>
        </div>

        {/* Partners Grid */}
        <div
          className="group/partners relative z-1 grid w-full grid-cols-1 md:grid-cols-3 md:px-0"
          onMouseLeave={() => setExpandedIndex(null)}
        >
          {partners.map((partner, index) => (
            <div
              key={index}
              className="relative group/card h-[400px] md:h-[480px] w-full cursor-pointer"
              onClick={() =>
                setExpandedIndex(index === expandedIndex ? null : index)
              }
            >
              <button className="relative isolate flex h-full w-full items-end justify-end overflow-hidden bg-[#111111] outline-hidden">
                {/* Floating Job Title */}
                <div
                  className={`flex items-center gap-[10px] pr-[20px] pb-[15px] z-10 transition-transform duration-300 
                ${expandedIndex === index ? "translate-y-0" : "md:translate-y-[100%] group-hover/card:translate-y-0"}`}
                >
                  <div className="bg-[#dadada] size-2.5 rounded-[3px]"></div>
                  <p className="font-mono text-sm text-[#dadada] uppercase">
                    {partner.role}
                  </p>
                </div>

                {/* Background Image */}
                <div
                  className={`absolute inset-0 -z-1 size-full bg-cover bg-no-repeat 
                ${expandedIndex === index}`}
                  style={{
                    backgroundImage: `url(${partner.image})`,
                    backgroundPosition: partner.position,
                  }}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Title */}
        <div className="md:text-4xl text-3xl font-bold mx-auto hidden max-w-[666px] text-center uppercase md:block">
          <div className="overflow-clip">
            <div>Transform them into</div>
          </div>
          <div className="overflow-clip">
            <div>companies that matter.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
