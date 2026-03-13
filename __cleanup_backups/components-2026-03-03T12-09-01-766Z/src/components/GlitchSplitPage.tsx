import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// --- Utils ---

const NoiseCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const idata = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.1) {
          buffer32[i] = 0xffffffff; // White pixel
        } else {
          buffer32[i] = 0xff000000; // Black pixel
        }
      }

      ctx.putImageData(idata, 0, 0);
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />;
};

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 flex h-12 text-black font-bold text-sm md:text-base uppercase tracking-tight">
    <div className="flex-1 bg-[#00FF00] flex items-center justify-center gap-2 hover:invert transition-all cursor-pointer">
      <img
        src="/assets/ai-mindset-logo.png"
        alt="AI Mindset logo"
        className="h-4 w-auto object-contain opacity-85"
      />
      <span>AI Mindset</span>
    </div>
    <div className="flex-1 bg-[#00BFFF] flex items-center justify-center hover:invert transition-all cursor-pointer">
      Lab
    </div>
    <div className="flex-1 bg-[#FF4500] flex items-center justify-center hover:invert transition-all cursor-pointer">
      Tracks
    </div>
    <div className="flex-1 bg-[#E066FF] flex items-center justify-center hover:invert transition-all cursor-pointer">
      <a href="https://join.aimindset.org/context">Join</a>
    </div>
  </header>
);

const GlitchText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative inline-block ${className}`}>
    <span className="relative z-10">{children}</span>
    <span className="absolute top-0 left-[2px] -z-10 text-red-500 opacity-70 mix-blend-multiply animate-pulse">{children}</span>
    <span className="absolute top-0 -left-[2px] -z-10 text-blue-500 opacity-70 mix-blend-multiply animate-pulse animation-delay-75">{children}</span>
  </div>
);

// --- Slides ---

const IntroSlide = () => (
  <div className="flex flex-col h-full justify-center relative z-10">
    <div className="text-xs font-mono mb-4">BATCH W26 // WINTER 2026</div>
    <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-none mb-8">
      <span className="block">AI MINDSET</span>
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">LABORATORY</span>
    </h1>
    <div className="font-mono text-sm md:text-lg max-w-md">
      Лаборатория нового мышления. От хаоса промптов к персональной операционной системе.
    </div>
  </div>
);

const TracksSlide = () => (
  <div className="flex flex-col h-full justify-center relative z-10">
    <h2 className="text-4xl md:text-6xl font-bold mb-12 uppercase">Program</h2>
    <div className="space-y-6 font-mono text-sm md:text-base">
      <div className="flex gap-4 items-baseline group cursor-pointer hover:pl-4 transition-all">
        <span className="font-bold underline decoration-2 decoration-green-500">A</span>
        <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
        <span>PROMPT ENGINEERING (AI как интерфейс)</span>
      </div>
      <div className="flex gap-4 items-baseline group cursor-pointer hover:pl-4 transition-all">
        <span className="font-bold"></span>
        <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
        <span>CONTEXT ENGINEERING (Автоматизация)</span>
      </div>
      <div className="flex gap-4 items-baseline group cursor-pointer hover:pl-4 transition-all">
        <span className="font-bold underline decoration-2 decoration-blue-500">B</span>
        <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
        <span>MIND ENGINEERING (Продуктивность)</span>
      </div>
      <div className="flex gap-4 items-baseline group cursor-pointer hover:pl-4 transition-all">
        <span className="font-bold"></span>
        <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">4</span>
        <span>LIFE ENGINEERING (Творчество)</span>
      </div>
    </div>
  </div>
);

const PricingSlide = () => (
  <div className="flex flex-col h-full justify-center relative z-10">
    <h2 className="text-4xl md:text-6xl font-bold mb-12 uppercase">Pricing</h2>
    <div className="space-y-8 font-mono">
      {[
        { name: "BASE", price: "€590", features: "Workshops + Community" },
        { name: "ADVANCED", price: "€890", features: "+ 4 Advanced Tracks" },
        { name: "PREMIUM", price: "€1490", features: "Personal Strategy" }
      ].map((plan, i) => (
        <div key={i} className="border-b border-black pb-4 hover:pl-4 transition-all cursor-pointer group">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-xl font-bold group-hover:text-purple-600 transition-colors">{plan.name}</span>
            <span className="text-2xl font-bold">{plan.price}</span>
          </div>
          <div className="text-xs opacity-60 uppercase">{plan.features}</div>
        </div>
      ))}
      <a href="https://join.aimindset.org/context" className="block w-full bg-black text-white text-center py-4 font-bold uppercase hover:bg-transparent hover:text-black border-2 border-black transition-colors mt-8">
        <GlitchText>Подать Заявку</GlitchText>
      </a>
    </div>
  </div>
);

// --- Main Page ---

export default function GlitchSplitPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [<IntroSlide />, <TracksSlide />, <PricingSlide />];

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-[#E0E0E0] font-sans pt-12 flex flex-col md:flex-row overflow-hidden">
      <Header />

      {/* Left Panel - Noise */}
      <div className="w-full md:w-1/2 h-[30vh] md:h-auto relative overflow-hidden bg-black border-b md:border-b-0 md:border-r border-black">
        <NoiseCanvas />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-difference">
          <div className="text-white text-[20vw] font-black leading-none tracking-tighter opacity-50 blur-sm">
            AI
          </div>
        </div>
      </div>

      {/* Right Panel - Content Slider */}
      <div className="w-full md:w-1/2 h-[70vh] md:h-auto relative flex flex-col bg-[#E0E0E0]">
        
        {/* Ethereal Background Layers */}
        <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay"
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}>
        </div>
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-20%] w-[100%] h-[100%] bg-gradient-to-b from-green-300 via-yellow-200 to-transparent opacity-40 blur-3xl rounded-full mix-blend-multiply animate-pulse duration-[5s]"></div>
          <div className="absolute bottom-[-20%] left-[-20%] w-[100%] h-[100%] bg-gradient-to-t from-purple-300 via-pink-200 to-transparent opacity-40 blur-3xl rounded-full mix-blend-multiply animate-pulse duration-[7s]"></div>
        </div>

        {/* Top Track List (Static) */}
        <div className="p-4 md:p-8 font-mono text-[10px] md:text-xs uppercase tracking-wide opacity-60 flex justify-between">
          <div>
            <span className="underline decoration-2 decoration-green-500 mr-2">A</span>
            <span className="mr-4">1 Intro</span>
            <span className="mr-4">2 Context</span>
            <span className="mr-4">3 Mind</span>
          </div>
          <div className="text-right">
            <span className="underline decoration-2 decoration-blue-500 mr-2">B</span>
            <span className="mr-4">4 Life</span>
            <span className="mr-4">5 Outro</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow relative px-8 md:px-16 overflow-hidden">
          {slides[activeSlide]}
        </div>

        {/* Footer Navigation */}
        <div className="p-8 md:p-12 relative z-20">
          <div className="flex items-center justify-between font-mono text-xs md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.5em]">
            <button onClick={prevSlide} className="hover:scale-125 transition-transform p-2">
              <ArrowLeft size={20} />
            </button>
            
            <div className="flex gap-2 md:gap-4">
              {"MIKROKYMATA".split('').map((char, i) => (
                <span key={i} className={`${i === activeSlide * 4 ? 'text-black scale-125' : 'text-gray-400'} transition-all duration-300`}>
                  {char}
                </span>
              ))}
            </div>

            <button onClick={nextSlide} className="hover:scale-125 transition-transform p-2">
              <ArrowRight size={20} />
            </button>
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setActiveSlide(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === activeSlide ? 'bg-black w-4' : 'bg-gray-300 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
