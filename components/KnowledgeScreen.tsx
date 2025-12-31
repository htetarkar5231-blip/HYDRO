import React from 'react';
import { X, Brain, Heart, Droplet, Zap } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface KnowledgeScreenProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const KnowledgeScreen: React.FC<KnowledgeScreenProps> = ({ isOpen, onClose, language }) => {
  const t = getTranslation(language);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-white dark:bg-slate-900 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Brain className="text-blue-500" size={24} />
          {t.knowledgeTitle}
        </h2>
        <button 
          onClick={onClose}
          className="p-2 -mr-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Physical Health Card */}
        <div className="bg-blue-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-blue-100 dark:border-slate-700">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
              <Heart size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">{t.physHealth}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.physDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Mental Clarity Card */}
        <div className="bg-purple-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-purple-100 dark:border-slate-700">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">{t.mentalHealth}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.mentalDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Skin Health Card */}
        <div className="bg-teal-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-teal-100 dark:border-slate-700">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-xl text-teal-600 dark:text-teal-400">
              <Droplet size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">{t.skinHealth}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.skinDesc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-slate-100 dark:border-slate-800">
        <button 
          onClick={onClose}
          className="w-full py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-2xl font-bold text-lg transition-colors"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
};