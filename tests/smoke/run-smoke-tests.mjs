import { runTokenSmokeTests } from "./tokens-smoke.test.mjs";
import { runComponentSmokeTests } from "./components-smoke.test.mjs";
import { runRouteSmokeTests } from "./routes-smoke.test.mjs";
import { runBrandingSmokeTests } from "./branding-smoke.test.mjs";

async function main() {
  console.log("=================================================");
  console.log("  GERAT SOFTWARE SOLUTIONS PLC — SMOKE TEST SUITE");
  console.log("=================================================\n");

  const startTime = performance.now();
  let passed = 0;
  let failed = 0;

  const testSuites = [
    { name: "Tokens & CSS Architecture", fn: runTokenSmokeTests },
    { name: "Component Integrity & Exports", fn: runComponentSmokeTests },
    { name: "Route & Layout Scaffolds", fn: runRouteSmokeTests },
    { name: "Branding & Anti-Legacy Rules", fn: runBrandingSmokeTests },
  ];

  for (const suite of testSuites) {
    try {
      await suite.fn();
      passed++;
      console.log(`\n[PASS] ${suite.name}\n`);
    } catch (err) {
      failed++;
      console.error(`\n[FAIL] ${suite.name}:`, err.message, "\n");
    }
  }

  const duration = ((performance.now() - startTime) / 1000).toFixed(2);

  console.log("-------------------------------------------------");
  console.log(`Summary: ${passed} passed, ${failed} failed (${duration}s)`);
  console.log("-------------------------------------------------");

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log("ALL SMOKE TESTS PASSED SUCCESSFULLY! ✓\n");
    process.exit(0);
  }
}

main();
