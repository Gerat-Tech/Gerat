/**
 * Next.js Dynamic Sitemap Generator (Spec Phase 15)
 * Gerat Software Solutions PLC
 */
export default function sitemap() {
  const baseUrl = "https://gerat.et";
  const lastModified = new Date().toISOString();

  const routes = [
    "",
    "/portfolio",
    "/team",
    "/insights",
    "/why-wqf",
    "/services/brand-creative",
    "/services/personal-branding",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
