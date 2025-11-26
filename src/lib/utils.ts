import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Detect if running on mobile device
 */
export function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

/**
 * Check if user prefers reduced motion
 */
export function shouldReduceMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Get animation duration based on device and preferences
 */
export function getAnimationDuration(baseDuration: number, reducedDuration: number = 0): number {
  if (shouldReduceMotion()) return reducedDuration;
  if (isMobile()) return baseDuration * 0.7; // 30% faster on mobile
  return baseDuration;
}
