'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

export function useKonamiCode(callback: () => void) {
    const [inputSequence, setInputSequence] = useState<string[]>([]);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        // Clear timeout on new key
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setInputSequence(prev => {
            const newSequence = [...prev, e.code].slice(-KONAMI_CODE.length);

            // Check if sequence matches
            if (newSequence.length === KONAMI_CODE.length &&
                newSequence.every((key, i) => key === KONAMI_CODE[i])) {
                callback();
                return [];
            }

            return newSequence;
        });

        // Reset sequence after 2 seconds of inactivity
        timeoutRef.current = setTimeout(() => {
            setInputSequence([]);
        }, 2000);
    }, [callback]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [handleKeyDown]);

    return inputSequence.length;
}
