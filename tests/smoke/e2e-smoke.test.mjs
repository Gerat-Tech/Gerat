import { spawn } from "child_process";
import http from "http";
import assert from "assert";
import fs from "fs";
import path from "path";

const PORT = parseInt(process.env.PORT || "3009", 10);
const BASE_URL = `http://127.0.0.1:${PORT}`;

function request(urlPath, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, BASE_URL);
    const reqOptions = {
      method: options.method || "GET",
      headers: options.headers || {},
    };

    const req = http.request(url, reqOptions, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const buffer = Buffer.concat(chunks);
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: buffer.toString("utf8"),
          buffer,
        });
      });
    });

    req.on("error", reject);

    if (options.body) {
      req.write(typeof options.body === "string" ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

function waitForReady(maxAttempts = 60, intervalMs = 500) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      try {
        const res = await request("/");
        if (res.status === 200) {
          clearInterval(interval);
          resolve();
        }
      } catch {
        if (attempts >= maxAttempts) {
          clearInterval(interval);
          reject(new Error(`Server on port ${PORT} timed out waiting to become ready.`));
        }
      }
    }, intervalMs);
  });
}

async function isPortListening() {
  try {
    const res = await request("/");
    return res.status === 200;
  } catch {
    return false;
  }
}

async function runAllE2ETests() {
  console.log("=================================================");
  console.log("  GERAT SOFTWARE SOLUTION — 24-POINT E2E SUITE");
  console.log("=================================================\n");

  let spawnedProcess = null;
  const alreadyRunning = await isPortListening();

  if (!alreadyRunning) {
    const hasBuild = fs.existsSync(path.join(process.cwd(), ".next/BUILD_ID"));
    const cmd = hasBuild ? "start" : "dev";
    console.log(`▶ Spawning 'next ${cmd}' server on port ${PORT}...`);

    spawnedProcess = spawn(
      "pnpm",
      ["exec", "next", cmd, "--port", String(PORT)],
      {
        env: { ...process.env, PORT: String(PORT) },
        stdio: "pipe",
      }
    );

    let logs = "";
    spawnedProcess.stdout.on("data", (d) => (logs += d.toString()));
    spawnedProcess.stderr.on("data", (d) => (logs += d.toString()));

    try {
      await waitForReady();
      console.log(`  ✓ Next.js server ready and listening on port ${PORT}\n`);
    } catch (err) {
      if (spawnedProcess) spawnedProcess.kill("SIGTERM");
      throw new Error(`Failed to start server:\n${logs}`);
    }
  } else {
    console.log(`  ✓ Using existing server listening on port ${PORT}\n`);
  }

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      passed++;
      console.log(`  ✓ [PASS] ${name}`);
    } catch (err) {
      failed++;
      console.error(`  ✗ [FAIL] ${name}: ${err.message}`);
    }
  }

  try {
    // -------------------------------------------------------------------------
    console.log("── Group 1: Public Core Editorial Routes ──");
    // -------------------------------------------------------------------------

    await test("1. Homepage (/) renders Gerat Software Solution with 200 OK", async () => {
      const res = await request("/");
      assert.strictEqual(res.status, 200);
      assert(res.body.includes("GERAT SOFTWARE SOLUTION"));
    });

    await test("2. Portfolio route (/portfolio) renders with 200 OK", async () => {
      const res = await request("/portfolio");
      assert.strictEqual(res.status, 200);
      assert(res.body.includes("PORTFOLIO"));
    });

    await test("3. Team route (/team) renders leadership roster with 200 OK", async () => {
      const res = await request("/team");
      assert.strictEqual(res.status, 200);
      assert(res.body.includes("LEADERSHIP") || res.body.includes("HRUY DANIEL"));
    });

    await test("4. Services route (/services) renders core capabilities with 200 OK", async () => {
      const res = await request("/services");
      assert.strictEqual(res.status, 200);
      assert(res.body.includes("SERVICES"));
    });

    await test("5. Brand Creative route (/services/brand-creative) renders with 200 OK", async () => {
      const res = await request("/services/brand-creative");
      assert.strictEqual(res.status, 200);
      assert(res.body.includes("BRAND STRATEGY"));
    });

    await test("6. Personal Branding route (/services/personal-branding) renders with 200 OK", async () => {
      const res = await request("/services/personal-branding");
      assert.strictEqual(res.status, 200);
      assert(res.body.includes("PERSONAL BRANDING"));
    });

    await test("7. Insights route (/insights) renders research portal with 200 OK", async () => {
      const res = await request("/insights");
      assert.strictEqual(res.status, 200);
      assert(res.body.includes("INSIGHTS"));
    });

    await test("8. Dashboard Login (/dashboard/login) renders authentication cockpit", async () => {
      const res = await request("/dashboard/login");
      assert.strictEqual(res.status, 200);
      assert(res.body.includes("MISSION CONTROL") || res.body.includes("Gerat Software Solution"));
    });

    // -------------------------------------------------------------------------
    console.log("\n── Group 2: SEO & Search Crawler Verification ──");
    // -------------------------------------------------------------------------

    await test("9. robots.txt serves valid sitemap pointing to www.gerat.com", async () => {
      const res = await request("/robots.txt");
      assert.strictEqual(res.status, 200);
      assert(res.body.includes("https://www.gerat.com/sitemap.xml"));
    });

    await test("10. sitemap.xml serves valid URL set pointing to www.gerat.com", async () => {
      const res = await request("/sitemap.xml");
      assert.strictEqual(res.status, 200);
      assert(res.body.includes("https://www.gerat.com"));
    });

    // -------------------------------------------------------------------------
    console.log("\n── Group 3: Master Brand SVGs, Fonts & OG Assets ──");
    // -------------------------------------------------------------------------

    await test("11. Master dark primary logo SVG (/brand/gerat-primary-dark.svg) is accessible", async () => {
      const res = await request("/brand/gerat-primary-dark.svg");
      assert.strictEqual(res.status, 200);
      assert(res.body.includes("<svg"));
    });

    await test("12. Master light standalone mark SVG (/brand/gerat-mark-light.svg) is accessible", async () => {
      const res = await request("/brand/gerat-mark-light.svg");
      assert.strictEqual(res.status, 200);
      assert(res.body.includes("<svg"));
    });

    await test("13. Master orange badge logo SVG (/brand/gerat-badge-logo-orange.svg) is accessible", async () => {
      const res = await request("/brand/gerat-badge-logo-orange.svg");
      assert.strictEqual(res.status, 200);
      assert(res.body.includes("<svg"));
    });

    await test("14. Official 1920x1080 brand OpenGraph card (/brand/og-image.jpg) is accessible", async () => {
      const res = await request("/brand/og-image.jpg");
      assert.strictEqual(res.status, 200);
      assert(res.headers["content-type"]?.includes("image/jpeg"));
      assert(res.buffer.length > 50000, "OG image file size is unexpectedly small");
    });

    await test("15. Brand Favicon (/icon.svg) contains Flame (#EA5B15) mark", async () => {
      const res = await request("/icon.svg");
      assert.strictEqual(res.status, 200);
      assert(res.body.includes("<svg") && res.body.toLowerCase().includes("#ea5b15"));
    });

    await test("16. Artific Regular webfont (/fonts/artific-regular.woff2) is accessible", async () => {
      const res = await request("/fonts/artific-regular.woff2");
      assert.strictEqual(res.status, 200);
      assert(res.buffer.length > 1000);
    });

    await test("17. Parkinsans Regular webfont (/fonts/Parkinsans-Regular.woff2) is accessible", async () => {
      const res = await request("/fonts/Parkinsans-Regular.woff2");
      assert.strictEqual(res.status, 200);
      assert(res.buffer.length > 1000);
    });

    // -------------------------------------------------------------------------
    console.log("\n── Group 4: Public Dynamic CMS APIs ──");
    // -------------------------------------------------------------------------

    await test("18. Portfolio API (/api/portfolio) returns valid case studies array", async () => {
      const res = await request("/api/portfolio");
      assert.strictEqual(res.status, 200);
      const data = JSON.parse(res.body);
      assert.strictEqual(data.success, true);
      assert(Array.isArray(data.caseStudies));
    });

    await test("19. Team API (/api/team) returns valid members roster", async () => {
      const res = await request("/api/team");
      assert.strictEqual(res.status, 200);
      const data = JSON.parse(res.body);
      assert.strictEqual(data.success, true);
      assert(Array.isArray(data.members));
    });

    await test("20. Services API (/api/services) returns valid capability pillars", async () => {
      const res = await request("/api/services");
      assert.strictEqual(res.status, 200);
      const data = JSON.parse(res.body);
      assert.strictEqual(data.success, true);
      assert(Array.isArray(data.pillars));
    });

    await test("21. Articles API (/api/articles) returns valid insights collection", async () => {
      const res = await request("/api/articles");
      assert.strictEqual(res.status, 200);
      const data = JSON.parse(res.body);
      assert.strictEqual(data.success, true);
      assert(Array.isArray(data.articles));
    });

    // -------------------------------------------------------------------------
    console.log("\n── Group 5: Inquiries & CRM Intake Pipeline ──");
    // -------------------------------------------------------------------------

    await test("22. Client intake submission (POST /api/intake) returns telemetry code", async () => {
      const payload = {
        fullName: "E2E Platform Verification",
        email: "e2e.test@gerat.com",
        phone: "+2519 2929 8030",
        company: "Gerat Testing Lab",
        serviceInterest: "Full Architecture Modernization",
        budgetRange: "$25k - $50k",
        projectBrief: "Automated end-to-end integration test verifying complete rebrand pipeline.",
      };
      const res = await request("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      assert.strictEqual(res.status, 200);
      const data = JSON.parse(res.body);
      assert.strictEqual(data.success, true);
      assert(data.telemetryCode, "Missing telemetryCode in intake response");
    });

    // -------------------------------------------------------------------------
    console.log("\n── Group 6: Mission Control Authentication & Protected Shell ──");
    // -------------------------------------------------------------------------

    await test("23. Unauthenticated /dashboard redirects to /dashboard/login (307)", async () => {
      const res = await request("/dashboard");
      assert.strictEqual(res.status, 307);
      assert(res.headers.location?.includes("/dashboard/login"));
    });

    await test("24. Authenticated session grants 200 OK access to protected /dashboard", async () => {
      const loginPayload = {
        email: "admin@gerat.com",
        password: "GeratAdmin2026!#",
      };
      const loginRes = await request("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginPayload),
      });
      assert.strictEqual(loginRes.status, 200);
      const loginData = JSON.parse(loginRes.body);
      assert.strictEqual(loginData.success, true);

      // Extract gerat_session cookie
      const setCookie = loginRes.headers["set-cookie"];
      assert(setCookie && setCookie.length > 0, "Login did not set session cookie");
      const cookieHeader = Array.isArray(setCookie) ? setCookie.join("; ") : setCookie;

      // Access protected dashboard with session cookie
      const dashRes = await request("/dashboard", {
        headers: { Cookie: cookieHeader },
      });
      assert.strictEqual(dashRes.status, 200);
      assert(dashRes.body.includes("MISSION CONTROL") || dashRes.body.includes("COCKPIT"));
    });

  } finally {
    if (spawnedProcess) {
      console.log("\n▶ Stopping spawned Next.js server...");
      spawnedProcess.kill("SIGTERM");
    }
  }

  console.log("\n-------------------------------------------------");
  console.log(`E2E Summary: ${passed} passed, ${failed} failed (Total: 24)`);
  console.log("-------------------------------------------------");

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log("ALL 24 END-TO-END ASSERTIONS PASSED SUCCESSFULLY! ✓\n");
    process.exit(0);
  }
}

runAllE2ETests().catch((err) => {
  console.error("E2E Test Runner Encountered Fatal Error:", err);
  process.exit(1);
});
