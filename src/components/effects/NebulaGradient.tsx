'use client';

import { motion } from 'framer-motion';
import { useParallax } from '@/hooks';

interface NebulaGradientProps {
    className?: string;
}

export function NebulaGradient({ className }: NebulaGradientProps) {
    const parallaxOffset = useParallax({ speed: 0.2 });
    const deepParallaxOffset = useParallax({ speed: 0.1 });

    return (
        <div className={`absolute inset-0 pointer-events-none ${className || ''}`}>
            {/* Deep static background */}
            <div className="absolute inset-0 bg-slate-950/20" />

            {/* Slow moving deep layer */}
            <motion.div
                className="absolute inset-0"
                style={{
                    transform: `translate3d(0, ${deepParallaxOffset}px, 0)`,
                    willChange: 'transform',
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
                linear-gradient(
                  180deg,
                  rgba(19, 10, 40, 0.4) 0%,
                  transparent 40%,
                  transparent 80%,
                  rgba(10, 20, 40, 0.4) 100%
                )
              `,
                    }}
                />
            </motion.div>

            {/* Main parallax layer */}
            <motion.div
                className="absolute inset-0"
                style={{
                    transform: `translate3d(0, ${parallaxOffset}px, 0)`,
                    willChange: 'transform',
                }}
            >
                {/* Primary gradient overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
              linear-gradient(
                180deg,
                rgba(236, 72, 153, 0.1) 0%,
                transparent 30%,
                transparent 70%,
                rgba(34, 211, 238, 0.1) 100%
              )
            `,
                    }}
                />

                {/* Radial accent - top left */}
                <div
                    className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 opacity-30"
                    style={{
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent 60%)',
                        filter: 'blur(120px)',
                    }}
                />

                {/* Radial accent - bottom right */}
                <div
                    className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 opacity-30"
                    style={{
                        background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4), transparent 60%)',
                        filter: 'blur(120px)',
                    }}
                />
            </motion.div>
        </div>
    );
}
