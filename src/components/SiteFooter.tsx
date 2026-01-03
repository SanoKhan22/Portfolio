"use client";

import Link from "next/link";
import { socialLinks } from "@/data/stats";
import { MapPin, Clock, Activity, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";

const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

export function SiteFooter() {
  const [currentTime, setCurrentTime] = useState("");
  const [location, setLocation] = useState("Loading...");
  const [timezone, setTimezone] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Detect timezone
    const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(detectedTimezone);

    // Get location from timezone (simplified mapping)
    const getLocationFromTimezone = (tz: string) => {
      const cityMap: Record<string, string> = {
        "Asia/Kabul": "Kabul, Afghanistan",
        "America/New_York": "New York, USA",
        "America/Los_Angeles": "Los Angeles, USA",
        "Europe/London": "London, UK",
        "Europe/Paris": "Paris, France",
        "Asia/Tokyo": "Tokyo, Japan",
        "Asia/Dubai": "Dubai, UAE",
        "Asia/Karachi": "Karachi, Pakistan",
        "Asia/Kolkata": "Mumbai, India",
        "Australia/Sydney": "Sydney, Australia",
      };

      // Try exact match
      if (cityMap[tz]) return cityMap[tz];

      // Extract city from timezone
      const parts = tz.split("/");
      if (parts.length >= 2) {
        const city = parts[parts.length - 1].replace(/_/g, " ");
        return city;
      }
      return "Unknown Location";
    };

    setLocation(getLocationFromTimezone(detectedTimezone));

    // Update time
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      
      // Get timezone abbreviation
      const tzAbbr = now
        .toLocaleTimeString("en-US", { timeZoneName: "short" })
        .split(" ")
        .pop();
      
      setCurrentTime(`${timeStr} ${tzAbbr}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-[var(--color-border)]/50 bg-[var(--surface)]/90 text-[var(--color-muted)] backdrop-blur-md">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[var(--accent)]/5" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Three Column Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:divide-x md:divide-[var(--color-border)]/30">
          
          {/* Left Section: About & Status */}
          <div className="flex flex-col gap-3 transition-all hover:bg-[var(--surface-raised)]/30 md:pr-6 md:rounded-l-lg md:p-4">
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">Ehsanullah Sano</h3>
              <p className="text-xs text-[var(--accent-strong)]">Software Engineer</p>
            </div>
            <div className="flex flex-col gap-1.5 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>{mounted ? location : "Loading..."}</span>
              </div>
              {mounted && (
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span className="tabular-nums">{currentTime}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Activity className="h-3.5 w-3.5 text-green-500" />
                <span className="text-green-400">Available for work</span>
              </div>
              <div className="flex items-center gap-2 pt-2 mt-2 border-t border-[var(--color-border)]/30">
                <GraduationCap className="h-4 w-4 text-[var(--accent)] flex-shrink-0" />
                <span className="text-[var(--muted)] text-xs">
                  Computer Science Student @{" "}
                  <a
                    href="https://www.elte.hu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] hover:text-[var(--accent-strong)] transition-colors underline decoration-[var(--accent)]/30 hover:decoration-[var(--accent-strong)] whitespace-nowrap"
                  >
                    ELTE University, Hungary
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* Center Section: Navigation */}
          <div className="flex flex-col gap-3 transition-all hover:bg-[var(--surface-raised)]/30 md:px-6 md:p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-[var(--foreground)]">Navigate</h4>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[var(--color-muted)] transition-all hover:translate-x-1 hover:text-[var(--accent-strong)]"
                >
                  → {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Section: Connect & CV */}
          <div className="flex flex-col gap-3 transition-all hover:bg-[var(--surface-raised)]/30 md:pl-6 md:rounded-r-lg md:p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-[var(--foreground)]">Connect</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-9 w-9 md:h-8 md:w-8 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--surface-raised)] text-[var(--color-muted)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent-strong)] hover:scale-110"
                  aria-label={link.label}
                >
                  {link.label === "LinkedIn" && (
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  )}
                  {link.label === "GitHub" && (
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  )}
                  {link.label === "Email" && (
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
            <a
              href="/assets/myCV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-1 inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--accent)] bg-[var(--accent)]/10 px-4 py-2 text-xs font-semibold text-[var(--accent)] transition-all hover:bg-[var(--accent)] hover:text-black hover:shadow-[0_0_20px_rgba(51,255,180,0.3)] active:scale-95"
            >
              <svg className="h-3.5 w-3.5 transition-transform group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download CV
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-6 border-t border-[var(--color-border)]/30 pt-4 text-center text-xs text-[var(--color-muted)]">
          <p>© {new Date().getFullYear()} Ehsanullah Sano • All rights reserved • Built with Next.js & ❤️</p>
        </div>
      </div>
    </footer>
  );
}
