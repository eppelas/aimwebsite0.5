import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Star, Music, Mail, Linkedin, Instagram } from 'lucide-react';

// --- Assets & Components ---

const ScribbleUnderline = () => (
  <svg className="absolute -bottom-2 left-0 w-full h-4 text-black overflow-visible" viewBox="0 0 100 10" preserveAspectRatio="none">
    <path d="M0,5 Q50,10 100,5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const YellowStar = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`text-[#E6FF00] ${className}`}>
    <path d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" fill="currentColor" />
  </svg>
);

const Spiral = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`text-[#E6FF00] fill-none stroke-current stroke-[3] ${className}`}>
    <path d="M50,50 m-2,0 a 2,2 0 1,0 4,0 a 4,4 0 1,0 -8,0 a 8,8 0 1,0 16,0 a 16,16 0 1,0 -32,0 a 32,32 0 1,0 64,0" />
  </svg>
);

const FloatingSticker = ({ src, initialX, initialY, rotate }: { src: string; initialX: number; initialY: number; rotate: number }) => {
  return (
    <motion.img
      src={src}
      className="absolute w-24 h-24 md:w-32 md:h-32 object-contain z-10 pointer-events-none mix-blend-multiply"
      initial={{ x: initialX, y: initialY, rotate }}
      animate={{ 
        y: [initialY, initialY - 20, initialY],
        rotate: [rotate, rotate + 5, rotate - 5, rotate]
      }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
};

const InteractiveFace = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="relative group cursor-pointer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="relative w-64 h-80 md:w-80 md:h-96 overflow-hidden grayscale contrast-125">
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" 
          alt="Portrait" 
          className="w-full h-full object-cover"
        />
        {/* Scribbles on face */}
        <motion.div 
          className="absolute top-[30%] left-[20%] w-12 h-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <Spiral className="w-full h-full" />
        </motion.div>
        <motion.div 
          className="absolute top-[25%] right-[25%] w-16 h-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <YellowStar className="w-full h-full stroke-black stroke-2" />
        </motion.div>
        <motion.div
           className="absolute bottom-[25%] left-[30%] w-24 h-8"
           initial={{ opacity: 0 }}
           animate={{ opacity: isHovered ? 1 : 0 }}
        >
           <svg viewBox="0 0 100 40" className="w-full h-full stroke-[#E6FF00] stroke-[3] fill-none">
             <path d="M10,20 Q50,35 90,20" />
             <path d="M10,20 Q50,5 90,20" />
           </svg>
        </motion.div>
      </div>
      <div className="absolute -bottom-8 right-0 font-mono text-xs font-bold">don't touch my face</div>
    </div>
  );
};

// --- Main Page ---

export default function PlayfulPortfolioPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const xMove = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="bg-[#DCDCD1] text-black font-sans min-h-screen overflow-x-hidden selection:bg-[#E6FF00] selection:text-black">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-start z-50 mix-blend-difference text-[#E6FF00]">
        <div className="flex gap-8 font-serif italic text-lg md:text-xl">
          <span className="hover:underline cursor-pointer">context</span>
          <span className="hover:underline cursor-pointer hidden md:inline">architecture</span>
          <span className="hover:underline cursor-pointer hidden md:inline">tools</span>
        </div>
        <div className="flex gap-8 font-serif italic text-lg md:text-xl">
          <span className="hover:underline cursor-pointer">skills</span>
          <span className="hover:underline cursor-pointer">join now</span>
        </div>
      </nav>

      {/* Side Label */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 bg-black text-white py-4 px-2 writing-vertical-rl rotate-180 font-mono text-xs uppercase tracking-widest z-40">
        sprint x26
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-4 md:px-12 pt-32 relative overflow-hidden">
        {/* Stickers */}
        <FloatingSticker src="https://cdn-icons-png.flaticon.com/512/7480/7480837.png" initialX={100} initialY={-50} rotate={15} />
        <FloatingSticker src="https://cdn-icons-png.flaticon.com/512/3081/3081840.png" initialX={800} initialY={50} rotate={-10} />
        
        <div className="max-w-[90vw] relative z-10">
          <h1 className="text-[15vw] leading-[0.8] font-black tracking-tighter">
            ai mindset<br/>
            pos <span className="relative inline-block text-transparent" style={{ WebkitTextStroke: '2px black' }}>
              sprint
              <span className="absolute inset-0 text-[#E6FF00] mix-blend-multiply" style={{ WebkitTextStroke: '0px' }}>sprint</span>
              <svg className="absolute -bottom-[10%] -right-[10%] w-[80%] h-[80%] text-black rotate-12" viewBox="0 0 100 100">
                <path d="M50,0 L50,100 M25,75 L50,100 L75,75" fill="none" stroke="currentColor" strokeWidth="5" />
              </svg>
            </span>
          </h1>
        </div>
      </section>

      {/* Ice Cream Section */}
      <section className="min-h-[80vh] flex flex-col justify-center px-4 md:px-12 relative">
        <div className="max-w-[90vw]">
          <h2 className="text-[15vw] leading-[0.8] font-black tracking-tighter">
            never go<br/>
            <span className="font-['Fraunces',serif] italic font-black" style={{ fontVariationSettings: '"WONK" 1, "SOFT" 100' }}>chaotic</span>
            <span className="ml-8 relative inline-block text-[#E6FF00] italic font-serif text-[10vw] align-middle" style={{ textShadow: '2px 2px 0px black' }}>
              again
              <div className="absolute top-1/2 left-0 w-full h-2 bg-black -rotate-2"></div>
            </span>
          </h2>
        </div>
      </section>

      {/* About / Bio Section */}
      <section className="min-h-screen py-32 px-4 md:px-12 flex flex-col md:flex-row items-center gap-16 md:gap-32">
        <div className="w-full md:w-1/2 space-y-8">
          <h3 className="text-4xl md:text-5xl font-bold leading-tight">
            pos is not a tool.<br/>
            it is an operating system.
          </h3>
          <p className="text-2xl md:text-3xl font-medium opacity-80 leading-snug">
            a layer of rules, context, and constraints that makes tools work.
            imagine: in the morning, the agent gives a plan. during the day, it reminds you. in the evening, it finds tasks.
          </p>
          
          <div className="flex flex-wrap gap-x-12 gap-y-4 text-[#E6FF00] font-serif italic text-3xl md:text-4xl" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.2)' }}>
            <a href="#" className="hover:text-black transition-colors">context</a>
            <a href="#" className="hover:text-black transition-colors">architecture</a>
            <a href="#" className="hover:text-black transition-colors">tools</a>
            <a href="#" className="hover:text-black transition-colors">skills</a>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <InteractiveFace />
        </div>
      </section>

      {/* Footer Marquee */}
      <footer className="bg-black text-[#E6FF00] py-4 overflow-hidden">
        <motion.div 
          className="whitespace-nowrap font-mono text-sm uppercase tracking-widest flex gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {Array(10).fill("AI MINDSET POS SPRINT — BATCH X26 — NEVER GO CHAOTIC — ").map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </motion.div>
      </footer>

    </div>
  );
}
