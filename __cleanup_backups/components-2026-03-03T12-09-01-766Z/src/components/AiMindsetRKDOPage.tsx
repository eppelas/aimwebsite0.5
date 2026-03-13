import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Hexagon } from 'lucide-react';

const RkdoStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@1,400;1,600&display=swap');

    .font-inter { font-family: 'Inter', sans-serif; }
    .font-playfair { font-family: 'Playfair Display', serif; }

    .rkdo-big-text {
      font-size: clamp(120px, 28vw, 400px);
      line-height: 0.75;
      letter-spacing: -0.04em;
    }

    .rkdo-script {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-weight: 400;
    }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    .pink-overlay {
      background: linear-gradient(to bottom, rgba(255, 192, 203, 0.2), rgba(255, 192, 203, 0.4));
      mix-blend-mode: multiply;
    }
  `}</style>
);

export default function AiMindsetRKDOPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-white text-black selection:bg-black selection:text-white hide-scrollbar font-inter relative">
      <RkdoStyles />

      {/* Header */}
      <header className="px-6 py-6 md:px-12 md:py-10 border-b-0 border-black flex flex-wrap items-baseline gap-4 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
        <h1 className="text-4xl md:text-6xl font-normal tracking-tight flex items-baseline gap-2">
          AIMS Work 
          <span className="rkdo-script text-4xl md:text-6xl ml-2">(Sprint—X26)</span>
        </h1>
        <Hexagon className="w-8 h-8 md:w-12 md:h-12 fill-black" />
      </header>

      {/* Hero Big Text */}
      <section className="px-6 md:px-12 pt-12 pb-24 border-b border-black/10">
        <div className="w-full overflow-hidden">
          <motion.h1 
            className="rkdo-big-text font-medium"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            AIMS
          </motion.h1>
        </div>
      </section>

      {/* Intro Grid */}
      <section className="px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-24">
          <div className="text-2xl md:text-4xl leading-tight font-normal tracking-tight">
            AI Mindset is the art and design practice of strategist, educator, and builder Alexander Povalyaev.
          </div>
          <div className="text-2xl md:text-4xl leading-tight font-normal tracking-tight">
            Specializes in creative direction, system architecture and agent design for fashion, music, and business.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm font-medium leading-relaxed border-t border-black pt-8">
          <div className="space-y-4">
            <p className="underline decoration-1 underline-offset-4">Creative Director of AI Mindset</p>
            <p>
              We have led projects for clients such as Yandex, Sber, and independent founders, creating systems that scale courage and reduce chaos.
            </p>
          </div>
          <div className="space-y-4">
            <p>
              AIMS is an occasional guest speaker at Tech Week, Design Weekend, and private communities.
            </p>
          </div>
          <div className="space-y-4">
            <p>
              Since 2023, AIMS has performed and released sprints through the "POS" framework, "Context" methodology, and "Agent" architecture.
            </p>
          </div>
          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <p className="uppercase tracking-widest text-xs mb-2">Work Inquiries:</p>
              <a href="mailto:hello@aimindset.org" className="hover:underline">hello@aimindset.org</a>
            </div>
            <div className="flex items-center gap-2 mt-8">
              <Globe className="w-6 h-6 stroke-1" />
              <div className="border border-black rounded-full px-2 py-0.5 text-xs font-bold">TM</div>
              <span className="font-bold tracking-widest">AIMS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quote / Visual Section */}
      <section className="relative w-full bg-[#FFE4E6] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full min-h-[100vh]">
          
          {/* Left: Typography */}
          <div className="p-12 md:p-24 flex flex-col justify-center relative z-10">
            <motion.div 
              className="text-center md:text-left space-y-8"
              style={{ y }}
            >
              <div className="text-xl md:text-2xl tracking-[0.5em] uppercase font-bold text-center mb-12">
                L I F E
              </div>
              
              <div className="text-5xl md:text-8xl font-bold tracking-widest text-center space-y-4">
                <div>S H R I N K S</div>
                <div className="text-2xl md:text-4xl py-4 font-normal">OR</div>
                <div>E X P A N D S</div>
              </div>

              <div className="text-xl md:text-2xl tracking-[0.3em] uppercase font-bold text-center mt-12">
                I N
              </div>

              <div className="text-4xl md:text-7xl font-bold tracking-widest text-center mt-8">
                P R O P O R T I O N
              </div>

              <div className="text-xl md:text-2xl tracking-[0.3em] uppercase font-bold text-center mt-12">
                T O
              </div>

              <div className="text-4xl md:text-7xl font-bold tracking-widest text-center mt-8">
                O N E ' S
              </div>

              <div className="text-5xl md:text-8xl font-bold tracking-widest text-center mt-12">
                C O U R A G E
              </div>

              <div className="text-right mt-16 font-playfair italic text-xl md:text-2xl">
                — Anaïs Nin
              </div>
            </motion.div>
          </div>

          {/* Right: Image/Texture */}
          <div className="relative h-[50vh] md:h-auto bg-black overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" 
              alt="Portrait" 
              className="w-full h-full object-cover opacity-80 grayscale mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-pink-500/30 mix-blend-multiply"></div>
            
            {/* Overlay Text on Image */}
            <div className="absolute inset-0 flex flex-col justify-between p-12 text-white mix-blend-difference">
               <div className="flex justify-between items-start">
                  <span className="text-xs tracking-[0.5em] uppercase">Yola Mezcal</span>
                  <span className="text-xs tracking-[0.5em] uppercase">Preserves</span>
               </div>
               <div className="text-center">
                  <h3 className="text-4xl font-playfair italic mb-4">The Tradition</h3>
                  <p className="text-xs tracking-[0.3em] uppercase">Of Making Mezcal</p>
               </div>
               <div className="text-center">
                  <p className="text-xs tracking-[0.3em] uppercase mb-2">While</p>
                  <p className="text-xl font-bold tracking-widest">EMPOWERING</p>
                  <p className="text-4xl font-bold tracking-widest mt-2">WOMEN</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Grid */}
      <section className="bg-[#EAEAEA] px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black border border-black">
           {/* Cell 1 */}
           <div className="bg-[#EAEAEA] p-12 flex flex-col items-center text-center gap-6">
              <div className="font-mono text-xs tracking-[0.3em] uppercase">March Fifteenth</div>
              <div className="font-mono text-xs tracking-[0.3em] uppercase">Two Thousand</div>
              <div className="font-mono text-xs tracking-[0.3em] uppercase">Twenty Six</div>
              <div className="text-6xl md:text-8xl font-bold text-black/10 mt-8">ACLU</div>
           </div>

           {/* Cell 2 */}
           <div className="bg-[#EAEAEA] p-12 flex flex-col items-center text-center justify-center gap-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-pink-200/50 mix-blend-multiply"></div>
              <div className="relative z-10">
                 <div className="text-4xl font-bold mb-2">78 CENTS</div>
                 <p className="text-[10px] uppercase tracking-wider max-w-[200px] mx-auto leading-relaxed">
                    Women still make just 78 cents for every dollar earned by men.
                 </p>
              </div>
              <div className="relative z-10 mt-12">
                 <div className="text-4xl font-bold mb-2">1 IN 4</div>
                 <p className="text-[10px] uppercase tracking-wider max-w-[200px] mx-auto leading-relaxed">
                    The U.S. Department of Justice reports that approximately one in four homeless women is homeless because of violence.
                 </p>
              </div>
           </div>

           {/* Cell 3 */}
           <div className="bg-[#EAEAEA] p-12 flex flex-col items-center text-center justify-center">
              <div className="w-full h-full flex flex-col justify-between">
                 <div className="text-xs tracking-[0.5em] uppercase">Viva La Resistencia</div>
                 <div className="text-4xl font-playfair italic my-12">Welcome to</div>
                 <div className="text-6xl font-bold tracking-tighter">AIMS</div>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
}
