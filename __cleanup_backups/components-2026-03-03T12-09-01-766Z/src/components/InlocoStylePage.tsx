import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

// --- Styles ---

const InlocoStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800&family=JetBrains+Mono:wght@400;500&display=swap');

    .font-inter { font-family: 'Inter', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    
    .clip-cutout {
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 40%, 20% 40%, 20% 60%, 0% 60%);
    }
  `}</style>
);

// --- Components ---

const NavLink = ({ text }: { text: string }) => (
  <a href="#" className="font-mono text-[10px] uppercase tracking-widest hover:text-white transition-colors duration-300 mix-blend-difference text-black">
    {text}
  </a>
);

const GridSquare = ({ type = "empty" }: { type?: "empty" | "solid" | "cross" | "grey" }) => {
  return (
    <div className="w-full h-full border-r border-[#0A0A0A]/10 relative overflow-hidden">
      {type === "solid" && <div className="w-full h-full bg-[#1A1A1A]" />}
      {type === "grey" && <div className="w-full h-full bg-[#A0A4B0]" />}
      {type === "cross" && (
        <>
          <div className="absolute inset-0 border border-[#0A0A0A]/20" />
          <svg className="w-full h-full absolute inset-0 text-[#0A0A0A]/20" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" vectorEffect="non-scaling-stroke" />
            <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" vectorEffect="non-scaling-stroke" />
          </svg>
        </>
      )}
    </div>
  );
};

// --- Main Page ---

export default function InlocoStylePage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <div className="min-h-screen bg-[#A0A4B0] text-[#0A0A0A] font-inter selection:bg-[#0A0A0A] selection:text-white overflow-x-hidden">
      <InlocoStyles />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-start z-50 pointer-events-none mix-blend-normal">
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

      {/* Hero Section - Inloco Style */}
      <section className="h-screen flex flex-col justify-between relative bg-[#A0A4B0]">
        <div className="flex-grow flex items-center justify-center">
          <h1 className="text-[25vw] font-bold tracking-tighter text-white leading-none select-none">
            inloco
          </h1>
        </div>
        
        <div className="w-full h-24 md:h-32 bg-white grid grid-cols-6 md:grid-cols-12 border-t border-[#0A0A0A]/10">
          <GridSquare type="solid" />
          <GridSquare type="empty" />
          <GridSquare type="empty" />
          <GridSquare type="cross" />
          <GridSquare type="grey" />
          <GridSquare type="empty" />
          <GridSquare type="grey" />
          <GridSquare type="empty" />
          <GridSquare type="cross" />
          <GridSquare type="empty" />
          <GridSquare type="solid" />
          <GridSquare type="empty" />
        </div>

        {/* Floating Text */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 text-center max-w-2xl px-6">
          <p className="font-medium text-white text-lg md:text-xl leading-tight">
            Scheduled to open its permanent space on Al Khayat Avenue in Fall 2026, meanwhile, INLOCO Gallery will create a pop-up and outdoor project.
          </p>
        </div>
      </section>

      {/* Split Section - Sputnik Style */}
      <section className="min-h-screen bg-[#F0F0F2] flex flex-col md:flex-row">
        {/* Left Content */}
        <div className="w-full md:w-1/2 p-6 md:p-12 pt-24 flex flex-col justify-between">
          <div className="space-y-8">
            <div className="font-mono text-[10px] uppercase tracking-wide space-y-1">
              <p><span className="opacity-40">1(IDEA)</span> BRACKETS ARE USED TO ADD SOMETHING TO THE MAIN THING.</p>
              <p>THAT'S WHY WE PUT OUR BRAND IN BRACKETS.</p>
              <p><span className="opacity-40">2(BRAND)</span> (SPUTNIK) CREATES VERSATILE AND UNDERSTATED ITEMS.</p>
              <p>THEIR MISSION IS TO PUT A SPOTLIGHT ON THE PERSONALITY OF THEIR OWNER.</p>
              <p><span className="opacity-40">3(FOCUS)</span> THE MOST IMPORTANT THING FOR US IS THE PERSON'S CHARACTER.</p>
            </div>
          </div>
          
          <div className="mt-24 md:mt-0">
             <h2 className="text-6xl md:text-8xl font-bold tracking-tighter opacity-10">(SPUTNIK)</h2>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 bg-[#E5E5E5] relative overflow-hidden flex items-center justify-center p-12">
           <div className="relative w-full max-w-md aspect-[3/4] bg-[#F5F5F0] shadow-2xl rotate-3 flex flex-col">
              {/* Bag Mockup */}
              <div className="flex-grow relative p-8 flex items-center justify-center">
                 <div className="w-full h-full border-2 border-dashed border-[#0A0A0A]/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                       <div className="w-32 h-32 bg-white border border-black mx-auto mb-4 flex items-center justify-center p-2">
                          <span className="font-mono text-xs text-center">(SPUTNIK)<br/>BAGS</span>
                       </div>
                       <p className="font-mono text-[10px] uppercase opacity-50">Canvas Tote Model 01</p>
                    </div>
                 </div>
                 {/* Straps */}
                 <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 border-4 border-[#F5F5F0] rounded-t-full border-b-0 shadow-sm" style={{ borderColor: '#F5F5F0', borderTopColor: '#E0E0E0', borderLeftColor: '#E0E0E0', borderRightColor: '#E0E0E0' }} />
              </div>
              
              {/* Label */}
              <div className="absolute bottom-8 right-8 bg-white p-4 border border-black shadow-lg transform rotate-[-5deg]">
                 <p className="font-mono text-[9px] leading-tight">
                    TLT -&gt; SPB -&gt; MOSCOW (RUSSIA)<br/>
                    YEAR 2026 (2013)<br/>
                    WWW SPUTNIK-BAGS.RU
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Collage Section - Dark */}
      <section className="min-h-screen bg-[#050505] text-[#F0F0F2] relative overflow-hidden py-24" ref={targetRef}>
        <div className="absolute inset-0 grid grid-cols-2 opacity-10 pointer-events-none">
           <div className="border-r border-white/20" />
           <div />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-24">
             <h2 className="text-4xl md:text-6xl font-medium tracking-tight max-w-2xl">
               Unfolding through identities, design systems, and objects.
             </h2>
          </div>

          {/* Collage Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            
            {/* Item 1 */}
            <motion.div style={{ x }} className="relative aspect-[4/3] bg-white text-black p-4 rotate-2 shadow-2xl group">
               <div className="absolute -top-4 -left-4 w-24 h-24 bg-white rounded-full mix-blend-exclusion" />
               <div className="w-full h-full bg-[#111] overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop" 
                    alt="Abstract Portrait" 
                    className="w-full h-full object-cover opacity-60 grayscale contrast-125 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-white mix-blend-overlay opacity-20" />
               </div>
               <div className="absolute bottom-4 left-4 font-mono text-[10px] bg-white px-2 py-1">
                  FIG. 01 — SILHOUETTE
               </div>
            </motion.div>

            {/* Item 2 */}
            <div className="relative aspect-[3/4] md:mt-32">
               <div className="absolute inset-0 bg-[#222] transform -rotate-3 border border-white/20" />
               <div className="absolute inset-0 bg-white transform rotate-2 p-2 shadow-xl overflow-hidden">
                  <div className="w-full h-full bg-black relative">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border border-white rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                     </div>
                     <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
                  </div>
               </div>
            </div>

          </div>
        </div>

        {/* Footer in Dark Section */}
        <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end mix-blend-difference">
           <div className="font-mono text-[10px] uppercase opacity-50">
              Non-Objective © 2026
           </div>
           <ArrowUpRight className="w-6 h-6 opacity-50" />
        </div>
      </section>

    </div>
  );
}
