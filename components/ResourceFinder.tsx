
import React, { useState } from 'react';
import { getResourcesWithSearch } from '../services/geminiService';

const ResourceFinder: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ text: string, links: any[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    const data = await getResourcesWithSearch(query);
    setResult(data);
    setLoading(false);
  };

  const suggestions = ["Youth support", "Global rights organizations", "Mental health", "Trans advocacy"];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-4">Support & Resources</h2>
        <p className="text-slate-400">Find organizations and help centers tailored to your needs using AI-powered search.</p>
      </div>

      <div className="glass p-8 rounded-3xl mb-8 border border-white/5">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for 'trans youth support' or 'Pride in Berlin'..."
            className="flex-1 bg-slate-900/50 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Search'
            )}
          </button>
        </form>

        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-sm text-slate-500 self-center mr-2">Quick help:</span>
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => { setQuery(s); }}
              className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-slate-400 hover:bg-white/5 hover:text-white transition-all"
            >
              {s}
            </button>
          ))}
        </div>

        {result && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{result.text}</p>
            </div>
            
            {result.links.length > 0 && (
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Sources & Links</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.web.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
                    >
                      <span className="text-sm font-medium text-purple-300 group-hover:text-purple-200 truncate pr-4">
                        {link.web.title || 'Visit Resource'}
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex items-center gap-4">
        <div className="p-3 bg-red-500/20 rounded-full text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h4 className="font-bold text-red-200">Need immediate help?</h4>
          <p className="text-sm text-red-300/80">If you are in crisis, contact The Trevor Project (1-866-488-7386) or Crisis Text Line (Text HOME to 741741).</p>
        </div>
      </div>
    </div>
  );
};

export default ResourceFinder;
