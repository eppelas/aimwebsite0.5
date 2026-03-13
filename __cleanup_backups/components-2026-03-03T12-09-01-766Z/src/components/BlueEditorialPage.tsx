import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

// --- Assets & Styles ---

const BlueFont = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Domine:wght@400;700&display=swap');
    .font-sans-bold { font-family: 'Inter', sans-serif; }
    .font-serif-text { font-family: 'Domine', serif; }
    
    .blue-duotone {
      background-color: #0000FF;
      mix-blend-mode: multiply;
    }
    
    .text-shadow-sm {
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
  `}</style>
);

// --- Components ---

const BorderBox = ({ children }: { children: React.ReactNode }) => (
  <div className="border-[6px] border-white p-4 md:p-8 inline-block backdrop-blur-sm bg-white/10">
    {children}
  </div>
);

const NavItem = ({ text }: { text: string }) => (
  <a href="#" className="text-white/70 hover:text-white transition-colors text-sm uppercase tracking-widest font-sans-bold flex items-center gap-2 group">
    {text}
    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
  </a>
);

// --- Main Page ---

export default function BlueEditorialPage() {
  return (
    <div className="min-h-screen bg-[#0000FF] text-white font-sans-bold selection:bg-white selection:text-[#0000FF] overflow-hidden relative">
      <BlueFont />

      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2670&auto=format&fit=crop" 
          alt="Conference" 
          className="w-full h-full object-cover grayscale opacity-60 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-[#0000FF] mix-blend-multiply opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0000FF] via-transparent to-transparent opacity-80" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 min-h-screen flex flex-col p-6 md:p-12">
        
        {/* Header */}
        <header className="flex justify-between items-start mb-24">
          <div className="w-12 h-12 bg-white rounded-full" />
          <nav className="hidden md:flex gap-8">
            <NavItem text="Introduction" />
            <NavItem text="Curriculum" />
            <NavItem text="Apply" />
          </nav>
        </header>

        {/* Main Hero Content */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Title Box */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <BorderBox>
                  <h1 className="text-6xl md:text-8xl lg:text-[9rem] leading-[0.85] font-black tracking-tighter">
                    POS <span className="font-serif-text font-normal italic text-5xl md:text-7xl align-middle mx-2">/</span> SPRINT
                  </h1>
                </BorderBox>
              </motion.div>
            </div>

            {/* Right: Description */}
            <div className="lg:col-span-5 text-right lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="font-serif-text text-3xl md:text-5xl leading-tight mb-8 text-shadow-sm">
                  A 2-week intensive sprint to build your Personal Operational System.
                </p>
                <p className="font-sans-bold text-lg md:text-xl opacity-80 mb-12 max-w-md ml-auto lg:ml-0">
                  Featuring workflows by top creatives, leaders, and innovators from around the world.
                </p>
                
                <div className="flex flex-col lg:flex-row gap-8 items-end lg:items-center justify-end lg:justify-start">
                  <div className="text-right lg:text-left">
                    <div className="text-sm uppercase tracking-widest opacity-60">Batch X26</div>
                    <div className="text-2xl font-serif-text">Mar 02 — 14</div>
                  </div>
                  <button className="bg-white text-[#0000FF] px-8 py-4 text-lg font-bold hover:bg-transparent hover:text-white hover:border hover:border-white transition-all duration-300">
                    Apply Now
                  </button>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Footer / Bottom Elements */}
        <div className="mt-24 flex justify-between items-end">
          <div className="hidden md:block">
            <div className="w-16 h-2 bg-white -rotate-45 origin-left" />
            <div className="w-16 h-2 bg-white -rotate-45 origin-left mt-2" />
          </div>
          
          <div className="font-serif-text italic text-xl md:text-2xl opacity-60 max-w-md text-right">
            "The art of getting things done without losing your soul."
          </div>
        </div>

      </div>
    </div>
  );
}
