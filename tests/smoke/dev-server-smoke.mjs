import { spawn } from "child_process";
import http from "http";
import assert from "assert";

const PORT = 3008;
const BASE_URL = `http://127.0.0.1:${PORT}`;

function fetchRoute(path) {
  return new Promise((resolve, reject) => {
    http
      .get(`${BASE_URL}${path}`, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status: res.statusCode, body: data }));
      })
      .on("error", reject);
  });
}

function waitForReady(maxAttempts = 30) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      try {
        const res = await fetchRoute("/");
        if (res.status === 200) {
          clearInterval(interval);
          resolve();
        }
      } catch {
        if (attempts >= maxAttempts) {
          clearInterval(interval);
          reject(new Error("Next.js dev server timed out waiting to become ready"));
        }
      }
    }, 500);
  });
}

async function runDevServerSmokeTests() {
  console.log("▶ Starting Next.js Dev Server on port 3008 for runtime verification...");
  const devServer = spawn(
    "pnpm",
    ["exec", "next", "dev", "--port", String(PORT)],
    {
      env: { ...process.env, PORT: String(PORT) },
      stdio: "pipe",
    }
  );

  let serverLogs = "";
  devServer.stdout.on("data", (d) => (serverLogs += d.toString()));
  devServer.stderr.on("data", (d) => (serverLogs += d.toString()));

  try {
    await waitForReady();
    console.log("  ✓ Dev server is ready and responding");

    const routes = [
      { path: "/", name: "HomePage", expected: "GERAT" },
      { path: "/portfolio", name: "PortfolioPage", expected: "PORTFOLIO" },
      { path: "/team", name: "TeamPage", expected: "LEADERSHIP" },
      { path: "/insights", name: "InsightsPage", expected: "INSIGHTS" },
      { path: "/why-wqf", name: "ServicesPage", expected: "SERVICES" },
    ];

    for (const { path, name, expected } of routes) {
      const res = await fetchRoute(path);
      assert.strictEqual(res.status, 200, `Route ${name} (${path}) failed with status ${res.status}`);
      assert(
        res.body.includes(expected),
        `Route ${name} (${path}) response body missing expected text: ${expected}`
      );
      assert(
        !serverLogs.includes("ReferenceError"),
        `Runtime ReferenceError detected in server logs while visiting ${path}`
      );
      console.log(`  ✓ Route ${name} (${path}) responded with 200 OK and valid markup`);
    }

    console.log("\n[PASS] Runtime Dev Server Verification Successful!");
  } finally {
    devServer.kill("SIGTERM");
  }
}

runDevServerSmokeTests().catch((err) => {
  console.error("\n[FAIL] Runtime Dev Server Verification Failed:", err);
  process.exit(1);
});
