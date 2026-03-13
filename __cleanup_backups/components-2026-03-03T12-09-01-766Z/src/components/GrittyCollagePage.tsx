import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Plus, X } from 'lucide-react';

// --- Assets & Styles ---
// Simulating the gritty texture with CSS
const NoiseOverlay = () => (
  <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.08] mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

const TornEdge = ({ className = "" }: { className?: string }) => (
  <div className={`absolute w-full h-4 bg-transparent ${className}`}
    style={{
      backgroundImage: `linear-gradient(45deg, transparent 33.333%, #F0EEE6 33.333%, #F0EEE6 66.667%, transparent 66.667%), linear-gradient(-45deg, transparent 33.333%, #F0EEE6 33.333%, #F0EEE6 66.667%, transparent 66.667%)`,
      backgroundSize: '20px 40px',
      backgroundPosition: '0 -20px'
    }}
  />
);

// --- Components ---

const MenuItem = ({ number, text }: { number: string; text: string }) => (
  <div className="group flex items-baseline gap-4 cursor-pointer">
    <span className="font-mono text-[10px] md:text-xs opacity-60">{number}</span>
    <span className="font-bold text-xl md:text-2xl uppercase tracking-tighter border-b-2 border-transparent group-hover:border-white transition-all">
      {text}
    </span>
  </div>
);

const GuideCard = ({ name, role, image }: { name: string; role: string; image: string }) => (
  <div className="relative group grayscale hover:grayscale-0 transition-all duration-500">
    <div className="aspect-[3/4] overflow-hidden bg-gray-800">
      <img src={image} alt={name} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
    </div>
    <div className="absolute bottom-4 left-4 bg-white text-black p-2 max-w-[80%]">
      <h3 className="font-bold uppercase tracking-tight text-lg">{name}</h3>
      <p className="font-mono text-xs leading-tight mt-1">{role}</p>
    </div>
  </div>
);

// --- Main Page ---

export default function GrittyCollagePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotateParallax = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <div ref={containerRef} className="bg-[#0A0A0A] text-[#F0EEE6] font-sans selection:bg-white selection:text-black overflow-x-hidden relative">
      <NoiseOverlay />

      {/* Header / Nav */}
      <nav className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-start z-40 mix-blend-difference pointer-events-none">
        <div className="font-mono text-xs md:text-sm tracking-widest pointer-events-auto">
          12 2 81
        </div>
        <div className="font-mono text-xs md:text-sm tracking-widest text-center hidden md:block pointer-events-auto">
          36.0256° N, 78.9854° W
        </div>
        <button className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm md:text-base pointer-events-auto hover:opacity-70">
          <Plus size={16} /> Menu
        </button>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen relative flex flex-col justify-center items-center overflow-hidden pt-20 pb-20">
        {/* Background Image Collage */}
        <div className="absolute inset-0 z-0 opacity-40">
           <img 
            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" 
            alt="Texture" 
            className="w-full h-full object-cover grayscale contrast-125"
          />
        </div>

        {/* Big Typography */}
        <div className="relative z-10 w-full max-w-[95vw] mx-auto">
          <div className="flex flex-col items-center justify-center">
            <motion.h1 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-[18vw] leading-[0.8] font-black tracking-tighter uppercase text-center mix-blend-lighten"
            >
              AI MINDSET
            </motion.h1>
            <motion.h1 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
              className="text-[18vw] leading-[0.8] font-black tracking-tighter uppercase text-center text-transparent stroke-white bg-clip-text bg-white/10"
              style={{ WebkitTextStroke: '2px #F0EEE6' }}
            >
              POS {`{SPRINT}`}
            </motion.h1>
          </div>
        </div>

        {/* Floating Menu Items */}
        <div className="absolute bottom-12 left-4 md:left-12 space-y-2 z-20 hidden md:block">
          <MenuItem number="001" text="Context" />
          <MenuItem number="002" text="Architecture" />
          <MenuItem number="003" text="Tools" />
        </div>

        <div className="absolute bottom-12 right-4 md:right-12 space-y-2 z-20 text-right hidden md:block">
          <MenuItem number="004" text="Skills" />
          <MenuItem number="005" text="Feedback" />
          <MenuItem number="006" text="Join" />
        </div>
        
        {/* Mobile Menu Items */}
        <div className="md:hidden absolute bottom-8 left-4 right-4 flex justify-between z-20">
           <div className="space-y-1">
              <MenuItem number="001" text="Context" />
              <MenuItem number="002" text="Tools" />
           </div>
           <div className="space-y-1 text-right">
              <MenuItem number="003" text="Join" />
           </div>
        </div>
      </section>

      {/* "About" Section - Light Paper Style */}
      <section className="bg-[#F0EEE6] text-[#0A0A0A] py-24 md:py-32 relative overflow-hidden">
        <TornEdge className="top-[-10px] rotate-180" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row gap-16 md:gap-32 items-start">
          {/* Handwritten Text */}
          <div className="w-full md:w-1/2 relative">
            <motion.div 
              style={{ rotate: -2 }}
              className="font-[Caveat,cursive] text-3xl md:text-5xl leading-tight opacity-90"
            >
              "POS — это не инструмент, это операционная система с персональным AI-ассистентом. Слой правил, контекста и ограничений, который заставляет инструменты работать."
            </motion.div>
            
            <div className="mt-12 font-bold uppercase tracking-tighter text-4xl md:text-6xl">
              NEVER GO<br/>CHAOTIC
            </div>

            <p className="mt-8 font-mono text-sm md:text-base max-w-md leading-relaxed border-l-2 border-black pl-6">
              Представь: утром агент даёт план дня под твой уровень энергии и приоритеты. Днём напоминает про встречу, бриф к которой он подготовил. Вечером находит незакрытые задачи.
            </p>
          </div>

          {/* Portrait Cutout */}
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-[4/5] bg-black relative overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop" 
                alt="Portrait" 
                className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 font-mono text-[10px] bg-white text-black px-2 py-1">
                IMG_001.JPG
              </div>
            </div>
            <div className="mt-4 flex justify-between items-end font-mono text-xs uppercase tracking-widest">
              <span>Handmade in AI Mindset</span>
              <span>+ Menu</span>
            </div>
          </div>
        </div>
      </section>

      {/* Guides / Collage Section */}
      <section className="bg-[#0A0A0A] text-[#F0EEE6] py-32 px-4 md:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/20 pb-8">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase">
              YOUR GUIDES
            </h2>
            <div className="font-mono text-xs md:text-sm mb-2 opacity-60">
              EST. 2026 / SPRINT W26
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GuideCard 
              name="Александр Поваляев" 
              role="FOUNDER / STRATEGIST" 
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" 
            />
            <GuideCard 
              name="Сергей Хабаров" 
              role="SYSTEM ARCHITECT" 
              image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop" 
            />
            <GuideCard 
              name="Серёжа Рис" 
              role="AI EVANGELIST" 
              image="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop" 
            />
          </div>
        </div>
      </section>

      {/* Result / Checklist Section */}
      <section className="bg-[#F0EEE6] text-[#0A0A0A] py-32 px-4 md:px-12 relative">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-4 mb-16">
             <span className="font-mono text-sm">[ RESULT ]</span>
             <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">
               Select Appliqués
             </h2>
          </div>

          <div className="space-y-4 font-mono text-lg md:text-xl uppercase tracking-wide">
            {[
              "001: Собранный контекст (AI знает кто ты)",
              "002: Логичная архитектура (Безопасность)",
              "003: Связанные инструменты (Claude / Obsidian)",
              "004: Работающие skills (Автоматизация)"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer hover:bg-black hover:text-white p-4 transition-colors border border-black/10">
                <div className="w-6 h-6 border-2 border-current flex items-center justify-center">
                  <div className="w-3 h-3 bg-current opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] text-[#F0EEE6] py-24 px-4 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <h2 className="text-[12vw] leading-none font-black tracking-tighter uppercase opacity-20 hover:opacity-100 transition-opacity duration-500 cursor-pointer">
              JOIN NOW
            </h2>
          </div>
          <div className="flex flex-col gap-4 font-mono text-xs uppercase tracking-widest text-right">
            <a href="#" className="hover:underline">Instagram</a>
            <a href="#" className="hover:underline">Telegram</a>
            <a href="#" className="hover:underline">Podcast</a>
            <div className="mt-8 opacity-50">
              © 2026 AI Mindset<br/>
              The well-fed does not<br/>
              understand the hungry
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky CTA */}
      <div className="fixed bottom-6 right-6 z-50 mix-blend-difference">
        <button className="bg-[#F0EEE6] text-[#0A0A0A] px-6 py-3 font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2">
          Start Sprint <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
}
