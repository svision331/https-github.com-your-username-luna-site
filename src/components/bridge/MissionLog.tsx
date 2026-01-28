import React, { useState } from "react";
import { CheckCircle2, Circle, Lock, ArrowRight, ShieldCheck, Trophy } from "lucide-react";
import { MISSIONS, Mission } from "@/data/missions";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface MissionLogProps {
    onClose: () => void;
}

export function MissionLog({ onClose }: MissionLogProps) {
    const [missions, setMissions] = useState<Mission[]>(MISSIONS);
    const [completedCount, setCompletedCount] = useState(0);
    const { playHover, playClick, playSuccess } = useSoundEffects();

    const handleAction = (mission: Mission) => {
        if (mission.status === 'LOCKED') return;

        playClick();

        if (mission.link) {
            window.open(mission.link, '_blank');
        }

        // Simulate completion for active missions
        if (mission.status === 'ACTIVE') {
            playSuccess();
            setMissions(prev => prev.map(m =>
                m.id === mission.id ? { ...m, status: 'COMPLETED' } : m
            ));
            setCompletedCount(prev => prev + 1);
        }
    };

    const progress = (completedCount / missions.filter(m => m.status !== 'LOCKED').length) * 100;

    return (
        <div className="w-full h-full flex flex-col p-6 relative overflow-hidden bg-black/50 rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-cyan-400">
                    <ShieldCheck size={18} />
                    <span className="text-sm tracking-[0.2em] font-bold uppercase">Mission Log</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-white/40">SYNC STATUS</span>
                    <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-cyan-400 transition-all duration-1000 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="text-cyan-400">{Math.round(progress)}%</span>

                    <button
                        onClick={onClose}
                        className="ml-4 p-1 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-colors"
                    >
                        <span className="sr-only">Close</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>
            </div>

            {/* Mission List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
                {missions.map((mission) => (
                    <div
                        key={mission.id}
                        className={`
                            relative group border rounded-xl p-4 transition-all duration-300
                            ${mission.status === 'LOCKED'
                                ? 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed'
                                : 'bg-white/5 border-white/10 hover:border-cyan-500/50 hover:bg-white/10'}
                            ${mission.status === 'COMPLETED' ? 'border-emerald-500/30 bg-emerald-950/20' : ''}
                        `}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className={`pt-1 ${mission.status === 'COMPLETED' ? 'text-emerald-400' :
                                    mission.status === 'LOCKED' ? 'text-white/20' : 'text-cyan-400'
                                    }`}>
                                    {mission.status === 'COMPLETED' ? <CheckCircle2 size={20} /> :
                                        mission.status === 'LOCKED' ? <Lock size={20} /> :
                                            <Circle size={20} />}
                                </div>
                                <div>
                                    <h3 className={`font-bold uppercase tracking-wider text-sm mb-1 ${mission.status === 'COMPLETED' ? 'text-emerald-100 line-through opacity-70' :
                                        mission.status === 'LOCKED' ? 'text-white/40' : 'text-white'
                                        }`}>
                                        {mission.title}
                                    </h3>
                                    <p className="text-xs text-white/60 font-mono leading-relaxed max-w-[280px]">
                                        {mission.description}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/40 border border-white/5">
                                    {mission.reward}
                                </span>
                                {mission.status !== 'COMPLETED' && mission.status !== 'LOCKED' && (
                                    <button
                                        onClick={() => handleAction(mission)}
                                        className="flex items-center gap-1 text-[10px] uppercase font-bold text-cyan-400 hover:text-cyan-200 transition-colors mt-2"
                                    >
                                        {mission.actionLabel || 'Engage'} <ArrowRight size={12} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-white/30 font-mono uppercase tracking-widest">
                <span>Current Rewards: {completedCount * 100} XP</span>
                <span className="flex items-center gap-1"><Trophy size={10} /> Rank: Explorer</span>
            </div>
        </div>
    );
}
