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
  assert(readme.includes("Gerat Software Solution"), "README must document Gerat Software Solution");
  console.log("  ✓ README.md branding verified");

  // Navbar must support V2 contextual anchor navigation
  const navbar = fs.readFileSync(path.join(root, "src/components/layout/Navbar.jsx"), "utf-8");
  assert(!navbar.includes("WORLDQUANT"), "Navbar should not contain legacy 'WORLDQUANT' text");
  assert(navbar.includes("GERAT"), "Navbar must contain 'GERAT'");
  assert(navbar.includes("#services"), "Navbar must support #services anchor navigation");
  assert(navbar.includes("#about"), "Navbar must support #about anchor navigation");
  assert(navbar.includes("#founders"), "Navbar must support #founders anchor navigation");
  assert(navbar.includes("CONTACT"), "Navbar must feature 'CONTACT' primary CTA");
  console.log("  ✓ Navbar branding & contextual anchor navigation verified");

  // Hero must contain Gerat V2 headline and not legacy WQF text
  const hero = fs.readFileSync(path.join(root, "src/components/home/Hero.jsx"), "utf-8");
  const heroUpper = hero.toUpperCase();
  assert(heroUpper.includes("BUILD WHAT MOVES"), "Hero must contain Gerat 'BUILD WHAT MOVES' headline");
  assert(heroUpper.includes("YOUR BUSINESS") && heroUpper.includes("FORWARD"), "Hero must contain Gerat 'YOUR BUSINESS FORWARD' headline");
  console.log("  ✓ Hero branding verified");

  // Ethos must contain Gerat V2 beliefs copy
  const ethos = fs.readFileSync(path.join(root, "src/components/home/OurEthos.jsx"), "utf-8");
  assert(ethos.includes("USEFUL OVER"), "Ethos must contain 'USEFUL OVER'");
  assert(ethos.includes("COMPLICATED."), "Ethos must contain 'COMPLICATED.'");
  assert(ethos.includes("WHAT WE BELIEVE"), "Ethos must contain 'WHAT WE BELIEVE'");
  console.log("  ✓ Ethos V2 beliefs branding verified");

  // Portfolio must not link to external worldquantfoundry.com
  const portfolio = fs.readFileSync(path.join(root, "src/components/home/OurPortfolio.jsx"), "utf-8");
  assert(!portfolio.includes("worldquantfoundry.com"), "Portfolio should not contain external WQF links");
  console.log("  ✓ Portfolio internal routing verified");

  // Portfolio content clean slate in V2
  const portfolioContent = fs.readFileSync(path.join(root, "src/content/portfolio.js"), "utf-8");
  assert(portfolioContent.includes("export const portfolioProjects = []"), "Portfolio content must be clean slate in V2");
  console.log("  ✓ Portfolio content V2 clean slate verified");

  // Services page components must contain Gerat V2 headline and not legacy WQF text
  const services = fs.readFileSync(path.join(root, "src/components/services/ServicesOverview.jsx"), "utf-8");
  assert(!services.includes("WorldQuant Foundry"), "Services page must not contain legacy WQF text");
  assert(services.includes("TECHNOLOGY BUILT") && services.includes("AROUND YOUR BUSINESS."), "Services page must contain Gerat V2 headline");
  assert(services.includes("NOT EVERY BUSINESS") && services.includes("NEEDS EVERYTHING."), "Services page must contain approach section");
  assert(services.includes("COMMON") && services.includes("QUESTIONS."), "Services page must contain FAQ section");
  console.log("  ✓ Services page V2 overview, approach & FAQ verified");

  // Contact drawer must have Gerat branding and brand/creative disciplines
  const contactDrawer = fs.readFileSync(path.join(root, "src/components/layout/ContactDrawer.jsx"), "utf-8");
  assert(!contactDrawer.includes("foundry team"), "Contact drawer must not contain 'foundry team'");
  assert(contactDrawer.includes("GERAT SOFTWARE SOLUTION"), "Contact drawer must contain 'GERAT SOFTWARE SOLUTION'");
  assert(contactDrawer.includes("BRAND STRATEGY"), "Contact drawer must support 'BRAND STRATEGY'");
  assert(contactDrawer.includes("LOGO & BRAND IDENTITY"), "Contact drawer must support 'LOGO & BRAND IDENTITY'");
  assert(contactDrawer.includes("PERSONAL BRANDING"), "Contact drawer must support 'PERSONAL BRANDING'");
  assert(contactDrawer.includes("BUDGET_RANGES"), "Contact drawer must include lead qualification budget ranges");
  console.log("  ✓ ContactDrawer branding & creative disciplines verified");

  // Content dataset must contain brandCreativeFamily and brand pillars
  const servicesContent = fs.readFileSync(path.join(root, "src/content/services.js"), "utf-8");
  assert(servicesContent.includes("brandCreativeFamily"), "services.js must export brandCreativeFamily");
  assert(servicesContent.includes("creativeServicePackages"), "services.js must export creativeServicePackages");
  assert(servicesContent.includes("BRAND STRATEGY, IDENTITY & DESIGN SYSTEMS"), "services.js must include Brand pillar");
  assert(servicesContent.includes("EXECUTIVE & FOUNDER PERSONAL BRANDING"), "services.js must include Personal Branding pillar");
  console.log("  ✓ Services content brand architecture verified");

  // Footer must have Gerat copyright, 3-column nav, and no legacy orange banner
  const footer = fs.readFileSync(path.join(root, "src/components/layout/Footer.jsx"), "utf-8");
  assert(!footer.includes("WorldQuant"), "Footer should not contain 'WorldQuant'");
  assert(!footer.includes("bg-accent text-white border-b"), "Footer should not contain legacy orange banner");
  assert(footer.includes("NAVIGATION"), "Footer must contain 'NAVIGATION'");
  assert(footer.includes("SERVICES"), "Footer must contain 'SERVICES'");
  assert(footer.includes("CONNECT"), "Footer must contain 'CONNECT'");
  assert(footer.includes("variant=\"primary\""), "Footer must render primary logo signature");
  assert(footer.includes("GERAT SOFTWARE SOLUTION"), "Footer must contain 'GERAT SOFTWARE SOLUTION'");
  console.log("  ✓ V2 Footer branding & 3-column navigation verified");

  // About page V2 narrative components and copy
  const aboutPage = fs.readFileSync(path.join(root, "src/app/about/page.js"), "utf-8");
  assert(aboutPage.includes("AboutHero"), "About page must include AboutHero");
  assert(aboutPage.includes("OurStory"), "About page must include OurStory");
  assert(aboutPage.includes("WhatWeBelieve"), "About page must include WhatWeBelieve");
  assert(aboutPage.includes("TheFounders"), "About page must include TheFounders");
  assert(aboutPage.includes("AboutCTA"), "About page must include AboutCTA");

  const whatWeBelieve = fs.readFileSync(path.join(root, "src/app/about/components/WhatWeBelieve.jsx"), "utf-8");
  assert(whatWeBelieve.includes("SIMPLE PRINCIPLES."), "WhatWeBelieve must contain 'SIMPLE PRINCIPLES.'");
  assert(whatWeBelieve.includes("HIGH STANDARDS."), "WhatWeBelieve must contain 'HIGH STANDARDS.'");

  const aboutHero = fs.readFileSync(path.join(root, "src/app/about/components/AboutHero.jsx"), "utf-8");
  assert(aboutHero.includes("WE BUILD THE BRIDGE."), "AboutHero must contain 'WE BUILD THE BRIDGE.'");
  assert(aboutHero.includes("YOU CROSS IT."), "AboutHero must contain 'YOU CROSS IT.'");

  const whatGeratMeans = fs.readFileSync(path.join(root, "src/app/about/components/WhatGeratMeans.jsx"), "utf-8");
  assert(whatGeratMeans.includes("Gerät"), "WhatGeratMeans must reference German word 'Gerät'");
  assert(whatGeratMeans.includes("TECHNOLOGY IS A TOOL. MAKE IT USEFUL."), "WhatGeratMeans must feature brand motto");

  const theFounders = fs.readFileSync(path.join(root, "src/app/about/components/TheFounders.jsx"), "utf-8");
  assert(theFounders.includes("FIVE FOUNDERS."), "TheFounders must contain 'FIVE FOUNDERS.'");
  assert(theFounders.includes("ONE VISION."), "TheFounders must contain 'ONE VISION.'");
  console.log("  ✓ V2 About page narrative structure & copy verified");
}
