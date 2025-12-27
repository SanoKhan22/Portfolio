"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === "dark";

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-14 h-7 rounded-full bg-neutral-200 dark:bg-neutral-700" />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-14 h-7 rounded-full bg-neutral-200 dark:bg-neutral-700 transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Toggle Track */}
      <motion.div
        className="absolute w-6 h-6 bg-white dark:bg-neutral-900 rounded-full shadow-md flex items-center justify-center"
        initial={false}
        animate={{
          x: isDark ? 14 : -14,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {/* Icon inside toggle */}
        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? 360 : 0,
            scale: isDark ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-blue-400" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500" />
          )}
        </motion.div>
      </motion.div>

      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <Sun className="w-3 h-3 text-amber-600 opacity-50" />
        <Moon className="w-3 h-3 text-blue-300 opacity-50" />
      </div>
    </motion.button>
  );
}
