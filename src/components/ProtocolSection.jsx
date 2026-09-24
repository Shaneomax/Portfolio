import React from 'react';
import { GitCommit, Compass, Zap, ShieldCheck, CheckSquare } from 'lucide-react';
import { protocolSteps } from '../data/portfolioData';
import { playHover } from '../utils/audio';

export default function ProtocolSection() {
  return (
    <section id="protocol" className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-surface-900/40">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 font-mono text-xs text-brand-primary tracking-widest uppercase">
            <Compass className="w-4 h-4 text-brand-primary" />
            <span>OPERATIONAL ROADMAP // WORK METHODOLOGY</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase">
            DESIGN & DEV PROTOCOL
          </h2>
          <p className="text-slate-400 font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
            Four-stage engineering framework calibrated to deliver locked 60 FPS stability, optimize draw batches, and ship production-ready playable games.
          </p>
        </div>

        {/* 4-Step Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {protocolSteps.map((step, idx) => (
            <div
              key={step.id}
              onMouseEnter={playHover}
              className="relative p-6 bg-surface-950/90 border border-slate-800 hover:border-brand-primary cyber-chamfer transition-all duration-300 group hover:shadow-[0_0_20px_rgba(255,45,85,0.25)] flex flex-col justify-between space-y-6"
            >
              {/* Step Number Badge */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="font-display font-black text-3xl text-brand-primary tracking-tighter">
                  {step.step}
                </span>
                <span className="font-mono text-[10px] text-slate-500 bg-surface-900 px-2 py-0.5 border border-slate-800">
                  PHASE // 0{idx + 1}
                </span>
              </div>

              {/* Title & Desc */}
              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-primary transition-colors tracking-tight">
                  {step.title}
                </h3>
                <p className="font-mono text-[10px] text-brand-cyan tracking-wider uppercase">
                  {step.subtitle}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed font-sans pt-1">
                  {step.description}
                </p>
              </div>

              {/* Key Phase Artifacts */}
              <div className="space-y-2 pt-3 border-t border-white/5">
                <span className="font-mono text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">
                  GENERATED ARTIFACTS:
                </span>
                <ul className="space-y-1 font-mono text-[11px] text-slate-300">
                  {step.artifacts.map((art, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 bg-brand-primary flex-shrink-0" />
                      <span className="truncate">{art}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
