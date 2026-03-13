import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Menu } from 'lucide-react';

const WireframeStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
    
    .font-inter { font-family: 'Inter', sans-serif; }
    .font-serif { font-family: 'Playfair Display', serif; }
    
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .wireframe-container {
      perspective: 1000px;
    }

    .cube {
      width: 100px;
      height: 100px;
      position: relative;
      transform-style: preserve-3d;
      animation: rotate 20s infinite linear;
    }

    .cube-face {
      position: absolute;
      width: 100px;
      height: 100px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      background: rgba(255, 255, 255, 0.02);
    }

    .face-front  { transform: rotateY(  0deg) translateZ(50px); }
    .face-back   { transform: rotateY(180deg) translateZ(50px); }
    .face-right  { transform: rotateY( 90deg) translateZ(50px); }
    .face-left   { transform: rotateY(-90deg) translateZ(50px); }
    .face-top    { transform: rotateX( 90deg) translateZ(50px); }
    .face-bottom { transform: rotateX(-90deg) translateZ(50px); }

    .cylinder {
      width: 100px;
      height: 150px;
      position: relative;
      transform-style: preserve-3d;
      animation: rotate-cylinder 15s infinite linear;
    }

    .cylinder-ring {
      position: absolute;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.4);
    }

    .cylinder-side {
      position: absolute;
      width: 1px;
      height: 150px;
      background: rgba(255, 255, 255, 0.3);
      left: 50%;
    }

    @keyframes rotate {
      from { transform: rotateX(0deg) rotateY(0deg); }
      to { transform: rotateX(360deg) rotateY(360deg); }
    }

    @keyframes rotate-cylinder {
      from { transform: rotateX(45deg) rotateY(0deg); }
      to { transform: rotateX(45deg) rotateY(360deg); }
    }

    .noise-bg {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
    }
  `}</style>
);

const Cube = ({ size = 100, className = "" }: { size?: number, className?: string }) => (
  <div className={`wireframe-container ${className}`}>
    <div className="cube" style={{ width: size, height: size }}>
      <div className="cube-face face-front" style={{ width: size, height: size, transform: `rotateY(0deg) translateZ(${size/2}px)` }} />
      <div className="cube-face face-back" style={{ width: size, height: size, transform: `rotateY(180deg) translateZ(${size/2}px)` }} />
      <div className="cube-face face-right" style={{ width: size, height: size, transform: `rotateY(90deg) translateZ(${size/2}px)` }} />
      <div className="cube-face face-left" style={{ width: size, height: size, transform: `rotateY(-90deg) translateZ(${size/2}px)` }} />
      <div className="cube-face face-top" style={{ width: size, height: size, transform: `rotateX(90deg) translateZ(${size/2}px)` }} />
      <div className="cube-face face-bottom" style={{ width: size, height: size, transform: `rotateX(-90deg) translateZ(${size/2}px)` }} />
    </div>
  </div>
);

const Cylinder = ({ className = "" }: { className?: string }) => (
  <div className={`wireframe-container ${className}`}>
    <div className="cylinder">
      <div className="cylinder-ring" style={{ transform: 'translateY(-75px) rotateX(90deg)' }} />
      <div className="cylinder-ring" style={{ transform: 'translateY(0px) rotateX(90deg)' }} />
      <div className="cylinder-ring" style={{ transform: 'translateY(75px) rotateX(90deg)' }} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <div key={deg} className="cylinder-side" style={{ transform: `rotateY(${deg}deg) translateZ(50px)` }} />
      ))}
    </div>
  </div>
);

const ChapterHeader = ({ number, title }: { number: string, title: string }) => (
  <div className="flex justify-between items-end border-b border-white/20 pb-4 mb-12">
    <div className="font-inter text-xs tracking-widest uppercase opacity-60">Chapter ({number})</div>
    <div className="font-serif italic text-2xl">{title}</div>
  </div>
);

export default function AiMindsetWireframePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-[#080808] text-white selection:bg-white selection:text-black hide-scrollbar font-inter relative">
      <WireframeStyles />
      <div className="fixed inset-0 pointer-events-none noise-bg z-50 mix-blend-overlay" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-6 flex justify-between items-start mix-blend-difference">
        <div className="text-[10px] tracking-widest uppercase font-medium">
          Chapter (I)
        </div>
        <div className="font-serif italic text-xl absolute left-1/2 -translate-x-1/2">
          obys
        </div>
        <Menu className="w-6 h-6" />
      </header>

      {/* Hero Section */}
      <section className="min-h-screen relative flex flex-col justify-center items-center overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute top-[15%] left-[10%] opacity-80">
          <Cube size={80} />
        </motion.div>
        
        <motion.div style={{ y: y2, rotate }} className="absolute bottom-[20%] right-[15%] opacity-80">
          <Cylinder />
        </motion.div>

        <div className="relative z-10 w-full px-4 md:px-12">
          <div className="flex justify-between items-end border-b border-white/20 pb-2 mb-2">
             <span className="text-[10px] uppercase tracking-widest">Ai Mindset</span>
             <span className="text-[10px] uppercase tracking-widest">System</span>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-[25vw] leading-[0.8] font-medium tracking-tighter mix-blend-difference">
              AI
            </h1>
            <div className="hidden md:block w-px h-32 bg-white/20 mx-8" />
            <h1 className="text-[25vw] leading-[0.8] font-medium tracking-tighter mix-blend-difference text-right md:text-left">
              MIND
            </h1>
          </div>
          <h1 className="text-[25vw] leading-[0.8] font-medium tracking-tighter mix-blend-difference text-center md:text-right">
            SET
          </h1>
        </div>

        <div className="absolute bottom-6 left-6 text-[10px] tracking-widest">
          01 — 04
        </div>
      </section>

      {/* Content Section 1 */}
      <section className="min-h-screen py-24 px-6 md:px-12 relative">
        <ChapterHeader number="II" title="The System" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="pt-24">
             <p className="text-2xl md:text-4xl leading-tight font-light text-white/80">
               We build systems that understand context. Not just tools, but a cohesive environment where agents live and work.
             </p>
             <div className="mt-12 flex gap-4">
                <div className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center text-xs">01</div>
                <div className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center text-xs">02</div>
             </div>
          </div>
          <div className="relative h-[50vh] flex items-center justify-center border border-white/10">
             <Cube size={150} />
             <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-widest">
                Figure 1.2 — Core Logic
             </div>
          </div>
        </div>
      </section>

      {/* Big Typography Section */}
      <section className="min-h-screen flex items-center justify-center bg-white text-black relative overflow-hidden">
         <div className="absolute top-6 left-6 text-[10px] uppercase tracking-widest">
            Chapter (III)
         </div>
         
         <div className="w-full">
            <div className="border-y border-black/10 py-12 overflow-hidden">
               <motion.div 
                 className="whitespace-nowrap text-[15vw] leading-none font-medium tracking-tighter flex gap-12"
                 animate={{ x: ["0%", "-50%"] }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               >
                  CONTEXT IS KING — CONTEXT IS KING — CONTEXT IS KING —
               </motion.div>
            </div>
         </div>
         
         <div className="absolute bottom-12 right-12 w-64 text-sm font-medium">
            (03) The ability of the system to understand the user's intent without explicit instruction.
         </div>
      </section>

      {/* Grid Section */}
      <section className="min-h-screen py-24 px-6 md:px-12">
        <ChapterHeader number="IV" title="Architecture" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/20 border border-white/20">
           {[
             { title: "Input", desc: "Raw data ingestion" },
             { title: "Process", desc: "Agent reasoning" },
             { title: "Output", desc: "Action execution" },
             { title: "Memory", desc: "Long-term storage" },
             { title: "Feedback", desc: "Loop optimization" },
             { title: "Scale", desc: "Horizontal growth" }
           ].map((item, i) => (
             <div key={i} className="bg-[#080808] p-12 aspect-square flex flex-col justify-between hover:bg-[#111] transition-colors group">
                <div className="w-8 h-8 border border-white/20 rounded-full group-hover:bg-white transition-colors" />
                <div>
                   <h3 className="text-2xl font-serif italic mb-2">{item.title}</h3>
                   <p className="text-xs uppercase tracking-widest opacity-50">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 md:px-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
         <div>
            <h2 className="text-[10vw] leading-[0.8] font-medium tracking-tighter">
               START<br/>NOW
            </h2>
         </div>
         <div className="flex flex-col gap-4 text-right">
            <a href="#" className="text-lg hover:italic transition-all">Instagram</a>
            <a href="#" className="text-lg hover:italic transition-all">Twitter</a>
            <a href="#" className="text-lg hover:italic transition-all">Email</a>
            <div className="mt-8 text-[10px] uppercase tracking-widest opacity-50">
               © 2026 Ai Mindset
            </div>
         </div>
      </footer>
    </div>
  );
}
