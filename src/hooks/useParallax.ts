'use client';

import { useState, useEffect, useRef } from 'react';

interface UseParallaxOptions {
    enabled?: boolean;
    maxOffset?: number;
    speed?: number;
}

export function useParallax(options: UseParallaxOptions = {}) {
    const { enabled = true, maxOffset = 60, speed = 0.15 } = options;
    const [offset, setOffset] = useState(0);
    const rafRef = useRef<number | null>(null);
    const lastScrollRef = useRef(0);
    const fastScrollRef = useRef(false);

    useEffect(() => {
        // Respect user preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isMobile = window.innerWidth < 768;

        if (!enabled || prefersReducedMotion || isMobile) return;

        const handleScroll = () => {
            if (rafRef.current) return;

            rafRef.current = requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const scrollSpeed = Math.abs(scrollY - lastScrollRef.current);

                // Disable if scrolling too fast
                if (scrollSpeed > 50) {
                    fastScrollRef.current = true;
                    setTimeout(() => { fastScrollRef.current = false; }, 500);
                }

                if (!fastScrollRef.current) {
                    setOffset(Math.min(scrollY * speed, maxOffset));
                }

                lastScrollRef.current = scrollY;
                rafRef.current = null;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [enabled, maxOffset, speed]);

    return offset;
}
