import React from 'react';
import { keyStats } from '../data/portfolioData';
import { playHover } from '../utils/audio';

export default function StatsSection() {
  return (
    <section id="stats" className="relative py-12 px-4 sm:px-6 lg:px-8 border-y border-white/10 bg-surface-900/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 mb-6 font-mono text-xs text-brand-primary tracking-widest">
          <span className="w-2 h-2 bg-brand-primary rounded-full animate-ping" />
          <span>KEY PERFORMANCE TELEMETRY // STATISTICAL BENCHMARKS</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {keyStats.map((stat, idx) => (
            <div
              key={idx}
              onMouseEnter={playHover}
              className="relative p-5 bg-surface-950/80 border border-slate-800 hover:border-brand-primary/60 cyber-chamfer transition-all duration-300 group hover:shadow-[0_0_20px_rgba(255,45,85,0.25)]"
            >
              {/* Corner accent notch */}
              <div className="absolute top-0 right-0 w-2 h-2 bg-brand-primary/40 group-hover:bg-brand-primary transition-colors" />

              <div className="font-display font-black text-3xl sm:text-4xl text-white group-hover:text-brand-primary transition-colors tracking-tight">
                {stat.value}
              </div>
              <div className="font-mono text-xs font-bold text-slate-300 mt-1 tracking-wider uppercase">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-1">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
