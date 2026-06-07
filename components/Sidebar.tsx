
import React from 'react';
import { AppSection, Country, UserProfile, CustomSection } from '../types';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  country: Country;
  user: UserProfile;
  translations: any;
  isAdmin?: boolean;
  isFounderUnlocked?: boolean;
  disabledSections: string[];
  customSections: CustomSection[];
  onAdminRequest?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  country, 
  user, 
  translations: t, 
  isAdmin, 
  isFounderUnlocked = false,
  disabledSections,
  customSections,
  onAdminRequest
}) => {
  const menuItems = [
    { id: AppSection.CHAT, icon: '💬', label: t.chat },
    { id: AppSection.ARENA, icon: '⚔️', label: t.arena },
    { id: AppSection.PROBLEMS, icon: '🧩', label: t.problems },
    { id: AppSection.AVATAR_STORE, icon: '👕', label: t.avatar_store },
    { id: AppSection.VIDEO_STORE, icon: '📺', label: t.video_store },
    { id: AppSection.CODE, icon: '💻', label: t.code },
    { id: AppSection.PLANNER, icon: '📝', label: t.planner },
    { id: AppSection.RESOURCES, icon: '📁', label: t.resources },
    { id: AppSection.MUSIC, icon: '🎵', label: t.music },
    { id: AppSection.STATS, icon: '📊', label: t.stats },
  ].filter(item => !disabledSections.includes(item.id));

  return (
    <aside className={`w-20 md:w-72 bg-slate-950 border-r border-slate-900 flex flex-col transition-all z-50 ${isAdmin ? 'border-yellow-400 shadow-2xl' : ''}`}>
      <div className="p-8 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shrink-0 ${isAdmin ? 'bg-yellow-400 text-black rotate-12' : 'bg-blue-600'}`}>
          {isAdmin ? '👑' : country.flag}
        </div>
        <div className="hidden md:block">
          <p className="font-black text-xl text-white tracking-tighter uppercase italic leading-none">DACO<span className="text-blue-500">LEARN</span></p>
          <p className="text-[8px] font-black uppercase tracking-[0.4em] mt-1 text-slate-500">SİSTEM v10.0</p>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar py-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${
              activeSection === item.id ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <span className="text-xl shrink-0">{item.icon}</span>
            <span className="hidden md:block font-black text-[10px] uppercase tracking-widest italic">{item.label}</span>
          </button>
        ))}

        {/* Kurucu Girişi Butonu (Sadece asddaco yazılınca ve admin değilken görünür) */}
        {!isAdmin && isFounderUnlocked && onAdminRequest && (
          <div className="pt-6 mt-6 border-t border-slate-900 animate-in slide-in-from-left duration-700">
            <button
              onClick={onAdminRequest}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-yellow-400 text-yellow-400 bg-yellow-400/5 hover:bg-yellow-400 hover:text-black transition-all group shadow-[0_0_20px_rgba(250,204,21,0.2)]"
            >
              <span className="text-xl shrink-0">🛡️</span>
              <span className="hidden md:block font-black text-[9px] uppercase tracking-[0.2em] italic">KURUCU ERİŞİMİ</span>
            </button>
          </div>
        )}
      </nav>

      <div className="p-6 border-t border-slate-900 flex items-center gap-3">
        <div className="relative shrink-0">
          <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-slate-800" />
          {user.activeHat && (
            <div className="absolute -top-4 -right-2 text-2xl rotate-12 drop-shadow-lg pointer-events-none">
              {user.activeHat === 'crown' ? '👑' : user.activeHat === 'cap' ? '🧢' : '🎓'}
            </div>
          )}
        </div>
        <div className="hidden md:block truncate">
          <p className="text-xs font-black truncate uppercase text-white leading-tight">{user.username}</p>
          <p className="text-[7px] text-blue-500 font-black uppercase tracking-widest leading-tight">{user.isAdmin ? 'MASTER FOUNDER' : user.email}</p>
        </div>
      </div>
    </aside>
  );
};
