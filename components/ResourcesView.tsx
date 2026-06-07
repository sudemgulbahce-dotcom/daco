
import React, { useState } from 'react';
import { Country, UserProfile } from '../types';

interface ResourcesViewProps {
  country: Country;
  translations: any;
  user: UserProfile;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ country, translations: t, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const coreContent = {
    body: `DacoLearn, sıradan bir eğitim platformu değil, en üst düzey eğitim vizyonunun dijital bir tezahürüdür.

Bu sistem; bilginin demokratize edilmesi, her öğrencinin kendi potansiyeline en asil yoldan ulaşması ve eğitimin bir yük değil, bir süper güç haline gelmesi amacıyla inşa edilmiştir.

Sistemin temel vizyonuna göre:
- Eğitim, sınırları olmayan bir özgürlüktür.
- Her zeka, doğru rehberlikle bir dehaya dönüşebilir.
- DacoLearn, geleceğin liderlerini bugünden hazırlayan en güçlü müttefiktir.

Bu belge, sistemin temel taşını temsil eder: "Bilgi, onu arayana değil; onu kullanmaya cesaret edene aittir."`
  };

  if (isOpen) {
    return (
      <div className="h-full bg-slate-950 p-6 md:p-16 overflow-y-auto animate-in fade-in duration-700">
        <div className="max-w-4xl mx-auto">
          <header className="flex justify-between items-center mb-12">
            <button 
              onClick={() => setIsOpen(false)} 
              className="bg-slate-900 border border-slate-800 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition-all"
            >
              ← GERİ DÖN
            </button>
            <div className="text-right">
              <p className="text-yellow-400 font-black text-[9px] uppercase tracking-[0.4em] italic">CORE PROTOCOL DOCUMENT</p>
            </div>
          </header>

          <div className="bg-slate-900 rounded-[4rem] shadow-2xl border-[15px] border-black p-12 md:p-24 relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex flex-col items-center text-center mb-16">
                   <div className="w-32 h-1 bg-yellow-400/20 mt-4 rounded-full"></div>
                </div>

                <div className="prose prose-2xl max-w-none text-slate-300 font-serif leading-relaxed text-justify mb-20 whitespace-pre-wrap italic">
                  {coreContent.body}
                </div>

                <footer className="mt-20 pt-12 border-t border-slate-800 flex flex-col items-center opacity-40">
                   <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic">Sistem Kayıtları // Koruma Altında</p>
                </footer>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 h-full overflow-y-auto bg-slate-950 no-scrollbar relative flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full text-center">
        <header className="mb-20">
          <div className="flex justify-center mb-8">
             <span className="bg-yellow-400 text-black text-[10px] font-black px-8 py-3 rounded-full uppercase tracking-widest italic">ÜST DÜZEY ERİŞİM</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black text-white italic tracking-tighter uppercase mb-6">SİSTEM<span className="text-blue-500">ARŞİVİ</span></h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.5em] text-xs italic">Sadece yetkili personel erişimine açıktır</p>
        </header>
        
        <div className="flex justify-center">
          <div 
            className="group cursor-pointer relative" 
            onClick={() => setIsOpen(true)}
          >
            <div className="absolute inset-0 bg-yellow-400 blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity"></div>
            <div className="w-80 h-[28rem] bg-gradient-to-br from-slate-900 to-black rounded-[4rem] p-12 shadow-2xl transition-all duration-700 group-hover:-translate-y-12 border-2 border-slate-800 group-hover:border-yellow-400 flex flex-col justify-between items-center text-center relative z-10">
               <span className="text-8xl group-hover:scale-125 transition-transform duration-700">📜</span>
               <div>
                  <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none mb-4">SİSTEM VERİLERİ</h3>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Sürüm 1.0 // Tek Belge</p>
               </div>
               <div className="w-full py-4 bg-white/5 rounded-2xl border border-white/10 text-white font-black text-[10px] uppercase tracking-widest group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  BELGEYİ AÇ
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
