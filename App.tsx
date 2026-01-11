
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProphecyCard from './components/ProphecyCard';
import LoreSection from './components/LoreSection';
import JoinSection from './components/JoinSection';
import { Section } from './types';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.HOME);

  useEffect(() => {
    const playMusic = () => {
      const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3');
      audio.volume = 0.05;
      audio.loop = true;
    };
    window.addEventListener('click', playMusic, { once: true });
  }, []);

  const renderContent = () => {
    switch (currentSection) {
      case Section.HOME:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
            <section className="py-24 text-center relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[140px] -z-10 animate-pulse"></div>
              
              <div className="inline-block px-5 py-2 bg-green-600/10 rounded-full border border-green-500/30 text-[10px] minecraft-font text-green-400 mb-10 animate-float uppercase tracking-widest">
                The Fabric of Dimensions
              </div>

              <h2 className="text-7xl md:text-[9rem] font-black mb-10 tracking-tighter minecraft-font leading-none text-white drop-shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                DINO<br />
                <span className="text-green-500 relative">
                  UNIVERSE
                  <span className="absolute -bottom-4 right-0 text-xs minecraft-font text-slate-500 tracking-normal opacity-50">v1.3</span>
                </span>
              </h2>
              
              <p className="text-2xl text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed px-4 font-medium italic">
                A living world with zero scripts. No fake drama, just the raw collision of three ancient guardian factions in the ultimate Minecraft sandbox.
              </p>
              
              <div className="flex flex-wrap justify-center gap-8">
                <button 
                  onClick={() => setCurrentSection(Section.JOIN)}
                  className="px-12 py-6 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-[0_8px_0_#166534] hover:shadow-[0_4px_0_#166534] hover:translate-y-1 transition-all minecraft-font text-sm group"
                >
                  <span className="flex items-center gap-3">
                    ENTER VOID
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </span>
                </button>
                <button 
                  onClick={() => setCurrentSection(Section.TEAMS)}
                  className="px-12 py-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-[0_8px_0_#0f172a] hover:shadow-[0_4px_0_#0f172a] hover:translate-y-1 transition-all minecraft-font text-sm border border-white/5"
                >
                  FACTIONS
                </button>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-20">
              <div className="glass p-10 rounded-3xl border-2 border-white/5 group hover:border-green-500/30 transition-all shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/5 rounded-full blur-3xl"></div>
                <h3 className="minecraft-font text-xl mb-6 text-green-400">UNSCRIPTED REALITY</h3>
                <p className="text-slate-400 leading-relaxed text-xl mb-10">
                  Witness alliances rise and fall in the heat of battle. Our server is 100% natural survival—no pre-planned story beats, only player-driven consequences.
                </p>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-green-500/10 rounded-xl border border-green-500/30 flex items-center justify-center text-3xl shadow-lg">🌱</div>
                  <div>
                    <div className="text-sm minecraft-font text-slate-200 uppercase">Vanilla Core</div>
                    <div className="text-[10px] minecraft-font text-slate-500 uppercase">Hardcore PVE</div>
                  </div>
                </div>
              </div>
              <ProphecyCard />
            </div>
          </div>
        );
      case Section.TEAMS:
        return (
          <div className="py-16 animate-in fade-in slide-in-from-bottom-12 duration-500">
            <h2 className="minecraft-font text-5xl text-center mb-24 text-white underline underline-offset-[20px] decoration-green-500 decoration-4">THE FACTIONS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="glass p-12 rounded-3xl group transition-all hover:-translate-y-2 border-2 border-red-500/10">
                <div className="w-20 h-20 bg-red-600 rounded-2xl mb-8 flex items-center justify-center text-5xl shadow-2xl group-hover:scale-110 transition-transform">🔥</div>
                <h3 className="minecraft-font text-2xl mb-6 text-red-500">Nether Guardians</h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">Masters of the flame and obsidian. They guard the gates of hell and harness the power of the Wither.</p>
                <div className="space-y-3">
                   <div className="text-[10px] minecraft-font text-slate-500 flex items-center gap-2 uppercase"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Combat specialists</div>
                </div>
              </div>
              <div className="glass p-12 rounded-3xl group transition-all scale-105 border-2 border-green-500 shadow-2xl">
                <div className="w-20 h-20 bg-green-600 rounded-2xl mb-8 flex items-center justify-center text-5xl shadow-2xl group-hover:scale-110 transition-transform">🌳</div>
                <h3 className="minecraft-font text-2xl mb-6 text-green-400">Overworld Guardians</h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">Protectors of the surface world. They seek balance with nature and specialize in massive builds.</p>
                <div className="space-y-3">
                   <div className="text-[10px] minecraft-font text-slate-200 flex items-center gap-2 uppercase"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span> Civilized builds</div>
                </div>
              </div>
              <div className="glass p-12 rounded-3xl group transition-all hover:-translate-y-2 border-2 border-purple-500/10">
                <div className="w-20 h-20 bg-purple-600 rounded-2xl mb-8 flex items-center justify-center text-5xl shadow-2xl group-hover:scale-110 transition-transform">🌌</div>
                <h3 className="minecraft-font text-2xl mb-6 text-purple-400">End Guardians</h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">Wanderers of the void. They possess the secret of flight and command End City technology.</p>
                <div className="space-y-3">
                   <div className="text-[10px] minecraft-font text-slate-500 flex items-center gap-2 uppercase"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span> Void explorers</div>
                </div>
              </div>
            </div>
          </div>
        );
      case Section.LORE:
        return <LoreSection />;
      case Section.JOIN:
        return <JoinSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen selection:bg-green-500/30">
      <Header currentSection={currentSection} onNavigate={setCurrentSection} />
      
      <main className="max-w-7xl mx-auto px-6 py-12 pb-32">
        {renderContent()}
      </main>

      <footer className="border-t border-white/5 py-24 px-6 glass mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-4">
             <div className="minecraft-font text-3xl text-green-500 tracking-tighter">DINO UNIVERSE SMP</div>
             <p className="text-slate-500 text-[10px] minecraft-font uppercase tracking-[0.3em] text-center">
               © 2024 DINO UNIVERSE. NOT AN OFFICIAL MINECRAFT PRODUCT. NO SCRIPTS. ALL NATURAL.
             </p>
          </div>
          <div className="text-[8px] minecraft-font text-slate-800 uppercase tracking-widest">
            Aternos Powered • Minecraft Vanilla
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
