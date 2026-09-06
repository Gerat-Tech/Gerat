import fs from "fs";
import path from "path";
import assert from "assert";

export async function runTokenSmokeTests() {
  console.log("▶ Testing Design Tokens & CSS Architecture...");
  const root = process.cwd();

  const files = [
    {
      file: "src/styles/tokens.css",
      requiredVars: ["--bg", "--surface", "--text-primary", "--accent", "--border", "--space-4", "--z-modal"],
    },
    {
      file: "src/styles/typography.css",
      requiredVars: ["--font-size-display-xl", "--font-size-mono", "--leading-hero", ".display-xl", ".mono-label"],
    },
    {
      file: "src/styles/motion.css",
      requiredVars: ["--duration-fast", "--ease-primary", "prefers-reduced-motion", "animate-marquee"],
    },
    {
      file: "src/styles/grid.css",
      requiredVars: ["--grid-columns", "--grid-gutter", ".site-container", ".system-grid"],
    },
    {
      file: "src/app/globals.css",
      requiredVars: ["tokens.css", "typography.css", "motion.css", "grid.css", "@theme", "--color-accent"],
    },
  ];

  for (const { file, requiredVars } of files) {
    const fullPath = path.join(root, file);
    assert(fs.existsSync(fullPath), `Expected file to exist: ${file}`);
    const content = fs.readFileSync(fullPath, "utf-8");
    assert(content.length > 50, `File appears unexpectedly empty: ${file}`);

    for (const v of requiredVars) {
      assert(content.includes(v), `File ${file} missing expected token/rule: "${v}"`);
    }
    console.log(`  ✓ ${file} verified (${requiredVars.length} checks passed)`);
  }
}
