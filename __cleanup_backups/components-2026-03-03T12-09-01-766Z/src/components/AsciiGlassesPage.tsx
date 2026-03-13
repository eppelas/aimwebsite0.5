import React, { useState, useEffect } from 'react';

// --- Components ---

const AsciiNoise = () => {
  const [noise, setNoise] = useState("");
  
  useEffect(() => {
    const chars = ".:+*#@%=-";
    const generate = () => {
      let str = "";
      for (let i = 0; i < 200; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
      }
      setNoise(str);
    };
    const interval = setInterval(generate, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none opacity-10 font-mono text-[10px] break-all overflow-hidden z-0 select-none">
      {noise.repeat(50)}
    </div>
  );
};

const GlitchText = ({ text, className = "" }: { text: string; className?: string }) => (
  <div className={`relative inline-block group ${className}`}>
    <span className="relative z-10">{text}</span>
    <span className="absolute top-0 left-[2px] -z-10 opacity-0 group-hover:opacity-70 text-red-500 animate-pulse">{text}</span>
    <span className="absolute top-0 -left-[2px] -z-10 opacity-0 group-hover:opacity-70 text-blue-500 animate-pulse animation-delay-75">{text}</span>
  </div>
);

const BracketBtn = ({ text, href }: { text: string; href: string }) => (
  <a href={href} className="font-mono text-xs md:text-sm uppercase hover:bg-black hover:text-white transition-colors px-2 py-1 inline-block">
    [ {text} ]
  </a>
);

const AsciiArt = () => (
  <pre className="font-mono text-[8px] md:text-[10px] leading-[8px] md:leading-[10px] whitespace-pre text-gray-400 select-none pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 z-0">
{`
              ...
            ;::::;
          ;::::; :;
        ;:::::'   :;
       ;:::::;     ;.
      ,:::::'       ;           OOO
      ::::::;       ;          OOOOO
      ;:::::;       ;         OOOOOOOO
     ,;::::::;     ;'         / OOOOOOO
   ;:::::::::;. ,,,;.        /  / DOOOOOO
  .';:::::::::::::::::;,     /  /     DOOOO
 ,::::::;::::::;;;;::::;,   /  /        DOOO
;:::::::::;::::::;;;;::::;,/  /          DOOO
::::::::::::::::::;;;;::::;/  /            DOOO
::::::::::::::::::;;;;::::;/  /              DOOO
;::::::::::::::::;;;;::::;/  /                DOOO
 ;::::::::::::::::;;;;::::;/  /                  DOOO
  ;::::::::::::::::;;;;::::;/  /                    DOOO
   ;::::::::::::::::;;;;::::;/  /                      DOOO
    ;::::::::::::::::;;;;::::;/  /                        DOOO
     ;::::::::::::::::;;;;::::;/  /                          DOOO
      ;::::::::::::::::;;;;::::;/  /                            DOOO
`}
  </pre>
);

// --- Sections ---

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-8 flex justify-between items-start mix-blend-difference text-black">
    <div className="font-black text-2xl md:text-4xl tracking-tighter italic">
      P.Y.E <span className="font-mono text-xs font-normal not-italic ml-2">LAB_W26</span>
    </div>
    
    <div className="hidden md:block font-mono text-xs text-right">
      <div>BATCH: WINTER 26</div>
      <div>STATUS: <span className="animate-pulse">LOADING...</span></div>
    </div>

    <div className="bg-gray-300 border-2 border-gray-400 p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer">
      <div className="bg-gray-200 border border-gray-100 px-4 py-1 text-xs font-bold uppercase tracking-widest text-gray-700">
        APPLY NOW
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="min-h-screen flex flex-col items-center justify-center relative pt-20 pb-12 px-4">
    <AsciiArt />
    
    <div className="relative z-10 text-center max-w-4xl mx-auto">
      <div className="font-mono text-xs md:text-sm mb-4 tracking-[0.5em] uppercase">
        [ System Initialization ]
      </div>
      
      <h1 className="text-4xl md:text-7xl font-sans font-bold uppercase leading-tight mb-8">
        <GlitchText text="ОЧКИ" /> — <GlitchText text="ДОПОЛНЕНИЕ" /><br/>
        К <GlitchText text="РЕАЛЬНОСТИ" />
      </h1>

      <p className="font-mono text-xs md:text-sm max-w-xl mx-auto leading-relaxed text-gray-600 mb-12">
        Лаборатория нового мышления в эпоху AI. 
        От хаоса промптов к персональной операционной системе.
        Batch Winter 26.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <BracketBtn text="PROMPT" href="#" />
        <BracketBtn text="CONTEXT" href="#" />
        <BracketBtn text="MIND" href="#" />
        <BracketBtn text="LIFE" href="#" />
      </div>
    </div>

    {/* Floating Elements */}
    <div className="absolute top-1/4 left-10 font-mono text-xs hidden md:block animate-bounce">
      [ . . . ]
    </div>
    <div className="absolute bottom-1/4 right-10 font-mono text-xs hidden md:block animate-pulse">
      LOADING_ASSETS: 99%
    </div>
  </section>
);

const GridSection = () => (
  <section className="py-24 px-4 md:px-8 border-t border-dashed border-gray-400 bg-gray-50 relative overflow-hidden">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-7xl mx-auto relative z-10">
      {[
        { title: "Week 01", sub: "Prompt Engineering", desc: "AI как интерфейс мышления. Chain-of-Thought, Few-Shot Learning." },
        { title: "Week 02", sub: "Context Engineering", desc: "Автоматизация и агенты. Obsidian + MCP + Claude." },
        { title: "Week 03", sub: "Mind Engineering", desc: "Продуктивность и ритуалы. AI для коучинга и рефлексии." },
        { title: "Week 04", sub: "Life Engineering", desc: "Творчество и реализация. Vibe-coding с Cursor." },
      ].map((item, i) => (
        <div key={i} className="group">
          <div className="font-mono text-xs text-gray-400 mb-2">[ {item.title} ]</div>
          <h3 className="text-xl font-bold uppercase mb-4 group-hover:underline decoration-2 underline-offset-4">{item.sub}</h3>
          <p className="font-mono text-xs text-gray-600 leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>

    {/* Background ASCII Pattern */}
    <div className="absolute bottom-0 left-0 right-0 font-mono text-[8px] leading-[8px] text-gray-200 whitespace-pre overflow-hidden pointer-events-none select-none">
{`
: : :       : : : : : : : : : :       : : : : : :       : : :       : : :       : : :
:+:+:       :+:       :+: :+:       :+:       :+:+: :+:+:       :+:+: :+:+:
+:+       +:+       +:+       +:+ +:+ +:+:+:,:+:+ +:+ +:+:+ +:+
+#+   +#++:++#+   +#+   +:+ +#++   +:+   +#+ +#++   +:+   +#+
+#+       +#+ +#++       +#+ +#++       +#+ +#++       +#+ +#++
#+#   #+#       #+# #+#       #+# #+#       #+# #+#       #+#
####### #########       ####### ###       ### ###       ###
`}
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white border-t border-black py-12 px-4 md:px-8 font-mono text-xs uppercase">
    <div className="flex flex-col md:flex-row justify-between gap-8">
      <div className="space-y-2">
        <div>AI MINDSET LAB W26</div>
        <div>EST. 2026</div>
      </div>
      
      <div className="flex gap-8">
        <a href="#" className="hover:line-through">Telegram</a>
        <a href="#" className="hover:line-through">Youtube</a>
        <a href="#" className="hover:line-through">Podcast</a>
      </div>

      <div className="text-right text-gray-400">
        [ SYSTEM_READY ]
      </div>
    </div>
  </footer>
);

export default function AsciiGlassesPage() {
  return (
    <div className="min-h-screen bg-[#E6E6E6] text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <AsciiNoise />
      <Header />
      <Hero />
      <GridSection />
      <Footer />
    </div>
  );
}
