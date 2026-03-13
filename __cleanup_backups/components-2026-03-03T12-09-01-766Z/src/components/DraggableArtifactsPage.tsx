import React, { useRef } from 'react';
import { motion } from 'framer-motion';

// --- Assets & Components ---

const ClayShape = ({ 
  children, 
  className = "", 
  color = "bg-gray-200", 
  rotation = 0,
  initialX = 0,
  initialY = 0
}: { 
  children: React.ReactNode; 
  className?: string; 
  color?: string; 
  rotation?: number;
  initialX?: number;
  initialY?: number;
}) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
      whileHover={{ scale: 1.1, rotate: rotation + 10, cursor: 'grab' }}
      whileDrag={{ scale: 1.2, cursor: 'grabbing', zIndex: 50 }}
      initial={{ x: initialX, y: initialY, rotate: rotation }}
      className={`absolute flex items-center justify-center shadow-[10px_10px_20px_rgba(0,0,0,0.2),-5px_-5px_15px_rgba(255,255,255,0.2)] ${color} ${className}`}
      style={{ touchAction: 'none' }}
    >
      {children}
    </motion.div>
  );
};

// --- Artifacts ---

const NeuralBrain = () => (
  <ClayShape className="w-32 h-32 rounded-full bg-[#E0E0E0]" rotation={15} initialX={-300} initialY={-200}>
    <div className="text-6xl filter drop-shadow-lg grayscale opacity-80">🧠</div>
  </ClayShape>
);

const RoboEye = () => (
  <ClayShape className="w-24 h-24 rounded-full bg-[#F0F0F0]" rotation={-20} initialX={300} initialY={-250}>
    <div className="text-5xl filter drop-shadow-lg">👁️</div>
  </ClayShape>
);

const DataCube = () => (
  <ClayShape className="w-28 h-28 rounded-xl bg-[#333]" rotation={45} initialX={-400} initialY={100}>
    <div className="text-5xl filter drop-shadow-lg">🧊</div>
  </ClayShape>
);

const TokenCoin = () => (
  <ClayShape className="w-20 h-20 rounded-full bg-[#FFD700]" rotation={-10} initialX={400} initialY={50}>
    <div className="text-4xl font-black text-[#B8860B]">$</div>
  </ClayShape>
);

const ChipSet = () => (
  <ClayShape className="w-36 h-24 rounded-lg bg-[#2F4F4F]" rotation={5} initialX={-200} initialY={300}>
    <div className="text-5xl filter drop-shadow-lg">💾</div>
  </ClayShape>
);

const MagicWand = () => (
  <ClayShape className="w-48 h-12 rounded-full bg-[#8B4513]" rotation={-45} initialX={250} initialY={250}>
    <div className="text-3xl filter drop-shadow-lg">🪄</div>
  </ClayShape>
);

const Rocket = () => (
  <ClayShape className="w-24 h-24 rounded-full bg-white" rotation={30} initialX={0} initialY={-350}>
    <div className="text-5xl filter drop-shadow-lg">🚀</div>
  </ClayShape>
);

const Ghost = () => (
  <ClayShape className="w-20 h-24 rounded-t-full rounded-b-lg bg-white" rotation={-15} initialX={350} initialY={-100}>
    <div className="text-4xl filter drop-shadow-lg">👻</div>
  </ClayShape>
);

// --- Main Layout ---

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 p-6 md:p-12 flex justify-between items-center text-[#1A1A1A] font-sans font-medium">
    <div className="flex items-center gap-3 text-xl tracking-tight">
      <div className="w-8 h-8 rounded-full border border-[#1A1A1A]/30 bg-white/40 flex items-center justify-center">
        <img
          src="/assets/ai-mindset-logo.png"
          alt="AI Mindset logo"
          className="h-4 w-auto object-contain opacity-85"
        />
      </div>
      <span>AI Mindset</span>
    </div>
    <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest opacity-60">
      <a href="#" className="hover:opacity-100">Exhibition</a>
      <a href="#" className="hover:opacity-100">Artist</a>
      <a href="#" className="hover:opacity-100">Gallery</a>
    </nav>
    <a href="https://join.aimindset.org/context" className="text-xl font-bold hover:underline">Contacts</a>
  </header>
);

const Footer = () => (
  <footer className="fixed bottom-0 left-0 right-0 z-40 p-6 md:p-12 text-[#1A1A1A] pointer-events-none">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
      <p className="font-serif text-sm md:text-base leading-relaxed max-w-4xl opacity-80 text-justify md:text-left pointer-events-auto">
        Vortex Gallery is more than a space for art — we are a portal to new dimensions of thought, emotion, and creativity. 
        Our mission is to explore the convergence of the past, present, and future, challenging boundaries and perceptions 
        through bold, innovative exhibitions that defy convention. We believe that art is a vortex: a powerful force that 
        draws you in, twists reality, and reshapes your understanding of the world.
      </p>
      
      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="text-right font-bold leading-tight">
          Endless<br/>Tools
        </div>
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-[#1A1A1A] rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default function DraggableArtifactsPage() {
  const containerRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#FF9F1C] text-[#1A1A1A] font-sans overflow-hidden relative selection:bg-black selection:text-[#FF9F1C]">
      <Header />
      
      {/* Main Content Area */}
      <main ref={containerRef} className="absolute inset-0 flex items-center justify-center z-10">
        
        {/* Central Text */}
        <div className="relative z-0 text-center pointer-events-none select-none px-4">
          <h1 className="text-[12vw] md:text-[10vw] font-medium leading-[0.9] tracking-tight text-[#1A1A1A]">
            AI Mindset Lab<br/>
            200 Eastern Parkway<br/>
            Brooklyn, New York
          </h1>
          <div className="mt-8 font-serif text-xl md:text-2xl italic opacity-60">
            Powered by Intelligence
          </div>
        </div>

        {/* Draggable Artifacts Layer */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-full h-full max-w-[1000px] max-h-[800px] pointer-events-auto">
            <NeuralBrain />
            <RoboEye />
            <DataCube />
            <TokenCoin />
            <ChipSet />
            <MagicWand />
            <Rocket />
            <Ghost />
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
