import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  ChevronRight,
  ArrowRight,
  ChevronDown,
  X,
  ExternalLink
} from 'lucide-react';




// --- COMPONENTS ---
const MindsetDynamicArt = ({ className = "" }: { className?: string }) => (
  <div className={className}>
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ background: 'transparent' }}>
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#glow)">
        <line x1="37.20" y1="30.00" x2="34.80" y2="30.00" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="37.20;36.95;36.20;34.95;33.20;31.45;30.20;29.45;29.20;29.45;30.20;31.45;33.20;34.95;36.20;36.95;37.20" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="30.00;30.13;30.50;31.13;32.00;32.88;33.50;33.88;34.00;33.88;33.50;32.88;32.00;31.13;30.50;30.13;30.00" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="34.80;34.55;33.80;32.55;30.80;29.05;27.80;27.05;26.80;27.05;27.80;29.05;30.80;32.55;33.80;34.55;34.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="30.00;30.13;30.50;31.13;32.00;32.88;33.50;33.88;34.00;33.88;33.50;32.88;32.00;31.13;30.50;30.13;30.00" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="62.80" y1="30.00" x2="65.20" y2="30.00" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="62.80;63.05;63.80;65.05;66.80;68.55;69.80;70.55;70.80;70.55;69.80;68.55;66.80;65.05;63.80;63.05;62.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="30.00;30.13;30.50;31.13;32.00;32.88;33.50;33.88;34.00;33.88;33.50;32.88;32.00;31.13;30.50;30.13;30.00" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="65.20;65.45;66.20;67.45;69.20;70.95;72.20;72.95;73.20;72.95;72.20;70.95;69.20;67.45;66.20;65.45;65.20" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="30.00;30.13;30.50;31.13;32.00;32.88;33.50;33.88;34.00;33.88;33.50;32.88;32.00;31.13;30.50;30.13;30.00" dur="6s" repeatCount="indefinite" />
        </line>
      </g>
    </svg>
  </div>
);

// --- TYPES ---
interface NavItem {
  label: string;
  href: string;
}

interface CaseCard {
  title: string;
  author: string;
  role: string;
  desc: string;
  details: string;
  tools: string;
  metric: string;
  artFrames: string[];
  filters: string[];
}

// --- CONSTANTS ---
const SIDEBAR_NAV: NavItem[] = [
  { label: 'ФИЛОСОФИЯ', href: '#philosophy-cards' },
  { label: 'ПРОГРАММА', href: '#program' },
  { label: 'КЕЙСЫ', href: '#cases' },
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

const BASE_URL = import.meta.env.BASE_URL;
const LOGO_SRC = `${BASE_URL}assets/ai-mindset-logo.png`;
const LOGO_LEFT_SRC = `${BASE_URL}AIMLeft-02.png`;
const MINDSET_MORPH_ANIMATED_SRC = `${BASE_URL}assets/mindset-morph-animated.svg`;
const speakerImage = (filename: string) => `${BASE_URL}assets/speakers/${filename}`;

function InlineAnimatedSvg({
  src,
  className,
  ariaLabel,
}: {
  src: string;
  className?: string;
  ariaLabel: string;
}) {
  const [svgMarkup, setSvgMarkup] = useState('');

  useEffect(() => {
    let cancelled = false;

    fetch(src)
      .then((response) => response.text())
      .then((markup) => {
        if (cancelled) return;
        const normalizedMarkup = markup
          .replace('style="background: #111113"', 'style="background: transparent"')
          .replace('<svg ', '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet" ');
        setSvgMarkup(normalizedMarkup);
      })
      .catch(() => {
        if (!cancelled) setSvgMarkup('');
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={className}
      dangerouslySetInnerHTML={svgMarkup ? { __html: svgMarkup } : undefined}
    />
  );
}

const CASE_FILTERS = [
  { id: 'all', label: 'все' },
  { id: 'non-tech', label: 'нетехнический' },
  { id: 'manager', label: 'менеджер' },
  { id: 'creative', label: 'креатор' },
  { id: 'educator', label: 'преподаватель' },
  { id: 'developer', label: 'разработчик' },
];

const CASE_ARTS = {
  coaching: [
    "[ SYS ]\n   /|\\\n  / | \\\n /  O  \\\n -----"
  ],
  vision: [
    "{ V_EYE }\n +----+\n | () |\n +----+"
  ],
  learning: [
    "< SYNC >\n .  .  .\n  * * *\n *  *  *"
  ],
  summary: [
    "--- LOG ---\n [x] item\n [ ] todo\n -  -  -"
  ],
  knowledge: [
    ">> DB_REQ\n  ::::\n  ::::"
  ],
  project: [
    "+--/--/--+\n  /--/--/\n /--/--/"
  ],
  automation: [
    "A -> B -> C\n  \\  |  /\n   \\ | /\n     v"
  ],
  research: [
    "0.1.00.1\n.10..01.\n1..01..0"
  ],
  content: [
    "A B C D E\n.F G H I.\n..J K L.."
  ],
  analytics: [
    "    + \n   +++\n  +++++"
  ]
};

const CASE_CARDS: CaseCard[] = [
  {
    title: 'AI COACHING',
    author: 'Анна Л.',
    role: 'Executive-коуч',
    desc: 'Персональный AI-коуч',
    details: 'Система поддержки решений и рефлексии с персонализированным контекстом.',
    tools: 'Claude · Obsidian · Notion',
    metric: '−35% хаоса в задачах',
    artFrames: CASE_ARTS.coaching,
    filters: ['non-tech']
  },
  {
    title: 'AI VISION',
    author: 'Виктория М.',
    role: 'Арт-директор',
    desc: 'Категоризация изображений',
    details: 'Пайплайн разметки визуальных архивов с тегами и автоматической сортировкой.',
    tools: 'GPT Vision · Claude',
    metric: '3x быстрее сортировка',
    artFrames: CASE_ARTS.vision,
    filters: ['creative', 'non-tech']
  },
  {
    title: 'AI LEARNING',
    author: 'Ирина С.',
    role: 'Преподаватель',
    desc: 'Языковой партнер',
    details: 'Адаптивная conversational-модель для тренировок и обратной связи.',
    tools: 'GPT-4 · ElevenLabs',
    metric: '+40% регулярность практики',
    artFrames: CASE_ARTS.learning,
    filters: ['educator', 'non-tech']
  },
  {
    title: 'AI SUMMARY',
    author: 'Михаил К.',
    role: 'Product Manager',
    desc: 'Суммаризация встреч',
    details: 'Автоматические summary + action items + синхронизация задач.',
    tools: 'Whisper · Gemini · Notion',
    metric: '−60% ручной рутины',
    artFrames: CASE_ARTS.summary,
    filters: ['manager']
  },
  {
    title: 'AI KNOWLEDGE',
    author: 'Елена В.',
    role: 'Аналитик',
    desc: 'Чат с базой знаний',
    details: 'RAG-слой над заметками и документами команды.',
    tools: 'Obsidian · MCP · Claude API',
    metric: '10x быстрее поиск ответа',
    artFrames: CASE_ARTS.knowledge,
    filters: ['developer']
  },
  {
    title: 'AI PROJECT',
    author: 'Дмитрий О.',
    role: 'Project Manager',
    desc: 'PM-ассистент',
    details: 'Мониторинг прогресса с автостатусами и еженедельными брифингами.',
    tools: 'Linear · Notion · n8n',
    metric: '+25% предсказуемость сроков',
    artFrames: CASE_ARTS.project,
    filters: ['manager', 'non-tech']
  },
  {
    title: 'AI AUTOMATION',
    author: 'Олег Т.',
    role: 'Operations Lead',
    desc: 'Автоматизация воркфлоу',
    details: 'Многошаговые сценарии: от входящего сигнала до обновления CRM и уведомлений.',
    tools: 'n8n · Make · Claude',
    metric: '12+ часов в неделю экономии',
    artFrames: CASE_ARTS.automation,
    filters: ['developer']
  },
  {
    title: 'AI RESEARCH',
    author: 'Василий П.',
    role: 'Разработчик',
    desc: 'Исследовательский ассистент',
    details: 'Сбор и синтез материалов из разных источников в структуру для решений.',
    tools: 'Perplexity · Elicit · GPT',
    metric: '2 дня → 2 часа',
    artFrames: CASE_ARTS.research,
    filters: ['developer']
  },
  {
    title: 'AI CONTENT',
    author: 'Мария Д.',
    role: 'Копирайтер',
    desc: 'Генерация контента',
    details: 'Контент-конвейер: идеи, сценарии, тексты, адаптация под каналы.',
    tools: 'Claude · ChatGPT · Midjourney',
    metric: '3x скорость публикаций',
    artFrames: CASE_ARTS.content,
    filters: ['creative', 'non-tech']
  },
  {
    title: 'AI ANALYTICS',
    author: 'Алексей Н.',
    role: 'Data Scientist',
    desc: 'Анализ данных',
    details: 'Сводка метрик и пояснения на человеческом языке для команд.',
    tools: 'Python · GPT · Sheets',
    metric: '−50% времени на отчётность',
    artFrames: CASE_ARTS.analytics,
    filters: ['developer']
  },
];

const PROGRAM_TRACKS = [
  {
    id: '01',
    week: 'WEEK 1',
    title: 'Prompt Engineering',
    shortDescription: 'AI КАК ИНТЕРФЕЙС МЫШЛЕНИЯ',
    longDescription: 'Освоение техник промптов: Chain-of-Thought, Few-Shot Learning, Custom GPTs. Создание первых персональных ассистентов.',
    art: 'prompt' as const,
  },
  {
    id: '02',
    week: 'WEEK 2',
    title: 'Context Engineering',
    shortDescription: 'АВТОМАТИЗАЦИЯ И АГЕНТЫ',
    longDescription: 'Управление контекстом: Obsidian + MCP + Claude. Автоматизация через n8n, Make. AI-агенты и workflows.',
    art: 'context' as const,
  },
  {
    id: '03',
    week: 'WEEK 3',
    title: 'Mind Engineering',
    shortDescription: 'ПРОДУКТИВНОСТЬ И РИТУАЛЫ',
    longDescription: 'AI для коучинга, рефлексии, персональных ритуалов. Трекинг привычек и целей с поддержкой AI.',
    art: 'mind' as const,
  },
  {
    id: '04',
    week: 'WEEK 4',
    title: 'Life Engineering',
    shortDescription: 'ТВОРЧЕСТВО И РЕАЛИЗАЦИЯ',
    longDescription: 'От идеи до прототипа. Vibe-coding с Cursor, Windsurf, Claude Projects. Создание без технического бэкграунда.',
    art: 'life' as const,
  },
];

const PROGRAM_TRACK_VARIANTS = {
  '01': {
    desktopPanel: 'md:group-hover:bg-[#8DC63F] md:group-hover:text-white',
    desktopTone: 'bg-[#8DC63F] text-white',
    mobileTone: 'bg-[#8DC63F] text-white border-[#7ab22f]',
    accent: 'text-[#8DC63F]',
    command: '> PROMPT_STACK_READY_',
  },
  '02': {
    desktopPanel: 'md:group-hover:bg-[#181616] md:group-hover:text-[#f9f9f7]',
    desktopTone: 'bg-[#181616] text-[#f9f9f7]',
    mobileTone: 'bg-[#181616] text-[#f9f9f7] border-black',
    accent: 'text-[#181616]',
    command: '> DATA_STREAM_ACTIVE_',
  },
  '03': {
    desktopPanel: 'md:group-hover:bg-[#f0ede7] md:group-hover:text-[#181616]',
    desktopTone: 'bg-[#f0ede7] text-[#181616]',
    mobileTone: 'bg-[#f0ede7] text-[#181616] border-[#d8d2c7]',
    accent: 'text-[#7a746c]',
    command: '> RITUAL_LOOP_ONLINE_',
  },
  '04': {
    desktopPanel: 'md:group-hover:bg-[#181616] md:group-hover:text-[#8DC63F]',
    desktopTone: 'bg-[#181616] text-[#8DC63F]',
    mobileTone: 'bg-[#181616] text-[#8DC63F] border-black',
    accent: 'text-[#181616]',
    command: '> DEPLOY_TO_PRODUCTION_',
  },
} as const;

const ADVANCED_TRACKS = [
  {
    id: 'T1',
    week: 'WEEK 1',
    title: 'AI Coaching',
    description: 'Для тех, кто выгорел и ищет баланс. AI для коучинга, рефлексии, персональных ритуалов.',
    speaker: 'Александр Поваляев',
  },
  {
    id: 'T2',
    week: 'WEEK 2',
    title: 'AI Agents',
    description: 'Автономные AI-системы. Проектирование и запуск AI-агентов, которые работают автономно.',
    speaker: 'Сергей Хабаров',
  },
  {
    id: 'T3',
    week: 'WEEK 3',
    title: 'Vibe-Coding',
    description: 'Творческое программирование. От идеи до прототипа за часы без технического бэкграунда.',
    speaker: 'Анна Лозицкая',
  },
  {
    id: 'T4',
    week: 'WEEK 4',
    title: 'AI Creative',
    description: 'Для музыкантов, художников и креативщиков. Генерация музыки, визуального контента.',
    speaker: 'Анка Ставенски',
  },
];

const PHILOSOPHY_PILLARS = [
  {
    title: 'СООБЩЕСТВО',
    description: 'вы учитесь не только у экспертов, но и друг у друга',
    art: 'synergy' as const,
  },
  {
    title: 'ПРАКТИКА',
    description: 'каждая неделя это эксперимент с реальными задачами и артефактами',
    art: 'action' as const,
  },
  {
    title: 'ПЕРСОНАЛИЗАЦИЯ',
    description: 'углубляйтесь в то, что нужно именно вам через дополнительные треки',
    art: 'trajectory' as const,
  },
];

const MINDSET_QUOTES = [
  {
    text: 'Mindset важнее инструментов — технологии меняются, а новый способ мышления остаётся с вами.',
    author: '',
    role: '',
  },
  {
    text: 'После лабы я понял: это не просто инструменты, а новый способ мышления. Я офигел, когда Cursor сам нашел решение проблемы, которую я не знал как решить.',
    author: 'Сергей Петров',
    role: 'Unix developer, 20+ лет опыта',
  },
  {
    text: 'Я боялась, что это слишком сложно для нетехнического человека. Но через 3 недели я уже создавала агентов и автоматизации. Теперь веду трек по AI для 700+ коллег.',
    author: 'Екатерина Грачева',
    role: 'HR-коммуникации, Avito',
  },
  {
    text: 'После первой лекции по вайб-кодингу я не мог уснуть до 6 утра. Побежал делать. Это было мощно. AI стал моим соавтором, а не просто инструментом.',
    author: 'Антон Мормышев',
    role: 'Музыкант',
  },
];

const TEAM_MEMBERS = [
  {
    name: 'Александр Поваляев',
    role: 'Основатель AI Mindset, стратег',
    description: 'Основатель проекта AI Mindset, стратег и эксперт по AI-интеграциям. 15+ лет соединяет технологии, бизнес и людей, создавая системы, которые работают на человека, а не наоборот. На лаборатории помогает увидеть большую картину и встроить AI в жизнь и работу осмысленно.',
    image: speakerImage('alexander-povalyaev.jpg'),
  },
  {
    name: 'Сергей Хабаров',
    role: 'Системный архитектор',
    description: 'Системный архитектор на стыке AI, образования и бизнес-процессов. 6+ лет в образовании, 500+ обученных специалистов. Бывший CTO и директор по развитию. Ведёт Context Engineering: как структурировать знания, чтобы AI работал с ними, а не терялся в хаосе файлов и заметок.',
    image: speakerImage('sergey-khabarov.jpg'),
  },
  {
    name: 'Степан Гершуни',
    role: 'Технологический стратег',
    description: 'Founder, построил Credentia, Deep Skills и Codex Town. Инвестор в венчурном фонде Cyber Fund, крипто- и ИИ-энтузиаст. Автор cybOS, о которой и расскажет на лаборатории на Advanced-треке.',
    image: speakerImage('stepan-gershuni.jpg'),
  },
  {
    name: 'Алексей Иванов',
    role: 'Executive-коуч',
    description: 'Executive-коуч для фаундеров и IT-лидеров. ICF PCC, ex-дизайн лид. После 15 лет в UX и продуктах делает то, что действительно даёт энергию и драйв. Ведёт advanced-трек AI-coaching.',
    image: speakerImage('alexey-ivanov.jpg'),
  },
  {
    name: 'Серёжа Рис',
    role: 'AI-евангелист, ex Yandex',
    description: 'AI-евангелист, ex Yandex. Билдер и фаундер в комьюнити вайбкодеров @vibecod3rs. Клод-код стример на YouTube. Ведёт advanced-трек vibe-coding.',
    image: speakerImage('serezha-ris.jpg'),
  },
  {
    name: 'Анна Ставенски',
    role: 'Продуктовый архитектор',
    description: 'Продуктовый архитектор. 10+ лет в управлении, технологических и креативных индустриях: продукт, визуал, роботы, тренажёры. PO в стартапах и визуальный сторителлер в жизни. Ведёт Life Engineering и помогает собрать изученные инструменты в единую систему.',
    image: speakerImage('anka-stavenski.jpg'),
  },
  {
    name: 'Анна Лозицкая',
    role: 'Фаундер embraceme.app',
    description: '12+ лет помогала стартапам расти с нуля до больших раундов. Фаундер embraceme.app. Исследует, как технологии помогают основателям. Ведёт Mind Engineering: как использовать AI для персональных ритуалов, рефлексии и трекинга целей.',
    image: speakerImage('anna-lozitskaya.jpg'),
  },
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

const EditorialSectionHeader = ({ eyebrow, title, className = "" }: { eyebrow: string; title: string; className?: string }) => (
  <div className={`flex items-end gap-6 md:gap-10 ${className}`}>
    <div className="text-[11px] md:text-[13px] font-bold uppercase tracking-[0.2em] opacity-40 shrink-0 mb-[0.15rem] md:mb-[0.25rem]">{eyebrow}</div>
    <div className="h-px min-w-[40px] flex-1 bg-black/10 mb-[0.45rem] md:mb-[0.75rem]" />
    <div className="font-black uppercase tracking-widest text-2xl md:text-5xl/none text-right">{title}</div>
  </div>
);

const AsciiCardBorder = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative h-full ${className}`}>
    <div className="pointer-events-none absolute left-2 right-2 top-0 overflow-hidden whitespace-nowrap font-mono text-[9px] leading-none opacity-30 select-none">
      {"+ - - - + - - - + - - - + - - - + - - - + - - - + - - - + - - - + - - - +"}
    </div>
    <div className="pointer-events-none absolute bottom-0 left-2 right-2 overflow-hidden whitespace-nowrap font-mono text-[9px] leading-none opacity-30 select-none">
      {"+ - - - + - - - + - - - + - - - + - - - + - - - + - - - + - - - + - - - +"}
    </div>
    <div className="pointer-events-none absolute left-0 top-3 bottom-3 whitespace-pre font-mono text-[9px] leading-[0.78] opacity-30 select-none">|{"\n"}|{"\n"}|{"\n"}|{"\n"}|{"\n"}|{"\n"}|{"\n"}|</div>
    <div className="pointer-events-none absolute right-0 top-3 bottom-3 whitespace-pre font-mono text-[9px] leading-[0.78] opacity-30 select-none">|{"\n"}|{"\n"}|{"\n"}|{"\n"}|{"\n"}|{"\n"}|{"\n"}|</div>
    <div className="relative h-full bg-white/35 px-6 py-6 md:px-7 md:py-7">
      {children}
    </div>
  </div>
);

const AsciiShuffler = ({ frames, interval = 150 }: { frames: string[]; interval?: number }) => {
  const [frameIdx, setFrameIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrameIdx((idx) => (idx + 1) % frames.length);
    }, interval);

    return () => clearInterval(timer);
  }, [frames.length, interval]);

  return (
    <div className="font-mono text-[8px] md:text-[10px] leading-[1.1] whitespace-pre flex w-full items-center justify-center opacity-70 transition-opacity">
      {frames[frameIdx]}
    </div>
  );
};

const philosophyFoundationFrames = [
  `
    [ BASE ]
   |      |
  |        |
 /==========\\
   < 0x01 >
  `,
  `
    [ BASE ]
   |......|
  |........|
 /==========\\
   < 0x0A >
  `,
  `
    [ BASE ]
   |XXXXXX|
  |XXXXXXXX|
 /==========\\
   < 0x0F >
  `,
];

const philosophyActionFrames = [
  `
 [==========]
 > EXE: 10%
 |#         |
 [==========]
  `,
  `
 [==========]
 > EXE: 50%
 |#####     |
 [==========]
  `,
  `
 [==========]
 > EXE: 99%
 |######### |
 [==========]
  `,
];

const philosophySynergyFrames = [
  `
  O       O
   \\     /
    O---O
   /     \\
  O       O
  `,
  `
  *---O   O
   \\ /   /
    *---O
   /     \\
  O       O
  `,
  `
  *---*---*
   \\ / \\ /
    *---*
   / \\ / \\
  *---*---*
  `,
];

const philosophyTrajectoryFrames = [
  `
   [ TARGET ]
    X: 000
    Y: 000
      ||
      \\/
  `,
  `
   [ TARGET ]
    X: 255
    Y: 128
      ||
      \\/
  `,
  `
   [ TARGET ]
    X: FFF
    Y: FFF
      ||
      \\/
  `,
];

const PhilosophyFoundationArt = () => <AsciiShuffler frames={philosophyFoundationFrames} interval={1500} />;
const PhilosophyActionArt = () => <AsciiShuffler frames={philosophyActionFrames} interval={1000} />;
const PhilosophySynergyArt = () => <AsciiShuffler frames={philosophySynergyFrames} interval={2500} />;
const PhilosophyTrajectoryArt = () => <AsciiShuffler frames={philosophyTrajectoryFrames} interval={900} />;

const PhilosophyPillarArt = ({ art }: { art: 'foundation' | 'action' | 'synergy' | 'trajectory' }) => {
  if (art === 'foundation') return <PhilosophyFoundationArt />;
  if (art === 'action') return <PhilosophyActionArt />;
  if (art === 'synergy') return <PhilosophySynergyArt />;
  return <PhilosophyTrajectoryArt />;
};

const MenuStrikeText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`relative inline-flex items-center ${className}`}>
    <span>{children}</span>
    <span className="pointer-events-none absolute left-0 top-1/2 h-px w-full -translate-y-1/2 scale-x-0 bg-current origin-left transition-transform duration-200 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
  </span>
);

const ProgramPromptArt = () => {
  const codeLines = [
    '> EXECUTE_ROOT_DIRECTIVE()',
    '  Initializing semantic parser...',
    '  [████████--] 80%',
    '> GENERATE_WORLD_MODEL();',
    '  > Context: HIGH',
    '  < SYSTEM READY >',
  ];

  return (
    <div className="font-mono text-[8px] md:text-[10px] leading-[1.1] whitespace-pre opacity-80 h-full w-full flex flex-col justify-center items-center">
      <motion.div
        animate={{ opacity: [0.45, 0.9, 0.45], y: [0, -3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="text-left"
      >
{`   [=== SYNTAX CORE ===]
    \\                 /
     \\   { SYSTEM }  /
      \\             / 
       \\           /  
        \\ ------- /   
         |       |    
         | INPUT |    
         |-------|    
        /         \\   
       /  OUTPUT   \\  
      /             \\ 
     /               \\
    [=================]`}
      </motion.div>
      <div className="mt-4 text-left w-full max-w-[200px] overflow-hidden">
        {codeLines.map((line, i) => (
          <motion.div
            key={line}
            animate={{ opacity: [0.15, 0.65, 0.15], x: [0, 2, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.45 }}
          >
            {line}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ProgramContextArt = () => (
  <div className="font-mono text-[8px] md:text-[10px] leading-[1.1] whitespace-pre opacity-80 h-full w-full flex flex-col justify-center items-center relative overflow-hidden">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15"
    >
{`        .  .  .  .  .  
      .               .
    .                   .
   .                     .
  .                       .
  .                       .
   .                     .
    .                   .
      .               .
        .  .  .  .  .`}
    </motion.div>

    <div className="relative z-10 flex gap-4">
      {['N8N', 'MCP', 'LLM'].map((label, idx) => (
        <motion.div
          key={label}
          animate={{ y: [0, idx % 2 === 0 ? -8 : 8, 0] }}
          transition={{ duration: 6 + idx, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.7 }}
        >
{`   [ ]
  [   ]
 [ ${label} ]
  [   ]
   [ ]`}
        </motion.div>
      ))}
    </div>

    <motion.div
      className="mt-8"
      animate={{ opacity: [0.25, 0.75, 0.25], letterSpacing: ['0.08em', '0.16em', '0.08em'] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      {'<-- [ DATA_STREAM_ACTIVE ] -->'}
    </motion.div>
  </div>
);

const ProgramMindArt = () => (
  <div className="font-mono text-[8px] md:text-[10px] leading-[1.1] whitespace-pre opacity-80 h-full w-full flex items-center justify-center">
    <div className="relative">
      <motion.div
        animate={{ scale: [1, 1.03, 1], opacity: [0.55, 0.95, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
{`            ____
         .-'    '-.
        /          \\
       |    O  O    |
       |     \\/     |  
        \\   ====   /
         '-.____.-'
            |  |
           /    \\
          |      |`}
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: [0, 0.35, 0], scale: [0.98, 1.04, 0.98] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      >
{`            ____
         .-'++++'-.
        /++++++++++\\
       |++++++++++++|
       |++++++++++++|  
        \\++++++++++/
         '-.____.-'
            |  |
           /    \\
          |      |`}
      </motion.div>
    </div>
  </div>
);

const ProgramLifeArt = () => (
  <div className="font-mono text-[8px] md:text-[10px] leading-[1.1] whitespace-pre opacity-80 h-full w-full flex flex-col items-center justify-center">
    <div className="flex w-full px-8 justify-between">
      {[
        { label: 'VIBE', heights: ['28px', '88px', '56px', '96px', '62px'], delay: 0 },
        { label: 'CODE', heights: ['72px', '112px', '86px', '52px', '102px'], delay: 0.8 },
        { label: 'IDEA', heights: ['44px', '30px', '104px', '68px', '84px'], delay: 1.6 },
        { label: 'SHIP', heights: ['98px', '70px', '38px', '92px', '120px'], delay: 0.4 },
      ].map((bar) => (
        <motion.div
          key={bar.label}
          initial={{ height: bar.heights[0] }}
          animate={{ height: bar.heights }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: bar.delay }}
          className="w-4 border-x border-t border-black bg-black/10 flex items-end justify-center overflow-hidden"
        >
          <span className="text-[6px] rotate-90 pb-2">{bar.label}</span>
        </motion.div>
      ))}
    </div>
    <div className="mt-8 pt-4 border-t border-dashed w-full text-center">
      <motion.div
        animate={{ opacity: [0.35, 0.9, 0.35] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {'> DEPLOY_TO_PRODUCTION_'}
      </motion.div>
    </div>
  </div>
);

const ProgramTrackArt = ({ art }: { art: 'prompt' | 'context' | 'mind' | 'life' }) => {
  if (art === 'prompt') return <ProgramPromptArt />;
  if (art === 'context') return <ProgramContextArt />;
  if (art === 'mind') return <ProgramMindArt />;
  return <ProgramLifeArt />;
};

const MindsetAltAnimation = () => (
  <div className="w-full h-full relative flex items-center justify-center text-[#8DC63F]">
    <motion.div
      animate={{ 
        rotate: [0, 5, 0, -5, 0],
        scale: [1, 1.02, 1],
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="w-full h-full flex items-center justify-center"
    >
      <div className="text-[4px] md:text-[8px] leading-[4px] md:leading-[8px]">
        <LargeDiamondArt className="scale-100 md:scale-150" />
      </div>
    </motion.div>
  </div>
);


const PROGRAM_WEEKLY_RHYTHM = [
  { day: 'ПН', label: 'Воркшоп', type: 'workshop' as const },
  { day: 'ВТ', label: 'Коворкинг', type: 'coworking' as const },
  { day: 'СР', label: 'Advanced', type: 'advanced' as const },
  { day: 'ЧТ', label: '', type: 'off' as const },
  { day: 'ПТ', label: 'Лекция', type: 'lecture' as const },
  { day: 'СБ', label: 'Q&A session', type: 'qna' as const },
  { day: 'ВС', label: '', type: 'off' as const },
];

const PROGRAM_WEEK_COPY: Record<
  string,
  {
    dateRange: string;
    headerTopic: string;
    framedDescription: string;
    bodyDescription: string;
    advancedTopic: string;
    advancedDescription: string;
  }
> = {
  '01': {
    dateRange: '27 апр — 3 мая',
    headerTopic: 'AI-FIRST THINKING + IMAGE',
    framedDescription: 'от промпта до визуального брендинга',
    bodyDescription:
      'генерация изображений: Midjourney, DALL-E, Nano Banana. SVG-метафоры, визуальный сторителлинг. personal branding: headshots, аватары, обложки.',
    advancedTopic: 'IMAGE + VISUAL',
    advancedDescription: 'промпт-практики для визуальных систем, брендинга и контент-производства.',
  },
  '02': {
    dateRange: '4 — 10 мая',
    headerTopic: 'CONTEXT ENGINEERING + AUDIO',
    framedDescription: 'от голосовых до структурированного контекста',
    bodyDescription:
      'транскрипция встреч, YouTube, голосовых. AI-музыка: Suno, ElevenLabs. голосовые клоны, подкасты. audio-to-context pipeline.',
    advancedTopic: 'AUDIO + VOICE',
    advancedDescription: 'аудио-канал как часть контекста: от сырой речи к рабочей системе знаний.',
  },
  '03': {
    dateRange: '11 — 17 мая',
    headerTopic: 'AGENTS + AGENTIC WORKFLOWS',
    framedDescription: 'от self.md до контент-фабрики',
    bodyDescription:
      'writing pipelines: от промпта к серии постов. self.md в LinkedIn bio, Substack, newsletter. content repurposing: один контекст в 5 форматов.',
    advancedTopic: 'TEXT + CONTENT',
    advancedDescription: 'контент-конвейеры и агентные сценарии для текстовых рабочих процессов.',
  },
  '04': {
    dateRange: '18 — 22 мая',
    headerTopic: 'SHIP + CREATIVE PIPELINES',
    framedDescription: 'от идеи до рабочего продукта за вечер',
    bodyDescription:
      'vibe-coding: Cursor + Claude Code. generative art: p5.js, SVG, шейдеры. деплой: landing page за 20 минут, микросервисы, боты.',
    advancedTopic: 'CODE + SHIP',
    advancedDescription: 'программа: прототип, сборка, деплой и подготовка к demo day.',
  },
};

type ProgramTimelineVariant = 'button' | 'text-link';

const ProgramIntegratedTimeline = ({
  triggerVariant = 'button',
  secondaryInHeader = true,
  weekBadgeStyle = 'plain',
  showFormats = false,
  strongerBody = false,
  mutedAdvanced = false,
  colorWash = false,
  compactWeekBadge = false,
  largeHeading = false,
  combinedAdvancedLabel = false,
  advancedColorway = 'gray',
  subtitleStrong = false,
  showSecondaryTitle = true,
  showMainTrackTag = false,
  showGridOverlay = false,
  secondaryTitleAccent = false,
  allowMultipleDesktop = false,
  desktopMainTrackBottom = false,
  desktopHideMainAdvancedDivider = false,
  lighterAdvancedBackground = false,
  forcedOpenIndex,
  forcedOpenNonce,
  focusAdvancedOnForce = false,
}: {
  triggerVariant?: ProgramTimelineVariant;
  secondaryInHeader?: boolean;
  weekBadgeStyle?: 'plain' | 'green-square';
  showFormats?: boolean;
  strongerBody?: boolean;
  mutedAdvanced?: boolean;
  colorWash?: boolean;
  compactWeekBadge?: boolean;
  largeHeading?: boolean;
  combinedAdvancedLabel?: boolean;
  advancedColorway?: 'gray' | 'violet';
  subtitleStrong?: boolean;
  showSecondaryTitle?: boolean;
  showMainTrackTag?: boolean;
  showGridOverlay?: boolean;
  secondaryTitleAccent?: boolean;
  allowMultipleDesktop?: boolean;
  desktopMainTrackBottom?: boolean;
  desktopHideMainAdvancedDivider?: boolean;
  lighterAdvancedBackground?: boolean;
  forcedOpenIndex?: number;
  forcedOpenNonce?: number;
  focusAdvancedOnForce?: boolean;
}) => {
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const advancedCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metaTagClass = 'font-mono text-[8px] md:text-[10px] tracking-[0.14em] font-bold text-black/46';
  const metaTrackClass = `${metaTagClass} inline-flex items-center gap-1.5`;

  const toggleCard = (idx: number) => {
    setExpandedIndexes((prev) => {
      const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
      const alreadyOpen = prev.includes(idx);
      let next: number[];

      if (allowMultipleDesktop) {
        next = alreadyOpen ? prev.filter((value) => value !== idx) : [...prev, idx];
      } else {
        next = alreadyOpen ? [] : [idx];
      }

      if (next.includes(idx) && !alreadyOpen) {
        window.setTimeout(() => {
          cardRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 120);
      }
      return next;
    });
  };

  useEffect(() => {
    if (forcedOpenNonce === undefined || forcedOpenIndex === undefined) return;
    setExpandedIndexes([forcedOpenIndex]);
    window.setTimeout(() => {
      const target = focusAdvancedOnForce
        ? advancedCardRefs.current[forcedOpenIndex]
        : cardRefs.current[forcedOpenIndex];
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 220);
  }, [focusAdvancedOnForce, forcedOpenIndex, forcedOpenNonce]);

  return (
    <div className="relative w-full max-w-none">
      <div className="absolute left-[14px] md:left-7 top-[30px] bottom-[54px] w-px bg-black/14 z-0" />
      {PROGRAM_TRACKS.map((track, idx) => {
        const weekCopy = PROGRAM_WEEK_COPY[track.id];
        const advanced = ADVANCED_TRACKS[idx];
        const isExpanded = expandedIndexes.includes(idx);
        const weekLabel = `неделя ${idx + 1}`;
        const inlineTrigger = weekBadgeStyle === 'plain';
        const triggerNode =
          triggerVariant === 'button' ? (
            <div
              className={`inline-flex items-center justify-between gap-3 min-w-[184px] rounded-full border px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                isExpanded
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black/65 border-black/14 group-hover:border-black/30 group-hover:text-black'
              }`}
            >
              <span>{isExpanded ? 'Скрыть детали' : 'Смотреть детали'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-black/58">
              <span>{isExpanded ? 'Скрыть детали' : 'Смотреть детали'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </div>
          );

        return (
          <div key={track.id} className="mb-5">
            <article
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="relative z-10 flex gap-3 md:gap-3 group items-stretch"
            >
              <div className="w-7 md:w-14 pt-0 shrink-0 flex justify-center z-20 relative">
                <div
                  className={`mt-6 w-[18px] h-[18px] rounded-full border transition-all duration-300 flex items-center justify-center relative z-20 ${
                    isExpanded ? 'border-black/40 bg-[#faf8f3]' : 'border-black/18 bg-[#faf8f3] group-hover:border-black/30'
                  }`}
                >
                  <div className={`w-[7px] h-[7px] rounded-full transition-colors ${isExpanded ? 'bg-black/45' : 'bg-transparent'}`} />
                </div>
              </div>

              <div
                className={`relative flex-1 border rounded-[24px] overflow-hidden transition-all duration-400 ${
                  isExpanded
                    ? `${colorWash ? 'bg-gradient-to-br from-[#fbfaf6] via-[#fffefb] to-[#f4f1e8]' : 'bg-[#fffdfa]'} border-black/10 shadow-[0_8px_24px_rgba(0,0,0,0.04)]`
                    : `${colorWash ? 'bg-gradient-to-br from-[#fbfaf6] via-[#fffefc] to-[#f5f2ea]' : 'bg-[#fffdfa]'} border-black/8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-black/14`
                }`}
              >
                {showGridOverlay && (
                  <div
                    className="absolute inset-0 z-20 pointer-events-none opacity-[0.065]"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(0,0,0,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.16) 1px, transparent 1px)',
                      backgroundSize: '28px 28px',
                    }}
                  />
                )}
                <button
                  type="button"
                  onClick={() => toggleCard(idx)}
                  className="relative z-30 w-full px-5 py-5 md:p-7 text-left cursor-pointer select-none"
                >
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] font-bold text-black/24">
                      {weekBadgeStyle === 'plain' ? weekLabel : ''}
                    </div>
                    <div className={metaTagClass}>{weekCopy.dateRange}</div>
                  </div>

                  <div
                    className={`flex gap-5 md:gap-8 ${
                      inlineTrigger ? 'flex-col md:flex-row md:justify-between md:items-end' : 'flex-col'
                    }`}
                  >
                    <div className={`min-w-0 ${weekBadgeStyle === 'green-square' ? 'flex items-start gap-4' : ''}`}>
                      {weekBadgeStyle === 'green-square' && (
                        <div
                          className={`rounded-[22px] bg-[#e5ecdf] text-[#8DC63F] font-mono font-black flex flex-col items-center justify-center shrink-0 ${
                            compactWeekBadge ? 'w-[64px] h-[64px] md:w-[72px] md:h-[72px]' : 'w-[82px] h-[82px] md:w-[96px] md:h-[96px]'
                          }`}
                        >
                          <span className={`${compactWeekBadge ? 'text-[7px]' : 'text-[8px]'} uppercase tracking-[0.14em] leading-none opacity-90`}>неделя</span>
                          <span className={`${compactWeekBadge ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} leading-none mt-0.5`}>{idx + 1}</span>
                        </div>
                      )}
                      <h3
                        className={`uppercase tracking-[-0.04em] leading-[0.96] text-black/90 text-left ${
                          largeHeading ? 'text-[28px] md:text-[40px] font-black' : 'text-[20px] md:text-[28px] font-black'
                        }`}
                        style={{ textWrap: 'balance' }}
                      >
                        {weekCopy.headerTopic}
                      </h3>
                      {showSecondaryTitle && secondaryInHeader && (
                        <div
                          className={`mt-1.5 uppercase tracking-[0.04em] ${
                            subtitleStrong ? 'text-[14px] md:text-[16px] font-bold opacity-74' : 'text-[12px] md:text-[14px] font-semibold opacity-62'
                          }`}
                        >
                          {weekCopy.framedDescription}
                        </div>
                      )}
                    </div>
                    {inlineTrigger && triggerNode}
                  </div>
                  {!inlineTrigger && <div className="mt-2">{triggerNode}</div>}
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: 'easeInOut' }}
                    >
                      <div className="relative z-30 px-5 md:px-7 pb-5 pt-0.5">
                        <div className="relative grid gap-5 lg:gap-7">
                          <div className="min-w-0">
                            {showMainTrackTag && (
                              <div
                                className={`mb-3 flex items-center justify-end ${metaTrackClass} ${
                                  desktopMainTrackBottom ? 'lg:hidden' : ''
                                }`}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-black/28" />
                                <span>Main Track</span>
                              </div>
                            )}
                            {showSecondaryTitle && !secondaryInHeader && (
                              <div
                                className={`mb-3 uppercase tracking-[0.06em] ${
                                  secondaryTitleAccent
                                    ? 'text-[12px] md:text-[15px] font-semibold text-[#8DC63F]'
                                    : subtitleStrong
                                      ? 'text-[15px] md:text-[17px] font-bold opacity-74'
                                      : 'text-[12px] md:text-[14px] font-medium text-black/76'
                                }`}
                              >
                                {weekCopy.framedDescription}
                              </div>
                            )}
                            <p
                              className={`max-w-[38rem] leading-[1.5] text-left ${
                                strongerBody ? 'text-[16px] md:text-[18px] font-medium text-black/82' : 'text-[14px] md:text-[16px] font-normal text-black/66'
                              }`}
                            >
                              {weekCopy.bodyDescription}
                            </p>

                            <div className="mt-3.5 relative">
                              <div className="text-[8px] uppercase font-bold tracking-[0.16em] text-black/28 mb-2">Недельный ритм</div>
                              <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 md:gap-2">
                                {PROGRAM_WEEKLY_RHYTHM.map((day) => (
                                  <div
                                    key={`${track.id}-${day.day}`}
                                    className={`relative rounded-[8px] border px-2 py-2 text-[8px] uppercase tracking-[0.05em] h-[48px] md:h-[52px] flex flex-col justify-between ${
                                      day.type === 'advanced'
                                        ? 'bg-[#ececec] border-black/20 text-black/60 shadow-sm'
                                        : day.type === 'off'
                                          ? 'bg-[#f4f4f4] border-black/10 text-black/30'
                                          : 'bg-white border-black/15 text-black/80 shadow-sm font-bold'
                                    }`}
                                  >
                                    <div className="flex justify-between items-start">
                                      <div className="font-black opacity-40">{day.day}</div>
                                      {day.type === 'advanced' && (
                                        <span className="text-[10px] leading-none font-bold text-[#8DC63F]">*</span>
                                      )}
                                    </div>
                                    <div className="font-bold leading-tight line-clamp-2 mt-auto">{day.label || ' '}</div>
                                    
                                    {day.type === 'advanced' && (
                                      <>
                                        <div className="lg:hidden absolute left-full top-[48%] w-[44px] h-[92px] pointer-events-none">
                                          <div className="absolute left-0 top-0 w-full h-px bg-[repeating-linear-gradient(to_right,rgba(0,0,0,0.22)_0,rgba(0,0,0,0.22)_5px,transparent_5px,transparent_10px)]" />
                                          <div className="absolute right-0 top-0 w-px h-full bg-[repeating-linear-gradient(to_bottom,rgba(0,0,0,0.22)_0,rgba(0,0,0,0.22)_5px,transparent_5px,transparent_10px)]" />
                                          <div className="absolute left-0 bottom-0 w-full h-px bg-[repeating-linear-gradient(to_right,rgba(0,0,0,0.22)_0,rgba(0,0,0,0.22)_5px,transparent_5px,transparent_10px)]" />
                                        </div>
                                        <div className="hidden lg:block absolute left-full top-[44%] w-[112px] h-[156px] pointer-events-none">
                                          <div className="absolute left-0 top-0 w-[28px] h-px bg-[repeating-linear-gradient(to_right,rgba(0,0,0,0.44)_0,rgba(0,0,0,0.44)_5px,transparent_5px,transparent_10px)]" />
                                          <div className="absolute right-0 top-0 w-px h-full bg-[repeating-linear-gradient(to_bottom,rgba(0,0,0,0.44)_0,rgba(0,0,0,0.44)_5px,transparent_5px,transparent_10px)]" />
                                          <div className="absolute left-0 bottom-0 w-full h-px bg-[repeating-linear-gradient(to_right,rgba(0,0,0,0.44)_0,rgba(0,0,0,0.44)_5px,transparent_5px,transparent_10px)]" />
                                        </div>
                                      </>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`w-full lg:w-[280px] lg:justify-self-end lg:pl-4 border-t border-black/8 pt-3 lg:pt-0 lg:border-t-0 text-right ${
                              desktopHideMainAdvancedDivider ? '' : 'lg:border-l lg:border-black/10'
                            }`}
                            ref={(el) => {
                              advancedCardRefs.current[idx] = el;
                            }}
                          >
                            <div
                              className={`relative rounded-[18px] border border-black/6 p-4 md:p-5 opacity-100 ${
                                advancedColorway === 'violet'
                                  ? 'bg-[#eeebf5]'
                                  : lighterAdvancedBackground
                                    ? 'bg-[#f3f4f3]'
                                    : 'bg-[#f1f2f2]'
                              }`}
                            >
                              <div className={`mb-2 ${metaTrackClass}`}>
                                <span className="text-[10px] leading-none">*</span>
                                <span>{combinedAdvancedLabel ? 'Advanced Track Pro' : 'Advanced Track'}</span>
                              </div>
                              <div className="text-[8px] font-bold uppercase tracking-[0.16em] opacity-26 mb-1">Тема</div>
                              <div className={`font-semibold ${mutedAdvanced ? 'text-[12px] text-black/60' : 'text-[21px] md:text-[23px] leading-[1.02] text-black/76'}`}>
                                {weekCopy.advancedTopic}
                              </div>
                              <p className={`leading-[1.42] mt-2 ${mutedAdvanced ? 'text-[10px] text-black/48' : 'text-[12px] md:text-[13px] text-black/54'}`}>
                                {weekCopy.advancedDescription}
                              </p>
                              <div className="mt-3 pt-2 border-t border-black/8">
                                <div className="text-[8px] font-bold uppercase tracking-[0.16em] opacity-30">Спикер</div>
                                <div className="text-[12px] font-semibold mt-0.5 text-black/66">{advanced.speaker}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </article>
          </div>
        );
      })}

      <div className="relative mt-6 z-10 flex gap-1 md:gap-3">
        <div className="w-7 md:w-14 pt-0 shrink-0 flex justify-center z-20 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-8 w-px bg-black/14" />
          <div className="mt-6 w-[18px] h-[18px] rounded-full border border-black/30 bg-[#faf8f3] flex items-center justify-center relative z-20">
            <div className="w-[7px] h-[7px] rounded-full bg-black/78" />
          </div>
        </div>
        <div className="flex-1 bg-[#eff1eb] text-black/80 rounded-[16px] p-4 md:p-5">
          <div className="mb-1.5 flex items-center justify-between gap-4">
            <div className="text-[9px] uppercase tracking-widest font-bold text-black/45">финал</div>
            <div className="text-[9px] uppercase tracking-widest font-bold text-black/45">23 мая</div>
          </div>
          <h4 className="text-base md:text-lg font-black uppercase tracking-tight mb-1 text-black/82">Demo Day</h4>
          <p className="text-[13px] md:text-sm opacity-70 leading-relaxed">
            презентация результатов участников по завершению 4 недель.
          </p>
        </div>
      </div>
    </div>
  );
};

const TRACK_TAG_BASE =
  'inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] font-mono font-bold text-black/46';

const PROGRAM_TRACKS_CAPTION =
  'основная программа даёт фундамент. треки — это углубление в конкретный домен за дополнительную плату.';

const BLOCK_SUBTITLE_CLASS = 'text-[15px] md:text-4xl !font-black tracking-[-0.035em] leading-[0.94] text-black mb-2 md:mb-4 [font-variation-settings:"wght"_900]';

const PROGRAM_GRID_OVERLAY_STYLE = {
  backgroundImage:
    'linear-gradient(rgba(0,0,0,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.16) 1px, transparent 1px)',
  backgroundSize: '28px 28px',
} as const;

const ProgramReferenceSwipeCard = ({
  selectorPlacement = 'bottom',
  showGridOverlay = false,
  forcedWeekIndex,
  forcedWeekNonce,
  focusAdvancedOnForce = false,
}: {
  selectorPlacement?: 'top' | 'bottom';
  showGridOverlay?: boolean;
  forcedWeekIndex?: number;
  forcedWeekNonce?: number;
  focusAdvancedOnForce?: boolean;
}) => {
  const [activeWeek, setActiveWeek] = useState(0);
  const cardRef = useRef<HTMLElement | null>(null);
  const advancedCardRef = useRef<HTMLDivElement | null>(null);
  const activeTrack = PROGRAM_TRACKS[activeWeek];
  const activeWeekCopy = PROGRAM_WEEK_COPY[activeTrack.id];
  const activeAdvanced = ADVANCED_TRACKS[activeWeek];
  const tagClass = 'inline-flex items-center gap-1.5 text-[10px] md:text-[11px] uppercase tracking-[0.16em] font-mono font-bold text-black/48';

  useEffect(() => {
    if (forcedWeekNonce === undefined || forcedWeekIndex === undefined) return;
    setActiveWeek(forcedWeekIndex);
    window.setTimeout(() => {
      const target = focusAdvancedOnForce ? advancedCardRef.current : cardRef.current;
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 220);
  }, [focusAdvancedOnForce, forcedWeekIndex, forcedWeekNonce]);

  const renderAdvancedCard = (weekCopy: (typeof PROGRAM_WEEK_COPY)[string], speaker: string) => (
    <div
      ref={advancedCardRef}
      className="mt-5 ml-auto w-full md:w-[74%] rounded-[24px] border border-black/8 bg-[#f1f2ef] p-5 md:p-6 text-right min-h-[168px] flex flex-col justify-start"
    >
      <div className={`justify-end ${tagClass}`}>
        <span className="text-[10px] leading-none">*</span>
        <span>Advanced Track</span>
      </div>
      <h4 className="mt-2 text-[24px] md:text-[28px] leading-[0.98] font-semibold text-black/82">
        {weekCopy.advancedTopic}
      </h4>
      <p className="mt-2 text-[12px] md:text-[14px] leading-[1.45] text-black/58 max-w-[23rem] ml-auto">
        {weekCopy.advancedDescription}
      </p>
      <div className="mt-3.5 pt-3 border-t border-black/8">
        <div className="text-[8px] uppercase tracking-[0.16em] font-bold text-black/36">Спикер</div>
        <div className="text-[12px] md:text-[14px] leading-[1.2] font-semibold text-black/66 mt-0.5">{speaker}</div>
      </div>
    </div>
  );

  const weekSelector = (
    <div className={`flex ${selectorPlacement === 'top' ? 'border-b border-black/8 pb-4 md:pb-5' : 'border-t border-black/8 pt-3'}`}>
      {PROGRAM_TRACKS.map((track, idx) => {
        const isActive = activeWeek === idx;
        return (
          <button
            key={`reference-week-${track.id}`}
            onClick={() => setActiveWeek(idx)}
            className={`flex-1 px-2 py-2.5 text-center transition-colors ${idx !== 0 ? 'border-l border-black/10' : ''} ${
              isActive ? 'text-[#8DC63F]' : 'text-black/40 hover:text-black/62'
            }`}
          >
            <span className={`block text-[10px] sm:text-[11px] font-black ${isActive ? 'opacity-100' : 'opacity-60'}`}>{track.id}</span>
            <span className={`block text-[8px] uppercase tracking-[0.14em] font-bold mt-0.5 ${isActive ? 'opacity-100' : 'opacity-42'}`}>
              Неделя
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="w-full max-w-sm mx-auto md:max-w-5xl">
      <div className="rounded-[32px] md:rounded-[40px] border border-black/10 bg-[#f6f7f5] p-3 md:p-6">
        {selectorPlacement === 'top' && weekSelector}

        <AnimatePresence mode="wait">
          <motion.article
            key={`reference-tab-${activeTrack.id}`}
            ref={cardRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className={`relative overflow-hidden rounded-[28px] md:rounded-[32px] border border-black/10 bg-[#fbfcfb] px-5 py-5 md:px-8 md:py-8 ${selectorPlacement === 'top' ? 'mt-5 md:mt-6' : ''}`}
          >
            {showGridOverlay && (
              <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.065]"
                style={PROGRAM_GRID_OVERLAY_STYLE}
              />
            )}

            <div className="relative z-10 text-left">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="text-[#8DC63F] text-[16px] md:text-[18px] font-mono font-black tracking-[0.16em] uppercase">
                неделя {activeTrack.id}
              </div>
              <div className="text-[8px] md:text-[9px] font-bold tracking-[0.12em] text-black/46 font-mono">{activeWeekCopy.dateRange}</div>
            </div>

            <div className={`${tagClass} mb-2 justify-end`}>
              <span className="w-1.5 h-1.5 rounded-full bg-black/25" />
              <span>Main Track</span>
            </div>

            <div className="text-[11px] md:text-[14px] uppercase font-semibold tracking-[0.08em] text-black/50 mb-3" style={{ textWrap: 'balance' }}>
              {activeWeekCopy.framedDescription}
            </div>
            <h3 className="text-[38px] md:text-[58px] font-black uppercase tracking-[-0.05em] leading-[0.88] mb-4 text-[#161616]" style={{ textWrap: 'balance' }}>
              {activeWeekCopy.headerTopic}
            </h3>

            <p className="text-[15px] md:text-[17px] leading-[1.5] font-medium text-black/74 max-w-[32rem]">
              {activeWeekCopy.bodyDescription}
            </p>

            {renderAdvancedCard(activeWeekCopy, activeAdvanced.speaker)}

            </div>
          </motion.article>
        </AnimatePresence>

        {selectorPlacement === 'bottom' && <div className="mt-4">{weekSelector}</div>}
      </div>
    </div>
  );
};

const ProgramReferenceCleanStack = () => {
  const [activeWeek, setActiveWeek] = useState<number | null>(null);

  return (
    <div className="w-full max-w-sm mx-auto md:max-w-3xl space-y-4">
      {PROGRAM_TRACKS.map((track, idx) => {
        const isActive = activeWeek === idx;
        const weekCopy = PROGRAM_WEEK_COPY[track.id];
        const advanced = ADVANCED_TRACKS[idx];
        return (
          <div
            key={`clean-stack-${track.id}`}
            className={`rounded-[38px] border transition-all ${
              isActive
                ? 'border-black/10 bg-gradient-to-br from-[#f7fbf4] via-[#fbfdf8] to-[#edf5e6] shadow-[0_12px_30px_rgba(0,0,0,0.04)]'
                : 'border-black/10 bg-[#f3f3f5]'
            }`}
          >
            <button
              type="button"
              onClick={() => setActiveWeek((prev) => (prev === idx ? null : idx))}
              className="w-full p-6 md:p-8 text-left"
            >
                <div className="flex items-center gap-5 md:gap-7">
                  <div
                    className={`w-[88px] h-[88px] rounded-[24px] flex flex-col items-center justify-center shrink-0 font-mono font-black ${
                      isActive ? 'bg-[#e5ecdf] text-[#8DC63F]' : 'bg-[#ececef] text-black/38'
                    }`}
                  >
                    <span className="text-[8px] uppercase tracking-[0.14em] leading-none">неделя</span>
                    <span className="text-3xl leading-none mt-0.5">{idx + 1}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[30px] md:text-[42px] uppercase tracking-tight font-extrabold leading-[0.94] text-black/90" style={{ textWrap: 'balance' }}>
                      {track.title}
                    </h3>
                  </div>
                </div>
            </button>

            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-black/8">
                    <div className="pt-5">
                      <span className={TRACK_TAG_BASE}>
                        <span className="w-1.5 h-1.5 rounded-full bg-black/25" />
                        <span>Main Track</span>
                      </span>
                    </div>
                    <div className="pt-3 text-[12px] md:text-[14px] uppercase font-semibold tracking-[0.05em] text-black/58" style={{ textWrap: 'balance' }}>
                      {weekCopy.framedDescription}
                    </div>
                    <p className="pt-4 text-[16px] md:text-[18px] leading-[1.45] text-black/76">{weekCopy.bodyDescription}</p>

                    <div className="mt-5 ml-auto w-full md:w-[92%] rounded-3xl bg-[#f5f6f5]/80 border border-black/6 p-5 md:p-6 text-right">
                      <div className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] font-mono font-bold text-black/46">
                        <span className="text-[10px] leading-none">*</span>
                        <span>Advanced Track</span>
                      </div>
                      <div className="mt-2 text-[20px] md:text-[22px] leading-[1] font-semibold text-black/72">{weekCopy.advancedTopic}</div>
                      <p className="mt-2 text-[12px] md:text-[13px] leading-[1.45] text-black/50 max-w-[24rem] ml-auto">{weekCopy.advancedDescription}</p>
                      <div className="mt-3 pt-2 border-t border-black/10">
                        <div className="text-[9px] uppercase tracking-[0.16em] font-bold text-black/40">Спикер</div>
                        <div className="text-[13px] md:text-[14px] font-semibold text-black/66 mt-0.5">{advanced.speaker}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

const ProgramReferenceTechUi = () => {
  const [activeWeek, setActiveWeek] = useState(0);
  const track = PROGRAM_TRACKS[activeWeek];
  const weekCopy = PROGRAM_WEEK_COPY[track.id];
  const advanced = ADVANCED_TRACKS[activeWeek];

  return (
    <div className="w-full max-w-sm mx-auto md:max-w-2xl">
      <div className="bg-white text-black border border-black/10 rounded-3xl flex flex-col overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.08)] relative">
        <div className={`absolute top-0 right-0 w-64 h-64 bg-[#8DC63F]/20 rounded-full blur-[80px] transition-transform duration-1000 ${activeWeek % 2 === 0 ? 'translate-x-12 translate-y-12' : '-translate-x-12 -translate-y-12'}`} />

        <div className="p-6 md:p-7 pb-6 relative z-10 flex flex-col h-[560px] md:h-[540px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`tech-ui-${activeWeek}`}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.28 }}
              className="flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="text-[#8DC63F] font-mono text-[15px] font-black tracking-[0.14em] uppercase">
                  неделя {track.id}
                </div>
                <span className="text-[10px] uppercase font-mono tracking-[0.16em] opacity-46 text-right">
                  {weekCopy.dateRange}
                </span>
              </div>

              <div className={`${TRACK_TAG_BASE} mb-2`}>
                <span className="w-1.5 h-1.5 rounded-full bg-black/25" />
                <span>Main Track</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-[0.9] mb-2" style={{ textWrap: 'balance' }}>{track.title}</h3>
              <div className="text-[12px] md:text-[13px] uppercase font-semibold tracking-[0.05em] text-black/58 mb-3" style={{ textWrap: 'balance' }}>
                {weekCopy.framedDescription}
              </div>
              <p className="text-[14px] opacity-72 leading-relaxed max-w-sm mb-5">{weekCopy.bodyDescription}</p>

              <div className="mt-4 self-end w-full md:w-[82%] bg-gradient-to-l from-black/5 to-transparent border-r-[3px] border-black/20 p-5 rounded-l-xl text-right min-h-[188px] opacity-80">
                <div className="flex items-center justify-end gap-1.5 mb-2 text-[9px] uppercase tracking-[0.16em] font-mono font-bold text-black/46">
                  <span className="text-[10px] leading-none">*</span>
                  <span>Advanced Track</span>
                </div>
                <h4 className="font-semibold text-[19px] mb-2 text-black/74">{weekCopy.advancedTopic}</h4>
                <p className="text-[11px] leading-[1.45] text-black/50 mb-3">{weekCopy.advancedDescription}</p>
                <div className="text-[10px] tracking-widest font-mono uppercase text-black/40">
                  Спикер: <span className="text-black/68 font-semibold">{advanced.speaker}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex divide-x divide-black/10 bg-[#fbfcfb] border-t border-black/8 relative z-10">
          {PROGRAM_TRACKS.map((t, i) => {
            const isActive = activeWeek === i;
            return (
              <button
                key={`tech-tab-${t.id}`}
                onClick={() => setActiveWeek(i)}
                className="flex-1 py-3.5 flex items-center justify-center relative overflow-hidden group"
              >
                {isActive && <motion.div layoutId="techTabIndicator" className="absolute top-0 left-0 right-0 h-0.5 bg-[#8DC63F]" />}
                <span className={`text-[10px] font-mono font-bold uppercase tracking-[0.14em] transition-colors ${isActive ? 'text-[#8DC63F]' : 'text-black/36 group-hover:text-black/60'}`}>
                  неделя {i + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const AsciiCaseArt = ({ frames, className = "" }: { frames: string[]; className?: string }) => {
  const frame = frames[0];

  return (
    <div className={`font-mono text-[7px] leading-[1.2] whitespace-pre bg-transparent font-light ${className}`}>
      {frame.split('\n').map((line, lineIdx) => (
        <div key={lineIdx} className="leading-[1.2]">
          {line.split('').map((char, charIdx) => {
            const isHighlight = /[a-zA-Z0-9*()<>[\]{}_!#+]/.test(char);
            return (
              <span
                key={charIdx}
                className={
                  isHighlight
                    ? "text-[#8DC63F] group-hover:text-white transition-colors duration-300"
                    : "opacity-40 group-hover:opacity-80 transition-opacity duration-300"
                }
              >
                {char}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};



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
    logoLeft.src = LOGO_LEFT_SRC;
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


  const pricingPlans = [
    {
      name: 'MAIN LAB',
      price: '590',
      tag: '',
      features: [
        'четыре воркшопа, четыре коворкинга, четыре Q&A сессии, дополнительные гостевые лекции',
        'закрытый чат участников',
        'программа',
      ],
      desc: 'базовый формат для самостоятельной работы',
      more: [
        'Формат: 4 недели, online',
        'подходит non-tech и advanced users',
        'доступ к библиотеке материалов',
        'возврат после первой недели — без вопросов',
      ]
    },
    {
      name: 'ADVANCED',
      price: '890',
      tag: '+4 ЗАНЯТИЯ',
      tagHref: '#tracks',
      highlight: true,
      features: [
        'всё из MAIN LAB',
        'четыре advanced занятия',
        'дополнительный чат advanced участников',
        'еженедельные закрытые разборы',
      ],
      desc: 'для тех, кто строит полный ai-стек',
      more: [
        'AI coaching · AI agents · vibe-coding · AI creative',
        'углубление в личные кейсы и доменные задачи',
        'приоритетная обратная связь',
        'лучший выбор для системного внедрения',
      ]
    },
    {
      name: 'PREMIUM',
      price: '1490',
      tag: '',
      features: [
        'всё из ADVANCED',
        'индивидуальный маршрут',
        'сессии 1:1',
        'аудит процессов',
        'priority support',
      ],
      desc: 'индивидуальный маршрут внедрения',
      more: [
        'персональная стратегия под ваш контекст',
        'две сессии 1:1 со стратегами',
        'аудит процессов и подбор экосистемы',
        'персональный канал и точечная поддержка',
        'фокус на реальные бизнес-задачи',
      ]
    },
  ];


export default function LabW26PageV3Alt() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);
  const [labsDropdownOpen, setLabsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'winter' | 'spring'>('winter');
  const [activeMindsetQuote, setActiveMindsetQuote] = useState(0);
  const [activeSpeakerIndex, setActiveSpeakerIndex] = useState<number | null>(null);
  const [expandedPricingPlans, setExpandedPricingPlans] = useState<string[]>([]);
  const [showReturnToPricing, setShowReturnToPricing] = useState(false);
  const [programFocusNonce, setProgramFocusNonce] = useState<number | undefined>(undefined);
  const [activeCase, setActiveCase] = useState<CaseCard | null>(null);
  const [activeCaseFilter, setActiveCaseFilter] = useState('all');
  const labsCloseTimeoutRef = useRef<number | null>(null);
  const speakerDetailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.3);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (activeCase) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeCase]);

  useEffect(() => {
    return () => {
      if (labsCloseTimeoutRef.current !== null) {
        window.clearTimeout(labsCloseTimeoutRef.current);
      }
    };
  }, []);

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

  const visibleCases = CASE_CARDS.filter((card) => {
    if (activeCaseFilter === 'all') return true;
    return card.filters.includes(activeCaseFilter);
  });

  const cycleMindsetQuote = (direction: -1 | 1) => {
    setActiveMindsetQuote((prev) => (prev + direction + MINDSET_QUOTES.length) % MINDSET_QUOTES.length);
  };

  const togglePricingPlan = (planName: string) => {
    setExpandedPricingPlans((prev) =>
      prev.includes(planName) ? prev.filter((name) => name !== planName) : [...prev, planName],
    );
  };

  const toggleSpeaker = (index: number) => {
    setActiveSpeakerIndex((prev) => {
      const nextIndex = prev === index ? null : index;
      if (nextIndex !== null) {
        window.setTimeout(() => {
          speakerDetailRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 160);
      }
      return nextIndex;
    });
  };

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const scrollToProgramFromPricing = () => {
    setShowReturnToPricing(true);
    setProgramFocusNonce((prev) => (prev ?? 0) + 1);
    scrollTo('#program');
  };

  const returnToPricing = () => {
    setShowReturnToPricing(false);
    scrollTo('#pricing');
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
      <aside className={`fixed top-0 left-0 w-full md:w-[18%] h-screen border-r border-black/10 p-10 z-[300] hidden md:flex flex-col bg-[#f9f9f7] transition-all duration-700 ease-in-out ${scrolled ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none -translate-x-full'}`}>
        <div className="flex items-center gap-4 mb-20 cursor-pointer" onClick={() => scrollTo('#hero')}>
          <div className="relative w-8 h-8">
             <img src={LOGO_SRC} className="absolute inset-0 w-full h-full object-contain" alt="LOGO" />
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
          <a
            href="#pricing"
            onClick={(e) => { e.preventDefault(); scrollTo('#pricing'); }}
            className="block box-border mx-[calc(-10px-1vw)] w-[calc(100%+20px+2vw)] max-w-none whitespace-nowrap bg-black text-white px-4 py-[15px] text-[12px] leading-none font-black tracking-[0.08em] text-center hover:bg-[#8DC63F] hover:text-white transition-all rounded-sm"
          >
            хочу на лабораторию
          </a>
        </div>
      </aside>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[10005] flex flex-col p-8 overflow-y-auto md:hidden"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            <div className="flex justify-between items-center mb-12">
              <div className="text-xl font-bold uppercase tracking-widest">МЕНЮ //</div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-current/5 rounded-full border border-current">
                <X size={24} />
              </button>
            </div>

            <div className="grid gap-12">
              <div>
                <div className="text-[10px] opacity-40 uppercase tracking-widest mb-6 border-b border-current/10 pb-2">разделы страницы</div>
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
                <div className="text-[10px] opacity-60 uppercase tracking-widest mb-5 border-b-2 border-current/20 pb-3">labs</div>
                <div className="flex flex-col gap-4">
                  {LAB_MENU_LINKS.slice(0, 3).map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-2xl font-bold uppercase tracking-tight opacity-40 hover:line-through"
                    >
                      {link.label}
                    </a>
                  ))}
                  
                  <div className="mt-8 mb-4 text-[10px] opacity-60 uppercase tracking-widest border-b-2 border-current/20 pb-3">меню</div>
                  {LAB_MENU_LINKS.slice(3).map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-2xl font-bold uppercase tracking-tight text-black hover:line-through"
                    >
                      {link.label}
                    </a>
                  ))}
                  
                  <div className="h-px w-full bg-current/10 my-2" />
                  {PRIMARY_MENU_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-xl font-bold uppercase tracking-tight text-black hover:line-through"
                    >
                      {link.label}
                    </a>
                  ))}
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
                <img src={LOGO_SRC} className="h-6 w-6 object-contain" alt="LOGO" />
                <span className="text-[10px] tracking-[0.4em] font-light border-l border-current pl-4">MINDSET</span>
              </a>
           </div>
           <div className="flex gap-4 items-center">
             <button
               onClick={() => setIsMenuOpen(true)}
               className="p-2 hover:bg-current/5 transition-colors"
             >
               <Menu size={20} />
             </button>
           </div>
        </header>

        {/* Header Ticker */}
        <div
          className="fixed top-0 left-0 w-full z-[260] border-b border-current/10 py-1 overflow-hidden whitespace-nowrap text-[8px] uppercase tracking-[0.3em] select-none"
          style={{
            backgroundColor: colors.bg,
            color: colors.text === '#181616' ? 'rgba(24, 22, 22, 0.42)' : 'rgba(43, 61, 43, 0.46)',
          }}
        >
          AI MINDSET LAB W26 . BATCH: WINTER 26 . APPLICATIONS: CLOSE . NEXT BATCH: 20 APRIL . AI MINDSET LAB W26 . BATCH: WINTER 26 . APPLICATIONS: CLOSE . NEXT BATCH: 20 APRIL .
        </div>

        {/* Hero Section */}
        <section id="hero" className={`min-h-screen flex items-center pt-32 pb-12 transition-transform duration-700 ease-in-out ${scrolled ? 'md:translate-x-[9%]' : 'translate-x-0'}`}>
          <Container>
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
               <div className="w-full lg:w-3/5 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-8 opacity-40 text-[10px] font-black uppercase tracking-widest">BATCH: WINTER 26 MAIN LAB // STATUS: CLOSED</div>
                  <h1 className="text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.9] mb-12 uppercase">
                    <span className="whitespace-nowrap">AI Mindset</span> Main Lab W26
                  </h1>
                  
                  {/* MODAL ORDER FOR MOBILE: LOGO BETWEEN TITLE AND DESCRIPTION */}
                  <div className="lg:hidden mb-12">
                     <VoxelLogoFace className="w-full max-w-[280px] mx-auto -translate-x-3" scale={1} />
                  </div>

                  <p className="max-w-md mx-auto lg:mx-0 text-sm leading-relaxed font-normal md:font-bold opacity-70 mb-7 md:mb-12">
                    Лаборатория, которая научит вас работе с ИИ: от сбора контекста до создания персональной ИИ-операционной системы.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6">
                     <a
                       href="#pricing"
                       onClick={(e) => { e.preventDefault(); scrollTo('#pricing'); }}
                       className="inline-flex min-w-[18rem] md:min-w-[22rem] items-center justify-center bg-black text-white px-10 md:px-14 py-5 md:py-6 text-xs font-black tracking-widest hover:bg-[#8DC63F] transition-all text-center rounded-sm"
                     >
                       хочу на лабораторию
                     </a>
                  </div>
               </div>
               
               {/* DESKTOP LOGO */}
               <div className="hidden lg:block w-full lg:w-2/5">
                  <VoxelLogoFace className="w-full max-w-md mx-auto" />
               </div>
            </div>
          </Container>
        </section>

         <div className="md:ml-[18%] md:w-[82%] w-full">

            <div className="py-10 md:py-16">
              <Container>
                <div className="mx-auto h-[0.5px] max-w-sm bg-black/5" />
              </Container>
            </div>

            <section className="py-20 md:py-24 relative bg-black/[0.03]">
              <Container>
                <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 md:gap-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-stretch">
                    <div className="pr-4">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[1.1] text-left">
                        лаборатория <br />
                        нового мышления <br />
                        в эпоху AI
                      </div>
                      <div className="inline-flex items-center gap-3 text-[10px] leading-none font-bold opacity-60 tracking-[0.18em] bg-black/[0.03] px-3 py-1 mt-6 border border-black/10">
                        <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                        базовое обучение, старт раз в квартал
                      </div>
                    </div>
                    <div>
                      <p className="text-sm md:text-base uppercase leading-relaxed opacity-70 text-left">
                        AI mindset winter lab w26 — это лаборатория, пространство для экспериментов. здесь вы не изучаете, а создаёте: персональных ассистентов, AI-first процессы, новую версию себя. от хаоса промптов к персональной AI-операционной системе.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
                    <div className="flex flex-col hidden md:block">
                    </div>
                    
                    <div className="flex flex-col gap-5 text-left">
                      <div className="flex flex-col gap-2.5">
                         <div className="text-[10px] leading-none opacity-40 font-bold uppercase tracking-[0.18em]">Следующий поток:</div>
                         <div className="text-[14px] font-black tracking-[0.18em] uppercase">20 апреля 2026</div>
                      </div>
                      
                      <a
                        href="#pricing"
                        onClick={(e) => { e.preventDefault(); scrollTo('#pricing'); }}
                        className="inline-flex items-center justify-center px-7 md:px-10 py-3.5 md:py-4.5 bg-[#8DC63F]/12 text-[#5b7f23] hover:bg-[#8DC63F] hover:text-white transition-all duration-300 font-mono text-[11px] md:text-[13px] font-bold tracking-[0.18em] border border-dashed border-[#8DC63F]/80 shadow-[0_4px_12px_rgba(141,198,63,0.12)] w-full md:w-auto text-center rounded-md"
                      >
                        подать заявку на x26 main lab
                      </a>
                    </div>
                  </div>
                </div>
              </Container>
            </section>

            <section id="philosophy-cards" className="pt-20 md:pt-28 pb-0 md:pb-0 overflow-hidden">
              <Container>
                <EditorialSectionHeader eyebrow="Что внутри" title="Философия" className="mb-12" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-3">
                  {PHILOSOPHY_PILLARS.map((item) => (
                    <div key={item.title} className="bg-white/10 h-full min-h-[280px] md:min-h-[260px] flex flex-col items-center p-6 lg:p-8">
                      <div className="h-[150px] md:h-[96px] flex-none flex items-center justify-center py-10 md:py-0 -translate-x-3 md:translate-x-0 scale-[1.8] md:scale-100 origin-center">
                        <PhilosophyPillarArt art={item.art} />
                      </div>
                      <div className="mt-5 md:mt-7 flex w-full flex-col items-center gap-2">
                        <h3 className="text-center text-xl md:text-xl font-black uppercase tracking-tighter leading-tight bg-transparent text-current balance-text md:min-h-[2.6rem] flex items-center justify-center">
                          {item.title}
                        </h3>
                        <p className="w-full max-w-[22rem] text-left text-[15px] md:text-[13px] leading-[1.45] opacity-60 lowercase tracking-[0.08em] md:min-h-[5.2rem]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Container>
            </section>

            <div className="py-0">
              <Container>
                <div className="mx-auto h-[0.5px] max-w-sm bg-black/5" />
              </Container>
            </div>

            <section id="mindset" className="pt-0 pb-24 md:pt-0 md:pb-32">
              <Container>
                <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto] gap-0 md:gap-16 items-center">
                  <div className="w-full lg:w-auto flex justify-center lg:justify-end shrink-0 order-1 lg:order-2">
                    <div className="w-48 h-48 md:w-[18rem] md:h-[18rem] lg:w-[20rem] lg:h-[20rem] relative flex items-center justify-center">
                      <MindsetDynamicArt className="scale-100" />
                    </div>
                  </div>
                  <div className="w-full h-[30rem] md:h-[40rem] lg:h-[46rem] order-2 lg:order-1">
                    <div className="relative flex flex-col justify-end h-full py-0">
                      {/* Quote Text: Attached to bottom, expands UPWARDS */}
                      <div className="flex-1 flex items-end pb-48 md:pb-40">
                        <motion.h2 
                          key={activeMindsetQuote}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="w-full pr-0 md:pr-4 text-3xl md:text-5xl font-black tracking-tight leading-tight text-left normal-case"
                        >
                          {MINDSET_QUOTES[activeMindsetQuote].text}
                        </motion.h2>
                      </div>

                      {/* [CRITICAL: FIXED_BUTTONS_POSITION] 
                          Do not modify these positioning classes. The buttons must remain 
                          in a fixed absolute position at the bottom of the section 
                          to prevent jumping when quotes change length. */}
                      <div className="absolute bottom-10 left-0 right-0 grid grid-cols-[6.25rem_minmax(14rem,1fr)] items-center gap-4 h-[4.5rem]">
                        <div className="flex w-[6.25rem] shrink-0 items-center gap-3">
                          <button
                            type="button"
                            aria-label="Предыдущая цитата"
                            onClick={() => cycleMindsetQuote(-1)}
                            className="h-11 w-11 rounded-full border border-black/20 flex items-center justify-center text-black/55 hover:text-black hover:border-black/40 transition-colors"
                          >
                            <span className="font-normal text-[22px] leading-[0.8] -translate-x-[1px] -translate-y-[1px]">{'‹'}</span>
                          </button>
                          <button
                            type="button"
                            aria-label="Следующая цитата"
                            onClick={() => cycleMindsetQuote(1)}
                            className="h-11 w-11 rounded-full border border-black/20 flex items-center justify-center text-black/55 hover:text-black hover:border-black/40 transition-colors"
                          >
                            <span className="font-normal text-[22px] leading-[0.8] translate-x-[1px] -translate-y-[1px]">{'›'}</span>
                          </button>
                        </div>
                        <div className={`flex min-h-[2.65rem] min-w-[14rem] flex-col justify-center text-[10px] uppercase tracking-[0.18em] ${MINDSET_QUOTES[activeMindsetQuote].author ? 'text-black/40' : 'invisible'} text-left`}>
                          <div className="font-bold tracking-[0.2em]">{MINDSET_QUOTES[activeMindsetQuote].author || 'placeholder'}</div>
                          <span className="block mt-1 normal-case tracking-normal text-[11px] text-black/55">
                            {MINDSET_QUOTES[activeMindsetQuote].role || 'placeholder'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </section>

            <div className="py-0">
              <Container>
                <div className="mx-auto h-[0.5px] max-w-sm bg-black/5" />
              </Container>
            </div>

<section id="program" className="pt-24 md:pt-32 pb-24 md:pb-32 overflow-hidden">
        <Container>
          <EditorialSectionHeader eyebrow="контур лаборатории" title="программа" className="mb-16 md:mb-24" />

          <div className="mb-12 md:mb-16 text-right md:text-left">
            <h2 className={BLOCK_SUBTITLE_CLASS}>19 января – 16 февраля • 4 недели</h2>
            <p className="max-w-[18rem] ml-auto md:ml-0 md:max-w-3xl text-[11px] md:text-sm opacity-60">
              не курс, а лаборатория с чёткой траекторией: за месяц собираешь работающую систему усиления интеллекта.
            </p>
          </div>

          <div className="md:hidden">
            <div id="dots-v1">
              <ProgramIntegratedTimeline
                triggerVariant="text-link"
                secondaryInHeader={false}
                subtitleStrong={false}
                showSecondaryTitle={true}
                showMainTrackTag={true}
                showGridOverlay={true}
                secondaryTitleAccent={true}
                allowMultipleDesktop={true}
                desktopMainTrackBottom={true}
                desktopHideMainAdvancedDivider={true}
                lighterAdvancedBackground={true}
                forcedOpenIndex={programFocusNonce === undefined ? undefined : 0}
                forcedOpenNonce={programFocusNonce}
                focusAdvancedOnForce={true}
              />
            </div>
          </div>

          <div className="hidden md:block">
            <ProgramReferenceSwipeCard
              selectorPlacement="top"
              showGridOverlay={true}
              forcedWeekIndex={programFocusNonce === undefined ? undefined : 0}
              forcedWeekNonce={programFocusNonce}
              focusAdvancedOnForce={true}
            />
          </div>

          <div className="mt-6 md:mt-2 flex justify-end">
            <p className="max-w-[18rem] md:max-w-[23rem] text-left text-[11px] md:text-[13px] leading-[1.45] text-black/46">
              <span className="mr-1.5 font-bold">*</span>
              {PROGRAM_TRACKS_CAPTION}
            </p>
          </div>
        </Container>
      </section>


      {/* Cases Section */}
      <SlashDivider />
      <section id="cases" className="py-20 md:py-32 bg-[#332b2b]/5">
        <Container>
          <EditorialSectionHeader eyebrow="Собранная система" title="Cases" className="mb-16" />
          <div className="mb-16 max-w-3xl">
            <h2 className={BLOCK_SUBTITLE_CLASS}>
              Что создают участники за 4 недели?
            </h2>
            <p className="text-sm md:text-base opacity-70 leading-relaxed max-w-2xl">
              не учебные примеры, а агенты, workflows, ассистенты и продукты, которые реально работают.
            </p>
          </div>

          <div className="mb-10 flex flex-wrap items-center gap-2 md:gap-3">
            <div className="mr-2 text-[8px] md:text-[9px] font-black uppercase tracking-[0.22em] text-black/35">
              кем создано
            </div>
            {CASE_FILTERS.map((filter) => {
              const isActive = activeCaseFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveCaseFilter(filter.id)}
                  className={`px-3 py-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.18em] transition-colors rounded-sm text-left leading-[1.15] ${
                    isActive
                      ? 'bg-black text-white'
                      : 'border border-black/10 bg-white/60 text-black/55 hover:bg-[#8DC63F] hover:border-[#8DC63F] hover:text-black'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCases.map((card, i) => (
              <button
                key={card.title}
                type="button"
                onClick={() => setActiveCase(card)}
                className="relative overflow-hidden min-h-[172px] bg-black/5 p-5 text-left transition-all duration-300 group border border-black/10 hover:bg-[#8DC63F] flex flex-col justify-between"
              >
                <div className="pointer-events-none absolute right-5 bottom-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <AsciiCaseArt frames={card.artFrames} className="origin-bottom-right scale-[4] text-current opacity-[0.22] group-hover:opacity-100 group-hover:text-black/25" />
                </div>
                <div className="relative z-10 mb-6 flex items-start justify-end">
                  <div className="ml-auto text-right">
                    <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-black/80 group-hover:text-black">
                      {card.author}
                    </div>
                    <div className="text-[9px] font-bold uppercase tracking-[0.05em] text-black/40 group-hover:text-black/60">
                      {card.role}
                    </div>
                  </div>
                </div>
                <div className="relative z-10 max-w-[13.5rem]">
                  <h4 className="mb-1.5 text-[14px] font-black uppercase tracking-[0.12em] leading-tight text-black group-hover:text-black">
                    {card.title}
                  </h4>
                  <p className="text-[11px] font-bold leading-relaxed text-black/60 group-hover:text-black/80 line-clamp-2">
                    {card.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <SlashDivider />
      <section id="team" className="py-20 md:py-32">
        <Container>
          <EditorialSectionHeader eyebrow="lab team" title="Спикеры" className="mb-16" />
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 md:gap-x-12 md:gap-y-16 lg:gap-x-12 lg:gap-y-20">
            {TEAM_MEMBERS.map((member, i) => {
              // Row calculation for stable layout
              const cols = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : 2;
              const isLastInRow = (i + 1) % cols === 0 || i === TEAM_MEMBERS.length - 1;
              const currentRowIndex = Math.floor(i / cols);
              const activeRowIndex = activeSpeakerIndex !== null ? Math.floor(activeSpeakerIndex / cols) : -1;

              return (
                <React.Fragment key={member.name}>
                  {/* Photo Card */}
                  <div className="flex flex-col gap-3 md:gap-5">
                    <button 
                      type="button" 
                      onClick={() => toggleSpeaker(i)} 
                      className="group w-full text-left"
                      aria-expanded={activeSpeakerIndex === i}
                    >
                      <div className={`aspect-square rounded-[24px] bg-[#332b2b]/5 border relative overflow-hidden transition-all duration-300 ${
                        activeSpeakerIndex === i
                          ? 'border-[#8DC63F]/45 shadow-[0_16px_34px_rgba(141,198,63,0.12)]'
                          : 'border-[#332b2b]/10'
                      }`}>
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
                          referrerPolicy="no-referrer" 
                          loading="lazy" 
                        />
                        {/* Interactive Overlays */}
                        <div className={`absolute inset-0 transition-colors duration-300 md:hidden ${activeSpeakerIndex === i ? 'bg-black/20' : 'bg-black/0 group-hover:bg-black/8'}`} />
                        <div className="absolute right-3 bottom-3 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
                          <ArrowRight size={20} strokeWidth={2.25} className={`transition-transform duration-300 ${activeSpeakerIndex === i ? 'rotate-90' : ''}`} />
                        </div>
                        <div className="absolute left-3 bottom-3 rounded-full bg-black/48 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.16em] text-white/92 backdrop-blur-sm">
                          подробнее
                        </div>

                        {/* Desktop Hover Bio (Single Column, Dark) - "As it was before and was good" */}
                        <div className="hidden md:flex absolute inset-0 bg-black/92 p-12 md:p-16 flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                          <p className="text-white text-[clamp(14px,1vw,17px)] leading-[1.65] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 w-full px-8 underline-offset-4 decoration-[#8DC63F]/30">
                            {member.description}
                          </p>
                        </div>
                      </div>
                    </button>
                    <div>
                      <h3 className="text-[13px] md:text-xl font-bold uppercase tracking-tight leading-tight text-black/86">{member.name}</h3>
                      <p className="text-[8px] md:text-[10px] opacity-46 uppercase tracking-widest">{member.role}</p>
                    </div>
                  </div>

                  {/* Row-based Expansion (Full Width, 2 Columns) - Appears after each row wrap */}
                  {isLastInRow && (
                    <div className="col-span-full">
                       <AnimatePresence initial={false}>
                        {activeSpeakerIndex !== null && activeRowIndex === currentRowIndex && (
                          <motion.div
                            key={`speaker-row-detail-${currentRowIndex}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="overflow-hidden border-t border-black/10 mt-4"
                          >
                            <div className="py-8 md:py-12">
                              <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-start">
                                {/* Small Thumbnail for context */}
                                <div className="shrink-0 hidden md:block">
                                  <div className="w-24 h-24 rounded-full overflow-hidden border border-black/10">
                                    <img 
                                      src={TEAM_MEMBERS[activeSpeakerIndex].image} 
                                      alt="Speaker" 
                                      className="w-full h-full object-cover grayscale" 
                                    />
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="mb-4">
                                     <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8DC63F] mb-1">О спикере</div>
                                     <h4 className="text-2xl font-black uppercase tracking-tight">{TEAM_MEMBERS[activeSpeakerIndex].name}</h4>
                                  </div>
                                  {/* 2-Column Layout for text when expanded */}
                                  <div className="text-[13px] md:text-[17px] leading-[1.65] text-black/82 columns-2 gap-6 md:gap-12 lg:gap-20">
                                    {TEAM_MEMBERS[activeSpeakerIndex].description}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Schedule Section */}
      {false && <ProgramScheduleGrid />}

      {/* Pricing Section */}
      <SlashDivider />
      <section id="pricing" className="py-20 md:py-32">
        <Container>
          <EditorialSectionHeader eyebrow="Форматы участия" title="Тарифы" className="mb-16" />

          <div className="-mx-4 overflow-x-auto px-4 pb-3 lg:mx-0 lg:overflow-visible lg:px-0">
            <div className="flex gap-4 snap-x snap-mandatory pr-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:pr-0 md:gap-8">
            {pricingPlans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="min-w-[79%] shrink-0 snap-start sm:min-w-[62%] lg:min-w-0"
              >
                <div className="h-full rounded-[0.4rem] border border-black/10 bg-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-6 md:p-8 flex flex-col">
                  {/* Top Part: Unified fixed height for alignment */}
                  <div className="h-[12.5rem] md:h-[13.5rem] flex flex-col justify-start mb-6 w-full">
                    <div className="h-6 flex items-center mb-6">
                       {idx === 0 && (
                         <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/25">base</div>
                       )}
                       {idx === 1 && (
                         <button
                           type="button"
                           onClick={scrollToProgramFromPricing}
                           className="inline-flex items-center px-2.5 py-1 rounded-[2px] bg-[#8DC63F]/10 border border-[#8DC63F]/20 text-[9px] font-black uppercase tracking-[0.18em] text-[#5b7f23] hover:bg-[#8DC63F] hover:text-white transition-all"
                         >
                           +4 занятия
                         </button>
                       )}
                       {idx === 2 && (
                         <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/25">свой маршрут</div>
                       )}
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-xl md:text-[24px] font-black uppercase tracking-tight text-black/70 leading-none">
                        {idx === 1 ? 'ADVANCED' : plan.name}
                      </h3>
                      <div className="flex items-baseline gap-2">
                         <span className="text-[54px] md:text-[78px] font-black tracking-[-0.045em] leading-[0.9] text-black">€{plan.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    {/* Main Features: Reduced gap to description */}
                    <div className="min-h-[160px] mb-4">
                      <div className="space-y-3">
                        {plan.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-4 text-[13px] md:text-[14px] leading-tight text-black/75">
                            <span className="mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-full bg-black/30" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Styled Description: Bold CAPS, no grey bg */}
                    <div className="mb-6 pt-2">
                      <div className="text-[15px] md:text-[16px] font-black uppercase tracking-tight leading-[1.3] text-black/90">
                        {plan.desc}
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {expandedPricingPlans.includes(plan.name) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: 'easeOut' }}
                          className="overflow-hidden mb-6"
                        >
                          <div className="space-y-2.5">
                            {plan.more.map((item) => (
                              <div key={item} className="flex items-start gap-3 text-[13px] md:text-[14px] leading-[1.3] text-black/82">
                                <span className="mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-full bg-black/20" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-auto pt-4 flex flex-col gap-4">
                    <button
                      type="button"
                      aria-label="Показать подробности тарифов"
                      onClick={() => togglePricingPlan(plan.name)}
                      className="flex w-full items-center justify-center text-black/40 hover:text-black transition-colors"
                    >
                      <ChevronDown
                        size={24}
                        className={`transition-transform duration-300 ${expandedPricingPlans.includes(plan.name) ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <a
                      href="#pricing"
                      onClick={(e) => { e.preventDefault(); scrollTo('#pricing'); }}
                      className="w-full bg-[#8DC63F] px-6 py-3.5 text-center text-[14px] md:text-[15px] font-black uppercase tracking-[0.12em] text-white hover:bg-black hover:text-[#f9f9f7] transition-all rounded-sm"
                    >
                      выбрать
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          </div>

          <motion.a
            href="https://aimindset.org/ai-mindset-consulting"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: 0.16 }}
            className="mt-8 md:mt-10 flex w-full md:w-[58%] items-center justify-between gap-6 border border-black/10 bg-white/60 px-6 py-5 md:px-8 md:py-6 hover:bg-white/82 transition-colors rounded-[0.4rem]"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 min-w-0">
              <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-black">
                Для компаний
              </div>
              <div className="hidden md:block h-2.5 w-2.5 rounded-full bg-[#8DC63F]/60 shrink-0" />
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] text-black/40">
                персональные планы
              </div>
            </div>

            <div className="shrink-0 flex items-center justify-center text-black/70">
              <ChevronRight size={22} />
            </div>
          </motion.a>

          <div className="mt-8 max-w-3xl">
            <p className="text-[11px] md:text-[13px] leading-[1.45] text-black/46">
              скидки: Alumni (-20%), Bring a Friend (-10% каждому). возврат после первой недели — без вопросов. возможна оплата в рублях.
            </p>
          </div>

          {showReturnToPricing ? (
            <div className="fixed bottom-[5.85rem] md:bottom-5 left-1/2 z-[380] -translate-x-1/2">
              <button
                type="button"
                onClick={returnToPricing}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#f9f9f7]/96 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-black/70 shadow-[0_10px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm hover:text-black"
              >
                <span className="text-[12px] leading-none">↓</span>
                <span>назад к тарифам</span>
              </button>
            </div>
          ) : null}

          <section className="py-56 md:py-72 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[150px_minmax(0,1fr)] items-center gap-10 md:gap-16">
              <div className="flex justify-center md:justify-end text-[#8DC63F] md:translate-y-5">
                <pre className="font-mono text-[15px] md:text-[19px] leading-[1.06] opacity-90 select-none">
{`   /\\     /\\
  /  \\   /  \\
 /    \\_/    \\`}
                </pre>
              </div>

              <div className="max-w-3xl md:ml-auto text-right">
                <h2 className="text-3xl md:text-5xl leading-tight">
                  Мы не учим кодить или создавать промпты, мы учим собирать системы, многократно усиливающие ваши возможности
                </h2>
              </div>
            </div>
          </section>
        </Container>
      </section>

      {/* Application Form Section */}
      {false && (
        <>
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
        </>
      )}

      {/* Footer */}
      <footer className="py-24 relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-[0.04]">
          <div className="whitespace-nowrap text-[clamp(88px,16vw,240px)] font-black leading-none uppercase tracking-[-0.06em] select-none text-white">
            AI MINDSET
          </div>
        </div>
        <Container className="relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
            <div className="lg:col-span-2">
              <div className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">AI MINDSET</div>
            </div>

            <div>
              <div className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-6">КОНТАКТЫ</div>
              <div className="flex flex-col gap-2 text-xs uppercase">
                <a href="https://www.youtube.com/@A-I-Mindset" className="hover:line-through">ПОДКАСТ</a>
                <a href="https://t.me/ai_mind_set" className="hover:line-through">TELEGRAM КАНАЛ</a>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-6">ИНФО</div>
              <div className="flex flex-col gap-2 text-xs uppercase">
                <a href="#" className="hover:line-through">ОФЕРТА</a>
                <a href="#" className="hover:line-through">ПОЛИТИКА</a>
              </div>
            </div>
          </div>

          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[8px] text-white/55 uppercase tracking-[0.5em]">MADE WITH LOVE AND AI // 2026</div>
            <div className="flex gap-4">
              {['/', '\\', '/', '\\'].map((s, i) => <span key={i} className="opacity-20">{s}</span>)}
            </div>
          </div>
        </Container>
      </footer>

      <AnimatePresence>
        {activeCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10010] flex items-end justify-center bg-black/80 p-3 backdrop-blur-md md:items-center md:p-6"
            onClick={() => setActiveCase(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="flex h-[calc(100vh-1.5rem)] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-black/12 bg-white text-black shadow-2xl md:h-[min(46rem,calc(100vh-3rem))]"
            >
              <div className="flex items-start justify-between gap-4 border-b border-black/8 px-5 py-4 md:px-7 md:py-5">
                <div className="min-w-0">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">кейс</div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight md:text-3xl">{activeCase.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm opacity-70 md:text-base">{activeCase.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.16em] text-black/42">
                    <span>{activeCase.author}</span>
                    <span>{activeCase.role}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="shrink-0 p-2 text-black/40 transition-colors hover:text-black hover:bg-black/5 rounded-full"
                  onClick={() => setActiveCase(null)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid min-h-0 flex-1 gap-0 md:grid-cols-[minmax(280px,0.95fr)_minmax(0,1.15fr)]">
                <div className="border-b border-black/8 bg-[#f5f7f2] p-5 md:border-b-0 md:border-r md:border-black/8 md:p-7">
                  <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-black/36">артефакт</div>
                  <div className="flex h-[14rem] items-center justify-center overflow-hidden rounded-[22px] border border-[#8DC63F]/20 bg-white md:h-full md:min-h-[24rem]">
                    <AsciiCaseArt frames={activeCase.artFrames} className="origin-center scale-[2.35] md:scale-[3.15] transform text-[#8DC63F]" />
                  </div>
                  <p className="mt-3 text-[11px] leading-[1.5] text-black/48">
                    Здесь можно разместить скриншот интерфейса, схему workflow или любой визуальный результат кейса.
                  </p>
                </div>
                <div className="min-h-0 overflow-y-auto px-5 py-5 md:px-7 md:py-6">
                  <div className="space-y-5 pb-8">
                    <section>
                      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black/36">задача</div>
                      <p className="text-[14px] leading-[1.65] text-black/72 md:text-[15px]">
                        {activeCase.desc}
                      </p>
                    </section>

                    <section>
                      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black/36">решение</div>
                      <p className="text-[14px] leading-[1.7] text-black/78 md:text-[15px]">
                        {activeCase.details}
                      </p>
                    </section>

                    <section>
                      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black/36">инструменты</div>
                      <div className="rounded-[18px] border border-black/8 bg-black/[0.03] px-4 py-3 text-[13px] leading-[1.6] text-black/72 md:text-[14px]">
                        {activeCase.tools}
                      </div>
                    </section>

                    <section>
                      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black/36">результат</div>
                      <div className="text-[13px] md:text-[14px] font-semibold uppercase tracking-[0.08em] text-[#56771f]">
                        {activeCase.metric}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
  const dismissConsent = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShow(false);
  };
  return (
    <div className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-[10000] max-w-[320px] md:max-w-[380px] w-[calc(100%-32px)] md:w-[calc(100%-48px)] bg-white border-2 border-black p-5 md:px-7 md:py-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] md:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)]">
        <button
          type="button"
          onClick={dismissConsent}
          className="absolute top-3 right-3 p-1 text-black/50 hover:text-black transition-colors"
          aria-label="Закрыть уведомление о cookies"
        >
          <X size={14} />
        </button>
        <div className="text-[8px] md:text-[9px] font-black opacity-30 mb-2 md:mb-3 uppercase tracking-widest">SYSTEM NOTICE</div>
        <p className="text-[9px] md:text-[10px] font-bold leading-relaxed mb-4 md:mb-4 uppercase text-black">МЫ ИСПОЛЬЗУЕМ КУКИ ДЛЯ ВАШЕЙ AI-СИНХРОНИЗАЦИИ.</p>
        <button onClick={dismissConsent} className="w-full bg-black text-white py-2 md:py-3 text-[9px] md:text-[10px] font-black uppercase hover:bg-[#8DC63F] transition-colors">ПОНЯТНО</button>
    </div>
  );
};
