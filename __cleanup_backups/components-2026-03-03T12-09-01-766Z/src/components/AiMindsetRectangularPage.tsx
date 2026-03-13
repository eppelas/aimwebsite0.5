import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const RectangularStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
    
    .font-rect { font-family: 'Inter', sans-serif; }
    
    .rect-grid-line-x {
      position: absolute;
      left: 0;
      right: 0;
      height: 1px;
      background-color: rgba(0,0,0,0.1);
    }
    
    .rect-grid-line-y {
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
      <div className="w-full h-full relative flex flex-col">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`h-${i}`} className="rect-grid-line-x" style={{ top: `${i * 5}%` }} />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`v-${i}`} className="rect-grid-line-y" style={{ left: `${i * 5}%` }} />
        ))}
      </div>
    </div>
  );
};

const TogglePill = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <div className="flex items-center gap-2 font-rect text-xs uppercase tracking-wide">
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
  const [randomProps, setRandomProps] = useState({ rotate: 0, x: 0, y: 0, scale: 1 });

  useEffect(() => {
    if (crazy) {
      setRandomProps({
        rotate: Math.random() * 4 - 2,
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 - 5,
        scale: 1 + Math.random() * 0.05,
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

const WarpedGrid = ({ crazy }: { crazy: boolean }) => {
  return (
    <div className="w-full h-full border border-black/20 overflow-hidden relative">
       {/* Warped lines */}
       {Array.from({ length: 10 }).map((_, i) => (
         <motion.div
            key={i}
            className="absolute left-0 right-0 border-b border-black/20"
            style={{ top: `${i * 10}%` }}
            animate={crazy ? { 
              rotate: i % 2 === 0 ? 2 : -2,
              y: i % 2 === 0 ? 10 : -10
            } : { rotate: 0, y: 0 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
         />
       ))}
       {Array.from({ length: 10 }).map((_, i) => (
         <motion.div
            key={i}
            className="absolute top-0 bottom-0 border-r border-black/20"
            style={{ left: `${i * 10}%` }}
            animate={crazy ? { 
              rotate: i % 2 === 0 ? -2 : 2,
              x: i % 2 === 0 ? 10 : -10
            } : { rotate: 0, x: 0 }}
            transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
         />
       ))}
    </div>
  );
};

export default function AiMindsetRectangularPage() {
  const [gridActive, setGridActive] = useState(true);
  const [crazyMode, setCrazyMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-[#F2F2F2] text-black font-rect selection:bg-black selection:text-white hide-scrollbar relative">
      <RectangularStyles />
      <GridOverlay active={gridActive} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 flex justify-between items-center bg-[#F2F2F2] border-b border-black">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-black" />
          <span className="text-sm font-medium tracking-tight">GRIDS</span>
        </div>
        
        <div className="hidden md:block text-xs text-black/60">
          Intro / Grids / Books
        </div>

        <div className="flex gap-6">
          <TogglePill label="Grid" active={gridActive} onClick={() => setGridActive(!gridActive)} />
          <TogglePill label="Crazy Mode" active={crazyMode} onClick={() => setCrazyMode(!crazyMode)} />
          <span className="text-xs text-black/60 hidden md:block">Obys Agency ©2021</span>
        </div>
      </header>

      <main className="pt-16">
        
        {/* Section 01: AGENTS (Rectangular Style) */}
        <section className="min-h-screen flex flex-col justify-between relative border-b border-black">
          <div className="flex-grow p-4 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Col: Metadata */}
            <div className="md:col-span-4 flex flex-col gap-4 pt-12">
               <div className="text-xs uppercase tracking-wide mb-8">(About grid)</div>
               
               <div className="border-t border-black pt-2 flex justify-between text-sm">
                 <span>Grid</span>
                 <span>Rectangular</span>
               </div>
               <div className="border-t border-black pt-2 flex justify-between text-sm">
                 <span>Vertical Lines</span>
                 <span>25</span>
               </div>
               <div className="border-t border-black pt-2 flex justify-between text-sm">
                 <span>Horizontal Lines</span>
                 <span>25</span>
               </div>
               <div className="border-t border-black pt-2 flex justify-between text-sm">
                 <span>Paddings System</span>
                 <span>Used</span>
               </div>

               <div className="mt-12">
                 <div className="flex items-center gap-2 mb-1">
                   <div className="w-2 h-2 bg-black rounded-full" />
                   <span className="font-medium">AI Mindset</span>
                 </div>
                 <div className="text-xs text-black/60">System — 2026</div>
               </div>
            </div>

            {/* Right Col: Content */}
            <div className="md:col-span-8 pt-12">
              <CrazyElement crazy={crazyMode}>
                <h2 className="text-3xl md:text-5xl leading-tight font-normal mb-12 max-w-2xl">
                  Modular or Rectangular grid. This type of the grid is very structured and offers a very wide variety of using. In use, it resembles the Columns grid.
                </h2>
              </CrazyElement>

              {/* Visual Block */}
              <CrazyElement crazy={crazyMode} className="w-full aspect-video bg-[#FFC700] p-8 md:p-12 relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-full h-[1px] bg-black" />
                 <div className="absolute top-12 left-0 w-full h-[1px] bg-black" />
                 
                 <div className="grid grid-cols-2 gap-8 h-full">
                    <div className="flex flex-col justify-center">
                      <h3 className="text-4xl md:text-6xl font-medium leading-none tracking-tighter mb-4">
                        Erik Spiekermann<br/>
                        Neville Brody<br/>
                        Marta Bernstein
                      </h3>
                      <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center text-white text-[10px] uppercase">
                        Buy Tickets
                      </div>
                    </div>
                    <div className="relative">
                       <div className="absolute top-0 right-0 bg-black text-white text-[10px] px-2 py-1">
                         BUY TICKETS
                       </div>
                       <div className="w-full h-32 bg-[#E54D42] mt-24" />
                    </div>
                 </div>
              </CrazyElement>
            </div>
          </div>

          {/* Bottom Title */}
          <div className="px-4 md:px-8 pb-4 flex justify-between items-end">
            <h1 className="text-[15vw] leading-[0.8] tracking-tighter font-medium">RECTANGULAR</h1>
            <span className="text-[15vw] leading-[0.8] tracking-tighter font-medium">03</span>
          </div>
        </section>


        {/* Section 02: OTHERS (Warped Grid Style) */}
        <section className="min-h-screen flex flex-col justify-between relative border-b border-black bg-[#F2F2F2]">
           {/* Top Grid Visual */}
           <div className="h-[50vh] border-b border-black relative overflow-hidden">
             <WarpedGrid crazy={crazyMode} />
             <div className="absolute top-8 left-4 md:left-8 max-w-4xl">
               <CrazyElement crazy={crazyMode}>
                 <h2 className="text-4xl md:text-6xl leading-tight font-normal">
                   variability and it is a <span className="underline decoration-2 underline-offset-4">pretty detailed</span> one. (2)When using a large number of modules, highlight the main <span className="underline decoration-2 underline-offset-4">power lines</span>.
                 </h2>
               </CrazyElement>
             </div>
           </div>

           {/* Bottom Content */}
           <div className="flex-grow flex flex-col justify-end">
              <div className="px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
                 <div className="md:col-span-4"></div>
                 <div className="md:col-span-8">
                    <div className="text-xs uppercase tracking-wide mb-4">(About grid)</div>
                    <p className="text-2xl md:text-3xl leading-tight font-normal max-w-2xl">
                      We have combined all other types of grids into this category. Grids can be asymmetric, round, diagonal... The main thing is that the grid should help to structure information.
                    </p>
                 </div>
              </div>

              {/* Bottom Title */}
              <div className="px-4 md:px-8 pb-4 flex justify-between items-end border-t border-black pt-4">
                <h1 className="text-[15vw] leading-[0.8] tracking-tighter font-medium">OTHERS</h1>
                <span className="text-[15vw] leading-[0.8] tracking-tighter font-medium">04</span>
              </div>
           </div>
        </section>

        {/* Section 03: AGENTS (Green Style) */}
        <section className="min-h-screen bg-[#1a1a1a] text-[#F2F2F2] p-4 md:p-8 flex items-center justify-center">
           <CrazyElement crazy={crazyMode} className="w-full max-w-6xl aspect-video bg-[#CCFF00] text-black p-8 md:p-12 relative overflow-hidden">
              {/* Header inside card */}
              <div className="flex justify-between items-start mb-12 border-b border-black/20 pb-4">
                 <div className="flex gap-2">
                    <div className="w-4 h-8 bg-black" />
                    <div className="w-4 h-8 bg-black/50" />
                    <span className="text-[10px] uppercase ml-2 self-center">Industrial Designer</span>
                 </div>
                 <div className="text-[10px] uppercase text-right leading-tight">
                    M—M<br/>
                    Works<br/>
                    About<br/>
                    Contact
                 </div>
              </div>

              {/* Main Text */}
              <h2 className="text-[8vw] leading-[0.9] font-bold tracking-tighter mb-8">
                MEHMET ©<br/>
                MEHMETALIOGLU
              </h2>

              {/* Grid Overlay inside card */}
              <div className="absolute inset-0 pointer-events-none">
                 <div className="w-full h-full border-t border-black/10 mt-[30%]" />
                 <div className="w-full h-full border-t border-black/10 mt-[10%]" />
              </div>

              {/* Floating Elements */}
              <div className="grid grid-cols-2 gap-4 mt-auto">
                 <div className="text-4xl md:text-6xl font-outline-1 font-bold tracking-tighter opacity-50">
                    POC /
                 </div>
                 <div className="text-4xl md:text-6xl font-outline-1 font-bold tracking-tighter opacity-50 text-right">
                    DTS 01 /
                 </div>
              </div>
           </CrazyElement>
        </section>

      </main>
    </div>
  );
}
