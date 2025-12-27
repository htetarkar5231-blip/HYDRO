import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { getHydrationTip } from '../services/geminiService';

interface AiCoachProps {
  currentIntake: number;
}

export const AiCoach: React.FC<AiCoachProps> = ({ currentIntake }) => {
  const [tip, setTip] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetTip = async () => {
    setLoading(true);
    const newTip = await getHydrationTip(currentIntake);
    setTip(newTip);
    setLoading(false);
  };

  const closeTip = () => setTip(null);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!tip && (
        <button
          onClick={handleGetTip}
          disabled={loading}
          className="bg-white p-3 rounded-full shadow-lg border border-blue-100 text-blue-500 hover:bg-blue-50 transition-all active:scale-95 flex items-center gap-2"
        >
          {loading ? (
             <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Sparkles size={20} />
              <span className="text-sm font-medium pr-1">Coach</span>
            </>
          )}
        </button>
      )}

      {tip && (
        <div className="bg-white p-4 rounded-2xl shadow-xl border border-blue-100 max-w-xs animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-bold text-blue-600 flex items-center gap-1">
              <Sparkles size={14} /> Gemini Tip
            </h3>
            <button onClick={closeTip} className="text-slate-400 hover:text-slate-600">
              <X size={16} />
            </button>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed">
            {tip}
          </p>
        </div>
      )}
    </div>
  );
};
