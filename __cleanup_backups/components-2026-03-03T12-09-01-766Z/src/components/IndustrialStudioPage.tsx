import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Circle } from 'lucide-react';

// --- Components ---

const DotLogo = () => (
  <div className="flex gap-1">
    <div className="w-3 h-3 bg-black rounded-full"></div>
    <div className="w-3 h-3 bg-black rounded-full opacity-50"></div>
    <div className="w-3 h-3 bg-black rounded-full opacity-25"></div>
  </div>
);

const NavLink = ({ text, active = false }: { text: string; active?: boolean }) => (
  <a 
    href="#" 
    className={`text-xs font-sans tracking-wide uppercase hover:opacity-50 transition-opacity ${active ? 'flex items-center gap-2 font-bold' : ''}`}
  >
    {active && <div className="w-1.5 h-1.5 bg-black rounded-full"></div>}
    {text}
  </a>
);

const SectionHeader = ({ title }: { title: string }) => (
  <div className="border-t border-black/10 pt-8 mb-12 flex items-start">
    <div className="flex items-center gap-4">
      <div className="w-3 h-3 bg-black rounded-full"></div>
      <h2 className="text-sm font-sans uppercase tracking-widest">{title}</h2>
    </div>
  </div>
);

const ServiceRow = ({ title, tags }: { title: string; tags: string[] }) => (
  <div className="group border-t border-black/10 py-8 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-white/50 transition-colors px-4 -mx-4 rounded-lg cursor-pointer">
    <h3 className="text-lg font-sans font-medium mb-4 md:mb-0 w-1/3">{title}</h3>
    <div className="flex-1 flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-500 font-light">
      {tags.map((tag, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="w-1 h-1 bg-gray-300 rounded-full"></span>}
          {tag}
        </span>
      ))}
    </div>
    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-2 duration-300" />
  </div>
);

// --- Main Page ---

export default function IndustrialStudioPage() {
  return (
    <div className="min-h-screen bg-[#E6E6E6] text-[#1A1A1A] font-sans selection:bg-black selection:text-white">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-8 flex justify-between items-start mix-blend-multiply pointer-events-none">
        <div className="pointer-events-auto flex gap-4 items-center">
          <DotLogo />
          <div className="text-xs font-medium leading-tight">
            AI Mindset<br/>
            Laboratory W26
          </div>
        </div>

        <nav className="pointer-events-auto hidden md:flex items-center gap-8">
          <NavLink text="Home" active />
          <NavLink text="Process" />
          <NavLink text="Studio" />
          <NavLink text="Index" />
          <div className="w-px h-4 bg-black/20 mx-2"></div>
          <NavLink text="Ru" />
          <NavLink text="En" />
          <a href="https://join.aimindset.org/context" className="bg-[#1A1A1A] text-white text-xs px-6 py-3 rounded-full uppercase tracking-wider hover:bg-gray-800 transition-colors">
            Contact
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 md:px-12 min-h-screen flex flex-col justify-between">
        <div className="max-w-4xl">
          <div className="text-xs font-sans uppercase tracking-widest mb-8 text-gray-500">
            Studio for New Thinking
          </div>
          <h1 className="text-4xl md:text-6xl font-light leading-[1.1] tracking-tight mb-12">
            Мы помогаем <span className="font-normal">дальновидным людям</span> превращать хаос идей в <span className="font-normal">персональную операционную систему</span>.
          </h1>
        </div>

        <div className="relative w-full aspect-[21/9] bg-black rounded-sm overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop" 
            alt="Industrial Device" 
            className="w-full h-full object-cover opacity-80 grayscale group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-xs font-mono uppercase tracking-[0.5em] mb-4 opacity-70">Batch Winter 26</div>
              <div className="text-5xl md:text-7xl font-light tracking-tighter">AI_LAB</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-4 text-xs font-mono text-gray-500 uppercase">
          Scroll to Explore ↓
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 md:px-12">
        <SectionHeader title="About Us" />
        
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <ArrowRight className="w-6 h-6 rotate-45" />
          </div>
          <div className="md:col-span-8 space-y-8">
            <p className="text-xl md:text-2xl font-light leading-relaxed">
              AI Mindset Winter Lab W26 — это лаборатория, пространство для экспериментов. 
              Здесь вы не изучаете, а создаёте: персональных ассистентов, AI-first процессы, новую версию себя.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-600 font-light leading-relaxed">
              <p>
                Мы верим, что mindset важнее инструментов. Технологии меняются, а новый способ мышления остаётся с вами.
                Каждая неделя — это эксперимент с реальными задачами и артефактами.
              </p>
              <p>
                Сообщество усиливает обучение. Вы учитесь не только у экспертов, но и друг у друга.
                Персонализация через треки позволяет углубиться в то, что нужно именно вам.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process / Services Section */}
      <section className="py-20 px-6 md:px-12 bg-[#E0E0E0]">
        <SectionHeader title="Our Process" />
        
        <div className="space-y-4">
          <ServiceRow 
            title="Prompt Engineering" 
            tags={['Chain-of-Thought', 'Few-Shot Learning', 'Custom GPTs', 'AI Interface']} 
          />
          <ServiceRow 
            title="Context Engineering" 
            tags={['Obsidian', 'MCP', 'Claude Projects', 'Automation', 'Agents']} 
          />
          <ServiceRow 
            title="Mind Engineering" 
            tags={['Productivity', 'Rituals', 'AI Coaching', 'Reflection', 'Habit Tracking']} 
          />
          <ServiceRow 
            title="Life Engineering" 
            tags={['Vibe-coding', 'Cursor', 'Prototyping', 'Creative Flow', 'Deployment']} 
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 md:px-12 bg-[#1A1A1A] text-[#E6E6E6]">
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h3 className="text-3xl font-light mb-8">Ready to shape your future?</h3>
            <a href="https://join.aimindset.org/context" className="inline-block bg-white text-black px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors">
              Join Waitlist
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm font-light text-gray-400">
            <ul className="space-y-2">
              <li className="text-white font-medium mb-4">Studio</li>
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Process</a></li>
              <li><a href="#" className="hover:text-white">Work</a></li>
            </ul>
            <ul className="space-y-2">
              <li className="text-white font-medium mb-4">Connect</li>
              <li><a href="#" className="hover:text-white">Telegram</a></li>
              <li><a href="#" className="hover:text-white">YouTube</a></li>
              <li><a href="#" className="hover:text-white">Email</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 uppercase tracking-widest">
          <div>© 2026 AI Mindset Lab</div>
          <div>Moscow [RU] / Worldwide [WEB]</div>
        </div>
      </footer>

    </div>
  );
}
