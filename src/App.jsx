import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CyberCursor from './components/CyberCursor';
import MatrixCanvas from './components/MatrixCanvas';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import TitlesReel from './components/TitlesReel';
import ProjectsSection from './components/ProjectsSection';
import ProjectModal from './components/ProjectModal';
import ServicesSection from './components/ServicesSection';
import ProtocolSection from './components/ProtocolSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import TerminalDrawer from './components/TerminalDrawer';
import Footer from './components/Footer';
import { isSoundEnabled } from './utils/audio';

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState('');
  const [soundState, setSoundState] = useState(isSoundEnabled());

  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const handleCloseModal = () => {
    setSelectedProjectId(null);
  };

  const handleSelectService = (serviceTitle) => {
    setPrefilledService(serviceTitle);
  };

  return (
    <div className="relative min-h-screen bg-surface-950 text-slate-300 font-sans selection:bg-brand-primary selection:text-white">
      {/* Interactive Custom Cyber Cursor */}
      <CyberCursor />

      {/* Dynamic 60fps Particle Constellation Background */}
      <MatrixCanvas />

      {/* Scanline CRT overlay for futuristic texture */}
      <div className="scanlines-overlay fixed inset-0 z-30 opacity-40 pointer-events-none" />

      {/* Tactical HUD Header */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        soundState={soundState}
        setSoundState={setSoundState}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection onOpenTerminal={() => setIsTerminalOpen(true)} />
        <StatsSection />
        <TitlesReel onSelectProject={handleSelectProject} />
        <ProjectsSection onSelectProject={handleSelectProject} />
        <ServicesSection onSelectService={handleSelectService} />
        <ProtocolSection />
        <ExperienceSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection prefilledService={prefilledService} />
      </main>

      {/* Footer */}
      <Footer onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Interactive Case Study Modal */}
      <ProjectModal
        projectId={selectedProjectId}
        onClose={handleCloseModal}
      />

      {/* Interactive Cyber CLI Terminal Drawer */}
      <TerminalDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}
