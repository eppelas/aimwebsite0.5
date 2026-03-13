import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, Menu } from 'lucide-react';

const TypographyStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;900&family=Inter:wght@300;400;500;600&display=swap');
    
    .font-serif-display { font-family: 'Playfair Display', serif; }
    .font-sans-body { font-family: 'Inter', sans-serif; }
    
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    
    .vertical-text {
      writing-mode: vertical-rl;
      text-orientation: mixed;
      transform: rotate(180deg);
    }
  `}</style>
);

const Section = ({ number, title, description, image }: { number: string, title: string, description: string, image?: string }) => {
  return (
    <div className="relative min-h-[80vh] border-b border-black/10 flex flex-col md:flex-row overflow-hidden group">
      {/* Huge Number Background */}
      <div className="absolute top-0 left-0 md:left-12 text-[20rem] md:text-[30rem] leading-none font-serif-display font-black text-black/5 select-none pointer-events-none z-0 transform -translate-y-1/4 md:-translate-y-0">
        {number}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full md:w-1/2 p-8 md:p-24 flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-sans-body text-xs font-bold tracking-[0.2em] uppercase bg-black text-white px-3 py-1">
            Module {number}
          </span>
          <div className="h-[1px] w-12 bg-black/20"></div>
        </div>
        
        <h2 className="font-serif-display text-5xl md:text-7xl mb-8 leading-[0.9] mix-blend-multiply">
          {title}
        </h2>
        
        <p className="font-sans-body text-lg md:text-xl leading-relaxed text-black/70 max-w-md border-l-2 border-black/10 pl-6">
          {description}
        </p>

        <button className="mt-12 flex items-center gap-2 text-sm font-bold uppercase tracking-widest group-hover:gap-4 transition-all duration-300">
          Explore <ArrowRight size={16} />
        </button>
      </div>

      {/* Image Side */}
      <div className="relative w-full md:w-1/2 h-[50vh] md:h-auto border-t md:border-t-0 md:border-l border-black/10 overflow-hidden">
        {image ? (
          <>
            <motion.img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none" />
          </>
        ) : (
          <div className="w-full h-full bg-[#E5E5E5] flex items-center justify-center">
            <div className="w-32 h-32 border border-black/20 rounded-full animate-spin-slow" />
          </div>
        )}
        
        {/* Vertical Label */}
        <div className="absolute top-8 right-8 font-sans-body text-[10px] font-bold tracking-[0.3em] uppercase vertical-text text-white mix-blend-difference">
          System Component
        </div>
      </div>
    </div>
  );
};

export default function AiMindsetTypographyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-[#F5F5F5] text-[#1A1A1A] selection:bg-black selection:text-white hide-scrollbar">
      <TypographyStyles />
      
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 mix-blend-difference text-white">
        <div className="font-serif-display text-2xl font-bold italic">
          Ai.
        </div>
        <div className="font-sans-body text-[10px] font-bold tracking-[0.3em] uppercase hidden md:block">
          Personal Operating System
        </div>
        <Menu className="w-6 h-6 cursor-pointer" />
      </header>

      {/* Progress Bar */}
      <div className="fixed left-0 top-0 bottom-0 w-1 z-50 bg-black/5">
        <motion.div 
          className="w-full bg-black"
          style={{ height: y }}
        />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col relative border-b border-black/10">
        <div className="flex-1 flex flex-col justify-center px-6 md:px-24 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-serif-display text-[15vw] leading-[0.8] tracking-tighter">
              AI<br/>
              <span className="ml-[10vw] italic font-light">Mindset</span>
            </h1>
          </motion.div>
          
          <div className="mt-12 md:mt-24 flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-md">
              <p className="font-sans-body text-sm md:text-base font-medium leading-relaxed uppercase tracking-wide">
                A layer of rules, context, and restrictions that makes tools work for you.
              </p>
            </div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="w-8 h-8 md:w-12 md:h-12 opacity-50" />
            </motion.div>
          </div>
        </div>
        
        {/* Marquee */}
        <div className="border-t border-black/10 py-4 overflow-hidden whitespace-nowrap bg-black text-white">
          <motion.div 
            className="inline-block font-sans-body text-sm font-bold tracking-[0.5em] uppercase"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            System Architecture • Context • Tools • Skills • Agents • Automation • System Architecture • Context • Tools • Skills • Agents • Automation •
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <main>
        <Section 
          number="01"
          title="Context"
          description="AI knows who you are, how you work, and what matters to you. A deep understanding of your personal workflow."
          image="https://picsum.photos/seed/context/1200/1600"
        />
        
        <Section 
          number="02"
          title="Architecture"
          description="A system that won't delete files without asking. Structured, safe, and built for scale."
          image="https://picsum.photos/seed/architecture/1200/1600"
        />
        
        <Section 
          number="03"
          title="Tools"
          description="Seamless integration with Claude Code, Cursor, Obsidian, and MCP. Your stack, unified."
          image="https://picsum.photos/seed/tools/1200/1600"
        />
        
        <Section 
          number="04"
          title="Skills"
          description="Automation of routine tasks. Agents that handle the busywork so you can focus on strategy."
          image="https://picsum.photos/seed/skills/1200/1600"
        />
      </main>

      {/* Team / Footer Section */}
      <section className="min-h-screen bg-[#1A1A1A] text-[#F5F5F5] px-6 md:px-24 py-24 flex flex-col justify-between">
        <div>
          <h2 className="font-serif-display text-6xl md:text-8xl mb-16">The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/20 pt-12">
            {[
              { name: "Alexander Povalyaev", role: "Founder" },
              { name: "Sergey Khabarov", role: "Architect" },
              { name: "Seryozha Ris", role: "Evangelist" }
            ].map((member, i) => (
              <div key={i} className="group">
                <div className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50 mb-4">0{i + 1}</div>
                <h3 className="font-serif-display text-3xl md:text-4xl mb-2 group-hover:italic transition-all">{member.name}</h3>
                <p className="font-sans-body text-sm tracking-widest uppercase opacity-70">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="font-serif-display text-[10vw] leading-none opacity-10">
            2026
          </div>
          <div className="flex gap-8 font-sans-body text-xs font-bold tracking-[0.2em] uppercase">
            <a href="#" className="hover:text-white/50 transition-colors">Instagram</a>
            <a href="#" className="hover:text-white/50 transition-colors">Telegram</a>
            <a href="#" className="hover:text-white/50 transition-colors">Youtube</a>
          </div>
        </div>
      </section>
    </div>
  );
}
