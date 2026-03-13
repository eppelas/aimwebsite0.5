import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Circle, X } from 'lucide-react';

// --- Styles ---

const WavelengthStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

    .font-inter { font-family: 'Inter', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    
    .scanline {
      background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 51%);
      background-size: 100% 4px;
      pointer-events: none;
    }

    .noise-overlay {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E");
      pointer-events: none;
    }
  `}</style>
);

// --- Components ---

const BarcodeColumn = ({ height, delay }: { height: string, delay: number }) => (
  <motion.div
    initial={{ scaleY: 0 }}
    whileInView={{ scaleY: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay, ease: "circOut" }}
    className="w-1 bg-white/20 origin-bottom"
    style={{ height }}
  />
);

const DataBlock = ({ label, value, color = "bg-white", textColor = "text-black" }: { label: string, value: string, color?: string, textColor?: string }) => (
  <div className={`p-6 ${color} ${textColor} flex flex-col justify-between h-48 md:h-64 relative group overflow-hidden transition-all duration-300 hover:scale-[1.02]`}>
    <div className="font-mono text-[10px] uppercase tracking-widest opacity-60">{label}</div>
    <div className="font-inter text-2xl md:text-4xl font-medium leading-tight max-w-[90%] z-10">
      {value}
    </div>
    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <ArrowUpRight className="w-6 h-6" />
    </div>
    {/* Abstract decoration */}
    <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-black/5 rounded-full blur-2xl group-hover:bg-black/10 transition-colors" />
  </div>
);

const WavelengthHeader = () => {
  return (
    <div className="relative py-24 md:py-32 px-6 border-b border-black/10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-baseline gap-4 md:gap-8"
        >
          <h1 className="text-[10vw] md:text-[8vw] leading-[0.8] font-medium tracking-tighter">
            [AI_MINDSET]
          </h1>
          <span className="font-mono text-sm md:text-xl uppercase tracking-widest opacity-60">
            POS {'{SPRINT}'}
          </span>
        </motion.div>
        
        <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-8">
          <p className="max-w-xl text-lg md:text-xl leading-relaxed opacity-80">
            From chaos of tools to a working AI system tailored for you.
            A layer of rules, context, and constraints.
          </p>
          <div className="font-mono text-xs text-right space-y-1 opacity-50">
            <div>BATCH: SPRINT-X26</div>
            <div>STATUS: OPEN</div>
          </div>
        </div>
      </div>
      
      {/* Background Stripes */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none flex flex-col justify-between">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="w-full h-4 bg-black" />
        ))}
      </div>
    </div>
  );
};

const TimelineBlock = ({ step, title, desc, color }: { step: string, title: string, desc: string, color: string }) => (
  <div className="flex flex-col md:flex-row border-t border-black/10 group">
    <div className={`w-full md:w-1/4 p-6 ${color} transition-colors duration-500 flex items-start`}>
      <span className="font-mono text-sm font-bold">{step}</span>
    </div>
    <div className="w-full md:w-3/4 p-6 md:p-8 flex flex-col justify-center group-hover:bg-gray-50 transition-colors duration-300">
      <h3 className="text-xl md:text-2xl font-medium mb-2">{title}</h3>
      <p className="text-black/60 leading-relaxed max-w-2xl">{desc}</p>
    </div>
  </div>
);

// --- Main Page ---

export default function WavelengthDataPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="min-h-screen bg-[#EAEAEA] text-[#111] font-inter selection:bg-[#0033CC] selection:text-white overflow-x-hidden" ref={containerRef}>
      <WavelengthStyles />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-start z-50 mix-blend-multiply pointer-events-none">
        <div className="pointer-events-auto">
          <div className="w-4 h-4 bg-[#0033CC]" />
        </div>
        <div className="pointer-events-auto flex gap-6 font-mono text-[10px] uppercase tracking-widest">
           <a href="#" className="hover:text-[#0033CC]">Program</a>
           <a href="#" className="hover:text-[#0033CC]">Research</a>
           <a href="#" className="hover:text-[#0033CC]">Join</a>
        </div>
      </nav>

      <main>
        <WavelengthHeader />

        {/* Blue/Grey Blocks Section - The System */}
        <section className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <DataBlock 
              label="01. Context" 
              value="AI knows who you are & how you work." 
              color="bg-[#0033CC]" 
              textColor="text-white"
            />
            <DataBlock 
              label="02. Architecture" 
              value="Logical structure that protects your data." 
              color="bg-[#B0B0B0]" 
            />
            <DataBlock 
              label="03. Tools" 
              value="Claude Code, Cursor, Obsidian, MCP." 
              color="bg-[#EAEAEA]" 
            />
            <DataBlock 
              label="04. Skills" 
              value="Automating routine tasks & workflows." 
              color="bg-[#111]" 
              textColor="text-white"
            />
          </div>
        </section>

        {/* Vertical Barcode Section - Research Stats */}
        <section className="bg-[#1A1A1A] text-white py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 flex justify-between px-4 opacity-20 pointer-events-none">
            {[...Array(40)].map((_, i) => (
              <BarcodeColumn key={i} height={`${Math.random() * 80 + 20}%`} delay={Math.random() * 0.5} />
            ))}
          </div>

          <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-[#0033CC] mb-6">Research Phase</h2>
              <p className="text-3xl md:text-5xl font-medium leading-tight mb-8">
                We spent 6 months analyzing how founders build their POS.
              </p>
              <p className="text-white/60 text-lg leading-relaxed max-w-md">
                We deconstructed their architectures and stacks. We found what works and what doesn't. This sprint is a distillate of real cases.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="border border-white/20 p-6">
                  <div className="text-4xl font-mono mb-2">6</div>
                  <div className="text-xs uppercase opacity-50">Months Research</div>
               </div>
               <div className="border border-white/20 p-6">
                  <div className="text-4xl font-mono mb-2">15+</div>
                  <div className="text-xs uppercase opacity-50">Years Experience</div>
               </div>
               <div className="border border-white/20 p-6">
                  <div className="text-4xl font-mono mb-2">500+</div>
                  <div className="text-xs uppercase opacity-50">Students Trained</div>
               </div>
               <div className="border border-white/20 p-6 bg-white text-black">
                  <div className="text-4xl font-mono mb-2">100%</div>
                  <div className="text-xs uppercase opacity-50">Real Cases</div>
               </div>
            </div>
          </div>
        </section>

        {/* Timeline / Workflow Section */}
        <section className="bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto">
             <div className="p-6 md:p-12 border-b border-black/10">
                <h2 className="text-4xl font-medium tracking-tight">Daily Workflow</h2>
             </div>
             
             <TimelineBlock 
                step="AM" 
                title="Morning Plan" 
                desc="Agent gives a day plan based on your energy level and priorities." 
                color="bg-[#D1D5DB]"
             />
             <TimelineBlock 
                step="NOON" 
                title="Meeting Prep" 
                desc="Reminds about the meeting, prepares a brief." 
                color="bg-[#9CA3AF]"
             />
             <TimelineBlock 
                step="PM" 
                title="Evening Review" 
                desc="Finds unclosed tasks and blockers, gives a summary." 
                color="bg-[#6B7280] text-white"
             />
          </div>
        </section>
        
        {/* Pricing / CTA */}
        <section className="py-32 px-6 bg-white relative overflow-hidden">
           <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="text-[6vw] leading-none font-medium tracking-tighter mb-8">
                 LEAVE THE OPS TO AI.
              </h2>
              <p className="text-xl text-black/60 mb-12">
                 Keep your resources for what matters.
              </p>
              
              <div className="flex flex-col md:flex-row justify-center gap-6">
                 <button className="bg-[#0033CC] text-white px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-black transition-colors">
                    Apply for Sprint
                 </button>
                 <button className="border border-black/10 px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-black/5 transition-colors">
                    Read Manifesto
                 </button>
              </div>
           </div>
           
           {/* Decorative noise */}
           <div className="absolute inset-0 noise-overlay opacity-50 mix-blend-multiply" />
        </section>

        {/* Footer */}
        <footer className="bg-[#111] text-white p-12 border-t border-white/10">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="flex flex-col gap-2">
                 <span className="font-mono text-xs uppercase tracking-widest text-[#0033CC]">AI Mindset POS</span>
                 <span className="text-sm opacity-50">© 2026</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-xs uppercase tracking-widest opacity-70">
                 <a href="#" className="hover:text-white transition-colors">Podcast</a>
                 <a href="#" className="hover:text-white transition-colors">Telegram</a>
                 <a href="#" className="hover:text-white transition-colors">Offer</a>
                 <a href="#" className="hover:text-white transition-colors">Privacy</a>
              </div>
           </div>
        </footer>

      </main>
    </div>
  );
}
