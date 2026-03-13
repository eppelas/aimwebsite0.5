import React from 'react';
import { motion } from 'motion/react';

export default function AiMindsetLabPage() {
  // Pastel colors from the screenshot
  const stripes = [
    'bg-[#F9D8D6]', // pink
    'bg-[#E4F2E2]', // light green
    'bg-[#D6E4F9]', // light blue
    'bg-[#F9EED6]', // light yellow/peach
    'bg-[#E4D6F9]', // light purple
    'bg-[#D6F9F0]', // light cyan
    'bg-[#F9D8D6]', // pink
    'bg-[#E4F2E2]', // light green
    'bg-[#D6E4F9]', // light blue
    'bg-[#F9EED6]', // light yellow/peach
  ];

  // Repeat stripes to fill the width
  const repeatedStripes = Array.from({ length: 40 }).map((_, i) => stripes[i % stripes.length]);

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#111111] font-sans flex flex-col relative overflow-x-hidden selection:bg-black selection:text-white">
      
      {/* Pastel Stripes Background - Fixed to bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-[100vh] flex z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5F5] via-[#F5F5F5]/80 to-transparent z-10" />
        {repeatedStripes.map((colorClass, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1.5, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
            className={`flex-1 ${colorClass}`}
          />
        ))}
      </div>

      {/* Header */}
      <header className="flex justify-between items-center px-8 md:px-12 py-8 text-sm font-bold tracking-wider uppercase border-b border-black/5 relative z-20 bg-[#F5F5F5]/80 backdrop-blur-md sticky top-0">
        <div className="text-black flex gap-8 items-center">
          <span className="w-7 h-7 rounded-full border border-black/30 bg-white/60 inline-flex items-center justify-center">
            <img
              src="/assets/ai-mindset-logo.png"
              alt="AI Mindset logo"
              className="h-4 w-auto object-contain"
            />
          </span>
          <a href="#" className="hover:opacity-50">AI MINDSET</a>
          <a href="#" className="hover:opacity-50 hidden md:block">{`{LAB}`}</a>
          <a href="#" className="hover:opacity-50 hidden md:block">{`{PERSONAL OS}`}</a>
        </div>
        <div className="flex gap-8 text-black">
          <a href="#" className="hover:opacity-50 bg-black text-white px-4 py-2 rounded-full">JOIN</a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-start pt-24 px-8 md:px-24 relative z-20 pb-32">
        
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mb-32"
        >
          <div className="flex gap-4 mb-8 text-sm font-bold uppercase tracking-widest text-black/40">
            <span>BATCH: WINTER 26</span>
            <span>APPLICATIONS: CLOSE</span>
          </div>
          <h1 className="text-6xl md:text-[8rem] font-bold leading-[0.9] tracking-tight mb-8 text-[#1A1A1A] uppercase">
            AI MINDSET<br />
            LAB W26
          </h1>
          <p className="text-2xl md:text-4xl text-[#111111] leading-tight max-w-4xl font-medium mb-8">
            Лаборатория нового мышления в эпоху AI.
          </p>
          <p className="text-xl md:text-2xl text-[#666666] leading-relaxed max-w-3xl font-medium mb-12">
            Старт 19 января 2026 — завершение 16 февраля 2026. Следующий поток: 20 апреля.
          </p>
          <div className="p-8 bg-white/50 backdrop-blur-sm border border-black/5 rounded-2xl max-w-4xl">
            <p className="text-lg md:text-xl text-[#333333] leading-relaxed font-medium">
              <strong>AI mindset winter lab w26</strong> — это лаборатория, пространство для экспериментов. Здесь вы не изучаете, а создаёте: персональных ассистентов, AI-first процессы, новую версию себя. От хаоса промптов к персональной AI-операционной системе.
            </p>
          </div>
        </motion.section>

        {/* Philosophy */}
        <section className="mb-32 max-w-5xl">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-12 uppercase">Философия лаборатории</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8 text-xl text-[#444444] font-medium leading-relaxed">
              <p><strong className="text-black">Mindset важнее инструментов</strong> — технологии меняются, а новый способ мышления остаётся с вами.</p>
              <p><strong className="text-black">Практика встроена в процесс</strong> — каждая неделя это эксперимент с реальными задачами и артефактами.</p>
              <p><strong className="text-black">Сообщество усиливает обучение</strong> — вы учитесь не только у экспертов, но и друг у друга.</p>
              <p><strong className="text-black">Персонализация через треки</strong> — углубляйтесь в то, что нужно именно вам.</p>
            </div>
            <div className="bg-black/5 rounded-2xl aspect-square flex items-center justify-center border border-black/5">
              <span className="text-black/20 font-bold tracking-widest uppercase">Image Placeholder</span>
            </div>
          </div>
        </section>

        {/* AI Lab Main */}
        <section className="mb-32 max-w-5xl">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 uppercase">AI LAB (MAIN)</h2>
          <p className="text-2xl text-[#666666] mb-12 font-medium">19 января – 16 февраля • 4 недели</p>
          <p className="text-xl text-[#333333] leading-relaxed font-medium mb-16 max-w-4xl">
            Не курс, а лаборатория с чёткой траекторией: за месяц собираешь работающую систему усиления интеллекта. От разрозненных запросов к единому контексту, от контекста к мышлению, от мышления к реальным проектам и единой AI-системе.
            <br/><br/>
            <strong className="text-black">prompt {`>>`} context {`>>`} mind {`>>`} life {`{engineering}`}</strong>
          </p>

          <div className="space-y-16">
            {/* Week 1 */}
            <div className="border-t border-black/10 pt-8">
              <div className="text-sm font-bold uppercase tracking-widest text-black/40 mb-4">Неделя 1 · 19–25 JAN — Prompt Engineering</div>
              <h3 className="text-3xl font-bold mb-4">AI как интерфейс мышления</h3>
              <p className="text-lg text-[#666666] mb-6 max-w-3xl">Освоение техник промптов: Chain-of-Thought, Few-Shot Learning, Custom GPTs. Создание первых персональных ассистентов.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                <div><strong className="block text-black mb-2 uppercase tracking-wider">Результат:</strong><span className="text-[#666666]">Персональный GPT-ассистент, библиотека промптов (20+), понимание основ AI</span></div>
                <div><strong className="block text-black mb-2 uppercase tracking-wider">Инструменты:</strong><span className="text-[#666666]">ChatGPT, Claude, Custom GPTs, Gemini, Perplexity</span></div>
                <div><strong className="block text-black mb-2 uppercase tracking-wider">Спикер:</strong><span className="text-[#666666]">Александр Поваляев</span></div>
              </div>
            </div>
            {/* Week 2 */}
            <div className="border-t border-black/10 pt-8">
              <div className="text-sm font-bold uppercase tracking-widest text-black/40 mb-4">Неделя 2 · 26 JAN – 1 FEB — Context Engineering</div>
              <h3 className="text-3xl font-bold mb-4">Автоматизация и агенты</h3>
              <p className="text-lg text-[#666666] mb-6 max-w-3xl">Управление контекстом: Obsidian + MCP + Claude. Автоматизация через n8n, Make. AI-агенты и workflows.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                <div><strong className="block text-black mb-2 uppercase tracking-wider">Результат:</strong><span className="text-[#666666]">2–3 работающие автоматизации, интегрированная система знаний, настройка агентов</span></div>
                <div><strong className="block text-black mb-2 uppercase tracking-wider">Инструменты:</strong><span className="text-[#666666]">Obsidian, MCP, n8n, Make, Claude Projects</span></div>
                <div><strong className="block text-black mb-2 uppercase tracking-wider">Спикер:</strong><span className="text-[#666666]">Сергей Хабаров</span></div>
              </div>
            </div>
            {/* Week 3 */}
            <div className="border-t border-black/10 pt-8">
              <div className="text-sm font-bold uppercase tracking-widest text-black/40 mb-4">Неделя 3 · 2–8 FEB — Mind Engineering</div>
              <h3 className="text-3xl font-bold mb-4">Продуктивность и ритуалы</h3>
              <p className="text-lg text-[#666666] mb-6 max-w-3xl">AI для коучинга, рефлексии, персональных ритуалов. Трекинг привычек и целей с поддержкой AI.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                <div><strong className="block text-black mb-2 uppercase tracking-wider">Результат:</strong><span className="text-[#666666]">Персональный AI-коуч, система трекинга привычек, ритуалы рефлексии</span></div>
                <div><strong className="block text-black mb-2 uppercase tracking-wider">Инструменты:</strong><span className="text-[#666666]">Claude, Notion, Obsidian, Taskade, Custom GPTs</span></div>
                <div><strong className="block text-black mb-2 uppercase tracking-wider">Спикер:</strong><span className="text-[#666666]">Анна Лозицкая</span></div>
              </div>
            </div>
            {/* Week 4 */}
            <div className="border-t border-black/10 pt-8">
              <div className="text-sm font-bold uppercase tracking-widest text-black/40 mb-4">Неделя 4 · 9–15 FEB — Life Engineering</div>
              <h3 className="text-3xl font-bold mb-4">Творчество и реализация</h3>
              <p className="text-lg text-[#666666] mb-6 max-w-3xl">От идеи до прототипа. Vibe-coding с Cursor, Windsurf, Claude Projects. Создание без технического бэкграунда.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                <div><strong className="block text-black mb-2 uppercase tracking-wider">Результат:</strong><span className="text-[#666666]">Рабочий прототип, задеплоенный проект, vibe-coding workflow</span></div>
                <div><strong className="block text-black mb-2 uppercase tracking-wider">Инструменты:</strong><span className="text-[#666666]">Cursor, Windsurf, Claude Projects, V0, Replit</span></div>
                <div><strong className="block text-black mb-2 uppercase tracking-wider">Спикер:</strong><span className="text-[#666666]">Анка Ставенски</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Tracks */}
        <section className="mb-32 max-w-5xl">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 uppercase">TRACKS (ADVANCED)</h2>
          <p className="text-xl text-[#333333] leading-relaxed font-medium mb-16 max-w-4xl">
            Основная программа даёт фундамент. Треки — это углубление в конкретный домен. Выбираешь то, что нужно. Каждый трек: это live-сессия на 2–2.5 часа, материалы, чат поддержки, индивидуальные консультации.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-black/5">
              <div className="text-xs font-bold uppercase tracking-widest text-black/40 mb-2">Week 1 · 21 Jan · Wed 18:00</div>
              <h3 className="text-2xl font-bold mb-2">AI Coaching</h3>
              <p className="text-sm text-[#666666] mb-4">Для тех, кто выгорел и ищет баланс. AI для коучинга, рефлексии, персональных ритуалов.</p>
              <div className="text-sm text-[#444444]"><strong className="text-black">Спикер:</strong> Анна Лозицкая</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-black/5">
              <div className="text-xs font-bold uppercase tracking-widest text-black/40 mb-2">Week 2 · 28 Jan · Wed 18:00</div>
              <h3 className="text-2xl font-bold mb-2">AI Agents</h3>
              <p className="text-sm text-[#666666] mb-4">Автономные AI-системы. Проектирование и запуск AI-агентов, которые работают автономно.</p>
              <div className="text-sm text-[#444444]"><strong className="text-black">Спикеры:</strong> Сергей Хабаров, Александр Поваляев</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-black/5">
              <div className="text-xs font-bold uppercase tracking-widest text-black/40 mb-2">Week 3 · 4 Feb · Wed 18:00</div>
              <h3 className="text-2xl font-bold mb-2">Vibe-Coding</h3>
              <p className="text-sm text-[#666666] mb-4">Творческое программирование. От идеи до прототипа за часы без технического бэкграунда.</p>
              <div className="text-sm text-[#444444]"><strong className="text-black">Спикер:</strong> Сережа Рис</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-black/5">
              <div className="text-xs font-bold uppercase tracking-widest text-black/40 mb-2">Week 4 · 11 Feb · Wed 18:00</div>
              <h3 className="text-2xl font-bold mb-2">AI Creative</h3>
              <p className="text-sm text-[#666666] mb-4">Для музыкантов, художников и креативщиков. Генерация музыки, визуального контента.</p>
              <div className="text-sm text-[#444444]"><strong className="text-black">Спикер:</strong> Анка Ставенски</div>
            </div>
          </div>
        </section>

        {/* Cases */}
        <section className="mb-32 max-w-5xl">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 uppercase">CASES</h2>
          <p className="text-xl text-[#333333] leading-relaxed font-medium mb-12 max-w-4xl">
            Что создают участники за 4 недели? Не учебные примеры, а агенты, workflows, ассистенты и продукты, которые реально работают.
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              { title: "AI COACHING", desc: "Персональный AI-коуч" },
              { title: "AI VISION", desc: "Категоризация изображений" },
              { title: "AI LEARNING", desc: "Языковой партнер" },
              { title: "AI SUMMARY", desc: "Суммаризация встреч" },
              { title: "AI KNOWLEDGE", desc: "Чат с базой знаний" },
              { title: "AI PROJECT", desc: "PM-ассистент" },
              { title: "AI AUTOMATION", desc: "Автоматизация воркфлоу" },
              { title: "AI RESEARCH", desc: "Исследовательский ассистент" },
              { title: "AI CONTENT", desc: "Генерация контента" },
              { title: "AI ANALYTICS", desc: "Анализ данных" },
              { title: "AI VOICE", desc: "Голосовые агенты" },
              { title: "AI SALES", desc: "CRM-ассистент" },
              { title: "AI DEV", desc: "Code Review" },
              { title: "AI SUPPORT", desc: "Служба поддержки" },
              { title: "AI WORKFLOW", desc: "Оптимизация процессов" },
            ].map((c, i) => (
              <div key={i} className="px-6 py-4 bg-white/60 backdrop-blur-sm border border-black/5 rounded-full flex gap-4 items-center">
                <span className="font-bold text-sm tracking-wider uppercase">{c.title}</span>
                <span className="text-sm text-[#666666]">{c.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-32 max-w-5xl">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-12 uppercase">WHO WE ARE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { name: "Александр Поваляев", role: "Основатель проекта AI Mindset, стратег, эксперт по AI-интеграциям." },
              { name: "Сергей Хабаров", role: "Системный архитектор на стыке AI, образования и бизнес-процессов." },
              { name: "Степан Гершуни", role: "Founder, технологический стратег. Инвестор в венчурном фонде Cyber Fund." },
              { name: "Алексей Иванов", role: "Executive-коуч для фаундеров и IT-лидеров. ICF PCC, ex-дизайн лид." },
              { name: "Серёжа Рис", role: "AI-евангелист, ex Yandex. Билдер и фаундер в комьюнити вайбкодеров." },
              { name: "Анна Ставенски", role: "Продуктовый архитектор. 10+ лет в управлении, технологических и креативных индустриях." },
              { name: "Анна Лозицкая", role: "12+ лет помогала стартапам расти с нуля до больших раундов." },
            ].map((p, i) => (
              <div key={i} className="border-t border-black/10 pt-6">
                <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
                <p className="text-[#666666] leading-relaxed">{p.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-32 max-w-5xl">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-12 uppercase">PRICE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-black/10 flex flex-col">
              <div className="text-sm font-bold uppercase tracking-widest text-black/40 mb-4">BASE</div>
              <div className="text-4xl font-bold mb-4">€590</div>
              <p className="text-sm text-[#666666] mb-8 flex-1">Четырёхнедельная трансформация: prompt → context → mind → life. Базовый формат для самостоятельной работы.</p>
              <button className="w-full py-4 bg-black text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-black/80 transition-colors">Выбрать Base</button>
            </div>
            <div className="bg-black text-white p-8 rounded-2xl border border-black/10 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#D6F9F0] text-black text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">Popular</div>
              <div className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">ADVANCED</div>
              <div className="text-4xl font-bold mb-4">€890</div>
              <p className="text-sm text-white/70 mb-8 flex-1">MAIN LAB + 4 дополнительных трека. Расширенная программа для глубокого погружения в AI-экосистему.</p>
              <button className="w-full py-4 bg-white text-black rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-white/90 transition-colors">Выбрать Advanced</button>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-black/10 flex flex-col">
              <div className="text-sm font-bold uppercase tracking-widest text-black/40 mb-4">PREMIUM</div>
              <div className="text-4xl font-bold mb-4">€1,490</div>
              <p className="text-sm text-[#666666] mb-8 flex-1">Индивидуальный маршрут: фиксируем данные, проектируем дорожную карту и запускаем внедрение без пауз.</p>
              <button className="w-full py-4 bg-black text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-black/80 transition-colors">Выбрать Premium</button>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-black/10 flex flex-col">
              <div className="text-sm font-bold uppercase tracking-widest text-black/40 mb-4">FOR TEAMS</div>
              <div className="text-4xl font-bold mb-4">€3,500+</div>
              <p className="text-sm text-[#666666] mb-8 flex-1">Командное обучение. Работают над реальными задачами бизнеса c нашей поддержкой.</p>
              <button className="w-full py-4 bg-black text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-black/80 transition-colors">Узнать больше</button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="px-8 md:px-24 py-12 border-t border-black/10 relative z-20 bg-[#F5F5F5]/80 backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="text-sm font-bold tracking-wider uppercase text-black/40">
          © AI Mindset 2026
        </div>
        <div className="flex gap-8 text-sm font-bold tracking-wider uppercase text-black">
          <a href="#" className="hover:opacity-50">Подкаст</a>
          <a href="#" className="hover:opacity-50">Телеграм</a>
          <a href="#" className="hover:opacity-50">Оферта</a>
          <a href="#" className="hover:opacity-50">Политика</a>
        </div>
      </footer>
    </div>
  );
}
