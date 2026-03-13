import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// --- Components ---

const KnitText = ({ 
  children, 
  type = "stripe", 
  className = "",
  size = "text-6xl"
}: { 
  children: React.ReactNode; 
  type?: "stripe" | "dot" | "check" | "solid"; 
  className?: string;
  size?: string;
}) => {
  let bgStyle = {};

  if (type === "stripe") {
    bgStyle = {
      backgroundImage: "repeating-linear-gradient(to bottom, white 0px, white 2px, transparent 2px, transparent 6px)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundSize: "100% 100%"
    };
  } else if (type === "dot") {
    bgStyle = {
      backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
      backgroundSize: "6px 6px",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    };
  } else if (type === "check") {
    bgStyle = {
      backgroundImage: `
        linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white),
        linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white)
      `,
      backgroundSize: "6px 6px",
      backgroundPosition: "0 0, 3px 3px",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    };
  }

  return (
    <div className={`${className} ${size} font-black uppercase leading-[0.85] tracking-tighter`} style={bgStyle}>
      {children}
    </div>
  );
};

const ArrowLink = ({ text, href = "#" }: { text: string; href?: string }) => (
  <a href={href} className="group flex items-center gap-2 text-[#FF3300] hover:text-white transition-colors">
    <span className="font-mono text-xl uppercase tracking-widest border-b border-transparent group-hover:border-white">{text}</span>
    <ArrowUpRight className="w-6 h-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
  </a>
);

const WeekCard = ({ num, title, desc, type }: { num: string; title: string; desc: string; type: "stripe" | "dot" | "check" }) => (
  <div className="border-t border-white/20 py-8 group hover:bg-white/5 transition-colors cursor-pointer">
    <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 mb-4">
      <span className="font-mono text-[#FF3300] text-lg">W{num}</span>
      <KnitText type={type} size="text-4xl md:text-6xl">{title}</KnitText>
    </div>
    <div className="md:pl-24 max-w-2xl">
      <p className="font-mono text-lg leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
        {desc}
      </p>
    </div>
  </div>
);

// --- Main Page ---

export default function KnitGroteskPage() {
  return (
    <div className="min-h-screen bg-[#0000B0] text-white font-sans selection:bg-[#FF3300] selection:text-white overflow-x-hidden">
      
      {/* Header */}
      <header className="px-6 py-6 flex justify-between items-start border-b border-white/20">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full border border-white/40 bg-white/5 flex items-center justify-center mt-0.5">
            <img
              src="/assets/ai-mindset-logo.png"
              alt="AI Mindset logo"
              className="h-4 w-auto object-contain invert"
            />
          </div>
          <div className="flex flex-col">
          <KnitText type="dot" size="text-2xl">AI MINDSET</KnitText>
          <KnitText type="stripe" size="text-2xl">LAB W26</KnitText>
          </div>
        </div>
        <div className="text-right font-mono text-sm leading-tight hidden md:block">
          <div>BATCH: WINTER 26</div>
          <div>STATUS: APPLICATIONS OPEN</div>
          <div className="text-[#FF3300]">NEXT: APRIL 20</div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pt-20 pb-32">
        <div className="max-w-[90vw]">
          <KnitText type="stripe" size="text-[12vw] md:text-[14vw]">DESIGN</KnitText>
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-12 -mt-4 md:-mt-12">
            <KnitText type="dot" size="text-[12vw] md:text-[14vw]">YOUR</KnitText>
            <div className="mb-4 md:mb-12 max-w-md">
              <p className="font-mono text-sm md:text-lg leading-tight text-[#FF3300] uppercase">
                Лаборатория нового мышления в эпоху AI. 
                От хаоса промптов к персональной операционной системе.
              </p>
            </div>
          </div>
          <KnitText type="check" size="text-[12vw] md:text-[14vw] -mt-4 md:-mt-12">MINDSET</KnitText>
        </div>

        <div className="mt-20 flex flex-wrap gap-12">
          <ArrowLink text="JOIN WAITLIST" href="https://join.aimindset.org/waitlist" />
          <ArrowLink text="READ MANIFESTO" />
        </div>
      </section>

      {/* Curriculum */}
      <section className="px-6 py-20 border-t border-white/20">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-mono text-sm text-[#FF3300] uppercase tracking-widest">
            Curriculum / 4 Weeks
          </h2>
          <div className="font-mono text-xs border border-white px-2 py-1 rounded-full">
            19 JAN — 16 FEB
          </div>
        </div>

        <div className="flex flex-col">
          <WeekCard 
            num="01" 
            title="PROMPT ENG." 
            desc="AI как интерфейс мышления. Chain-of-Thought, Few-Shot Learning. Создание первых персональных ассистентов."
            type="stripe"
          />
          <WeekCard 
            num="02" 
            title="CONTEXT ENG." 
            desc="Автоматизация и агенты. Управление контекстом: Obsidian + MCP + Claude. AI-агенты и workflows."
            type="dot"
          />
          <WeekCard 
            num="03" 
            title="MIND ENG." 
            desc="Продуктивность и ритуалы. AI для коучинга, рефлексии. Трекинг привычек и целей с поддержкой AI."
            type="check"
          />
          <WeekCard 
            num="04" 
            title="LIFE ENG." 
            desc="Творчество и реализация. Vibe-coding с Cursor. От идеи до прототипа без технического бэкграунда."
            type="stripe"
          />
        </div>
      </section>

      {/* Tracks Grid */}
      <section className="grid md:grid-cols-2 border-t border-white/20">
        <div className="p-6 md:p-12 border-b md:border-b-0 md:border-r border-white/20">
          <KnitText type="dot" size="text-4xl mb-8">ADVANCED TRACKS</KnitText>
          <ul className="space-y-6 font-mono text-lg">
            <li className="flex items-start gap-4">
              <span className="text-[#FF3300]">01</span>
              <div>
                <div className="font-bold uppercase">AI Coaching</div>
                <div className="opacity-60 text-sm">Для тех, кто выгорел и ищет баланс</div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-[#FF3300]">02</span>
              <div>
                <div className="font-bold uppercase">AI Agents</div>
                <div className="opacity-60 text-sm">Автономные AI-системы и MCP</div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-[#FF3300]">03</span>
              <div>
                <div className="font-bold uppercase">Vibe Coding</div>
                <div className="opacity-60 text-sm">Творческое программирование</div>
              </div>
            </li>
          </ul>
        </div>

        <div className="p-6 md:p-12 bg-[#FF3300] text-[#0000B0]">
          <div className="h-full flex flex-col justify-between">
            <div>
              <h3 className="font-mono text-sm uppercase tracking-widest mb-4 text-white">Start Now</h3>
              <div className="text-6xl font-black uppercase tracking-tighter leading-none mb-8 text-white">
                Build Your<br/>Personal OS
              </div>
            </div>
            
            <div className="space-y-4">
               <div className="flex justify-between items-center border-b border-[#0000B0]/20 pb-2">
                 <span className="font-mono font-bold">BASE LAB</span>
                 <span className="font-mono font-bold">€590</span>
               </div>
               <div className="flex justify-between items-center border-b border-[#0000B0]/20 pb-2">
                 <span className="font-mono font-bold">ADVANCED</span>
                 <span className="font-mono font-bold">€890</span>
               </div>
               <button className="w-full mt-8 bg-[#0000B0] text-white py-4 font-mono uppercase hover:bg-white hover:text-[#0000B0] transition-colors">
                 Apply for Winter 26
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/20 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
           <KnitText type="stripe" size="text-xl">AI MINDSET</KnitText>
           <div className="font-mono text-xs opacity-60 max-w-xs">
             Мы создаём пространство, где mindset важнее инструментов.
           </div>
        </div>
        <div className="font-mono text-xs text-[#FF3300]">
          MOSCOW [RU] / WORLDWIDE [WEB]
        </div>
      </footer>

    </div>
  );
}
