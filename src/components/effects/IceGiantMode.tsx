'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKonamiCode } from '@/hooks';

export function IceGiantMode() {
    const [isActive, setIsActive] = useState(false);
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; duration: number; delay: number }>>([]);

    const activateIceGiantMode = useCallback(() => {
        setIsActive(true);

        // Generate ice particles
        const newParticles = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: 5 + Math.random() * 5,
            delay: Math.random() * 2,
        }));
        setParticles(newParticles);

        // Deactivate after 10 seconds
        setTimeout(() => {
            setIsActive(false);
            setParticles([]);
        }, 10000);
    }, []);

    // Hook into Konami code
    useKonamiCode(activateIceGiantMode);

    return (
        <AnimatePresence>
            {isActive && (
                <>
                    {/* Ice overlay */}
                    <motion.div
                        className="fixed inset-0 pointer-events-none z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            background: 'linear-gradient(180deg, rgba(34, 211, 238, 0.1) 0%, transparent 50%, rgba(147, 197, 253, 0.1) 100%)',
                        }}
                    />

                    {/* Ice particles */}
                    {particles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="fixed pointer-events-none z-50 text-2xl"
                            initial={{
                                left: `${particle.x}%`,
                                top: '-10%',
                                opacity: 0,
                                rotate: 0,
                            }}
                            animate={{
                                top: '110%',
                                opacity: [0, 1, 1, 0],
                                rotate: 360,
                            }}
                            transition={{
                                duration: particle.duration,
                                delay: particle.delay,
                                ease: 'linear',
                            }}
                        >
                            ❄️
                        </motion.div>
                    ))}

                    {/* Activation message */}
                    <motion.div
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                    >
                        <div className="text-center">
                            <div className="text-6xl mb-4">❄️</div>
                            <h2 className="text-4xl font-bold text-gradient font-display">ICE GIANT MODE</h2>
                            <p className="text-cyan-400 mt-2">ACTIVATED</p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
