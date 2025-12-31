import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

interface WaterControlsProps {
  currentIntake: number;
  onAdd: (amount: number) => void;
  percentage: number;
}

export const WaterControls: React.FC<WaterControlsProps> = ({ currentIntake, onAdd, percentage }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [showBubbles, setShowBubbles] = useState(false);
  const [prevIntake, setPrevIntake] = useState(currentIntake);

  useEffect(() => {
    if (currentIntake > prevIntake) {
      setShowBubbles(true);
      const timer = setTimeout(() => setShowBubbles(false), 2000);
      return () => clearTimeout(timer);
    }
    setPrevIntake(currentIntake);
  }, [currentIntake, prevIntake]);

  const handleClick = () => {
    // Haptic feedback for button press (short tap)
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(15);
    }

    setIsAdding(true);
    onAdd(0.5);
    // Reset animation state shortly after
    setTimeout(() => setIsAdding(false), 300);
  };

  return (
    <div className="flex justify-center items-end gap-12 mt-8">
      
      {/* Left Glass: Current Intake / Status */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-14 h-20 border-2 border-slate-700 dark:border-slate-400 rounded-b-lg rounded-t-sm relative overflow-hidden bg-white dark:bg-slate-800 transition-colors duration-300">
          {/* Water Level */}
          <div 
            className="absolute bottom-0 left-0 right-0 bg-blue-400 opacity-80 transition-all duration-700 ease-out"
            style={{ height: `${percentage}%` }} 
          >
             {/* Bubbles animation */}
             {showBubbles && (
                <>
                  <div className="absolute bottom-0 left-1/4 w-1.5 h-1.5 bg-white/60 rounded-full animate-[bubble_1.5s_ease-in-out_infinite]" />
                  <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-white/60 rounded-full animate-[bubble_1.2s_ease-in-out_infinite_0.2s]" />
                  <div className="absolute bottom-0 left-3/4 w-2 h-2 bg-white/60 rounded-full animate-[bubble_1.8s_ease-in-out_infinite_0.4s]" />
                </>
             )}
          </div>
          {/* Highlight */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-white/20 to-transparent pointer-events-none"></div>
        </div>
        <span className="text-slate-700 dark:text-slate-300 font-semibold transition-colors duration-300">{currentIntake.toFixed(1)} L</span>
      </div>

      {/* Right Glass: Add Water */}
      <div className="flex flex-col items-center gap-2 relative">
        <button 
          onClick={handleClick}
          className="group relative focus:outline-none transition-transform active:scale-95"
          aria-label="Add 0.5L water"
        >
            <div className="w-14 h-20 border-2 border-slate-700 dark:border-slate-400 rounded-b-lg rounded-t-sm relative overflow-hidden bg-white dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-slate-700 transition-colors duration-300">
               {/* Water inside button */}
               <div 
                className={`absolute bottom-0 left-0 right-0 bg-blue-400 opacity-80 transition-all duration-300 ease-out ${isAdding ? 'h-[65%]' : 'h-[50%]'}`}
              />
              {/* Ripple/Splash overlay */}
              {isAdding && (
                 <div className="absolute inset-0 bg-blue-300/30 animate-pulse" />
              )}
            </div>
            
            {/* Floating Plus Button */}
            <div className={`absolute bottom-2 -right-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white dark:border-slate-700 group-hover:bg-blue-600 transition-all duration-200 ${isAdding ? 'scale-110 rotate-90' : ''}`}>
              <Plus size={18} strokeWidth={3} />
            </div>
        </button>
        <span className="text-slate-700 dark:text-slate-300 font-semibold transition-colors duration-300">0.5</span>
      </div>

      {/* Styles for bubble animation */}
      <style>{`
        @keyframes bubble {
          0% { transform: translateY(20px) scale(0.5); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-40px) scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};