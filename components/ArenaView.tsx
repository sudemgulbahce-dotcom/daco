
import React from 'react';
import { UserProfile, SystemState } from '../types';

interface ArenaViewProps {
  user: UserProfile;
  translations: any;
  systemState: SystemState;
}

export const ArenaView: React.FC<ArenaViewProps> = ({ user, translations: t, systemState }) => {
  const isHackerMode = systemState.arenaEffect === 'hacker';
  const isGoldMode = systemState.arenaEffect === 'gold';
  const isGlitchMode = systemState.arenaEffect === 'glitch';
  const isRainbowMode = systemState.arenaEffect === 'rainbow';
  const isTsunamiMode = systemState.arenaEffect === 'tsunami';

  return (
    <div className={`p-8 md:p-12 max-w-7xl mx-auto h-full overflow-y-auto transition-all duration-1000 relative ${isHackerMode ? 'bg-black font-mono' : isGoldMode ? 'bg-black' : isRainbowMode ? 'bg-slate-900 overflow-hidden' : isTsunamiMode ? 'bg-blue-950 overflow-hidden' : 'bg-slate-950'}`}>
      
      {/* Visual Effects Layer */}
      {isRainbowMode && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
           <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 animate-[rainbow-slide_10s_linear_infinite] bg-[length:200%_100%]"></div>
        </div>
      )}

      {isTsunamiMode && (
        <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/water.png')] animate-[tsunami-move_5s_infinite_linear]"></div>
           <div className="absolute bottom-0 w-full h-1/2 bg-blue-500/30 blur-3xl"></div>
        </div>
      )}

      {/* Kurucu Mesaj Yayını */}
      {systemState.broadcastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-5xl bg-yellow-400 text-black p-8 rounded-[4rem] shadow-[0_40px_100px_rgba(250,204,21,0.6)] animate-bounce text-center border-[10px] border-black">
           <p className="text-4xl font-black italic uppercase tracking-tighter leading-none">{systemState.broadcastMessage}</p>
           <div className="h-1 bg-black/20 mt-4 mb-2 rounded-full"></div>
           <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60">FOUNDER OVERRIDE BROADCAST</p>
        </div>
      )}

      {/* Hacker Efekti Katmanı */}
      {isHackerMode && (
        <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
           {Array.from({ length: 40 }).map((_, i) => (
             <div key={i} className="absolute text-green-500 text-[12px] animate-[matrix_3s_infinite] whitespace-nowrap" style={{ left: `${i * 2.5}%`, animationDelay: `${Math.random() * 2}s` }}>
               {Array.from({length: 20}).map(() => Math.floor(Math.random() * 2)).join('')}
             </div>
           ))}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <div className={`w-3 h-3 rounded-full animate-ping ${isHackerMode ? 'bg-green-500' : isRainbowMode ? 'bg-white' : isTsunamiMode ? 'bg-blue-400' : 'bg-red-500'}`}></div>
             <span className={`text-xs font-black uppercase tracking-[0.2em] ${isHackerMode ? 'text-green-500' : isRainbowMode ? 'text-white' : isTsunamiMode ? 'text-blue-300' : 'text-red-500'}`}>
               {isHackerMode ? 'ARENA SECURITY: COMPROMISED' : isRainbowMode ? 'CELEBRATION PROTOCOL: RAINBOW' : isTsunamiMode ? 'ENVIRONMENT: TSUNAMI' : 'ARENA PROTOCOL: ACTIVE'}
             </span>
          </div>
          <h1 className={`text-8xl font-black italic tracking-tighter uppercase mb-4 transition-all duration-1000 ${isHackerMode ? 'text-green-500' : isGoldMode ? 'text-yellow-400' : isRainbowMode ? 'text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]' : isTsunamiMode ? 'text-blue-100 drop-shadow-[0_0_20px_rgba(0,100,255,0.6)]' : 'text-white'}`}>
            Daco <span className={isHackerMode ? 'text-green-400' : isRainbowMode ? 'text-yellow-300' : isTsunamiMode ? 'text-blue-400' : 'text-blue-500'}>{isHackerMode ? 'HACKED' : isRainbowMode ? 'RAINBOW' : isTsunamiMode ? 'TSUNAMI' : 'Arena'}</span>
          </h1>
          <p className={`font-bold uppercase tracking-widest text-[10px] italic ${isHackerMode ? 'text-green-800' : isRainbowMode ? 'text-white/60' : 'text-slate-500'}`}>
            Master Override Active // User: {user.username.toUpperCase()}
          </p>
        </div>
        <button className={`px-12 py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-widest shadow-2xl transition-all ${isHackerMode ? 'bg-green-600 text-black' : isRainbowMode ? 'bg-white text-black animate-bounce' : isTsunamiMode ? 'bg-blue-500 text-white shadow-blue-900/40' : 'bg-blue-600 text-white'}`}>
           RAKİP BUL 🔥
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
        <div className="lg:col-span-2 space-y-4">
           {[1, 2, 3, 4, 5].map((_, i) => (
             <div key={i} className={`border p-10 rounded-[4rem] flex items-center justify-between transition-all duration-700 ${isHackerMode ? 'bg-black border-green-500/50 text-green-400' : isRainbowMode ? 'bg-white/10 border-white/20 backdrop-blur-md' : isTsunamiMode ? 'bg-blue-900/30 border-blue-500/30 backdrop-blur-xl' : 'bg-slate-900/40 border-slate-800'}`}>
                <div className="flex items-center gap-8">
                  <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-4xl ${isHackerMode ? 'bg-green-950 border border-green-500' : 'bg-slate-800'}`}>👤</div>
                  <div>
                    <h5 className="font-black italic uppercase tracking-tighter text-2xl">{`PLAYER_${i}`}</h5>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${isRainbowMode ? 'text-yellow-400' : 'text-blue-500'}`}>Status: Online</p>
                  </div>
                </div>
                <p className={`font-black text-2xl ${isRainbowMode ? 'text-white' : 'text-white'}`}>{`${9000 - (i * 1000)} XP`}</p>
             </div>
           ))}
        </div>

        <div className={`p-12 rounded-[5rem] border transition-all duration-1000 shadow-2xl h-fit sticky top-12 ${isHackerMode ? 'bg-black border-green-500 text-green-500' : isRainbowMode ? 'bg-white/10 border-white/30 backdrop-blur-3xl text-white' : isTsunamiMode ? 'bg-blue-900/40 border-blue-400/20 text-white backdrop-blur-3xl' : 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 text-white'}`}>
            <h4 className="text-3xl font-black mb-10 uppercase tracking-tighter italic">Kişisel Panel</h4>
            <div className="space-y-8">
               <div className="flex justify-between items-center">
                  <p className="text-[12px] font-black uppercase opacity-60 tracking-widest">Sistem Rütbesi</p>
                  <p className="text-sm font-black uppercase bg-white/10 px-4 py-1 rounded-full">{user.rankKey}</p>
               </div>
               <div className={`w-full h-3 rounded-full overflow-hidden ${isHackerMode ? 'bg-green-950' : 'bg-slate-800'}`}>
                  <div className={`h-full w-[40%] ${isHackerMode ? 'bg-green-500' : isRainbowMode ? 'bg-gradient-to-r from-red-500 to-blue-500' : isTsunamiMode ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
               </div>
            </div>
        </div>
      </div>

      <style>{`
        @keyframes rainbow-slide {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes matrix {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(1000%); opacity: 0; }
        }
        @keyframes tsunami-move {
          from { background-position: 0 0; }
          to { background-position: 1000px 0; }
        }
      `}</style>
    </div>
  );
};
