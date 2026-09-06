/**
 * Next.js Dynamic Robots Generator (Spec Phase 15)
 * Gerat Software Solutions PLC
 */
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://gerat.et/sitemap.xml",
  };
}
