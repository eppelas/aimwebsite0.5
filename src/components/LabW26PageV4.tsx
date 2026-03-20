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

// --- CONSTANTS ---
const SIDEBAR_NAV: NavItem[] = [
  { label: 'ФИЛОСОФИЯ', href: '#philosophy' },
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
    <div className="h-px flex-1 bg-black/10 mb-[0.45rem] md:mb-[0.75rem]" />
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
  { day: 'СР', label: 'Advanced Track', type: 'advanced' as const },
  { day: 'ЧТ', label: '', type: 'off' as const },
  { day: 'ПТ', label: 'Лекция', type: 'lecture' as const },
  { day: 'СБ', label: 'Q&A session', type: 'qna' as const },
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
  const metaTagClass = 'font-mono text-[8px] md:text-[9px] tracking-[0.12em] font-bold text-black/46';
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
                        className={`uppercase tracking-tight leading-[1.04] text-black/86 ${
                          largeHeading ? 'text-[24px] md:text-[34px] font-extrabold' : 'text-[14px] md:text-[24px] font-black'
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
                              <div className={`mb-2 flex items-center justify-end ${metaTrackClass}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-black/28" />
                                <span>Main Track</span>
                              </div>
                            )}
                            {showSecondaryTitle && !secondaryInHeader && (
                              <div
                                className={`mb-2 uppercase tracking-[0.05em] ${
                                  secondaryTitleAccent
                                    ? 'text-[11px] md:text-[14px] font-medium text-[#a6da49]'
                                    : subtitleStrong
                                      ? 'text-[14px] md:text-[16px] font-bold opacity-74'
                                      : 'text-[12px] md:text-[14px] font-normal text-black/76'
                                }`}
                              >
                                {weekCopy.framedDescription}
                              </div>
                            )}
                            <p
                              className={`leading-[1.45] font-normal text-left ${
                                strongerBody ? 'text-[15px] md:text-[17px] text-black/78' : 'text-[12px] md:text-[15px] text-black/52'
                              }`}
                            >
                              {weekCopy.bodyDescription}
                            </p>

                            <div className="mt-3.5 relative">
                              <div className="text-[8px] uppercase font-bold tracking-[0.16em] text-black/28 mb-2">Недельный ритм</div>
                              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                {PROGRAM_WEEKLY_RHYTHM.map((day) => (
                                  <div
                                    key={`${track.id}-${day.day}`}
                                    className={`relative rounded-[10px] border px-2 py-1.5 text-[8px] uppercase tracking-[0.05em] min-h-[46px] ${
                                      day.type === 'advanced'
                                        ? 'bg-[#ececec] border-black/15 text-black/46'
                                        : day.type === 'off'
                                          ? 'bg-transparent border-black/8 text-black/16'
                                          : 'bg-[#fffdfa] border-black/10 text-black/54'
                                    }`}
                                  >
                                    {day.type === 'advanced' && (
                                      <span className="absolute right-1 top-0.5 text-[10px] leading-none font-bold opacity-45">*</span>
                                    )}
                                    <div className="font-black opacity-45">{day.day}</div>
                                    <div className="font-semibold mt-0.5 min-h-[1rem] leading-tight">{day.label || ' '}</div>
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
                              <div className={`mb-1.5 ${metaTrackClass}`}>
                                <span className="text-[10px] leading-none">*</span>
                                <span>{combinedAdvancedLabel ? 'Advanced Track Pro' : 'Advanced Track'}</span>
                              </div>
                              <div className="text-[8px] font-bold uppercase tracking-[0.16em] opacity-26 mb-0.5">Тема</div>
                              <div className={`font-semibold ${mutedAdvanced ? 'text-[11px] text-black/60' : 'text-[18px] leading-[1.05] text-black/68'}`}>
                                {weekCopy.advancedTopic}
                              </div>
                              <p className={`leading-[1.35] mt-1 ${mutedAdvanced ? 'text-[10px] text-black/48' : 'text-[11px] opacity-48'}`}>
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


export default function LabW26PageV4() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [labsDropdownOpen, setLabsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'winter' | 'spring'>('winter');
  const [activeMindsetQuote, setActiveMindsetQuote] = useState(0);
  const [pricingDetailsOpen, setPricingDetailsOpen] = useState(false);
  const [showReturnToPricing, setShowReturnToPricing] = useState(false);
  const [programFocusNonce, setProgramFocusNonce] = useState<number | undefined>(undefined);
  const [activeCase, setActiveCase] = useState<CaseCard | null>(null);
  const [activeCaseFilter, setActiveCaseFilter] = useState('all');
  const [activeSpeakerIndex, setActiveSpeakerIndex] = useState<number | null>(null);
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
            className="fixed inset-0 z-[450] flex flex-col p-8 overflow-y-auto md:hidden"
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
                      onClick={() => { scrollTo(link.href); setIsMenuOpen(false); }}
                      className="text-4xl font-black uppercase tracking-tighter hover:line-through text-left"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] opacity-60 uppercase tracking-widest mb-5 border-b-2 border-current/20 pb-3">меню</div>
                <div className="flex flex-col gap-4 pl-4 border-l border-current/15">
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
                  <VoxelLogoFace className="w-full max-w-md mx-auto" scale={1.2} />
               </div>
            </div>
          </Container>
        </section>

         <div className="md:ml-[18%] md:w-[82%] w-full">

            <section className="py-20 md:py-32 relative bg-black/[0.03]">
              <Container>
                <div className="w-full max-w-5xl mx-auto">
                  <div className="flex flex-col md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-12 md:gap-24">
                    <div className="flex flex-col gap-6 max-w-xl text-left">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.885]">
                        лаборатория <br />
                        нового мышления <br />
                        в эпоху AI
                      </div>
                    </div>
                    <div className="flex w-full flex-col gap-6 text-left">
                      <div className="inline-flex items-center gap-3 text-[10px] leading-none font-bold opacity-60 tracking-[0.18em] bg-black/[0.03] px-3 py-1 self-start border border-black/10">
                        <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                        базовое обучение, старт раз в квартал
                      </div>
                      <p className="text-sm md:text-base uppercase leading-relaxed opacity-70">
                        AI mindset winter lab w26 — это лаборатория, пространство для экспериментов. здесь вы не изучаете, а создаёте: персональных ассистентов, AI-first процессы, новую версию себя. от хаоса промптов к персональной AI-операционной системе.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 md:mt-8 flex flex-col gap-4 md:gap-3">
                    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-24 items-start md:items-baseline">
                      <div className="flex items-center gap-3 text-[10px] md:text-xs leading-none font-bold opacity-60 tracking-[0.18em] bg-black/[0.03] px-3 py-1 self-start border border-black/10 hidden md:inline-flex">
                          <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                          базовое обучение, старт раз в квартал
                      </div>
                      <div className="mt-3 md:mt-0 text-[10px] md:text-xs leading-none opacity-40 font-bold uppercase tracking-widest text-left">следующий поток</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-24 items-start">
                      <div />
                      <div className="flex flex-col items-start gap-2 text-left">
                        <div className="text-[14px] md:text-[16px] font-black tracking-[0.18em]">20 апреля 2026</div>
                        <a
                          href="#pricing"
                          onClick={(e) => { e.preventDefault(); scrollTo('#pricing'); }}
                          className="inline-flex items-center justify-center px-7 md:px-10 py-3.5 md:py-4.5 bg-[#8DC63F]/12 text-[#5b7f23] hover:bg-[#8DC63F] hover:text-[#181616] transition-all duration-300 font-mono text-[11px] md:text-[13px] font-bold tracking-[0.18em] border border-dashed border-[#8DC63F]/80 shadow-[0_8px_24px_rgba(141,198,63,0.12)] w-auto max-w-full text-center rounded-md"
                        >
                          подать заявку на x26 main lab
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </section>

            <div className="py-4 md:hidden">
              <Container>
                <div className="mx-auto h-[0.5px] w-full bg-black/10" />
              </Container>
            </div>

            <section id="philosophy-cards" className="pt-20 md:pt-28 pb-0 md:pb-0 overflow-hidden">
              <Container>
                <EditorialSectionHeader eyebrow="Что внутри" title="Философия" className="mb-12 text-left" />
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

            <div className="py-12 md:py-20">
              <Container>
                <div className="mx-auto h-[0.5px] max-w-sm bg-black/5" />
              </Container>
            </div>

            <section id="mindset" className="pt-0 pb-24 md:pt-0 md:pb-32 overflow-hidden">
              <Container>
                <div className="grid md:grid-cols-[1.35fr_0.65fr] lg:grid-cols-[1.45fr_0.55fr] gap-12 md:gap-16 items-center">
                  <div className="order-2 md:order-1">
                    <div className="relative flex flex-col justify-end h-[30rem] md:h-[38rem] lg:h-[42rem] py-8">
                      {/* Quote Text: Expands upwards via flex items-end */}
                      <div className="flex-1 flex items-end pb-32">
                        <motion.h2 
                          key={activeMindsetQuote}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="max-w-[34rem] md:max-w-[40rem] lg:max-w-[44rem] pr-6 md:pr-8 text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95] items-end text-left"
                        >
                          {MINDSET_QUOTES[activeMindsetQuote].text}
                        </motion.h2>
                      </div>

                      {/* [CRITICAL: FIXED_BUTTONS_POSITION] 
                          Do not modify these positioning classes. The buttons must remain 
                          in a fixed absolute position at the bottom of the section 
                          to prevent jumping when quotes change length. */}
                      <div className="absolute bottom-8 left-0 right-0 grid grid-cols-[6.25rem_minmax(14rem,1fr)] items-center gap-4 h-[4.5rem]">
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
                  <div className="order-1 md:order-2 flex justify-center md:justify-end">
                    <div className="w-80 h-80 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] relative flex items-center justify-center">
                      <MindsetDynamicArt className="scale-100" />
                    </div>
                  </div>
                </div>
              </Container>
            </section>

            <section className="pt-20 pb-0 md:pt-32 md:pb-0 overflow-hidden">
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

<section id="philosophy" className="pt-0 pb-24 md:pt-0 md:pb-32 overflow-hidden">
        <Container>
          <div className="grid md:grid-cols-[1.35fr_0.65fr] lg:grid-cols-[1.45fr_0.55fr] gap-12 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="relative flex flex-col justify-end h-[30rem] md:h-[38rem] lg:h-[42rem] py-8">
                {/* Quote Text: Expands upwards via flex items-end */}
                <div className="flex-1 flex items-end pb-32">
                  <h2 className="max-w-[34rem] md:max-w-[40rem] lg:max-w-[44rem] pr-6 md:pr-8 text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95] items-end">
                    {MINDSET_QUOTES[activeMindsetQuote].text}
                  </h2>
                </div>

                {/* [CRITICAL: FIXED_BUTTONS_POSITION] 
                    Do not modify these positioning classes. The buttons must remain 
                    in a fixed absolute position at the bottom of the section 
                    to prevent jumping when quotes change length. */}
                <div className="absolute bottom-8 left-0 right-0 grid grid-cols-[6.25rem_minmax(14rem,1fr)] items-center gap-4 h-[4.5rem]">
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
                  <div className={`flex min-h-[2.65rem] min-w-[14rem] flex-col justify-center text-[10px] uppercase tracking-[0.18em] ${MINDSET_QUOTES[activeMindsetQuote].author ? 'text-black/40' : 'invisible'}`}>
                    <div className="font-bold tracking-[0.2em]">{MINDSET_QUOTES[activeMindsetQuote].author || 'placeholder'}</div>
                    <span className="block mt-1 normal-case tracking-normal text-[11px] text-black/55">
                      {MINDSET_QUOTES[activeMindsetQuote].role || 'placeholder'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center md:justify-end text-[#8DC63F]">
              <div className="w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 relative flex items-center justify-center text-[4px] md:text-[8px] leading-[4px] md:leading-[8px]">
                <LargeDiamondArt className="scale-100 md:scale-150" />
              </div>
            </div>
          </div>
        </Container>
      </section>

<section id="program" className="pt-24 md:pt-32 pb-24 md:pb-32 overflow-hidden">
        <Container>
          <EditorialSectionHeader eyebrow="контур лаборатории" title="программа" className="mb-16 md:mb-24 text-left" />

          <div className="mb-12 md:mb-16 text-left">
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

          <div className="mt-6 md:mt-8 flex justify-end">
            <p className="max-w-[18rem] md:max-w-[23rem] text-left text-[11px] md:text-[13px] leading-[1.45] text-black/46">
              <span className="mr-1.5 font-bold">*</span>
              {PROGRAM_TRACKS_CAPTION}
            </p>
          </div>
        </Container>
      </section>

      {/* Tracks Section
      <SlashDivider />
      <section id="tracks" className="py-24 md:py-32 overflow-hidden">
        <Container>
          <EditorialSectionHeader eyebrow="ДОПОЛНИТЕЛЬНАЯ ГРУППА" title="Advanced Tracks" className="mb-24" />
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <p className="text-sm opacity-60 uppercase leading-relaxed">
              основная программа даёт фундамент. треки — это углубление в конкретный домен. выбираешь то, что нужно.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-0 border-l border-black/10 bg-white/30">
            {ADVANCED_TRACKS.map((track, idx) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover="hover"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
              >
                <div className="h-full border-r border-black/10">
                  <AsciiCardBorder className={`group min-h-[250px] md:min-h-[290px] transition-all duration-500 ${colors.card}`}>
                    <div className="flex h-full flex-col justify-between gap-6">
                      <div className="flex justify-between items-start">
                        <div className="text-[10px] font-bold opacity-40 uppercase">{track.week}</div>
                      </div>

                      <div className="flex flex-col gap-3 min-h-[6.25rem] md:min-h-[7rem]">
                        <motion.h3
                          variants={{
                            hover: { color: '#8DC63F' },
                          }}
                          className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-tight min-h-[2.8em] transition-colors duration-300"
                        >
                          {track.title}
                        </motion.h3>
                        <div className="text-[10px] font-bold opacity-30 uppercase tracking-widest min-h-[1.2rem]">
                          {track.speaker}
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                        {track.description}
                      </p>
                    </div>
                  </AsciiCardBorder>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
      */}

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

          <div className="-mx-4 overflow-x-auto px-4 pb-3 md:-mx-12 md:px-12">
            <div className="grid min-w-max grid-flow-col grid-rows-2 gap-4 md:gap-6 auto-cols-[14.5rem] md:auto-cols-[15rem]">
            {visibleCases.map((card, i) => (
              <button
                key={`${card.title}-${i}`}
                type="button"
                onClick={() => setActiveCase(card)}
                className="relative overflow-hidden min-h-[146px] rounded-[6px] bg-white p-5 text-left transition-all duration-300 group border border-black/10 hover:bg-[#fbfcf7] hover:border-[#8DC63F]/70 flex flex-col justify-between"
              >
                <div className="pointer-events-none absolute right-4 bottom-3 transition-transform duration-500 group-hover:scale-[1.04]">
                  <AsciiCaseArt frames={card.artFrames} className="origin-bottom-right scale-[4] text-current opacity-[0.14] group-hover:opacity-[0.18]" />
                </div>
                <div className="relative z-10 mb-6 flex w-full items-start justify-end">
                  <div className="ml-auto flex flex-col items-end text-right">
                    <div className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.08em] text-black/82">
                      {card.author}
                    </div>
                    <div className="text-[9px] md:text-[10px] uppercase tracking-[0.04em] text-black/48">
                      {card.role}
                    </div>
                  </div>
                </div>
                <div className="relative z-10 max-w-[11rem]">
                  <h4 className="mb-1 text-[12px] md:text-[13px] font-bold uppercase tracking-[0.12em] leading-tight text-black/92">
                    {card.title}
                  </h4>
                  <p className="text-[10px] md:text-[11px] leading-[1.45] text-black/68 line-clamp-2">
                    {card.desc}
                  </p>
                </div>
              </button>
            ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <SlashDivider />
      <section id="team" className="py-20 md:py-32">
        <Container>
          <EditorialSectionHeader eyebrow="lab team" title="Спикеры" className="mb-16" />
          <div className="mb-16 max-w-3xl">
            <p className="text-sm md:text-base opacity-70 leading-relaxed">
              ниже — проводники, которые будут рядом на всём протяжении лаборатории.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-2 md:gap-x-12 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-20">
            {TEAM_MEMBERS.map((member, i) => (
              <React.Fragment key={member.name}>
                <div
                  className={`flex flex-col gap-3 md:gap-5 ${
                    i === TEAM_MEMBERS.length - 1
                      ? 'md:col-span-2 md:max-w-[calc(50%-1.5rem)] md:w-full md:mx-auto lg:col-span-1 lg:col-start-2 lg:max-w-none'
                      : ''
                  }`}
                >
                   <div
                    className="group"
                  >
                    <div className="aspect-square bg-[#332b2b]/5 border border-[#332b2b]/10 relative overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className={`absolute inset-0 transition-colors duration-300 md:hidden ${activeSpeakerIndex === i ? 'bg-black/20' : 'bg-black/0 group-hover:bg-black/8'}`} />
                      
                      {/* Desktop Hover Info */}
                      <div className="hidden md:flex absolute inset-0 bg-black/85 p-8 flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                        <p className="text-white text-[15px] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-[80%]">
                          {member.description}
                        </p>
                      </div>

                      {/* Mobile Arrow and Trigger */}
                      <div className="md:hidden absolute inset-0 z-10">
                        <button
                          type="button"
                          className="absolute inset-0 w-full h-full text-left"
                          onClick={() => setActiveSpeakerIndex((prev) => (prev === i ? null : i))}
                        >
                          <div className="absolute right-3 bottom-3 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
                            <ArrowRight size={20} strokeWidth={2.25} className={`transition-transform duration-300 ${activeSpeakerIndex === i ? 'rotate-90' : ''}`} />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[13px] md:text-xl font-bold uppercase tracking-tight leading-tight">{member.name}</h3>
                    <p className="text-[8px] md:text-[10px] opacity-40 uppercase tracking-widest">{member.role}</p>
                  </div>
                  <AnimatePresence initial={false}>
                    {activeSpeakerIndex === i && (
                         <motion.div
                        key={`speaker-detail-${member.name}`}
                        initial={{ height: 0, opacity: 0, y: -10 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -10 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                        className="overflow-hidden md:hidden"
                      >
                        <div className="pt-1 md:pt-0">
                          <p className="max-w-5xl text-[13px] md:text-[16px] leading-[1.75] text-black/78">
                            {member.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </React.Fragment>
            ))}
          </div>
        </Container>
      </section>

      {/* Schedule Section */}
      {false && <ProgramScheduleGrid />}

      {/* Pricing Section */}
      <ReviewsSection />
      <SlashDivider />
      <section id="pricing" className="py-20 md:py-32">
        <Container>
          <EditorialSectionHeader eyebrow="Форматы участия" title="Тарифы" className="mb-16" />

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {pricingPlans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
              >
                <div className="h-full rounded-[0.4rem] border border-black/10 bg-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-6 md:p-8 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    {plan.tagHref ? (
                      <button
                        type="button"
                        onClick={scrollToProgramFromPricing}
                        className="text-[10px] font-bold border border-black/15 px-3 py-1 uppercase tracking-[0.18em] hover:bg-black hover:text-white transition-colors rounded-sm"
                      >
                        {plan.tag}
                      </button>
                    ) : plan.tag ? (
                      <div
                        className="text-[10px] font-bold px-3 py-1 uppercase tracking-[0.18em] border border-black/15 rounded-sm"
                      >
                        {plan.tag}
                      </div>
                    ) : <div />}
                  </div>

                  <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-5">
                    {plan.name}
                  </h3>

                  <div className="flex items-end gap-2 mb-8">
                    <span className="text-6xl md:text-7xl font-black tracking-tighter leading-none">€{plan.price}</span>
                  </div>

                  <div className="flex-1 flex flex-col min-h-[16rem]">
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3 text-[14px] md:text-[15px] leading-[1.38] text-black/72">
                          <span className="mt-[0.32rem] h-2 w-2 shrink-0 rounded-full bg-black" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto mb-8">
                      <div className="inline-block py-1 px-3 bg-black/[0.04] border border-black/5 rounded-sm text-[11px] md:text-[12px] uppercase tracking-wider font-bold text-black/60">
                        {plan.desc}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {pricingDetailsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-black/10 pt-8 mb-8 space-y-4">
                          {plan.more.map((item) => (
                            <div key={item} className="flex items-start gap-3 text-[14px] md:text-[15px] leading-[1.45] text-black/82">
                              <span className="mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-full bg-black/20" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="button"
                    aria-label="Показать подробности тарифов"
                    onClick={() => setPricingDetailsOpen((prev) => !prev)}
                    className="mt-auto mb-5 flex w-full items-center justify-center text-black/40 hover:text-black transition-colors"
                  >
                    <ChevronDown
                      size={24}
                      className={`transition-transform duration-300 ${pricingDetailsOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <a
                    href="#pricing"
                    onClick={(e) => { e.preventDefault(); scrollTo('#pricing'); }}
                    className="w-full bg-[#8DC63F] px-6 py-5 text-center text-[15px] md:text-[16px] font-black uppercase tracking-[0.12em] text-white hover:bg-black hover:text-[#f9f9f7] transition-all rounded-sm"
                  >
                    выбрать
                  </a>
                </div>
              </motion.div>
            ))}
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
            className="fixed inset-0 z-[920] flex items-end justify-center bg-black/80 p-3 backdrop-blur-md md:items-center md:p-6"
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
    <div className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-[600] max-w-[320px] md:max-w-[380px] w-[calc(100%-32px)] md:w-[calc(100%-48px)] bg-white border-2 border-black p-5 md:px-7 md:py-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] md:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)]">
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
