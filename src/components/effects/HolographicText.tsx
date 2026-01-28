'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface HolographicTextProps {
    text: string;
    className?: string;
}

export function HolographicText({ text, className = '' }: HolographicTextProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`relative inline-block ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Base Text */}
            <span className="relative z-10">{text}</span>

            {/* Cyan Offset */}
            <motion.span
                className="absolute inset-0 text-cyan-400 mix-blend-screen select-none"
                animate={isHovered ? {
                    x: [-2, 2, -1, 0],
                    opacity: [0.5, 0.8, 0.5],
                } : { x: 0, opacity: 0 }}
                transition={{ duration: 0.2, repeat: isHovered ? Infinity : 0, repeatType: "reverse" }}
            >
                {text}
            </motion.span>

            {/* Magenta Offset */}
            <motion.span
                className="absolute inset-0 text-fuchsia-500 mix-blend-screen select-none"
                animate={isHovered ? {
                    x: [2, -2, 1, 0],
                    opacity: [0.5, 0.8, 0.5],
                } : { x: 0, opacity: 0 }}
                transition={{ duration: 0.25, repeat: isHovered ? Infinity : 0, repeatType: "reverse" }}
            >
                {text}
            </motion.span>
        </div>
    );
}
