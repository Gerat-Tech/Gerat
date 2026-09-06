"use client";

import Button from "../../../components/common/Button";

export default function LatestNews() {
  const news = [
    {
      title:
        "WorldQuant Foundry Chairman, Amir Husain, Speaks at Future Investment Initiative",
      desc: "WorldQuant Foundry Chairman, Amir Husain, Speaks at Future Investment Initiative 2025 on Deep Tech and AI Innovation",
      img: "/image/LatestNews/01_Picture.webp",
      read: "3 min read",
      date: "Apr 16 2026",
    },
    {
      title: "WorldQuant Foundry Appoints Dr. Dmitry Green",
      desc: "WorldQuant Foundry Appoints Dr. Dmitry Green as Senior Quantum Computing Advisor to Accelerate Deep-Tech Innovation",
      img: "/image/LatestNews/02_Advisor_Dmitry-Green.webp",
      read: "5 min read",
      date: "Mar 18 2026",
      span: "md:col-span-2",
    },
    {
      title: "WorldQuant Foundry Appoints Dr. Christopher Mason",
      desc: "WorldQuant Foundry Appoints Dr. Christopher Mason as Senior Healthcare Advisor to Spearhead AI-Driven Healthcare Innovation",
      img: "/image/LatestNews/03_Chris-Mason-hero.webp",
      read: "3 min read",
      date: "Jul 20 2025",
    },
    {
      title: "WorldQuant Foundry Congratulates Chairman Amir Husain",
      desc: "WorldQuant Foundry Congratulates Chairman Amir Husain on Receiving The University of Texas' Presidential Citation Award",
      img: "/image/LatestNews/04_Amir_Husain_Hero.webp",
      read: "4 min read",
      date: "Jun 29 2025",
    },
    {
      title: "WorldQuant Foundry Launches Alpha Deal",
      desc: "	WorldQuant Foundry Launches Alpha Deal to Pioneer the Future of Deal Intelligence for Private Asset Investors",
      img: "/image/LatestNews/05_Apha_deal_launch.webp",
      read: "5 min read",
      date: "Jun 11 2025",
      span: "md:col-span-2",
    },
    {
      title: "WorldQuant Foundry Partners with StartX Accelerator",
      desc: "WorldQuant Foundry Partners with StartX Accelerator to Drive Entrepreneurial Innovation",
      img: "/image/LatestNews/06_jorik-kleen.webp",
      read: "3 min read",
      date: "Nov 26 2024",
    },
    {
      title: "WorldQuant Foundry Launches",
      desc: "WorldQuant Foundry Launches",
      img: "/image/LatestNews/07_worldquant-foundry-launch.webp",
      read: "3 min read",
      date: "Nov 5 2024",
    },
  ];

  return (
    <section className="px-10  pt-[64px] pb-[176px] md:py-[80px]">
      {/* Heading */}
      <h2 className="text-[22px] text-white/80 border-white/80 border-b pb-[11px] uppercase">
        Latest News
      </h2>

      {/* Grid */}
      <div className="overflow-hidden">
        <div className="-mt-px grid pb-[80px] md:mx-[-24px] md:grid-cols-4 md:gap-y-[80px]">
          {news.map((item, i) => (
            <div
              key={i}
              className={`border-white/20 md:-mt-px md:border-l  ${item.span || ""}`}
            >
              <article className="group relative h-full flex flex-col py-[24px] pb-[32px] text-center md:px-[24px] md:pt-[24px] md:pb-[64px]">
                {/* Image */}
                <div className="relative aspect-square w-full overflow-hidden md:aspect-[304/250]">
                  <img
                    src={item.img}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Title */}
                <h3 className=" text-[22px] text-white/80  leading-5.5 mt-[24px] uppercase md:mt-[32px]">
                  <a href="#" className="box-link">
                    {item.title}
                  </a>
                </h3>

                {/* Description */}
                <p className=" text-[14px] text-white/50 leading-4  mt-[16px]">
                  {item.desc}
                </p>

                {/* Meta */}
                <div className=" text-[11px] font-azeret text-white/80 mt-[16px] flex justify-center gap-[12px] leading-none uppercase">
                  <span>{item.read}</span>
                  <span className="bg-white/20 w-px"></span>
                  <span>{item.date}</span>
                </div>

                {/* Border */}
                <div className="border-white/20 pointer-events-none absolute inset-0 border-b md:inset-x-[24px] md:border-y"></div>
              </article>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mx-auto max-w-[260px]">
          <Button
            padding="px-7 py-3"
            textColor="text-white/80"
            bgColor="bg-white"
            borderColor="border-white"
          >
            See All Latest News
          </Button>
        </div>
      </div>
    </section>
  );
}
