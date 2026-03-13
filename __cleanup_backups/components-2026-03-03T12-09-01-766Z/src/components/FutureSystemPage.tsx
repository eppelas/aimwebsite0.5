import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowRight, RotateCw } from 'lucide-react';

// --- Assets & Styles ---

const FutureFont = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;900&display=swap');
    .font-future { font-family: 'Inter', sans-serif; }
    
    .curved-grid {
      background-size: 100px 100px;
      background-image:
        linear-gradient(to right, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 1px, transparent 1px);
      transform: perspective(1000px) rotateX(20deg) scale(1.5);
      transform-origin: center top;
      mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
    }

    .scanline {
      background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2));
      background-size: 100% 4px;
      pointer-events: none;
    }
  `}</style>
);

// --- Components ---

const WireframeGlobe = () => (
  <motion.div 
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    className="w-32 h-32 rounded-full border-2 border-[#00FF00] relative flex items-center justify-center"
  >
    <div className="absolute inset-0 border-2 border-[#00FF00] rounded-full rotate-45" />
    <div className="absolute inset-0 border-2 border-[#00FF00] rounded-full -rotate-45" />
    <div className="w-full h-2 bg-[#00FF00]/20 absolute top-1/2 -translate-y-1/2" />
    <div className="h-full w-2 bg-[#00FF00]/20 absolute left-1/2 -translate-x-1/2" />
  </motion.div>
);

const NavLink = ({ text }: { text: string }) => (
  <a href="#" className="text-white hover:text-[#00FF00] hover:underline decoration-2 underline-offset-4 transition-colors uppercase text-sm md:text-base font-bold tracking-wider">
    {text}
  </a>
);

// --- Main Page ---

export default function FutureSystemPage() {
  return (
    <div className="min-h-screen bg-[#111] text-white font-future overflow-hidden flex flex-col md:flex-row relative selection:bg-[#00FF00] selection:text-black">
      <FutureFont />
      
      {/* Scanline Overlay */}
      <div className="absolute inset-0 scanline z-50 opacity-10 pointer-events-none" />

      {/* LEFT PANEL: Visuals */}
      <div className="w-full md:w-1/2 relative border-r-4 border-blue-600 overflow-hidden flex flex-col">
        {/* Curved Grid Background */}
        <div className="absolute inset-0 curved-grid opacity-30" />
        
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-xl md:text-2xl font-light tracking-[0.5em] mb-4 text-gray-400">BATCH X26</h2>
            <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter mb-2">
              FUTURE<br/>
              SYSTEM
            </h1>
            
            <div className="flex justify-center my-8">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <RotateCw size={48} className="text-[#00FF00]" />
              </motion.div>
            </div>

            <h3 className="text-2xl md:text-3xl font-light border-b border-white pb-2 inline-block">
              POS SPRINT
            </h3>
          </motion.div>
        </div>

        {/* Bottom Ticker */}
        <div className="relative z-10 border-t border-white/20 p-4 overflow-hidden whitespace-nowrap">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 text-4xl md:text-6xl font-thin text-white/50"
          >
            <span>02.03</span><span>03.03</span><span>04.03</span><span>05.03</span><span>06.03</span><span>07.03</span>
            <span>02.03</span><span>03.03</span><span>04.03</span><span>05.03</span><span>06.03</span><span>07.03</span>
          </motion.div>
        </div>
      </div>

      {/* RIGHT PANEL: Content */}
      <div className="w-full md:w-1/2 flex flex-col bg-[#0a0a0a]">
        
        {/* Header */}
        <div className="p-8 md:p-12 border-b-4 border-red-600">
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight">REGISTRATION</h1>
        </div>

        {/* Nav Bar */}
        <div className="flex flex-wrap gap-6 p-6 border-b border-white/20">
          <NavLink text="Program" />
          <NavLink text="Workshops" />
          <NavLink text="Manifesto" />
          <NavLink text="Speakers" />
          <NavLink text="Price" />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-between relative">
          {/* Grid Lines Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20" 
               style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
          />

          <div className="relative z-10 max-w-lg">
            <div className="inline-block bg-[#00FF00] text-black px-2 py-1 font-bold text-sm mb-6">
              APPLICATIONS OPEN
            </div>
            
            <p className="text-xl md:text-2xl leading-relaxed font-light mb-8 text-gray-300">
              <strong className="text-white font-bold">POS {`{sprint}`}</strong> — In 2 weeks, you will create a Personal Operational System: a layer of agents to manage attention, tasks, and knowledge.
            </p>

            <ul className="space-y-4 mb-12">
              <li className="flex items-start gap-4">
                <ArrowRight className="text-[#00FF00] mt-1 shrink-0" />
                <span>From tool chaos to a working AI system.</span>
              </li>
              <li className="flex items-start gap-4">
                <ArrowRight className="text-[#00FF00] mt-1 shrink-0" />
                <span>Context-aware daily planning.</span>
              </li>
              <li className="flex items-start gap-4">
                <ArrowRight className="text-[#00FF00] mt-1 shrink-0" />
                <span>Automated briefings and debriefings.</span>
              </li>
            </ul>

            <button className="bg-white text-black px-8 py-4 text-xl font-bold hover:bg-[#00FF00] transition-colors w-full md:w-auto border-2 border-transparent hover:border-white">
              JOIN BATCH X26
            </button>
          </div>

          {/* Floating Globe Graphic */}
          <div className="absolute bottom-12 right-12 hidden md:block">
            <WireframeGlobe />
            <div className="text-center mt-2 text-[#00FF00] font-mono text-xs">
              SYSTEM<br/>ONLINE
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/20 flex justify-between items-end">
          <div className="text-sm text-gray-500">
            AI MINDSET<br/>
            POS SPRINT
          </div>
          <div className="flex gap-4">
             <div className="w-10 h-10 border border-white flex items-center justify-center font-bold">AI</div>
             <div className="w-10 h-10 border border-white flex items-center justify-center font-bold">M</div>
          </div>
        </div>

      </div>

    </div>
  );
}
