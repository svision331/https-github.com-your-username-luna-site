export interface Video {
    id: string;
    title: string;
    category: 'Live Shows' | 'Studio' | 'BTS' | 'Transmissions';
    thumb: string;
    duration?: string;
    views?: string;
    description?: string;
    isLocal?: boolean;
}

export const videoCategories = ['All', 'Live Shows', 'Studio', 'BTS', 'Transmissions'] as const;
export type VideoCategory = typeof videoCategories[number];
