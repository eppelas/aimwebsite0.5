import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

// --- Components ---

const Header = () => (
  <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50 mix-blend-difference text-[#F2F0E9]">
    <div className="text-sm font-bold tracking-widest uppercase">Poems</div>
    <div className="font-serif text-3xl tracking-tight">Afterimage</div>
    <div className="text-sm font-bold tracking-widest uppercase">Artist Statement</div>
  </header>
);

const IndexItem = ({ number, title, author }: { number: string; title: string; author: string }) => (
  <motion.div 
    className="group flex flex-col md:flex-row items-baseline md:items-center justify-between border-b border-black/10 py-12 md:py-24 cursor-pointer"
    whileHover={{ paddingLeft: '20px', paddingRight: '20px' }}
    transition={{ duration: 0.3, ease: "circOut" }}
  >
    <div className="flex items-baseline gap-8 md:gap-32 w-full">
      <span className="font-mono text-xs md:text-sm opacity-50">{number}</span>
      <h2 className="text-5xl md:text-[8vw] leading-[0.8] font-bold tracking-tighter uppercase group-hover:opacity-50 transition-opacity">
        {title}
      </h2>
    </div>
    <span className="font-mono text-xs md:text-sm uppercase tracking-widest mt-4 md:mt-0 opacity-50 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      {author}
    </span>
  </motion.div>
);

const Stanza = ({ text, delay }: { text: string; delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    className="text-2xl md:text-4xl font-mono leading-relaxed max-w-4xl mb-16 hover:text-blue-600 transition-colors cursor-crosshair"
  >
    {text}
  </motion.div>
);

const Pill = ({ color, rotation, top, left }: { color: string; rotation: number; top: string; left: string }) => (
  <motion.div 
    className={`absolute w-16 h-8 rounded-full border-2 border-black ${color} z-10`}
    style={{ top, left, rotate: rotation }}
    whileHover={{ scale: 1.2, rotate: rotation + 45 }}
    drag
    dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
  />
);

const GlowingStar = ({ color, top, left, delay }: { color: string; top: string; left: string; delay: number }) => (
  <motion.div
    className={`absolute w-1 h-1 md:w-2 md:h-2 rounded-full ${color} blur-[2px]`}
    style={{ top, left, boxShadow: `0 0 20px 10px ${color}` }}
    animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.5, 1] }}
    transition={{ duration: 3, repeat: Infinity, delay }}
  />
);

// --- Main Page ---

export default function AfterimagePage() {
  return (
    <div className="bg-[#F2F0E9] text-[#1A1A1A] font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      <Header />

      {/* Section 1: Index */}
      <section className="min-h-screen pt-32 px-4 md:px-12 pb-24 flex flex-col justify-center">
        <div className="w-full max-w-[90vw] mx-auto">
          <IndexItem number="01" title="Performance Art" author="M. Ford" />
          <IndexItem number="02" title="Rule of Thirds" author="M. Ford" />
          <IndexItem number="03" title="FPO" author="M. Ford" />
          <IndexItem number="04" title="Magic 8" author="B. Malover" />
        </div>
      </section>

      {/* Section 2: Performance Art (Interactive Text) */}
      <section className="min-h-screen bg-[#F2F0E9] px-4 md:px-12 py-32 relative overflow-hidden border-t border-black">
        <div className="flex justify-between items-center mb-24 font-mono text-xs uppercase tracking-widest opacity-50">
          <span>← 1/4 →</span>
          <span>Performance Art</span>
          <span>By Maura Ford</span>
        </div>

        <div className="text-center mb-12 font-mono text-xs uppercase tracking-[0.2em] opacity-40">
          Touch Each Stanza
        </div>

        <div className="max-w-6xl mx-auto relative min-h-[60vh]">
          {/* Decorative Pills */}
          <Pill color="bg-red-400" rotation={15} top="10%" left="80%" />
          <Pill color="bg-yellow-300" rotation={-10} top="20%" left="85%" />
          <Pill color="bg-blue-400" rotation={45} top="15%" left="90%" />
          
          <Pill color="bg-blue-500" rotation={-20} top="60%" left="10%" />
          <Pill color="bg-green-400" rotation={10} top="65%" left="15%" />

          <div className="space-y-32 md:pl-24">
            <Stanza 
              text="Sickening! How I exclaim I like something. Absolutely sickening!" 
              delay={0.1} 
            />
            <div className="flex justify-end pr-12 md:pr-32">
              <Stanza 
                text="TV says talk to your doctor and ask for some amaaaaazing vibes" 
                delay={0.2} 
              />
            </div>
            <Stanza 
              text="Luckily, we all say the word crazy with more nuance now" 
              delay={0.3} 
            />
            <div className="text-center mt-32">
              <Stanza 
                text="Sun/moon/rising are my chosen deities. They tell me to manifest meeting new lovers" 
                delay={0.4} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Rule of Thirds (Split Layout) */}
      <section className="min-h-screen flex flex-col md:flex-row border-t border-black">
        {/* Left: Cream */}
        <div className="w-full md:w-1/3 bg-[#F2F0E9] p-8 md:p-12 border-r border-black">
          <div className="font-mono text-xs uppercase tracking-widest mb-12">ID</div>
          <div className="space-y-8 text-xl md:text-2xl font-medium leading-tight">
            <p>succumbing</p>
            <p>is self care</p>
            <p>world-worn,</p>
            <p>everyone's a sub now</p>
            <p>easier to let things just happen</p>
            <p>my skin smells perfect after</p>
            <p>two days unwashed</p>
          </div>
        </div>

        {/* Middle: Blue */}
        <div className="w-full md:w-1/3 bg-[#3B95FF] p-8 md:p-12 border-r border-black text-black">
          <div className="font-mono text-xs uppercase tracking-widest mb-12 opacity-60">EGO</div>
          <div className="space-y-8 text-xl md:text-2xl font-medium leading-tight">
            <p>Weary mediator</p>
            <p>Wistful for essentialism</p>
            <p>Straddling</p>
            <p>the chasm</p>
            <p>of dirty innateness</p>
            <p>and a pompous high horse,</p>
            <p>It's all so embarrassing —</p>
          </div>
        </div>

        {/* Right: Cream */}
        <div className="w-full md:w-1/3 bg-[#F2F0E9] p-8 md:p-12">
          <div className="font-mono text-xs uppercase tracking-widest mb-12 opacity-60">SUPEREGO</div>
          <div className="space-y-8 text-xl md:text-2xl font-medium leading-tight">
            <p>I pretend like I don't want to...</p>
            <p>And the withholding tastes</p>
            <p>like an overripe banana.</p>
            <p>Are you tempted at <i>all</i>?</p>
            <p>Ruled by the seminal classic,</p>
            <p>daddy issues, laced tight</p>
            <p>with lingering catholicism.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Magic 8 (Dark Mode) */}
      <section className="min-h-screen bg-black text-white px-4 md:px-12 py-32 relative overflow-hidden">
        <div className="flex justify-between items-center mb-24 font-mono text-xs uppercase tracking-widest opacity-50 z-20 relative">
          <span>← 4/4 →</span>
          <span>Magic 8</span>
          <span>By Bekah Malover</span>
        </div>

        {/* Glowing Oval */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] rounded-[50%] border border-white/20 shadow-[0_0_100px_rgba(255,255,255,0.1)] z-10" />

        {/* Stars */}
        <GlowingStar color="#3B82F6" top="20%" left="20%" delay={0} />
        <GlowingStar color="#EF4444" top="30%" left="35%" delay={1} />
        <GlowingStar color="#EAB308" top="25%" left="80%" delay={2} />
        <GlowingStar color="#22C55E" top="80%" left="70%" delay={0.5} />
        <GlowingStar color="#A855F7" top="70%" left="15%" delay={1.5} />
        <GlowingStar color="#F97316" top="85%" left="85%" delay={2.5} />

        <div className="relative z-20 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-9xl font-serif italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20"
          >
            Ask Again Later
          </motion.h2>
          <p className="mt-8 font-mono text-sm uppercase tracking-widest opacity-50">
            Concentrate and ask again
          </p>
        </div>
      </section>

      <footer className="bg-[#F2F0E9] py-12 text-center border-t border-black">
        <a href="#" className="inline-block px-8 py-3 bg-[#1A1A1A] text-[#F2F0E9] rounded-full font-mono text-xs uppercase tracking-widest hover:scale-105 transition-transform">
          Add to Collection
        </a>
      </footer>

    </div>
  );
}
