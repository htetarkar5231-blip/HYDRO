import React from 'react';
import { X, Moon, Sun, Settings, Droplets, Globe } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  theme, 
  setTheme, 
  language, 
  setLanguage,
  notificationsEnabled,
  toggleNotifications
}) => {
  const t = getTranslation(language);

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
              <Settings size={20} className="text-blue-500" /> {t.settings}
            </h2>
            <button 
              onClick={onClose} 
              className="p-2 -mr-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-8 flex-1 overflow-y-auto">
            {/* Appearance Section */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 px-1">{t.appearance}</h3>
              <div className="flex bg-slate-100 dark:bg-slate-700/50 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <button 
                  onClick={() => setTheme('light')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${theme === 'light' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                  <Sun size={18} /> {t.light}
                </button>
                <button 
                  onClick={() => setTheme('dark')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${theme === 'dark' ? 'bg-slate-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                  <Moon size={18} /> {t.dark}
                </button>
              </div>
            </div>

            {/* Language Section */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 px-1">{t.language}</h3>
              <div className="flex bg-slate-100 dark:bg-slate-700/50 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${language === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                  <Globe size={16} /> {t.english}
                </button>
                <button 
                  onClick={() => setLanguage('my')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${language === 'my' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                  <Globe size={16} /> {t.myanmar}
                </button>
              </div>
            </div>

            {/* About Section */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 px-1">{t.about}</h3>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                 <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                      <Droplets size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-white text-sm">HydroBlue</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">v1.1.0</p>
                    </div>
                 </div>
                 <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                   {t.aboutDesc}
                 </p>
              </div>
            </div>
            
            {/* Notifications Section */}
            <div className="pb-4">
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 px-1">{t.notifications}</h3>
              <div className="space-y-3">
                 <div className="flex items-center justify-between px-1">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t.reminders}</span>
                    <button 
                      onClick={toggleNotifications}
                      className={`w-10 h-6 rounded-full relative transition-colors duration-300 ${notificationsEnabled ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                      role="switch"
                      aria-checked={notificationsEnabled}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${notificationsEnabled ? 'left-5' : 'left-1'}`}></div>
                    </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};