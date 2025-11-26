"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { shouldReduceMotion, isMobile } from "@/lib/utils";

export function CursorFollower() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Only show on desktop without reduced motion
        if (isMobile() || shouldReduceMotion()) {
            return;
        }

        setIsVisible(true);

        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX - 10);
            cursorY.set(e.clientY - 10);
        };

        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if target has matches method (is an Element)
            if (target && typeof target.matches === 'function') {
                if (target.matches('a, button, [role="button"], input, textarea, select')) {
                    setIsHovering(true);
                }
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if target has matches method (is an Element)
            if (target && typeof target.matches === 'function') {
                if (target.matches('a, button, [role="button"], input, textarea, select')) {
                    setIsHovering(false);
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseenter", handleMouseEnter, true);
        document.addEventListener("mouseleave", handleMouseLeave, true);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter, true);
            document.removeEventListener("mouseleave", handleMouseLeave, true);
        };
    }, [cursorX, cursorY]);

    if (!isVisible) {
        return null;
    }

    return (
        <motion.div
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
            className="pointer-events-none fixed z-50 hidden md:block"
        >
            <motion.div
                animate={{
                    width: isHovering ? 40 : 20,
                    height: isHovering ? 40 : 20,
                    backgroundColor: isHovering
                        ? "rgba(51, 255, 180, 0.3)"
                        : "rgba(51, 255, 180, 0.2)",
                }}
                transition={{ duration: 0.2 }}
                className="rounded-full border-2 border-[var(--accent-strong)] backdrop-blur-sm"
            />
        </motion.div>
    );
}
