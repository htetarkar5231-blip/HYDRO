import React from 'react';
import { Plus } from 'lucide-react';

interface WaterControlsProps {
  currentIntake: number;
  onAdd: (amount: number) => void;
  percentage: number;
}

export const WaterControls: React.FC<WaterControlsProps> = ({ currentIntake, onAdd, percentage }) => {
  return (
    <div className="flex justify-center items-end gap-12 mt-8">
      
      {/* Left Glass: Current Intake / Status */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-14 h-20 border-2 border-slate-700 rounded-b-lg rounded-t-sm relative overflow-hidden bg-white">
          {/* Water Level */}
          <div 
            className="absolute bottom-0 left-0 right-0 bg-blue-400 opacity-80 transition-all duration-500"
            style={{ height: `${percentage}%` }} 
          />
          {/* Highlight */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-white/20 to-transparent pointer-events-none"></div>
        </div>
        <span className="text-slate-700 font-semibold">{currentIntake.toFixed(1)} L</span>
      </div>

      {/* Right Glass: Add Water */}
      <div className="flex flex-col items-center gap-2 relative">
        <button 
          onClick={() => onAdd(0.5)}
          className="group relative focus:outline-none transition-transform active:scale-95"
          aria-label="Add 0.5L water"
        >
            <div className="w-14 h-20 border-2 border-slate-700 rounded-b-lg rounded-t-sm relative overflow-hidden bg-white group-hover:bg-blue-50 transition-colors">
               <div 
                className="absolute bottom-0 left-0 right-0 bg-blue-400 opacity-80"
                style={{ height: '50%' }} 
              />
            </div>
            
            {/* Floating Plus Button */}
            <div className="absolute bottom-2 -right-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white group-hover:bg-blue-600 transition-colors">
              <Plus size={18} strokeWidth={3} />
            </div>
        </button>
        <span className="text-slate-700 font-semibold">0.5</span>
      </div>

    </div>
  );
};