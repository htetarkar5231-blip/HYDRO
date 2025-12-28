import React, { useState } from 'react';
import { Leaf, Menu, Trophy } from 'lucide-react';
import { CircularProgress } from './components/CircularProgress';
import { WaterControls } from './components/WaterControls';
import { DailyChart } from './components/DailyChart';
import { AiCoach } from './components/AiCoach';
import { Sidebar } from './components/Sidebar';
import { DailyData } from './types';
import { playWaterSound, playSuccessSound } from './utils/soundUtils';

// Mock data for the chart
const chartData: DailyData[] = [
  { day: 'Mon', amount: 1.2 },
  { day: 'Tue', amount: 1.4 },
  { day: 'Wed', amount: 1.8 },
  { day: 'Thu', amount: 1.5 },
  { day: 'Fri', amount: 2.1 },
];

const App: React.FC = () => {
  const [currentIntake, setCurrentIntake] = useState(1.5);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const goal = 3.0;
  
  // Calculate percentage capped at 100 for visual sanity
  const percentage = Math.min((currentIntake / goal) * 100, 100);

  const handleAddWater = (amount: number) => {
    playWaterSound();
    
    const newIntake = parseFloat((currentIntake + amount).toFixed(1));
    setCurrentIntake(newIntake);

    // Check if goal reached (and not already celebrated this session)
    if (newIntake >= goal && !hasCelebrated) {
      setHasCelebrated(true);
      // Small delay to let the UI update and water sound finish
      setTimeout(() => {
        setShowCongrats(true);
        playSuccessSound();
      }, 600);
    }
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-[#F0F9FF] dark:bg-slate-900 flex items-center justify-center font-sans p-4 transition-colors duration-300">
        
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          theme={theme}
          setTheme={setTheme}
        />

        {/* Success Modal */}
        {showCongrats && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-in fade-in duration-300">
             <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-sm w-full shadow-2xl transform animate-in zoom-in-95 duration-200 text-center border border-white/20">
                <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-10 h-10 text-yellow-500 fill-yellow-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Congratulations!</h2>
                <p className="text-slate-600 dark:text-slate-300 mb-8 font-medium">
                    Congratulation you have completed today
                </p>
                <button 
                    onClick={() => setShowCongrats(false)}
                    className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                >
                    Awesome!
                </button>
             </div>
          </div>
        )}

        {/* Mobile Frame Container */}
        <div className="w-full max-w-[400px] bg-[#F0F9FF] dark:bg-slate-900 min-h-[800px] relative flex flex-col transition-colors duration-300">
          
          {/* Top Bar with Menu Icon */}
          <div className="flex justify-between items-center px-6 py-4 text-slate-800 dark:text-slate-300 text-xs font-semibold">
             <button 
               onClick={() => setIsSidebarOpen(true)}
               className="p-2 -ml-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
               aria-label="Open settings"
             >
                <Menu size={24} />
             </button>
             
             {/* Status Indicators Mock */}
             <div className="flex gap-1 items-center">
               <div className="h-3 w-3 bg-slate-800 dark:bg-slate-400 rounded-sm opacity-20"></div>
               <div className="h-3 w-3 bg-slate-800 dark:bg-slate-400 rounded-sm opacity-60"></div>
               <div className="h-3 w-3 bg-slate-800 dark:bg-slate-400 rounded-sm"></div>
             </div>
          </div>

          {/* Header */}
          <header className="mt-4 mb-8 text-center px-8 relative">
            <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight leading-tight transition-colors duration-300">
              DRINKING<br />
              ENOUGH WATER
            </h1>
            <Leaf 
              className="absolute top-8 right-8 text-green-500 fill-green-500 transform rotate-12" 
              size={28} 
            />
          </header>

          {/* Main Circular Progress */}
          <main className="flex-1 flex flex-col items-center">
            <CircularProgress percentage={percentage} />
            
            {/* Controls */}
            <WaterControls 
              currentIntake={currentIntake} 
              onAdd={handleAddWater} 
              percentage={percentage} 
            />

            {/* Chart */}
            <DailyChart data={chartData} isDarkMode={theme === 'dark'} />
          </main>

          {/* AI Assistant */}
          <AiCoach currentIntake={currentIntake} />

        </div>
      </div>
    </div>
  );
};

export default App;