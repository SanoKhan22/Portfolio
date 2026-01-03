"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    // Haptic feedback for mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    
    // Get button position for wave animation
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      toggleTheme(x, y);
    } else {
      toggleTheme();
    }
  };

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-full bg-[var(--toggle-bg)]" />
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleToggle}
      className="w-12 h-12 rounded-full bg-[var(--toggle-bg)] hover:bg-[var(--toggle-bg-hover)] focus:ring-2 focus:ring-[var(--accent)] focus:outline-none flex items-center justify-center transition-colors duration-200 no-theme-transition"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {theme === "light" ? (
          <Moon className="w-5 h-5 text-[var(--foreground)]" />
        ) : (
          <Sun className="w-5 h-5 text-[var(--foreground)]" />
        )}
      </motion.div>
    </motion.button>
  );
}
