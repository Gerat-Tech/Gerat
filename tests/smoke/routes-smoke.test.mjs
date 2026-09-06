import fs from "fs";
import path from "path";
import assert from "assert";

export async function runRouteSmokeTests() {
  console.log("▶ Testing Page Routes & Layout Scaffold...");
  const root = process.cwd();

  const routes = [
    { file: "src/app/layout.js", name: "RootLayout", checks: ["Gerat Software Solutions PLC", "NavProvider", "ClientWrapper"] },
    { file: "src/app/page.js", name: "HomePage", checks: ["Hero", "Footer"] },
    { file: "src/app/portfolio/page.js", name: "PortfolioPage", checks: ["export default"] },
    { file: "src/app/team/page.js", name: "TeamPage", checks: ["export default"] },
    { file: "src/app/insights/page.js", name: "InsightsPage", checks: ["export default"] },
    { file: "src/app/why-wqf/page.js", name: "WhyWqfPage", checks: ["export default"] },
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
