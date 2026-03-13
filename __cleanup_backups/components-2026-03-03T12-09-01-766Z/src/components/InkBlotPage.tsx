import React from 'react';

// --- Assets & Styles ---

const InkFilters = () => (
  <style>{`
    .ink-texture {
      filter: contrast(150%) brightness(100%) grayscale(100%);
      mix-blend-mode: multiply;
    }
    .ink-bg {
      background-image: url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop');
      background-size: cover;
      filter: grayscale(100%) contrast(120%) brightness(150%);
    }
    .grain {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 50;
      opacity: 0.05;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }
  `}</style>
);

// --- Components ---

const NavItem = ({ text }: { text: string }) => (
  <span className="font-mono text-xs uppercase tracking-widest text-gray-500 hover:text-black cursor-pointer transition-colors">
    [ {text} ]
  </span>
);

const SectionHeader = ({ title, sup }: { title: string; sup?: string }) => (
  <div className="flex items-start gap-2 mb-12">
    <h2 className="text-5xl md:text-7xl font-sans font-normal tracking-tight">{title}</h2>
    {sup && <span className="font-mono text-xs uppercase mt-2 text-gray-500">[ {sup} ]</span>}
  </div>
);

const ArtCard = ({ title, subtitle, desc, img, year }: { title: string; subtitle: string; desc: string; img: string; year: string }) => (
  <div className="group relative flex flex-col h-full border-t border-black/10 pt-4 pb-12">
    <div className="absolute top-4 right-0 text-xl font-light">+</div>
    
    <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-gray-100">
      <img 
        src={img} 
        alt={title} 
        className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      {/* Ink Overlay on Hover */}
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply"></div>
    </div>

    <div className="mt-auto">
      <div className="font-mono text-xs text-gray-500 mb-2">{year} — {subtitle}</div>
      <h3 className="text-3xl font-sans font-normal leading-none mb-4">{title}</h3>
      <p className="font-mono text-xs uppercase leading-relaxed max-w-[80%] text-gray-600">
        {desc}
      </p>
    </div>
  </div>
);

// --- Sections ---

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-40 p-6 md:p-12 flex justify-between items-start mix-blend-multiply pointer-events-none">
    <h1 className="text-4xl md:text-6xl font-sans font-normal tracking-tight pointer-events-auto">
      AI Mindset<br/>Lab W26
    </h1>
    <nav className="flex gap-4 md:gap-8 pointer-events-auto">
      <NavItem text="ABOUT" />
      <NavItem text="PROGRAM" />
      <NavItem text="PRICING" />
    </nav>
  </header>
);

const Hero = () => (
  <section className="min-h-screen relative flex items-center justify-center overflow-hidden pt-32 pb-24 px-6 md:px-12">
    {/* Abstract Ink Background */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <img 
        src="https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?q=80&w=2535&auto=format&fit=crop" 
        alt="Ink Texture" 
        className="absolute top-[-20%] left-[-20%] w-[80%] opacity-20 mix-blend-multiply filter blur-xl"
      />
      <img 
        src="https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?q=80&w=2535&auto=format&fit=crop" 
        alt="Ink Texture" 
        className="absolute bottom-[-10%] right-[-10%] w-[70%] opacity-30 mix-blend-multiply filter blur-sm transform rotate-180"
      />
    </div>

    <div className="relative z-10 max-w-4xl w-full text-center">
      <div className="aspect-video w-full bg-black mb-12 relative overflow-hidden group">
         <img 
            src="https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2487&auto=format&fit=crop" 
            alt="Abstract AI" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
         />
         <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white font-mono text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                [ Explore The Unknown ]
            </p>
         </div>
      </div>
      
      <p className="font-sans text-2xl md:text-4xl leading-tight">
        Лаборатория нового мышления в эпоху AI. <br/>
        От хаоса промптов к персональной операционной системе.
      </p>
      
      <div className="mt-12 flex justify-center gap-12 font-mono text-xs uppercase text-gray-500">
        <div>Старт: 19 Января</div>
        <div>Финиш: 16 Февраля</div>
      </div>
    </div>
  </section>
);

const Program = () => (
  <section className="py-24 px-6 md:px-12 border-t border-black/10">
    <div className="flex justify-between items-baseline mb-16">
      <SectionHeader title="Program" sup="WEEKS" />
      <div className="hidden md:block font-mono text-xs uppercase text-right">
        Batch: Winter 26<br/>
        Status: Closed
      </div>
    </div>

    <div className="grid md:grid-cols-4 gap-8 border-t border-black">
      <div className="pt-4 md:border-r border-black/10 pr-4">
        <ArtCard 
          year="WEEK 01"
          title="Prompt"
          subtitle="Engineering"
          desc="AI как интерфейс мышления. Chain-of-Thought, Few-Shot Learning, Custom GPTs."
          img="https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?q=80&w=2535&auto=format&fit=crop"
        />
      </div>
      <div className="pt-4 md:border-r border-black/10 pr-4">
        <ArtCard 
          year="WEEK 02"
          title="Context"
          subtitle="Engineering"
          desc="Автоматизация и агенты. Obsidian + MCP + Claude. Интегрированная система знаний."
          img="https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2680&auto=format&fit=crop"
        />
      </div>
      <div className="pt-4 md:border-r border-black/10 pr-4">
        <ArtCard 
          year="WEEK 03"
          title="Mind"
          subtitle="Engineering"
          desc="Продуктивность и ритуалы. AI для коучинга, рефлексии. Трекинг привычек."
          img="https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2487&auto=format&fit=crop"
        />
      </div>
      <div className="pt-4">
        <ArtCard 
          year="WEEK 04"
          title="Life"
          subtitle="Engineering"
          desc="Творчество и реализация. Vibe-coding с Cursor. Прототипы без кода."
          img="https://images.unsplash.com/photo-1507842217121-9e6915d09ef3?q=80&w=2670&auto=format&fit=crop"
        />
      </div>
    </div>
  </section>
);

const Tracks = () => (
  <section className="py-24 px-6 md:px-12 bg-gray-50">
    <div className="grid md:grid-cols-2 gap-12">
      <div>
        <SectionHeader title="Advanced" sup="TRACKS" />
        <div className="space-y-12">
          {[
            { title: "AI Coaching", desc: "Для тех, кто выгорел и ищет баланс. Персональные системы поддержки." },
            { title: "AI Agents", desc: "Автономные AI-системы. Проектирование и запуск агентов." },
            { title: "Vibe-Coding", desc: "Творческое программирование. От идеи до прототипа за часы." },
            { title: "AI Creative", desc: "Для музыкантов и художников. Генерация музыки и визуального контента." }
          ].map((track, i) => (
            <div key={i} className="border-b border-black/20 pb-8 group cursor-pointer">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-2xl font-sans group-hover:italic transition-all">{track.title}</h3>
                <span className="font-mono text-xs">[ + ]</span>
              </div>
              <p className="font-mono text-xs text-gray-500 max-w-md">{track.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative border-l border-black/10 pl-12 hidden md:flex flex-col justify-between">
        {/* Diagonal Line Design Element */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="w-[150%] h-[1px] bg-black origin-top-left rotate-45 transform translate-x-[-20%]"></div>
        </div>

        <div className="text-right">
           <h3 className="text-4xl font-sans mb-4">Collaborations:</h3>
           <ul className="font-sans text-xl space-y-2">
             <li>Sintezia ↗</li>
             <li>Yandex ↗</li>
             <li>Garage ↗</li>
             <li>MMOMA ↗</li>
           </ul>
        </div>

        <div className="text-right mt-auto">
           <h3 className="text-4xl font-sans mb-4">Zine:</h3>
           <p className="font-mono text-sm max-w-xs ml-auto">
             A collection of thoughts, prompts, and artifacts generated during the lab.
           </p>
        </div>
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section className="py-24 px-6 md:px-12 border-t border-black/10">
    <SectionHeader title="Participation" sup="PLANS" />
    
    <div className="grid md:grid-cols-3 gap-0 border border-black/10">
      {[
        { name: "Base", price: "€590", desc: "Main Lab Only" },
        { name: "Advanced", price: "€890", desc: "Main Lab + 4 Tracks" },
        { name: "Premium", price: "€1490", desc: "Personal Strategy" }
      ].map((plan, i) => (
        <div key={i} className="p-8 md:p-12 border-r border-black/10 last:border-r-0 hover:bg-gray-50 transition-colors flex flex-col justify-between min-h-[400px]">
          <div>
            <div className="font-mono text-xs uppercase mb-4">[ 0{i+1} ]</div>
            <h3 className="text-4xl font-sans mb-2">{plan.name}</h3>
            <p className="font-mono text-xs text-gray-500">{plan.desc}</p>
          </div>
          
          <div>
            <div className="text-5xl font-light mb-8">{plan.price}</div>
            <a href="https://join.aimindset.org/context" className="inline-block border border-black px-6 py-3 font-mono text-xs uppercase hover:bg-black hover:text-white transition-colors">
              Apply Now
            </a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 px-6 md:px-12 border-t border-black/10 flex justify-between items-end">
    <div className="font-mono text-xs uppercase text-gray-500">
      Site Design by AI Mindset<br/>
      © 2026. All rights reserved.
    </div>
    <div className="text-4xl md:text-6xl font-sans font-light">
      Eng / <span className="font-normal">Ru</span>
    </div>
  </footer>
);

export default function InkBlotPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans selection:bg-black selection:text-white">
      <InkFilters />
      <div className="grain"></div>
      
      <Header />
      <main>
        <Hero />
        <Program />
        <Tracks />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
