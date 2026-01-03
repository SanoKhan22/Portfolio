"use client";

import { motion } from "framer-motion";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import ThemeToggle from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "timeline", label: "Timeline" },
  { id: "contact", label: "Contact" },
];

export default function FloatingHeader() {
  const { isScrolled } = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 w-full z-50 px-4 sm:px-6 lg:px-8 pt-4">
        <motion.header
          className={`mx-auto max-w-7xl rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-[var(--surface)]/90 backdrop-blur-md shadow-lg shadow-[var(--accent)]/8 border border-[var(--accent)]/20"
              : "bg-[var(--surface)]/70 backdrop-blur-sm border border-[var(--color-border)]/30"
          }`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <nav className="px-6 lg:px-8">
            <div className="flex h-14 items-center justify-between">
            {/* Logo */}
            <motion.button
              onClick={() => scrollToSection("home")}
              className="text-xl font-bold font-display text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sano
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors relative group"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
              
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-3">
              <ThemeToggle />
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[var(--foreground)]"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[var(--surface)]/95 backdrop-blur-lg border-b border-[var(--accent)]/10"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Content */}
          <motion.div
            className="relative flex flex-col items-center justify-center h-full gap-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {navLinks.map((link, index) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-2xl font-medium text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
