import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  ChevronRight,
  User,
  Zap,
  MessageSquare,
  ChevronDown,
  X,
  ExternalLink
} from 'lucide-react';



// --- TYPES ---
interface NavItem {
  label: string;
  href: string;
}

// --- CONSTANTS ---
const SIDEBAR_NAV: NavItem[] = [
  { label: 'ФИЛОСОФИЯ', href: '#philosophy' },
  { label: 'ПРОГРАММА', href: '#program' },
  { label: 'ТРЕКИ', href: '#tracks' },
  { label: 'ГРАФИК', href: '#schedule' },
  { label: 'ТАРИФЫ', href: '#pricing' },
];

const EXTERNAL_LINKS = [
  { label: 'community {space}', href: 'https://aimindset.org/ai-mindset-community' },
  { label: '{for-teams}', href: 'https://aimindset.org/ai-mindset-consulting' },
  { label: 'non-profit', href: 'https://aimindset.org/' },
];

const LAB_MENU_LINKS = [
  { label: 'Spring Main Lab', href: 'https://aimindset.org/ai-mindset', status: 'Current' },
  { label: 'AI-Native Orgs', href: 'https://ai-native.aimindset.org/', status: 'Current' },
  { label: 'Summer Main Lab', href: 'https://join.aimindset.org/waitlist', status: 'Next' },
];

const PRIMARY_MENU_LINKS = [
  { label: 'Community {Space}', href: 'https://aimindset.org/ai-mindset-community' },
  { label: 'Special Projects', href: 'https://aimindset.org/special-projects' },
  { label: 'Blog', href: 'https://aimindset.org/blog' },
  { label: '{For Teams}', href: 'https://aimindset.org/ai-mindset-consulting' },
  { label: '{For Non-profit}', href: 'https://aimindset.org/' },
];

const AI_MINDSET_LOGO_MAP = [
  "00000000001111101111110000000000",
  "00000001111111101111111110000000",
  "00000111111111101111111111100000",
  "00001111111111101111111111110000",
  "00011111111111101111111111111000",
  "00111111111111101111111111111100",
  "01111111111111101111111111111110",
  "01111111111111101111111111111110",
  "11111111111111101111111111111111",
  "11111111111111101111111111111111",
  "11111100000111101111111111111111",
  "11110000000001101111111111111111",
  "11100000000000101111100000000011",
  "11100000000000101111100000000011",
  "11100000000000101111100000001111",
  "11110000000001101111110000111111",
  "11111100000111101111111100111111",
  "11111111111111101111111111111111",
  "11111111111111101111111111111111",
  "01111111111111101111111111111110",
  "01111111111111101111111111111110",
  "00111111111111101111111111111100",
  "00011111111111101111111111111000",
  "00001111111111101111111111110000",
  "00000111111111101111111111100000",
  "00000001111111101111111110000000",
  "00000000000111101111111000000000",
  "00000000000000001111110000000000",
  "00000000000000001111100000000000",
  "00000000000000001111000000000000",
  "00000000000000001110000000000000",
];

// --- COMPONENTS ---

const SlashDivider = () => (
  <div className="w-full overflow-hidden whitespace-nowrap text-[10px] opacity-10 py-4 select-none">
    {Array(200).fill("/").join("")}
  </div>
);

const LargeDiamondArt = ({ className = "" }: { className?: string }) => (
  <pre className={`font-mono text-[10px] leading-tight select-none whitespace-pre ${className}`}>
{`            .            
            .            
            .            
          . . .          
        . . . . .        
      . . . . . . .      
    . . . . . . . . .    
  . . . . . . . . . . .  
. . . . . . . . . . . . .
  . . . . . . . . . . .  
    . . . . . . . . .    
      . . . . . . .      
        . . . . .        
          . . .          
            .            
            .            
            .            
`}
  </pre>
);

const MenuStrikeText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`relative inline-flex items-center ${className}`}>
    <span>{children}</span>
    <span className="pointer-events-none absolute left-0 top-1/2 h-px w-full -translate-y-1/2 scale-x-0 bg-current origin-left transition-transform duration-200 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
  </span>
);



const SymbolBorder = ({ children, className = "", variant = "default" }: { children: React.ReactNode; className?: string; variant?: "default" | "heavy" | "dots"; key?: React.Key }) => (
  <div className={`relative p-[2px] ${className}`}>
    <div className="absolute top-0 left-0 w-full overflow-hidden whitespace-nowrap text-[8px] leading-none opacity-20 select-none">
      {variant === "heavy" ? Array(100).fill("=").join("") : Array(100).fill("-").join(" ")}
    </div>
    <div className="absolute bottom-0 left-0 w-full overflow-hidden whitespace-nowrap text-[8px] leading-none opacity-20 select-none">
      {variant === "heavy" ? Array(100).fill("=").join("") : Array(100).fill("-").join(" ")}
    </div>
    <div className="absolute top-0 left-0 h-full w-[8px] flex flex-col overflow-hidden opacity-20 select-none">
      {Array(100).fill(variant === "dots" ? ":" : ".").map((s, i) => <span key={i}>{s}</span>)}
    </div>
    <div className="absolute top-0 right-0 h-full w-[8px] flex flex-col overflow-hidden opacity-20 select-none">
      {Array(100).fill(variant === "dots" ? ":" : ".").map((s, i) => <span key={i}>{s}</span>)}
    </div>
    <div className="bg-white/40 relative z-10 h-full">
      {children}
    </div>
  </div>
);



const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-full max-w-7xl mx-auto px-4 md:px-12 ${className}`}>
    {children}
  </div>
);

const SectionLabel = ({ text, number }: { text: string, number?: string }) => (
  <div className="flex items-center gap-4 mb-12">
    <div className="text-[10px] font-black tracking-[0.4em] opacity-30 uppercase">{number || '00'} // SECTION</div>
    <div className="h-[1px] flex-grow bg-current opacity-10" />
    <div className="text-[10px] font-black tracking-[0.4em] uppercase">{text}</div>
  </div>
);

const VoxelLogoFace = ({ scale = 1, opacity = 1, className = "" }: { scale?: number; opacity?: number; className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const interactionRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        interactionRef.current.x = (e.clientX - rect.left) * (600 / rect.width);
        interactionRef.current.y = (e.clientY - rect.top) * (600 / rect.height);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 600;
    const voxels: any[] = [];
    const size = 11, gap = 3, total = size + gap;
    const width = AI_MINDSET_LOGO_MAP[0].length;
    const height = AI_MINDSET_LOGO_MAP.length;
    const startX = 300 - (width * total) / 2;
    const startY = 300 - (height * total) / 2;

    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        if (AI_MINDSET_LOGO_MAP[r][c] === '1' && c >= width / 2 - 1) {
            voxels.push({
              homeX: startX + c * total, homeY: startY + r * total,
              x: startX + c * total + (Math.random() - 0.5) * 400,
              y: startY + r * total + (Math.random() - 0.5) * 400,
              vx: 0, vy: 0, firmness: 0.05 + Math.random() * 0.05
            });
        }
      }
    }

    const logoLeft = new Image();
    logoLeft.src = '/AIMLeft-02.png';
    let logoLoaded = false;
    logoLeft.onload = () => { logoLoaded = true; };

    const draw = () => {
      ctx.clearRect(0, 0, 600, 600);
      if (logoLoaded && logoLeft.height > 0) {
         const scaleFactor = 1.07;
         const targetHeight = height * total * scaleFactor;
         const targetWidth = targetHeight * (logoLeft.width / logoLeft.height);
         const targetX = startX + ((width / 2) * total) - targetWidth;
         const offsetY = (targetHeight - (height * total)) / 2;
         const seamOffsetY = total * 0.3;
         ctx.drawImage(logoLeft, targetX, startY - offsetY + seamOffsetY, targetWidth, targetHeight);
      }
      voxels.forEach(v => {
        const dx = v.x - interactionRef.current.x, dy = v.y - interactionRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) { v.vx += (dx / dist) * 2; v.vy += (dy / dist) * 2; }
        v.vx += (v.homeX - v.x) * v.firmness;
        v.vy += (v.homeY - v.y) * v.firmness;
        v.vx *= 0.8; v.vy *= 0.8;
        v.x += v.vx; v.y += v.vy;
        ctx.fillStyle = '#181616';
        ctx.fillRect(v.x, v.y, size, size);
      });
      requestAnimationFrame(draw);
    };
    draw();
  }, []);

  return (
    <div className={`aspect-square ${className}`} style={{ transform: `scale(${scale})`, opacity }}>
      <canvas ref={canvasRef} width={600} height={600} className="w-full h-full object-contain" />
    </div>
  );
};

const LabsHoverMenu = () => (
  <motion.div
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 10 }}
    className="absolute left-full top-1/2 z-50 -translate-y-1/2 pl-4 text-[#181616]"
  >
    <div className="pointer-events-none absolute inset-y-0 -left-4 w-4 bg-transparent" />
    <div className="bg-white border border-black/20 p-6 flex flex-col xl:flex-row gap-4 shadow-2xl">
      {LAB_MENU_LINKS.map((link) => (
        <a key={link.label} href={link.href} target="_blank" className="group block border border-black/10 px-4 py-3 w-48 hover:border-black transition-colors bg-white">
          <div className="text-[9px] uppercase tracking-widest opacity-40 mb-3">{link.status}</div>
          <div className="text-xs font-bold uppercase tracking-widest">
            <MenuStrikeText>{link.label}</MenuStrikeText>
          </div>
        </a>
      ))}
    </div>
  </motion.div>
);

const ProgramScheduleGrid = () => {
  const weeks = [
    {
      num: '01',
      title: 'Prompt Engineering',
      subtitle: 'AI КАК ИНТЕРФЕЙС МЫШЛЕНИЯ',
      desc: 'базовый AI-стек: инструменты, контекст, навыки',
      artifact: 'персональный GPT-ассистент, библиотека промптов (20+)'
    },
    {
      num: '02',
      title: 'Context Engineering',
      subtitle: 'АВТОМАТИЗАЦИЯ И АГЕНТЫ',
      desc: 'от личных навыков к командным процессам',
      artifact: '2–3 работающие автоматизации, настройка агентов'
    },
    {
      num: '03',
      title: 'Mind Engineering',
      subtitle: 'ПРОДУКТИВНОСТЬ И РИТУАЛЫ',
      desc: 'AI для коучинга, рефлексии, персональных ритуалов',
      artifact: 'персональный AI-коуч, система трекинга привычек'
    },
    {
      num: '04',
      title: 'Life Engineering',
      subtitle: 'ТВОРЧЕСТВО И РЕАЛИЗАЦИЯ',
      desc: 'от идеи до работающего задеплоенного продукта',
      artifact: 'рабочий прототип, задеплоенный проект, vibe-coding workflow'
    }
  ];

  const calendarDays = [
    { date: 19, type: 'lecture', week: 'W1', label: '19 JAN' },
    { date: 20, type: 'rest', week: 'W1' },
    { date: 21, type: 'workshop', week: 'W1', label: 'T1: Coaching' },
    { date: 22, type: 'rest', week: 'W1' },
    { date: 23, type: 'coworking', week: 'W1' },
    { date: 24, type: 'rest', week: 'W1' },
    { date: 25, type: 'rest', week: 'W1' },

    { date: 26, type: 'lecture', week: 'W2', label: '26 JAN' },
    { date: 27, type: 'rest', week: 'W2' },
    { date: 28, type: 'workshop', week: 'W2', label: 'T2: Agents' },
    { date: 29, type: 'rest', week: 'W2' },
    { date: 30, type: 'coworking', week: 'W2' },
    { date: 31, type: 'rest', week: 'W2' },
    { date: 1, type: 'rest', week: 'W2', month: 'FEB' },

    { date: 2, type: 'lecture', week: 'W3', label: '2 FEB' },
    { date: 3, type: 'rest', week: 'W3' },
    { date: 4, type: 'workshop', week: 'W3', label: 'T3: Vibe' },
    { date: 5, type: 'rest', week: 'W3' },
    { date: 6, type: 'coworking', week: 'W3' },
    { date: 7, type: 'rest', week: 'W3' },
    { date: 8, type: 'rest', week: 'W3' },

    { date: 9, type: 'lecture', week: 'W4', label: '9 FEB' },
    { date: 10, type: 'rest', week: 'W4' },
    { date: 11, type: 'workshop', week: 'W4', label: 'T4: Creative' },
    { date: 12, type: 'rest', week: 'W4' },
    { date: 13, type: 'coworking', week: 'W4' },
    { date: 14, type: 'rest', week: 'W4' },
    { date: 15, type: 'demo', week: 'W4', label: 'DEMO DAY' },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#161620] text-white font-mono overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Timeline Part */}
          <div className="relative pl-12 border-l border-white/10">
            <div className="absolute top-0 left-[-1px] w-[2px] h-full bg-gradient-to-b from-[#4dc9d4] via-[#38d9a9] to-[#ff6b6b] opacity-50" />
            
            <div className="flex flex-col gap-16">
              {weeks.map((wk, i) => (
                <div key={i} className="relative">
                  <div className="absolute left-[-56px] top-2 w-4 h-4 rounded-full bg-[#161620] border-2 border-[#4dc9d4] z-10 shadow-[0_0_15px_rgba(77,201,212,0.5)]" />
                  <div className="text-[10px] opacity-40 uppercase tracking-[0.2em] mb-2">week {wk.num} — <span className="text-white opacity-100">{wk.title}</span></div>
                  <div className="text-lg md:text-xl font-black uppercase mb-3 tracking-tight">{wk.subtitle}</div>
                  <p className="text-xs opacity-50 mb-3 leading-relaxed max-w-md">{wk.desc}</p>
                  <p className="text-[10px] opacity-30 italic">артефакт: {wk.artifact}</p>
                </div>
              ))}
              <div className="relative">
                <div className="absolute left-[-56px] top-2 w-4 h-4 rounded-full bg-[#161620] border-2 border-[#ff6b6b] z-10 shadow-[0_0_15px_rgba(255,107,107,0.5)]" />
                <div className="text-[10px] opacity-40 uppercase tracking-[0.2em] mb-2">финал — <span className="text-[#ff6b6b] opacity-100 font-black">DEMO DAY</span></div>
                <div className="text-lg md:text-xl font-black uppercase mb-3 tracking-tight">презентация результатов + 90-дневный план</div>
                <p className="text-xs opacity-50 leading-relaxed">обратная связь от группы и экспертов</p>
              </div>
            </div>
          </div>

          {/* Calendar Grid Part */}
          <div className="w-full">
            <div className="flex items-center gap-4 mb-8">
              <div className="text-[#4dc9d4] font-bold tracking-widest text-sm">// SPRINT SCHEDULE</div>
            </div>
            <div className="text-[10px] opacity-40 mb-12 flex flex-wrap gap-x-6 gap-y-2 uppercase tracking-widest">
              <span>19 января – 15 февраля 2026</span>
              <span>4 weeks</span>
              <span>~6h/week</span>
              <span>CET</span>
            </div>

            <div className="grid grid-cols-[80px_repeat(7,1fr)] w-full border border-white/5 bg-white/[0.02]">
              {/* DOW Headers */}
              <div className="p-3 border-b border-r border-white/5 opacity-20 text-[8px] flex items-center justify-center">MON</div>
              <div className="p-3 border-b border-r border-white/5 opacity-20 text-[8px] flex items-center justify-center">TUE</div>
              <div className="p-3 border-b border-r border-white/5 opacity-20 text-[8px] flex items-center justify-center">WED</div>
              <div className="p-3 border-b border-r border-white/5 opacity-20 text-[8px] flex items-center justify-center">THU</div>
              <div className="p-3 border-b border-r border-white/5 opacity-20 text-[8px] flex items-center justify-center">FRI</div>
              <div className="p-3 border-b border-r border-white/5 opacity-20 text-[8px] flex items-center justify-center">SAT</div>
              <div className="p-3 border-b border-r border-white/5 opacity-20 text-[8px] flex items-center justify-center">SUN</div>
              <div className="p-3 border-b border-white/5"></div>

              {/* Rows */}
              {['W1', 'W2', 'W3', 'W4'].map((wk, weekIdx) => (
                <React.Fragment key={wk}>
                  <div className="p-3 border-b border-r border-white/5 flex flex-col justify-center items-start">
                    <div className="text-[10px] font-black text-[#4dc9d4]">{wk}</div>
                    <div className="text-[7px] opacity-30 uppercase leading-none mt-1">
                      {weekIdx === 0 ? 'Prompt' : weekIdx === 1 ? 'Context' : weekIdx === 2 ? 'Mind' : 'Life'}
                    </div>
                  </div>
                  {calendarDays.slice(weekIdx * 7, (weekIdx + 1) * 7).map((day, i) => (
                    <div key={i} className={`h-24 p-2 border-b border-r border-white/5 relative flex flex-col items-center justify-center group ${day.type !== 'rest' ? 'bg-white/[0.03]' : ''}`}>
                      {day.month && (
                        <div className="absolute top-1 left-1 text-[6px] font-bold text-[#4dc9d4] opacity-50">{day.month}</div>
                      )}
                      {/* Horizontal line for rail effect */}
                      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-[2px]" />
                      
                      <div className={`relative z-10 w-8 h-8 flex items-center justify-center text-[10px] font-bold rounded-lg transition-all duration-300
                        ${day.type === 'lecture' ? 'bg-[#4dc9d4] text-[#161620] shadow-[0_0_15px_rgba(77,201,212,0.4)]' : ''}
                        ${day.type === 'workshop' ? 'border-2 border-[#38d9a9] text-[#38d9a9] bg-[#38d9a9]/10' : ''}
                        ${day.type === 'coworking' ? 'border border-[#4dc9d4] text-white' : ''}
                        ${day.type === 'demo' ? 'bg-[#ff6b6b] text-white shadow-[0_0_15px_rgba(255,107,107,0.4)]' : ''}
                        ${day.type === 'rest' ? 'text-white/20' : ''}
                      `}>
                        {day.date}
                        {day.type === 'workshop' && <div className="absolute -top-1 -right-1 text-[6px] bg-[#38d9a9] text-[#161620] px-1 rounded-sm">x2</div>}
                      </div>

                      {day.label && (
                         <div className="absolute bottom-1 w-full text-center text-[5px] opacity-40 truncate px-1 uppercase">{day.label}</div>
                      )}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-8 flex flex-wrap gap-6 text-[8px] uppercase font-bold tracking-widest opacity-60 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4dc9d4]" /> лекция
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 border border-[#38d9a9] rounded-sm" /> воркшоп
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 border border-[#4dc9d4] rounded-sm" /> coworking
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm border border-white/20 border-dashed" /> office hours
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#ff6b6b]" /> demo day
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

// --- MAIN PAGE ---


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

  const pricingPlans = [
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
      desc: 'базовый формат для самостоятельной работы',
      more: [
        'Формат: 4 недели, online',
        'Подходит non-tech и advanced users',
        'Старт: 19 января, финал: 16 февраля'
      ]
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
      desc: 'для тех, кто строит полный ai-стек',
      more: [
        'Углубление в треки и личные кейсы',
        'Больше поддержки и обратной связи',
        'Лучший выбор для системного внедрения'
      ]
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
      desc: 'индивидуальный маршрут внедрения',
      more: [
        'Персональная стратегия под ваш контекст',
        'Точечная поддержка до результата',
        'Фокус на реальные бизнес-задачи'
      ]
    },
  ];


export default function LabW26PageV3() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [labsDropdownOpen, setLabsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAllFeedback, setShowAllFeedback] = useState(false);
  const [theme, setTheme] = useState<'winter' | 'spring'>('winter');
  const [isMobile, setIsMobile] = useState(false);
  const [flippedPricing, setFlippedPricing] = useState<Record<string, boolean>>({});
  const labsCloseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.3);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (labsCloseTimeoutRef.current !== null) {
        window.clearTimeout(labsCloseTimeoutRef.current);
      }
    };
  }, []);

  
  const visibleFeedback = showAllFeedback
    ? feedbackData
    : isMobile
      ? feedbackData.slice(0, 2)
      : feedbackData;

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

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const openLabsDropdown = () => {
    if (labsCloseTimeoutRef.current !== null) {
      window.clearTimeout(labsCloseTimeoutRef.current);
      labsCloseTimeoutRef.current = null;
    }
    setLabsDropdownOpen(true);
  };

  const closeLabsDropdown = () => {
    if (labsCloseTimeoutRef.current !== null) {
      window.clearTimeout(labsCloseTimeoutRef.current);
    }
    labsCloseTimeoutRef.current = window.setTimeout(() => {
      setLabsDropdownOpen(false);
      labsCloseTimeoutRef.current = null;
    }, 220);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f7] text-[#181616] font-mono selection:bg-black selection:text-white overflow-x-hidden relative">
      
      {/* Sidebar (Desktop) */}
      <aside className={`fixed top-0 left-0 w-1/5 h-screen border-r border-black/10 p-10 z-[300] hidden md:flex flex-col bg-[#f9f9f7] transition-all duration-700 ease-in-out ${scrolled ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none -translate-x-8'}`}>
        <div className="flex items-center gap-4 mb-20 cursor-pointer" onClick={() => scrollTo('#hero')}>
          <div className="relative w-8 h-8">
             <img src="/assets/ai-mindset-logo.png" className="absolute inset-0 w-full h-full object-contain" alt="LOGO" />
          </div>
          <div className="font-black text-xs tracking-tighter uppercase">AI MINDSET</div>
        </div>
        <nav className="flex flex-col gap-6 text-[11px] font-bold uppercase tracking-widest">
          <div className="relative flex items-center gap-2 w-fit" onMouseEnter={openLabsDropdown} onMouseLeave={closeLabsDropdown}>
            <div className="group flex items-center gap-2 opacity-60 hover:text-black hover:opacity-100 transition-opacity cursor-pointer">
              <MenuStrikeText>{`{labs}`}</MenuStrikeText> <span className="opacity-30">|</span>
            </div>
            <AnimatePresence>
              {labsDropdownOpen && <LabsHoverMenu />}
            </AnimatePresence>
          </div>
          {PRIMARY_MENU_LINKS.map((link) => (
            <a key={link.label} href={link.href} target="_blank" className="group flex items-center gap-2 opacity-60 hover:text-black hover:opacity-100 transition-opacity w-fit">
              <MenuStrikeText>{link.label}</MenuStrikeText> <span className="opacity-30">|</span>
            </a>
          ))}
        </nav>
        <div className="mt-auto">
          <a href="https://join.aimindset.org/waitlist" className="border border-black/60 text-black p-6 text-[10px] font-black uppercase tracking-widest text-center block hover:bg-black hover:text-[#f9f9f7] transition-all rounded-sm">ЗАПИСАТЬСЯ</a>
        </div>
      </aside>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[450] flex flex-col p-8 overflow-y-auto md:hidden"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            <div className="flex justify-between items-center mb-12">
              <div className="text-xl font-bold uppercase tracking-widest">MENU // NAVIGATION</div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-current/5 rounded-full border border-current">
                <X size={24} />
              </button>
            </div>

            <div className="grid gap-12">
              <div>
                <div className="text-[10px] opacity-40 uppercase tracking-widest mb-6 border-b border-current/10 pb-2">PAGE SECTIONS</div>
                <div className="flex flex-col gap-4">
                  {SIDEBAR_NAV.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => scrollTo(link.href)}
                      className="text-4xl font-black uppercase tracking-tighter hover:line-through text-left"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] opacity-40 uppercase tracking-widest mb-6 border-b border-current/10 pb-2">LABS</div>
                <div className="flex flex-col gap-4">
                  {LAB_MENU_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-2xl font-bold uppercase tracking-tight hover:line-through"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] opacity-40 uppercase tracking-widest mb-6 border-b border-current/10 pb-2">EXTERNAL LINKS</div>
                <div className="flex flex-col gap-4">
                  {PRIMARY_MENU_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-2xl font-bold uppercase tracking-tight flex items-center gap-2 hover:line-through"
                    >
                      {link.label} <ExternalLink size={16} className="opacity-40" />
                    </a>
                  ))}
                </div>

                <div className="mt-12">
                  <a
                    href="https://join.aimindset.org/waitlist"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-block border-2 border-current px-8 py-4 text-xl font-black uppercase hover:bg-current hover:text-white transition-all"
                  >
                    ПОДАТЬ ЗАЯВКУ
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

      <main className="w-full min-h-screen relative">
        {/* Mobile Header */}
        <header
          className={`md:hidden fixed top-6 left-0 w-full z-[350] px-4 py-4 flex justify-between items-center border-b border-current/10 transition-transform duration-500 ${isMenuOpen ? '-translate-y-24' : 'translate-y-0'}`}
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
           <div className="flex gap-4 items-center">
              <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }} className="font-bold leading-none flex items-center gap-2">
                <img src="/assets/ai-mindset-logo.png" className="h-6 w-6 object-contain" alt="LOGO" />
                <span className="text-[10px] tracking-[0.4em] font-light border-l border-current pl-4">MINDSET</span>
              </a>
           </div>
           <div className="flex gap-4 items-center">
             <a
               href="https://join.aimindset.org/waitlist"
               target="_blank"
               rel="noreferrer"
               className="flex border border-current px-3 py-1 text-[9px] items-center gap-2 hover:bg-current hover:text-white transition-colors cursor-pointer"
             >
               <span className="font-bold">ЗАПИСАТЬСЯ</span>
             </a>
             <button
               onClick={() => setIsMenuOpen(true)}
               className="p-2 hover:bg-current/5 transition-colors"
             >
               <Menu size={20} />
             </button>
           </div>
        </header>

        {/* Header Ticker */}
        <header className={`fixed top-16 md:top-0 right-0 w-full md:w-[80%] h-12 bg-white border-b border-black/10 flex items-center px-10 z-[250] overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out ${scrolled ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'}`}>
            <div className="text-[10px] text-black font-mono uppercase tracking-[0.2em] flex items-center gap-8 animate-marquee">
               <span>AI MINDSET LAB W26</span> <span className="opacity-40">.</span> <span>BATCH: WINTER 26</span> <span className="opacity-40">.</span> <span>APPLICATIONS: CLOSE</span> <span className="opacity-40">.</span> <span>NEXT BATCH: 20 APRIL</span> <span className="opacity-40">.</span>
               <span>AI MINDSET LAB W26</span> <span className="opacity-40">.</span> <span>BATCH: WINTER 26</span> <span className="opacity-40">.</span> <span>APPLICATIONS: CLOSE</span> <span className="opacity-40">.</span> <span>NEXT BATCH: 20 APRIL</span> <span className="opacity-40">.</span>
            </div>
        </header>

        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center pt-32 pb-12">
          <Container>
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
               <div className="w-full lg:w-3/5 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-8 opacity-40 text-[10px] font-black uppercase tracking-widest">FOUNDATION // LAB W26</div>
                  <h1 className="text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.9] mb-12 uppercase">
                    <span className="whitespace-nowrap">AI Mindset</span> Main Lab W26
                  </h1>
                  
                  {/* MODAL ORDER FOR MOBILE: LOGO BETWEEN TITLE AND DESCRIPTION */}
                  <div className="lg:hidden mb-12">
                     <VoxelLogoFace className="w-full max-w-[280px] mx-auto" scale={1} />
                  </div>

                  <p className="max-w-md mx-auto lg:mx-0 text-sm uppercase leading-relaxed font-bold opacity-70 mb-12">От единого контекста к персональной AI-операционной системе.</p>
                  <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6">
                     <a href="https://join.aimindset.org/waitlist" className="bg-black text-white px-10 py-6 text-xs font-black uppercase tracking-widest hover:bg-[#8DC63F] transition-all text-center">ЗАПИСАТЬСЯ</a>
                  </div>
               </div>
               
               {/* DESKTOP LOGO */}
               <div className="hidden lg:block w-full lg:w-2/5">
                  <VoxelLogoFace className="w-full max-w-md mx-auto" />
               </div>
            </div>
          </Container>
        </section>

         <div className="md:ml-[20%] md:w-[80%] w-full">
            <section className="py-20 md:py-32 relative bg-black/[0.03] border-y border-black/10">
              <Container>
                <div className="flex flex-col items-center gap-6 mb-24 md:mb-32">
                  <div className="text-[10px] md:text-xs tracking-[0.4em] opacity-40 uppercase font-bold mb-4 border-b border-black/10 pb-4 w-full text-center">
                    BATCH: WINTER 26 MAIN LAB // STATUS: CLOSED
                  </div>

                  <div className="text-[10px] md:text-sm uppercase font-mono opacity-40 font-bold tracking-[0.3em] text-center mb-2">
                    следующий поток: 20 апреля
                  </div>
                  <a
                    href="https://join.aimindset.org/context"
                    className="group flex items-center justify-center gap-4 md:gap-8 px-12 md:px-20 py-6 md:py-8 hover:bg-black hover:text-[#f9f9f7] transition-all duration-500 font-mono uppercase text-xs md:text-sm font-black tracking-widest border border-black/60 w-full sm:w-auto text-center rounded-sm"
                  >
                    [ ПОДАТЬ ЗАЯВКУ НА X26 MAIN LAB ] <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </a>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-12 md:gap-24 w-full max-w-5xl mx-auto">
                  <div className="flex flex-col gap-6 max-w-xl">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9]">
                      лаборатория <br />
                      нового мышления <br />
                      в эпоху AI
                    </div>
                    <div className="flex items-center gap-3 text-[10px] md:text-xs font-bold opacity-60 uppercase tracking-widest bg-black/[0.03] px-3 py-1 self-start border border-black/10">
                      <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                      FOUNDATION // W26
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-6">
                    <p className="text-sm md:text-base uppercase leading-relaxed opacity-70">
                      «AI mindset winter lab w26 — это лаборатория, пространство для экспериментов. здесь вы не изучаете, а создаёте: персональных ассистентов, AI-first процессы, новую версию себя. от хаоса промптов к персональной AI-операционной системе.»
                    </p>
                    <div className="flex flex-col gap-2 mt-2">
                      <div className="text-[9px] opacity-40 font-bold uppercase tracking-widest">NEXT BATCH:</div>
                      <div className="text-xs font-black uppercase">20 APRIL 2026</div>
                    </div>
                  </div>
                </div>
              </Container>
            </section>

            <section id="philosophy" className="py-24 md:py-32 border-b border-black/10 overflow-hidden">
              <Container>
                <div className="flex items-center justify-between mb-24">
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">ТОЧКА СБОРКИ</div>
                  <div className="font-black uppercase tracking-widest text-xl md:text-2xl text-right">Философия</div>
                </div>
                <div className="grid md:grid-cols-2 gap-16 md:gap-8 items-center">
                  <div>
                    <h2 className="text-3xl md:text-5xl leading-tight mb-12">
                      Mindset важнее инструментов — технологии меняются, а новый способ мышления остаётся с вами.
                    </h2>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center text-[10px] font-bold">01</div>
                      <div className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center text-[10px] font-bold">02</div>
                    </div>
                  </div>
                  <div className="flex justify-center md:justify-end text-[#8DC63F]">
                    <div className="w-56 h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 relative flex items-center justify-center text-[8px] leading-[8px]">
                      <LargeDiamondArt className="scale-125 md:scale-150" />
                    </div>
                  </div>
                </div>
              </Container>
            </section>

<section id="program" className="py-20 md:py-32 bg-[#332b2b]/5 relative">
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
            ].map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <SymbolBorder className={`p-6 md:p-12 group hover:bg-current hover:text-white transition-all duration-500 ${colors.card}`}>
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
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Tracks Section */}
      <SlashDivider />
      <section id="tracks" className="py-20 md:py-32 relative">
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
                speaker: 'Александр Поваляев'
              },
              {
                id: 'T2',
                title: 'AI Agents',
                date: '28 Jan · Wed 18:00',
                desc: 'Автономные AI-системы. Проектирование и запуск AI-агентов, которые работают автономно.',
                result: 'автономные агенты, MCP-интеграции, workflows',
                tools: ['Claude', 'MCP', 'n8n', 'Make'],
                speaker: 'Сергей Хабаров'
              },
              {
                id: 'T3',
                title: 'Vibe-Coding',
                date: '4 Feb · Wed 18:00',
                desc: 'Творческое программирование. От идеи до прототипа за часы без технического бэкграунда.',
                result: 'vibe-coding workflow, Claude Projects для прототипов, реальные проекты',
                tools: ['Cursor', 'Windsurf', 'Claude Projects', 'V0'],
                speaker: 'Анна Лозицкая'
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
            ].map((track, idx) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <SymbolBorder className={`p-8 md:p-12 hover:bg-current hover:text-white transition-all duration-500 group ${colors.card}`}>
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
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Cases Section */}
      <SlashDivider />
      <section id="cases" className="py-20 md:py-32 bg-[#332b2b]/5">
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
      <section id="team" className="py-20 md:py-32">
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
      <section id="feedback" className="py-20 md:py-32 bg-[#332b2b]/5 relative">
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
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-current/20">
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

          {!showAllFeedback && isMobile && (
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

      {/* Schedule Section */}
      <ProgramScheduleGrid />

      {/* Pricing Section */}
      <SlashDivider />
      <section id="pricing" className="py-20 md:py-32">
        <Container>
          <SectionLabel text="PRICE" />
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <p className="text-sm opacity-60 uppercase leading-relaxed">
              скидки: Alumni (-20%), Bring a Friend (-10% каждому). возврат после первой недели — без вопросов. возможна оплата в рублях.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
              >
                <SymbolBorder
                  variant={plan.highlight ? "heavy" : "default"}
                  className={`flex flex-col h-full transition-all duration-500 ${plan.highlight ? 'shadow-[12px_12px_0px_0px_rgba(51,43,43,1)]' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => isMobile && setFlippedPricing((prev) => ({ ...prev, [plan.name]: !prev[plan.name] }))}
                    className="w-full text-left p-8 md:p-12 flex flex-col h-full"
                  >
                    <motion.div
                      animate={{ rotateY: isMobile && flippedPricing[plan.name] ? 180 : 0 }}
                      transition={{ duration: 0.45 }}
                      style={{ transformStyle: 'preserve-3d' }}
                      className="relative flex flex-col h-full"
                    >
                      <div style={{ backfaceVisibility: 'hidden' }} className={isMobile && flippedPricing[plan.name] ? 'opacity-0 h-0 overflow-hidden' : ''}>
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
                      {isMobile && flippedPricing[plan.name] && (
                        <div className="space-y-4" style={{ backfaceVisibility: 'hidden' }}>
                          <div className="text-xs uppercase opacity-60 tracking-[0.12em]">доп. информация</div>
                          {plan.more.map((m) => (
                            <div key={m} className="flex items-start gap-2 text-xs uppercase leading-tight">
                              <span className="opacity-50">+</span> {m}
                            </div>
                          ))}
                          <div className="text-[10px] opacity-60 uppercase pt-2">нажмите карточку снова, чтобы вернуть тариф</div>
                        </div>
                      )}
                    </motion.div>
                  </button>
                </SymbolBorder>
              </motion.div>
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
      <section id="apply" className="py-20 md:py-32 bg-black text-white relative overflow-hidden">
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
      <footer className="py-24 relative overflow-hidden bg-[#3b3531] text-[#f9f9f7]">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden mix-blend-overlay opacity-5">
          <div className="text-[clamp(100px,30vw,400px)] font-black leading-none uppercase select-none text-black">MINDSET</div>
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
            <div className="text-[8px] opacity-30 uppercase tracking-[0.5em]">MADE WITH LOVE AND AI // 2026</div>
            <div className="flex gap-4">
              {['/', '\\', '/', '\\'].map((s, i) => <span key={i} className="opacity-20">{s}</span>)}
            </div>
          </div>
        </Container>

      </footer>
         </div>
      </main>

      <CookieConsent />
    </div>
  );
}

const CookieConsent = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-[600] max-w-[320px] w-[calc(100%-32px)] md:w-[calc(100%-48px)] bg-white border-2 border-black p-5 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] md:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="text-[8px] md:text-[9px] font-black opacity-30 mb-2 md:mb-4 uppercase tracking-widest">SYSTEM NOTICE</div>
        <p className="text-[9px] md:text-[10px] font-bold leading-relaxed mb-4 md:mb-6 uppercase text-black">МЫ ИСПОЛЬЗУЕМ КУКИ ДЛЯ ВАШЕЙ AI-СИНХРОНИЗАЦИИ.</p>
        <button onClick={() => { localStorage.setItem('cookie-consent', 'true'); setShow(false); }} className="w-full bg-black text-white py-2 md:py-4 text-[9px] md:text-[10px] font-black uppercase hover:bg-[#8DC63F] transition-colors">ПОНЯТНО</button>
    </div>
  );
};
