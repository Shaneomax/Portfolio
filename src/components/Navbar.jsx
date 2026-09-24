import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal, Menu, X, ExternalLink, Activity } from 'lucide-react';
import { ItchIoIcon } from './BrandIcons';
import { personalData } from '../data/portfolioData';
import { playHover, playClick, toggleSound, isSoundEnabled } from '../utils/audio';

export default function Navbar({ onOpenTerminal, soundState, setSoundState }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);

    // Live tactical clock
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC+6'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundState(next);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-mono ${
        scrolled
          ? 'bg-surface-950/90 backdrop-blur-md border-b border-brand-primary/20 shadow-[0_4px_25px_rgba(0,0,0,0.8)]'
          : 'bg-transparent border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
          onMouseEnter={playHover}
          className="group flex items-center space-x-3 text-left"
        >
          <div className="w-10 h-10 border border-brand-primary/60 bg-surface-900 flex items-center justify-center relative cyber-chamfer group-hover:border-brand-primary group-hover:shadow-[0_0_12px_rgba(255,45,85,0.5)] transition-all">
            <span className="font-display font-bold text-brand-primary text-base">AP</span>
            <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-brand-cyan" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-bold text-white tracking-wider text-base group-hover:text-brand-primary transition-colors">
                ANIK PAL
              </span>
              <span className="text-[10px] text-brand-primary bg-brand-primary/10 px-1.5 py-0.5 border border-brand-primary/30 rounded-sm">
                0xAP26
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-slate-400">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="tracking-widest uppercase">AVAILABLE FOR HIRE</span>
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-mono tracking-widest">
          {[
            { label: '// WORK', id: 'projects' },
            { label: '// TITLES', id: 'titles' },
            { label: '// SERVICES', id: 'services' },
            { label: '// PROTOCOL', id: 'protocol' },
            { label: '// MILESTONES', id: 'experience' },
            { label: '// ABOUT', id: 'about' },
            { label: '// CONTACT', id: 'contact' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              onMouseEnter={playHover}
              className="relative text-slate-400 hover:text-brand-primary transition-colors py-1 group"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-primary transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right HUD Controls */}
        <div className="hidden sm:flex items-center space-x-4">
          {/* Telemetry Clock */}
          <div className="hidden xl:flex items-center space-x-1.5 text-[11px] text-slate-500 bg-surface-900/80 px-2.5 py-1 border border-white/5">
            <Activity className="w-3 h-3 text-brand-primary animate-pulse" />
            <span>{timeString}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            onMouseEnter={playHover}
            title={soundState ? 'Mute Interface Sound' : 'Enable Tactical Sound'}
            className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white bg-surface-900/90 hover:bg-surface-800 px-2.5 py-1.5 border border-slate-700/60 hover:border-brand-primary transition-all rounded-sm"
          >
            {soundState ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
                <span className="text-[10px] tracking-wider text-brand-primary font-bold">AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[10px] tracking-wider text-slate-500">MUTED</span>
              </>
            )}
          </button>

          {/* CLI Terminal Toggle */}
          <button
            onClick={() => {
              playClick();
              onOpenTerminal();
            }}
            onMouseEnter={playHover}
            title="Open Interactive Cyber CLI (~)"
            className="flex items-center space-x-1.5 text-xs text-brand-cyan hover:text-white bg-brand-cyan/10 hover:bg-brand-cyan/20 px-2.5 py-1.5 border border-brand-cyan/40 hover:border-brand-cyan transition-all rounded-sm"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="text-[10px] tracking-wider">CLI [~]</span>
          </button>

          {/* Itch.io Games Link */}
          <a
            href={personalData.itchio}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="hidden sm:flex items-center space-x-1.5 text-xs text-white bg-red-600/90 hover:bg-red-600 px-3 py-1.5 cyber-chamfer font-mono font-semibold tracking-wider hover:shadow-[0_0_12px_rgba(239,68,68,0.6)] transition-all"
            title="Play My Games on Itch.io"
          >
            <ItchIoIcon className="w-3.5 h-3.5" />
            <span className="text-[10px]">ITCH.IO</span>
          </a>

          {/* Resume CTA */}
          <a
            href="https://drive.google.com"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="hidden md:flex items-center space-x-1.5 text-xs text-white bg-brand-primary/90 hover:bg-brand-primary px-3.5 py-1.5 cyber-chamfer font-mono font-semibold tracking-wider hover:shadow-[0_0_15px_rgba(255,45,85,0.6)] transition-all"
          >
            <span>RESUME</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            onClick={handleToggleSound}
            className="p-2 text-slate-400 hover:text-white bg-surface-900 border border-slate-800 rounded-sm"
          >
            {soundState ? <Volume2 className="w-4 h-4 text-brand-primary" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 text-slate-300 hover:text-white bg-surface-900 border border-slate-800 rounded-sm"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-brand-primary" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slideout Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-950/95 backdrop-blur-xl border-b border-brand-primary/30 px-6 py-6 font-mono space-y-4 shadow-2xl">
          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              { label: '// WORK', id: 'projects' },
              { label: '// TITLES', id: 'titles' },
              { label: '// SERVICES', id: 'services' },
              { label: '// PROTOCOL', id: 'protocol' },
              { label: '// MILESTONES', id: 'experience' },
              { label: '// ABOUT', id: 'about' },
              { label: '// CONTACT', id: 'contact' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="p-3 bg-surface-900 border border-slate-800 text-slate-300 hover:text-brand-primary hover:border-brand-primary/50 text-left transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="flex items-center space-x-2 text-xs text-brand-cyan bg-brand-cyan/10 px-3 py-2 border border-brand-cyan/40"
            >
              <Terminal className="w-4 h-4" />
              <span>TERMINAL CLI</span>
            </button>
            <a
              href="https://drive.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-xs text-white bg-brand-primary px-4 py-2 font-bold"
            >
              <span>RESUME</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
