import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const MinimalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
    
    .font-minimal { font-family: 'Inter', sans-serif; }
    
    .minimal-grid-line-x {
      position: absolute;
      left: 0;
      right: 0;
      height: 1px;
      background-color: rgba(0,0,0,0.1);
    }
    
    .minimal-grid-line-y {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 1px;
      background-color: rgba(0,0,0,0.1);
    }

    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

const GridOverlay = ({ active }: { active: boolean }) => {
  if (!active) return null;
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="w-full h-full relative max-w-[1920px] mx-auto">
        {/* Vertical Lines */}
        <div className="minimal-grid-line-y left-0" />
        <div className="minimal-grid-line-y left-[25%]" />
        <div className="minimal-grid-line-y left-[50%]" />
        <div className="minimal-grid-line-y left-[75%]" />
        <div className="minimal-grid-line-y right-0" />
        
        {/* Horizontal Lines */}
        <div className="minimal-grid-line-x top-0" />
        <div className="minimal-grid-line-x top-[25%]" />
        <div className="minimal-grid-line-x top-[50%]" />
        <div className="minimal-grid-line-x top-[75%]" />
        <div className="minimal-grid-line-x bottom-0" />
      </div>
    </div>
  );
};

const CrazyElement = ({ children, crazy, className = "" }: { children: React.ReactNode, crazy: boolean, className?: string }) => {
  const [randomProps, setRandomProps] = useState({ rotate: 0, x: 0, y: 0 });

  useEffect(() => {
    if (crazy) {
      setRandomProps({
        rotate: Math.random() * 5 - 2.5,
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 - 5,
      });
    } else {
      setRandomProps({ rotate: 0, x: 0, y: 0 });
    }
  }, [crazy]);

  return (
    <motion.div 
      className={className}
      animate={crazy ? randomProps : { rotate: 0, x: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      {children}
    </motion.div>
  );
};

const TogglePill = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2 text-xs uppercase tracking-wide hover:opacity-70 transition-opacity"
  >
    <div className={`w-3 h-3 border border-black rounded-full ${active ? 'bg-black' : 'bg-transparent'}`} />
    <span>{label}</span>
  </button>
);

export default function AiMindsetMinimalRuPage() {
  const [gridActive, setGridActive] = useState(true);
  const [crazyMode, setCrazyMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const yMove = useTransform(scrollYProgress, [0, 1], [0, -250]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-[#F2F2F2] text-black font-minimal selection:bg-black selection:text-white hide-scrollbar relative">
      <MinimalStyles />
      <GridOverlay active={gridActive} />

      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 w-full md:w-1/4 h-auto md:h-screen p-6 md:p-12 z-50 flex flex-row md:flex-col justify-between border-b md:border-b-0 md:border-r border-black/10 bg-[#F2F2F2]/90 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 border border-black rounded-sm flex items-center justify-center bg-white">
              <img
                src="/assets/ai-mindset-logo.png"
                alt="AI Mindset logo"
                className="h-3 w-auto object-contain"
              />
            </div>
            <span className="text-sm font-semibold tracking-tight uppercase">AI MINDSET</span>
          </div>
          <div className="hidden md:flex flex-col gap-2 text-xs text-black/60 mt-8">
            <a href="#" className="hover:text-black transition-colors">AI MINDSET</a>
            <a href="#" className="hover:text-black transition-colors">{`{LAB}`}</a>
            <a href="#" className="hover:text-black transition-colors">{`{PERSONAL OS}`}</a>
            <a href="#" className="hover:text-black transition-colors">{`{AI-NATIVE ORGS}`}</a>
            <a href="#" className="hover:text-black transition-colors">{`{SPACE}`}</a>
            <a href="#" className="hover:text-black transition-colors">{`{FOR-TEAMS}`}</a>
          </div>
        </div>

        <div className="flex md:flex-col gap-6 md:gap-4">
          <TogglePill label="Grid" active={gridActive} onClick={() => setGridActive(!gridActive)} />
          <TogglePill label="Crazy" active={crazyMode} onClick={() => setCrazyMode(!crazyMode)} />
          <a href="#" className="mt-4 text-xs font-bold uppercase tracking-widest border border-black px-4 py-2 rounded-full text-center hover:bg-black hover:text-white transition-colors">Join</a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="md:ml-[25%] w-full md:w-[75%] relative z-10">
        
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col justify-center p-6 md:p-24 border-b border-black/10 pt-32 md:pt-24">
          <div className="flex gap-4 mb-8 text-xs font-mono uppercase tracking-widest text-black/40">
            <span>BATCH: WINTER 26</span>
            <span>APPLICATIONS: CLOSE</span>
          </div>
          <CrazyElement crazy={crazyMode}>
            <h1 className="text-[10vw] md:text-[7vw] leading-[0.85] font-medium tracking-tighter mb-8 uppercase">
              AI MINDSET<br/>LAB W26
            </h1>
          </CrazyElement>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
            <div className="text-lg md:text-xl font-medium leading-relaxed max-w-md">
              Лаборатория нового мышления в эпоху AI.
              <br/><br/>
              <span className="text-sm text-black/60">Старт 19 января 2026 — завершение 16 февраля 2026. Следующий поток: 20 апреля.</span>
            </div>
            <div className="text-sm leading-relaxed max-w-sm text-black/70 border-l border-black/10 pl-6">
              <strong>AI mindset winter lab w26</strong> — это лаборатория, пространство для экспериментов. Здесь вы не изучаете, а создаёте: персональных ассистентов, AI-first процессы, новую версию себя. От хаоса промптов к персональной AI-операционной системе.
            </div>
          </div>
        </section>

        {/* Marquee Strip */}
        <div className="py-12 border-b border-black/10 overflow-hidden bg-white">
          <motion.div style={{ x: yMove }} className="whitespace-nowrap flex gap-8 items-center px-6">
            <span className="text-4xl md:text-6xl font-medium tracking-tighter uppercase">PROMPT</span>
            <span className="text-4xl md:text-6xl font-medium tracking-tighter text-black/20">///</span>
            <span className="text-4xl md:text-6xl font-medium tracking-tighter uppercase">CONTEXT</span>
            <span className="text-4xl md:text-6xl font-medium tracking-tighter text-black/20">///</span>
            <span className="text-4xl md:text-6xl font-medium tracking-tighter uppercase">MIND</span>
            <span className="text-4xl md:text-6xl font-medium tracking-tighter text-black/20">///</span>
            <span className="text-4xl md:text-6xl font-medium tracking-tighter uppercase">LIFE</span>
          </motion.div>
        </div>

        {/* Philosophy Grid */}
        <section className="border-b border-black/10">
          <div className="p-6 md:p-12 border-b border-black/10">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter uppercase">Философия лаборатории</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {[
              { id: '01', name: 'Mindset важнее', desc: 'Технологии меняются, а новый способ мышления остаётся с вами.' },
              { id: '02', name: 'Практика встроена', desc: 'Каждая неделя это эксперимент с реальными задачами и артефактами.' },
              { id: '03', name: 'Сообщество', desc: 'Вы учитесь не только у экспертов, но и друг у друга.' },
              { id: '04', name: 'Персонализация', desc: 'Углубляйтесь в то, что нужно именно вам через треки.' }
            ].map((item, i) => (
              <CrazyElement key={item.id} crazy={crazyMode} className="h-full">
                <div className={`
                  aspect-square border-b border-black/10 p-8 flex flex-col justify-between hover:bg-black hover:text-white transition-colors duration-500 group
                  ${i % 2 === 0 ? 'md:border-r' : ''}
                `}>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono">({item.id})</span>
                    <div className="w-4 h-4 rounded-full border border-current opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">{item.name}</h3>
                    <p className="text-sm opacity-60 max-w-[200px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </CrazyElement>
            ))}
          </div>
        </section>

        {/* AI Lab Main */}
        <section className="border-b border-black/10 bg-black text-[#F2F2F2]">
          <div className="p-6 md:p-12 border-b border-white/20">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter uppercase mb-4">AI LAB (MAIN)</h2>
            <p className="text-xl text-white/70 max-w-2xl">19 января – 16 февраля • 4 недели. От разрозненных запросов к единому контексту, от контекста к мышлению, от мышления к реальным проектам.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {[
              { id: 'W1', name: 'Prompt Engineering', desc: 'AI как интерфейс мышления. Chain-of-Thought, Few-Shot Learning.', speaker: 'Александр Поваляев' },
              { id: 'W2', name: 'Context Engineering', desc: 'Автоматизация и агенты. Obsidian + MCP + Claude. n8n, Make.', speaker: 'Сергей Хабаров' },
              { id: 'W3', name: 'Mind Engineering', desc: 'Продуктивность и ритуалы. AI для коучинга, рефлексии.', speaker: 'Анна Лозицкая' },
              { id: 'W4', name: 'Life Engineering', desc: 'Творчество и реализация. Vibe-coding с Cursor, Windsurf.', speaker: 'Анка Ставенски' }
            ].map((week, i) => (
              <CrazyElement key={week.id} crazy={crazyMode} className="h-full">
                <div className={`
                  min-h-[40vh] border-b border-white/20 p-8 flex flex-col justify-between hover:bg-white hover:text-black transition-colors duration-500 group
                  ${i % 2 === 0 ? 'md:border-r' : ''}
                `}>
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-xs font-mono text-white/50 group-hover:text-black/50">({week.id})</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-medium tracking-tight mb-4">{week.name}</h3>
                    <p className="text-sm opacity-70 mb-6 leading-relaxed">{week.desc}</p>
                    <div className="text-xs font-mono uppercase tracking-widest opacity-50 group-hover:opacity-100">Спикер: {week.speaker}</div>
                  </div>
                </div>
              </CrazyElement>
            ))}
          </div>
        </section>

        {/* Tracks Advanced */}
        <section className="border-b border-black/10">
          <div className="p-6 md:p-12 border-b border-black/10">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter uppercase mb-4">TRACKS (ADVANCED)</h2>
            <p className="text-lg text-black/60 max-w-2xl">Углубление в конкретный домен. Live-сессии, материалы, чат поддержки, индивидуальные консультации.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {[
              { id: 'T1', name: 'AI Coaching', desc: 'Для тех, кто выгорел и ищет баланс. Персональные системы поддержки.', speaker: 'Анна Лозицкая' },
              { id: 'T2', name: 'AI Agents', desc: 'Автономные AI-системы. Многошаговое рассуждение, оркестрация.', speaker: 'С. Хабаров, А. Поваляев' },
              { id: 'T3', name: 'Vibe-Coding', desc: 'Творческое программирование. От идеи до прототипа за часы.', speaker: 'Сережа Рис' },
              { id: 'T4', name: 'AI Creative', desc: 'Для музыкантов, художников. Генерация музыки, визуала.', speaker: 'Анка Ставенски' }
            ].map((track, i) => (
              <CrazyElement key={track.id} crazy={crazyMode} className="h-full">
                <div className={`
                  min-h-[30vh] border-b border-black/10 p-8 flex flex-col justify-between hover:bg-black hover:text-white transition-colors duration-500 group
                  ${i % 2 === 0 ? 'md:border-r' : ''}
                `}>
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-xs font-mono text-black/40 group-hover:text-white/40">({track.id})</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium tracking-tight mb-2">{track.name}</h3>
                    <p className="text-sm opacity-60 mb-4">{track.desc}</p>
                    <div className="text-xs font-mono uppercase tracking-widest opacity-40 group-hover:opacity-100">{track.speaker}</div>
                  </div>
                </div>
              </CrazyElement>
            ))}
          </div>
        </section>

        {/* Cases */}
        <section className="border-b border-black/10 p-6 md:p-12">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tighter uppercase mb-12">CASES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
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
            ].map((c, i) => (
              <CrazyElement key={i} crazy={crazyMode}>
                <div className="border-t border-black/20 pt-4">
                  <h4 className="font-bold text-sm tracking-widest uppercase mb-2">{c.title}</h4>
                  <p className="text-sm text-black/60">{c.desc}</p>
                </div>
              </CrazyElement>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="border-b border-black/10 p-6 md:p-12 bg-black text-white">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tighter uppercase mb-12">WHO WE ARE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { name: "Александр Поваляев", role: "Основатель проекта AI Mindset, стратег, эксперт по AI-интеграциям." },
              { name: "Сергей Хабаров", role: "Системный архитектор на стыке AI, образования и бизнес-процессов." },
              { name: "Степан Гершуни", role: "Founder, технологический стратег. Инвестор в венчурном фонде Cyber Fund." },
              { name: "Алексей Иванов", role: "Executive-коуч для фаундеров и IT-лидеров. ICF PCC, ex-дизайн лид." },
              { name: "Серёжа Рис", role: "AI-евангелист, ex Yandex. Билдер и фаундер в комьюнити вайбкодеров." },
              { name: "Анна Ставенски", role: "Продуктовый архитектор. 10+ лет в управлении." },
              { name: "Анна Лозицкая", role: "12+ лет помогала стартапам расти с нуля до больших раундов." },
            ].map((p, i) => (
              <CrazyElement key={i} crazy={crazyMode}>
                <div className="border-t border-white/20 pt-4">
                  <h3 className="text-xl font-medium mb-2">{p.name}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{p.role}</p>
                </div>
              </CrazyElement>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="border-b border-black/10 p-6 md:p-12">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tighter uppercase mb-12">PRICE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-black p-8 flex flex-col">
              <div className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4">BASE</div>
              <div className="text-5xl font-medium tracking-tighter mb-6">€590</div>
              <p className="text-sm text-black/70 mb-8 flex-1">Четырёхнедельная трансформация: prompt → context → mind → life. Базовый формат для самостоятельной работы.</p>
              <button className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors">Выбрать Base</button>
            </div>
            <div className="border border-black bg-black text-white p-8 flex flex-col relative">
              <div className="absolute top-4 right-4 text-xs font-mono opacity-50">POPULAR</div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">ADVANCED</div>
              <div className="text-5xl font-medium tracking-tighter mb-6">€890</div>
              <p className="text-sm text-white/70 mb-8 flex-1">MAIN LAB + 4 дополнительных трека. Расширенная программа для глубокого погружения в AI-экосистему.</p>
              <button className="w-full py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-colors">Выбрать Advanced</button>
            </div>
            <div className="border border-black p-8 flex flex-col">
              <div className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4">PREMIUM</div>
              <div className="text-5xl font-medium tracking-tighter mb-6">€1,490</div>
              <p className="text-sm text-black/70 mb-8 flex-1">Индивидуальный маршрут: фиксируем данные, проектируем дорожную карту и запускаем внедрение без пауз.</p>
              <button className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors">Выбрать Premium</button>
            </div>
            <div className="border border-black p-8 flex flex-col">
              <div className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4">FOR TEAMS</div>
              <div className="text-5xl font-medium tracking-tighter mb-6">€3,500+</div>
              <p className="text-sm text-black/70 mb-8 flex-1">Командное обучение. Работают над реальными задачами бизнеса c нашей поддержкой.</p>
              <button className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors">Узнать больше</button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white p-6 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <div className="text-2xl font-medium tracking-tight mb-4">AI MINDSET</div>
            <div className="flex gap-6 text-xs uppercase tracking-wide">
              <a href="#" className="hover:line-through">Подкаст</a>
              <a href="#" className="hover:line-through">Телеграм</a>
              <a href="#" className="hover:line-through">Оферта</a>
              <a href="#" className="hover:line-through">Политика</a>
            </div>
          </div>
          <div className="text-xs text-black/40 text-right">
            © 2026 AI Mindset<br/>
            System Guidelines
          </div>
        </footer>

      </div>
    </div>
  );
}
