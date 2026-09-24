import React from 'react';
import { User, Shield, Terminal, Award, FileText, ExternalLink, Code2, Globe2 } from 'lucide-react';
import { personalData } from '../data/portfolioData';
import { playHover, playClick } from '../utils/audio';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-surface-900/40">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 font-mono text-xs text-brand-primary tracking-widest uppercase">
            <User className="w-4 h-4 text-brand-primary" />
            <span>OPERATOR PROFILE // BIOGRAPHY & PHILOSOPHY</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase">
            ABOUT ANIK PAL
          </h2>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Bio Text (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 font-sans text-slate-300">
            <div className="p-6 bg-surface-950 border-l-2 border-brand-primary cyber-chamfer space-y-4">
              <h3 className="font-display font-bold text-xl text-white">
                {personalData.bioHeadline}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                {personalData.bioParagraph1}
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                {personalData.bioParagraph2}
              </p>
            </div>

            {/* Core Tenets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-surface-950 border border-slate-800 cyber-chamfer space-y-2">
                <div className="flex items-center space-x-2 font-mono text-xs text-brand-primary font-bold">
                  <Shield className="w-4 h-4 text-brand-primary" />
                  <span>FRAME-BUDGET DISCIPLINE</span>
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Treating 60 FPS game framerates and memory allocations as non-negotiable hard ceilings to eliminate frame drops and stuttering.
                </p>
              </div>

              <div className="p-4 bg-surface-950 border border-slate-800 cyber-chamfer space-y-2">
                <div className="flex items-center space-x-2 font-mono text-xs text-brand-cyan font-bold">
                  <Code2 className="w-4 h-4 text-brand-cyan" />
                  <span>DECOUPLED ARCHITECTURE</span>
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Building modular, data-driven systems that survive team handoffs, engine updates, and rapid feature pivots.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="https://drive.google.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="flex items-center space-x-2 bg-brand-primary hover:bg-brand-secondary text-white font-mono text-xs font-bold px-5 py-3 cyber-chamfer shadow-[0_0_15px_rgba(255,45,85,0.4)] transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>DOWNLOAD COMPLETE CURRICULUM VITAE</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>

          {/* Right Telemetry Specs (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 font-mono text-xs">
            <div className="p-6 bg-surface-950 border border-slate-800 cyber-chamfer space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-brand-primary font-bold tracking-wider uppercase">
                  OPERATIONAL PARAMETERS
                </span>
                <span className="text-brand-cyan text-[10px] bg-brand-cyan/10 px-2 py-0.5 border border-brand-cyan/30">
                  VERIFIED
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-500">OPERATOR:</span>
                  <span className="text-white font-semibold">ANIK PAL</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-500">LOCATION:</span>
                  <span className="text-white font-semibold">{personalData.location}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-500">COORDINATES:</span>
                  <span className="text-brand-cyan font-semibold">{personalData.coordinates}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-500">DEGREE:</span>
                  <span className="text-white font-semibold">B.SC IN CSE (NSU)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-500">ENGINEERING SUITE:</span>
                  <span className="text-slate-300">UNITY 6, C#, URP, PHYSX, RTX GPU</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">STATUS:</span>
                  <span className="text-emerald-400 font-bold flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    <span>CONTRACT & FULL-TIME</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Contact snippet */}
            <div className="p-5 bg-surface-950 border border-slate-800 cyber-chamfer flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">TRANSMISSION FREQUENCY</span>
                <span className="text-white font-bold">{personalData.email}</span>
              </div>
              <a
                href={`mailto:${personalData.email}`}
                onClick={playClick}
                onMouseEnter={playHover}
                className="px-3 py-1.5 bg-surface-900 hover:bg-brand-primary text-slate-300 hover:text-white border border-slate-700 hover:border-brand-primary transition-all text-[11px] cyber-chamfer"
              >
                COMMS
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
