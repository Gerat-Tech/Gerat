
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import OurEthos from "@/components/home/OurEthos";
import OurFocus from "@/components/home/OurFocus";
import OurFounders from "@/components/home/OurFounders";
import OurInvestors from "@/components/home/OurInvestors";
import OurLeadership from "@/components/home/OurLeadership";
import OurPortfolio from "@/components/home/OurPortfolio";
import Partners from "@/components/home/Partners";

export default function Home() {
  return (
   
    <main className="bg-black min-h-screen">
           <Hero />
           <OurEthos />
           <OurFocus />
           <OurPortfolio/>
           <OurLeadership/>
           <OurInvestors/>
           <OurFounders/>
           <Partners/>
           <Footer/>
    </main>
  );
}