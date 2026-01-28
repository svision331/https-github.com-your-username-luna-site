'use client';

import { useEffect, useRef } from 'react';

interface WarpSpeedProps {
    className?: string;
    starCount?: number;
    speed?: number;
}

export function WarpSpeed({ className = '', starCount = 1000, speed = 2 }: WarpSpeedProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let cx = 0;
        let cy = 0;

        // Star class
        class Star {
            x: number;
            y: number;
            z: number;

            constructor() {
                this.x = (Math.random() - 0.5) * width * 2;
                this.y = (Math.random() - 0.5) * height * 2;
                this.z = Math.random() * width;
            }

            update() {
                this.z -= speed * 10;

                // Reset if passed camera
                if (this.z <= 0) {
                    this.z = width;
                    this.x = (Math.random() - 0.5) * width * 2;
                    this.y = (Math.random() - 0.5) * height * 2;
                }
            }

            draw() {
                if (!ctx) return;

                const sx = (this.x / this.z) * width + cx;
                const sy = (this.y / this.z) * height + cy;

                // Don't draw if outside canvas
                if (sx < 0 || sx > width || sy < 0 || sy > height) return;

                const size = (1 - this.z / width) * 3;
                const alpha = (1 - this.z / width);

                // Tail effect
                const px = (this.x / (this.z + speed * 10)) * width + cx;
                const py = (this.y / (this.z + speed * 10)) * height + cy;

                ctx.beginPath();
                ctx.strokeStyle = `rgba(200, 255, 255, ${alpha})`;
                ctx.lineWidth = size;
                ctx.moveTo(px, py);
                ctx.lineTo(sx, sy);
                ctx.stroke();

                // Star head
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.arc(sx, sy, size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const stars: Star[] = Array.from({ length: starCount }, () => new Star());

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            cx = width / 2;
            cy = height / 2;

            // Re-init stars if needed or just let them loop
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        const animate = () => {
            if (!ctx) return;

            // Fade trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(0, 0, width, height);

            stars.forEach(star => {
                star.update();
                star.draw();
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [starCount, speed]);

    return (
        <canvas
            ref={canvasRef}
            className={`block absolute inset-0 w-full h-full pointer-events-none ${className}`}
        />
    );
}
