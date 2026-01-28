'use client';

import { useState, useEffect } from 'react';

interface AudioVisualizerProps {
    isPlaying?: boolean;
    barCount?: number;
    className?: string; // Added className prop
}

export function AudioVisualizer({ isPlaying = true, barCount = 12, className = '' }: AudioVisualizerProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [bars, setBars] = useState(() =>
        Array.from({ length: barCount }, (_, i) => ({
            duration: 0.6,
            delay: (i * -0.1)
        }))
    );

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBars(Array.from({ length: barCount }, () => ({
            duration: 0.4 + Math.random() * 0.4,
            delay: Math.random() * -1
        })));
    }, [barCount]);

    return (
        <div className={`flex items-end justify-center gap-1 h-12 ${className}`}>
            {bars.map((bar, i) => (
                <div
                    key={i}
                    className="w-1.5 bg-gradient-to-t from-cyan-400 to-pink-400 rounded-full origin-bottom"
                    style={{
                        height: '100%',
                        animationName: (isPlaying && isMounted) ? 'pulse-bar' : 'none',
                        animationDuration: `${bar.duration}s`,
                        animationTimingFunction: 'ease-in-out',
                        animationIterationCount: 'infinite',
                        animationDirection: 'alternate',
                        animationDelay: isMounted ? `${bar.delay}s` : '0s',
                        transform: (!isPlaying || !isMounted) ? 'scaleY(0.2)' : undefined
                    }}
                />
            ))}
        </div>
    );
}
