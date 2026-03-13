import React from 'react';

// --- SVG Filters & Assets ---

const GrainFilters = () => (
  <svg className="hidden">
    <defs>
      {/* Stipple/Grain Shader */}
      <filter id="stipple-grain" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="4" result="noise" />
        <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="2">
          <feDistantLight azimuth="45" elevation="60" />
        </feDiffuseLighting>
        <feComposite operator="in" in2="SourceGraphic" />
      </filter>

      {/* Noise Overlay */}
      <filter id="noise-overlay">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.1" />
        </feComponentTransfer>
      </filter>

      {/* Geometric Pattern for Arch */}
      <pattern id="geo-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M20,0 L40,20 L20,40 L0,20 Z" fill="none" stroke="black" strokeWidth="1" />
        <circle cx="20" cy="20" r="5" fill="black" />
        <path d="M0,0 L40,40 M40,0 L0,40" stroke="black" strokeWidth="0.5" opacity="0.5" />
      </pattern>
    </defs>
  </svg>
);

const GrainTexture = () => (
  <div className="fixed inset-0 pointer-events-none z-50 mix-blend-multiply opacity-20" 
       style={{ filter: 'url(#noise-overlay)' }}></div>
);

const FloatingShape = ({ type, className = "", delay = 0 }: { type: 'star' | 'sphere' | 'monolith' | 'poly'; className?: string; delay?: number }) => {
  const shapes = {
    star: (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
        <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" fill="url(#grad-shape)" />
        <defs>
          <radialGradient id="grad-shape" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#666" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
        </defs>
      </svg>
    ),
    sphere: (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
        <circle cx="50" cy="50" r="45" fill="url(#grad-sphere)" />
        <defs>
          <radialGradient id="grad-sphere" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#666" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
        </defs>
      </svg>
    ),
    monolith: (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
        <ellipse cx="50" cy="50" rx="15" ry="45" fill="url(#grad-mono)" />
        <defs>
          <radialGradient id="grad-mono" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#666" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
        </defs>
      </svg>
    ),
    poly: (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
        <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" fill="url(#grad-poly)" />
        <path d="M50 50 L90 30 M50 50 L10 30 M50 50 L50 90" stroke="black" strokeWidth="0.5" opacity="0.5" />
        <defs>
          <radialGradient id="grad-poly" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#666" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
        </defs>
      </svg>
    )
  };

  return (
    <div 
      className={`absolute animate-float ${className}`} 
      style={{ animationDelay: `${delay}s` }}
    >
      {shapes[type]}
    </div>
  );
};

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-full max-w-[1000px] mx-auto px-6 md:px-12 relative z-10 ${className}`}>
    {children}
  </div>
);

// --- Components ---

const Hero = () => (
  <section className="min-h-screen bg-[#E6E6E6] relative flex items-center justify-center overflow-hidden">
    {/* Archway Background */}
    <div className="absolute inset-x-0 bottom-0 h-[80vh] flex justify-center items-end pointer-events-none opacity-20">
      <div className="w-[80vw] md:w-[600px] h-full border-[40px] border-black rounded-t-full" 
           style={{ backgroundImage: 'url(#geo-pattern)' }}></div>
    </div>

    {/* Floating Objects */}
    <FloatingShape type="star" className="w-16 h-16 top-[20%] left-[20%]" delay={0} />
    <FloatingShape type="sphere" className="w-24 h-24 top-[30%] right-[25%]" delay={1} />
    <FloatingShape type="monolith" className="w-12 h-12 bottom-[30%] left-[30%]" delay={2} />
    <FloatingShape type="poly" className="w-20 h-20 bottom-[20%] right-[20%]" delay={3} />

    <Container className="text-center">
      <h1 className="text-4xl md:text-6xl font-medium tracking-widest uppercase mb-6">
        Emergence
      </h1>
      <p className="font-serif italic text-lg opacity-70 max-w-md mx-auto">
        Из хаоса промптов рождается персональная операционная система.
      </p>
      
      <div className="mt-16 flex flex-col items-center gap-8">
        <div className="w-[1px] h-24 bg-black"></div>
        <div className="flex flex-col gap-6 text-xs uppercase tracking-[0.2em] font-bold">
          <span className="cursor-pointer hover:scale-110 transition-transform flex flex-col items-center gap-2">
            <FloatingShape type="star" className="w-6 h-6 relative animate-none" />
            Философия
          </span>
          <span className="cursor-pointer hover:scale-110 transition-transform flex flex-col items-center gap-2">
            <FloatingShape type="monolith" className="w-4 h-8 relative animate-none" />
            Треки
          </span>
          <span className="cursor-pointer hover:scale-110 transition-transform flex flex-col items-center gap-2">
            <FloatingShape type="sphere" className="w-6 h-6 relative animate-none" />
            Стоимость
          </span>
        </div>
      </div>
    </Container>
  </section>
);

const Manifesto = () => (
  <section className="py-32 bg-[#E6E6E6] relative">
    <Container>
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="font-serif text-xl md:text-2xl leading-relaxed space-y-8">
          <p>
            "Вы привыкли видеть мир таким, какой он есть. Вы привыкли к его формам и правилам."
          </p>
          <p>
            Но затем что-то меняется. Фокус сужается. Вы не знаете почему, но одна деталь — проблеск интеллекта — становится центром всего.
          </p>
          <p className="text-sm font-sans uppercase tracking-widest mt-8 border-t border-black pt-8">
            AI Mindset Lab W26
          </p>
        </div>
        
        <div className="relative h-[400px] flex items-center justify-center">
          <div className="w-64 h-64 bg-black rounded-full shadow-2xl flex items-center justify-center overflow-hidden relative">
             <div className="absolute inset-0 bg-[url(#geo-pattern)] opacity-20"></div>
             <div className="w-32 h-32 bg-gradient-to-b from-gray-800 to-black rounded-full shadow-inner"></div>
          </div>
          {/* Orbiting elements */}
          <div className="absolute w-full h-full animate-spin-slow duration-[20s]">
             <div className="absolute top-0 left-1/2 w-4 h-4 bg-black rounded-full"></div>
             <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

const TapestryTracks = () => (
  <section className="py-32 bg-[#E6E6E6]">
    <Container>
      <div className="text-center mb-24">
        <FloatingShape type="monolith" className="w-8 h-16 mx-auto mb-4 relative animate-none" />
        <h2 className="text-2xl uppercase tracking-[0.2em]">Гобелен Треков</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        {[
          { title: "Коуч", desc: "Баланс и Рефлексия", icon: "star" },
          { title: "Агент", desc: "Автономия и Системы", icon: "sphere" },
          { title: "Кодер", desc: "Vibe-Coding и Творчество", icon: "poly" },
          { title: "Творец", desc: "Видение и Медиа", icon: "monolith" }
        ].map((track, i) => (
          <div key={i} className="relative group">
            {/* Tapestry Frame */}
            <div className="bg-[#D9D9D9] p-2 shadow-xl relative overflow-hidden">
              {/* Fringe Effect */}
              <div className="absolute -left-1 top-0 bottom-0 w-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSIjMzMzIi8+PC9zdmc+')]"></div>
              <div className="absolute -right-1 top-0 bottom-0 w-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSIjMzMzIi8+PC9zdmc+')]"></div>
              
              <div className="aspect-[3/4] bg-[#333] relative flex flex-col items-center justify-center text-white p-8 text-center border-4 border-double border-[#666]">
                <div className="absolute inset-0 opacity-20 bg-[url(#geo-pattern)]"></div>
                
                <div className="relative z-10">
                  <div className="mb-8 opacity-80 group-hover:scale-110 transition-transform duration-700">
                    <FloatingShape type={track.icon as any} className="w-24 h-24 relative animate-none mx-auto" />
                  </div>
                  <h3 className="text-2xl font-serif italic mb-2">{track.title}</h3>
                  <p className="text-xs uppercase tracking-widest opacity-70">{track.desc}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const Pricing = () => (
  <section className="py-32 bg-[#E6E6E6] relative overflow-hidden">
    <Container>
      <div className="text-center mb-16">
        <FloatingShape type="sphere" className="w-12 h-12 mx-auto mb-4 relative animate-none" />
        <h2 className="text-2xl uppercase tracking-[0.2em]">Приобретение</h2>
      </div>

      <div className="flex flex-col items-center gap-12">
        {[
          { name: "Base", price: "590", desc: "Фундамент" },
          { name: "Advanced", price: "890", desc: "Расширение" },
          { name: "Premium", price: "1490", desc: "Архитектура" }
        ].map((plan, i) => (
          <div key={i} className="w-full max-w-md text-center group cursor-pointer">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="h-[1px] w-12 bg-black opacity-20 group-hover:w-24 transition-all"></div>
              <h3 className="text-xl font-serif italic">{plan.name}</h3>
              <div className="h-[1px] w-12 bg-black opacity-20 group-hover:w-24 transition-all"></div>
            </div>
            <div className="text-4xl font-medium mb-2">€{plan.price}</div>
            <p className="text-xs uppercase tracking-widest opacity-50 mb-6">{plan.desc}</p>
            <a href="https://join.aimindset.org/context" className="inline-block border border-black px-8 py-2 text-xs uppercase hover:bg-black hover:text-white transition-colors">
              Выбрать
            </a>
          </div>
        ))}
      </div>
    </Container>
    
    {/* Floor Pattern */}
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGw0MCA0ME00MCAwbC00MCA0MCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-50"></div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#111] text-[#666] py-24 text-center font-serif italic">
    <Container>
      <div className="mb-8">
        <FloatingShape type="poly" className="w-8 h-8 mx-auto relative animate-none opacity-50" />
      </div>
      <p className="mb-4">Игра — это то, что превращает повседневность в сказку.</p>
      <div className="text-xs font-sans uppercase tracking-widest opacity-50">
        © 2026 AI Mindset Lab
      </div>
    </Container>
  </footer>
);

export default function EmergencePage() {
  return (
    <div className="min-h-screen bg-[#E6E6E6] text-[#111] font-sans selection:bg-black selection:text-white">
      <GrainFilters />
      <GrainTexture />
      <main>
        <Hero />
        <Manifesto />
        <TapestryTracks />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
