import React, { useState } from 'react';
import { Layers, Filter, ExternalLink, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { ItchIoIcon } from './BrandIcons';
import { caseStudies } from '../data/portfolioData';
import { playHover, playClick } from '../utils/audio';

export default function ProjectsSection({ onSelectProject }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'GAME DEV', 'SIMULATION'];

  const filteredProjects =
    selectedCategory === 'ALL'
      ? caseStudies
      : caseStudies.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleCategoryChange = (cat) => {
    playClick();
    setSelectedCategory(cat);
  };

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-surface-950">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 font-mono text-xs text-brand-primary tracking-widest uppercase">
              <Layers className="w-4 h-4 text-brand-primary" />
              <span>CASE ARCHIVE // DETAILED ENGINEERING REPOSITORIES</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase">
              CASE STUDIES
            </h2>
            <p className="text-slate-400 font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
              Explore in-depth technical breakdowns of 2D & 3D gameplay mechanics, combat hitboxes, vehicle physics rigs, and optimized WebGL pipelines.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                onMouseEnter={playHover}
                className={`px-3.5 py-1.5 cyber-chamfer transition-all tracking-wider ${
                  selectedCategory === cat
                    ? 'bg-brand-primary text-white font-bold shadow-[0_0_12px_rgba(255,45,85,0.6)]'
                    : 'bg-surface-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                playClick();
                onSelectProject(project.id);
              }}
              onMouseEnter={playHover}
              className="group relative bg-surface-900/90 border border-slate-800/80 hover:border-brand-primary cyber-chamfer transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-[0_0_30px_rgba(255,45,85,0.25)] overflow-hidden"
            >
              {/* Scanline hover animation */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Card Image Banner */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-950 border-b border-slate-800">
                <img
                  src={project.banner || project.image}
                  alt={project.title}
                  loading="lazy"
                  onError={(e) => {
                    if (project.image && e.target.src !== project.image) {
                      e.target.src = project.image;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-transparent to-transparent" />

                {/* Category & Client tag */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className="font-mono text-[10px] bg-brand-primary text-white font-bold px-2 py-0.5 cyber-chamfer tracking-wider uppercase">
                    {project.category}
                  </span>
                  {project.demoUrl?.includes('itch.io') && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        playClick();
                      }}
                      className="font-mono text-[10px] bg-red-600 hover:bg-red-500 text-white font-bold px-2 py-0.5 flex items-center space-x-1 cyber-chamfer shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-colors z-20 cursor-pointer"
                    >
                      <ItchIoIcon className="w-2.5 h-2.5" />
                      <span>PLAYABLE ON ITCH.IO ↗</span>
                    </a>
                  )}
                  <span className="font-mono text-[10px] bg-surface-950/90 text-slate-300 px-2 py-0.5 border border-slate-800">
                    {project.period}
                  </span>
                </div>

                <div className="absolute bottom-2.5 right-3 font-mono text-[10px] text-brand-cyan bg-surface-950/80 px-2 py-0.5 border border-brand-cyan/30 flex items-center space-x-1 group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <span>INSPECT DEEP-DIVE</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <p className="font-mono text-[11px] text-slate-400">
                    CLIENT // <span className="text-white font-semibold">{project.client}</span>
                  </p>
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-brand-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
                    {project.overview}
                  </p>
                </div>

                {/* Key Metric Highlights */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5 font-mono text-[11px]">
                  {project.metrics?.slice(0, 2).map((m, i) => (
                    <div key={i} className="bg-surface-950 p-2 border border-slate-800/80">
                      <span className="text-slate-500 block text-[9px] uppercase">{m.label}</span>
                      <span className="text-brand-cyan font-bold">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack?.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono text-slate-400 bg-surface-950 px-2 py-0.5 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack?.length > 4 && (
                    <span className="text-[10px] font-mono text-brand-primary bg-surface-950 px-1.5 py-0.5">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
