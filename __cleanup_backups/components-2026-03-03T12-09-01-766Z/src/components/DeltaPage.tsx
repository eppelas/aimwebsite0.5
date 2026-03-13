import React from 'react';

// --- SVG Patterns & Assets ---

const FingerprintPattern = () => (
  <svg className="hidden">
    <defs>
      <pattern id="fingerprint" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M0,10 Q5,0 10,10 T20,10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M0,20 Q5,10 10,20 T20,20" fill="none" stroke="currentColor" strokeWidth="2" />
      </pattern>
      
      <filter id="displacement">
        <feTurbulence type="turbulence" baseFrequency="0.01" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
      </filter>
    </defs>
  </svg>
);

const OrganicShape = ({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <div className={`absolute pointer-events-none ${className}`} style={style}>
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <path 
        d="M45.7,-76.3C58.9,-69.3,69.1,-57.6,76.3,-44.6C83.5,-31.6,87.7,-17.3,86.4,-3.5C85.1,10.3,78.3,23.6,69.5,35.4C60.7,47.2,49.9,57.5,37.8,65.3C25.7,73.1,12.3,78.4,-0.6,79.4C-13.5,80.4,-26.5,77.1,-38.4,70.2C-50.3,63.3,-61.1,52.8,-69.6,40.6C-78.1,28.4,-84.3,14.5,-83.8,0.8C-83.3,-12.9,-76.1,-26.4,-66.6,-37.8C-57.1,-49.2,-45.3,-58.5,-32.9,-65.9C-20.5,-73.3,-7.5,-78.8,3.8,-84.8C15.1,-90.8,32.5,-97.3,45.7,-76.3Z" 
        transform="translate(100 100)" 
        fill="currentColor"
      />
    </svg>
  </div>
);

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-full max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 ${className}`}>
    {children}
  </div>
);

// --- Components ---

const Hero = () => (
  <section className="min-h-screen bg-[#FDFBF7] relative overflow-hidden flex flex-col justify-center">
    {/* Abstract Background Composition */}
    <div className="absolute inset-0 pointer-events-none">
      {/* Large Red Organic Shape */}
      <OrganicShape className="text-[#E63946] w-[150vh] h-[150vh] -top-[20%] -right-[20%] opacity-90" />
      
      {/* Pink Overlay Shape */}
      <div className="absolute top-0 right-0 w-full h-full mix-blend-multiply opacity-80">
         <OrganicShape className="text-[#FF69B4] w-[100vh] h-[100vh] top-[10%] right-[10%]" />
      </div>
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1h2v2H1V1zm4 0h2v2H5V1zm4 0h2v2H9V1zm4 0h2v2h-2V1zm4 0h2v2h-2V1zM1 5h2v2H1V5zm4 0h2v2H5V5zm4 0h2v2H9V5zm4 0h2v2h-2V5zm4 0h2v2h-2V5zM1 9h2v2H1V9zm4 0h2v2H5V9zm4 0h2v2H9V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9zM1 13h2v2H1v-2zm4 0h2v2H5v-2zm4 0h2v2H9v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM1 17h2v2H1v-2zm4 0h2v2H5v-2zm4 0h2v2H9v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z\' fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }}></div>
    </div>

    <Container>
      <div className="relative">
        <div className="font-bold text-xs md:text-sm tracking-[0.3em] uppercase mb-4 ml-2">
          o ver <br/>
          <span className="ml-8">deliver</span>
        </div>
        
        <h1 className="text-[15vw] leading-[0.8] font-black tracking-widest mix-blend-hard-light text-[#1a1a1a] select-none">
          <span className="block">D E L</span>
          <span className="block ml-[15vw]">T A</span>
        </h1>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none">
           <span className="text-xl md:text-3xl font-mono bg-white text-black px-4 py-1 inline-block transform -rotate-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
             AI MINDSET LAB W26
           </span>
        </div>
      </div>
    </Container>
    
    <div className="absolute bottom-12 left-0 w-full border-t-2 border-black">
      <div className="flex justify-between px-6 py-2 font-mono text-xs uppercase font-bold">
        <span>Batch: Winter 26</span>
        <span>Applications: Closed</span>
        <span>Waitlist: Open</span>
      </div>
    </div>
  </section>
);

const Philosophy = () => (
  <section className="py-32 bg-[#FDFBF7] text-black relative overflow-hidden">
    <Container>
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative z-10">
          <h2 className="text-6xl md:text-8xl font-black mb-8 leading-none">
            MIND <br/> SET
          </h2>
          <div className="text-lg md:text-xl font-medium leading-relaxed space-y-6 border-l-4 border-[#E63946] pl-8">
            <p>
              Технологии меняются. <br/>
              Новый способ мышления остаётся.
            </p>
            <p>
              Мы создаём пространство, где практика встроена в процесс. 
              Каждая неделя — это эксперимент с реальными задачами.
            </p>
          </div>
        </div>
        
        <div className="relative h-[600px] w-full">
          <div className="absolute inset-0 bg-[#E63946] rounded-full mix-blend-multiply opacity-80 animate-blob"></div>
          <div className="absolute inset-0 bg-[#FF69B4] rounded-full mix-blend-multiply opacity-80 animate-blob animation-delay-2000 ml-12 mt-12"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-white font-mono text-center transform rotate-90 md:rotate-0">
               <span className="block text-9xl font-black opacity-50">01</span>
               <span className="block text-sm tracking-[0.5em] uppercase">Philosophy</span>
             </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

const Program = () => (
  <section className="py-32 bg-[#1a1a1a] text-[#FDFBF7]">
    <Container>
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-[#FDFBF7]/20 pb-8">
        <h2 className="text-5xl md:text-7xl font-black uppercase">
          The <br/> Path
        </h2>
        <div className="font-mono text-sm text-[#E63946] uppercase tracking-widest mb-2">
          4 Weeks of Transformation
        </div>
      </div>

      <div className="space-y-16">
        {[
          { id: "01", title: "Prompt Engineering", desc: "AI как интерфейс мышления. Chain-of-Thought." },
          { id: "02", title: "Context Engineering", desc: "Автоматизация и агенты. Obsidian + MCP." },
          { id: "03", title: "Mind Engineering", desc: "Продуктивность и ритуалы. AI-коучинг." },
          { id: "04", title: "Life Engineering", desc: "Творчество и реализация. Vibe-coding." }
        ].map((week, i) => (
          <div key={i} className="group relative">
            <div className="absolute -left-4 md:-left-12 top-0 text-[#E63946] font-black text-8xl opacity-20 group-hover:opacity-100 transition-opacity select-none">
              {week.id}
            </div>
            <div className="relative z-10 pl-12 md:pl-24 pt-8 border-t border-[#FDFBF7]/20 group-hover:border-[#E63946] transition-colors">
              <h3 className="text-3xl md:text-5xl font-bold uppercase mb-4">{week.title}</h3>
              <p className="font-mono text-sm md:text-base opacity-70 max-w-xl group-hover:text-[#FF69B4] transition-colors">
                {week.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const Tracks = () => (
  <section className="py-32 bg-[#E63946] text-[#FDFBF7] relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0,40 L40,0" stroke="white" strokeWidth="2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lines)" />
      </svg>
    </div>

    <Container>
      <h2 className="text-center text-4xl md:text-6xl font-black uppercase mb-24 bg-white text-[#E63946] inline-block px-8 py-4 transform -rotate-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        Advanced Tracks
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {[
          { title: "Coaching", sub: "Balance & Reflection" },
          { title: "Agents", sub: "Autonomous Systems" },
          { title: "Coding", sub: "Vibe-Coding" },
          { title: "Creative", sub: "Art & Music" }
        ].map((track, i) => (
          <div key={i} className="bg-[#FDFBF7] text-black p-8 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF69B4] rounded-full mix-blend-multiply filter blur-2xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
            
            <div className="relative z-10">
              <div className="text-xs font-bold uppercase tracking-widest mb-2 text-[#E63946]">Track 0{i+1}</div>
              <h3 className="text-4xl font-black uppercase mb-4">{track.title}</h3>
              <p className="font-mono text-sm border-t-2 border-black pt-4 inline-block">
                {track.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const Pricing = () => (
  <section className="py-32 bg-[#FDFBF7] text-black">
    <Container>
      <div className="text-center mb-20">
        <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-[#E63946] opacity-20 absolute left-0 right-0 -mt-12 select-none">
          JOIN US
        </h2>
        <h2 className="text-4xl md:text-6xl font-black uppercase relative z-10">
          Select Your <br/> Level
        </h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 items-start">
        {[
          { name: "Base", price: "590", color: "bg-white" },
          { name: "Advanced", price: "890", color: "bg-[#FF69B4]", highlight: true },
          { name: "Premium", price: "1490", color: "bg-white" }
        ].map((plan, i) => (
          <div key={i} className={`border-4 border-black p-8 ${plan.color} ${plan.highlight ? 'transform md:-translate-y-8 shadow-[12px_12px_0px_0px_#E63946]' : 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'}`}>
            <h3 className="text-2xl font-black uppercase mb-4">{plan.name}</h3>
            <div className="text-5xl font-black mb-8">€{plan.price}</div>
            
            <ul className="space-y-4 font-mono text-sm mb-12">
              <li className="flex items-center gap-3">
                <span className="w-4 h-4 bg-black block"></span> 4 Weeks
              </li>
              <li className="flex items-center gap-3">
                <span className="w-4 h-4 bg-black block"></span> Community
              </li>
              <li className="flex items-center gap-3">
                <span className="w-4 h-4 bg-black block"></span> Materials
              </li>
              {plan.highlight && (
                <li className="flex items-center gap-3 font-bold">
                  <span className="w-4 h-4 bg-[#E63946] block"></span> + 4 Tracks
                </li>
              )}
            </ul>

            <a href="https://join.aimindset.org/context" className="block w-full bg-black text-white text-center font-bold uppercase py-4 hover:bg-[#E63946] transition-colors">
              Apply Now
            </a>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const Footer = () => (
  <footer className="bg-[#1a1a1a] text-[#FDFBF7] py-20 border-t-8 border-[#E63946]">
    <Container>
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        <div>
          <h2 className="text-4xl font-black uppercase mb-4">
            AI Mindset Lab
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest opacity-60 max-w-xs">
            From chaos of prompts to a personal operating system.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-12 font-mono text-sm">
          <div className="flex flex-col gap-4">
            <a href="#" className="hover:text-[#FF69B4] transition-colors">Telegram</a>
            <a href="#" className="hover:text-[#FF69B4] transition-colors">YouTube</a>
          </div>
          <div className="flex flex-col gap-4">
            <a href="#" className="hover:text-[#FF69B4] transition-colors">Legal</a>
            <a href="#" className="hover:text-[#FF69B4] transition-colors">Privacy</a>
          </div>
        </div>
      </div>
      
      <div className="mt-20 pt-8 border-t border-[#FDFBF7]/20 text-center font-mono text-xs opacity-40">
        © 2026. BATCH W26.
      </div>
    </Container>
  </footer>
);

export default function DeltaPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1a1a1a] font-sans selection:bg-[#FF69B4] selection:text-white">
      <FingerprintPattern />
      <main>
        <Hero />
        <Philosophy />
        <Program />
        <Tracks />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
