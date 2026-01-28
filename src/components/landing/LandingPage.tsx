'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Navbar, MobileNav, Footer } from '@/components/layout';
import { NebulaConsole } from '@/components/landing/NebulaConsole';
import { Hero } from '@/components/sections';
import { Starfield, IceGiantMode } from '@/components/effects';
import { Video } from '@/data/videos';

// Lazy load below-the-fold sections
const VideoShowcase = dynamic(() => import('@/components/sections').then(mod => mod.VideoShowcase));
const LiveShows = dynamic(() => import('@/components/sections').then(mod => mod.LiveShows));
const NebulaBash = dynamic(() => import('@/components/sections').then(mod => mod.NebulaBash));
const Membership = dynamic(() => import('@/components/sections').then(mod => mod.Membership));
const Lore = dynamic(() => import('@/components/sections').then(mod => mod.Lore));
const Community = dynamic(() => import('@/components/sections').then(mod => mod.Community));
const Press = dynamic(() => import('@/components/sections').then(mod => mod.Press));
const Gallery = dynamic(() => import('@/components/sections').then(mod => mod.Gallery));

interface LandingPageProps {
    videos: Video[];
}

export function LandingPage({ videos }: LandingPageProps) {
    const [hasEntered, setHasEntered] = useState(false);

    return (
        <main className="min-h-screen relative">
            {!hasEntered && <NebulaConsole onEnter={() => setHasEntered(true)} />}

            <div className={hasEntered ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0 h-0 overflow-hidden'}>
                {/* Background Effects */}
                <Starfield />
                <IceGiantMode />

                {/* Navigation */}
                <Navbar />
                <MobileNav />

                {/* Sections */}
                <div className="relative z-10">
                    <Hero />
                    <VideoShowcase videos={videos} />
                    <LiveShows />
                    <NebulaBash />
                    <Lore />
                    <Gallery />
                    <Community />
                    <Membership />
                    <Press />
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </main>
    );
}
