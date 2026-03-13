import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Circle, Square, Triangle } from 'lucide-react';

// --- Styles ---

const NonObjectiveStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

    .font-inter { font-family: 'Inter', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

// --- Components ---

const ClockFace = ({ variant = "standard", className = "" }: { variant?: "standard" | "abstract" | "text" | "scribble", className?: string }) => {
  return (
    <div className={`relative rounded-full border border-[#0A0A0A] flex items-center justify-center ${className}`}>
      {/* Center Dot */}
      <div className="absolute w-1 h-1 bg-[#0A0A0A] rounded-full z-10" />

      {/* Hands */}
      <motion.div 
        className="absolute w-[1px] bg-[#0A0A0A] top-1/2 left-1/2 origin-top-left h-[35%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute w-[1px] bg-[#0A0A0A] top-1/2 left-1/2 origin-top-left h-[25%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 600, repeat: Infinity, ease: "linear" }}
      />

      {/* Variant Content */}
      {variant === "standard" && (
        <>
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="absolute text-[10px] font-mono"
              style={{ 
                transform: `rotate(${i * 30}deg) translate(0, -42%)` 
              }}
            >
              <div className="h-2 w-[1px] bg-[#0A0A0A]" />
            </div>
          ))}
          <span className="absolute top-2 text-[10px] font-mono">12</span>
          <span className="absolute bottom-2 text-[10px] font-mono">06</span>
          <span className="absolute left-2 text-[10px] font-mono">09</span>
          <span className="absolute right-2 text-[10px] font-mono">03</span>
        </>
      )}

      {variant === "abstract" && (
        <>
           {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="absolute"
              style={{ 
                transform: `rotate(${i * 45}deg) translate(0, -350%)` 
              }}
            >
              {i % 2 === 0 ? <Circle size={8} strokeWidth={1} /> : <Square size={8} strokeWidth={1} />}
            </div>
          ))}
        </>
      )}

      {variant === "text" && (
        <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '40s' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
            <text className="text-[8px] font-mono uppercase fill-[#0A0A0A] tracking-[0.2em]">
              <textPath href="#circlePath">
                Time is the longest distance between two places •
              </textPath>
            </text>
          </svg>
        </div>
      )}

      {variant === "scribble" && (
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-4 opacity-80">
          <path 
            d="M20,20 Q40,5 50,30 T80,20 T90,50 T70,80 T40,90 T10,70 T20,20" 
            fill="none" 
            stroke="#0A0A0A" 
            strokeWidth="0.5"
          />
          <path 
            d="M30,30 Q50,20 60,40 T80,30 T85,60 T60,85 T30,80 T15,60 T30,30" 
            fill="none" 
            stroke="#0A0A0A" 
            strokeWidth="0.5"
          />
        </svg>
      )}
    </div>
  );
};

const DialogueBlock = ({ speaker, text }: { speaker: string, text: string }) => (
  <div className="flex gap-4 font-mono text-xs md:text-sm max-w-md mb-4">
    <span className="font-bold shrink-0">{speaker}:</span>
    <p className="uppercase leading-relaxed opacity-80">{text}</p>
  </div>
);

const NavLink = ({ text }: { text: string }) => (
  <a href="#" className="font-mono text-[10px] uppercase tracking-widest hover:underline decoration-1 underline-offset-4">
    {text}
  </a>
);

// --- Main Page ---

export default function NonObjectivePage() {
  return (
    <div className="min-h-screen bg-[#F0F0F2] text-[#0A0A0A] font-inter selection:bg-[#0A0A0A] selection:text-white overflow-x-hidden">
      <NonObjectiveStyles />

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-start z-50 pointer-events-none mix-blend-multiply">
        <div className="pointer-events-auto">
          <h1 className="font-bold text-sm tracking-tight uppercase flex items-center gap-2">
            <img
              src="/assets/ai-mindset-logo.png"
              alt="AI Mindset logo"
              className="h-4 w-auto object-contain mix-blend-multiply opacity-80"
            />
            <span>AI Mindset POS</span>
          </h1>
        </div>
        <div className="flex gap-8 pointer-events-auto hidden md:flex">
          <NavLink text="Gallery" />
          <NavLink text="Archive" />
          <NavLink text="Studio" />
          <NavLink text="Extensions" />
        </div>
        <div className="pointer-events-auto text-right">
          <NavLink text="Email" />
          <br />
          <NavLink text="Telegram" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center relative pt-32 pb-20 px-6">
        
        {/* Dialogue */}
        <div className="absolute top-32 left-6 md:left-1/4 md:-translate-x-1/2">
          <DialogueBlock 
            speaker="A" 
            text="They say time is the longest distance between two places." 
          />
          <DialogueBlock 
            speaker="B" 
            text="How do you measure attention then?" 
          />
        </div>

        {/* Main Title */}
        <div className="w-full max-w-7xl mx-auto text-center z-10">
          <h1 className="text-[12vw] md:text-[11vw] font-medium leading-[0.8] tracking-tighter text-[#0A0A0A] mb-12">
            AI-MINDSET
            <br />
            <span className="font-light italic">POS {`{SPRINT}`}</span>
          </h1>
        </div>

        {/* Description Block */}
        <div className="max-w-2xl text-center font-mono text-xs md:text-sm uppercase leading-relaxed tracking-wide opacity-70 mb-24">
          <p>
            AI Mindset POS is a system for attention management, turned sprint in 2026.
            While we were working on a new architecture to commemorate everything
            we had done during these two years, we created a digital installation
            exploring the non-objective nature of focus.
          </p>
          <p className="mt-8">
            Design: Alexander Povalyaev, Sergey Khabarov, Serezha Ris
          </p>
        </div>

        {/* Clocks Grid */}
        <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
          <ClockFace variant="standard" className="w-full aspect-square" />
          <ClockFace variant="abstract" className="w-full aspect-square" />
          <ClockFace variant="text" className="w-full aspect-square" />
          <ClockFace variant="scribble" className="w-full aspect-square" />
        </div>

      </section>

      {/* Content Section - Horizontal Scroll Vibe */}
      <section className="py-24 border-t border-[#0A0A0A]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* Sidebar Info */}
            <div className="md:col-span-3 font-mono text-xs space-y-8 sticky top-24 h-fit">
              <div>
                <span className="block opacity-40 mb-2">BATCH</span>
                <p>SPRINT-X26</p>
              </div>
              <div>
                <span className="block opacity-40 mb-2">STATUS</span>
                <p>APPLICATIONS: OPEN</p>
              </div>
              <div>
                <span className="block opacity-40 mb-2">DATES</span>
                <p>MARCH 2 — MARCH 14, 2026</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-9 space-y-32">
              
              {/* Block 1 */}
              <div>
                <h2 className="text-4xl md:text-6xl font-normal tracking-tight mb-8">
                  Personal Operational System
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <p className="font-mono text-sm leading-relaxed">
                    POS is not a tool, it is an operating system with a personal AI assistant. A layer of rules, context, and constraints that makes tools work.
                  </p>
                  <p className="font-mono text-sm leading-relaxed opacity-60">
                    From the chaos of tools to a working AI system tailored to you.
                  </p>
                </div>
              </div>

              {/* Block 2 - Visual Break */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {[...Array(4)].map((_, i) => (
                   <div key={i} className="aspect-[3/4] border border-[#0A0A0A] flex flex-col justify-between p-4 hover:bg-[#0A0A0A] hover:text-[#F0F0F2] transition-colors duration-300 group cursor-pointer">
                      <div className="flex justify-between">
                        <span className="font-mono text-xs">0{i+1}</span>
                        <ArrowUpRight size={16} />
                      </div>
                      <div className="font-mono text-xs uppercase">
                        {['Context', 'Architecture', 'Tools', 'Skills'][i]}
                      </div>
                      <div className="w-full h-[1px] bg-current opacity-20 group-hover:opacity-100 transition-opacity" />
                   </div>
                 ))}
              </div>

              {/* Block 3 */}
              <div>
                <h2 className="text-4xl md:text-6xl font-normal tracking-tight mb-8">
                  The Result
                </h2>
                <ul className="space-y-6 border-l border-[#0A0A0A] pl-8">
                  <li className="group">
                    <h3 className="text-xl font-medium mb-2 group-hover:translate-x-2 transition-transform">Collected Context</h3>
                    <p className="font-mono text-xs opacity-60 max-w-md">AI knows who you are, how you work, what is important to you.</p>
                  </li>
                  <li className="group">
                    <h3 className="text-xl font-medium mb-2 group-hover:translate-x-2 transition-transform">Logical Architecture</h3>
                    <p className="font-mono text-xs opacity-60 max-w-md">Will not delete all files without asking and will not buy a useless course for $3k.</p>
                  </li>
                  <li className="group">
                    <h3 className="text-xl font-medium mb-2 group-hover:translate-x-2 transition-transform">Connected Tools</h3>
                    <p className="font-mono text-xs opacity-60 max-w-md">Claude Code / Cursor / Obsidian / MCP.</p>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer / Abstract Grid */}
      <section className="py-24 border-t border-[#0A0A0A]/10 bg-[#E8E8EA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#0A0A0A]/10 border border-[#0A0A0A]/10">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-[#F0F0F2] aspect-square flex items-center justify-center p-8 relative overflow-hidden group">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-[#0A0A0A]" />
                {i % 3 === 0 && (
                  <div className="w-full h-full border rounded-full border-[#0A0A0A] flex items-center justify-center">
                     <div className="w-1/2 h-1/2 border border-[#0A0A0A] rotate-45" />
                  </div>
                )}
                {i % 3 === 1 && (
                  <div className="w-full h-full flex flex-col justify-between">
                    <div className="w-full h-px bg-[#0A0A0A]" />
                    <div className="w-full h-px bg-[#0A0A0A]" />
                    <div className="w-full h-px bg-[#0A0A0A]" />
                    <div className="w-full h-px bg-[#0A0A0A]" />
                  </div>
                )}
                {i % 3 === 2 && (
                   <div className="w-full h-full border border-[#0A0A0A] rounded-full flex items-center justify-center">
                     <span className="font-mono text-xs">POS</span>
                   </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-24 flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="font-mono text-xs uppercase opacity-50 max-w-xs">
              Non-Objective is a studio for design in its widest sense. Our approach is based on context research.
            </div>
            <div className="text-[15vw] leading-[0.8] font-medium tracking-tighter opacity-10 select-none pointer-events-none">
              2026
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
