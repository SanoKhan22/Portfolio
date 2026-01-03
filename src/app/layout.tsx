import type { Metadata } from "next";
import { Inter, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { CursorFollower } from "@/components/animations/CursorFollower";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.sano.dev"),
  title: "Ehsanullah Sano — Software Engineer & Startup Builder",
  description:
    "Code. Ship. Repeat. Building apps that don't crash and products people actually use. Android • iOS • Web",
  openGraph: {
    title: "Ehsanullah Sano — Software Engineer & Startup Builder",
    description:
      "Building software and digital products that solve real problems. Android • iOS • Web",
    url: "https://portfolio.sano.dev",
    siteName: "Ehsanullah Sano Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ehsanullah Sano — Software Engineer & Startup Builder",
    description:
      "Code. Ship. Repeat. Building mobile and web products that actually work.",
  },
  keywords: [
    "software engineer",
    "product builder",
    "android",
    "ios",
    "growth",
    "entrepreneur",
  ],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafbfa" },
    { media: "(prefers-color-scheme: dark)", color: "#030503" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${instrumentSans.variable} antialiased`}>
        <ThemeProvider>
          <CursorFollower />
          <div className="grain-overlay" />
          <div className="page-shell">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
