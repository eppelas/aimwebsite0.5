import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Pause, Maximize2 } from 'lucide-react';

// --- Assets & Shapes ---

const GreenCircle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="50" r="50" fill="#2D6A4F" />
  </svg>
);

const YellowPill = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 100" className={className}>
    <rect x="0" y="0" width="200" height="100" rx="50" fill="#F4D35E" />
  </svg>
);

const RedSquiggle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" stroke="#EE6055" strokeWidth="20" strokeLinecap="round">
    <path d="M20,180 Q50,20 100,100 T180,20" />
  </svg>
);

const BlueSemi = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 100" className={className}>
    <path d="M0,100 A100,100 0 0,1 200,100 L0,100 Z" fill="#6C91C2" />
  </svg>
);

const GreenCloud = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 120" className={className}>
    <path d="M20,100 A20,20 0 0,1 20,60 A30,30 0 0,1 70,40 A40,40 0 0,1 150,50 A30,30 0 0,1 180,100 Z" fill="#2D6A4F" />
    <circle cx="50" cy="70" r="30" fill="#2D6A4F" />
    <circle cx="100" cy="50" r="40" fill="#2D6A4F" />
    <circle cx="150" cy="70" r="30" fill="#2D6A4F" />
    <rect x="20" y="70" width="160" height="30" fill="#2D6A4F" />
  </svg>
);

// --- Components ---

const ProjectSection = ({ 
  number, 
  title, 
  description, 
  category, 
  date, 
  role, 
  children 
}: { 
  number: string; 
  title: React.ReactNode; 
  description: React.ReactNode; 
  category: string; 
  date: string; 
  role: string; 
  children: React.ReactNode; 
}) => {
  return (
    <div className="min-h-screen border-t border-black/10 py-12 md:py-24 px-4 md:px-12 flex flex-col md:flex-row gap-12 md:gap-24">
      {/* Left Column: Text Info */}
      <div className="w-full md:w-1/3 flex flex-col justify-between shrink-0">
        <div>
          <div className="font-mono text-sm mb-8">{number}</div>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-8">
            {title}
          </h2>
          <div className="text-lg md:text-xl font-light opacity-80 leading-relaxed mb-12">
            {description}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm font-mono uppercase tracking-wide opacity-60">
          <div>
            <div className="mb-1">Category</div>
            <div className="text-black font-bold">{category}</div>
          </div>
          <div>
            <div className="mb-1">Date</div>
            <div className="text-black font-bold">{date}</div>
          </div>
          <div>
            <div className="mb-1">Role</div>
            <div className="text-black font-bold">{role}</div>
          </div>
        </div>
      </div>

      {/* Right Column: Visuals */}
      <div className="w-full md:w-2/3 relative">
        {children}
      </div>
    </div>
  );
};

const FloatingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div 
      className="absolute top-[10%] left-[10%] w-32 h-32 md:w-48 md:h-48"
      animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <GreenCircle className="w-full h-full opacity-80" />
    </motion.div>
    <motion.div 
      className="absolute top-[20%] right-[20%] w-48 h-24 md:w-64 md:h-32"
      animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    >
      <YellowPill className="w-full h-full opacity-90" />
    </motion.div>
    <motion.div 
      className="absolute bottom-[20%] left-[20%] w-40 h-40 md:w-56 md:h-56"
      animate={{ y: [0, -40, 0], rotate: [0, 15, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    >
      <RedSquiggle className="w-full h-full" />
    </motion.div>
    <motion.div 
      className="absolute bottom-[10%] right-[10%] w-48 h-24 md:w-64 md:h-32"
      animate={{ x: [0, -30, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    >
      <BlueSemi className="w-full h-full opacity-80" />
    </motion.div>
  </div>
);

// --- Main Page ---

export default function EditorialPortfolioPage() {
  return (
    <div className="bg-[#EBE9E4] text-[#1A1A1A] font-sans min-h-screen selection:bg-[#F4D35E] selection:text-black">
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 flex justify-between items-baseline z-50 mix-blend-multiply pointer-events-none">
        <div className="text-2xl md:text-3xl font-bold tracking-tight pointer-events-auto">
          AI MINDSET
        </div>
        <div className="hidden md:flex gap-4 text-sm font-mono uppercase tracking-widest pointer-events-auto">
          <span>01 Context</span>
          <span>02 Architecture</span>
          <span>03 Tools</span>
          <span>04 Skills</span>
        </div>
        <div className="text-2xl md:text-3xl font-medium pointer-events-auto hover:italic cursor-pointer">
          JOIN SPRINT
        </div>
      </header>

      {/* Side Navigation (Left) */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-40">
        {['Email', 'Linkedin', 'Instagram'].map((item) => (
          <div key={item} className="w-12 h-32 border border-black/20 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer group">
            <span className="writing-vertical-rl rotate-180 text-sm font-mono uppercase tracking-widest group-hover:font-bold">
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <main className="pt-32 md:pt-48">
        
        {/* Project 01: Concept */}
        <ProjectSection
          number="01."
          title={<span>Personal<br/>Operational<br/>System</span>}
          description={
            <>
              <span className="font-serif italic">POS is not a tool.</span> It is an operating system with a personal AI assistant. A layer of rules, context, and constraints that makes tools work.
              <br/><br/>
              From chaos to a working AI system tailored for you.
            </>
          }
          category="System Design"
          date="Mar 2 - Mar 14"
          role="Architecture"
        >
          <div className="relative w-full aspect-video bg-[#E6FF00] flex items-center justify-center overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 transition-transform duration-700 group-hover:scale-105">
              <h3 className="text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter">
                NEVER<br/>GO<br/>CHAOTIC
              </h3>
              <div className="mt-8 flex items-center gap-2 font-mono text-sm uppercase tracking-widest">
                <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
                Batch X26 Open
              </div>
            </div>
            
            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <div className="flex gap-4">
                 <Pause size={16} fill="currentColor" />
                 <span className="font-mono text-xs">00:00 / 02:14</span>
               </div>
               <Maximize2 size={16} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 font-serif italic text-xl cursor-pointer hover:translate-x-2 transition-transform">
            Click to see more <ArrowRight size={20} className="stroke-[1.5]" />
          </div>
        </ProjectSection>

        {/* Project 02: Program */}
        <ProjectSection
          number="02."
          title={<span>The Sprint<br/>Program</span>}
          description="We distilled real cases from founders. Proven stacks, not just hype tools. You leave with a working system, not just notes."
          category="Education"
          date="2 Weeks"
          role="Curriculum"
        >
          <div className="relative w-full min-h-[600px] bg-[#D4D4D4] p-12 flex flex-col justify-between overflow-hidden">
            <FloatingShapes />
            
            <div className="relative z-10 grid grid-cols-1 gap-8">
              {[
                { title: "Context", desc: "AI knows who you are and what matters." },
                { title: "Architecture", desc: "Won't delete files without asking." },
                { title: "Tools", desc: "Claude Code, Cursor, Obsidian, MCP." },
                { title: "Skills", desc: "Automation of routine tasks." }
              ].map((item, i) => (
                <div key={i} className="border-b border-black/20 pb-8 last:border-0 group">
                  <h4 className="text-3xl font-serif italic mb-2 group-hover:text-[#2D6A4F] transition-colors">{item.title}</h4>
                  <p className="font-sans opacity-70 max-w-md">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ProjectSection>

        {/* Project 03: Guides */}
        <ProjectSection
          number="03."
          title={<span>Your<br/>Guides</span>}
          description="We live in these processes every day. Building systems, agents, and skills."
          category="Mentorship"
          date="Ongoing"
          role="Leadership"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {[
               { name: "Alexander", role: "Strategist", color: "bg-[#EE6055]" },
               { name: "Sergey", role: "Architect", color: "bg-[#6C91C2]" },
               { name: "Seryozha", role: "Evangelist", color: "bg-[#F4D35E]" },
             ].map((guide, i) => (
               <div key={i} className={`aspect-square ${guide.color} p-8 flex flex-col justify-between transition-transform hover:scale-[0.98] cursor-pointer`}>
                 <div className="text-5xl font-serif italic opacity-20">{i + 1}</div>
                 <div>
                   <h4 className="text-2xl font-bold uppercase">{guide.name}</h4>
                   <p className="font-mono text-sm opacity-60 uppercase mt-1">{guide.role}</p>
                 </div>
               </div>
             ))}
             <div className="aspect-square bg-[#1A1A1A] text-[#EBE9E4] p-8 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-[#2D6A4F] transition-colors">
               <h4 className="text-3xl font-serif italic mb-2">Guest Speakers</h4>
               <p className="font-mono text-xs opacity-60 uppercase">From Top Tech</p>
             </div>
          </div>
        </ProjectSection>

        {/* Footer / CTA */}
        <section className="min-h-[50vh] border-t border-black/10 py-24 px-4 md:px-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
             <GreenCloud className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px]" />
           </div>
           
           <h2 className="text-6xl md:text-9xl font-serif italic mb-12 relative z-10">
             Ready to join?
           </h2>
           
           <div className="flex flex-col md:flex-row gap-8 relative z-10">
             <button className="px-12 py-4 bg-[#1A1A1A] text-[#EBE9E4] rounded-full font-mono uppercase tracking-widest hover:bg-[#EE6055] transition-colors">
               Apply Now
             </button>
             <button className="px-12 py-4 border border-[#1A1A1A] rounded-full font-mono uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-[#EBE9E4] transition-colors">
               Read FAQ
             </button>
           </div>

           <div className="mt-24 font-mono text-xs uppercase tracking-widest opacity-40">
             AI Mindset © 2026 — Batch X26
           </div>
        </section>

      </main>
    </div>
  );
}
