import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

// --- Styles ---

const MentalHealthStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');

    .font-inter { font-family: 'Inter', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    .font-serif { font-family: 'Playfair Display', serif; }
    
    .glitch-text {
      position: relative;
    }
    
    .glitch-text::before,
    .glitch-text::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #9CA3AF;
    }
    
    .glitch-text::before {
      left: 2px;
      text-shadow: -1px 0 #fff;
      clip-path: inset(20% 0 30% 0);
      animation: glitch-anim-1 2s infinite linear alternate-reverse;
    }
    
    .glitch-text::after {
      left: -2px;
      text-shadow: -1px 0 #fff;
      clip-path: inset(40% 0 43% 0);
      animation: glitch-anim-2 2s infinite linear alternate-reverse;
    }
    
    @keyframes glitch-anim-1 {
      0% { clip-path: inset(20% 0 30% 0); }
      20% { clip-path: inset(60% 0 10% 0); }
      40% { clip-path: inset(40% 0 50% 0); }
      60% { clip-path: inset(80% 0 5% 0); }
      80% { clip-path: inset(10% 0 70% 0); }
      100% { clip-path: inset(30% 0 20% 0); }
    }

    @keyframes glitch-anim-2 {
      0% { clip-path: inset(10% 0 60% 0); }
      20% { clip-path: inset(30% 0 20% 0); }
      40% { clip-path: inset(70% 0 10% 0); }
      60% { clip-path: inset(20% 0 50% 0); }
      80% { clip-path: inset(50% 0 30% 0); }
      100% { clip-path: inset(0% 0 80% 0); }
    }

    .slice-text {
      clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
      transform: translateX(-5px);
    }
    
    .slice-text-bottom {
      clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
      transform: translateX(5px);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `}</style>
);

// --- Components ---

const NavLink = ({ text }: { text: string }) => (
  <a href="#" className="font-mono text-[10px] uppercase tracking-widest hover:text-white transition-colors duration-300 mix-blend-difference text-black">
    {text}
  </a>
);

const SlicedTitle = ({ text }: { text: string }) => (
  <div className="relative inline-block leading-[0.85] mb-4">
    <span className="block slice-text">{text}</span>
    <span className="block slice-text-bottom text-white mix-blend-overlay opacity-80">{text}</span>
  </div>
);

const BlackBar = ({ width, angle, top, left, delay }: { width: string, angle: number, top: string, left: string, delay: number }) => (
  <motion.div 
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    className="absolute h-8 md:h-12 bg-[#1A1A1A] origin-left z-10"
    style={{ 
      width, 
      top, 
      left, 
      rotate: angle 
    }}
  >
    <div className="absolute -top-4 left-2 font-mono text-[10px] text-[#1A1A1A] opacity-60">
      (1.{Math.floor(Math.random() * 9)})
    </div>
  </motion.div>
);

// --- Main Page ---

export default function MentalHealthFilmPage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <div className="min-h-screen bg-[#9CA3AF] text-white font-inter selection:bg-white selection:text-[#9CA3AF] overflow-x-hidden">
      <MentalHealthStyles />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-start z-50 pointer-events-none mix-blend-difference">
        <div className="pointer-events-auto">
          <h1 className="font-mono text-[10px] tracking-widest uppercase font-bold text-black">Non-Objective</h1>
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

      {/* Hero Section - Mental Health Film Festival Style */}
      <section className="min-h-screen flex flex-col justify-center relative px-6 md:px-12 pt-24 overflow-hidden">
        <div className="max-w-[90vw] mx-auto relative z-20">
          <div className="flex flex-col items-start">
            <div className="text-[15vw] font-bold tracking-tighter leading-[0.8] text-white mix-blend-overlay opacity-90 select-none">
               <SlicedTitle text="Mental" />
            </div>
            <div className="text-[15vw] font-bold tracking-tighter leading-[0.8] text-white mix-blend-overlay opacity-90 select-none ml-[10vw]">
               <SlicedTitle text="Health" />
            </div>
            <div className="text-[15vw] font-bold tracking-tighter leading-[0.8] text-white mix-blend-overlay opacity-90 select-none">
               <SlicedTitle text="Film" />
            </div>
            <div className="text-[15vw] font-bold tracking-tighter leading-[0.8] text-white mix-blend-overlay opacity-90 select-none ml-[5vw]">
               <SlicedTitle text="Festival" />
            </div>
          </div>
        </div>

        <div className="absolute top-1/3 right-12 md:right-24 max-w-xs text-right z-30 mix-blend-difference">
           <a href="#" className="font-inter text-sm md:text-base hover:underline decoration-1 underline-offset-4">
              www.mentalfilmfest.com
           </a>
        </div>

        <div className="absolute bottom-12 right-12 md:right-24 max-w-md text-right z-30 mix-blend-difference">
           <p className="font-serif text-lg md:text-xl leading-relaxed opacity-80">
              We aim to create a safe space that is free from stigmatization of mental health disorders.
           </p>
        </div>
      </section>

      {/* Abstract Lines Section - Koordinata Style */}
      <section className="min-h-screen bg-white text-[#1A1A1A] relative overflow-hidden py-32 px-6" ref={targetRef}>
        
        {/* Background Grid */}
        <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-5">
           {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-black h-full" />
           ))}
        </div>

        {/* Black Bars Composition */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <BlackBar width="120%" angle={-2} top="10%" left="-10%" delay={0.1} />
           <BlackBar width="80%" angle={15} top="40%" left="-10%" delay={0.3} />
           <BlackBar width="90%" angle={-5} top="60%" left="20%" delay={0.5} />
           <BlackBar width="60%" angle={-25} top="20%" left="50%" delay={0.2} />
           <BlackBar width="70%" angle={8} top="80%" left="10%" delay={0.4} />
           <BlackBar width="50%" angle={-12} top="90%" left="60%" delay={0.6} />
        </div>

        <div className="max-w-7xl mx-auto relative z-20 mt-64">
           <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 border border-black/10 max-w-4xl">
              <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-8">
                 KOORDINATA IS A PLATFORM FOCUSED ON THE CARTOGRAPHY OF CONTEMPORARY DESIGN.
              </h2>
              <p className="font-serif text-xl md:text-2xl leading-relaxed opacity-70 mb-8">
                 ITS MAIN GOAL IS TO MONITOR MAJOR SHIFTS IN VISUAL CULTURE AND ESTABLISH CONNECTIONS BETWEEN DIFFERENT FIELDS.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs uppercase tracking-wide opacity-60 border-t border-black/10 pt-8">
                 <div>
                    <p>PLATFORM'S RESEARCH ENCOMPASSES:</p>
                    <ul className="mt-2 space-y-1">
                       <li>GRAPHIC DESIGN</li>
                       <li>INDUSTRIAL DESIGN</li>
                       <li>INTERIOR DESIGN</li>
                       <li>FASHION DESIGN</li>
                    </ul>
                 </div>
                 <div className="text-right">
                    <p>FORMATS:</p>
                    <ul className="mt-2 space-y-1">
                       <li>EXHIBITIONS</li>
                       <li>EDUCATIONAL EVENTS</li>
                       <li>DIGITAL PROJECTS</li>
                       <li>PRINTED PUBLICATIONS</li>
                    </ul>
                 </div>
              </div>
           </div>
        </div>

        <div className="absolute bottom-6 right-6 font-mono text-[9px] opacity-40">
           www.koordinata.space
        </div>
      </section>

    </div>
  );
}
