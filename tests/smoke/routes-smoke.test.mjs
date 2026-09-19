import fs from "fs";
import path from "path";
import assert from "assert";

export async function runRouteSmokeTests() {
  console.log("▶ Testing Page Routes & Layout Scaffold...");
  const root = process.cwd();

  const routes = [
    { file: "src/app/layout.js", name: "RootLayout", checks: ["Gerat Software Solution", "NavProvider", "ClientWrapper"] },
    { file: "src/app/page.js", name: "HomePage", checks: ["Hero", "Footer"] },
    { file: "src/app/portfolio/page.js", name: "PortfolioPage", checks: ["export default"] },
    { file: "src/app/team/page.js", name: "TeamPage", checks: ["export default"] },
    { file: "src/app/insights/page.js", name: "InsightsPage", checks: ["export default"] },
    { file: "src/app/why-wqf/page.js", name: "WhyWqfPage", checks: ["export default"] },
    { file: "src/app/services/page.js", name: "ServicesPage", checks: ["export default", "ServicesOverview"] },
    { file: "src/app/services/digital-experiences/page.js", name: "DigitalExperiencesPage", checks: ["export default", "DIGITAL EXPERIENCES"] },
    { file: "src/app/services/ai-tools/page.js", name: "AiToolsPage", checks: ["export default", "AI & INTELLIGENT TOOLS"] },
    { file: "src/app/services/business-systems/page.js", name: "BusinessSystemsPage", checks: ["export default", "BUSINESS SYSTEMS"] },
    { file: "src/app/services/brand-creative/page.js", name: "BrandCreativePage", checks: ["export default", "BRAND & CREATIVE"] },
    { file: "src/app/services/personal-branding/page.js", name: "PersonalBrandingPage", checks: ["export default", "PERSONAL BRANDING"] },
    { file: "src/app/sitemap.js", name: "Sitemap", checks: ["export default function sitemap", "gerat.com"] },
    { file: "src/app/robots.js", name: "Robots", checks: ["export default function robots", "sitemap.xml"] },
    { file: "src/app/icon.svg", name: "Icon", checks: ["#ea5b15"] },
  ];

  for (const { file, name, checks } of routes) {
    const fullPath = path.join(root, file);
    assert(fs.existsSync(fullPath), `Route file missing: ${file}`);
    const content = fs.readFileSync(fullPath, "utf-8");

    for (const check of checks) {
      assert(content.includes(check), `Route ${name} (${file}) missing check: "${check}"`);
    }
    console.log(`  ✓ Route ${name} verified (${file})`);
  }
}
