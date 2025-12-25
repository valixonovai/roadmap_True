import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Code2, 
  Database, 
  BrainCircuit, 
  Cpu, 
  Layout, 
  Rocket, 
  ChevronRight, 
  Layers,
  Terminal,
  Cloud,
  Loader2,
  Share2,
  Check
} from 'lucide-react';

const roadmapData = [
  {
    phase: "Poydevor va Ma'lumotlar",
    icon: <Database className="w-6 h-6" />,
    color: "blue",
    days: [
      { id: 1, tools: "Python, MediaPipe, OpenCV", task: "Imo ro'yxatini yopish (15–25 ta), loyiha scope aniqlash" },
      { id: 2, tools: "MediaPipe Hands", task: "Kamera orqali qo'l landmark 21 nuqtani real-time olish" },
      { id: 3, tools: "Python, NumPy", task: "Landmark'larni CSV/JSON formatda saqlash skripti" },
      { id: 4, tools: "Python, OpenCV", task: "Data yig'ish (Ma'lumotlar to'plash)" },
      { id: 5, tools: "Pandas, NumPy", task: "Data tozalash, normalization, train/val/test bo'lish" },
      { id: 6, tools: "NumPy", task: "Feature engineering (landmark vektor)" },
    ]
  },
  {
    phase: "ML Baseline",
    icon: <BrainCircuit className="w-6 h-6" />,
    color: "purple",
    days: [
      { id: 7, tools: "Scikit-learn", task: "RandomForest / MLP model qurish" },
      { id: 8, tools: "Scikit-learn", task: "Modelni train qilish" },
      { id: 9, tools: "Scikit-learn, Matplotlib", task: "Confusion matrix, xatolar tahlili" },
      { id: 10, tools: "Scikit-learn", task: "Baseline modelni yaxshilash" },
    ]
  },
  {
    phase: "Deep Learning (Sequential)",
    icon: <Cpu className="w-6 h-6" />,
    color: "indigo",
    days: [
      { id: 11, tools: "Python", task: "Gesture = sequence ekanini formalizatsiya qilish" },
      { id: 12, tools: "NumPy", task: "Sliding window / frame buffer yozish" },
      { id: 13, tools: "PyTorch / TensorFlow", task: "LSTM / GRU architecture qurish" },
      { id: 14, tools: "PyTorch / TensorFlow", task: "Modelni train qilish" },
      { id: 15, tools: "PyTorch / TensorFlow", task: "Loss va overfitting tahlili" },
      { id: 16, tools: "PyTorch / TensorFlow", task: "Hyperparameter tuning" },
      { id: 17, tools: "PyTorch", task: "CNN vs LSTM solishtirish" },
      { id: 18, tools: "PyTorch", task: "Eng yaxshi modelni tanlash" },
    ]
  },
  {
    phase: "Optimallashtirish",
    icon: <Layers className="w-6 h-6" />,
    color: "teal",
    days: [
      { id: 19, tools: "NumPy", task: "Time-based data augmentation" },
      { id: 20, tools: "NumPy", task: "Noise va jitter qo'shish" },
      { id: 28, tools: "PyTorch", task: "Model export (.pt / .onnx)" },
    ]
  },
  {
    phase: "Real-time Integratsiya",
    icon: <Terminal className="w-6 h-6" />,
    color: "orange",
    days: [
      { id: 29, tools: "OpenCV", task: "Kamera → model inference" },
      { id: 30, tools: "OpenCV", task: "FPS va latency test" },
      { id: 31, tools: "Python", task: "Prediction smoothing" },
      { id: 32, tools: "Python", task: "Edge case test" },
      { id: 33, tools: "Python", task: "Pipeline refactor" },
      { id: 34, tools: "OpenCV", task: "Full real-time test" },
      { id: 35, tools: "Screen Recorder", task: "Live demo video yozish" },
    ]
  },
  {
    phase: "Backend va UI",
    icon: <Layout className="w-6 h-6" />,
    color: "pink",
    days: [
      { id: 36, tools: "FastAPI", task: "Model uchun API yozish" },
      { id: 37, tools: "FastAPI", task: "Input → Output endpoint" },
      { id: 38, tools: "Python", task: "Error handling" },
      { id: 39, tools: "HTML / Streamlit", task: "Minimal UI dizayni" },
      { id: 40, tools: "Streamlit", task: "One-click demo yaratish" },
    ]
  },
  {
    phase: "Final Bosqich",
    icon: <Rocket className="w-6 h-6" />,
    color: "emerald",
    days: [
      { id: 41, tools: "Real users", task: "User test (3–5 kishi)" },
      { id: 42, tools: "Python", task: "Feedback asosida fix qilish" },
      { id: 43, tools: "GitHub", task: "Repo, README, dokumentatsiya" },
      { id: 44, tools: "OBS / Camera", task: "Demo rehearsal (tayyorgarlik)" },
      { id: 45, tools: "Live Demo", task: "Investor oldida ko'rsatish 🔥" },
    ]
  }
];

const App = () => {
  const [completedDays, setCompletedDays] = useState(new Set());
  const [activePhase, setActivePhase] = useState(0);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userId] = useState(() => {
    // Generate or retrieve user ID from localStorage
    let id = localStorage.getItem('userId');
    if (!id) {
      id = 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
      localStorage.setItem('userId', id);
    }
    return id;
  });

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`roadmap_progress_${userId}`);
      if (saved) {
        const data = JSON.parse(saved);
        setCompletedDays(new Set(data.completedIds || []));
      }
    } catch (error) {
      console.error("Loading error:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Save progress to localStorage
  const saveProgress = (completedSet) => {
    try {
      setSyncing(true);
      const data = {
        completedIds: Array.from(completedSet),
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(`roadmap_progress_${userId}`, JSON.stringify(data));
      setTimeout(() => setSyncing(false), 300);
    } catch (error) {
      console.error("Save error:", error);
      setSyncing(false);
    }
  };

  const toggleDay = (id) => {
    const newCompleted = new Set(completedDays);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedDays(newCompleted);
    saveProgress(newCompleted);
  };

  const copyShareLink = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const calculateProgress = () => {
    const totalDays = roadmapData.reduce((acc, phase) => acc + phase.days.length, 0);
    return Math.round((completedDays.size / totalDays) * 100);
  };

  const resetProgress = () => {
    if (window.confirm("Barcha progress o'chiriladi. Ishonchingiz komilmi?")) {
      setCompletedDays(new Set());
      localStorage.removeItem(`roadmap_progress_${userId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
        <p className="text-slate-500 font-medium italic">Ma'lumotlar yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Top bar with Share */}
        <div className="flex justify-between items-center mb-6">
           <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
              {syncing ? (
                <><Loader2 className="w-3 h-3 text-emerald-500 animate-spin" /> <span className="text-[10px] font-bold text-slate-500 uppercase">Saqlanmoqda</span></>
              ) : (
                <><Cloud className="w-3 h-3 text-emerald-500" /> <span className="text-[10px] font-bold text-slate-500 uppercase">Saqlandi</span></>
              )}
           </div>
           
           <div className="flex gap-2">
             <button 
               onClick={copyShareLink}
               className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl border border-slate-200 shadow-sm transition-all active:scale-95"
             >
               {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
               <span className="text-sm font-bold">{copied ? 'Nusxalandi!' : 'Ulashish'}</span>
             </button>
           </div>
        </div>

        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2 tracking-tight">
            Sign Language AI <span className="text-emerald-600">Roadmap</span>
          </h1>
          <p className="text-slate-500 text-lg">AI loyihangizni noldan investorlar oldigacha olib chiqish rejasi</p>
          
          {/* Progress Section */}
          <div className="mt-8 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-200">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1 text-left">Hozirgi natija</p>
                <h2 className="text-3xl font-black text-slate-800">{calculateProgress()}%</h2>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-600 mb-1">{completedDays.size} / 37 topshiriq</p>
                <div className="flex gap-1 justify-end">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i < Math.floor(calculateProgress()/20) ? 'bg-emerald-500' : 'bg-slate-100'}`} />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-1 border border-slate-200/50">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
            
            {completedDays.size > 0 && (
              <button 
                onClick={resetProgress}
                className="mt-4 text-xs text-slate-400 hover:text-red-500 transition-colors"
              >
                Progressni tozalash
              </button>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Phase Navigation */}
          <aside className="lg:col-span-4 space-y-3 lg:sticky lg:top-8">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-2">Bosqichlar</h2>
            {roadmapData.map((phase, index) => (
              <button
                key={index}
                onClick={() => setActivePhase(index)}
                className={`w-full flex items-center p-4 rounded-2xl transition-all duration-300 group ${
                  activePhase === index 
                  ? 'bg-white shadow-xl shadow-slate-200/50 border-l-[6px] border-emerald-500 scale-[1.02]' 
                  : 'hover:bg-white/60 text-slate-500 grayscale opacity-70 hover:opacity-100 hover:grayscale-0'
                }`}
              >
                <div className={`p-3 rounded-xl mr-4 transition-colors ${activePhase === index ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400 group-hover:bg-white'}`}>
                  {phase.icon}
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-tighter opacity-50 mb-0.5">Faza {index + 1}</p>
                  <p className={`font-bold leading-tight ${activePhase === index ? 'text-slate-900' : 'text-slate-600'}`}>{phase.phase}</p>
                </div>
                {activePhase === index && <ChevronRight className="ml-auto w-5 h-5 text-emerald-500 animate-pulse" />}
              </button>
            ))}
          </aside>

          {/* Task List */}
          <main className="lg:col-span-8">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden min-h-[500px]">
              <div className="p-8 border-b border-slate-50 bg-slate-50/30">
                <div className="flex items-center gap-3 mb-2">
                   <div className="w-2 h-6 bg-emerald-500 rounded-full"></div>
                   <h2 className="text-2xl font-black text-slate-800 tracking-tight">{roadmapData[activePhase].phase}</h2>
                </div>
                <p className="text-slate-500 text-sm font-medium">Ushbu bosqichda bajarilishi kerak bo'lgan texnik vazifalar:</p>
              </div>

              <div className="divide-y divide-slate-50">
                {roadmapData[activePhase].days.map((item) => (
                  <div 
                    key={item.id}
                    className={`p-6 md:p-8 transition-all group cursor-pointer ${completedDays.has(item.id) ? 'bg-emerald-50/20' : 'hover:bg-slate-50/50'}`}
                    onClick={() => toggleDay(item.id)}
                  >
                    <div className="flex items-start gap-6">
                      <button className="mt-1 shrink-0 relative" disabled={syncing}>
                        {completedDays.has(item.id) ? (
                          <CheckCircle2 className="w-8 h-8 text-emerald-500 fill-emerald-50" />
                        ) : (
                          <div className="w-8 h-8 rounded-full border-2 border-slate-200 group-hover:border-emerald-300 bg-white" />
                        )}
                      </button>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="text-[10px] font-black bg-slate-800 text-white px-2 py-0.5 rounded shadow-sm">
                            KUN {item.id}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                            <Code2 className="w-3.5 h-3.5" /> {item.tools}
                          </span>
                        </div>
                        <h3 className={`text-lg font-bold leading-snug transition-all ${completedDays.has(item.id) ? 'text-slate-400 line-through decoration-emerald-500/30' : 'text-slate-800 group-hover:text-emerald-700'}`}>
                          {item.task}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer / Quote */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden group">
                  <div className="absolute -right-4 -bottom-4 opacity-10 transition-transform group-hover:scale-110">
                    <Rocket className="w-24 h-24" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-2">Maslahat</p>
                  <p className="text-sm font-medium leading-relaxed opacity-90">
                    "Dataset yig'ishda turli yoritish sharoitlarini hisobga oling, bu modelning aniqligini 30% gacha oshiradi."
                  </p>
               </div>
               <div className="p-6 bg-emerald-500 rounded-3xl text-white relative overflow-hidden group">
                  <div className="absolute -right-4 -bottom-4 opacity-10 transition-transform group-hover:scale-110">
                    <BrainCircuit className="w-24 h-24" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-emerald-100 mb-2">Eslatma</p>
                  <p className="text-sm font-medium leading-relaxed">
                    Sizning progressiz brauzer xotirasida saqlanadi. Tozalamang, aks holda ma'lumotlar yo'qoladi!
                  </p>
               </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;