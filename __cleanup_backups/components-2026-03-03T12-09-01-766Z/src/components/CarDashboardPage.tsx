import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Map, 
  Music, 
  Zap, 
  Battery, 
  Wifi, 
  Bluetooth, 
  Navigation, 
  Maximize2,
  ChevronRight,
  Play,
  Pause,
  SkipForward,
  SkipBack
} from 'lucide-react';

// --- Reusable Dashboard Components ---

const DashboardCard = ({ 
  title, 
  children, 
  className = "", 
  active = false 
}: { 
  title: string; 
  children: React.ReactNode; 
  className?: string;
  active?: boolean;
}) => (
  <div className={`bg-[#0A0A0A] border ${active ? 'border-white' : 'border-white/10'} p-6 flex flex-col h-full relative overflow-hidden group transition-colors hover:border-white/30 ${className}`}>
    <div className="flex justify-between items-start mb-4 z-10">
      <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase group-hover:text-white transition-colors">{title}</h3>
      {active && <div className="w-2 h-2 bg-[#FF3300] rounded-full animate-pulse shadow-[0_0_10px_#FF3300]" />}
    </div>
    <div className="flex-grow z-10 relative">
      {children}
    </div>
    {/* Scanline effect */}
    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
  </div>
);

const RangeSlider = ({ label, value, onChange }: { label: string; value: number; onChange?: (val: number) => void }) => (
  <div className="mb-6">
    <div className="flex justify-between text-xs font-mono mb-2">
      <span className="text-gray-400 uppercase">{label}</span>
      <span className="text-white">{value}%</span>
    </div>
    <div className="h-12 bg-[#1A1A1A] relative cursor-pointer group overflow-hidden">
      {/* Tick marks */}
      <div className="absolute inset-0 flex justify-between px-1">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`w-[1px] h-full ${i % 5 === 0 ? 'bg-white/20' : 'bg-white/5'}`} />
        ))}
      </div>
      {/* Fill */}
      <motion.div 
        className="absolute top-0 left-0 h-full bg-white group-hover:bg-[#FF3300] transition-colors"
        style={{ width: `${value}%` }}
      />
      {/* Handle */}
      <div 
        className="absolute top-0 h-full w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        style={{ left: `${value}%` }}
      />
    </div>
  </div>
);

const Equalizer = () => {
  return (
    <div className="flex items-end justify-between h-32 gap-1">
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          className="w-full bg-gradient-to-t from-[#FF3300]/20 to-[#FF3300]"
          animate={{ 
            height: [`${20 + Math.random() * 30}%`, `${40 + Math.random() * 60}%`, `${20 + Math.random() * 30}%`] 
          }}
          transition={{ 
            duration: 0.5 + Math.random() * 0.5, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
      ))}
    </div>
  );
};

const MapVisual = () => (
  <div className="relative w-full h-full min-h-[200px] bg-[#111] overflow-hidden opacity-80">
    {/* Grid */}
    <div className="absolute inset-0" 
      style={{ 
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', 
        backgroundSize: '40px 40px' 
      }} 
    />
    {/* Roads */}
    <svg className="absolute inset-0 w-full h-full stroke-white/20 stroke-2 fill-none">
      <path d="M0,100 Q150,150 300,100 T600,150" />
      <path d="M100,0 L150,300" />
      <path d="M400,0 L350,300" />
      <circle cx="300" cy="100" r="4" className="fill-[#FF3300] animate-ping" />
      <circle cx="300" cy="100" r="2" className="fill-white" />
    </svg>
    {/* UI Overlay */}
    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-2 py-1 border border-white/10 text-[10px] font-mono">
      LAT: 55.7558 N<br/>LON: 37.6173 E
    </div>
  </div>
);

const ToggleSwitch = ({ label, active }: { label: string; active: boolean }) => (
  <div className="flex items-center justify-between py-4 border-b border-white/10">
    <span className="text-sm font-bold text-gray-300 uppercase">{label}</span>
    <div className={`w-12 h-6 rounded-full relative transition-colors ${active ? 'bg-[#FF3300]' : 'bg-[#333]'}`}>
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${active ? 'left-7' : 'left-1'}`} />
    </div>
  </div>
);

// --- Main Page ---

export default function CarDashboardPage() {
  const [activeTab, setActiveTab] = useState('LAB');
  const [volume, setVolume] = useState(45);
  const [brightness, setBrightness] = useState(80);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FF3300] selection:text-white overflow-x-hidden">
      
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur border-b border-white/10 h-16 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-black tracking-tighter italic">AI MINDSET</h1>
          <nav className="hidden md:flex gap-1">
            {['LAB', 'SPACE', 'TEAMS', 'SETTINGS'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1 text-xs font-bold rounded-full border transition-all ${
                  activeTab === tab 
                    ? 'bg-white text-black border-white' 
                    : 'text-gray-500 border-transparent hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <Wifi size={14} /> 5G
          </div>
          <div className="flex items-center gap-2">
            <Battery size={14} /> 100%
          </div>
          <span>12:30 PM</span>
          <span className="bg-[#FF3300] text-white px-2 py-0.5 rounded text-[10px] font-bold">LIVE</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6 md:px-12 max-w-[1600px] mx-auto">
        
        {/* Hero Header */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end border-b border-white/20 pb-8">
          <div>
            <div className="text-[#FF3300] font-mono text-xs mb-2 tracking-widest">BATCH: WINTER 26</div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
              System<br/>Override
            </h2>
          </div>
          <div className="text-right mt-8 md:mt-0">
            <div className="text-sm font-mono text-gray-400 mb-2">STATUS: APPLICATIONS OPEN</div>
            <div className="text-3xl font-bold">19 JAN — 16 FEB</div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          
          {/* Module 1: Prompt Engineering (Controls) */}
          <div className="col-span-1 md:col-span-4 h-full">
            <DashboardCard title="01 // PROMPT ENGINEERING" active>
              <div className="space-y-2">
                <div className="text-sm text-gray-400 mb-6">
                  AI как интерфейс мышления. Chain-of-Thought, Few-Shot Learning.
                </div>
                <RangeSlider label="TEMPERATURE" value={75} />
                <RangeSlider label="TOP_P" value={90} />
                <ToggleSwitch label="Chain of Thought" active={true} />
                <ToggleSwitch label="Few-Shot Mode" active={false} />
              </div>
            </DashboardCard>
          </div>

          {/* Module 2: Context (Map) */}
          <div className="col-span-1 md:col-span-5 h-full">
            <DashboardCard title="02 // CONTEXT ENGINEERING">
              <div className="absolute inset-0 top-12">
                <MapVisual />
                <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur p-4 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">DESTINATION</div>
                  <div className="text-lg font-bold">PERSONAL OS</div>
                  <div className="text-xs text-gray-500 mt-2">Obsidian + MCP + Claude Agents</div>
                </div>
              </div>
            </DashboardCard>
          </div>

          {/* Module 3: Mind (Equalizer) */}
          <div className="col-span-1 md:col-span-3 h-full">
            <DashboardCard title="03 // MIND ENGINEERING">
              <div className="h-full flex flex-col justify-end">
                <div className="mb-4">
                  <div className="text-2xl font-bold mb-1">FOCUS</div>
                  <div className="text-xs text-gray-400">AI Coaching & Reflection</div>
                </div>
                <Equalizer />
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button className="bg-white/10 hover:bg-white/20 p-2 text-center text-xs font-bold rounded">WARM</button>
                  <button className="bg-[#FF3300] p-2 text-center text-xs font-bold rounded text-white">BRIGHT</button>
                </div>
              </div>
            </DashboardCard>
          </div>

          {/* Module 4: Life (Media Player) */}
          <div className="col-span-1 md:col-span-6 h-[300px]">
            <DashboardCard title="04 // LIFE ENGINEERING">
              <div className="flex flex-col md:flex-row h-full gap-6">
                <div className="w-full md:w-1/3 bg-gray-800 relative overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" 
                    alt="Cover" 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center border border-white/20">
                      <Play size={20} fill="white" />
                    </div>
                  </div>
                </div>
                <div className="flex-grow flex flex-col justify-center">
                  <div className="text-[#FF3300] text-xs font-bold mb-2">NOW PLAYING</div>
                  <h3 className="text-3xl font-bold mb-1">VIBE CODING</h3>
                  <p className="text-gray-400 text-sm mb-6">Cursor + Windsurf + Claude Projects</p>
                  
                  <div className="flex items-center gap-6">
                    <SkipBack size={24} className="text-gray-500 hover:text-white cursor-pointer" />
                    <Pause size={32} className="text-white hover:text-[#FF3300] cursor-pointer" fill="white" />
                    <SkipForward size={24} className="text-gray-500 hover:text-white cursor-pointer" />
                  </div>
                  
                  <div className="w-full bg-gray-800 h-1 mt-6 rounded-full overflow-hidden">
                    <div className="bg-white h-full w-2/3" />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-2">
                    <span>01:24</span>
                    <span>04:00</span>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>

          {/* Pricing / Specs */}
          <div className="col-span-1 md:col-span-6 h-[300px]">
            <DashboardCard title="VEHICLE CONFIGURATION">
              <div className="grid grid-cols-2 h-full gap-4">
                <div className="bg-white/5 p-4 flex flex-col justify-between hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-[#FF3300]">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">MODEL</div>
                    <div className="text-xl font-bold">BASE LAB</div>
                  </div>
                  <div>
                    <div className="text-2xl font-mono text-[#FF3300] mb-2">€590</div>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• 4 Live Workshops</li>
                      <li>• 4 Coworking Sessions</li>
                      <li>• Mentor Support</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-white/5 p-4 flex flex-col justify-between hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-[#FF3300]">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">MODEL</div>
                    <div className="text-xl font-bold">ADVANCED</div>
                  </div>
                  <div>
                    <div className="text-2xl font-mono text-[#FF3300] mb-2">€890</div>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Everything in Base</li>
                      <li>• 4 Advanced Tracks</li>
                      <li>• Vibe Coding & Agents</li>
                    </ul>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>

        </div>

        {/* Footer Controls */}
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 p-6 z-50">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-8 w-full md:w-auto">
               <div className="flex flex-col">
                 <span className="text-[10px] text-gray-500 uppercase">Climate</span>
                 <span className="text-xl font-bold">21.5°C</span>
               </div>
               <div className="h-8 w-[1px] bg-white/10" />
               <div className="flex flex-col">
                 <span className="text-[10px] text-gray-500 uppercase">Range</span>
                 <span className="text-xl font-bold">450 KM</span>
               </div>
            </div>
            
            <button className="w-full md:w-auto bg-[#FF3300] hover:bg-[#cc2900] text-white px-12 py-4 font-bold uppercase tracking-widest rounded-sm transition-colors shadow-[0_0_20px_rgba(255,51,0,0.3)]">
              Start Engine
            </button>

            <div className="hidden md:flex items-center gap-4">
               <Settings className="text-gray-500 hover:text-white cursor-pointer" />
               <Maximize2 className="text-gray-500 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
