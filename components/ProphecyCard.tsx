
import React, { useState, useEffect } from 'react';
import { getDailyProphecy } from '../services/geminiService';

const ProphecyCard: React.FC = () => {
  const [prophecy, setProphecy] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [team, setTeam] = useState<string>('Overworld Guardians');

  const fetchProphecy = async (selectedTeam?: string) => {
    setLoading(true);
    const text = await getDailyProphecy(selectedTeam || team);
    setProphecy(text);
    setLoading(false);
  };

  useEffect(() => {
    fetchProphecy();
  }, []);

  const teams = [
    { label: 'Nether', value: 'Nether Guardians', color: 'text-red-500 border-red-900' },
    { label: 'Overworld', value: 'Overworld Guardians', color: 'text-green-500 border-green-900' },
    { label: 'End', value: 'End Guardians', color: 'text-purple-500 border-purple-900' },
  ];

  return (
    <div className="glass p-8 rounded-xl border border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z"/></svg>
      </div>
      
      <h3 className="minecraft-font text-sm mb-8 text-slate-500 uppercase tracking-widest">Oracle Prophecy</h3>
      
      {loading ? (
        <div className="flex flex-col items-center py-10">
          <div className="w-10 h-10 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 italic text-sm">Consulting the ancient files...</p>
        </div>
      ) : (
        <div className="animate-in fade-in duration-700">
          <p className="text-xl md:text-2xl font-medium leading-relaxed mb-10 text-slate-200 border-l-4 border-green-500 pl-6 italic">
            "{prophecy}"
          </p>
          
          <div className="flex flex-wrap gap-3">
            {teams.map((t) => (
              <button
                key={t.value}
                onClick={() => {
                  setTeam(t.value);
                  fetchProphecy(t.value);
                }}
                className={`px-4 py-2 rounded text-xs minecraft-font border transition-all ${
                  team === t.value 
                    ? `bg-slate-800 ${t.color}` 
                    : 'border-white/5 hover:bg-white/5 text-slate-600'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProphecyCard;
