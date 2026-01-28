export interface Photo {
    id: string;
    url: string;
    caption: string;
    user: string;
    aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export const initialGalleryData: Photo[] = [];
