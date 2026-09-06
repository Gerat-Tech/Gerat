"use client";

const cardData = [
  {
    id: 1,
    title: "Curated and Comprehensive",
    number: "01",
    description:
      "Four to seven high-potential ventures annually, each rigorously vetted by multidisciplinary experts and serial entrepreneurs. These companies solve real problems in trillion-dollar verticals–AI, biotech, blockchain and frontier tech–with the ability to scale from day one.",
    bg: "bg-[#1a1a1a]",
    text: "text-white",
    border: "border-white/20",
    img: "https://worldquant-foundry.files.svdcdn.com/production/images/investors-1.svg",
  },
  {
    id: 2,
    title: "Connected to what matters.",
    number: "02",
    description:
      "Access to founders from leading institutions and networks where breakthrough thinking originates. In exponential tech, the right connections determine who builds first–and who builds best.",
    bg: "bg-[#00f2ea]",
    text: "text-black",
    border: "border-black/20",
    img: "https://worldquant-foundry.files.svdcdn.com/production/images/investors-2.svg",
  },
  {
    id: 3,
    title: "Pattern recognition at scale.",
    number: "03",
    description:
      "We use our connections to research institutions, universities and founders with winning track records to convert trend-spotting into category-defining companies. It's foresight backed by the network to execute.",
    bg: "bg-[#ff4d4d]",
    text: "text-black",
    border: "border-black/20",
    img: "https://worldquant-foundry.files.svdcdn.com/production/images/investors-3.svg",
  },
  {
    id: 4,
    title: "Full visibility, real momentum.",
    number: "04",
    description:
      "Diversified exposure across deep tech that redefines markets. You get direct founder access–while our platform accelerates the path from vision to value.",
    // bg: "bg-[#f5f5f5]",#f7f7f7
    bg: "bg-[#f7f7f7]",

    text: "text-black",
    border: "border-black/20",
    img: "https://worldquant-foundry.files.svdcdn.com/production/images/investors-4.svg",
  },
];

export default function InvestorBenefits() {
  return (
    <section className="bg-[#e7e7e7] text-black rounded-b-[20px] pt-[64px] pb-[120px] md:pt-[80px] md:pb-[200px]">
      <div className="container mx-auto grid gap-[8px] md:grid-cols-2 md:gap-[24px] px-4">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-[8px] md:gap-[24px]">
          {cardData.slice(0, 2).map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-[8px] md:mt-[220px] md:gap-[24px]">
          {cardData.slice(2, 4).map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ card }) {
  return (
    <div
      className={`${card.bg} ${card.text} flex min-h-[300px] w-full flex-col justify-between gap-[32px] rounded-[20px] px-[20px] py-[40px] md:aspect-[1.3/1] md:min-h-[550px] md:px-[40px] md:py-[60px]`}
    >
      {/* TOP */}
      <div className="flex items-center justify-between gap-[32px]">
        <h3 className="uppercase max-w-[360px] text-[14px] md:text-[18px] font-semibold leading-tight">
          {card.title}
        </h3>

        <img
          src={card.img}
          alt=""
          className="w-[32px] h-[32px] md:w-[60px] md:h-[60px] object-contain"
        />
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col gap-[20px] md:gap-[32px]">
        <div className={`${card.border} border-b pb-[9px]`}>
          <p className="font-mono text-sm">{card.number}</p>
        </div>

        <p className="text-sm md:text-base leading-relaxed">
          {card.description}
        </p>
      </div>
    </div>
  );
}
