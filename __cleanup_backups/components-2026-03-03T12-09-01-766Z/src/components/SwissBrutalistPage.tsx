import React from 'react';

// --- Components ---

const Marquee = ({ children, direction = 'left', speed = 20 }: { children: React.ReactNode; direction?: 'left' | 'right'; speed?: number }) => (
  <div className="overflow-hidden whitespace-nowrap flex">
    <div className={`flex animate-marquee ${direction === 'right' ? 'animate-marquee-reverse' : ''}`} style={{ animationDuration: `${speed}s` }}>
      {children}
      {children}
      {children}
      {children}
    </div>
  </div>
);

const BigType = ({ text, className = "" }: { text: string; className?: string }) => (
  <h1 className={`font-sans font-bold text-[15vw] leading-[0.8] tracking-tighter uppercase ${className}`}>
    {text}
  </h1>
);

const ProjectCard = ({ title, year, tags, image }: { title: string; year: string; tags: string[]; image: string }) => (
  <div className="border-t border-white/20 pt-4 pb-12 group cursor-pointer">
    <div className="flex justify-between items-baseline mb-4 text-xs md:text-sm font-mono uppercase opacity-60 group-hover:opacity-100 transition-opacity">
      <span>{year}</span>
      <div className="flex gap-4">
        {tags.map((tag, i) => <span key={i}>{tag}</span>)}
      </div>
    </div>
    
    <h3 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 group-hover:italic transition-all duration-500">
      {title}
    </h3>
    
    <div className="relative overflow-hidden aspect-video bg-[#1a1a1a]">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-red-600 mix-blend-multiply opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
    </div>
  </div>
);

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-8 flex justify-between items-start mix-blend-difference text-white">
    <div className="font-bold text-xl tracking-tighter">
      AI/ML
    </div>
    <nav className="flex flex-col md:flex-row gap-1 md:gap-8 text-sm font-mono uppercase text-right">
      <a href="#" className="hover:text-red-500 transition-colors">Projects</a>
      <a href="#" className="hover:text-red-500 transition-colors">About</a>
      <a href="https://join.aimindset.org/context" className="hover:text-red-500 transition-colors">Contact</a>
    </nav>
  </header>
);

// --- Sections ---

const Hero = () => (
  <section className="min-h-screen bg-black text-[#E6E6E6] flex flex-col justify-center pt-24 pb-12 px-4 md:px-8 relative overflow-hidden">
    {/* Abstract Logo Mark */}
    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40vw] h-[40vw] border-[20px] border-[#E6E6E6] rounded-full opacity-10 blur-3xl pointer-events-none"></div>
    
    <div className="relative z-10">
      <div className="flex flex-col md:flex-row items-baseline">
        <BigType text="AI" className="italic mr-8" />
        <BigType text="MIND" />
      </div>
      <div className="flex justify-end">
        <BigType text="SET" />
      </div>
      <div className="flex items-center gap-8 mt-4 md:-mt-8">
        <div className="w-24 h-24 md:w-48 md:h-48 bg-[#E6E6E6] rounded-full animate-pulse"></div>
        <BigType text="LAB" className="text-red-600 mix-blend-difference" />
      </div>
    </div>

    <div className="absolute bottom-8 left-4 md:left-8 right-4 md:right-8 flex justify-between items-end font-mono text-xs md:text-sm uppercase">
      <div className="max-w-xs">
        www.aimindset.org<br/>
        Alexander Povalyaev<br/>
        _MOSCOW_ONLINE_WORLD
      </div>
      <div className="text-right">
        AI_creative<br/>
        freelance_mindset<br/>
        laboratory
      </div>
      <div className="hidden md:block text-red-600">
        join(at)aimindset.org
      </div>
    </div>
  </section>
);

const Services = () => (
  <section className="bg-[#E6E6E6] text-black py-24 px-4 md:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 mb-32">
        <div className="text-2xl md:text-4xl font-medium leading-tight tracking-tight">
          Ciao! I'm Alexander, a creative AI Architect driven by a refined aesthetic sense and a genuine passion that fuels my energy in every project.
        </div>
        <div className="flex flex-col justify-between items-end">
          <div className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.8] text-right mb-8">
            OPEN FOR<br/>
            COLLAB<br/>
            ORATIONS
          </div>
          <div className="w-12 h-12 bg-red-600 rotate-45"></div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-mono uppercase mb-12 border-b border-black pb-2">Services</h2>
        <div className="text-4xl md:text-7xl font-bold leading-[0.9] tracking-tight space-y-2">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 bg-red-600"></div>
            <span>Prompt Engineering</span>
          </div>
          <div className="pl-12 md:pl-24">_Context Architecture</div>
          <div className="pl-4 md:pl-8">_Mindset Transformation</div>
          <div className="pl-16 md:pl-32 text-red-600">_Life Design</div>
          <div className="pl-8 md:pl-16">_Creative Direction</div>
          <div className="pl-20 md:pl-40">_AI Visual Art</div>
        </div>
      </div>
    </div>
  </section>
);

const Projects = () => (
  <section className="bg-black text-[#E6E6E6] py-24 px-4 md:px-8">
    <div className="mb-16 flex items-end gap-4">
      <h2 className="text-sm font-mono uppercase">_Selected Works</h2>
      <div className="h-[1px] flex-grow bg-[#E6E6E6] opacity-20"></div>
    </div>

    <div className="grid md:grid-cols-2 gap-x-8 gap-y-24">
      <ProjectCard 
        title="Prompt Eng." 
        year="2026" 
        tags={['Education', 'AI', 'System']} 
        image="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
      />
      <ProjectCard 
        title="Context Arch." 
        year="2026" 
        tags={['Obsidian', 'Automation', 'Workflow']} 
        image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
      />
      <ProjectCard 
        title="Mindset Shift" 
        year="2025" 
        tags={['Psychology', 'Growth', 'Future']} 
        image="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop"
      />
      <ProjectCard 
        title="Life Design" 
        year="2025" 
        tags={['Strategy', 'Personal', 'Vision']} 
        image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
      />
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#E6E6E6] text-black py-24 px-4 md:px-8 overflow-hidden">
    <Marquee speed={15}>
      <span className="text-[15vw] font-bold tracking-tighter mx-8">JOIN THE LAB</span>
      <span className="text-[15vw] font-bold tracking-tighter mx-8 text-transparent stroke-black" style={{ WebkitTextStroke: '2px black' }}>WINTER 26</span>
    </Marquee>
    
    <div className="mt-24 flex flex-col md:flex-row justify-between items-end border-t border-black pt-8">
      <div className="font-mono text-sm uppercase space-y-1">
        <a href="#" className="block hover:text-red-600">Instagram</a>
        <a href="#" className="block hover:text-red-600">Telegram</a>
        <a href="#" className="block hover:text-red-600">LinkedIn</a>
      </div>
      
      <div className="text-right mt-8 md:mt-0">
        <a href="https://join.aimindset.org/context" className="text-4xl md:text-6xl font-bold hover:italic transition-all">
          Apply Now &rarr;
        </a>
      </div>
    </div>
  </footer>
);

export default function SwissBrutalistPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
