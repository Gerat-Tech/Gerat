import Footer from "@/components/layout/Footer";
import AdvisorsAndTeam from "./components/AdvisorAndTeam";
import TeamEthos from "./components/TeamEthos";
import TeamFounders from "./components/TeamFounders";
import TeamHero from "./components/TeamHero";
import TeamLeadership from "./components/TeamLeadership";



export default function Team() {
  return (
    <div >
     <TeamHero/>
     <TeamLeadership/>
     <AdvisorsAndTeam/>
     <TeamFounders/>
     <TeamEthos/>
     <Footer/>
    </div>
  );
}
