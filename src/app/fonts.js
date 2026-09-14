import localFont from "next/font/local";

/**
 * Official Brand Typography Pipeline (next/font/local)
 * 
 * - Artific: Primary brand display, editorial titles, and monolithic headings
 * - Parkinsans: Modern body copy, technical UI, navigation, and metadata labels
 */

export const artific = localFont({
  src: [
    { path: "../../public/fonts/artific-thin.woff2", weight: "100", style: "normal" },
    { path: "../../public/fonts/artific-light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/artific-regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/artific-medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/artific-semibold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/artific-bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/artific-black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-artific",
  display: "swap",
});

export const parkinsans = localFont({
  src: [
    { path: "../../public/fonts/Parkinsans-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/Parkinsans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Parkinsans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Parkinsans-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/Parkinsans-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/Parkinsans-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-parkinsans",
  display: "swap",
});
