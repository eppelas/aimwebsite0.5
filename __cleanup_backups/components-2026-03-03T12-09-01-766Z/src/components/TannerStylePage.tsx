import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

// --- Styles ---

const TannerStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
    
    .font-tanner { font-family: 'Inter', sans-serif; }
    
    .scribble-path {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      animation: draw 2s ease-out forwards;
    }
    
    @keyframes draw {
      to {
        stroke-dashoffset: 0;
      }
    }
  `}</style>
);

// --- Components ---

const ScribbleCat = () => (
  <svg viewBox="0 0 200 200" className="w-32 h-32 md:w-48 md:h-48 transform -rotate-12">
    <path 
      d="M40,160 Q30,100 50,80 Q40,40 60,20 L80,60 Q100,50 120,60 L140,20 Q160,40 150,80 Q170,100 160,160 Q100,180 40,160 M60,100 Q70,90 80,100 M120,100 Q130,90 140,100 M100,130 L110,130"
      fill="none" 
      stroke="black" 
      strokeWidth="3"
      strokeLinecap="round"
      className="scribble-path"
    />
    <path 
      d="M40,170 L160,170 M50,170 L40,180 M150,170 L160,180"
      fill="none" 
      stroke="black" 
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const NumberStrip = () => (
  <div className="flex gap-4 text-2xl md:text-4xl font-normal overflow-hidden whitespace-nowrap opacity-20 select-none">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
      <span key={n}>{n}</span>
    ))}
  </div>
);

const ProjectSection = ({ 
  number, 
  title, 
  content, 
  deliverables, 
  visual, 
  bgColor = "bg-gray-100" 
}: { 
  number: string, 
  title: string, 
  content: React.ReactNode, 
  deliverables?: string, 
  visual: React.ReactNode,
  bgColor?: string
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] border-t border-black">
    {/* Left Content */}
    <div className="p-4 md:p-8 lg:p-12 flex flex-col justify-between relative border-r border-black/10">
      <div>
        <div className="flex justify-between items-baseline mb-8 md:mb-16">
          <div className="flex items-baseline gap-4">
            <span className="text-2xl md:text-4xl font-normal">{number}</span>
            <h2 className="text-3xl md:text-5xl uppercase font-normal leading-tight max-w-md">
              {title}
            </h2>
          </div>
          <div className="hidden md:block">
            <NumberStrip />
          </div>
        </div>

        <div className="text-lg md:text-2xl leading-relaxed space-y-6 font-normal max-w-xl">
          {content}
        </div>
      </div>

      {deliverables && (
        <div className="mt-12 md:mt-24">
          <span className="font-bold">Deliverables: </span>
          <span className="text-lg">{deliverables}</span>
        </div>
      )}
    </div>

    {/* Right Visual */}
    <div className={`${bgColor} relative overflow-hidden flex items-center justify-center min-h-[400px] lg:min-h-auto`}>
      {visual}
    </div>
  </div>
);

// --- Main Page ---

export default function TannerStylePage() {
  return (
    <div className="min-h-screen bg-white text-black font-tanner selection:bg-black selection:text-white">
      <TannerStyles />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-start z-50 mix-blend-difference text-white md:text-black md:mix-blend-normal bg-black md:bg-transparent">
        <div className="hidden md:block"></div> {/* Spacer */}
        <div className="flex gap-4 text-lg md:text-xl uppercase font-normal tracking-wide">
          <a href="#" className="hover:opacity-50">Insta</a>
          <a href="#" className="hover:opacity-50">Info</a>
          <a href="#" className="hover:opacity-50">Index</a>
        </div>
      </header>

      {/* Hero */}
      <section className="min-h-[80vh] p-4 md:p-12 pt-24 md:pt-32 flex flex-col justify-between relative">
        <div className="max-w-5xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl uppercase leading-[1.1] font-normal">
            AI Mindset is a system architect based in Global Online — Passionate about designing intelligent, personal agent systems + knowledge bases
          </h1>
        </div>

        <div className="absolute top-1/2 right-4 md:right-24 transform -translate-y-1/2 hidden lg:block">
          <ScribbleCat />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mt-12">
          <ArrowDown className="w-8 h-8 animate-bounce" />
          <div className="text-right max-w-xs text-sm md:text-base">
            Music is a personal must — here are ↓ some favs to listen while you scroll
          </div>
        </div>
      </section>

      {/* Section 1: What is POS */}
      <ProjectSection 
        number="(1)"
        title="What is POS"
        bgColor="bg-[#008F5D]" // Green from screenshot
        content={
          <>
            <p>"From chaos to a working AI system"</p>
            <p>
              POS is not a tool, it is an operating system with a personal AI assistant. A layer of rules, context, and constraints that makes tools work.
            </p>
            <p>
              Imagine: In the morning, the agent gives a plan for the day tailored to your energy level. During the day, it reminds you of a meeting with a brief it prepared.
            </p>
          </>
        }
        deliverables="System Architecture, Agent Configuration, Knowledge Base Setup, Automation Rules"
        visual={
          <div className="relative w-full h-full p-12 flex items-center justify-center">
            <div className="text-[#CCFF00] text-center transform -rotate-6">
              <div className="text-2xl md:text-3xl font-bold uppercase tracking-widest mb-2">"Quality Agents"</div>
              <div className="text-6xl md:text-8xl font-black uppercase leading-none mb-4">AI MINDSET</div>
              <div className="text-xl font-mono">ESTD. 2026 • BATCH X26</div>
              <div className="mt-8 border-2 border-[#CCFF00] rounded-full px-8 py-2 inline-block text-xl uppercase">
                Personal OS
              </div>
            </div>
            {/* Abstract shapes */}
            <div className="absolute top-10 left-10 text-[#CCFF00] text-6xl font-black opacity-50">5</div>
            <div className="absolute bottom-10 right-10 text-[#CCFF00] text-6xl font-black opacity-50">7</div>
          </div>
        }
      />

      {/* Section 2: Program */}
      <ProjectSection 
        number="(2)"
        title="Program"
        bgColor="bg-[#E0D8D6]" // Beige/Grey from screenshot
        content={
          <>
            <p>
              Woven by nature, curated for comfort.
            </p>
            <p>
              We collected patterns from founders and turned them into a sprint. So you don't reinvent the wheel, but take what already works and adapt it for yourself.
            </p>
            <p>
              A distillate of real cases from real founders. Proven stacks, not a set of hyped tools.
            </p>
          </>
        }
        deliverables="Context Collection, Logical Architecture, Connected Tools (Claude/Cursor/Obsidian), Working Skills"
        visual={
          <div className="w-full h-full grid grid-cols-4 grid-rows-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <div 
                key={i} 
                className={`
                  ${i % 2 === 0 ? 'bg-[#3E2B2E]' : 'bg-[#D4B4B4]'} 
                  flex items-center justify-center
                `}
              >
                <div className={`w-1/2 h-1/2 rounded-full ${i % 2 === 0 ? 'bg-[#D4B4B4]' : 'bg-[#3E2B2E]'}`} />
              </div>
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="bg-white/90 px-8 py-4 text-4xl font-thin tracking-widest uppercase backdrop-blur-sm">
                 Program
               </div>
            </div>
          </div>
        }
      />

      {/* Section 3: Guides */}
      <ProjectSection 
        number="(3)"
        title="Guides"
        bgColor="bg-[#FF9933]" // Orange
        content={
          <>
            <p>
              We live in these processes every day — building systems, agents, skills.
            </p>
            <ul className="space-y-4 mt-4">
              <li className="flex items-start gap-2">
                <ArrowUpRight className="mt-1 shrink-0" />
                <span><strong>Alexander Povalyaev</strong> — Founder, Strategist. 15+ years connecting tech & business.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowUpRight className="mt-1 shrink-0" />
                <span><strong>Sergey Khabarov</strong> — System Architect. Ex-CTO, 6+ years in EdTech.</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowUpRight className="mt-1 shrink-0" />
                <span><strong>Seryozha Ris</strong> — AI Evangelist, ex-Yandex. Claude Code streamer.</span>
              </li>
            </ul>
          </>
        }
        deliverables="Mentorship, Live Sessions, Code Reviews, System Design"
        visual={
          <div className="w-full h-full relative bg-[#FF9933] p-12">
             <div className="absolute top-0 left-0 w-full h-full grid grid-cols-2">
                <div className="bg-[#FFB366]"></div>
                <div className="bg-[#FF9933]"></div>
                <div className="bg-[#FF9933]"></div>
                <div className="bg-[#FFB366]"></div>
             </div>
             <div className="relative z-10 h-full flex flex-col justify-between text-white mix-blend-hard-light">
               <div className="text-9xl font-black leading-none">AI</div>
               <div className="text-9xl font-black leading-none text-right">LAB</div>
             </div>
          </div>
        }
      />

      {/* Footer */}
      <footer className="bg-black text-white p-4 md:p-12 min-h-[50vh] flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl uppercase font-bold mb-8">Contact</h3>
            <div className="flex flex-col gap-2 text-xl">
              <a href="#" className="hover:text-gray-400">Podcast ↗</a>
              <a href="#" className="hover:text-gray-400">Telegram Channel ↗</a>
              <a href="#" className="hover:text-gray-400">Public Offer ↗</a>
            </div>
          </div>
          <div>
             <h3 className="text-2xl uppercase font-bold mb-8">Details</h3>
             <p className="text-xl mb-2">Batch X26</p>
             <p className="text-xl text-gray-400">Mar 2 — 14, 2026</p>
             <p className="text-xl mt-8">Applications Open</p>
          </div>
        </div>
        
        <div className="flex justify-between items-end mt-12 border-t border-white/20 pt-8">
          <div className="text-[10vw] leading-none font-black text-white/20">
            POS—26
          </div>
          <div className="hidden md:block text-sm text-gray-500">
            © AI Mindset 2026
          </div>
        </div>
      </footer>

    </div>
  );
}
