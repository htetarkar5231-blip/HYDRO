import React from 'react';
import { X, Moon, Sun, Settings } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, theme, setTheme }) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar Panel */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-slate-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Settings size={20} className="text-blue-500" /> Settings
            </h2>
            <button 
              onClick={onClose} 
              className="p-2 -mr-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-8 flex-1">
            <div>
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 px-1">Appearance</h3>
              <div className="flex bg-slate-100 dark:bg-slate-700/50 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <button 
                  onClick={() => setTheme('light')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${theme === 'light' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                  <Sun size={18} /> Light
                </button>
                <button 
                  onClick={() => setTheme('dark')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${theme === 'dark' ? 'bg-slate-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                  <Moon size={18} /> Dark
                </button>
              </div>
            </div>
            
            {/* Placeholder for future settings */}
            <div className="opacity-50 pointer-events-none">
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 px-1">Notifications</h3>
              <div className="space-y-3">
                 <div className="flex items-center justify-between px-1">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Reminders</span>
                    <div className="w-10 h-6 bg-blue-500 rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="text-center text-xs text-slate-400 dark:text-slate-600 font-medium">
            HydroBlue v1.0.0
          </div>
        </div>
      </div>
    </>
  );
};
