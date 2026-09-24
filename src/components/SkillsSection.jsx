import React from 'react';
import { Cpu, Terminal, Layers, Box, Check, Sparkles } from 'lucide-react';
import { skillCategories, techMarquee } from '../data/portfolioData';
import { playHover } from '../utils/audio';

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-surface-950 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-14">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 font-mono text-xs text-brand-primary tracking-widest uppercase">
            <Cpu className="w-4 h-4 text-brand-primary" />
            <span>TECHNICAL PROFICIENCY // ARSENAL MATRIX</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase">
            TOOL STACK & CAPABILITIES
          </h2>
          <p className="text-slate-400 font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
            Multi-paradigm competence across 2D & 3D Unity gameplay loops, responsive physics, Mixamo animations, and optimized WebGL builds.
          </p>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((group, idx) => (
            <div
              key={idx}
              className="p-6 bg-surface-900/80 border border-slate-800 cyber-chamfer space-y-5"
            >
              <div className="border-b border-white/5 pb-3">
                <span className="font-mono text-xs text-brand-primary font-bold tracking-widest uppercase block">
                  // {group.category}
                </span>
              </div>

              <div className="space-y-2.5">
                {group.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    onMouseEnter={playHover}
                    className="p-2.5 bg-surface-950 border border-slate-800/80 hover:border-brand-primary/50 flex items-center justify-between transition-colors group"
                  >
                    <div className="flex-1 pr-2">
                      <span className="font-mono text-xs text-slate-200 group-hover:text-white font-medium block">
                        {skill.name}
                      </span>
                    </div>

                    <span className={`font-mono text-[10px] px-2 py-0.5 cyber-chamfer ${
                      skill.level === 'Expert'
                        ? 'bg-brand-primary/20 text-brand-primary border border-brand-primary/40 font-bold'
                        : skill.level === 'Advanced'
                        ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Infinite Tech Marquee Bar */}
        <div className="relative py-4 border-y border-white/10 bg-surface-900/60 overflow-hidden">
          <div className="flex space-x-8 animate-marquee whitespace-nowrap font-mono text-xs tracking-widest text-slate-400">
            {[...techMarquee, ...techMarquee].map((tech, idx) => (
              <span key={idx} className="flex items-center space-x-3">
                <span className="text-white hover:text-brand-primary transition-colors cursor-default">
                  {tech}
                </span>
                <span className="text-brand-primary/40 font-bold">//</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
