import React from 'react';

// --- SVG Filters & Textures ---

const ZineFilters = () => (
  <svg className="hidden">
    <defs>
      {/* Halftone Pattern */}
      <pattern id="halftone" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="3" fill="black" opacity="0.2" />
      </pattern>
      
      {/* Rough Paper Texture */}
      <filter id="rough-paper">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
        <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="2">
          <feDistantLight azimuth="45" elevation="60" />
        </feDiffuseLighting>
      </filter>

      {/* Distorted Edge */}
      <filter id="distort-edge">
        <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
      </filter>

      {/* Ink Stamp Look */}
      <filter id="ink-stamp">
        <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="1" result="noise" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" in="noise" result="coloredNoise" />
        <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="composite" />
      </filter>
    </defs>
  </svg>
);

const PaperTexture = () => (
  <div className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-multiply" 
       style={{ filter: 'url(#rough-paper)' }}></div>
);

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-full max-w-[1000px] mx-auto px-4 md:px-8 relative z-10 ${className}`}>
    {children}
  </div>
);

const CutoutText = ({ children, className = "", rotate = "0deg", bg = "bg-black", text = "text-white" }: any) => (
  <span 
    className={`inline-block px-2 py-1 font-black uppercase transform ${className} ${bg} ${text}`}
    style={{ transform: `rotate(${rotate})`, filter: 'url(#distort-edge)' }}
  >
    {children}
  </span>
);

const Sticker = ({ children, className = "", color = "bg-yellow-300" }: any) => (
  <div className={`absolute rounded-full flex items-center justify-center text-center font-bold text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${color} ${className}`}>
    {children}
  </div>
);

// --- Components ---

const Hero = () => (
  <section className="min-h-screen relative overflow-hidden bg-[#E6E1D3] flex items-center py-20">
    {/* Halftone Background */}
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '10px 10px' }}></div>
    
    <Container>
      <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-center">
        {/* Left Column - Vertical Text */}
        <div className="hidden md:flex flex-col items-center justify-center border-r-4 border-black pr-8 h-full">
          <h1 className="text-8xl font-black tracking-tighter leading-none text-center" style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>
            AI MINDSET
          </h1>
        </div>

        {/* Right Column - Collage */}
        <div className="relative">
          {/* Speech Bubble */}
          <div className="absolute -top-12 -right-4 bg-white border-2 border-black p-4 rounded-tl-3xl rounded-br-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 transform rotate-6">
            <p className="font-mono text-xs font-bold">CALL ME MAYBE?</p>
            <p className="font-black text-xl uppercase">NO, CALL AI.</p>
          </div>

          {/* Main Graphic - Abstract Collage */}
          <div className="relative border-4 border-black bg-[#5D3FD3] p-8 md:p-16 transform -rotate-2 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-transparent opacity-50 mix-blend-multiply"></div>
            
            <div className="relative z-10 flex flex-col gap-4">
              <div className="bg-white border-2 border-black p-2 transform -rotate-1 w-fit">
                <h2 className="text-4xl md:text-6xl font-black uppercase leading-none">
                  BUT YOU <br/>
                  CAINT USE <br/>
                  MY <span className="text-[#FF00FF]">AGENT</span>
                </h2>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <CutoutText rotate="-2deg" bg="bg-yellow-300" text="text-black">LAB W26</CutoutText>
                <CutoutText rotate="3deg" bg="bg-green-400" text="text-black">WINTER</CutoutText>
                <CutoutText rotate="-1deg" bg="bg-cyan-400" text="text-black">2026</CutoutText>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-black rounded-full flex items-center justify-center text-white font-mono text-xs text-center p-2 transform rotate-12">
              SAFE <br/> EMR <br/> LEVELS
            </div>
          </div>

          <div className="mt-12 font-mono font-bold text-sm md:text-lg bg-black text-white p-4 inline-block transform rotate-1">
            /// ОПЕРАЦИОННАЯ СИСТЕМА НОВОГО МЫШЛЕНИЯ
          </div>
        </div>
      </div>
    </Container>
  </section>
);

const Philosophy = () => (
  <section className="py-24 bg-[#FF4040] relative border-t-4 border-black">
    <Container>
      <div className="relative bg-white border-4 border-black p-8 md:p-12 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]">
        <Sticker className="w-32 h-32 -top-16 -right-8 rotate-12 bg-cyan-300 text-lg">
          CONTROL <br/> FREQ
        </Sticker>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-5xl font-black uppercase mb-6 leading-[0.9]">
              SAVE THE <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600" style={{ WebkitTextStroke: '2px black' }}>BRAINS</span>
            </h2>
            <p className="font-mono text-sm font-bold border-t-2 border-b-2 border-black py-2 mb-4">
              LESS THAT BURN OUT
            </p>
            <p className="font-serif text-xl leading-tight">
              A brilliant performance! <br/>
              Мы не просто учим промптам. Мы перепрошиваем сознание.
              От хаоса инструментов к стройной системе.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div className="bg-yellow-200 border-2 border-black p-4 transform rotate-2">
              <h3 className="font-black uppercase text-lg mb-2">Mindset &gt; Tools</h3>
              <p className="font-mono text-xs leading-tight">
                Технологии меняются. Мышление остается.
                Your head and brain heat up significantly when you talk on your cell phone.
                Use AI to cool down.
              </p>
            </div>
            
            <div className="bg-green-200 border-2 border-black p-4 transform -rotate-1">
              <h3 className="font-black uppercase text-lg mb-2">Practice First</h3>
              <p className="font-mono text-xs leading-tight">
                Каждая неделя — эксперимент.
                Significant dangerous heat! Most heat is generated in your ear canal.
                Directly connected to your brain!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

const Program = () => (
  <section className="py-24 bg-[#E6E1D3] border-t-4 border-black">
    <Container>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4 bg-black text-white p-4 font-mono text-xs">
          <div className="border-b border-white pb-2 mb-2">INDEX</div>
          <ul className="space-y-2">
            <li>01. PROMPT</li>
            <li>02. CONTEXT</li>
            <li>03. MIND</li>
            <li>04. LIFE</li>
          </ul>
          <div className="mt-12 border-t border-white pt-2">
            FIG A. <br/>
            EVOLUTION
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4 grid gap-8">
          {[
            { id: "01", title: "PROMPT ENGINEERING", sub: "AI КАК ИНТЕРФЕЙС" },
            { id: "02", title: "CONTEXT ENGINEERING", sub: "АВТОМАТИЗАЦИЯ И АГЕНТЫ" },
            { id: "03", title: "MIND ENGINEERING", sub: "ПРОДУКТИВНОСТЬ И РИТУАЛЫ" },
            { id: "04", title: "LIFE ENGINEERING", sub: "ТВОРЧЕСТВО И РЕАЛИЗАЦИЯ" }
          ].map((item, i) => (
            <div key={i} className="flex items-stretch border-b-4 border-black pb-8 last:border-0">
              <div className="w-16 md:w-24 font-black text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-black to-gray-500" style={{ WebkitTextStroke: '1px black' }}>
                {item.id}
              </div>
              <div className="pl-4 md:pl-8">
                <h3 className="text-2xl md:text-4xl font-black uppercase bg-white inline-block px-2 transform -skew-x-12 border border-black mb-2">
                  {item.title}
                </h3>
                <p className="font-mono font-bold uppercase tracking-widest text-[#FF4040]">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  </section>
);

const Pricing = () => (
  <section className="py-24 bg-[#5D3FD3] border-t-4 border-black relative overflow-hidden">
    {/* Background Texture */}
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}></div>

    <Container>
      <div className="text-center mb-16 relative">
        <h2 className="text-6xl md:text-8xl font-black text-white uppercase" style={{ textShadow: '4px 4px 0 #000' }}>
          SPECIAL <br/> OFFER
        </h2>
        <Sticker className="w-24 h-24 top-0 right-1/4 rotate-12 bg-white text-xs">
          LIMITED <br/> TIME
        </Sticker>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "MAIN", price: "590", color: "bg-white" },
          { name: "ADVANCED", price: "890", color: "bg-yellow-300", highlight: true },
          { name: "PREMIUM", price: "1490", color: "bg-cyan-300" }
        ].map((plan, i) => (
          <div key={i} className={`border-4 border-black p-6 ${plan.color} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-y-2 transition-transform`}>
            <div className="border-b-4 border-black pb-4 mb-4 flex justify-between items-center">
              <h3 className="font-black text-xl uppercase">{plan.name}</h3>
              {plan.highlight && <span className="bg-black text-white text-xs px-2 py-1 font-mono">POPULAR</span>}
            </div>
            
            <div className="text-5xl font-black mb-2">€{plan.price}</div>
            <div className="font-mono text-xs mb-8">PER PERSON / 4 WEEKS</div>

            <ul className="space-y-2 font-bold text-sm mb-8">
              <li>✓ WORKSHOPS</li>
              <li>✓ COWORKING</li>
              <li>✓ COMMUNITY</li>
              {plan.highlight && <li>✓ ADVANCED TRACKS</li>}
            </ul>

            <a href="https://join.aimindset.org/context" className="block w-full bg-black text-white text-center font-black uppercase py-3 hover:bg-white hover:text-black border-2 border-black transition-colors">
              BUY NOW
            </a>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const Footer = () => (
  <footer className="bg-black text-white py-12 border-t-4 border-white font-mono text-xs">
    <Container>
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="text-2xl font-black uppercase mb-2">AI MINDSET LAB</div>
          <div className="bg-white text-black px-2 inline-block font-bold">
            © 2026. Thom John Studio.
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="border border-white p-2 w-24 text-center">
            PHONE <br/> DOWN
          </div>
          <div className="border border-white p-2 w-24 text-center">
            EYES <br/> UP
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center opacity-50">
        <p>For Extended Service Plan Call 1(800) CON-TROL or See Page 92</p>
        <div className="mt-2 tracking-[0.5em]">00000 09677</div>
      </div>
    </Container>
  </footer>
);

export default function ZinePage() {
  return (
    <div className="min-h-screen bg-[#E6E1D3] text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <ZineFilters />
      <PaperTexture />
      <main>
        <Hero />
        <Philosophy />
        <Program />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
