
import React from 'react';

interface AvatarStoreProps {
  points: number;
  unlockedItems: string[];
  onBuy: (id: string, price: number) => void;
  onSelectHat: (id: string) => void;
  activeHat?: string;
}

const items = [
  { id: 'cap', name: 'Spor Şapka', price: 100, icon: '🧢' },
  { id: 'grad', name: 'Mezuniyet Keppi', price: 250, icon: '🎓' },
  { id: 'glasses', name: 'Havalı Gözlük', price: 50, icon: '🕶️' },
  { id: 'crown', name: 'Altın Taç', price: 1000, icon: '👑' },
  { id: 'cat', name: 'Kedi Kulakları', price: 500, icon: '🐱' },
];

export const AvatarStore: React.FC<AvatarStoreProps> = ({ points, unlockedItems, onBuy, onSelectHat, activeHat }) => {
  return (
    <div className="p-12 h-full overflow-y-auto bg-slate-950 no-scrollbar">
      <header className="mb-16">
        <h1 className="text-7xl font-black text-white italic tracking-tighter uppercase mb-2">
          DACO<span className="text-yellow-400">MARKET</span>
        </h1>
        <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px]">Avatarını Özelleştir & Stilini Konuştur</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map(item => {
          const isUnlocked = unlockedItems.includes(item.id);
          const isActive = activeHat === item.id;

          return (
            <div key={item.id} className={`group bg-slate-900 border-2 p-10 rounded-[4rem] transition-all relative overflow-hidden ${isActive ? 'border-yellow-400' : 'border-slate-800'}`}>
              <div className="text-8xl mb-8 text-center group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-2xl font-black text-white text-center uppercase italic mb-6">{item.name}</h3>
              
              {!isUnlocked ? (
                <button 
                  onClick={() => onBuy(item.id, item.price)}
                  className={`w-full py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all ${points >= item.price ? 'bg-white text-black hover:bg-yellow-400' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                >
                  {item.price} PUAN İLE AL
                </button>
              ) : (
                <button 
                  onClick={() => onSelectHat(isActive ? '' : item.id)}
                  className={`w-full py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all ${isActive ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'}`}
                >
                  {isActive ? 'ÇIKART' : 'KUŞAN'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
