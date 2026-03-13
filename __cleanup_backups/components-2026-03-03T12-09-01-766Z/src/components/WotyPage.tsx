import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Menu, X } from 'lucide-react';

// --- UI Components ---

const WotyContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-full max-w-[1400px] mx-auto px-4 md:px-8 ${className}`}>
    {children}
  </div>
);

const WotyButton = ({ children, href, variant = 'primary', className = "" }: { children: React.ReactNode; href?: string; variant?: 'primary' | 'secondary' | 'pill'; className?: string }) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-200 uppercase tracking-wide font-medium";
  
  const variants = {
    primary: "bg-[#e5e5e5] text-[#1a1a1a] hover:bg-white px-8 py-4 text-lg font-bold w-full md:w-auto",
    secondary: "border border-[#c2410c] text-[#c2410c] hover:bg-[#c2410c] hover:text-[#1a1a1a] px-8 py-4 text-lg font-bold",
    pill: "rounded-full px-4 py-2 text-sm bg-[#2a2a2a] text-[#e5e5e5] hover:bg-[#3a3a3a] border border-transparent"
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

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// --- Sections ---

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { label: 'ФИЛОСОФИЯ', id: 'philosophy' },
    { label: 'ПРОГРАММА', id: 'program' },
    { label: 'ТРЕКИ', id: 'tracks' },
    { label: 'ТАРИФЫ', id: 'pricing' }
  ];
  const applyLetters = ['З', 'А', 'Я', 'В', 'К', 'А'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-md border-b border-[#c2410c]/30">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-3 text-[#e5e5e5] uppercase">
          <img
            src="/assets/ai-mindset-logo.png"
            alt="AI Mindset logo"
            className="h-8 w-8 object-contain"
          />
          <span className="text-sm tracking-[0.2em] border-b border-[#e5e5e5]/60 pb-0.5 font-semibold">AI MINDSET</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-[13px] tracking-[0.16em] font-semibold text-[#d4d4d4] hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="https://join.aimindset.org/waitlist"
          className="hidden md:flex items-center gap-0.5 group"
          aria-label="Заявка"
        >
          {applyLetters.map((letter, idx) => (
            <span
              key={`${letter}-${idx}`}
              className="h-8 w-8 flex items-center justify-center border border-[#c2410c]/60 text-[#e5e5e5] text-sm font-bold tracking-wide group-hover:bg-[#c2410c]/15 transition-colors"
            >
              {letter}
            </span>
          ))}
        </a>

        <button className="md:hidden text-[#e5e5e5]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1a1a1a] border-b border-[#c2410c]/30 p-4">
          <div className="flex flex-col gap-2">
            {navLinks.map(link => (
              <a 
                key={link.id} 
                href={`#${link.id}`}
                className="text-[#e5e5e5] py-2 uppercase font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

const Hero = () => (
  <section className="pt-32 pb-0 overflow-hidden relative border-b border-[#c2410c]/30">
    <WotyContainer className="relative z-10">
      <div className="relative">
        {/* Background Outlined Text */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
           <span className="text-[20vw] md:text-[25vw] font-bold leading-none text-transparent" 
                 style={{ WebkitTextStroke: '1px rgba(194, 65, 12, 0.3)' }}>
             2026
           </span>
        </div>

        {/* Main Text */}
        <div className="relative z-10 mix-blend-normal text-center py-20 md:py-32">
          <h1 className="text-[18vw] md:text-[16vw] font-bold leading-[0.8] tracking-tighter text-[#e5e5e5] mix-blend-overlay opacity-90">
            AI LAB
          </h1>
          <div className="text-[18vw] md:text-[16vw] font-bold leading-[0.8] tracking-tighter text-[#e5e5e5] mix-blend-overlay opacity-90">
            W26
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/2 left-0 md:left-20 -translate-y-1/2 hidden md:block">
           <div className="text-[#c2410c] font-mono text-sm rotate-[-90deg] origin-center whitespace-nowrap">
             ПОТОК: ЗИМА 26
           </div>
        </div>
        <div className="absolute top-1/2 right-0 md:right-20 -translate-y-1/2 hidden md:block">
           <div className="text-[#60a5fa] font-mono text-sm rotate-[90deg] origin-center whitespace-nowrap">
             СЛЕДУЮЩИЙ: 20 АПР
           </div>
        </div>
      </div>
    </WotyContainer>

    {/* Timeline Grid */}
    <div className="grid grid-cols-1 md:grid-cols-4 border-t border-[#c2410c]/30 divide-y md:divide-y-0 md:divide-x divide-[#c2410c]/30 bg-[#1a1a1a]">
      {[
        { label: "Таймлайн", val: "19 Янв — 16 Фев" },
        { label: "Дедлайн заявок", val: "Закрыто", strike: true },
        { label: "Формат", val: "4 Недели / Онлайн" },
        { label: "Отзывы", val: "4.9 / 5" }
      ].map((item, i) => (
        <div key={i} className="p-6 flex flex-col justify-between h-32 hover:bg-[#2a2a2a] transition-colors">
          <span className="text-[#888] text-sm uppercase tracking-wider">{item.label}</span>
          <span className={`text-lg font-bold ${item.strike ? 'line-through text-[#555]' : 'text-[#e5e5e5]'}`}>
            {item.val}
          </span>
        </div>
      ))}
    </div>
  </section>
);

const Philosophy = () => (
  <section id="philosophy" className="py-24 border-b border-[#c2410c]/30">
    <WotyContainer>
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold uppercase leading-tight text-[#e5e5e5] mb-12">
            В этом году <span className="bg-[#e5e5e5] text-[#1a1a1a] px-2">AI Mindset Lab</span> ломает форматы: 
            Открытость к экспериментам, мульти-стиль и отсутствие границ.
          </h2>
          <p className="text-xl text-[#d2d2d2] max-w-2xl mx-auto leading-relaxed">
            Объединяем дизайны, которые расширяют границы и изобретают новые. 
            От хаоса промптов к персональной AI-операционной системе.
          </p>
        </FadeIn>
      </div>
      
      <div className="mt-20 flex flex-wrap justify-center gap-4">
        {['Мышление > Инструменты', 'Практика — главное', 'Сила сообщества', 'Персонализация'].map((tag, i) => (
          <span key={i} className="border border-[#e5e5e5] text-[#e5e5e5] px-4 py-2 uppercase text-sm font-bold tracking-wider hover:bg-[#e5e5e5] hover:text-[#1a1a1a] transition-colors cursor-default">
            {tag}
          </span>
        ))}
      </div>
    </WotyContainer>
  </section>
);

const Program = () => {
  const weeks = [
    { num: "01", title: "Prompt Engineering", desc: "Chain-of-Thought, Few-Shot, Custom GPTs." },
    { num: "02", title: "Context Engineering", desc: "Obsidian + MCP + Claude. Агенты и Workflows." },
    { num: "03", title: "Mind Engineering", desc: "AI Коучинг, Рефлексия, Ритуалы." },
    { num: "04", title: "Life Engineering", desc: "Vibe-coding, Прототипирование, Деплой." }
  ];

  return (
    <section id="program" className="border-b border-[#c2410c]/30">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#c2410c]/30">
        {weeks.map((week, i) => (
          <div key={i} className="group relative h-[400px] p-8 flex flex-col justify-between hover:bg-[#c2410c] transition-colors duration-300">
            <div className="text-[8rem] font-bold leading-none text-[#2a2a2a] group-hover:text-[#ffd9bf]/40 transition-colors">
              {week.num}
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-[#f1f1f1] group-hover:text-[#fff8f1] uppercase mb-4">{week.title}</h3>
              <p className="text-[#d2d2d2] group-hover:text-[#fff2e8] font-medium">{week.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Tracks = () => (
  <section id="tracks" className="py-24 border-b border-[#c2410c]/30 bg-[#1a1a1a]">
    <WotyContainer>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <h2 className="text-6xl md:text-8xl font-bold text-[#e5e5e5] uppercase tracking-tighter">
          Advanced<br/>Tracks
        </h2>
        <p className="text-[#d2d2d2] max-w-md text-lg">
          Глубокое погружение в конкретные домены. Live-сессии, материалы и поддержка сообщества.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-px bg-[#c2410c]/30 border border-[#c2410c]/30">
        {[
          { title: "AI Coaching", sub: "Баланс и Рефлексия" },
          { title: "AI Agents", sub: "Автономные Системы" },
          { title: "Vibe-Coding", sub: "Креативное Программирование" },
          { title: "AI Creative", sub: "Музыка и Визуал" }
        ].map((track, i) => (
          <div key={i} className="bg-[#1a1a1a] p-12 hover:bg-[#222] transition-colors flex items-center justify-between group cursor-pointer">
            <div>
              <h3 className="text-3xl font-bold text-[#e5e5e5] uppercase mb-2 group-hover:text-[#c2410c] transition-colors">{track.title}</h3>
              <p className="text-[#666] uppercase tracking-wider text-sm">{track.sub}</p>
            </div>
            <ArrowRight className="text-[#c2410c] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" size={32} />
          </div>
        ))}
      </div>
    </WotyContainer>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="py-24 border-b border-[#c2410c]/30">
    <WotyContainer>
      <div className="grid lg:grid-cols-3 gap-8">
        {[
          { name: "Main Lab", price: "€590", features: ["4 Live Воркшопа", "Коворкинг", "Доступ к чату"] },
          { name: "Advanced", price: "€890", features: ["Всё из Main Lab", "+4 Advanced Трека", "Приоритетная поддержка"], active: true },
          { name: "Premium", price: "€1,490", features: ["Индивидуальный план", "Сессии 1:1", "Аудит"] }
        ].map((plan, i) => (
          <div key={i} className={`p-8 border ${plan.active ? 'border-[#c2410c] bg-[#c2410c]/5' : 'border-[#333]'} flex flex-col`}>
            <h3 className="text-xl font-bold text-[#e5e5e5] uppercase mb-4">{plan.name}</h3>
            <div className="text-5xl font-bold text-[#e5e5e5] mb-8">{plan.price}</div>
            <ul className="space-y-4 mb-12 flex-grow">
              {plan.features.map((f, j) => (
                <li key={j} className="text-[#d2d2d2] flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-[#c2410c] rounded-full"></span>
                  {f}
                </li>
              ))}
            </ul>
            <WotyButton href="https://join.aimindset.org/context" variant={plan.active ? 'secondary' : 'primary'} className="w-full">
              Выбрать план
            </WotyButton>
          </div>
        ))}
      </div>
    </WotyContainer>
  </section>
);

const Footer = () => (
  <footer className="bg-[#c2410c] py-20">
    <WotyContainer>
      <div className="flex flex-col items-center text-center">
        <h2 className="text-[12vw] font-bold leading-none text-[#1a1a1a] tracking-tighter mb-12">
          ВСТУПАЙ
        </h2>
        <WotyButton href="https://join.aimindset.org/waitlist" className="!bg-[#1a1a1a] !text-[#e5e5e5] hover:!bg-white hover:!text-[#1a1a1a] !text-2xl !px-12 !py-6">
          ПОДАТЬ ЗАЯВКУ НА W26
        </WotyButton>
        
        <div className="mt-20 flex flex-wrap justify-center gap-8 text-[#1a1a1a] font-bold uppercase text-sm tracking-wider">
          <a href="#" className="hover:underline">Telegram</a>
          <a href="#" className="hover:underline">YouTube</a>
          <a href="#" className="hover:underline">Legal</a>
        </div>
        <div className="mt-8 text-[#1a1a1a]/60 text-xs uppercase">
          © 2026 AI Mindset. Designed with WOTY principles.
        </div>
      </div>
    </WotyContainer>
  </footer>
);

export default function WotyPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#e5e5e5] font-sans selection:bg-[#c2410c] selection:text-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Philosophy />
        <Program />
        <Tracks />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
