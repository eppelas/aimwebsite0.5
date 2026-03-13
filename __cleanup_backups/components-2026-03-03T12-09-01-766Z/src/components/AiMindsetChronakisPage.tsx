import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, ArrowRight } from 'lucide-react';

const ChronakisStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
    
    .font-serif-chronakis { font-family: 'Playfair Display', serif; }
    .font-sans-chronakis { font-family: 'Inter', sans-serif; }
    
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .dotted-pattern {
      background-image: radial-gradient(#000 1px, transparent 1px);
      background-size: 4px 4px;
    }
  `}</style>
);

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-8 py-6 bg-[#F3DACE] border-b border-black/10">
    <div className="font-sans-chronakis text-xs tracking-[0.2em] font-bold uppercase">
      AI Mindset Home
    </div>
    
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-10 h-10 border border-black rounded-full flex items-center justify-center font-serif-chronakis italic text-xl">
        Ai
      </div>
    </div>

    <div className="flex items-center gap-8">
      <div className="hidden md:flex gap-8 font-sans-chronakis text-xs tracking-widest font-medium">
        <button className="hover:opacity-60 transition-opacity">CONTACT US</button>
        <button className="hover:opacity-60 transition-opacity">BOOK NOW</button>
      </div>
      <Menu className="w-6 h-6 cursor-pointer" />
    </div>
  </header>
);

const MapIllustration = ({ crazyMode }: { crazyMode: boolean }) => (
  <svg viewBox="0 0 400 400" className="w-full h-full opacity-80">
    <motion.path
      d="M50,50 Q100,150 150,100 T250,150 T350,250"
      fill="none"
      stroke="black"
      strokeWidth="2"
      animate={crazyMode ? { d: "M50,50 Q150,250 150,100 T200,300 T350,50" } : {}}
      transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
    />
    <motion.path
      d="M50,350 Q150,250 200,300 T300,200 T350,100"
      fill="none"
      stroke="black"
      strokeWidth="2"
      animate={crazyMode ? { d: "M50,350 Q100,100 200,300 T350,150 T350,350" } : {}}
      transition={{ duration: 2.5, repeat: Infinity, repeatType: "mirror" }}
    />
    
    {/* Nodes */}
    {[
      { cx: 50, cy: 50, label: "INPUT" },
      { cx: 150, cy: 100, label: "PROCESS" },
      { cx: 250, cy: 150, label: "AGENT" },
      { cx: 350, cy: 250, label: "OUTPUT" },
      { cx: 50, cy: 350, label: "CONTEXT" },
      { cx: 200, cy: 300, label: "MEMORY" },
      { cx: 350, cy: 100, label: "ACTION" },
    ].map((node, i) => (
      <g key={i}>
        <circle cx={node.cx} cy={node.cy} r="4" fill="black" />
        <circle cx={node.cx} cy={node.cy} r="20" fill="none" stroke="black" strokeWidth="1" strokeDasharray="2 2" />
        <text x={node.cx} y={node.cy - 30} textAnchor="middle" className="font-sans-chronakis text-[8px] tracking-widest uppercase">{node.label}</text>
      </g>
    ))}
    
    {/* Compass */}
    <g transform="translate(50, 200)">
      <circle cx="0" cy="0" r="25" fill="none" stroke="black" strokeWidth="1" />
      <path d="M0,-20 L5,0 L0,20 L-5,0 Z" fill="black" />
      <path d="M-20,0 L0,-5 L20,0 L0,5 Z" fill="none" stroke="black" />
      <text y="-30" textAnchor="middle" className="font-sans-chronakis text-[8px] font-bold">N</text>
      <text y="35" textAnchor="middle" className="font-sans-chronakis text-[8px] font-bold">S</text>
      <text x="-35" y="3" textAnchor="middle" className="font-sans-chronakis text-[8px] font-bold">W</text>
      <text x="35" y="3" textAnchor="middle" className="font-sans-chronakis text-[8px] font-bold">E</text>
    </g>
  </svg>
);

const ListItem = ({ number, title, description }: { number: number, title: string, description?: string }) => (
  <div className="flex gap-6 group cursor-pointer">
    <div className="flex-shrink-0 w-8 h-8 bg-black text-[#F3DACE] rounded-full flex items-center justify-center font-sans-chronakis font-bold text-sm group-hover:bg-[#E83626] transition-colors">
      {number}
    </div>
    <div className="space-y-2">
      <h3 className="font-sans-chronakis font-bold text-sm tracking-widest uppercase pt-1.5">{title}</h3>
      {description && <p className="font-serif-chronakis text-lg leading-relaxed opacity-80 max-w-md">{description}</p>}
      <button className="border border-black rounded-full px-4 py-1 text-[10px] font-sans-chronakis uppercase tracking-wider hover:bg-black hover:text-[#F3DACE] transition-colors mt-2">
        Learn More
      </button>
    </div>
  </div>
);

export default function AiMindsetChronakisPage() {
  const [crazyMode, setCrazyMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-[#F3DACE] text-black selection:bg-black selection:text-[#F3DACE] hide-scrollbar relative">
      <ChronakisStyles />
      <Header />

      {/* Sidebar Pattern */}
      <div className="fixed left-0 top-0 bottom-0 w-8 md:w-12 border-r border-black/10 dotted-pattern z-30 hidden md:block" />

      {/* Floating Action Button */}
      <motion.button 
        className="fixed bottom-8 right-8 z-50 w-24 h-24 md:w-32 md:h-32 bg-[#E83626] rounded-full flex flex-col items-center justify-center text-white font-sans-chronakis font-bold text-xs md:text-sm tracking-widest shadow-lg hover:scale-105 transition-transform"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        onClick={() => setCrazyMode(!crazyMode)}
      >
        <span className="block mb-1">ALL IN</span>
        <span className="block">SPRINT</span>
      </motion.button>

      <main className="pl-0 md:pl-12 pt-24">
        
        {/* Hero Title */}
        <section className="py-24 px-8 md:px-16 text-center border-b border-black/10">
          <motion.h1 
            className="font-serif-chronakis text-5xl md:text-7xl lg:text-8xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            System Architecture
          </motion.h1>
          <p className="font-sans-chronakis text-xs tracking-[0.3em] uppercase opacity-60">
            POS {`{sprint}`} — BATCH X26
          </p>
        </section>

        {/* Split Section 1: Map & List */}
        <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] border-b border-black/10">
          {/* Left: Map */}
          <div className="relative border-r border-black/10 p-8 md:p-16 flex items-center justify-center overflow-hidden bg-[#F3DACE]">
            <div className="absolute inset-0 opacity-5 dotted-pattern" />
            <div className="w-full max-w-lg aspect-square relative">
               <MapIllustration crazyMode={crazyMode} />
            </div>
          </div>

          {/* Right: List */}
          <div className="p-8 md:p-16 flex flex-col justify-center bg-[#F3DACE]">
            <div className="space-y-12">
              <ListItem 
                number={1} 
                title="Collected Context" 
                description="AI knows who you are, how you work, and what matters to you. A deep understanding of your personal workflow."
              />
              <ListItem 
                number={2} 
                title="Logical Architecture" 
                description="A system that won't delete files without asking. Structured, safe, and built for scale."
              />
              <ListItem 
                number={3} 
                title="Connected Tools" 
                description="Seamless integration with Claude Code, Cursor, Obsidian, and MCP. Your stack, unified."
              />
              <ListItem 
                number={4} 
                title="Working Skills" 
                description="Automation of routine tasks. Agents that handle the busywork so you can focus on strategy."
              />
            </div>
          </div>
        </section>

        {/* Full Width Image Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-black/10">
           <div className="h-[50vh] lg:h-auto overflow-hidden relative border-r border-black/10">
              <motion.img 
                src="https://picsum.photos/seed/mountains/1200/800" 
                alt="Landscape" 
                className="w-full h-full object-cover sepia-[.5] grayscale-[.2]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1 }}
              />
              <div className="absolute inset-0 bg-[#F3DACE] mix-blend-multiply opacity-30" />
           </div>
           <div className="p-8 md:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-8 h-8 bg-black text-[#F3DACE] rounded-full flex items-center justify-center font-sans-chronakis font-bold text-sm">5</div>
                 <h2 className="font-sans-chronakis font-bold text-sm tracking-widest uppercase">THE VISION</h2>
              </div>
              <button className="border border-black rounded-full px-6 py-2 text-xs font-sans-chronakis uppercase tracking-wider hover:bg-black hover:text-[#F3DACE] transition-colors w-fit mb-8">
                 Read Manifesto
              </button>
              <p className="font-serif-chronakis text-xl md:text-2xl leading-relaxed">
                 "POS is not a tool, it's an operating system with a personal AI assistant. A layer of rules, context, and restrictions that makes tools work for you."
              </p>
              <p className="font-sans-chronakis text-sm mt-8 opacity-70 leading-relaxed max-w-md">
                 Imagine: In the morning, an agent gives you a day plan based on your energy level. During the day, it reminds you of a meeting with a prepared brief.
              </p>
           </div>
        </section>

        {/* Guides Section */}
        <section className="py-24 px-8 md:px-16 bg-[#EFE5DE]">
           <div className="text-center mb-16">
              <h2 className="font-serif-chronakis text-4xl md:text-5xl mb-4">Your Guides</h2>
              <div className="w-24 h-[1px] bg-black mx-auto" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                 { name: "Alexander Povalyaev", role: "Founder AI Mindset", image: "https://picsum.photos/seed/alex/400/500" },
                 { name: "Sergey Khabarov", role: "System Architect", image: "https://picsum.photos/seed/sergey/400/500" },
                 { name: "Seryozha Ris", role: "AI Evangelist", image: "https://picsum.photos/seed/ris/400/500" }
              ].map((guide, i) => (
                 <div key={i} className="group cursor-pointer">
                    <div className="aspect-[3/4] overflow-hidden mb-6 border border-black/10 relative">
                       <img src={guide.image} alt={guide.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                       <div className="absolute inset-0 bg-[#F3DACE] mix-blend-multiply opacity-20 group-hover:opacity-0 transition-opacity" />
                    </div>
                    <h3 className="font-sans-chronakis font-bold text-sm tracking-widest uppercase mb-2">{guide.name}</h3>
                    <p className="font-serif-chronakis italic opacity-70">{guide.role}</p>
                 </div>
              ))}
           </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-8 md:px-16 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="font-sans-chronakis text-xs tracking-[0.2em] font-bold uppercase">
              AI Mindset © 2026
           </div>
           <div className="flex gap-8 font-sans-chronakis text-xs tracking-widest uppercase opacity-60">
              <a href="#" className="hover:opacity-100">Instagram</a>
              <a href="#" className="hover:opacity-100">Telegram</a>
              <a href="#" className="hover:opacity-100">Youtube</a>
           </div>
        </footer>

      </main>
    </div>
  );
}
