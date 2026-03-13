import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Globe, Zap, Mail, Instagram, Twitter, Send } from 'lucide-react';

// --- Components ---

const NoiseBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay">
    <svg width="100%" height="100%">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

const GridOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:80px_80px]" />
);

const MapBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
    <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <path d="M100,100 Q200,50 300,100 T500,100 T700,100 T900,100" fill="none" stroke="black" strokeWidth="1" />
      <path d="M50,200 Q150,150 250,200 T450,200 T650,200 T850,200" fill="none" stroke="black" strokeWidth="1" />
      <path d="M100,300 Q200,250 300,300 T500,300 T700,300 T900,300" fill="none" stroke="black" strokeWidth="1" />
      <path d="M50,400 Q150,350 250,400 T450,400 T650,400 T850,400" fill="none" stroke="black" strokeWidth="1" />
      <path d="M100,500 Q200,450 300,500 T500,500 T700,500 T900,500" fill="none" stroke="black" strokeWidth="1" />
      {/* Abstract continents */}
      <path d="M200,150 C250,100 350,100 400,150 C450,200 400,300 350,350 C300,400 200,350 150,300 C100,250 150,200 200,150 Z" fill="none" stroke="black" strokeWidth="1" />
      <path d="M600,200 C650,150 750,150 800,200 C850,250 800,350 750,400 C700,450 600,400 550,350 C500,300 550,250 600,200 Z" fill="none" stroke="black" strokeWidth="1" />
    </svg>
  </div>
);

const Header = () => (
  <div className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-start text-[10px] md:text-xs font-mono uppercase tracking-tight z-50 mix-blend-multiply pointer-events-none">
    <div className="max-w-[150px]">
      AI Mindset Lab<br/>
      Batch W26<br/>
      Global Campus
    </div>
    <div className="text-center hidden md:block">
      Ver. 2.0 / Updated Feb 2025
    </div>
    <div className="text-right max-w-[150px]">
      Based in Cloud<br/>
      Originally from Earth
    </div>
  </div>
);

const MenuItem = ({ text, href }: { text: string; href?: string }) => {
  return (
    <motion.a 
      href={href || "#"}
      whileHover={{ x: 20 }}
      className="block text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] cursor-pointer group relative"
    >
      <span className="relative z-10 border-b-4 border-black group-hover:border-transparent transition-colors duration-300">
        {text}
      </span>
      <span className="absolute left-0 top-0 text-transparent [-webkit-text-stroke:1px_black] translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0">
        {text}
      </span>
    </motion.a>
  );
};

const LinkItem = ({ text, href, note }: { text: string; href?: string; note?: string }) => (
  <a href={href || "#"} className="group inline-block mr-4 mb-2">
    <span className="text-3xl md:text-5xl font-bold tracking-tight border-b-2 border-black group-hover:bg-black group-hover:text-white transition-colors duration-300">
      {text}
    </span>
    {note && <span className="ml-2 text-sm font-mono uppercase opacity-50">({note})</span>}
    <span className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <ArrowUpRight size={24} />
    </span>
  </a>
);

// --- Main Page ---

export default function ExperimentalGridPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-hidden relative">
      <NoiseBackground />
      <GridOverlay />
      <MapBackground />
      <Header />

      {/* Hero Content */}
      <main className="relative z-10 pt-32 md:pt-48 px-4 md:px-12 max-w-[1600px] mx-auto pb-24">
        
        {/* Main Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-7xl font-medium tracking-tight leading-[1.1] mb-24 md:mb-48 max-w-5xl"
        >
          AI Mindset — лаборатория нового мышления. <br className="hidden md:block"/>
          <span className="border-b-4 border-black">Архитекторы</span> реальности, формирующие <br className="hidden md:block"/>
          интернет завтрашнего дня.
        </motion.h1>

        {/* Central Image / Visual */}
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[300px] md:w-[400px] h-[500px] md:h-[600px] bg-gray-200 z-[-1] overflow-hidden grayscale contrast-125 opacity-50 mix-blend-multiply pointer-events-none hidden md:block">
           <img 
             src="https://images.unsplash.com/photo-1531297461136-82lw9z1w1w1w?q=80&w=2670&auto=format&fit=crop" 
             alt="Abstract Figure" 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50"></div>
        </div>

        {/* Index / Menu */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-48">
          <div className="col-span-1 md:col-span-3 text-xl font-mono">
            index:
          </div>
          <div className="col-span-1 md:col-span-9 flex flex-col items-start space-y-4">
            <MenuItem text="промпт" />
            <MenuItem text="контекст" />
            <MenuItem text="майнд" />
            <MenuItem text="лайф" />
            <MenuItem text="менторство" />
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
          <div className="col-span-1 md:col-span-3 text-xl font-mono">
            links:
          </div>
          <div className="col-span-1 md:col-span-9">
            <div className="flex flex-wrap items-baseline leading-relaxed">
              <LinkItem text="instagram" />
              <span className="text-3xl md:text-5xl font-light mx-2">/</span>
              <LinkItem text="telegram" note="channel" />
              <span className="text-3xl md:text-5xl font-light mx-2">/</span>
              <LinkItem text="youtube" />
              <span className="text-3xl md:text-5xl font-light mx-2">/</span>
              <LinkItem text="apply" note="w26" />
            </div>
            
            <div className="mt-16">
              <LinkItem text="contact with team (email)" />
            </div>
          </div>
        </div>

      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 left-8 z-50 flex gap-4">
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer">
          <div className="w-6 h-6 border-2 border-white" />
        </div>
        <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer">
          <Zap size={24} />
        </div>
      </div>

    </div>
  );
}
