import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const RedStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    .font-red { font-family: 'Inter', sans-serif; }
    
    .stroke-red {
      -webkit-text-stroke: 1px #FF0000;
      color: transparent;
    }

    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    
    .red-selection::selection {
      background-color: #FF0000;
      color: black;
    }
  `}</style>
);

const CrazyElement = ({ children, crazy, className = "" }: { children: React.ReactNode, crazy: boolean, className?: string }) => {
  const [randomProps, setRandomProps] = useState({ x: 0, y: 0, skewX: 0 });

  useEffect(() => {
    if (crazy) {
      const interval = setInterval(() => {
        setRandomProps({
          x: Math.random() * 10 - 5,
          y: Math.random() * 10 - 5,
          skewX: Math.random() * 20 - 10,
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setRandomProps({ x: 0, y: 0, skewX: 0 });
    }
  }, [crazy]);

  return (
    <motion.div 
      className={className}
      animate={crazy ? randomProps : { x: 0, y: 0, skewX: 0 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const ScribbleLine = ({ crazy }: { crazy: boolean }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 mix-blend-screen" viewBox="0 0 1000 1000" preserveAspectRatio="none">
    <motion.path
      d="M100,100 L200,800 L300,200 L400,900 L500,100 L600,800 L700,200 L800,900 L900,100"
      fill="none"
      stroke="#FF0000"
      strokeWidth="1"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={crazy ? { 
        pathLength: 1, 
        opacity: 1,
        d: [
          "M100,100 L200,800 L300,200 L400,900 L500,100 L600,800 L700,200 L800,900 L900,100",
          "M150,150 L250,850 L350,250 L450,950 L550,150 L650,850 L750,250 L850,950 L950,150",
          "M50,50 L150,750 L250,150 L350,850 L450,50 L550,750 L650,150 L750,850 L850,50"
        ]
      } : { pathLength: 0, opacity: 0 }}
      transition={{ 
        pathLength: { duration: 1 },
        d: { duration: 0.2, repeat: Infinity, repeatType: "reverse" }
      }}
    />
  </svg>
);

export default function AiMindsetRedPage() {
  const [crazyMode, setCrazyMode] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const yMove = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-black text-[#FF0000] font-red red-selection hide-scrollbar relative">
      <RedStyles />
      
      {/* Background Image/Texture */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
         <img 
            src="https://picsum.photos/seed/darkness/1920/1080?grayscale&blur=2" 
            alt="Texture" 
            className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-black/50" />
      </div>

      <ScribbleLine crazy={crazyMode} />

      {/* Header Grid */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-8 grid grid-cols-2 md:grid-cols-5 gap-4 text-xs md:text-sm font-bold uppercase tracking-tight mix-blend-difference">
        <div className="md:col-span-1">AI MINDSET POS</div>
        <div className="md:col-span-1 hidden md:block">SPRINT X26</div>
        <div className="md:col-span-1 text-right md:text-center cursor-pointer hover:underline" onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? 'LESS INFO' : 'MORE INFO'}
        </div>
        <div className="md:col-span-1 hidden md:block text-center">MARCH 02 — 14</div>
        <div className="md:col-span-1 text-right">APPLICATIONS: OPEN</div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4">
        
        {/* Big Text Overlay */}
        <div className="relative w-full max-w-[90vw]">
          <CrazyElement crazy={crazyMode}>
            <h1 className="text-[12vw] md:text-[10vw] leading-[0.85] font-bold text-center tracking-tighter mix-blend-screen">
              PERSONAL<br/>
              <span className="stroke-red text-transparent hover:text-[#FF0000] transition-colors duration-300 cursor-pointer" onMouseEnter={() => setCrazyMode(true)} onMouseLeave={() => setCrazyMode(false)}>
                OPERATIONAL
              </span><br/>
              SYSTEM
            </h1>
          </CrazyElement>
          
          {/* Floating Elements */}
          <motion.div 
            style={{ y: yMove }}
            className="absolute top-0 right-0 md:right-20 w-32 h-32 md:w-48 md:h-48 border border-[#FF0000] rounded-full flex items-center justify-center mix-blend-screen pointer-events-none"
          >
             <div className="text-xs text-center">
               FROM CHAOS<br/>TO SYSTEM
             </div>
          </motion.div>
        </div>

        {/* Info Block (Toggleable) */}
        <motion.div 
          className="fixed bottom-0 left-0 right-0 p-4 md:p-8 bg-black/80 backdrop-blur-md border-t border-[#FF0000]/20 z-40"
          initial={{ y: "100%" }}
          animate={{ y: showInfo ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
           <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-[#FF0000]">
              <div className="md:col-span-3 text-xs font-bold uppercase tracking-widest mb-4 md:mb-0">
                 POS {`{sprint}`}
              </div>
              <div className="md:col-span-9 text-sm md:text-lg font-medium leading-tight uppercase text-justify">
                 POS is not a tool, it is an operating system with a personal AI assistant. A layer of rules, context and restrictions that makes tools work. Imagine: in the morning the agent gives a plan for the day, during the day it reminds about the meeting, in the evening it finds unclosed tasks. We collected patterns from founders and turned them into a sprint.
              </div>
           </div>
           
           <div className="mt-8 pt-4 border-t border-[#FF0000]/20 flex justify-between items-end">
              <div className="text-xs opacity-50">
                 BATCH: WINTER 26<br/>
                 STATUS: OPEN
              </div>
              <button 
                className="px-6 py-2 bg-[#FF0000] text-black text-sm font-bold uppercase hover:bg-white transition-colors"
                onClick={() => setCrazyMode(!crazyMode)}
              >
                {crazyMode ? 'CALM DOWN' : 'GO CRAZY'}
              </button>
           </div>
        </motion.div>

      </main>

      {/* Secondary Section (Scrollable) */}
      <section className="min-h-screen bg-[#FF0000] text-black p-4 md:p-8 relative z-10">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-24">
            <div>
               <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
                 YOUR<br/>GUIDES
               </h2>
               <div className="space-y-8 text-lg font-medium border-t border-black pt-8">
                  <div className="flex justify-between items-baseline border-b border-black/20 pb-4">
                     <span>Alexander Povalyaev</span>
                     <span className="text-sm opacity-60">Founder, Strategist</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-black/20 pb-4">
                     <span>Sergey Khabarov</span>
                     <span className="text-sm opacity-60">System Architect</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-black/20 pb-4">
                     <span>Seryozha Ris</span>
                     <span className="text-sm opacity-60">AI Evangelist</span>
                  </div>
               </div>
            </div>
            
            <div className="flex flex-col justify-between">
               <div className="aspect-square border-2 border-black rounded-full flex items-center justify-center relative overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-black scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                  <span className="relative z-10 text-4xl font-bold group-hover:text-[#FF0000] transition-colors">
                     APPLY NOW
                  </span>
               </div>
               <div className="text-justify text-sm font-medium uppercase leading-tight mt-12">
                  We live in these processes every day — building systems, agents, skills. Discounts: Alumni (-20%), Bring a Friend (-10%). Refund first 4 days — no questions asked.
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}
