import React from 'react';

// --- SVG Filters ---

const LiquidFilters = () => (
  <svg className="hidden">
    <defs>
      <filter id="liquid-melt">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
      </filter>

      <filter id="wave-distort">
        <feTurbulence type="turbulence" baseFrequency="0.01 0.02" numOctaves="2" result="noise" seed="1">
          <animate attributeName="baseFrequency" dur="10s" values="0.01 0.02;0.02 0.05;0.01 0.02" repeatCount="indefinite" />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
      </filter>
    </defs>
  </svg>
);

// --- Components ---

const Sticker = ({ text, className = "", rotate = 0 }: { text: string; className?: string; rotate?: number }) => (
  <div 
    className={`absolute z-20 bg-[#00FF00] text-black font-mono text-[10px] md:text-xs uppercase px-3 py-1 rounded-full border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 ${className}`}
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <span>{text}</span>
    <div className="w-4 h-4 bg-white rounded-full border border-black flex items-center justify-center text-[8px]">
      👋
    </div>
  </div>
);

const LiquidText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`font-black text-8xl md:text-[12rem] leading-[0.8] tracking-tighter text-black select-none mix-blend-hard-light ${className}`} style={{ filter: 'url(#liquid-melt)' }}>
    {children}
  </div>
);

const PixelIcon = ({ type }: { type: 'triangle' | 'square' | 'arrow' | 'blob' }) => {
  const icons = {
    triangle: (
      <svg viewBox="0 0 10 10" className="w-full h-full">
        <path d="M1 1 H9 V3 H7 V5 H5 V7 H3 V5 H1 Z" fill="white" />
      </svg>
    ),
    square: (
      <svg viewBox="0 0 10 10" className="w-full h-full">
        <path d="M1 1 H9 V9 H1 Z M3 3 V7 H7 V3 Z" fill="white" fillRule="evenodd" />
      </svg>
    ),
    arrow: (
      <svg viewBox="0 0 10 10" className="w-full h-full">
        <path d="M1 5 H3 V3 H5 V1 H7 V3 H9 V5 H7 V7 H5 V9 H3 V7 H1 Z" fill="white" />
      </svg>
    ),
    blob: (
      <svg viewBox="0 0 10 10" className="w-full h-full">
        <path d="M2 1 H8 V2 H9 V8 H8 V9 H2 V8 H1 V2 H2 Z" fill="white" />
      </svg>
    )
  };

  return icons[type];
};

const NavCard = ({ title, icon, active = false }: { title: string; icon: 'triangle' | 'square' | 'arrow' | 'blob'; active?: boolean }) => (
  <div className={`border-2 border-[#333] bg-black p-4 flex flex-col justify-between h-48 md:h-64 transition-transform hover:-translate-y-2 ${active ? 'border-[#00FF00]' : ''}`}>
    <div className={`bg-[#00FF00] text-black font-mono text-[10px] uppercase px-2 py-1 w-fit mb-4 ${active ? 'opacity-100' : 'opacity-0'}`}>
      {title}
    </div>
    <div className="flex-grow flex items-center justify-center p-4">
      <div className="w-16 h-16 md:w-24 md:h-24 image-pixelated">
        <PixelIcon type={icon} />
      </div>
    </div>
  </div>
);

// --- Sections ---

const Hero = () => (
  <section className="min-h-screen bg-white relative overflow-hidden flex flex-col">
    {/* Massive Liquid Text Layers */}
    <div className="flex-grow flex flex-col justify-center items-center relative">
      
      {/* Layer 1 */}
      <div className="w-full overflow-hidden whitespace-nowrap relative py-8 md:py-16 border-b-4 border-black">
        <LiquidText className="animate-marquee">
          AI MINDSET LAB W26 AI MINDSET LAB W26
        </LiquidText>
        <Sticker text="Лаборатория нового мышления" className="top-1/2 left-1/4 -translate-y-1/2" rotate={-5} />
      </div>

      {/* Layer 2 */}
      <div className="w-full overflow-hidden whitespace-nowrap relative py-8 md:py-16 border-b-4 border-black bg-black text-white">
        <div className="font-black text-8xl md:text-[12rem] leading-[0.8] tracking-tighter select-none" style={{ filter: 'url(#wave-distort)' }}>
          PROMPT CONTEXT MIND LIFE
        </div>
        <Sticker text="Старт 19 Января" className="top-1/2 right-1/4 -translate-y-1/2" rotate={5} />
      </div>

      {/* Layer 3 */}
      <div className="w-full overflow-hidden whitespace-nowrap relative py-8 md:py-16">
        <LiquidText>
          EVOLUTION EVOLUTION EVOLUTION
        </LiquidText>
        <Sticker text="Batch: Winter 26" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" rotate={-2} />
      </div>
    </div>
  </section>
);

const Manifesto = () => (
  <section className="py-24 bg-[#00FF00] border-t-4 border-black">
    <div className="max-w-[1400px] mx-auto px-6 md:px-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="font-black text-5xl md:text-7xl uppercase leading-[0.9]">
          Мы не учим <br/>
          инструментам. <br/>
          Мы меняем <br/>
          мышление.
        </div>
        <div className="font-mono text-sm md:text-base space-y-6 border-l-4 border-black pl-8">
          <p className="font-bold uppercase">
            // Философия
          </p>
          <p>
            AI Mindset Winter Lab W26 — это лаборатория, пространство для экспериментов. 
            Здесь вы не изучаете, а создаёте: персональных ассистентов, AI-first процессы, новую версию себя.
          </p>
          <p>
            От хаоса промптов к персональной AI-операционной системе.
          </p>
          <a href="https://join.aimindset.org/context" className="inline-block bg-black text-white px-6 py-3 font-bold uppercase hover:bg-white hover:text-black transition-colors border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Подать заявку →
          </a>
        </div>
      </div>
    </div>
  </section>
);

const TracksNav = () => (
  <section className="bg-black py-12 border-t-4 border-black">
    <div className="max-w-[1400px] mx-auto px-4 md:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <NavCard title="Prompt Engineering" icon="triangle" active />
        <NavCard title="Context Engineering" icon="square" />
        <NavCard title="Mind Engineering" icon="arrow" />
        <NavCard title="Life Engineering" icon="blob" />
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section className="py-24 bg-white border-t-4 border-black">
    <div className="max-w-[1200px] mx-auto px-6">
      <h2 className="text-center font-black text-6xl md:text-8xl uppercase mb-16" style={{ filter: 'url(#liquid-melt)' }}>
        Стоимость
      </h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "Base", price: "590", desc: "Самостоятельная работа" },
          { name: "Advanced", price: "890", desc: "Расширенная программа", highlight: true },
          { name: "Premium", price: "1490", desc: "Личное сопровождение" }
        ].map((plan, i) => (
          <div key={i} className={`border-4 border-black p-8 flex flex-col relative ${plan.highlight ? 'bg-[#00FF00]' : 'bg-white'}`}>
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 font-mono text-xs uppercase">
                Popular
              </div>
            )}
            <h3 className="font-black text-3xl uppercase mb-2">{plan.name}</h3>
            <div className="font-mono text-sm mb-8 opacity-70">{plan.desc}</div>
            <div className="text-6xl font-black mb-8">€{plan.price}</div>
            <ul className="space-y-2 font-mono text-sm mb-8 flex-grow">
              <li>[x] 4 Недели</li>
              <li>[x] Воркшопы</li>
              <li>[x] Комьюнити</li>
              {plan.highlight && <li>[x] + 4 Трека</li>}
            </ul>
            <a href="https://join.aimindset.org/context" className="block w-full bg-black text-white text-center py-4 font-black uppercase hover:invert transition-all">
              Выбрать
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-black text-[#00FF00] py-12 border-t-4 border-[#00FF00] font-mono text-xs uppercase">
    <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="text-center md:text-left">
        <div className="font-black text-xl mb-2">AI Mindset Lab</div>
        <div className="opacity-70">Batch W26 // Winter 2026</div>
      </div>
      
      <div className="flex gap-8">
        <a href="#" className="hover:underline">Telegram</a>
        <a href="#" className="hover:underline">YouTube</a>
        <a href="#" className="hover:underline">Legal</a>
      </div>
    </div>
  </footer>
);

export default function LiquidDistortionPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#00FF00] selection:text-black">
      <LiquidFilters />
      <main>
        <Hero />
        <Manifesto />
        <TracksNav />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
