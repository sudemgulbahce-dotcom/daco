
import React, { useState, useEffect, useRef } from 'react';
import { MusicTrack } from '../types';

interface MusicViewProps {
  translations: any;
  addedTracks?: MusicTrack[];
}

export const MusicView: React.FC<MusicViewProps> = ({ translations: t, addedTracks = [] }) => {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const defaultTracks = [
    { id: '1', name: 'Lofi Study', icon: '☕', color: 'from-amber-600 to-slate-900', url: 'https://www.soundjay.com/nature/rain-03.mp3' }, // Stabil Link
    { id: '2', name: 'Deep Focus', icon: '🧠', color: 'from-blue-600 to-slate-950', url: 'https://cdn.pixabay.com/audio/2023/10/26/audio_924a682121.mp3' },
    { id: '3', name: 'Zen Night', icon: '🌙', color: 'from-indigo-900 to-black', url: 'https://cdn.pixabay.com/audio/2022/02/22/audio_d1718ad410.mp3' },
    { id: '4', name: 'Cyber Beats', icon: '⚡', color: 'from-red-600 to-slate-900', url: 'https://cdn.pixabay.com/audio/2023/06/20/audio_51795e1c4b.mp3' },
  ];

  const allTracks = [...defaultTracks, ...addedTracks];

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const toggleTrack = (track: any) => {
    if (!audioRef.current) return;
    if (isPlaying === track.id) {
      audioRef.current.pause();
      setIsPlaying(null);
      return;
    }
    setIsLoading(true);
    audioRef.current.src = track.url;
    audioRef.current.play().then(() => {
      setIsPlaying(track.id);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
      setIsPlaying(null);
      alert("Müzik yüklenemedi. Lütfen tekrar deneyin.");
    });
  };

  return (
    <div className="p-12 md:p-20 max-w-7xl mx-auto h-full overflow-y-auto bg-slate-950 no-scrollbar">
      <audio ref={audioRef} loop crossOrigin="anonymous" />
      <header className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
        <div>
          <h1 className="text-7xl font-black text-white italic tracking-tighter uppercase mb-4">ODAK <span className="text-blue-500">HATTİ</span></h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] italic">Stabil Audio Engine v3.0</p>
        </div>
        <div className="bg-slate-900/60 p-10 rounded-[3.5rem] w-full lg:w-[400px]">
          <div className="flex justify-between items-center mb-4 text-[10px] font-black text-slate-500">
            <span>SES SEVİYESİ</span>
            <span className="text-blue-400">{Math.round(volume*100)}%</span>
          </div>
          <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-full accent-blue-600 cursor-pointer" />
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {allTracks.map((track) => (
          <div key={track.id} onClick={() => !isLoading && toggleTrack(track)} className={`group relative h-[420px] bg-gradient-to-br ${track.color} rounded-[5rem] p-12 cursor-pointer transition-all duration-700 shadow-2xl border-[8px] ${isPlaying === track.id ? 'border-white' : 'border-black/20 hover:border-white/20'}`}>
            <div className="h-full flex flex-col justify-between text-white relative z-10">
               <div className={`text-[120px] transition-all duration-700 ${isPlaying === track.id ? 'rotate-12 scale-110' : 'grayscale group-hover:grayscale-0'}`}>{track.icon}</div>
               <div>
                  <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-4">{track.name}</h3>
                  <div className={`py-6 rounded-3xl text-center text-[10px] font-black uppercase tracking-widest ${isPlaying === track.id ? 'bg-white text-black' : 'bg-black/40'}`}>
                    {isLoading && isPlaying === track.id ? 'YÜKLENİYOR...' : isPlaying === track.id ? 'DURDUR' : 'BAŞLAT'}
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
