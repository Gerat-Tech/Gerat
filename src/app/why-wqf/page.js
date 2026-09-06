import Footer from "@/components/layout/Footer";
import BuildProcessCard from "./components/BuildProcessCard";
import FounderNetwork from "./components/FounderNetwork";
import Hero from "./components/Hero";
import Insfrastructure from "./components/Infrastructure";
import InvestorBenefits from "./components/InvestorBenefits";
import Investors from "./components/Investors";
import PartnerBlocks from "./components/PartnerBlocks";
import Partners from "./components/Partners";
import Founders from "./components/Founders";

export default function WhyWQF() {
  return (
    <div >
    <Hero />
    <Founders/>
    <BuildProcessCard/>
    <Insfrastructure/>
    <FounderNetwork/>
    <Investors/>
    <InvestorBenefits/>
    <Partners/>
    <PartnerBlocks/>
    <Footer/>
    </div>
  );
}