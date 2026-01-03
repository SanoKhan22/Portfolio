"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import ThemeToggle from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

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

  // Animate name change after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFullName(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

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
  }, []);

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
              {/* Logo with Animated Name */}
              <motion.button
                onClick={() => scrollToSection("home")}
                className="text-2xl font-bold font-display relative whitespace-nowrap text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Ehsanullah - Particle Dispersion Effect */}
                <span className="relative inline-block mr-2">
                  {"Ehsanullah".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      className="inline-block"
                      animate={{
                        opacity: showFullName ? 1 : 0,
                        x: showFullName ? 0 : (index % 2 === 0 ? -50 : 50),
                        y: showFullName ? 0 : (Math.random() - 0.5) * 100,
                        scale: showFullName ? 1 : 0,
                        rotate: showFullName ? 0 : (Math.random() - 0.5) * 360,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.03,
                        ease: "easeInOut",
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                <motion.span
                  className="inline-block"
                  animate={{
                    x: showFullName ? 0 : -148,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3,
                    ease: "easeInOut",
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
                          ? "text-white"
                          : "text-[var(--color-muted)] hover:text-white"
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
                  className="p-2 text-white rounded-lg hover:bg-[var(--accent)]/10"
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
                    isActive ? "text-[var(--accent)]" : "text-white"
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

