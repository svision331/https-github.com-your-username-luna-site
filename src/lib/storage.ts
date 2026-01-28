import fs from 'fs/promises';
import path from 'path';
import { Photo } from '@/data/gallery';
import { Video } from '@/data/videos';

const STORE_PATH = path.join(process.cwd(), 'src/data/gallery-store.json');
const VIDEO_STORE_PATH = path.join(process.cwd(), 'src/data/videos.json');
const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads/gallery');
const VIDEO_UPLOAD_DIR = path.join(process.cwd(), 'public/uploads/videos');

export async function getPhotos(): Promise<Photo[]> {
    try {
        const data = await fs.readFile(STORE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading gallery store:', error);
        return [];
    }
}

export async function savePhoto(photo: Photo): Promise<void> {
    const photos = await getPhotos();
    photos.unshift(photo);
    await fs.writeFile(STORE_PATH, JSON.stringify(photos, null, 2));
}

export async function getVideos(): Promise<Video[]> {
    try {
        const data = await fs.readFile(VIDEO_STORE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading video store:', error);
        return [];
    }
}

export async function saveVideo(video: Video): Promise<void> {
    const videos = await getVideos();
    videos.unshift(video);
    await fs.writeFile(VIDEO_STORE_PATH, JSON.stringify(videos, null, 2));
}

export async function updateVideo(videoId: string, updates: Partial<Video>): Promise<void> {
    const videos = await getVideos();
    const index = videos.findIndex(v => v.id === videoId);
    if (index !== -1) {
        videos[index] = { ...videos[index], ...updates };
        await fs.writeFile(VIDEO_STORE_PATH, JSON.stringify(videos, null, 2));
    }
}

export async function deleteVideo(videoId: string): Promise<void> {
    const videos = await getVideos();
    const filteredVideos = videos.filter(v => v.id !== videoId);
    await fs.writeFile(VIDEO_STORE_PATH, JSON.stringify(filteredVideos, null, 2));
}

export async function saveFile(file: File): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    await fs.writeFile(filePath, buffer);
    return `/uploads/gallery/${fileName}`;
}

export async function saveVideoFile(file: File): Promise<string> {
    // Ensure directory exists
    try {
        await fs.access(VIDEO_UPLOAD_DIR);
    } catch {
        await fs.mkdir(VIDEO_UPLOAD_DIR, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(VIDEO_UPLOAD_DIR, fileName);

    await fs.writeFile(filePath, buffer);
    return `/uploads/videos/${fileName}`;
}
