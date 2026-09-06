import fs from "fs";
import path from "path";
import assert from "assert";

export async function runComponentSmokeTests() {
  console.log("▶ Testing Component Integrity & Exports...");
  const root = process.cwd();

  const requiredComponents = [
    // Common
    "src/components/common/Container.jsx",
    "src/components/common/SectionLabel.jsx",
    "src/components/common/NavItem.jsx",
    "src/components/common/Button.jsx",
    "src/components/common/CustomCursor.jsx",
    // Motion
    "src/components/motion/FadeUp.jsx",
    "src/components/motion/MaskReveal.jsx",
    "src/components/motion/SplitText.jsx",
    "src/components/motion/Counter.jsx",
    "src/components/motion/Parallax.jsx",
    "src/components/motion/Magnetic.jsx",
    "src/components/motion/index.js",
    // Layout
    "src/components/layout/Navbar.jsx",
    "src/components/layout/PageLoader.jsx",
    "src/components/layout/TransitionOverlay.jsx",
    "src/components/layout/ClientWrapper.js",
    "src/components/layout/ContactDrawer.jsx",
    "src/components/layout/Footer.jsx",
    // 3D
    "src/components/three/HeroDataField.jsx",
    "src/components/three/Hero3DFallback.jsx",
    // Home Composite Sections
    "src/components/home/Hero.jsx",
    "src/components/home/Marquee.jsx",
    "src/components/home/OurEthos.jsx",
    "src/components/home/OurFocus.jsx",
    "src/components/home/OurPortfolio.jsx",
    "src/components/home/HowWeWork.jsx",
    "src/components/home/OurLeadership.jsx",
    "src/components/home/Partners.jsx",
    // Team Page Components
    "src/app/team/components/TeamHero.jsx",
    "src/app/team/components/TeamLeadership.jsx",
    "src/app/team/components/AdvisorAndTeam.jsx",
    "src/app/team/components/TeamEthos.jsx",
    // Insights Page Components
    "src/app/insights/components/InsightsHero.jsx",
    "src/app/insights/components/LatestNews.jsx",
    // Services Page Components
    "src/app/why-wqf/components/ServicesOverview.jsx",
    // Context
    "src/context/NavContext.js",
    "src/context/PageTransitionContext.jsx",
  ];

  for (const compPath of requiredComponents) {
    const fullPath = path.join(root, compPath);
    assert(fs.existsSync(fullPath), `Component missing: ${compPath}`);
    const content = fs.readFileSync(fullPath, "utf-8");
    assert(
      content.includes("export default") ||
        content.includes("export function") ||
        content.includes("export const") ||
        content.includes("export {"),
      `Component ${compPath} has no export statement`
    );
    console.log(`  ✓ ${compPath} verified`);
  }
}
