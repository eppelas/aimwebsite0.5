import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Circle, X } from 'lucide-react';

// --- Styles ---

const ResourceStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

    .font-inter { font-family: 'Inter', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    
    .texture-noise {
      filter: contrast(170%) brightness(100%);
      background: 
        linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)),
        url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E");
    }

    .stamp-effect {
      mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
      mask-mode: alpha;
      -webkit-mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    }
  `}</style>
);

// --- Components ---

const MenuItem = ({ title, description, price }: { title: string, description?: string, price: string }) => (
  <div className="mb-6 group cursor-pointer">
    <div className="flex items-baseline justify-between border-b border-black/10 pb-1 mb-1 border-dashed group-hover:border-black/40 transition-colors">
      <h3 className="font-inter font-medium text-sm md:text-base">{title}</h3>
      <span className="font-mono text-xs md:text-sm">{price}</span>
    </div>
    {description && (
      <p className="font-inter text-xs text-black/50 max-w-[90%] leading-relaxed">
        {description}
      </p>
    )}
  </div>
);

const MenuSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-12">
    <h2 className="font-mono text-[10px] uppercase tracking-widest mb-6 opacity-40">{title}</h2>
    {children}
  </div>
);

const FunnelBar = ({ width, color, label, index }: { width: string, color: string, label: string, index: number }) => (
  <motion.div 
    initial={{ width: 0, opacity: 0 }}
    whileInView={{ width: width, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
    className={`h-12 md:h-16 ${color} mb-2 flex items-center px-4 relative group`}
  >
    <span className="font-mono text-xs md:text-sm mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity absolute left-2 top-1">
      {index + 1}.
    </span>
    <span className="font-inter font-medium text-sm md:text-lg text-black/80 ml-4">
      {label}
    </span>
  </motion.div>
);

const StampGraphic = () => (
  <div className="w-full aspect-square relative overflow-hidden mix-blend-multiply opacity-80">
     <svg viewBox="0 0 200 200" className="w-full h-full">
        <filter id="roughPaper">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise"/>
            <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="2">
            <feDistantLight azimuth="45" elevation="60"/>
            </feDiffuseLighting>
        </filter>
        
        {/* Bean Shape 1 */}
        <path d="M 50 80 Q 30 50 60 40 Q 90 30 110 60 Q 130 90 100 110 Q 70 130 50 80" fill="#333" className="stamp-effect" />
        <path d="M 60 60 Q 70 70 90 80" stroke="white" strokeWidth="2" fill="none" className="stamp-effect" />

        {/* Bean Shape 2 */}
        <path d="M 140 140 Q 120 110 150 100 Q 180 90 190 120 Q 200 150 170 170 Q 140 190 140 140" fill="#333" className="stamp-effect" />
        <path d="M 150 120 Q 160 130 180 140" stroke="white" strokeWidth="2" fill="none" className="stamp-effect" />
        
        {/* Bean Shape 3 */}
        <path d="M 40 160 Q 20 130 50 120 Q 80 110 90 140 Q 100 170 70 190 Q 40 210 40 160" fill="#333" className="stamp-effect" />
     </svg>
  </div>
);

// --- Main Page ---

export default function ResourceCoffeePage() {
  return (
    <div className="min-h-screen bg-[#F9F9F7] text-[#1A1A1A] font-inter selection:bg-[#FFBD2E] selection:text-black overflow-x-hidden">
      <ResourceStyles />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-start z-50 mix-blend-multiply pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="font-mono text-[10px] tracking-widest uppercase font-bold flex items-center gap-2">
            <img
              src="/assets/ai-mindset-logo.png"
              alt="AI Mindset logo"
              className="h-3.5 w-auto object-contain opacity-85"
            />
            <span>AI Mindset POS</span>
          </h1>
        </div>
        <div className="pointer-events-auto flex gap-4">
           <span className="font-mono text-[10px] uppercase">Sprint-X26</span>
           <span className="font-mono text-[10px] uppercase">Open</span>
        </div>
      </nav>

      <main className="pt-24 px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <section className="mb-24 relative">
          <div className="flex flex-col md:flex-row justify-between items-end border-b border-black pb-8">
            <div className="w-full md:w-2/3">
              <h1 className="text-[12vw] leading-[0.85] font-medium tracking-tighter mb-4">
                P.O.S.<span className="text-4xl align-top font-mono tracking-normal opacity-50">{'{sprint}'}</span>
              </h1>
              <p className="font-inter text-xl md:text-2xl max-w-2xl leading-tight opacity-80">
                Personal Operational System: A system of agents for managing attention, tasks, and knowledge.
              </p>
            </div>
            <div className="w-full md:w-1/3 text-right mt-8 md:mt-0">
               <div className="font-mono text-xs uppercase space-y-1 opacity-60">
                  <p>Batch: Sprint-X26</p>
                  <p>Mar 02 — Mar 14, 2026</p>
                  <p>Status: Applications Open</p>
               </div>
            </div>
          </div>
        </section>

        {/* Content Grid (Menu Style) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
           
           {/* Left Column - Intro & Philosophy */}
           <div className="md:col-span-4 space-y-12">
              <div className="bg-white p-6 shadow-sm border border-black/5">
                 <h3 className="font-mono text-xs uppercase mb-4 opacity-50">The Concept</h3>
                 <p className="text-sm leading-relaxed mb-4">
                    POS is not a tool, it is an operating system with a personal AI assistant. A layer of rules, context, and constraints that makes tools work.
                 </p>
                 <p className="text-sm leading-relaxed">
                    From chaos of tools to a working AI system tailored for you.
                 </p>
              </div>

              <div className="relative">
                 <StampGraphic />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <p className="font-mono text-xs text-white bg-black px-2 py-1 rotate-[-5deg]">
                       NOT A TOOL
                    </p>
                 </div>
              </div>
           </div>

           {/* Right Column - The "Menu" */}
           <div className="md:col-span-8 bg-white p-8 md:p-12 shadow-sm border border-black/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <ArrowDown className="w-12 h-12" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div>
                    <MenuSection title="The System">
                       <MenuItem 
                          title="Context" 
                          description="AI knows who you are, how you work, what is important to you."
                          price="01"
                       />
                       <MenuItem 
                          title="Architecture" 
                          description="Won't delete all files without asking and won't buy a useless course."
                          price="02"
                       />
                       <MenuItem 
                          title="Connected Tools" 
                          description="Claude Code / Cursor / Obsidian / MCP integration."
                          price="03"
                       />
                       <MenuItem 
                          title="Skills & Rules" 
                          description="Automation of routine tasks and defined behaviors."
                          price="04"
                       />
                    </MenuSection>

                    <MenuSection title="Daily Workflow">
                       <MenuItem 
                          title="Morning Plan" 
                          description="Agent gives a day plan based on your energy level and priorities."
                          price="AM"
                       />
                       <MenuItem 
                          title="Meeting Prep" 
                          description="Reminds about the meeting, prepares a brief."
                          price="NOON"
                       />
                       <MenuItem 
                          title="Evening Review" 
                          description="Finds unclosed tasks and blockers, gives a summary."
                          price="PM"
                       />
                    </MenuSection>
                 </div>

                 <div>
                    <MenuSection title="Research">
                       <MenuItem 
                          title="Founder Analysis" 
                          description="6 months researching how founders build their POS."
                          price="R&D"
                       />
                       <MenuItem 
                          title="Real Cases" 
                          description="Distillate of real cases. Proven stacks, not hype tools."
                          price="DATA"
                       />
                    </MenuSection>

                    <MenuSection title="Pricing">
                       <MenuItem 
                          title="Standard Access" 
                          description="Full sprint access, community, tools."
                          price="OPEN"
                       />
                       <MenuItem 
                          title="Alumni" 
                          description="Discount for previous batch members."
                          price="-20%"
                       />
                       <MenuItem 
                          title="Bring a Friend" 
                          description="Discount for you and your friend."
                          price="-10%"
                       />
                    </MenuSection>
                 </div>
              </div>
           </div>
        </section>

        {/* Funnel Chart Section */}
        <section className="mb-32">
           <div className="flex justify-between items-end mb-8">
              <h2 className="text-4xl font-medium tracking-tight">Sprint Structure</h2>
              <span className="font-mono text-xs opacity-50">2 WEEKS / 4 MODULES</span>
           </div>
           
           <div className="w-full flex flex-col items-center">
              <FunnelBar index={0} width="100%" color="bg-[#4A90E2]" label="Context Gathering & Analysis" />
              <FunnelBar index={1} width="85%" color="bg-[#50E3C2]" label="System Architecture Design" />
              <FunnelBar index={2} width="70%" color="bg-[#FF9F43]" label="Tool Integration (Claude/Obsidian)" />
              <FunnelBar index={3} width="55%" color="bg-[#FFD93D]" label="Skill Building & Automation" />
              <FunnelBar index={4} width="40%" color="bg-[#FF6B6B]" label="Testing & Refinement" />
              <FunnelBar index={5} width="25%" color="bg-[#Aab7b8]" label="Final Launch" />
           </div>
        </section>

        {/* Team Section */}
        <section className="mb-32 border-t border-black pt-12">
           <h2 className="font-mono text-[10px] uppercase tracking-widest mb-12 opacity-40">Your Guides</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                 { name: "Alexander Povalyaev", role: "Founder, Strategist", desc: "15+ years connecting tech, business, and people." },
                 { name: "Sergey Khabarov", role: "System Architect", desc: "6+ years in ed-tech, 500+ students trained." },
                 { name: "Seryozha Ris", role: "AI Evangelist", desc: "Ex-Yandex. Builder, founder, vibe-coding prince." }
              ].map((member, i) => (
                 <div key={i} className="group">
                    <div className="aspect-[4/5] bg-[#E5E5E5] mb-4 relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                       <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                       {/* Placeholder for portrait */}
                       <div className="w-full h-full flex items-center justify-center text-black/10 text-9xl font-serif">
                          {member.name[0]}
                       </div>
                    </div>
                    <h3 className="font-medium text-lg">{member.name}</h3>
                    <p className="font-mono text-xs text-[#4A90E2] mb-2">{member.role}</p>
                    <p className="text-sm text-black/60 leading-relaxed">{member.desc}</p>
                 </div>
              ))}
           </div>
        </section>

        {/* Footer */}
        <footer className="pb-12 border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div className="font-mono text-xs opacity-50">
              AI MINDSET © 2026
           </div>
           <div className="flex gap-6 font-mono text-xs uppercase">
              <a href="#" className="hover:text-[#4A90E2]">Podcast</a>
              <a href="#" className="hover:text-[#4A90E2]">Telegram</a>
              <a href="#" className="hover:text-[#4A90E2]">Offer</a>
              <a href="#" className="hover:text-[#4A90E2]">Privacy</a>
           </div>
        </footer>

      </main>
    </div>
  );
}
