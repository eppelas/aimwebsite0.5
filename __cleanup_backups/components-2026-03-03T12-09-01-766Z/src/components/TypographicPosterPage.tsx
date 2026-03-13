import React from 'react';

// --- Components ---

const GlyphHero = () => (
  <section className="min-h-screen bg-[#F5F5F0] flex flex-col justify-between p-4 md:p-8 border-b-4 border-black">
    <div className="flex justify-between font-mono text-xs uppercase tracking-widest">
      <span>AI Mindset Lab</span>
      <span>Batch W26</span>
    </div>
    
    <div className="flex-grow flex items-center justify-center overflow-hidden">
      <div className="font-sans font-black text-[25vw] leading-none tracking-tighter flex items-center gap-4 md:gap-12">
        <span className="hover:scale-110 transition-transform duration-500">A</span>
        <span className="w-[10vw] h-[25vw] bg-black hover:rotate-12 transition-transform duration-500"></span>
        <span className="hover:scale-110 transition-transform duration-500">I</span>
      </div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs uppercase">
      <div>Start: 19 Jan</div>
      <div>End: 16 Feb</div>
      <div>Status: Closed</div>
      <div className="text-right">Next: 20 Apr</div>
    </div>
  </section>
);

const RepetitionTrack = ({ text, count = 6 }: { text: string; count?: number }) => (
  <div className="relative overflow-hidden group border-b border-black last:border-b-0 bg-[#FF0000] text-black">
    <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>
    <div className="relative z-10 py-8 md:py-16 flex flex-col items-center justify-center group-hover:text-[#FF0000] transition-colors duration-500">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`text-6xl md:text-9xl font-black leading-[0.85] uppercase tracking-tighter ${i === 2 ? 'opacity-100' : 'opacity-20 group-hover:opacity-40'}`}>
          {text}
        </div>
      ))}
    </div>
  </div>
);

const ProgramSection = () => (
  <section className="grid md:grid-cols-2 lg:grid-cols-4">
    <RepetitionTrack text="PROMPT" />
    <RepetitionTrack text="CONTEXT" />
    <RepetitionTrack text="MIND" />
    <RepetitionTrack text="LIFE" />
  </section>
);

const PhilosophySection = () => (
  <section className="bg-[#FF0000] text-black p-4 md:p-8 min-h-screen flex items-center justify-center overflow-hidden relative">
    <div className="max-w-[90vw] w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-black">
        {/* Top Left */}
        <div className="p-8 md:p-16 border-b-4 md:border-b-0 md:border-r-4 border-black flex items-center justify-center bg-[#FF0000]">
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter text-center">
            FROM<br/>CHAOS
          </h2>
        </div>
        
        {/* Top Right */}
        <div className="p-8 md:p-16 border-b-4 border-black flex items-center justify-center bg-black text-[#FF0000]">
           <h2 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter text-center transform rotate-180">
            TO<br/>SYSTEM
          </h2>
        </div>

        {/* Bottom Left */}
        <div className="p-8 md:p-16 md:border-r-4 border-black flex flex-col justify-between bg-black text-[#FF0000]">
           <p className="font-mono text-sm md:text-base uppercase leading-relaxed">
             Мы не учим инструментам. Мы меняем мышление.
             От разрозненных запросов к единой операционной системе.
           </p>
           <div className="mt-8 text-4xl font-bold">/// 01</div>
        </div>

        {/* Bottom Right */}
        <div className="p-8 md:p-16 flex flex-col justify-between bg-[#FF0000]">
           <p className="font-mono text-sm md:text-base uppercase leading-relaxed font-bold">
             Prompt &rarr; Context &rarr; Mind &rarr; Life Engineering.
             Четыре недели трансформации.
           </p>
           <div className="mt-8 text-4xl font-bold text-right">/// 04</div>
        </div>
      </div>
    </div>
  </section>
);

const WireframeCard = ({ title, price, features }: { title: string; price: string; features: string[] }) => (
  <div className="border-2 border-blue-600 rounded-3xl p-8 relative bg-[#F5F5F0] hover:bg-white transition-colors min-h-[400px] flex flex-col">
    {/* Decorative Lines */}
    <div className="absolute top-12 left-0 right-0 h-[1px] bg-blue-600"></div>
    <div className="absolute bottom-12 left-0 right-0 h-[1px] bg-blue-600"></div>
    
    <div className="mb-16 pt-4">
      <h3 className="font-mono text-blue-600 uppercase tracking-widest mb-2">{title}</h3>
      <div className="text-5xl font-black tracking-tighter">€{price}</div>
    </div>

    <ul className="space-y-2 font-mono text-sm uppercase text-gray-500 flex-grow">
      {features.map((f, i) => <li key={i}>+ {f}</li>)}
    </ul>

    <div className="pt-4 flex justify-between items-center">
      <div className="w-12 h-8 bg-black rounded-md"></div>
      <a href="https://join.aimindset.org/context" className="font-bold uppercase hover:text-blue-600">Select &rarr;</a>
    </div>
  </div>
);

const PricingSection = () => (
  <section className="bg-[#F5F5F0] py-24 px-4 md:px-8">
    <div className="max-w-7xl mx-auto">
      <h2 className="font-black text-6xl md:text-9xl mb-16 tracking-tighter">PRICING</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <WireframeCard 
          title="Base" 
          price="590" 
          features={["4 Workshops", "Community Access", "Basic Materials"]} 
        />
        <WireframeCard 
          title="Advanced" 
          price="890" 
          features={["Everything in Base", "4 Advanced Tracks", "Priority Support"]} 
        />
        <WireframeCard 
          title="Premium" 
          price="1490" 
          features={["Everything in Adv", "1:1 Strategy", "Personal Audit"]} 
        />
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-black text-white py-12 px-4 md:px-8 border-t-4 border-white">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
      <div>
        <h2 className="text-[10vw] leading-none font-black tracking-tighter mb-4">
          JOIN<br/>NOW
        </h2>
        <div className="font-mono text-sm uppercase text-gray-400">
          Applications close soon<br/>
          Batch Winter 26
        </div>
      </div>
      
      <div className="flex flex-col gap-4 text-right w-full md:w-auto">
        <a href="#" className="text-2xl font-bold hover:text-[#FF0000] transition-colors">TELEGRAM</a>
        <a href="#" className="text-2xl font-bold hover:text-[#FF0000] transition-colors">YOUTUBE</a>
        <a href="#" className="text-2xl font-bold hover:text-[#FF0000] transition-colors">INSTAGRAM</a>
        <div className="h-[1px] bg-white w-full my-4"></div>
        <div className="font-mono text-xs uppercase text-gray-500">
          © 2026 AI Mindset Lab<br/>
          All Rights Reserved
        </div>
      </div>
    </div>
  </footer>
);

export default function TypographicPosterPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] text-black font-sans selection:bg-black selection:text-white">
      <GlyphHero />
      <PhilosophySection />
      <ProgramSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
