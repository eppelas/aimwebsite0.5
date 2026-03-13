import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Menu, Plus, Minus } from 'lucide-react';

const SwissStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=JetBrains+Mono:wght@400;700&display=swap');
    
    .font-swiss { font-family: 'Inter', sans-serif; }
    .font-mono-swiss { font-family: 'JetBrains Mono', monospace; }
    
    .text-outline {
      -webkit-text-stroke: 1px white;
      color: transparent;
    }
    
    .text-outline-thick {
      -webkit-text-stroke: 2px white;
      color: transparent;
    }

    .text-outline-blue {
      -webkit-text-stroke: 2px #3B82F6;
      color: transparent;
    }

    .text-outline-orange {
      -webkit-text-stroke: 2px #F97316;
      color: transparent;
    }
    
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

const Section = ({ 
  letter, 
  children, 
  className = "" 
}: { 
  letter: string, 
  children: React.ReactNode, 
  className?: string 
}) => (
  <div className={`border-t border-white/20 py-12 md:py-24 px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 ${className}`}>
    <div className="md:col-span-1 font-mono-swiss text-xl md:text-2xl text-white/50">{letter}</div>
    <div className="md:col-span-11">
      {children}
    </div>
  </div>
);

const AccordionItem = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/20 last:border-b-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:bg-white/5 transition-colors px-4 -mx-4"
      >
        <span className="font-swiss text-xl md:text-2xl font-medium">{title}</span>
        {isOpen ? <Minus /> : <Plus />}
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="pb-8 text-white/70 leading-relaxed max-w-2xl">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default function AiMindsetSwissPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-black text-white selection:bg-white selection:text-black hide-scrollbar font-swiss">
      <SwissStyles />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-start px-6 md:px-12 py-6 mix-blend-difference">
        <div className="font-swiss font-bold tracking-tight text-xl">
          ai mindset
        </div>
        
        <div className="flex items-start gap-8">
          <div className="hidden md:block text-right font-mono-swiss text-xs opacity-70">
            <div>MAR 2 — MAR 14</div>
            <div>BATCH X26</div>
          </div>
          
          <div className="relative group cursor-pointer">
            <div className="w-12 h-12 bg-[#0055FF] relative flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110">
              <div className="absolute top-0 right-0 w-4 h-4 bg-white transform translate-x-1/2 -translate-y-1/2 rotate-45"></div>
              <Menu className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-24">
        
        {/* Hero */}
        <div className="px-6 md:px-12 mb-24 md:mb-48">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-mono-swiss text-sm md:text-base mb-4 text-[#0055FF]">
              introducing
            </div>
            <h1 className="text-[15vw] leading-[0.8] font-bold tracking-tighter mb-8">
              <span className="block">Personal</span>
              <span className="block italic font-light">Operational</span>
              <span className="block text-outline-thick">System</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-24">
            <div className="text-2xl md:text-4xl font-light leading-tight">
              From chaos of tools to a working AI system, tailored for you.
            </div>
            <div className="flex flex-col justify-end items-start">
              <p className="text-white/60 max-w-md mb-8">
                POS is not a tool, it's an operating system with a personal AI assistant. A layer of rules, context, and restrictions that makes tools work for you.
              </p>
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#0055FF] hover:text-white transition-colors">
                Join Sprint X26
              </button>
            </div>
          </div>
        </div>

        {/* Section A: What is POS */}
        <Section letter="A">
          <h2 className="text-4xl md:text-6xl font-bold mb-12 max-w-4xl">
            Imagine an agent that knows your energy levels.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/20 pt-8">
            {[
              { title: "Morning", desc: "Agent gives you a day plan based on your energy level and priorities." },
              { title: "Day", desc: "Reminds you of a meeting with a prepared brief and context." },
              { title: "Evening", desc: "Finds unclosed tasks and blockers, provides a summary of the day." }
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="font-mono-swiss text-[#0055FF] mb-4">0{i+1}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Section B: Typography / Visual Break */}
        <Section letter="B" className="overflow-hidden">
          <div className="relative">
            <motion.div 
              className="whitespace-nowrap text-[10vw] font-bold leading-none text-outline opacity-30"
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              CONTEXT • ARCHITECTURE • TOOLS • SKILLS • 
            </motion.div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center">
              <h2 className="text-4xl md:text-6xl font-bold bg-black/50 backdrop-blur-sm p-4">
                We distilled real cases from real founders.
              </h2>
            </div>
          </div>
        </Section>

        {/* Section C: Guides */}
        <Section letter="C">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <h2 className="text-4xl md:text-6xl font-bold">Your Guides</h2>
            <p className="text-white/60 max-w-xs mt-4 md:mt-0">
              We live in these processes every day — building systems, agents, and skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Alexander Povalyaev", role: "Founder AI Mindset", handle: "@alex_named_ai", color: "bg-[#0055FF]" },
              { name: "Sergey Khabarov", role: "System Architect", handle: "@alliknowisthatidontknownothing", color: "bg-[#F97316]" },
              { name: "Seryozha Ris", role: "AI Evangelist", handle: "@ris_ai", color: "bg-[#10B981]" }
            ].map((guide, i) => (
              <div key={i} className="group relative aspect-[3/4] overflow-hidden border border-white/20">
                <div className={`absolute inset-0 ${guide.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                <img 
                  src={`https://picsum.photos/seed/${guide.handle}/800/1000`} 
                  alt={guide.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-xl font-bold leading-tight">{guide.name}</h3>
                  <p className="text-sm font-mono-swiss text-white/70 mt-1">{guide.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Section D: Program / Outline */}
        <Section letter="D">
          <div className="relative">
             <h2 className="text-[8vw] leading-none font-bold mb-8 relative z-10 mix-blend-difference">
               <span className="text-outline-blue">out</span><span className="text-white">line</span>
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                 <p className="text-xl leading-relaxed mb-8">
                   You leave with a working system, not just notes.
                 </p>
                 <ul className="space-y-4 font-mono-swiss text-sm">
                   <li className="flex items-center gap-4">
                     <span className="w-2 h-2 bg-[#0055FF]" />
                     Collected Context
                   </li>
                   <li className="flex items-center gap-4">
                     <span className="w-2 h-2 bg-[#0055FF]" />
                     Logical Architecture
                   </li>
                   <li className="flex items-center gap-4">
                     <span className="w-2 h-2 bg-[#0055FF]" />
                     Connected Tools (Claude, Cursor, Obsidian)
                   </li>
                   <li className="flex items-center gap-4">
                     <span className="w-2 h-2 bg-[#0055FF]" />
                     Working Skills & Rules
                   </li>
                 </ul>
               </div>
               
               <div className="border border-white/20 p-8 relative overflow-hidden group hover:border-[#0055FF] transition-colors">
                  <div className="absolute top-4 right-4 text-[#0055FF] font-mono-swiss text-xs">BATCH X26</div>
                  <h3 className="text-2xl font-bold mb-2">Sprint Access</h3>
                  <div className="text-4xl font-bold mb-6">$499</div>
                  <p className="text-sm text-white/60 mb-8">
                    Alumni (-20%), Bring a Friend (-10%). Refund within first 4 days — no questions asked.
                  </p>
                  <button className="w-full py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-[#0055FF] hover:text-white transition-colors">
                    Apply Now
                  </button>
               </div>
             </div>
          </div>
        </Section>

        {/* Section E: FAQ */}
        <Section letter="E">
          <h2 className="text-4xl font-bold mb-12">FAQ</h2>
          <div className="max-w-3xl">
            <AccordionItem title="Organization and processes">
              The sprint runs for 2 weeks. We have daily check-ins, workshops, and async communication in our private community.
            </AccordionItem>
            <AccordionItem title="Expectations and results">
              You will build a personalized system. It's hands-on. Expect to spend 5-10 hours per week.
            </AccordionItem>
            <AccordionItem title="Payment and conditions">
              We accept cards and crypto. Payment in Rubles is possible.
            </AccordionItem>
            <AccordionItem title="Non-profit / Art sphere?">
              We offer scholarships for impactful projects. Reach out to us.
            </AccordionItem>
          </div>
        </Section>

        {/* Footer */}
        <footer className="border-t border-white/20 py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <div className="font-swiss font-bold tracking-tight text-xl mb-4">
              ai mindset
            </div>
            <div className="flex gap-6 font-mono-swiss text-xs text-white/50">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Public Offer</a>
            </div>
          </div>

          <div className="flex gap-4">
             <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors rounded-full">
               <span className="sr-only">Telegram</span>
               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.623 4.823-4.35c.212-.191-.053-.299-.304-.107l-6.475 4.062-2.912-.915c-.632-.197-.64-.627.132-.938l11.356-4.375c.525-.198.985.122.84.851z"/></svg>
             </a>
             <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors rounded-full">
               <span className="sr-only">YouTube</span>
               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
             </a>
          </div>
        </footer>

      </main>
    </div>
  );
}
