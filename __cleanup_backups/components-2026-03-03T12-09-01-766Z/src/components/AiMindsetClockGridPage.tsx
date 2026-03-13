import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ClockGridStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

    .font-inter { font-family: 'Inter', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    
    .grid-border {
      border: 1px solid #1a1a40;
    }
  `}</style>
);

// --- SVG Widgets ---

const WidgetContainer = ({ children, label }) => (
  <div className="aspect-square border border-[#1a1a40] rounded-full flex items-center justify-center relative p-4 hover:bg-[#1a1a40]/5 transition-colors group">
    {children}
    {label && (
      <div className="absolute bottom-6 text-[10px] font-mono uppercase tracking-widest text-[#1a1a40] opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </div>
    )}
  </div>
);

const ClockFace = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="48" fill="none" stroke="#1a1a40" strokeWidth="0.5" />
    {Array.from({ length: 12 }).map((_, i) => (
      <line
        key={i}
        x1="50"
        y1="10"
        x2="50"
        y2="15"
        stroke="#1a1a40"
        strokeWidth="1"
        transform={`rotate(${i * 30} 50 50)`}
      />
    ))}
    <motion.line
      x1="50"
      y1="50"
      x2="50"
      y2="20"
      stroke="#1a1a40"
      strokeWidth="1"
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    />
    <motion.line
      x1="50"
      y1="50"
      x2="50"
      y2="35"
      stroke="#1a1a40"
      strokeWidth="1.5"
      animate={{ rotate: 360 }}
      transition={{ duration: 720, repeat: Infinity, ease: "linear" }}
    />
  </svg>
);

const RadialGauge = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="48" fill="none" stroke="#1a1a40" strokeWidth="0.5" />
    {Array.from({ length: 60 }).map((_, i) => (
      <line
        key={i}
        x1="50"
        y1="10"
        x2="50"
        y2={i % 5 === 0 ? "20" : "12"}
        stroke="#1a1a40"
        strokeWidth={i % 5 === 0 ? "1" : "0.5"}
        transform={`rotate(${i * 6} 50 50)`}
      />
    ))}
    <motion.path
      d="M 50 50 L 50 15"
      stroke="#1a1a40"
      strokeWidth="1"
      animate={{ rotate: [0, 180, 90, 270, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
  </svg>
);

const ConcentricCircles = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {[10, 20, 30, 40, 48].map((r, i) => (
      <circle
        key={i}
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="#1a1a40"
        strokeWidth="0.5"
        strokeDasharray={i % 2 === 0 ? "4 4" : "none"}
      />
    ))}
    <circle cx="50" cy="50" r="2" fill="#1a1a40" />
  </svg>
);

const TextCircle = ({ text }) => (
  <div className="w-full h-full flex items-center justify-center relative animate-[spin_20s_linear_infinite]">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path
        id="curve"
        d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
        fill="none"
      />
      <text fontSize="8" fontFamily="JetBrains Mono" fill="#1a1a40" letterSpacing="2">
        <textPath href="#curve">
          {text}
        </textPath>
      </text>
    </svg>
  </div>
);

const RandomShapes = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="48" fill="none" stroke="#1a1a40" strokeWidth="0.5" />
    <rect x="35" y="35" width="30" height="30" fill="none" stroke="#1a1a40" strokeWidth="0.5" transform="rotate(45 50 50)" />
    <polygon points="50,20 80,80 20,80" fill="none" stroke="#1a1a40" strokeWidth="0.5" />
  </svg>
);

const Spiral = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
     <motion.path
        d="M50 50 m0 0 a1 1 0 0 1 2 0 a2 2 0 0 1 -4 0 a3 3 0 0 1 6 0 a4 4 0 0 1 -8 0 a5 5 0 0 1 10 0 a6 6 0 0 1 -12 0 a7 7 0 0 1 14 0 a8 8 0 0 1 -16 0 a9 9 0 0 1 18 0 a10 10 0 0 1 -20 0 a11 11 0 0 1 22 0 a12 12 0 0 1 -24 0 a13 13 0 0 1 26 0 a14 14 0 0 1 -28 0 a15 15 0 0 1 30 0 a16 16 0 0 1 -32 0 a17 17 0 0 1 34 0 a18 18 0 0 1 -36 0 a19 19 0 0 1 38 0 a20 20 0 0 1 -40 0 a21 21 0 0 1 42 0 a22 22 0 0 1 -44 0"
        fill="none"
        stroke="#1a1a40"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
     />
  </svg>
);

export default function AiMindsetClockGridPage() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] text-[#1a1a40] font-inter selection:bg-[#1a1a40] selection:text-white overflow-x-hidden">
      <ClockGridStyles />

      {/* Header Info */}
      <header className="px-8 py-12 flex flex-col md:flex-row justify-between items-start md:items-end font-mono text-xs tracking-wider uppercase">
        <div className="space-y-1">
          <p>A: AI Mindset POS {`{sprint}`}</p>
          <p>B: Winter 26 Batch</p>
        </div>
        <div className="mt-4 md:mt-0 text-right space-y-1">
          <p>Applications: Open</p>
          <p>2 March — 14 March 2026</p>
        </div>
      </header>

      {/* Main Title */}
      <section className="px-4 md:px-8 pb-16 text-center">
        <h1 className="text-[10vw] md:text-[12vw] leading-none font-medium tracking-tight text-[#1a1a40]">
          AI MINDSET POS
        </h1>
        <div className="max-w-2xl mx-auto mt-8 text-center font-mono text-sm leading-relaxed uppercase tracking-wide">
          <p>
            POS is not a tool, it is an operating system with a personal AI assistant. A layer of rules, context, and constraints that makes tools work.
          </p>
        </div>
      </section>

      {/* The Grid */}
      <section className="px-4 md:px-8 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          
          {/* Row 1 */}
          <WidgetContainer label="Time">
            <ClockFace />
          </WidgetContainer>
          <WidgetContainer label="Context">
            <ConcentricCircles />
          </WidgetContainer>
          <WidgetContainer label="Cycle">
             <TextCircle text="FROM CHAOS TO SYSTEM • FROM CHAOS TO SYSTEM • " />
          </WidgetContainer>
          <WidgetContainer label="Measure">
            <RadialGauge />
          </WidgetContainer>

          {/* Row 2 */}
          <div className="col-span-2 md:col-span-2 aspect-[2/1] border border-[#1a1a40] rounded-[100px] flex flex-col items-center justify-center p-8 text-center hover:bg-[#1a1a40] hover:text-white transition-colors cursor-pointer">
             <h3 className="text-2xl md:text-4xl font-medium mb-2">The Sprint</h3>
             <p className="font-mono text-xs uppercase max-w-xs">
                2 weeks to build your Personal Operational System
             </p>
          </div>
          <WidgetContainer label="Logic">
             <RandomShapes />
          </WidgetContainer>
          <WidgetContainer label="Flow">
             <Spiral />
          </WidgetContainer>

           {/* Row 3 */}
           <WidgetContainer label="Alex Povalyaev">
              <div className="text-center">
                 <span className="text-4xl font-medium block">AP</span>
                 <span className="text-[8px] font-mono uppercase mt-1 block">Strategist</span>
              </div>
           </WidgetContainer>
           <WidgetContainer label="Sergey Khabarov">
              <div className="text-center">
                 <span className="text-4xl font-medium block">SK</span>
                 <span className="text-[8px] font-mono uppercase mt-1 block">Architect</span>
              </div>
           </WidgetContainer>
           <WidgetContainer label="Seryozha Ris">
              <div className="text-center">
                 <span className="text-4xl font-medium block">SR</span>
                 <span className="text-[8px] font-mono uppercase mt-1 block">Evangelist</span>
              </div>
           </WidgetContainer>
           <WidgetContainer label="Claude">
              <div className="text-center">
                 <span className="text-4xl font-medium block">AI</span>
                 <span className="text-[8px] font-mono uppercase mt-1 block">Assistant</span>
              </div>
           </WidgetContainer>

        </div>
      </section>

      {/* Text Content Section */}
      <section className="px-4 md:px-8 py-24 bg-[#1a1a40] text-[#F0F2F5]">
         <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
               <div>
                  <h3 className="font-mono text-sm uppercase tracking-widest mb-8 border-b border-[#F0F2F5]/20 pb-4">
                     Outcomes
                  </h3>
                  <ul className="space-y-8">
                     <li>
                        <h4 className="text-2xl font-medium mb-2">Collected Context</h4>
                        <p className="opacity-70 text-sm leading-relaxed">AI knows who you are, how you work, and what is important to you.</p>
                     </li>
                     <li>
                        <h4 className="text-2xl font-medium mb-2">Logical Architecture</h4>
                        <p className="opacity-70 text-sm leading-relaxed">Won't delete all files without asking or buy a useless $3k course.</p>
                     </li>
                     <li>
                        <h4 className="text-2xl font-medium mb-2">Connected Tools</h4>
                        <p className="opacity-70 text-sm leading-relaxed">Claude Code / Cursor / Obsidian / MCP.</p>
                     </li>
                  </ul>
               </div>
               
               <div className="flex flex-col justify-between">
                  <div>
                     <h3 className="font-mono text-sm uppercase tracking-widest mb-8 border-b border-[#F0F2F5]/20 pb-4">
                        Pricing
                     </h3>
                     <p className="text-4xl font-medium mb-4">Join the Lab</p>
                     <p className="opacity-70 text-sm mb-8">
                        Discounts: Alumni (-20%), Bring a Friend (-10%). Refund within first 4 days — no questions asked.
                     </p>
                  </div>
                  <button className="w-full py-4 border border-[#F0F2F5] rounded-full hover:bg-[#F0F2F5] hover:text-[#1a1a40] transition-colors font-mono uppercase text-sm tracking-widest">
                     Apply Now
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-12 flex justify-between items-end font-mono text-[10px] uppercase tracking-widest text-[#1a1a40]">
         <div className="space-y-1">
            <a href="#" className="block hover:underline">Telegram</a>
            <a href="#" className="block hover:underline">YouTube</a>
            <a href="#" className="block hover:underline">Website</a>
         </div>
         <div className="text-right opacity-50">
            AI Mindset © 2026
         </div>
      </footer>

    </div>
  );
}
