import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

// --- Dark Mode SVGs ---

const Elephant = ({ fillLevel = 0, className = "w-32 h-32" }) => {
  const fills = ['#000', '#222', '#555', '#aaa', '#fff'];
  const fill = fills[fillLevel];
  const stroke = fillLevel === 4 ? "#000" : "#fff";
  return (
    <svg viewBox="0 0 100 100" className={`overflow-visible ${className}`}>
      <path d="M 20 50 Q 20 20 50 20 Q 80 20 80 50 L 80 80 L 65 80 L 65 60 L 55 60 L 55 80 L 40 80 L 40 60 L 30 60 L 30 80 L 15 80 Z" fill={fill} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      <path d="M 80 40 Q 95 40 95 60 Q 95 70 85 70" fill="none" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
      <path d="M 60 30 Q 75 20 75 45 Q 75 60 60 50 Z" fill={fill} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="70" cy="35" r="2" fill={fillLevel === 0 ? "white" : "black"} />
    </svg>
  );
};

const Navigator = ({ pose = 'run', className = "w-16 h-32" }) => (
  <svg viewBox="0 0 50 100" className={`overflow-visible ${className}`}>
    <circle cx="25" cy="20" r="10" fill="black" stroke="white" strokeWidth="2" />
    <line x1="25" y1="30" x2="25" y2="60" stroke="white" strokeWidth="2" />
    {pose === 'run' && (
      <>
        <line x1="25" y1="40" x2="10" y2="50" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="40" x2="40" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="60" x2="15" y2="85" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="60" x2="35" y2="85" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </>
    )}
    {pose === 'lead' && (
      <>
        <line x1="25" y1="40" x2="10" y2="50" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="40" x2="45" y2="45" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="60" x2="20" y2="90" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="60" x2="30" y2="90" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </>
    )}
    {pose === 'stand' && (
      <>
        <line x1="25" y1="40" x2="15" y2="55" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="40" x2="35" y2="55" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="60" x2="20" y2="90" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="60" x2="30" y2="90" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </>
    )}
    {pose === 'sit' && (
      <>
        <line x1="25" y1="40" x2="15" y2="50" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="40" x2="35" y2="50" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="60" x2="40" y2="60" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="40" y1="60" x2="40" y2="80" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </>
    )}
  </svg>
);

const Monkey = ({ quiet = false, className = "w-12 h-12" }) => (
  <svg viewBox="0 0 50 50" className={className}>
    <circle cx="25" cy="25" r="15" fill="black" stroke="white" strokeWidth="2" />
    <circle cx="10" cy="20" r="6" fill="black" stroke="white" strokeWidth="2" />
    <circle cx="40" cy="20" r="6" fill="black" stroke="white" strokeWidth="2" />
    <circle cx="20" cy="22" r="2" fill="white" />
    <circle cx="30" cy="22" r="2" fill="white" />
    {quiet ? (
      <line x1="20" y1="35" x2="30" y2="35" stroke="white" strokeWidth="2" strokeLinecap="round" />
    ) : (
      <path d="M 20 32 Q 25 38 30 32" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
    )}
  </svg>
);

const Rabbit = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 50 50" className={className}>
    <ellipse cx="25" cy="35" rx="12" ry="10" fill="black" stroke="white" strokeWidth="2" />
    <ellipse cx="20" cy="15" rx="4" ry="12" fill="black" stroke="white" strokeWidth="2" transform="rotate(-15 20 15)" />
    <ellipse cx="30" cy="15" rx="4" ry="12" fill="black" stroke="white" strokeWidth="2" transform="rotate(15 30 15)" />
    <circle cx="22" cy="32" r="1" fill="white" />
    <circle cx="28" cy="32" r="1" fill="white" />
  </svg>
);

const Fire = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 50 50" className={className}>
    <path d="M 25 5 Q 35 25 25 45 Q 15 25 25 5 Z" fill="#ff4400" stroke="white" strokeWidth="2" strokeLinejoin="round" />
    <path d="M 25 15 Q 30 30 25 45 Q 20 30 25 15 Z" fill="#ffaa00" stroke="white" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const Lasso = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 50 50" className={className}>
    <ellipse cx="25" cy="20" rx="20" ry="10" fill="none" stroke="white" strokeWidth="2" strokeDasharray="4 2" />
    <path d="M 45 20 Q 45 40 25 45" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Crystal = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 50 50" className={className}>
    <polygon points="25,5 45,25 25,45 5,25" fill="black" stroke="white" strokeWidth="2" strokeLinejoin="round" />
    <line x1="25" y1="5" x2="25" y2="45" stroke="white" strokeWidth="2" />
    <line x1="5" y1="25" x2="45" y2="25" stroke="white" strokeWidth="2" />
  </svg>
);

const Gear = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 50 50" className={`${className} animate-[spin_10s_linear_infinite]`}>
    <circle cx="25" cy="25" r="15" fill="black" stroke="white" strokeWidth="2" />
    <circle cx="25" cy="25" r="5" fill="black" stroke="white" strokeWidth="2" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
      <line key={angle} x1="25" y1="10" x2="25" y2="5" stroke="white" strokeWidth="4" transform={`rotate(${angle} 25 25)`} strokeLinecap="round" />
    ))}
  </svg>
);

const Mirror = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 50 50" className={className}>
    <ellipse cx="25" cy="20" rx="12" ry="18" fill="black" stroke="white" strokeWidth="2" />
    <line x1="15" y1="45" x2="35" y2="45" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="25" y1="38" x2="25" y2="45" stroke="white" strokeWidth="2" />
    <path d="M 20 15 L 30 25" stroke="white" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const Sword = ({ className = "w-8 h-24" }) => (
  <svg viewBox="0 0 50 100" className={className}>
    <line x1="25" y1="10" x2="25" y2="70" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <polygon points="25,5 28,15 22,15" fill="white" />
    <line x1="15" y1="70" x2="35" y2="70" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <line x1="25" y1="70" x2="25" y2="90" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <circle cx="25" cy="90" r="3" fill="white" />
  </svg>
);

// --- Components ---

const Bubble = ({ children, className = "", size = "md", delay = 0 }: { children?: React.ReactNode; className?: string; size?: 'sm' | 'md' | 'lg' | 'xl'; delay?: number }) => {
  const sizes = {
    sm: "w-24 h-24 md:w-32 md:h-32",
    md: "w-40 h-40 md:w-56 md:h-56",
    lg: "w-64 h-64 md:w-80 md:h-80",
    xl: "w-80 h-80 md:w-96 md:h-96"
  };

  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay, type: "spring" }}
      className={`rounded-full flex items-center justify-center text-center p-6 relative ${sizes[size]} ${className}`}
    >
      {children}
    </motion.div>
  );
};

const CloudCluster = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative flex flex-wrap justify-center items-center -space-x-8 md:-space-x-12 -space-y-8 md:-space-y-12 ${className}`}>
    {children}
  </div>
);

const Hero = () => (
  <section className="min-h-screen flex items-center justify-center relative py-20 border-b border-[#4D9FFF]/30">
    {/* Blueprint Grid Background */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(77,159,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(77,159,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
    
    <CloudCluster className="z-10">
      <Bubble size="lg" className="bg-white text-black z-10 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none">
          AI
        </h1>
      </Bubble>
      <Bubble size="xl" className="bg-white text-black z-20 -mt-12 shadow-[0_0_60px_rgba(255,255,255,0.3)]">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
          MINDSET
        </h1>
      </Bubble>
      <Bubble size="lg" className="bg-white text-black z-10 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none">
          LAB
        </h1>
      </Bubble>
      
      {/* Orbiting smaller nodes */}
      <Bubble size="sm" className="absolute -top-20 -left-10 border border-[#4D9FFF] text-[#4D9FFF] bg-black z-0">
        <span className="font-mono text-xs">CHAOS</span>
      </Bubble>
      <Bubble size="sm" className="absolute -bottom-20 -right-10 border border-[#4D9FFF] text-[#4D9FFF] bg-black z-0">
        <span className="font-mono text-xs">ORDER</span>
      </Bubble>
    </CloudCluster>

    <div className="absolute bottom-12 left-0 right-0 text-center text-[#4D9FFF] font-mono text-xs uppercase tracking-widest animate-pulse">
      [ SCROLL TO EXPLORE THE CLOUD ]
    </div>
  </section>
);

const PathSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const stages = [
    {
      num: "I",
      title: "LEVEL OF CHAOS",
      desc: "The Navigator runs after the black Elephant. The Monkey throws distractions. Huge cognitive load. You try AI, but everything remains disjointed.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <Elephant fillLevel={0} className="w-24 h-24 absolute right-4 bottom-4" />
          <Navigator pose="run" className="w-12 h-24 absolute left-4 bottom-4" />
          <Monkey className="w-10 h-10 absolute top-4 right-8" />
          <Fire className="w-16 h-16 absolute -top-4 -left-4" />
        </div>
      )
    },
    {
      num: "II",
      title: "PROMPT ENGINEERING",
      desc: "The Navigator gets the Lasso. The Elephant starts to lighten. Transition from simple questions to structured prompts and Custom GPTs.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <Elephant fillLevel={1} className="w-24 h-24 absolute left-8 bottom-4" />
          <Navigator pose="lead" className="w-12 h-24 absolute right-4 bottom-4" />
          <Lasso className="w-12 h-12 absolute right-8 top-8" />
          <Rabbit className="w-8 h-8 absolute left-4 bottom-4" />
        </div>
      )
    },
    {
      num: "III",
      title: "CONTEXT ENGINEERING",
      desc: "The Navigator leads the Elephant. The Monkey is quiet. Crystals (Knowledge) and Gears (Automations) appear. The Elephant has context.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <Elephant fillLevel={2} className="w-24 h-24 absolute right-8 bottom-4" />
          <Navigator pose="lead" className="w-12 h-24 absolute left-8 bottom-4" />
          <Monkey quiet className="w-10 h-10 absolute top-8 right-4" />
          <Crystal className="w-10 h-10 absolute bottom-8 -left-4" />
          <Gear className="w-10 h-10 absolute top-4 left-8" />
        </div>
      )
    },
    {
      num: "IV",
      title: "MIND ENGINEERING",
      desc: "The Elephant is almost white. Navigator and Elephant look in the same direction. AI becomes a tool for coaching and decision support.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <Elephant fillLevel={3} className="w-24 h-24 absolute left-8 bottom-4" />
          <Navigator pose="stand" className="w-12 h-24 absolute right-8 bottom-4" />
          <Mirror className="w-12 h-12 absolute top-8 left-1/2 -translate-x-1/2" />
        </div>
      )
    },
    {
      num: "V",
      title: "LIFE ENGINEERING",
      desc: "The Elephant is completely white. The Navigator confidently sits on it, holding a Sword to carve prototypes from ideas.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <Elephant fillLevel={4} className="w-32 h-32 absolute right-4 bottom-0" />
          <Navigator pose="sit" className="w-12 h-24 absolute right-12 bottom-16" />
          <Sword className="w-8 h-20 absolute right-6 bottom-20" />
        </div>
      )
    }
  ];

  return (
    <section ref={containerRef} className="py-32 relative max-w-6xl mx-auto px-4">
      {/* Central Blueprint Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#4D9FFF]/20 -translate-x-1/2 hidden md:block" />
      <motion.div 
        className="absolute left-1/2 top-0 w-px bg-[#4D9FFF] -translate-x-1/2 hidden md:block shadow-[0_0_10px_#4D9FFF]"
        style={{ height: lineHeight }}
      />

      <div className="space-y-32">
        {stages.map((stage, i) => (
          <div key={i} className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            
            {/* Visual Node */}
            <div className="w-full md:w-1/2 flex justify-center relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-64 h-64 rounded-full border border-[#4D9FFF] bg-black/50 backdrop-blur-sm flex items-center justify-center relative shadow-[inset_0_0_30px_rgba(77,159,255,0.1)]"
              >
                {/* Connection point to center line */}
                <div className={`absolute top-1/2 -translate-y-1/2 w-12 h-px bg-[#4D9FFF]/50 hidden md:block ${i % 2 === 0 ? '-right-12' : '-left-12'}`} />
                
                {stage.visual}
              </motion.div>
            </div>

            {/* Text Content */}
            <div className={`w-full md:w-1/2 flex flex-col ${i % 2 === 0 ? 'md:items-start text-left' : 'md:items-end md:text-right'} items-center text-center`}>
              <div className="font-mono text-[#4D9FFF] text-sm mb-2 tracking-widest">STAGE {stage.num}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{stage.title}</h3>
              <p className="text-gray-400 leading-relaxed max-w-md">
                {stage.desc}
              </p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="border-t border-[#4D9FFF]/30 py-20 relative overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(77,159,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(77,159,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
    
    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
      <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">
        READY TO RIDE?
      </h2>
      <button className="px-8 py-4 bg-[#4D9FFF] text-black font-bold font-mono tracking-widest hover:bg-white transition-colors uppercase text-sm">
        Initialize System
      </button>
      
      <div className="mt-20 font-mono text-xs uppercase text-[#4D9FFF]/50">
        © 2026 AI Mindset Lab. All systems nominal.
      </div>
    </div>
  </footer>
);

export default function CloudPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#4D9FFF] selection:text-black border-[8px] border-[#4D9FFF]">
      <main>
        <Hero />
        <PathSection />
      </main>
      <Footer />
    </div>
  );
}
