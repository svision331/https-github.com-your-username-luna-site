'use client';

import { motion } from 'framer-motion';
import type { MembershipTier } from '@/data/membership';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface TierCardProps {
    tier: MembershipTier;
    index: number;
}

export function TierCard({ tier, index }: TierCardProps) {
    const { playHover, playClick } = useSoundEffects();

    const colorMap: Record<string, string> = {
        slate: 'border-slate-700/50 group-hover:border-slate-500',
        cyan: 'border-cyan-500/30 group-hover:border-cyan-400',
        purple: 'border-purple-500/30 group-hover:border-purple-400',
        pink: 'border-pink-500/30 group-hover:border-pink-400',
    };

    const glowMap: Record<string, string> = {
        slate: 'group-hover:shadow-[0_0_30px_rgba(100,116,139,0.2)]',
        cyan: 'group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]',
        purple: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]',
        pink: 'group-hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]',
    };

    return (
        <motion.div
            className={`
                relative p-6 group cursor-pointer
                bg-slate-950/80 backdrop-blur-md
                transition-all duration-300
                ${glowMap[tier.color] || glowMap.slate}
            `}
            style={{
                clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -4 }}
            onMouseEnter={playHover}
            onClick={playClick}
        >
            {/* Tech Grid Background */}
            <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-10 bg-[size:20px_20px] pointer-events-none" />

            {/* Holographic Border Overlay */}
            <div className={`absolute inset-0 border ${colorMap[tier.color] || colorMap.slate} transition-colors duration-300 pointer-events-none z-20`}
                style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}
            />

            {/* Corner Accents */}
            <div className={`absolute top-0 right-0 w-8 h-[1px] ${tier.color === 'cyan' ? 'bg-cyan-500' : 'bg-white/20'} z-30`} />
            <div className={`absolute top-0 right-0 w-[1px] h-8 ${tier.color === 'cyan' ? 'bg-cyan-500' : 'bg-white/20'} z-30`} />
            <div className={`absolute bottom-0 left-0 w-8 h-[1px] ${tier.color === 'cyan' ? 'bg-cyan-500' : 'bg-white/20'} z-30`} />
            <div className={`absolute bottom-0 left-0 w-[1px] h-8 ${tier.color === 'cyan' ? 'bg-cyan-500' : 'bg-white/20'} z-30`} />

            {/* Icon */}
            <div className={`text-3xl mb-4 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${tier.color === 'cyan' ? 'text-cyan-400 drop-shadow-[0_0_10px_cyan]' : 'text-slate-200'}`}>
                {tier.icon}
            </div>

            {/* Tier label */}
            <div className={`text-xs font-mono tracking-[0.2em] mb-2 uppercase ${tier.color === 'cyan' ? 'text-cyan-400' : 'text-slate-500'}`}>
                {tier.tier} // LEVEL {index + 1}
            </div>

            {/* Name */}
            <h4 className="font-bold text-xl mb-3 font-display text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 transition-all">
                {tier.name}
            </h4>

            {/* Unlock description */}
            <div className="relative z-10">
                <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {tier.unlock}
                </p>
            </div>

            {/* Decorative corner gradient */}
            <div
                className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at top right, var(--nebula-${tier.color === 'slate' ? 'cyan' : tier.color}), transparent 70%)`,
                }}
            />
        </motion.div>
    );
}
