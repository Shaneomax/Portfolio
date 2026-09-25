import React from 'react';
import { Cpu, Code2, Swords, Wrench, Star, ExternalLink } from 'lucide-react';
import { skillCategories, techMarquee, personalData } from '../data/portfolioData';
import { playHover } from '../utils/audio';

const CATEGORY_ICONS = [Cpu, Code2, Swords, Wrench];

// Map level text to a visual bar percentage
const LEVEL_MAP = {
  Expert:       { pct: 95, color: '#ff2d55', label: 'Expert' },
  Advanced:     { pct: 80, color: '#00f5c8', label: 'Advanced' },
  Intermediate: { pct: 58, color: '#818cf8', label: 'Intermediate' },
  Beginner:     { pct: 35, color: '#64748b', label: 'Beginner' },
};

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-surface-950 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-14">

        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 font-mono text-xs text-brand-primary tracking-widest uppercase">
            <Cpu className="w-4 h-4 text-brand-primary" />
            <span>SKILLS & TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase">
            WHAT I CAN DO
          </h2>
          <p className="text-slate-400 font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
            Core Unity skills across 2D & 3D gameplay, combat systems, animations, physics, and WebGL deployment — built through real shipped games.
          </p>
        </div>

        {/* Skills Grid — one card per category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((group, idx) => {
            const Icon = CATEGORY_ICONS[idx] || Cpu;
            return (
              <div
                key={idx}
                className="p-6 bg-surface-900/80 border border-slate-800 hover:border-brand-primary/40 cyber-chamfer space-y-5 transition-colors duration-300"
              >
                {/* Card Header */}
                <div className="flex items-center space-x-3 border-b border-white/5 pb-4">
                  <div className="p-2 bg-brand-primary/10 border border-brand-primary/30 rounded-sm">
                    <Icon className="w-4 h-4 text-brand-primary" />
                  </div>
                  <span className="font-display font-bold text-sm text-white uppercase tracking-wide">
                    {group.category}
                  </span>
                </div>

                {/* Skill Rows with Progress Bars */}
                <div className="space-y-4">
                  {group.skills.map((skill, sIdx) => {
                    const lvl = LEVEL_MAP[skill.level] || LEVEL_MAP['Intermediate'];
                    return (
                      <div key={sIdx} onMouseEnter={playHover} className="group space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-sm text-slate-200 group-hover:text-white transition-colors font-medium">
                            {skill.name}
                          </span>
                          <span
                            className="font-mono text-[10px] px-2 py-0.5 rounded-sm font-bold"
                            style={{ color: lvl.color, border: `1px solid ${lvl.color}40`, background: `${lvl.color}12` }}
                          >
                            {lvl.label}
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-surface-950 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${lvl.pct}%`, background: `linear-gradient(90deg, ${lvl.color}99, ${lvl.color})` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick-read: Key Strengths Badges */}
        <div className="p-6 bg-surface-900/60 border border-slate-800 cyber-chamfer space-y-4">
          <p className="font-mono text-xs text-brand-cyan tracking-widest uppercase font-bold">
            // QUICK SKILL SUMMARY — AT A GLANCE
          </p>
          <div className="flex flex-wrap gap-2.5">
            {[
              'Unity 2D & 3D', 'C# Programming', 'Combat Systems',
              'Mecanim & Mixamo Animations', 'Enemy AI (NavMesh / FSM)',
              'WebGL Optimization', 'Physics & Collision', 'ScriptableObjects',
              'Inventory & UI Systems', 'Itch.io Publishing', 'Git & GitHub',
              'DOTween', 'AR Foundation', 'Industrial Simulations',
            ].map((tag) => (
              <span
                key={tag}
                className="font-sans text-xs text-slate-300 bg-surface-950 border border-slate-700 px-3 py-1.5 rounded-sm hover:border-brand-primary hover:text-white transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Infinite Marquee */}
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
