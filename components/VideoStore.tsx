
import React from 'react';

interface VideoStoreProps {
  points: number;
  unlockedVideos: string[];
  onBuy: (id: string, price: number) => void;
}

const videos = [
  { id: 'v1', title: 'Matematik: Türev 101', desc: 'Sıfırdan zirveye türev mantığı.', price: 150, youtubeId: '2p6y6Jv-p_M' },
  { id: 'v2', title: 'Yazılım: JS Async/Await', desc: 'Asenkron yapıyı profesyonelce kavra.', price: 200, youtubeId: 'V_Kr9OSfDeU' },
  { id: 'v3', title: 'Fizik: Kuantum Mekaniği', desc: 'Evrenin gizemlerine giriş.', price: 500, youtubeId: 'i_S8p6tI298' },
  { id: 'v4', title: 'Siber Güvenlik', desc: 'Etik hackerlık temelleri.', price: 1000, youtubeId: '6_P6P6_P6_P' }, // Örnek ID
];

export const VideoStore: React.FC<VideoStoreProps> = ({ points, unlockedVideos, onBuy }) => {
  return (
    <div className="p-12 h-full overflow-y-auto bg-slate-950 no-scrollbar">
      <header className="mb-16">
        <h1 className="text-7xl font-black text-white italic tracking-tighter uppercase mb-2">DACO<span className="text-blue-500">ACADEMY</span></h1>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Özel İçerikler // Stabil Player v3.0</p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {videos.map(v => {
          const isUnlocked = unlockedVideos.includes(v.id);
          return (
            <div key={v.id} className="bg-slate-900 border border-slate-800 rounded-[4rem] overflow-hidden flex flex-col shadow-2xl">
              <div className="aspect-video bg-black relative">
                 {isUnlocked ? (
                   <iframe 
                    className="w-full h-full" 
                    src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=0&rel=0`} 
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                   ></iframe>
                 ) : (
                   <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/50">
                      <div className="text-6xl mb-4">🔒</div>
                      <p className="text-slate-500 font-black uppercase text-xs">Bu İçerik Kilitli</p>
                   </div>
                 )}
              </div>
              <div className="p-10">
                 <h3 className="text-2xl font-black text-white italic uppercase mb-2">{v.title}</h3>
                 <p className="text-slate-500 text-sm mb-8">{v.desc}</p>
                 {!isUnlocked && (
                    <button onClick={() => onBuy(v.id, v.price)} className={`w-full py-5 rounded-[2rem] font-black uppercase text-xs transition-all ${points >= v.price ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-slate-800 text-slate-500'}`}>
                      {v.price} PUAN İLE KİLİDİ AÇ
                    </button>
                 )}
                 {isUnlocked && (
                   <div className="text-center py-4 bg-green-500/10 rounded-2xl border border-green-500/20 text-green-500 font-black uppercase text-[10px]">SAHİPSİNİZ ✓</div>
                 )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
