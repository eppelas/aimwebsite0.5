import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const TapeStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;600&display=swap');
    
    .font-anton { font-family: 'Anton', sans-serif; }
    .font-inter { font-family: 'Inter', sans-serif; }
    
    .tape-strip {
      background-color: #FFD700;
      opacity: 0.9;
      position: absolute;
      z-index: -1;
    }

    .tape-highlight {
      position: relative;
      display: inline-block;
      color: black;
      padding: 0 10px;
    }
    
    .tape-highlight::before {
      content: '';
      position: absolute;
      top: 10%;
      left: -5px;
      right: -5px;
      bottom: 10%;
      background-color: #FFD700;
      z-index: -1;
      transform: rotate(-1deg);
    }

    .tape-cross {
      position: relative;
      width: 300px;
      height: 300px;
    }

    .tape-line {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 40px;
      background-color: #FFD700;
      opacity: 0.8;
    }
  `}</style>
);

const TapeHighlight = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`relative inline-block px-2 mx-1 text-black ${className}`}>
    <span className="absolute inset-0 bg-[#FFD700] -rotate-1 scale-110 z-0" />
    <span className="relative z-10">{children}</span>
  </span>
);

const TapeStar = () => (
  <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
    <div className="absolute w-full h-8 md:h-12 bg-[#FFD700]/90 rotate-0" />
    <div className="absolute w-full h-8 md:h-12 bg-[#FFD700]/90 rotate-45" />
    <div className="absolute w-full h-8 md:h-12 bg-[#FFD700]/90 rotate-90" />
    <div className="absolute w-full h-8 md:h-12 bg-[#FFD700]/90 -rotate-45" />
  </div>
);

const TapeZigZag = () => (
  <div className="relative w-64 h-96 md:w-80 md:h-[500px] flex flex-col justify-between py-12">
    <div className="w-full h-8 md:h-12 bg-[#FFD700]/90 rotate-6 translate-y-4" />
    <div className="w-full h-8 md:h-12 bg-[#FFD700]/90 -rotate-6 translate-y-0" />
    <div className="w-full h-8 md:h-12 bg-[#FFD700]/90 rotate-6 translate-y-4" />
    <div className="w-full h-8 md:h-12 bg-[#FFD700]/90 -rotate-6 translate-y-0" />
    <div className="w-full h-8 md:h-12 bg-[#FFD700]/90 rotate-6 translate-y-4" />
  </div>
);

export default function AiMindsetTapePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F2F2F0] text-black font-inter selection:bg-[#FFD700] selection:text-black overflow-x-hidden" ref={containerRef}>
      <TapeStyles />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50">
        <div className="font-anton text-xl tracking-wide uppercase flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-black rounded-full">
            <img
              src="/assets/ai-mindset-logo.png"
              alt="AI Mindset logo"
              className="h-4 w-auto object-contain brightness-0 invert"
            />
          </span>
          <span>AI Mindset <span className="text-[#FFD700]">POS</span></span>
        </div>
        
        <button 
          className="bg-black text-white px-6 py-2 rounded-full font-anton uppercase tracking-wider hover:bg-[#FFD700] hover:text-black transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black text-[#FFD700] z-40 flex flex-col items-center justify-center gap-8 font-anton text-4xl uppercase tracking-wider">
          <a href="#" onClick={() => setIsMenuOpen(false)}>Program</a>
          <a href="#" onClick={() => setIsMenuOpen(false)}>Mentors</a>
          <a href="#" onClick={() => setIsMenuOpen(false)}>Apply</a>
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-center p-6 md:p-12 relative overflow-hidden">
        <div className="w-full md:w-1/2 z-10 flex flex-col justify-center">
          <h1 className="font-anton text-[15vw] md:text-[8vw] leading-[0.85] uppercase mb-8">
            AI Mindset<br/>
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-[#FFD700] -rotate-2 scale-105 z-[-1]" />
              POS {`{sprint}`}
            </span><br/>
            X26
          </h1>
          <p className="font-inter font-bold text-xl md:text-2xl max-w-md mb-8">
            PERSONAL OPERATIONAL SYSTEM.<br/>
            FROM CHAOS TO A WORKING AI SYSTEM.
          </p>
          <div className="flex gap-4">
             <button className="bg-black text-white px-8 py-4 font-anton text-xl uppercase tracking-wider hover:bg-[#FFD700] hover:text-black transition-colors">
               Apply Now
             </button>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex items-center justify-center relative mt-12 md:mt-0">
           <TapeStar />
        </div>
      </section>

      {/* "Fragile World" Style Section -> "Not a Tool" */}
      <section className="min-h-screen bg-black text-[#F2F2F0] p-6 md:p-24 flex flex-col justify-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <h2 className="font-anton text-[12vw] md:text-[6vw] leading-[0.9] uppercase mb-12">
            POS IS <TapeHighlight>NOT A TOOL</TapeHighlight><br/>
            IT IS AN <span className="text-[#FFD700]">OPERATING SYSTEM</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="font-inter text-lg md:text-xl leading-relaxed opacity-90">
              <p className="mb-8">
                Imagine: In the morning, the agent gives a plan for the day tailored to your energy level. 
                During the day, it reminds you of a meeting with a brief it prepared.
              </p>
              <p>
                A layer of rules, context, and constraints that forces tools to work.
                From chaos to a working AI system, tailored for you.
              </p>
            </div>
            
            <div className="relative flex items-center justify-center">
               <TapeZigZag />
            </div>
          </div>
        </div>
      </section>

      {/* Form Section style -> "Apply" */}
      <section className="min-h-screen bg-black text-white p-6 md:p-24 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="font-anton text-[10vw] md:text-[5vw] leading-none uppercase mb-4 text-[#FFD700]">
            #1: JOIN THE SPRINT
          </h2>
          <p className="font-inter text-xl md:text-2xl mb-12 max-w-2xl">
            Build your Personal Operational System. March 2 — March 14, 2026.
            <span className="text-[#FFD700] ml-2">→ Apply now.</span>
          </p>

          <div className="space-y-6">
            <input 
              type="text" 
              placeholder="NAME / optional" 
              className="w-full bg-[#F2F2F0] text-black p-6 rounded-lg font-inter text-lg outline-none focus:ring-4 focus:ring-[#FFD700]"
            />
            <input 
              type="email" 
              placeholder="EMAIL / required" 
              className="w-full bg-[#F2F2F0] text-black p-6 rounded-lg font-inter text-lg outline-none focus:ring-4 focus:ring-[#FFD700]"
            />
            <input 
              type="text" 
              placeholder="TELEGRAM / required" 
              className="w-full bg-[#F2F2F0] text-black p-6 rounded-lg font-inter text-lg outline-none focus:ring-4 focus:ring-[#FFD700]"
            />
            
            <button className="w-full bg-[#0055FF] text-white font-anton text-2xl uppercase py-6 rounded-lg hover:bg-[#0044CC] transition-colors mt-8">
              UPLOAD APPLICATION
            </button>
          </div>
        </div>
      </section>

      {/* "Who We Are" Section -> Mentors */}
      <section className="min-h-screen bg-black text-white p-6 md:p-24 flex items-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-anton text-[12vw] md:text-[7vw] leading-none uppercase mb-12">
            WHO <TapeHighlight>WE ARE?</TapeHighlight>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-anton text-3xl text-[#FFD700] mb-4">ALEXANDER POVALYAEV</h3>
              <p className="font-inter text-lg opacity-80">
                Founder of AI Mindset, Strategist. 15+ years connecting technology, business, and people. Creating harmonious ecosystems.
              </p>
            </div>
            
            <div>
              <h3 className="font-anton text-3xl text-[#FFD700] mb-4">SERGEY KHABAROV</h3>
              <p className="font-inter text-lg opacity-80">
                System Architect. 6+ years in education, 500+ trained specialists. Ex-CTO. Knows how processes work from the inside.
              </p>
            </div>

            <div>
              <h3 className="font-anton text-3xl text-[#FFD700] mb-4">SERYOZHA RIS</h3>
              <p className="font-inter text-lg opacity-80">
                AI Evangelist, ex-Yandex. Builder and founder in @vibecod3rs community. Claude Code streamer.
              </p>
            </div>
          </div>

          <div className="mt-24 pt-12 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-8 font-inter opacity-60">
            <p>Any questions? Contact us via <a href="#" className="text-[#0055FF] font-bold hover:underline">email</a>.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">Discord</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
