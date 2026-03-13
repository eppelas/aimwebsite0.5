import React from 'react';
import { motion } from 'framer-motion';

// --- Components ---

const Marquee = ({ text }: { text: string }) => (
  <div className="bg-white text-[#001F9F] overflow-hidden py-2 font-mono text-sm font-bold uppercase tracking-widest border-b border-white">
    <motion.div 
      className="whitespace-nowrap flex gap-8"
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
    >
      {Array(10).fill(text).map((t, i) => (
        <span key={i}>{t}</span>
      ))}
    </motion.div>
  </div>
);

const StripeText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 select-none" aria-hidden="true">
      <span className="text-transparent bg-clip-text bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoNHYySDB6IiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')]">
        {children}
      </span>
    </div>
    <div className="text-white mix-blend-overlay">
      {children}
    </div>
  </div>
);

const DotText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 select-none" aria-hidden="true">
      <span className="text-transparent bg-clip-text bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNiIgaGVpZ2h0PSI2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIyIiBmaWxsPSIjZmZmIi8+PC9zdmc+')]">
        {children}
      </span>
    </div>
    <div className="text-white mix-blend-overlay">
      {children}
    </div>
  </div>
);

const BlockLetter = ({ char }: { char: string }) => {
  // Simple 5x5 grid representation for a few letters
  const grids: Record<string, number[]> = {
    'A': [
      0,1,1,1,0,
      1,0,0,0,1,
      1,1,1,1,1,
      1,0,0,0,1,
      1,0,0,0,1
    ],
    'I': [
      1,1,1,1,1,
      0,0,1,0,0,
      0,0,1,0,0,
      0,0,1,0,0,
      1,1,1,1,1
    ],
    'L': [
      1,0,0,0,0,
      1,0,0,0,0,
      1,0,0,0,0,
      1,0,0,0,0,
      1,1,1,1,1
    ],
    'B': [
      1,1,1,1,0,
      1,0,0,0,1,
      1,1,1,1,0,
      1,0,0,0,1,
      1,1,1,1,0
    ],
    'W': [
      1,0,0,0,1,
      1,0,0,0,1,
      1,0,1,0,1,
      1,0,1,0,1,
      0,1,0,1,0
    ]
  };

  const grid = grids[char] || Array(25).fill(1);

  return (
    <div className="grid grid-cols-5 gap-1 w-12 h-16">
      {grid.map((active, i) => (
        <div key={i} className={`w-full h-full ${active ? 'bg-white' : 'bg-transparent'}`} />
      ))}
    </div>
  );
};

const Card = ({ title, subtitle, desc, type = "stripe" }: { title: string; subtitle: string; desc: string; type?: "stripe" | "dot" }) => (
  <div className="border border-white p-6 flex flex-col justify-between h-full hover:bg-white hover:text-[#001F9F] transition-colors group cursor-pointer">
    <div>
      <div className="flex justify-between items-start mb-4">
        <span className="font-mono text-xs border border-current px-2 py-1 rounded-full">{subtitle}</span>
        <div className="w-4 h-4 bg-current rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      {type === "stripe" ? (
        <StripeText className="text-4xl font-black uppercase mb-4 leading-none tracking-tighter group-hover:hidden">{title}</StripeText>
      ) : (
        <DotText className="text-4xl font-black uppercase mb-4 leading-none tracking-tighter group-hover:hidden">{title}</DotText>
      )}
      <h3 className="text-4xl font-black uppercase mb-4 leading-none tracking-tighter hidden group-hover:block">{title}</h3>
      
      <p className="font-mono text-sm leading-relaxed opacity-80">
        {desc}
      </p>
    </div>
    <div className="mt-8 pt-4 border-t border-current border-dashed font-mono text-xs uppercase flex justify-between">
      <span>Explore</span>
      <span>→</span>
    </div>
  </div>
);

// --- Main Page ---

export default function BlueVibePage() {
  return (
    <div className="min-h-screen bg-[#001F9F] text-white font-sans selection:bg-white selection:text-[#001F9F]">
      
      {/* Marquee Header */}
      <Marquee text="AI MINDSET LAB W26 • BATCH WINTER 26 • APPLICATIONS CLOSE • NEXT BATCH APRIL 20 • " />

      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-white/20 font-mono text-xs uppercase">
        <div className="flex gap-6">
          <a href="#" className="hover:underline">[HOME]</a>
          <a href="#" className="hover:underline">[LAB]</a>
          <a href="#" className="hover:underline">[OS]</a>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-white rounded-sm animate-pulse"></div>
          <span>ONLINE</span>
        </div>
      </nav>

      {/* Hero */}
      <header className="px-6 py-20 md:py-32 border-b border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 mb-8">
             <BlockLetter char="A" />
             <BlockLetter char="I" />
             <div className="w-12"></div>
             <BlockLetter char="L" />
             <BlockLetter char="A" />
             <BlockLetter char="B" />
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-12">
            <StripeText>MINDSET</StripeText>
            <DotText>WINTER 26</DotText>
          </h1>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
            <p className="text-xl md:text-2xl font-bold leading-tight uppercase">
              Лаборатория нового мышления в эпоху AI. От хаоса промптов к персональной операционной системе.
            </p>
            <div className="font-mono text-sm space-y-4">
              <p>Старт: 19 Января 2026</p>
              <p>Финиш: 16 Февраля 2026</p>
              <button className="bg-white text-[#001F9F] px-8 py-4 font-bold uppercase hover:bg-transparent hover:text-white hover:border hover:border-white transition-all">
                Подать заявку
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Curriculum Grid */}
      <section className="border-b border-white/20">
        <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20">
          
          <Card 
            subtitle="Week 01"
            title="Prompt"
            desc="AI как интерфейс мышления. Chain-of-Thought, Few-Shot Learning. Создание первых персональных ассистентов."
            type="stripe"
          />
          
          <Card 
            subtitle="Week 02"
            title="Context"
            desc="Автоматизация и агенты. Управление контекстом: Obsidian + MCP + Claude. AI-агенты и workflows."
            type="dot"
          />
          
          <Card 
            subtitle="Week 03"
            title="Mind"
            desc="Продуктивность и ритуалы. AI для коучинга, рефлексии. Трекинг привычек и целей с поддержкой AI."
            type="stripe"
          />
          
          <Card 
            subtitle="Week 04"
            title="Life"
            desc="Творчество и реализация. Vibe-coding с Cursor. От идеи до прототипа без технического бэкграунда."
            type="dot"
          />

        </div>
      </section>

      {/* Pricing / Tracks */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4">
            <span className="w-8 h-8 bg-white rounded-full"></span>
            Select Your Track
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Base */}
            <div className="border-2 border-white p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-white text-[#001F9F] px-4 py-1 font-mono text-xs font-bold">
                BASE
              </div>
              <h3 className="text-3xl font-bold mb-2">MAIN LAB</h3>
              <div className="text-5xl font-black mb-8">€590</div>
              <ul className="font-mono text-sm space-y-4 mb-8">
                <li className="flex gap-2"><span>[+]</span> 4 Live Workshops</li>
                <li className="flex gap-2"><span>[+]</span> 4 Coworking Sessions</li>
                <li className="flex gap-2"><span>[+]</span> Mentor Support</li>
                <li className="flex gap-2"><span>[+]</span> Demo Day</li>
              </ul>
              <button className="w-full py-4 border border-white font-bold uppercase hover:bg-white hover:text-[#001F9F] transition-colors">
                Select Base
              </button>
            </div>

            {/* Advanced */}
            <div className="bg-white text-[#001F9F] p-8 relative transform md:-translate-y-4 shadow-[16px_16px_0px_0px_rgba(0,0,0,0.3)]">
              <div className="absolute top-0 right-0 bg-[#001F9F] text-white px-4 py-1 font-mono text-xs font-bold">
                POPULAR
              </div>
              <h3 className="text-3xl font-bold mb-2">ADVANCED</h3>
              <div className="text-5xl font-black mb-8">€890</div>
              <ul className="font-mono text-sm space-y-4 mb-8 font-bold">
                <li className="flex gap-2"><span>[+]</span> Everything in Base</li>
                <li className="flex gap-2"><span>[+]</span> 4 Advanced Tracks</li>
                <li className="flex gap-2"><span>[+]</span> Coaching & Agents</li>
                <li className="flex gap-2"><span>[+]</span> Vibe Coding</li>
              </ul>
              <button className="w-full py-4 bg-[#001F9F] text-white font-bold uppercase hover:opacity-90 transition-opacity">
                Select Advanced
              </button>
            </div>

            {/* Premium */}
            <div className="border-2 border-white p-8 relative opacity-80 hover:opacity-100 transition-opacity">
               <div className="absolute top-0 right-0 border border-white px-4 py-1 font-mono text-xs font-bold">
                LIMITED
              </div>
              <h3 className="text-3xl font-bold mb-2">PREMIUM</h3>
              <div className="text-5xl font-black mb-8">€1,490</div>
              <ul className="font-mono text-sm space-y-4 mb-8">
                <li className="flex gap-2"><span>[+]</span> Everything in Advanced</li>
                <li className="flex gap-2"><span>[+]</span> 1:1 Strategy Sessions</li>
                <li className="flex gap-2"><span>[+]</span> Personal Tracking</li>
                <li className="flex gap-2"><span>[+]</span> Priority Support</li>
              </ul>
              <button className="w-full py-4 border border-white font-bold uppercase hover:bg-white hover:text-[#001F9F] transition-colors">
                Select Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <div className="flex gap-1 mb-4">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="w-4 h-4 bg-white rounded-full"></div>
              ))}
            </div>
            <div className="font-mono text-xs uppercase opacity-60">
              © 2026 AI Mindset Lab<br/>
              All rights reserved
            </div>
          </div>
          <div className="text-right">
             <div className="text-9xl font-black leading-none opacity-10 select-none">
               W26
             </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
