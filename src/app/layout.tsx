import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { CursorFollower } from "@/components/animations/CursorFollower";

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
  title: "Ehsanullah Sano — Product-Focused Software Engineer",
  description:
    "I build premium cross-platform apps, growth loops, and data-backed digital products that move business metrics.",
  openGraph: {
    title: "Ehsanullah Sano — Product-Focused Software Engineer",
    description:
      "Premium engineering + product thinking across Android, iOS, and growth stacks.",
    url: "https://portfolio.sano.dev",
    siteName: "Ehsanullah Sano Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ehsanullah Sano — Product-Focused Software Engineer",
    description:
      "Cross-platform engineer and entrepreneur building revenue-focused products.",
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
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <ScrollProgress />
        <CursorFollower />
        <div className="grain-overlay" />
        <div className="page-shell">{children}</div>
      </body>
    </html>
  );
}
