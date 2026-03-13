import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const CameraStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
    
    .font-camera { font-family: 'Inter', sans-serif; }
    .font-mono-camera { font-family: 'JetBrains Mono', monospace; }
    
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

const CameraOverlay = ({ crazy }: { crazy: boolean }) => (
  <div className="fixed inset-0 z-50 pointer-events-none text-white mix-blend-difference">
    {/* Top Bar */}
    <div className="absolute top-8 left-8 flex flex-col leading-none">
      <span className="font-camera font-medium text-xs tracking-wide">AI MINDSET</span>
      <span className="font-camera font-medium text-xs tracking-wide opacity-70">POS SPRINT</span>
    </div>

    <div className="absolute top-8 right-8 flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={`w-3 h-4 ${i === 6 ? 'bg-white' : 'bg-white/30'}`} />
        ))}
      </div>
      <span className="font-mono-camera text-xs">0 GALLERY 6</span>
    </div>

    {/* Bottom Bar */}
    <div className="absolute bottom-8 left-8 flex items-center gap-2">
      <div className="border border-white px-1 py-0.5 text-[10px] font-bold">ISO</div>
      <span className="font-mono-camera text-xs">200</span>
    </div>

    <div className="absolute bottom-8 right-8 flex items-center gap-2">
      <div className="w-6 h-3 border border-white relative flex items-center justify-start px-0.5">
        <div className="h-1.5 w-full bg-white animate-pulse" />
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-white" />
      </div>
      <span className="font-mono-camera text-xs">[ 100 ]</span>
    </div>

    {/* Center Crosshair */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center opacity-50">
      <div className="w-full h-px bg-white" />
      <div className="h-full w-px bg-white absolute" />
    </div>

    {/* Focus Brackets */}
    <motion.div 
      className="absolute top-1/2 left-1/2 w-64 h-40 border border-white/30"
      style={{ x: '-50%', y: '-50%' }}
      animate={crazy ? { scale: [1, 1.1, 0.9, 1], opacity: [0.3, 0.8, 0.3] } : { scale: 1, opacity: 0.3 }}
      transition={{ duration: 0.5, repeat: crazy ? Infinity : 0 }}
    >
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white" />
    </motion.div>
  </div>
);

const ColorInfo = ({ label, value, sub }: { label: string, value: string, sub: string }) => (
  <div className="font-mono-camera text-xs text-white/80 mb-8">
    <div className="mb-4">
      <div className="uppercase opacity-50 text-[10px] mb-1">{label}</div>
      <div className="uppercase">{value}</div>
    </div>
    <div>
      <div className="uppercase opacity-50 text-[10px] mb-1">HEX</div>
      <div className="uppercase">{sub}</div>
    </div>
  </div>
);

export default function AiMindsetCameraPage() {
  const [crazyMode, setCrazyMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const xMove = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-[#A36452] text-white font-camera hide-scrollbar relative selection:bg-white selection:text-[#A36452]">
      <CameraStyles />
      <CameraOverlay crazy={crazyMode} />

      {/* Crazy Mode Toggle */}
      <div className="fixed top-1/2 right-8 z-50 -translate-y-1/2 flex flex-col items-center gap-2 mix-blend-difference">
         <div 
            className={`w-12 h-6 rounded-full border border-white p-1 cursor-pointer transition-colors ${crazyMode ? 'bg-white' : 'bg-transparent'}`}
            onClick={() => setCrazyMode(!crazyMode)}
         >
            <motion.div 
               className={`w-4 h-4 rounded-full ${crazyMode ? 'bg-[#A36452]' : 'bg-white'}`}
               layout
               transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
         </div>
         <span className="text-[10px] font-mono-camera uppercase tracking-widest rotate-90 mt-4 origin-center">
            {crazyMode ? 'REC' : 'STBY'}
         </span>
      </div>

      <main>
        {/* Section 1: Objective */}
        <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 pt-24 relative overflow-hidden">
           <div className="absolute top-32 left-8 md:left-16">
              <ColorInfo label="TONE" value="DULL RED" sub="#A36452" />
           </div>

           <motion.div style={{ x: xMove }} className="relative z-10">
              <h1 className="text-[15vw] leading-[0.8] font-normal tracking-tight uppercase">
                 OBJECTIVE<br/>
                 OF THE SPRINT
              </h1>
           </motion.div>
        </section>

        {/* Section 2: System */}
        <section className="min-h-screen flex items-center relative overflow-hidden bg-[#8A5A44]">
           <div className="absolute top-1/2 left-0 w-full h-px bg-white/20" />
           <div className="absolute top-0 left-1/2 h-full w-px bg-white/20" />
           
           <div className="w-full px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
              <div className="order-2 md:order-1">
                 <div className="flex justify-between text-xs font-mono-camera mb-2 border-b border-white/20 pb-2">
                    <span>4A</span>
                    <span>SYSTEM ARCHITECTURE</span>
                 </div>
                 <h2 className="text-6xl md:text-8xl font-normal tracking-tight uppercase mb-8">
                    SYSTEM
                 </h2>
                 <p className="text-lg md:text-xl opacity-80 max-w-md leading-relaxed">
                    Photographers see the world through their lens. We see the world through systems. A layer of rules, context, and restrictions that makes tools work for you.
                 </p>
              </div>
              
              <div className="order-1 md:order-2 flex justify-center">
                 <motion.div 
                    className="w-64 h-64 md:w-96 md:h-96 bg-[#C48B7A] flex items-center justify-center text-[10rem] font-normal"
                    animate={crazyMode ? { 
                       filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"],
                       scale: [1, 1.05, 1]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                 >
                    C
                 </motion.div>
              </div>
           </div>
        </section>

        {/* Section 3: Pink Flare / Context */}
        <section className="min-h-screen bg-[#D4A5A5] text-white relative flex flex-col justify-end pb-16 px-8 md:px-16 overflow-hidden">
           <div className="absolute top-32 left-8 md:left-16 mix-blend-difference">
              <ColorInfo label="TONE" value="PINK FLARE" sub="#D4A5A5" />
           </div>

           {/* Background Image Effect */}
           <motion.div 
              className="absolute inset-0 z-0 opacity-40"
              style={{ scale }}
           >
              <img 
                 src="https://picsum.photos/seed/pinksky/1920/1080" 
                 alt="Pink Flare" 
                 className="w-full h-full object-cover grayscale mix-blend-overlay" 
              />
           </motion.div>

           <div className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
                 <div className="md:col-span-4 font-mono-camera text-xs space-y-4">
                    <div>
                       <div className="opacity-50 mb-1">INFORMATION:</div>
                       <div>AI MINDSET LAB</div>
                       <div>BATCH W26</div>
                       <div>2026</div>
                    </div>
                    <div>
                       <div className="opacity-50 mb-1">HEX</div>
                       <div className="text-2xl font-mono-camera">#D4A5A5</div>
                    </div>
                 </div>
              </div>
              
              <h2 className="text-[18vw] leading-none font-normal tracking-tighter uppercase text-center md:text-left mix-blend-overlay">
                 CONTEXT
              </h2>
           </div>
           
           {/* Focus UI Elements */}
           <div className="absolute top-1/4 right-1/4 w-8 h-8 border-t border-r border-white/50" />
           <div className="absolute bottom-1/4 left-1/4 w-8 h-8 border-b border-l border-white/50" />
           
           <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
              <div className="text-[10px] font-mono-camera text-right opacity-50">{'{ }'}</div>
              <div className="text-[10px] font-mono-camera text-right opacity-50">+</div>
              <div className="h-24 w-px bg-white/30 mx-auto relative">
                 <motion.div 
                    className="absolute w-2 h-px bg-white left-1/2 -translate-x-1/2" 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                 />
              </div>
              <div className="text-[10px] font-mono-camera text-right opacity-50">-</div>
           </div>
        </section>

      </main>
    </div>
  );
}
