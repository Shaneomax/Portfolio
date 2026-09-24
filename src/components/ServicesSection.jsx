import React from 'react';
import { Wrench, CheckCircle2, ArrowRight, Glasses, Headset, Gamepad, Sparkles, Globe } from 'lucide-react';
import { servicesData } from '../data/portfolioData';
import { playHover, playClick } from '../utils/audio';

export default function ServicesSection({ onSelectService }) {
  const getIcon = (id) => {
    switch (id) {
      case 'srv-unity-games':
        return <Gamepad className="w-5 h-5 text-brand-primary" />;
      case 'srv-combat':
        return <Wrench className="w-5 h-5 text-brand-cyan" />;
      case 'srv-simulations':
        return <Globe className="w-5 h-5 text-brand-amber" />;
      case 'srv-ui-hud':
        return <Sparkles className="w-5 h-5 text-brand-primary" />;
      default:
        return <Gamepad className="w-5 h-5 text-brand-cyan" />;
    }
  };

  const handleServiceInquiry = (serviceTitle) => {
    playClick();
    onSelectService(serviceTitle);
    const element = document.getElementById('contact');
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-surface-950">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 font-mono text-xs text-brand-primary tracking-widest uppercase">
              <Wrench className="w-4 h-4 text-brand-primary" />
              <span>SPECIALIZED STACK // 2D & 3D GAME ENGINEERING</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase">
              ENGINEERING SERVICES
            </h2>
            <p className="text-slate-400 font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
              Complete 2D and 3D game development in Unity, responsive combat & hitbox engines, simulation systems, tactile game UI, and WebGL optimization for indie titles and game studios.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <div
              key={service.id}
              onMouseEnter={playHover}
              className="relative p-6 sm:p-7 bg-surface-900/90 border border-slate-800 hover:border-brand-primary cyber-chamfer flex flex-col justify-between transition-all duration-300 group hover:shadow-[0_0_25px_rgba(255,45,85,0.25)] space-y-6"
            >
              <div className="space-y-4">
                {/* Header Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-surface-950 border border-slate-800 flex items-center justify-center cyber-chamfer group-hover:border-brand-primary transition-colors">
                    {getIcon(service.id)}
                  </div>
                  <span className="font-mono text-[10px] text-brand-primary bg-brand-primary/10 border border-brand-primary/30 px-2 py-0.5 tracking-wider font-bold">
                    {service.badge}
                  </span>
                </div>

                {/* Titles */}
                <div>
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-brand-primary transition-colors tracking-tight">
                    {service.title}
                  </h3>
                  <p className="font-mono text-[11px] text-slate-400 mt-1 uppercase tracking-wider">
                    {service.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <span className="font-mono text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">
                    KEY DELIVERABLES:
                  </span>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions & Tech Pills */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5">
                  {service.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono text-slate-400 bg-surface-950 px-2 py-0.5 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleServiceInquiry(service.title)}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 bg-surface-950 hover:bg-brand-primary text-slate-300 hover:text-white border border-slate-700 hover:border-brand-primary font-mono text-xs font-bold tracking-wider cyber-chamfer transition-all duration-200"
                >
                  <span>INQUIRE SERVICE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
