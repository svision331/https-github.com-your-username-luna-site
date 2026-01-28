'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Heart } from 'lucide-react';
import Image from 'next/image';
import { Photo } from '@/data/gallery';
import { GlowButton } from '@/components/ui/GlowButton';
import { uploadPhotoAction } from '@/app/actions/gallery';

interface GalleryGridProps {
    initialPhotos: Photo[];
}

export function GalleryGrid({ initialPhotos }: GalleryGridProps) {
    const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const result = await uploadPhotoAction(formData);

            if (result.success && result.photo) {
                // Add to top of list
                setPhotos([result.photo, ...photos]);
            } else {
                console.error('Upload failed:', result.error);
                alert(`Upload failed: ${result.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('An unexpected error occurred. Please try again.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <div className="w-full">
            {/* Controls */}
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h2 className="text-2xl font-light text-cyan-200 mb-2">Community Transmissions</h2>
                    <p className="text-cyan-400/60 text-sm">Join the visual frequency.</p>
                </div>
                <div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={isUploading}
                    />
                    <GlowButton
                        onClick={handleUploadClick}
                        variant="primary"
                        disabled={isUploading}
                    >
                        {isUploading ? (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="mr-2"
                                >
                                    <Upload className="w-4 h-4" />
                                </motion.div>
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="w-4 h-4 mr-2" />
                                Add to Nebula
                            </>
                        )}
                    </GlowButton>
                </div>
            </div>

            {/* Masonry Grid (CSS Columns approach) */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                <AnimatePresence initial={false}>
                    {photos.map((photo) => (
                        <motion.div
                            key={photo.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.4 }}
                            className="break-inside-avoid relative group mb-6"
                        >
                            <div className="relative overflow-hidden rounded-xl bg-slate-900/50 border border-white/10 backdrop-blur-sm">
                                <div className="relative aspect-[3/4]">
                                    <Image
                                        src={photo.url}
                                        alt={photo.caption}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                    <p className="text-white font-medium text-sm">{photo.caption}</p>
                                    <p className="text-cyan-400 text-xs mt-1">{photo.user}</p>

                                    <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                                        <Heart className="w-4 h-4 text-pink-500" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
