import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, RotateCw } from 'lucide-react';

// --- Styles ---

const FlammaStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap');
    
    .font-inter { font-family: 'Inter', sans-serif; }
    
    .liquid-text {
      font-variation-settings: "wght" 900, "wdth" 100;
    }

    .grid-lines {
      background-image: linear-gradient(to right, black 1px, transparent 1px),
                        linear-gradient(to bottom, black 1px, transparent 1px);
      background-size: 100% 100%;
    }
    
    .wavy-separator {
      background: radial-gradient(circle at 50% 100%, #FF3300 50%, transparent 51%),
                  radial-gradient(circle at 50% 0%, #FF3300 50%, transparent 51%);
      background-size: 40px 40px;
      background-repeat: repeat-x;
    }
  `}</style>
);

// --- Components ---

const Header = () => (
  <header className="fixed top-0 left-0 w-full z-50 bg-[#FF3300] border-b border-black flex justify-between items-stretch h-12 md:h-14 font-inter text-xs md:text-sm font-medium uppercase tracking-wide">
    <div className="flex items-center px-4 md:px-6 border-r border-black">
      <div className="w-7 h-7 bg-black text-[#FF3300] flex items-center justify-center rounded-sm">
        <img
          src="/assets/ai-mindset-logo.png"
          alt="AI Mindset logo"
          className="h-4 w-auto object-contain brightness-0 invert"
        />
      </div>
    </div>
    <div className="flex-1 flex">
      <a href="#" className="flex items-center px-6 border-r border-black hover:bg-black hover:text-[#FF3300] transition-colors hidden md:flex">Program</a>
      <a href="#" className="flex items-center px-6 border-r border-black hover:bg-black hover:text-[#FF3300] transition-colors hidden md:flex">Projects</a>
      <a href="#" className="flex items-center px-6 border-r border-black hover:bg-black hover:text-[#FF3300] transition-colors hidden md:flex">Team</a>
    </div>
    <div className="flex items-center gap-2 px-6 border-l border-black">
      <img
        src="/assets/ai-mindset-logo.png"
        alt="AI Mindset logo"
        className="h-4 w-auto object-contain opacity-90"
      />
      <span>AI MINDSET POS {`{sprint}`}</span>
    </div>
    <div className="flex items-center px-4 md:px-6 border-l border-black hover:bg-black hover:text-[#FF3300] cursor-pointer transition-colors">
      <RotateCw size={18} />
    </div>
  </header>
);

const LiquidText = ({ text }: { text: string }) => {
  return (
    <div className="relative w-full h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-[#FF3300] border-b border-black">
      <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="liquid">
            <feTurbulence type="turbulence" baseFrequency="0.01 0.02" numOctaves="1" result="warp" />
            <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warp" />
          </filter>
        </defs>
        <text 
          x="50%" 
          y="50%" 
          dominantBaseline="middle" 
          textAnchor="middle" 
          className="font-inter font-black text-[300px] fill-black"
          style={{ letterSpacing: '-0.05em' }}
        >
          {text}
        </text>
        {/* Decorative "Liquid" drips */}
        <path d="M200,180 Q250,300 300,180 T400,180" fill="black" className="hidden" />
      </svg>
      
      {/* Overlay drips for visual effect */}
      <div className="absolute inset-0 pointer-events-none flex justify-between items-end px-[10%] opacity-100">
         {[...Array(5)].map((_, i) => (
           <motion.div 
             key={i}
             className="w-[10vw] bg-black rounded-b-full"
             initial={{ height: "20%" }}
             animate={{ height: ["20%", "40%", "20%"] }}
             transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
             style={{ 
               borderTopLeftRadius: 0, 
               borderTopRightRadius: 0,
               marginTop: '-1px' // Fix gap
             }}
           />
         ))}
      </div>
    </div>
  );
};

const GridItem = ({ number, title, subtitle, className = "" }: { number: string, title: string, subtitle: string, className?: string }) => (
  <div className={`border-b border-black p-6 md:p-8 flex flex-col justify-between min-h-[300px] hover:bg-black hover:text-[#FF3300] transition-colors group ${className}`}>
    <span className="text-sm font-medium opacity-60 group-hover:opacity-100">{number}</span>
    <div>
      <h3 className="text-5xl md:text-7xl font-black uppercase leading-[0.85] tracking-tight mb-4 break-words">
        {title}
      </h3>
      <p className="text-lg md:text-xl font-medium leading-tight max-w-xs">
        {subtitle}
      </p>
    </div>
  </div>
);

const GeometricSection = () => (
  <div className="bg-[#FF3300] border-b border-black py-24 px-4 md:px-8 overflow-hidden relative">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 md:gap-24">
      
      {/* Circle */}
      <motion.div 
        className="w-48 h-48 md:w-64 md:h-64 bg-white rounded-full flex items-center justify-center relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <span className="font-inter font-bold text-xl absolute top-4">1</span>
        <span className="font-inter font-bold text-xl absolute bottom-4 rotate-180">P</span>
      </motion.div>

      {/* Square */}
      <div className="w-48 h-48 md:w-64 md:h-64 bg-black flex items-start justify-end p-4 relative">
        <span className="text-white font-inter font-bold text-xl">2</span>
        <span className="text-white font-inter font-bold text-xl absolute bottom-4 left-4">O</span>
      </div>

      {/* Triangle */}
      <div className="w-0 h-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-b-[170px] border-b-white relative">
        <span className="absolute top-[60px] -left-[10px] font-inter font-bold text-xl">S</span>
        <span className="absolute top-[140px] left-[50px] font-inter font-bold text-xl">3</span>
      </div>

    </div>

    <div className="text-center mt-24">
      <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">
        Toda <span className="italic">СИСТЕМА</span> es <br/>
        <span className="text-white bg-black px-2">ПЕРСОНАЛЬНАЯ</span>
      </h2>
    </div>
  </div>
);

// --- Main Page ---

export default function FlammaStylePage() {
  return (
    <div className="min-h-screen bg-[#FF3300] text-black font-inter selection:bg-black selection:text-[#FF3300]">
      <FlammaStyles />
      <Header />

      {/* Hero */}
      <div className="pt-12 md:pt-14">
        <LiquidText text="POS" />
        <div className="border-b border-black p-4 md:p-6 flex justify-between items-center bg-[#FF3300]">
          <div className="border border-black px-4 py-1 text-sm font-bold uppercase hover:bg-black hover:text-[#FF3300] transition-colors cursor-pointer">
            AI MINDSET
          </div>
          <div className="flex items-center gap-2 font-bold uppercase text-sm md:text-base">
            <ArrowRight size={20} />
            <span>ARG + PER</span>
          </div>
        </div>
      </div>

      {/* Intro Text */}
      <div className="p-6 md:p-12 border-b border-black">
        <p className="text-4xl md:text-6xl font-bold uppercase leading-[0.9] tracking-tight max-w-5xl">
          Мы создаем систему агентов для управления вниманием, задачами и знаниями.
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-black">
        <GridItem 
          number="01" 
          title="CONTEXT" 
          subtitle="AI знает кто ты, как работаешь, что тебе важно." 
          className="border-r border-black"
        />
        <GridItem 
          number="02" 
          title="ARCHI TECTURE" 
          subtitle="Логичная архитектура, которая не удалит файлы без спроса." 
          className="border-r border-black"
        />
        <GridItem 
          number="03" 
          title="TOOLS" 
          subtitle="Claude Code / Cursor / Obsidian / MCP." 
          className=""
        />
        <GridItem 
          number="04" 
          title="SKILLS" 
          subtitle="Работающие навыки и правила автоматизации." 
          className="border-r border-black md:border-b-0"
        />
        <div className="col-span-1 md:col-span-2 bg-[#4433FF] text-white p-8 flex flex-col justify-center items-center text-center border-b border-black md:border-b-0">
          <h3 className="text-2xl md:text-4xl font-bold mb-4">
            AI MINDSET POS {'{SPRINT}'}
          </h3>
          <p className="text-xl md:text-2xl opacity-80">
            2 марта — 14 марта 2026
          </p>
          <p className="mt-8 max-w-md text-sm md:text-base leading-relaxed opacity-90">
            За 2 недели ты создашь Personal Operational System: систему агентов для управления вниманием.
          </p>
        </div>
      </div>

      {/* Geometric Manifesto */}
      <GeometricSection />

      {/* Team/Clients List */}
      <div className="border-b border-black">
        <div className="bg-[#FF3300] p-4 md:p-6 border-b border-black text-center">
          <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest">
            ТВОИ ПРОВОДНИКИ
          </h3>
        </div>
        <div className="divide-y divide-black">
          {[
            "ALEXANDER POVALYAEV — FOUNDER / STRATEGIST",
            "SERGEY KHABAROV — SYSTEM ARCHITECT",
            "SEREZHA RIS — AI EVANGELIST / VIBECODER"
          ].map((item, i) => (
            <div key={i} className="p-6 md:p-8 hover:bg-black hover:text-[#FF3300] transition-colors cursor-pointer flex justify-between items-center group">
              <span className="text-lg md:text-2xl font-bold uppercase">{item}</span>
              <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white min-h-screen flex flex-col justify-between p-6 md:p-12 relative overflow-hidden">
        
        {/* Contact Circle */}
        <div className="absolute top-12 right-12 w-24 h-24 border border-white rounded-full flex items-center justify-center animate-spin-slow">
          <div className="w-20 h-20 border border-white rounded-full flex items-center justify-center">
            <ArrowRight className="transform -rotate-45" />
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-[10vw] font-black leading-none tracking-tighter mb-8">
            hola@<br/>aimindset.org
          </h2>
          <p className="text-2xl md:text-4xl font-medium">
            +1 555 0192 834
          </p>
          <div className="flex gap-4 mt-4 text-xl">
            <a href="#" className="hover:underline">Telegram</a>
            <a href="#" className="hover:underline">YouTube</a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/20 pt-8 mt-12">
          <div>
            <span className="text-sm opacity-50 block mb-2">1</span>
            <h3 className="text-6xl font-black uppercase tracking-tighter">AUDIO</h3>
          </div>
          <div>
            <span className="text-sm opacity-50 block mb-2">2</span>
            <h3 className="text-6xl font-black uppercase tracking-tighter">DIRE</h3>
          </div>
          <div>
            <span className="text-sm opacity-50 block mb-2">3</span>
            <h3 className="text-6xl font-black uppercase tracking-tighter">PRODU</h3>
          </div>
        </div>
      </footer>
    </div>
  );
}
