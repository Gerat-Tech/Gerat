// import Button from "../ui/Button";

import Button from "@/components/common/Button";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen ">
      <p className=" uppercase text-[60px] text-center max-w-4xl leading-15">
        The future isn’t
        <br />
        something that happens.
        <br />
        It’s something we build.
      </p>

      {/* BOTTOM FOOTER */}
      <div className="absolute bottom-0 left-0 w-full px-8 lg:px-10 pt-10 pb-8 z-10">
        <div className="w-full border-t border-white/40"></div>

        <div className="mt-4 flex justify-between items-center">
          <div className="mt-10 ">
            <Button
              padding="px-6 py-3"
              textColor="text-white/80"
              bgColor="bg-white"
              borderColor="border-white"
            >
              Contact Us
            </Button>
            <Button
              padding="px-6 py-3"
              textColor="text-white/80"
              bgColor="bg-white"
              borderColor="border-white"
            >
              Contact Us
            </Button>
            <Button
              padding="px-6 py-3"
              textColor="text-white/80"
              bgColor="bg-white"
              borderColor="border-white"
            >
              Contact Us
            </Button>
          </div>
          {/* CONTACT */}

          {/* <div className="flex items-center justify-between gap-40"> */}
          {/* TEXT */}
          <p className="max-w-[480px] text-[11px] text-white/60 font-azeret uppercase text-left leading-3.5 tracking-normal">
            WorldQuant Foundry is a venture lab that empowers breakthrough
            founders to pull the future forward. Capital. Connections.
            Mentorship. Full-stack support. We deliver more than resources—we
            create the infrastructure for scale.
          </p>
        </div>
      </div>
    </section>
  );
}
