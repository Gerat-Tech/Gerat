/**
 * Next.js Dynamic Robots Generator (Spec Phase 15)
 * Gerat Software Solution
 */
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.gerat.com/sitemap.xml",
  };
}
