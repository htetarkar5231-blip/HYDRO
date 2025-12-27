import React, { useState } from 'react';
import { Leaf, Menu } from 'lucide-react';
import { CircularProgress } from './components/CircularProgress';
import { WaterControls } from './components/WaterControls';
import { DailyChart } from './components/DailyChart';
import { AiCoach } from './components/AiCoach';
import { Sidebar } from './components/Sidebar';
import { DailyData } from './types';

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
  const goal = 3.0;
  
  // Calculate percentage capped at 100 for visual sanity
  const percentage = Math.min((currentIntake / goal) * 100, 100);

  const handleAddWater = (amount: number) => {
    setCurrentIntake(prev => parseFloat((prev + amount).toFixed(1)));
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
