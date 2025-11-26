"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { shouldReduceMotion, isMobile } from "@/lib/utils";

interface CounterProps {
    value: string | number;
    className?: string;
    duration?: number;
}

export function Counter({ value, className = "", duration }: CounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const reducedMotion = shouldReduceMotion();
    const mobile = isMobile();

    // Auto-determine duration based on device
    const animDuration = duration || (mobile ? 1000 : 2000);

    // Extract number and prefix/suffix
    const valueStr = String(value);
    const hasPrefix = /^[+$€£¥]/.test(valueStr);
    const hasSuffix = /[%+kKmMbB]$/.test(valueStr);
    const prefix = hasPrefix ? valueStr[0] : "";
    const suffix = hasSuffix ? valueStr.slice(-1) : "";

    // Extract numeric part
    const numericMatch = valueStr.match(/[\d.]+/);
    const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0;

    const spring = useSpring(0, { duration: animDuration });
    const display = useTransform(spring, (latest) => {
        // Preserve decimals if present
        const hasDecimal = numericValue % 1 !== 0;
        return hasDecimal ? latest.toFixed(1) : Math.round(latest).toString();
    });

    useEffect(() => {
        if (isInView && !reducedMotion) {
            spring.set(numericValue);
        }
    }, [isInView, numericValue, spring, reducedMotion]);

    if (reducedMotion || !isInView) {
        return <span ref={ref} className={className}>{value}</span>;
    }

    return (
        <span ref={ref} className={className}>
            {prefix}
            <motion.span>{display}</motion.span>
            {suffix}
        </span>
    );
}
