import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const SwissLinesStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

    .font-inter { font-family: 'Inter', sans-serif; }

    .fanning-lines-container {
      position: relative;
      width: 100%;
      height: 600px;
      overflow: hidden;
    }

    .hover-underline {
      position: relative;
      display: inline-block;
      cursor: pointer;
    }
    .hover-underline::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      bottom: 0;
      left: 0;
      background-color: black;
      transform: scaleX(1);
      transform-origin: bottom left;
      transition: transform 0.3s ease;
    }
    .hover-underline:hover::after {
      transform: scaleX(0);
      transform-origin: bottom right;
    }

    .text-underline {
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: 4px;
    }
  `}</style>
);

const FanningLines = () => {
  // Config for the fanning effect
  const count = 8;
  const startY = 50; // Starting Y position on the left
  const endY = 50;   // Starting Y position on the right
  const gapLeft = 25; // Gap between lines on the left
  const gapRight = 80; // Gap between lines on the right

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
      <svg className="w-full h-full" preserveAspectRatio="none">
        {Array.from({ length: count }).map((_, i) => (
          <g key={i}>
            <line
              x1="0%"
              y1={startY + i * gapLeft}
              x2="100%"
              y2={endY + i * gapRight}
              stroke="black"
              strokeWidth="0.5"
            />
            <text x="0.5%" y={startY + i * gapLeft - 5} fontSize="10" fontFamily="Inter">
              {i + 1}
            </text>
            <text x="99.5%" y={endY + i * gapRight - 5} fontSize="10" fontFamily="Inter" textAnchor="end">
              {i + 1}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default function AiMindsetSwissLinesPage() {
  return (
    <div className="min-h-screen bg-white text-black font-inter selection:bg-black selection:text-white overflow-x-hidden">
      <SwissLinesStyles />

      {/* Header / Contact */}
      <header className="px-4 py-6 md:px-8 md:py-8 flex justify-end text-lg md:text-xl leading-tight">
        <div className="text-right space-y-1">
          <a href="#" className="block hover:opacity-50 transition-opacity">Telegram</a>
          <a href="#" className="block hover:opacity-50 transition-opacity">Podcast</a>
          <a href="#" className="block hover:opacity-50 transition-opacity">Email</a>
        </div>
      </header>

      {/* Hero Title */}
      <section className="px-4 md:px-8 pt-12 pb-24">
        <h1 className="text-[18vw] leading-[0.8] tracking-tighter font-medium">
          AI Mindset
        </h1>
      </section>

      {/* Fanning Lines Section (Tracks) */}
      <section className="relative w-full py-12">
         {/* The Lines Background */}
         <div className="w-full h-[700px] relative">
            <FanningLines />
            
            {/* Content positioned relative to the lines (approximate) */}
            <div className="absolute top-[60px] left-[5%] md:left-[20%] w-[90%] md:w-[60%]">
               <div className="flex justify-between items-baseline">
                  <span className="text-sm font-mono">WEEK 01</span>
                  <h3 className="text-3xl md:text-5xl font-medium">Prompt Engineering</h3>
               </div>
               <p className="mt-2 text-gray-600 max-w-md ml-auto text-right">Chain-of-Thought, Few-Shot Learning, Custom GPTs.</p>
            </div>

            <div className="absolute top-[150px] left-[10%] md:left-[25%] w-[85%] md:w-[60%]">
               <div className="flex justify-between items-baseline">
                  <span className="text-sm font-mono">WEEK 02</span>
                  <h3 className="text-3xl md:text-5xl font-medium">Context Engineering</h3>
               </div>
               <p className="mt-2 text-gray-600 max-w-md ml-auto text-right">Obsidian + MCP + Claude. Automation and agents.</p>
            </div>

            <div className="absolute top-[250px] left-[5%] md:left-[20%] w-[90%] md:w-[60%]">
               <div className="flex justify-between items-baseline">
                  <span className="text-sm font-mono">WEEK 03</span>
                  <h3 className="text-3xl md:text-5xl font-medium">Mind Engineering</h3>
               </div>
               <p className="mt-2 text-gray-600 max-w-md ml-auto text-right">Productivity and rituals. AI for coaching and reflection.</p>
            </div>

            <div className="absolute top-[380px] left-[10%] md:left-[25%] w-[85%] md:w-[60%]">
               <div className="flex justify-between items-baseline">
                  <span className="text-sm font-mono">WEEK 04</span>
                  <h3 className="text-3xl md:text-5xl font-medium">Life Engineering</h3>
               </div>
               <p className="mt-2 text-gray-600 max-w-md ml-auto text-right">From idea to prototype. Vibe-coding with Cursor.</p>
            </div>
         </div>
      </section>

      {/* Philosophy Text */}
      <section className="px-4 md:px-8 py-24 max-w-6xl mx-auto">
        <p className="text-4xl md:text-6xl leading-tight font-normal">
          <span className="text-underline">Mindset is more important than tools</span>. Technologies change, but a new way of thinking stays with you. 
          We create a space where <span className="text-underline">practice is built into the process</span> — every week is an experiment with real tasks and artifacts.
        </p>
      </section>

      {/* Details Grid */}
      <section className="px-4 md:px-8 py-24 border-t border-black">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
               <h3 className="text-xl mb-8 font-medium">The Lab</h3>
               <p className="text-xl leading-relaxed">
                  Not a course, but a laboratory with a clear trajectory: in one month, you assemble a working <span className="text-underline">intelligence amplification system</span>. From scattered requests to a unified context, from context to thinking, from thinking to real projects.
               </p>
            </div>
            <div>
               <h3 className="text-xl mb-8 font-medium">Advanced Tracks</h3>
               <ul className="space-y-4 text-xl">
                  <li className="flex justify-between border-b border-black/20 pb-2">
                     <span>AI Coaching</span>
                     <span>Anna Lozitskaya</span>
                  </li>
                  <li className="flex justify-between border-b border-black/20 pb-2">
                     <span>AI Agents</span>
                     <span>Sergey Khabarov</span>
                  </li>
                  <li className="flex justify-between border-b border-black/20 pb-2">
                     <span>Vibe-Coding</span>
                     <span>Seryozha Ris</span>
                  </li>
                  <li className="flex justify-between border-b border-black/20 pb-2">
                     <span>AI Creative</span>
                     <span>Anka Stavenski</span>
                  </li>
               </ul>
            </div>
         </div>
      </section>

      {/* Footer / CTA */}
      <section className="px-4 md:px-8 py-32 bg-black text-white mt-12">
         <div className="flex flex-col md:flex-row justify-between items-end">
            <div>
               <p className="text-sm font-mono mb-4">BATCH: WINTER 26</p>
               <h2 className="text-[10vw] leading-none font-medium tracking-tighter">
                  APPLY NOW
               </h2>
            </div>
            <div className="mt-8 md:mt-0 flex gap-8">
               <a href="#" className="text-lg hover:underline">Waitlist</a>
               <a href="#" className="text-lg hover:underline">Contact</a>
            </div>
         </div>
      </section>

    </div>
  );
}
