
import React from 'react';
import { HistoryEvent } from '../types';

const historyData: HistoryEvent[] = [
  { year: '1969', title: 'Stonewall Uprising', description: 'A turning point in the modern LGBTQ+ rights movement, led by Marsha P. Johnson, Sylvia Rivera, and many others in NYC.' },
  { year: '1978', title: 'Gilbert Baker Design', description: 'The first Rainbow Flag is flown at San Francisco Gay Freedom Day, designed as a symbol of hope and community.' },
  { year: '1990', title: 'WHO Declassification', description: 'The World Health Organization removes homosexuality from its list of mental diseases, a major step for global rights.' },
  { year: '2015', title: 'Marriage Equality (US)', description: 'Obergefell v. Hodges makes same-sex marriage legal across all 50 U.S. states.' },
  { year: '2020', title: 'Bostock Decision', description: 'The U.S. Supreme Court rules that firing someone for being LGBTQ+ is illegal discrimination.' },
];

const HistoryTimeline: React.FC = () => {
  return (
    <div className="space-y-12 py-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl font-extrabold mb-4">Our Shared History</h2>
        <p className="text-slate-400">Remembering the giants whose shoulders we stand on and the milestones that paved our path forward.</p>
      </div>
      
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-gradient-to-b from-purple-500 via-pink-500 to-transparent hidden md:block"></div>
        
        {historyData.map((event, index) => (
          <div key={index} className={`relative flex items-center justify-between mb-12 w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="hidden md:block w-5/12"></div>
            
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10 hidden md:block"></div>
            
            <div className="w-full md:w-5/12 glass p-6 rounded-2xl hover:scale-[1.02] transition-transform duration-300">
              <span className="text-purple-400 font-bold text-lg mb-2 block">{event.year}</span>
              <h4 className="text-xl font-bold mb-2 text-white">{event.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryTimeline;
