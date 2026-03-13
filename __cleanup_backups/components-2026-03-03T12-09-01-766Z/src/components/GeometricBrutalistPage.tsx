import React from 'react';
import { motion } from 'framer-motion';

// --- Components ---

const BarcodeBlock = ({ className = "" }: { className?: string }) => (
  <div className={`flex gap-1 h-24 w-24 ${className}`}>
    {[...Array(8)].map((_, i) => (
      <div 
        key={i} 
        className="bg-white/80" 
        style={{ 
          width: Math.random() > 0.5 ? '8px' : '4px',
          opacity: Math.random() > 0.3 ? 1 : 0 
        }} 
      />
    ))}
  </div>
);

const BlueBlock = ({ 
  children, 
  className = "", 
  delay = 0 
}: { 
  children?: React.ReactNode; 
  className?: string;
  delay?: number;
}) => (
  <motion.div 
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`bg-[#0000FF] origin-bottom ${className}`}
  >
    {children}
  </motion.div>
);

const DiagonalDate = () => (
  <div className="relative w-32 h-32 text-white font-bold text-xl">
    <div className="absolute top-0 left-0">19 JAN</div>
    <div className="absolute inset-0 border-t border-white -rotate-45 origin-top-left translate-y-8 scale-x-150"></div>
    <div className="absolute bottom-0 right-0">16 FEB</div>
  </div>
);

const RotatingStar = () => (
  <motion.div 
    animate={{ rotate: 360 }}
    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    className="text-white text-9xl leading-none select-none"
  >
    *
  </motion.div>
);

// --- Main Page ---

export default function GeometricBrutalistPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#0000FF] selection:text-white overflow-hidden relative">
      
      {/* Grid Layout */}
      <div className="grid grid-cols-12 grid-rows-[repeat(12,minmax(0,1fr))] h-screen w-full p-4 md:p-8 gap-4">
        
        {/* Large Left Block */}
        <BlueBlock className="col-span-12 md:col-span-4 row-span-4 md:row-span-6 relative p-6 flex flex-col justify-between">
           <div className="text-xs font-mono uppercase tracking-widest opacity-70">
             AI Mindset Lab
           </div>
           <div className="self-end">
             <div className="w-4 h-4 bg-black"></div>
           </div>
        </BlueBlock>

        {/* Center Top Spacer / Content */}
        <div className="col-span-6 md:col-span-2 row-span-2 md:row-span-6 flex flex-col items-center justify-center z-10">
           <DiagonalDate />
        </div>

        {/* Right Tall Block */}
        <BlueBlock className="col-span-6 md:col-span-6 row-span-6 md:row-span-12 relative p-8 md:p-12 flex flex-col justify-end" delay={0.2}>
           <h1 className="text-6xl md:text-9xl font-black uppercase leading-none tracking-tighter mb-8 mix-blend-overlay">
             Departure<br/>Gallery
           </h1>
           <div className="max-w-md text-sm font-mono uppercase leading-relaxed opacity-80">
             "The Departure Gallery"<br/><br/>
             Collection of mindsets made within last 4 weeks at arrival by a number of extremely talented designers from digital, technology and brand teams.
           </div>
        </BlueBlock>

        {/* Barcode Area */}
        <div className="col-span-6 md:col-span-2 row-span-2 flex items-center justify-center">
          <BarcodeBlock />
        </div>

        {/* Star Area */}
        <div className="col-span-6 md:col-span-2 row-span-2 flex items-center justify-center">
          <RotatingStar />
        </div>

        {/* Bottom Left Tall Block */}
        <BlueBlock className="col-span-6 md:col-span-4 row-span-6 md:row-span-6 relative p-6" delay={0.4}>
           <div className="absolute bottom-6 right-6 flex flex-col items-end text-right">
             <div className="text-4xl font-bold mb-2">W26</div>
             <div className="text-xs font-mono uppercase max-w-[150px]">
               Batch Winter 26<br/>
               Applications Open
             </div>
           </div>
        </BlueBlock>

        {/* Center Bottom Strip */}
        <BlueBlock className="col-span-6 md:col-span-2 row-span-6 md:row-span-12" delay={0.1} />

      </div>

      {/* Overlay Content (Absolute to break the grid if needed) */}
      <div className="absolute top-1/2 left-8 md:left-1/3 -translate-y-1/2 z-20 pointer-events-none mix-blend-difference">
        <div className="flex flex-col gap-12">
          <div className="pointer-events-auto cursor-pointer group">
            <div className="text-xs font-mono text-gray-400 mb-1 group-hover:text-white">01. PROMPT</div>
            <div className="text-2xl font-bold uppercase group-hover:translate-x-4 transition-transform">Engineering</div>
          </div>
          <div className="pointer-events-auto cursor-pointer group">
            <div className="text-xs font-mono text-gray-400 mb-1 group-hover:text-white">02. CONTEXT</div>
            <div className="text-2xl font-bold uppercase group-hover:translate-x-4 transition-transform">Engineering</div>
          </div>
          <div className="pointer-events-auto cursor-pointer group">
            <div className="text-xs font-mono text-gray-400 mb-1 group-hover:text-white">03. MIND</div>
            <div className="text-2xl font-bold uppercase group-hover:translate-x-4 transition-transform">Engineering</div>
          </div>
          <div className="pointer-events-auto cursor-pointer group">
            <div className="text-xs font-mono text-gray-400 mb-1 group-hover:text-white">04. LIFE</div>
            <div className="text-2xl font-bold uppercase group-hover:translate-x-4 transition-transform">Engineering</div>
          </div>
        </div>
      </div>

      {/* Footer / CTA */}
      <div className="fixed bottom-8 right-8 z-30">
        <button className="bg-[#0000FF] text-white px-8 py-4 font-bold uppercase hover:bg-white hover:text-[#0000FF] transition-colors border border-transparent hover:border-[#0000FF]">
          Join Waitlist
        </button>
      </div>

    </div>
  );
}
