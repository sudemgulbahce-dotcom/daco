
import React, { useState } from 'react';
import { Country, UserProfile } from '../types';

interface ProblemStoreProps {
  translations: any;
  onEarnPoints: (amount: number) => void;
  country: Country;
  user: UserProfile;
}

const localizedProblems: Record<string, any[]> = {
  TR: [
    // İLKOKUL
    { id: 1, category: 'MAT', grade: 'İlkokul', question: '5 x 8 kaç eder?', answer: '40', level: 'Kolay', points: 10 },
    { id: 2, category: 'FEN', grade: 'İlkokul', question: 'Geceleri dünyayı aydınlatan gök cismi?', answer: 'ay', level: 'Kolay', points: 10 },
    { id: 3, category: 'MAT', grade: 'İlkokul', question: '100 - 45?', answer: '55', level: 'Kolay', points: 15 },
    { id: 4, category: 'HAYAT', grade: 'İlkokul', question: 'Okula gitmek için hangi araç kullanılır?', answer: 'servis', level: 'Kolay', points: 5 },
    { id: 5, category: 'MAT', grade: 'İlkokul', question: "12'nin 3 katı?", answer: '36', level: 'Kolay', points: 10 },
    { id: 6, category: 'FEN', grade: 'İlkokul', question: 'Su kaç derecede donar?', answer: '0', level: 'Kolay', points: 15 },
    { id: 7, category: 'TÜRKÇE', grade: 'İlkokul', question: 'Siyah kelimesinin zıt anlamlısı?', answer: 'beyaz', level: 'Kolay', points: 10 },
    { id: 8, category: 'MAT', grade: 'İlkokul', question: 'Bir düzine kaç tanedir?', answer: '12', level: 'Kolay', points: 10 },
    
    // ORTAOKUL
    { id: 21, category: 'MAT', grade: 'Ortaokul', question: "9'un karesi?", answer: '81', level: 'Orta', points: 20 },
    { id: 22, category: 'FEN', grade: 'Ortaokul', question: 'Canlıların en küçük yapı taşı?', answer: 'hücre', level: 'Orta', points: 20 },
    { id: 23, category: 'İNKILAP', grade: 'Ortaokul', question: 'TBMM hangi tarihte açıldı?', answer: '1920', level: 'Orta', points: 30 },
    { id: 24, category: 'MAT', grade: 'Ortaokul', question: 'Dörtgenin iç açıları toplamı?', answer: '360', level: 'Orta', points: 20 },
    { id: 25, category: 'FEN', grade: 'Ortaokul', question: 'Güneş sistemindeki en büyük gezegen?', answer: 'jüpiter', level: 'Orta', points: 25 },
    { id: 26, category: 'TÜRKÇE', grade: 'Ortaokul', question: 'Sıfatın diğer adı nedir?', answer: 'ön ad', level: 'Orta', points: 20 },
    { id: 27, category: 'MAT', grade: 'Ortaokul', question: '2 üssü 5 kaçtır?', answer: '32', level: 'Orta', points: 25 },
    { id: 28, category: 'FEN', grade: 'Ortaokul', question: 'İnsanda kaç kromozom vardır?', answer: '46', level: 'Orta', points: 30 },

    // LİSE
    { id: 51, category: 'MAT', grade: 'Lise', question: 'f(x)=2x+3 ise f(5) kaçtır?', answer: '13', level: 'Orta', points: 30 },
    { id: 52, category: 'FİZİK', grade: 'Lise', question: 'Işık hızı saniyede yaklaşık kaç km?', answer: '300000', level: 'Zor', points: 50 },
    { id: 53, category: 'KİMYA', grade: 'Lise', question: 'Suyun kimyasal formülü?', answer: 'h2o', level: 'Kolay', points: 20 },
    { id: 54, category: 'MAT', grade: 'Lise', question: 'Log2(8) kaçtır?', answer: '3', level: 'Zor', points: 40 },
    { id: 55, category: 'BİYOLOJİ', grade: 'Lise', question: 'Kanı pompalayan organ?', answer: 'kalp', level: 'Kolay', points: 20 },
    { id: 56, category: 'EDEBİYAT', grade: 'Lise', question: 'İstiklal Marşı şairimiz?', answer: 'mehmet akif ersoy', level: 'Orta', points: 30 },
    { id: 57, category: 'FİZİK', grade: 'Lise', question: 'Yerçekimi ivmesi yaklaşık?', answer: '9.8', level: 'Orta', points: 40 },
    { id: 58, category: 'MAT', grade: 'Lise', question: 'Sin(90) kaçtır?', answer: '1', level: 'Zor', points: 50 },

    // ÜNİVERSİTE
    { id: 81, category: 'CS', grade: 'Üniversite', question: 'Binary 1010 onluk sistemde kaçtır?', answer: '10', level: 'Zor', points: 70 },
    { id: 82, category: 'YAZILIM', grade: 'Üniversite', question: 'HTML nedir?', answer: 'hiper metin işaretleme dili', level: 'Orta', points: 40 },
    { id: 83, category: 'MAT', grade: 'Üniversite', question: 'Eşitlikte e sayısı yaklaşık kaçtır?', answer: '2.71', level: 'Zor', points: 80 },
    { id: 84, category: 'KOD', grade: 'Üniversite', question: 'JS de değişken tanımlama anahtarı?', answer: 'let', level: 'Kolay', points: 30 },
    { id: 85, category: 'CS', grade: 'Üniversite', question: 'Bir byte kaç bit eder?', answer: '8', level: 'Orta', points: 40 },
  ],
  EN: [{ id: 1, category: 'MATH', grade: 'Primary', question: '10 x 10?', answer: '100', level: 'Easy', points: 10 }]
};

export const ProblemStore: React.FC<ProblemStoreProps> = ({ onEarnPoints, country, user }) => {
  const [activeProblem, setActiveProblem] = useState<any>(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [activeGrade, setActiveGrade] = useState(user.educationLevel);
  const [solvedIds, setSolvedIds] = useState<number[]>([]);

  const allProblems = localizedProblems[country.lang] || localizedProblems.EN;
  const filteredProblems = allProblems.filter(p => p.grade === activeGrade && !solvedIds.includes(p.id));

  const handleSolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase().trim() === activeProblem.answer.toLowerCase()) {
      setFeedback('correct');
      onEarnPoints(activeProblem.points);
      setSolvedIds(prev => [...prev, activeProblem.id]);
      setTimeout(() => { setActiveProblem(null); setAnswer(''); setFeedback(null); }, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  return (
    <div className="p-12 h-full overflow-y-auto bg-slate-950 no-scrollbar">
      <header className="mb-12 border-b border-slate-900 pb-12">
        <h1 className="text-6xl font-black text-white italic tracking-tighter uppercase mb-6">QUEST<span className="text-blue-500">STORE</span></h1>
        <div className="flex gap-4">
           {['İlkokul', 'Ortaokul', 'Lise', 'Üniversite'].map(g => (
             <button key={g} onClick={() => setActiveGrade(g)} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeGrade === g ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500'}`}>{g}</button>
           ))}
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProblems.map(p => (
          <div key={p.id} onClick={() => setActiveProblem(p)} className="bg-slate-900 border border-slate-800 p-10 rounded-[4rem] cursor-pointer hover:border-blue-500 transition-all group flex flex-col justify-between h-72">
             <div className="flex justify-between items-start">
                <span className="text-[10px] font-black text-blue-500 uppercase bg-blue-500/10 px-4 py-1 rounded-full">{p.level}</span>
                <span className="text-2xl font-black text-white">+{p.points} XP</span>
             </div>
             <div>
                <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">{p.category}</h3>
                <p className="text-slate-500 text-[9px] font-black uppercase mt-2">GÖREVİ BAŞLAT →</p>
             </div>
          </div>
        ))}
      </div>
      {activeProblem && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-3xl flex items-center justify-center p-6 animate-in fade-in">
           <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 p-16 rounded-[5rem] shadow-2xl relative">
              <button onClick={() => setActiveProblem(null)} className="absolute top-12 right-12 text-slate-500 font-black text-[10px]">KAPAT</button>
              <h2 className="text-4xl font-black text-white mb-10 uppercase italic text-center">{activeProblem.category}</h2>
              <div className="bg-slate-950 p-12 rounded-[3rem] border border-slate-800 mb-10 text-center text-white text-3xl font-bold">{activeProblem.question}</div>
              <form onSubmit={handleSolve} className="space-y-6">
                 <input autoFocus type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Cevabınız..." className="w-full bg-slate-950 border border-slate-800 rounded-[2rem] px-10 py-6 text-white font-black outline-none focus:border-blue-500 text-center text-2xl" />
                 <button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest text-sm">KONTROL ET 🚀</button>
              </form>
              <div className="h-8 mt-6 text-center">
                 {feedback === 'correct' && <p className="text-green-500 font-black uppercase animate-bounce">Doğru! Puan eklendi.</p>}
                 {feedback === 'wrong' && <p className="text-red-500 font-black uppercase animate-shake">Hatalı cevap.</p>}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
