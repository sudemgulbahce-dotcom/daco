
import React, { useState, useEffect } from 'react';

interface CodePlaygroundProps {
  translations: any;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({ translations: t }) => {
  const [selectedLib, setSelectedLib] = useState('Vanilla JS');
  const [code, setCode] = useState(`// DacoLearn Code Lab v2.0\n// Muhammed Mirza Gülbahçe için özel lab\n\nconsole.log("Sistem Hazır. Kodunuzu buraya yazın...");\n\nconst greet = (name) => {\n  return "Merhaba " + name + "!";\n};\n\nconsole.log(greet("Muhammed Mirza"));\n`);
  const [output, setOutput] = useState<string[]>([]);

  const libraries = [
    { name: 'Vanilla JS', icon: '📜', starter: '// Vanilla JavaScript\nconsole.log("DacoLearn Sistemine Hoş Geldiniz!");\n' },
    { name: 'Array Methods', icon: '📊', starter: 'const students = ["Daco", "Mirza", "Gülbahçe"];\nconsole.log("Öğrenci Listesi:", students);\nconsole.log("Büyük Harf:", students.map(s => s.toUpperCase()));' },
    { name: 'Math Logic', icon: '📐', starter: 'const calculateArea = (r) => Math.PI * Math.pow(r, 2);\nconsole.log("Yarıçapı 5 olan dairenin alanı: " + calculateArea(5).toFixed(2));' }
  ];

  const handleLibSelect = (lib: typeof libraries[0]) => {
    setSelectedLib(lib.name);
    setCode(lib.starter);
  };

  const runCode = () => {
    const logs: string[] = [];
    const originalLog = console.log;
    
    // Override console.log to catch output
    console.log = (...args) => {
      const formatted = args.map(arg => {
        if (typeof arg === 'object') return JSON.stringify(arg, null, 2);
        return String(arg);
      }).join(' ');
      logs.push(formatted);
    };

    try {
      // Clear previous output and run
      setOutput([]);
      // Use Function constructor for a slightly safer/better eval scope
      const execute = new Function(code);
      execute();
      
      if (logs.length === 0) logs.push("// Kod çalıştı fakat çıktı üretmedi.");
      setOutput(logs);
    } catch (err: any) {
      setOutput([`❌ HATA: ${err.message}`]);
    } finally {
      console.log = originalLog;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 animate-in fade-in duration-500">
      <header className="h-24 border-b border-slate-900 flex items-center px-10 justify-between bg-slate-950/80 backdrop-blur-md">
        <div className="flex items-center gap-8">
          <div>
            <h1 className="font-black text-2xl text-white tracking-tighter uppercase italic">CODE <span className="text-yellow-400">LAB</span></h1>
            <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mt-1">Experimental IDE v2.1</p>
          </div>
          <div className="flex gap-3">
             {libraries.map(lib => (
               <button 
                key={lib.name}
                onClick={() => handleLibSelect(lib)}
                className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedLib === lib.name ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-900 text-slate-500 border border-slate-800 hover:text-white'
                }`}
               >
                 {lib.icon} {lib.name}
               </button>
             ))}
          </div>
        </div>
        <button onClick={runCode} className="bg-yellow-400 text-black px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-yellow-400/10 hover:scale-105 active:scale-95 transition-all">
          {t.run} 🚀
        </button>
      </header>

      <div className="flex-1 flex divide-x divide-slate-900 overflow-hidden">
        <div className="flex-1 relative group">
           <div className="absolute top-6 left-6 text-[10px] font-black text-slate-800 uppercase tracking-widest pointer-events-none group-hover:text-blue-500 transition-colors italic">EDITOR_SOURCE</div>
           <textarea 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            spellCheck={false}
            className="w-full h-full bg-slate-950 text-blue-400 font-mono text-lg p-12 pt-16 outline-none resize-none leading-relaxed no-scrollbar"
            placeholder="// Kodunuzu buraya girin..."
           />
        </div>
        
        <div className="w-[450px] bg-black/40 p-10 font-mono text-sm overflow-y-auto space-y-4 no-scrollbar">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">KONSOL ÇIKTISI</p>
          </div>
          {output.length > 0 ? (
            output.map((line, i) => (
              <div key={i} className={`pb-3 border-b border-slate-900/50 ${line.startsWith('❌') ? 'text-red-500' : 'text-green-400'}`}>
                <span className="text-slate-700 mr-2 font-black">❯</span> {line}
              </div>
            ))
          ) : (
            <div className="py-20 text-center opacity-20">
               <p className="text-xs italic uppercase font-black tracking-widest">Henüz bir çıktı yok.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
