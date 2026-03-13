import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';

// --- Components ---

const ColorBar = () => (
  <div className="fixed left-0 top-0 bottom-0 w-12 md:w-16 flex flex-col z-50">
    <div className="flex-1 bg-[#1A0B2E]" /> {/* Dark Purple */}
    <div className="flex-1 bg-[#FF4D00]" /> {/* Orange */}
    <div className="flex-1 bg-[#FF99CC]" /> {/* Pink */}
    <div className="h-12 md:h-16 flex flex-col justify-end pb-2 items-center text-[10px] font-mono bg-[#FF99CC]">
      <div>04</div>
      <div>03</div>
      <div>02</div>
      <div>01</div>
    </div>
  </div>
);

const FloatingBadge = ({ text, color = "bg-black", textColor = "text-white" }: { text: string; color?: string; textColor?: string }) => (
  <motion.div 
    whileHover={{ scale: 1.1, rotate: 5 }}
    className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${color} ${textColor} flex items-center justify-center text-xs font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer`}
  >
    {text}
  </motion.div>
);

const StatCircle = ({ value, label, size = "large", color = "bg-[#CCFF00]" }: { value: string; label: string; size?: "small" | "medium" | "large"; color?: string }) => {
  const sizeClasses = {
    small: "w-32 h-32 text-2xl",
    medium: "w-48 h-48 text-4xl",
    large: "w-64 h-64 md:w-80 md:h-80 text-6xl md:text-8xl"
  };

  return (
    <motion.div 
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      className={`${sizeClasses[size]} rounded-full ${color} flex flex-col items-center justify-center text-center p-4 relative group`}
    >
      <div className="font-medium tracking-tighter text-[#004d00] group-hover:scale-110 transition-transform duration-300">{value}</div>
      <div className="text-sm md:text-base font-medium mt-2 text-black/70">{label}</div>
    </motion.div>
  );
};

const DataBar = ({ label, value, width }: { label: string; value: string; width: string }) => (
  <div className="flex items-center border-t border-black py-4 md:py-6 group hover:bg-white/10 transition-colors">
    <div className="w-full relative h-16 md:h-24 bg-[#FF4D00] overflow-hidden flex items-center">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-0 left-0 h-full bg-[#CCFF00]" 
      />
      <div className="relative z-10 flex justify-between w-full px-4 md:px-8 items-center">
        <span className="text-black font-medium text-sm md:text-lg w-1/3">{label}</span>
        <span className="text-black text-4xl md:text-6xl font-light tracking-tighter">{value}</span>
      </div>
    </div>
  </div>
);

// --- Main Page ---

export default function BoldDataPage() {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="min-h-screen bg-[#F0F0F0] text-black font-sans selection:bg-[#FF4D00] selection:text-white pl-12 md:pl-16 overflow-x-hidden">
      <ColorBar />

      {/* Header */}
      <header className="fixed top-0 left-12 md:left-16 right-0 p-6 md:p-8 flex justify-between items-start z-40 mix-blend-difference text-white md:text-black md:mix-blend-normal pointer-events-none">
        <div className="text-2xl font-bold tracking-tight pointer-events-auto">AI Mindset</div>
        <div className="flex gap-8 text-lg font-medium pointer-events-auto">
          <a href="#" className="hover:underline">Contact us</a>
          <a href="#" className="hover:underline">About</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-4 md:px-12 pt-32 pb-12 relative">
        <div className="absolute top-32 left-8 md:left-16 flex gap-4 z-10">
          <FloatingBadge text="POS" color="bg-white" textColor="text-black" />
          <FloatingBadge text="W26" color="bg-[#FF99CC]" textColor="text-black" />
          <FloatingBadge text="AI" color="bg-[#A4D4E3]" textColor="text-black" /> {/* Light Blue */}
          <FloatingBadge text="M" color="bg-black" textColor="text-[#FF4D00]" />
        </div>

        <div className="mt-32 md:mt-0">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[12vw] leading-[0.85] font-medium tracking-tight text-right"
          >
            STATE OF<br/>
            ARTIFICIAL<br/>
            INTELLIGENCE
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[12vw] leading-[0.85] font-medium tracking-tight text-right mt-4 md:mt-0"
          >
            POS {`{SPRINT}`}
          </motion.div>
        </div>
      </section>

      {/* Intro Text */}
      <section className="px-4 md:px-12 py-24 md:py-32 bg-[#F0F0F0]">
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-medium leading-tight mb-12">
            When it comes to AI, there's no shortage of hype these days — or existential <span className="border-b-4 border-black">open letters.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg md:text-xl leading-relaxed">
            <p>
              The promise of artificial intelligence is nothing new. In fact, the <a href="#" className="border-b border-black hover:bg-[#CCFF00]">neural networks</a> that machine learning programs run on were pioneered decades ago.
            </p>
            <p>
              But recent advances in computing and the rise of big data have catapulted <a href="#" className="border-b border-black hover:bg-[#CCFF00]">AI software development</a> forward.
            </p>
          </div>
        </div>
      </section>

      {/* Pink Section - Stats */}
      <section className="bg-[#FF99CC] px-4 md:px-12 py-24 md:py-32 text-[#1A0B2E] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <h3 className="text-2xl font-medium mb-8">AI deals and dollars, yearly</h3>
              <p className="text-xl leading-relaxed max-w-md">
                Artificial Intelligence companies experienced a peak in total funding during mid-2021, reaching a high of $26.7B.
              </p>
            </div>
            <div className="bg-[#1A0B2E] text-white p-8 md:p-12">
              <div className="text-sm opacity-70 mb-2">2026 Projection</div>
              <div className="text-6xl md:text-8xl font-light mb-4">$48.8B</div>
              <div className="h-2 bg-white/20 w-full rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "80%" }}
                  className="h-full bg-[#CCFF00]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <StatCircle value="65%" label="North America" size="large" />
            <StatCircle value="23%" label="Europe" size="medium" color="bg-[#1A0B2E] text-white" />
            <StatCircle value="12%" label="Asia" size="small" color="bg-white border border-black" />
          </div>
        </div>
      </section>

      {/* Orange Section - Data Bars */}
      <section className="bg-[#FF4D00] px-4 md:px-12 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-6xl md:text-8xl font-medium tracking-tight mb-4">02. Use Cases</h2>
            <h3 className="text-4xl md:text-6xl font-medium tracking-tight opacity-70">and subdomains</h3>
          </div>

          <div className="space-y-0">
            <div className="text-right mb-4 font-mono text-sm uppercase">Average rounds by industry, 2024-2026</div>
            <DataBar label="Transportation" value="$28.9M" width="90%" />
            <DataBar label="Science & Engineering" value="$16.1M" width="60%" />
            <DataBar label="Cybersecurity" value="$15.8M" width="55%" />
            <DataBar label="Sales & Marketing" value="$14.3M" width="50%" />
            <DataBar label="Healthcare" value="$12.6M" width="45%" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A0B2E] text-white px-4 md:px-12 py-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start">
          <div>
            <h2 className="text-4xl md:text-6xl font-medium mb-8">Ready to join?</h2>
            <button className="bg-[#CCFF00] text-black px-8 py-4 text-xl font-bold rounded-full hover:scale-105 transition-transform">
              Apply for Sprint W26
            </button>
          </div>
          <div className="mt-12 md:mt-0 text-right font-mono text-sm opacity-50">
            <div>AI Mindset Lab</div>
            <div>Based in Cloud</div>
            <div>© 2026</div>
          </div>
        </div>
      </footer>

    </div>
  );
}
