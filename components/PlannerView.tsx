
import React, { useState, useEffect } from 'react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  time: string;
  priority: 'low' | 'high';
}

interface PlannerViewProps {
  translations: any;
}

export const PlannerView: React.FC<PlannerViewProps> = ({ translations: t }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('daco_tasks_pro');
    return saved ? JSON.parse(saved) : [
      { id: '1', text: 'MEB Matematik - Trigonometri Analizi (S.50)', completed: false, time: '09:00', priority: 'high' },
      { id: '2', text: 'İngilizce Vocab Quiz - Unit 2', completed: true, time: '14:30', priority: 'low' },
    ];
  });
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('daco_tasks_pro', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      priority: 'high'
    };
    setTasks([task, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="p-8 md:p-16 max-w-5xl mx-auto h-full overflow-y-auto bg-slate-950 no-scrollbar">
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-4">
           <div className="w-2 h-10 bg-yellow-400 rounded-full"></div>
           <h1 className="text-6xl md:text-7xl font-black text-white italic tracking-tighter uppercase">GÖREV <span className="text-yellow-400">MERKEZİ</span></h1>
        </div>
        <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px] italic ml-6">Akademik Disiplin ve Zaman Yönetimi</p>
      </header>

      <form onSubmit={addTask} className="mb-16 flex gap-4 animate-in slide-in-from-top duration-700">
        <input 
          type="text" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Yeni akademik hedef girin..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-[2rem] px-10 py-6 text-white font-black outline-none focus:border-blue-500 transition-all text-sm shadow-inner"
        />
        <button type="submit" className="bg-blue-600 text-white px-12 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-900/20">EKLE +</button>
      </form>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className={`group bg-slate-900/40 border p-8 rounded-[3rem] flex items-center justify-between transition-all duration-500 ${task.completed ? 'border-green-900/30 opacity-40 scale-[0.98]' : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'}`}>
            <div className="flex items-center gap-8">
               <button 
                onClick={() => toggleTask(task.id)} 
                className={`w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all ${task.completed ? 'bg-green-600 border-green-600 text-white rotate-[360deg]' : 'border-slate-700 hover:border-blue-500'}`}
               >
                 {task.completed && <span className="text-xl font-black italic">✓</span>}
               </button>
               <div>
                  <h3 className={`font-black text-xl italic tracking-tight uppercase ${task.completed ? 'text-slate-500 line-through' : 'text-white'}`}>{task.text}</h3>
                  <div className="flex items-center gap-3 mt-2">
                     <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{task.time}</span>
                     <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
                     <span className={`text-[9px] font-black uppercase tracking-widest ${task.priority === 'high' ? 'text-red-500' : 'text-slate-600'}`}>Önem: {task.priority.toUpperCase()}</span>
                  </div>
               </div>
            </div>
            <button 
              onClick={() => deleteTask(task.id)} 
              className="opacity-0 group-hover:opacity-100 bg-red-500/10 text-red-500 px-6 py-3 rounded-2xl text-[10px] font-black hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest shadow-xl"
            >
              SİL
            </button>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="py-32 text-center border-4 border-slate-900 border-dashed rounded-[5rem] animate-pulse">
             <p className="text-slate-700 font-black uppercase italic tracking-[0.4em] text-sm">Aktif Görev Listesi Boş</p>
          </div>
        )}
      </div>
    </div>
  );
};
