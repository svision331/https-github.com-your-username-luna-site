import React, { useMemo } from 'react';
import { Radio } from 'lucide-react';

function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function NebulaRadar() {
    const blips = useMemo(
        () =>
            Array.from({ length: 6 }).map((_, i) => ({
                id: i,
                x: randInt(20, 80),
                y: randInt(20, 80),
                label: ["HQ", "LIVE", "WEB", "USER", "NODE", "SYNC"][i],
                size: randInt(2, 4),
            })),
        []
    );

    return (
        <div className="relative aspect-square w-full rounded-2xl holo-panel overflow-hidden">
            {/* Defined classes from globals.css */}
            <div className="absolute inset-0 opacity-70">
                <div className="absolute inset-0 radial-fade" />
                <div className="absolute inset-0 radar-grid" />
                <div className="absolute inset-0 radar-rings" />
                <div className="absolute inset-0 radar-crosshair" />
            </div>

            <div className="absolute inset-0 radar-sweep" />

            {blips.map((b) => (
                <div
                    key={b.id}
                    className="absolute"
                    style={{ left: `${b.x}%`, top: `${b.y}%` }}
                >
                    <div className="relative -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                        <div
                            className="rounded-full bg-cyan-300/90 shadow-[0_0_20px_rgba(0,255,255,.6)] animate-pulse"
                            style={{ width: b.size * 2, height: b.size * 2 }}
                        />
                        <div className="opacity-0 group-hover:opacity-100 absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] tracking-widest uppercase text-cyan-200 bg-black/80 px-1.5 py-0.5 rounded border border-cyan-500/30 transition-opacity">
                            {b.label}
                        </div>
                    </div>
                </div>
            ))}

            <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[10px] tracking-widest uppercase text-white/50">
                <Radio size={12} className="text-cyan-400" />
                <span>Holo-Scan Active</span>
            </div>
        </div>
    );
}
