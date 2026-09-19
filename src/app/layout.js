import "./globals.css";
import { cookies } from "next/headers";
import { NavProvider } from "@/context/NavContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ClientWrapper from "@/components/layout/ClientWrapper";
import { artific, parkinsans } from "./fonts";

export const metadata = {
  metadataBase: new URL("https://www.gerat.com"),
  title: {
    default: "Gerat Software Solution | Digital Products, Systems & Brand",
    template: "%s | Gerat Software Solution",
  },
  description:
    "Gerat Software Solution builds digital products, intelligent tools, business systems, and brand identities for businesses and institutions.",
  keywords: [
    "Gerat",
    "Software Solutions",
    "Digital Products",
    "Web & Mobile Apps",
    "Intelligent Systems",
    "Business Platforms",
    "Brand Architecture",
    "Addis Ababa",
    "Ethiopia",
  ],
  authors: [{ name: "Gerat Software Solution", url: "https://www.gerat.com" }],
  creator: "Gerat Software Solution",
  publisher: "Gerat Software Solution",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.gerat.com",
    siteName: "Gerat Software Solution",
    title: "Gerat Software Solution | Technology That Moves Real Systems",
    description:
      "Gerat Software Solution builds digital products, intelligent tools, business systems, and brand identities for businesses and institutions.",
    images: [
      {
        url: "/brand/og-image.jpg",
        width: 1920,
        height: 1080,
        alt: "Gerat Software Solution · Digital Products, Systems & Brand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gerat Software Solution | Technology That Moves Real Systems",
    description:
      "Gerat Software Solution builds digital products, intelligent tools, business systems, and brand identities for businesses and institutions.",
    images: ["/brand/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Gerat Software Solution",
  url: "https://www.gerat.com",
  logo: "https://www.gerat.com/brand/gerat-primary-orange.svg",
  description:
    "Gerat Software Solution builds digital products, intelligent tools, business systems, and brand identities for businesses and institutions.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+2519 2929 8030",
    contactType: "customer service",
    email: "contact@gerat.com",
  },
  sameAs: [
    "https://linkedin.com/company/gerat",
    "https://github.com/gerat-technologies",
    "https://t.me/geratsolutions",
  ],
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("gerat-theme")?.value || cookieStore.get("gerat-dashboard-theme")?.value || "light";
  const initialTheme = themeCookie === "dark" ? "dark" : "light";

  return (
    <html
      lang="en"
      className={`scroll-smooth ${artific.variable} ${parkinsans.variable} ${initialTheme === "light" ? "light site-light dashboard-light" : "dark site-dark dashboard-dark"}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="bg-[var(--bg)] text-[var(--text-primary)] selection:bg-accent selection:text-black min-h-screen transition-colors duration-200">
        {/* Skip-to-content accessibility link (Spec ref: §37, Phase 14) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2.5 focus:bg-accent focus:text-white focus:font-parkinsans focus:text-[11px] focus:tracking-[0.2em] focus:uppercase focus:rounded-[2px] focus:outline-none focus:shadow-2xl"
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
