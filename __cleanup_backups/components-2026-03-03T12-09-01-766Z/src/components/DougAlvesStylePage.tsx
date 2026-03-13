import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, RotateCw, MoveRight } from 'lucide-react';

// --- Styles ---

const EditorialFonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
    
    .font-editorial { font-family: 'Inter', sans-serif; }
    
    .text-balance {
      text-wrap: balance;
    }
  `}</style>
);

// --- Components ---

const GridRow = ({ label, children }: { label: string, children: React.ReactNode }) => (
  <div className="border-t border-[#1C1714]/20 py-8 md:py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
      <div className="md:col-span-1 text-lg font-medium opacity-100">{label}</div>
      <div className="md:col-span-3">
        {children}
      </div>
    </div>
  </div>
);

const ExperienceItem = ({ year, role, company, description }: { year: string, role: string, company: string, description?: string }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 last:mb-0 group">
    <div className="text-[#1C1714]/60 font-medium">{year}</div>
    <div>
      <div className="text-xl md:text-2xl font-medium mb-1 group-hover:text-[#1C1714]/70 transition-colors cursor-pointer">
        {role}
      </div>
      <div className="text-lg text-[#1C1714]/80 mb-2">{company}</div>
      {description && (
        <div className="text-[#1C1714]/60 text-sm leading-relaxed max-w-md">
          {description}
        </div>
      )}
    </div>
  </div>
);

const LinkItem = ({ text }: { text: string }) => (
  <a href="#" className="block text-xl md:text-2xl font-medium mb-4 hover:opacity-50 transition-opacity">
    {text}
  </a>
);

// --- Main Page ---

export default function DougAlvesStylePage() {
  return (
    <div className="min-h-screen bg-[#F9F4F0] text-[#1C1714] font-editorial selection:bg-[#1C1714] selection:text-[#F9F4F0] overflow-x-hidden">
      <EditorialFonts />

      {/* Hero Section - Dark */}
      <section className="bg-[#1C1714] text-[#EBE8E6] min-h-screen flex flex-col justify-between p-6 md:p-12 relative">
        <div className="absolute top-6 right-6 md:top-12 md:right-12">
          <RotateCw className="w-8 h-8 md:w-12 md:h-12 opacity-20 hover:opacity-100 hover:rotate-180 transition-all duration-700 cursor-pointer" />
        </div>

        <div className="mt-24 md:mt-0">
          <h1 className="text-[#EBE8E6] text-[17vw] leading-[0.8] tracking-tighter font-normal -ml-[1vw]">
            POS—2026.AI
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm md:text-base border-t border-[#EBE8E6]/20 pt-8 mt-12">
          <div>
            <div className="opacity-50 mb-1">Sprint</div>
            <div>Batch X26</div>
            <div>AI Mindset</div>
          </div>
          <div>
            <div className="opacity-50 mb-1">Focus</div>
            <div>Personal OS</div>
            <div>& AI Agents</div>
          </div>
          <div>
            <div className="opacity-50 mb-1">Location</div>
            <div>Online</div>
            <div>Global</div>
          </div>
          <div>
            <div className="opacity-50 mb-1">Status</div>
            <div className="flex items-center gap-2">
              Applications Open <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section - Light */}
      <section className="p-6 md:p-12 pt-24 md:pt-32">
        <div className="mb-8 flex items-center gap-2 opacity-50 text-sm uppercase tracking-wide">
          About <ArrowDownRight size={16} />
        </div>
        
        <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight font-normal max-w-6xl mb-32 text-balance">
          AI Mindset POS <span className="opacity-40">↳</span> Create a system of agents for managing attention, tasks, and knowledge. <br className="hidden md:block" />
          <span className="opacity-40">From chaos to a working AI system tailored for you.</span>
        </h2>

        {/* Guides Grid */}
        <GridRow label="Guides">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            <ExperienceItem 
              year="Founder"
              role="Alexander Povalyaev"
              company="AI Mindset"
              description="Strategist. 15+ years connecting technology, tools, business and people."
            />
            <ExperienceItem 
              year="Architect"
              role="Sergey Khabarov"
              company="EdTech / AI"
              description="System architect at the intersection of AI, business and learning. Ex-CTO."
            />
            <ExperienceItem 
              year="Evangelist"
              role="Seryozha Ris"
              company="Vibecod3rs"
              description="AI Evangelist, ex-Yandex. Builder and founder. Claude Code streamer."
            />
          </div>
        </GridRow>

        {/* Results Grid */}
        <GridRow label="Results">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            <ExperienceItem 
              year="01 — Context"
              role="Collected Context"
              company="Personalization"
              description="AI knows who you are, how you work, and what matters to you."
            />
            <ExperienceItem 
              year="02 — Logic"
              role="Logical Architecture"
              company="Safety"
              description="Won't delete all files without asking or buy a useless course for $3k."
            />
            <ExperienceItem 
              year="03 — Stack"
              role="Connected Tools"
              company="Integration"
              description="Claude Code / Cursor / Obsidian / MCP working in harmony."
            />
            <ExperienceItem 
              year="04 — Auto"
              role="Working Skills"
              company="Automation"
              description="Automation of routine tasks and defined rules."
            />
          </div>
        </GridRow>

        {/* Links Grid */}
        <GridRow label="Links">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <LinkItem text="Podcast" />
              <LinkItem text="Telegram Channel" />
            </div>
            <div>
              <LinkItem text="Public Offer" />
              <LinkItem text="Privacy Policy" />
            </div>
            <div>
              <LinkItem text="Apply Now ↗" />
            </div>
          </div>
        </GridRow>

      </section>

      {/* Footer - Dark */}
      <footer className="bg-[#1C1714] text-[#EBE8E6] p-6 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="max-w-xl">
            <div className="text-sm opacity-50 mb-4 uppercase tracking-wide">Contact</div>
            <p className="text-2xl md:text-3xl leading-tight">
              We live in these processes every day — building systems, agents, skills. Join us to build yours.
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-sm opacity-50 mb-1">Batch X26</div>
            <div className="text-xl">Mar 2 — 14, 2026</div>
          </div>
        </div>

        <div className="mt-32 pt-8 border-t border-[#EBE8E6]/20 flex justify-between items-center text-sm opacity-40">
          <div>© AI Mindset 2026</div>
          <div>POS {'{sprint}'}</div>
        </div>
      </footer>
    </div>
  );
}
