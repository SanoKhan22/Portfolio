"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { shouldReduceMotion, isMobile } from "@/lib/utils";

interface Ripple {
    x: number;
    y: number;
    id: number;
}

interface RippleButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    [key: string]: any;
}

export function RippleButton({ children, className = "", onClick, ...props }: RippleButtonProps) {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const reducedMotion = shouldReduceMotion();
    const mobile = isMobile();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!reducedMotion && !mobile) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const newRipple = { x, y, id: Date.now() };

            setRipples((prev) => [...prev, newRipple]);

            // Auto-remove ripple after animation
            setTimeout(() => {
                setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
            }, 600);
        }

        onClick?.(e);
    };

    return (
        <button
            onClick={handleClick}
            className={`relative overflow-hidden ${className}`}
            {...props}
        >
            {children}

            {!reducedMotion && !mobile && (
                <AnimatePresence>
                    {ripples.map((ripple) => (
                        <motion.span
                            key={ripple.id}
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 4, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            style={{
                                position: "absolute",
                                left: ripple.x,
                                top: ripple.y,
                                width: 20,
                                height: 20,
                                borderRadius: "50%",
                                backgroundColor: "rgba(51, 255, 180, 0.5)",
                                transform: "translate(-50%, -50%)",
                                pointerEvents: "none",
                            }}
                        />
                    ))}
                </AnimatePresence>
            )}
        </button>
    );
}
