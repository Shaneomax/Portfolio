import React from 'react';
import { Briefcase, GraduationCap, BookOpen, ExternalLink, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { experienceData, personalData } from '../data/portfolioData';
import { playHover, playClick } from '../utils/audio';

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-surface-900/30">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 font-mono text-xs text-brand-primary tracking-widest uppercase">
            <Briefcase className="w-4 h-4 text-brand-primary" />
            <span>CAREER MILESTONES // PROFESSIONAL TIMELINE</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase">
            EXPERIENCE & ACADEMIA
          </h2>
          <p className="text-slate-400 font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
            1.5+ years of dedicated Unity game development, building 2D and 3D indie titles, vehicle physics simulations, and graduating with a B.Sc in Computer Science & Engineering from North South University.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Experience Timeline (8 Cols) */}
          <div className="lg:col-span-8 space-y-8 relative before:absolute before:top-4 before:bottom-4 before:left-4 before:w-[2px] before:bg-gradient-to-b before:from-brand-primary before:via-brand-cyan/40 before:to-transparent">
            {experienceData.map((exp, idx) => (
              <div
                key={exp.id}
                onMouseEnter={playHover}
                className="relative pl-12 group"
              >
                {/* Timeline node icon */}
                <div className="absolute left-2.5 top-1.5 w-3.5 h-3.5 -ml-1.5 rounded-full bg-surface-950 border-2 border-brand-primary group-hover:bg-brand-primary group-hover:shadow-[0_0_12px_#ff2d55] transition-all" />

                <div className="p-6 bg-surface-950 border border-slate-800 group-hover:border-brand-primary/60 cyber-chamfer transition-all duration-300 space-y-4">
                  {/* Role Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <div>
                      <h3 className="font-display font-bold text-xl text-white group-hover:text-brand-primary transition-colors">
                        {exp.role}
                      </h3>
                      <p className="font-mono text-sm text-brand-cyan font-semibold">
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                      {exp.githubUrl && (
                        <a
                          href={exp.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            playClick();
                          }}
                          className="flex items-center space-x-1.5 text-slate-300 hover:text-white bg-surface-900 hover:bg-surface-850 px-2.5 py-1 border border-slate-700 hover:border-brand-primary cyber-chamfer transition-all"
                        >
                          <GithubIcon className="w-3.5 h-3.5 text-brand-primary" />
                          <span>GITHUB ↗</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Highlights list */}
                  <ul className="space-y-2">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar: Academia & Publications (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Education Card */}
            <div className="p-6 bg-surface-950 border border-slate-800 hover:border-brand-cyan/60 cyber-chamfer transition-all duration-300 space-y-4">
              <div className="flex items-center space-x-2 font-mono text-xs text-brand-cyan tracking-wider uppercase font-bold">
                <GraduationCap className="w-4 h-4 text-brand-cyan" />
                <span>ACADEMIC DEGREE // NSU</span>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  {personalData.education.degree}
                </h3>
                <p className="font-mono text-xs text-brand-primary font-semibold mt-0.5">
                  {personalData.education.institute}
                </p>
                <p className="font-mono text-xs text-slate-400 mt-1">
                  YEAR: {personalData.education.year}
                </p>
              </div>

              <div className="p-3 bg-surface-900 border border-slate-800/80 rounded-sm">
                <span className="font-mono text-[10px] text-slate-400 block uppercase">
                  RESEARCH AREA:
                </span>
                <p className="text-xs text-slate-300 font-sans mt-0.5">
                  {personalData.education.specialization}
                </p>
              </div>
            </div>

            {/* Technical Publication Card */}
            <div className="p-6 bg-surface-950 border border-slate-800 hover:border-brand-primary/60 cyber-chamfer transition-all duration-300 space-y-4">
              <div className="flex items-center space-x-2 font-mono text-xs text-brand-primary tracking-wider uppercase font-bold">
                <BookOpen className="w-4 h-4 text-brand-primary" />
                <span>TECHNICAL PUBLICATION</span>
              </div>

              <div>
                <h3 className="font-display font-bold text-base text-white">
                  Building Messaging Platform in Unity
                </h3>
                <p className="font-mono text-xs text-slate-400 mt-0.5">
                  Published via Brain Station 23 / Medium
                </p>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                In-depth technical architecture breakdown detailing socket connection persistence, UI virtualization, and low-latency packet synchronization inside the Unity engine.
              </p>

              <a
                href={personalData.medium}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center space-x-2 font-mono text-xs text-brand-primary hover:text-white bg-brand-primary/10 hover:bg-brand-primary px-3.5 py-2 border border-brand-primary/30 cyber-chamfer transition-all"
              >
                <span>READ PUBLICATION</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
