import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Maximize2, Minus, X } from 'lucide-react';

// --- Styles ---

const PaperCutoutStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Mono:wght@400;700&display=swap');

    .font-inter { font-family: 'Inter', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    .font-space { font-family: 'Space Mono', monospace; }
    
    .noise-bg {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E");
    }
    
    .paper-tear {
      clip-path: polygon(0% 0%, 100% 0%, 100% 90%, 95% 92%, 90% 88%, 85% 91%, 80% 89%, 75% 92%, 70% 88%, 65% 91%, 60% 89%, 55% 92%, 50% 88%, 45% 91%, 40% 89%, 35% 92%, 30% 88%, 25% 91%, 20% 89%, 15% 92%, 10% 88%, 5% 91%, 0% 90%);
    }

    .cutout-mask {
      mask-image: radial-gradient(circle at center, black 40%, transparent 70%);
      -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 70%);
    }
  `}</style>
);

// --- Components ---

const NavLink = ({ text }: { text: string }) => (
  <a href="#" className="font-mono text-[10px] uppercase tracking-widest hover:opacity-50 transition-opacity duration-300">
    {text}
  </a>
);

const MacWindow = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
    {/* Window Header */}
    <div className="bg-[#F6F6F6] px-4 py-3 flex items-center border-b border-[#E5E5E5]">
      <div className="flex gap-2 mr-4">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
        <div className="w-3 h-3 rounded-full bg-[#28C940] border border-[#1AAB29]" />
      </div>
      <div className="flex-grow text-center">
        <span className="text-xs font-medium text-gray-500 flex items-center justify-center gap-2">
           <span className="opacity-50">📁</span> {title}
        </span>
      </div>
      <div className="w-16" /> {/* Spacer for balance */}
    </div>
    {/* Window Content */}
    <div className="p-8 md:p-16 bg-white">
      {children}
    </div>
  </div>
);

const CutoutSilhouette = ({ src, className = "" }: { src: string, className?: string }) => (
  <div className={`relative overflow-hidden group ${className}`}>
    <div className="absolute inset-0 bg-white mix-blend-exclusion z-10 opacity-0 group-hover:opacity-20 transition-opacity" />
    <img 
      src={src} 
      alt="Silhouette" 
      className="w-full h-full object-cover grayscale contrast-150 brightness-125"
      style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }}
    />
  </div>
);

// --- Main Page ---

export default function PaperCutoutPage() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  const textureY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-inter selection:bg-[#1A1A1A] selection:text-white overflow-x-hidden" ref={scrollRef}>
      <PaperCutoutStyles />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-start z-50 mix-blend-difference text-white">
        <div className="pointer-events-auto">
          <h1 className="font-mono text-[10px] tracking-widest uppercase font-bold">Non-Objective</h1>
        </div>
        <div className="flex gap-8 pointer-events-auto hidden md:flex">
          <NavLink text="Gallery" />
          <NavLink text="Archive" />
          <NavLink text="Studio" />
          <NavLink text="Extensions" />
        </div>
        <div className="pointer-events-auto text-right flex gap-4">
          <NavLink text="Email" />
          <NavLink text="Instagram" />
        </div>
      </nav>

      {/* Hero Section - Arsight Style */}
      <section className="min-h-screen flex flex-col items-center justify-center relative pt-20">
        <h1 className="text-[15vw] font-space font-bold tracking-tighter text-[#555] mb-8 z-10 mix-blend-multiply">
          arsight
        </h1>
        
        {/* Marble Texture Strip */}
        <div className="w-full h-64 md:h-96 overflow-hidden relative my-8">
           <motion.div 
             style={{ y: textureY }}
             className="absolute inset-0 w-full h-[120%] bg-cover bg-center grayscale contrast-125"
             initial={{ scale: 1.1 }}
             animate={{ scale: 1 }}
             transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
           >
             <div className="w-full h-full noise-bg opacity-80" />
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618524451768-45d6540c4224?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-50" />
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599056345876-787d9451d0c4?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-hard-light opacity-60" />
           </motion.div>
        </div>

        {/* macOS Window */}
        <div className="w-full px-6 flex justify-center -mt-32 z-20 relative">
          <MacWindow title="Arsight → Visual identity guidelines">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-serif text-[#555] mb-6">Dialogue-focused approach</h2>
              </div>
              <div className="font-inter text-sm text-[#666] leading-relaxed space-y-4">
                <p>
                  The usage of the logo is defined by the "dialogue-focused approach" of the brand. 
                  Just like in everyday life, when you meet a new person, you introduce yourself first.
                </p>
                <p>
                  It's the same with visual communication of Arsight. The logo is always the first thing seen on the page.
                </p>
              </div>
            </div>
          </MacWindow>
        </div>
      </section>

      {/* Paper Cutout Section - Black Background */}
      <section className="min-h-screen bg-black text-white py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
             <div className="md:col-span-4">
                <div className="bg-white p-4 transform -rotate-2 shadow-2xl paper-tear">
                   <div className="aspect-[3/4] bg-[#111] overflow-hidden relative">
                      <div className="absolute inset-0 bg-white rounded-full transform scale-150 translate-x-1/4 translate-y-1/4 mix-blend-difference" />
                      <img 
                        src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1000&auto=format&fit=crop" 
                        className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale mix-blend-screen"
                      />
                   </div>
                </div>
             </div>
             
             <div className="md:col-span-8 relative">
                <motion.div 
                  className="absolute top-0 right-0 w-full md:w-2/3 bg-white p-2 transform rotate-3 shadow-xl z-10"
                  whileHover={{ scale: 1.02, rotate: 1 }}
                >
                   <div className="aspect-video bg-[#EFEFEF] overflow-hidden relative p-8 flex items-center justify-center">
                      <div className="grid grid-cols-4 gap-4 w-full">
                         {[...Array(8)].map((_, i) => (
                           <div key={i} className="aspect-square bg-black rounded-full overflow-hidden relative">
                              <div className="absolute inset-0 bg-white transform translate-x-1/2 translate-y-1/2 rounded-full" />
                           </div>
                         ))}
                      </div>
                   </div>
                </motion.div>
                
                <div className="absolute top-48 left-0 w-1/2 bg-[#222] p-4 transform -rotate-1 z-0">
                   <p className="font-mono text-xs leading-relaxed opacity-60">
                      GALLERY ARCHIVE STUDIO EXTENSIONS<br/>
                      NON-OBJECTIVE RESEARCH<br/>
                      FIG. 2.4 — SILHOUETTE STUDY
                   </p>
                </div>
             </div>
          </div>

          {/* Large Cutout Text */}
          <div className="relative py-24 border-t border-white/10">
             <h2 className="text-[10vw] font-bold leading-none tracking-tighter mix-blend-exclusion">
                NON—<br/>OBJECTIVE
             </h2>
             <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-exclusion filter blur-3xl opacity-20" />
          </div>
        </div>
      </section>

      {/* Doodle / Sketch Section - Blue Sky */}
      <section className="h-screen bg-[#6CA6C1] relative overflow-hidden flex items-center justify-center">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-20 noise-bg" />
        
        {/* Floating Text on "Glass" */}
        <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none z-20">
           <div className="flex justify-between">
              <span className="font-mono text-xs transform -rotate-180 writing-mode-vertical text-black/60">NON-OBJECTIVE</span>
              <span className="font-mono text-xs transform rotate-180 writing-mode-vertical text-black/60">GALLERY</span>
           </div>
           <div className="flex justify-between">
              <span className="font-mono text-xs transform rotate-12 text-black/60">THE ES — RHOIN 2T</span>
              <span className="font-mono text-xs transform -rotate-6 text-black/60">EMAIL INSTAGRAM</span>
           </div>
        </div>

        {/* The Doodle Book */}
        <motion.div 
          className="relative w-96 h-96"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
           <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
              {/* Legs */}
              <path d="M 60 150 Q 40 180 20 170" fill="none" stroke="black" strokeWidth="6" strokeLinecap="round" />
              <path d="M 80 160 Q 70 190 50 190" fill="none" stroke="black" strokeWidth="6" strokeLinecap="round" />
              <path d="M 120 160 Q 130 190 150 190" fill="none" stroke="black" strokeWidth="6" strokeLinecap="round" />
              <path d="M 140 150 Q 160 180 180 170" fill="none" stroke="black" strokeWidth="6" strokeLinecap="round" />

              {/* Book Body */}
              <path d="M 40 50 L 100 80 L 160 50 L 160 140 L 100 170 L 40 140 Z" fill="#EFEFEF" stroke="black" strokeWidth="4" strokeLinejoin="round" />
              <path d="M 100 80 L 100 170" fill="none" stroke="black" strokeWidth="4" />
              <path d="M 40 50 L 100 20 L 160 50" fill="#EFEFEF" stroke="black" strokeWidth="4" strokeLinejoin="round" />
              
              {/* Pages */}
              <path d="M 45 55 L 95 80 L 95 160 L 45 135 Z" fill="none" stroke="black" strokeWidth="1" />
              <path d="M 105 80 L 155 55 L 155 135 L 105 160 Z" fill="none" stroke="black" strokeWidth="1" />

              {/* Eyes */}
              <circle cx="70" cy="100" r="15" fill="white" stroke="black" strokeWidth="3" />
              <circle cx="75" cy="100" r="5" fill="black" />
              
              <circle cx="130" cy="100" r="15" fill="white" stroke="black" strokeWidth="3" />
              <circle cx="125" cy="100" r="5" fill="black" />
              
              {/* Mouth */}
              <path d="M 80 130 Q 100 140 120 130" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
           </svg>
        </motion.div>

      </section>

    </div>
  );
}
