import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const LavenderStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

    .font-inter { font-family: 'Inter', sans-serif; }
    .font-grotesk { font-family: 'Space Grotesk', sans-serif; }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    .sketch-box {
      border: 2px solid black;
      border-radius: 2% 6% 5% 4% / 1% 1% 2% 4%;
      background: white; 
      position: relative;
      padding: 2rem;
      box-shadow: 4px 4px 0px rgba(0,0,0,1);
    }
  `}</style>
);

// --- SVG Illustrations ---

const Elephant = ({ fillLevel = 0, className = "w-32 h-32" }) => {
  const fills = ['#000', '#444', '#888', '#ccc', '#fff'];
  const fill = fills[fillLevel];
  return (
    <svg viewBox="0 0 100 100" className={`overflow-visible ${className}`}>
      <path d="M 20 50 Q 20 20 50 20 Q 80 20 80 50 L 80 80 L 65 80 L 65 60 L 55 60 L 55 80 L 40 80 L 40 60 L 30 60 L 30 80 L 15 80 Z" fill={fill} stroke="black" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 80 40 Q 95 40 95 60 Q 95 70 85 70" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" />
      <path d="M 60 30 Q 75 20 75 45 Q 75 60 60 50 Z" fill={fill} stroke="black" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="70" cy="35" r="2" fill={fillLevel === 0 ? "white" : "black"} />
    </svg>
  );
};

const Navigator = ({ pose = 'run', className = "w-16 h-32" }) => (
  <svg viewBox="0 0 50 100" className={`overflow-visible ${className}`}>
    <circle cx="25" cy="20" r="10" fill="white" stroke="black" strokeWidth="2" />
    <line x1="25" y1="30" x2="25" y2="60" stroke="black" strokeWidth="2" />
    {pose === 'run' && (
      <>
        <line x1="25" y1="40" x2="10" y2="50" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="40" x2="40" y2="30" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="60" x2="15" y2="85" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="60" x2="35" y2="85" stroke="black" strokeWidth="2" strokeLinecap="round" />
      </>
    )}
    {pose === 'lead' && (
      <>
        <line x1="25" y1="40" x2="10" y2="50" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="40" x2="45" y2="45" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="60" x2="20" y2="90" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="60" x2="30" y2="90" stroke="black" strokeWidth="2" strokeLinecap="round" />
      </>
    )}
    {pose === 'stand' && (
      <>
        <line x1="25" y1="40" x2="15" y2="55" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="40" x2="35" y2="55" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="60" x2="20" y2="90" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="60" x2="30" y2="90" stroke="black" strokeWidth="2" strokeLinecap="round" />
      </>
    )}
    {pose === 'sit' && (
      <>
        <line x1="25" y1="40" x2="15" y2="50" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="40" x2="35" y2="50" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="60" x2="40" y2="60" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <line x1="40" y1="60" x2="40" y2="80" stroke="black" strokeWidth="2" strokeLinecap="round" />
      </>
    )}
  </svg>
);

const Monkey = ({ quiet = false, className = "w-12 h-12" }) => (
  <svg viewBox="0 0 50 50" className={className}>
    <circle cx="25" cy="25" r="15" fill="white" stroke="black" strokeWidth="2" />
    <circle cx="10" cy="20" r="6" fill="white" stroke="black" strokeWidth="2" />
    <circle cx="40" cy="20" r="6" fill="white" stroke="black" strokeWidth="2" />
    <circle cx="20" cy="22" r="2" fill="black" />
    <circle cx="30" cy="22" r="2" fill="black" />
    {quiet ? (
      <line x1="20" y1="35" x2="30" y2="35" stroke="black" strokeWidth="2" strokeLinecap="round" />
    ) : (
      <path d="M 20 32 Q 25 38 30 32" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
    )}
  </svg>
);

const Rabbit = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 50 50" className={className}>
    <ellipse cx="25" cy="35" rx="12" ry="10" fill="white" stroke="black" strokeWidth="2" />
    <ellipse cx="20" cy="15" rx="4" ry="12" fill="white" stroke="black" strokeWidth="2" transform="rotate(-15 20 15)" />
    <ellipse cx="30" cy="15" rx="4" ry="12" fill="white" stroke="black" strokeWidth="2" transform="rotate(15 30 15)" />
    <circle cx="22" cy="32" r="1" fill="black" />
    <circle cx="28" cy="32" r="1" fill="black" />
  </svg>
);

const Fire = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 50 50" className={className}>
    <path d="M 25 5 Q 35 25 25 45 Q 15 25 25 5 Z" fill="#ff4400" stroke="black" strokeWidth="2" strokeLinejoin="round" />
    <path d="M 25 15 Q 30 30 25 45 Q 20 30 25 15 Z" fill="#ffaa00" stroke="black" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const Lasso = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 50 50" className={className}>
    <ellipse cx="25" cy="20" rx="20" ry="10" fill="none" stroke="black" strokeWidth="2" strokeDasharray="4 2" />
    <path d="M 45 20 Q 45 40 25 45" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Crystal = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 50 50" className={className}>
    <polygon points="25,5 45,25 25,45 5,25" fill="white" stroke="black" strokeWidth="2" strokeLinejoin="round" />
    <line x1="25" y1="5" x2="25" y2="45" stroke="black" strokeWidth="2" />
    <line x1="5" y1="25" x2="45" y2="25" stroke="black" strokeWidth="2" />
  </svg>
);

const Gear = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 50 50" className={`${className} animate-[spin_10s_linear_infinite]`}>
    <circle cx="25" cy="25" r="15" fill="white" stroke="black" strokeWidth="2" />
    <circle cx="25" cy="25" r="5" fill="white" stroke="black" strokeWidth="2" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
      <line key={angle} x1="25" y1="10" x2="25" y2="5" stroke="black" strokeWidth="4" transform={`rotate(${angle} 25 25)`} strokeLinecap="round" />
    ))}
  </svg>
);

const Mirror = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 50 50" className={className}>
    <ellipse cx="25" cy="20" rx="12" ry="18" fill="white" stroke="black" strokeWidth="2" />
    <line x1="15" y1="45" x2="35" y2="45" stroke="black" strokeWidth="2" strokeLinecap="round" />
    <line x1="25" y1="38" x2="25" y2="45" stroke="black" strokeWidth="2" />
    <path d="M 20 15 L 30 25" stroke="black" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const Sword = ({ className = "w-8 h-24" }) => (
  <svg viewBox="0 0 50 100" className={className}>
    <line x1="25" y1="10" x2="25" y2="70" stroke="black" strokeWidth="4" strokeLinecap="round" />
    <polygon points="25,5 28,15 22,15" fill="black" />
    <line x1="15" y1="70" x2="35" y2="70" stroke="black" strokeWidth="4" strokeLinecap="round" />
    <line x1="25" y1="70" x2="25" y2="90" stroke="black" strokeWidth="4" strokeLinecap="round" />
    <circle cx="25" cy="90" r="3" fill="black" />
  </svg>
);

const Rainbow = ({ className = "w-32 h-16" }) => (
  <svg viewBox="0 0 100 50" className={className}>
    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="black" strokeWidth="2" strokeDasharray="4 4" />
    <path d="M 20 50 A 30 30 0 0 1 80 50" fill="none" stroke="black" strokeWidth="2" />
    <path d="M 30 50 A 20 20 0 0 1 70 50" fill="none" stroke="black" strokeWidth="2" strokeDasharray="2 2" />
  </svg>
);

const BrokenPhone = ({ className = "w-8 h-12" }) => (
  <svg viewBox="0 0 50 80" className={className}>
    <rect x="10" y="10" width="30" height="60" rx="4" fill="white" stroke="black" strokeWidth="2" />
    <path d="M 20 10 L 30 30 L 15 45 L 40 60" fill="none" stroke="black" strokeWidth="1" />
  </svg>
);

const CourseMountain = ({ className = "w-16 h-12" }) => (
  <svg viewBox="0 0 100 60" className={className}>
    <path d="M 10 50 L 30 20 L 50 50 Z" fill="white" stroke="black" strokeWidth="2" strokeLinejoin="round" />
    <path d="M 40 50 L 60 10 L 90 50 Z" fill="white" stroke="black" strokeWidth="2" strokeLinejoin="round" />
    <text x="50" y="45" fontSize="8" fontFamily="monospace" fill="black" textAnchor="middle">1000 PROMPTS</text>
  </svg>
);

const HypeIcons = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 50 50" className={className}>
    <rect x="5" y="5" width="15" height="15" rx="2" fill="white" stroke="black" strokeWidth="2" transform="rotate(15 12 12)" />
    <circle cx="35" cy="15" r="8" fill="white" stroke="black" strokeWidth="2" />
    <polygon points="25,30 40,45 10,45" fill="white" stroke="black" strokeWidth="2" transform="rotate(-10 25 37)" strokeLinejoin="round" />
  </svg>
);

// --- Main Component ---

export default function AiMindsetElephantPathPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-[#C4B5FD] text-black selection:bg-black selection:text-[#C4B5FD] hide-scrollbar font-inter relative">
      <LavenderStyles />

      {/* Navigation */}
      <nav className="px-6 py-8 md:px-12 flex justify-between items-start sticky top-0 z-50 pointer-events-none">
        <div className="text-xl font-grotesk font-bold tracking-tight pointer-events-auto bg-[#C4B5FD] px-2 py-1 rounded">
          AI MINDSET
        </div>
        <div className="hidden md:flex gap-12 text-2xl font-grotesk font-normal tracking-tight pointer-events-auto bg-[#C4B5FD] px-4 py-2 rounded-full border border-black">
          <a href="#path" className="hover:opacity-60 transition-opacity">THE PATH</a>
          <a href="#sprint" className="hover:opacity-60 transition-opacity">SPRINT</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-12 pt-10 pb-20 flex flex-col items-center text-center relative z-10">
         <h1 className="text-5xl md:text-[8vw] font-grotesk font-medium leading-[0.9] tracking-tighter mb-8">
           THE ELEPHANT'S<br/>PATH
         </h1>
         <p className="text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12">
           A metaphor for the transformation of your AI mindset. From the chaos of prompts to a personal AI operating system. Mindset is more important than tools.
         </p>
      </section>

      {/* The Path Section */}
      <section id="path" className="relative w-full max-w-5xl mx-auto px-6 py-12">
        
        {/* Central Zigzag Line (Background) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-black/30 -translate-x-1/2 z-0 hidden md:block"></div>

        <div className="space-y-32 md:space-y-48 relative z-10">
          
          {/* Stage I: Chaos */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
              <div className="relative w-64 h-64 flex items-center justify-center">
                <Elephant fillLevel={0} className="w-32 h-32 absolute right-0 bottom-0" />
                <Navigator pose="run" className="w-16 h-32 absolute left-0 bottom-0" />
                <Monkey className="w-12 h-12 absolute top-0 right-10" />
                <Fire className="w-20 h-20 absolute -top-4 -left-4" />
                
                {/* Distractions */}
                <BrokenPhone className="w-6 h-10 absolute bottom-0 -left-12 opacity-60" />
                <CourseMountain className="w-16 h-12 absolute top-1/2 -right-12 opacity-60" />
                <HypeIcons className="w-10 h-10 absolute -bottom-8 right-1/2 opacity-60" />
              </div>
            </div>
            <div className="w-full md:w-1/2 sketch-box">
              <h3 className="font-grotesk text-2xl font-bold mb-2">I. Level of Chaos</h3>
              <p className="font-mono text-sm uppercase opacity-60 mb-4">Before Start</p>
              <p className="leading-relaxed">
                The Navigator runs after the black Elephant. The Monkey throws icons of different apps. Huge cognitive load (Fire). You try AI, but everything remains disjointed, there is no system.
              </p>
            </div>
          </div>

          {/* Stage II: Prompt Engineering */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2 flex justify-center md:justify-start relative">
              <div className="relative w-64 h-64 flex items-center justify-center">
                <Elephant fillLevel={1} className="w-32 h-32 absolute left-10 bottom-0" />
                <Navigator pose="lead" className="w-16 h-32 absolute right-0 bottom-0" />
                <Lasso className="w-16 h-16 absolute right-10 top-10" />
                <Rabbit className="w-10 h-10 absolute left-0 bottom-0" />
              </div>
            </div>
            <div className="w-full md:w-1/2 sketch-box text-left md:text-right">
              <h3 className="font-grotesk text-2xl font-bold mb-2">II. Prompt Engineering</h3>
              <p className="font-mono text-sm uppercase opacity-60 mb-4">Week 1: The Lasso Appears</p>
              <p className="leading-relaxed">
                The Navigator gets the Lasso (structured prompt). The Elephant starts to lighten. Transition from simple questions to Chain-of-Thought and Few-Shot Learning. First Custom GPTs appear.
              </p>
            </div>
          </div>

          {/* Stage III: Context Engineering */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
              <div className="relative w-64 h-64 flex items-center justify-center">
                <Elephant fillLevel={2} className="w-32 h-32 absolute right-10 bottom-0" />
                <Navigator pose="lead" className="w-16 h-32 absolute left-10 bottom-0" />
                <Monkey quiet className="w-12 h-12 absolute top-10 right-0" />
                <Crystal className="w-12 h-12 absolute bottom-10 -left-10" />
                <Gear className="w-12 h-12 absolute top-0 left-10" />
              </div>
            </div>
            <div className="w-full md:w-1/2 sketch-box">
              <h3 className="font-grotesk text-2xl font-bold mb-2">III. Context Engineering</h3>
              <p className="font-mono text-sm uppercase opacity-60 mb-4">Week 2: Taming the Flow</p>
              <p className="leading-relaxed">
                The Navigator leads the Elephant. The Monkey is quiet. Crystals (Knowledge bases) and Gears (Automations) appear. The Elephant no longer runs away because it has context and connections.
              </p>
            </div>
          </div>

          {/* Stage IV: Mind Engineering */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2 flex justify-center md:justify-start relative">
              <div className="relative w-64 h-64 flex items-center justify-center">
                <Elephant fillLevel={3} className="w-32 h-32 absolute left-10 bottom-0" />
                <Navigator pose="stand" className="w-16 h-32 absolute right-10 bottom-0" />
                <Mirror className="w-16 h-16 absolute top-10 left-1/2 -translate-x-1/2" />
              </div>
            </div>
            <div className="w-full md:w-1/2 sketch-box text-left md:text-right">
              <h3 className="font-grotesk text-2xl font-bold mb-2">IV. Mind Engineering</h3>
              <p className="font-mono text-sm uppercase opacity-60 mb-4">Week 3: Synchronization</p>
              <p className="leading-relaxed">
                The Elephant is almost white. Navigator and Elephant look in the same direction. The Rabbit disappears. AI becomes a tool for coaching, rituals, and decision support (The Mirror).
              </p>
            </div>
          </div>

          {/* Stage V: Life Engineering */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
              <div className="relative w-64 h-64 flex items-center justify-center">
                <Elephant fillLevel={4} className="w-40 h-40 absolute right-0 bottom-0" />
                <Navigator pose="sit" className="w-16 h-32 absolute right-12 bottom-20" />
                <Sword className="w-12 h-24 absolute right-4 bottom-24" />
              </div>
            </div>
            <div className="w-full md:w-1/2 sketch-box">
              <h3 className="font-grotesk text-2xl font-bold mb-2">V. Life Engineering</h3>
              <p className="font-mono text-sm uppercase opacity-60 mb-4">Week 4: Riding the System</p>
              <p className="leading-relaxed">
                The Elephant is completely white. The Navigator confidently sits on it, holding a Sword (Vibe-coding) to quickly carve prototypes from ideas. The mind is a completely malleable tool of realization.
              </p>
            </div>
          </div>

          {/* Finale */}
          <div className="flex flex-col items-center gap-8 text-center pt-20">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <Rainbow className="w-48 h-24 absolute top-0" />
              <Elephant fillLevel={4} className="w-32 h-32 absolute bottom-0" />
              <Navigator pose="sit" className="w-12 h-24 absolute bottom-16" />
            </div>
            <div className="max-w-2xl sketch-box bg-black text-white">
              <h3 className="font-grotesk text-3xl font-bold mb-2 text-[#C4B5FD]">Beyond the Lab</h3>
              <p className="font-mono text-sm uppercase opacity-60 mb-4">The AI-First World</p>
              <p className="leading-relaxed text-lg">
                At the top of the mountain, the Navigator returns to their work (HR, management, design), but now "flying" on a white Elephant, implementing AI agents into real business processes.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer / CTA */}
      <section id="sprint" className="px-6 md:px-12 py-32 border-t border-black/10 mt-20">
         <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-grotesk font-bold mb-8">
               START YOUR PATH
            </h2>
            <p className="text-xl mb-12">
               Join the POS {`{sprint}`} and build your Personal Operational System in 2 weeks.
            </p>
            <button className="px-12 py-6 bg-black text-white rounded-full font-grotesk text-xl font-bold hover:bg-white hover:text-black border-2 border-black transition-colors shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1">
               APPLY NOW
            </button>
         </div>
      </section>

    </div>
  );
}
