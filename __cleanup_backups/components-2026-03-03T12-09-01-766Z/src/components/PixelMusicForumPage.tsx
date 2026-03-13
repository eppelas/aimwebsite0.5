import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Assets & Styles ---

const PixelFonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
    
    .font-pixel-header { font-family: 'Press Start 2P', cursive; }
    .font-pixel-body { font-family: 'VT323', monospace; }
    .font-mono-text { font-family: 'Space Mono', monospace; }
    
    .barcode-bg {
      background: repeating-linear-gradient(
        90deg,
        #111 0px,
        #111 10px,
        transparent 10px,
        transparent 20px,
        #333 20px,
        #333 25px,
        transparent 25px,
        transparent 35px
      );
      opacity: 0.1;
    }

    .gradient-bars {
      background: linear-gradient(90deg, 
        #000 0%, #fff 10%, 
        #000 20%, #fff 30%, 
        #000 40%, #fff 50%, 
        #000 60%, #fff 70%, 
        #000 80%, #fff 90%
      );
    }
    
    .pixel-shadow {
      text-shadow: 4px 4px 0px #00FFFF;
    }
  `}</style>
);

// --- Components ---

const Marquee = () => (
  <div className="bg-black text-white py-3 overflow-hidden whitespace-nowrap border-y-4 border-black flex items-center">
    <div className="flex animate-marquee">
      {[...Array(10)].map((_, i) => (
        <span key={i} className="mx-4 font-serif text-lg tracking-wider">
          Scroll down. Scroll down. Scroll down.
        </span>
      ))}
    </div>
    <style>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        animation: marquee 20s linear infinite;
      }
    `}</style>
  </div>
);

const BarcodeStripe = () => (
  <div className="h-64 w-full flex justify-between overflow-hidden opacity-20 pointer-events-none absolute top-0 left-0 right-0 -z-10">
    {[...Array(40)].map((_, i) => (
      <div 
        key={i} 
        className="h-full bg-gradient-to-r from-black to-transparent"
        style={{ 
          width: Math.random() * 20 + 10 + 'px',
          opacity: Math.random() * 0.5 + 0.5
        }} 
      />
    ))}
  </div>
);

// --- Main Page ---

export default function PixelMusicForumPage() {
  return (
    <div className="min-h-screen bg-white text-black font-mono-text overflow-x-hidden selection:bg-cyan-400 selection:text-black">
      <PixelFonts />

      {/* Hero Section */}
      <div className="p-4 md:p-12 max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center">
        <div className="leading-tight">
          <div className="flex flex-wrap items-baseline gap-4 mb-4">
            <span className="text-6xl md:text-8xl font-bold tracking-tighter">How a</span>
            <span className="text-xl md:text-2xl font-pixel-body -translate-y-4">kid</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 md:gap-8 mb-4">
            <span className="text-4xl md:text-6xl font-pixel-body border-2 border-black px-2">running</span>
            <span className="text-4xl md:text-6xl font-pixel-body">an obsCure</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="text-5xl md:text-7xl font-pixel-body tracking-widest uppercase">musiC forum</span>
          </div>

          <div className="text-3xl md:text-5xl font-bold mb-8 text-center md:text-left">
            beCame the target
          </div>

          <div className="text-right">
            <span className="text-2xl md:text-4xl block mb-2">of the UK's</span>
            <span className="text-7xl md:text-[10rem] font-pixel-header leading-none block">BIGGEST</span>
          </div>
        </div>
      </div>

      {/* Marquee Bar */}
      <div className="sticky top-0 z-50">
        <div className="bg-black text-white px-4 py-2 flex justify-between items-center font-serif text-sm border-b border-white/20">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center text-[10px]">↗</div>
            <span>20–25 minutes read.</span>
          </div>
        </div>
        <Marquee />
      </div>

      {/* Intro Section with Barcode */}
      <div className="relative py-24 px-4 md:px-12 max-w-5xl mx-auto">
        <BarcodeStripe />
        
        <div className="relative z-10 bg-white/80 backdrop-blur-sm p-4 md:p-8 border-l-4 border-black">
          <p className="text-3xl md:text-5xl font-bold leading-tight mb-8">
            From his bedroom in North East England, Kane Robinson ran a music forum for
          </p>
          <div className="flex items-baseline gap-4">
            <span className="text-6xl md:text-9xl font-pixel-header tracking-tighter">12,000</span>
          </div>
          <p className="text-3xl md:text-5xl font-bold leading-tight mt-4">
            enthusiastic indie fans. But did a uni student with no prior...
          </p>
        </div>
      </div>

      {/* Prison Section */}
      <div className="py-24 bg-white">
        <div className="bg-black h-8 w-full mb-4"></div>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-7xl lg:text-9xl font-pixel-body uppercase tracking-widest leading-none">
            Two Years in Prison?
          </h2>
        </div>
        <div className="bg-black h-8 w-full mt-4"></div>
        
        {/* Vertical Bars Decoration */}
        <div className="h-32 w-full flex justify-center gap-2 mt-8 opacity-50">
           {[...Array(20)].map((_, i) => (
             <div key={i} className="w-2 md:w-4 bg-gradient-to-b from-black to-transparent h-full"></div>
           ))}
        </div>
      </div>

      {/* Money Section */}
      <div className="py-24 px-4 md:px-12 max-w-6xl mx-auto">
        <div className="text-4xl md:text-6xl font-pixel-body mb-8 text-center">
          set up music sharing website that cost industry
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="w-24 h-24 bg-black text-white flex items-center justify-center rounded-full overflow-hidden">
             {/* Pixel Hand Icon Placeholder */}
             <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
               <path d="M2,12 L10,12 L10,2 L14,2 L14,12 L22,12 L22,16 L14,16 L14,22 L10,22 L10,16 L2,16 Z" /> 
             </svg>
          </div>
          
          <div className="text-7xl md:text-[12rem] font-pixel-header leading-none tracking-tighter">
            £240
          </div>
        </div>
        
        <div className="text-7xl md:text-[10rem] font-pixel-header leading-none text-center mt-4">
          million"
        </div>
      </div>

      {/* Quote Section */}
      <div className="py-24 px-4 md:px-12 max-w-4xl mx-auto">
        <p className="text-xl md:text-3xl font-serif leading-relaxed mb-12">
          early music being horsed out by fans—<span className="font-bold">"WE NEVER MADE THOSE DEMOS TO MAKE MONEY ANYWAY,"</span> drummer Matt Helders <span className="underline decoration-2">told Prefix Magazine in 2005</span>.
        </p>

        <div className="border-t-4 border-black pt-12">
          <h3 className="text-4xl md:text-7xl font-pixel-body uppercase mb-4 text-center">
            MARDY-BUM.COM BECAME
          </h3>
          <h3 className="text-6xl md:text-9xl font-pixel-header text-center pixel-shadow text-transparent stroke-black" style={{ WebkitTextStroke: '2px black', color: 'transparent' }}>
            SO <span className="text-cyan-400" style={{ WebkitTextStroke: '2px black' }}>POPULAR</span>
          </h3>
        </div>

        <p className="text-xl md:text-3xl font-serif leading-relaxed mt-12">
          that websites like NME.com started to use it as a news source, and lads magazine Zoo gave it a...
        </p>
      </div>

      {/* Footer */}
      <div className="bg-black text-white py-12 text-center font-pixel-body text-xl">
        [ END OF FILE ]
      </div>

    </div>
  );
}
