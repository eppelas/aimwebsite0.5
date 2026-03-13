import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plus, X, ArrowRight } from 'lucide-react';

// --- Styles ---

const KampongStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Racing+Sans+One&family=Inter:wght@400;600;800&display=swap');
    
    .font-racing { font-family: 'Racing Sans One', cursive; }
    .font-inter { font-family: 'Inter', sans-serif; }
    
    .text-stroke-white {
      -webkit-text-stroke: 2px white;
      color: transparent;
    }
    
    .text-stroke-orange {
      -webkit-text-stroke: 1px #FF5500;
      color: transparent;
    }

    .pill-container {
      box-shadow: 
        0 10px 30px -10px rgba(255, 85, 0, 0.3),
        inset 0 2px 4px rgba(255, 255, 255, 0.8),
        inset 0 -2px 4px rgba(0, 0, 0, 0.05);
    }

    .glass-panel {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border: 2px solid white;
      box-shadow: 
        0 20px 40px -10px rgba(0,0,0,0.1),
        inset 0 2px 4px rgba(255, 255, 255, 1);
    }
  `}</style>
);

// --- Components ---

const PuppetGraphic = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full text-[#FF5500] opacity-80">
    <motion.g
      initial={{ rotate: -5 }}
      animate={{ rotate: 5 }}
      transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
    >
      {/* Abstract articulated shape mimicking the puppet */}
      <path d="M200 50 C 220 50, 240 70, 240 100 C 240 130, 220 150, 200 150 C 180 150, 160 130, 160 100 C 160 70, 180 50, 200 50 Z" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M200 150 L 200 250" stroke="currentColor" strokeWidth="4" />
      <path d="M200 180 L 150 220 L 120 200" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M200 180 L 250 220 L 280 200" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M200 250 L 170 350" stroke="currentColor" strokeWidth="4" />
      <path d="M200 250 L 230 350" stroke="currentColor" strokeWidth="4" />
      
      {/* Decorative elements */}
      <circle cx="200" cy="100" r="10" fill="currentColor" />
      <circle cx="150" cy="220" r="5" fill="currentColor" />
      <circle cx="250" cy="220" r="5" fill="currentColor" />
      <circle cx="170" cy="350" r="5" fill="currentColor" />
      <circle cx="230" cy="350" r="5" fill="currentColor" />
    </motion.g>
  </svg>
);

const MarqueeHeader = () => (
  <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between gap-4 pointer-events-none">
    <div className="bg-[#FF5500] text-white px-6 py-2 rounded-full font-racing text-xl tracking-wider shadow-lg pointer-events-auto cursor-pointer hover:scale-105 transition-transform">
      AI MINDSET
    </div>
    
    <div className="flex-1 bg-white/80 backdrop-blur-sm border-2 border-[#FF5500] h-12 rounded-full flex items-center overflow-hidden relative shadow-lg">
      <div className="absolute inset-0 flex items-center animate-marquee whitespace-nowrap">
        <motion.div 
          className="flex gap-8 text-[#FF5500] font-racing text-lg uppercase tracking-widest"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {Array(10).fill("The System of Intelligence • Operational Excellence • Future Proof • ").map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </motion.div>
      </div>
    </div>

    <div className="bg-[#FF5500] text-white px-8 py-2 rounded-full font-racing text-xl tracking-wider shadow-lg pointer-events-auto cursor-pointer hover:bg-[#FF7700] transition-colors">
      ABOUT
    </div>
  </div>
);

// --- Main Page ---

export default function KampongStylePage() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <div className="min-h-screen bg-[#E6E6E6] overflow-hidden font-inter selection:bg-[#FF5500] selection:text-white pb-24">
      <KampongStyles />
      <MarqueeHeader />

      {/* Hero Section */}
      <section className="pt-32 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          
          {/* Main Title Container */}
          <motion.div 
            className="glass-panel rounded-[40px] p-8 md:p-16 mb-8 relative overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[12vw] leading-[0.85] font-racing text-[#E6E6E6] drop-shadow-sm select-none pointer-events-none" style={{ WebkitTextStroke: '2px #CCC' }}>
              THE SYSTEM
            </h1>
            <h1 className="text-[12vw] leading-[0.85] font-racing text-[#E6E6E6] drop-shadow-sm select-none pointer-events-none -mt-4 md:-mt-8 ml-12 md:ml-24" style={{ WebkitTextStroke: '2px #CCC' }}>
              OF MINDSET
            </h1>
            
            <div className="absolute inset-0 flex items-center justify-center mix-blend-overlay">
              <h1 className="text-[12vw] leading-[0.85] font-racing text-white opacity-50">
                THE SYSTEM<br/>OF MINDSET
              </h1>
            </div>
          </motion.div>

          {/* Orange Bar */}
          <div className="bg-[#FF5500] rounded-[30px] p-4 md:p-6 flex flex-col md:flex-row justify-between items-center text-white shadow-xl mb-16 transform -rotate-1">
            <div className="text-xl md:text-2xl font-racing uppercase tracking-widest">
              ARCHITECT:
            </div>
            <div className="text-3xl md:text-5xl font-racing uppercase tracking-tighter">
              AI MINDSET OPERATIONS
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            
            {/* Left Column - Visual */}
            <div className="relative">
              <h2 className="text-[10vw] leading-[0.8] font-racing text-[#FF5500] mb-8 transform -rotate-2 origin-bottom-left">
                NEURAL<br/>NETWORKS
              </h2>
              
              <div className="relative h-[400px] md:h-[600px] bg-[#D9D9D9] rounded-[40px] overflow-hidden glass-panel">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%]">
                  <PuppetGraphic />
                </div>
                
                {/* Interactive Button */}
                <div className="absolute bottom-8 right-8">
                  <button className="w-16 h-16 bg-[#FF5500] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                    <Plus size={32} />
                  </button>
                </div>

                {/* Arrow Line */}
                <svg className="absolute top-1/2 left-full w-32 h-32 text-[#FF5500] hidden md:block pointer-events-none" style={{ transform: 'translate(-20%, -50%)' }}>
                  <path d="M 0 50 Q 50 50 80 80" fill="none" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#FF5500" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Right Column - Text */}
            <div className="flex flex-col justify-center">
              <motion.div 
                className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl mb-8 border-l-[12px] border-[#FF5500]"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-2xl md:text-3xl font-racing text-[#FF5500] mb-6">
                  The driving force in creating POS was the need for clarity.
                </h3>
                <p className="text-lg md:text-xl font-inter font-medium text-gray-600 leading-relaxed">
                  Like the colorful <span className="text-[#FF5500] italic font-bold">Rojak Buah</span> (mixed fruit salad), I wanted to portray a melting pot of tools, contexts, and workflows. The holographic <span className="text-[#FF5500] italic font-bold">POS System</span> serves to remind us of our past while the advances in AI serve to remind us of our future sustainability.
                </p>
                
                <div className="mt-8 flex justify-end">
                  <div className="bg-[#333] text-white px-6 py-2 rounded-full text-xs font-inter uppercase tracking-widest">
                    Made with Intelligence
                  </div>
                </div>
              </motion.div>

              <div className="bg-[#FFD700] rounded-[40px] p-8 md:p-12 shadow-xl transform rotate-1">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-racing text-xl opacity-50">PRESENTS</span>
                  <span className="font-racing text-xl opacity-50">2026</span>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-[8vw] leading-none font-racing text-[#333]">
                    POS<span className="text-white">____</span>AI
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Banner */}
          <div className="mt-16 md:mt-32 relative">
            <div className="absolute inset-0 bg-[#FF5500] transform skew-y-2 rounded-[40px] shadow-lg"></div>
            <div className="relative bg-white rounded-[40px] p-8 md:p-16 flex flex-col items-center text-center shadow-xl border-4 border-[#FF5500]">
              <h2 className="text-[4vw] md:text-[3vw] font-racing text-[#FF5500] leading-tight mb-8">
                Kampong G(e)lamorous reimagines the colourful and vibrant world of AI Operations through the eyes of the people of the past.
              </h2>
              
              <div className="w-full h-1 bg-[#E6E6E6] rounded-full mb-8"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-left">
                <div>
                  <h4 className="font-racing text-[#FF5500] text-xl mb-2">CONTEXT</h4>
                  <p className="font-inter text-gray-500 text-sm">Understanding the unique diversity and tolerance of your digital ecosystem.</p>
                </div>
                <div>
                  <h4 className="font-racing text-[#FF5500] text-xl mb-2">LOGIC</h4>
                  <p className="font-inter text-gray-500 text-sm">A melting pot of culture and colours on the streets of your database.</p>
                </div>
                <div>
                  <h4 className="font-racing text-[#FF5500] text-xl mb-2">FUTURE</h4>
                  <p className="font-inter text-gray-500 text-sm">Advances in urban farming serve to remind us of our future sustainability.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
