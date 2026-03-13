import React from 'react';

// --- Components ---

const Crosshair = ({ className = "" }: { className?: string }) => (
  <div className={`absolute text-white/50 text-xs font-mono pointer-events-none ${className}`}>+</div>
);

const GlitchLogo = () => (
  <div className="relative font-black text-4xl md:text-6xl tracking-tighter uppercase italic select-none">
    <span className="relative z-10">AI_MINDSET</span>
    <span className="absolute top-0 left-1 -z-10 text-red-600 opacity-70 mix-blend-screen animate-pulse">AI_MINDSET</span>
    <span className="absolute top-0 -left-1 -z-10 text-blue-600 opacity-70 mix-blend-screen animate-pulse animation-delay-75">AI_MINDSET</span>
  </div>
);

const Sticker = () => (
  <div className="absolute -top-12 -right-12 md:-right-24 rotate-12 z-20 pointer-events-none">
    <svg width="200" height="100" viewBox="0 0 200 100" className="drop-shadow-xl">
      <path d="M10,50 Q50,5 90,50 T180,50" fill="none" stroke="white" strokeWidth="2" />
      <rect x="20" y="20" width="160" height="60" fill="white" transform="rotate(-5 100 50)" />
      <text x="100" y="55" fontFamily="monospace" fontSize="20" fontWeight="bold" fill="black" textAnchor="middle" transform="rotate(-5 100 50)">
        BATCH W26
      </text>
      <text x="100" y="75" fontFamily="monospace" fontSize="12" fill="black" textAnchor="middle" transform="rotate(-5 100 50)">
        WINTER 2026
      </text>
    </svg>
  </div>
);

const Barcode = () => (
  <div className="flex h-12 md:h-16 w-full justify-end gap-[2px] overflow-hidden">
    {Array.from({ length: 40 }).map((_, i) => (
      <div key={i} className={`bg-white h-full ${Math.random() > 0.5 ? 'w-1' : 'w-3'}`}></div>
    ))}
  </div>
);

const NavItem = ({ label, active = false }: { label: string; active?: boolean }) => (
  <div className={`font-mono text-xs uppercase tracking-widest cursor-pointer hover:text-white transition-colors ${active ? 'bg-white text-black px-2' : 'text-gray-400'}`}>
    {label}
  </div>
);

const FormInput = ({ placeholder, type = "text" }: { placeholder: string; type?: string }) => (
  <div className="bg-[#111] border border-[#333] p-4 hover:border-white transition-colors group">
    <input 
      type={type} 
      placeholder={placeholder} 
      className="bg-transparent w-full text-white font-mono text-sm uppercase outline-none placeholder:text-gray-600"
    />
  </div>
);

const FormSelect = ({ label }: { label: string }) => (
  <div className="bg-[#111] border border-[#333] p-4 flex justify-between items-center hover:border-white transition-colors cursor-pointer group">
    <span className="text-gray-600 font-mono text-sm uppercase group-hover:text-white transition-colors">{label}</span>
    <span className="text-gray-600 text-xs">▼</span>
  </div>
);

// --- Sections ---

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-[#222] h-20 flex items-center px-4 md:px-8 justify-between">
    <GlitchLogo />
    
    <div className="hidden md:flex items-center gap-12">
      <div className="text-[10px] font-mono text-gray-500 max-w-[200px] leading-tight">
        FUELED BY INTELLIGENCE, AI MINDSET ELEVATES <span className="text-white">HUMAN POTENTIAL</span> IN THE DIGITAL AGE.
      </div>
      
      <nav className="flex gap-12">
        <NavItem label="WORK" />
        <NavItem label="INFO" active />
        <NavItem label="WHEREISTHEMIND?" />
        <NavItem label="SHOP" />
      </nav>
    </div>

    {/* Grid Markers */}
    <Crosshair className="top-0 left-1/4" />
    <Crosshair className="top-0 left-1/2" />
    <Crosshair className="top-0 left-3/4" />
  </header>
);

const Content = () => (
  <div className="min-h-screen pt-32 pb-12 px-4 md:px-12 grid md:grid-cols-12 gap-8 relative">
    {/* Left Column - Text Content */}
    <div className="md:col-span-7 flex flex-col gap-24 relative">
      {/* About */}
      <div className="grid md:grid-cols-12 gap-4">
        <div className="md:col-span-3 font-mono text-xs text-gray-500 uppercase flex items-start gap-2">
          <span>&gt;</span> ABOUT
        </div>
        <div className="md:col-span-9 font-mono text-sm md:text-base text-gray-300 leading-relaxed uppercase">
          <p className="mb-8">
            AI Mindset Winter Lab W26 — это лаборатория, пространство для экспериментов. 
            Здесь вы не изучаете, а создаёте: персональных ассистентов, AI-first процессы, новую версию себя.
          </p>
          <div className="space-y-1 text-gray-500 text-xs">
            <div>2026-JAN &gt; PROMPT ENGINEERING START</div>
            <div>2026-FEB &gt; MINDSET TRANSFORMATION COMPLETE</div>
            <div>2026-NOW &gt; AI OPERATING SYSTEM ACTIVE</div>
          </div>
          <div className="mt-8">
            <a href="#" className="text-white hover:underline">→ TELEGRAM CHANNEL</a>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="grid md:grid-cols-12 gap-4">
        <div className="md:col-span-3 font-mono text-xs text-gray-500 uppercase flex items-start gap-2">
          <span>&gt;</span> SERVICES
        </div>
        <div className="md:col-span-9 grid grid-cols-2 gap-8 font-mono text-xs md:text-sm text-gray-300 uppercase">
          <ul className="space-y-2">
            <li className="text-white font-bold mb-4">/// MAIN LAB</li>
            <li>Prompt Engineering</li>
            <li>Context Architecture</li>
            <li>Mind Engineering</li>
            <li>Life Design</li>
          </ul>
          <ul className="space-y-2">
            <li className="text-white font-bold mb-4">/// ADVANCED TRACKS</li>
            <li>AI Coaching</li>
            <li>Autonomous Agents</li>
            <li>Vibe-Coding</li>
            <li>Creative Generation</li>
          </ul>
        </div>
      </div>

      {/* Contact */}
      <div className="grid md:grid-cols-12 gap-4">
        <div className="md:col-span-3 font-mono text-xs text-gray-500 uppercase flex items-start gap-2">
          <span>&gt;</span> CONTACT
        </div>
        <div className="md:col-span-9 font-mono text-sm text-white uppercase">
          ALEX@AIMINDSET.ORG
        </div>
      </div>
    </div>

    {/* Right Column - Form */}
    <div className="md:col-span-5 relative mt-12 md:mt-0">
      <div className="sticky top-32">
        <div className="relative bg-black border border-[#222] p-1">
          <Sticker />
          
          <div className="space-y-2">
            <FormInput placeholder="NAME" />
            <FormInput placeholder="EMAIL" />
            <FormSelect label="SELECT TRACK" />
            <FormSelect label="BUDGET / PLAN" />
            <div className="bg-[#111] border border-[#333] p-4 hover:border-white transition-colors h-32">
              <textarea 
                placeholder="BRIEF / MOTIVATION" 
                className="bg-transparent w-full h-full text-white font-mono text-sm uppercase outline-none resize-none placeholder:text-gray-600"
              ></textarea>
            </div>
            
            <button className="w-full bg-[#333] hover:bg-white hover:text-black text-white font-mono text-sm uppercase py-4 transition-colors font-bold tracking-widest">
              START APPLICATION
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="border-t border-[#222] bg-black text-white py-8 px-4 md:px-12 font-mono text-[10px] uppercase">
    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
      <div className="max-w-md space-y-1 text-gray-500">
        <div className="text-white font-bold">AI MINDSET® [CREATIVE LAB]</div>
        <div>EST. ©2026 C/O @ALEX.NAMED</div>
        <div>MOSCOW [RU] / WORLDWIDE [WEB]</div>
      </div>

      <div className="text-right space-y-1 text-gray-500">
        <div>→ CREATIVE DIRECTOR WITH 15+ YEARS IN TECH</div>
        <div>FROM CHAOS TO SYSTEM - BRINGING A 360° VISION TO EVERY PROJECT.</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div>&gt; INSTAGRAM</div>
          <div>&gt; TELEGRAM</div>
        </div>
        <Barcode />
      </div>
    </div>
  </footer>
);

export default function CyberMotorsportPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <Header />
      <Content />
      <Footer />
      
      {/* Background Grid Lines */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-[#222]"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-[#222]"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-[#222]"></div>
      </div>
    </div>
  );
}
