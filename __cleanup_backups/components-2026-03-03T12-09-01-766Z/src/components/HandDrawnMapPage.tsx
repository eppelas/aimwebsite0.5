import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Assets ---

const SketchyLine: React.FC<{ d: string; className?: string }> = ({ d, className }) => (
  <path 
    d={d} 
    fill="none" 
    stroke="#1A1A1A" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  />
);

const NumberDot: React.FC<{ 
  num: number; 
  x: number; 
  y: number; 
  onClick: () => void; 
  active: boolean;
}> = ({ 
  num, 
  x, 
  y, 
  onClick, 
  active 
}) => (
  <motion.g 
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: num * 0.1, type: 'spring' }}
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    className="cursor-pointer group"
  >
    <circle cx={x} cy={y} r="4" fill={active ? "#1A1A1A" : "#C19D6D"} className="transition-colors duration-300" />
    <text 
      x={x + 10} 
      y={y + 4} 
      fontFamily="monospace" 
      fontSize="12" 
      fill="#C19D6D" 
      className={`select-none transition-colors duration-300 ${active ? 'fill-black font-bold' : 'group-hover:fill-black'}`}
    >
      {num}
    </text>
  </motion.g>
);

// --- Components ---

const Tooltip = ({ data, onClose }: { data: any; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    className="absolute bottom-24 left-4 md:left-auto md:right-12 bg-white border border-black p-6 max-w-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] z-50"
  >
    <button onClick={onClose} className="absolute top-2 right-2 text-xs font-mono hover:bg-black hover:text-white px-1">
      [x]
    </button>
    <div className="font-mono text-xs text-[#C19D6D] mb-2 uppercase tracking-widest">
      Week 0{data.id}
    </div>
    <h3 className="text-xl font-sans font-bold mb-2">{data.title}</h3>
    <p className="font-serif italic text-sm text-gray-600 mb-4">
      {data.desc}
    </p>
    <div className="font-mono text-[10px] text-gray-400 uppercase">
      {data.tools}
    </div>
  </motion.div>
);

const CookieBanner = () => (
  <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#333] text-[#F5F5F0] px-6 py-3 rounded-full flex items-center gap-4 shadow-xl z-50 max-w-[90vw]">
    <span className="text-xs font-sans">We use cookies to improve your experience.</span>
    <div className="flex gap-2">
      <button className="bg-[#F5F5F0] text-black text-xs px-3 py-1 rounded-full hover:bg-white transition-colors">Allow all</button>
      <button className="border border-[#F5F5F0] text-[#F5F5F0] text-xs px-3 py-1 rounded-full hover:bg-[#444] transition-colors">Reject</button>
    </div>
  </div>
);

// --- Main Page ---

export default function HandDrawnMapPage() {
  const [activePoint, setActivePoint] = useState<number | null>(null);

  const points = [
    { 
      id: 1, 
      x: 200, 
      y: 400, 
      title: "Prompt Engineering", 
      desc: "AI как интерфейс мышления. Chain-of-Thought, Few-Shot Learning. Создание первых персональных ассистентов.",
      tools: "ChatGPT / Claude / Gemini"
    },
    { 
      id: 2, 
      x: 450, 
      y: 250, 
      title: "Context Engineering", 
      desc: "Автоматизация и агенты. Управление контекстом: Obsidian + MCP + Claude.",
      tools: "Obsidian / n8n / Make"
    },
    { 
      id: 3, 
      x: 600, 
      y: 500, 
      title: "Mind Engineering", 
      desc: "Продуктивность и ритуалы. AI для коучинга, рефлексии и трекинга привычек.",
      tools: "Notion / Taskade / Custom GPTs"
    },
    { 
      id: 4, 
      x: 800, 
      y: 300, 
      title: "Life Engineering", 
      desc: "Творчество и реализация. Vibe-coding с Cursor. От идеи до прототипа.",
      tools: "Cursor / Replit / V0"
    },
  ];

  return (
    <div 
      className="min-h-screen bg-[#F5F5F0] text-[#1A1A1A] font-sans relative overflow-hidden selection:bg-[#C19D6D] selection:text-white"
      onClick={() => setActivePoint(null)}
    >
      
      {/* Header */}
      <header className="fixed top-0 left-0 p-6 md:p-12 z-40 pointer-events-none">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight pointer-events-auto">
          ты водишь!
        </h1>
        <div className="font-mono text-xs text-[#C19D6D] mt-1 pointer-events-auto">
          ai mindset lab w26
        </div>
      </header>

      <div className="fixed top-6 right-6 md:top-12 md:right-12 z-40 text-right pointer-events-none">
         <div className="font-mono text-xs pointer-events-auto hover:underline cursor-pointer">o проекте</div>
         <div className="font-mono text-xs pointer-events-auto hover:underline cursor-pointer">2026</div>
      </div>

      {/* Main Canvas */}
      <div className="w-full h-screen flex items-center justify-center overflow-auto">
        <div className="relative min-w-[1000px] min-h-[800px]">
          <svg width="1000" height="800" viewBox="0 0 1000 800" className="w-full h-full">
            
            {/* --- Sketchy Illustrations --- */}
            
            {/* The "Room" / Structure */}
            <SketchyLine d="M100,700 L300,650 L300,200 L100,250 Z" /> {/* Left Wall */}
            <SketchyLine d="M300,200 L800,200 L900,250" /> {/* Ceiling Line */}
            <SketchyLine d="M800,200 L800,600 L300,650" /> {/* Back Wall */}
            
            {/* Element 1: The "Server/Fridge" (Prompt) */}
            <g transform="translate(150, 350)">
               <SketchyLine d="M0,0 L80,-10 L80,150 L0,160 Z" />
               <SketchyLine d="M80,-10 L120,-20 L120,140 L80,150" />
               <SketchyLine d="M0,0 L40,-10 L120,-20" />
               {/* Details */}
               <circle cx="20" cy="20" r="2" fill="#1A1A1A" />
               <circle cx="20" cy="40" r="2" fill="#1A1A1A" />
               <SketchyLine d="M60,100 L70,100" />
            </g>

            {/* Element 2: The "Swing/Network" (Context) */}
            <g transform="translate(400, 150)">
               <SketchyLine d="M20,0 L20,100" />
               <SketchyLine d="M100,0 L100,100" />
               <SketchyLine d="M10,100 Q60,120 110,100" /> {/* Seat */}
               <SketchyLine d="M10,100 L110,100 L120,110 L20,110 Z" />
            </g>

            {/* Element 3: The "Plant/Growth" (Mind) */}
            <g transform="translate(550, 450)">
               <SketchyLine d="M30,100 Q30,50 10,10" /> {/* Stem */}
               <SketchyLine d="M30,80 Q60,60 50,20" /> {/* Stem */}
               <SketchyLine d="M10,10 Q0,0 10,-10 Q20,0 10,10" /> {/* Leaf */}
               <SketchyLine d="M50,20 Q60,10 70,20 Q60,30 50,20" /> {/* Leaf */}
               <SketchyLine d="M10,100 L50,100 L40,140 L20,140 Z" /> {/* Pot */}
            </g>

            {/* Element 4: The "Table/Workspace" (Life) */}
            <g transform="translate(700, 250)">
               <SketchyLine d="M0,50 L150,30 L180,40 L30,60 Z" /> {/* Top */}
               <SketchyLine d="M0,50 L0,150" /> {/* Leg */}
               <SketchyLine d="M150,30 L150,130" /> {/* Leg */}
               <SketchyLine d="M180,40 L180,140" /> {/* Leg */}
               {/* Laptop */}
               <SketchyLine d="M50,40 L90,35 L100,45 L60,50 Z" />
               <SketchyLine d="M50,40 L50,10 L90,5 L90,35" />
            </g>

            {/* Random Decor */}
            <SketchyLine d="M50,50 L80,80 M80,50 L50,80" className="opacity-20" /> {/* Sun? */}
            <SketchyLine d="M900,600 Q920,620 940,600" className="opacity-20" /> {/* Bird? */}

          </svg>

          {/* Interactive Dots Layered on Top */}
          <div className="absolute inset-0 pointer-events-none">
            <svg width="1000" height="800" className="pointer-events-auto">
              {points.map((p) => (
                <NumberDot 
                  key={p.id}
                  num={p.id}
                  x={p.x}
                  y={p.y}
                  active={activePoint === p.id}
                  onClick={() => setActivePoint(p.id)}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Tooltip / Modal */}
      <AnimatePresence>
        {activePoint && (
          <Tooltip 
            data={points.find(p => p.id === activePoint)} 
            onClose={() => setActivePoint(null)} 
          />
        )}
      </AnimatePresence>

      <CookieBanner />

    </div>
  );
}
