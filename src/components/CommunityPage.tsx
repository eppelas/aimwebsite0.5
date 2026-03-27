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
import { MorphSvg } from './MorphSvg';
import ReviewsSection from './ReviewsSection';



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

const cn = (...classes: (string | boolean | undefined | null)[]) => classes.filter(Boolean).join(' ');

const getSpeakerOverlayTextStyle = (description: string): React.CSSProperties => {
  if (description.length > 260) return { fontSize: '15.4px', lineHeight: 1.34 };
  if (description.length > 235) return { fontSize: '16px', lineHeight: 1.35 };
  return { fontSize: '16.6px', lineHeight: 1.36 };
};

// --- CONSTANTS ---
const SIDEBAR_NAV: NavItem[] = [
  { label: 'ФИЛОСОФИЯ', href: '#philosophy' },
  { label: 'ПРОГРАММА', href: '#program' },
  { label: 'КЕЙСЫ', href: '#cases' },
  { label: 'ТАРИФЫ', href: '#pricing' },
  { label: 'ОТЗЫВЫ', href: '#reviews' },
];

const EXTERNAL_LINKS = [
  { label: 'community {space}', href: '/ai-mindset-community' },
  { label: '{for-teams}', href: '/ai-mindset-consulting' },
  { label: 'non-profit', href: '/non-profit' },
];

const LAB_MENU_LINKS = [
  { label: 'Spring Main Lab', href: 'https://aimindset.org/ai-mindset', status: 'Current' },
  { label: 'AI-Native Orgs', href: 'https://ai-native.aimindset.org/', status: 'Current' },
  { label: 'Summer Main Lab', href: 'https://join.aimindset.org/waitlist', status: 'Next' },
];

const PRIMARY_MENU_LINKS = [
  { label: 'Community {Space}', href: '/ai-mindset-community' },
  { label: 'Research', href: '/research' },
  { label: '{For Teams}', href: '/ai-mindset-consulting' },
  { label: '{For Non-Profit}', href: '/non-profit' },
];

const BASE_URL = import.meta.env.BASE_URL;
const LOGO_SRC = `${BASE_URL}assets/ai-mindset-logo.png`;
const LOGO_LEFT_SRC = `${BASE_URL}AIMLeft-02.png`;
const speakerImage = (filename: string) => `${BASE_URL}assets/speakers/${filename}`;

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

export const PROGRAM_TRACKS = [
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

export const ADVANCED_TRACKS = [
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
  <div className={`flex items-end gap-3 md:gap-10 ${className}`}>
    <div className="text-[10px] md:text-[13px] font-bold uppercase tracking-[0.2em] opacity-40 shrink-0 mb-[0.15rem] md:mb-[0.25rem]">{eyebrow}</div>
    <div className="h-px min-w-[20px] flex-1 bg-black/10 mb-[0.45rem] md:mb-[0.75rem]" />
    <div className="font-black uppercase tracking-widest text-xl md:text-5xl/none text-right shrink-0">{title}</div>
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
        <line x1="42.80" y1="30.80" x2="44.80" y2="30.80" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="42.80;42.40;41.20;39.20;36.40;33.60;31.60;30.40;30.00;30.40;31.60;33.60;36.40;39.20;41.20;42.40;42.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="30.80;30.98;31.50;32.38;33.60;34.83;35.70;36.23;36.40;36.23;35.70;34.83;33.60;32.38;31.50;30.98;30.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="44.80;44.46;43.45;41.76;39.40;37.04;35.35;34.34;34.00;34.34;35.35;37.04;39.40;41.76;43.45;44.46;44.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="30.80;30.98;31.50;32.38;33.60;34.83;35.70;36.23;36.40;36.23;35.70;34.83;33.60;32.38;31.50;30.98;30.80" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="57.20" y1="30.80" x2="54.80" y2="30.80" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="57.20;56.59;54.70;51.28;46.00;40.50;36.74;34.66;34.00;34.66;36.74;40.50;46.00;51.28;54.70;56.59;57.20" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="30.80;30.85;31.00;31.27;32.00;33.45;34.97;36.03;36.40;36.03;34.97;33.45;32.00;31.27;31.00;30.85;30.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="54.80;54.16;52.30;49.47;46.00;42.75;40.26;38.59;38.00;38.59;40.26;42.75;46.00;49.47;52.30;54.16;54.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="30.80;31.10;32.00;33.48;35.20;36.20;36.43;36.42;36.40;36.42;36.43;36.20;35.20;33.48;32.00;31.10;30.80" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="44.80" y1="30.80" x2="45.20" y2="32.40" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="44.80;44.60;43.99;42.92;41.39;39.85;38.80;38.19;38.00;38.19;38.80;39.85;41.39;42.92;43.99;44.60;44.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="30.80;30.92;31.31;32.01;33.13;34.44;35.49;36.17;36.40;36.17;35.49;34.44;33.13;32.01;31.31;30.92;30.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="45.20;45.09;44.76;44.26;43.61;42.96;42.45;42.12;42.00;42.12;42.45;42.96;43.61;44.26;44.76;45.09;45.20" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="32.40;32.58;33.09;33.89;34.87;35.66;36.11;36.33;36.40;36.33;36.11;35.66;34.87;33.89;33.09;32.58;32.40" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="53.20" y1="31.60" x2="50.80" y2="31.60" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="53.20;52.97;52.20;50.65;48.00;45.12;43.24;42.28;42.00;42.28;43.24;45.12;48.00;50.65;52.20;52.97;53.20" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="31.60;31.63;31.70;31.85;32.40;33.68;35.07;36.06;36.40;36.06;35.07;33.68;32.40;31.85;31.70;31.63;31.60" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="50.80;50.53;49.80;48.85;48.00;47.38;46.76;46.22;46.00;46.22;46.76;47.38;48.00;48.85;49.80;50.53;50.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="31.60;31.87;32.70;34.05;35.60;36.42;36.53;36.44;36.40;36.44;36.53;36.42;35.60;34.05;32.70;31.87;31.60" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="50.80" y1="31.60" x2="50.80" y2="34.00" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="50.80;50.65;50.20;49.40;48.27;47.18;46.49;46.11;46.00;46.11;46.49;47.18;48.27;49.40;50.20;50.65;50.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="31.60;31.69;31.97;32.52;33.47;34.63;35.58;36.19;36.40;36.19;35.58;34.63;33.47;32.52;31.97;31.69;31.60" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="50.80;50.77;50.70;50.62;50.53;50.39;50.21;50.06;50.00;50.06;50.21;50.39;50.53;50.62;50.70;50.77;50.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="34.00;34.14;34.53;35.10;35.73;36.15;36.32;36.38;36.40;36.38;36.32;36.15;35.73;35.10;34.53;34.14;34.00" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="45.20" y1="32.40" x2="44.80" y2="34.00" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="45.20;45.38;45.89;46.67;47.63;48.57;49.32;49.82;50.00;49.82;49.32;48.57;47.63;46.67;45.89;45.38;45.20" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="32.40;32.45;32.63;32.99;33.69;34.68;35.58;36.19;36.40;36.19;35.58;34.68;33.69;32.99;32.63;32.45;32.40" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="44.80;45.06;45.86;47.27;49.37;51.49;52.93;53.74;54.00;53.74;52.93;51.49;49.37;47.27;45.86;45.06;44.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="34.00;34.15;34.57;35.21;35.91;36.32;36.42;36.41;36.40;36.41;36.42;36.32;35.91;35.21;34.57;34.15;34.00" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="34.80" y1="30.00" x2="34.80" y2="38.00" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="34.80;35.27;36.72;39.29;43.28;47.72;51.14;53.28;54.00;53.28;51.14;47.72;43.28;39.29;36.72;35.27;34.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="30.00;30.14;30.62;31.57;33.08;34.63;35.66;36.22;36.40;36.22;35.66;34.63;33.08;31.57;30.62;30.14;30.00" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="34.80;35.66;38.18;42.23;47.52;52.35;55.56;57.40;58.00;57.40;55.56;52.35;47.52;42.23;38.18;35.66;34.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="38.00;38.01;37.98;37.78;37.32;36.82;36.54;36.43;36.40;36.43;36.54;36.82;37.32;37.78;37.98;38.01;38.00" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="42.80" y1="30.80" x2="42.80" y2="37.20" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="42.80;43.18;44.35;46.41;49.56;53.05;55.74;57.43;58.00;57.43;55.74;53.05;49.56;46.41;44.35;43.18;42.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="30.80;30.92;31.31;32.09;33.36;34.73;35.68;36.23;36.40;36.23;35.68;34.73;33.36;32.09;31.31;30.92;30.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="42.80;43.49;45.55;48.86;53.24;57.28;59.96;61.50;62.00;61.50;59.96;57.28;53.24;48.86;45.55;43.49;42.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="37.20;37.23;37.29;37.26;37.04;36.72;36.52;36.42;36.40;36.42;36.52;36.72;37.04;37.26;37.29;37.23;37.20" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="44.80" y1="34.00" x2="42.80" y2="34.00" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="44.80;45.46;47.36;50.29;53.90;57.23;59.74;61.41;62.00;61.41;59.74;57.23;53.90;50.29;47.36;45.46;44.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="34.00;33.97;33.87;33.68;33.70;34.40;35.38;36.13;36.40;36.13;35.38;34.40;33.70;33.68;33.87;33.97;34.00" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="42.80;43.40;45.29;48.67;53.90;59.41;63.21;65.33;66.00;65.33;63.21;59.41;53.90;48.67;45.29;43.40;42.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="34.00;34.18;34.73;35.67;36.70;37.05;36.82;36.52;36.40;36.52;36.82;37.05;36.70;35.67;34.73;34.18;34.00" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="46.80" y1="37.20" x2="48.00" y2="30.80" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="46.80;47.31;48.89;51.62;55.68;60.03;63.30;65.32;66.00;65.32;63.30;60.03;55.68;51.62;48.89;47.31;46.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="37.20;37.21;37.20;37.11;36.88;36.62;36.47;36.41;36.40;36.41;36.47;36.62;36.88;37.11;37.20;37.21;37.20" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="48.00;48.77;51.06;54.77;59.72;64.38;67.55;69.39;70.00;69.39;67.55;64.38;59.72;54.77;51.06;48.77;48.00" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="30.80;30.94;31.40;32.24;33.52;34.83;35.73;36.24;36.40;36.24;35.73;34.83;33.52;32.24;31.40;30.94;30.80" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="48.00" y1="30.80" x2="49.20" y2="37.20" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="48.00;47.33;45.33;42.01;37.36;32.73;29.43;27.46;26.80;27.46;29.43;32.73;37.36;42.01;45.33;47.33;48.00" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="30.80;30.90;31.20;31.69;32.39;33.09;33.59;33.90;34.00;33.90;33.59;33.09;32.39;31.69;31.20;30.90;30.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="49.20;48.50;46.42;42.93;38.04;33.13;29.62;27.50;26.80;27.50;29.62;33.13;38.04;42.93;46.42;48.50;49.20" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="37.20;37.35;37.80;38.56;39.61;40.66;41.41;41.85;42.00;41.85;41.41;40.66;39.61;38.56;37.80;37.35;37.20" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="50.80" y1="34.00" x2="53.20" y2="34.00" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="50.80;51.38;53.13;56.17;60.76;65.86;69.84;72.35;73.20;72.35;69.84;65.86;60.76;56.17;53.13;51.38;50.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="34.00;34.06;34.20;34.28;34.16;33.97;33.92;33.97;34.00;33.97;33.92;33.97;34.16;34.28;34.20;34.06;34.00" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="53.20;53.95;56.17;59.76;64.44;68.61;71.26;72.73;73.20;72.73;71.26;68.61;64.44;59.76;56.17;53.95;53.20" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="34.00;34.19;34.80;35.97;37.84;39.78;41.08;41.78;42.00;41.78;41.08;39.78;37.84;35.97;34.80;34.19;34.00" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="54.80" y1="30.80" x2="54.80" y2="37.20" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="54.80;53.93;51.35;47.16;41.56;36.30;32.74;30.68;30.00;30.68;32.74;36.30;41.56;47.16;51.35;53.93;54.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="30.80;31.02;31.71;32.99;34.96;37.03;38.48;39.33;39.60;39.33;38.48;37.03;34.96;32.99;31.71;31.02;30.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="54.80;54.24;52.55;49.61;45.24;40.53;36.96;34.75;34.00;34.75;36.96;40.53;45.24;49.61;52.55;54.24;54.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="37.20;37.33;37.69;38.16;38.64;39.02;39.32;39.52;39.60;39.52;39.32;39.02;38.64;38.16;37.69;37.33;37.20" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="54.80" y1="34.00" x2="56.80" y2="34.00" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="54.80;54.15;52.20;48.95;44.40;39.85;36.60;34.65;34.00;34.65;36.60;39.85;44.40;48.95;52.20;54.15;54.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="34.00;34.17;34.70;35.58;36.80;38.02;38.90;39.43;39.60;39.43;38.90;38.02;36.80;35.58;34.70;34.17;34.00" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="56.80;56.21;54.45;51.51;47.40;43.29;40.35;38.59;38.00;38.59;40.35;43.29;47.40;51.51;54.45;56.21;56.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="34.00;34.17;34.70;35.58;36.80;38.02;38.90;39.43;39.60;39.43;38.90;38.02;36.80;35.58;34.70;34.17;34.00" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="65.20" y1="30.00" x2="65.20" y2="38.00" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="65.20;64.22;61.32;56.64;50.48;44.77;40.94;38.73;38.00;38.73;40.94;44.77;50.48;56.64;61.32;64.22;65.20" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="30.00;30.24;31.02;32.47;34.68;36.93;38.46;39.32;39.60;39.32;38.46;36.93;34.68;32.47;31.02;30.24;30.00" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="65.20;64.61;62.78;59.58;54.72;49.40;45.36;42.85;42.00;42.85;45.36;49.40;54.72;59.58;62.78;64.61;65.20" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="38.00;38.11;38.38;38.68;38.92;39.12;39.34;39.53;39.60;39.53;39.34;39.12;38.92;38.68;38.38;38.11;38.00" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="44.80" y1="34.00" x2="45.20" y2="35.60" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="44.80;44.73;44.49;44.05;43.39;42.73;42.30;42.07;42.00;42.07;42.30;42.73;43.39;44.05;44.49;44.73;44.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="34.00;34.12;34.51;35.21;36.33;37.64;38.69;39.37;39.60;39.37;38.69;37.64;36.33;35.21;34.51;34.12;34.00" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="45.20;45.21;45.26;45.39;45.61;45.84;45.95;45.99;46.00;45.99;45.95;45.84;45.61;45.39;45.26;45.21;45.20" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="35.60;35.78;36.29;37.09;38.07;38.86;39.31;39.53;39.60;39.53;39.31;38.86;38.07;37.09;36.29;35.78;35.60" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="47.40" y1="34.80" x2="48.60" y2="34.80" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="47.40;47.36;47.23;47.01;46.70;46.39;46.17;46.04;46.00;46.04;46.17;46.39;46.70;47.01;47.23;47.36;47.40" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="34.80;34.95;35.40;36.15;37.20;38.25;39.00;39.45;39.60;39.45;39.00;38.25;37.20;36.15;35.40;34.95;34.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="48.60;48.64;48.77;48.99;49.30;49.61;49.83;49.96;50.00;49.96;49.83;49.61;49.30;48.99;48.77;48.64;48.60" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="34.80;34.95;35.40;36.15;37.20;38.25;39.00;39.45;39.60;39.45;39.00;38.25;37.20;36.15;35.40;34.95;34.80" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="53.20" y1="34.00" x2="53.20" y2="36.40" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="53.20;53.10;52.80;52.25;51.47;50.73;50.29;50.06;50.00;50.06;50.29;50.73;51.47;52.25;52.80;53.10;53.20" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="34.00;34.11;34.47;35.15;36.27;37.60;38.68;39.37;39.60;39.37;38.68;37.60;36.27;35.15;34.47;34.11;34.00" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="53.20;53.22;53.30;53.47;53.73;53.94;54.01;54.01;54.00;54.01;54.01;53.94;53.73;53.47;53.30;53.22;53.20" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="36.40;36.56;37.03;37.73;38.53;39.12;39.42;39.56;39.60;39.56;39.42;39.12;38.53;37.73;37.03;36.56;36.40" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="45.20" y1="35.60" x2="44.80" y2="37.20" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="45.20;45.50;46.39;47.79;49.63;51.45;52.82;53.70;54.00;53.70;52.82;51.45;49.63;47.79;46.39;45.50;45.20" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="35.60;35.65;35.83;36.19;36.89;37.88;38.78;39.39;39.60;39.39;38.78;37.88;36.89;36.19;35.83;35.65;35.60" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="44.80;45.18;46.36;48.40;51.37;54.36;56.43;57.62;58.00;57.62;56.43;54.36;51.37;48.40;46.36;45.18;44.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="37.20;37.35;37.77;38.41;39.11;39.52;39.62;39.61;39.60;39.61;39.62;39.52;39.11;38.41;37.77;37.35;37.20" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="53.20" y1="36.40" x2="50.80" y2="36.40" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="53.20;53.47;54.20;55.15;56.00;56.62;57.24;57.78;58.00;57.78;57.24;56.62;56.00;55.15;54.20;53.47;53.20" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="36.40;36.38;36.30;36.20;36.40;37.33;38.47;39.31;39.60;39.31;38.47;37.33;36.40;36.20;36.30;36.38;36.40" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="50.80;51.03;51.80;53.35;56.00;58.88;60.76;61.72;62.00;61.72;60.76;58.88;56.00;53.35;51.80;51.03;50.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="36.40;36.62;37.30;38.40;39.60;40.07;39.93;39.69;39.60;39.69;39.93;40.07;39.60;38.40;37.30;36.62;36.40" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="44.80" y1="37.20" x2="42.80" y2="37.20" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="44.80;45.46;47.36;50.29;53.90;57.23;59.74;61.41;62.00;61.41;59.74;57.23;53.90;50.29;47.36;45.46;44.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="37.20;37.17;37.07;36.88;36.90;37.60;38.58;39.33;39.60;39.33;38.58;37.60;36.90;36.88;37.07;37.17;37.20" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="42.80;43.40;45.29;48.67;53.90;59.41;63.21;65.33;66.00;65.33;63.21;59.41;53.90;48.67;45.29;43.40;42.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="37.20;37.38;37.93;38.87;39.90;40.25;40.02;39.72;39.60;39.72;40.02;40.25;39.90;38.87;37.93;37.38;37.20" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="54.80" y1="37.20" x2="57.20" y2="37.20" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="54.80;55.15;56.20;57.95;60.40;62.85;64.60;65.65;66.00;65.65;64.60;62.85;60.40;57.95;56.20;55.15;54.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="37.20;37.28;37.50;37.88;38.40;38.93;39.30;39.52;39.60;39.52;39.30;38.93;38.40;37.88;37.50;37.28;37.20" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="57.20;57.60;58.80;60.80;63.60;66.40;68.40;69.60;70.00;69.60;68.40;66.40;63.60;60.80;58.80;57.60;57.20" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="37.20;37.28;37.50;37.88;38.40;38.93;39.30;39.52;39.60;39.52;39.30;38.93;38.40;37.88;37.50;37.28;37.20" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="34.80" y1="38.00" x2="37.20" y2="38.00" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="34.80;34.55;33.80;32.55;30.80;29.05;27.80;27.05;26.80;27.05;27.80;29.05;30.80;32.55;33.80;34.55;34.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="38.00;38.13;38.50;39.13;40.00;40.88;41.50;41.88;42.00;41.88;41.50;40.88;40.00;39.13;38.50;38.13;38.00" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="37.20;36.95;36.20;34.95;33.20;31.45;30.20;29.45;29.20;29.45;30.20;31.45;33.20;34.95;36.20;36.95;37.20" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="38.00;38.13;38.50;39.13;40.00;40.88;41.50;41.88;42.00;41.88;41.50;40.88;40.00;39.13;38.50;38.13;38.00" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="65.20" y1="38.00" x2="62.80" y2="38.00" stroke="#c084fc" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
          <animate attributeName="x1" values="65.20;65.45;66.20;67.45;69.20;70.95;72.20;72.95;73.20;72.95;72.20;70.95;69.20;67.45;66.20;65.45;65.20" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="38.00;38.13;38.50;39.13;40.00;40.88;41.50;41.88;42.00;41.88;41.50;40.88;40.00;39.13;38.50;38.13;38.00" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="62.80;63.05;63.80;65.05;66.80;68.55;69.80;70.55;70.80;70.55;69.80;68.55;66.80;65.05;63.80;63.05;62.80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="38.00;38.13;38.50;39.13;40.00;40.88;41.50;41.88;42.00;41.88;41.50;40.88;40.00;39.13;38.50;38.13;38.00" dur="6s" repeatCount="indefinite" />
        </line>
      </g>
    </svg>
  </div>
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

const PROGRAM_WEEKLY_RHYTHM = [
  { day: 'ПН', label: 'Воркшоп', type: 'workshop' as const },
  { day: 'ВТ', label: 'Коворкинг', type: 'coworking' as const },
  { day: 'СР', label: 'Advanced', type: 'advanced' as const },
  { day: 'ЧТ', label: '', type: 'off' as const },
  { day: 'ПТ', label: 'Лекция', type: 'lecture' as const },
  { day: 'СБ', label: 'Q&A session', type: 'qna' as const },
  { day: 'ВС', label: '', type: 'off' as const },
];

export const PROGRAM_WEEK_COPY: Record<
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
                  className="relative z-30 w-full px-5 py-4 md:p-7 text-left cursor-pointer select-none"
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
                              <div className={`mb-2 flex flex-row items-center justify-end gap-1.5 ${metaTagClass}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-black/28" />
                                <span>Main Track</span>
                              </div>
                            )}
                            {showSecondaryTitle && !secondaryInHeader && (
                              <div
                                className={`mb-2 uppercase tracking-[0.06em] ${
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
                              className={`leading-[1.5] text-left ${
                                strongerBody ? 'text-[16px] md:text-[18px] font-medium text-black/82' : 'text-[14px] md:text-[16px] font-normal text-black/66'
                              }`}
                            >
                              {weekCopy.bodyDescription}
                            </p>

                            <div className="mt-3.5 relative">
                              <div className="text-[8px] uppercase font-bold tracking-[0.16em] text-black/28 mb-2">Недельный ритм</div>
                              <div className="grid grid-cols-4 sm:grid-cols-7 gap-1 md:gap-1.5">
                                {PROGRAM_WEEKLY_RHYTHM.map((day) => (
                                  <div
                                    key={`${track.id}-${day.day}`}
                                    className={`relative rounded-[8px] border px-1.5 md:px-2 pt-1.5 pb-2.5 md:pt-2 md:pb-2 text-[8px] md:text-[8.5px] uppercase tracking-[0.04em] h-[42px] md:h-[46px] flex flex-col ${
                                      day.type === 'advanced'
                                        ? 'bg-[#f5f6f5] border-black/16 text-black/68 shadow-sm'
                                        : day.type === 'off'
                                          ? 'bg-[#f5f6f5]/60 border-black/10 text-black/62'
                                          : 'bg-white border-black/15 text-black/80 shadow-sm font-bold'
                                    }`}
                                  >
                                    <div className="flex justify-between items-start">
                                      <div className="font-black opacity-40">{day.day}</div>
                                      {day.type === 'advanced' && (
                                        <span className="text-[10px] leading-none font-bold text-[#8DC63F]">*</span>
                                      )}
                                    </div>
                                    <div className="mt-auto flex min-h-[1.1rem] md:min-h-[1.5rem] items-end">
                                      <div className="font-bold leading-[1.02] [word-break:keep-all] [overflow-wrap:normal]">
                                        {day.label || ' '}
                                      </div>
                                    </div>
                                    
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
                              className={`relative rounded-[16px] p-4 opacity-80 ${
                                advancedColorway === 'violet'
                                  ? 'bg-[#eeebf5]'
                                  : lighterAdvancedBackground
                                    ? 'bg-[#f5f6f6]'
                                    : 'bg-[#f1f2f2]'
                              }`}
                            >
                              <div className={`mb-1.5 flex justify-end items-center gap-1.5 ${metaTrackClass}`}>
                                <span className="text-[10px] leading-none text-black/30 font-bold">*</span>
                                <span>{combinedAdvancedLabel ? 'Advanced Track Pro' : 'Advanced Track'}</span>
                              </div>
                              <div className="text-[8px] font-bold uppercase tracking-[0.16em] opacity-26 mb-0.5">Тема</div>
                              <div className={`font-semibold ${mutedAdvanced ? 'text-[12px] text-black/60' : 'text-[21px] md:text-[23px] leading-[1.02] text-black/76'}`}>
                                {weekCopy.advancedTopic}
                              </div>
                              <p className={`leading-[1.42] mt-1 ${mutedAdvanced ? 'text-[10px] text-black/48' : 'text-[12px] md:text-[13px] text-black/54'}`}>
                                {weekCopy.advancedDescription}
                              </p>
                              <div className="mt-2">
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
  const tagClass = 'inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] font-mono font-bold text-black/46';

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
      className="mt-4 ml-auto w-full md:w-[74%] rounded-[24px] border border-black/7 bg-[#f3f4f4] p-4 md:p-5 text-right min-h-[154px] flex flex-col justify-start"
    >
      <div className={`justify-end ${tagClass}`}>
        <span className="text-[10px] leading-none">*</span>
        <span>Advanced Track</span>
      </div>
      <h4 className="mt-1.5 text-[19px] md:text-[21px] leading-[1.02] font-semibold text-black/70">
        {weekCopy.advancedTopic}
      </h4>
      <p className="mt-1.5 text-[11px] md:text-[12px] leading-[1.4] text-black/50 max-w-[23rem] ml-auto">
        {weekCopy.advancedDescription}
      </p>
      <div className="mt-2.5 pt-2 border-t border-black/8">
        <div className="text-[8px] uppercase tracking-[0.16em] font-bold text-black/36">Спикер</div>
        <div className="text-[12px] md:text-[13px] leading-[1.2] font-semibold text-black/62 mt-0.5">{speaker}</div>
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

            <div className="relative z-10">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="text-[#8DC63F] text-[14px] md:text-[15px] font-mono font-black tracking-[0.14em] uppercase">
                неделя {activeTrack.id}
              </div>
              <div className="text-[8px] md:text-[9px] font-bold tracking-[0.12em] text-black/46 font-mono">{activeWeekCopy.dateRange}</div>
            </div>

            <div className={`${tagClass} mb-2 justify-end`}>
              <span className="w-1.5 h-1.5 rounded-full bg-black/25" />
              <span>Main Track</span>
            </div>

            <div className="text-[12px] md:text-[13px] uppercase font-medium tracking-[0.05em] text-black/58 mb-2.5" style={{ textWrap: 'balance' }}>
              {activeWeekCopy.framedDescription}
            </div>
            <h3 className="text-[30px] md:text-[42px] font-black uppercase tracking-tighter leading-[0.92] mb-3 text-[#1a1a1a]" style={{ textWrap: 'balance' }}>
              {activeWeekCopy.headerTopic}
            </h3>

            <p className="text-[14px] md:text-[15px] leading-[1.38] font-medium text-black/76 max-w-[34rem]">
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

const DesktopTechUiV5 = () => {
  const [activeWeek, setActiveWeek] = useState(0);
  const track = PROGRAM_TRACKS[activeWeek];
  const weekCopy = PROGRAM_WEEK_COPY[track.id];
  const advanced = ADVANCED_TRACKS[activeWeek];

  const weeklyRhythm = [
    { day: 'ПН', task: 'ВОРКШОП', type: 'default' as const },
    { day: 'ВТ', task: 'КОВОРКИНГ', type: 'default' as const },
    { day: 'СР', task: 'ADVANCED', type: 'advanced' as const, advanced: true },
    { day: 'ЧТ', task: '', type: 'off' as const },
    { day: 'ПТ', task: 'ЛЕКЦИЯ', type: 'default' as const },
    { day: 'СБ', task: 'Q&A SESSION', type: 'default' as const },
    { day: 'ВС', task: '', type: 'off' as const },
  ];

  return (
    <div className="w-full mx-auto pt-12 pb-5 px-0 font-mono">
      <div className="flex flex-col lg:flex-row gap-6 xl:gap-10 items-stretch justify-start">
        <div className="w-[110px] shrink-0 flex flex-col py-[50px] justify-between h-[580px]">
          {PROGRAM_TRACKS.map((t, idx) => {
            const isActive = activeWeek === idx;
            return (
              <button
                key={`${t.id}-${idx}`}
                onClick={() => setActiveWeek(idx)}
                className="flex items-center gap-5 group text-left relative h-12"
              >
                {idx < PROGRAM_TRACKS.length - 1 && (
                  <div className="absolute left-[14px] top-[40px] w-[1px] h-[calc(550px/3)] bg-black/[0.08]" />
                )}

                <div
                  className={cn(
                    'w-6 h-6 rounded-full border flex items-center justify-center transition-all z-10 shrink-0 shadow-sm',
                    isActive
                      ? 'bg-[#8DC63F] border-[#8DC63F] shadow-[#8DC63F]/20'
                      : 'bg-white border-black/[0.1] group-hover:border-black/20'
                  )}
                >
                  {isActive && <div className="w-1 h-1 rounded-full bg-white shadow-sm" />}
                  {!isActive && <div className="w-1 h-1 rounded-full bg-black/10 group-hover:bg-black/30 transition-colors" />}
                </div>

                <div className="flex flex-col">
                  <div className={cn('text-[12px] font-mono font-bold uppercase transition-colors mb-0.5 whitespace-nowrap', isActive ? 'text-[#8DC63F]' : 'text-black/30')}>
                    НЕДЕЛЯ
                  </div>
                  <div className={cn('text-[20px] font-black tracking-tighter leading-none transition-colors', isActive ? 'text-black' : 'text-black/20')}>
                    0{idx + 1}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex-1 bg-white border border-black/15 h-[580px] shadow-[0_10px_40px_rgba(0,0,0,0.02)] relative overflow-hidden flex flex-col rounded-[12px] pt-12 w-full">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.02] z-10"
            style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }}
          />

          <motion.div
            animate={{
              scale: activeWeek === 3 ? 1.05 : 0.82,
              opacity: activeWeek === 3 ? 0.75 : 0.65,
              top: activeWeek === 3 ? '-10%' : '0%',
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-[-44px] w-[740px] h-[740px] pointer-events-none mix-blend-multiply z-0 flex justify-center"
          >
            <MorphSvg week={activeWeek} />
          </motion.div>

          <div className="relative z-20 flex flex-col flex-1 px-12 pb-12">
            <div className="flex items-center justify-between mb-4 h-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-[1px] bg-black/80 shadow-sm" />
                <span className="text-black/80 text-[10px] font-mono font-bold uppercase tracking-[0.25em] leading-none">MAIN TRACK</span>
              </div>
              <div className="flex items-center gap-2 pr-1 h-full relative">
                <span className="text-[20px] font-black text-[#8DC63F] leading-none select-none font-sans absolute left-[-18px] top-[64%] -translate-y-1/2">*</span>
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-black/40 uppercase leading-none pl-1">ADVANCED TRACK</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row gap-6 relative overflow-hidden">
              <div className="flex-1 min-w-0 relative">
                <AnimatePresence>
                  <motion.div
                    key={`content-${activeWeek}`}
                    initial={{ opacity: 0, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(8px)' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col absolute inset-0 pt-0 text-left"
                  >
                    <h2 className="text-[48px] md:text-[62px] font-black uppercase tracking-tighter leading-[0.85] text-black mb-4 max-w-[800px]">
                      {track.title}
                    </h2>

                    <div className="text-[#8DC63F] font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                      {weekCopy.framedDescription}
                    </div>

                    <p className="text-[14px] leading-[1.45] text-black/76 font-medium max-w-[560px] mb-6">
                      {weekCopy.bodyDescription}
                    </p>

                    <div className="mt-auto items-start w-[calc(100%+180px)] max-w-none">
                      <div className="text-[10px] font-mono font-black uppercase tracking-[0.34em] text-black/72 mb-4 ml-1">НЕДЕЛЬНЫЙ РИТМ</div>
                      <div className="grid grid-cols-7 border border-black/[0.08] w-full max-w-none bg-black/[0.03] gap-px rounded-[1px] overflow-hidden shadow-none">
                        {weeklyRhythm.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex min-h-[34px] flex-col px-2.5 pt-[7px] pb-[5px] text-left transition-colors duration-300"
                            style={{
                              backgroundColor:
                                item.type === 'advanced'
                                  ? 'rgba(223, 228, 220, 0.18)'
                                  : item.type === 'off'
                                    ? 'rgba(223, 228, 220, 0.03)'
                                    : '#ffffff',
                            }}
                          >
                            <div className="flex justify-between items-start shrink-0">
                              <span
                                className="text-[7px] font-mono font-bold tracking-[0.22em] leading-none"
                                style={{
                                  color:
                                    item.type === 'off'
                                      ? 'rgba(0, 0, 0, 0.08)'
                                      : item.type === 'advanced'
                                        ? 'rgba(0, 0, 0, 0.22)'
                                        : 'rgba(0, 0, 0, 0.30)',
                                }}
                              >
                                {item.day}
                              </span>
                              {item.advanced && <div className="text-[14px] font-black text-[#8DC63F] leading-none mt-[-4px] select-none font-sans">*</div>}
                            </div>
                            <div className="mt-auto flex min-h-[1.1rem] items-end">
                              <div
                                className="text-[8px] font-black uppercase leading-[0.98] tracking-[-0.02em] font-mono"
                                style={{
                                  color:
                                    item.type === 'off'
                                      ? 'rgba(0, 0, 0, 0.10)'
                                      : item.type === 'advanced'
                                        ? 'rgba(0, 0, 0, 0.76)'
                                        : 'rgba(0, 0, 0, 0.90)',
                                }}
                              >
                                {item.task}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="w-full lg:w-[286px] shrink-0 relative pt-8">
                <AnimatePresence>
                  <motion.div
                    key={`adv-${activeWeek}`}
                    initial={{ opacity: 0, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(6px)' }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 pt-8 flex flex-col items-end text-right pr-0"
                  >
                    <div className="bg-gradient-to-l from-gray-100/100 via-gray-100/60 via-gray-50/20 to-transparent p-5 py-12 flex-col items-end justify-start w-full backdrop-blur-[1px] flex min-h-[196px]">
                      <h4 className="text-[26px] font-black uppercase text-black/80 tracking-tighter leading-none mb-4">
                        {advanced.title}
                      </h4>

                      <p className="text-[13px] leading-[1.6] text-black/60 font-medium mb-12 max-w-[260px]">
                        {advanced.description}
                      </p>

                      <div className="mt-auto flex flex-col items-end pt-2">
                        <div className="text-[8px] font-mono font-bold uppercase tracking-[0.3em] text-black/40 mb-1">CURATOR_ID</div>
                        <div className="text-[15px] font-black text-black/70 font-mono tracking-tighter uppercase whitespace-nowrap">
                          {advanced.speaker}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
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


export default function CommunityPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSpeakerIndex, setActiveSpeakerIndex] = useState<number | null>(null);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  
  const toggleSpeaker = (idx: number) => {
    const rowIndex = Math.floor(idx / 2); // 2 columns on mobile
    if (activeSpeakerIndex === idx) {
      setActiveSpeakerIndex(null);
      setActiveRowIndex(null);
    } else {
      setActiveSpeakerIndex(idx);
      setActiveRowIndex(rowIndex);
    }
  };

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
  const [pricingDetailsOpen, setPricingDetailsOpen] = useState(false);
  const [showReturnToPricing, setShowReturnToPricing] = useState(false);
  const [programFocusNonce, setProgramFocusNonce] = useState<number | undefined>(undefined);
  const [activeCase, setActiveCase] = useState<CaseCard | null>(null);
  const [activeCaseFilter, setActiveCaseFilter] = useState('all');
  const labsCloseTimeoutRef = useRef<number | null>(null);

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
              <MenuStrikeText>{'{labs}'}</MenuStrikeText> <span className="opacity-30">|</span>
            </div>
            <AnimatePresence>
              {labsDropdownOpen && <LabsHoverMenu />}
            </AnimatePresence>
          </div>
          {PRIMARY_MENU_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="group flex items-center gap-2 opacity-60 hover:text-black hover:opacity-100 transition-opacity w-fit">
              <MenuStrikeText>{link.label}</MenuStrikeText> <span className="opacity-30">|</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full md:w-[82%] md:ml-[18%] relative h-[100dvh] overflow-y-auto overflow-x-hidden scroll-smooth flex flex-col" ref={scrollContainerRef}>
        
        {/* Mobile Header Placeholder */}
        <div className="md:hidden flex items-center justify-between p-6 border-b border-black/10">
          <div className="font-black text-xs tracking-tighter uppercase">AI MINDSET</div>
        </div>

        {/* HERO SECTION */}
        <section id="hero" className="w-full min-h-[50vh] flex flex-col items-center justify-center p-6 md:p-20 relative border-b border-black/10">
          <EditorialSectionHeader eyebrow="COMMUNITY" title="AI MINDSET {SPACE}" />
          <div className="mt-10 max-w-2xl text-center">
            <h3 className="font-bold text-lg md:text-xl mb-4">free. application-based</h3>
            <p className="opacity-70 text-sm leading-relaxed mb-4">
              сообщество AI-практиков. наш общий R&D-процесс, где мы строим целостные глубоко личные AI-системы. те самые, что понимают контекст, адаптируются под задачи и эволюционируют вместе с нами.
            </p>
            <ul className="text-left opacity-70 text-sm leading-relaxed list-disc list-inside space-y-2 mx-auto inline-block">
              <li>собираем методологии и use-cases</li>
              <li>пробуем разные стеки под разные задачи: от авто-разбора почты до анализа венчурных сделок</li>
              <li>делимся этим опытом друг с другом, успехами и ошибками</li>
            </ul>
          </div>
          <a href="https://t.me/prod_ai_mind_set_bot?start=community" className="mt-12 bg-black text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-[#8DC63F] transition-colors">
            &gt;&gt; получить приглашение
          </a>
        </section>

        {/* ЧТО ВНУТРИ */}
        <section className="w-full p-6 md:p-20 border-b border-black/10">
          <EditorialSectionHeader eyebrow="DETAILS" title="ЧТО ВНУТРИ" />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <AsciiCardBorder>
              <h4 className="font-bold text-lg mb-4">live-demo</h4>
              <p className="opacity-70 text-sm leading-relaxed">&gt; раз в неделю<br/>&gt; по четвергам в 18:00 сет</p>
            </AsciiCardBorder>
            <AsciiCardBorder>
              <h4 className="font-bold text-lg mb-4">мастер‑чат</h4>
              <p className="opacity-70 text-sm leading-relaxed">&gt; общение<br/>&gt; еженедельные нетворкинг-мэтчи</p>
            </AsciiCardBorder>
            <AsciiCardBorder>
              <h4 className="font-bold text-lg mb-4">база знаний</h4>
              <p className="opacity-70 text-sm leading-relaxed">&gt; готовые плейбуки<br/>&gt; обмен практиками</p>
            </AsciiCardBorder>
          </div>
        </section>

        {/* ТЕКУЩИЙ СПРИНТ */}
        <section className="w-full p-6 md:p-20 border-b border-black/10 bg-[#e8e8e5]">
          <EditorialSectionHeader eyebrow="CURRENT" title="ТЕКУЩИЙ СПРИНТ" />
          <div className="mt-16 flex flex-col items-center">
            <AsciiCardBorder className="w-full max-w-2xl bg-white">
              <h4 className="font-bold text-2xl mb-6">Founder OS</h4>
              <ul className="space-y-4 font-mono text-sm opacity-80">
                <li>&gt; собираем AI стек</li>
                <li>&gt; создаем ритуалы и mindset фаундера</li>
                <li>&gt; делимся на еженедельных демо</li>
              </ul>
              <a href="https://aimindset.notion.site/2999c733ce31800db866df6a8c7c923b?pvs=105" target="_blank" className="mt-8 text-[#8DC63F] font-bold block hover:underline">
                &gt;&gt; показать свой кейс
              </a>
            </AsciiCardBorder>
          </div>
        </section>

        {/* КОМУ ПОДОЙДЕТ */}
        <section className="w-full p-6 md:p-20 border-b border-black/10">
          <EditorialSectionHeader eyebrow="AUDIENCE" title="{КОМУ ПОДОЙДЕТ}" />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-sm">
            <div className="border border-black/10 p-6 flex flex-col gap-4 bg-white/50">
              <span className="font-bold uppercase text-lg">фаундеру</span>
              <span className="opacity-60">&gt; вшить AI в продукт</span>
            </div>
            <div className="border border-black/10 p-6 flex flex-col gap-4 bg-white/50">
              <span className="font-bold uppercase text-lg">инженеру</span>
              <span className="opacity-60">&gt; добавить продакт‑оптику</span>
            </div>
            <div className="border border-black/10 p-6 flex flex-col gap-4 bg-white/50">
              <span className="font-bold uppercase text-lg">исследователю</span>
              <span className="opacity-60">&gt; тестировать прототипы</span>
            </div>
            <div className="border border-black/10 p-6 flex flex-col gap-4 bg-white/50">
              <span className="font-bold uppercase text-lg">художнику</span>
              <span className="opacity-60">&gt; подобрать новую линзу</span>
            </div>
          </div>
        </section>

        {/* ОСНОВАТЕЛИ */}
        <section className="w-full p-6 md:p-20 border-b border-black/10 bg-[#e8e8e5]">
          <EditorialSectionHeader eyebrow="TEAM" title="ОСНОВАТЕЛИ" />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Irina */}
            <div className="flex gap-6">
              <img src={speakerImage('irina-nazarova.jpg')} alt="Ирина" className="w-24 h-24 object-cover grayscale" />
              <div>
                <h4 className="font-bold text-lg">Ирина Назарова</h4>
                <a href="https://t.me/Irhen_N" className="text-sm opacity-60 underline hover:text-[#8DC63F] transition-colors">telegram</a>
                <p className="mt-2 text-sm">onboarding, care & rhythm</p>
              </div>
            </div>
            {/* Alexander */}
            <div className="flex gap-6">
              <img src={speakerImage('alexander-povalyaev.jpg')} alt="Александр" className="w-24 h-24 object-cover grayscale" />
              <div>
                <h4 className="font-bold text-lg">Александр Поваляев</h4>
                <a href="http://t.me/alex_named" className="text-sm opacity-60 underline hover:text-[#8DC63F] transition-colors">telegram</a>
                <p className="mt-2 text-sm">strategy, rituals, quality</p>
              </div>
            </div>
            {/* Sergey */}
            <div className="flex gap-6">
              <img src={speakerImage('sergey-khabarov.jpg')} alt="Сергей" className="w-24 h-24 object-cover grayscale" />
              <div>
                <h4 className="font-bold text-lg">Сергей Хабаров</h4>
                <a href="https://khabaroff.com/" className="text-sm opacity-60 underline hover:text-[#8DC63F] transition-colors">webpage</a>
                <p className="mt-2 text-sm">tools, integrations, automations</p>
              </div>
            </div>
            {/* Daniel */}
            <div className="flex gap-6">
              <div className="w-24 h-24 bg-black/10 flex items-center justify-center">?</div>
              <div>
                <h4 className="font-bold text-lg">daniel v</h4>
                <a href="https://www.linkedin.com/in/vasihc/" className="text-sm opacity-60 underline hover:text-[#8DC63F] transition-colors">LinkedIn</a>
                <p className="mt-2 text-sm">product, content, specialist</p>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full bg-[#181616] text-[#f9f9f7] p-6 md:p-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            <div className="flex flex-col gap-4">
              <div className="font-black text-xs tracking-tighter uppercase mb-4 opacity-50">Контакты</div>
              <a href="https://www.youtube.com/@A-I-Mindset" className="hover:text-[#8DC63F] transition-colors">YouTube подкаст</a>
              <a href="https://t.me/ai_mind_set" className="hover:text-[#8DC63F] transition-colors">Медиа в Телеграм</a>
            </div>
            <div className="flex flex-col gap-4">
              <div className="font-black text-xs tracking-tighter uppercase mb-4 opacity-50">Документы</div>
              <a href="https://docs.google.com/document/d/e/2PACX-1vRfnWZMiHbq8fvnnI0gACZuHtvJkZHJM0_kRWPZBwzBuzVQRLz2aqrwOO4qZfJUW2EkYc8rGt0f5QrJ/pub" className="hover:text-[#8DC63F] transition-colors text-sm opacity-70">Оферта</a>
              <a href="https://aimindset.org/confpolicy" className="hover:text-[#8DC63F] transition-colors text-sm opacity-70">Политика конфиденциальности</a>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-white/20 text-center opacity-30 text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2">
            AI MINDSET {new Date().getFullYear()} <span className="mx-2">||</span> RESEARCH LAB
          </div>
        </footer>
      </main>
    </div>
  );
}

