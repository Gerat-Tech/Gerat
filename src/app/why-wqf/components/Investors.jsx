import { div, section } from "framer-motion/client";
import Button from "@/components/common/Button";

export default function Investors() {
  return (
    <>
      {/* <section className="w-full min-h-screen bg-[#dadada] rounded-t-[20px]"> */}
      <section className="w-full min-h-screen bg-[#e7e7e7]  rounded-t-[20px] pt-[120px] pb-[80px] text-center md:pt-[200px] md:pb-[100px]">
        <div className="  text-center  mx-auto max-w-[1400px] text-black ">
          <h1 className="uppercase font-azeret">investors</h1>
          <h2 className="mt-3 text-6xl font-normal uppercase leading-16">
            Pre-market access to <br />
            rigorously built <br />
            ventures.
          </h2>

          {/* <p className="mt-8  text-center  "> */}
          <p className="mt-6 mb-6 max-w-[550px] mx-auto font-normal text-center text-[16px] leading-relaxed">
            We see what becomes inevitable, then build the companies to define
            it. Curated, accelerated, deeply supported.
          </p>
          <Button
            padding="px-6 py-3"
            textColor="text-black/80"
            bgColor="bg-black"
            borderColor="border-black"
          >
            Connect with us
          </Button>
        </div>
      </section>
    </>
  );
}
