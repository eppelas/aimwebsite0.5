import React from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowRight, Circle, Star } from 'lucide-react';

// --- Assets & Styles ---

const PlayfulFont = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,900;1,9..144,400&family=Space+Grotesk:wght@400;500;700&display=swap');
    .font-soft-serif { font-family: 'Fraunces', serif; }
    .font-grotesk { font-family: 'Space Grotesk', sans-serif; }
    
    .brush-stroke {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      animation: draw 2s ease-out forwards;
    }

    @keyframes draw {
      to {
        stroke-dashoffset: 0;
      }
    }
  `}</style>
);

// --- Components ---

const BrushBrain = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full max-w-[500px] mx-auto overflow-visible">
    <motion.path
      d="M40,100 C40,60 70,30 100,30 C130,30 160,60 160,100 C160,140 130,170 100,170 C70,170 40,140 40,100 Z"
      fill="none"
      stroke="black"
      strokeWidth="12"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
    {/* Left Lobe */}
    <motion.path
      d="M50,90 C40,70 50,50 70,50 C90,50 95,80 95,100"
      fill="none"
      stroke="black"
      strokeWidth="8"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 0.3 }}
    />
    {/* Right Lobe */}
    <motion.path
      d="M150,90 C160,70 150,50 130,50 C110,50 105,80 105,100"
      fill="none"
      stroke="black"
      strokeWidth="8"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    />
    {/* Squiggle details */}
    <motion.path
      d="M60,120 Q80,140 100,120 T140,120"
      fill="none"
      stroke="black"
      strokeWidth="6"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.8 }}
    />
  </svg>
);

const TicketCard = () => (
  <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border-4 border-black relative overflow-hidden">
    {/* Cutout circles */}
    <div className="absolute top-1/2 -left-6 w-12 h-12 bg-[#F29F9F] rounded-full border-r-4 border-black" />
    <div className="absolute top-1/2 -right-6 w-12 h-12 bg-[#F29F9F] rounded-full border-l-4 border-black" />
    
    <div className="flex flex-col h-full justify-between">
      <div>
        <h3 className="font-grotesk text-3xl md:text-5xl font-bold uppercase mb-2">POS Sprint</h3>
        <p className="font-soft-serif text-xl text-gray-500">Batch X26 • Mar 02-14</p>
      </div>

      <div className="my-12 border-t-4 border-black border-dashed opacity-20" />

      <div className="flex justify-between items-end">
        <div>
          <p className="font-grotesk text-sm uppercase tracking-wider mb-1">Entry Price</p>
          <div className="font-soft-serif text-6xl md:text-7xl font-black">$999</div>
        </div>
        <div className="text-right space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-black" />
            <span className="font-grotesk font-medium">Remote</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-black bg-black" />
            <span className="font-grotesk font-medium">Intensive</span>
          </div>
        </div>
      </div>
      
      <button className="mt-8 w-full py-4 bg-black text-white font-grotesk text-xl font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-transform">
        Secure Your Spot
      </button>
    </div>
  </div>
);

// --- Main Page ---

export default function BoldPlayfulPage() {
  return (
    <div className="min-h-screen font-soft-serif selection:bg-black selection:text-[#F2E880]">
      <PlayfulFont />

      {/* Section 1: Yellow Hero */}
      <section className="bg-[#F2E880] min-h-screen p-6 md:p-12 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center mb-12 md:mb-24">
          <div className="font-grotesk font-bold text-xl tracking-tight">AI Mindset®</div>
          <div className="w-12 h-12 bg-white rounded-full border-2 border-black flex items-center justify-center hover:rotate-90 transition-transform cursor-pointer">
            <Plus size={24} />
          </div>
        </header>

        {/* Hero Content */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <h1 className="text-[15vw] md:text-[10vw] leading-[0.85] font-black tracking-tighter mb-8">
              FEED<br/>
              YOUR<br/>
              <span className="italic font-light">MIND</span>
            </h1>
            <p className="font-grotesk text-xl md:text-2xl max-w-md leading-relaxed">
              Your current workflow is starving. We can't visit the future yet, but we can build the system to get you there.
            </p>
          </div>
          
          <div className="relative flex items-center justify-center">
             <BrushBrain />
             {/* Decorative elements */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute top-0 right-0 text-black/10"
             >
               <Star size={120} fill="currentColor" />
             </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Pink Ticket */}
      <section className="bg-[#F29F9F] min-h-screen p-6 md:p-12 flex items-center justify-center relative">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          
          {/* Left: Illustration/Text */}
          <div className="order-2 md:order-1">
             <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
               Don't be a<br/>
               <span className="font-serif italic font-light">robot.</span>
             </h2>
             <p className="font-grotesk text-2xl leading-relaxed mb-12">
               POS is a system designed for humans who use machines. It preserves your agency while reproducing your output at scale.
             </p>
             <div className="flex gap-4">
                <div className="px-6 py-3 border-2 border-black rounded-full font-grotesk font-bold uppercase bg-white hover:bg-black hover:text-white transition-colors cursor-pointer">
                  Context
                </div>
                <div className="px-6 py-3 border-2 border-black rounded-full font-grotesk font-bold uppercase bg-transparent hover:bg-black hover:text-white transition-colors cursor-pointer">
                  System
                </div>
             </div>
          </div>

          {/* Right: Ticket */}
          <div className="order-1 md:order-2">
            <motion.div
              initial={{ rotate: 5, y: 50, opacity: 0 }}
              whileInView={{ rotate: -3, y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <TicketCard />
            </motion.div>
          </div>

        </div>
      </section>

      {/* Section 3: Typography List */}
      <section className="bg-white min-h-screen p-6 md:p-12 flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="font-grotesk text-sm uppercase tracking-widest mb-12 text-gray-400">The Stack</h2>
          
          <div className="space-y-4">
            {[
              { num: "01", name: "Claude Code", desc: "The Engine" },
              { num: "02", name: "Obsidian", desc: "The Memory" },
              { num: "03", name: "Cursor", desc: "The Hands" },
              { num: "04", name: "You", desc: "The Soul" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-baseline border-b-2 border-black/10 py-8 hover:border-black hover:pl-8 transition-all duration-300 cursor-pointer"
              >
                <span className="font-grotesk text-xl md:text-2xl mr-8 md:mr-16 opacity-50">{item.num}</span>
                <span className="font-soft-serif text-5xl md:text-8xl font-black group-hover:text-[#F29F9F] transition-colors">{item.name}</span>
                <span className="ml-auto font-grotesk text-lg md:text-xl opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">{item.desc}</span>
                <ArrowRight className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
