"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook for responsive breakpoint detection
 * Handles SSR gracefully and updates on window resize
 * 
 * @param query - Media query string (e.g., "(max-width: 768px)")
 * @returns boolean indicating if the media query matches
 * 
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)");
 * const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const media = window.matchMedia(query);
    
    // Set initial value
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Create listener for changes
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener("change", listener);
    } else {
      // Fallback for older browsers
      media.addListener(listener);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", listener);
      } else {
        media.removeListener(listener);
      }
    };
  }, [matches, query]);

  // Return false during SSR to prevent hydration mismatch
  if (!mounted) {
    return false;
  }

  return matches;
}
