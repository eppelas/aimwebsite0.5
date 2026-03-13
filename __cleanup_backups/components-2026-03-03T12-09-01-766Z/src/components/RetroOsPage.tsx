import React, { useState, useEffect } from 'react';
import { X, Minus, Square, Monitor, HardDrive, Folder, FileText, Globe } from 'lucide-react';

// --- Components ---

const BevelBorder = ({ children, className = "", active = true }: { children: React.ReactNode; className?: string; active?: boolean }) => (
  <div className={`bg-[#C0C0C0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] ${className}`}>
    <div className="border-b border-r border-[#808080]">
      {children}
    </div>
  </div>
);

const Window = ({ title, children, className = "", icon = <FileText size={16} />, active = true, onClose }: any) => (
  <BevelBorder className={`flex flex-col shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] ${className}`}>
    {/* Title Bar */}
    <div className={`px-1 py-1 flex justify-between items-center select-none ${active ? 'bg-[#000080] text-white' : 'bg-[#808080] text-[#C0C0C0]'}`}>
      <div className="flex items-center gap-2 font-bold text-sm tracking-wide">
        {icon}
        <span>{title}</span>
      </div>
      <div className="flex gap-1">
        <button className="w-4 h-4 bg-[#C0C0C0] border-t border-l border-white border-b border-r border-black flex items-center justify-center active:border-t-black active:border-l-black active:border-b-white active:border-r-white">
          <Minus size={10} color="black" />
        </button>
        <button className="w-4 h-4 bg-[#C0C0C0] border-t border-l border-white border-b border-r border-black flex items-center justify-center active:border-t-black active:border-l-black active:border-b-white active:border-r-white">
          <Square size={10} color="black" />
        </button>
        <button 
          onClick={onClose}
          className="w-4 h-4 bg-[#C0C0C0] border-t border-l border-white border-b border-r border-black flex items-center justify-center active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
        >
          <X size={10} color="black" />
        </button>
      </div>
    </div>
    
    {/* Content Area */}
    <div className="flex-grow p-1">
      <div className="h-full bg-white text-black border-t border-l border-[#404040] border-b border-r border-white overflow-auto p-4 font-mono text-sm">
        {children}
      </div>
    </div>
  </BevelBorder>
);

const DesktopIcon = ({ label, icon, onClick }: any) => (
  <div 
    onClick={onClick}
    className="flex flex-col items-center gap-1 w-20 cursor-pointer group mb-4"
  >
    <div className="w-10 h-10 flex items-center justify-center text-white group-hover:opacity-80">
      {icon}
    </div>
    <span className="text-white text-xs text-center font-mono bg-[#008080] group-hover:bg-[#000080] px-1">
      {label}
    </span>
  </div>
);

const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#0000AA] text-white font-mono flex flex-col items-center justify-center z-50">
      <div className="w-full max-w-2xl px-8">
        <div className="flex justify-between items-end mb-8 border-b-2 border-white pb-2">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            AI MINDSET<span className="text-xs align-top">®</span>
          </h1>
          <div className="text-right text-xs">
            <div>BIOS Date: 01/19/26 18:22:45 Ver: 1.01</div>
            <div>CPU: Neural Net Processor 128-Core</div>
          </div>
        </div>

        <div className="space-y-2 mb-16 text-sm">
          <div className="flex justify-between">
            <span>Memory Test:</span>
            <span>640K OK</span>
          </div>
          <div className="flex justify-between">
             <span>Loading System...</span>
             <span>{progress}%</span>
          </div>
          <div className="w-full h-4 border-2 border-white p-0.5">
            <div className="h-full bg-white" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="text-center text-xs opacity-70">
          Copyright (C) 2026 AI Mindset Lab. All Rights Reserved. <br/>
          Press DEL to enter Setup.
        </div>
      </div>
    </div>
  );
};

// --- Main Desktop ---

export default function RetroOsPage() {
  const [booted, setBooted] = useState(false);
  const [activeWindow, setActiveWindow] = useState<string | null>('welcome');
  const [minimized, setMinimized] = useState<string[]>([]);

  const toggleWindow = (id: string) => {
    if (activeWindow === id) {
      setMinimized(prev => [...prev, id]);
      setActiveWindow(null);
    } else {
      setMinimized(prev => prev.filter(w => w !== id));
      setActiveWindow(id);
    }
  };

  if (!booted) {
    return <BootScreen onComplete={() => setBooted(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#008080] font-sans overflow-hidden flex flex-col relative selection:bg-[#000080] selection:text-white">
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 z-0">
        <DesktopIcon 
          label="My Computer" 
          icon={<Monitor size={32} />} 
          onClick={() => toggleWindow('welcome')} 
        />
        <DesktopIcon 
          label="Curriculum" 
          icon={<Folder size={32} />} 
          onClick={() => toggleWindow('program')} 
        />
        <DesktopIcon 
          label="Internet" 
          icon={<Globe size={32} />} 
          onClick={() => toggleWindow('pricing')} 
        />
        <DesktopIcon 
          label="Recycle Bin" 
          icon={<HardDrive size={32} />} 
        />
      </div>

      {/* Windows Layer */}
      <div className="flex-grow relative p-4 md:p-8 pointer-events-none">
        
        {/* Welcome Window */}
        {activeWindow === 'welcome' && (
          <div className="absolute top-8 left-8 md:left-32 right-8 md:right-auto md:w-[600px] pointer-events-auto z-30">
            <Window title="Welcome to AI Mindset Lab" onClose={() => toggleWindow('welcome')}>
              <div className="flex gap-6">
                <div className="w-32 hidden md:block">
                  <img src="https://picsum.photos/seed/retro/200/300" alt="Wizard" className="w-full h-auto border border-black grayscale" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold uppercase">Welcome to the Lab</h2>
                  <p>
                    AI Mindset Winter Lab W26 is a space for experiments. Here you don't just study, you create: personal assistants, AI-first processes, a new version of yourself.
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Prompt Engineering</li>
                    <li>Context Engineering</li>
                    <li>Mind Engineering</li>
                    <li>Life Engineering</li>
                  </ul>
                  <div className="pt-4 flex gap-4">
                    <button onClick={() => toggleWindow('program')} className="bg-[#C0C0C0] border-t border-l border-white border-b border-r border-black px-4 py-1 active:border-t-black active:border-l-black active:border-b-white active:border-r-white">
                      View Program
                    </button>
                    <button onClick={() => toggleWindow('pricing')} className="bg-[#C0C0C0] border-t border-l border-white border-b border-r border-black px-4 py-1 active:border-t-black active:border-l-black active:border-b-white active:border-r-white">
                      Join Now
                    </button>
                  </div>
                </div>
              </div>
            </Window>
          </div>
        )}

        {/* Program Window */}
        {activeWindow === 'program' && (
          <div className="absolute top-16 left-4 md:left-1/3 right-4 md:right-auto md:w-[700px] pointer-events-auto z-40">
            <Window title="C:\PROGRAM FILES\CURRICULUM" icon={<Folder size={16} />} onClose={() => toggleWindow('program')}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { name: "Week_01.exe", label: "PROMPT", icon: <FileText size={32} /> },
                  { name: "Week_02.exe", label: "CONTEXT", icon: <FileText size={32} /> },
                  { name: "Week_03.exe", label: "MIND", icon: <FileText size={32} /> },
                  { name: "Week_04.exe", label: "LIFE", icon: <FileText size={32} /> }
                ].map((file, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 p-2 hover:bg-[#000080] hover:text-white cursor-pointer group">
                    <div className="text-[#000080] group-hover:text-white">{file.icon}</div>
                    <span className="text-xs">{file.name}</span>
                    <span className="text-[10px] opacity-60">{file.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 border-t border-[#808080] pt-4">
                <p className="mb-2 font-bold">System Requirements:</p>
                <div className="bg-black text-[#00FF00] p-4 font-mono text-xs overflow-y-auto h-32">
                  &gt; SCANNING FOR MINDSET...<br/>
                  &gt; DETECTED: CURIOSITY<br/>
                  &gt; DETECTED: WILLINGNESS TO ADAPT<br/>
                  &gt; LOADING MODULES...<br/>
                  &gt; [OK] Chain-of-Thought<br/>
                  &gt; [OK] Obsidian Vault<br/>
                  &gt; [OK] Vibe Coding<br/>
                  &gt; READY TO INSTALL.
                </div>
              </div>
            </Window>
          </div>
        )}

        {/* Pricing Window */}
        {activeWindow === 'pricing' && (
          <div className="absolute top-24 left-8 md:left-1/4 right-8 md:right-auto md:w-[800px] pointer-events-auto z-50">
            <Window title="Netscape Navigator - Join Lab" icon={<Globe size={16} />} onClose={() => toggleWindow('pricing')}>
              <div className="bg-white border border-[#808080] p-1 mb-2 flex gap-2 text-xs">
                <span>Location:</span>
                <input type="text" value="https://join.aimindset.org/context" readOnly className="flex-grow border border-[#808080] px-1" />
              </div>
              
              <div className="border border-[#808080] p-4 bg-[#F0F0F0]">
                <h3 className="text-center font-bold text-xl mb-6 underline">CHOOSE YOUR ACCESS LEVEL</h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { name: "BASE", price: "€590", features: ["4 Workshops", "Community", "Materials"] },
                    { name: "ADVANCED", price: "€890", features: ["Everything in Base", "+ 4 Tracks", "Priority Support"], bg: "bg-[#FFFFE0]" },
                    { name: "PREMIUM", price: "€1,490", features: ["Everything in Adv", "1:1 Strategy", "Personal Plan"] }
                  ].map((plan, i) => (
                    <div key={i} className={`border border-black p-4 ${plan.bg || 'bg-white'} shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]`}>
                      <div className="font-bold text-lg text-center mb-2">{plan.name}</div>
                      <div className="text-2xl text-center mb-4 text-red-600 font-bold">{plan.price}</div>
                      <ul className="text-xs space-y-1 mb-4 list-disc pl-4">
                        {plan.features.map((f, j) => <li key={j}>{f}</li>)}
                      </ul>
                      <a href="https://join.aimindset.org/context" className="block w-full text-center bg-[#C0C0C0] border-t border-l border-white border-b border-r border-black py-1 active:border-t-black active:border-l-black active:border-b-white active:border-r-white text-xs font-bold">
                        SELECT
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </Window>
          </div>
        )}
      </div>

      {/* Taskbar */}
      <div className="h-10 bg-[#C0C0C0] border-t border-white flex items-center px-1 gap-1 relative z-50">
        <button 
          className="h-8 px-2 flex items-center gap-1 font-bold bg-[#C0C0C0] border-t border-l border-white border-b border-r border-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
          onClick={() => setActiveWindow('welcome')}
        >
          <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-blue-500" />
          Start
        </button>
        
        <div className="w-[2px] h-6 bg-[#808080] border-r border-white mx-1" />
        
        {['welcome', 'program', 'pricing'].map(id => (
          <button
            key={id}
            onClick={() => toggleWindow(id)}
            className={`h-8 px-4 flex items-center gap-2 text-xs font-bold w-40 truncate ${
              activeWindow === id 
                ? 'bg-[#E0E0E0] border-t border-l border-black border-b border-r border-white shadow-inner' 
                : 'bg-[#C0C0C0] border-t border-l border-white border-b border-r border-black'
            }`}
          >
            {id === 'welcome' && <FileText size={14} />}
            {id === 'program' && <Folder size={14} />}
            {id === 'pricing' && <Globe size={14} />}
            <span className="capitalize">{id}</span>
          </button>
        ))}

        <div className="flex-grow" />
        
        <div className="h-8 px-4 bg-[#C0C0C0] border-t border-l border-[#808080] border-b border-r border-white flex items-center text-xs font-mono shadow-inner">
          18:22 PM
        </div>
      </div>
    </div>
  );
}
