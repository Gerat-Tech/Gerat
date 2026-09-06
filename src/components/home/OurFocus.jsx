import { div, section } from "framer-motion/client";

export default function OurFocus() {
  return (
    <>
      <section>
        <div className="w-full min-h-screen bg-[#dadada]">
          <div className=" pt-30 text-center  mx-auto max-w-[1400px] text-black ">
            <h1>Our Focus</h1>
            <h2 className="mt-8 text-6xl font-normal uppercase leading-16">
              Exponential Technologies.
            </h2>
            <h3 className="text-6xl font-normal uppercase">
              Trillion-Dollar Markets.
            </h3>
            {/* <p className="mt-8  text-center  "> */}
            <p className="mt-6 max-w-[550px] mx-auto font-normal text-center text-[16px] leading-relaxed">
              AI, biotech, robotics, blockchain, NewSpace—these aren't
              incremental improvements. They're generational leaps that solve
              humanity's hardest challenges. They move faster than convention.
              So do we.
            </p>
          </div>
        </div>

        <div className="w-full min-h-screen bg-[#dadada] py-[40px] md:py-[100px]">
          <ul className=" text-black text-[78px] text-center font-medium leading-19 ">
            <li>ADVANCEMOBILITY</li>
            <li>ARTIFICIAL INTELLIGENCE</li>
            <li>BIOTECHNOLOGY & GENOMICS</li>
            <li>BLOCKCHAIN & DEFI</li>
            <li>NEXT-GEN FINANCE</li>
            <li>NEXT-GEN CONSUMER TECH</li>
            <li>QUANTUM COMPUTING</li>
            <li>ROBOTICS</li>
            <li>BLOCKCHAIN</li>
            <li>SPACE</li>
          </ul>
        </div>
      </section>
    </>
  );
}
