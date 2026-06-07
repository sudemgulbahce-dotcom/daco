
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatView } from './components/ChatView';
import { PlannerView } from './components/PlannerView';
import { ResourcesView } from './components/ResourcesView';
import { StatsView } from './components/StatsView';
import { CodePlayground } from './components/CodePlayground';
import { ArenaView } from './components/ArenaView';
import { MusicView } from './components/MusicView';
import { ProblemStore } from './components/ProblemStore';
import { LoginView } from './components/LoginView';
import { CountrySelector } from './components/CountrySelector';
import { AvatarStore } from './components/AvatarStore';
import { VideoStore } from './components/VideoStore';
import { AppSection, Message, Country, UserProfile, CustomSection, SystemState } from './types';
import { geminiService } from './services/geminiService';

const translations = {
  TR: { chat: 'Daco AI', arena: 'Arena', code: 'Lab', planner: 'Görevler', resources: 'Arşiv', stats: 'Veriler', music: 'Müzik', problems: 'Market', avatar_store: 'Daco Style', video_store: 'Akademi', loginTitle: 'DACOID SİSTEMİ', run: 'Kodu Çalıştır' },
  EN: { chat: 'AI Help', arena: 'Arena', code: 'Code', planner: 'Tasks', resources: 'Docs', stats: 'Stats', music: 'Music', problems: 'Store', avatar_store: 'Market', video_store: 'Academy', loginTitle: 'LOGIN', run: 'Run Code' }
};

const App: React.FC = () => {
  const [country, setCountry] = useState<Country | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeSection, setActiveSection] = useState<string>(AppSection.CHAT);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userPoints, setUserPoints] = useState<number>(50);
  const [customSections, setCustomSections] = useState<CustomSection[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFounderButtonUnlocked, setIsFounderButtonUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [adminPassInput, setAdminPassInput] = useState('');
  const [authError, setAuthError] = useState(false);
  
  const [systemState, setSystemState] = useState<SystemState>({
    arenaEffect: 'none',
    broadcastMessage: null,
    disabledSections: [],
    logs: []
  });

  const t = country ? (translations[country.lang as keyof typeof translations] || translations.EN) : translations.EN;

  // Persistence
  useEffect(() => {
    if (user?.email) {
      const saved = localStorage.getItem(`daco_v12_pro_mirza_${user.email}`);
      if (saved) {
        const data = JSON.parse(saved);
        setUserPoints(data.points);
        if (data.isFounderButtonUnlocked) setIsFounderButtonUnlocked(true);
        if (data.customSections) setCustomSections(data.customSections);
        if (data.disabledSections) setSystemState(s => ({ ...s, disabledSections: data.disabledSections, arenaEffect: data.arenaEffect || 'none' }));
      }
    }
  }, [user?.email]);

  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`daco_v12_pro_mirza_${user.email}`, JSON.stringify({ 
        points: userPoints, 
        isFounderButtonUnlocked,
        customSections,
        disabledSections: systemState.disabledSections,
        arenaEffect: systemState.arenaEffect
      }));
    }
  }, [userPoints, isFounderButtonUnlocked, customSections, systemState.disabledSections, systemState.arenaEffect]);

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassInput === 'asdmirza') {
      setIsAdmin(true);
      setUserPoints(999999);
      setUser(prev => prev ? { ...prev, rankKey: 'founder', isAdmin: true, username: "Muhammed Mirza Gülbahçe" } : null);
      setMessages(prev => [...prev, { id: 'admin-log', role: 'assistant', content: "MÜDÜR PANELİ: Mirza bey, sistem tam kontrolünüze geçti. İyi çalışmalar.", timestamp: new Date() }]);
      setShowAdminAuth(false);
      setIsAdminPanelOpen(true);
      setAdminPassInput('');
      setAuthError(false);
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 2000);
    }
  };

  const handleAdminPanelClose = () => {
    setIsAdminPanelOpen(false);
    // Mirza'nın isteği: Sadece paneli kapat, adminlikten çıkma
    setMessages(prev => [...prev, { id: 'admin-hide', role: 'assistant', content: "PANELL GİZLENDİ: Yetkileriniz hala aktif. Sidebar'dan istediğiniz an geri açabilirsiniz.", timestamp: new Date() }]);
  };

  const handleSendMessage = async (content: string) => {
    if (content.toLowerCase().trim() === 'asddaco') {
      setIsFounderButtonUnlocked(true);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content, timestamp: new Date() }]);
      setMessages(prev => [...prev, { id: 'unlocked', role: 'assistant', content: "⚠️ Kurucu Protokolü Tespit Edildi: Giriş düğmesi Sidebar'a entegre edildi.", timestamp: new Date() }]);
      return;
    }

    const newMessage: Message = { id: Date.now().toString(), role: 'user', content, timestamp: new Date() };
    setMessages(prev => [...prev, newMessage]);
    setLoading(true);

    try {
      const history = messages.slice(-8).map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] }));
      const response = await geminiService.chat(content, history, isAdmin);
      
      if (response.functionCalls && response.functionCalls.length > 0) {
        response.functionCalls.forEach(call => {
          if (call.name === 'remove_section' && isAdmin) {
            const sid = call.args.sectionId;
            setSystemState(prev => ({ ...prev, disabledSections: [...new Set([...prev.disabledSections, sid])] }));
            if (activeSection === sid) setActiveSection(AppSection.CHAT);
          }
          if (call.name === 'trigger_visual_effect') {
            setSystemState(prev => ({ ...prev, arenaEffect: call.args.effect }));
          }
          if (call.name === 'update_user_points') {
            const amt = Number(call.args.amount) || 0;
            setUserPoints(p => Math.max(0, p + amt));
          }
        });
      }

      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: response.text || "Emriniz yerine getirildi Mirza bey.", 
        timestamp: new Date() 
      }]);
    } catch (e) {
      setMessages(prev => [...prev, { id: 'err', role: 'assistant', content: "⚠️ İşlem başarısız oldu.", timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  const buyItem = (itemId: string, price: number, isVideo: boolean = false) => {
    if (userPoints >= price || isAdmin) {
      setUserPoints(p => isAdmin ? p : p - price);
      setUser(prev => prev ? { 
        ...prev, 
        unlockedVideos: isVideo ? [...prev.unlockedVideos, itemId] : prev.unlockedVideos,
        unlockedItems: !isVideo ? [...prev.unlockedItems, itemId] : prev.unlockedItems
      } : null);
      return true;
    }
    return false;
  };

  if (!country) return <CountrySelector onSelect={setCountry} />;
  if (!user) return <LoginView onLogin={(email, username, educationLevel) => setUser({ email, username, educationLevel, rankKey: 'junior', avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`, unlockedItems: [], unlockedVideos: [] })} country={country} translations={t} />;

  return (
    <div className={`flex h-screen bg-slate-950 overflow-hidden text-slate-100 transition-all duration-1000 relative ${systemState.arenaEffect === 'hacker' ? 'font-mono ring-4 ring-green-500/20' : systemState.arenaEffect === 'gold' ? 'ring-4 ring-yellow-400/20 shadow-[inset_0_0_100px_rgba(250,204,21,0.1)]' : ''}`}>
      
      {/* GLOBAL EFEKT KATMANI */}
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        {systemState.arenaEffect === 'hacker' && (
          <div className="absolute inset-0 opacity-20">
             {Array.from({ length: 40 }).map((_, i) => (
               <div key={i} className="absolute text-green-500 text-[10px] animate-[matrix_4s_infinite] whitespace-nowrap" style={{ left: `${i * 2.5}%`, animationDelay: `${Math.random() * 2}s` }}>
                 {Array.from({length: 30}).map(() => Math.floor(Math.random() * 2)).join('')}
               </div>
             ))}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.05),transparent_70%)]"></div>
          </div>
        )}
        {systemState.arenaEffect === 'rainbow' && (
          <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 animate-[rainbow-slide_10s_linear_infinite] bg-[length:200%_100%]"></div>
        )}
      </div>

      {/* MÜDÜR PANELİ GİRİŞ MODAL */}
      {showAdminAuth && (
        <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in duration-500">
          <div className={`max-w-xl w-full bg-slate-900 border-4 ${authError ? 'border-red-500' : 'border-yellow-400'} p-16 rounded-[4rem] relative shadow-2xl`}>
            <button onClick={() => setShowAdminAuth(false)} className="absolute top-10 right-10 text-slate-500 font-black uppercase text-[10px] hover:text-white">KAPAT</button>
            <div className="text-center mb-12">
               <div className="text-6xl mb-6">👑</div>
               <h1 className="text-4xl font-black text-white italic uppercase">MÜDÜR PANELİ</h1>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">MUHAMMED MİRZA GÜLBAHÇE ÖZEL ERİŞİM</p>
            </div>
            <form onSubmit={handleAdminAuth} className="space-y-8">
              <input autoFocus type="password" value={adminPassInput} onChange={(e) => setAdminPassInput(e.target.value)} placeholder="PAROLA" className="w-full bg-black border-2 border-slate-800 rounded-3xl px-8 py-6 text-center text-white font-black tracking-[0.5em] outline-none focus:border-yellow-400" />
              <button type="submit" className="w-full bg-yellow-400 text-black py-6 rounded-3xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all">SİSTEMİ AÇ 🛡️</button>
            </form>
          </div>
        </div>
      )}

      {/* MÜDÜR PANELİ YÜZER BUTON VE PANEL */}
      {isAdmin && (
        <>
          <button onClick={() => setIsAdminPanelOpen(!isAdminPanelOpen)} className={`fixed right-10 bottom-10 z-[5000] w-20 h-20 rounded-full flex items-center justify-center shadow-2xl border-4 border-black transition-all ${isAdminPanelOpen ? 'bg-black text-yellow-400 border-yellow-400' : 'bg-yellow-400 text-black animate-pulse'}`}>
            <span className="text-3xl font-black italic">{isAdminPanelOpen ? 'X' : 'M'}</span>
          </button>
          {isAdminPanelOpen && (
            <div className="fixed right-0 top-0 h-full w-[380px] z-[5001] bg-black/95 border-l-4 border-yellow-400 backdrop-blur-3xl p-10 animate-in slide-in-from-right flex flex-col">
              <div className="mb-10 pb-6 border-b border-yellow-400/20">
                <h3 className="text-2xl font-black text-yellow-400 italic uppercase">KOMUTA MERKEZİ</h3>
              </div>
              <div className="space-y-10 flex-1 overflow-y-auto no-scrollbar">
                <button onClick={() => setSystemState(s => ({...s, arenaEffect: 'hacker'}))} className="w-full p-4 bg-slate-900 text-green-500 rounded-2xl font-black text-[10px] border border-green-500/20">HACKER MOD</button>
                <button onClick={() => setSystemState(s => ({...s, arenaEffect: 'none'}))} className="w-full p-4 bg-slate-900 text-white rounded-2xl font-black text-[10px]">NORMAL MOD</button>
                <button onClick={() => setUserPoints(p => p + 1000000)} className="w-full p-5 bg-yellow-400 text-black rounded-3xl font-black text-[10px]">+1M XP EKLE</button>
              </div>
              <button onClick={handleAdminPanelClose} className="w-full py-5 bg-slate-800 hover:bg-slate-700 text-white rounded-3xl font-black text-[10px] uppercase mt-8 transition-all">PANELİ GİZLE 👁️</button>
            </div>
          )}
        </>
      )}

      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
        country={country} 
        user={user} 
        translations={t} 
        isAdmin={isAdmin} 
        isFounderUnlocked={isFounderButtonUnlocked}
        disabledSections={systemState.disabledSections} 
        customSections={customSections} 
        onAdminRequest={() => isAdmin ? setIsAdminPanelOpen(true) : setShowAdminAuth(true)}
      />
      <main className="flex-1 relative overflow-hidden bg-slate-950">
          {activeSection === AppSection.CHAT && <ChatView messages={messages} onSendMessage={handleSendMessage} onReceiveResponse={() => {}} translations={t} country={country} userPoints={isAdmin ? 'unlimited' : userPoints} onUseSuggestion={() => {}} isAdmin={isAdmin} isLoadingProp={loading} />}
          {activeSection === AppSection.ARENA && <ArenaView user={user} translations={t} systemState={systemState} />}
          {activeSection === AppSection.PROBLEMS && <ProblemStore translations={t} onEarnPoints={(amt) => setUserPoints(p => p + amt)} country={country} user={user} />}
          {activeSection === AppSection.AVATAR_STORE && <AvatarStore points={userPoints} unlockedItems={user.unlockedItems} onBuy={(id, p) => buyItem(id, p)} onSelectHat={(id) => setUser(prev => prev ? { ...prev, activeHat: id } : null)} activeHat={user.activeHat} />}
          {activeSection === AppSection.VIDEO_STORE && <VideoStore points={userPoints} unlockedVideos={user.unlockedVideos} onBuy={(id, p) => buyItem(id, p, true)} />}
          {activeSection === AppSection.PLANNER && <PlannerView translations={t} />}
          {activeSection === AppSection.RESOURCES && <ResourcesView country={country} translations={t} user={user} />}
          {activeSection === AppSection.STATS && <StatsView translations={t} stats={{studyHours: 12, completedTasks: 5, points: isAdmin ? 'unlimited' : userPoints, weeklyProgress: []}} />}
          {activeSection === AppSection.CODE && <CodePlayground translations={t} />}
          {activeSection === AppSection.MUSIC && <MusicView translations={t} />}
      </main>

      <style>{`
        @keyframes matrix { 0% { transform: translateY(-100%); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(1000%); opacity: 0; } }
        @keyframes rainbow-slide { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
      `}</style>
    </div>
  );
};

export default App;
