import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, CornerDownLeft, Sparkles } from 'lucide-react';
import { personalData, caseStudies, skillCategories, experienceData } from '../data/portfolioData';
import { playClick, playChirp, playError } from '../utils/audio';

export default function TerminalDrawer({ isOpen, onClose }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'AP-OS v4.2 [CYBER_KERNEL_INITIALIZED]' },
    { type: 'system', text: 'Type "help" to inspect all operational commands.' }
  ]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, history]);

  // Global key listener for `~`
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        playClick();
        if (isOpen) onClose();
        else onClose(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [isOpen, onClose]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    playClick();
    const newHistory = [...history, { type: 'user', text: `$ ${inputVal}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'response',
          text: `AVAILABLE COMMANDS:
  help        - Display command matrix
  about       - Operator bio & Unity focus
  skills      - Complete Unity 2D & 3D engineering stack
  projects    - List shipped titles & case studies
  itchio      - Playable games on itch.io
  experience  - Career timeline & milestones
  education   - North South University (NSU) CSE degree
  contact     - Display transmission coordinates & email
  hire        - Availability & contract status
  clear       - Wipe terminal screen
  exit        - Terminate terminal session`
        });
        break;

      case 'about':
        newHistory.push({
          type: 'response',
          text: `OPERATOR: ${personalData.name}
CALLSIGN: ${personalData.callsign}
ROLE: ${personalData.heroSubtitle}
LOCATION: ${personalData.location} (${personalData.coordinates})
BIO: ${personalData.bioParagraph1}`
        });
        break;

      case 'skills':
        const skillsFormatted = skillCategories
          .map((c) => `// ${c.category}:\n   ${c.skills.map((s) => `${s.name} (${s.level})`).join(', ')}`)
          .join('\n\n');
        newHistory.push({ type: 'response', text: skillsFormatted });
        break;

      case 'projects':
        const projectsList = caseStudies
          .map((p, i) => `[0${i + 1}] ${p.title} (${p.category} // ${p.period})`)
          .join('\n');
        newHistory.push({ type: 'response', text: `SHIPPED SYSTEMS ARCHIVE:\n${projectsList}` });
        break;

      case 'experience':
        const expList = experienceData
          .map((e) => `* ${e.role} @ ${e.company} [${e.period}]`)
          .join('\n');
        newHistory.push({ type: 'response', text: `CAREER TIMELINE:\n${expList}` });
        break;

      case 'education':
        newHistory.push({
          type: 'response',
          text: `DEGREE: ${personalData.education.degree}
INSTITUTE: ${personalData.education.institute}
PERIOD: ${personalData.education.year}
SPECIALIZATION: ${personalData.education.specialization}`
        });
        break;

      case 'itchio':
        newHistory.push({
          type: 'response',
          text: `ITCH.IO PROFILE: https://anik-pal.itch.io/
PLAYABLE GAMES:
  * Lost In Mind (Survival Horror, WebGL)
  * DONT_T_DISCONNECT (Simulation Puzzle, WebGL)
  * Fighting 3D Game (Tekken Clone, Windows)
  * LockOutTagOut (Safety Training, WebGL)
  * NightShade (Action RPG, Windows)
  * I Like To Move It (3D Physics Platformer, WebGL)
  * Candy Crush Clone (Match-3, WebGL)
  * Golf Game (3D Sports Physics, WebGL)
  * Draw Game (2D Physics & Puzzle, WebGL)`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'response',
          text: `EMAIL: ${personalData.email}
COORDINATES: ${personalData.coordinates}
ITCH.IO: ${personalData.itchio}
GITHUB: ${personalData.github}
LINKEDIN: ${personalData.linkedin}`
        });
        break;

      case 'hire':
        newHistory.push({
          type: 'response',
          text: `STATUS: ONLINE // AVAILABLE FOR CONTRACT & FULL-TIME ENGAGEMENTS
ACCEPTED ROLES: Unity Game Developer (2D & 3D), Gameplay Programmer, Combat & Physics Systems Engineer.`
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        return;

      default:
        playError();
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" for available commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-2 sm:p-4 max-w-4xl mx-auto font-mono text-xs animate-in slide-in-from-bottom-5 duration-200">
      <div className="bg-surface-950/95 border border-brand-cyan/60 backdrop-blur-xl cyber-chamfer shadow-[0_0_35px_rgba(0,240,255,0.25)] flex flex-col h-[380px] overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-surface-900 border-b border-brand-cyan/20">
          <div className="flex items-center space-x-2 text-brand-cyan font-bold">
            <TerminalIcon className="w-4 h-4" />
            <span>AP-OS TELEMETRY CLI [PORT_9026]</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-[10px] text-slate-500">PRESS [~] OR [ESC] TO EXIT</span>
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="text-slate-400 hover:text-white p-1 hover:bg-surface-800 rounded-sm"
            >
              <X className="w-4 h-4 text-brand-primary" />
            </button>
          </div>
        </div>

        {/* Terminal Log Output */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 text-slate-300">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`leading-relaxed whitespace-pre-wrap ${
                line.type === 'user'
                  ? 'text-brand-cyan font-bold'
                  : line.type === 'error'
                  ? 'text-brand-primary'
                  : line.type === 'system'
                  ? 'text-slate-500'
                  : 'text-slate-300'
              }`}
            >
              {line.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input prompt */}
        <form
          onSubmit={handleCommand}
          className="p-3 bg-surface-900/80 border-t border-brand-cyan/20 flex items-center space-x-2"
        >
          <span className="text-brand-primary font-bold">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'skills', 'projects', 'contact'..."
            className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder-slate-600 text-xs"
          />
          <button
            type="submit"
            className="p-1 text-brand-cyan hover:text-white"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
