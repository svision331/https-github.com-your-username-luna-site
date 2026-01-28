'use client';

import { useState, useCallback } from 'react';

interface UseSwipeOptions {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    minSwipeDistance?: number;
}

export function useSwipe(options: UseSwipeOptions = {}) {
    const { onSwipeLeft, onSwipeRight, minSwipeDistance = 50 } = options;
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const onTouchStart = useCallback((e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    }, []);

    const onTouchMove = useCallback((e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    }, []);

    const onTouchEnd = useCallback(() => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && onSwipeLeft) {
            onSwipeLeft();
        }
        if (isRightSwipe && onSwipeRight) {
            onSwipeRight();
        }
    }, [touchStart, touchEnd, minSwipeDistance, onSwipeLeft, onSwipeRight]);

    return {
        onTouchStart,
        onTouchMove,
        onTouchEnd,
    };
}
