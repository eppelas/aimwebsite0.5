import React from 'react';
import { motion } from 'framer-motion';
import { Asterisk, ArrowDown } from 'lucide-react';

// --- Assets & Styles ---

const SwissFont = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;900&display=swap');
    .font-swiss { font-family: 'Inter', sans-serif; }
    
    .crop-text {
      line-height: 0.75;
      overflow: hidden;
      padding-bottom: 0.1em;
    }
  `}</style>
);

// --- Components ---

const SpinningStar = () => (
  <motion.div 
    animate={{ rotate: 360 }}
    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
  >
    <Asterisk size={48} strokeWidth={3} />
  </motion.div>
);

const GridLine = () => (
  <div className="w-full h-px bg-black/10 my-8" />
);

const ServiceList = ({ title, items }: { title: string; items: string[] }) => (
  <div className="flex flex-col gap-4">
    <h4 className="text-sm text-gray-400 uppercase tracking-wide">{title}</h4>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="text-xl md:text-2xl font-medium leading-tight border-b border-transparent hover:border-black w-fit cursor-pointer transition-colors">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

// --- Main Page ---

export default function SwissIdentityPage() {
  return (
    <div className="bg-white text-[#111] font-swiss min-h-screen selection:bg-[#FF3311] selection:text-white">
      <SwissFont />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 flex justify-between items-start z-50 mix-blend-difference text-white">
        <div className="text-xl font-bold tracking-tight">
          AI Mindset®
        </div>
        <nav className="hidden md:flex gap-12 text-lg font-medium">
          <a href="#" className="hover:opacity-50 transition-opacity">Context</a>
          <a href="#" className="hover:opacity-50 transition-opacity">System</a>
          <a href="#" className="hover:opacity-50 transition-opacity">Join</a>
        </nav>
        <div className="text-[#FF3311]">
          <SpinningStar />
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen pt-32 px-6 md:px-12 flex flex-col justify-between relative overflow-hidden">
        <div className="max-w-2xl mt-12 md:mt-24 relative z-10">
          <p className="text-xl md:text-2xl leading-relaxed font-medium">
            Based in Earth,<br/>
            2026.
          </p>
        </div>

        {/* Massive Typography */}
        <div className="relative z-0 mt-12 md:mt-0">
          <h1 className="text-[35vw] font-black tracking-tighter crop-text select-none">
            POS
          </h1>
          {/* Geometric Overlay */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[-20%] right-[5%] w-[40vw] h-[40vw] bg-[#FF3311] mix-blend-multiply rounded-full hidden md:block"
          />
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute bottom-[20%] right-[10%] w-[25vw] h-[25vw] bg-black mix-blend-multiply hidden md:block"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          />
        </div>
      </section>

      {/* Statement Section */}
      <section className="py-24 px-6 md:px-12 border-t border-black">
        <div className="max-w-[90vw]">
          <h2 className="text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">
            POS is an operating system that helps <span className="text-[#FF3311]">people/agents</span> communicate.
          </h2>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 md:px-12 border-t border-black">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="text-lg leading-relaxed text-gray-600 max-w-sm">
              We help shape the perception of workflows and transform tools into powerful assets. We create verbal and visual narratives for systems that deepen engagements and cut through the noise.
            </p>
          </div>
          
          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <ServiceList 
              title="Architecture" 
              items={[
                "Context Mapping",
                "Agent Roles",
                "Tool Integration",
                "Knowledge Graphs",
                "System Design"
              ]} 
            />
            <ServiceList 
              title="Experience" 
              items={[
                "Claude Code",
                "Obsidian Setup",
                "Cursor Workflows",
                "Automation",
                "Routine Management"
              ]} 
            />
          </div>
        </div>
      </section>

      {/* Project/Sprint Details */}
      <section className="min-h-screen flex flex-col md:flex-row">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 bg-[#F0F0F0] relative min-h-[50vh] md:min-h-auto overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=2574&auto=format&fit=crop" 
            alt="Workspace" 
            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-[#FF3311]/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-black text-white">
          <div className="space-y-12">
            <div>
              <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-2">Sprint X26</h3>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">From Chaos to System</h2>
              <p className="text-xl text-gray-300 leading-relaxed max-w-md">
                Over 2 weeks, you will build a Personal Operational System. A layer of rules and context that makes your tools work for you, not against you.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 border-t border-white/20 pt-8">
              <div>
                <div className="text-sm text-gray-400 mb-1">Date</div>
                <div className="text-xl font-medium">Mar 02 — 14</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Status</div>
                <div className="text-xl font-medium text-[#FF3311]">Open</div>
              </div>
            </div>

            <button className="w-full py-6 bg-white text-black text-xl font-bold hover:bg-[#FF3311] hover:text-white transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-black flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="text-[10vw] leading-[0.8] font-black tracking-tighter opacity-10 select-none">
          MINDSET
        </div>
        <div className="flex gap-8 text-sm font-medium uppercase tracking-wide">
          <a href="#" className="hover:text-[#FF3311]">Instagram</a>
          <a href="#" className="hover:text-[#FF3311]">Telegram</a>
          <a href="#" className="hover:text-[#FF3311]">Email</a>
        </div>
      </footer>

    </div>
  );
}
