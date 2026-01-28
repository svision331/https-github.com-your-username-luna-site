'use client';

import { HTMLMotionProps, motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export function GlowButton({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    ...props
}: GlowButtonProps) {
    const baseStyles = 'relative font-semibold rounded-lg overflow-hidden transition-all duration-300';

    const sizeStyles = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const variantStyles = {
        primary: 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]',
        secondary: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]',
        outline: 'bg-transparent border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400',
    };

    return (
        <motion.button
            className={`
        ${baseStyles} 
        ${sizeStyles[size]} 
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {/* Gradient overlay on hover */}
            {variant === 'primary' && (
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-400 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </motion.button>
    );
}
