"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CodeRunnerProps {
    onComplete?: () => void;
}

export function CodeRunner({ onComplete }: CodeRunnerProps) {
    const [isTyping, setIsTyping] = useState(true);
    const [displayedCode, setDisplayedCode] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [showOutput, setShowOutput] = useState(false);
    const [cursorVisible, setCursorVisible] = useState(true);

    const codeLines = [
        "function buildProduct() {",
        '  const idea = "solve problems";',
        "  const tech = ['Android', 'iOS', 'Web'];",
        "  return ship(idea, tech);",
        "}",
    ];

    const fullCode = codeLines.join("\n");
    const typingSpeed = 30; // ms per character

    // Typewriter effect
    useEffect(() => {
        if (!isTyping) return;

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= fullCode.length) {
                setDisplayedCode(fullCode.slice(0, currentIndex));
                currentIndex++;
            } else {
                setIsTyping(false);
                clearInterval(interval);
            }
        }, typingSpeed);

        return () => clearInterval(interval);
    }, [isTyping]);

    // Cursor blink
    useEffect(() => {
        const interval = setInterval(() => {
            setCursorVisible((prev) => !prev);
        }, 530);
        return () => clearInterval(interval);
    }, []);

    const handleRun = () => {
        setIsRunning(true);

        // Simulate code execution
        setTimeout(() => {
            setShowOutput(true);
            setIsRunning(false);
            onComplete?.();
        }, 1200);

        // Hide output after 8 seconds and reset
        setTimeout(() => {
            setShowOutput(false);
            setTimeout(() => {
                setDisplayedCode("");
                setIsTyping(true);
            }, 500);
        }, 8000);
    };

    return (
        <div className="relative">
            {/* Code Editor Window */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--surface)]/80 backdrop-blur-xl overflow-hidden shadow-[var(--shadow-soft)]"
            >
                {/* Window Header */}
                <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--surface-raised)]/60 px-4 py-3">
                    <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-500/80" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                        <div className="h-3 w-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="ml-2 text-xs text-[var(--color-muted)] font-mono">
                        buildProduct.ts
                    </span>
                </div>

                {/* Code Content */}
                <div className="p-4 font-mono text-sm leading-relaxed">
                    <pre className="text-[var(--foreground)] whitespace-pre-wrap break-words">
                        {displayedCode.split("\n").map((line, i) => (
                            <div key={i} className="flex">
                                <span className="mr-4 select-none text-[var(--color-muted)] opacity-50">
                                    {i + 1}
                                </span>
                                <code>
                                    {line.split(/(\bfunction\b|\bconst\b|\breturn\b|"[^"]*"|\[|\]|'[^']*')/).map((part, j) => {
                                        if (part.match(/\bfunction\b|\bconst\b|\breturn\b/)) {
                                            return (
                                                <span key={j} className="text-[var(--accent-strong)]">
                                                    {part}
                                                </span>
                                            );
                                        }
                                        if (part.match(/"[^"]*"|'[^']*'/)) {
                                            return (
                                                <span key={j} className="text-[#ff6b6b]">
                                                    {part}
                                                </span>
                                            );
                                        }
                                        if (part.match(/\[|\]/)) {
                                            return (
                                                <span key={j} className="text-[#4ecdc4]">
                                                    {part}
                                                </span>
                                            );
                                        }
                                        return <span key={j}>{part}</span>;
                                    })}
                                </code>
                            </div>
                        ))}
                        {isTyping && (
                            <motion.span
                                animate={{ opacity: cursorVisible ? 1 : 0 }}
                                className="inline-block w-2 h-4 bg-[var(--accent-strong)] ml-1"
                            />
                        )}
                    </pre>
                </div>

                {/* Run Button */}
                {!isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="px-4 pb-4"
                    >
                        <motion.button
                            onClick={handleRun}
                            disabled={isRunning}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black shadow-[var(--glow)] transition hover:bg-[var(--accent-strong)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isRunning ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="h-4 w-4 border-2 border-black border-t-transparent rounded-full"
                                    />
                                    <span>Running...</span>
                                </>
                            ) : (
                                <>
                                    <svg
                                        className="h-4 w-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                    <span>Run Code</span>
                                </>
                            )}
                        </motion.button>
                    </motion.div>
                )}
            </motion.div>

            {/* Output Display */}
            <AnimatePresence>
                {showOutput && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="mt-4 rounded-xl border border-[var(--accent)]/30 bg-[var(--surface-raised)]/90 backdrop-blur-xl p-4 shadow-[0_0_30px_rgba(51,255,180,0.2)]"
                    >
                        <div className="flex items-start gap-3">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="flex-shrink-0 rounded-full bg-[var(--accent)] p-1.5"
                            >
                                <svg
                                    className="h-4 w-4 text-black"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </motion.div>
                            <div>
                                <p className="text-xs font-semibold text-[var(--accent-strong)] mb-1">
                                    ✓ Execution Complete
                                </p>
                                <p className="text-sm text-white/90 leading-relaxed">
                                    Building software and digital products that solve real problems.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
