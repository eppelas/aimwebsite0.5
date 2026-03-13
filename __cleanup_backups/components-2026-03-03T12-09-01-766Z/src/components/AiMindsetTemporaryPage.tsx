import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const StudioStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    
    .font-grotesk { font-family: 'Space Grotesk', sans-serif; }
    .font-inter { font-family: 'Inter', sans-serif; }
    
    .blob-shape {
      border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
      animation: morph 10s linear infinite alternate;
    }
    
    @keyframes morph {
      0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
      100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    }

    .noise-bg {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
    }

    .glitch-stripes {
      background: repeating-linear-gradient(
        90deg,
        #FF6B6B,
        #FF6B6B 10px,
        #000 10px,
        #000 12px,
        #FF8E8E 12px,
        #FF8E8E 20px
      );
    }
    
    .text-stretch {
      transform: scaleY(1.5);
    }
  `}</style>
);

const Blob = ({ className }: { className?: string }) => (
  <motion.div 
    className={`blob-shape bg-[#FF6B6B] ${className}`}
    animate={{ 
      rotate: [0, 90, 180, 270, 360],
      scale: [1, 1.1, 0.9, 1.1, 1],
    }}
    transition={{ 
      duration: 20, 
      repeat: Infinity, 
      ease: "linear" 
    }}
  />
);

const NavItem = ({ text }: { text: string }) => (
  <a href="#" className="text-[10px] font-inter font-medium tracking-widest uppercase hover:text-[#FF6B6B] transition-colors">
    {text}
  </a>
);

const NumberList = () => (
  <div className="font-mono text-xs text-black/40 space-y-1">
    {[...Array(10)].map((_, i) => (
      <div key={i} className="flex gap-4 group cursor-pointer hover:text-black transition-colors">
        <span className="w-8">{i + 1}.0</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity">Module {String.fromCharCode(65 + i)}</span>
      </div>
    ))}
  </div>
);

export default function AiMindsetTemporaryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-black font-grotesk selection:bg-[#FF6B6B] selection:text-white overflow-x-hidden" ref={containerRef}>
      <StudioStyles />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-start z-50 mix-blend-difference text-white md:text-black md:mix-blend-normal">
        <div className="hidden md:block w-1/3">
          <span className="text-[10px] font-inter font-bold tracking-widest uppercase">AI Mindset POS</span>
        </div>
        
        <div className="hidden md:flex justify-center gap-8 w-1/3">
          <NavItem text="Context" />
          <NavItem text="Architecture" />
          <NavItem text="Tools" />
          <NavItem text="Skills" />
        </div>

        <div className="flex justify-end gap-6 w-full md:w-1/3">
          <div className="hidden md:flex gap-6">
            <NavItem text="Telegram" />
            <NavItem text="Podcast" />
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black text-white z-40 flex flex-col items-center justify-center gap-8 md:hidden">
          <NavItem text="Context" />
          <NavItem text="Architecture" />
          <NavItem text="Tools" />
          <NavItem text="Skills" />
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center relative px-4 pt-20">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="text-center z-10"
        >
          <div className="text-[15vw] leading-[0.8] font-bold tracking-tighter flex flex-col items-center">
            <div className="flex gap-[2vw]">
              <span>AI</span>
              <span>Mind</span>
            </div>
            <div className="flex gap-[4vw] ml-[10vw]">
              <span>set</span>
              <span>POS</span>
            </div>
            <div className="flex gap-[2vw] -ml-[5vw]">
              <span>{`{sprint}`}</span>
              <span className="font-inter font-light italic">X26</span>
            </div>
          </div>
          
          <div className="mt-12 text-xs font-inter uppercase tracking-widest max-w-xs mx-auto text-center">
            Personal Operational System<br/>
            <span className="font-bold mt-2 block">March 2 — March 14, 2026</span>
          </div>
        </motion.div>
        
        <div className="absolute bottom-8 left-8 hidden md:block">
           <NumberList />
        </div>
      </section>

      {/* Fragile Moments Section -> NOT A TOOL */}
      <section className="min-h-screen bg-[#F0F0F0] noise-bg flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
           <span className="text-[30vw] font-bold tracking-tighter">SYSTEM</span>
        </div>
        
        <div className="max-w-6xl w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
          <div>
            <h2 className="text-6xl md:text-8xl font-bold leading-[0.85] mb-8 text-black/90">
              NOT A<br/>
              <span className="text-black/20">TOOL</span>
            </h2>
            <p className="font-inter text-sm leading-relaxed max-w-md text-black/60">
              (POS) Personal Operational System<br/><br/>
              A layer of rules, context, and constraints that forces tools to work.
              From chaos to a working AI system, tailored for you.
              Morning plans, meeting briefs, evening blockers.
            </p>
          </div>
          <div className="flex items-end justify-end">
             <div className="w-full aspect-[3/4] bg-white p-8 shadow-xl rotate-3 transition-transform hover:rotate-0 duration-500">
               <div className="w-full h-full border border-black/10 flex flex-col justify-between p-4">
                 <div className="text-xs font-mono">FIG. 1.2</div>
                 <div className="text-center font-inter italic text-black/40">The structure of attention</div>
                 <div className="text-right text-xs font-mono">POS</div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Red Blob / Summer Sale Section -> CONTEXT / ARCH / TOOLS */}
      <section className="min-h-screen bg-black text-[#FF6B6B] flex items-center justify-center relative overflow-hidden px-6">
        <div className="absolute inset-0 flex items-center justify-center">
           <Blob className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] opacity-80 blur-3xl" />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
           <div className="aspect-square relative flex items-center justify-center group">
              <Blob className="absolute inset-0 w-full h-full opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 text-center mix-blend-difference text-white">
                <h3 className="text-3xl font-bold mb-2">CONTEXT</h3>
                <p className="text-xs font-inter uppercase">AI knows who you are</p>
              </div>
           </div>
           
           <div className="aspect-square relative flex items-center justify-center group">
              <Blob className="absolute inset-0 w-full h-full opacity-50 group-hover:opacity-100 transition-opacity animation-delay-2000" />
              <div className="relative z-10 text-center mix-blend-difference text-white">
                <h3 className="text-3xl font-bold mb-2">ARCHI<br/>TECTURE</h3>
                <p className="text-xs font-inter uppercase">Logical Structure</p>
              </div>
           </div>
           
           <div className="aspect-square relative flex items-center justify-center group">
              <Blob className="absolute inset-0 w-full h-full opacity-50 group-hover:opacity-100 transition-opacity animation-delay-4000" />
              <div className="relative z-10 text-center mix-blend-difference text-white">
                <h3 className="text-3xl font-bold mb-2">TOOLS</h3>
                <p className="text-xs font-inter uppercase">Claude / Cursor / Obsidian</p>
              </div>
           </div>
        </div>
      </section>

      {/* Glitch / Datamosh Section -> Mentors */}
      <section className="min-h-[80vh] bg-[#FF6B6B] relative flex flex-col justify-between p-6 md:p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20 glitch-stripes mix-blend-multiply pointer-events-none" />
        
        <div className="relative z-10">
          <div className="text-xs font-mono mb-2">SYSTEM ARCHITECTS:</div>
          <div className="text-4xl md:text-6xl font-bold tracking-tighter">
            AI MINDSET<br/>
            MENTORS
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 mt-24">
           <div className="bg-black text-white p-8">
             <h4 className="text-xl font-bold mb-4">Alexander Povalyaev</h4>
             <p className="text-sm font-inter opacity-70 leading-relaxed">
               Founder of AI Mindset, Strategist.
               15+ years connecting technology, business, and people.
               Creating harmonious ecosystems that work for humans.
             </p>
           </div>
           
           <div className="bg-white text-black p-8">
             <h4 className="text-xl font-bold mb-4">Sergey Khabarov</h4>
             <p className="text-sm font-inter opacity-70 leading-relaxed">
               System Architect at the intersection of AI and EdTech.
               6+ years in education, 500+ trained specialists.
               Ex-CTO. Knows how processes work from the inside.
             </p>
           </div>
        </div>
        
        <div className="absolute bottom-0 right-0 p-12 opacity-10 text-[20vw] leading-none font-bold tracking-tighter pointer-events-none">
          X26
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-8">AI Mindset</h2>
            <div className="flex flex-col gap-2 text-sm font-inter opacity-60">
              <a href="#" className="hover:text-white">Telegram Channel</a>
              <a href="#" className="hover:text-white">YouTube Podcast</a>
              <a href="#" className="hover:text-white">Public Offer</a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 font-mono text-xs opacity-40">
            <div>1.0 Intro</div>
            <div>5.0 Price</div>
            <div>2.0 Program</div>
            <div>6.0 FAQ</div>
            <div>3.0 Results</div>
            <div>7.0 Apply</div>
            <div>4.0 Mentors</div>
            <div>8.0 Login</div>
          </div>
          
          <div className="w-full md:w-auto">
             <div className="w-24 h-24 border border-white/20 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
               <div className="w-2 h-2 bg-white rounded-full" />
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
