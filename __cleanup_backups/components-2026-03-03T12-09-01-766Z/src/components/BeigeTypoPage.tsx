import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// --- Assets & Styles ---

const TypoFont = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
    .font-clean { font-family: 'Inter', sans-serif; }
    
    .smooth-scroll {
      scroll-behavior: smooth;
    }
  `}</style>
);

// --- Components ---

const GeometricArt = () => (
  <div className="w-full h-64 md:h-96 bg-[#111] overflow-hidden relative flex items-center justify-center">
    {/* Abstract Shapes */}
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-full max-w-4xl flex items-center justify-center gap-0"
    >
      {/* Circle */}
      <div className="w-32 h-32 md:w-64 md:h-64 bg-white rounded-full mix-blend-difference" />
      
      {/* Triangle */}
      <div className="w-0 h-0 
        border-l-[60px] md:border-l-[120px] border-l-transparent
        border-r-[60px] md:border-r-[120px] border-r-transparent
        border-t-[100px] md:border-t-[200px] border-t-white
        mix-blend-difference -ml-8" 
      />
      
      {/* Rectangle */}
      <div className="w-24 h-32 md:w-48 md:h-64 bg-white mix-blend-difference -ml-8" />
    </motion.div>
    
    {/* Waves */}
    <div className="absolute bottom-0 left-0 right-0 h-12 flex justify-between opacity-50">
      {Array(20).fill(0).map((_, i) => (
        <div key={i} className="w-full h-full border-t-2 border-white rounded-full transform scale-x-150 translate-y-6" />
      ))}
    </div>
  </div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-8 md:mb-16">
    {title}
  </h2>
);

const ListItem = ({ label, value }: { label: string, value: string }) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black/10 pb-4 mb-4 group cursor-pointer">
    <span className="text-xl md:text-2xl text-black/60 group-hover:text-black transition-colors">{label}</span>
    <div className="flex items-center gap-2">
      <span className="text-2xl md:text-4xl font-normal">{value}</span>
      <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </div>
);

// --- Main Page ---

export default function BeigeTypoPage() {
  return (
    <div className="min-h-screen bg-[#E6E2D6] text-[#111] font-clean selection:bg-black selection:text-[#E6E2D6]">
      <TypoFont />

      {/* Navigation / Meta Info */}
      <div className="fixed top-0 left-0 p-4 md:p-8 text-xs md:text-sm font-medium tracking-wide z-50 mix-blend-multiply">
        <div className="flex flex-col gap-1">
          <span>001 INFO</span>
          <span>002 SPRINT</span>
          <span>003 CONTACT</span>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 p-4 md:p-8 z-50">
        <div className="bg-[#333] text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-black transition-colors cursor-pointer">
          Made with AI Mindset
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 py-24 md:py-32">
        
        {/* Header Section */}
        <header className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32 md:mb-48">
          <div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8">
              AI Mindset<br />
              POS Sprint
            </h1>
            <div className="text-xl md:text-2xl leading-snug max-w-md">
              <p>Batch X26</p>
              <p>Mar 02 — 14, 2026</p>
            </div>
          </div>

          <div className="flex flex-col justify-between items-end text-right">
            <div className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight max-w-xl">
              An intensive sprint to build your Personal Operational System.
              <br />
              <span className="text-black/40">From chaos to system.</span>
            </div>
          </div>
        </header>

        {/* Geometric Art Break */}
        <div className="mb-32 md:mb-48">
          <GeometricArt />
        </div>

        {/* Description Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-32 md:mb-48">
          <div className="md:col-span-4">
            <span className="text-sm font-medium uppercase tracking-widest border-l-2 border-black pl-4">
              The Mission
            </span>
          </div>
          <div className="md:col-span-8">
            <p className="text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-light">
              POS is not a tool. It is an operating system with a personal AI assistant. A layer of rules, context, and constraints that makes tools work.
            </p>
          </div>
        </section>

        {/* The Stack Section */}
        <section className="mb-32 md:mb-48">
          <SectionHeader title="The Stack" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-8">
            <div className="text-right md:text-left">
              <ListItem label="Code" value="Claude 3.7" />
              <ListItem label="Knowledge" value="Obsidian" />
            </div>
            <div>
              <ListItem label="Editor" value="Cursor" />
              <ListItem label="Agent" value="You" />
            </div>
          </div>
        </section>

        {/* Mentors Section */}
        <section className="mb-32 md:mb-48">
          <SectionHeader title="Mentors & Direction" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alexander Povalyaev", role: "Strategy" },
              { name: "Sergey Khabarov", role: "Architecture" },
              { name: "Seryozha Ris", role: "Evangelist" }
            ].map((mentor, i) => (
              <div key={i} className="border-t border-black pt-4">
                <h3 className="text-2xl font-normal mb-1">{mentor.name}</h3>
                <p className="text-black/50 text-lg">{mentor.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <footer className="border-t border-black pt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h2 className="text-6xl md:text-9xl font-medium tracking-tighter leading-none mb-4">
              APPLY
            </h2>
            <p className="text-xl">Applications Open • Batch X26</p>
          </div>
          
          <div className="flex gap-8 text-sm font-medium uppercase tracking-wide">
            <a href="#" className="hover:underline">Telegram</a>
            <a href="#" className="hover:underline">Youtube</a>
            <a href="#" className="hover:underline">Manifesto</a>
          </div>
        </footer>

      </div>
    </div>
  );
}
