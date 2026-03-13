import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

const ObysStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
    
    .font-obys { font-family: 'Inter', sans-serif; }
    
    .obys-grid-line {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 1px;
      background-color: rgba(0,0,0,0.1);
    }

    .obys-horizontal-line {
      width: 100%;
      height: 1px;
      background-color: black;
    }

    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

const GridOverlay = ({ active }: { active: boolean }) => {
  if (!active) return null;
  return (
    <div className="fixed inset-0 z-0 pointer-events-none flex justify-between px-4 md:px-12 max-w-[1920px] mx-auto w-full left-0 right-0">
      <div className="obys-grid-line left-0" />
      <div className="obys-grid-line left-[25%]" />
      <div className="obys-grid-line left-[50%]" />
      <div className="obys-grid-line left-[75%]" />
      <div className="obys-grid-line right-0" />
    </div>
  );
};

const TogglePill = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <div className="flex items-center gap-2 font-obys text-xs uppercase tracking-wide">
    <span>{label}:</span>
    <button 
      onClick={onClick}
      className="flex border border-black rounded-full p-[2px] gap-1 cursor-pointer hover:bg-black/5 transition-colors"
    >
      <div className={`px-2 py-0.5 rounded-full transition-colors ${active ? 'bg-transparent' : 'bg-black text-white'}`}>Off</div>
      <div className={`px-2 py-0.5 rounded-full transition-colors ${active ? 'bg-black text-white' : 'bg-transparent'}`}>On</div>
    </button>
  </div>
);

const CrazyElement = ({ children, crazy, className = "" }: { children: React.ReactNode, crazy: boolean, className?: string }) => {
  const [randomProps, setRandomProps] = useState({ rotate: 0, x: 0, y: 0 });

  useEffect(() => {
    if (crazy) {
      setRandomProps({
        rotate: Math.random() * 10 - 5,
        x: Math.random() * 20 - 10,
        y: Math.random() * 20 - 10,
      });
    } else {
      setRandomProps({ rotate: 0, x: 0, y: 0 });
    }
  }, [crazy]);

  return (
    <motion.div 
      className={className}
      animate={crazy ? randomProps : { rotate: 0, x: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      {children}
    </motion.div>
  );
};

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <section className={`min-h-screen relative flex flex-col justify-center px-4 md:px-12 py-24 border-b border-black/10 ${className}`}>
    {children}
  </section>
);

export default function AiMindsetObysPage() {
  const [gridActive, setGridActive] = useState(true);
  const [crazyMode, setCrazyMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const xMove = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-[#F2F2F2] text-black font-obys selection:bg-black selection:text-white hide-scrollbar relative">
      <ObysStyles />
      <GridOverlay active={gridActive} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-6 flex justify-between items-center bg-[#F2F2F2]/90 backdrop-blur-sm border-b border-black">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border border-black flex items-center justify-center bg-white">
            <img
              src="/assets/ai-mindset-logo.png"
              alt="AI Mindset logo"
              className="h-3 w-auto object-contain"
            />
          </div>
          <span className="text-xs font-medium tracking-tight">AI MINDSET</span>
        </div>
        
        <div className="hidden md:block text-xs text-black/60">
          Intro / System / Agents
        </div>

        <div className="flex gap-6">
          <TogglePill label="Grid" active={gridActive} onClick={() => setGridActive(!gridActive)} />
          <TogglePill label="Crazy Mode" active={crazyMode} onClick={() => setCrazyMode(!crazyMode)} />
        </div>
      </header>

      {/* Hero Section */}
      <Section className="pt-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-full items-center">
          <div className="relative">
             <CrazyElement crazy={crazyMode}>
              <div className="w-full aspect-square bg-black flex items-center justify-center text-white p-12">
                 {/* Abstract shape or just black block */}
              </div>
             </CrazyElement>
          </div>
          <div className="flex flex-col justify-between h-full py-12">
             <div className="text-sm max-w-xs">
               This interface is a part of the AI Mindset educational projects.
               This time we show our principles of the system using.
             </div>
             
             <div className="mt-24">
               <div className="text-xs mb-4">4 types of agents</div>
               <CrazyElement crazy={crazyMode}>
                <h1 className="text-[18vw] leading-[0.8] font-medium tracking-tighter -ml-2">
                  SYST
                </h1>
                <h1 className="text-[18vw] leading-[0.8] font-medium tracking-tighter ml-12 md:ml-24">
                  EM
                </h1>
               </CrazyElement>
             </div>
          </div>
        </div>
      </Section>

      {/* Typography / Marquee Section */}
      <div className="py-24 overflow-hidden border-b border-black/10 bg-white">
        <motion.div style={{ x: xMove }} className="whitespace-nowrap flex gap-12 items-center">
          <span className="text-[12rem] font-medium tracking-tighter">CONTEXT</span>
          <div className="w-32 h-32 bg-black rounded-full" />
          <span className="text-[12rem] font-medium tracking-tighter">CONSTRAINTS</span>
          <div className="w-32 h-32 border-[10px] border-black" />
          <span className="text-[12rem] font-medium tracking-tighter">AGENTS</span>
        </motion.div>
      </div>

      {/* Agents Grid Section */}
      <Section className="bg-black text-[#F2F2F2]">
        <div className="mb-24 flex justify-between items-end border-b border-white/20 pb-4">
          <h2 className="text-[8vw] leading-none">4 TYPES OF<br/>AGENTS</h2>
          <span className="text-xs mb-2">Scroll down →</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[60vh]">
          {[
            { id: '01', name: 'Planner', desc: 'Morning routine optimization' },
            { id: '02', name: 'Briefer', desc: 'Meeting context preparation' },
            { id: '03', name: 'Blocker', desc: 'Evening constraint analysis' },
            { id: '04', name: 'System', desc: 'Overall coherence maintenance' }
          ].map((agent, i) => (
            <CrazyElement key={agent.id} crazy={crazyMode} className="h-full">
              <div className="border border-white/20 h-full p-6 flex flex-col justify-between hover:bg-white hover:text-black transition-colors duration-300 group cursor-pointer">
                <div className="w-full aspect-square bg-white/10 group-hover:bg-black/10 mb-8" />
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm opacity-60 group-hover:opacity-100">■ {agent.name}</span>
                    <span className="text-xs opacity-40 group-hover:opacity-100">{agent.id}</span>
                  </div>
                </div>
              </div>
            </CrazyElement>
          ))}
        </div>
      </Section>

      {/* Instructional Section */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-black">
          <div className="border-r border-black p-12 min-h-[50vh] flex flex-col justify-between">
            <div className="text-xs">(Step 1)</div>
            <CrazyElement crazy={crazyMode}>
              <h3 className="text-6xl md:text-8xl tracking-tighter">Set<br/>Context</h3>
            </CrazyElement>
            <div className="text-sm max-w-xs ml-auto">
              From left and right side of the screen. Define the boundaries of operation.
            </div>
          </div>
          <div className="p-12 min-h-[50vh] flex flex-col justify-between">
            <div className="text-xs">(Step 2)</div>
            <CrazyElement crazy={crazyMode}>
              <h3 className="text-6xl md:text-8xl tracking-tighter">Set<br/>Rules</h3>
            </CrazyElement>
            <div className="text-sm max-w-xs">
              Space between the columns. The rigid structure that prevents chaos.
            </div>
          </div>
        </div>
      </Section>

      {/* Big Don't Be Afraid Section */}
      <Section className="bg-black text-white !border-none !py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
           <div className="p-12 flex flex-col justify-center border-r border-white/20">
             <CrazyElement crazy={crazyMode}>
               <div className="text-[10vw] leading-[0.85] font-medium tracking-tighter">
                 DON'T<br/>BE<br/>AFRAID
               </div>
             </CrazyElement>
           </div>
           <div className="p-12 flex flex-col justify-center items-center relative overflow-hidden">
              <motion.div 
                style={{ rotate }}
                className="w-[40vw] h-[40vw] border-[2px] border-white flex items-center justify-center"
              >
                <div className="w-[20vw] h-[20vw] bg-white" />
              </motion.div>
              <div className="absolute bottom-12 left-12 text-xs max-w-[200px]">
                (3) This system can be adapted to different needs easily.
              </div>
           </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-[#F2F2F2] py-12 px-4 md:px-12 border-t border-black flex justify-between items-end">
        <div>
          <div className="text-[10vw] leading-none tracking-tighter">AI MINDSET</div>
          <div className="flex gap-8 mt-8 text-sm">
            <a href="#" className="hover:underline">Instagram</a>
            <a href="#" className="hover:underline">Twitter</a>
            <a href="#" className="hover:underline">Email</a>
          </div>
        </div>
        <div className="text-xs text-right">
          © 2026 AI Mindset<br/>
          System Guidelines
        </div>
      </footer>
    </div>
  );
}
