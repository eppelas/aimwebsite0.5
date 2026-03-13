import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TanStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
    
    .font-tan { font-family: 'Inter', sans-serif; }
    .font-mono-tan { font-family: 'JetBrains Mono', monospace; }
    
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

const CameraHUD = ({ color = "white" }: { color?: string }) => (
  <div className={`fixed inset-0 z-50 pointer-events-none text-${color} mix-blend-difference`} style={{ color: color === 'white' ? '#fff' : '#F89558' }}>
    {/* Top Left */}
    <div className="absolute top-8 left-8 flex flex-col leading-tight">
      <span className="font-tan font-medium text-xs tracking-wide">COLORS</span>
      <span className="font-tan font-medium text-xs tracking-wide opacity-70">COMBINATIONS</span>
    </div>

    {/* Top Right - Gallery Indicators */}
    <div className="absolute top-8 right-8 flex items-center gap-4">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={`w-3 h-4 ${i === 6 ? 'bg-current' : 'bg-current opacity-30'}`} />
        ))}
      </div>
      <div className="flex gap-2 font-mono-tan text-[10px] tracking-widest">
        <span>0</span>
        <span>GALLERY</span>
        <span>6</span>
      </div>
    </div>

    {/* Bottom Left - ISO */}
    <div className="absolute bottom-8 left-8 flex items-center gap-2">
      <div className="border border-current px-1 py-0.5 text-[10px] font-bold bg-current text-black">ISO</div>
      <span className="font-mono-tan text-xs">200</span>
    </div>

    {/* Bottom Right - Battery */}
    <div className="absolute bottom-8 right-8 flex items-center gap-2">
      <div className="w-6 h-3 border border-current relative flex items-center justify-start px-0.5">
        <div className="h-1.5 w-full bg-current" />
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-current" />
      </div>
      <span className="font-mono-tan text-xs">[ 80 ]</span>
    </div>

    {/* Right Side Vertical Scale */}
    <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 font-mono-tan text-[10px]">
      <span>( )</span>
      <span>+</span>
      <div className="h-8 w-[1px] bg-current"></div>
      <span>0</span>
      <div className="h-8 w-[1px] bg-current"></div>
      <span>-</span>
      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-current mt-1"></div>
    </div>
  </div>
);

export default function AiMindsetTanPage() {
  const [crazyMode, setCrazyMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-[#F89558] text-white font-tan hide-scrollbar relative selection:bg-white selection:text-[#F89558]">
      <TanStyles />
      <CameraHUD />

      {/* Crazy Mode Toggle */}
      <div className="fixed top-1/2 left-8 z-50 -translate-y-1/2 mix-blend-overlay">
         <button 
            onClick={() => setCrazyMode(!crazyMode)}
            className="group flex flex-col items-center gap-2"
         >
            <div className={`w-3 h-12 border border-white rounded-full p-0.5 transition-all duration-300 ${crazyMode ? 'rotate-180' : ''}`}>
               <div className="w-full h-1/2 bg-white rounded-full" />
            </div>
            <span className="text-[10px] font-mono-tan tracking-widest rotate-180 text-white/70 group-hover:text-white transition-colors" style={{ writingMode: 'vertical-rl' }}>
               MODE
            </span>
         </button>
      </div>

      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden flex flex-col justify-end pb-32 px-8 md:px-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
           <motion.div 
             className="absolute inset-0 bg-[#F89558] mix-blend-color z-10" 
             animate={crazyMode ? { opacity: [0.8, 0.4, 0.8] } : { opacity: 0.9 }}
             transition={{ duration: 2, repeat: Infinity }}
           />
           <motion.img 
             src="https://picsum.photos/seed/cityscape/1920/1080" 
             alt="Cityscape" 
             className="w-full h-full object-cover grayscale contrast-125"
             style={{ scale, y }}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#F89558] via-[#F89558]/50 to-transparent z-10" />
        </div>

        {/* Hero Content */}
        <motion.div className="relative z-20 w-full" style={{ opacity }}>
           <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 items-end">
              <div className="md:col-span-4 font-mono-tan text-xs space-y-4">
                 <div>
                    <div className="opacity-70 mb-1">INFORMATION:</div>
                    <div>BATCH W26</div>
                    <div>19 TONES</div>
                 </div>
                 <div>
                    <div>2026</div>
                 </div>
                 <div className="flex gap-8 mt-8">
                    <div>
                       <div className="opacity-70 mb-1">HEX</div>
                       <div className="text-xl">#F89558</div>
                    </div>
                    <div>
                       <div className="opacity-70 mb-1">RGB</div>
                       <div className="text-xl">248 149 88</div>
                    </div>
                 </div>
              </div>
              
              <div className="md:col-span-8 text-right">
                 <h1 className="text-[15vw] leading-[0.8] font-bold tracking-tighter uppercase mix-blend-overlay">
                    TAN HIDE
                 </h1>
              </div>
           </div>
        </motion.div>
      </section>

      {/* Content Section - White Background */}
      <section className="min-h-screen bg-[#F2F0EB] text-[#4A4A4A] relative z-20 py-32 px-8 md:px-16">
         <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-24 border-b border-[#4A4A4A]/20 pb-8">
               <div>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-[#F89558]">POS {`{sprint}`}</h2>
                  <p className="font-mono-tan text-sm opacity-60">BATCH: SPRINT-X26 // APPLICATIONS: OPEN</p>
               </div>
               <div className="mt-8 md:mt-0 text-right">
                  <div className="text-2xl font-medium">2 MAR — 14 MAR 2026</div>
                  <div className="text-sm opacity-60 mt-2">2 WEEKS INTENSIVE</div>
               </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
               
               {/* Left Column - Concept */}
               <div>
                  <div className="sticky top-32">
                     <div className="w-full aspect-square bg-[#F89558] rounded-full flex items-center justify-center mb-8 relative overflow-hidden">
                        <div className="absolute inset-4 border border-white/30 rounded-full" />
                        <div className="w-1/3 h-1/3 bg-white rounded-full" />
                        {crazyMode && (
                           <motion.div 
                              className="absolute inset-0 bg-white mix-blend-overlay"
                              animate={{ scale: [1, 1.5], opacity: [0, 0.5, 0] }}
                              transition={{ duration: 1, repeat: Infinity }}
                           />
                        )}
                     </div>
                     <h3 className="text-3xl font-bold mb-4">PERSONAL OPERATIONAL SYSTEM</h3>
                     <p className="text-lg leading-relaxed opacity-80">
                        POS is not a tool, it's an operating system with a personal AI assistant. A layer of rules, context, and restrictions that makes tools work for you.
                     </p>
                  </div>
               </div>

               {/* Right Column - Details */}
               <div className="space-y-24">
                  
                  {/* What is it */}
                  <div>
                     <h4 className="font-mono-tan text-xs tracking-widest uppercase mb-6 text-[#F89558]">THE VISION</h4>
                     <p className="text-xl md:text-2xl leading-relaxed font-light">
                        Imagine: In the morning, an agent gives you a day plan based on your energy level. During the day, it reminds you of a meeting with a prepared brief. In the evening, it finds open tasks and blockers.
                     </p>
                     <ul className="mt-8 space-y-4 border-l-2 border-[#F89558] pl-6">
                        <li className="text-lg">From chaos of tools to a working AI system.</li>
                        <li className="text-lg">Tailored specifically for you.</li>
                        <li className="text-lg">Distillate of real founder cases.</li>
                     </ul>
                  </div>

                  {/* Program */}
                  <div>
                     <h4 className="font-mono-tan text-xs tracking-widest uppercase mb-6 text-[#F89558]">THE RESULT</h4>
                     <div className="grid grid-cols-1 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm">
                           <div className="text-[#F89558] text-4xl mb-4">01</div>
                           <h5 className="text-xl font-bold mb-2">Collected Context</h5>
                           <p className="opacity-70">AI knows who you are, how you work, and what matters to you.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm">
                           <div className="text-[#F89558] text-4xl mb-4">02</div>
                           <h5 className="text-xl font-bold mb-2">Logical Architecture</h5>
                           <p className="opacity-70">Won't delete files without asking or buy useless courses.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm">
                           <div className="text-[#F89558] text-4xl mb-4">03</div>
                           <h5 className="text-xl font-bold mb-2">Connected Tools</h5>
                           <p className="opacity-70">Claude Code / Cursor / Obsidian / MCP integrated seamlessly.</p>
                        </div>
                     </div>
                  </div>

                  {/* Team */}
                  <div>
                     <h4 className="font-mono-tan text-xs tracking-widest uppercase mb-6 text-[#F89558]">YOUR GUIDES</h4>
                     <div className="space-y-8">
                        <div className="flex items-center gap-6 group cursor-pointer">
                           <div className="w-16 h-16 bg-[#D1D5DB] rounded-full overflow-hidden">
                              <img src="https://picsum.photos/seed/alex/200" alt="Alexander" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                           </div>
                           <div>
                              <div className="font-bold text-lg">Alexander Povalyaev</div>
                              <div className="text-sm opacity-60">Founder AI Mindset, Strategist</div>
                           </div>
                        </div>
                        <div className="flex items-center gap-6 group cursor-pointer">
                           <div className="w-16 h-16 bg-[#D1D5DB] rounded-full overflow-hidden">
                              <img src="https://picsum.photos/seed/sergey/200" alt="Sergey" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                           </div>
                           <div>
                              <div className="font-bold text-lg">Sergey Khabarov</div>
                              <div className="text-sm opacity-60">System Architect</div>
                           </div>
                        </div>
                        <div className="flex items-center gap-6 group cursor-pointer">
                           <div className="w-16 h-16 bg-[#D1D5DB] rounded-full overflow-hidden">
                              <img src="https://picsum.photos/seed/ris/200" alt="Seryozha" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                           </div>
                           <div>
                              <div className="font-bold text-lg">Seryozha Ris</div>
                              <div className="text-sm opacity-60">AI Evangelist, ex-Yandex</div>
                           </div>
                        </div>
                     </div>
                  </div>

               </div>
            </div>
         </div>
      </section>

      {/* Footer / Next Steps */}
      <section className="h-[50vh] bg-[#F89558] text-white flex flex-col justify-center items-center relative overflow-hidden">
         <motion.div 
            className="absolute inset-0 opacity-20"
            style={{ 
               backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
            }}
            animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
         />
         
         <div className="relative z-10 text-center">
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">JOIN W26</h2>
            <button className="bg-white text-[#F89558] px-8 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform">
               APPLY NOW
            </button>
         </div>
      </section>

    </div>
  );
}
