/**
 * Site-wide configuration and telemetry metadata (Spec §49)
 * Gerat Software Solutions PLC
 */
export const siteConfig = {
  name: "Gerat Software Solutions PLC",
  shortName: "GERAT",
  legalName: "Gerat Software Solutions Public Limited Company",
  tagline: "Technology That Moves Real Systems",
  description:
    "Deep-tech software engineering studio architecting mission-critical platforms, enterprise ERPs, and domain-grounded AI systems for high-stakes operational environments.",
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
  socials: [
    { name: "LINKEDIN", href: "https://linkedin.com/company/gerat" },
    { name: "GITHUB", href: "https://github.com/gerat-technologies" },
    { name: "TELEGRAM", href: "https://t.me/geratsolutions" },
  ],
};
