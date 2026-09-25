import React, { useState, useEffect } from 'react';
import { Send, Mail, MapPin, Copy, Check, Radio, ExternalLink, Loader2 } from 'lucide-react';
import { ItchIoIcon } from './BrandIcons';
import { personalData } from '../data/portfolioData';
import { playHover, playClick, playConfirm, playChirp } from '../utils/audio';

// Formspree endpoint – replace YOUR_FORM_ID with the ID from formspree.io/new
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xvgajglq';

export default function ContactSection({ prefilledService }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'General Technical Inquiry',
    message: '',
  });

  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playChirp();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
        }),
      });

      if (response.ok) {
        playConfirm();
        setStatus('success');
      } else {
        const data = await response.json();
        setErrorMsg(data?.errors?.[0]?.message || 'Transmission failed. Please try again.');
        setStatus('error');
      }
    } catch (err) {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  const handleReset = () => {
    playClick();
    setStatus('idle');
    setErrorMsg('');
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
            Looking for a Unity game developer for 2D & 3D games, combat mechanics, simulation systems, or Itch.io WebGL deployment? Send a message below — it goes straight to my inbox.
          </p>
        </div>

        {/* 2-Column Terminal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Form (7 Cols) */}
          <div className="lg:col-span-7 bg-surface-900 border border-brand-primary/40 cyber-chamfer p-6 sm:p-8 space-y-6 shadow-cyber-card">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 bg-brand-primary rounded-full animate-ping" />
                <span className="font-bold text-white tracking-wider">
                  DIRECT_MESSAGE // SEND TO ANIK
                </span>
              </div>
              <span className="text-brand-cyan text-[10px] bg-brand-cyan/10 px-2 py-0.5 border border-brand-cyan/30">
                REAL EMAIL DELIVERY
              </span>
            </div>

            {status === 'success' ? (
              /* Success State */
              <div className="py-12 text-center space-y-5 font-mono">
                <div className="w-16 h-16 mx-auto rounded-full bg-brand-primary/20 border-2 border-brand-primary flex items-center justify-center shadow-[0_0_25px_#ff2d55]">
                  <Check className="w-8 h-8 text-brand-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-2xl text-white">
                    MESSAGE SENT!
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Your message was delivered directly to <span className="text-brand-primary">anikpal475@gmail.com</span>. Expect a reply within 24 hours.
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-surface-950 hover:bg-surface-850 text-brand-cyan border border-brand-cyan/40 hover:border-brand-cyan text-xs font-bold tracking-wider cyber-chamfer transition-all"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              </div>
            ) : (
              /* Form State */
              <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-slate-400 block tracking-wider uppercase">
                    // YOUR NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Recruiter / Game Studio Producer"
                    className="w-full bg-surface-950 border border-slate-700 focus:border-brand-primary px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-primary cyber-chamfer transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-slate-400 block tracking-wider uppercase">
                    // YOUR EMAIL *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. contact@studio.com"
                    className="w-full bg-surface-950 border border-slate-700 focus:border-brand-primary px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-primary cyber-chamfer transition-all"
                  />
                </div>

                {/* Service Selection */}
                <div className="space-y-1.5">
                  <label className="text-slate-400 block tracking-wider uppercase">
                    // SUBJECT / SERVICE TYPE
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
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
                    // YOUR MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, platform targets (WebGL, PC, Mobile), timeline, and any other details..."
                    className="w-full bg-surface-950 border border-slate-700 focus:border-brand-primary px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-primary cyber-chamfer transition-all resize-none"
                  />
                </div>

                {/* Error Message */}
                {status === 'error' && (
                  <div className="p-3 bg-red-950/40 border border-red-700/60 text-red-400 text-xs font-mono">
                    ⚠ {errorMsg}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  onMouseEnter={playHover}
                  className="w-full flex items-center justify-center space-x-2 py-3.5 bg-brand-primary hover:bg-brand-secondary text-white font-bold tracking-wider cyber-chamfer shadow-[0_0_20px_rgba(255,45,85,0.4)] transition-all duration-200 disabled:opacity-60"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SENDING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>SEND MESSAGE</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right: Direct Contacts & Links (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 font-mono text-xs">
            {/* Email Card with 1-Click Copy */}
            <div className="p-6 bg-surface-900 border border-slate-800 cyber-chamfer space-y-4">
              <span className="text-slate-400 tracking-wider uppercase block font-semibold">
                // DIRECT EMAIL
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
                // LOCATION
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

            {/* External Links */}
            <div className="p-6 bg-surface-900 border border-slate-800 cyber-chamfer space-y-3">
              <span className="text-slate-400 tracking-wider uppercase block font-semibold">
                // FIND ME ONLINE
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
                  <span>RESUME (CV)</span>
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
