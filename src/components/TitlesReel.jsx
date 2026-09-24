import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Gamepad2, Layers, ExternalLink } from 'lucide-react';
import { ItchIoIcon } from './BrandIcons';
import { shippedTitles } from '../data/portfolioData';
import { playHover, playClick } from '../utils/audio';

export default function TitlesReel({ onSelectProject }) {
  const reelRef = useRef(null);

  const scroll = (direction) => {
    playClick();
    if (reelRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      reelRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="titles" className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden bg-surface-950">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 font-mono text-xs text-brand-primary tracking-widest uppercase">
              <Gamepad2 className="w-4 h-4 text-brand-primary" />
              <span>PRODUCTION REEL // SHIPPED SYSTEMS & TITLES</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight uppercase">
              SHIPPED PRODUCTIONS
            </h2>
            <p className="text-slate-400 font-sans text-sm max-w-xl">
              Playable indie games on Itch.io, 2D & 3D combat prototypes, vehicle simulation systems, and interactive gameplay mechanics built in Unity.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => scroll('left')}
              onMouseEnter={playHover}
              aria-label="Scroll left"
              className="p-3 bg-surface-900 hover:bg-surface-800 text-slate-300 hover:text-white border border-slate-800 hover:border-brand-primary cyber-chamfer transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              onMouseEnter={playHover}
              aria-label="Scroll right"
              className="p-3 bg-surface-900 hover:bg-surface-800 text-slate-300 hover:text-white border border-slate-800 hover:border-brand-primary cyber-chamfer transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Reel Horizontal Slider */}
      <div className="max-w-7xl mx-auto">
        <div
          ref={reelRef}
          className="flex space-x-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {shippedTitles.map((title) => (
            <div
              key={title.id}
              onClick={() => {
                playClick();
                onSelectProject(title.id);
              }}
              onMouseEnter={playHover}
              className="min-w-[320px] sm:min-w-[380px] max-w-[380px] flex-shrink-0 snap-start bg-surface-900/90 border border-slate-800 hover:border-brand-primary cyber-chamfer transition-all duration-300 group cursor-pointer hover:shadow-[0_0_25px_rgba(255,45,85,0.35)] flex flex-col justify-between"
            >
              {/* Media Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-surface-950 border-b border-slate-800">
                <img
                  src={title.image}
                  alt={title.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-transparent to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="font-mono text-[10px] bg-brand-primary/90 text-white font-bold px-2 py-0.5 cyber-chamfer tracking-wider">
                    {title.year}
                  </span>
                  {title.itchUrl ? (
                    <a
                      href={title.itchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        playClick();
                      }}
                      className="font-mono text-[10px] bg-red-600 hover:bg-red-500 text-white font-bold px-2.5 py-0.5 flex items-center space-x-1.5 cyber-chamfer shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-colors z-20"
                    >
                      <ItchIoIcon className="w-2.5 h-2.5" />
                      <span>PLAY ON ITCH.IO ↗</span>
                    </a>
                  ) : (
                    <span className="font-mono text-[10px] bg-surface-950/80 text-brand-cyan border border-brand-cyan/40 px-2 py-0.5">
                      {title.platform}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2 right-3 font-mono text-[10px] text-slate-400 flex items-center space-x-1 group-hover:text-brand-primary transition-colors bg-surface-950/80 px-2 py-0.5 border border-slate-800/80">
                  <span>INSPECT SPEC</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <p className="font-mono text-[11px] text-brand-primary tracking-widest uppercase">
                    // {title.category}
                  </p>
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-brand-primary transition-colors">
                    {title.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-2">
                    {title.shortDesc}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {title.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono text-slate-300 bg-surface-950 px-2 py-0.5 border border-slate-800 group-hover:border-brand-primary/40 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
