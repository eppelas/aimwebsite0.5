import React from 'react';

// --- CSS Filters & Assets ---

const AcidFilters = () => (
  <style>{`
    .acid-text-outline {
      -webkit-text-stroke: 2px white;
      color: transparent;
    }
    
    .acid-img-saturated {
      filter: contrast(150%) saturate(300%) hue-rotate(10deg);
      mix-blend-mode: hard-light;
    }

    .acid-img-invert {
      filter: invert(100%) hue-rotate(180deg) saturate(300%) contrast(120%);
      mix-blend-mode: exclusion;
    }

    .acid-img-color-burn {
      filter: contrast(200%) brightness(120%) saturate(200%) hue-rotate(-40deg);
      mix-blend-mode: color-burn;
    }

    .blend-difference {
      mix-blend-mode: difference;
    }
  `}</style>
);

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-full max-w-[1400px] mx-auto px-4 md:px-8 relative z-20 ${className}`}>
    {children}
  </div>
);

// --- Components ---

const BigText = ({ children, className = "", outline = false }: { children: React.ReactNode; className?: string; outline?: boolean }) => (
  <h2 className={`font-sans font-black text-6xl md:text-[10rem] leading-[0.75] tracking-tighter uppercase ${className} ${outline ? 'acid-text-outline' : 'text-[#00FF00]'}`}>
    {children}
  </h2>
);

const FlowerLayer = ({ src, className = "", style = {} }: { src: string; className?: string; style?: React.CSSProperties }) => (
  <div className={`absolute pointer-events-none ${className}`} style={style}>
    <img src={src} alt="" className="w-full h-full object-cover" />
  </div>
);

const Hero = () => (
  <section className="min-h-screen bg-[#FF0055] relative overflow-hidden flex items-center justify-center">
    {/* Vibrant Background Layers */}
    <FlowerLayer 
      src="https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=2128&auto=format&fit=crop" 
      className="inset-0 z-0 opacity-80 acid-img-saturated"
    />
    <FlowerLayer 
      src="https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=2487&auto=format&fit=crop" 
      className="inset-0 z-10 opacity-60 acid-img-invert transform scale-125 rotate-180"
    />
    <FlowerLayer 
      src="https://images.unsplash.com/photo-1490750967868-58cb75065ed4?q=80&w=2487&auto=format&fit=crop" 
      className="inset-0 z-10 opacity-50 acid-img-color-burn mix-blend-multiply"
    />

    {/* Content */}
    <div className="relative z-30 w-full h-full flex flex-col justify-between p-4 md:p-12 min-h-screen">
      <div className="flex justify-between items-start mix-blend-difference">
        <BigText className="text-[#00FFFF]">AI</BigText>
        <BigText className="text-[#FFFF00] text-right">LAB</BigText>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-40">
        <BigText outline className="mix-blend-overlay opacity-80">MINDSET</BigText>
        <BigText className="text-white mix-blend-difference relative -mt-4 md:-mt-12">WINTER 26</BigText>
      </div>

      <div className="flex justify-between items-end mix-blend-hard-light">
        <div className="font-mono text-white bg-black px-4 py-2 text-xl md:text-2xl font-bold transform -rotate-2">
          ЛАБОРАТОРИЯ<br/>
          НОВОГО<br/>
          МЫШЛЕНИЯ
        </div>
        <div className="font-mono text-black bg-[#00FF00] px-4 py-2 text-xl md:text-2xl text-right font-bold transform rotate-2">
          START<br/>
          19 JAN<br/>
          2026
        </div>
      </div>
    </div>
  </section>
);

const Philosophy = () => (
  <section className="bg-[#4D00FF] py-24 relative overflow-hidden">
    <FlowerLayer 
      src="https://images.unsplash.com/photo-1507643179173-442f8552932c?q=80&w=2487&auto=format&fit=crop" 
      className="inset-0 z-0 opacity-40 acid-img-invert"
    />
    
    <Container>
      <div className="relative z-10 bg-[#FFFF00] p-8 md:p-16 transform -rotate-1 shadow-[20px_20px_0px_0px_#FF0055]">
        <h3 className="font-mono text-black text-sm mb-4 uppercase bg-white inline-block px-2">/// Философия</h3>
        <p className="text-[#4D00FF] text-3xl md:text-6xl font-black uppercase leading-[0.9] mb-8">
          Мы не просто учим промптам. <br/>
          <span className="text-white bg-black px-2">Мы перепрошиваем сознание.</span>
        </p>
        <p className="text-black font-mono text-lg leading-relaxed max-w-2xl font-bold">
          От хаоса инструментов к стройной системе. Технологии меняются, мышление остается.
          Your head and brain heat up significantly when you talk on your cell phone.
        </p>
      </div>
    </Container>
  </section>
);

const Program = () => (
  <section className="bg-[#00FF00] py-24 relative">
    <Container>
      <div className="flex flex-col gap-4">
        {[
          { id: "01", title: "PROMPT", sub: "ENGINEERING", color: "text-[#FF0055]", img: "https://images.unsplash.com/photo-1596627689623-1d4b68421869?q=80&w=2574&auto=format&fit=crop" },
          { id: "02", title: "CONTEXT", sub: "ENGINEERING", color: "text-[#4D00FF]", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop" },
          { id: "03", title: "MIND", sub: "ENGINEERING", color: "text-[#FF4500]", img: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=2487&auto=format&fit=crop" },
          { id: "04", title: "LIFE", sub: "ENGINEERING", color: "text-[#000000]", img: "https://images.unsplash.com/photo-1490750967868-58cb75065ed4?q=80&w=2487&auto=format&fit=crop" }
        ].map((item, i) => (
          <div key={i} className="group relative h-48 md:h-80 border-4 border-black bg-white overflow-hidden flex items-center hover:scale-[1.02] transition-transform">
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <img src={item.img} alt={item.title} className="w-full h-full object-cover acid-img-saturated" />
            </div>
            
            <div className="relative z-10 w-full px-4 md:px-12 flex justify-between items-center">
              <span className="font-black text-black text-4xl md:text-6xl opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</span>
              <h2 className={`${item.color} text-6xl md:text-[8rem] font-black tracking-tighter group-hover:text-white group-hover:mix-blend-difference transition-colors`}>
                {item.title}
              </h2>
              <span className="font-mono text-black text-sm bg-[#00FF00] px-2 py-1 hidden md:block border border-black shadow-[4px_4px_0px_0px_black]">{item.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const Pricing = () => (
  <section className="bg-[#FF4500] py-24 relative overflow-hidden">
    <FlowerLayer 
      src="https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=2128&auto=format&fit=crop" 
      className="inset-0 z-0 opacity-20 mix-blend-multiply"
    />

    <Container>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "BASE", price: "590", bg: "bg-white", text: "text-black", accent: "bg-[#00FF00]" },
          { name: "ADVANCED", price: "890", bg: "bg-[#4D00FF]", text: "text-[#00FF00]", accent: "bg-[#FF0055]" },
          { name: "PREMIUM", price: "1490", bg: "bg-black", text: "text-white", accent: "bg-[#FFFF00]" }
        ].map((plan, i) => (
          <div key={i} className={`${plan.bg} ${plan.text} p-8 min-h-[500px] flex flex-col justify-between relative border-4 border-black shadow-[12px_12px_0px_0px_black] hover:-translate-y-2 transition-transform`}>
            
            <div>
              <div className={`inline-block ${plan.accent} text-black font-mono font-bold px-2 py-1 mb-4 text-sm border border-black`}>
                LEVEL 0{i+1}
              </div>
              <h3 className="text-5xl font-black uppercase mb-4 leading-none">{plan.name}</h3>
              <ul className="font-mono text-sm space-y-3 font-bold">
                <li className="flex items-center gap-2">
                  <span className={`w-3 h-3 ${plan.accent} border border-black`}></span> 4 WEEKS
                </li>
                <li className="flex items-center gap-2">
                  <span className={`w-3 h-3 ${plan.accent} border border-black`}></span> COMMUNITY
                </li>
                <li className="flex items-center gap-2">
                  <span className={`w-3 h-3 ${plan.accent} border border-black`}></span> WORKSHOPS
                </li>
              </ul>
            </div>
            
            <div>
              <div className="text-7xl font-black mb-6 tracking-tighter">€{plan.price}</div>
              <a href="https://join.aimindset.org/context" className={`block w-full ${plan.accent} text-black border-2 border-black text-center py-4 font-black uppercase hover:invert transition-all shadow-[4px_4px_0px_0px_black]`}>
                JOIN LAB
              </a>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const Footer = () => (
  <footer className="bg-[#FFFF00] text-black py-12 border-t-4 border-black font-mono text-sm uppercase font-bold">
    <Container>
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-3xl font-black tracking-tighter bg-black text-white px-4 py-1 transform -rotate-2">
          AI MINDSET LAB
        </div>
        <div className="flex gap-4">
          <a href="#" className="bg-white border-2 border-black px-4 py-2 hover:bg-[#FF0055] hover:text-white transition-colors shadow-[4px_4px_0px_0px_black]">Telegram</a>
          <a href="#" className="bg-white border-2 border-black px-4 py-2 hover:bg-[#4D00FF] hover:text-white transition-colors shadow-[4px_4px_0px_0px_black]">YouTube</a>
        </div>
        <div className="bg-black text-white px-2">
          © 2026
        </div>
      </div>
    </Container>
  </footer>
);

export default function NeonBotanicalPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FF0055] selection:text-white">
      <AcidFilters />
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
