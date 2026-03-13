import React from 'react';

// --- SVG Filters & Textures ---

const OrganicFilters = () => (
  <svg className="hidden">
    <defs>
      {/* Grainy Noise for Background */}
      <filter id="paper-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="linear" slope="0.5" intercept="0.5" />
          <feFuncG type="linear" slope="0.5" intercept="0.5" />
          <feFuncB type="linear" slope="0.5" intercept="0.5" />
        </feComponentTransfer>
      </filter>

      {/* Wavy Distortion for Text */}
      <filter id="liquid-warp">
        <feTurbulence type="turbulence" baseFrequency="0.01 0.05" numOctaves="2" result="noise" seed="5">
          <animate attributeName="baseFrequency" dur="10s" values="0.01 0.05;0.02 0.08;0.01 0.05" repeatCount="indefinite" />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" />
      </filter>

      {/* Fuzzy/Hairy Edge for Shapes */}
      <filter id="fuzzy-edges">
        <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
        <feGaussianBlur stdDeviation="0.5" />
      </filter>

      {/* Ink Bleed Effect */}
      <filter id="ink-bleed">
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
      </filter>
    </defs>
  </svg>
);

const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-10 mix-blend-multiply" 
       style={{ filter: 'url(#paper-grain)' }}></div>
);

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-full max-w-[1200px] mx-auto px-6 md:px-12 ${className}`}>
    {children}
  </div>
);

// --- Components ---

const Hero = () => (
  <section className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-[#E88C6A]">
    {/* Background Gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#E88C6A] via-[#D97D5A] to-[#6A8D92] opacity-80"></div>
    
    {/* Organic Blob Background */}
    <div className="absolute inset-0 flex items-center justify-center opacity-40 mix-blend-multiply pointer-events-none">
       <svg viewBox="0 0 500 500" className="w-[150%] h-[150%] animate-spin-slow duration-[60s]">
         <path 
           d="M415.5,309.5Q392,369,335,396.5Q278,424,213.5,406Q149,388,103,336Q57,284,86.5,221.5Q116,159,173.5,123.5Q231,88,298,106Q365,124,402,187Q439,250,415.5,309.5Z" 
           fill="#1a1a1a" 
           style={{ filter: 'url(#fuzzy-edges)' }}
         />
       </svg>
    </div>

    <Container className="relative z-10 text-center">
      <div className="font-serif text-[#F2F0E4] mix-blend-hard-light">
        <h1 className="text-7xl md:text-9xl leading-[0.8] tracking-tighter" style={{ filter: 'url(#liquid-warp)' }}>
          <span className="block">WELCOME</span>
          <span className="block text-5xl md:text-7xl my-4 italic font-light opacity-80">TO THE</span>
          <span className="block">JUNGLE</span>
        </h1>
      </div>

      <div className="mt-16 max-w-md mx-auto">
        <p className="font-mono text-xs md:text-sm text-[#1a1a1a] uppercase tracking-widest border-t border-b border-[#1a1a1a] py-4">
          AI Mindset Lab W26 <br/>
          Survival of the Fittest
        </p>
      </div>
    </Container>
  </section>
);

const Manifesto = () => (
  <section className="py-32 bg-[#F2F0E4] text-[#1a1a1a] relative">
    <Container>
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          {/* Abstract Root Structure */}
          <svg viewBox="0 0 400 600" className="w-full h-auto max-h-[600px]">
            <g stroke="#1a1a1a" strokeWidth="2" fill="none" style={{ filter: 'url(#ink-bleed)' }}>
              <path d="M200,600 C200,500 100,450 100,350 C100,250 150,200 150,100" />
              <path d="M200,600 C200,500 300,450 300,350 C300,250 250,200 250,100" />
              <path d="M200,600 C200,400 200,300 200,100" />
              <path d="M100,350 C50,300 50,200 80,150" />
              <path d="M300,350 C350,300 350,200 320,150" />
              {/* Fuzzy ends */}
              <circle cx="150" cy="100" r="20" fill="#1a1a1a" style={{ filter: 'url(#fuzzy-edges)' }} />
              <circle cx="250" cy="100" r="20" fill="#1a1a1a" style={{ filter: 'url(#fuzzy-edges)' }} />
              <circle cx="200" cy="100" r="25" fill="#1a1a1a" style={{ filter: 'url(#fuzzy-edges)' }} />
              <circle cx="80" cy="150" r="15" fill="#1a1a1a" style={{ filter: 'url(#fuzzy-edges)' }} />
              <circle cx="320" cy="150" r="15" fill="#1a1a1a" style={{ filter: 'url(#fuzzy-edges)' }} />
            </g>
          </svg>
        </div>

        <div>
          <h2 className="text-5xl md:text-7xl font-serif leading-none mb-8" style={{ filter: 'url(#liquid-warp)' }}>
            Adapt or <br/> Perish
          </h2>
          <div className="font-mono text-sm md:text-base space-y-6 leading-relaxed border-l-2 border-[#1a1a1a] pl-6">
            <p>
              The digital landscape is no longer a garden. It is a wild, overgrown ecosystem. 
              Linear thinking is extinct.
            </p>
            <p>
              We are not here to teach you tools. We are here to evolve your instincts. 
              To navigate the noise, you must become part of the signal.
            </p>
            <p className="uppercase font-bold tracking-widest pt-4">
              // Evolution is messy.
            </p>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

const Program = () => (
  <section className="py-32 bg-[#1a1a1a] text-[#E88C6A]">
    <Container>
      <div className="mb-24 text-center">
        <h2 className="text-4xl md:text-6xl font-serif italic" style={{ filter: 'url(#liquid-warp)' }}>
          Evolutionary Stages
        </h2>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {[
          { step: "I", title: "Mutation", desc: "Prompt Engineering as genetic code manipulation." },
          { step: "II", title: "Symbiosis", desc: "Merging with Context. Obsidian + MCP." },
          { step: "III", title: "Adaptation", desc: "Rewiring the brain. Mental models for AI." },
          { step: "IV", title: "Genesis", desc: "Creating new life. Vibe-coding & Prototyping." }
        ].map((stage, i) => (
          <div key={i} className="relative p-6 border border-[#E88C6A]/30 hover:bg-[#E88C6A] hover:text-[#1a1a1a] transition-colors duration-500 group">
            <div className="text-6xl font-serif mb-4 opacity-50 group-hover:opacity-100">{stage.step}</div>
            <h3 className="text-2xl font-bold uppercase mb-4 tracking-widest">{stage.title}</h3>
            <p className="font-mono text-sm opacity-80 group-hover:opacity-100">{stage.desc}</p>
            
            {/* Organic Decor */}
            <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-current opacity-20 group-hover:opacity-100 filter blur-sm transition-opacity"></div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const Tracks = () => (
  <section className="py-32 bg-[#6A8D92] text-[#F2F0E4] overflow-hidden">
    <Container>
      <h2 className="text-5xl md:text-8xl font-serif text-center mb-20 mix-blend-soft-light opacity-80">
        SELECT SPECIES
      </h2>

      <div className="space-y-4">
        {[
          { name: "The Coach", desc: "Balance & Reflection" },
          { name: "The Agent", desc: "Autonomous Systems" },
          { name: "The Coder", desc: "Creative Programming" },
          { name: "The Artist", desc: "Generative Media" }
        ].map((track, i) => (
          <div key={i} className="relative border-b border-[#F2F0E4]/30 py-8 group cursor-pointer">
            <div className="flex justify-between items-baseline relative z-10">
              <h3 className="text-4xl md:text-6xl font-serif italic group-hover:translate-x-8 transition-transform duration-500">
                {track.name}
              </h3>
              <span className="font-mono text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                {track.desc}
              </span>
            </div>
            
            {/* Hover Reveal Image/Shape */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity duration-500">
               <svg viewBox="0 0 200 100" className="w-full h-full">
                 <path d={`M0,50 Q50,${i % 2 === 0 ? 0 : 100} 100,50 T200,50`} fill="none" stroke="currentColor" strokeWidth="2" style={{ filter: 'url(#fuzzy-edges)' }} />
               </svg>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const Pricing = () => (
  <section className="py-32 bg-[#F2F0E4] text-[#1a1a1a]">
    <Container>
      <div className="grid lg:grid-cols-3 gap-12">
        {[
          { name: "Base", price: "590", type: "Standard" },
          { name: "Advanced", price: "890", type: "Recommended", highlight: true },
          { name: "Premium", price: "1490", type: "Limited" }
        ].map((plan, i) => (
          <div key={i} className={`relative p-8 border-2 border-[#1a1a1a] ${plan.highlight ? 'bg-[#E88C6A]' : 'bg-transparent'}`}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-[#F2F0E4] px-4 py-1 font-mono text-xs uppercase tracking-widest">
              {plan.type}
            </div>
            
            <div className="text-center mt-8 mb-12">
              <h3 className="text-3xl font-serif italic mb-2">{plan.name}</h3>
              <div className="text-6xl font-bold font-mono">€{plan.price}</div>
            </div>

            <ul className="space-y-4 font-mono text-sm border-t border-[#1a1a1a] pt-8 mb-8">
              <li className="flex justify-between"><span>Knowledge Base</span> <span>[ x ]</span></li>
              <li className="flex justify-between"><span>Community</span> <span>[ x ]</span></li>
              <li className="flex justify-between"><span>Certification</span> <span>[ x ]</span></li>
            </ul>

            <a href="https://join.aimindset.org/context" className="block w-full py-4 bg-[#1a1a1a] text-[#F2F0E4] text-center font-mono uppercase hover:bg-transparent hover:text-[#1a1a1a] border-2 border-transparent hover:border-[#1a1a1a] transition-all">
              Join The Lab
            </a>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const Footer = () => (
  <footer className="bg-[#1a1a1a] text-[#E88C6A] py-12 border-t border-[#E88C6A]">
    <Container>
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-serif italic mb-2">AI Mindset Lab</h2>
          <p className="font-mono text-xs opacity-60">EST. 2026 // ORGANIC INTELLIGENCE</p>
        </div>
        
        <div className="flex gap-6 font-mono text-sm uppercase">
          <a href="#" className="hover:underline decoration-wavy underline-offset-4">Telegram</a>
          <a href="#" className="hover:underline decoration-wavy underline-offset-4">YouTube</a>
        </div>
      </div>
    </Container>
  </footer>
);

export default function OrganicJunglePage() {
  return (
    <div className="min-h-screen bg-[#F2F0E4] text-[#1a1a1a] font-sans selection:bg-[#E88C6A] selection:text-[#1a1a1a]">
      <OrganicFilters />
      <GrainOverlay />
      <main>
        <Hero />
        <Manifesto />
        <Program />
        <Tracks />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
