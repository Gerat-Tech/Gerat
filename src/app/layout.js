import "./globals.css";
import { NavProvider } from "@/context/NavContext";
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-[#050505] text-white selection:bg-accent selection:text-black">
        {/* Skip-to-content accessibility link (Spec ref: §37, Phase 14) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2.5 focus:bg-accent focus:text-white focus:font-azeret focus:text-[11px] focus:tracking-[0.2em] focus:uppercase focus:rounded-[2px] focus:outline-none focus:shadow-2xl"
        >
          Skip to main content
        </a>

        <NavProvider>
          <ClientWrapper>
            <main id="main-content" tabIndex="-1" className="outline-none min-h-screen">
              {children}
            </main>
          </ClientWrapper>
        </NavProvider>
      </body>
    </html>
  );
}
