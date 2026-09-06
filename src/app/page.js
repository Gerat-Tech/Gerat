import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import OurEthos from "@/components/home/OurEthos";
import OurFocus from "@/components/home/OurFocus";
import OurPortfolio from "@/components/home/OurPortfolio";
import HowWeWork from "@/components/home/HowWeWork";
import OurLeadership from "@/components/home/OurLeadership";
import Partners from "@/components/home/Partners";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-accent selection:text-black">
      <Hero />
      <Marquee />
      <OurEthos />
      <OurFocus />
      <OurPortfolio />
      <HowWeWork />
      <OurLeadership />
      <Partners />
      <Footer />
    </div>
  );
}
