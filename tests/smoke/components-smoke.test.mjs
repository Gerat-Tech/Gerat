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
    // Motion
    "src/components/motion/FadeUp.jsx",
    "src/components/motion/MaskReveal.jsx",
    "src/components/motion/SplitText.jsx",
    "src/components/motion/Counter.jsx",
    "src/components/motion/Parallax.jsx",
    "src/components/motion/index.js",
    // Layout
    "src/components/layout/Navbar.jsx",
    "src/components/layout/PageLoader.jsx",
    "src/components/layout/TransitionOverlay.jsx",
    "src/components/layout/ClientWrapper.js",
    "src/components/layout/ContactDrawer.jsx",
    // 3D
    "src/components/three/HeroDataField.jsx",
    "src/components/three/Hero3DFallback.jsx",
    // Home
    "src/components/home/Hero.jsx",
    // Context
    "src/context/NavContext.js",
    "src/context/PageTransitionContext.jsx",
  ];

  for (const compPath of requiredComponents) {
    const fullPath = path.join(root, compPath);
    assert(fs.existsSync(fullPath), `Component missing: ${compPath}`);
    const content = fs.readFileSync(fullPath, "utf-8");
    assert(
      content.includes("export default") || content.includes("export function") || content.includes("export const") || content.includes("export {"),
      `Component ${compPath} has no export statement`
    );
    console.log(`  ✓ ${compPath} verified`);
  }
}
