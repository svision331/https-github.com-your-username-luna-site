'use server';

import { Photo } from '@/data/gallery';
import { saveFile, savePhoto } from '@/lib/storage';
import { revalidatePath } from 'next/cache';

export async function uploadPhotoAction(formData: FormData) {
    try {
        const file = formData.get('file') as File;
        if (!file) {
            console.error('[uploadPhotoAction] No file provided');
            throw new Error('No file uploaded');
        }

        if (file.name.toLowerCase().endsWith('.heic')) {
            return {
                success: false,
                error: 'HEIC images are not supported. Please convert to JPG or PNG.'
            };
        }

        console.log(`[uploadPhotoAction] Starting upload for: ${file.name} (${file.size} bytes)`);

        const url = await saveFile(file);
        console.log(`[uploadPhotoAction] File saved to: ${url}`);

        const newPhoto: Photo = {
            id: Date.now().toString(),
            url: url,
            caption: 'Just uploaded! 🚀',
            user: '@you',
            aspectRatio: 'square'
        };

        await savePhoto(newPhoto);
        console.log(`[uploadPhotoAction] Photo metadata saved for: ${newPhoto.id}`);

        revalidatePath('/gallery');

        return { success: true, photo: newPhoto };
    } catch (error) {
        console.error('[uploadPhotoAction] Error uploading photo:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown server error'
        };
    }
}
