
import React, { useState, useEffect } from 'react';
import { searchServerTipsStream } from '../services/geminiService';

const DinoLogo = () => (
  <svg width="24" height="24" viewBox="0 0 100 100" className="text-white fill-current">
    <path d="M50 5 L60 40 L95 50 L60 60 L50 95 L40 60 L5 50 L40 40 Z" />
    <circle cx="50" cy="50" r="10" className="fill-slate-900" />
  </svg>
);

const CrossedSwordsIcon = () => (
  <svg width="120" height="120" viewBox="0 0 32 32" className="drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
    {/* Sword 1 (Bottom Left to Top Right) */}
    <g transform="rotate(45 16 16)">
      <rect x="14" y="4" width="4" height="18" fill="#22d3ee" stroke="#0891b2" strokeWidth="0.5" />
      <rect x="12" y="22" width="8" height="2" fill="#713f12" />
      <rect x="14" y="24" width="4" height="4" fill="#a16207" />
      <rect x="15" y="28" width="2" height="2" fill="#22d3ee" />
    </g>
    {/* Sword 2 (Bottom Right to Top Left) */}
    <g transform="rotate(-45 16 16)">
      <rect x="14" y="4" width="4" height="18" fill="#22d3ee" stroke="#0891b2" strokeWidth="0.5" />
      <rect x="12" y="22" width="8" height="2" fill="#713f12" />
      <rect x="14" y="24" width="4" height="4" fill="#a16207" />
      <rect x="15" y="28" width="2" height="2" fill="#22d3ee" />
    </g>
  </svg>
);

const JoinSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [streamingText, setStreamingText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [terminalOverride, setTerminalOverride] = useState(false);

  const analysisPhases = [
    "WAKING UP THE CORE...",
    "SCANNING FACTION BOUNDARIES...",
    "ANALYZING BIOME DATA...",
    "SYNCING WITH THE VOID...",
    "PREPARING INTEL..."
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isAnalyzing || isStreaming) return;
    
    setStreamingText('');
    setAnalysisLogs([]);
    setIsAnalyzing(true);
    setHasStarted(true);
    setTerminalOverride(false);

    // Easter Egg: /op command
    if (query.toLowerCase() === '/op') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnalysisLogs(["ACCESS DENIED", "UNAUTHORIZED COMMAND", "ATTEMPTING TERMINAL OVERRIDE...", "ERROR: ADMIN RIGHTS ENCRYPTED"]);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTerminalOverride(true);
      setIsAnalyzing(false);
      setStreamingText("Nice try. I'm the only one with operator status in this console. Maybe if you ask nicely I'll show you where the Nether Guardians hide their diamonds.");
      return;
    }

    // Visual Analysis Phase
    for (let i = 0; i < analysisPhases.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisLogs(prev => [...prev, analysisPhases[i]]);
    }

    setIsAnalyzing(false);
    setIsStreaming(true);

    const stream = searchServerTipsStream(query);
    
    try {
      for await (const chunk of stream) {
        setStreamingText(prev => prev + chunk);
      }
    } catch (err) {
      setStreamingText("The connection was lost... maybe the End Guardians are jamming the signal.");
    } finally {
      setIsStreaming(false);
    }
  };

  const copyIP = () => {
    navigator.clipboard.writeText("DinoUniverse.aternos.me:61641");
    alert("Server IP copied!");
  };

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12">
      {/* Join Card */}
      <div className="glass p-10 rounded-3xl border-2 border-green-500/30 overflow-hidden relative group animate-float shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse"></div>
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <h2 className="minecraft-font text-2xl mb-8 tracking-tighter text-white">READY TO JOIN?</h2>
            <div className="space-y-6 mb-10">
              <div className="flex flex-col group/ip">
                <span className="text-[10px] minecraft-font text-slate-500 mb-2 uppercase tracking-widest">Server Address</span>
                <div className="flex gap-2 p-1 bg-slate-950 rounded-lg border border-white/5 group-hover/ip:border-green-500/50 transition-all">
                  <code className="px-4 py-3 text-green-400 font-mono text-lg flex-1 truncate">
                    DinoUniverse.aternos.me:61641
                  </code>
                  <button 
                    onClick={copyIP}
                    className="bg-slate-800 hover:bg-green-600 px-6 rounded-md transition-all text-[10px] minecraft-font text-white"
                  >
                    COPY
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-20 animate-pulse"></div>
            <div className="bg-slate-950/50 rounded-full p-4 border border-white/5 shadow-2xl transform transition-all group-hover:scale-110">
              <CrossedSwordsIcon />
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-4 justify-center">
          <div className="h-px bg-gradient-to-r from-transparent to-green-500/30 flex-1"></div>
          <h3 className="minecraft-font text-lg text-green-400">CONSOLE AI</h3>
          <div className="h-px bg-gradient-to-l from-transparent to-green-500/30 flex-1"></div>
        </div>
        
        <form onSubmit={handleSearch} className="flex flex-col gap-3">
          <div className="relative">
            <input
              type="text"
              value={query}
              disabled={isAnalyzing || isStreaming}
              placeholder="Ask me anything... try /op for fun."
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-950/80 border-2 border-white/5 px-8 py-4 rounded-2xl text-white focus:outline-none focus:border-green-500/50 transition-all text-lg shadow-inner disabled:opacity-50 minecraft-font placeholder:opacity-30 placeholder:text-xs"
            />
            <button 
              type="submit"
              disabled={isAnalyzing || isStreaming}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-500 p-3 rounded-xl transition-all group disabled:bg-slate-800 disabled:cursor-not-allowed"
            >
               <svg className={`w-5 h-5 text-white ${(isAnalyzing || isStreaming) ? 'animate-spin' : 'group-hover:scale-110'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 {(isAnalyzing || isStreaming) ? (
                   <circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25" />
                 ) : (
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                 )}
               </svg>
            </button>
          </div>
        </form>

        {hasStarted && (
          <div className={`glass p-8 rounded-3xl border shadow-2xl relative overflow-hidden animate-slide-in transition-all duration-500 ${terminalOverride ? 'border-red-500 shadow-red-500/20' : 'border-green-500/20'}`}>
            <div className="flex gap-5">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 bg-slate-900 rounded-lg border flex items-center justify-center shadow-lg transform rotate-[-3deg] transition-colors ${terminalOverride ? 'border-red-500' : 'border-white/10'}`}>
                  {terminalOverride ? <span className="text-red-500 font-bold">!</span> : <DinoLogo />}
                </div>
              </div>
              <div className="flex-1">
                <div className={`minecraft-font text-[9px] mb-4 uppercase tracking-widest opacity-60 flex items-center gap-2 transition-colors ${terminalOverride ? 'text-red-500' : 'text-green-500'}`}>
                  {isAnalyzing ? "Analyzing the Fabric..." : terminalOverride ? "CORE OVERRIDE" : "Console Guide"}
                  {(isAnalyzing || isStreaming) && <span className="flex gap-1"><span className={`w-1 h-1 rounded-full animate-pulse ${terminalOverride ? 'bg-red-500' : 'bg-green-500'}`}></span><span className={`w-1 h-1 rounded-full animate-pulse delay-75 ${terminalOverride ? 'bg-red-500' : 'bg-green-500'}`}></span><span className={`w-1 h-1 rounded-full animate-pulse delay-150 ${terminalOverride ? 'bg-red-500' : 'bg-green-500'}`}></span></span>}
                </div>
                
                {isAnalyzing ? (
                  <div className="space-y-3 py-2">
                    {analysisLogs.map((log, i) => (
                      <div key={i} className={`text-[9px] minecraft-font opacity-80 animate-in fade-in slide-in-from-left-2 ${log.includes('ERROR') ? 'text-red-500' : 'text-green-400'}`}>
                        {log}
                      </div>
                    ))}
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-6">
                      <div className="h-full bg-green-500 transition-all duration-700 shadow-[0_0_10px_#22c55e]" style={{ width: `${(analysisLogs.length / analysisPhases.length) * 100}%` }}></div>
                    </div>
                  </div>
                ) : (
                  <div className={`leading-relaxed text-sm minecraft-font selection:bg-green-500/40 relative tracking-tighter ${terminalOverride ? 'text-red-400 italic' : 'text-slate-200'}`}>
                    {streamingText}
                    {isStreaming && (
                      <span className={`inline-block w-2 h-3 ml-1 animate-pulse align-middle ${terminalOverride ? 'bg-red-500' : 'bg-green-500'}`}></span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinSection;
