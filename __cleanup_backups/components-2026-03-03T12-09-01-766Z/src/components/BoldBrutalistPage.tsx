import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Star, Circle, Square } from 'lucide-react';

// --- Assets & Styles ---

const BrutalistFont = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Zilla+Slab:wght@400;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
    .font-block { font-family: 'Anton', sans-serif; }
    .font-slab { font-family: 'Zilla Slab', serif; }
    .font-mono-code { font-family: 'JetBrains Mono', monospace; }
    
    .marquee-container {
      overflow: hidden;
      white-space: nowrap;
    }
    .marquee-content {
      display: inline-block;
      animation: marquee 20s linear infinite;
    }
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    
    .sticker-shadow {
      box-shadow: 4px 4px 0px rgba(0,0,0,1);
    }
    .sticker-shadow-hover:hover {
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 0px rgba(0,0,0,1);
    }
  `}</style>
);

// --- Components ---

const Marquee = ({ text, bg = "bg-yellow-400", color = "text-black" }: { text: string, bg?: string, color?: string }) => (
  <div className={`${bg} ${color} py-3 border-y-4 border-black font-mono-code font-bold text-lg uppercase tracking-wider marquee-container`}>
    <div className="marquee-content">
      {Array(10).fill(text).map((t, i) => (
        <span key={i} className="mx-4">{t}</span>
      ))}
    </div>
  </div>
);

const Sticker = ({ children, className = "", rotate = 0 }: { children: React.ReactNode, className?: string, rotate?: number }) => (
  <motion.div 
    whileHover={{ scale: 1.05, rotate: rotate + 2 }}
    className={`border-4 border-black p-4 sticker-shadow bg-white ${className}`}
    style={{ rotate: rotate }}
  >
    {children}
  </motion.div>
);

const BigLetter = ({ letter }: { letter: string }) => (
  <div className="flex-1 bg-black text-white flex items-center justify-center aspect-[3/4] border-r-4 border-white last:border-r-0 overflow-hidden group">
    <span className="text-[20vw] font-block leading-none group-hover:scale-110 transition-transform duration-300 select-none">
      {letter}
    </span>
  </div>
);

// --- Main Page ---

export default function BoldBrutalistPage() {
  return (
    <div className="min-h-screen bg-white text-black font-slab selection:bg-black selection:text-yellow-400 overflow-x-hidden">
      <BrutalistFont />

      {/* Top Marquee */}
      <Marquee text="⚠️ APPLICATIONS OPEN FOR BATCH X26 • POS SPRINT • MAR 02-14 •" />

      {/* Hero Section */}
      <header className="p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between mb-12">
          <div className="flex gap-2">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white">
              <Star fill="white" />
            </div>
            <div className="w-12 h-12 bg-pink-500 rounded-full border-4 border-black" />
          </div>
          
          <div className="text-right font-mono-code text-sm md:text-base">
            <p>AI MINDSET®</p>
            <p>EST. 2026</p>
            <p>EARTH</p>
          </div>
        </div>

        {/* Massive Title */}
        <div className="flex border-4 border-black mb-12">
          <BigLetter letter="P" />
          <BigLetter letter="O" />
          <BigLetter letter="S" />
        </div>

        {/* Intro Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left: Description Card */}
          <div className="md:col-span-7">
            <div className="bg-[#00FF66] p-8 md:p-12 rounded-[2rem] border-4 border-black sticker-shadow relative">
              <div className="absolute -top-6 -right-6 bg-white border-4 border-black px-4 py-2 font-mono-code font-bold rotate-6 sticker-shadow">
                NEW BATCH!
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                POS is a <span className="bg-black text-white px-2">system</span> designed for humans who use machines.
              </h2>
              <p className="text-xl md:text-2xl font-medium leading-relaxed">
                There's something about the unapologetic nature of a well-designed workflow. The way the tools stem out just far enough, the way the automation isn't mincing any words.
              </p>
            </div>
          </div>

          {/* Right: Info Stack */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Sticker className="bg-yellow-400 flex justify-between items-center" rotate={-2}>
              <span className="font-mono-code font-bold text-xl">PRICE</span>
              <span className="font-block text-4xl">$999</span>
            </Sticker>
            
            <Sticker className="bg-pink-400 flex justify-between items-center" rotate={1}>
              <span className="font-mono-code font-bold text-xl">DATE</span>
              <span className="font-block text-4xl">MAR 02-14</span>
            </Sticker>

            <Sticker className="bg-blue-400 flex justify-between items-center" rotate={-1}>
              <span className="font-mono-code font-bold text-xl">STATUS</span>
              <span className="font-block text-4xl">OPEN</span>
            </Sticker>

            <button className="mt-auto bg-black text-white py-6 font-block text-3xl hover:bg-gray-900 transition-colors border-4 border-black sticker-shadow sticker-shadow-hover flex items-center justify-center gap-4 group">
              APPLY NOW <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={32} />
            </button>
          </div>
        </div>
      </header>

      {/* Content Section */}
      <section className="border-t-4 border-black">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: The Stack */}
          <div className="p-8 md:p-12 border-b-4 md:border-b-0 md:border-r-4 border-black bg-[#F0F0F0]">
            <h3 className="font-block text-6xl mb-12">THE STACK</h3>
            <ul className="space-y-6">
              {[
                { name: "CLAUDE CODE", icon: Square },
                { name: "OBSIDIAN", icon: Circle },
                { name: "CURSOR", icon: Star },
                { name: "YOU", icon: ArrowUpRight }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-12 h-12 border-4 border-black flex items-center justify-center bg-white group-hover:bg-black group-hover:text-white transition-colors">
                    <item.icon size={24} strokeWidth={3} />
                  </div>
                  <span className="font-slab font-bold text-3xl md:text-4xl group-hover:translate-x-2 transition-transform">
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Manifesto */}
          <div className="p-8 md:p-12 bg-white relative overflow-hidden">
             {/* Background decoration */}
             <div className="absolute top-0 right-0 text-[20rem] font-block text-gray-100 leading-none -z-10 select-none">
               AI
             </div>

             <h3 className="font-mono-code font-bold text-xl mb-8 bg-black text-white inline-block px-2">MANIFESTO</h3>
             
             <div className="space-y-8 text-xl md:text-2xl font-medium">
               <p>
                 We help shape the perception of business and transform brands into powerful assets.
               </p>
               <p>
                 We create verbal and visual narratives for business, that deepens engagements and cut through the noise to provide functional clarity and substance.
               </p>
               <div className="p-6 border-4 border-black border-dashed rounded-xl bg-yellow-50">
                 <p className="font-mono-code text-sm mb-2">NOTE:</p>
                 <p className="italic">
                   "Every business is a unique culture with a mix of personalities and individual ideas that has developed over time."
                 </p>
               </div>
             </div>
          </div>

        </div>
      </section>

      {/* Footer Marquee */}
      <Marquee text="DON'T BE A ROBOT • BUILD YOUR SYSTEM • OWN YOUR MINDSET •" bg="bg-black" color="text-white" />

    </div>
  );
}
