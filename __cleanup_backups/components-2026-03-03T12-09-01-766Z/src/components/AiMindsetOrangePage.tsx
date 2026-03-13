import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, ArrowRight, RefreshCw, Menu, Share } from 'lucide-react';

const OrangeStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    
    .font-orange { font-family: 'Inter', sans-serif; }
    
    .hazard-stripe {
      background: repeating-linear-gradient(
        -45deg,
        #000,
        #000 20px,
        transparent 20px,
        transparent 40px
      );
    }

    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    
    .text-stroke-black {
      -webkit-text-stroke: 1px black;
      color: transparent;
    }
  `}</style>
);

const Marquee = ({ text, direction = 1, speed = 20 }: { text: string, direction?: number, speed?: number }) => (
  <div className="overflow-hidden whitespace-nowrap border-b border-black bg-[#FF3300] text-black py-2 flex">
    <motion.div 
      className="flex gap-8 text-xl font-orange font-bold uppercase tracking-wider"
      animate={{ x: direction === 1 ? [0, -1000] : [-1000, 0] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      {[...Array(10)].map((_, i) => (
        <span key={i}>{text}</span>
      ))}
    </motion.div>
  </div>
);

const RotatingCircle = ({ text, crazyMode }: { text: string, crazyMode: boolean }) => (
  <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full border-2 border-black flex items-center justify-center overflow-hidden">
    <motion.div 
      className="absolute inset-0 w-full h-full"
      animate={{ rotate: 360 }}
      transition={{ duration: crazyMode ? 5 : 20, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
        <text className="text-[10px] font-orange font-bold uppercase fill-black tracking-[0.2em]">
          <textPath href="#circlePath" startOffset="0%">
            {text} • {text} • {text} •
          </textPath>
        </text>
      </svg>
    </motion.div>
    <div className="text-center z-10">
      <Globe className="w-16 h-16 md:w-24 md:h-24 stroke-1 mb-2 mx-auto" />
      <div className="font-orange font-bold text-xs uppercase tracking-widest">Global System</div>
    </div>
  </div>
);

const GridItem = ({ title, content, link }: { title: string, content: string, link?: string }) => (
  <div className="border border-black p-6 md:p-8 flex flex-col justify-between h-full hover:bg-black hover:text-[#FF3300] transition-colors group">
    <div>
      <h3 className="font-orange font-black text-4xl md:text-6xl uppercase leading-[0.8] mb-4 tracking-tighter break-words">
        {title}
      </h3>
      <p className="font-orange text-sm md:text-base font-medium leading-tight max-w-xs border-t border-current pt-4 mt-4">
        {content}
      </p>
    </div>
    {link && (
      <div className="mt-8 flex items-center gap-2 font-bold uppercase text-xs tracking-widest">
        <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center group-hover:bg-[#FF3300] group-hover:text-black">
          <ArrowRight className="w-3 h-3" />
        </div>
        {link}
      </div>
    )}
  </div>
);

export default function AiMindsetOrangePage() {
  const [crazyMode, setCrazyMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const bgColor = crazyMode ? '#000000' : '#FF3300';
  const textColor = crazyMode ? '#FF3300' : '#000000';

  return (
    <div 
      ref={containerRef} 
      className="h-screen overflow-y-scroll transition-colors duration-300 relative hide-scrollbar"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <OrangeStyles />
      
      {/* Top Bar */}
      <Marquee text="AI MINDSET POS — PERSONAL OPERATIONAL SYSTEM — BATCH X26 — OPEN APPLICATIONS —" speed={30} />
      
      {/* Left Hazard Stripe */}
      <div className="fixed left-0 top-0 bottom-0 w-8 md:w-16 border-r border-black z-40 bg-[#FF3300]">
        <div className="w-full h-full hazard-stripe opacity-100" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap font-orange font-bold text-[10px] tracking-[0.3em] bg-[#FF3300] px-4 border border-black">
          2026 - 2041
        </div>
      </div>

      {/* Floating Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button 
          onClick={() => setCrazyMode(!crazyMode)}
          className="w-10 h-10 rounded-full border border-black bg-[#FF3300] text-black flex items-center justify-center hover:bg-black hover:text-[#FF3300] transition-colors"
        >
          <RefreshCw className={`w-5 h-5 ${crazyMode ? 'animate-spin' : ''}`} />
        </button>
        <button className="w-10 h-10 rounded-full border border-black bg-[#FF3300] text-black flex items-center justify-center hover:bg-black hover:text-[#FF3300] transition-colors">
          <Share className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-full border border-black bg-[#FF3300] text-black flex items-center justify-center hover:bg-black hover:text-[#FF3300] transition-colors">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <main className="pl-8 md:pl-16">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center relative p-8 border-b border-black overflow-hidden">
          <motion.div 
            className="absolute top-10 left-10 md:left-20 text-xs font-bold uppercase tracking-widest max-w-[200px]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            Create a system of agents for attention, tasks, and knowledge.
          </motion.div>

          <div className="relative z-10 text-center">
            <h1 className="font-orange font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.85] mb-8">
              @_AI_MINDSET<br/>
              <span className="border-b-4 border-black">POS</span> IS A<br/>
              SYSTEM
            </h1>
            <p className="font-orange text-xl md:text-3xl font-medium max-w-3xl mx-auto leading-tight">
              From chaos of tools to a working AI system, tailored for you.
            </p>
          </div>

          <div className="absolute bottom-[-100px] md:bottom-[-150px] left-1/2 -translate-x-1/2">
             <RotatingCircle text="PERSONAL OPERATIONAL SYSTEM • AI AGENTS • WORKFLOW •" crazyMode={crazyMode} />
          </div>
        </section>

        {/* Big Text Section */}
        <section className="py-24 px-8 md:px-16 border-b border-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-orange font-bold text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-16 text-center">
              OUR 2026 REALITY IS A TIME WHEN THE INTERCONNECTEDNESS OF HUMANS AND AI HAS FINALLY BEEN REALIZED.
              <br/><br/>
              THIS IS A MOMENT TO <span className="bg-black text-[#FF3300] px-2">BUILD</span>. A TIME TO AUTOMATE, REFLECT, RESET — AND REIMAGINE THE WORKFLOW.
            </h2>
            
            <div className="flex justify-center gap-4 md:gap-12">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-black flex items-center justify-center">
                <Globe className="w-12 h-12 md:w-16 md:h-16 stroke-1" />
              </div>
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-black flex items-center justify-center bg-black text-[#FF3300]">
                <div className="text-center leading-none">
                  <div className="text-xs font-bold uppercase mb-1">Batch</div>
                  <div className="text-2xl font-black">X26</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grid Content Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-black">
          <div className="col-span-1 md:col-span-2 lg:col-span-3 p-8 md:p-16 border-b border-black">
            <h2 className="font-orange font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">
              WELCOME TO<br/>THE SYSTEM
            </h2>
          </div>
          
          <GridItem 
            title="CONTEXT" 
            content="AI knows who you are, how you work, and what matters to you. A deep understanding of your personal workflow."
            link="Learn More"
          />
          <GridItem 
            title="ARCHI TECTURE" 
            content="A system that won't delete files without asking. Structured, safe, and built for scale."
            link="View Specs"
          />
          <GridItem 
            title="TOOLS" 
            content="Seamless integration with Claude Code, Cursor, Obsidian, and MCP. Your stack, unified."
            link="Integrate"
          />
          <GridItem 
            title="SKILLS" 
            content="Automation of routine tasks. Agents that handle the busywork so you can focus on strategy."
            link="Automate"
          />
          <div className="col-span-1 md:col-span-2 border border-black p-8 md:p-16 flex flex-col justify-center bg-black text-[#FF3300]">
             <h3 className="font-orange font-black text-4xl md:text-6xl uppercase leading-none mb-8">
               FROM CHAOS<br/>TO ORDER
             </h3>
             <div className="grid grid-cols-2 gap-8">
               <div>
                 <h4 className="font-bold uppercase mb-2 border-b border-[#FF3300] pb-1">Before</h4>
                 <ul className="list-disc list-inside opacity-80 space-y-1">
                   <li>Scattered notes</li>
                   <li>Missed deadlines</li>
                   <li>Manual routine</li>
                 </ul>
               </div>
               <div>
                 <h4 className="font-bold uppercase mb-2 border-b border-[#FF3300] pb-1">After</h4>
                 <ul className="list-disc list-inside opacity-80 space-y-1">
                   <li>Centralized knowledge</li>
                   <li>Proactive agents</li>
                   <li>Automated flows</li>
                 </ul>
               </div>
             </div>
          </div>
        </section>

        {/* List Section */}
        <section className="flex flex-col md:flex-row border-b border-black">
          <div className="w-full md:w-1/2 p-8 md:p-16 border-b md:border-b-0 md:border-r border-black">
             <h2 className="font-orange font-bold text-2xl uppercase mb-8">System Modules</h2>
             <ul className="space-y-4">
               {['Daily Planning Agent', 'Meeting Prep Bot', 'Knowledge Graph', 'Task Prioritizer', 'Email Synthesizer'].map((item, i) => (
                 <li key={i} className="flex items-center justify-between border-b border-black pb-2 group cursor-pointer hover:pl-4 transition-all">
                   <span className="font-bold uppercase text-lg">{item}</span>
                   <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                 </li>
               ))}
             </ul>
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-16 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <motion.div 
                  className="text-[20vw] font-black leading-none text-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                  *
                </motion.div>
             </div>
             <div className="relative z-10 text-center">
                <p className="font-orange font-bold text-xl mb-4">JOIN THE SPRINT</p>
                <h3 className="font-orange font-black text-6xl mb-8">BATCH X26</h3>
                <button className="bg-black text-[#FF3300] px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                  Apply Now
                </button>
             </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-8 md:px-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <h2 className="font-orange font-black text-4xl md:text-6xl uppercase leading-none mb-4">
              AI MINDSET<br/>POS
            </h2>
            <p className="font-bold uppercase text-sm tracking-widest">
              © 2026 All Rights Reserved
            </p>
          </div>
          <div className="flex gap-4">
             {['Instagram', 'Telegram', 'Youtube'].map((social) => (
               <a key={social} href="#" className="w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-[#FF3300] transition-colors">
                 <span className="sr-only">{social}</span>
                 <ArrowRight className="w-4 h-4 -rotate-45" />
               </a>
             ))}
          </div>
        </footer>

      </main>
    </div>
  );
}
