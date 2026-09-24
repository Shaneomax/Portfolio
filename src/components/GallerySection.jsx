import React, { useState } from 'react';
import { Eye, X, Sparkles, Maximize2, Tag, Calendar } from 'lucide-react';
import { cyberGallery } from '../data/portfolioData';
import { playHover, playClick, playChirp } from '../utils/audio';

export default function GallerySection() {
  const [activeItem, setActiveItem] = useState(null);

  const openLightbox = (item) => {
    playChirp();
    setActiveItem(item);
  };

  const closeLightbox = () => {
    playClick();
    setActiveItem(null);
  };

  return (
    <section id="gallery" className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-surface-950">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 font-mono text-xs text-brand-primary tracking-widest uppercase">
              <Sparkles className="w-4 h-4 text-brand-primary" />
              <span>VISUAL ASSET MATRIX // SHADERS & TACTICAL UI</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase">
              SHADER & ASSET VAULT
            </h2>
            <p className="text-slate-400 font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
              Explorations in real-time GLSL/HLSL graphics shaders, audio-reactive telemetry visors, diegetic gauges, and high-density holographic interfaces.
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cyberGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              onMouseEnter={playHover}
              className="group relative bg-surface-900 border border-slate-800 hover:border-brand-primary cyber-chamfer cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,45,85,0.3)] flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-950 border-b border-slate-800">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-transparent to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="font-mono text-[10px] bg-brand-primary text-white font-bold px-2 py-0.5 cyber-chamfer">
                    {item.year}
                  </span>
                </div>

                <div className="absolute top-3 right-3 p-1.5 bg-surface-950/80 rounded-sm text-slate-400 group-hover:text-white border border-white/10 group-hover:border-brand-primary transition-all">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 space-y-3">
                <span className="font-mono text-[10px] text-brand-cyan tracking-wider uppercase block">
                  {item.category}
                </span>
                <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 font-sans line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {item.tags.map((t, i) => (
                    <span
                      key={i}
                      className="font-mono text-[10px] text-slate-400 bg-surface-950 px-2 py-0.5 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full bg-surface-950 border border-brand-primary/60 cyber-chamfer-lg overflow-hidden shadow-[0_0_50px_rgba(255,45,85,0.4)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-surface-900 font-mono text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
                <span className="font-bold text-white tracking-widest uppercase">
                  {activeItem.title}
                </span>
              </div>
              <button
                onClick={closeLightbox}
                className="text-slate-400 hover:text-white p-1 hover:bg-surface-800 rounded-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Image */}
            <div className="relative aspect-video max-h-[60vh] w-full overflow-hidden bg-black">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Lightbox Footer Details */}
            <div className="p-6 space-y-3 bg-surface-900/90 font-mono">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-brand-cyan uppercase">
                  {activeItem.category}
                </span>
                <span className="text-xs text-slate-400">ARCHIVE YEAR: {activeItem.year}</span>
              </div>
              <p className="text-sm font-sans text-slate-200 leading-relaxed">
                {activeItem.desc}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {activeItem.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-white bg-surface-950 px-2.5 py-1 border border-slate-700"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
