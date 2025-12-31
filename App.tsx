import React, { useState, useEffect } from 'react';
import { Leaf, Menu, Trophy, BookOpen } from 'lucide-react';
import { CircularProgress } from './components/CircularProgress';
import { WaterControls } from './components/WaterControls';
import { DailyChart } from './components/DailyChart';
import { AiCoach } from './components/AiCoach';
import { Sidebar } from './components/Sidebar';
import { KnowledgeScreen } from './components/KnowledgeScreen';
import { DailyData, Language } from './types';
import { playWaterSound, playSuccessSound } from './utils/soundUtils';
import { getTranslation } from './utils/translations';

// Mock data for the chart
const chartData: DailyData[] = [
  { day: 'Mon', amount: 1.2 },
  { day: 'Tue', amount: 1.4 },
  { day: 'Wed', amount: 1.8 },
  { day: 'Thu', amount: 1.5 },
  { day: 'Fri', amount: 2.1 },
];

// Confetti Component
const Confetti: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {Array.from({ length: 60 }).map((_, i) => {
        const left = Math.random() * 100;
        const animDuration = 2 + Math.random() * 3;
        const animDelay = Math.random() * 0.5;
        const colors = ['#3B82F6', '#60A5FA', '#93C5FD', '#FCD34D', '#F59E0B', '#10B981', '#EC4899'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 6 + Math.random() * 6;
        
        return (
          <div
            key={i}
            className="absolute rounded-sm opacity-90"
            style={{
              left: `${left}%`,
              top: '-20px',
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              animation: `confetti-fall ${animDuration}s linear ${animDelay}s forwards`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        );
      })}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          25% { transform: translateY(25vh) rotate(90deg); }
          50% { transform: translateY(50vh) rotate(180deg); }
          75% { transform: translateY(75vh) rotate(270deg); }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const App: React.FC = () => {
  // Initialize intake: Check localStorage for today's data, otherwise start at 0
  const [currentIntake, setCurrentIntake] = useState(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const savedDate = localStorage.getItem('hydro_date');
      const savedIntake = localStorage.getItem('hydro_intake');
      const today = new Date().toDateString();

      if (savedDate === today && savedIntake) {
        return parseFloat(savedIntake);
      }
      return 0;
    } catch {
      return 0;
    }
  });

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Initialize language based on timezone
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // If timezone is Myanmar, default to 'my', otherwise 'en'
      return timeZone === 'Asia/Yangon' ? 'my' : 'en';
    } catch {
      return 'en';
    }
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isKnowledgeOpen, setIsKnowledgeOpen] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  // Notification State
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    try {
      return localStorage.getItem('notificationsEnabled') === 'true';
    } catch {
      return false;
    }
  });

  const t = getTranslation(language);
  const goal = 3.0;
  
  // Calculate percentage capped at 100 for visual sanity
  const percentage = Math.min((currentIntake / goal) * 100, 100);

  // Check for day reset (midnight crossing or fresh load)
  useEffect(() => {
    const checkDayReset = () => {
      const savedDate = localStorage.getItem('hydro_date');
      const today = new Date().toDateString();

      // If stored date is different from today (or doesn't exist yet), reset to 0
      if (savedDate !== today) {
        setCurrentIntake(0);
        setHasCelebrated(false);
        setShowCongrats(false);
        localStorage.setItem('hydro_intake', '0');
        localStorage.setItem('hydro_date', today);
      }
    };

    // Check immediately on mount
    checkDayReset();

    // Check every minute to handle midnight transition while app is open
    const interval = setInterval(checkDayReset, 60000);
    return () => clearInterval(interval);
  }, []);

  // Notification Toggle Logic
  const toggleNotifications = async () => {
    if (notificationsEnabled) {
      setNotificationsEnabled(false);
      localStorage.setItem('notificationsEnabled', 'false');
      return;
    }

    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      setNotificationsEnabled(true);
      localStorage.setItem('notificationsEnabled', 'true');
      new Notification("HydroBlue", { 
        body: language === 'my' ? "သတိပေးချက်များကို ဖွင့်ထားပါသည်! 💧" : "Reminders enabled! Stay hydrated 💧" 
      });
    }
  };

  // Notification Scheduler Effect
  useEffect(() => {
    if (!notificationsEnabled) return;

    const checkAndNotify = () => {
      const lastReminded = localStorage.getItem('lastReminded');
      const now = Date.now();
      const REMINDER_INTERVAL = 2 * 60 * 60 * 1000; // 2 hours in ms

      // Check if it's been long enough since last reminder, OR if we never reminded
      if (!lastReminded || (now - parseInt(lastReminded) > REMINDER_INTERVAL)) {
        // Respect quiet hours (e.g., 10 PM to 8 AM)
        const currentHour = new Date().getHours();
        if (currentHour >= 8 && currentHour <= 22) {
          const title = "HydroBlue";
          const body = language === 'my' 
            ? "ရေသောက်ချိန်ရောက်ပါပြီ! 💧" 
            : "Time for a water break! 💧";
            
          new Notification(title, { body });
          localStorage.setItem('lastReminded', now.toString());
        }
      }
    };

    // Check every minute
    const interval = setInterval(checkAndNotify, 60000);
    
    // Also run immediately on mount to check if we missed one while closed
    checkAndNotify();

    return () => clearInterval(interval);
  }, [notificationsEnabled, language]);

  const handleAddWater = (amount: number) => {
    playWaterSound();
    
    const newIntake = parseFloat((currentIntake + amount).toFixed(1));
    setCurrentIntake(newIntake);

    // Save state
    localStorage.setItem('hydro_intake', newIntake.toString());
    localStorage.setItem('hydro_date', new Date().toDateString());

    // Check if goal reached (and not already celebrated this session)
    if (newIntake >= goal && !hasCelebrated) {
      setHasCelebrated(true);
      // Small delay to let the UI update and water sound finish
      setTimeout(() => {
        setShowCongrats(true);
        playSuccessSound();
        // Stronger haptic feedback for goal completion (Three strong pulses)
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate([400, 100, 400, 100, 400]);
        }
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
          language={language}
          setLanguage={setLanguage}
          notificationsEnabled={notificationsEnabled}
          toggleNotifications={toggleNotifications}
        />

        {/* Success Modal & Confetti */}
        {showCongrats && (
          <>
            <Confetti />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-in fade-in duration-300">
               <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-sm w-full shadow-2xl transform animate-in zoom-in-95 duration-200 text-center border border-white/20 relative z-10">
                  <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Trophy className="w-10 h-10 text-yellow-500 fill-yellow-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{t.congrats}</h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-8 font-medium">
                      {t.completed}
                  </p>
                  <button 
                      onClick={() => setShowCongrats(false)}
                      className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                  >
                      {t.awesome}
                  </button>
               </div>
            </div>
          </>
        )}

        {/* Mobile Frame Container */}
        <div className="w-full max-w-[400px] bg-[#F0F9FF] dark:bg-slate-900 min-h-[800px] relative flex flex-col transition-colors duration-300 overflow-hidden">
          
          {/* Top Bar */}
          <div className="flex justify-between items-center px-6 py-4 relative z-20">
             {/* Left: Menu */}
             <button 
               onClick={() => setIsSidebarOpen(true)}
               className="p-3 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800 rounded-full transition-colors"
               aria-label="Open settings"
             >
                <Menu size={24} />
             </button>
             
             {/* Right: Learn Button */}
             <button 
               onClick={() => setIsKnowledgeOpen(true)}
               className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-blue-600 dark:text-blue-400 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 border border-white/20"
               aria-label="Why hydrate?"
             >
                <BookOpen size={18} />
                <span className="text-sm font-bold">{t.learnMore}</span>
             </button>
          </div>

          {/* Knowledge Screen Overlay */}
          <KnowledgeScreen 
            isOpen={isKnowledgeOpen} 
            onClose={() => setIsKnowledgeOpen(false)} 
            language={language} 
          />

          {/* Header */}
          <header className="mt-4 mb-8 text-center px-8 relative">
            <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight leading-tight transition-colors duration-300 whitespace-pre-wrap">
              {t.header}
            </h1>
            <Leaf 
              className="absolute top-8 right-8 text-green-500 fill-green-500 transform rotate-12" 
              size={28} 
            />
          </header>

          {/* Main Circular Progress */}
          <main className="flex-1 flex flex-col items-center relative z-10">
            <CircularProgress percentage={percentage} />
            
            {/* Controls */}
            <WaterControls 
              currentIntake={currentIntake} 
              onAdd={handleAddWater} 
              percentage={percentage} 
            />

            {/* Chart */}
            <DailyChart data={chartData} isDarkMode={theme === 'dark'} language={language} />
          </main>

          {/* AI Assistant */}
          <AiCoach currentIntake={currentIntake} language={language} />

        </div>
      </div>
    </div>
  );
};

export default App;