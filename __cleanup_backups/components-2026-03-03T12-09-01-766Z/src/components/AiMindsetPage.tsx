import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, RotateCw, ArrowUpRight } from 'lucide-react';

// --- Styles ---

const SwissFonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
    
    .font-swiss { font-family: 'Inter', sans-serif; }
    
    .swiss-grid {
      display: grid;
      grid-template-columns: 1fr;
    }
    
    @media (min-width: 768px) {
      .swiss-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  `}</style>
);

// --- Components ---

const Divider = () => (
  <div className="w-full h-px bg-[#EAEAEA]/20 my-8 md:my-12" />
);

const SectionHeader = ({ title }: { title: string }) => (
  <div className="col-span-1 text-[#EAEAEA]/60 mb-4 md:mb-0 font-medium text-sm uppercase tracking-wide">
    {title}
  </div>
);

const ListItem = ({ year, title, subtitle, link }: { year?: string, title: string, subtitle?: string, link?: boolean }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 group cursor-pointer">
    <div className="text-[#EAEAEA]/60 font-mono text-sm">{year}</div>
    <div>
      <div className="text-[#EAEAEA] text-lg md:text-xl font-medium flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
        {title}
        {link && <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
      </div>
      {subtitle && <div className="text-[#EAEAEA]/60 mt-1 text-sm md:text-base">{subtitle}</div>}
    </div>
  </div>
);

const GuideItem = ({ name, role, link }: { name: string, role: string, link: string }) => (
  <div className="mb-8 group cursor-pointer">
    <div className="text-[#EAEAEA] text-xl md:text-2xl font-medium flex items-center gap-2">
      {name}
      <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#EAEAEA]/60" />
    </div>
    <div className="text-[#EAEAEA]/60 mt-2 text-sm md:text-base max-w-xs leading-relaxed">
      {role}
    </div>
  </div>
);

// --- Main Page ---

export default function AiMindsetPage() {
  return (
    <div className="min-h-screen bg-[#1A1512] text-[#EAEAEA] font-swiss selection:bg-[#EAEAEA] selection:text-[#1A1512] overflow-x-hidden">
      <SwissFonts />

      {/* Top Bar / Navigation */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-start z-50 mix-blend-difference">
         <div className="hidden md:block"></div>
         <RotateCw className="w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:rotate-180 transition-transform duration-700" />
      </div>

      {/* Hero Section */}
      <section className="pt-24 md:pt-12 px-4 md:px-8 pb-12 md:pb-24">
        <h1 className="text-[14vw] leading-[0.8] font-medium tracking-tighter text-center md:text-left whitespace-nowrap overflow-hidden">
          POS—2026.AI
        </h1>
      </section>

      {/* Info Grid */}
      <section className="px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border-t border-[#EAEAEA]/20 pt-6">
          <div>
            <h3 className="text-[#EAEAEA]/60 text-sm uppercase mb-1">Sprint</h3>
            <p className="text-lg">Batch X26</p>
            <p className="text-[#EAEAEA]/60 text-sm">Applications Open</p>
          </div>
          <div>
            <h3 className="text-[#EAEAEA]/60 text-sm uppercase mb-1">Focus</h3>
            <p className="text-lg">Personal OS</p>
            <p className="text-[#EAEAEA]/60 text-sm">& AI Agents</p>
          </div>
          <div>
            <h3 className="text-[#EAEAEA]/60 text-sm uppercase mb-1">Dates</h3>
            <p className="text-lg">Mar 2 — 14</p>
            <p className="text-[#EAEAEA]/60 text-sm">2026</p>
          </div>
          <div>
            <h3 className="text-[#EAEAEA]/60 text-sm uppercase mb-1">Action</h3>
            <p className="text-lg flex items-center gap-2 cursor-pointer hover:underline underline-offset-4">
              Apply Now <ArrowDownRight size={18} />
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* About Section */}
      <section className="px-4 md:px-8">
        <div className="swiss-grid gap-8">
          <SectionHeader title="About ↴" />
          <div className="col-span-3">
            <h2 className="text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-normal mb-12">
              AI Mindset POS {`{sprint}`} <br />
              <span className="text-[#EAEAEA]/60">
                From chaos to a working AI system tailored for you.
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg md:text-xl leading-relaxed text-[#EAEAEA]/80">
              <p>
                POS is not a tool, it is an operating system with a personal AI assistant. A layer of rules, context, and constraints that makes tools work.
              </p>
              <p>
                Imagine: In the morning, the agent gives a plan for the day tailored to your energy level. During the day, it reminds you of a meeting with a brief it prepared. In the evening, it finds open tasks and blockers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Guides Section */}
      <section className="px-4 md:px-8">
        <div className="swiss-grid gap-8">
          <SectionHeader title="Guides ↴" />
          <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
             <GuideItem 
               name="Alexander Povalyaev" 
               role="Founder of AI Mindset, strategist. 15+ years connecting tech, business, and people."
               link="#"
             />
             <GuideItem 
               name="Sergey Khabarov" 
               role="System Architect at the intersection of AI & Business. Ex-CTO, 6+ years in EdTech."
               link="#"
             />
             <GuideItem 
               name="Seryozha Ris" 
               role="AI Evangelist, ex-Yandex. Builder & Founder at @vibecod3rs. Claude Code streamer."
               link="#"
             />
          </div>
        </div>
      </section>

      <Divider />

      {/* Program / Results Section */}
      <section className="px-4 md:px-8">
        <div className="swiss-grid gap-8">
          <SectionHeader title="Results ↴" />
          <div className="col-span-3">
             <ListItem 
               year="01" 
               title="Collected Context" 
               subtitle="AI knows who you are, how you work, and what matters to you."
             />
             <ListItem 
               year="02" 
               title="Logical Architecture" 
               subtitle="Won't delete files without asking or buy useless courses."
             />
             <ListItem 
               year="03" 
               title="Connected Tools" 
               subtitle="Claude Code / Cursor / Obsidian / MCP integrated seamlessly."
             />
             <ListItem 
               year="04" 
               title="Working Skills" 
               subtitle="Automation of routine tasks and defined rules."
             />
          </div>
        </div>
      </section>

      <Divider />

      {/* Footer */}
      <footer className="px-4 md:px-8 pb-12">
        <div className="swiss-grid gap-8">
          <SectionHeader title="Links ↴" />
          <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
             <a href="#" className="text-xl hover:text-[#EAEAEA]/60 transition-colors flex items-center gap-2">
               Podcast <ArrowUpRight size={16} />
             </a>
             <a href="#" className="text-xl hover:text-[#EAEAEA]/60 transition-colors flex items-center gap-2">
               Telegram Channel <ArrowUpRight size={16} />
             </a>
             <a href="#" className="text-xl hover:text-[#EAEAEA]/60 transition-colors flex items-center gap-2">
               Public Offer <ArrowUpRight size={16} />
             </a>
             <a href="#" className="text-xl hover:text-[#EAEAEA]/60 transition-colors flex items-center gap-2">
               Privacy Policy <ArrowUpRight size={16} />
             </a>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-[#EAEAEA]/20 flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
          <div className="text-[#EAEAEA]/40 text-sm">
            © AI Mindset 2026
          </div>
          <div className="text-[10vw] md:text-[4vw] leading-none font-medium tracking-tighter opacity-20">
            AI MINDSET
          </div>
        </div>
      </footer>

    </div>
  );
}
