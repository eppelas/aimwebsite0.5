import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Globe } from 'lucide-react';

const CleanStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600&display=swap');

    .font-inter { font-family: 'Inter', sans-serif; }
    .font-space { font-family: 'Space Grotesk', sans-serif; }

    .noise-sphere {
      background: radial-gradient(circle at 30% 30%, #ffffff, #d1d1d1, #8a8a8a, #2a2a2a);
      filter: contrast(1.2) brightness(1.1);
      position: relative;
      overflow: hidden;
    }
    
    .noise-sphere::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E");
      mix-blend-mode: overlay;
      border-radius: 50%;
    }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    
    .pill-button {
      transition: all 0.3s ease;
    }
    .pill-button:hover {
      transform: scale(1.05);
    }
  `}</style>
);

const RotatingSphere = () => (
  <motion.div 
    className="w-[40vw] h-[40vw] rounded-full noise-sphere shadow-2xl"
    animate={{ 
      rotate: 360,
      backgroundPosition: ['0% 0%', '100% 100%']
    }}
    transition={{ 
      duration: 20, 
      ease: "linear", 
      repeat: Infinity 
    }}
  />
);

export default function AiMindsetCleanEditorialPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-[#F4F4F4] text-[#1A1A1A] selection:bg-[#1A1A1A] selection:text-white hide-scrollbar font-inter relative">
      <CleanStyles />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-8 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <span className="font-space font-medium text-lg tracking-tight">Ai Mindset</span>
           <span className="text-2xl">✍️</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
           <a href="#" className="hover:opacity-60 transition-opacity">Cases</a>
           <a href="#" className="hover:opacity-60 transition-opacity">Services</a>
           <a href="#" className="hover:opacity-60 transition-opacity">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-8 md:px-16 pt-24 pb-12 relative overflow-hidden">
        <div className="md:w-1/2 flex justify-center md:justify-start relative z-10">
           <RotatingSphere />
        </div>
        
        <div className="md:w-1/2 flex flex-col justify-center z-20 mt-12 md:mt-0 pl-0 md:pl-12">
           <h1 className="text-[5vw] md:text-[6vw] leading-[0.95] font-space font-semibold tracking-tight mb-12">
             The world is<br/>
             full of<br/>
             <span className="italic font-serif">expectations</span>
           </h1>
           
           <p className="text-lg md:text-xl leading-relaxed text-[#4A4A4A] max-w-md mb-12">
             We help your personal system create positive change. By sharpening your vision and actions and transforming them into concrete communication solutions.
           </p>
           
           <div className="flex items-center gap-4">
              <span className="font-medium">Scroll down to see our cases.</span>
           </div>
        </div>
      </section>

      {/* Typography Showcase Section */}
      <section className="min-h-screen bg-[#EAE8E4] py-24 px-8 md:px-16 relative">
         <div className="flex justify-between items-start mb-24">
            <div className="text-sm uppercase tracking-widest opacity-50">Typeface</div>
            <div className="text-sm uppercase tracking-widest opacity-50">Airbnb Cereal</div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="aspect-square border border-[#1A1A1A]/10 rounded-3xl flex items-center justify-center bg-white shadow-sm relative overflow-hidden group">
               <span className="text-[25vw] font-inter leading-none group-hover:scale-110 transition-transform duration-500">M</span>
               <span className="absolute top-8 right-8 text-xs font-mono">DLS</span>
            </div>
            
            <div className="flex flex-col gap-12">
               <div className="aspect-square border border-[#1A1A1A]/10 rounded-3xl flex items-center justify-center bg-white shadow-sm w-2/3">
                  <span className="text-[15vw] font-inter leading-none">A</span>
               </div>
               
               <div className="space-y-4">
                  <div className="flex items-baseline gap-8">
                     <span className="text-6xl font-inter">72px</span>
                     <span className="text-6xl font-inter font-light">Book</span>
                  </div>
                  <div className="flex items-baseline gap-8">
                     <span className="text-5xl font-inter">48px</span>
                     <span className="text-5xl font-inter font-medium">Medium</span>
                  </div>
                  <div className="flex items-baseline gap-8">
                     <span className="text-4xl font-inter">40px</span>
                     <span className="text-4xl font-inter font-light">Book</span>
                  </div>
                  <div className="flex items-baseline gap-8">
                     <span className="text-2xl font-inter">18px</span>
                     <span className="text-2xl font-inter font-light">Book</span>
                  </div>
               </div>
            </div>
         </div>
         
         <div className="mt-32">
            <h2 className="text-[8vw] leading-none font-space tracking-tighter">
               Doug Alves <span className="font-serif italic">→</span> Based in<br/>
               San Francisco/Bay Area
            </h2>
         </div>
      </section>

      {/* List Section */}
      <section className="py-24 px-8 md:px-16 bg-[#F9F9F9]">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-8">
               <h3 className="text-xl font-medium mb-8">Selected Work</h3>
               {['Adobe New Creatives', 'BeatsByDre SOC', 'DigitalArts UK', 'It\'s Nice That'].map((item) => (
                  <div key={item} className="group cursor-pointer">
                     <div className="text-2xl text-[#1A1A1A] group-hover:translate-x-2 transition-transform duration-300">{item}</div>
                     <div className="h-px w-full bg-[#1A1A1A]/10 mt-4 group-hover:bg-[#1A1A1A] transition-colors" />
                  </div>
               ))}
            </div>
            
            <div className="space-y-8 md:mt-16">
               {['Computer Arts', 'Dos Logos', 'Best Portfolios', 'Hairy Die'].map((item) => (
                  <div key={item} className="group cursor-pointer">
                     <div className="text-2xl text-[#1A1A1A] group-hover:translate-x-2 transition-transform duration-300">{item}</div>
                     <div className="h-px w-full bg-[#1A1A1A]/10 mt-4 group-hover:bg-[#1A1A1A] transition-colors" />
                  </div>
               ))}
            </div>

            <div className="space-y-8">
               <h3 className="text-xl font-medium mb-8">Awards</h3>
               {['Clio Awards - Gold', 'Lia Awards - Bronze', 'Cannes - Shortlist', 'Webdesign Magazine'].map((item) => (
                  <div key={item} className="group cursor-pointer">
                     <div className="text-2xl text-[#1A1A1A] group-hover:translate-x-2 transition-transform duration-300">{item}</div>
                     <div className="h-px w-full bg-[#1A1A1A]/10 mt-4 group-hover:bg-[#1A1A1A] transition-colors" />
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Footer Pill */}
      <div className="fixed bottom-8 right-8 z-50">
         <button className="bg-[#333] text-white px-6 py-3 rounded-full text-xs font-medium tracking-wide pill-button flex items-center gap-2 shadow-lg">
            Made with <span className="font-serif italic">Ai Mindset</span>
         </button>
      </div>

    </div>
  );
}
