import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

// --- Components ---

const DotContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-full max-w-[1400px] mx-auto px-6 md:px-12 ${className}`}>
    {children}
  </div>
);

const DotButton = ({ children, href, variant = 'primary', className = "" }: { children: React.ReactNode; href?: string; variant?: 'primary' | 'nav'; className?: string }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-2 rounded-full text-sm font-bold transition-transform active:scale-95";
  const variants = {
    primary: "bg-[#111111] text-[#5465FF] hover:bg-[#222]",
    nav: "bg-[#111111] text-[#5465FF] hover:bg-[#222] px-5 py-2"
  };

  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: 'Философия', href: '#philosophy' },
    { name: 'Программа', href: '#program' },
    { name: 'Треки', href: '#tracks' },
    { name: 'Тарифы', href: '#pricing' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-6 pointer-events-none">
      <DotContainer className="flex items-start justify-between pointer-events-auto">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-[0.85] font-bold text-2xl tracking-tighter text-[#111111] uppercase">
          <span>AI</span>
          <span>Mind</span>
          <span>Set</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2 bg-[#111111] p-1.5 rounded-full">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className="px-5 py-2 rounded-full text-sm font-bold text-[#5465FF] hover:bg-[#5465FF] hover:text-[#111111] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <DotButton href="https://join.aimindset.org/waitlist">
            В лист ожидания
          </DotButton>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 bg-[#111111] text-[#5465FF] rounded-full" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </DotContainer>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 bg-[#111111] rounded-2xl p-4 pointer-events-auto">
          <div className="flex flex-col gap-2">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[#5465FF] font-bold py-3 px-4 hover:bg-[#5465FF] hover:text-[#111111] rounded-xl transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
             <a 
                href="https://join.aimindset.org/waitlist" 
                className="text-[#111111] bg-[#5465FF] font-bold py-3 px-4 rounded-xl text-center mt-2"
              >
                В лист ожидания
              </a>
          </div>
        </div>
      )}
    </header>
  );
};

const Diagram = () => (
  <div className="w-full aspect-square md:aspect-[16/9] relative flex items-center justify-center my-12 md:my-0">
    {/* Abstract representation of the diagram in the image */}
    <svg viewBox="0 0 800 450" className="w-full h-full max-w-4xl opacity-90">
      {/* Central Structure */}
      <g stroke="#111111" strokeWidth="2" fill="none">
        <circle cx="400" cy="225" r="150" />
        <circle cx="400" cy="225" r="100" />
        <circle cx="400" cy="225" r="50" />
        
        {/* Lines radiating */}
        <line x1="400" y1="75" x2="400" y2="375" />
        <line x1="250" y1="225" x2="550" y2="225" />
        <line x1="294" y1="119" x2="506" y2="331" />
        <line x1="506" y1="119" x2="294" y2="331" />
      </g>

      {/* Nodes */}
      <g fill="#111111">
        <circle cx="400" cy="75" r="8" />
        <circle cx="400" cy="375" r="8" />
        <circle cx="250" cy="225" r="8" />
        <circle cx="550" cy="225" r="8" />
        
        {/* Orbiting nodes */}
        <circle cx="400" cy="125" r="12" fill="none" stroke="#111111" strokeWidth="4" />
        <circle cx="506" cy="331" r="12" />
        <circle cx="294" cy="119" r="12" fill="none" stroke="#111111" strokeWidth="4" />
      </g>

      {/* Decorative elements */}
      <g stroke="#111111" strokeWidth="2">
        <line x1="100" y1="225" x2="200" y2="225" />
        <line x1="150" y1="175" x2="150" y2="275" />
        <circle cx="150" cy="225" r="30" fill="none" />
        
        <line x1="600" y1="225" x2="700" y2="225" />
        <line x1="650" y1="175" x2="650" y2="275" />
        <rect x="630" y="205" width="40" height="40" fill="none" />
      </g>
    </svg>
  </div>
);

const Hero = () => (
  <section className="pt-32 pb-12 min-h-screen flex flex-col justify-center relative overflow-hidden">
    <DotContainer className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
      <div className="md:col-span-4">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-[#111111] leading-[0.9] mb-8">
          AI<br/>Mindset<br/>Lab.
        </h1>
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-full border-2 border-[#111111] flex items-center justify-center">
             <div className="w-4 h-4 bg-[#111111] rounded-full animate-pulse"></div>
           </div>
           <p className="font-bold text-[#111111] max-w-[200px] leading-tight">
             Операционная система нового мышления.
           </p>
        </div>
      </div>
      <div className="md:col-span-8">
        <Diagram />
      </div>
    </DotContainer>
    
    {/* Bottom decorative dots */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-[#111111]"></div>
      <div className="w-20 h-1 bg-[#111111]"></div>
      <div className="w-6 h-6 rounded-full bg-[#111111]"></div>
    </div>
  </section>
);

const InfoGrid = () => (
  <section className="py-24 bg-[#5465FF]">
    <DotContainer>
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] tracking-tight leading-none">
            Информация<br/>о потоке:
          </h2>
        </div>
        <div className="md:col-span-8 grid sm:grid-cols-2 gap-x-12 gap-y-16">
          {[
            { label: "Название потока:", val: "●—● AI Mindset W26 ●—●" },
            { label: "Статус набора:", val: "Закрыт (Sold Out)" },
            { label: "ID Потока:", val: "W26" },
            { label: "Следующий старт:", val: "20 Апреля" },
            { label: "Длительность*:", val: "4 Недели" },
            { label: "Формат:", val: "Online / Live" }
          ].map((item, i) => (
            <div key={i}>
              <h3 className="text-xl font-bold text-[#111111] mb-2 opacity-80">{item.label}</h3>
              <p className="text-3xl font-bold text-[#111111] tracking-tight">{item.val}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-24 flex items-center gap-4">
         <div className="flex gap-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`w-8 h-8 rounded-full ${i % 2 === 0 ? 'bg-[#111111]' : 'border-2 border-[#111111]'} transform rotate-45`}></div>
            ))}
         </div>
         <p className="text-xs font-bold max-w-md ml-auto text-right">
           * Это интенсивная программа. Результат зависит от вашего вовлечения. Мы даем инструменты, вы строите систему.
         </p>
      </div>
    </DotContainer>
  </section>
);

const ProgramSteps = () => (
  <section id="program" className="py-24">
    <DotContainer>
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-4">Программа:</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { title: "Prompt", step: "01" },
          { title: "Context", step: "02" },
          { title: "Mind", step: "03" },
          { title: "Life", step: "04" }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center group cursor-pointer">
            <div className="w-full aspect-square rounded-full border-2 border-[#111111] flex items-center justify-center mb-6 transition-colors group-hover:bg-[#111111] group-hover:text-[#5465FF]">
              <span className="text-6xl font-bold">{item.step}</span>
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-tight">{item.title}</h3>
            <p className="text-sm font-bold opacity-60 mt-2">Engineering</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-4 gap-8 mt-16 border-t-2 border-[#111111] pt-8">
        {[
          "Освоение техник промптов: Chain-of-Thought, Few-Shot. Создание первых ассистентов.",
          "Управление контекстом: Obsidian + MCP + Claude. Автоматизация через n8n.",
          "AI для коучинга, рефлексии, персональных ритуалов. Трекинг привычек.",
          "От идеи до прототипа. Vibe-coding с Cursor. Создание без кода."
        ].map((desc, i) => (
          <div key={i}>
            <p className="font-medium text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </DotContainer>
  </section>
);

const Tracks = () => (
  <section id="tracks" className="py-24 bg-[#111111] text-[#5465FF]">
    <DotContainer>
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <h2 className="text-4xl md:text-5xl font-bold text-[#5465FF]">Треки:</h2>
        <div className="flex gap-2">
           <span className="px-4 py-1 rounded-full border border-[#5465FF] text-sm font-bold">Advanced</span>
           <span className="px-4 py-1 rounded-full border border-[#5465FF] text-sm font-bold">Premium</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {[
          { title: "AI Coaching", desc: "Баланс и Рефлексия" },
          { title: "AI Agents", desc: "Автономные Системы" },
          { title: "Vibe-Coding", desc: "Креативное Программирование" },
          { title: "AI Creative", desc: "Музыка и Визуал" }
        ].map((track, i) => (
          <div key={i} className="border-2 border-[#5465FF] rounded-3xl p-8 hover:bg-[#5465FF] hover:text-[#111111] transition-colors cursor-pointer group">
            <div className="flex justify-between items-center mb-4">
              <div className="w-4 h-4 rounded-full bg-[#5465FF] group-hover:bg-[#111111]"></div>
              <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="text-3xl font-bold mb-2">{track.title}</h3>
            <p className="font-bold opacity-80">{track.desc}</p>
          </div>
        ))}
      </div>
    </DotContainer>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="py-24">
    <DotContainer>
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[#111111]">Тарифы:</h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {[
          { name: "Main Lab", price: "€590", features: ["4 Live Воркшопа", "Коворкинг", "Чат"] },
          { name: "Advanced", price: "€890", features: ["Всё из Main Lab", "+4 Трека", "Поддержка"], active: true },
          { name: "Premium", price: "€1,490", features: ["Индивидуальный план", "Сессии 1:1", "Аудит"] }
        ].map((plan, i) => (
          <div key={i} className={`p-8 rounded-3xl border-2 border-[#111111] flex flex-col ${plan.active ? 'bg-[#111111] text-[#5465FF]' : 'bg-transparent text-[#111111]'}`}>
            <div className="flex justify-between items-start mb-8">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              {plan.active && <div className="w-4 h-4 rounded-full bg-[#5465FF]"></div>}
            </div>
            <div className="text-5xl font-bold mb-8 tracking-tighter">{plan.price}</div>
            <ul className="space-y-4 mb-12 flex-grow">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 font-bold text-sm">
                  <div className={`w-2 h-2 rounded-full ${plan.active ? 'bg-[#5465FF]' : 'bg-[#111111]'}`}></div>
                  {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 rounded-full font-bold text-sm uppercase tracking-wider border-2 border-current hover:opacity-80 transition-opacity ${plan.active ? 'bg-[#5465FF] text-[#111111] border-[#5465FF]' : ''}`}>
              Выбрать
            </button>
          </div>
        ))}
      </div>
    </DotContainer>
  </section>
);

const Footer = () => (
  <footer className="py-12 border-t-2 border-[#111111]">
    <DotContainer>
      <div className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-tighter leading-none mb-4">
            AI<br/>Mind<br/>Set
          </h2>
          <p className="text-xs font-bold max-w-[200px]">
            © 2026. Designed with Dot Line Dot principles.
          </p>
        </div>
        
        <div className="flex gap-4">
           <a href="#" className="w-12 h-12 rounded-full border-2 border-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-[#5465FF] transition-colors font-bold">TG</a>
           <a href="#" className="w-12 h-12 rounded-full border-2 border-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-[#5465FF] transition-colors font-bold">YT</a>
        </div>
      </div>
    </DotContainer>
  </footer>
);

export default function DotPage() {
  return (
    <div className="min-h-screen bg-[#5465FF] text-[#111111] font-sans selection:bg-[#111111] selection:text-[#5465FF]">
      <Header />
      <main>
        <Hero />
        <InfoGrid />
        <ProgramSteps />
        <Tracks />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
