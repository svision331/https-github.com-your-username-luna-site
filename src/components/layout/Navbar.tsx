'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, Activity, Wifi } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const navLinks = [
    { href: '#music', label: 'Music' },
    { href: '#live', label: 'Live' },
    { href: '#nebula-bash', label: 'Nebula Bash' },
    { href: '#join', label: 'Join' },
    { href: '#press', label: 'Book/Press', secondary: true },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { playHover, playClick } = useSoundEffects();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <motion.nav
                className={`
          fixed top-0 w-full z-40 transition-all duration-300 border-b
          ${isScrolled
                        ? 'bg-slate-950/90 backdrop-blur-xl border-cyan-500/20'
                        : 'bg-transparent border-transparent'
                    }
        `}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Tech Scanline Top (Only visible when scrolled) */}
                <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link
                            href="/"
                            onClick={playClick}
                            onMouseEnter={playHover}
                            className="text-xl font-bold tracking-tight font-display hover:text-cyan-400 transition-colors relative group"
                        >
                            LUNA<span className="text-gradient">THELOVEGOD</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <div key={link.href} className="relative group">
                                    <Link
                                        href={link.href}
                                        onClick={playClick}
                                        onMouseEnter={playHover}
                                        className={`
                    text-sm font-medium transition-colors font-mono tracking-wide uppercase
                    ${link.secondary
                                                ? 'text-slate-400 hover:text-cyan-400'
                                                : 'text-slate-200 hover:text-cyan-400'
                                            }
                  `}
                                    >
                                        <span className="relative z-10">{link.label}</span>
                                        {/* Hover Glow */}
                                        <span className="absolute inset-0 bg-cyan-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* System Status Indicators (Desktop) */}
                        <div className="hidden lg:flex items-center gap-4 pl-8 border-l border-white/10 ml-4">
                            <div className="flex items-center gap-2 text-[9px] font-mono text-cyan-500/60 uppercase tracking-widest">
                                <Wifi size={10} className="text-cyan-500" />
                                <span>NET_ACTIVE</span>
                            </div>
                            <div className="flex items-center gap-2 text-[9px] font-mono text-emerald-500/60 uppercase tracking-widest">
                                <Activity size={10} className="text-emerald-500" />
                                <span>SYS_ONLINE</span>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-slate-300 hover:text-white relative group"
                            onClick={() => {
                                setIsMobileMenuOpen(!isMobileMenuOpen);
                                playClick();
                            }}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-30 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-[0.05]" />
                            <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-transparent" />
                        </motion.div>

                        {/* Menu Content */}
                        <motion.div
                            className="relative h-full flex flex-col items-center justify-center gap-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.1 }}
                        >
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={`
                      text-2xl font-bold font-display tracking-widest uppercase transition-colors
                      ${link.secondary
                                                ? 'text-slate-400 hover:text-cyan-400'
                                                : 'text-slate-100 hover:text-cyan-400'
                                            }
                    `}
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            playClick();
                                        }}
                                        onMouseEnter={playHover}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}

                            <div className="mt-8 pt-8 border-t border-white/10 w-40 flex justify-center gap-4 opacity-50">
                                <Activity size={16} className="text-cyan-500 animate-pulse" />
                                <span className="text-xs font-mono tracking-widest text-cyan-500">SYSTEM READY</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
