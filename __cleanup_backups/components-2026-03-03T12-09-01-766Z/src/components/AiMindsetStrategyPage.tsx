import React from 'react';
import { motion } from 'motion/react';

export default function AiMindsetStrategyPage() {
  // Pastel colors from the screenshot
  const stripes = [
    'bg-[#F9D8D6]', // pink
    'bg-[#E4F2E2]', // light green
    'bg-[#D6E4F9]', // light blue
    'bg-[#F9EED6]', // light yellow/peach
    'bg-[#E4D6F9]', // light purple
    'bg-[#D6F9F0]', // light cyan
    'bg-[#F9D8D6]', // pink
    'bg-[#E4F2E2]', // light green
    'bg-[#D6E4F9]', // light blue
    'bg-[#F9EED6]', // light yellow/peach
  ];

  // Repeat stripes to fill the width
  const repeatedStripes = Array.from({ length: 40 }).map((_, i) => stripes[i % stripes.length]);

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#111111] font-sans flex flex-col relative overflow-hidden selection:bg-black selection:text-white">
      
      {/* Header */}
      <header className="flex justify-between items-center px-8 md:px-12 py-8 text-sm font-bold tracking-wider uppercase border-b border-black/5 relative z-20">
        <div className="text-black">AI MINDSET TEMPLATE</div>
        <div className="hidden md:flex gap-16 text-black/40">
          <span>CLIENT: YOU</span>
          <span>DATE: WINTER 2026</span>
          <span>STATUS: CONFIDENTIAL</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-start pt-24 px-8 md:px-24 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-7xl md:text-[9rem] font-bold leading-[0.9] tracking-tight mb-8 text-[#1A1A1A]">
            AI MINDSET<br />
            STRATEGY
          </h1>
          <p className="text-xl md:text-2xl text-[#666666] leading-relaxed max-w-3xl font-medium">
            Identify a high-level positioning for your personal operating system to help develop a visionary AI-first workflow with a consistent, compelling narrative.
          </p>
        </motion.div>
      </main>

      {/* Pastel Stripes Background */}
      <div className="absolute bottom-0 left-0 right-0 h-[55vh] flex z-10">
        {/* Gradient Mask to fade stripes into the background at the top */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5F5] via-[#F5F5F5]/60 to-transparent z-10 pointer-events-none" />
        
        {repeatedStripes.map((colorClass, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1.5, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
            className={`flex-1 ${colorClass}`}
          />
        ))}
      </div>
    </div>
  );
}
