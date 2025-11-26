"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export function SiteHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();
    const headerOpacity = useTransform(scrollY, [0, 100], [0, 1]);
    const headerBlur = useTransform(scrollY, [0, 100], [0, 10]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { label: "Projects", href: "#projects" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <motion.header
            style={{
                backgroundColor: isScrolled
                    ? "rgba(8, 13, 11, 0.8)"
                    : "rgba(8, 13, 11, 0)",
                backdropFilter: isScrolled ? `blur(${headerBlur}px)` : "none",
            }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] transition-all duration-300"
        >
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                {/* Logo/Name */}
                <Link href="/" className="group">
                    <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="text-lg font-bold text-white transition-colors group-hover:text-[var(--accent-strong)] sm:text-xl"
                    >
                        ES
                    </motion.span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-2 sm:gap-6">
                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-6 md:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--accent-strong)]"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* CV Download Button */}
                    <motion.a
                        href="/assets/myCV.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--surface)]/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:border-[var(--accent)] hover:bg-[var(--surface)]/60 sm:px-5"
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        <span className="hidden sm:inline">CV</span>
                    </motion.a>
                </div>
            </nav>
        </motion.header>
    );
}
