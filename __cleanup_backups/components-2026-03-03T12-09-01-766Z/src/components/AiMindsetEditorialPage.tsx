import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';

const EditorialStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap');
    
    .font-serif-display { font-family: 'Cormorant Garamond', serif; }
    .font-sans-clean { font-family: 'Inter', sans-serif; }
    
    .editorial-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 100vh;
    }
    
    @media (max-width: 768px) {
      .editorial-grid {
        grid-template-columns: 1fr;
      }
    }

    .border-thin {
      border: 1px solid #1A1A1A;
    }

    .border-r-thin {
      border-right: 1px solid #1A1A1A;
    }

    .border-b-thin {
      border-bottom: 1px solid #1A1A1A;
    }

    /* Custom Badge Shapes */
    .badge-oct {
      clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
    }

    .badge-tab {
      clip-path: polygon(
        10% 0%, 90% 0%, 
        100% 20%, 100% 100%, 
        0% 100%, 0% 20%
      );
    }
  `}</style>
);

const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`border-thin p-6 text-center flex flex-col items-center justify-center aspect-square ${className}`}>
    {children}
  </div>
);

const SectionHeader = ({ number, title, items }: { number: string, title: string, items: string[] }) => (
  <div className="mb-12">
    <div className="font-sans-clean text-sm uppercase tracking-widest mb-2 text-black/60">{number}. {title}</div>
    <ul className="font-serif-display text-2xl leading-none space-y-1">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
);

const BigTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="font-serif-display text-[12vw] leading-[0.85] font-light tracking-tight mb-8">
    {children}
  </h1>
);

export default function AiMindsetEditorialPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9F9F7] text-[#1A1A1A] font-sans-clean selection:bg-[#1A1A1A] selection:text-[#F9F9F7]" ref={containerRef}>
      <EditorialStyles />

      {/* Mobile Nav Toggle */}
      <div className="fixed top-6 right-6 z-50 md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Main Layout */}
      <div className="editorial-grid">
        
        {/* LEFT COLUMN (Fixed/Sticky on Desktop) */}
        <div className="border-r-thin p-8 md:p-12 flex flex-col justify-between min-h-screen relative">
          <div className="font-sans-clean text-xs uppercase tracking-[0.2em] mb-24">
            AI Mindset POS
          </div>

          <div className="flex-grow flex flex-col justify-center">
            <BigTitle>
              SYSTEM<br/>
              GUIDELINES
            </BigTitle>
            
            <div className="font-serif-display text-3xl italic leading-tight max-w-md mt-8">
              A layer of rules<br/>
              for the tools<br/>
              to work properly
            </div>

            <div className="mt-12 font-sans-clean text-sm max-w-xs opacity-70 leading-relaxed">
              From chaos to a working AI system.
              Tailored for you.
              <br/><br/>
              March 2 — March 14, 2026
            </div>
          </div>

          <div className="mt-24 font-sans-clean text-xs uppercase tracking-widest opacity-50">
            Sprint X26 © 2026
          </div>
        </div>

        {/* RIGHT COLUMN (Scrollable) */}
        <div className="p-8 md:p-12 bg-[#F9F9F7]">
          
          {/* Header Actions */}
          <div className="flex justify-between items-start mb-24">
            <div className="font-sans-clean text-xs uppercase tracking-[0.2em]">
              FOREWORD
            </div>
            <ArrowRight className="w-6 h-6" />
          </div>

          {/* Table of Contents Style Content */}
          <div className="space-y-16">
            
            <SectionHeader 
              number="I" 
              title="CONTEXT" 
              items={["Identity", "Role Definition", "Energy Levels", "Priorities"]} 
            />

            <SectionHeader 
              number="II" 
              title="ARCHITECTURE" 
              items={["Logical Structure", "Data Flow", "Safety Protocols", "No Chaos"]} 
            />

            <SectionHeader 
              number="III" 
              title="TOOLS" 
              items={["Claude Code", "Cursor Editor", "Obsidian Vault", "MCP Servers"]} 
            />

            <SectionHeader 
              number="IV" 
              title="AGENTS" 
              items={["Morning Planner", "Meeting Briefer", "Evening Summarizer", "Blocker Finder"]} 
            />

            <SectionHeader 
              number="V" 
              title="MENTORS" 
              items={["Alexander Povalyaev", "Sergey Khabarov", "Seryozha Ris"]} 
            />

            <SectionHeader 
              number="VI" 
              title="PRICING" 
              items={["Alumni Discount", "Bring a Friend", "Refund Policy"]} 
            />

          </div>

          {/* Badges Section */}
          <div className="mt-32 border-t-thin pt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="border-thin rounded-[40px] p-12 text-center flex flex-col items-center justify-center aspect-[3/4] hover:bg-[#1A1A1A] hover:text-[#F9F9F7] transition-colors duration-500 cursor-pointer group">
                <div className="font-sans-clean text-xs uppercase tracking-widest mb-4">AI MINDSET</div>
                <div className="font-serif-display text-5xl md:text-6xl leading-none mb-4">
                  POS<br/>
                  SPRINT<br/>
                  X26
                </div>
                <div className="font-sans-clean text-xs uppercase tracking-widest mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  Apply Now
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="border-thin rounded-t-[40px] rounded-b-none p-8 text-center aspect-square flex flex-col justify-center hover:bg-[#1A1A1A] hover:text-[#F9F9F7] transition-colors duration-300">
                  <div className="font-serif-display text-3xl">
                    NOT A<br/>TOOL
                  </div>
                  <div className="font-sans-clean text-[10px] uppercase mt-2">Operating System</div>
                </div>

                <div className="border-thin rounded-full p-8 text-center aspect-square flex flex-col justify-center hover:bg-[#1A1A1A] hover:text-[#F9F9F7] transition-colors duration-300">
                  <div className="font-serif-display text-3xl">
                    MARCH<br/>2-14
                  </div>
                  <div className="font-sans-clean text-[10px] uppercase mt-2">2026</div>
                </div>
              </div>

            </div>
          </div>

          {/* Detailed Text Section */}
          <div className="mt-32 border-t-thin pt-16">
             <h3 className="font-serif-display text-4xl mb-8">What is POS?</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans-clean text-sm leading-relaxed opacity-80 text-justify">
               <p>
                 POS is not a tool, it is an operating system with a personal AI assistant. A layer of rules, context, and constraints that forces tools to work.
                 From chaos to a working AI system, tailored for you.
               </p>
               <p>
                 Imagine: In the morning, the agent gives a plan for the day tailored to your energy level. During the day, it reminds you of a meeting with a brief it prepared. In the evening, it finds open tasks and blockers, providing a summary.
               </p>
             </div>
          </div>

          {/* Footer */}
          <div className="mt-32 pt-16 border-t-thin flex justify-between items-end">
            <div className="font-sans-clean text-xs uppercase tracking-widest opacity-50">
              Applications Open
            </div>
            <div className="flex gap-4">
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
