import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Menu, 
  MessageSquare, 
  PlayCircle, 
  ChevronDown, 
  X, 
  ChevronRight,
  ExternalLink,
  Calendar,
  Clock,
  User,
  Zap
} from 'lucide-react';

// --- TYPES ---
interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

// --- CONSTANTS ---
const EXTERNAL_LINKS: NavItem[] = [
  { label: 'AI mindset', href: 'https://aimindset.org/', isExternal: true },
  { label: '{LAB}', href: 'https://aimindset.org/ai-mindset', isExternal: true },
  { label: '{personal OS}', href: 'https://aimindset.org/sprint-pos', isExternal: true },
  { label: '{ai-native orgs}', href: 'https://ai-native.aimindset.org/', isExternal: true },
  { label: '{space}', href: 'https://aimindset.org/ai-mindset-community', isExternal: true },
  { label: '{for-teams}', href: 'https://aimindset.org/ai-mindset-consulting', isExternal: true },
];

const PAGE_NAV: NavItem[] = [
  { label: 'ФИЛОСОФИЯ', href: '#philosophy' },
  { label: 'ПРОГРАММА', href: '#program' },
  { label: 'ТРЕКИ', href: '#tracks' },
  { label: 'КЕЙСЫ', href: '#cases' },
  { label: 'КОМАНДА', href: '#team' },
  { label: 'ОТЗЫВЫ', href: '#feedback' },
  { label: 'ТАРИФЫ', href: '#pricing' },
];

// --- COMPONENTS ---

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-full max-w-7xl mx-auto px-4 md:px-8 ${className}`}>
    {children}
  </div>
);

const AsciiArt = ({ type, className = "" }: { type: string; className?: string }) => {
  const arts: Record<string, string> = {
    mindset: `
      .-------.
     /   MIND  \\
    |  SET >    |
     \\  TOOLS  /
      '-------'
    `,
    practice: `
     [=======]
     | WORK  |
     | SHOP  |
     [=======]
    `,
    community: `
      o---o---o
     / \\ / \\ / \\
    o---o---o---o
    `,
    personal: `
      <--[X]-->
         | |
      <--[Y]-->
    `,
    diamond: `
          .
         . .
        . . .
       . . . .
      . . . . .
       . . . .
        . . .
         . .
          .
    `,
    logic: `
    --=+//.
    // SYNCING
    [||||||] 100%
    --=+//.
    `,
    neural: `
       /\\  /\\
      /  \\/  \\
     /        \\
    /          \\
    `,
    structure: `
    +-------+
    | AI    |
    | LAB   |
    +-------+
    `
  };

  return (
    <pre className={`font-mono text-[10px] leading-tight select-none whitespace-pre ${className}`}>
      {arts[type] || arts.diamond}
    </pre>
  );
};

const SymbolBorder = ({ children, className = "", variant = "default" }: { children: React.ReactNode; className?: string; variant?: "default" | "heavy" | "dots"; key?: React.Key }) => (
  <div className={`relative p-[2px] ${className}`}>
    {/* Top */}
    <div className="absolute top-0 left-0 w-full overflow-hidden whitespace-nowrap text-[8px] leading-none opacity-20 select-none">
      {variant === "heavy" ? Array(100).fill("=").join("") : Array(100).fill("-").join(" ")}
    </div>
    {/* Bottom */}
    <div className="absolute bottom-0 left-0 w-full overflow-hidden whitespace-nowrap text-[8px] leading-none opacity-20 select-none">
      {variant === "heavy" ? Array(100).fill("=").join("") : Array(100).fill("-").join(" ")}
    </div>
    {/* Left */}
    <div className="absolute top-0 left-0 h-full w-[8px] flex flex-col overflow-hidden opacity-20 select-none">
      {Array(100).fill(variant === "dots" ? ":" : ".").map((s, i) => <span key={i}>{s}</span>)}
    </div>
    {/* Right */}
    <div className="absolute top-0 right-0 h-full w-[8px] flex flex-col overflow-hidden opacity-20 select-none">
      {Array(100).fill(variant === "dots" ? ":" : ".").map((s, i) => <span key={i}>{s}</span>)}
    </div>
    <div className="bg-white/40 relative z-10 h-full">
      {children}
    </div>
  </div>
);

const SectionLabel = ({ text, id }: { text: string; id?: string }) => (
  <div className="flex flex-col items-center mb-12" id={id}>
    <div className="text-sm font-bold border-b-2 border-current pb-1 uppercase tracking-widest">{text} --&gt;</div>
    <div className="mt-4 flex flex-col items-center opacity-40">
      {[...Array(5)].map((_, i) => <div key={i} className="text-[8px]">.</div>)}
    </div>
  </div>
);

const SlashDivider = () => (
  <div className="w-full overflow-hidden whitespace-nowrap text-[10px] opacity-10 py-4 select-none">
    {Array(200).fill("/").join("")}
  </div>
);

// --- MAIN PAGE COMPONENT ---

export default function LabW26Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAllFeedback, setShowAllFeedback] = useState(false);
  const [theme, setTheme] = useState<'winter' | 'spring'>('winter');

  // Theme colors
  const colors = {
    winter: {
      bg: '#f9f9f7',
      text: '#332b2b',
      accent: '#332b2b',
      card: 'bg-white/40',
      grid: 'opacity-[0.03]'
    },
    spring: {
      bg: '#f2f9f2',
      text: '#2b3d2b',
      accent: '#88b04b',
      card: 'bg-[#e8f3e8]/60',
      grid: 'opacity-[0.05]'
    }
  }[theme];

  // Smooth scroll
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const feedbackData = [
    {
      name: "Сергей Петров",
      role: "Unix developer, 20+ лет опыта",
      text: "После лабы я понял: это не просто инструменты, а новый способ мышления. Я офигел, когда Cursor сам нашел решение проблемы, которую я не знал как решить.",
      tags: ["TECH", "DEV"],
      image: "https://picsum.photos/seed/sergey/200/200"
    },
    {
      name: "Екатерина Грачева",
      role: "HR-коммуникации, Avito",
      text: "Я боялась, что это слишком сложно для нетехнического человека. Но через 3 недели я уже создавала агентов и автоматизации. Теперь веду трек по AI для 700+ коллег.",
      tags: ["NON-TECH", "HR"],
      image: "https://picsum.photos/seed/katya/200/200"
    },
    {
      name: "Антон Мормышев",
      role: "Музыкант",
      text: "После первой лекции по вайб-кодингу я не мог уснуть до 6 утра. Побежал делать. Это было мощно. AI стал моим соавтором, а не просто инструментом.",
      tags: ["CREATIVE", "MUSIC"],
      image: "https://picsum.photos/seed/anton/200/200"
    },
    {
      name: "Александра Гусева",
      role: "L&D, Avito",
      text: "Я на 30% начала думать AI-first в работе. Качественно изменилась подготовка обучающих материалов.",
      tags: ["L&D", "EDUCATION"],
      image: "https://picsum.photos/seed/sasha/200/200"
    },
    {
      name: "Роман Максимов",
      role: "Product Manager",
      text: "У меня исчезло ощущение страха перед первым шагом в куче инструментов. Теперь гораздо проще зайти в любой инструмент.",
      tags: ["PRODUCT", "PM"],
      image: "https://picsum.photos/seed/roman/200/200"
    }
  ];

  const visibleFeedback = showAllFeedback ? feedbackData : feedbackData.slice(0, 2);

  return (
    <div 
      className="min-h-screen font-mono selection:bg-current selection:text-white overflow-x-hidden relative transition-colors duration-700"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {/* Grid Overlay */}
      <div className={`absolute inset-0 pointer-events-none z-0 ${colors.grid}`} 
           style={{ backgroundImage: `radial-gradient(${colors.text} 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

      {/* Ticker Top */}
      <div className="fixed top-0 left-0 w-full z-[60] border-b border-current/10 py-1 overflow-hidden whitespace-nowrap text-[8px] uppercase tracking-[0.3em] opacity-40 select-none" style={{ backgroundColor: colors.bg }}>
        AI MINDSET LAB W26 . BATCH: WINTER 26 . APPLICATIONS: CLOSE . NEXT BATCH: 20 APRIL . AI MINDSET LAB W26 . BATCH: WINTER 26 . APPLICATIONS: CLOSE . NEXT BATCH: 20 APRIL .
      </div>

      {/* Header */}
      <header className="fixed top-6 left-0 w-full z-50 px-4 md:px-8 py-4 flex justify-between items-center backdrop-blur-sm border-b border-current/10">
        <div className="flex gap-8 items-center">
          <a href="#" className="text-2xl font-bold leading-none flex items-center gap-2">
            <span className="text-3xl">M</span>
            <span className="hidden sm:inline text-[10px] tracking-[0.4em] font-light border-l border-current pl-4">MINDSET</span>
          </a>
          <nav className="hidden lg:flex gap-6 text-[10px] font-bold tracking-widest items-center">
            {PAGE_NAV.map((link) => (
              <button 
                key={link.label} 
                onClick={() => scrollTo(link.href)}
                className="hover:line-through transition-all"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex gap-4 items-center">
          <a 
            href="https://join.aimindset.org/waitlist"
            className="hidden sm:flex border border-current px-4 py-1 text-[10px] items-center gap-4 hover:bg-current hover:text-white transition-colors cursor-pointer"
          >
            <div className="flex gap-1 uppercase font-bold">
              ЗАПИСАТЬСЯ
            </div>
          </a>
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-current/5 transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Hamburger Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[100] flex flex-col p-8"
            style={{ backgroundColor: colors.bg }}
          >
            <div className="flex justify-between items-center mb-12">
              <div className="text-xl font-bold uppercase tracking-widest">MENU // NAVIGATION</div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-current/5 rounded-full">
                <X size={32} />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="text-[10px] opacity-40 uppercase tracking-widest mb-6 border-b border-current/10 pb-2">PAGE SECTIONS</div>
                <div className="flex flex-col gap-4">
                  {PAGE_NAV.map((link) => (
                    <button 
                      key={link.label} 
                      onClick={() => scrollTo(link.href)}
                      className="text-4xl md:text-6xl font-black uppercase tracking-tighter hover:line-through text-left"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-[10px] opacity-40 uppercase tracking-widest mb-6 border-b border-current/10 pb-2">EXTERNAL LINKS</div>
                <div className="flex flex-col gap-4">
                  {EXTERNAL_LINKS.map((link) => (
                    <a 
                      key={link.label} 
                      href={link.href} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-2xl font-bold uppercase tracking-tight flex items-center gap-2 hover:line-through"
                    >
                      {link.label} <ExternalLink size={16} className="opacity-40" />
                    </a>
                  ))}
                </div>
                
                <div className="mt-12">
                  <a 
                    href="https://join.aimindset.org/waitlist"
                    className="inline-block border-2 border-current px-8 py-4 text-xl font-black uppercase hover:bg-current hover:text-white transition-all"
                  >
                    JOIN WAITLIST
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-12 text-[10px] opacity-20 uppercase tracking-[0.5em] text-center">
              AI MINDSET LAB // 2026
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 min-h-screen flex flex-col items-center justify-center">
        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8 flex flex-col items-center gap-4">
              <div className="text-[10px] tracking-[0.5em] opacity-40 uppercase">
                batch: winter 26 . applications: close
              </div>
              <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] max-w-5xl mx-auto">
                AI MINDSET <br />
                LAB W26
              </h1>
              <div className="text-xs md:text-sm tracking-[0.2em] font-bold uppercase mt-4">
                следующий поток: 20 апреля <a href="#" className="underline">[waitlist]</a>
              </div>
            </div>

            <div className="max-w-3xl mx-auto mb-12">
              <SymbolBorder variant="heavy" className={`p-8 backdrop-blur-sm ${colors.card}`}>
                <h2 className="text-xl md:text-3xl font-bold uppercase tracking-tight mb-4">лаборатория нового мышления в эпоху AI</h2>
                <p className="text-xs md:text-sm leading-relaxed opacity-80 uppercase tracking-wide">
                  старт 19 января 2026 — завершение 16 февраля 2026
                </p>
              </SymbolBorder>
            </div>

            <div className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed opacity-80 mb-12 italic">
              «AI mindset winter lab w26 — это лаборатория, пространство для экспериментов. здесь вы не изучаете, а создаёте: персональных ассистентов, AI-first процессы, новую версию себя. от хаоса промптов к персональной AI-операционной системе.»
            </div>

            <a 
              href="https://join.aimindset.org/context"
              className="inline-flex items-center gap-2 border-2 border-current px-12 py-6 hover:bg-current hover:text-white transition-all duration-300 font-mono uppercase text-sm font-bold tracking-widest group"
            >
              [ ПОДАТЬ ЗАЯВКУ ] <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>
        </Container>

        {/* Background ASCII Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.02] select-none text-[10px] leading-none">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="whitespace-nowrap">
              {Array.from({ length: 100 }).map((_, j) => (
                <span key={j}>{j % 10 === 0 ? "////" : "...."}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <SlashDivider />
      <section id="philosophy" className="py-32 relative">
        <Container>
          <SectionLabel text="ФИЛОСОФИЯ" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'MINDSET > TOOLS', desc: 'технологии меняются, а новый способ мышления остаётся с вами', art: 'mindset' },
              { title: 'PRACTICE', desc: 'каждая неделя это эксперимент с реальными задачами и артефактами', art: 'practice' },
              { title: 'COMMUNITY', desc: 'вы учитесь не только у экспертов, но и друг у друга', art: 'community' },
              { title: 'PERSONALIZATION', desc: 'углубляйтесь в то, что нужно именно вам через треки', art: 'personal' },
            ].map((item, i) => (
              <SymbolBorder key={i} className={`p-8 flex flex-col gap-6 backdrop-blur-sm h-full ${colors.card}`}>
                <div className="flex justify-between items-start">
                  <div className="text-[10px] opacity-40">0{i+1} // CORE</div>
                  <AsciiArt type={item.art} className="opacity-60" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tighter">{item.title}</h3>
                <p className="text-xs leading-relaxed opacity-60 uppercase">{item.desc}</p>
              </SymbolBorder>
            ))}
          </div>
        </Container>
      </section>

      {/* Program Section */}
      <SlashDivider />
      <section id="program" className="py-32 bg-[#332b2b]/5 relative">
        <Container>
          <SectionLabel text="AI LAB (MAIN)" />
          
          <div className="mb-16 text-center">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4">19 января – 16 февраля • 4 недели</h2>
            <p className="max-w-3xl mx-auto text-sm opacity-60 uppercase">
              не курс, а лаборатория с чёткой траекторией: за месяц собираешь работающую систему усиления интеллекта.
            </p>
            <div className="mt-8 text-xl md:text-3xl font-black opacity-20 tracking-[0.2em]">
              prompt {`>>`} context {`>>`} mind {`>>`} life {`{engineering}`}
            </div>
          </div>

          <div className="grid gap-8">
            {[
              { 
                id: '01', 
                title: 'Prompt Engineering', 
                subtitle: 'AI КАК ИНТЕРФЕЙС МЫШЛЕНИЯ',
                desc: 'Освоение техник промптов: Chain-of-Thought, Few-Shot Learning, Custom GPTs. Создание первых персональных ассистентов.',
                result: 'персональный GPT-ассистент, библиотека промптов (20+), понимание основ AI',
                tools: ['ChatGPT', 'Claude', 'Custom GPTs', 'Gemini', 'Perplexity'],
                speaker: 'Александр Поваляев',
                week: '19–25 JAN'
              },
              { 
                id: '02', 
                title: 'Context Engineering', 
                subtitle: 'АВТОМАТИЗАЦИЯ И АГЕНТЫ',
                desc: 'Управление контекстом: Obsidian + MCP + Claude. Автоматизация через n8n, Make. AI-агенты и workflows.',
                result: '2–3 работающие автоматизации, интегрированная система знаний, настройка агентов',
                tools: ['Obsidian', 'MCP', 'n8n', 'Make', 'Claude Projects'],
                speaker: 'Сергей Хабаров',
                week: '26 JAN – 1 FEB'
              },
              { 
                id: '03', 
                title: 'Mind Engineering', 
                subtitle: 'ПРОДУКТИВНОСТЬ И РИТУАЛЫ',
                desc: 'AI для коучинга, рефлексии, персональных ритуалов. Трекинг привычек и целей с поддержкой AI.',
                result: 'персональный AI-коуч, система трекинга привычек, ритуалы рефлексии',
                tools: ['Claude', 'Notion', 'Obsidian', 'Taskade', 'Custom GPTs'],
                speaker: 'Анна Лозицкая',
                week: '2–8 FEB'
              },
              { 
                id: '04', 
                title: 'Life Engineering', 
                subtitle: 'ТВОРЧЕСТВО И РЕАЛИЗАЦИЯ',
                desc: 'От идеи до прототипа. Vibe-coding с Cursor, Windsurf, Claude Projects. Создание без технического бэкграунда.',
                result: 'рабочий прототип, задеплоенный проект, vibe-coding workflow',
                tools: ['Cursor', 'Windsurf', 'Claude Projects', 'V0', 'Replit'],
                speaker: 'Анка Ставенски',
                week: '9–15 FEB'
              },
            ].map((item) => (
              <SymbolBorder key={item.id} className={`p-6 md:p-12 group hover:bg-current hover:text-white transition-all duration-500 ${colors.card}`}>
                <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8">
                  <div className="flex-grow">
                    <div className="flex items-start md:items-center gap-4 mb-4">
                      <div className="text-3xl md:text-5xl font-black opacity-20 group-hover:opacity-100 shrink-0">[{item.id}]</div>
                      <div className="flex flex-col md:block">
                        <div className="text-[10px] font-bold tracking-widest opacity-40 group-hover:opacity-100 uppercase mb-1 md:mb-0">{item.week}</div>
                        <h3 className="text-xl md:text-4xl font-black uppercase tracking-tighter leading-tight">{item.title}</h3>
                      </div>
                    </div>
                    <div className="text-[10px] md:text-sm font-bold opacity-60 group-hover:opacity-100 mb-6 uppercase tracking-widest">{item.subtitle}</div>
                    <p className="text-xs md:text-base leading-relaxed mb-8 opacity-80 group-hover:opacity-100">{item.desc}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <div className="text-[10px] font-bold opacity-40 group-hover:opacity-100 uppercase mb-2">РЕЗУЛЬТАТ:</div>
                        <div className="text-[10px] md:text-xs uppercase leading-relaxed">{item.result}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold opacity-40 group-hover:opacity-100 uppercase mb-2">ИНСТРУМЕНТЫ:</div>
                        <div className="flex flex-wrap gap-2">
                          {item.tools.map(t => <span key={t} className="text-[9px] border border-current px-2 py-0.5 rounded-full">{t}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:flex-col items-center md:justify-center text-left md:text-center border-t md:border-t-0 md:border-l border-current/10 pt-6 md:pt-0 md:pl-8 md:w-48">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-current/10 mb-0 md:mb-4 mr-4 md:mr-0 flex items-center justify-center shrink-0">
                      <User size={24} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold opacity-40 group-hover:opacity-100 uppercase mb-1">СПИКЕР:</div>
                      <div className="text-xs font-bold uppercase">{item.speaker}</div>
                    </div>
                  </div>
                </div>
              </SymbolBorder>
            ))}
          </div>
        </Container>
      </section>

      {/* Tracks Section */}
      <SlashDivider />
      <section id="tracks" className="py-32 relative">
        <Container>
          <SectionLabel text="TRACKS (ADVANCED)" />
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <p className="text-sm opacity-60 uppercase leading-relaxed">
              основная программа даёт фундамент. треки — это углубление в конкретный домен. выбираешь то, что нужно.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                id: 'T1', 
                title: 'AI Coaching', 
                date: '21 Jan · Wed 18:00',
                desc: 'Для тех, кто выгорел и ищет баланс. AI для коучинга, рефлексии, персональных ритуалов.',
                result: 'персональные AI-коучи, ритуалы продуктивности, трекинг целей',
                tools: ['Claude', 'Notion', 'Obsidian', 'Custom GPTs'],
                speaker: 'Анна Лозицкая'
              },
              { 
                id: 'T2', 
                title: 'AI Agents', 
                date: '28 Jan · Wed 18:00',
                desc: 'Автономные AI-системы. Проектирование и запуск AI-агентов, которые работают автономно.',
                result: 'автономные агенты, MCP-интеграции, workflows',
                tools: ['Claude', 'MCP', 'n8n', 'Make'],
                speaker: 'Сергей Хабаров, Александр Поваляев'
              },
              { 
                id: 'T3', 
                title: 'Vibe-Coding', 
                date: '4 Feb · Wed 18:00',
                desc: 'Творческое программирование. От идеи до прототипа за часы без технического бэкграунда.',
                result: 'vibe-coding workflow, Claude Projects для прототипов, реальные проекты',
                tools: ['Cursor', 'Windsurf', 'Claude Projects', 'V0'],
                speaker: 'Серёжа Рис'
              },
              { 
                id: 'T4', 
                title: 'AI Creative', 
                date: '11 Feb · Wed 18:00',
                desc: 'Для музыкантов, художников и креативщиков. Генерация музыки, визуального контента.',
                result: 'генерация музыки (Suno), визуал (Midjourney), коллаборация с AI',
                tools: ['Suno', 'Midjourney', 'Runway ML', 'ElevenLabs'],
                speaker: 'Анка Ставенски'
              },
            ].map((track) => (
              <SymbolBorder key={track.id} className={`p-8 md:p-12 hover:bg-current hover:text-white transition-all duration-500 group ${colors.card}`}>
                <div className="flex justify-between items-start mb-8">
                  <div className="text-[10px] font-bold opacity-40 group-hover:opacity-100 uppercase">{track.date}</div>
                  <Zap size={20} className="opacity-20 group-hover:opacity-100" />
                </div>
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">{track.title}</h3>
                <p className="text-sm opacity-80 group-hover:opacity-100 mb-8">{track.desc}</p>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] font-bold opacity-40 group-hover:opacity-100 uppercase mb-1">РЕЗУЛЬТАТ:</div>
                    <div className="text-xs uppercase">{track.result}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold opacity-40 group-hover:opacity-100 uppercase mb-1">СПИКЕР:</div>
                    <div className="text-xs font-bold uppercase">{track.speaker}</div>
                  </div>
                </div>
              </SymbolBorder>
            ))}
          </div>
        </Container>
      </section>

      {/* Cases Section */}
      <SlashDivider />
      <section id="cases" className="py-32 bg-[#332b2b]/5">
        <Container>
          <SectionLabel text="CASES" />
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">что создают участники?</h2>
            <p className="text-xs opacity-40 uppercase tracking-[0.5em]">real artifacts // real impact</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { title: 'AI COACHING', tools: 'Claude, Vapi, Obsidian' },
              { title: 'AI VISION', tools: 'GPT Vision, Claude' },
              { title: 'AI LEARNING', tools: 'GPT-4, ElevenLabs' },
              { title: 'AI SUMMARY', tools: 'Zoom, Gemini, Whisper' },
              { title: 'AI KNOWLEDGE', tools: 'Obsidian, Claude API' },
              { title: 'AI PROJECT', tools: 'Linear, Notion' },
              { title: 'AI AUTOMATION', tools: 'n8n, Make, Claude' },
              { title: 'AI RESEARCH', tools: 'Perplexity, Elicit' },
              { title: 'AI CONTENT', tools: 'GPT-4, Midjourney' },
              { title: 'AI ANALYTICS', tools: 'Python, GPT-4, Plotly' },
            ].map((c, i) => (
              <div key={i} className="border border-[#332b2b]/10 p-4 flex flex-col justify-between bg-white/20 hover:bg-white transition-colors">
                <div className="text-[10px] font-bold uppercase mb-2">{c.title}</div>
                <div className="text-[8px] opacity-40 uppercase">{c.tools}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <SlashDivider />
      <section id="team" className="py-32">
        <Container>
          <SectionLabel text="WHO WE ARE" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { 
                name: 'Александр Поваляев', 
                role: 'Основатель AI Mindset, стратег',
                desc: '15+ лет соединяет технологии, бизнес и людей. Верит в «экосистемное мышление».',
                tg: 'alex_named_ai'
              },
              { 
                name: 'Сергей Хабаров', 
                role: 'Системный архитектор',
                desc: '6+ лет в образовании, 500+ обученных специалистов. Ведет Context Engineering.',
                tg: 'alliknowisthatidontknownothing'
              },
              { 
                name: 'Степан Гершуни', 
                role: 'Founder, тех-стратег',
                desc: 'Построил Credentia, Deep Skills. Автор cybOS. Инвестор в Cyber Fund.',
                tg: 'cryptoEssay'
              },
              { 
                name: 'Алексей Иванов', 
                role: 'Executive-коуч',
                desc: 'ICF PCC, ex-дизайн лид. Помогает фаундерам и IT-лидерам находить энергию.',
                tg: 'ponchiknews'
              },
              { 
                name: 'Серёжа Рис', 
                role: 'AI-евангелист, ex Yandex',
                desc: 'Билдер в @vibecod3rs. Клод-код стример. Ведёт vibe-coding.',
                tg: 'ris_ai'
              },
              { 
                name: 'Анка Ставенски', 
                role: 'Продуктовый архитектор',
                desc: '10+ лет в управлении. PO в стартапах и визуальный сторителлер.',
                tg: 'anca_log'
              },
            ].map((member, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="aspect-square bg-[#332b2b]/5 border border-[#332b2b]/10 flex items-center justify-center relative group overflow-hidden">
                  <User size={64} className="opacity-10 group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-[#332b2b] text-[#f9f9f7] p-8 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center">
                    <p className="text-xs uppercase leading-relaxed">{member.desc}</p>
                    <a href={`https://t.me/${member.tg}`} target="_blank" rel="noreferrer" className="mt-4 text-[10px] font-bold underline">TELEGRAM</a>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight">{member.name}</h3>
                  <p className="text-[10px] opacity-40 uppercase tracking-widest">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Feedback Section */}
      <SlashDivider />
      <section id="feedback" className="py-32 bg-[#332b2b]/5 relative">
        <Container>
          <SectionLabel text="FEEDBACK" />
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">ЧТО ГОВОРЯТ О НАС</h2>
            <p className="text-xs opacity-40 uppercase tracking-[0.5em]">real humans // real context</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleFeedback.map((f, i) => (
              <SymbolBorder key={i} className={`h-full group ${colors.card}`}>
                <div className="p-8 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-current/20 grayscale">
                      <img src={f.image} alt={f.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <MessageSquare size={16} className="opacity-20" />
                  </div>
                  <p className="text-sm md:text-base leading-relaxed opacity-80 italic mb-6 flex-grow">«{f.text}»</p>
                  <div className="pt-6 border-t border-current/10">
                    <div className="font-bold uppercase text-sm mb-1">{f.name}</div>
                    <div className="text-[10px] opacity-40 uppercase tracking-widest mb-4">{f.role}</div>
                    <div className="flex flex-wrap gap-2">
                      {f.tags.map(t => <span key={t} className="text-[9px] font-bold border border-current/10 px-2 py-0.5 rounded-full opacity-40">{t}</span>)}
                    </div>
                  </div>
                </div>
              </SymbolBorder>
            ))}
          </div>
          
          {!showAllFeedback && (
            <div className="mt-12 text-center">
              <button 
                onClick={() => setShowAllFeedback(true)}
                className="inline-flex items-center gap-2 text-sm font-bold uppercase hover:line-through"
              >
                ПОКАЗАТЬ ЕЩЕ <ChevronDown size={16} />
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* Pricing Section */}
      <SlashDivider />
      <section id="pricing" className="py-32">
        <Container>
          <SectionLabel text="PRICE" />
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <p className="text-sm opacity-60 uppercase leading-relaxed">
              скидки: Alumni (-20%), Bring a Friend (-10% каждому). возврат после первой недели — без вопросов. возможна оплата в рублях.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { 
                name: 'MAIN LAB', 
                price: '590', 
                tag: 'BASE',
                features: [
                  '4 live-воркшопа + 4 коворкинга',
                  'Закрытый чат участников',
                  'Трек prompt → context → mind → life',
                  'Демо-день и портфолио кейсов',
                  'Доступ к библиотеке материалов'
                ],
                desc: 'базовый формат для самостоятельной работы'
              },
              { 
                name: 'ADVANCED', 
                price: '890', 
                tag: '+4 ТРЕКА',
                highlight: true,
                features: [
                  'Всё из MAIN LAB (полный доступ)',
                  '4 advanced трека: coaching · agents · vibe coding · creative',
                  'Приоритетные Buddy slots',
                  'Еженедельные закрытые разборы',
                  'Приоритетная обратная связь'
                ],
                desc: 'для тех, кто строит полный ai-стек'
              },
              { 
                name: 'PREMIUM', 
                price: '1490', 
                tag: 'LIMITED',
                features: [
                  'Всё из ADVANCED',
                  'Индивидуальный план обучения',
                  'Две сессии 1:1 со стратегами',
                  'Аудит процессов и подбор экосистемы',
                  'Персональный канал и priority support'
                ],
                desc: 'индивидуальный маршрут внедрения'
              },
            ].map((plan) => (
              <SymbolBorder 
                key={plan.name} 
                variant={plan.highlight ? "heavy" : "default"}
                className={`flex flex-col h-full transition-all duration-500 ${plan.highlight ? 'shadow-[12px_12px_0px_0px_rgba(51,43,43,1)]' : ''}`}
              >
                <div className="p-8 md:p-12 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div className="text-[10px] font-bold border border-current px-2 py-0.5 uppercase">{plan.tag}</div>
                    {plan.highlight && <Zap size={20} />}
                  </div>
                  
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-5xl md:text-6xl font-black tracking-tighter">€{plan.price}</span>
                    <span className="text-xs opacity-40 uppercase">/ batch</span>
                  </div>
                  
                  <div className="flex-grow space-y-4 mb-12">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs uppercase leading-tight">
                        <span className="opacity-40">--</span> {f}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-[10px] opacity-40 uppercase mb-8 italic">{plan.desc}</div>
                  
                  <a 
                    href="https://join.aimindset.org/context"
                    className={`w-full py-4 text-center font-black uppercase text-sm border-2 border-[#332b2b] transition-all ${plan.highlight ? 'bg-[#332b2b] text-[#f9f9f7]' : 'hover:bg-[#332b2b] hover:text-[#f9f9f7]'}`}
                  >
                    ВЫБРАТЬ {plan.name.split(' ')[0]}
                  </a>
                </div>
              </SymbolBorder>
            ))}
          </div>
          
          {/* Team Plan (Redesigned) */}
          <div className="mt-12">
            <SymbolBorder variant="dots" className={`p-8 md:p-16 relative overflow-hidden ${theme === 'winter' ? 'bg-[#332b2b] text-[#f9f9f7]' : 'bg-[#2b3d2b] text-[#f2f9f2]'}`}>
              <div className="absolute top-0 right-0 p-8 opacity-10 text-[10px] select-none">
                <pre>{`
                [ TEAM_SYNC ]
                1. AUDIT
                2. SETUP
                3. SCALE
                `}</pre>
              </div>
              
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 relative z-10">
                <div className="max-w-2xl">
                  <div className="text-[10px] font-bold border border-current/30 px-3 py-1 uppercase inline-block mb-6 tracking-[0.2em]">FOR TEAMS // CORPORATE</div>
                  <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">TEAM <br /> PREMIUM</h3>
                  <p className="text-sm md:text-lg opacity-70 uppercase leading-relaxed mb-8">
                    несколько человек из компании вместе проходят Main Lab. работают над реальными задачами бизнеса c нашей поддержкой.
                  </p>
                  <div className="grid grid-cols-2 gap-6 text-[10px] font-bold opacity-50 uppercase tracking-widest">
                    <div>-- 2+ стратсессии</div>
                    <div>-- tech set-up</div>
                    <div>-- прогресс-отчёты</div>
                    <div>-- post-lab поддержка</div>
                  </div>
                </div>
                
                <div className="w-full lg:w-auto flex flex-col items-center lg:items-end">
                  <div className="text-5xl md:text-8xl font-black tracking-tighter mb-2">€3,500+</div>
                  <div className="text-[10px] opacity-40 uppercase mb-8 tracking-widest">от 3 человек</div>
                  <a 
                    href="https://aimindset.org/ai-mindset-consulting"
                    className="w-full lg:w-auto bg-current text-white px-12 py-6 font-black uppercase text-sm hover:scale-105 transition-transform text-center"
                    style={{ color: theme === 'winter' ? '#332b2b' : '#2b3d2b', backgroundColor: theme === 'winter' ? '#f9f9f7' : '#f2f9f2' }}
                  >
                    УЗНАТЬ БОЛЬШЕ
                  </a>
                </div>
              </div>
            </SymbolBorder>
          </div>
        </Container>
      </section>

      {/* Application Form Section */}
      <SlashDivider />
      <section id="apply" className="py-32 bg-black text-white relative overflow-hidden">
        <Container>
          <div className="mb-16">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4">ЗАЯВКА</h2>
            <p className="text-xs opacity-40 uppercase tracking-[0.5em]">ПРОСТАЯ ФОРМА · ОТПРАВИТЬ ЗАЯВКУ</p>
          </div>

          <div className="max-w-3xl">
            <form className="grid gap-px bg-white/10 border border-white/10">
              <div className="bg-black p-6">
                <label className="block text-[10px] opacity-40 uppercase mb-2">ИМЯ</label>
                <input type="text" className="w-full bg-transparent border-none focus:ring-0 p-0 text-xl uppercase placeholder:opacity-20" placeholder="ВАШЕ ИМЯ" />
              </div>
              <div className="bg-black p-6">
                <label className="block text-[10px] opacity-40 uppercase mb-2">EMAIL</label>
                <input type="email" className="w-full bg-transparent border-none focus:ring-0 p-0 text-xl uppercase placeholder:opacity-20" placeholder="EMAIL@EXAMPLE.COM" />
              </div>
              <div className="bg-black p-6">
                <label className="block text-[10px] opacity-40 uppercase mb-2">ТЕЛЕГРАМ НИК</label>
                <input type="text" className="w-full bg-transparent border-none focus:ring-0 p-0 text-xl uppercase placeholder:opacity-20" placeholder="@USERNAME" />
              </div>
              <div className="grid md:grid-cols-2 gap-px">
                <div className="bg-black p-6">
                  <label className="block text-[10px] opacity-40 uppercase mb-2">ВЫБРАТЬ ТРЕК</label>
                  <select className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm uppercase appearance-none cursor-pointer">
                    <option>AI COACHING</option>
                    <option>AI AGENTS</option>
                    <option>VIBE-CODING</option>
                    <option>AI CREATIVE</option>
                  </select>
                </div>
                <div className="bg-black p-6">
                  <label className="block text-[10px] opacity-40 uppercase mb-2">ВЫБРАТЬ ПЛАН</label>
                  <select className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm uppercase appearance-none cursor-pointer">
                    <option>MAIN LAB (BASE)</option>
                    <option>ADVANCED (+4 TRACKS)</option>
                    <option>PREMIUM (LIMITED)</option>
                  </select>
                </div>
              </div>
              <div className="bg-black p-6">
                <label className="block text-[10px] opacity-40 uppercase mb-2">КРАТКО О СЕБЕ / МОТИВАЦИЯ</label>
                <textarea className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm uppercase placeholder:opacity-20 min-h-[120px] resize-none" placeholder="ПОЧЕМУ ВЫ ХОТИТЕ НА ЛАБОРАТОРИЮ?"></textarea>
              </div>
              
              <div className="relative">
                <div className="absolute bottom-full left-0 bg-white/10 px-4 py-2 text-[8px] uppercase tracking-widest border-t border-r border-white/10">
                  AIM STYLE // 54 . 01
                </div>
                <button className="w-full bg-[#88b04b] text-black py-8 font-black uppercase text-xl hover:bg-[#97c456] transition-colors">
                  ОТПРАВИТЬ ЗАЯВКУ
                </button>
              </div>
            </form>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-24 relative overflow-hidden" style={{ backgroundColor: theme === 'winter' ? '#332b2b' : '#2b3d2b', color: '#f9f9f7' }}>
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none flex items-center justify-center">
          <div className="text-[200px] font-black rotate-12">MINDSET</div>
        </div>
        <Container className="relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
            <div className="lg:col-span-2">
              <div className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">AI MINDSET LAB 26</div>
              <p className="text-xs opacity-40 uppercase leading-relaxed max-w-md">
                лаборатория нового мышления в эпоху AI. мы помогаем построить свою AI-систему, изменить паттерны работы и трансформировать мышление.
              </p>
            </div>
            
            <div>
              <div className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-6">КОНТАКТЫ</div>
              <div className="flex flex-col gap-2 text-xs uppercase">
                <a href="https://www.youtube.com/@A-I-Mindset" className="hover:line-through">ПОДКАСТ</a>
                <a href="https://t.me/ai_mind_set" className="hover:line-through">TELEGRAM КАНАЛ</a>
                <a href="https://t.me/alex_named" className="hover:line-through">ОСНОВАТЕЛЬ</a>
              </div>
            </div>
            
            <div>
              <div className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-6">ИНФО</div>
              <div className="flex flex-col gap-2 text-xs uppercase">
                <a href="#" className="hover:line-through">ОФЕРТА</a>
                <a href="#" className="hover:line-through">ПОЛИТИКА</a>
                <a href="#" className="hover:line-through">FAQ</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[8px] opacity-20 uppercase tracking-[0.5em]">MADE WITH SYMBOL LOVE // 2026</div>
            <div className="flex gap-4">
              {['/', '\\', '/', '\\'].map((s, i) => <span key={i} className="opacity-20">{s}</span>)}
            </div>
          </div>
        </Container>
      </footer>

      {/* Persistent Floating Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[80] w-auto px-4">
        <a 
          href="#apply"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('#apply');
          }}
          className="flex items-center justify-center gap-2 bg-[#88b04b] text-black py-3 px-6 font-black uppercase text-[10px] md:text-xs shadow-[0_8px_24px_rgba(136,176,75,0.4)] hover:scale-105 transition-all active:scale-95 whitespace-nowrap"
        >
          ХОЧУ В AIMINDSET <ArrowRight size={14} />
        </a>
      </div>

      {/* Version Toggle Button (v1.0) */}
      <div className="fixed bottom-8 right-4 md:right-8 z-[90]">
        <button
          onClick={() => setTheme(theme === 'winter' ? 'spring' : 'winter')}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full flex flex-col items-center justify-center text-[8px] md:text-[10px] font-black uppercase tracking-tighter shadow-xl transition-all hover:scale-110 active:scale-90 border-2 border-current"
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
          <span>V1.0</span>
          <div className="w-4 h-[1px] bg-current my-0.5 opacity-20" />
          <span className="text-[6px] md:text-[8px] opacity-40">{theme}</span>
        </button>
      </div>
    </div>
  );
}
