import React from 'react';

// --- Components ---

const SectionLabel = ({ text }: { text: string }) => (
  <div className="font-sans text-[10px] uppercase tracking-widest mb-2 text-gray-500">
    {text}
  </div>
);

const ArtCard = ({ 
  series, 
  title, 
  year, 
  desc, 
  img, 
  hasDiagonal = false 
}: { 
  series: string; 
  title: string; 
  year: string; 
  desc: string; 
  img?: string;
  hasDiagonal?: boolean;
}) => (
  <div className="relative h-full flex flex-col justify-between p-6 md:p-8 border-r border-black last:border-r-0 min-h-[500px] group overflow-hidden">
    {hasDiagonal && (
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
        <line x1="0" y1="100%" x2="100%" y2="0" stroke="black" strokeWidth="1" />
      </svg>
    )}
    
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-8">
        <SectionLabel text={series} />
        <span className="text-xl font-light">+</span>
      </div>
      
      {img && (
        <div className="mb-8 overflow-hidden aspect-[3/4] relative">
          <img 
            src={img} 
            alt={title} 
            className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-red-600 mix-blend-multiply opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
        </div>
      )}
    </div>

    <div className="relative z-10 mt-auto bg-white/80 backdrop-blur-sm p-2 -mx-2 rounded-sm">
      <h3 className="text-4xl font-sans font-normal leading-none mb-2">{title}</h3>
      <div className="flex justify-between items-end">
        <p className="font-serif text-sm italic max-w-[70%] leading-tight text-gray-600">
          {desc}
        </p>
        <span className="font-mono text-xs font-bold">{year}</span>
      </div>
    </div>
  </div>
);

const RedSphere = () => (
  <div className="w-32 h-32 rounded-full bg-red-600 mix-blend-multiply filter blur-sm animate-pulse"></div>
);

// --- Sections ---

const Header = () => (
  <header className="sticky top-0 z-50 bg-white border-b border-black flex justify-between items-center px-4 md:px-8 h-16">
    <div className="text-2xl font-sans font-normal tracking-tight">
      Olga Minina <span className="text-gray-400 mx-2">/</span> AI Mindset
    </div>
    <div className="flex gap-8 font-mono text-xs uppercase tracking-widest">
      <span className="hidden md:inline">[ About ]</span>
      <span>[ Series ]</span>
      <span>[ CV ]</span>
    </div>
  </header>
);

const Hero = () => (
  <section className="border-b border-black grid md:grid-cols-2">
    <div className="p-8 md:p-16 flex flex-col justify-between border-r border-black min-h-[60vh]">
      <div>
        <SectionLabel text="Digital Series" />
        <h1 className="text-6xl md:text-8xl font-sans font-normal leading-[0.9] tracking-tight mt-4">
          Panopticon:<br/>
          Living Worlds
        </h1>
      </div>
      <div className="max-w-md mt-12">
        <p className="font-serif text-lg leading-relaxed text-gray-800">
          Лаборатория нового мышления в эпоху AI. От хаоса промптов к персональной операционной системе.
          Batch Winter 26.
        </p>
      </div>
    </div>
    <div className="relative overflow-hidden bg-gray-100">
      <img 
        src="https://images.unsplash.com/photo-1507842217121-9e6915d09ef3?q=80&w=2670&auto=format&fit=crop" 
        alt="Hero Art" 
        className="w-full h-full object-cover grayscale contrast-125"
      />
      <div className="absolute bottom-8 left-8 bg-white px-4 py-2 border border-black font-mono text-xs uppercase">
        The Series Includes Video, Print Graphics
      </div>
    </div>
  </section>
);

const GalleryGrid = () => (
  <section className="border-b border-black">
    <div className="grid md:grid-cols-3">
      <ArtCard 
        series="Week 01"
        title="Prompt"
        year="2026"
        desc="AI как интерфейс мышления. Chain-of-Thought, Few-Shot Learning."
        img="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2670&auto=format&fit=crop"
      />
      <ArtCard 
        series="Week 02"
        title="Context"
        year="2026"
        desc="Автоматизация и агенты. Obsidian + MCP + Claude."
        img="https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=2669&auto=format&fit=crop"
      />
      <div className="relative border-r border-black last:border-r-0 p-8 flex flex-col justify-between bg-gray-50">
        <div className="absolute top-0 right-0 w-[150%] h-[1px] bg-black origin-top-left rotate-45 transform translate-x-[-20%] pointer-events-none"></div>
        
        <div>
           <SectionLabel text="Collaborations" />
           <ul className="mt-8 space-y-4 font-sans text-2xl">
             <li className="flex items-center gap-2 group cursor-pointer">
               Sintezia <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
             </li>
             <li className="flex items-center gap-2 group cursor-pointer">
               Yandex <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
             </li>
             <li className="flex items-center gap-2 group cursor-pointer">
               Garage <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
             </li>
           </ul>
        </div>

        <div className="text-right mt-12">
          <h3 className="text-4xl font-sans mb-2">Zine:</h3>
          <p className="font-serif italic text-sm text-gray-600">
            A collection of artifacts generated during the lab.
          </p>
          <div className="mt-4 font-mono text-xs uppercase">MMOMA ↗</div>
        </div>
      </div>
    </div>
    
    <div className="grid md:grid-cols-3 border-t border-black">
      <ArtCard 
        series="Week 03"
        title="Mind"
        year="2026"
        desc="Продуктивность и ритуалы. AI для коучинга и рефлексии."
        img="https://images.unsplash.com/photo-1531303435785-3853ba035cda?q=80&w=2670&auto=format&fit=crop"
      />
      <ArtCard 
        series="Week 04"
        title="Life"
        year="2026"
        desc="Творчество и реализация. Vibe-coding с Cursor."
        img="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop"
      />
      <div className="p-8 flex flex-col justify-center items-center border-r border-black last:border-r-0 relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 flex items-center justify-center opacity-50">
           <RedSphere />
        </div>
        <div className="relative z-10 text-center">
          <SectionLabel text="Art Series" />
          <h3 className="text-5xl font-sans mb-4">Red Souls</h3>
          <p className="font-serif italic text-sm max-w-xs mx-auto text-gray-300">
            Series of paintings and ceramics that explores the soul as something fragile.
          </p>
          <div className="mt-8 font-mono text-xs">Available</div>
        </div>
      </div>
    </div>
  </section>
);

const ListSection = () => (
  <section className="grid md:grid-cols-2 border-b border-black">
    <div className="p-8 md:p-16 border-r border-black">
      <SectionLabel text="Schedule / Exhibitions" />
      <ul className="mt-8 space-y-6 font-sans text-lg">
        {[
          { year: "2026", title: "Start of Lab", loc: "Online" },
          { year: "2026", title: "Prompt Engineering Workshop", loc: "Zoom" },
          { year: "2026", title: "Context Architecture Review", loc: "Notion" },
          { year: "2026", title: "Mindset Transformation", loc: "Obsidian" },
          { year: "2026", title: "Final Demo Day", loc: "Worldwide" },
        ].map((item, i) => (
          <li key={i} className="flex gap-4 group cursor-pointer">
            <span className="font-mono text-xs font-bold pt-1">{item.year}</span>
            <span className="group-hover:underline decoration-1 underline-offset-4">{item.title}, <span className="text-gray-500 italic">{item.loc}</span></span>
          </li>
        ))}
      </ul>
    </div>
    
    <div className="relative">
      <img 
        src="https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?q=80&w=2535&auto=format&fit=crop" 
        alt="Texture" 
        className="w-full h-full object-cover opacity-50 grayscale"
      />
      <div className="absolute inset-0 flex items-center justify-center">
         <div className="bg-white p-8 border border-black max-w-xs shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <SectionLabel text="Pricing" />
            <div className="text-4xl font-sans mb-2">€590</div>
            <div className="font-serif italic text-sm mb-6">Base participation. Includes all main workshops and community access.</div>
            <a href="https://join.aimindset.org/context" className="block w-full bg-black text-white text-center py-3 font-mono text-xs uppercase hover:bg-red-600 transition-colors">
              Apply Now
            </a>
         </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="p-8 md:p-12 flex justify-between items-end">
    <div className="font-mono text-xs uppercase text-gray-500 max-w-xs">
      Site Design by Olga Minina<br/>
      © 2025. All rights reserved. By using this site you agree to our Privacy Policy.
    </div>
    <div className="text-4xl md:text-6xl font-sans font-light">
      Eng / <span className="font-normal">Ru</span>
    </div>
  </footer>
);

export default function GalleryMinimalPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-red-600 selection:text-white">
      <div className="max-w-[1600px] mx-auto border-x border-black">
        <Header />
        <main>
          <Hero />
          <GalleryGrid />
          <ListSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
