import { section } from "framer-motion/client";
import Button from "@/components/common/Button";

export default function Insfrastructure() {
  return (
    <section className="min-h-screen px-10 py-[80px] md:py-[100px] ">
      {/* first content  */}
      <div className="grid items-end gap-20 md:grid-cols-2">
        <div>
          <Button>connect with us</Button>
        </div>

        <h1 className="text-5xl uppercase ">
          Full-stack
          <br />
          infrastructure,
          <br />
          ready from day one.
        </h1>
      </div>
      <hr className="border-t border-white/20 my-8 w-full  h-[1px]  " />

      {/* 2nd content  */}
      <div className="mt-25  text-white/80 flex justify-between gap-10 ">
        <div>
          <h1 className=" mb-25 text-4xl uppercase">
            Founder-First Back office support.
          </h1>

          <hr className="border-t border-white/20 my-8 w-full max-w-[450px] h-[1px]  " />
          <p className=" text-white/60 ">
            Legal, HR, marketing, marketing, finance, R&D. Instant access from
            day one. The foundation that usually takes months? It's already
            built.
          </p>
        </div>

        <div>
          <h1 className="mb-25 text-4xl uppercase">Lean, powerful teams.</h1>
          <hr className="border-t border-white/20 my-8 w-full max-w-[450px] h-[1px]  " />
          <p className="text-white/60">
            The right expertise at the right moment. No bloat. No bureaucracy.
            Just the full-stack support that exponential companies need to
            scale.
          </p>
        </div>
        <div>
          <h1 className="mb-25 text-4xl uppercase">
            Salaries from <br /> the start.
          </h1>
          <hr className="border-t border-white/20 my-8 w-full max-w-[450px] h-[1px]  " />
          <p className="text-white/60">
            Breakthrough thinking shouldn't compete with survival. We pay
            founder and team salaries straight away. You focus on building. We
            handle everything else.
          </p>
        </div>
      </div>
    </section>
  );
}
