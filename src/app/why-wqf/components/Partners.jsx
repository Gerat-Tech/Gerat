import { div, section } from "framer-motion/client";
import Button from "@/components/common/Button";

export default function Partners() {
  return (
    <>
      <section className="w-full min-h-screen  rounded-t-[20px] pt-[120px] pb-[80px] text-center md:pt-[200px] md:pb-[100px]">
        <div className="  text-center  mx-auto max-w-[1400px] text-white ">
          <h1 className="uppercase font-azeret">partners</h1>
          <h2 className="mt-3 text-6xl font-normal uppercase leading-16">
            Transform before the <br />
            breakthrough <br />
            becomes mainstream.
          </h2>

          {/* <p className="mt-8  text-center  "> */}
          <p className="mt-6 mb-6 max-w-[550px] mx-auto font-normal text-center text-[16px] leading-relaxed">
            Partner with companies redefining new markets, not entering them,
            with early access to breakthrough technology and the talent building
            it.
          </p>
          <Button
            padding="px-6 py-3"
            textColor="text-white/80"
            bgColor="bg-white"
            borderColor="border-white"
          >
            Partners with us
          </Button>
        </div>
      </section>
    </>
  );
}
