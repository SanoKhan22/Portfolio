"use client";

import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import ThemeToggle from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "timeline", label: "Timeline" },
  { id: "contact", label: "Contact" },
];

export default function FloatingHeaderOption1() {
  const { isScrolled } = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showFullName, setShowFullName] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Animate name change after 2 seconds (only once)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFullName(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.3 });

    navLinks.forEach((link) => {
      let element;
      if (link.id === "home") {
        element = document.getElementById("hero");
      } else if (link.id === "timeline") {
        element = document.getElementById("experience");
      } else {
        element = document.getElementById(link.id);
      }
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [handleIntersection]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetId = id === "timeline" ? "experience" : id;
    const element = document.getElementById(targetId);
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
          className={`mx-auto max-w-7xl rounded-2xl transition-all duration-300 overflow-hidden ${
            isScrolled
              ? "bg-[var(--surface)]/90 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-[var(--color-border)]"
              : "bg-[var(--surface)]/70 backdrop-blur-xl border border-[var(--color-border)]/50"
          }`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Scroll Progress Bar */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-strong)] to-[var(--accent)] origin-left"
            style={{ scaleX }}
          />
          
          <nav className="px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo with Animated Name - Shows "Ehsanullah Sano" then animates to just "Sano" */}
              <motion.button
                onClick={() => scrollToSection("home")}
                className="text-2xl font-bold font-display relative whitespace-nowrap text-[var(--foreground)] overflow-visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence>
                  {showFullName && (
                    <motion.span
                      className="inline-block mr-1"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      {"Ehsanullah".split("").map((char, index) => (
                        <motion.span
                          key={index}
                          className="inline-block text-[var(--foreground)]"
                          exit={{
                            opacity: 0,
                            x: (index % 2 === 0 ? -1 : 1) * (30 + index * 8),
                            y: (index % 3 === 0 ? -1 : 1) * (15 + index * 6),
                            scale: 0.2,
                            rotate: (index % 2 === 0 ? -1 : 1) * (45 + index * 15),
                            filter: "blur(4px)",
                          }}
                          transition={{
                            duration: 0.8,
                            delay: index * 0.04,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </motion.span>
                  )}
                </AnimatePresence>
                <motion.span 
                  className="text-[var(--foreground)]"
                  animate={{
                    x: showFullName ? 0 : -8,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: showFullName ? 0 : 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  Sano
                </motion.span>
              </motion.button>

              {/* Desktop Navigation with Active Indicators */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = 
                    activeSection === link.id || 
                    (link.id === "home" && activeSection === "hero") ||
                    (link.id === "timeline" && activeSection === "experience");
                  
                  return (
                    <motion.button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                        isActive
                          ? "text-[var(--foreground)]"
                          : "text-[var(--color-muted)] hover:text-[var(--foreground)]"
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10">{link.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/20 to-[var(--accent-strong)]/20 backdrop-blur-sm rounded-lg border border-[var(--accent)]/40 shadow-lg"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
                
                <div className="ml-2 pl-2 border-l border-[var(--color-border)]">
                  <ThemeToggle />
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex md:hidden items-center gap-3">
                <ThemeToggle />
                <motion.button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-[var(--foreground)] rounded-lg hover:bg-[var(--accent)]/10"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.button>
              </div>
            </div>
          </nav>
        </motion.header>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-[var(--background)]/98 backdrop-blur-2xl"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <motion.div
            className="relative flex flex-col items-center justify-center h-full gap-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {navLinks.map((link, index) => {
              const isActive = 
                activeSection === link.id || 
                (link.id === "home" && activeSection === "hero") ||
                (link.id === "timeline" && activeSection === "experience");
              
              return (
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-2xl font-medium transition-colors ${
                    isActive ? "text-[var(--accent)]" : "text-[var(--foreground)]"
                  }`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

