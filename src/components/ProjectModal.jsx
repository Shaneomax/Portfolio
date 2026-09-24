import React, { useEffect } from 'react';
import { X, CheckCircle, Cpu, ExternalLink, Layers, ShieldCheck, Zap } from 'lucide-react';
import { GithubIcon, ItchIoIcon } from './BrandIcons';
import { caseStudies, shippedTitles } from '../data/portfolioData';
import { playClick, playChirp } from '../utils/audio';

export default function ProjectModal({ projectId, onClose }) {
  const rawProject =
    caseStudies.find((p) => p.id === projectId) ||
    shippedTitles.find((p) => p.id === projectId);

  const project = rawProject
    ? {
        id: rawProject.id,
        title: rawProject.title,
        category: rawProject.category,
        period: rawProject.period || rawProject.year || '2025',
        client: rawProject.client || 'Itch.io Production',
        banner: rawProject.banner || rawProject.image,
        overview: rawProject.overview || rawProject.shortDesc,
        vision: rawProject.vision || [
          'Engineered with responsive gameplay feel and optimized draw-calls in Unity (C#).',
          'Integrated tactile audio, physics state machines, and particle effects.',
          'Deployed as a playable build with locked 60 FPS performance.'
        ],
        technicalExecution: rawProject.technicalExecution || [
          'Modular Architecture: Built using decoupled ScriptableObjects, event triggers, and state machines.',
          'Performance Tuning: Minimized garbage collection allocations and optimized draw batches for WebGL.',
          'Controls & Game Feel: Tightened input buffering and responsive physics collision response.'
        ],
        metrics: rawProject.metrics || [
          { label: 'Platform', value: rawProject.platform || 'Unity WebGL' },
          { label: 'Framerate', value: '60 FPS Locked' },
          { label: 'Engine', value: 'Unity (C#)' }
        ],
        techStack: rawProject.techStack || rawProject.tags || ['Unity', 'C#', 'Physics', 'WebGL'],
        demoUrl: rawProject.demoUrl || rawProject.itchUrl || '',
        repoUrl: rawProject.repoUrl || rawProject.githubUrl || 'https://github.com/Shaneomax'
      }
    : null;

  useEffect(() => {
    if (project) {
      playChirp();
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          playClick();
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      {/* Modal Card */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-surface-950 border border-brand-primary/50 cyber-chamfer-lg shadow-[0_0_50px_rgba(255,45,85,0.35)] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-surface-900/90 font-mono text-xs">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 bg-brand-primary rounded-full animate-ping" />
            <span className="text-brand-primary font-bold tracking-widest uppercase">
              SPEC_DOCUMENT // {project.id}
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">{project.period}</span>
          </div>

          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="flex items-center space-x-1.5 text-slate-400 hover:text-white bg-surface-950 px-2.5 py-1 border border-slate-700 hover:border-brand-primary transition-all rounded-sm"
          >
            <span className="text-[10px] tracking-wider uppercase">CLOSE [ESC]</span>
            <X className="w-4 h-4 text-brand-primary" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 font-sans">
          {/* Banner & Header Info */}
          <div className="space-y-4">
            <div className="relative aspect-[21/9] w-full overflow-hidden cyber-chamfer border border-slate-800 bg-surface-900">
              <img
                src={project.banner || project.image}
                alt={project.title}
                loading="eager"
                onError={(e) => {
                  if (project.image && e.target.src !== project.image) {
                    e.target.src = project.image;
                  }
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs text-brand-cyan bg-surface-950/90 px-3 py-1 border border-brand-cyan/40">
                  CATEGORY: {project.category}
                </span>
                <span className="font-mono text-xs text-white bg-brand-primary/90 px-3 py-1 font-bold">
                  CLIENT: {project.client}
                </span>
              </div>
            </div>

            <div>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight uppercase">
                {project.title}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-2">
                {project.overview}
              </p>
            </div>
          </div>

          {/* Performance Telemetry Strip */}
          {project.metrics && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.metrics.map((m, i) => (
                <div
                  key={i}
                  className="p-4 bg-surface-900/90 border border-slate-800/80 cyber-chamfer"
                >
                  <span className="text-slate-400 font-mono text-[11px] block uppercase tracking-wider">
                    {m.label}
                  </span>
                  <span className="font-display font-bold text-2xl text-brand-cyan mt-1 block">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Project Vision & Strategic Intent */}
          {project.vision && (
            <div className="space-y-3 p-5 bg-surface-900/60 border-l-2 border-brand-primary cyber-chamfer">
              <h3 className="font-mono font-bold text-xs text-brand-primary tracking-widest uppercase flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-brand-primary" />
                <span>VISION & OPERATIONAL OBJECTIVES</span>
              </h3>
              <ul className="space-y-2">
                {project.vision.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical Execution Breakdown */}
          {project.technicalExecution && (
            <div className="space-y-4">
              <h3 className="font-mono font-bold text-xs text-brand-primary tracking-widest uppercase flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-brand-primary" />
                <span>TECHNICAL EXECUTION & SYSTEM ARCHITECTURE</span>
              </h3>
              <div className="space-y-3 font-sans text-sm text-slate-300">
                {project.technicalExecution.map((para, i) => (
                  <div
                    key={i}
                    className="p-4 bg-surface-900/40 border border-slate-800 rounded-sm leading-relaxed"
                  >
                    <span className="font-mono text-xs text-brand-primary font-bold block mb-1">
                      // PHASE 0{i + 1} ARCHITECTURE
                    </span>
                    {para}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Matrix */}
          <div className="space-y-3 pt-2">
            <h3 className="font-mono font-bold text-xs text-slate-400 tracking-widest uppercase">
              INTEGRATED TECHNOLOGIES & RUNTIMES
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((tech, i) => (
                <span
                  key={i}
                  className="font-mono text-xs text-white bg-surface-900 px-3 py-1 border border-slate-700 cyber-chamfer font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* External links & Action buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10 font-mono text-xs">
            {project.demoUrl?.includes('itch.io') ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-brand-primary hover:from-red-500 hover:to-brand-secondary text-white font-bold px-5 py-2.5 cyber-chamfer shadow-[0_0_15px_rgba(255,45,85,0.5)] transition-all"
              >
                <ItchIoIcon className="w-4 h-4 text-white" />
                <span>PLAY ON ITCH.IO</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            ) : project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="flex items-center space-x-2 bg-brand-primary hover:bg-brand-secondary text-white font-bold px-5 py-2.5 cyber-chamfer shadow-[0_0_15px_rgba(255,45,85,0.4)] transition-all"
              >
                <span>LAUNCH DEMO</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : null}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="flex items-center space-x-2 bg-surface-900 hover:bg-surface-800 text-slate-200 px-5 py-2.5 border border-slate-700 hover:border-brand-primary transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>REPOSITORY</span>
              </a>
            )}

            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="ml-auto px-5 py-2.5 bg-surface-900 hover:bg-surface-850 text-slate-400 hover:text-white border border-slate-800 transition-all"
            >
              RETURN TO ARCHIVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
