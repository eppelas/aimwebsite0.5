import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

// --- Styles ---

const GimzStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600&display=swap');
    
    .font-archivo { font-family: 'Archivo Black', sans-serif; }
    .font-inter { font-family: 'Inter', sans-serif; }
    
    .stretch-text {
      transform: scaleX(1.1);
      display: inline-block;
    }

    .perspective-grid {
      perspective: 1000px;
      transform-style: preserve-3d;
    }

    .grid-plane {
      transform: rotateX(60deg) scale(2);
      transform-origin: 50% 0%;
    }
  `}</style>
);

// --- Components ---

const Header = () => (
  <header className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-start z-50 mix-blend-difference text-white font-inter text-xs md:text-sm font-medium tracking-wide">
    <div className="flex flex-col">
      <span className="font-archivo text-xl tracking-tighter">MINDSET</span>
      <span className="opacity-50">Design Unit</span>
    </div>
    
    <div className="flex flex-col items-end gap-1">
      <div className="flex gap-6">
        <a href="#" className="hover:text-gray-300 transition-colors">US</a>
        <a href="#" className="hover:text-gray-300 transition-colors">WORK</a>
        <a href="#" className="hover:text-gray-300 transition-colors">CULTURE</a>
        <a href="#" className="hover:text-gray-300 transition-colors">CONTACT</a>
      </div>
      <div className="flex gap-2 mt-2 opacity-50">
        <span>RU</span>
        <span className="text-white">EN</span>
      </div>
    </div>
  </header>
);

const ProjectRow = ({ id, title, description, color = "bg-blue-600" }: { id: string, title: string, description: string, color?: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative border-t border-white/20 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Image/Color Block */}
      <motion.div 
        className={`absolute inset-0 ${color} z-0 origin-left`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between py-12 md:py-24 px-4 md:px-8">
        <div className="flex items-baseline gap-8">
          <span className="font-mono text-sm md:text-base opacity-50 group-hover:text-white transition-colors">
            {id}
          </span>
          <h3 className="font-archivo text-4xl md:text-7xl uppercase tracking-tighter stretch-text group-hover:text-white transition-colors">
            {title}
          </h3>
        </div>
        
        <div className="flex items-center gap-8 mt-4 md:mt-0">
          <p className="font-inter text-sm md:text-base max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
            {description}
          </p>
          <ArrowRight className="w-8 h-8 md:w-12 md:h-12 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
};

const CheckerboardFooter = () => {
  return (
    <div className="h-[50vh] bg-black overflow-hidden relative perspective-grid flex items-end">
      <div className="absolute inset-0 grid-plane flex flex-wrap">
        {Array.from({ length: 100 }).map((_, i) => (
          <div 
            key={i} 
            className={`w-[10%] h-[20%] ${i % 2 === 0 ? 'bg-white' : 'bg-black'}`}
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full p-8 z-10 mix-blend-difference text-white">
        <h2 className="font-archivo text-[15vw] leading-[0.8] uppercase tracking-tighter">
          MINDSET
        </h2>
      </div>
    </div>
  );
};

// --- Main Page ---

export default function GimzStylePage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-inter selection:bg-white selection:text-black overflow-x-hidden">
      <GimzStyles />
      <Header />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-between pt-32 pb-12 px-4 md:px-8">
        {/* Massive Logo Construction */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 w-full max-w-[90vw] mx-auto">
            {/* M */}
            <div className="aspect-square border-[20px] md:border-[40px] border-white flex items-start justify-center relative overflow-hidden">
               <div className="w-[20px] md:w-[40px] h-1/2 bg-white absolute top-0"></div>
            </div>
            {/* I */}
            <div className="aspect-square bg-white flex items-center justify-center">
               <div className="w-1/2 h-full bg-[#0A0A0A]"></div>
            </div>
            {/* N */}
            <div className="aspect-square border-[20px] md:border-[40px] border-white relative">
               <div className="absolute top-0 left-0 w-full h-full bg-white transform -skew-x-12 origin-bottom-left scale-x-50"></div>
            </div>
            {/* D */}
            <div className="aspect-square border-[20px] md:border-[40px] border-white rounded-r-full"></div>
          </div>
        </div>

        <div className="mt-12 md:mt-24">
          <h1 className="font-archivo text-5xl md:text-8xl uppercase tracking-tighter leading-none">
            WE <br />
            BUILD <br />
            SYSTEMS
          </h1>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-24 md:py-48 px-4 md:px-8 border-t border-white/20">
        <div className="max-w-[90vw] mx-auto">
          <h2 className="font-archivo text-3xl md:text-6xl lg:text-7xl uppercase leading-tight tracking-tight text-center md:text-left">
            The desire to build <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>meaningful</span> and <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>industry-defining</span> AI agents is what we work for.
          </h2>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="md:col-start-2">
              <p className="text-lg md:text-xl opacity-70 leading-relaxed">
                Our team is result-oriented. That speaks for itself, but thinking in narrow-minded visions and similar solutions is not our option — that's what has been driving us for the past ten years.
              </p>
              <p className="text-lg md:text-xl opacity-70 leading-relaxed mt-8">
                Regardless of the project scope, we always strive to find the most effective solution to build a brand, communications and structures that will last for years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects List */}
      <section className="border-b border-white/20">
        <ProjectRow 
          id="01" 
          title="CONTEXT" 
          description="Understanding the unique diversity and tolerance of your digital ecosystem."
          color="bg-[#0044FF]"
        />
        <ProjectRow 
          id="02" 
          title="LOGIC" 
          description="A melting pot of culture and colours on the streets of your database."
          color="bg-[#FF4400]"
        />
        <ProjectRow 
          id="03" 
          title="FUTURE" 
          description="Advances in urban farming serve to remind us of our future sustainability."
          color="bg-[#00CC44]"
        />
        <ProjectRow 
          id="04" 
          title="SYSTEM" 
          description="We rethink and implement projects of any complexity."
          color="bg-[#FFCC00]"
        />
      </section>

      {/* Big Text Section */}
      <section className="py-24 md:py-48 px-4 md:px-8 bg-white text-black">
        <div className="max-w-[90vw] mx-auto">
          <h2 className="font-archivo text-4xl md:text-7xl uppercase leading-none tracking-tighter mb-8">
            We believe that <br />
            there are no <span className="bg-black text-white px-2">impossible</span> <br />
            tasks, only those that <br />
            have not been <br />
            implemented well <br />
            enough.
          </h2>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-12 px-4 md:px-8 border-t border-white/20 bg-[#0A0A0A] text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h3 className="font-archivo text-2xl uppercase mb-4">Comprehensive Solutions</h3>
            <p className="opacity-50 max-w-md">
              We never waste a second. Every pixel, every line of code, every interaction is calculated for maximum impact.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <div className="border-t border-white/20 pt-4 w-full md:w-64">
              <div className="flex justify-between mb-2">
                <span className="opacity-50">EMAIL</span>
                <a href="#" className="hover:text-white transition-colors">HELLO@MINDSET.AI</a>
              </div>
              <div className="flex justify-between">
                <span className="opacity-50">SOCIAL</span>
                <a href="#" className="hover:text-white transition-colors">@AIMINDSET</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CheckerboardFooter />
    </div>
  );
}
