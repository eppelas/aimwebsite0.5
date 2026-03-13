import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const YellowStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
    
    .font-yellow { font-family: 'Inter', sans-serif; }
    
    .yellow-grid-line {
      position: absolute;
      background-color: black;
    }

    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    
    .stroke-text {
      -webkit-text-stroke: 1px black;
      color: transparent;
    }
  `}</style>
);

const GridOverlay = ({ active }: { active: boolean }) => {
  if (!active) return null;
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-10">
      <div className="w-full h-full relative">
        {/* Horizontal */}
        <div className="absolute top-24 left-0 right-0 h-px bg-black" />
        <div className="absolute bottom-24 left-0 right-0 h-px bg-black" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-black" />
        
        {/* Vertical */}
        <div className="absolute top-0 bottom-0 left-12 w-px bg-black" />
        <div className="absolute top-0 bottom-0 right-12 w-px bg-black" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-black" />
      </div>
    </div>
  );
};

const TogglePill = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <div className="flex items-center gap-2 font-yellow text-xs font-medium">
    <span>{label}:</span>
    <button 
      onClick={onClick}
      className="flex border border-black rounded-full p-[2px] gap-1 cursor-pointer hover:bg-black/10 transition-colors"
    >
      <div className={`px-2 py-0.5 rounded-full transition-colors border border-black ${active ? 'bg-transparent' : 'bg-black text-[#EAFF00]'}`}>Off</div>
      <div className={`px-2 py-0.5 rounded-full transition-colors border border-black ${active ? 'bg-black text-[#EAFF00]' : 'bg-transparent'}`}>On</div>
    </button>
  </div>
);

const CrazyElement = ({ children, crazy, className = "" }: { children: React.ReactNode, crazy: boolean, className?: string }) => {
  const [randomProps, setRandomProps] = useState({ rotate: 0, x: 0, y: 0, scale: 1 });

  useEffect(() => {
    if (crazy) {
      setRandomProps({
        rotate: Math.random() * 10 - 5,
        x: Math.random() * 20 - 10,
        y: Math.random() * 20 - 10,
        scale: 1 + Math.random() * 0.1,
      });
    } else {
      setRandomProps({ rotate: 0, x: 0, y: 0, scale: 1 });
    }
  }, [crazy]);

  return (
    <motion.div 
      className={className}
      animate={crazy ? randomProps : { rotate: 0, x: 0, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      {children}
    </motion.div>
  );
};

const SquiggleLine = ({ crazy }: { crazy: boolean }) => (
  <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-50" viewBox="0 0 1000 400" preserveAspectRatio="none">
    <motion.path
      d="M0,200 C200,100 300,300 500,200 C700,100 800,300 1000,200"
      fill="none"
      stroke="black"
      strokeWidth="2"
      animate={crazy ? { d: "M0,200 C200,50 300,350 500,200 C700,50 800,350 1000,200" } : { d: "M0,200 C200,100 300,300 500,200 C700,100 800,300 1000,200" }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
    />
  </svg>
);

const LoopShape = ({ className, crazy }: { className?: string, crazy: boolean }) => (
  <motion.svg 
    viewBox="0 0 200 200" 
    className={className}
    animate={crazy ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    <path
      d="M40,100 C40,40 160,40 160,100 C160,160 40,160 40,100 Z M60,100 C60,140 140,140 140,100 C140,60 60,60 60,100 Z"
      fill="none"
      stroke="black"
      strokeWidth="2"
    />
  </motion.svg>
);

export default function AiMindsetYellowPage() {
  const [gridActive, setGridActive] = useState(true);
  const [crazyMode, setCrazyMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const xMove = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-[#EAFF00] text-black font-yellow selection:bg-black selection:text-[#EAFF00] hide-scrollbar relative">
      <YellowStyles />
      <GridOverlay active={gridActive} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 flex justify-between items-center border-b border-black bg-[#EAFF00]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-black" />
          <span className="text-sm font-medium tracking-tight">GRIDS</span>
        </div>
        
        <div className="hidden md:block text-xs font-medium">
          Intro / Grids / Books
        </div>

        <div className="flex gap-6">
          <TogglePill label="Grid" active={gridActive} onClick={() => setGridActive(!gridActive)} />
          <TogglePill label="Crazy Mode" active={crazyMode} onClick={() => setCrazyMode(!crazyMode)} />
          <span className="text-xs font-medium hidden md:block">Obys Agency ©2021</span>
        </div>
      </header>

      <main className="pt-20">
        
        {/* Section 1: Intro */}
        <section className="min-h-[90vh] flex flex-col justify-between p-4 md:p-8 relative border-b border-black">
          <CrazyElement crazy={crazyMode}>
            <h1 className="text-[14vw] leading-[0.8] font-medium tracking-tighter uppercase break-words">
              SYSTEM &<br/>CREDITS
            </h1>
          </CrazyElement>

          <div className="flex justify-end items-end relative">
             <div className="absolute top-0 right-0 text-sm font-medium">Scroll down ↴</div>
             
             {/* Tilted Card Image */}
             <CrazyElement crazy={crazyMode} className="w-64 md:w-96 aspect-[3/4] bg-black border-4 border-black rotate-6 translate-y-12 md:translate-y-24 z-10 overflow-hidden">
                <div className="w-full h-full bg-white opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
                  <div className="text-4xl font-bold">AI<br/>MIND<br/>SET</div>
                </div>
             </CrazyElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-black pt-4 mt-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-black" />
                <span className="font-bold text-sm">GRIDS</span>
              </div>
              <div className="text-sm">Obys Agency — 2021</div>
            </div>
            <div className="space-y-2 text-sm font-medium">
              <div className="flex justify-between border-b border-black pb-1">
                <span>Website by</span>
                <span>Obys Agency</span>
              </div>
              <div className="flex justify-between border-b border-black pb-1">
                <span>Say Hi!</span>
                <span>info@obys.agency</span>
              </div>
              <div className="flex justify-between border-b border-black pb-1">
                <span>Prev. project №1</span>
                <span>Typography Principles</span>
              </div>
              <div className="flex justify-between border-b border-black pb-1">
                <span>Prev. project №2</span>
                <span>Colors Combinations</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Agents (Van De Graaf Style) */}
        <section className="min-h-screen relative border-b border-black overflow-hidden">
          <SquiggleLine crazy={crazyMode} />
          
          <div className="p-4 md:p-8 pt-24">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 relative z-10">
               <CrazyElement crazy={crazyMode}>
                 <h2 className="text-[15vw] leading-none font-medium tracking-tighter uppercase relative z-10">
                   AGENTS
                 </h2>
               </CrazyElement>
               <div className="flex items-center gap-4">
                 <div className="h-px w-24 bg-black" />
                 <span className="text-[15vw] leading-none font-medium tracking-tighter">02</span>
               </div>
            </div>

            {/* Abstract Loops Overlay */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 pointer-events-none opacity-60">
               <LoopShape crazy={crazyMode} className="w-full h-full" />
            </div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 pointer-events-none opacity-60">
               <LoopShape crazy={crazyMode} className="w-full h-full rotate-90" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-12 relative z-10">
               <div className="md:col-span-4">
                  <span className="text-sm font-bold mb-4 block">(About grid)</span>
                  <p className="text-2xl font-medium leading-tight">
                    Autonomous agents based system. This grid is based on the proportions of the carrier it is applied to. It is good for unusual designs.
                  </p>
               </div>
               <div className="md:col-span-8">
                  {/* Metadata Table */}
                  <div className="border-t border-black py-3 flex justify-between text-sm font-medium">
                    <span>Grid</span>
                    <span>Golden Canon</span>
                  </div>
                  <div className="border-t border-black py-3 flex justify-between text-sm font-medium">
                    <span>Margins</span>
                    <span>80 px</span>
                  </div>
                  <div className="border-t border-black py-3 flex justify-between text-sm font-medium">
                    <span>Power Lines</span>
                    <span>8</span>
                  </div>
                  <div className="border-t border-black py-3 flex justify-between text-sm font-medium">
                    <span>Paddings System</span>
                    <span>Used</span>
                  </div>
               </div>
            </div>

            <div className="mt-24 border-t border-black pt-4 flex justify-between items-center">
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-black" />
                 <span className="font-medium">TenTwelve</span>
               </div>
               <span className="font-medium">(01)</span>
            </div>
          </div>
        </section>

        {/* Section 3: Steps (Diagonals Style) */}
        <section className="min-h-screen relative p-4 md:p-8 flex flex-col justify-between">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-24">
              <div className="space-y-12">
                 <div className="border-b border-black pb-8">
                    <div className="flex justify-between items-baseline mb-4">
                       <span className="text-sm font-bold">(Step 1)</span>
                       <span className="text-sm">Start from the main diagonals</span>
                    </div>
                    <CrazyElement crazy={crazyMode}>
                      <h3 className="text-6xl md:text-8xl font-medium tracking-tighter">Set Context</h3>
                    </CrazyElement>
                 </div>
                 
                 <div className="border-b border-black pb-8">
                    <div className="flex justify-between items-baseline mb-4">
                       <span className="text-sm font-bold">(Step 2)</span>
                       <span className="text-sm">Draw lines at the intersection</span>
                    </div>
                    <CrazyElement crazy={crazyMode}>
                      <h3 className="text-6xl md:text-8xl font-medium tracking-tighter">Set Rules</h3>
                    </CrazyElement>
                 </div>
              </div>

              <div className="relative flex items-center justify-center">
                 {/* Squiggly Numbers */}
                 <CrazyElement crazy={crazyMode}>
                   <div className="text-[10rem] font-outline-2 font-bold tracking-tighter text-transparent stroke-black" style={{ WebkitTextStroke: '2px black' }}>
                     10:12
                   </div>
                 </CrazyElement>
              </div>
           </div>

           {/* Bottom Pills */}
           <div className="mt-24 relative">
              <div className="text-sm font-bold mb-4">(Notes)</div>
              
              <div className="relative h-32 md:h-48 w-full">
                 <CrazyElement crazy={crazyMode} className="absolute inset-0 z-10">
                    <div className="w-full h-20 md:h-24 border-2 border-black rounded-full flex items-center justify-center bg-[#EAFF00] -rotate-1">
                       <span className="text-4xl md:text-6xl font-medium tracking-tighter">Don't be afraid</span>
                    </div>
                 </CrazyElement>
                 
                 <CrazyElement crazy={crazyMode} className="absolute top-16 md:top-20 inset-x-0 z-0">
                    <div className="w-full h-20 md:h-24 border-2 border-black rounded-full flex items-center justify-center bg-[#EAFF00] rotate-1">
                       <span className="text-4xl md:text-6xl font-medium tracking-tighter">This system adapts</span>
                    </div>
                 </CrazyElement>
              </div>
           </div>
        </section>

      </main>
    </div>
  );
}
