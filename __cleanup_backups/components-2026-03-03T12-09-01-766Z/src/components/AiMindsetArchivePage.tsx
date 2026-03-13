import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const ArchiveStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    
    .font-grotesk { font-family: 'Space Grotesk', sans-serif; }
    .font-inter { font-family: 'Inter', sans-serif; }
    
    .archive-grid {
      display: grid;
      grid-template-columns: 40px 1.5fr 1.5fr 2fr 1fr 60px;
      gap: 16px;
    }

    @media (max-width: 768px) {
      .archive-grid {
        grid-template-columns: 40px 1fr;
        gap: 8px;
      }
      .archive-hide-mobile {
        display: none;
      }
    }

    .noise-overlay {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E");
    }
  `}</style>
);

const NavItem = ({ text }: { text: string }) => (
  <a href="#" className="text-[10px] font-inter font-medium tracking-widest uppercase hover:text-black/50 transition-colors">
    {text}
  </a>
);

const ArchiveRow = ({ id, name, client, desc, category, year }: any) => (
  <div className="archive-grid py-3 border-b border-black/10 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer group items-baseline">
    <div className="font-mono text-xs opacity-50 group-hover:opacity-100">{id}</div>
    <div className="font-inter font-medium text-sm truncate">{name}</div>
    <div className="font-inter text-xs opacity-70 truncate archive-hide-mobile">{client}</div>
    <div className="font-inter text-xs opacity-70 truncate archive-hide-mobile">{desc}</div>
    <div className="font-inter text-xs opacity-70 archive-hide-mobile">{category}</div>
    <div className="font-mono text-xs text-right opacity-50 group-hover:opacity-100">{year}</div>
  </div>
);

const InfoColumn = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="flex flex-col gap-4">
    <h3 className="font-grotesk text-sm uppercase tracking-wider border-b border-black pb-2 mb-2">{title}</h3>
    <div className="font-inter text-xs leading-relaxed opacity-80 space-y-4 text-justify">
      {children}
    </div>
  </div>
);

export default function AiMindsetArchivePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const archiveData = [
    { id: "01", name: "Context", client: "AI Mindset", desc: "AI knows who you are", category: "Result", year: "2026" },
    { id: "02", name: "Architecture", client: "AI Mindset", desc: "Logical structure, no chaos", category: "Result", year: "2026" },
    { id: "03", name: "Tools", client: "AI Mindset", desc: "Claude Code / Cursor / Obsidian", category: "Result", year: "2026" },
    { id: "04", name: "Skills", client: "AI Mindset", desc: "Automating routine tasks", category: "Result", year: "2026" },
    { id: "05", name: "Morning Agent", client: "Workflow", desc: "Daily plan based on energy", category: "Feature", year: "2026" },
    { id: "06", name: "Day Agent", client: "Workflow", desc: "Meeting briefs & reminders", category: "Feature", year: "2026" },
    { id: "07", name: "Evening Agent", client: "Workflow", desc: "Blockers & daily summary", category: "Feature", year: "2026" },
    { id: "08", name: "Alexander Povalyaev", client: "Mentor", desc: "Founder, Strategist", category: "Team", year: "15+ Yrs" },
    { id: "09", name: "Sergey Khabarov", client: "Mentor", desc: "System Architect", category: "Team", year: "6+ Yrs" },
    { id: "10", name: "Seryozha Ris", client: "Mentor", desc: "AI Evangelist, ex-Yandex", category: "Team", year: "Vibe" },
    { id: "11", name: "Alumni Discount", client: "Pricing", desc: "-20% for graduates", category: "Offer", year: "2026" },
    { id: "12", name: "Friend Discount", client: "Pricing", desc: "-10% for each friend", category: "Offer", year: "2026" },
    { id: "13", name: "Refund Policy", client: "Pricing", desc: "4 days money-back guarantee", category: "Offer", year: "2026" },
    { id: "14", name: "Sprint Start", client: "Schedule", desc: "March 2nd", category: "Date", year: "2026" },
    { id: "15", name: "Sprint End", client: "Schedule", desc: "March 14th", category: "Date", year: "2026" },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-inter selection:bg-black selection:text-white overflow-x-hidden" ref={containerRef}>
      <ArchiveStyles />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-start z-50 mix-blend-difference text-white md:text-black md:mix-blend-normal pointer-events-none">
        <div className="hidden md:block w-1/3 pointer-events-auto">
          <span className="text-[10px] font-inter font-bold tracking-widest uppercase">AI Mindset POS</span>
        </div>
        
        <div className="hidden md:flex justify-center gap-8 w-1/3 pointer-events-auto">
          <NavItem text="Program" />
          <NavItem text="Results" />
          <NavItem text="Mentors" />
          <NavItem text="Apply" />
        </div>

        <div className="flex justify-end gap-6 w-full md:w-1/3 pointer-events-auto">
          <div className="hidden md:flex gap-6">
            <NavItem text="Telegram" />
            <NavItem text="YouTube" />
          </div>
          <button className="md:hidden text-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white text-black z-40 flex flex-col items-center justify-center gap-8 md:hidden">
          <NavItem text="Program" />
          <NavItem text="Results" />
          <NavItem text="Mentors" />
          <NavItem text="Apply" />
        </div>
      )}

      {/* Hero Image Section */}
      <section className="h-[80vh] w-full relative overflow-hidden bg-[#F0F0F0]">
        <div className="absolute inset-0 noise-overlay pointer-events-none z-10" />
        <img 
          src="https://picsum.photos/seed/ai-mindset/1920/1080?grayscale" 
          alt="AI Mindset Team" 
          className="w-full h-full object-cover filter grayscale contrast-125 brightness-90"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Center Nav Overlay (Visual only to match design) */}
          <div className="hidden md:flex gap-8 text-[10px] font-inter font-bold tracking-widest uppercase text-black mix-blend-difference">
            <span>Program</span>
            <span>Results</span>
            <span>Mentors</span>
            <span>Apply</span>
          </div>
        </div>
      </section>

      {/* Info Grid Section */}
      <section className="py-24 px-6 md:px-12 border-b border-black/10">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            <InfoColumn title="What is POS">
              <p>
                POS is not a tool, it is an operating system with a personal AI assistant. A layer of rules, context, and constraints that forces tools to work.
              </p>
              <p>
                Imagine: In the morning, the agent gives a plan for the day tailored to your energy level. During the day, it reminds you of a meeting with a brief it prepared. In the evening, it finds open tasks and blockers, providing a summary.
              </p>
              <p>
                From chaos of tools to a working AI system, tailored for you.
              </p>
            </InfoColumn>

            <InfoColumn title="Research">
              <p>
                For the last 6 months, we researched how founders build their POS. We analyzed their architectures and working stacks. We learned what works and what doesn't. We watched how their day looks with AI agents.
              </p>
              <p>
                We collected patterns and turned them into a sprint. So you don't reinvent the wheel, but take what already works and adapt it for yourself.
              </p>
              <p>
                A distillate of real cases from real founders. Proven stacks, not just a set of hyped tools.
              </p>
            </InfoColumn>

            <InfoColumn title="Results">
              <p>
                You leave with a working system, not just notes.
              </p>
              <p>
                <strong>Collected Context:</strong> AI knows who you are, how you work, what is important to you.
              </p>
              <p>
                <strong>Logical Architecture:</strong> Won't delete all files without asking and won't buy a useless $3k course.
              </p>
              <p>
                <strong>Connected Tools:</strong> Claude Code / Cursor / Obsidian / MCP.
              </p>
              <p>
                <strong>Working Skills:</strong> Automation of routine tasks.
              </p>
            </InfoColumn>

            <InfoColumn title="Details">
              <p>
                <strong>Dates:</strong> March 2 — March 14, 2026.
              </p>
              <p>
                <strong>Batch:</strong> sprint-X26.
              </p>
              <p>
                <strong>Applications:</strong> Open.
              </p>
              <p>
                <strong>Price:</strong> Alumni (-20%), Bring a Friend (-10% each). Refund first 4 days — no questions asked. Payment in rubles available.
              </p>
            </InfoColumn>

          </div>
        </div>
      </section>

      {/* Archive List Section */}
      <section className="py-24 px-6 md:px-12 bg-[#FAFAFA]">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Header Row */}
          <div className="archive-grid pb-4 border-b border-black text-[10px] font-mono uppercase tracking-widest opacity-40 sticky top-20 bg-[#FAFAFA] z-20">
            <div>No.</div>
            <div>Item</div>
            <div className="archive-hide-mobile">Category</div>
            <div className="archive-hide-mobile">Description</div>
            <div className="archive-hide-mobile">Type</div>
            <div className="text-right">Year</div>
          </div>

          {/* Data Rows */}
          <div className="mt-4">
            {archiveData.map((item) => (
              <ArchiveRow key={item.id} {...item} />
            ))}
          </div>

          {/* Pagination / Footer */}
          <div className="mt-12 pt-12 border-t border-black/10 flex justify-between items-center text-xs font-mono opacity-50">
            <div>Showing 1-{archiveData.length} of {archiveData.length}</div>
            <div className="flex gap-4">
              <button className="hover:text-black">PREV</button>
              <span className="text-black">1</span>
              <button className="hover:text-black">NEXT</button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-[10px] font-inter uppercase tracking-widest">
             AI Mindset © 2026
           </div>
           <div className="flex gap-8 text-[10px] font-inter uppercase tracking-widest opacity-60">
             <a href="#" className="hover:text-white hover:opacity-100">Telegram</a>
             <a href="#" className="hover:text-white hover:opacity-100">YouTube</a>
             <a href="#" className="hover:text-white hover:opacity-100">Podcast</a>
           </div>
        </div>
      </footer>

    </div>
  );
}
