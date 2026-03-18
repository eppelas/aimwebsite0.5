import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  ChevronRight,
  ChevronDown,
  X,
  ExternalLink
} from 'lucide-react';



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
    title: 'МЫШЛЕНИЕ > ИНСТРУМЕНТЫ',
    description: 'технологии меняются, а новый способ мышления остаётся с вами',
    art: 'foundation' as const,
  },
  {
    title: 'ПРАКТИКА',
    description: 'каждая неделя это эксперимент с реальными задачами и артефактами',
    art: 'action' as const,
  },
  {
    title: 'СООБЩЕСТВО',
    description: 'вы учитесь не только у экспертов, но и друг у друга',
    art: 'synergy' as const,
  },
  {
    title: 'ПЕРСОНАЛИЗАЦИЯ',
    description: 'углубляйтесь в то, что нужно именно вам через треки',
    art: 'trajectory' as const,
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
  <div className={`flex items-end gap-6 md:gap-8 ${className}`}>
    <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 shrink-0">{eyebrow}</div>
    <div className="h-px flex-1 bg-black/10 mb-[0.28rem]" />
    <div className="font-black uppercase tracking-widest text-xl md:text-2xl text-right">{title}</div>
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
}) => {
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const metaTagClass = 'font-mono text-[8px] md:text-[9px] tracking-[0.12em] font-bold text-black/46';
  const metaTrackClass = `${metaTagClass} inline-flex items-center gap-1.5`;

  const toggleCard = (idx: number) => {
    setExpandedIndexes((prev) => {
      const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
      const alreadyOpen = prev.includes(idx);
      let next: number[];

      if (allowMultipleDesktop && isDesktop) {
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
                              <div
                                className={`mb-2 flex items-center justify-end ${metaTrackClass} ${
                                  desktopMainTrackBottom ? 'lg:hidden' : ''
                                }`}
                              >
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
                              className={`leading-[1.45] font-normal ${
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
                              {showMainTrackTag && desktopMainTrackBottom && (
                                <div className={`hidden lg:flex mt-2 items-center justify-end ${metaTrackClass}`}>
                                  <span className="w-1.5 h-1.5 rounded-full bg-black/28" />
                                  <span>Main Track</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div
                            className={`w-full lg:w-[280px] lg:justify-self-end lg:pl-4 border-t border-black/8 pt-3 lg:pt-0 lg:border-t-0 text-right ${
                              desktopHideMainAdvancedDivider ? '' : 'lg:border-l lg:border-black/10'
                            }`}
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
  'основная программа даёт фундамент. треки — это углубление в конкретный домен. выбираешь то, что нужно.';

const PROGRAM_GRID_OVERLAY_STYLE = {
  backgroundImage:
    'linear-gradient(rgba(0,0,0,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.16) 1px, transparent 1px)',
  backgroundSize: '28px 28px',
} as const;

const ProgramReferenceSwipeCard = ({
  selectorPlacement = 'bottom',
  showGridOverlay = false,
}: {
  selectorPlacement?: 'top' | 'bottom';
  showGridOverlay?: boolean;
}) => {
  const [activeWeek, setActiveWeek] = useState(0);
  const activeTrack = PROGRAM_TRACKS[activeWeek];
  const activeWeekCopy = PROGRAM_WEEK_COPY[activeTrack.id];
  const activeAdvanced = ADVANCED_TRACKS[activeWeek];
  const tagClass = 'inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] font-mono font-bold text-black/46';

  const renderAdvancedCard = (weekCopy: (typeof PROGRAM_WEEK_COPY)[string], speaker: string) => (
    <div className="mt-4 ml-auto w-full md:w-[74%] rounded-[24px] border border-black/7 bg-[#f3f4f4] p-4 md:p-5 text-right min-h-[154px] flex flex-col justify-start">
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

            <div className={`${tagClass} mb-2`}>
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
      tag: 'BASE',
      features: [
        '4 live-воркшопа + 4 коворкинга',
        'закрытый чат участников',
        'трек prompt → context → mind → life',
        'демо-день и портфолио кейсов',
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
      tag: '+4 ТРЕКА',
      tagHref: '#tracks',
      highlight: true,
      features: [
        'всё из MAIN LAB',
        '4 advanced трека',
        'priority buddy slots',
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
      tag: 'СВОЙ МАРШРУТ',
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


export default function LabW26PageV3() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [labsDropdownOpen, setLabsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'winter' | 'spring'>('winter');
  const [pricingDetailsOpen, setPricingDetailsOpen] = useState(false);
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
          <a href="https://join.aimindset.org/waitlist" className="border border-black/60 text-black px-6 py-[1.35rem] text-[10px] font-black uppercase tracking-widest text-center block hover:bg-black hover:text-[#f9f9f7] transition-all rounded-sm">ЗАПИСАТЬСЯ</a>
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
                <img src={LOGO_SRC} className="h-6 w-6 object-contain" alt="LOGO" />
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
                     <VoxelLogoFace className="w-full max-w-[280px] mx-auto -translate-x-3" scale={1} />
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

            <section className="py-20 md:py-32 relative bg-black/[0.03]">
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

            <section className="py-20 md:py-32 overflow-hidden">
              <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
                  {PHILOSOPHY_PILLARS.map((item) => (
                    <div key={item.title} className="bg-white/10 h-full min-h-[200px] flex flex-col p-6 lg:p-8">
                      <div className="flex-1 flex items-center justify-center py-6 -translate-x-3 md:-translate-x-2">
                        <PhilosophyPillarArt art={item.art} />
                      </div>
                      <div className="mt-auto flex flex-col gap-3">
                        <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter leading-tight bg-transparent text-current balance-text">
                          {item.title}
                        </h3>
                        <p className="text-[9px] leading-relaxed opacity-60 uppercase tracking-widest">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Container>
            </section>

<section id="philosophy" className="py-24 md:py-32 overflow-hidden">
        <Container>
          <EditorialSectionHeader eyebrow="ТОЧКА СБОРКИ" title="Философия" className="mb-24" />
          <div className="grid md:grid-cols-2 gap-16 md:gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl leading-tight mb-12">
                Mindset важнее инструментов — технологии меняются, а новый способ мышления остаётся с вами
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

<section id="program" className="pt-24 md:pt-32 pb-24 md:pb-32 overflow-hidden">
        <Container>
          <EditorialSectionHeader eyebrow="контур лаборатории" title="программа" className="mb-16 md:mb-24" />

          <div className="mb-12 md:mb-16 text-right md:text-left">
            <h2 className="text-[15px] md:text-4xl font-black tracking-tight mb-2 md:mb-4">19 января – 16 февраля • 4 недели</h2>
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
              />
            </div>
          </div>

          <div className="hidden md:block">
            <ProgramReferenceSwipeCard selectorPlacement="top" showGridOverlay={true} />
          </div>

          <div className="mt-6 md:mt-8 flex justify-end">
            <p className="max-w-[18rem] md:max-w-[23rem] text-left text-[11px] md:text-[13px] leading-[1.45] text-black/46">
              <span className="mr-1.5 font-bold">*</span>
              {PROGRAM_TRACKS_CAPTION}
            </p>
          </div>
        </Container>
      </section>

      {/* Tracks Section */}
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

      {/* Cases Section */}
      <SlashDivider />
      <section id="cases" className="py-20 md:py-32 bg-[#332b2b]/5">
        <Container>
          <EditorialSectionHeader eyebrow="Cases" title="Собранная система" className="mb-16" />
          <div className="mb-16 max-w-3xl">
            <p className="text-lg md:text-xl font-medium leading-relaxed mb-4">
              Что создают участники за 4 недели?
            </p>
            <p className="text-sm md:text-base opacity-70 leading-relaxed">
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
                className="min-h-[152px] bg-black/5 p-5 text-left transition-colors duration-300 group border border-black/10 hover:bg-[#8DC63F] hover:text-white flex flex-col justify-between"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                    <AsciiCaseArt frames={card.artFrames} className="text-current" />
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] font-bold uppercase tracking-[0.1em] opacity-80 group-hover:text-white group-hover:opacity-100">
                      {card.author}
                    </div>
                    <div className="text-[8px] uppercase tracking-[0.05em] opacity-40 group-hover:opacity-80">
                      {card.role}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="mb-1 text-[11px] font-bold uppercase tracking-widest leading-tight">
                    {card.title}
                  </h4>
                  <p className="text-[9px] leading-relaxed opacity-70 group-hover:opacity-90 line-clamp-2">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {TEAM_MEMBERS.map((member, i) => (
              <div
                key={i}
                className={`flex flex-col gap-4 ${
                  i === TEAM_MEMBERS.length - 1
                    ? 'md:col-span-2 md:max-w-[calc(50%-1.5rem)] md:w-full md:mx-auto lg:col-span-1 lg:col-start-2 lg:max-w-none'
                    : ''
                }`}
              >
                <div className="aspect-square bg-[#332b2b]/5 border border-[#332b2b]/10 relative group overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/96" />
                  <div className="absolute inset-0 text-[#f9f9f7] p-7 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center">
                    <p className="text-[13px] md:text-sm leading-[1.65] font-medium text-white/95">
                      {member.description}
                    </p>
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

      {/* Schedule Section */}
      {false && <ProgramScheduleGrid />}

      {/* Pricing Section */}
      <SlashDivider />
      <section id="pricing" className="py-20 md:py-32">
        <Container>
          <EditorialSectionHeader eyebrow="Тарифы" title="Форматы участия" className="mb-16" />
          <div className="mb-16 max-w-3xl">
            <p className="text-sm md:text-base opacity-70 leading-relaxed">
              скидки: Alumni (-20%), Bring a Friend (-10% каждому). возврат после первой недели — без вопросов. возможна оплата в рублях.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {pricingPlans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
              >
                <div className="h-full rounded-[0.4rem] border border-black/10 bg-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 md:p-10 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-8">
                    {plan.tagHref ? (
                      <a
                        href={plan.tagHref}
                        className="text-[10px] font-bold border border-black/15 px-3 py-1 uppercase tracking-[0.18em] hover:bg-black hover:text-white transition-colors"
                      >
                        {plan.tag}
                      </a>
                    ) : (
                      <div className="text-[10px] font-bold border border-black/15 px-3 py-1 uppercase tracking-[0.18em]">
                        {plan.tag}
                      </div>
                    )}
                  </div>

                  <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
                    {plan.name}
                  </h3>

                  <div className="flex items-end gap-2 mb-10">
                    <span className="text-6xl md:text-7xl font-black tracking-tighter leading-none">€{plan.price}</span>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 text-[15px] md:text-[16px] leading-[1.38] text-black/72">
                        <span className="mt-[0.32rem] h-2 w-2 rounded-full bg-black" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-[15px] leading-[1.45] text-black/68 mb-6">
                    {plan.desc}
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
                        <div className="border-t border-black/10 pt-6 mb-8 space-y-3">
                          {plan.more.map((item) => (
                            <p key={item} className="text-[15px] leading-[1.5] text-black/82">
                              {item}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="button"
                    aria-label="Показать подробности тарифов"
                    onClick={() => setPricingDetailsOpen((prev) => !prev)}
                    className="mt-auto mb-6 flex w-full items-center justify-center text-black/40 hover:text-black transition-colors"
                  >
                    <ChevronDown
                      size={24}
                      className={`transition-transform duration-300 ${pricingDetailsOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <a
                    href="https://join.aimindset.org/context"
                    className="w-full bg-[#8DC63F] p-6 text-center text-[10px] font-black uppercase tracking-widest text-white hover:bg-black hover:text-[#f9f9f7] transition-all rounded-sm"
                  >
                    Выбрать
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
            className="mt-8 md:mt-10 flex w-full md:w-[58%] items-center justify-between gap-6 border border-black/10 bg-white/35 px-6 py-5 md:px-8 md:py-6 hover:bg-white/70 transition-colors rounded-sm"
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

          <section className="py-56 md:py-72 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[150px_minmax(0,1fr)] items-center gap-8 md:gap-5">
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
            <div className="text-[8px] opacity-30 uppercase tracking-[0.5em]">MADE WITH LOVE AND AI // 2026</div>
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
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-4 backdrop-blur-md md:items-center"
            onClick={() => setActiveCase(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl border border-black/20 bg-white p-6 text-black shadow-2xl md:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">CASE SUMMARY</div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight md:text-3xl">{activeCase.title}</h3>
                  <p className="mt-2 text-sm opacity-70 md:text-base">{activeCase.desc}</p>
                </div>
                <button
                  type="button"
                  className="border border-black/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
                  onClick={() => setActiveCase(null)}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mb-6 flex flex-col gap-6 border border-black/10 bg-[#8DC63F]/10 p-5 md:flex-row md:p-6">
                <div className="flex shrink-0 items-center justify-center border border-[#8DC63F]/30 bg-white p-4">
                  <AsciiCaseArt frames={activeCase.artFrames} className="origin-center scale-150 transform text-[#8DC63F]" />
                </div>
                <div className="space-y-4">
                  <p className="text-xs leading-relaxed md:text-sm">{activeCase.details}</p>
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-60">
                    Tools: <span className="text-[#8DC63F] opacity-100">{activeCase.tools}</span>
                  </div>
                  <div className="inline-block border border-[#8DC63F] bg-[#8DC63F] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                    {activeCase.metric}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActiveCase(null)}
                  className="w-full border border-black bg-black px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:border-[#8DC63F] hover:bg-[#8DC63F] md:w-auto"
                >
                  Back to cases
                </button>
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
