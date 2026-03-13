import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';

// --- SVGs & Shapes ---

const Scribble = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 300 40" className={className} preserveAspectRatio="none">
    <path 
      d="M5,20 Q50,5 90,20 T180,20 T270,20 T295,20" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="25" 
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Blob1 = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <path 
      d="M45.7,-76.3C58.9,-69.3,69.1,-55.5,76.9,-41.2C84.7,-26.9,90.1,-12.1,88.3,1.9C86.5,15.9,77.5,29.1,67.6,40.6C57.7,52.1,46.9,61.9,34.8,68.3C22.7,74.7,9.3,77.7,-3.1,76.7C-15.5,75.7,-29,70.7,-41.6,63.1C-54.2,55.5,-65.9,45.3,-73.8,32.8C-81.7,20.3,-85.8,5.5,-83.4,-8.2C-81,-21.9,-72.1,-34.5,-61.6,-44.3C-51.1,-54.1,-39,-61.1,-26.9,-68.7C-14.8,-76.3,-2.7,-84.5,10.6,-81.1C23.9,-77.7,32.5,-62.7,45.7,-76.3Z" 
      transform="translate(100 100)" 
      fill="currentColor"
    />
  </svg>
);

const Blob2 = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <path 
      d="M38.9,-64.6C51.1,-56.3,62.1,-47.3,70.3,-36.1C78.5,-24.9,83.9,-11.5,82.5,1.2C81.1,13.9,72.9,25.9,63.6,36.6C54.3,47.3,43.9,56.7,32.2,63.3C20.5,69.9,7.5,73.7,-4.8,72.1C-17.1,70.5,-28.7,63.5,-39.8,56.1C-50.9,48.7,-61.5,40.9,-69.7,30.8C-77.9,20.7,-83.7,8.3,-82.1,-3.5C-80.5,-15.3,-71.5,-26.5,-61.8,-35.6C-52.1,-44.7,-41.7,-51.7,-30.9,-60.6C-20.1,-69.5,-8.9,-80.3,3.3,-81.4C15.5,-82.5,26.7,-72.9,38.9,-64.6Z" 
      transform="translate(100 100)" 
      fill="currentColor"
    />
  </svg>
);

// --- Components ---

const NavItem = ({ number, text }: { number: string; text: string }) => (
  <motion.div 
    className="group flex flex-col gap-1 cursor-pointer"
    whileHover={{ x: 10 }}
  >
    <span className="font-mono text-[10px] text-gray-500">{number}</span>
    <span className="text-3xl font-bold uppercase tracking-tighter border-b-2 border-transparent group-hover:border-black transition-all w-max">
      {text}
    </span>
  </motion.div>
);

const ProjectRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col md:flex-row border-b border-black py-4 md:py-6">
    <div className="w-full md:w-1/3 font-bold text-lg md:text-xl">{label}</div>
    <div className="w-full md:w-2/3 text-lg md:text-xl font-mono opacity-70">{value}</div>
  </div>
);

const ScribbleItem = ({ number, text }: { number: string; text: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex items-center gap-8 py-8 border-b border-black/10 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="font-mono text-xl">{number}.</span>
      <div className="relative">
        <span className="text-6xl md:text-8xl font-black uppercase tracking-tighter relative z-10 group-hover:text-white transition-colors duration-300">
          {text}
        </span>
        <motion.div 
          className="absolute inset-0 text-black z-0 pointer-events-none -top-2 -left-4 w-[110%]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "circOut" }}
          style={{ originX: 0 }}
        >
          <Scribble className="w-full h-full" />
        </motion.div>
      </div>
    </div>
  );
};

// --- Main Page ---

export default function BrutalistScribblePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="bg-[#EBEBEB] text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-start z-50 mix-blend-difference text-[#EBEBEB]">
        <div className="flex gap-1">
          <span className="text-4xl font-bold text-[#FF4D00]">AI</span>
          <span className="text-4xl font-bold">MINDSET</span>
        </div>
        <div className="flex gap-8 text-sm font-bold uppercase tracking-widest">
          <span className="hidden md:inline">Work</span>
          <span className="hidden md:inline">About</span>
          <span className="text-[#FF4D00]">Contact</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen pt-32 px-4 md:px-12 relative overflow-hidden flex flex-col justify-center">
        {/* Floating Blobs */}
        <motion.div 
          className="absolute top-20 right-[10%] w-64 h-64 text-black z-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Blob1 />
        </motion.div>
        <motion.div 
          className="absolute bottom-20 left-[5%] w-48 h-48 text-black z-0"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <Blob2 />
        </motion.div>

        <div className="relative z-10 max-w-[90vw]">
          <h1 className="text-[12vw] leading-[0.85] font-black uppercase tracking-tighter text-justify">
            PERSONAL<br/>
            OPERATIONAL<br/>
            SYSTEM
          </h1>
          
          <div className="mt-12 flex flex-col md:flex-row gap-12 md:items-end">
            <p className="font-bold text-2xl md:text-3xl max-w-2xl leading-tight uppercase">
              From chaos to a working AI system tailored for you.
              <span className="block mt-4 text-[#FF4D00]">March 2 — March 14, 2026</span>
            </p>
            <div className="font-mono text-sm uppercase tracking-widest opacity-60">
              Batch: Sprint-X26<br/>
              Status: Open
            </div>
          </div>
        </div>
      </section>

      {/* Project Details (Split Layout) */}
      <section className="border-t-4 border-black">
        <div className="flex flex-col lg:flex-row">
          {/* Left: Details */}
          <div className="w-full lg:w-1/2 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-black">
            <h2 className="text-6xl font-bold mb-12 uppercase tracking-tighter">Overview</h2>
            
            <div className="mb-12">
              <ProjectRow label="Project" value="AI Mindset POS" />
              <ProjectRow label="Type" value="Educational Sprint" />
              <ProjectRow label="Brand" value="Personal OS" />
              <ProjectRow label="Year" value="2026" />
              <ProjectRow label="Technologies" value="Claude, Obsidian, Cursor" />
            </div>

            <div className="prose prose-xl font-medium leading-snug">
              <p>
                POS is not a tool, it is an operating system with a personal AI assistant. A layer of rules, context, and constraints that makes tools work.
              </p>
              <p className="mt-8">
                Imagine: in the morning, the agent gives a plan for the day based on your energy level. During the day, it reminds you of a meeting. In the evening, it finds open tasks.
              </p>
            </div>
          </div>

          {/* Right: Visuals */}
          <div className="w-full lg:w-1/2 bg-[#1a1a1a] text-[#EBEBEB] p-6 md:p-12 relative overflow-hidden flex flex-col justify-between">
            {/* Metal Grate Texture Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
              style={{
                backgroundImage: `radial-gradient(circle, #333 2px, transparent 2.5px)`,
                backgroundSize: '12px 12px'
              }}
            />

            <div className="relative z-10">
              <div className="bg-[#FF4D00] text-black w-full aspect-square max-w-md mx-auto p-8 flex flex-col justify-center items-center rotate-3 hover:rotate-0 transition-transform duration-500">
                <h3 className="text-8xl font-black uppercase tracking-tighter leading-none text-center">
                  NEVER<br/>GO<br/>CHAOTIC
                </h3>
                <p className="mt-4 font-mono text-xs uppercase tracking-widest">
                  The Design Studio of AI Mindset
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-12">
               <div className="text-[10vw] font-black leading-none opacity-10 select-none">
                 SPRINT
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scribble List Section */}
      <section className="py-32 px-4 md:px-12 bg-[#EBEBEB]">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-sm uppercase tracking-widest mb-12 border-b border-black pb-2">
            Selected Modules
          </div>
          
          <div className="flex flex-col">
            <ScribbleItem number="01" text="Context" />
            <ScribbleItem number="02" text="Architecture" />
            <ScribbleItem number="03" text="Tools" />
            <ScribbleItem number="04" text="Skills" />
            <ScribbleItem number="05" text="Feedback" />
            <ScribbleItem number="06" text="Join" />
          </div>
        </div>
      </section>

      {/* Dark Footer Navigation */}
      <section className="bg-black text-white py-32 px-4 md:px-12 min-h-screen flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-8">
            <div className="font-mono text-xs text-gray-500 mb-4">001 — GUIDES</div>
            <NavItem number="01" text="Dmitry" />
            <NavItem number="02" text="Ksenia" />
            <NavItem number="03" text="Igor" />
          </div>

          <div className="space-y-8">
            <div className="font-mono text-xs text-gray-500 mb-4">002 — MODULES</div>
            <NavItem number="04" text="Context" />
            <NavItem number="05" text="Architecture" />
            <NavItem number="06" text="Tools" />
          </div>

          <div className="space-y-8 text-right md:text-left">
            <div className="font-mono text-xs text-gray-500 mb-4">003 — INFO</div>
            <NavItem number="07" text="About" />
            <NavItem number="08" text="Join" />
            <NavItem number="09" text="Contact" />
          </div>
        </div>

        <div className="mt-32 flex flex-col md:flex-row justify-between items-end font-mono text-xs uppercase tracking-widest opacity-60">
          <div>
            AI Mindset POS Sprint<br/>
            Batch X26 — 2026
          </div>
          <div className="mt-8 md:mt-0 text-right">
            Never go chaotic<br/>
            Build your system
          </div>
        </div>
      </section>

    </div>
  );
}
