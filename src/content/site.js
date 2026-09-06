/**
 * Site-wide configuration and telemetry metadata (Spec §49)
 * Gerat Software Solutions PLC
 */
export const siteConfig = {
  name: "Gerat Software Solutions PLC",
  shortName: "GERAT",
  legalName: "Gerat Software Solutions Public Limited Company",
  tagline: "From Identity to Infrastructure",
  description:
    "Gerat Software Solutions PLC builds monolithic brand identities, digital products, intelligent AI systems, and enterprise software architectures for high-stakes operational environments.",
  telemetry: {
    status: "OPERATIONAL // STABLE",
    location: "ADDIS ABABA, EAST AFRICA",
    coordinates: "09°01'N 38°45'E",
    timezone: "UTC+3 (EAT)",
    reviewSla: "24-48 HOURS",
  },
  contact: {
    inquiries: "info@gerat.et",
    engineering: "contact@gerat.et",
    phone: "+251 11 000 0000",
    headquarters: "Bole Subcity, Addis Ababa, Ethiopia",
  },
  navLinks: [
    { name: "SERVICES", href: "/why-wqf" },
    { name: "PORTFOLIO", href: "/portfolio" },
    { name: "TEAM", href: "/team" },
    { name: "INSIGHTS", href: "/insights" },
  ],
  creativeServices: [
    { name: "BRAND STRATEGY", id: "brand-strategy" },
    { name: "LOGO & IDENTITY", id: "brand-identity" },
    { name: "GRAPHIC DESIGN", id: "graphic-design" },
    { name: "SOCIAL SYSTEMS", id: "social-design" },
    { name: "PERSONAL BRANDING", id: "personal-branding" },
  ],
  socials: [
    { name: "LINKEDIN", href: "https://linkedin.com/company/gerat" },
    { name: "GITHUB", href: "https://github.com/gerat-technologies" },
    { name: "TELEGRAM", href: "https://t.me/geratsolutions" },
  ],
};
