
import React from 'react';
import { Character } from '../types';

const characters: Character[] = [
  { name: 'Akram', role: 'Protagonist', color: 'text-blue-400', description: 'The visionary leader seeking balance. Akram is known for building alliances and maintaining order when chaos strikes.' },
  { name: 'Mk_Mikey', role: 'Protagonist', color: 'text-green-400', description: 'A master tactician and builder. Mikey ensures the Overworld remains a stronghold for the Guardians.' },
  { name: 'Tempest', role: 'Antagonist', color: 'text-red-500', description: 'A force of pure chaos. Tempest believes the world must burn for a new one to be born. Unpredictable and dangerous.' },
  { name: 'Pixeleified', role: 'Antagonist', color: 'text-purple-500', description: 'The weaver of shadows. Pixeleified operates from the darkness, manipulating events to suit their hidden agenda.' },
];

const LoreSection: React.FC = () => {
  return (
    <div className="space-y-16 py-12 relative">
      <div className="text-center">
        <h2 className="minecraft-font text-3xl mb-4 text-green-500">Legend of the Guardians</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">This isn't a script. It's life. Meet the forces driving the destiny of Dino Universe.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {characters.map((char) => (
          <div 
            key={char.name} 
            className="glass p-8 rounded-2xl border-l-8 hover:bg-slate-900 transition-all border-white/5 group relative overflow-hidden" 
            style={{ borderLeftColor: char.role === 'Protagonist' ? '#3b82f6' : '#ef4444' }}
          >
            {/* Ghost Message Easter Egg */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-5 transition-opacity duration-1000">
               <span className="minecraft-font text-xs text-white uppercase tracking-[1em] rotate-12">Who watches the watchers?</span>
            </div>

            <div className="flex justify-between items-start mb-4 relative z-10">
              <h3 className={`minecraft-font text-xl ${char.color}`}>{char.name}</h3>
              <span className={`text-[10px] minecraft-font px-2 py-1 rounded ${char.role === 'Protagonist' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'}`}>
                {char.role}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-lg relative z-10">
              {char.description}
            </p>
          </div>
        ))}
      </div>
      
      {/* Background phantom text */}
      <div className="absolute bottom-0 left-0 w-full text-center pointer-events-none opacity-10">
        <span className="minecraft-font text-[8px] text-slate-700 tracking-[2em]">THE VOID IS HUNGRY</span>
      </div>
    </div>
  );
};

export default LoreSection;
