
import React, { useState } from 'react';
import { Section } from '../types';

interface HeaderProps {
  currentSection: Section;
  onNavigate: (section: Section) => void;
}

const Header: React.FC<HeaderProps> = ({ currentSection, onNavigate }) => {
  const [clickCount, setClickCount] = useState(0);
  const [glitch, setGlitch] = useState(false);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === 5) {
      setGlitch(true);
      setTimeout(() => {
        setGlitch(false);
        setClickCount(0);
      }, 5000);
    }
    onNavigate(Section.HOME);
  };

  return (
    <header className={`sticky top-0 z-50 glass border-b border-white/5 px-6 py-4 transition-all duration-300 ${glitch ? 'animate-pulse bg-red-900/20 border-red-500/50' : ''}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={handleLogoClick}
        >
          <div className={`w-10 h-10 rounded flex items-center justify-center shadow-lg group-hover:rotate-12 transition-all border-2 ${glitch ? 'bg-red-600 border-red-400 rotate-180' : 'bg-green-600 border-green-400'}`}>
            <span className="text-white font-bold minecraft-font text-xs">{glitch ? '?' : 'D'}</span>
          </div>
          <h1 className={`text-2xl font-bold tracking-widest minecraft-font transition-all ${glitch ? 'text-red-500 animate-bounce' : 'text-green-500 group-hover:text-green-400'}`}>
            {glitch ? 'SYSTEM FAILURE' : 'DINO UNIVERSE'}
          </h1>
        </div>
        
        <nav className="flex items-center gap-2 md:gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {[
            { id: Section.HOME, label: 'HUB' },
            { id: Section.TEAMS, label: 'TEAMS' },
            { id: Section.LORE, label: 'LORE' },
            { id: Section.JOIN, label: 'JOIN' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-6 py-2 rounded uppercase text-xs minecraft-font transition-all whitespace-nowrap border-b-4 ${
                currentSection === item.id 
                  ? (glitch ? 'bg-red-600 text-white border-red-800' : 'bg-green-600 text-white border-green-800')
                  : 'text-slate-500 border-transparent hover:text-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      {glitch && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <span className="minecraft-font text-[10px] text-red-500 opacity-30 animate-ping">CRITICAL ERROR</span>
        </div>
      )}
    </header>
  );
};

export default Header;
