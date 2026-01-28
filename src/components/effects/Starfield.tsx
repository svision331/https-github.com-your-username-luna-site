'use client';

import { useEffect, useRef } from 'react';

interface Star {
    x: number;
    y: number;
    size: number;
    baseOpacity: number;
    opacity: number;
    twinkleSpeed: number;
    twinklePhase: number;
}

interface ShootingStar {
    id: number;
    x: number;
    y: number;
    length: number;
    speed: number;
    angle: number;
    opacity: number;
    active: boolean;
}

export function Starfield() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;

        // Configuration
        const STAR_COUNT = 800; // Increased from 400 for richer detail
        const STARS: Star[] = [];
        let shootingStars: ShootingStar[] = [];

        // Initialize Canvas Size
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            // Re-distribute stars on resize so they don't clump
            initStars();
        };

        const initStars = () => {
            STARS.length = 0;

            // 1. Generate Standard Background Stars
            for (let i = 0; i < STAR_COUNT; i++) {
                const depth = Math.random();
                let size, opacity, twinkleSpeed;

                // Create depth layers
                if (depth < 0.4) { // Distant
                    size = Math.random() * 0.8 + 0.2;
                    opacity = Math.random() * 0.3 + 0.1;
                    twinkleSpeed = Math.random() * 0.02 + 0.005; // Faster
                } else if (depth < 0.8) { // Mid
                    size = Math.random() * 1.5 + 0.8;
                    opacity = Math.random() * 0.4 + 0.3;
                    twinkleSpeed = Math.random() * 0.03 + 0.01; // Faster
                } else { // Close
                    size = Math.random() * 2 + 1.5;
                    opacity = Math.random() * 0.5 + 0.5;
                    twinkleSpeed = Math.random() * 0.05 + 0.02; // Faster
                }

                STARS.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size,
                    baseOpacity: opacity,
                    opacity,
                    twinkleSpeed,
                    twinklePhase: Math.random() * Math.PI * 2,
                });
            }

            // 2. Generate Heart Constellation
            const HEART_STAR_COUNT = 60;
            const centerX = width * 0.8; // Position on the right side
            const centerY = height * 0.3; // Position in upper area
            const scale = Math.min(width, height) / 40; // Scale relative to screen size

            for (let i = 0; i < HEART_STAR_COUNT; i++) {
                // Heart Curve Formula
                const t = Math.random() * Math.PI * 2;

                // Add some randomness/fuzziness to the line
                const fuzz = 0.5;

                // Heart equations
                // x = 16sin^3(t)
                // y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
                const rawX = 16 * Math.pow(Math.sin(t), 3);
                const rawY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)); // Negate Y because canvas Y is down

                const x = centerX + (rawX * scale) + (Math.random() - 0.5) * scale * 2;
                const y = centerY + (rawY * scale) + (Math.random() - 0.5) * scale * 2;

                STARS.push({
                    x,
                    y,
                    size: Math.random() * 2 + 1.5, // Slightly larger
                    baseOpacity: 0.8, // Brighter
                    opacity: 0.8,
                    twinkleSpeed: Math.random() * 0.05 + 0.02,
                    twinklePhase: Math.random() * Math.PI * 2,
                });
            }
        };

        // Shooting Star Logic
        const spawnShootingStar = () => {
            const angle = (35 + Math.random() * 25) * (Math.PI / 180); // Convert to radians
            const speed = 15 + Math.random() * 10;

            shootingStars.push({
                id: Date.now(),
                x: Math.random() * width,
                y: Math.random() * (height * 0.4), // Start in top 40%
                length: 100 + Math.random() * 150,
                speed: speed,
                angle: angle,
                opacity: 1,
                active: true
            });
        };

        // Animation Loop
        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw Stars
            STARS.forEach((star) => {
                // Update Twinkle
                star.twinklePhase += star.twinkleSpeed;
                // Stronger modulation: +/- 0.3 instead of 0.15
                // Max limits max intensity, Min allows it to dim significantly but not totally vanish if base is high
                star.opacity = star.baseOpacity + Math.sin(star.twinklePhase) * 0.3;

                ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, star.opacity))})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();

                // Glow for big stars
                if (star.size > 2) {
                    const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${Math.max(0, star.opacity * 0.5)})`);
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // Draw and Update Shooting Stars
            // Remove dead stars
            shootingStars = shootingStars.filter(s => s.active);

            shootingStars.forEach(star => {
                // Move
                star.x += Math.cos(star.angle) * star.speed;
                star.y += Math.sin(star.angle) * star.speed;

                // Fade out near end of life or if off screen
                if (star.x > width + star.length || star.y > height + star.length) {
                    star.active = false;
                }

                // Draw Trail (Gradient Line)
                const tailX = star.x - Math.cos(star.angle) * star.length;
                const tailY = star.y - Math.sin(star.angle) * star.length;

                const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
                gradient.addColorStop(0, 'rgba(34, 211, 238, 1)'); // Cyan head
                gradient.addColorStop(0.2, 'rgba(34, 211, 238, 0.4)');
                gradient.addColorStop(1, 'rgba(34, 211, 238, 0)');

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1.5;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(tailX, tailY);
                ctx.stroke();

                // Draw Head Glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(34, 211, 238, 0.8)';
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(star.x, star.y, 1, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            // Randomly spawn shooting stars
            if (Math.random() < 0.005) { // Approx 1 every 3-4 seconds at 60fps
                spawnShootingStar();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        // Setup
        handleResize();
        window.addEventListener('resize', handleResize);
        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
            <canvas ref={canvasRef} className="block w-full h-full" />

            {/* Nebula Glow Spots (Preserved from original Design) */}
            <div
                className="absolute w-[800px] h-[800px] rounded-full opacity-[0.15]"
                style={{
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.4), transparent 70%)',
                    left: '-20%',
                    top: '10%',
                    filter: 'blur(100px)',
                    zIndex: -1
                }}
            />
            <div
                className="absolute w-[600px] h-[600px] rounded-full opacity-[0.12]"
                style={{
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4), transparent 70%)',
                    right: '5%',
                    bottom: '-10%',
                    filter: 'blur(90px)',
                    zIndex: -1
                }}
            />
        </div>
    );
}
