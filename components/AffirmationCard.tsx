
import React, { useState, useEffect } from 'react';
import { getDailyAffirmation } from '../services/geminiService';

const AffirmationCard: React.FC = () => {
  const [affirmation, setAffirmation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [mood, setMood] = useState<string>('uplifting');

  const fetchAffirmation = async (selectedMood?: string) => {
    setLoading(true);
    const text = await getDailyAffirmation(selectedMood || mood);
    setAffirmation(text);
    setLoading(false);
  };

  useEffect(() => {
    fetchAffirmation();
  }, []);

  const moods = [
    { label: 'Uplifting', value: 'uplifting', icon: '✨' },
    { label: 'Strong', value: 'powerful', icon: '🛡️' },
    { label: 'Calm', value: 'peaceful', icon: '🌊' },
    { label: 'Loved', value: 'cherished', icon: '❤️' },
  ];

  return (
    <div className="rainbow-border p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
      <h3 className="text-xl font-semibold mb-6 text-slate-400 uppercase tracking-widest">Today's Affirmation</h3>
      
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 animate-pulse italic">Connecting to the heart of things...</p>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-8 max-w-2xl text-slate-100">
            "{affirmation}"
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {moods.map((m) => (
              <button
                key={m.value}
                onClick={() => {
                  setMood(m.value);
                  fetchAffirmation(m.value);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  mood === m.value 
                    ? 'border-purple-500 bg-purple-500/10 text-purple-300' 
                    : 'border-white/10 hover:border-white/30 text-slate-400'
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      <button 
        onClick={() => fetchAffirmation()}
        disabled={loading}
        className="mt-12 text-sm text-slate-500 hover:text-white transition-colors underline underline-offset-4"
      >
        Give me another one
      </button>
    </div>
  );
};

export default AffirmationCard;
