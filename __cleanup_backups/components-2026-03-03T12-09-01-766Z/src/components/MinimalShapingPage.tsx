import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Grid, Menu } from 'lucide-react';

// --- Styles ---

const MinimalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
    
    .font-minimal { font-family: 'Inter', sans-serif; }
    
    .grain-bg {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
    }

    .vector-field {
      display: grid;
      grid-template-columns: repeat(20, 1fr);
      grid-template-rows: repeat(10, 1fr);
      gap: 12px;
    }
  `}</style>
);

// --- Components ---

const VectorField = () => {
  // A simplified visual representation of the vector field from the screenshot
  // In a real app, this would track mouse position. Here we just do a static pattern or simple animation.
  return (
    <div className="w-full h-full bg-[#E5E5E5] flex items-center justify-center overflow-hidden p-8 md:p-16">
      <div className="grid grid-cols-[repeat(15,1fr)] md:grid-cols-[repeat(25,1fr)] gap-4 md:gap-8 w-full max-w-4xl aspect-video">
        {Array.from({ length: 375 }).map((_, i) => {
           // Calculate rotation based on position to create a field effect
           const row = Math.floor(i / 25);
           const col = i % 25;
           const cx = 12.5;
           const cy = 7.5;
           const dx = col - cx;
           const dy = row - cy;
           const angle = Math.atan2(dy, dx) * (180 / Math.PI);
           
           return (
            <motion.div 
              key={i}
              className="w-[1px] h-[8px] md:h-[12px] bg-black origin-center mx-auto"
              initial={{ rotate: angle }}
              animate={{ rotate: [angle, angle + 10, angle] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.005 }}
            />
           );
        })}
      </div>
    </div>
  );
};

const Header = () => (
  <header className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-start z-50 mix-blend-difference text-white">
    <div className="text-xs md:text-sm font-medium tracking-wider uppercase">
      <div>AI Mindset</div>
      <div className="opacity-50">Global, Online</div>
    </div>

    <div className="absolute left-1/2 top-6 md:top-8 transform -translate-x-1/2 bg-white/20 backdrop-blur-md rounded-full p-1 flex gap-1">
      <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-black cursor-pointer">
        <Grid size={14} />
      </div>
      <div className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full cursor-pointer transition-colors">
        <Menu size={14} />
      </div>
    </div>

    <div className="text-xs md:text-sm font-medium tracking-wider uppercase text-right hidden md:block">
      <div className="flex gap-4">
        <a href="#" className="hover:opacity-50">TW ↗</a>
        <a href="#" className="hover:opacity-50">IG ↗</a>
        <a href="#" className="hover:opacity-50">DRIB ↗</a>
        <a href="#" className="hover:opacity-50">LIN ↗</a>
      </div>
      <div className="mt-1 opacity-50">Contacts</div>
    </div>
  </header>
);

const ListItem = ({ label, title, detail, year }: { label: string, title: string, detail: string, year: string }) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-b border-black/10 items-baseline hover:bg-black/5 transition-colors px-4 md:px-0">
    <div className="col-span-2 text-xs font-medium uppercase tracking-wider opacity-50">{label}</div>
    <div className="col-span-4 text-xl md:text-2xl font-normal">{title}</div>
    <div className="col-span-4 text-base md:text-lg opacity-60 font-light">{detail}</div>
    <div className="col-span-2 text-right text-sm opacity-40 font-mono">{year}</div>
  </div>
);

// --- Main Page ---

export default function MinimalShapingPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="min-h-screen bg-black text-white font-minimal selection:bg-white selection:text-black">
      <MinimalStyles />
      <Header />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 pb-12">
        <motion.h1 
          className="text-[15vw] leading-[0.9] font-normal tracking-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Shaping <br />
          <span className="text-[#888]">what's next.</span>
        </motion.h1>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
          <p className="text-xl md:text-2xl font-light text-[#888] leading-relaxed">
            POS {`{sprint}`} — From chaos to a working AI system tailored for you. A layer of rules, context, and constraints that makes tools work.
          </p>
        </div>
      </section>

      {/* White Section */}
      <section className="bg-white text-black py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32">
            <div className="text-sm font-mono uppercase tracking-widest mb-8 md:mb-0">
              Batch X26 • Mar 2 — 14
            </div>
            <h2 className="text-[10vw] md:text-[8vw] leading-[0.9] font-normal text-right">
              I design <br />
              Systems
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
            <div className="col-span-1 md:col-span-5 text-lg md:text-xl font-light leading-relaxed">
              <p className="mb-8">
                Born from the need to manage information overload, POS is an operating system with a personal AI assistant.
              </p>
              <p>
                I'm currently the Founding Partner at AI Mindset, a Global Online based design practice focused on personal operational systems.
              </p>
            </div>
            <div className="col-span-1 md:col-span-7">
               <div className="aspect-[4/3] bg-[#F0F0F0] rounded-sm overflow-hidden relative group cursor-pointer">
                 <VectorField />
                 <div className="absolute bottom-8 left-8 text-black">
                   <div className="text-sm font-mono mb-2">ARTICLE</div>
                   <div className="text-2xl font-medium">The role of Context</div>
                   <div className="text-lg opacity-60 mt-1">An essay on curiosity and creative process.</div>
                 </div>
               </div>
            </div>
          </div>

          {/* Project Showcase - Dark Card */}
          <div className="bg-[#111] text-white p-8 md:p-16 rounded-sm relative overflow-hidden min-h-[80vh] flex flex-col justify-end group cursor-pointer">
            <div className="absolute inset-0 grain-bg opacity-20 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4 opacity-70">
                <span className="text-sm font-mono uppercase">Product Design</span>
              </div>
              <h3 className="text-[8vw] leading-none font-medium mb-8">
                POS 0 <span className="font-light text-[#666]">→</span> 1
              </h3>
              <p className="text-xl md:text-2xl font-light max-w-2xl opacity-80">
                Led the design vision, strategy and definition of some of AI Mindset's big bets with the 0→1 team.
              </p>
            </div>
            
            {/* Floating Logo/Icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
               <div className="text-[20vw] font-black">POS</div>
            </div>
          </div>

        </div>
      </section>

      {/* List Section */}
      <section className="bg-white text-black pb-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[10vw] md:text-[8vw] leading-none font-normal mb-24">
            Program & <br />
            <span className="text-[#999]">Guides</span>
          </h2>

          <div className="border-t border-black/10">
            <ListItem 
              label="Guide" 
              title="Alexander Povalyaev" 
              detail="Founder, Strategist. 15+ years connecting tech & business." 
              year="2026" 
            />
            <ListItem 
              label="Guide" 
              title="Sergey Khabarov" 
              detail="System Architect. Ex-CTO, 6+ years in EdTech." 
              year="2026" 
            />
            <ListItem 
              label="Guide" 
              title="Seryozha Ris" 
              detail="AI Evangelist, ex-Yandex. Claude Code streamer." 
              year="2026" 
            />
            <ListItem 
              label="Module" 
              title="Context Collection" 
              detail="AI knows who you are, how you work, what matters." 
              year="WK 1" 
            />
            <ListItem 
              label="Module" 
              title="Logical Architecture" 
              detail="Won't delete files without asking. Safe & Secure." 
              year="WK 1" 
            />
            <ListItem 
              label="Module" 
              title="Connected Tools" 
              detail="Claude Code / Cursor / Obsidian / MCP." 
              year="WK 2" 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black py-32 px-6 md:px-12 lg:px-24 border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[12vw] leading-[0.8] font-normal tracking-tight mb-24">
            Let's <br /> connect
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-mono uppercase tracking-widest border-t border-black pt-8">
            <div>
              <div className="mb-4 font-bold">For Networking</div>
              <a href="#" className="block hover:opacity-50 mb-2">LinkedIn ↗</a>
            </div>
            <div>
              <div className="mb-4 font-bold">For Updates</div>
              <a href="#" className="block hover:opacity-50 mb-2">Twitter ↗</a>
            </div>
            <div>
              <div className="mb-4 font-bold">For Behind the Scenes</div>
              <a href="#" className="block hover:opacity-50 mb-2">Instagram ↗</a>
            </div>
            <div className="text-right md:text-right flex flex-col justify-between">
              <div className="mb-4 font-bold">For Latest Designs</div>
              <a href="#" className="block hover:opacity-50 mb-2">Dribbble ↗</a>
              <div className="mt-8 opacity-50">© AI Mindset 2026</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
