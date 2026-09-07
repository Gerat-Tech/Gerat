import "./globals.css";
import { cookies } from "next/headers";
import { NavProvider } from "@/context/NavContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ClientWrapper from "@/components/layout/ClientWrapper";

export const metadata = {
  metadataBase: new URL("https://gerat.et"),
  title: {
    default: "Gerat Software Solutions PLC | Deep-Tech Software & Digital Systems",
    template: "%s | Gerat Software Solutions PLC",
  },
  description:
    "Deep-tech software engineering studio architecting mission-critical platforms, enterprise ERPs, and domain-grounded AI systems for high-stakes operational environments.",
  keywords: [
    "Gerat",
    "Software Solutions",
    "Enterprise ERP",
    "Artificial Intelligence",
    "RAG Systems",
    "Telemetry Pipelines",
    "Public Sector Technology",
    "Addis Ababa",
    "Ethiopia",
  ],
  authors: [{ name: "Gerat Software Solutions PLC", url: "https://gerat.et" }],
  creator: "Gerat Software Solutions PLC",
  publisher: "Gerat Software Solutions PLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gerat.et",
    siteName: "Gerat Software Solutions PLC",
    title: "Gerat Software Solutions PLC | Technology That Moves Real Systems",
    description:
      "Deep-tech software engineering studio architecting mission-critical platforms, enterprise ERPs, and domain-grounded AI systems for high-stakes operational environments.",
    images: [
      {
        url: "/image/portfolioPage/US-AUT-3.webp",
        width: 1200,
        height: 630,
        alt: "Gerat Software Solutions PLC // Mission-Critical Architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gerat Software Solutions PLC | Technology That Moves Real Systems",
    description:
      "Deep-tech software engineering studio architecting mission-critical platforms, enterprise ERPs, and domain-grounded AI systems.",
    images: ["/image/portfolioPage/US-AUT-3.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("gerat-theme")?.value || cookieStore.get("gerat-dashboard-theme")?.value || "dark";
  const initialTheme = themeCookie === "light" ? "light" : "dark";

  return (
    <html
      lang="en"
      className={`scroll-smooth ${initialTheme === "light" ? "light site-light dashboard-light" : "dark site-dark dashboard-dark"}`}
      suppressHydrationWarning
    >
      <body className="bg-[var(--bg)] text-[var(--text-primary)] selection:bg-accent selection:text-black min-h-screen transition-colors duration-200">
        {/* Skip-to-content accessibility link (Spec ref: §37, Phase 14) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2.5 focus:bg-accent focus:text-white focus:font-azeret focus:text-[11px] focus:tracking-[0.2em] focus:uppercase focus:rounded-[2px] focus:outline-none focus:shadow-2xl"
        >
          Skip to main content
        </a>

        <ThemeProvider initialTheme={initialTheme}>
          <NavProvider>
            <ClientWrapper>
              <main id="main-content" tabIndex="-1" className="outline-none min-h-screen">
                {children}
              </main>
            </ClientWrapper>
          </NavProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
