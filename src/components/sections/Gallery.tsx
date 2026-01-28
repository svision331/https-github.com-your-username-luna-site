import { motion } from 'framer-motion';
import Link from 'next/link';
import { Camera, ArrowRight, Scan } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export function Gallery() {
    const { playHover, playClick } = useSoundEffects();

    return (
        <section id="gallery" className="section py-24 relative overflow-hidden flex flex-col justify-center min-h-[60vh]">
            {/* Background Tech Grid */}
            <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-[0.03] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

            {/* Central Holographic Emitter Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none animate-pulse-slow" />

            <div className="max-w-5xl mx-auto w-full px-4 relative z-10">
                <motion.div
                    className="relative border border-cyan-500/20 bg-slate-950/50 backdrop-blur-sm p-8 md:p-12 overflow-hidden group"
                    style={{ clipPath: 'polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px)' }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    {/* Viewfinder Overlays */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-500/50" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-500/50" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-500/50" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-500/50" />

                    {/* Scanning Line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/30 shadow-[0_0_10px_cyan] translate-y-[-100%] animate-[scan_4s_ease-in-out_infinite]" />

                    <div className="text-center relative z-10">
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-2xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center backdrop-blur-md relative z-10 group-hover:border-cyan-400 transition-colors duration-500">
                                    <Camera className="w-10 h-10 text-cyan-400" />
                                </div>
                                {/* Holographic Projection beams */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </div>

                        <span className="text-xs text-cyan-500 font-mono tracking-[0.3em] uppercase mb-4 block typing-cursor">
                            VISUAL_ARCHIVE_V4
                        </span>

                        <h2 className="text-4xl md:text-6xl font-bold mb-8 font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-200">
                            NEBULA <span className="text-cyan-400">GALLERY</span>
                        </h2>

                        <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                            A digital sanctuary for cosmic memories. From neon-lit dance floors to starlit encounters, <span className="text-cyan-400 font-mono text-sm">ACCESS THE CHRONICLE</span>.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                            <Link
                                href="/gallery"
                                className="group/btn relative px-10 py-5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 border border-cyan-500/50"
                                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                                onMouseEnter={playHover}
                                onClick={playClick}
                            >
                                <span className="relative z-10 flex items-center gap-3 font-mono uppercase tracking-widest text-sm">
                                    <Scan className="w-4 h-4" />
                                    Initialize Viewer
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 translate-x-[-100%] group-hover/btn:animate-[shimmer_1s_infinite]" />
                            </Link>

                            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                Live Feed Active
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
