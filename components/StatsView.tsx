
import React from 'react';
import { UserStats } from '../types';

interface StatsViewProps {
  stats: UserStats;
  translations: any;
}

export const StatsView: React.FC<StatsViewProps> = ({ stats, translations: t }) => {
  const metrics = [
    { label: t.completed, val: stats.completedTasks, icon: '🎯' },
    { label: t.studyHours, val: stats.studyHours, icon: '⏱️' },
    { label: t.points, val: stats.points === 'unlimited' ? '∞' : stats.points, icon: '✨' },
    { label: t.rank, val: stats.points === 'unlimited' ? 'FOUNDER' : '#1,240', icon: '🌍' },
  ];

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto h-full overflow-y-auto bg-slate-950 text-slate-200">
      <div className="mb-12">
        <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">{t.statsTitle}</h1>
        <p className="text-slate-500 mt-2 font-medium opacity-80 italic">{t.statsSub}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((item, i) => (
          <div key={i} className={`bg-slate-900 border p-8 rounded-[3rem] shadow-xl transition-all duration-500 ${item.val === '∞' ? 'border-yellow-400 shadow-yellow-400/10 scale-105' : 'border-slate-800 hover:border-blue-500/50'}`}>
            <div className="text-3xl mb-4">{item.icon}</div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
            <p className={`text-4xl font-black tracking-tighter ${item.val === '∞' ? 'text-yellow-400' : 'text-white'}`}>{item.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
