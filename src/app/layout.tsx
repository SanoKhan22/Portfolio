import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { CursorFollower } from "@/components/animations/CursorFollower";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <ThemeProvider>
          <ScrollProgress />
          <CursorFollower />
          <div className="grain-overlay" />
          <div className="page-shell">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
