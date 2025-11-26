"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { shouldReduceMotion, isMobile } from "@/lib/utils";

interface TypewriterProps {
    text: string;
    className?: string;
    delay?: number;
    speed?: number;
}

export function Typewriter({ text, className = "", delay = 0, speed }: TypewriterProps) {
    const [displayedText, setDisplayedText] = useState("");
    const reducedMotion = shouldReduceMotion();
    const mobile = isMobile();

    // Auto-determine speed based on device
    const charDelay = speed || (mobile ? 30 : 50);

    useEffect(() => {
        if (reducedMotion) {
            setDisplayedText(text);
            return;
        }

        const timeout = setTimeout(() => {
            let currentIndex = 0;
            const interval = setInterval(() => {
                if (currentIndex <= text.length) {
                    setDisplayedText(text.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }, charDelay);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [text, delay, charDelay, reducedMotion]);

    if (reducedMotion) {
        return <span className={className}>{text}</span>;
    }

    return (
        <span className={className}>
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block"
            >
                |
            </motion.span>
        </span>
    );
}
