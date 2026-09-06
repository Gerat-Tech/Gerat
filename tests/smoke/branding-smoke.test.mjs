import fs from "fs";
import path from "path";
import assert from "assert";

export async function runBrandingSmokeTests() {
  console.log("▶ Testing Branding & Anti-Legacy Patterns...");
  const root = process.cwd();

  // package.json must be gerat-website
  const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf-8"));
  assert.strictEqual(pkg.name, "gerat-website", "package.json name must be 'gerat-website'");
  assert(pkg.author.includes("Gerat"), "package.json author must include 'Gerat'");
  console.log("  ✓ package.json branding verified");

  // README must refer to Gerat
  const readme = fs.readFileSync(path.join(root, "README.md"), "utf-8");
  assert(readme.includes("Gerat Software Solutions PLC"), "README must document Gerat Software Solutions PLC");
  console.log("  ✓ README.md branding verified");

  // Navbar must not contain legacy WorldQuant Foundry text
  const navbar = fs.readFileSync(path.join(root, "src/components/layout/Navbar.jsx"), "utf-8");
  assert(!navbar.includes("WORLDQUANT"), "Navbar should not contain legacy 'WORLDQUANT' text");
  assert(navbar.includes("GERAT"), "Navbar must contain 'GERAT'");
  console.log("  ✓ Navbar branding verified");

  // Hero must contain Gerat headline and not legacy WQF text
  const hero = fs.readFileSync(path.join(root, "src/components/home/Hero.jsx"), "utf-8");
  assert(!hero.includes("Forging Companies"), "Hero should not contain legacy 'Forging Companies' headline");
  assert(hero.includes("TECHNOLOGY THAT MOVES"), "Hero must contain Gerat 'TECHNOLOGY THAT MOVES' headline");
  assert(hero.includes("REAL SYSTEMS."), "Hero must contain Gerat 'REAL SYSTEMS.' headline");
  console.log("  ✓ Hero branding verified");

  // Ethos must not contain legacy WQF copy
  const ethos = fs.readFileSync(path.join(root, "src/components/home/OurEthos.jsx"), "utf-8");
  assert(!ethos.includes("Exponential Foresight"), "Ethos should not contain legacy 'Exponential Foresight'");
  assert(ethos.includes("SYSTEM RESILIENCE"), "Ethos must contain 'SYSTEM RESILIENCE'");
  console.log("  ✓ Ethos branding verified");

  // Portfolio must not link to external worldquantfoundry.com
  const portfolio = fs.readFileSync(path.join(root, "src/components/home/OurPortfolio.jsx"), "utf-8");
  assert(!portfolio.includes("worldquantfoundry.com"), "Portfolio should not contain external WQF links");
  console.log("  ✓ Portfolio internal routing verified");

  // Footer must have Gerat copyright
  const footer = fs.readFileSync(path.join(root, "src/components/layout/Footer.jsx"), "utf-8");
  assert(!footer.includes("WorldQuant"), "Footer should not contain 'WorldQuant'");
  assert(footer.includes("GERAT SOFTWARE SOLUTIONS PLC"), "Footer must contain 'GERAT SOFTWARE SOLUTIONS PLC'");
  console.log("  ✓ Footer branding verified");
}
