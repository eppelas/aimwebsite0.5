import React, { useState } from 'react';

const DarkRedStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
    
    .font-sans { font-family: 'Inter', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    
    /* Blood Orange Red Accent */
    .text-accent { color: #8E2013; }
    .bg-accent { background-color: #8E2013; }
    .border-accent { border-color: #8E2013; }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    /* High contrast outline for hero text */
    .text-outline {
      -webkit-text-stroke: 2px rgba(255, 255, 255, 0.2);
      color: transparent;
    }
  `}</style>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function AiMindsetDarkOrangePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const weeks = [
    {
      subtitle: "PROMPT ENGINEERING",
      title: "AI как интерфейс мышления",
      desc: "Освоение техник промптов: Chain-of-Thought, Few-Shot Learning, Custom GPTs. Создание первых персональных ассистентов."
    },
    {
      subtitle: "CONTEXT ENGINEERING",
      title: "Автоматизация и агенты",
      desc: "Управление контекстом: Obsidian + MCP + Claude. Автоматизация через n8n, Make. AI-агенты и workflows."
    },
    {
      subtitle: "MIND ENGINEERING",
      title: "Продуктивность и ритуалы",
      desc: "AI для коучинга, рефлексии, персональных ритуалов. Трекинг привычек и целей с поддержкой AI."
    },
    {
      subtitle: "LIFE ENGINEERING",
      title: "Творчество и реализация",
      desc: "От идеи до прототипа. Vibe-coding с Cursor, Windsurf, Claude Projects. Создание без технического бэкграунда."
    }
  ];

  const tracks = [
    {
      title: "AI Coaching",
      desc: "Для тех, кто выгорел и ищет баланс. Персональные системы поддержки."
    },
    {
      title: "AI Agents",
      desc: "Автономные AI-системы. Проектирование и запуск агентов."
    },
    {
      title: "Vibe-Coding",
      desc: "Творческое программирование. От идеи до прототипа за часы."
    },
    {
      title: "AI Creative",
      desc: "Для музыкантов и художников. Генерация музыки и визуального контента."
    }
  ];

  const cases = [
    { title: "AI COACHING", desc: "Персональный AI-коуч с голосовым интерфейсом. Контекст из заметок.", tools: "Claude, Vapi, Obsidian" },
    { title: "AI VISION", desc: "Автоматическая сортировка и теггинг визуального контента.", tools: "GPT Vision, Claude" },
    { title: "AI LEARNING", desc: "Языковой партнер. Разговорная практика с адаптивной сложностью.", tools: "GPT-4, ElevenLabs" },
    { title: "AI SUMMARY", desc: "Транскрипция Zoom со speaker diarization. Action items в CRM.", tools: "Zoom, Gemini, Whisper" },
    { title: "AI KNOWLEDGE", desc: "RAG-система для Obsidian. Семантический поиск по заметкам.", tools: "Obsidian, Claude API" },
    { title: "AI PROJECT", desc: "PM-ассистент. Мониторинг прогресса с автостатусами.", tools: "Linear, Notion" },
    { title: "AI AUTOMATION", desc: "Email-триаж, CRM-обновления, документооборот.", tools: "n8n, Make, Claude" },
    { title: "AI RESEARCH", desc: "Исследовательский ассистент. Поиск и синтез из научных баз.", tools: "Perplexity, Elicit" },
  ];

  const team = [
    { name: "Александр Поваляев", role: "Основатель, стратег", desc: "15+ лет соединяет технологии, бизнес и людей. Верит в «экосистемное мышление»." },
    { name: "Сергей Хабаров", role: "Системный архитектор", desc: "Ведет Context Engineering: как структурировать знания, чтобы AI с ними работал." },
    { name: "Степан Гершуни", role: "Технологический стратег", desc: "Инвестор Cyber Fund. Автор cybOS (cyber operating system)." },
    { name: "Алексей Иванов", role: "Executive-коуч", desc: "ICF PCC, ex-дизайн лид. Ведет advanced-трек: AI-coaching." },
    { name: "Серёжа Рис", role: "AI-евангелист", desc: "Билдер и фаундер @vibecod3rs. Ведёт advanced-трек: vibe-coding." },
    { name: "Анна Ставенски", role: "Продуктовый архитектор", desc: "Ведет Life Engineering: поможет собрать инструменты в единую систему." },
  ];

  const feedback = [
    { text: "После лабы я понял: это не просто инструменты, а новый способ мышления. Я офигел, когда Cursor сам нашел решение проблемы.", author: "Сергей Петров", role: "Unix developer" },
    { text: "Я боялась, что это слишком сложно для нетехнического человека. Но через 3 недели я уже создавала агентов и автоматизации.", author: "Екатерина Грачева", role: "HR-коммуникации" },
    { text: "После первой лекции по вайб-кодингу я не мог уснуть до 6 утра. Побежал делать. Это было мощно.", author: "Антон Мормышев", role: "Участник" },
    { text: "Я на 30% начала думать AI-first в работе. Качественно изменилась подготовка обучающих материалов.", author: "Александра Гусева", role: "L&D" },
    { text: "У меня исчезло ощущение страха перед первым шагом в куче инструментов. Теперь гораздо проще зайти в любой инструмент.", author: "Роман Максимов", role: "Product Manager" },
  ];

  const plans = [
    {
      name: "MAIN LAB",
      price: "€590",
      highlight: false,
      features: ["4 Live Воркшопа", "Коворкинг", "Доступ к чату", "Демо-день и защита"]
    },
    {
      name: "ADVANCED",
      price: "€890",
      highlight: true,
      features: ["Всё из Main Lab", "+4 Advanced Трека", "Приоритетная поддержка", "Еженедельные разборы"]
    },
    {
      name: "PREMIUM",
      price: "€1,490",
      highlight: false,
      features: ["Индивидуальный план", "Сессии 1:1", "Аудит процессов", "Личный трекинг"]
    }
  ];

  return (
    <div className="h-screen overflow-y-scroll bg-[#111111] text-white font-sans selection:bg-[#8E2013] selection:text-white hide-scrollbar">
      <DarkRedStyles />

      {/* HEADER */}
      <nav className="flex justify-between items-center p-6 border-b border-[#8E2013]/30 sticky top-0 bg-[#111111]/95 backdrop-blur z-50">
        <div className="flex items-center gap-3 font-bold text-xl tracking-tight z-50">
          <img
            src="/assets/ai-mindset-logo.png"
            alt="AI Mindset logo"
            className="h-8 w-8 object-contain"
          />
          <span>AI MINDSET</span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-4">
          <button onClick={() => scrollTo('philosophy')} className="px-5 py-2 rounded-sm bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors">ФИЛОСОФИЯ</button>
          <button onClick={() => scrollTo('program')} className="px-5 py-2 rounded-sm bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors">ПРОГРАММА</button>
          <button onClick={() => scrollTo('tracks')} className="px-5 py-2 rounded-sm bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors">ТРЕКИ</button>
          <button onClick={() => scrollTo('cases')} className="px-5 py-2 rounded-sm bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors">КЕЙСЫ</button>
          <button onClick={() => scrollTo('pricing')} className="px-5 py-2 rounded-sm bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors">ТАРИФЫ</button>
        </div>
        
        <button onClick={() => scrollTo('pricing')} className="hidden lg:block px-6 py-2 rounded-sm bg-accent text-white text-sm font-bold hover:bg-accent/90 transition-colors">
          В ЛИСТ ОЖИДАНИЯ
        </button>

        {/* Mobile Hamburger */}
        <button className="lg:hidden z-50 p-2 bg-white/10 hover:bg-white/20 rounded-sm transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <XIcon /> : <MenuIcon />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-[#111111] z-40 flex flex-col pt-24 px-6 pb-6 overflow-y-auto">
            <div className="flex flex-col gap-2 flex-grow">
              <button onClick={() => scrollTo('philosophy')} className="text-left text-2xl font-bold py-4 border-b border-white/10 hover:text-accent transition-colors">Философия</button>
              <button onClick={() => scrollTo('program')} className="text-left text-2xl font-bold py-4 border-b border-white/10 hover:text-accent transition-colors">Программа</button>
              <button onClick={() => scrollTo('tracks')} className="text-left text-2xl font-bold py-4 border-b border-white/10 hover:text-accent transition-colors">Треки</button>
              <button onClick={() => scrollTo('cases')} className="text-left text-2xl font-bold py-4 border-b border-white/10 hover:text-accent transition-colors">Кейсы</button>
              <button onClick={() => scrollTo('team')} className="text-left text-2xl font-bold py-4 border-b border-white/10 hover:text-accent transition-colors">Команда</button>
              <button onClick={() => scrollTo('feedback')} className="text-left text-2xl font-bold py-4 border-b border-white/10 hover:text-accent transition-colors">Отзывы</button>
              <button onClick={() => scrollTo('pricing')} className="text-left text-2xl font-bold py-4 border-b border-white/10 hover:text-accent transition-colors">Тарифы</button>
              <button onClick={() => scrollTo('faq')} className="text-left text-2xl font-bold py-4 border-b border-white/10 hover:text-accent transition-colors">FAQ</button>
            </div>
            <button onClick={() => scrollTo('pricing')} className="w-full mt-8 px-6 py-4 rounded-sm bg-accent text-white text-lg font-bold hover:bg-accent/90 transition-colors">
              В ЛИСТ ОЖИДАНИЯ
            </button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="pt-32 pb-0 overflow-hidden relative border-b border-[#8E2013]/30">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
          <div className="relative">
            {/* Background Outlined Text */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
              <span
                className="text-[20vw] md:text-[25vw] font-bold leading-none text-transparent"
                style={{ WebkitTextStroke: '1px rgba(142, 32, 19, 0.55)' }}
              >
                2026
              </span>
            </div>

            {/* Main Text */}
            <div className="relative z-10 mix-blend-normal text-center py-20 md:py-32">
              <h1 className="text-[14vw] md:text-[12vw] font-bold leading-[0.8] tracking-tighter text-[#e5e5e5] mix-blend-overlay opacity-90">
                AI MINDSET
              </h1>
              <div className="text-[18vw] md:text-[16vw] font-bold leading-[0.8] tracking-tighter text-[#e5e5e5] mix-blend-overlay opacity-90">
                W26
              </div>
            </div>

            {/* Side Labels */}
            <div className="absolute top-1/2 left-0 md:left-20 -translate-y-1/2 hidden md:block">
              <div className="text-accent font-mono text-sm rotate-[-90deg] origin-center whitespace-nowrap">
                ПОТОК: ЗИМА 26
              </div>
            </div>
            <div className="absolute top-1/2 right-0 md:right-20 -translate-y-1/2 hidden md:block">
              <div className="text-[#60a5fa] font-mono text-sm rotate-[90deg] origin-center whitespace-nowrap">
                СЛЕДУЮЩИЙ: 20 АПР
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 border-t border-[#8E2013]/30 divide-y md:divide-y-0 md:divide-x divide-[#8E2013]/30 bg-[#111111]">
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

      {/* VALUE PROPOSITION */}
      <section id="philosophy" className="py-24 px-6 md:px-12 border-t border-white/20 bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 leading-tight text-white">
            Мы создаём пространство, где <span className="text-accent">mindset важнее инструментов</span>. Технологии меняются, а новый способ мышления остаётся с вами.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="w-4 h-4 bg-accent mb-6 rounded-sm"></div>
              <h3 className="font-bold text-xl mb-4 text-[#fff8f2]">Практика встроена в процесс</h3>
              <p className="text-white/90 leading-relaxed">Каждая неделя это эксперимент с реальными задачами и артефактами. Вы уходите с работающими системами.</p>
            </div>
            <div>
              <div className="w-4 h-4 bg-accent mb-6 rounded-sm"></div>
              <h3 className="font-bold text-xl mb-4 text-[#fff8f2]">Сообщество усиливает</h3>
              <p className="text-white/90 leading-relaxed">Вы учитесь не только у экспертов, но и друг у друга. Обмен опытом и совместное решение задач.</p>
            </div>
            <div>
              <div className="w-4 h-4 bg-accent mb-6 rounded-sm"></div>
              <h3 className="font-bold text-xl mb-4 text-[#fff8f2]">Персонализация</h3>
              <p className="text-white/90 leading-relaxed">Углубляйтесь в то, что нужно именно вам через дополнительные треки и индивидуальные консультации.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SYLLABUS / CURRICULUM */}
      <section id="program" className="border-t border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {weeks.map((w, i) => (
            <div key={i} className={`p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/20 flex flex-col ${i === 1 ? 'bg-accent' : 'bg-[#111111]'}`}>
              <div className={`text-8xl md:text-9xl font-bold mb-16 tracking-tighter ${i === 1 ? 'text-black/20' : 'text-white/10'}`}>
                0{i+1}
              </div>
              <div className={`text-xs uppercase tracking-widest mb-4 font-mono font-bold ${i === 1 ? 'text-black/70' : 'text-white/50'}`}>
                {w.subtitle}
              </div>
              <h3 className={`text-2xl font-bold mb-6 ${i === 1 ? 'text-white' : 'text-white'}`}>
                {w.title}
              </h3>
              <p className={`text-sm leading-relaxed mt-auto ${i === 1 ? 'text-white/90' : 'text-white/80'}`}>
                {w.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TRACKS (ADVANCED) */}
      <section id="tracks" className="border-t border-white/20 bg-[#0A0A0A]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-12 md:p-24 border-b lg:border-b-0 lg:border-r border-white/20 flex flex-col justify-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">AI Mindset<br/>Lab W26<br/>Advanced</h2>
            <div className="text-xs text-white/60 uppercase tracking-widest mt-8 font-mono font-bold">[ TRACKS ]</div>
            <p className="mt-8 text-white/80 max-w-md leading-relaxed text-lg">
              Основная программа даёт фундамент. Треки — это углубление в конкретный домен. Выбираешь то, что нужно.
            </p>
          </div>
          <div className="flex flex-col">
            {tracks.map((t, i) => (
              <div key={i} className="p-8 md:p-12 border-b border-white/20 flex justify-between items-start group hover:bg-white/10 transition-colors cursor-pointer">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-accent transition-colors text-white">{t.title}</h3>
                  <p className="text-sm text-white/70 max-w-md font-mono leading-relaxed">{t.desc}</p>
                </div>
                <div className="text-white/50 font-mono group-hover:text-accent transition-colors text-xl font-bold">[ + ]</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="py-24 border-t border-white/20 bg-[#111111]">
        <div className="px-6 md:px-12 mb-16 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Артефакты</h2>
          <p className="text-white/80 text-lg leading-relaxed">Что создают участники за 4 недели? Не учебные примеры, а агенты, workflows, ассистенты и продукты, которые реально работают.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/20">
          {cases.map((c, i) => (
            <div key={i} className="p-8 border-b border-r border-white/20 hover:bg-white/10 transition-colors flex flex-col">
              <div className="text-accent font-mono text-xs mb-6 uppercase tracking-widest font-bold">{c.title}</div>
              <p className="text-sm mb-8 leading-relaxed flex-grow text-white/90">{c.desc}</p>
              <div className="text-[10px] text-white/60 font-mono uppercase tracking-widest pt-4 border-t border-white/20 font-bold">
                {c.tools}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-24 px-6 md:px-12 border-t border-white/20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white">Кто мы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {team.map((t, i) => (
              <div key={i} className="group">
                <div className="w-16 h-16 rounded-sm bg-white/10 flex items-center justify-center text-2xl font-bold mb-6 group-hover:bg-accent group-hover:text-white transition-colors border border-white/20 text-white">
                  {t.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{t.name}</h3>
                <div className="text-accent text-xs font-mono uppercase tracking-widest mb-4 font-bold">{t.role}</div>
                <p className="text-sm text-white/80 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEEDBACK */}
      <section id="feedback" className="py-24 border-t border-white/20 bg-[#111111]">
        <div className="px-6 md:px-12 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Что говорят о нас</h2>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar px-6 md:px-12 gap-6 pb-8">
          {feedback.map((f, i) => (
            <div key={i} className="min-w-[320px] max-w-[400px] p-8 border border-white/20 bg-[#0A0A0A] flex flex-col rounded-sm">
              <p className="text-sm italic text-white/90 mb-8 leading-relaxed flex-grow">"{f.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-sm bg-white/20"></div>
                <div>
                  <div className="font-bold text-sm text-white">{f.author}</div>
                  <div className="text-xs text-white/60 font-mono mt-1 font-bold">{f.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 border-t border-white/20 bg-[#0A0A0A]">
        <div className="px-6 md:px-12 mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Тарифы</h2>
          <p className="text-white/70 font-mono text-sm font-bold">Alumni (-20%) · Bring a Friend (-10%)</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 md:px-12 max-w-6xl mx-auto">
          {plans.map((p, i) => (
            <div key={i} className={`p-8 md:p-10 flex flex-col rounded-sm ${p.highlight ? 'border-2 border-accent bg-accent/10' : 'border border-white/20 bg-[#111111]'}`}>
              <div className={`text-xs uppercase tracking-widest mb-4 font-mono font-bold ${p.highlight ? 'text-accent' : 'text-white/85'}`}>{p.name}</div>
              <div className="text-5xl font-bold mb-10 text-white">{p.price}</div>
              <ul className="space-y-5 mb-12 flex-grow">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-4 text-sm text-white/90">
                    <div className={`w-2 h-2 rounded-sm ${p.highlight ? 'bg-accent' : 'bg-white/40'}`}></div>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 text-sm font-bold tracking-wider transition-colors rounded-sm ${p.highlight ? 'bg-accent text-white hover:bg-accent/80' : 'bg-white text-black hover:bg-white/80'}`}>
                ВЫБРАТЬ ПЛАН
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ & FOOTER */}
      <footer id="faq" className="border-t border-white/20">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-12 md:p-24 border-b lg:border-b-0 lg:border-r border-white/20 bg-[#111111]">
            <h2 className="text-4xl font-bold mb-16 text-white">FAQ</h2>
            <div className="space-y-6">
              {['Организация и процессы', 'Ожидания и результат', 'Оплата и условия', 'Ты представитель non-profit/art сферы?'].map((q, i) => (
                <div key={i} className="border-b border-white/20 pb-6 flex justify-between items-center cursor-pointer hover:text-accent transition-colors group">
                  <span className="font-medium text-lg text-white/90 group-hover:text-white">{q}</span>
                  <span className="text-white/50 group-hover:text-accent font-mono text-xl font-bold">+</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-12 md:p-24 bg-accent text-white flex flex-col justify-between">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Готовы начать?</h2>
              <p className="text-white/90 mb-16 max-w-sm text-lg leading-relaxed font-medium">Остались вопросы? Пиши основателю проекта @alex_named</p>
            </div>
            <div className="space-y-6">
              <a href="#" className="block text-2xl md:text-3xl font-bold hover:opacity-80 transition-opacity flex justify-between items-center border-b border-white/30 pb-4">
                alex@aimindset.org <span>↗</span>
              </a>
              <a href="#" className="block text-2xl md:text-3xl font-bold hover:opacity-80 transition-opacity flex justify-between items-center border-b border-white/30 pb-4">
                Telegram Channel <span>↗</span>
              </a>
            </div>
          </div>
        </div>
        <div className="p-6 md:px-12 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60 font-mono font-bold bg-[#0A0A0A]">
          <div>© 2026 AI MINDSET</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Оферта</a>
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
