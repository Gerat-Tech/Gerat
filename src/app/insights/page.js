import Footer from "@/components/layout/Footer";
import InsightsHero from "@/app/insights/components/InsightsHero";
import LatestNews from "@/app/insights/components/LatestNews";


export default function Insight(){
    return (
        <div>
           <InsightsHero/>
           <LatestNews/>
           <Footer/>
        </div>
    )
}