import React, { useState, useEffect } from 'react';

const BurgundyStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap');
    
    .font-display { font-family: 'Anton', sans-serif; letter-spacing: 0.02em; }
    .font-sans { font-family: 'Inter', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    .font-serif { font-family: 'Playfair Display', serif; }
    
    .text-burgundy { color: #9B1C31; }
    .bg-burgundy { background-color: #9B1C31; }
    .border-burgundy { border-color: #9B1C31; }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    .wireframe-grid {
      background-image: 
        linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
      background-size: 40px 40px;
      background-position: center center;
    }
  `}</style>
);

const WireframeBox = ({ fig, title, children }: { fig: string, title?: string, children: React.ReactNode }) => (
  <div className="relative w-full aspect-square border border-white/10 bg-[#111] overflow-hidden flex items-center justify-center p-8">
    <div className="absolute inset-0 wireframe-grid opacity-50"></div>
    
    {/* Corner markers */}
    <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20"></div>
    <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20"></div>
    <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20"></div>
    <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20"></div>
    
    <div className="relative z-10 w-full h-full flex items-center justify-center">
      {children}
    </div>
    
    <div className="absolute bottom-4 left-4 font-mono text-[10px] text-burgundy">
      FIG. {fig}
    </div>
    {title && (
      <div className="absolute bottom-4 right-4 font-mono text-[8px] text-white/30 uppercase tracking-widest">
        {title}
      </div>
    )}
  </div>
);

const DotNav = () => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50 mix-blend-difference">
      {[...Array(12)].map((_, i) => (
        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 2 ? 'bg-burgundy' : 'bg-white/20'}`}></div>
      ))}
    </div>
  );
};

export default function AiMindsetBurgundyPage() {
  return (
    <div className="h-screen overflow-y-scroll bg-[#0A0A0A] text-white font-sans selection:bg-burgundy selection:text-white hide-scrollbar">
      <BurgundyStyles />
      <DotNav />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-white rounded-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 50%)' }} />
          <div className="w-6 h-6 rounded-sm border border-white/20 bg-black/40 flex items-center justify-center">
            <img
              src="/assets/ai-mindset-logo.png"
              alt="AI Mindset logo"
              className="h-3 w-auto object-contain"
            />
          </div>
          <div>
            <div className="font-display text-lg leading-none uppercase">AI MINDSET</div>
            <div className="font-mono text-[8px] text-white/50 tracking-widest">winter lab w26</div>
          </div>
        </div>
        <div className="flex gap-6 font-mono text-xs uppercase tracking-widest text-white/50 hidden md:flex">
          <a href="#" className="hover:text-white transition-colors">Лаборатория</a>
          <a href="#" className="hover:text-white transition-colors">Треки</a>
          <a href="#" className="hover:text-white transition-colors">Кейсы</a>
          <a href="#" className="hover:text-white transition-colors">Команда</a>
        </div>
        <div className="flex gap-2 font-mono text-xs">
          <button className="px-2 py-1 border border-white/20 hover:border-white transition-colors">EN</button>
          <button className="px-2 py-1 bg-burgundy text-white">RU</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="min-h-screen pt-32 px-6 md:px-12 flex flex-col justify-center max-w-7xl mx-auto relative">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-burgundy text-white px-3 py-1 font-display text-xl uppercase tracking-wider">
            BATCH: WINTER 26
          </div>
          <div className="font-mono text-xs text-white/50 uppercase tracking-widest">
            19.01.2026 — 16.02.2026
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-[140px] font-display uppercase leading-[0.85] mb-12">
          AI MINDSET<br/>
          LAB W26
        </h1>
        
        <p className="text-xl md:text-2xl text-white/70 max-w-3xl leading-relaxed mb-12 font-sans font-light">
          Лаборатория нового мышления в эпоху AI. От хаоса промптов к персональной AI-операционной системе.
        </p>

        <div className="flex gap-4">
          <button className="bg-burgundy text-white px-8 py-4 font-display text-xl uppercase tracking-wider hover:bg-white hover:text-black transition-colors flex items-center gap-2">
            ПОДАТЬ ЗАЯВКУ <span className="text-sm">→</span>
          </button>
          <button className="border border-white/20 px-8 py-4 font-display text-xl uppercase tracking-wider hover:border-white transition-colors">
            WAITLIST
          </button>
        </div>

        <div className="absolute bottom-12 left-6 md:left-12 font-mono text-xs text-white/40 uppercase tracking-widest flex gap-8">
          <span>LINKS</span>
          <span className="text-white/20">·</span>
          <a href="#" className="hover:text-white transition-colors">aimindset.org</a>
          <a href="#" className="hover:text-white transition-colors">@ai_mind_set</a>
        </div>
      </section>

      {/* PHILOSOPHY QUOTE */}
      <section className="py-32 px-6 md:px-12 border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-burgundy to-transparent"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 mt-16">
          <div className="inline-block bg-burgundy text-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest mb-12">
            философия лаборатории
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif italic leading-tight mb-16">
            "AI mindset winter lab w26 — это лаборатория, пространство для экспериментов. здесь вы не изучаете, а создаёте: персональных ассистентов, AI-first процессы, новую версию себя."
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left font-sans text-white/70">
            <div className="border-l border-burgundy/30 pl-6">
              <h3 className="text-white font-display text-2xl uppercase mb-4">Mindset &gt; Инструменты</h3>
              <p className="leading-relaxed">Технологии меняются, а новый способ мышления остаётся с вами. Мы строим фундамент, который не устареет через месяц.</p>
            </div>
            <div className="border-l border-burgundy/30 pl-6">
              <h3 className="text-white font-display text-2xl uppercase mb-4">Практика &gt; Теория</h3>
              <p className="leading-relaxed">Каждая неделя это эксперимент с реальными задачами и артефактами. Вы уходите с работающими системами, а не конспектами.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE: MAIN LAB */}
      <section className="py-32 border-t border-white/10 overflow-hidden bg-[#050505]">
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-24">
          <div className="bg-burgundy text-white px-2 py-1 font-display text-sm uppercase tracking-wider inline-block mb-6">
            TIMELINE
          </div>
          <h2 className="text-5xl md:text-7xl font-display uppercase">MAIN LAB</h2>
          <p className="font-mono text-sm text-white/50 mt-4">19 января – 16 февраля · 4 недели · prompt &gt;&gt; context &gt;&gt; mind &gt;&gt; life</p>
        </div>

        <div className="relative px-6 md:px-12 max-w-7xl mx-auto">
          {/* Horizontal Line */}
          <div className="absolute top-[28px] left-6 md:left-12 right-6 md:right-12 h-[1px] bg-white/20"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {/* Week 1 */}
            <div className="pt-0">
              <div className="w-3 h-3 rounded-full bg-burgundy mx-auto mb-6 relative z-10 ring-4 ring-[#050505]"></div>
              <div className="border border-burgundy bg-[#111] p-6 h-full">
                <div className="font-display text-4xl text-burgundy mb-2">W1</div>
                <h3 className="font-display text-xl uppercase mb-4">Prompt Engineering</h3>
                <p className="font-mono text-[10px] text-white/40 uppercase mb-6">19–25 JAN</p>
                <p className="text-sm text-white/70 mb-6">Освоение техник промптов: Chain-of-Thought, Few-Shot Learning. Создание первых персональных ассистентов.</p>
                <div className="font-mono text-[10px] text-burgundy uppercase">Спикер: А. Поваляев</div>
              </div>
            </div>

            {/* Week 2 */}
            <div className="pt-0">
              <div className="w-3 h-3 rounded-full bg-white mx-auto mb-6 relative z-10 ring-4 ring-[#050505]"></div>
              <div className="border border-white/20 bg-[#111] p-6 h-full">
                <div className="font-display text-4xl text-white mb-2">W2</div>
                <h3 className="font-display text-xl uppercase mb-4">Context Engineering</h3>
                <p className="font-mono text-[10px] text-white/40 uppercase mb-6">26 JAN – 1 FEB</p>
                <p className="text-sm text-white/70 mb-6">Управление контекстом: Obsidian + MCP + Claude. Автоматизация через n8n, Make. AI-агенты и workflows.</p>
                <div className="font-mono text-[10px] text-white/50 uppercase">Спикер: С. Хабаров</div>
              </div>
            </div>

            {/* Week 3 */}
            <div className="pt-0">
              <div className="w-3 h-3 rounded-full bg-white mx-auto mb-6 relative z-10 ring-4 ring-[#050505]"></div>
              <div className="border border-white/20 bg-[#111] p-6 h-full">
                <div className="font-display text-4xl text-white mb-2">W3</div>
                <h3 className="font-display text-xl uppercase mb-4">Mind Engineering</h3>
                <p className="font-mono text-[10px] text-white/40 uppercase mb-6">2–8 FEB</p>
                <p className="text-sm text-white/70 mb-6">AI для коучинга, рефлексии, персональных ритуалов. Трекинг привычек и целей с поддержкой AI.</p>
                <div className="font-mono text-[10px] text-white/50 uppercase">Спикер: А. Лозицкая</div>
              </div>
            </div>

            {/* Week 4 */}
            <div className="pt-0">
              <div className="w-3 h-3 rounded-full bg-white mx-auto mb-6 relative z-10 ring-4 ring-[#050505]"></div>
              <div className="border border-white/20 bg-[#111] p-6 h-full">
                <div className="font-display text-4xl text-white mb-2">W4</div>
                <h3 className="font-display text-xl uppercase mb-4">Life Engineering</h3>
                <p className="font-mono text-[10px] text-white/40 uppercase mb-6">9–15 FEB</p>
                <p className="text-sm text-white/70 mb-6">От идеи до прототипа. Vibe-coding с Cursor, Windsurf, Claude Projects. Создание без технического бэкграунда.</p>
                <div className="font-mono text-[10px] text-white/50 uppercase">Спикер: А. Ставенски</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRACKS (NUMBERED SECTIONS) */}
      <section className="py-32 border-t border-white/10">
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-24 text-center">
          <h2 className="text-5xl md:text-7xl font-display uppercase mb-6">ADVANCED TRACKS</h2>
          <p className="font-serif italic text-xl text-white/60 max-w-2xl mx-auto">
            "Основная программа даёт фундамент. Треки — это углубление в конкретный домен. Выбираешь то, что нужно."
          </p>
        </div>

        {/* Track 01 */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <div className="font-display text-[120px] leading-none text-burgundy/80 mb-4">01</div>
            <div className="font-mono text-xs text-burgundy uppercase tracking-widest mb-4">/// Week 1 · 21 Jan</div>
            <h3 className="font-display text-5xl uppercase mb-8">AI Coaching</h3>
            
            <div className="border-l-2 border-burgundy pl-6 mb-8">
              <p className="font-serif italic text-xl text-white/90 leading-relaxed">
                "Для тех, кто выгорел и ищет баланс. AI для коучинга, рефлексии, персональных ритуалов."
              </p>
            </div>
            
            <p className="text-white/60 leading-relaxed mb-8">
              Создание персональных систем поддержки мышления и продуктивности. Персональные AI-коучи для саморефлексии, ритуалы продуктивности с AI, трекинг привычек и целей.
            </p>
            
            <div className="flex items-center gap-4 font-mono text-xs text-white/40 uppercase border border-white/10 inline-flex px-4 py-2">
              <span className="text-burgundy">▶</span> Спикер: Анна Лозицкая
            </div>
          </div>
          
          <WireframeBox fig="01" title="support spectrum">
            {/* Abstract SVG for Coaching */}
            <svg viewBox="0 0 100 100" className="w-full h-full max-w-[200px] opacity-80">
              <circle cx="50" cy="50" r="30" fill="none" stroke="#9B1C31" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="15" fill="none" stroke="#fff" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="4" fill="#9B1C31" />
              <path d="M 20 50 Q 35 20 50 50 T 80 50" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.5" />
              <line x1="50" y1="20" x2="50" y2="80" stroke="#9B1C31" strokeWidth="0.5" opacity="0.5" />
              <line x1="20" y1="50" x2="80" y2="50" stroke="#9B1C31" strokeWidth="0.5" opacity="0.5" />
            </svg>
          </WireframeBox>
        </div>

        {/* Track 02 */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="order-2 lg:order-1">
            <WireframeBox fig="02" title="autonomous systems">
              {/* Abstract SVG for Agents */}
              <svg viewBox="0 0 100 100" className="w-full h-full max-w-[200px] opacity-80">
                <rect x="40" y="40" width="20" height="20" fill="none" stroke="#9B1C31" strokeWidth="2" />
                <rect x="45" y="45" width="10" height="10" fill="#fff" />
                <circle cx="20" cy="20" r="3" fill="#fff" opacity="0.5" />
                <circle cx="80" cy="20" r="3" fill="#fff" opacity="0.5" />
                <circle cx="20" cy="80" r="3" fill="#fff" opacity="0.5" />
                <circle cx="80" cy="80" r="3" fill="#fff" opacity="0.5" />
                <line x1="22" y1="22" x2="40" y2="40" stroke="#9B1C31" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="78" y1="22" x2="60" y2="40" stroke="#9B1C31" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="22" y1="78" x2="40" y2="60" stroke="#9B1C31" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="78" y1="78" x2="60" y2="60" stroke="#9B1C31" strokeWidth="0.5" strokeDasharray="2 2" />
              </svg>
            </WireframeBox>
          </div>

          <div className="order-1 lg:order-2">
            <div className="font-display text-[120px] leading-none text-burgundy/80 mb-4">02</div>
            <div className="font-mono text-xs text-burgundy uppercase tracking-widest mb-4">/// Week 2 · 28 Jan</div>
            <h3 className="font-display text-5xl uppercase mb-8">AI Agents</h3>
            
            <div className="border-l-2 border-burgundy pl-6 mb-8">
              <p className="font-serif italic text-xl text-white/90 leading-relaxed">
                "Проектирование и запуск AI-агентов, которые работают автономно. Многошаговое рассуждение и оркестрация."
              </p>
            </div>
            
            <p className="text-white/60 leading-relaxed mb-8">
              Автономные агенты для задач, MCP-интеграции, workflows с несколькими агентами, практические кейсы автоматизации через n8n и Make.
            </p>
            
            <div className="flex items-center gap-4 font-mono text-xs text-white/40 uppercase border border-white/10 inline-flex px-4 py-2">
              <span className="text-burgundy">▶</span> Спикеры: С. Хабаров, А. Поваляев
            </div>
          </div>
        </div>

        {/* Track 03 */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <div className="font-display text-[120px] leading-none text-burgundy/80 mb-4">03</div>
            <div className="font-mono text-xs text-burgundy uppercase tracking-widest mb-4">/// Week 3 · 4 Feb</div>
            <h3 className="font-display text-5xl uppercase mb-8">Vibe-Coding</h3>
            
            <div className="border-l-2 border-burgundy pl-6 mb-8">
              <p className="font-serif italic text-xl text-white/90 leading-relaxed">
                "От идеи до прототипа за часы. Создание без технического бэкграунда через Cursor и Windsurf."
              </p>
            </div>
            
            <p className="text-white/60 leading-relaxed mb-8">
              Творческое программирование. Claude Projects для прототипов, от идеи до деплоя за один день, создание реальных проектов с нуля.
            </p>
            
            <div className="flex items-center gap-4 font-mono text-xs text-white/40 uppercase border border-white/10 inline-flex px-4 py-2">
              <span className="text-burgundy">▶</span> Спикер: Серёжа Рис
            </div>
          </div>
          
          <WireframeBox fig="03" title="code generation">
            {/* Abstract SVG for Code */}
            <svg viewBox="0 0 100 100" className="w-full h-full max-w-[200px] opacity-80">
              <path d="M 30 20 L 10 50 L 30 80" fill="none" stroke="#fff" strokeWidth="2" opacity="0.5" />
              <path d="M 70 20 L 90 50 L 70 80" fill="none" stroke="#fff" strokeWidth="2" opacity="0.5" />
              <line x1="60" y1="15" x2="40" y2="85" stroke="#9B1C31" strokeWidth="2" />
              <rect x="45" y="45" width="10" height="10" fill="#9B1C31" className="animate-pulse" />
            </svg>
          </WireframeBox>
        </div>

        {/* Track 04 */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <WireframeBox fig="04" title="creative expansion">
              {/* Abstract SVG for Creative */}
              <svg viewBox="0 0 100 100" className="w-full h-full max-w-[200px] opacity-80">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
                <path d="M 50 10 C 70 10, 90 30, 90 50 C 90 70, 70 90, 50 90 C 30 90, 10 70, 10 50 C 10 30, 30 10, 50 10 Z" fill="none" stroke="#9B1C31" strokeWidth="1" strokeDasharray="5 5" className="animate-[spin_10s_linear_infinite]" />
                <circle cx="50" cy="50" r="8" fill="#fff" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="#9B1C31" strokeWidth="2" />
              </svg>
            </WireframeBox>
          </div>

          <div className="order-1 lg:order-2">
            <div className="font-display text-[120px] leading-none text-burgundy/80 mb-4">04</div>
            <div className="font-mono text-xs text-burgundy uppercase tracking-widest mb-4">/// Week 4 · 11 Feb</div>
            <h3 className="font-display text-5xl uppercase mb-8">AI Creative</h3>
            
            <div className="border-l-2 border-burgundy pl-6 mb-8">
              <p className="font-serif italic text-xl text-white/90 leading-relaxed">
                "Для музыкантов, художников и креативщиков. Расширение границ творчества через технологии."
              </p>
            </div>
            
            <p className="text-white/60 leading-relaxed mb-8">
              Генерация музыки и звука (Suno, ElevenLabs), визуальный контент (Midjourney, Runway), блог про музыку и творчество с AI, коллаборация с AI как со-автором.
            </p>
            
            <div className="flex items-center gap-4 font-mono text-xs text-white/40 uppercase border border-white/10 inline-flex px-4 py-2">
              <span className="text-burgundy">▶</span> Спикер: Анка Ставенски
            </div>
          </div>
        </div>
      </section>

      {/* CASES GRID */}
      <section className="py-32 border-t border-white/10 bg-[#050505]">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <div className="bg-burgundy text-white px-2 py-1 font-display text-sm uppercase tracking-wider inline-block mb-6">
                АРТЕФАКТЫ
              </div>
              <h2 className="text-5xl md:text-7xl font-display uppercase">CASES</h2>
            </div>
            <p className="font-serif italic text-lg text-white/60 max-w-md text-right">
              "Что создают участники за 4 недели? Не учебные примеры, а агенты и продукты, которые реально работают."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {[
              { title: "AI COACHING", desc: "Персональный AI-коуч с голосовым интерфейсом. Контекст из заметок.", tools: "Claude, Vapi, Obsidian" },
              { title: "AI VISION", desc: "Автоматическая сортировка и теггинг визуального контента.", tools: "GPT Vision, Claude" },
              { title: "AI LEARNING", desc: "Языковой партнер. Разговорная практика с адаптивной сложностью.", tools: "GPT-4, ElevenLabs" },
              { title: "AI SUMMARY", desc: "Транскрипция Zoom со speaker diarization. Action items в CRM.", tools: "Zoom, Gemini, Whisper" },
              { title: "AI KNOWLEDGE", desc: "RAG-система для Obsidian. Семантический поиск по заметкам.", tools: "Obsidian, Claude API" },
              { title: "AI PROJECT", desc: "PM-ассистент. Мониторинг прогресса с автостатусами.", tools: "Linear, Notion" },
              { title: "AI AUTOMATION", desc: "Email-триаж, CRM-обновления, документооборот.", tools: "n8n, Make, Claude" },
              { title: "AI RESEARCH", desc: "Исследовательский ассистент. Поиск и синтез из научных баз.", tools: "Perplexity, Elicit" },
              { title: "AI CONTENT", desc: "Создание контента с сохранением brand voice.", tools: "GPT-4, Midjourney" },
            ].map((c, i) => (
              <div key={i} className="bg-[#0A0A0A] p-8 hover:bg-[#111] transition-colors group">
                <div className="font-mono text-[10px] text-burgundy mb-4 uppercase tracking-widest group-hover:text-white transition-colors">/// {c.title}</div>
                <p className="text-sm text-white/80 mb-6 leading-relaxed min-h-[60px]">{c.desc}</p>
                <div className="font-mono text-[9px] text-white/30 uppercase border-t border-white/10 pt-4">
                  {c.tools}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-32 border-t border-white/10">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-display uppercase mb-16 text-center">WHO WE ARE</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Александр Поваляев", role: "Основатель, стратег", desc: "15+ лет соединяет технологии, бизнес и людей. Верит в «экосистемное мышление»." },
              { name: "Сергей Хабаров", role: "Системный архитектор", desc: "Ведет Context Engineering: как структурировать знания, чтобы AI с ними работал." },
              { name: "Степан Гершуни", role: "Технологический стратег", desc: "Инвестор Cyber Fund. Автор cybOS (cyber operating system)." },
              { name: "Алексей Иванов", role: "Executive-коуч", desc: "ICF PCC, ex-дизайн лид. Ведет advanced-трек: AI-coaching." },
              { name: "Серёжа Рис", role: "AI-евангелист", desc: "Билдер и фаундер @vibecod3rs. Ведёт advanced-трек: vibe-coding." },
              { name: "Анна Ставенски", role: "Продуктовый архитектор", desc: "Ведет Life Engineering: поможет собрать инструменты в единую систему." },
            ].map((member, i) => (
              <div key={i} className="border border-white/10 p-6 bg-[#111]">
                <div className="w-12 h-12 rounded-full bg-burgundy/20 border border-burgundy flex items-center justify-center font-display text-xl text-burgundy mb-6">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-display text-2xl uppercase mb-2">{member.name}</h3>
                <div className="font-mono text-[10px] text-burgundy uppercase tracking-widest mb-4">{member.role}</div>
                <p className="text-sm text-white/60 leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-32 border-t border-white/10 bg-[#050505]">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-display uppercase mb-6">PRICE</h2>
            <p className="font-mono text-sm text-white/50 uppercase tracking-widest">
              Alumni (-20%) · Bring a Friend (-10%)
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Base */}
            <div className="border border-white/20 p-8 md:p-12 hover:border-white/40 transition-colors flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="font-mono text-[10px] text-white/50 uppercase tracking-widest mb-2">MAIN LAB</div>
                  <h3 className="font-display text-4xl uppercase">BASE</h3>
                </div>
                <div className="font-display text-3xl text-burgundy">€590</div>
              </div>
              <p className="text-white/70 mb-8 leading-relaxed flex-grow">
                Четырёхнедельная трансформация: prompt → context → mind → life. Базовый формат для самостоятельной работы.
              </p>
              <ul className="space-y-3 font-mono text-xs text-white/60 mb-12">
                <li>+ 4 live-воркшопа + 4 коворкинга</li>
                <li>+ закрытый чат участников</li>
                <li>+ демо-день и защита</li>
              </ul>
              <button className="w-full border border-white/20 py-4 font-display text-lg uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                ВЫБРАТЬ BASE
              </button>
            </div>

            {/* Advanced */}
            <div className="border border-burgundy bg-burgundy/5 p-8 md:p-12 relative flex flex-col">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-burgundy text-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
                RECOMMENDED
              </div>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="font-mono text-[10px] text-burgundy uppercase tracking-widest mb-2">+4 ТРЕКА</div>
                  <h3 className="font-display text-4xl uppercase">ADVANCED</h3>
                </div>
                <div className="font-display text-3xl text-burgundy">€890</div>
              </div>
              <p className="text-white/70 mb-8 leading-relaxed flex-grow">
                MAIN LAB + четыре дополнительных трека. Расширенная программа для глубокого погружения в AI-экосистему.
              </p>
              <ul className="space-y-3 font-mono text-xs text-white/60 mb-12">
                <li>+ MAIN LAB полный доступ</li>
                <li>+ 4 advanced трека (coaching, agents, vibe, creative)</li>
                <li>+ еженедельные закрытые разборы</li>
              </ul>
              <button className="w-full bg-burgundy text-white py-4 font-display text-lg uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                ВЫБРАТЬ ADVANCED
              </button>
            </div>

            {/* Premium */}
            <div className="border border-white/20 p-8 md:p-12 hover:border-white/40 transition-colors flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="font-mono text-[10px] text-white/50 uppercase tracking-widest mb-2">LIMITED</div>
                  <h3 className="font-display text-4xl uppercase">PREMIUM</h3>
                </div>
                <div className="font-display text-3xl text-burgundy">€1,490</div>
              </div>
              <p className="text-white/70 mb-8 leading-relaxed flex-grow">
                Индивидуальный маршрут: фиксируем данные, проектируем дорожную карту и запускаем внедрение без пауз.
              </p>
              <button className="w-full border border-white/20 py-4 font-display text-lg uppercase tracking-wider hover:bg-white hover:text-black transition-colors mt-auto">
                ВЫБРАТЬ PREMIUM
              </button>
            </div>

            {/* Teams */}
            <div className="border border-white/20 p-8 md:p-12 hover:border-white/40 transition-colors flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="font-mono text-[10px] text-white/50 uppercase tracking-widest mb-2">TEAM PREMIUM</div>
                  <h3 className="font-display text-4xl uppercase">FOR TEAMS</h3>
                </div>
                <div className="font-display text-3xl text-burgundy">€3,500+</div>
              </div>
              <p className="text-white/70 mb-8 leading-relaxed flex-grow">
                Несколько человек из компании вместе проходят Main Lab. Работают над реальными задачами бизнеса.
              </p>
              <button className="w-full border border-white/20 py-4 font-display text-lg uppercase tracking-wider hover:bg-white hover:text-black transition-colors mt-auto">
                УЗНАТЬ БОЛЬШЕ
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-white rounded-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 50%)' }} />
            <div className="font-display text-lg leading-none uppercase">AI MINDSET</div>
          </div>
          
          <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest text-white/50">
            <a href="#" className="hover:text-white transition-colors">Telegram</a>
            <a href="#" className="hover:text-white transition-colors">YouTube</a>
            <a href="#" className="hover:text-white transition-colors">Оферта</a>
            <a href="#" className="hover:text-white transition-colors">Политика</a>
          </div>
          
          <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
            React + Tailwind + Framer Motion + SVG
          </div>
        </div>
      </footer>

    </div>
  );
}
