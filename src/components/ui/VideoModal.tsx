'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

import { Video } from '@/data/videos';

interface VideoModalProps {
    video: Video;
    onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                {/* Close button */}
                <motion.button
                    className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    onClick={onClose}
                    aria-label="Close video"
                >
                    <X size={32} />
                </motion.button>

                {/* Video container */}
                <motion.div
                    className="w-full max-w-5xl aspect-video"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                        {video.isLocal ? (
                            <video
                                src={video.id} // Assuming ID is path for local
                                controls
                                autoPlay
                                className="w-full h-full object-contain bg-black"
                            />
                        ) : (
                            <iframe
                                title={video.title}
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0"
                            />
                        )}
                    </div>
                </motion.div>

                {/* Keyboard hint */}
                <motion.div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    Press <kbd className="px-2 py-1 bg-white/10 rounded text-white/60">ESC</kbd> to close
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
