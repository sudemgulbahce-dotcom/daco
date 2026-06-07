
import React from 'react';
import { Country } from '../types';

const countries: Country[] = [
  { id: 'tr', name: 'Türkiye', flag: '🇹🇷', lang: 'TR', welcome: 'Merhaba' },
  { id: 'us', name: 'USA', flag: '🇺🇸', lang: 'EN', welcome: 'Hello' },
  { id: 'de', name: 'Germany', flag: '🇩🇪', lang: 'DE', welcome: 'Hallo' },
  { id: 'gb', name: 'UK', flag: '🇬🇧', lang: 'EN', welcome: 'Welcome' },
  { id: 'fr', name: 'France', flag: '🇫🇷', lang: 'FR', welcome: 'Bonjour' },
  { id: 'jp', name: 'Japan', flag: '🇯🇵', lang: 'JP', welcome: 'Konichiwa' },
];

export const CountrySelector: React.FC<{ onSelect: (c: Country) => void }> = ({ onSelect }) => {
  return (
    <div className="h-screen w-full bg-slate-950 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-[10%] left-[10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-yellow-400 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-white tracking-tighter mb-4 uppercase">
            DACO<span className="text-yellow-400">LEARN</span> <span className="text-blue-500">GLOBAL</span>
          </h1>
          <p className="text-slate-400 font-bold text-xl uppercase tracking-widest">Lütfen Ülkeni Seç / Select Your Country</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {countries.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelect(c)}
              className="bg-slate-900/50 border border-slate-800 p-8 rounded-[3rem] hover:border-blue-500 hover:bg-slate-900 transition-all group flex flex-col items-center gap-4"
            >
              <span className="text-6xl group-hover:scale-125 transition-transform">{c.flag}</span>
              <span className="text-xl font-black text-white">{c.name}</span>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{c.lang} Curriculum</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
