import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

// --- Components ---

const GlitchText = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -ml-0.5 translate-x-[2px] text-red-500 opacity-0 group-hover:opacity-70 mix-blend-screen animate-pulse">
        {text}
      </span>
      <span className="absolute top-0 left-0 -ml-0.5 -translate-x-[2px] text-cyan-500 opacity-0 group-hover:opacity-70 mix-blend-screen animate-pulse delay-75">
        {text}
      </span>
    </div>
  );
};

const StaticBar = () => (
  <div className="w-full h-12 overflow-hidden relative my-20">
    <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] bg-center opacity-20 mix-blend-screen pointer-events-none" />
    <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-white/50 tracking-[1em] uppercase">
      System Processing • Batch W26 • Loading
    </div>
  </div>
);

const PixelBlock = ({ active }: { active: boolean }) => (
  <div 
    className={`w-full h-full transition-colors duration-300 ${
      active ? 'bg-[#4B0082]' : 'bg-[#1a0b2e]'
    }`} 
  />
);

const PixelAura = () => {
  const [hovered, setHovered] = useState(false);
  
  // Create a 10x10 grid
  const grid = Array(100).fill(0);

  return (
    <div 
      className="relative w-64 h-64 md:w-96 md:h-96 mx-auto grid grid-cols-10 gap-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {grid.map((_, i) => {
        // Simple logic to create a "circle" shape in the grid
        const row = Math.floor(i / 10);
        const col = i % 10;
        const dist = Math.sqrt(Math.pow(row - 4.5, 2) + Math.pow(col - 4.5, 2));
        const isCircle = dist < 3.5;
        
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0.2 }}
            animate={{ 
              opacity: isCircle ? (hovered ? 1 : 0.6) : 0.1,
              backgroundColor: isCircle ? (hovered ? '#FF00FF' : '#4B0082') : '#000000'
            }}
            transition={{ duration: 0.5, delay: dist * 0.05 }}
            className="w-full h-full"
          />
        );
      })}
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-6xl md:text-8xl font-black text-white mix-blend-difference tracking-tighter">
          W26
        </h1>
      </div>
    </div>
  );
};

const CornerNav = () => (
  <>
    <div className="fixed top-8 left-8 z-50 mix-blend-difference text-white">
      <div className="font-bold text-xs tracking-widest mb-2">AI MINDSET LAB</div>
      <div className="text-[10px] opacity-60 font-mono">
        BATCH: WINTER 26<br/>
        STATUS: OPEN
      </div>
    </div>

    <div className="fixed top-8 right-8 z-50 mix-blend-difference text-white text-right">
      <div className="font-bold text-xs tracking-widest mb-2">MENU</div>
      <div className="flex flex-col gap-1 text-[10px] font-mono opacity-60">
        <a href="#" className="hover:text-[#FF00FF] hover:opacity-100 transition-colors">HOME</a>
        <a href="#" className="hover:text-[#FF00FF] hover:opacity-100 transition-colors">LAB</a>
        <a href="#" className="hover:text-[#FF00FF] hover:opacity-100 transition-colors">MANIFESTO</a>
      </div>
    </div>

    <div className="fixed bottom-8 left-8 z-50 mix-blend-difference text-white">
      <div className="font-bold text-xs tracking-widest mb-2">CONTACT</div>
      <div className="text-[10px] opacity-60 font-mono uppercase">
        Telegram: @ai_mind_set<br/>
        Email: hello@aimindset.org<br/>
        Moscow / Worldwide
      </div>
    </div>

    <div className="fixed bottom-8 right-8 z-50 mix-blend-difference text-white text-right">
      <div className="font-bold text-xs tracking-widest mb-2">NEXT BATCH</div>
      <div className="text-[10px] opacity-60 font-mono">
        APRIL 20, 2026
      </div>
    </div>
  </>
);

const DistortedLink = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <a href="#" className="block group relative py-4 border-b border-white/10 hover:border-white/50 transition-colors">
    <div className="flex justify-between items-baseline">
      <h3 className="text-2xl md:text-4xl font-light tracking-tight group-hover:translate-x-4 transition-transform duration-300">
        <GlitchText text={title} />
      </h3>
      <span className="font-mono text-xs text-[#FF00FF] opacity-0 group-hover:opacity-100 transition-opacity">
        &lt;OPEN&gt;
      </span>
    </div>
    <p className="text-xs font-mono text-gray-500 mt-2 max-w-md group-hover:text-gray-300 transition-colors">
      {subtitle}
    </p>
  </a>
);

// --- Main Page ---

export default function DeepGlitchPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FF00FF] selection:text-black overflow-x-hidden">
      
      {/* Background Ripple Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900 via-black to-black stops-[0px_2px_4px_10px]" style={{ backgroundSize: '100px 100px' }}></div>
      </div>

      <CornerNav />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative z-10 px-6">
        <PixelAura />
        
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-sm md:text-base font-mono text-gray-400 uppercase tracking-widest mb-4">
            Лаборатория нового мышления
          </p>
          <h2 className="text-xl md:text-3xl font-light leading-relaxed">
            Мы помогаем дальновидным людям превращать <span className="text-[#FF00FF]">хаос идей</span> в персональную операционную систему.
          </h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-20 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent"></div>
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll to Initialize</span>
        </motion.div>
      </section>

      <StaticBar />

      {/* Curriculum Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        <div className="mb-12 flex items-end gap-4">
          <div className="w-2 h-2 bg-[#FF00FF]"></div>
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400">
            System Modules / 4 Weeks
          </h2>
        </div>

        <div className="space-y-2">
          <DistortedLink 
            title="PROMPT ENGINEERING" 
            subtitle="AI как интерфейс мышления. Chain-of-Thought, Few-Shot Learning. Создание первых персональных ассистентов."
          />
          <DistortedLink 
            title="CONTEXT ENGINEERING" 
            subtitle="Автоматизация и агенты. Управление контекстом: Obsidian + MCP + Claude. AI-агенты и workflows."
          />
          <DistortedLink 
            title="MIND ENGINEERING" 
            subtitle="Продуктивность и ритуалы. AI для коучинга, рефлексии. Трекинг привычек и целей с поддержкой AI."
          />
          <DistortedLink 
            title="LIFE ENGINEERING" 
            subtitle="Творчество и реализация. Vibe-coding с Cursor. От идеи до прототипа без технического бэкграунда."
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 relative z-10 mb-20">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Base Card */}
          <div className="border border-white/10 p-8 hover:border-[#FF00FF]/50 transition-colors group bg-black">
            <div className="font-mono text-xs text-gray-500 mb-4 group-hover:text-[#FF00FF]">
              // ACCESS_LEVEL_1
            </div>
            <h3 className="text-4xl font-light mb-2">BASE LAB</h3>
            <div className="text-2xl font-mono text-gray-400 mb-8">€590</div>
            <ul className="space-y-2 text-sm text-gray-400 font-mono mb-8">
              <li>&gt; 4 Live Workshops</li>
              <li>&gt; 4 Coworking Sessions</li>
              <li>&gt; Mentor Support</li>
            </ul>
            <button className="w-full py-3 border border-white/20 text-xs font-mono uppercase hover:bg-white hover:text-black transition-colors">
              Initialize Base
            </button>
          </div>

          {/* Advanced Card */}
          <div className="border border-white/10 p-8 hover:border-[#FF00FF]/50 transition-colors group bg-[#0a0a0a] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2">
              <div className="w-2 h-2 bg-[#FF00FF] animate-pulse"></div>
            </div>
            <div className="font-mono text-xs text-gray-500 mb-4 group-hover:text-[#FF00FF]">
              // ACCESS_LEVEL_2
            </div>
            <h3 className="text-4xl font-light mb-2">ADVANCED</h3>
            <div className="text-2xl font-mono text-gray-400 mb-8">€890</div>
            <ul className="space-y-2 text-sm text-gray-400 font-mono mb-8">
              <li>&gt; Everything in Base</li>
              <li>&gt; 4 Advanced Tracks</li>
              <li>&gt; Vibe Coding & Agents</li>
            </ul>
            <button className="w-full py-3 bg-[#FF00FF] text-black border border-[#FF00FF] text-xs font-mono uppercase hover:bg-transparent hover:text-[#FF00FF] transition-colors">
              Initialize Advanced
            </button>
          </div>

        </div>
      </section>

      {/* Footer Visual */}
      <div className="w-full h-64 relative overflow-hidden">
         <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#FF00FF_2px,#FF00FF_4px)] opacity-10"></div>
         <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-[15vw] font-black text-white/5 tracking-tighter select-none">
              TOGETHER
            </h1>
         </div>
      </div>

    </div>
  );
}
