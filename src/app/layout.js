
import "./globals.css";
import { NavProvider } from "@/context/NavContext";
import ClientWrapper from "@/components/layout/ClientWrapper";

export const metadata = {
  title: "Gerat Software Solutions PLC | Deep-Tech & Digital Systems",
  description:
    "We build digital systems for businesses, institutions, and public-sector operations — intelligent applications, enterprise platforms, RAG systems, and ERP solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <NavProvider>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </NavProvider>
      </body>
    </html>
  );
}

