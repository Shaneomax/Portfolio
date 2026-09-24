import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal, Crosshair, ChevronDown, ShieldCheck, Cpu, Radio, Sparkles, Gamepad2 } from 'lucide-react';
import { ItchIoIcon } from './BrandIcons';
import { personalData } from '../data/portfolioData';
import { playHover, playClick } from '../utils/audio';

export default function HeroSection({ onOpenTerminal }) {
  const roles = [
    "UNITY 2D & 3D GAME DEVELOPER",
    "GAMEPLAY PROGRAMMER & MECHANICS (C#)",
    "COMBAT ENGINES & PHYSICS SIMULATION",
    "B.SC IN CSE // NORTH SOUTH UNIVERSITY"
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        if (displayText.length === fullText.length) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  const scrollToSection = (id) => {
    playClick();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambience & Cyber Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-35 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-brand-cyan/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Top Telemetry Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400 mb-8 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5 text-brand-primary">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
              <span className="font-bold tracking-wider">HUD // TELEMETRY LINKED</span>
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline">COORDINATES: {personalData.coordinates}</span>
          </div>
          <div className="flex items-center space-x-4 text-slate-400">
            <span className="hidden md:inline">ALUMNI: NORTH SOUTH UNIVERSITY (NSU)</span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="text-brand-cyan flex items-center space-x-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>ENGINE: UNITY 6</span>
            </span>
          </div>
        </div>

        {/* Hero Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            {/* Tagline / Badge */}
            <div className="inline-flex items-center space-x-2 bg-surface-900 border border-brand-primary/40 px-3.5 py-1.5 cyber-chamfer">
              <Crosshair className="w-3.5 h-3.5 text-brand-primary animate-spin" style={{ animationDuration: '8s' }} />
              <span className="font-mono text-xs text-brand-primary tracking-widest uppercase font-semibold">
                TACTICAL SPATIAL & GAME ARCHITECT
              </span>
            </div>

            {/* Glitch Name */}
            <div className="space-y-1">
              <p className="font-mono text-sm tracking-widest text-slate-400">
                SYSTEM OPERATOR //
              </p>
              <h1
                data-text={personalData.name}
                className="glitch-title font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white uppercase"
              >
                {personalData.name}
              </h1>
            </div>

            {/* Typing dynamic subtitle */}
            <div className="h-10 flex items-center">
              <p className="font-mono text-lg sm:text-xl text-brand-cyan tracking-wider flex items-center">
                <span className="text-brand-primary mr-2">&gt;</span>
                <span>{displayText}</span>
                <span className="inline-block w-2.5 h-5 bg-brand-cyan ml-1.5 animate-pulse" />
              </p>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed font-sans font-normal border-l-2 border-brand-primary/50 pl-4 bg-surface-900/40 py-2">
              {personalData.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-4 font-mono text-xs tracking-wider">
              {/* Primary CTA: Explore Archive */}
              <button
                onClick={() => scrollToSection('projects')}
                onMouseEnter={playHover}
                className="group flex items-center space-x-3 bg-brand-primary hover:bg-brand-secondary text-white font-bold px-6 py-3.5 cyber-chamfer shadow-[0_0_20px_rgba(255,45,85,0.4)] hover:shadow-[0_0_30px_rgba(255,45,85,0.7)] transition-all duration-200"
              >
                <span>EXPLORE ARCHIVE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

              {/* Play on Itch.io CTA */}
              <a
                href={personalData.itchio}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-brand-primary hover:from-red-500 hover:to-brand-secondary text-white font-bold px-5 py-3.5 cyber-chamfer shadow-[0_0_15px_rgba(255,45,85,0.4)] transition-all"
              >
                <ItchIoIcon className="w-4 h-4 text-white" />
                <span>PLAY ON ITCH.IO</span>
              </a>

              {/* Secondary CTA: Transmission */}
              <button
                onClick={() => scrollToSection('contact')}
                onMouseEnter={playHover}
                className="flex items-center space-x-2 bg-surface-900 hover:bg-surface-850 text-slate-200 hover:text-white px-5 py-3.5 border border-slate-700 hover:border-brand-primary/60 cyber-chamfer transition-all"
              >
                <Radio className="w-4 h-4 text-brand-primary" />
                <span>TRANSMISSION</span>
              </button>

              {/* Terminal CLI prompt button */}
              <button
                onClick={() => {
                  playClick();
                  onOpenTerminal();
                }}
                onMouseEnter={playHover}
                className="flex items-center space-x-2 bg-brand-cyan/10 hover:bg-brand-cyan/20 text-brand-cyan px-4 py-3.5 border border-brand-cyan/30 cyber-chamfer transition-all"
              >
                <Terminal className="w-4 h-4" />
                <span>CLI (~)`</span>
              </button>
            </div>
          </div>

          {/* Right Hologram / Telemetry Radar Card */}
          <div className="lg:col-span-4">
            <div className="relative glass-panel p-6 cyber-chamfer border border-brand-primary/30 shadow-cyber-card space-y-5">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-brand-primary" />
                  <span className="font-mono text-xs text-white tracking-widest uppercase font-bold">
                    SYSTEM RADAR // AP-01
                  </span>
                </div>
                <span className="text-[10px] font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 border border-brand-cyan/20">
                  REAL-TIME
                </span>
              </div>

              {/* Simulated Holographic Crosshair HUD */}
              <div className="relative w-full aspect-square max-w-[280px] mx-auto border border-dashed border-brand-primary/30 rounded-full flex items-center justify-center p-4">
                {/* Concentric rings */}
                <div className="absolute inset-4 rounded-full border border-slate-700/60" />
                <div className="absolute inset-12 rounded-full border border-brand-cyan/20 animate-spin" style={{ animationDuration: '24s' }} />
                <div className="absolute inset-20 rounded-full border border-brand-primary/40" />

                {/* Sweep scanner line */}
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                  <div
                    className="w-1/2 h-1/2 absolute top-0 left-0 origin-bottom-right bg-gradient-to-br from-brand-primary/25 to-transparent animate-spin"
                    style={{ animationDuration: '5s' }}
                  />
                </div>

                {/* Center Core */}
                <div className="relative z-10 text-center space-y-1">
                  <div className="w-12 h-12 mx-auto rounded-full bg-surface-900 border border-brand-primary flex items-center justify-center shadow-[0_0_15px_#ff2d55]">
                    <Sparkles className="w-5 h-5 text-brand-primary" />
                  </div>
                  <p className="font-mono text-[10px] text-brand-cyan tracking-wider font-semibold">NSU CSE B.SC</p>
                  <p className="font-display font-bold text-xs text-white">ACTIVE OPS</p>
                </div>

                {/* Blip nodes */}
                <div className="absolute top-8 right-12 w-2 h-2 rounded-full bg-brand-cyan animate-ping" />
                <div className="absolute bottom-10 left-10 w-2 h-2 rounded-full bg-brand-primary" />
              </div>

              {/* Status Spec Table */}
              <div className="space-y-2 text-xs font-mono pt-2 border-t border-white/5">
                <div className="flex justify-between text-slate-400">
                  <span>SPECIALIZATION:</span>
                  <span className="text-white font-semibold">2D & 3D GAME DEV</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>PRIMARY ENGINE:</span>
                  <span className="text-brand-primary font-semibold">UNITY 6 / C#</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>DEPLOYMENT:</span>
                  <span className="text-brand-cyan font-semibold">PC & ITCH.IO WEBGL</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>PERFORMANCE:</span>
                  <span className="text-white font-semibold">60 FPS GAMEPLAY</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="pt-16 flex justify-center">
          <button
            onClick={() => scrollToSection('stats')}
            onMouseEnter={playHover}
            className="flex flex-col items-center space-y-2 text-slate-500 hover:text-brand-primary transition-colors font-mono text-[11px] tracking-widest"
          >
            <span>DISCOVER TELEMETRY</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-brand-primary" />
          </button>
        </div>
      </div>
    </section>
  );
}
