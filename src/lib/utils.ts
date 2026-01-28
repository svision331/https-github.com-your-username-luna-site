import { clsx, type ClassValue } from 'clsx';

// Simple clsx alternative without external dependency
export function cn(...inputs: ClassValue[]): string {
    return clsx(inputs);
}

// Format date for display
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// Calculate time until a date
export interface TimeUntil {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
}

export function getTimeUntil(targetDate: string): TimeUntil {
    const target = new Date(targetDate).getTime();
    const now = Date.now();
    const total = Math.max(0, target - now);

    return {
        days: Math.floor(total / (1000 * 60 * 60 * 24)),
        hours: Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((total % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((total % (1000 * 60)) / 1000),
        total
    };
}

// Truncate text with ellipsis
export function truncate(str: string, length: number): string {
    if (str.length <= length) return str;
    return str.slice(0, length).trim() + '...';
}

// Generate YouTube thumbnail URL
export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'maxres'): string {
    const qualityMap = {
        default: 'default',
        hq: 'hqdefault',
        mq: 'mqdefault',
        sd: 'sddefault',
        maxres: 'maxresdefault'
    };
    return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

// Debounce function
export function debounce<T extends (...args: Parameters<T>) => void>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// Check if reduced motion is preferred
export function prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
