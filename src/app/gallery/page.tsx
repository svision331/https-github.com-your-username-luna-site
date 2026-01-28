import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { NebulaGradient } from '@/components/effects/NebulaGradient';
import { Starfield } from '@/components/effects/Starfield';
import { GalleryGrid } from '@/components/ui/GalleryGrid';
import { getPhotos } from '@/lib/storage';

export default async function GalleryPage() {
    const photos = await getPhotos();

    return (
        <main className="relative min-h-screen bg-black overflow-x-hidden selection:bg-cyan-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0">
                <NebulaGradient />
                <Starfield />
            </div>

            {/* Navigation */}
            <div className="absolute top-6 left-6 z-30">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-cyan-400/80 hover:text-cyan-200 transition-colors group"
                >
                    <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    <span className="text-sm font-medium tracking-wide">Back to Orbit</span>
                </Link>
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 py-32">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white mb-6">
                        Nebula <span className="text-cyan-400">Gallery</span>
                    </h1>
                    <p className="text-lg text-cyan-100/60 max-w-2xl mx-auto leading-relaxed">
                        A collection of memories from across the galaxy. Share your moments from the tour, fan art, and cosmic vibes.
                    </p>
                </div>

                <GalleryGrid initialPhotos={photos} />
            </div>

            {/* Bottom fading gradient */}
            <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
        </main>
    );
}
