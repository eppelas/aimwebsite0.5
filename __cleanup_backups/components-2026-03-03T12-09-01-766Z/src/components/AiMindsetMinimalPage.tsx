import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const MinimalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
    
    .font-minimal { font-family: 'Inter', sans-serif; }
    
    .minimal-grid-line-x {
      position: absolute;
      left: 0;
      right: 0;
      height: 1px;
      background-color: rgba(0,0,0,0.1);
    }
    
    .minimal-grid-line-y {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 1px;
      background-color: rgba(0,0,0,0.1);
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
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="w-full h-full relative max-w-[1920px] mx-auto">
        {/* Vertical Lines */}
        <div className="minimal-grid-line-y left-0" />
        <div className="minimal-grid-line-y left-[25%]" />
        <div className="minimal-grid-line-y left-[50%]" />
        <div className="minimal-grid-line-y left-[75%]" />
        <div className="minimal-grid-line-y right-0" />
        
        {/* Horizontal Lines */}
        <div className="minimal-grid-line-x top-0" />
        <div className="minimal-grid-line-x top-[25%]" />
        <div className="minimal-grid-line-x top-[50%]" />
        <div className="minimal-grid-line-x top-[75%]" />
        <div className="minimal-grid-line-x bottom-0" />
      </div>
    </div>
  );
};

const CrazyElement = ({ children, crazy, className = "" }: { children: React.ReactNode, crazy: boolean, className?: string }) => {
  const [randomProps, setRandomProps] = useState({ rotate: 0, x: 0, y: 0 });

  useEffect(() => {
    if (crazy) {
      setRandomProps({
        rotate: Math.random() * 5 - 2.5,
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 - 5,
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

const TogglePill = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2 text-xs uppercase tracking-wide hover:opacity-70 transition-opacity"
  >
    <div className={`w-3 h-3 border border-black rounded-full ${active ? 'bg-black' : 'bg-transparent'}`} />
    <span>{label}</span>
  </button>
);

export default function AiMindsetMinimalPage() {
  const [gridActive, setGridActive] = useState(true);
  const [crazyMode, setCrazyMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const yMove = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-[#F2F2F2] text-black font-minimal selection:bg-black selection:text-white hide-scrollbar relative">
      <MinimalStyles />
      <GridOverlay active={gridActive} />

      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 w-full md:w-1/4 h-auto md:h-screen p-6 md:p-12 z-50 flex flex-row md:flex-col justify-between border-b md:border-b-0 md:border-r border-black/10 bg-[#F2F2F2]/90 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 border border-black rounded-sm flex items-center justify-center bg-white">
              <img
                src="/assets/ai-mindset-logo.png"
                alt="AI Mindset logo"
                className="h-3 w-auto object-contain"
              />
            </div>
            <span className="text-sm font-semibold tracking-tight">AI MINDSET</span>
          </div>
          <div className="hidden md:block text-xs text-black/60 mt-4 max-w-[150px]">
            Intro / System / Agents
          </div>
        </div>

        <div className="flex md:flex-col gap-6 md:gap-4">
          <TogglePill label="Grid" active={gridActive} onClick={() => setGridActive(!gridActive)} />
          <TogglePill label="Crazy" active={crazyMode} onClick={() => setCrazyMode(!crazyMode)} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="md:ml-[25%] w-full md:w-[75%] relative z-10">
        
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col justify-center p-6 md:p-24 border-b border-black/10 pt-32 md:pt-24">
          <CrazyElement crazy={crazyMode}>
            <h1 className="text-[12vw] md:text-[8vw] leading-[0.8] font-medium tracking-tighter mb-12">
              SYSTEM<br/>PRINCIPLES
            </h1>
          </CrazyElement>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-sm leading-relaxed max-w-xs">
              This interface is a part of the AI Mindset educational projects.
              This time we show our principles of the system using.
            </div>
            <div className="flex items-end justify-start md:justify-end">
               <div className="w-12 h-12 bg-black rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* Marquee Strip */}
        <div className="py-12 border-b border-black/10 overflow-hidden bg-white">
          <motion.div style={{ x: yMove }} className="whitespace-nowrap flex gap-8 items-center px-6">
            <span className="text-4xl md:text-6xl font-medium tracking-tighter">CONTEXT</span>
            <span className="text-4xl md:text-6xl font-medium tracking-tighter text-black/20">///</span>
            <span className="text-4xl md:text-6xl font-medium tracking-tighter">CONSTRAINTS</span>
            <span className="text-4xl md:text-6xl font-medium tracking-tighter text-black/20">///</span>
            <span className="text-4xl md:text-6xl font-medium tracking-tighter">AGENTS</span>
          </motion.div>
        </div>

        {/* Agents Grid */}
        <section className="min-h-screen p-6 md:p-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {[
              { id: '01', name: 'Planner', desc: 'Morning routine optimization' },
              { id: '02', name: 'Briefer', desc: 'Meeting context preparation' },
              { id: '03', name: 'Blocker', desc: 'Evening constraint analysis' },
              { id: '04', name: 'System', desc: 'Overall coherence maintenance' }
            ].map((agent, i) => (
              <CrazyElement key={agent.id} crazy={crazyMode} className="h-full">
                <div className={`
                  aspect-square border-b border-black/10 p-8 flex flex-col justify-between hover:bg-black hover:text-white transition-colors duration-500 group
                  ${i % 2 === 0 ? 'md:border-r' : ''}
                `}>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono">({agent.id})</span>
                    <div className="w-4 h-4 rounded-full border border-current opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-2">{agent.name}</h3>
                    <p className="text-xs opacity-60 max-w-[150px]">{agent.desc}</p>
                  </div>
                </div>
              </CrazyElement>
            ))}
          </div>
        </section>

        {/* Steps Section */}
        <section className="min-h-[50vh] bg-black text-[#F2F2F2] p-6 md:p-24 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
             <div>
               <div className="text-xs mb-4 text-white/50">(Step 1)</div>
               <CrazyElement crazy={crazyMode}>
                 <h2 className="text-5xl md:text-7xl tracking-tighter mb-6">Set Context</h2>
               </CrazyElement>
               <p className="text-sm text-white/70 max-w-xs">
                 From left and right side of the screen. Define the boundaries of operation.
               </p>
             </div>
             <div className="w-full h-[1px] bg-white/20 md:hidden" />
             <div>
               <div className="text-xs mb-4 text-white/50">(Step 2)</div>
               <CrazyElement crazy={crazyMode}>
                 <h2 className="text-5xl md:text-7xl tracking-tighter mb-6">Set Rules</h2>
               </CrazyElement>
               <p className="text-sm text-white/70 max-w-xs">
                 Space between the columns. The rigid structure that prevents chaos.
               </p>
             </div>
          </div>
        </section>

        {/* Final Statement */}
        <section className="h-[80vh] flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
           <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <div className="text-[40vw] font-bold leading-none">AI</div>
           </div>
           <CrazyElement crazy={crazyMode}>
             <div className="text-center">
               <h2 className="text-[10vw] md:text-[6vw] leading-[0.9] font-medium tracking-tighter mb-8">
                 DON'T<br/>BE AFRAID
               </h2>
               <p className="text-xs md:text-sm max-w-md mx-auto opacity-60">
                 (3) This system can be adapted to different needs easily.
               </p>
             </div>
           </CrazyElement>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-black/10 p-6 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <div className="text-2xl font-medium tracking-tight mb-4">AI MINDSET</div>
            <div className="flex gap-6 text-xs uppercase tracking-wide">
              <a href="#" className="hover:line-through">Instagram</a>
              <a href="#" className="hover:line-through">Twitter</a>
              <a href="#" className="hover:line-through">Email</a>
            </div>
          </div>
          <div className="text-xs text-black/40 text-right">
            © 2026 AI Mindset<br/>
            System Guidelines
          </div>
        </footer>

      </div>
    </div>
  );
}
