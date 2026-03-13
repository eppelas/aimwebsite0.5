import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const AudioStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;400;700;800&display=swap');
    
    .font-audio { font-family: 'JetBrains Mono', monospace; }
    
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    
    .glitch-text {
      position: relative;
    }
    .glitch-text::before,
    .glitch-text::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .glitch-text::before {
      left: 2px;
      text-shadow: -1px 0 #00F0FF;
      clip-path: inset(24% 0 29% 0);
      animation: glitch-anim-1 2s infinite linear alternate-reverse;
    }
    .glitch-text::after {
      left: -2px;
      text-shadow: -1px 0 #FF0055;
      clip-path: inset(54% 0 21% 0);
      animation: glitch-anim-2 3s infinite linear alternate-reverse;
    }
    
    @keyframes glitch-anim-1 {
      0% { clip-path: inset(40% 0 61% 0); }
      20% { clip-path: inset(92% 0 1% 0); }
      40% { clip-path: inset(43% 0 1% 0); }
      60% { clip-path: inset(25% 0 58% 0); }
      80% { clip-path: inset(54% 0 7% 0); }
      100% { clip-path: inset(58% 0 43% 0); }
    }
    @keyframes glitch-anim-2 {
      0% { clip-path: inset(24% 0 29% 0); }
      20% { clip-path: inset(54% 0 21% 0); }
      40% { clip-path: inset(1% 0 1% 0); }
      60% { clip-path: inset(99% 0 1% 0); }
      80% { clip-path: inset(1% 0 99% 0); }
      100% { clip-path: inset(50% 0 50% 0); }
    }
  `}</style>
);

const Waveform = ({ crazyMode }: { crazyMode: boolean }) => {
  return (
    <div className="flex items-end justify-center gap-[2px] h-32 w-full opacity-50 mix-blend-screen">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-2 bg-[#00F0FF]"
          animate={{
            height: crazyMode 
              ? [Math.random() * 100 + "%", Math.random() * 100 + "%"] 
              : [20 + Math.sin(i * 0.5) * 20 + "%", 50 + Math.sin(i * 0.5 + 2) * 40 + "%"],
            backgroundColor: crazyMode ? ["#00F0FF", "#FF0055", "#FFFFFF"] : "#00F0FF"
          }}
          transition={{
            duration: crazyMode ? 0.1 : 0.5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: i * 0.05
          }}
        />
      ))}
    </div>
  );
};

const AudioKnob = ({ label, value, crazyMode }: { label: string, value: number, crazyMode: boolean }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="relative w-12 h-12 rounded-full border border-[#00F0FF] flex items-center justify-center">
      <motion.div 
        className="w-1 h-4 bg-[#00F0FF] absolute top-1 origin-bottom"
        style={{ rotate: value * 3.6 }}
        animate={crazyMode ? { rotate: [0, 360] } : {}}
        transition={crazyMode ? { duration: 0.5, repeat: Infinity } : {}}
      />
    </div>
    <span className="text-[10px] text-[#00F0FF]">{label}</span>
  </div>
);

export default function AiMindsetAudioPage() {
  const [crazyMode, setCrazyMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  return (
    <div className="relative h-screen bg-black text-white font-audio overflow-hidden selection:bg-[#00F0FF] selection:text-black">
      <AudioStyles />
      
      {/* Fixed UI Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 p-6 flex flex-col justify-between border-[1px] border-[#00F0FF]/20 m-4 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold tracking-tighter text-[#00F0FF] flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 border border-[#00F0FF]/60 rounded-sm">
                <img
                  src="/assets/ai-mindset-logo.png"
                  alt="AI Mindset logo"
                  className="h-3 w-auto object-contain"
                />
              </span>
              <span>AI MINDSET</span>
            </h1>
            <div className="text-[10px] text-[#00F0FF]/70 mt-1">POS V.2.0 // AUDIO_VISUAL</div>
          </div>
          <div className="flex gap-4">
            <AudioKnob label="GAIN" value={crazyMode ? 100 : 45} crazyMode={crazyMode} />
            <AudioKnob label="FREQ" value={crazyMode ? 100 : 72} crazyMode={crazyMode} />
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div className="text-[10px] text-[#00F0FF]/70">
            <div>BATCH: W26</div>
            <div>STATUS: {crazyMode ? "OVERDRIVE" : "NORMAL"}</div>
          </div>
          <div className="flex gap-1">
             {Array.from({ length: 12 }).map((_, i) => (
               <motion.div 
                 key={i} 
                 className="w-1 h-6 bg-[#00F0FF]"
                 animate={{ opacity: [0.2, 1, 0.2] }}
                 transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
               />
             ))}
          </div>
        </div>
      </div>

      {/* Crazy Mode Toggle */}
      <div className="fixed top-1/2 right-8 z-[60] -translate-y-1/2">
         <button 
            onClick={() => setCrazyMode(!crazyMode)}
            className={`
              w-16 h-16 rounded-full border-2 border-[#00F0FF] flex items-center justify-center
              hover:bg-[#00F0FF]/10 transition-colors group
            `}
         >
            <div className={`w-8 h-8 bg-[#00F0FF] rounded-sm transition-all duration-300 ${crazyMode ? 'scale-75 rotate-45 bg-[#FF0055]' : 'scale-100'}`} />
         </button>
         <div className="text-[10px] text-[#00F0FF] text-center mt-2 font-bold tracking-widest rotate-90 origin-center translate-y-4">
            {crazyMode ? "MUTE" : "LOUD"}
         </div>
      </div>

      {/* Main Scrollable Content */}
      <div ref={containerRef} className="h-full overflow-y-auto hide-scrollbar relative z-10">
        
        {/* Section 1: Objective */}
        <section className="min-h-screen flex flex-col justify-center items-center relative p-8">
           <motion.div 
             className="w-full max-w-4xl relative"
             style={{ scale }}
           >
             <div className="absolute -top-20 left-0 w-full">
               <Waveform crazyMode={crazyMode} />
             </div>
             
             <h2 className={`text-[8vw] leading-[0.8] font-black tracking-tighter text-center mb-8 ${crazyMode ? 'glitch-text' : ''}`} data-text="OBJECTIVE">
               OBJECTIVE
             </h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#00F0FF] pt-8">
               <div className="text-[#00F0FF] text-sm">
                 <p>SPRINT GOAL</p>
                 <p>00:00:01:24</p>
               </div>
               <p className="text-xl md:text-2xl font-light leading-tight">
                 WE SYMBOLIZE PROGRESS. <span className="text-[#00F0FF]">AMPLIFYING</span> THE SIGNAL OF INNOVATION THROUGH THE NOISE OF TRADITION.
               </p>
             </div>
           </motion.div>
        </section>

        {/* Section 2: System */}
        <section className="min-h-screen flex items-center justify-center relative p-8 bg-[#00F0FF]/5">
           <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 space-y-4">
                 <div className="text-6xl md:text-8xl font-black text-transparent stroke-text" style={{ WebkitTextStroke: '2px #00F0FF' }}>
                    SYS
                 </div>
                 <div className="text-6xl md:text-8xl font-black text-[#00F0FF]">
                    TEM
                 </div>
              </div>
              
              <div className="md:col-span-8 border-l-2 border-[#00F0FF] pl-8 md:pl-16 py-8">
                 <h3 className="text-2xl mb-4 font-bold text-[#00F0FF]">[ ARCHITECTURE ]</h3>
                 <p className="text-2xl md:text-4xl leading-tight mb-8">
                    A layer of rules, context, and restrictions that makes tools work for you.
                 </p>
                 <div className="flex gap-4">
                    <div className="px-4 py-2 border border-[#00F0FF] rounded-full text-xs hover:bg-[#00F0FF] hover:text-black transition-colors cursor-pointer">
                       INPUT
                    </div>
                    <div className="px-4 py-2 border border-[#00F0FF] rounded-full text-xs hover:bg-[#00F0FF] hover:text-black transition-colors cursor-pointer">
                       PROCESS
                    </div>
                    <div className="px-4 py-2 border border-[#00F0FF] rounded-full text-xs hover:bg-[#00F0FF] hover:text-black transition-colors cursor-pointer">
                       OUTPUT
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Section 3: Context */}
        <section className="min-h-screen flex flex-col justify-center relative p-8">
           <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <div className="w-[80vw] h-[80vw] border-[1px] border-[#00F0FF] rounded-full animate-spin-slow" style={{ animationDuration: '60s' }} />
              <div className="w-[60vw] h-[60vw] border-[1px] border-[#00F0FF] rounded-full absolute animate-spin-slow" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />
           </div>

           <div className="max-w-5xl mx-auto text-center relative z-10">
              <div className="mb-8 inline-block border border-[#00F0FF] px-3 py-1 text-xs tracking-[0.5em] text-[#00F0FF]">
                 CONTEXT
              </div>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-12">
                 "We are not just building tools; we are building a <span className={`inline-block ${crazyMode ? 'text-[#FF0055]' : 'text-[#00F0FF]'}`}>mindset</span>."
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-[#00F0FF]/60">
                 <div>AI MINDSET LAB</div>
                 <div>BATCH W26</div>
                 <div>AUDIO VISUAL</div>
                 <div>2024</div>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
}
