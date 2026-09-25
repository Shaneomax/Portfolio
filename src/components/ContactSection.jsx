import React, { useState, useEffect } from 'react';
import { Send, Mail, MapPin, Copy, Check, Radio, Terminal, ExternalLink, MessageSquare, AlertCircle } from 'lucide-react';
import { ItchIoIcon } from './BrandIcons';
import { personalData, servicesData } from '../data/portfolioData';
import { playHover, playClick, playConfirm, playChirp } from '../utils/audio';

export default function ContactSection({ prefilledService }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'General Technical Inquiry',
    message: '',
  });

  const [copied, setCopied] = useState(false);
  const [transmitting, setTransmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [transmitted, setTransmitted] = useState(false);

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, service: prefilledService }));
    }
  }, [prefilledService]);

  const handleCopyEmail = () => {
    playConfirm();
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playChirp();
    setTransmitting(true);
    setProgress(15);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTransmitting(false);
          setTransmitted(true);
          playConfirm();
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleReset = () => {
    playClick();
    setTransmitted(false);
    setProgress(0);
    setFormData({
      name: '',
      email: '',
      service: 'General Technical Inquiry',
      message: '',
    });
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-surface-950">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 font-mono text-xs text-brand-primary tracking-widest uppercase">
            <Radio className="w-4 h-4 text-brand-primary animate-pulse" />
            <span>TRANSMISSION TERMINAL // DIRECT COMMS CHANNEL</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase">
            INITIATE CONTACT
          </h2>
          <p className="text-slate-400 font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
            Looking for an agile Unity game developer for 2D & 3D games, combat mechanics, simulation systems, or Itch.io WebGL deployment? Open a direct transmission channel below.
          </p>
        </div>

        {/* 2-Column Terminal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Direct Comms Console Form (7 Cols) */}
          <div className="lg:col-span-7 bg-surface-900 border border-brand-primary/40 cyber-chamfer p-6 sm:p-8 space-y-6 shadow-cyber-card">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 bg-brand-primary rounded-full animate-ping" />
                <span className="font-bold text-white tracking-wider">
                  COMMS_STATION // PORT 9026
                </span>
              </div>
              <span className="text-brand-cyan text-[10px] bg-brand-cyan/10 px-2 py-0.5 border border-brand-cyan/30">
                SSL 256-BIT ENCRYPTED
              </span>
            </div>

            {transmitted ? (
              /* Success State */
              <div className="py-12 text-center space-y-5 font-mono">
                <div className="w-16 h-16 mx-auto rounded-full bg-brand-primary/20 border-2 border-brand-primary flex items-center justify-center shadow-[0_0_25px_#ff2d55]">
                  <Check className="w-8 h-8 text-brand-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-2xl text-white">
                    TRANSMISSION DISPATCHED
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Packet successfully routed to operator <span className="text-brand-primary">Anik Pal</span>. Expect response via return frequency within 24 hours.
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-surface-950 hover:bg-surface-850 text-brand-cyan border border-brand-cyan/40 hover:border-brand-cyan text-xs font-bold tracking-wider cyber-chamfer transition-all"
                  >
                    SEND ANOTHER TRANSMISSION
                  </button>
                </div>
              </div>
            ) : (
              /* Form State */
              <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-slate-400 block tracking-wider uppercase">
                    // OPERATOR CALLSIGN (YOUR NAME) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...prev => ({ ...prev, name: e.target.value }) })}
                    placeholder="e.g. Recruiter / Game Studio Producer"
                    className="w-full bg-surface-950 border border-slate-700 focus:border-brand-primary px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-primary cyber-chamfer transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-slate-400 block tracking-wider uppercase">
                    // RETURN FREQUENCY (YOUR EMAIL) *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...prev => ({ ...prev, email: e.target.value }) })}
                    placeholder="e.g. contact@studio.com"
                    className="w-full bg-surface-950 border border-slate-700 focus:border-brand-primary px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-primary cyber-chamfer transition-all"
                  />
                </div>

                {/* Service Selection */}
                <div className="space-y-1.5">
                  <label className="text-slate-400 block tracking-wider uppercase">
                    // ENGAGEMENT VECTOR (SERVICE TYPE)
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...prev => ({ ...prev, service: e.target.value }) })}
                    className="w-full bg-surface-950 border border-slate-700 focus:border-brand-primary px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-brand-primary cyber-chamfer transition-all"
                  >
                    <option value="General Technical Inquiry">General Technical Inquiry</option>
                    <option value="Unity 2D & 3D Game Development">Unity 2D & 3D Game Development</option>
                    <option value="Vehicle Physics & Simulation">Vehicle Physics & Simulation</option>
                    <option value="Combat Engines & Hitbox Systems">Combat Engines & Hitbox Systems</option>
                    <option value="Game UI & HUD Systems">Game UI & HUD Systems</option>
                    <option value="WebGL Game Optimization (Itch.io)">WebGL Game Optimization (Itch.io)</option>
                    <option value="Full-Time / Contract Recruitment">Full-Time / Contract Recruitment</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-slate-400 block tracking-wider uppercase">
                    // TRANSMISSION PAYLOAD (BRIEF / MESSAGE) *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Describe project requirements, platform targets (WebGL, PC, Mobile), timeline, and deliverables..."
                    className="w-full bg-surface-950 border border-slate-700 focus:border-brand-primary px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-primary cyber-chamfer transition-all resize-none"
                  />
                </div>

                {/* Transmission Progress Simulation */}
                {transmitting && (
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-[11px] text-brand-primary font-bold">
                      <span>ROUTING DATA PACKETS...</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-950 border border-slate-800 rounded-sm overflow-hidden">
                      <div
                        className="h-full bg-brand-primary transition-all duration-200"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={transmitting}
                  onMouseEnter={playHover}
                  className="w-full flex items-center justify-center space-x-2 py-3.5 bg-brand-primary hover:bg-brand-secondary text-white font-bold tracking-wider cyber-chamfer shadow-[0_0_20px_rgba(255,45,85,0.4)] transition-all duration-200 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT PACKET NOW</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Direct Coordinates & Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 font-mono text-xs">
            {/* Email Card with 1-Click Copy */}
            <div className="p-6 bg-surface-900 border border-slate-800 cyber-chamfer space-y-4">
              <span className="text-slate-400 tracking-wider uppercase block font-semibold">
                // DIRECT COMMS FREQUENCY
              </span>

              <div className="p-3 bg-surface-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2 truncate">
                  <Mail className="w-4 h-4 text-brand-primary flex-shrink-0" />
                  <span className="text-white font-bold truncate">{personalData.email}</span>
                </div>

                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={playHover}
                  title="Copy email to clipboard"
                  className="p-2 text-slate-400 hover:text-white bg-surface-900 border border-slate-700 hover:border-brand-primary transition-all rounded-sm"
                >
                  {copied ? <Check className="w-4 h-4 text-brand-cyan" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {copied && (
                <p className="text-[10px] text-brand-cyan tracking-wider">
                  ✔ EMAIL COPIED TO CLIPBOARD
                </p>
              )}
            </div>

            {/* Geographical Coordinates */}
            <div className="p-6 bg-surface-900 border border-slate-800 cyber-chamfer space-y-4">
              <span className="text-slate-400 tracking-wider uppercase block font-semibold">
                // GEOGRAPHIC TELEMETRY
              </span>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-500">BASE LOCATION:</span>
                  <span className="text-white font-semibold">{personalData.location}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-500">COORDINATES:</span>
                  <span className="text-brand-cyan font-bold">{personalData.coordinates}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-500">TIME ZONE:</span>
                  <span className="text-slate-300">UTC+06:00 (BST)</span>
                </div>
              </div>
            </div>

            {/* Signal Channels (GitHub, LinkedIn, Medium) */}
            <div className="p-6 bg-surface-900 border border-slate-800 cyber-chamfer space-y-3">
              <span className="text-slate-400 tracking-wider uppercase block font-semibold">
                // EXTERNAL SIGNAL CHANNELS
              </span>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={personalData.itchio}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="p-3 bg-red-950/40 border border-red-800/80 hover:border-red-500 text-white flex items-center justify-between transition-all"
                >
                  <div className="flex items-center space-x-1.5">
                    <ItchIoIcon className="w-3.5 h-3.5 text-red-400" />
                    <span>ITCH.IO</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                </a>

                <a
                  href={personalData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="p-3 bg-surface-950 border border-slate-800 hover:border-brand-primary text-slate-300 hover:text-white flex items-center justify-between transition-all"
                >
                  <span>GITHUB</span>
                  <ExternalLink className="w-3.5 h-3.5 text-brand-primary" />
                </a>

                <a
                  href={personalData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="p-3 bg-surface-950 border border-slate-800 hover:border-brand-primary text-slate-300 hover:text-white flex items-center justify-between transition-all"
                >
                  <span>LINKEDIN</span>
                  <ExternalLink className="w-3.5 h-3.5 text-brand-primary" />
                </a>

                <a
                  href={personalData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="p-3 bg-surface-950 border border-slate-800 hover:border-brand-primary text-slate-300 hover:text-white flex items-center justify-between transition-all"
                >
                  <span>RESUME PDF (CV)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-brand-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
