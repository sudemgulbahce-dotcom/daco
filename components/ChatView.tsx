
import React, { useState, useRef, useEffect } from 'react';
import { Message, Country } from '../types';
import { geminiService } from '../services/geminiService';

interface ChatViewProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  onReceiveResponse: (content: string, sources?: any[], suggestion?: string, functionCalls?: any[]) => void;
  translations: any;
  country: Country;
  userPoints: number | 'unlimited';
  onUseSuggestion: () => void;
  isAdmin?: boolean;
  isLoadingProp?: boolean;
}

export const ChatView: React.FC<ChatViewProps> = ({ 
  messages, 
  onSendMessage, 
  translations: t, 
  country,
  userPoints,
  isAdmin = false,
  isLoadingProp = false
}) => {
  const [input, setInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [isSpeechLoading, setIsSpeechLoading] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const activeSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoadingProp]);

  const decodeBase64ToUint8 = (base64: string) => {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  };

  const decodePCM = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
    return buffer;
  };

  const handleSpeak = async (msgId: string, text: string) => {
    if (isSpeaking === msgId) {
      if (activeSourceRef.current) activeSourceRef.current.stop();
      setIsSpeaking(null);
      return;
    }
    setIsSpeechLoading(msgId);
    try {
      if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') await ctx.resume();
      const base64Audio = await geminiService.generateSpeech(text);
      if (!base64Audio) throw new Error("Ses yok");
      const uint8Data = decodeBase64ToUint8(base64Audio);
      const audioBuffer = await decodePCM(uint8Data, ctx, 24000, 1);
      if (activeSourceRef.current) activeSourceRef.current.stop();
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = () => { if (isSpeaking === msgId) setIsSpeaking(null); };
      setIsSpeechLoading(null);
      setIsSpeaking(msgId);
      activeSourceRef.current = source;
      source.start();
    } catch {
      setIsSpeechLoading(null);
      setIsSpeaking(null);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoadingProp) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className={`flex flex-col h-full relative overflow-hidden w-full ${isAdmin ? 'bg-black' : 'bg-slate-950'}`}>
      <header className={`h-24 border-b flex items-center px-10 justify-between shrink-0 backdrop-blur-3xl z-50 ${isAdmin ? 'bg-black border-yellow-400/30' : 'bg-slate-950/80 border-slate-900'}`}>
        <div className="flex items-center gap-6">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-all duration-700 ${isAdmin ? 'bg-yellow-400 text-black rotate-6' : 'bg-slate-900 text-white'}`}>{isAdmin ? '🛡️' : '🤖'}</div>
          <div>
            <h1 className={`font-black tracking-tighter italic text-2xl uppercase ${isAdmin ? 'text-yellow-400' : 'text-white'}`}>DACO<span className={isAdmin ? 'text-white' : 'text-blue-500'}>{isAdmin ? 'ELITE' : 'LEARN'}</span></h1>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.5em] italic">Hyper-Sync v9.0</p>
          </div>
        </div>
        <div className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${isAdmin ? 'border-yellow-400 text-yellow-400 bg-yellow-400/10' : 'border-slate-800 text-slate-500'}`}>
          PUAN: <span className="text-xl ml-2 font-black italic">{userPoints === 'unlimited' ? '∞' : userPoints}</span>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-12 space-y-12 no-scrollbar pb-32">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            <div className={`max-w-[85%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
               <div className={`inline-block p-10 rounded-[4rem] shadow-2xl relative border-2 transition-all ${
                msg.role === 'user' 
                  ? (isAdmin ? 'bg-yellow-400 text-black border-yellow-300 rounded-tr-none' : 'bg-blue-600 text-white border-blue-500 rounded-tr-none') 
                  : (isAdmin ? 'bg-slate-900/90 border-yellow-400/20 text-slate-100 rounded-tl-none' : 'bg-slate-900 border-slate-800 text-slate-100 rounded-tl-none')
              }`}>
                {msg.role === 'assistant' && (
                  <button onClick={() => handleSpeak(msg.id, msg.content)} className={`absolute -right-16 top-0 w-14 h-14 rounded-full flex items-center justify-center transition-all bg-slate-800 border-2 border-slate-700 text-white hover:bg-yellow-400 hover:text-black ${isSpeaking === msg.id || isSpeechLoading === msg.id ? 'bg-yellow-400 text-black' : ''}`}>
                    {isSpeechLoading === msg.id ? '⏳' : isSpeaking === msg.id ? '⏸️' : '🔊'}
                  </button>
                )}
                <div className="prose prose-invert prose-2xl max-w-none font-medium italic whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          </div>
        ))}
        {isLoadingProp && (
           <div className="flex items-center gap-4 px-10">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
              <span className="text-[9px] font-black text-yellow-400 uppercase tracking-widest italic animate-pulse">Komut İşleniyor...</span>
           </div>
        )}
      </div>

      <footer className={`p-10 border-t sticky bottom-0 z-50 backdrop-blur-3xl transition-all ${isAdmin ? 'bg-black border-yellow-400/20' : 'bg-slate-950/80 border-slate-900'}`}>
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleSubmit} className={`relative flex items-center rounded-[3rem] p-1 border-4 transition-all ${isAdmin ? 'bg-black border-yellow-400' : 'bg-slate-900 border-slate-800'}`}>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={isAdmin ? "Bir emir verin efendim..." : "Asistanınıza bir şey sorun..."} className={`flex-1 bg-transparent px-10 py-6 outline-none font-bold text-lg italic ${isAdmin ? 'text-yellow-400 placeholder-yellow-400/30' : 'text-white'}`} />
            <button type="submit" disabled={isLoadingProp} className={`px-12 py-6 font-black uppercase tracking-widest rounded-[2.5rem] m-1 transition-all ${isAdmin ? 'bg-yellow-400 text-black' : 'bg-blue-600 text-white'}`}>
              {isLoadingProp ? '...' : 'GÖNDER'}
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
};
