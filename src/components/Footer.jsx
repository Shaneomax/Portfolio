import React from 'react';
import { ArrowUp, Mail, ExternalLink, Heart, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon, ItchIoIcon } from './BrandIcons';
import { personalData } from '../data/portfolioData';
import { playHover, playClick } from '../utils/audio';

export default function Footer({ onOpenTerminal }) {
  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-surface-950 font-mono text-xs overflow-hidden">
      {/* Huge Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.03]">
        <span className="font-display font-black text-8xl sm:text-[180px] text-white tracking-widest whitespace-nowrap">
          ANIK PAL
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border border-brand-primary/60 bg-surface-900 flex items-center justify-center cyber-chamfer">
                <span className="font-display font-bold text-brand-primary text-xs">AP</span>
              </div>
              <span className="font-display font-bold text-lg text-white tracking-wider">
                ANIK PAL
              </span>
            </div>

            <p className="text-slate-400 font-sans text-xs max-w-sm leading-relaxed">
              Unity Game Developer (2D & 3D) with 1.5+ years experience and B.Sc in CSE from North South University (NSU). Designing tactile combat systems, simulation mechanics, and playable indie games on Itch.io.
            </p>

            <div className="text-[11px] text-slate-500">
              COORDINATES: <span className="text-brand-cyan">{personalData.coordinates}</span> (Dhaka, Bangladesh)
            </div>
          </div>

          {/* Quick Nav (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-slate-400 block tracking-wider uppercase font-semibold">
              // TELEMETRY DIRECTORY
            </span>
            <div className="grid grid-cols-2 gap-2 text-slate-400">
              {[
                { label: 'WORK ARCHIVE', href: '#projects' },
                { label: 'SHIPPED TITLES', href: '#titles' },
                { label: 'SERVICES', href: '#services' },
                { label: 'METHODOLOGY', href: '#protocol' },
                { label: 'EXPERIENCE', href: '#experience' },
                { label: 'ABOUT OPERATOR', href: '#about' },
                { label: 'DIRECT COMMS', href: '#contact' },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="hover:text-brand-primary transition-colors py-0.5 text-xs"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Comms & Actions (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-slate-400 block tracking-wider uppercase font-semibold">
              // TERMINAL & COMMS
            </span>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  playClick();
                  onOpenTerminal();
                }}
                onMouseEnter={playHover}
                className="flex items-center space-x-1.5 px-3 py-2 bg-brand-cyan/10 hover:bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 cyber-chamfer transition-all"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>LAUNCH CLI</span>
              </button>

              <button
                onClick={scrollToTop}
                onMouseEnter={playHover}
                className="flex items-center space-x-1.5 px-3 py-2 bg-surface-900 hover:bg-surface-800 text-slate-300 hover:text-white border border-slate-700 hover:border-brand-primary cyber-chamfer transition-all"
              >
                <ArrowUp className="w-3.5 h-3.5 text-brand-primary" />
                <span>TOP</span>
              </button>
            </div>

            <div className="flex items-center space-x-3 pt-2 text-slate-400">
              <a
                href={personalData.itchio}
                target="_blank"
                rel="noopener noreferrer"
                title="Play My Games on Itch.io"
                onMouseEnter={playHover}
                className="hover:text-red-500 transition-colors"
              >
                <ItchIoIcon className="w-4 h-4" />
              </a>
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Repositories"
                onMouseEnter={playHover}
                className="hover:text-brand-primary transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                onMouseEnter={playHover}
                className="hover:text-brand-primary transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalData.email}`}
                title="Send Email"
                onMouseEnter={playHover}
                className="hover:text-brand-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} ANIK PAL. ALL SYSTEMS OPERATIONAL // UNITY 6 & REACT ARCHITECTURE
          </div>
          <div className="flex items-center space-x-2 text-slate-500">
            <span>NORTH SOUTH UNIVERSITY (NSU) CSE ALUMNI</span>
            <span>•</span>
            <span className="text-brand-primary">DHAKA, BANGLADESH</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
