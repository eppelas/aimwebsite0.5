import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// --- Styles ---

const TypoStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
    
    .font-typo { font-family: 'Inter', sans-serif; }
    
    .stroke-text {
      -webkit-text-stroke: 2px black;
      color: transparent;
    }
    
    .stripe-bg {
      background-image: linear-gradient(90deg, black 50%, transparent 50%);
      background-size: 4px 100%;
    }

    .pixel-grid {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      gap: 2px;
    }
    .pixel {
      background-color: black;
      aspect-ratio: 1;
    }
  `}</style>
);

// --- Typographic Components ---

const HeavyBlock = ({ text }: { text: string }) => (
  <div className="text-[12vw] md:text-[8vw] font-black leading-none tracking-tighter uppercase transform scale-y-150">
    {text}
  </div>
);

const OutlineDistort = ({ text }: { text: string }) => (
  <div className="relative">
    <div className="text-[10vw] md:text-[6vw] font-black leading-none uppercase stroke-text absolute top-0 left-0 translate-x-1 translate-y-1 opacity-50">
      {text}
    </div>
    <div className="text-[10vw] md:text-[6vw] font-black leading-none uppercase text-black relative z-10 mix-blend-hard-light">
      {text}
    </div>
    <div className="text-[10vw] md:text-[6vw] font-black leading-none uppercase stroke-text absolute top-0 left-0 -translate-x-1 -translate-y-1 opacity-50">
      {text}
    </div>
  </div>
);

const WavyText = ({ text }: { text: string }) => (
  <svg viewBox="0 0 300 100" className="w-full h-full max-h-[200px]">
    <path id="curve" d="M0,50 C75,100 225,0 300,50" fill="transparent" />
    <text width="300">
      <textPath xlinkHref="#curve" startOffset="50%" textAnchor="middle" className="text-[80px] font-black uppercase fill-black">
        {text}
      </textPath>
    </text>
  </svg>
);

const VerticalStripes = ({ text }: { text: string }) => (
  <div className="relative overflow-hidden group">
    <div className="text-[12vw] md:text-[8vw] font-black leading-none uppercase text-black relative z-10 mix-blend-screen bg-white">
      {text}
    </div>
    <div className="absolute inset-0 stripe-bg z-0 pointer-events-none" />
  </div>
);

const RotatedLetters = ({ text }: { text: string }) => (
  <div className="flex gap-1 justify-center">
    {text.split('').map((char, i) => (
      <motion.div 
        key={i}
        className="text-[10vw] md:text-[7vw] font-black uppercase leading-none"
        initial={{ rotate: 0 }}
        whileHover={{ rotate: i % 2 === 0 ? 15 : -15 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {char}
      </motion.div>
    ))}
  </div>
);

const BlurText = ({ text }: { text: string }) => (
  <div className="text-[10vw] md:text-[7vw] font-black uppercase leading-none filter blur-[6px] hover:blur-none transition-all duration-500">
    {text}
  </div>
);

const StretchedText = ({ text }: { text: string }) => (
  <div className="text-[8vw] md:text-[5vw] font-bold uppercase leading-none transform scale-x-[2] origin-center tracking-widest">
    {text}
  </div>
);

const GeometricShapes = () => (
  <div className="flex gap-4 items-center justify-center">
    <div className="w-16 h-16 md:w-24 md:h-24 bg-black rounded-full" />
    <div className="w-16 h-16 md:w-24 md:h-24 bg-black" />
    <div className="w-0 h-0 border-l-[32px] border-r-[32px] border-b-[64px] md:border-l-[48px] md:border-r-[48px] md:border-b-[96px] border-l-transparent border-r-transparent border-b-black" />
  </div>
);

const SlicedText = ({ text }: { text: string }) => (
  <div className="relative">
    <div className="text-[10vw] md:text-[7vw] font-black uppercase leading-none clip-path-top">
      {text}
    </div>
    <div className="text-[10vw] md:text-[7vw] font-black uppercase leading-none absolute top-0 left-2 clip-path-bottom text-black/50">
      {text}
    </div>
    <style>{`
      .clip-path-top { clip-path: polygon(0 0, 100% 0, 100% 45%, 0 55%); }
      .clip-path-bottom { clip-path: polygon(0 55%, 100% 45%, 100% 100%, 0 100%); }
    `}</style>
  </div>
);

// --- Card Component ---

const Card = ({ children, title, subtitle, link = "#" }: { children: React.ReactNode, title: string, subtitle?: string, link?: string }) => (
  <motion.div 
    className="flex flex-col gap-4 group cursor-pointer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="aspect-[4/3] bg-white border-2 border-black flex items-center justify-center overflow-hidden relative p-4 hover:bg-black/5 transition-colors duration-300">
      {children}
    </div>
    <div className="flex justify-between items-start border-t border-black pt-2">
      <div>
        <h3 className="text-xl md:text-2xl font-bold uppercase leading-none">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
        Read <ArrowUpRight size={14} />
      </div>
    </div>
  </motion.div>
);

// --- Main Page ---

export default function AbstractTypographyPage() {
  return (
    <div className="min-h-screen bg-[#F2F2F2] text-black font-typo selection:bg-black selection:text-white p-4 md:p-8">
      <TypoStyles />

      {/* Header */}
      <header className="flex justify-between items-end mb-16 md:mb-24 border-b-2 border-black pb-4">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
          AI Mindset<br />POS {`{sprint}`}
        </h1>
        <div className="text-right hidden md:block">
          <div className="font-bold">BATCH X26</div>
          <div className="text-sm">MAR 2 — 14, 2026</div>
        </div>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mb-24">
        
        <Card title="Context" subtitle="Personalization & Data">
          <HeavyBlock text="POS" />
        </Card>

        <Card title="System" subtitle="Architecture & Logic">
          <OutlineDistort text="SYSTEM" />
        </Card>

        <Card title="Agents" subtitle="Automation & Skills">
          <RotatedLetters text="AGENT" />
        </Card>

        <Card title="Focus" subtitle="Attention Management">
          <BlurText text="FOCUS" />
        </Card>

        <Card title="Mindset" subtitle="Philosophy">
          <WavyText text="MINDSET" />
        </Card>

        <Card title="Stack" subtitle="Claude / Cursor / Obsidian">
          <VerticalStripes text="STACK" />
        </Card>

        <Card title="Sprint" subtitle="2 Weeks Intensive">
          <StretchedText text="SPRINT" />
        </Card>

        <Card title="Logic" subtitle="Rules & Constraints">
          <GeometricShapes />
        </Card>

        <Card title="Auto" subtitle="Routine Tasks">
          <SlicedText text="AUTO" />
        </Card>

        <Card title="Alexander" subtitle="Strategist & Founder">
          <HeavyBlock text="ALEX" />
        </Card>

        <Card title="Sergey" subtitle="System Architect">
          <OutlineDistort text="SERGEY" />
        </Card>

        <Card title="Seryozha" subtitle="AI Evangelist">
          <RotatedLetters text="RIS" />
        </Card>

      </div>

      {/* Footer */}
      <footer className="border-t-2 border-black pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="text-[10vw] leading-none font-black opacity-10 uppercase">
          Typo Exhibition
        </div>
        <div className="flex gap-8 text-lg font-bold uppercase">
          <a href="#" className="hover:underline">Podcast</a>
          <a href="#" className="hover:underline">Telegram</a>
          <a href="#" className="hover:underline">Apply</a>
        </div>
      </footer>

    </div>
  );
}
