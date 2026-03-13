import React from 'react';

// --- Assets & Utils ---

const DustParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <div 
        key={i}
        className="absolute bg-black rounded-full opacity-60"
        style={{
          width: Math.random() * 3 + 1 + 'px',
          height: Math.random() * 3 + 1 + 'px',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          transform: `rotate(${Math.random() * 360}deg)`,
        }}
      />
    ))}
    {/* Scratches */}
    {[...Array(5)].map((_, i) => (
      <div 
        key={`s-${i}`}
        className="absolute border-t border-black opacity-40"
        style={{
          width: Math.random() * 50 + 20 + 'px',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          transform: `rotate(${Math.random() * 360}deg)`,
        }}
      />
    ))}
  </div>
);

const ReceiptLine = () => (
  <div className="w-full border-b border-dashed border-black/30 my-4" />
);

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 ${className}`}>
    {children}
  </div>
);

// --- Components ---

const Hero = () => (
  <section className="min-h-screen relative flex flex-col md:flex-row border-b border-black">
    {/* Left Panel - Empty/Minimal */}
    <div className="w-full md:w-1/2 border-r border-black p-8 relative min-h-[50vh] md:min-h-screen bg-[#F2F2ED]">
      <DustParticles />
      <div className="absolute top-8 left-8 w-4 h-4 border border-black rounded-full" />
      <div className="absolute bottom-8 right-8 w-4 h-4 border border-black" />
      
      {/* Hand-drawn circle */}
      <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-50">
        <path d="M32,100 Q50,20 150,40 T200,150 T100,200 T20,120" fill="none" stroke="black" strokeWidth="1" />
      </svg>
      
      <div className="absolute bottom-8 left-8 font-mono text-xs uppercase tracking-widest opacity-50">
        Fig 1.1 — The Void
      </div>
    </div>

    {/* Right Panel - Typography */}
    <div className="w-full md:w-1/2 bg-[#F2F2ED] relative flex flex-col justify-center p-12 md:p-24 overflow-hidden">
      <DustParticles />
      
      <div className="font-mono text-5xl md:text-7xl leading-tight uppercase tracking-tighter mix-blend-multiply">
        <div className="relative">
          <span className="relative z-10">PEOPLE</span>
          <span className="absolute top-0 left-1 opacity-10 blur-[1px]">PEOPLE</span>
        </div>
        <div className="pl-12 md:pl-24 relative">
          <span className="relative z-10">LOOK</span>
          <span className="absolute top-0 left-1 opacity-10 blur-[1px]">LOOK</span>
        </div>
        <div className="relative">
          <span className="relative z-10">AT</span>
          <span className="absolute top-0 left-1 opacity-10 blur-[1px]">AT</span>
        </div>
        <div className="pl-8 relative">
          <span className="relative z-10">AI</span>
          <span className="absolute top-0 left-1 opacity-10 blur-[1px]">AI</span>
        </div>
        <div className="pl-24 md:pl-48 text-gray-400">OR</div>
        <div className="pl-12 relative">
          <span className="relative z-10">AI</span>
          <span className="absolute top-0 left-1 opacity-10 blur-[1px]">AI</span>
        </div>
        <div className="relative">
          <span className="relative z-10">LOOKS</span>
          <span className="absolute top-0 left-1 opacity-10 blur-[1px]">LOOKS</span>
        </div>
        <div className="pl-16 relative">
          <span className="relative z-10">AT</span>
          <span className="absolute top-0 left-1 opacity-10 blur-[1px]">AT</span>
        </div>
        <div className="pl-4 relative">
          <span className="relative z-10">PEOPLE</span>
          <span className="absolute top-0 left-1 opacity-10 blur-[1px]">PEOPLE</span>
        </div>
      </div>
    </div>
  </section>
);

const ReceiptSection = () => (
  <section className="py-24 bg-[#F2F2ED] relative border-b border-black">
    <Container>
      <div className="flex justify-end">
        <div className="w-full md:w-[400px] bg-white p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] border border-black/10 font-mono text-sm leading-relaxed relative transform rotate-1">
          {/* Receipt Header */}
          <div className="text-center mb-8">
            <div className="uppercase font-bold tracking-widest mb-2">AI Mindset Lab</div>
            <div className="text-xs opacity-60">Batch W26 / Winter 2026</div>
            <div className="text-xs opacity-60">Moscow / Online</div>
          </div>

          <ReceiptLine />

          {/* Receipt Body */}
          <div className="space-y-4 text-xs md:text-sm">
            <p>
              "People Look at AI or AI Looks at People" is a transformative project exploring the silent, digital dialogue between users and algorithms.
            </p>
            <p>
              Created through weeks of prompting and refining, the series reveals the subtle beauty and intimacy of these encounters.
            </p>
            <p>
              Each prompt invites reflection on the relationship between observer and observed, questioning who truly initiates the gaze—the user or the model.
            </p>
          </div>

          <ReceiptLine />

          {/* Receipt Footer */}
          <div className="grid grid-cols-[1fr_auto] gap-4 text-xs mt-8">
            <div className="opacity-60">Design & Logic</div>
            <div className="text-right underline">Alexander Povalyaev</div>
            
            <div className="opacity-60">Set in Receipt by</div>
            <div className="text-right underline">Space Mono</div>
            
            <div className="opacity-60">Built with</div>
            <div className="text-right underline">React / Tailwind</div>
            
            <div className="opacity-60">Date</div>
            <div className="text-right">Jan 19, 2026</div>
          </div>

          {/* Barcode */}
          <div className="mt-8 pt-4 border-t border-black flex justify-center">
            <div className="h-12 w-full max-w-[200px] flex items-stretch justify-between">
              {[...Array(30)].map((_, i) => (
                <div key={i} className="bg-black" style={{ width: Math.random() * 4 + 1 + 'px' }} />
              ))}
            </div>
          </div>
          <div className="text-center text-[10px] mt-1 tracking-[0.5em]">00026 19012</div>
        </div>
      </div>
    </Container>
    
    {/* Floating Elements */}
    <div className="absolute top-24 left-12 md:left-24 font-mono text-xs uppercase tracking-widest opacity-40 hidden md:block">
      [ System Log ] <br/>
      &gt; Initializing... <br/>
      &gt; Context Loaded.
    </div>
  </section>
);

const GridProgram = () => (
  <section className="bg-[#F2F2ED] border-b border-black">
    <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-black">
      {[
        { week: "01", title: "PROMPT", sub: "Interface" },
        { week: "02", title: "CONTEXT", sub: "System" },
        { week: "03", title: "MIND", sub: "Ritual" },
        { week: "04", title: "LIFE", sub: "Creation" }
      ].map((item, i) => (
        <div key={i} className="p-8 md:p-12 h-64 md:h-96 relative group hover:bg-white transition-colors">
          <div className="absolute top-4 left-4 font-mono text-xs">
            ({item.week})
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            [ EXPAND ]
          </div>
          
          <div className="h-full flex flex-col justify-center items-center text-center">
            <h3 className="text-3xl font-mono uppercase tracking-tighter mb-2 group-hover:scale-110 transition-transform duration-500">
              {item.title}
            </h3>
            <p className="font-mono text-xs uppercase opacity-50">
              {item.sub}
            </p>
          </div>

          {/* Corner Marks */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-black" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black" />
        </div>
      ))}
    </div>
  </section>
);

const Pricing = () => (
  <section className="py-24 bg-[#F2F2ED] relative">
    <Container>
      <div className="mb-16 border-b border-black pb-4 flex justify-between items-end">
        <h2 className="text-4xl font-mono uppercase tracking-tighter">
          Investment
        </h2>
        <div className="font-mono text-xs">[ 3 OPTIONS ]</div>
      </div>

      <div className="space-y-4">
        {[
          { name: "BASE", price: "590", desc: "Self-paced exploration" },
          { name: "ADVANCED", price: "890", desc: "Guided transformation", highlight: true },
          { name: "PREMIUM", price: "1490", desc: "Personal architecture" }
        ].map((plan, i) => (
          <div key={i} className="group border-b border-black last:border-0 pb-4 hover:bg-white transition-colors p-4 -mx-4">
            <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
              <div className="flex items-baseline gap-4 md:w-1/3">
                <span className="font-mono text-xs opacity-50">0{i+1}</span>
                <h3 className="text-2xl font-mono uppercase">{plan.name}</h3>
                {plan.highlight && <span className="text-[10px] border border-black px-1 rounded-full animate-pulse">REC</span>}
              </div>
              
              <div className="font-mono text-xs uppercase opacity-60 md:w-1/3 text-center md:text-left">
                {plan.desc}
              </div>

              <div className="flex items-center justify-between md:justify-end gap-8 md:w-1/3">
                <span className="font-mono text-xl">€{plan.price}</span>
                <a href="https://join.aimindset.org/context" className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs underline decoration-dashed underline-offset-4">
                  SELECT -&gt;
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const Footer = () => (
  <footer className="bg-[#F2F2ED] border-t border-black py-12 font-mono text-xs uppercase">
    <Container>
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div>AI Mindset Lab</div>
          <div className="opacity-50">Winter 2026</div>
        </div>
        
        <div className="text-right space-y-1">
          <a href="#" className="block hover:underline">Telegram</a>
          <a href="#" className="block hover:underline">YouTube</a>
        </div>
      </div>
      
      <div className="mt-24 flex justify-between items-end">
        <div className="w-24 h-24 border border-black rounded-full flex items-center justify-center animate-spin-slow">
          <span className="text-[8px]">SCROLL UP</span>
        </div>
        <div>
          (C) 2026
        </div>
      </div>
    </Container>
  </footer>
);

export default function ReceiptPage() {
  return (
    <div className="min-h-screen bg-[#F2F2ED] text-[#1A1A1A] font-sans selection:bg-black selection:text-white">
      <main>
        <Hero />
        <ReceiptSection />
        <GridProgram />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
