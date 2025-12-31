import React, { useState } from 'react';
import { Sparkles, X, ExternalLink } from 'lucide-react';
import { getHydrationTip, TipResponse } from '../services/geminiService';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface AiCoachProps {
  currentIntake: number;
  language: Language;
}

export const AiCoach: React.FC<AiCoachProps> = ({ currentIntake, language }) => {
  const [tipData, setTipData] = useState<TipResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const t = getTranslation(language);

  const handleGetTip = async () => {
    setLoading(true);
    
    // Get current time string (e.g., "2:30 PM")
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    
    let location: { lat: number; lng: number } | undefined;

    // Try to get location for weather context
    try {
      if ("geolocation" in navigator) {
        // Create a promise wrapper for geolocation
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { 
            timeout: 4000,
            maximumAge: 60000 
          });
        }).catch(() => null); // Catch rejection to continue without location

        if (position) {
          location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        }
      }
    } catch (e) {
      console.log("Could not retrieve location, proceeding with time-only context.");
    }

    const data = await getHydrationTip(currentIntake, timeString, location, language);
    setTipData(data);
    setLoading(false);
  };

  const closeTip = () => setTipData(null);

  return (
    <div className="fixed bottom-6 right-6 z-30">
      {!tipData && (
        <button
          onClick={handleGetTip}
          disabled={loading}
          className="bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg border border-blue-100 dark:border-slate-700 text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all active:scale-95 flex items-center gap-2"
        >
          {loading ? (
             <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Sparkles size={20} />
              <span className="text-sm font-medium pr-1">{t.coach}</span>
            </>
          )}
        </button>
      )}

      {tipData && (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-blue-100 dark:border-slate-700 max-w-xs animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <Sparkles size={14} /> {t.geminiTip}
            </h3>
            <button onClick={closeTip} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X size={16} />
            </button>
          </div>
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            {tipData.text}
          </p>

          {/* Display Grounding Sources if available */}
          {tipData.sources && tipData.sources.length > 0 && (
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block mb-1">
                {t.sources}
              </span>
              <div className="flex flex-wrap gap-2">
                {tipData.sources.map((source, index) => (
                  <a
                    key={index}
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-0.5 truncate max-w-[150px]"
                  >
                    <ExternalLink size={8} />
                    {source.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};