import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu } from 'lucide-react';

const GradientStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');

    .font-inter { font-family: 'Inter', sans-serif; }
    .font-serif { font-family: 'Playfair Display', serif; }

    .noise-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 50;
      opacity: 0.12;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    .gradient-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.6;
      mix-blend-mode: screen;
    }

    .text-outline {
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.9);
      color: transparent;
    }
    
    .text-outline-thin {
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
      color: transparent;
    }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

const AnimatedBlob = ({ colors, className }: { colors: string[], className?: string }) => (
  <motion.div 
    className={`gradient-blob ${className}`}
    animate={{
      scale: [1, 1.2, 0.9, 1.1, 1],
      rotate: [0, 45, -45, 0],
      opacity: [0.5, 0.7, 0.5]
    }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    style={{
      background: `radial-gradient(circle at center, ${colors[0]}, ${colors[1]}, transparent 70%)`
    }}
  />
);

export default function AiMindsetGradientPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-[#050505] text-white selection:bg-white selection:text-black hide-scrollbar font-inter relative overflow-x-hidden">
      <GradientStyles />
      <div className="noise-bg" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-6 flex justify-between items-start mix-blend-difference">
        <div className="text-[10px] tracking-widest uppercase font-medium opacity-70">
          Chapter (IV)
        </div>
        <div className="font-serif italic text-xl absolute left-1/2 -translate-x-1/2">
          obys
        </div>
        <Menu className="w-6 h-6" />
      </header>

      {/* Section 1: Context (Blue/Purple) */}
      <section className="min-h-screen relative flex flex-col justify-center px-4 md:px-12 overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute top-0 right-0 w-[800px] h-[800px] z-0">
           <AnimatedBlob colors={['#4F46E5', '#C026D3']} className="w-full h-full" />
        </motion.div>

        <div className="relative z-10 mt-20">
          <div className="flex flex-wrap items-baseline leading-none">
            <h1 className="text-[15vw] font-medium tracking-tighter">
              CONTEXT
            </h1>
            <span className="text-[15vw] font-serif italic font-light ml-4 text-outline">
              (01)
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 items-end">
             <div className="md:col-span-5">
                <div className="text-[25vw] font-serif italic leading-[0.8]">
                   01
                </div>
             </div>
             <div className="md:col-span-4">
                <div className="aspect-[3/4] bg-[#111] border border-white/10 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                   <div className="absolute bottom-6 left-6 z-20">
                      <div className="text-[10px] uppercase tracking-widest mb-2">Nomination</div>
                      <div className="font-serif italic text-2xl">The Foundation</div>
                   </div>
                   {/* Placeholder for 3D element or image */}
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 border border-white/20 rotate-45 group-hover:rotate-90 transition-transform duration-700" />
                   </div>
                </div>
             </div>
             <div className="md:col-span-3 text-sm font-medium leading-relaxed opacity-80 max-w-xs">
                WE ARE BUILDING<br/>
                A SYSTEM THAT UNDERSTANDS<br/>
                YOUR WORKFLOW
             </div>
          </div>
        </div>
      </section>

      {/* Section 2: Agents (Orange/Green) */}
      <section className="min-h-screen relative flex flex-col justify-center px-4 md:px-12 overflow-hidden">
        <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-[1000px] h-[1000px] z-0">
           <AnimatedBlob colors={['#EA580C', '#10B981']} className="w-full h-full opacity-40" />
        </motion.div>

        <div className="relative z-10">
          <div className="flex flex-wrap items-baseline leading-none justify-end text-right">
            <h1 className="text-[15vw] font-medium tracking-tighter">
              AGENTS
            </h1>
            <span className="text-[15vw] font-serif italic font-light ml-4 text-outline">
              (02)
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 items-start">
             <div className="md:col-span-3 text-sm font-medium leading-relaxed opacity-80 max-w-xs order-3 md:order-1">
                YES, WE HAVE<br/>
                AUTONOMOUS HELPERS<br/>
                TOO
             </div>
             <div className="md:col-span-4 order-2">
                <div className="aspect-square bg-[#EA580C] relative overflow-hidden p-8 flex flex-col justify-between text-black">
                   <div className="flex justify-between items-start">
                      <span className="text-[10px] uppercase tracking-widest">Ai Mindset</span>
                      <span className="text-[10px] uppercase tracking-widest">2026</span>
                   </div>
                   <div>
                      <h3 className="font-serif text-4xl mb-2">Autonomous<br/>Agents</h3>
                      <p className="text-xs uppercase tracking-widest opacity-70">Batch Processing</p>
                   </div>
                   <div className="text-[12rem] font-serif leading-none -mb-12 -ml-4 opacity-20">
                      02
                   </div>
                </div>
             </div>
             <div className="md:col-span-5 order-1 md:order-3 text-right">
                <div className="text-[25vw] font-serif italic leading-[0.8]">
                   02
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Section 3: Typography List (Pink/Purple) */}
      <section className="min-h-screen relative flex flex-col justify-center px-4 md:px-12 overflow-hidden bg-[#080808]">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] z-0">
            <AnimatedBlob colors={['#DB2777', '#4F46E5']} className="w-full h-full opacity-30" />
         </div>

         <div className="relative z-10 flex flex-col gap-0">
            {['PHASE (I)', 'PHASE (II)', 'PHASE (III)', 'PHASE (IV)'].map((text, i) => (
               <div key={i} className="group cursor-pointer">
                  <h2 className="text-[11vw] leading-[0.85] font-medium tracking-tighter text-outline group-hover:text-white transition-colors duration-500">
                     {text}
                  </h2>
               </div>
            ))}
         </div>
         
         <div className="absolute bottom-12 left-6 text-[10px] uppercase tracking-widest">
            Designed by Obys Style
         </div>
      </section>

      {/* Footer */}
      <section className="min-h-[50vh] relative flex flex-col justify-center items-center px-4 text-center">
         <h2 className="text-[8vw] leading-none font-medium tracking-tighter mb-8">
            BUILD AND MOVE<br/>
            YOUR SYSTEM
         </h2>
         <p className="text-xs uppercase tracking-widest opacity-60 mb-12">
            (Even if you are offline)
         </p>
         
         <div className="flex gap-12">
            <div className="text-[10vw] font-serif italic text-outline-thin">
               Like
            </div>
            <div className="text-[10vw] font-serif italic text-outline-thin">
               Pro
            </div>
         </div>
      </section>

    </div>
  );
}
