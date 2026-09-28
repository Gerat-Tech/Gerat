/**
 * Next.js Dynamic Sitemap Generator (V2 Architecture)
 * Gerat Software Solution
 */
export default function sitemap() {
  const baseUrl = "https://www.gerat.com";
  const lastModified = new Date().toISOString();

  const routes = [
    "",
    "/about",
    "/services",
    "/services/digital-experiences",
    "/services/ai-tools",
    "/services/business-systems",
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
