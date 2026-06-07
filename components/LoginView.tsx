
import React, { useState } from 'react';
import { Country } from '../types';

interface LoginViewProps {
  onLogin: (email: string, username: string, level: string) => void;
  country: Country;
  translations: any;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin, country, translations: t }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [level, setLevel] = useState('Lise');

  const levels = {
    TR: ['İlkokul', 'Ortaokul', 'Lise', 'Üniversite'],
    EN: ['Primary', 'Middle', 'High', 'University']
  };

  const currentLevels = (levels[country.lang as keyof typeof levels] || levels.EN) as string[];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@') && username.trim()) {
      onLogin(email, username, level);
    }
  };

  return (
    <div className="h-screen w-full bg-slate-950 flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      
      <div className="relative z-10 w-full max-w-lg p-12 bg-slate-900/40 backdrop-blur-3xl border border-slate-800 rounded-[4rem] shadow-2xl">
        <div className="text-center mb-10">
          <div className="text-6xl mb-6 animate-bounce">🚀</div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">
            DACO<span className="text-yellow-400">ID</span> LOGIN
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">{t.loginTitle}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-6">GMAIL ADRESİ</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-3xl px-8 py-5 outline-none focus:border-blue-500 transition-all text-white font-bold"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-6">AD SOYAD</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Adınız"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-3xl px-8 py-5 outline-none focus:border-yellow-400 transition-all text-white font-bold"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-6">EĞİTİM SEVİYESİ</label>
            <div className="grid grid-cols-2 gap-2 p-2 bg-slate-950/50 rounded-[2.5rem] border border-slate-800">
              {currentLevels.map(l => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLevel(l)}
                  className={`py-4 px-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${level === l ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-600 hover:text-white'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-yellow-400 text-black font-black uppercase tracking-[0.2em] py-6 rounded-[2.5rem] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all text-sm">
            SİSTEME GİRİŞ YAP ⚡
          </button>
        </form>
      </div>
    </div>
  );
};
