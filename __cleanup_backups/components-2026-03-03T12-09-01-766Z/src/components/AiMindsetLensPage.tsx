import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const LensStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
    
    .font-lens { font-family: 'Inter', sans-serif; }
    .font-mono-lens { font-family: 'JetBrains Mono', monospace; }
    
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

const CameraOverlay = ({ theme }: { theme: 'light' | 'dark' }) => (
  <div className={`fixed inset-0 z-50 pointer-events-none ${theme === 'light' ? 'text-[#A36452]' : 'text-white'} transition-colors duration-500`}>
    {/* Top Bar */}
    <div className="absolute top-8 left-8 flex flex-col leading-none">
      <span className="font-lens font-medium text-xs tracking-wide">COLORS</span>
      <span className="font-lens font-medium text-xs tracking-wide opacity-70">COMBINATIONS</span>
    </div>

    <div className="absolute top-8 right-8 flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={`w-3 h-4 ${i === 6 ? 'bg-current' : 'bg-current opacity-30'}`} />
        ))}
      </div>
      <span className="font-mono-lens text-xs">0 GALLERY 6</span>
    </div>

    {/* Bottom Bar */}
    <div className="absolute bottom-8 left-8 flex items-center gap-2">
      <div className="border border-current px-1 py-0.5 text-[10px] font-bold">ISO</div>
      <span className="font-mono-lens text-xs">200</span>
    </div>

    <div className="absolute bottom-8 right-8 flex items-center gap-2">
      <div className="w-6 h-3 border border-current relative flex items-center justify-start px-0.5">
        <div className="h-1.5 w-full bg-current animate-pulse" />
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-current" />
      </div>
      <span className="font-mono-lens text-xs">[ 100 ]</span>
    </div>
  </div>
);

const Hexagon = ({ color, code, className }: { color: string, code: string, className?: string }) => (
  <div className={`relative w-32 h-32 flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full rotate-90">
      <path d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
    </svg>
    <span className="font-mono-lens text-xs tracking-widest">{code}</span>
  </div>
);

const LensRings = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
    {[1, 2, 3, 4, 5].map((i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border border-current"
        style={{
          width: `${i * 15}vw`,
          height: `${i * 15}vw`,
        }}
        animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
        transition={{ duration: 60 + i * 10, repeat: Infinity, ease: "linear" }}
      />
    ))}
    <div className="absolute text-[10px] font-mono-lens tracking-[0.2em] uppercase" style={{ transform: 'translateY(-26vw) rotate(-15deg)' }}>
      Super EBC XF 50mm 1:2 R WR Ø46
    </div>
  </div>
);

export default function AiMindsetLensPage() {
  const [crazyMode, setCrazyMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const bg = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], ["#FDF0F4", "#FDF0F4", "#0A2540", "#0A2540"]);
  const textColor = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], ["#D5A7B4", "#D5A7B4", "#FFFFFF", "#FFFFFF"]);
  const theme = useTransform(scrollYProgress, (v) => v > 0.5 ? 'dark' : 'light');
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  useTransform(scrollYProgress, (v) => v > 0.5 ? 'dark' : 'light').on('change', setCurrentTheme);

  return (
    <motion.div 
      ref={containerRef} 
      className="h-screen overflow-y-scroll font-lens hide-scrollbar relative selection:bg-[#D5A7B4] selection:text-white"
      style={{ backgroundColor: bg, color: textColor }}
    >
      <LensStyles />
      <CameraOverlay theme={currentTheme} />

      {/* Crazy Mode Toggle */}
      <div className="fixed top-1/2 right-8 z-50 -translate-y-1/2 flex flex-col items-center gap-2 mix-blend-difference text-white">
         <div 
            className={`w-12 h-6 rounded-full border border-current p-1 cursor-pointer transition-colors ${crazyMode ? 'bg-current' : 'bg-transparent'}`}
            onClick={() => setCrazyMode(!crazyMode)}
         >
            <motion.div 
               className={`w-4 h-4 rounded-full ${crazyMode ? 'bg-black' : 'bg-current'}`}
               layout
               transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
         </div>
      </div>

      <main>
        {/* Section 1: Objective (Pink Theme) */}
        <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 relative overflow-hidden">
           <LensRings />
           
           <div className="absolute top-32 left-8 md:left-16 font-mono-lens text-xs space-y-4 z-10">
              <div>
                 <div className="opacity-50 mb-1">TONE</div>
                 <div>PALE RED</div>
              </div>
              <div>
                 <div className="opacity-50 mb-1">HEX</div>
                 <div>#D5A7B4</div>
              </div>
              <div>
                 <div className="opacity-50 mb-1">RGB</div>
                 <div>213 167 180</div>
              </div>
           </div>

           <div className="absolute top-1/2 right-16 -translate-y-1/2 z-10 hidden md:block">
              <Hexagon color="#D5A7B4" code="#794856" />
           </div>

           <motion.div className="relative z-10 text-center">
              <h1 className="text-[12vw] leading-[0.85] font-normal tracking-tight uppercase mix-blend-multiply opacity-90">
                 OBJECTIVE<br/>
                 OF THE SPRINT
              </h1>
              <p className="mt-8 text-xl md:text-2xl max-w-2xl mx-auto font-light">
                 PINK SYMBOLIZES YOUTH, FRIENDLINESS AND KINDNESS. WE SYMBOLIZE PROGRESS.
              </p>
           </motion.div>
        </section>

        {/* Section 2: System (Blue Theme) */}
        <section className="min-h-screen flex items-center relative overflow-hidden">
           {/* Large Circle Graphic */}
           <motion.div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[80vh] h-[80vh] bg-white rounded-full mix-blend-overlay opacity-10"
              animate={crazyMode ? { scale: [1, 1.2, 0.8, 1], borderRadius: ["50%", "40%", "60%", "50%"] } : {}}
              transition={{ duration: 4, repeat: Infinity }}
           />
           
           <div className="w-full px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                 <div className="flex justify-between text-xs font-mono-lens mb-2 border-b border-current pb-2 opacity-50">
                    <span>02</span>
                    <span>SYSTEM ARCHITECTURE</span>
                 </div>
                 <h2 className="text-[10vw] leading-none font-normal tracking-tighter uppercase mb-8">
                    SYSTEM
                 </h2>
                 <p className="text-lg md:text-xl opacity-80 max-w-md leading-relaxed">
                    TORY BLUE MATCHES WELL WITH CHROME WHITE. A layer of rules, context, and restrictions that makes tools work for you.
                 </p>
                 
                 <div className="mt-12 grid grid-cols-2 gap-8 font-mono-lens text-xs">
                    <div>
                       <div className="opacity-50 mb-1">HEX</div>
                       <div className="text-xl">#105099</div>
                    </div>
                    <div>
                       <div className="opacity-50 mb-1">RGB</div>
                       <div className="text-xl">16 80 153</div>
                    </div>
                 </div>
              </div>
              
              <div className="relative h-[50vh] w-full overflow-hidden">
                 <img 
                    src="https://picsum.photos/seed/bluecliff/800/1200" 
                    alt="Blue Cliff" 
                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 mix-blend-overlay opacity-60"
                 />
                 <div className="absolute inset-0 bg-[#105099] mix-blend-color" />
              </div>
           </div>
        </section>

        {/* Section 3: Context (Gradient/Transition) */}
        <section className="min-h-screen relative flex flex-col justify-center px-8 md:px-16 overflow-hidden bg-white text-[#105099]">
           <div className="absolute inset-0 bg-gradient-to-b from-[#0A2540] to-white opacity-10" />
           
           <div className="relative z-10">
              <h2 className="text-[20vw] leading-none font-normal tracking-tighter uppercase overflow-hidden whitespace-nowrap">
                 <motion.span 
                    initial={{ x: 0 }} 
                    animate={{ x: "-50%" }} 
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                 >
                    CONTEXT CONTEXT CONTEXT CONTEXT
                 </motion.span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 border-t border-[#105099]/20 pt-8">
                 <div className="font-mono-lens text-xs">
                    <div className="opacity-50 mb-4">[ 3 ]</div>
                    <p>AI MINDSET LAB</p>
                    <p>BATCH W26</p>
                 </div>
                 <div className="md:col-span-2">
                    <p className="text-2xl md:text-4xl font-light leading-tight">
                       "We are not just building tools; we are building a mindset. A way of thinking that integrates AI into the creative process seamlessly."
                    </p>
                 </div>
              </div>
           </div>
           
           {/* Decorative Circles */}
           <div className="absolute bottom-0 left-0 w-full flex justify-between items-end px-8 pb-8 opacity-20">
              <div className="w-32 h-32 rounded-full border border-[#105099]" />
              <div className="w-48 h-48 rounded-full bg-[#105099]" />
           </div>
        </section>

      </main>
    </motion.div>
  );
}
