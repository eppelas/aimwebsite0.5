import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

// --- Components ---

const ReportContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-full max-w-[1400px] mx-auto px-4 md:px-8 ${className}`}>
    {children}
  </div>
);

const WireframeTorus = () => (
  <svg viewBox="0 0 800 600" className="w-full h-full opacity-80 pointer-events-none">
    <g fill="none" stroke="white" strokeWidth="0.5">
      {/* Abstract representation of a wireframe torus/shape */}
      {[...Array(20)].map((_, i) => (
        <ellipse key={i} cx="400" cy="300" rx={100 + i * 10} ry={50 + i * 5} transform={`rotate(${i * 10} 400 300)`} />
      ))}
      {[...Array(12)].map((_, i) => (
        <ellipse key={`v-${i}`} cx="400" cy="300" rx={50} ry={150} transform={`rotate(${i * 15} 400 300)`} />
      ))}
    </g>
  </svg>
);

const StickyNav = () => {
  const [active, setActive] = useState('INTRO');
  const links = ['INTRO', 'CHAPTER 1', 'CHAPTER 2', 'CHAPTER 3', 'CHAPTER 4', 'OUTRO'];

  return (
    <nav className="sticky top-0 z-50 bg-[#F3F1EC] border-b border-black text-xs md:text-sm font-mono uppercase tracking-wide flex overflow-x-auto no-scrollbar">
      {links.map((link) => (
        <a
          key={link}
          href={`#${link.toLowerCase().replace(' ', '-')}`}
          onClick={() => setActive(link)}
          className={`flex-shrink-0 px-6 py-4 border-r border-black hover:bg-[#80FF80] transition-colors ${active === link ? 'bg-[#80FF80]' : ''}`}
        >
          {link}
        </a>
      ))}
    </nav>
  );
};

const Hero = () => (
  <section className="bg-[#111111] text-white relative overflow-hidden min-h-[90vh] flex flex-col justify-center border-b border-black">
    {/* Dot Grid Background */}
    <div className="absolute inset-0 opacity-20" 
         style={{ backgroundImage: 'radial-gradient(#555 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
    </div>

    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[120%] h-[120%] animate-spin-slow">
        <WireframeTorus />
      </div>
    </div>

    <ReportContainer className="relative z-10 py-20">
      <div className="max-w-4xl">
        <div className="border border-white inline-block p-4 mb-8 bg-[#111111]">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.9] tracking-tight">
            THE 2026 <br/>
            AI MINDSET <br/>
            <span className="pl-12 md:pl-24 block">TRANSFORMATION</span>
          </h1>
        </div>
        
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="border border-white p-4 bg-[#111111] max-w-md">
             <p className="text-xl md:text-2xl font-medium uppercase leading-tight">
               REPORT
             </p>
          </div>
          <p className="font-mono text-xs max-w-xs mt-2 opacity-70">
            ИССЛЕДОВАНИЕ НОВЫХ СПОСОБОВ МЫШЛЕНИЯ И ВЗАИМОДЕЙСТВИЯ С ИСКУССТВЕННЫМ ИНТЕЛЛЕКТОМ.
          </p>
        </div>
      </div>
    </ReportContainer>

    {/* Marquee Footer */}
    <div className="absolute bottom-0 left-0 right-0 border-t border-white bg-[#F3F1EC] text-black py-2 overflow-hidden font-mono text-xs uppercase">
      <div className="whitespace-nowrap animate-marquee">
        AI MINDSET LAB [ 2026 ] ↓ BROUGHT TO YOU BY AI MINDSET ↓ THE TRANSFORMATION REPORT [ 2026 ] ↓ BROUGHT TO YOU BY AI MINDSET ↓
      </div>
    </div>
  </section>
);

const Intro = () => (
  <section id="intro" className="bg-[#F3F1EC] text-black py-24 border-b border-black">
    <ReportContainer>
      <div className="flex justify-between items-start mb-12">
        <div className="w-4 h-4 bg-black rounded-sm"></div>
        <div className="w-4 h-4 bg-black rounded-sm"></div>
      </div>

      <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.95] mb-16">
        The end of an era: <br/>
        Prompt engineering <br/>
        as we know it is <br/>
        <span className="relative inline-block">
          dead
          <span className="absolute top-1/2 left-0 w-full h-2 bg-black -translate-y-1/2"></span>
        </span>
      </h2>

      <div className="grid md:grid-cols-2 gap-12 text-lg md:text-xl leading-relaxed max-w-5xl">
        <p>
          В эволюции «тренды» описывают постепенные адаптации. Но некоторые сдвиги настолько значительны, что навсегда меняют траекторию вида.
        </p>
        <p>
          Мы задокументировали этот сдвиг. AI больше не просто инструмент — это новая операционная система мышления. Чтобы выжить, нужно адаптироваться.
        </p>
      </div>

      <div className="mt-24">
        <h3 className="text-4xl md:text-5xl font-medium leading-tight mb-8">
          To reflect this new reality, <br/>
          we've decided to disrupt our own <br/>
          <span className="relative inline-block mr-4">
            Course Format.
            <span className="absolute top-1/2 left-0 w-full h-1 bg-black -translate-y-1/2"></span>
          </span>
        </h3>
        
        <div className="text-4xl md:text-5xl font-medium leading-tight">
          In its place, we're launching the <br/>
          <span className="bg-[#80FF80] px-2">AI Mindset</span> <br/>
          <span className="bg-[#80FF80] px-2">Transformation Lab.</span>
        </div>
      </div>
    </ReportContainer>
  </section>
);

const DataSection = () => (
  <section id="chapter-1" className="bg-[#111111] text-white py-24 border-b border-black relative">
    <div className="absolute inset-0 opacity-20" 
         style={{ backgroundImage: 'radial-gradient(#555 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
    </div>
    
    <ReportContainer className="relative z-10">
      <h2 className="text-5xl md:text-7xl font-medium mb-4">Who we train</h2>
      <div className="border-b border-white/30 pb-12 mb-12 font-mono text-sm opacity-70">
        Мы опросили более 2,000 профессионалов из tech, finance, ecommerce и healthcare.
      </div>

      <div className="space-y-8">
        {[
          { label: "ASSOCIATE (JUNIOR / MID)", val: "10%" },
          { label: "MANAGER / TEAM LEAD", val: "68%" },
          { label: "DIRECTOR / FOUNDER", val: "22%" }
        ].map((item, i) => (
          <div key={i} className="relative">
            <div className="flex justify-between items-end mb-2 font-mono text-xs uppercase tracking-wider z-10 relative mix-blend-difference">
              <span>{item.label}</span>
            </div>
            <div className="h-16 md:h-24 bg-[#F3F1EC] relative flex items-center px-4 overflow-hidden group">
              <div 
                className="absolute top-0 left-0 h-full bg-[#80FF80] transition-all duration-1000 ease-out"
                style={{ width: item.val }}
              ></div>
              <span className="relative z-10 text-4xl md:text-6xl font-mono text-black font-bold mix-blend-multiply">
                {item.val}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ReportContainer>
  </section>
);

const ProgramChapters = () => (
  <section id="chapter-2" className="bg-[#F3F1EC] text-black py-24 border-b border-black">
    <ReportContainer>
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <h2 className="text-4xl font-medium sticky top-24">
            The Transformation <br/> Roadmap
          </h2>
        </div>
        <div className="md:col-span-8">
          {[
            { title: "PROMPT ENGINEERING", desc: "Chain-of-Thought, Few-Shot, Custom GPTs.", week: "01" },
            { title: "CONTEXT ENGINEERING", desc: "Obsidian + MCP + Claude. Building a Second Brain.", week: "02" },
            { title: "MIND ENGINEERING", desc: "AI Coaching, Reflection, Mental Models.", week: "03" },
            { title: "LIFE ENGINEERING", desc: "Vibe-coding, Prototyping, Deployment.", week: "04" }
          ].map((chapter, i) => (
            <div key={i} className="border-t border-black py-8 group hover:bg-white transition-colors cursor-default">
              <div className="flex justify-between items-baseline mb-4">
                <span className="font-mono text-sm bg-black text-white px-2 py-1">CHAPTER {chapter.week}</span>
                <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-3xl md:text-5xl font-medium mb-2 group-hover:text-[#00AA00] transition-colors">
                {chapter.title}
              </h3>
              <p className="font-mono text-sm uppercase opacity-70">
                {chapter.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ReportContainer>
  </section>
);

const Tracks = () => (
  <section id="chapter-3" className="bg-[#111111] text-white py-24 border-b border-black">
    <ReportContainer>
      <h2 className="text-5xl md:text-7xl font-medium mb-16 text-center">Advanced Tracks</h2>
      
      <div className="grid md:grid-cols-2 gap-px bg-white/20 border border-white/20">
        {[
          { title: "AI COACHING", sub: "BALANCE & REFLECTION" },
          { title: "AI AGENTS", sub: "AUTONOMOUS SYSTEMS" },
          { title: "VIBE-CODING", sub: "CREATIVE PROGRAMMING" },
          { title: "AI CREATIVE", sub: "GENERATIVE ART" }
        ].map((track, i) => (
          <div key={i} className="bg-[#111111] p-12 hover:bg-[#80FF80] hover:text-black transition-colors group min-h-[300px] flex flex-col justify-between">
            <div className="font-mono text-xs uppercase border border-current self-start px-2 py-1 rounded-full">
              TRACK 0{i+1}
            </div>
            <div>
              <h3 className="text-4xl font-medium mb-2">{track.title}</h3>
              <p className="font-mono text-xs uppercase tracking-widest opacity-70 group-hover:opacity-100">
                {track.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ReportContainer>
  </section>
);

const Pricing = () => (
  <section id="chapter-4" className="bg-[#F3F1EC] text-black py-24">
    <ReportContainer>
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-medium mb-6">Join the Lab</h2>
        <p className="font-mono text-sm uppercase max-w-md mx-auto">
          Выберите свой уровень доступа к трансформации.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {[
          { name: "MAIN LAB", price: "€590", type: "ACCESS" },
          { name: "ADVANCED", price: "€890", type: "FULL STACK", highlight: true },
          { name: "PREMIUM", price: "€1,490", type: "LIMITED" }
        ].map((plan, i) => (
          <div key={i} className={`border border-black p-8 flex flex-col justify-between min-h-[400px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow ${plan.highlight ? 'bg-[#80FF80]' : 'bg-white'}`}>
            <div>
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-bold uppercase">{plan.name}</h3>
                <span className="font-mono text-xs border border-black px-2 py-1">{plan.type}</span>
              </div>
              <div className="text-5xl font-medium mb-4 tracking-tighter">
                {plan.price}
              </div>
              <ul className="font-mono text-xs space-y-2 uppercase opacity-80">
                <li>+ 4 Live Workshops</li>
                <li>+ Coworking Access</li>
                <li>+ Community Chat</li>
                {plan.highlight && <li>+ 4 Advanced Tracks</li>}
                {plan.name === 'PREMIUM' && <li>+ 1:1 Mentorship</li>}
              </ul>
            </div>
            <a href="https://join.aimindset.org/context" className="mt-8 block w-full py-4 border border-black text-center font-bold uppercase hover:bg-black hover:text-white transition-colors">
              Select Plan
            </a>
          </div>
        ))}
      </div>
    </ReportContainer>
  </section>
);

const Footer = () => (
  <footer className="bg-[#111111] text-white py-12 border-t border-white/20 font-mono text-xs uppercase">
    <ReportContainer>
      <div className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <div className="text-2xl font-medium mb-4">AI MINDSET LAB</div>
          <p className="opacity-50 max-w-xs">
            © 2026. Designed with Transformation Report principles.
          </p>
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-[#80FF80]">Telegram</a>
          <a href="#" className="hover:text-[#80FF80]">YouTube</a>
          <a href="#" className="hover:text-[#80FF80]">Legal</a>
        </div>
      </div>
    </ReportContainer>
  </footer>
);

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-[#F3F1EC] text-black font-sans selection:bg-[#80FF80] selection:text-black">
      <StickyNav />
      <main>
        <Hero />
        <Intro />
        <DataSection />
        <ProgramChapters />
        <Tracks />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
