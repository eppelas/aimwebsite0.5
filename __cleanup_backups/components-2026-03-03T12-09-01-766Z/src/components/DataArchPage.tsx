import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Plus, Minus, Circle } from 'lucide-react';

const ArchStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
    
    .font-inter { font-family: 'Inter', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    .font-serif-arch { font-family: 'Playfair Display', serif; }
    
    .arch-grid {
      background-size: 40px 40px;
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    }
  `}</style>
);

const LevelItem = ({ level, title, range, description, delay }: { level: string, title: string, range: string, description: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className="flex flex-col gap-2 group cursor-pointer"
  >
    <div className="flex items-baseline gap-3 text-white/40 group-hover:text-white transition-colors duration-300">
      <span className="font-serif-arch italic text-lg">{level}</span>
      <span className="h-[1px] flex-grow bg-white/20 group-hover:bg-white/60 transition-colors" />
      <span className="font-mono text-xs">{range}</span>
    </div>
    <h3 className="text-xl font-inter font-light text-white/90">{title}</h3>
    <p className="text-sm text-white/50 max-w-xs leading-relaxed">{description}</p>
  </motion.div>
);

const TickMark = ({ label, y }: { label?: string, y: string }) => (
  <div className="absolute left-0 w-full flex items-center" style={{ top: y }}>
    <div className="w-4 h-[1px] bg-white/30" />
    {label && <span className="ml-4 font-mono text-[10px] text-white/30 uppercase tracking-widest">{label}</span>}
  </div>
);

export default function DataArchPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const archScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const archOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-inter selection:bg-white selection:text-black overflow-x-hidden" ref={containerRef}>
      <ArchStyles />

      {/* Fixed Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 arch-grid opacity-50" />
        
        {/* The Great Arch */}
        <motion.div 
          style={{ scale: archScale, opacity: archOpacity }}
          className="absolute inset-0 flex items-end justify-center translate-y-[40vh]"
        >
          <div className="w-[150vw] h-[150vw] rounded-full border border-white/20" />
        </motion.div>
        
        {/* Y-Axis Ticks */}
        <div className="absolute left-8 top-0 bottom-0 w-24 flex flex-col justify-between py-32 hidden md:flex">
          <TickMark y="10%" label="System" />
          <TickMark y="30%" label="Agents" />
          <TickMark y="50%" label="Context" />
          <TickMark y="70%" label="Tools" />
          <TickMark y="90%" label="Base" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 mix-blend-difference">
        <div className="font-mono text-xs uppercase tracking-widest flex items-center gap-2">
          <img
            src="/assets/ai-mindset-logo.png"
            alt="AI Mindset logo"
            className="h-3.5 w-auto object-contain opacity-90"
          />
          <span>AI Mindset POS <span className="opacity-50">{'{Sprint}'}</span></span>
        </div>
        <div className="flex gap-8 font-mono text-xs uppercase tracking-widest">
          <a href="#" className="hover:underline decoration-1 underline-offset-4">Index</a>
          <a href="#" className="hover:underline decoration-1 underline-offset-4">Apply</a>
        </div>
      </nav>

      <main className="relative z-10">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <div className="font-serif-arch italic text-2xl md:text-3xl text-white/60 mb-6">
              Personal Operational System
            </div>
            <h1 className="text-[12vw] md:text-[8vw] leading-[0.85] font-light tracking-tight mb-12">
              POS <span className="font-serif-arch italic font-normal">{'{sprint}'}</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 font-mono text-xs uppercase tracking-widest text-white/60">
              <span>Batch: Sprint-X26</span>
              <span className="w-1 h-1 bg-white rounded-full" />
              <span>Mar 02 — Mar 14, 2026</span>
              <span className="w-1 h-1 bg-white rounded-full" />
              <span>Status: Open</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 left-0 w-full flex justify-center"
          >
             <ArrowRight className="w-6 h-6 rotate-90 text-white/30 animate-bounce" />
          </motion.div>
        </section>

        {/* Definition Section */}
        <section className="min-h-[80vh] flex items-center justify-center px-6 py-24 relative">
          <div className="max-w-2xl text-center md:text-left md:absolute md:left-[20%]">
            <h2 className="text-3xl md:text-5xl font-light leading-tight mb-8">
              Not a tool.<br/>
              <span className="font-serif-arch italic text-white/50">An operating system.</span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              A layer of rules, context, and constraints that forces your tools to work for you. 
              From the chaos of disconnected apps to a unified AI system tailored to your mind.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
               <div>
                 <div className="font-mono text-xs text-white/40 mb-2">INPUT</div>
                 <div className="text-sm">Chaos of tools, scattered notes, missed deadlines.</div>
               </div>
               <div>
                 <div className="font-mono text-xs text-white/40 mb-2">OUTPUT</div>
                 <div className="text-sm">Structured context, automated briefs, clear focus.</div>
               </div>
            </div>
          </div>
        </section>

        {/* Levels / Architecture Section */}
        <section className="min-h-screen flex items-center px-6 py-24">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mt-24">
            <LevelItem 
              level="Level 1" 
              title="Context" 
              range="Day 1-3"
              description="AI learns who you are, how you work, and what matters to you."
              delay={0.1}
            />
            <LevelItem 
              level="Level 2" 
              title="Architecture" 
              range="Day 4-7"
              description="Building the logical structure. Protecting data. Setting boundaries."
              delay={0.2}
            />
            <LevelItem 
              level="Level 3" 
              title="Tools" 
              range="Day 8-10"
              description="Connecting Claude Code, Cursor, Obsidian, and MCP into a network."
              delay={0.3}
            />
            <LevelItem 
              level="Level 4" 
              title="Skills" 
              range="Day 11-14"
              description="Automating routine. Creating agents that think like you."
              delay={0.4}
            />
          </div>
        </section>

        {/* Mentors Section - Horizontal Scroll feel */}
        <section className="py-32 border-t border-white/10 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24">
              <h2 className="text-4xl font-light">Architects</h2>
              <p className="font-serif-arch italic text-white/50 text-xl mt-4 md:mt-0">
                Builders living in the process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
              {[
                { name: "Alexander Povalyaev", role: "Strategist", desc: "15+ years connecting tech, business & people." },
                { name: "Sergey Khabarov", role: "System Architect", desc: "6+ years in EdTech. 500+ students trained." },
                { name: "Seryozha Ris", role: "AI Evangelist", desc: "Ex-Yandex. Founder of @vibecod3rs. Claude Code streamer." }
              ].map((mentor, i) => (
                <div key={i} className="bg-[#0A0A0A] p-8 md:p-12 hover:bg-white/5 transition-colors duration-300 group">
                  <div className="w-12 h-12 rounded-full border border-white/20 mb-8 flex items-center justify-center group-hover:border-white group-hover:scale-110 transition-all">
                    <span className="font-serif-arch italic">{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">{mentor.name}</h3>
                  <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-6">{mentor.role}</div>
                  <p className="text-white/60 text-sm leading-relaxed">{mentor.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing / CTA */}
        <section className="min-h-[70vh] flex flex-col justify-center items-center px-6 relative overflow-hidden">
          {/* Abstract Circle Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
             <div className="w-[80vw] h-[80vw] border border-white rounded-full animate-[spin_60s_linear_infinite]" />
             <div className="absolute w-[60vw] h-[60vw] border border-white rounded-full animate-[spin_40s_linear_infinite_reverse]" />
             <div className="absolute w-[40vw] h-[40vw] border border-white rounded-full animate-[spin_20s_linear_infinite]" />
          </div>

          <div className="relative z-10 text-center max-w-3xl">
            <div className="font-mono text-xs uppercase tracking-widest text-white/40 mb-8">
              Join the Sprint
            </div>
            <h2 className="text-5xl md:text-7xl font-serif-arch italic mb-12">
              Free your mind.<br/>
              <span className="font-inter not-italic font-light text-3xl md:text-5xl block mt-4 text-white/70">Leave the ops to AI.</span>
            </h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button className="px-8 py-4 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-white/90 transition-colors w-full md:w-auto">
                Apply for Sprint
              </button>
              <button className="px-8 py-4 border border-white/20 font-mono text-xs uppercase tracking-widest hover:bg-white/10 transition-colors w-full md:w-auto">
                Read Manifesto
              </button>
            </div>
            
            <div className="mt-16 flex justify-center gap-8 text-xs font-mono text-white/30">
              <span>Alumni -20%</span>
              <span>Bring a Friend -10%</span>
              <span>Money-back Guarantee</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/10 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="font-serif-arch italic text-lg">AI Mindset</div>
             <div className="flex gap-6 font-mono text-[10px] text-white/40 uppercase tracking-widest">
                <a href="#" className="hover:text-white">Telegram</a>
                <a href="#" className="hover:text-white">YouTube</a>
                <a href="#" className="hover:text-white">Privacy</a>
             </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
