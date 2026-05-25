import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import {
  Menu,
  ChevronRight,
  ArrowRight,
  ChevronDown,
  X,
  CirclePlay
} from 'lucide-react';
import { MorphSvg } from './MorphSvg';
import PricingPaymentPopupDark from './PricingPaymentPopupDark';
import PricingPaymentPopupNeon from './PricingPaymentPopupNeon';
import PricingPaymentPopupDataline from './PricingPaymentPopupDataline';
import PricingPaymentPopupDatalineBold from './PricingPaymentPopupDatalineBold';
import PricingPaymentPopupDatalineHeader from './PricingPaymentPopupDatalineHeader';
import { DARK_CTA_BUTTON_CLASS, GREEN_SOLID_CTA_BUTTON_CLASS, PRICING_CTA_BUTTON_CLASS } from './ctaButtonStyles';
import ReviewsSection from './ReviewsSection';
import { FooterFaqBlock } from './FooterFaqBlock';
import { InvertedVoxelLogoFace } from './InvertedVoxelLogoFace';



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
  featuredTools?: string[];
  productImageSrc?: string;
  productImageAlt?: string;
  productVideoId?: string;
  productVideoStartSeconds?: number;
}

const cn = (...classes: (string | boolean | undefined | null)[]) => classes.filter(Boolean).join(' ');

const TOUCH_MOBILE_VIEWPORT_QUERY = '(max-width: 767px)';
const MD_VIEWPORT_QUERY = '(min-width: 768px)';
const LG_VIEWPORT_QUERY = '(min-width: 1024px)';
const BASE_URL = import.meta.env.BASE_URL;
const getCaseStaticVisualSrcByAssetName = (assetName: string) => `${BASE_URL}assets/cases/${assetName}`;
const COMMUNITY_NIGHT_VIDEO_ID = '2mOF2jvfbiM';
const getYoutubeEmbedUrl = (videoId: string, startSeconds = 0) => {
  const params = new URLSearchParams({
    autoplay: '1',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    enablejsapi: '1',
    start: String(startSeconds)
  });

  if (typeof window !== 'undefined') {
    params.set('origin', window.location.origin);
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
};

const getMediaQueryMatch = (query: string) => typeof window !== 'undefined' && window.matchMedia(query).matches;

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => getMediaQueryMatch(query));

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQueryList = window.matchMedia(query);
    const syncMatch = () => setMatches(mediaQueryList.matches);
    syncMatch();

    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', syncMatch);
      return () => mediaQueryList.removeEventListener('change', syncMatch);
    }

    mediaQueryList.addListener(syncMatch);
    return () => mediaQueryList.removeListener(syncMatch);
  }, [query]);

  return matches;
};

const useNearViewport = <T extends Element>(rootMargin: string) => {
  const elementRef = useRef<T | null>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || isNearViewport) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsNearViewport(true);
        observer.disconnect();
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isNearViewport, rootMargin]);

  return [elementRef, isNearViewport] as const;
};

const chunkArray = <T,>(items: T[], size: number) =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, index * size + size),
  );

const SPEAKER_HIGHLIGHTS: Record<string, string[]> = {
  'Александр Поваляев': ['Основатель проекта AI Mindset', 'стратег', 'эксперт по AI-интеграциям', '15+ лет'],
  'Сергей Хабаров': ['Системный архитектор', '6+ лет в образовании', '500+ обученных специалистов', 'контекст-инжиниринг'],
  'Степан Гершуни': ['Фаундер', 'Инвестор', 'cybOS', 'advanced-треке'],
  'Алексей Иванов': ['Экзекьютив-коуч', 'фаундеров и IT-лидеров', '15 лет в UX и продуктах', 'AI-coaching'],
  'Серёжа Рис': ['AI-евангелист', 'экс-Yandex', 'фаундер', 'vibe-coding'],
  'Анна Ставенски': ['Продуктовый архитектор', '10+ лет в управлении', 'визуальный сторителлер', 'life engineering'],
  'Анна Лозицкая': ['12+ лет', 'Фаундер embraceme.app', 'mind engineering', 'рефлексии и трекинга целей'],
};

const renderSpeakerDescription = (name: string, description: string): React.ReactNode => {
  const highlights = SPEAKER_HIGHLIGHTS[name];
  if (!highlights?.length) return description;

  const escaped = highlights
    .slice()
    .sort((left, right) => right.length - left.length)
    .map((item) => item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const matcher = new RegExp(`(${escaped.join('|')})`, 'g');
  const parts = description.split(matcher);

  return parts.map((part, index) =>
    highlights.includes(part) ? <strong key={`${name}-${index}`} className="font-bold text-black/74">{part}</strong> : part,
  );
};

type SpeakerCornerKey = 'tl' | 'tr' | 'bl' | 'br';

const SPEAKER_CORNER_VARIANTS: SpeakerCornerKey[][] = [
  ['tl', 'br'],
  ['tr', 'bl'],
  ['tl', 'bl'],
  ['tr', 'br'],
  ['tl', 'br'],
  ['tr', 'bl'],
  ['tl', 'tr'],
];

const SpeakerCornerFrame = ({ corners }: { corners: SpeakerCornerKey[] }) => {
  const redCorners = new Set<SpeakerCornerKey>(corners);

  const cornerClassByKey: Record<SpeakerCornerKey, string> = {
    tl: 'left-0 top-0 border-l border-t',
    tr: 'right-0 top-0 border-r border-t',
    bl: 'bottom-0 left-0 border-b border-l',
    br: 'bottom-0 right-0 border-b border-r',
  };

  const hoverWidthClassByKey: Record<SpeakerCornerKey, string> = {
    tl: 'group-hover:border-l-[1.7px] group-hover:border-t-[1.7px]',
    tr: 'group-hover:border-r-[1.7px] group-hover:border-t-[1.7px]',
    bl: 'group-hover:border-b-[1.7px] group-hover:border-l-[1.7px]',
    br: 'group-hover:border-b-[1.7px] group-hover:border-r-[1.7px]',
  };

  return (
    <>
      {corners.map((corner) => (
        <div
          key={corner}
          className={cn(
            'pointer-events-none absolute h-[18px] w-[18px] border-black/36 transition-all duration-200',
            cornerClassByKey[corner],
            redCorners.has(corner)
              ? cn('group-hover:border-[#d83b2d]', hoverWidthClassByKey[corner])
              : 'group-hover:border-black/36',
          )}
        />
      ))}
    </>
  );
};

const SPEAKER_FRAME_WIDTH_CLASS = 'max-w-[248px]';
const SPEAKER_PHOTO_WIDTH_CLASS = 'w-[224px]';
const SPEAKER_PHOTO_RADIUS_CLASS = 'rounded-[2px]';

const CASE_DARK_VARIANTS = new Set([3, 7]);
const CASE_VISUAL_ASSET_BY_INDEX: Record<number, string> = {
  0: 'case-0.svg',
  1: 'case-1.svg',
  2: 'case-2.svg',
  3: 'case-3.svg',
  4: 'case-0.svg',
  5: 'case-1.svg',
  6: 'case-2.svg',
  7: 'case-3.svg',
  8: 'case-8.svg',
  9: 'case-9.svg',
  10: 'case-6.svg',
  11: 'case-3.svg',
  12: 'case-8.svg',
  13: 'case-2.svg',
  14: 'case-5.svg',
  15: 'case-4.svg',
};

const getCaseVisualSrcByAssetName = (assetName: string) => `${BASE_URL}assets/cases/${assetName}`;
const CASE_STATIC_SVG_CACHE = new Map<string, string>();
const CASE_STATIC_SVG_REQUESTS = new Map<string, Promise<string>>();
const CASE_ANIMATED_SVG_CACHE = new Map<string, string>();
const CASE_ANIMATED_SVG_REQUESTS = new Map<string, Promise<string>>();

const getCaseVisualFrameClassName = (index: number) => {
  if (index === 0) return "inset-[0%] -translate-x-[2%] translate-y-[6%] scale-[2.2]";
  if (index === 1) return "inset-[-2%] translate-x-[4%] translate-y-[4%] scale-[2.1]";
  if (index === 2) return "inset-[2%] translate-y-[12%] scale-[1.95]";
  if (index === 3) return "inset-[3%] translate-y-[7%] scale-[1.9]";
  if (index === 4) return "inset-[4%] -translate-x-[1%] translate-y-[4%] scale-[2.35]";
  if (index === 5) return "inset-[4%] translate-y-[2%] scale-[2.2]";
  if (index === 6) return "inset-[4%] translate-y-[4%] scale-[2.3]";
  if (index === 7) return "inset-[1%] translate-y-[2%] scale-[1.95]";
  if (index === 8) return "inset-[4%] translate-y-[4%] scale-[2.2]";
  if (index === 9) return "inset-[2%] translate-y-[1%] scale-[2.1]";
  return "inset-[6%] scale-[1.4]";
};

const getCaseVisualToneClassName = (index: number) => {
  if (index === 2) return "brightness-[1.18] contrast-[1.14] saturate-[1.24]";
  if (index === 3) return "brightness-[1.12] contrast-[1.16] saturate-[1.18]";
  if (index === 4) return "brightness-[1.12] contrast-[1.16] saturate-[1.24] hue-rotate-[18deg]";
  if (index === 5) return "brightness-[1.18] contrast-[1.12] saturate-[1.18] hue-rotate-[-8deg]";
  if (index === 6 || index === 7) return "brightness-[1.22] contrast-[1.18] saturate-[1.25]";
  if (index === 8) return "brightness-[1.22] contrast-[1.18] saturate-[1.28] hue-rotate-[10deg]";
  if (index === 9) return "brightness-[1.16] contrast-[1.14] saturate-[1.1] hue-rotate-[-12deg]";
  if (CASE_DARK_VARIANTS.has(index)) return "brightness-[1.12] contrast-[1.1] saturate-[1.1]";
  return "";
};

const getCaseVisualColorClassName = (index: number) => {
  if (index === 0 || index === 4) return "text-[#38bdf8]";
  if (index === 1 || index === 5) return "text-[#7BFF36]";
  if (index === 2 || index === 6) return "text-[#4FF6FF]";
  if (index === 3 || index === 7) return "text-[#FF5A4A]";
  if (index === 8) return "text-[#F6AEFF]";
  if (index === 9) return "text-[#FFF7FF]";
  return "text-[#8DC63F]";
};

const CASE_MEDIA_BASE_BACKGROUND_CLASS = "bg-[linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),radial-gradient(circle_at_22%_78%,rgba(145,212,69,0.22),transparent_34%),radial-gradient(circle_at_78%_24%,rgba(210,255,150,0.12),transparent_28%),linear-gradient(145deg,#171a16_0%,#0f120f_60%,#131713_100%)] bg-[size:18px_18px,18px_18px,auto,auto,auto]";

const normalizeCaseSvgMarkup = (svgMarkup: string) =>
  svgMarkup
    .replace(/<\?xml[\s\S]*?\?>\s*/g, '')
    .replace(
      /<svg\b([^>]*)>/,
      '<svg$1 class="h-full w-full overflow-visible" preserveAspectRatio="xMidYMid meet">',
    );

const convertCaseSvgMarkupToCurrentColor = (svgMarkup: string) =>
  svgMarkup
    .replace(/stroke="(?!none)[^"]*"/gi, 'stroke="currentColor"')
    .replace(/fill="(?!none)[^"]*"/gi, 'fill="currentColor"')
    .replace(/style="([^"]*?)stroke\s*:\s*([^;"]+)(;?)([^"]*?)"/gi, 'style="$1stroke: currentColor$3$4"')
    .replace(/style="([^"]*?)fill\s*:\s*([^;"]+)(;?)([^"]*?)"/gi, 'style="$1fill: currentColor$3$4"');

const stripCaseSvgAnimation = (svgMarkup: string) =>
  svgMarkup
    .replace(/<animate(?:Transform|Motion)?\b[\s\S]*?\/>/gi, '')
    .replace(/<animate(?:Transform|Motion)?\b[\s\S]*?<\/animate(?:Transform|Motion)?>/gi, '')
    .replace(/<set\b[\s\S]*?\/>/gi, '')
    .replace(/<set\b[\s\S]*?<\/set>/gi, '');

const loadStaticCaseSvgMarkup = async (assetName: string) => {
  const cachedMarkup = CASE_STATIC_SVG_CACHE.get(assetName);
  if (cachedMarkup) return cachedMarkup;

  const pendingRequest = CASE_STATIC_SVG_REQUESTS.get(assetName);
  if (pendingRequest) return pendingRequest;

  const request = fetch(`${BASE_URL}assets/cases/${assetName}`)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${assetName}`);
      }

      const rawMarkup = await response.text();
      const staticMarkup = normalizeCaseSvgMarkup(stripCaseSvgAnimation(rawMarkup));
      CASE_STATIC_SVG_CACHE.set(assetName, staticMarkup);
      return staticMarkup;
    })
    .finally(() => {
      CASE_STATIC_SVG_REQUESTS.delete(assetName);
    });

  CASE_STATIC_SVG_REQUESTS.set(assetName, request);
  return request;
};

const loadAnimatedCaseSvgMarkup = async (assetName: string) => {
  const cachedMarkup = CASE_ANIMATED_SVG_CACHE.get(assetName);
  if (cachedMarkup) return cachedMarkup;

  const pendingRequest = CASE_ANIMATED_SVG_REQUESTS.get(assetName);
  if (pendingRequest) return pendingRequest;

  const request = fetch(getCaseVisualSrcByAssetName(assetName))
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${assetName}`);
      }

      const rawMarkup = await response.text();
      const animatedMarkup = normalizeCaseSvgMarkup(convertCaseSvgMarkupToCurrentColor(rawMarkup));
      CASE_ANIMATED_SVG_CACHE.set(assetName, animatedMarkup);
      return animatedMarkup;
    })
    .finally(() => {
      CASE_ANIMATED_SVG_REQUESTS.delete(assetName);
    });

  CASE_ANIMATED_SVG_REQUESTS.set(assetName, request);
  return request;
};

function CaseVisualGraphic({
  index,
  className,
  animate = false,
  activated = false,
  animateNonce = 0,
}: {
  index: number;
  className: string;
  animate?: boolean;
  activated?: boolean;
  animateNonce?: number;
}) {
  const assetName = CASE_VISUAL_ASSET_BY_INDEX[index] ?? `case-${index}.svg`;
  const isTouchMobileViewport = useMediaQuery(TOUCH_MOBILE_VIEWPORT_QUERY);
  const [staticMarkup, setStaticMarkup] = useState<string | null>(() => CASE_STATIC_SVG_CACHE.get(assetName) ?? null);
  const [animatedMarkup, setAnimatedMarkup] = useState<string | null>(() => CASE_ANIMATED_SVG_CACHE.get(assetName) ?? null);

  useEffect(() => {
    let disposed = false;
    loadStaticCaseSvgMarkup(assetName)
      .then((markup) => {
        if (!disposed) setStaticMarkup(markup);
      })
      .catch(() => {
        if (!disposed) setStaticMarkup(null);
      });
    return () => {
      disposed = true;
    };
  }, [assetName]);

  useEffect(() => {
    let disposed = false;
    loadAnimatedCaseSvgMarkup(assetName)
      .then((markup) => {
        if (!disposed) setAnimatedMarkup(markup);
      })
      .catch(() => {
        if (!disposed) setAnimatedMarkup(null);
      });
    return () => {
      disposed = true;
    };
  }, [assetName]);

  const renderedMarkup = useMemo(() => {
    return animate ? animatedMarkup ?? staticMarkup : staticMarkup;
  }, [animate, animatedMarkup, staticMarkup]);

  if (isTouchMobileViewport) {
    return (
      <div
        aria-hidden
        className={cn(
          "flex h-full w-full origin-center items-center justify-center",
          activated
            ? "drop-shadow-[0_0_14px_rgba(255,255,255,0.22)]"
            : "drop-shadow-[0_0_10px_rgba(111,255,204,0.08)]",
          className,
        )}
      >
        <img
          src={getCaseStaticVisualSrcByAssetName(assetName)}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div
      key={animate ? `case-animated-${index}-${animateNonce}` : `case-static-${index}`}
      aria-hidden
      className={cn(
        "flex h-full w-full origin-center items-center justify-center [&_svg]:h-full [&_svg]:w-full",
        activated
          ? "drop-shadow-[0_0_14px_rgba(255,255,255,0.22)]"
          : "drop-shadow-[0_0_10px_rgba(111,255,204,0.08)] group-hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.2)]",
        className,
      )}
      dangerouslySetInnerHTML={renderedMarkup ? { __html: renderedMarkup } : undefined}
    />
  );
}

// --- CONSTANTS ---
const PAGE_SECTION_LINKS: NavItem[] = [
  { label: 'ОПИСАНИЕ', href: '#hero' },
  { label: 'ПРОГРАММА', href: '#program' },
  { label: 'КЕЙСЫ', href: '#cases' },
  { label: 'СПИКЕРЫ', href: '#speakers' },
  { label: 'ФИЛОСОФИЯ', href: '#philosophy' },
  { label: 'ТАРИФЫ', href: '#pricing' },
  { label: 'ОТЗЫВЫ', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
];

const LAB_MENU_LINKS = [
  { label: 'Spring Main Lab', href: 'https://aimindset.org/ai-mindset', status: 'Current' },
  { label: 'AI-Native Orgs', href: 'https://ai-native.aimindset.org/', status: 'Current' },
  { label: 'Summer Main Lab', href: 'https://join.aimindset.org/waitlist', status: 'Next' },
];

const PRIMARY_MENU_LINKS = [
  { label: 'комьюнити {space}', href: 'https://aimindset.org/ai-mindset-community' },
  { label: '{Special Projects}' },
  { label: '{For Teams}', href: 'https://aimindset.org/ai-mindset-consulting' },
  { label: '{For Non-Profit}', href: 'https://aimindset.org/non-profit' },
];

const LOGO_SRC = `${BASE_URL}assets/ai-mindset-logo.png`;
const LOGO_TRANSPARENT_SRC = `${BASE_URL}assets/ai-mindset-logo-transparent.png`;
const CONTACT_FORM_URL = 'https://join.aimindset.org/waitlist';
const speakerImage = (filename: string) => `${BASE_URL}assets/speakers/${filename}`;
const philosophyAnimation = (filename: string) => `${BASE_URL}assets/${filename}`;

const CASE_FILTERS = [
  { id: 'all', label: 'все' },
  { id: 'manager', label: 'менеджер' },
  { id: 'creative', label: 'креатор' },
  { id: 'educator', label: 'преподаватель' },
  { id: 'developer', label: 'разработчик' },
];

const CASE_FILTER_LABELS = CASE_FILTERS.reduce<Record<string, string>>((acc, filter) => {
  acc[filter.id] = filter.label;
  return acc;
}, {});

const PAGE_SECTION_HASH_IDS = ['hero', 'program', 'cases', 'speakers', 'philosophy', 'pricing', 'reviews', 'faq', 'labs'] as const;

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
    title: 'TEAM OPERATION SYSTEM',
    author: 'Дарья',
    role: 'Data analyst · разработчик · team lead (2 команды)',
    desc: 'Команда работает через Claude Code — тимлид видит токены и ROI каждого сотрудника.',
    details: 'В этом кейсе Дарья показывает Team Operation System для дата-инженерных команд. Personal OS на базе WHOOP и Plaud Pin была предысторией: данные о сне и встречах выгружаются по крону, а агент «Клариса» по утрам сообщает о состоянии и учитывает его при работе с задачами. Командная система работает так: каждый сотрудник ведёт свою GitLab-ветку, хуки автоматически пушат изменения контекста, а PostgreSQL хранит agent metrics по сессиям, задачам, stage outputs и стоимости токенов. Ключевая фича — кнопка VS Code Remote в карточке задачи восстанавливает старую Claude Code-сессию через session ID из PostgreSQL, поэтому сотрудник продолжает контекст вместо создания новой сессии. Сейчас система масштабируется от 1 команды к 4 Team OS и дальше в Company Operation System.',
    tools: 'Claude Code · PostgreSQL · TMux · GitLab · WHOOP · Plaud',
    metric: 'Kanban и Scrum заменены AI-native planning; 1 → 4 Team OS',
    artFrames: CASE_ARTS.project,
    filters: ['manager', 'developer'],
    productImageSrc: getCaseStaticVisualSrcByAssetName('community-night/team-os-darya-product.png'),
    productImageAlt: 'Скриншот Team Operation System Дарьи из демо Community Night',
    productVideoId: COMMUNITY_NIGHT_VIDEO_ID,
    productVideoStartSeconds: 4184
  },
  {
    title: 'КОНВЕЙЕР ВСТРЕЧ',
    author: 'Наташа',
    role: 'Backend developer · архитектор · портфельный менеджер (30 активных проектов)',
    desc: 'Встречи обрабатываются сами — задачи, контекст, проекты без участия человека.',
    details: 'Наташа обрабатывала 30-40 встреч в неделю и тратила на это утра в дороге и субботы. Она перевернула процесс: Plaud скачивает транскрипты, Opus 4.7 получает динамический промпт из описаний всех проектов, Section Project Map режет встречу на части и привязывает их к проектам, затем извлекаются задачи и матчятся с реальным календарём и участниками. Векторная база с метаданными даёт поиск по человеку, дате и проекту, а дедупликация через semantic search убирает повторяющиеся задачи. В веб-интерфейсе виден граф: встреча → задача → проект → следующие шаги.',
    tools: 'Plaud · Claude Opus · Python · Vector DB · Calendar',
    metric: 'Субботы освобождены от ручной обработки встреч',
    artFrames: CASE_ARTS.summary,
    filters: ['manager', 'developer'],
    productImageSrc: getCaseStaticVisualSrcByAssetName('community-night/meeting-pipeline-natasha-product.png'),
    productImageAlt: 'Скриншот task graph Наташи из демо Community Night',
    productVideoId: COMMUNITY_NIGHT_VIDEO_ID,
    productVideoStartSeconds: 521
  },
  {
    title: 'МЕДИТАЦИЯ АГЕНТА',
    author: 'Даниил',
    role: 'Software engineer',
    desc: 'Агент медитирует ночью по крону, дообучается на своих инсайтах.',
    details: 'Даниил искал способ не будить агента вручную и не подгружать контекст каждый раз заново. Self-Improvement Loop через SLMD оказался неточным, поэтому он стал симулировать для агента практику присутствия: агент выбирает технику, время и длительность медитации, ловит мысль и отбрасывает её как в настоящей практике, а иногда присылает мини-инсайт. После нескольких итераций модель была дообучена локально на текстах Бахтиярова и психонетике. Теперь ночные медитации запускаются по cron, а дообучение идёт на виртуальной машине на данных самих медитаций.',
    tools: 'Hermes · Kimi · Cron · Fine-tuning · Graph DB',
    metric: 'Self-improvement loop убран; контекст держится без ручных манипуляций',
    artFrames: CASE_ARTS.research,
    filters: ['developer'],
    productImageSrc: getCaseStaticVisualSrcByAssetName('community-night/agent-meditation-daniil-product.png'),
    productImageAlt: 'Скриншот графа медитации агента Даниила из демо Community Night',
    productVideoId: COMMUNITY_NIGHT_VIDEO_ID,
    productVideoStartSeconds: 3299
  },
  {
    title: 'КНОПКА NEXT',
    author: 'Алексей',
    role: 'Разработчик · 14 лет опыта',
    desc: 'Год с 50 задачами в день — и кнопка Next вместо раздумий о следующем шаге.',
    details: 'Алексей три года назад пережил жёсткое выгорание: год лежал на диване, жить не хотелось. После этого начал строить систему продуктивности «просто чтобы попробовать»: стартовал с 10 пунктов в списке дел, за год довёл до 50 задач в день. В Obsidian у него шаблон дня с автогенерацией рутин, кнопка Next для перехода между задачами без раздумий, отметки времени и физический таймер на браслете для утреннего просмотра календаря. Главный инсайт — идти на скуку: не менять рутины, пока они не выжгутся до автоматизма.',
    tools: 'Obsidian · ActivityWatch · OpenWorks · Timer',
    metric: 'Выживание автоматизировано; сон, прогулки и заметки удержались без системы',
    artFrames: CASE_ARTS.automation,
    filters: ['developer']
  },
  {
    title: 'PERSONAL OS МАЙО',
    author: 'Михаил',
    role: 'Консультант · агентные системы',
    desc: 'Personal OS вокруг Gallup Clifton компенсирует слабости и усиливает сильные стороны.',
    details: 'Михаил назвал свою систему «Майо» — My OS. Корневая гипотеза: не исправлять слабости, а строить систему, которая их компенсирует. После Gallup Clifton он собрал рутины через LaunchD, скиллы вроде «Дьявола адвоката» и Skill-check, коннекторы MCP для Telegram, Zoom, Calendar и ClickUp, vault с профилем себя, портфелем из 9 проектов, встречами и карточками людей. Gateway — Telegram-бот с доступом в систему, а еженедельный спринт-оператор собирает данные активности.',
    tools: 'Claude Code · Codex · Obsidian · Telegram MCP · ClickUp MCP',
    metric: 'За ~3 недели система развёрнута и стала основой консалтинговой работы',
    artFrames: CASE_ARTS.knowledge,
    filters: ['manager']
  },
  {
    title: 'СТРАТЕГИЯ + ТАКТИКА',
    author: 'Дмитрий',
    role: 'Коуч · консультант',
    desc: 'Система соединяет смысл, вектор и ежедневное исполнение.',
    details: 'Дмитрий строит личные системы 8 лет и пришёл к двум параллельным трекам: стратегическому и тактическому. Стратегия — сжатый контекст личности в 5000 символов: биография, цели, мотивации, таланты и паттерны, который обновляется раз в 1-2 месяца. Тактика — еженедельный спринт в Cursor/Codex, спринт-оператор по локальным репозиториям, ClickUp через MCP, где задачи создаются и декомпозируются агентом, а человек расставляет их по календарю drag-and-drop.',
    tools: 'Cursor · Codex · SendPulse · OpenAI API · ClickUp MCP',
    metric: 'Стратегия без дисциплины и дисциплина без смысла собраны в одну систему',
    artFrames: CASE_ARTS.project,
    filters: ['manager']
  },
];

const getCaseTools = (card: CaseCard) => card.tools.split(' · ').map((tool) => tool.trim()).filter(Boolean);
const getCaseFeaturedTools = (card: CaseCard) => (card.featuredTools ?? getCaseTools(card)).slice(0, 3);
const CASE_TOOL_FILTERS = ['all', ...Array.from(new Set(CASE_CARDS.flatMap((card) => getCaseTools(card))))];

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
    description: 'Системный архитектор на стыке AI, образования и бизнес-процессов. 6+ лет в образовании, 500+ обученных специалистов. Бывший CTO и директор по развитию. Ведёт контекст-инжиниринг: как структурировать знания, чтобы AI работал с ними, а не терялся в хаосе файлов и заметок.',
    image: speakerImage('sergey-khabarov.jpg'),
  },
  {
    name: 'Степан Гершуни',
    role: 'Технологический стратег',
    description: 'Фаундер, построил Credentia, Deep Skills и Codex Town. Инвестор в венчурном фонде Cyber Fund, крипто- и ИИ-энтузиаст. Автор cybOS, о которой и расскажет на лаборатории на advanced-треке.',
    image: speakerImage('stepan-gershuni.jpg'),
  },
  {
    name: 'Алексей Иванов',
    role: 'Экзекьютив-коуч',
    description: 'Экзекьютив-коуч для фаундеров и IT-лидеров. ICF PCC, экс-дизайн лид. После 15 лет в UX и продуктах делает то, что действительно даёт энергию и драйв. Ведёт advanced-трек AI-coaching.',
    image: speakerImage('alexey-ivanov.jpg'),
  },
  {
    name: 'Серёжа Рис',
    role: 'AI-евангелист, экс-Yandex',
    description: 'AI-евангелист, экс-Yandex. Билдер и фаундер в комьюнити вайбкодеров @vibecod3rs. Клод-код стример на YouTube. Ведёт advanced-трек vibe-coding.',
    image: speakerImage('serezha-ris.jpg'),
  },
  {
    name: 'Анна Ставенски',
    role: 'Продуктовый архитектор',
    description: 'Продуктовый архитектор. 10+ лет в управлении, технологических и креативных индустриях: продукт, визуал, роботы, тренажёры. PO в стартапах и визуальный сторителлер в жизни. Ведёт life engineering и помогает собрать изученные инструменты в единую систему.',
    image: speakerImage('anka-stavenski.jpg'),
  },
  {
    name: 'Анна Лозицкая',
    role: 'Фаундер embraceme.app',
    description: '12+ лет помогала стартапам расти с нуля до больших раундов. Фаундер embraceme.app. Исследует, как технологии помогают основателям. Ведёт mind engineering: как использовать AI для персональных ритуалов, рефлексии и трекинга целей.',
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

const EditorialSectionHeader = ({
  eyebrow,
  title,
  className = "",
  titleAddon,
}: {
  eyebrow: string;
  title: string;
  className?: string;
  titleAddon?: React.ReactNode;
}) => (
  <div className={`flex items-end gap-3 md:gap-10 ${className}`}>
    <div className="text-[10px] md:text-[13px] font-bold uppercase tracking-[0.2em] opacity-40 shrink-0 mb-[0.15rem] md:mb-[0.25rem]">{eyebrow}</div>
    <div className="h-px min-w-[20px] flex-1 bg-black/10 mb-[0.45rem] md:mb-[0.75rem]" />
    <div className="flex shrink-0 items-center gap-2 md:gap-3">
      {titleAddon}
      <div className="font-black uppercase tracking-widest text-xl md:text-5xl/none text-right">{title}</div>
    </div>
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

const getPhilosophyPillarArtShellClassName = (art: 'foundation' | 'action' | 'synergy' | 'trajectory') => {
  if (art === 'action') return "translate-y-[2%] md:translate-y-[1%]";
  if (art === 'trajectory') return "translate-y-[1%] md:translate-y-[1%]";
  if (art === 'synergy') return "translate-y-[1%] md:translate-y-[1%]";
  return "translate-y-[1%] md:translate-y-[1%]";
};

const getPhilosophyPillarArtImageClassName = (art: 'foundation' | 'action' | 'synergy' | 'trajectory') => {
  if (art === 'action') return "h-full w-full origin-center object-contain object-center translate-y-[2%] md:translate-y-[8%] scale-[1.04] md:scale-[1.1]";
  if (art === 'trajectory') return "h-full w-full origin-center object-contain object-center translate-y-[1%] md:translate-y-[5%] scale-[1.03] md:scale-[1.08]";
  if (art === 'synergy') return "h-full w-full origin-center object-contain object-center scale-[1.04] md:scale-[1.1]";
  return "h-full w-full origin-center object-contain object-center scale-[1.02] md:scale-[1.08]";
};

const PhilosophyPillarArt = ({
  art,
  deferHeavyMedia = false,
}: {
  art: 'foundation' | 'action' | 'synergy' | 'trajectory';
  deferHeavyMedia?: boolean;
}) => {
  const src =
    art === 'synergy'
      ? philosophyAnimation('philosophy-community-morph-0-3.svg')
      : art === 'action'
        ? philosophyAnimation('philosophy-practice-morph-7-2.svg')
        : art === 'trajectory'
          ? philosophyAnimation('philosophy-personalization-morph-0-2.svg')
          : null;

  if (src && !deferHeavyMedia) {
    return (
      <div className={cn("flex h-full w-full items-center justify-center overflow-hidden", getPhilosophyPillarArtShellClassName(art))}>
        <img
          src={src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className={cn(
            "block max-h-full max-w-full transition-transform duration-300",
            getPhilosophyPillarArtImageClassName(art),
          )}
        />
      </div>
    );
  }

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
  { day: 'ПН', label: 'MAIN ВОРКШОП', type: 'workshop' as const, time: '18:00 CET' },
  { day: 'ВТ', label: 'КОВОРКИНГ', type: 'coworking' as const, time: '' },
  { day: 'СР', label: 'ADVANCED TRACK', type: 'advanced' as const, time: '18:00 CET' },
  { day: 'ЧТ', label: '', type: 'off' as const },
  { day: 'ПТ', label: 'ЛЕКЦИЯ', type: 'lecture' as const, time: '' },
  { day: 'СБ', label: 'Q&A СЕССИЯ', type: 'qna' as const, time: '18:00 CET' },
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
  const isTouchMobileViewport = useMediaQuery(TOUCH_MOBILE_VIEWPORT_QUERY);
  const metaTagClass = 'font-mono text-[8px] md:text-[10px] tracking-[0.14em] font-bold text-black/46';
  const metaTrackClass = `${metaTagClass} inline-flex items-center gap-1.5`;

  const toggleCard = (idx: number) => {
    setExpandedIndexes((prev) => {
      const alreadyOpen = prev.includes(idx);
      let next: number[];

      if (allowMultipleDesktop && !isTouchMobileViewport) {
        next = alreadyOpen ? prev.filter((value) => value !== idx) : [...prev, idx];
      } else {
        next = alreadyOpen ? [] : [idx];
      }

      if (next.includes(idx) && !alreadyOpen && !isTouchMobileViewport) {
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
      target?.scrollIntoView({ behavior: isTouchMobileViewport ? 'auto' : 'smooth', block: 'center' });
    }, 220);
  }, [focusAdvancedOnForce, forcedOpenIndex, forcedOpenNonce, isTouchMobileViewport]);

  const mobileWeeklyRhythmRows = [PROGRAM_WEEKLY_RHYTHM.slice(0, 4), PROGRAM_WEEKLY_RHYTHM.slice(4)];

  const renderWeeklyRhythmCell = (
    day: (typeof PROGRAM_WEEKLY_RHYTHM)[number],
    key: string,
    options?: { mobile?: boolean },
  ) => {
    const isWorkshop = day.type === 'workshop';
    const isAdvanced = day.type === 'advanced';
    const isOff = day.type === 'off';
    const labelTone = isWorkshop || isAdvanced ? 'text-[9px] text-white' : isOff ? 'text-[9px] opacity-0' : 'text-[8.5px] text-black/80';

    return (
      <div
        key={key}
        className={cn(
          "min-w-0 flex flex-col px-1.5 pt-2 pb-[3px] relative transition-colors",
          options?.mobile ? "h-[68px] -mr-px border last:mr-0" : "h-[46px]",
          options?.mobile
            ? isOff
              ? "w-[1.85rem]"
              : "w-[4.35rem]"
            : "",
          isWorkshop
            ? "bg-[#8DC63F] border-[#8DC63F] text-white"
            : isAdvanced
              ? "bg-black border-black text-white"
              : isOff
                ? "bg-black/[0.05] border-black/10 text-black/36"
                : "bg-white border-black/12 text-black/72"
        )}
      >
        <div className="flex flex-col items-start mb-0">
          <span className={cn("text-[8.5px] font-mono font-black tracking-widest leading-none", isWorkshop ? "text-white/80" : isAdvanced ? "text-white/60" : "text-black/40")}>
            {day.day}
          </span>
          {day.time ? (
            <div className={cn("mt-[3px] whitespace-nowrap font-mono text-[7px] font-bold tracking-[0.12em] leading-[1.15]", isWorkshop ? "text-white/80" : "text-[#8DC63F]")}>
              {day.time}
            </div>
          ) : null}
        </div>
        <div
          className={cn(
            "mt-auto flex min-h-[1.9rem] min-w-0 flex-col justify-end text-left font-sans font-black uppercase leading-[0.92] tracking-tight [overflow-wrap:normal] [word-break:normal] [hyphens:none]",
            labelTone,
          )}
        >
          {day.label.includes(' ')
            ? day.label.split(' ').map((word, wordIndex) => (
                <span key={`${key}-${wordIndex}`} className="block whitespace-nowrap">
                  {word}
                </span>
              ))
            : day.label || ' '}
        </div>
      </div>
    );
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
                      initial={isTouchMobileViewport ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={isTouchMobileViewport ? { duration: 0 } : { duration: 0.38, ease: 'easeInOut' }}
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
                              <div className="md:hidden">
                                {mobileWeeklyRhythmRows.map((row, rowIndex) => (
                                  <div key={`${track.id}-mobile-rhythm-row-${rowIndex}`} className={cn("flex w-fit max-w-full bg-transparent", rowIndex === 0 ? "-mb-px" : "")}>
                                    {row.map((day) => renderWeeklyRhythmCell(day, `${track.id}-mobile-${day.day}`, { mobile: true }))}
                                  </div>
                                ))}
                              </div>
                              <div className="hidden md:grid md:w-full md:max-w-[min(100%,28rem)] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.5fr)] md:gap-1.5">
                                {PROGRAM_WEEKLY_RHYTHM.map((day) => renderWeeklyRhythmCell(day, `${track.id}-desktop-${day.day}`))}
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
                              className={`relative rounded-[16px] p-4 ${
                                advancedColorway === 'violet'
                                  ? 'bg-[#181616] text-white'
                                  : lighterAdvancedBackground
                                    ? 'bg-[#181616] text-white'
                                    : 'bg-[#181616] text-white'
                              }`}
                            >
                              <div className="mb-1.5 flex justify-end items-center gap-1.5 font-mono text-[8px] md:text-[10px] tracking-[0.14em] font-bold text-white/46">
                                <span className="text-[10px] leading-none text-[#8DC63F] font-bold">*</span>
                                <span>{combinedAdvancedLabel ? 'Advanced Track Pro' : 'Advanced Track'}</span>
                              </div>
                              <div className="text-[8px] font-bold uppercase tracking-[0.16em] text-white/26 mb-0.5">Тема</div>
                              <div className={`font-semibold ${mutedAdvanced ? 'text-[12px] text-white/72' : 'text-[21px] md:text-[23px] leading-[1.02] text-white'}`}>
                                {weekCopy.advancedTopic}
                              </div>
                              <p className={`leading-[1.42] mt-1 ${mutedAdvanced ? 'text-[10px] text-white/52' : 'text-[12px] md:text-[13px] text-white/62'}`}>
                                {weekCopy.advancedDescription}
                              </p>
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
      className="absolute inset-y-0 right-0 w-[320px] rounded-[24px] border border-black/7 bg-[#f3f4f4] p-4 md:p-5 text-right min-h-[154px] flex flex-col justify-start"
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

            <div className="relative z-10 pr-[340px]">
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

const DesktopTechUiV5 = ({
  forcedOpenIndex,
  forcedOpenNonce,
}: {
  forcedOpenIndex?: number;
  forcedOpenNonce?: number;
}) => {
  const [activeWeek, setActiveWeek] = useState(0);
  const [stickyPanelHeight, setStickyPanelHeight] = useState(580);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyPanelRef = useRef<HTMLDivElement>(null);
  const wheelGestureRef = useRef<{
    gestureLocked: boolean;
    resetTimeout: number | null;
    lastDirection: number;
  }>({
    gestureLocked: false,
    resetTimeout: null,
    lastDirection: 0,
  });
  const pendingSnapRef = useRef<{ week: number; targetY: number } | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 40, stiffness: 80, restDelta: 0.001 });
  const svgRotate = useTransform(smoothProgress, [0, 1], [-5, 15]);
  const svgY = useTransform(smoothProgress, [0, 1], [-10, 10]);
  const lastWeekIndex = PROGRAM_TRACKS.length - 1;
  const stickyTopOffset = 0.08;
  const snapStep = Math.max(180, Math.round(stickyPanelHeight * 0.38));
  const containerHeight = stickyPanelHeight + snapStep * lastWeekIndex;

  useEffect(() => {
    if (!stickyPanelRef.current) return;

    const measure = () => {
      const nextHeight = Math.round(stickyPanelRef.current?.getBoundingClientRect().height ?? 580);
      if (Number.isFinite(nextHeight) && nextHeight > 0) {
        setStickyPanelHeight((current) => (current === nextHeight ? current : nextHeight));
      }
    };

    measure();

    const observer = new ResizeObserver(() => {
      measure();
    });

    observer.observe(stickyPanelRef.current);
    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const getStickyMetrics = React.useCallback(() => {
    const stickyTop = window.innerHeight * stickyTopOffset;
    const effectivePanelHeight = stickyPanelRef.current?.getBoundingClientRect().height ?? stickyPanelHeight;
    return {
      stickyTop,
      stickyPanelHeight: effectivePanelHeight,
      stickyBottom: stickyTop + effectivePanelHeight,
      tolerance: Math.max(12, Math.round(snapStep * 0.12)),
    };
  }, [snapStep, stickyPanelHeight]);

  const resolveWeekIndexFromRect = React.useCallback((rect: DOMRect) => {
    const { stickyTop, stickyBottom } = getStickyMetrics();

    if (rect.top > stickyTop) return 0;
    if (rect.bottom < stickyBottom) return lastWeekIndex;

    const offsetWithinProgram = Math.max(0, stickyTop - rect.top);
    return Math.max(0, Math.min(lastWeekIndex, Math.round(offsetWithinProgram / snapStep)));
  }, [getStickyMetrics, lastWeekIndex, snapStep]);

  const getWeekTargetY = React.useCallback((idx: number) => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const { stickyTop } = getStickyMetrics();
    const containerTop = window.scrollY + rect.top;
    const desiredRectTop = stickyTop - snapStep * idx;
    return containerTop - desiredRectTop;
  }, [getStickyMetrics, snapStep]);

  const syncWeekFromScroll = React.useCallback(() => {
    if (!containerRef.current) return;
    const pendingSnap = pendingSnapRef.current;
    if (pendingSnap) {
      if (Math.abs(window.scrollY - pendingSnap.targetY) > 6) return;
      pendingSnapRef.current = null;
    }
    const nextWeek = resolveWeekIndexFromRect(containerRef.current.getBoundingClientRect());
    setActiveWeek((current) => (current === nextWeek ? current : nextWeek));
  }, [resolveWeekIndexFromRect]);

  const navigateToWeek = React.useCallback((idx: number, behavior: ScrollBehavior = 'auto') => {
    const clampedIndex = Math.max(0, Math.min(idx, PROGRAM_TRACKS.length - 1));
    const targetY = getWeekTargetY(clampedIndex);

    if (targetY === null) return;

    pendingSnapRef.current = { week: clampedIndex, targetY };
    setActiveWeek(clampedIndex);
    window.scrollTo({ top: targetY, behavior });
    window.requestAnimationFrame(syncWeekFromScroll);
  }, [getWeekTargetY, syncWeekFromScroll]);

  useEffect(() => {
    if (forcedOpenNonce === undefined || forcedOpenIndex === undefined) return;
    navigateToWeek(forcedOpenIndex, 'auto');
  }, [forcedOpenIndex, forcedOpenNonce, navigateToWeek]);

  const handleWeekClick = (idx: number) => {
    navigateToWeek(idx, 'auto');
  };

  useEffect(() => {
    syncWeekFromScroll();

    const handleScroll = () => {
      syncWeekFromScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [syncWeekFromScroll]);

  useEffect(() => {
    const gestureState = wheelGestureRef.current;

    const clearWheelReset = () => {
      if (gestureState.resetTimeout !== null) {
        window.clearTimeout(gestureState.resetTimeout);
        gestureState.resetTimeout = null;
      }
    };

    const resetWheelGesture = () => {
      gestureState.gestureLocked = false;
      gestureState.lastDirection = 0;
      clearWheelReset();
    };

    const handleWheel = (event: WheelEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const { stickyTop, stickyBottom, tolerance } = getStickyMetrics();
      const isPinnedSection = rect.top <= stickyTop + tolerance && rect.bottom >= stickyBottom - tolerance;

      if (!isPinnedSection) {
        resetWheelGesture();
        return;
      }

      const direction = Math.sign(event.deltaY);
      if (direction === 0) return;

      if (gestureState.lastDirection !== 0 && gestureState.lastDirection !== direction) {
        gestureState.gestureLocked = false;
        clearWheelReset();
      }
      gestureState.lastDirection = direction;

      const currentWeek = resolveWeekIndexFromRect(rect);
      const nextWeek = currentWeek + (direction > 0 ? 1 : -1);
      const canMoveWithinProgram = nextWeek >= 0 && nextWeek <= lastWeekIndex;
      if (!canMoveWithinProgram) {
        resetWheelGesture();
        return;
      }

      if (gestureState.gestureLocked) return;

      event.preventDefault();
      clearWheelReset();
      gestureState.gestureLocked = true;
      gestureState.resetTimeout = window.setTimeout(() => {
        gestureState.gestureLocked = false;
        gestureState.resetTimeout = null;
      }, 240);
      navigateToWeek(nextWeek, 'auto');
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      clearWheelReset();
      window.removeEventListener('wheel', handleWheel);
    };
  }, [getStickyMetrics, lastWeekIndex, navigateToWeek, resolveWeekIndexFromRect]);

  const track = PROGRAM_TRACKS[activeWeek];
  const weekCopy = PROGRAM_WEEK_COPY[track.id];

  const weeklyRhythm = [
    { day: 'ПН', time: '18:00 CET', task: 'ВОРКШОП', type: 'workshop' },
    { day: 'ВТ', time: '', task: 'КОВОРКИНГ', type: 'normal' },
    { day: 'СР', time: '18:00 CET', task: 'ADVANCED TRACK', type: 'core', advanced: true },
    { day: 'ЧТ', time: '', task: '', type: 'empty' },
    { day: 'ПТ', time: '', task: 'ЛЕКЦИЯ', type: 'normal' },
    { day: 'СБ', time: '18:00 CET', task: 'Q&A СЕССИЯ', type: 'normal' },
    { day: 'ВС', time: '', task: '', type: 'empty' },
  ];

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-[1340px] font-sans" style={{ height: `${containerHeight}px` }}>
      <div ref={stickyPanelRef} className="sticky top-[8vh] flex flex-col items-center">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-[6px] items-stretch justify-center h-[580px] w-full pt-12">
          <div className="w-[146px] shrink-0 flex flex-col relative h-[500px] mt-6">
            <div className="absolute left-[11.5px] top-[40px] bottom-[40px] w-[1px] bg-black/20 z-0 pointer-events-none" />
            <div className="flex-1 flex flex-col w-[146px] gap-2">
              {PROGRAM_TRACKS.map((t, idx) => {
                const isActive = activeWeek === idx;
                return (
                  <button
                    key={`v5-st-ref-${t.id}`}
                    onClick={() => handleWeekClick(idx)}
                    className="flex-1 w-full flex items-center gap-4 group text-left relative z-10 transition-colors hover:bg-black/[0.04] rounded-[2px] -ml-3 pl-3 pr-5 cursor-pointer"
                  >
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center transition-all shrink-0 z-10",
                        isActive ? "bg-black border border-black shadow-[rgba(0,0,0,0.1)_0_4px_12px]" : "bg-white border border-black/20 group-hover:border-black/40"
                      )}
                    >
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div className="flex flex-col">
                      <div className={cn("text-[10px] font-mono font-bold uppercase transition-colors mb-0.5", isActive ? "text-black" : "text-black/40 group-hover:text-black/60")}>НЕДЕЛЯ</div>
                      <div className={cn("text-lg font-black tracking-tighter leading-none transition-colors", isActive ? "text-black" : "text-black/20 group-hover:text-black/40")}>0{idx + 1}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="w-[118px] flex items-center gap-2 p-2 border border-black/10 rounded-[2px] bg-[#f9f9f7] text-left relative z-10 opacity-70 mt-1 mb-8">
              <div className="flex flex-col">
                <div className="text-[8.5px] font-mono font-bold uppercase text-black/60 mb-0.5 tracking-wider">FINAL</div>
                <div className="text-[10px] font-black tracking-widest leading-none text-black/90">DEMO DAY</div>
              </div>
            </div>
          </div>

          <div className="flex-1 border border-black/15 shadow-[0_10px_40px_rgba(0,0,0,0.02)] relative overflow-hidden flex flex-col pt-12 max-w-[960px] bg-white rounded-none">
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03] z-10 bg-white"
              style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }}
            />
            <motion.div
              animate={{ scale: activeWeek === 3 ? 1.05 : 0.82, opacity: activeWeek === 3 ? 0.45 : 0.35, top: activeWeek === 3 ? "-10%" : "0%" }}
              style={{ rotate: svgRotate, y: svgY }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-[-40px] w-[740px] h-[740px] pointer-events-none mix-blend-multiply z-0 flex justify-center"
            >
              <MorphSvg week={activeWeek} />
            </motion.div>

            <div className="absolute inset-y-0 right-0 z-20 hidden w-[288px] border-l border-white/10 bg-black lg:block">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`v5-restore-adv-crossfade-${activeWeek}`}
                  initial={{ opacity: 0, x: 20, filter: "blur(12px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -20, filter: "blur(12px)" }}
                  transition={{ duration: 0.75, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute inset-0 flex h-full w-full flex-col items-start p-10 pt-[8.5rem] pb-[6.5rem]"
                >
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="text-sm text-white leading-none">✻</span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/60">ADVANCED TRACK</span>
                  </div>
                  <div className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-[0.85] mb-6 max-w-[280px]" style={{ color: '#ffffff' }}>
                    {weekCopy.advancedTopic}
                  </div>
                  <p className="text-sm leading-[1.6] text-white/60 font-medium max-w-[260px] pb-10">
                    {weekCopy.advancedDescription}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative z-30 flex flex-col flex-1 pl-12 pr-0 pb-0">
              <div className="flex items-center justify-between mb-4 h-6 pr-12">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-[1px] bg-black/80 shadow-sm" />
                  <span className="text-black/80 text-[10px] font-mono font-bold uppercase tracking-[0.25em] leading-none">MAIN TRACK</span>
                </div>
                <div className="w-[288px] h-full" />
              </div>

              <div className="relative flex flex-1 flex-col lg:pr-[288px]">
                <div className="flex-1 min-w-0 relative pr-10 pb-12 flex flex-col">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={`v5-blur-crossfade-${activeWeek}`}
                      initial={{ opacity: 0, filter: "blur(12px)", scale: 0.98 }}
                      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                      exit={{ opacity: 0, filter: "blur(12px)", scale: 1.02 }}
                      transition={{ duration: 0.75, ease: [0.32, 0.72, 0, 1] }}
                      className="flex flex-col pt-0 h-full w-full"
                    >
                      <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85] text-black mb-4 max-w-[540px]">
                        {track.title}
                      </h2>
                      <div className="text-[#8DC63F] font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                        {weekCopy.framedDescription}
                      </div>
                      <p className="text-sm leading-[1.6] text-black/80 font-medium max-w-[440px] mb-8">
                        {weekCopy.bodyDescription}
                      </p>
                      <div className="mt-auto relative z-10">
                        <div className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-black/80 mb-4 ml-1 flex items-center gap-2">
                          <span>НЕДЕЛЬНЫЙ РИТМ</span>
                          <span className="text-black/60 font-medium tracking-widest lowercase px-1.5 py-[2px] rounded-[4px] bg-white/40 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.7)] border border-white/50">
                            11—17 ноября 2024
                          </span>
                        </div>
                        <div className="grid w-full max-w-[636px] grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.42fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.42fr)] border border-black/10 bg-black/10 gap-px rounded-[1px] overflow-hidden shadow-none">
                          {weeklyRhythm.map((item, idx) => {
                            const isWorkshop = item.type === 'workshop';
                            const isCore = item.type === 'core';
                            const isEmpty = item.type === 'empty';
                            const displayTask = isWorkshop ? "MAIN ВОРКШОП" : item.task;
                            return (
                              <div
                                key={`cal-redesign-${idx}`}
                                className={cn(
                                  "min-w-0 flex flex-col px-1.5 pt-2 pb-[3px] relative transition-colors h-[68px] xl:px-2",
                                  isWorkshop ? "bg-[#8DC63F]" : isCore ? "bg-black" : isEmpty ? "bg-white/80 backdrop-blur-sm" : "bg-white"
                                )}
                              >
                                <div className="flex flex-col items-start mb-0">
                                  <span className={cn("text-[8.5px] font-mono font-black tracking-widest leading-none", isWorkshop ? "text-white/80" : isCore ? "text-white/60" : "text-black/40")}>{item.day}</span>
                                  {item.time && <div className={cn("mt-[3px] whitespace-nowrap font-mono text-[7px] font-bold tracking-[0.12em] leading-[1.15] xl:text-[7.5px] xl:tracking-widest", isWorkshop ? "text-white/80" : "text-[#8DC63F]")}>{item.time}</div>}
                                </div>
                                <div
                                  className={cn(
                                  "mt-auto flex min-h-[1.9rem] min-w-0 flex-col justify-end text-left font-sans font-black uppercase leading-[0.92] tracking-tight [overflow-wrap:normal] [word-break:normal] [hyphens:none]",
                                  isWorkshop || isCore ? "text-[9px] text-white xl:text-[10px] xl:tracking-[0.02em]" :
                                  isEmpty ? "text-[9px] opacity-0 xl:text-[10px]" : "text-[8.5px] text-black/80 xl:text-[9.5px]"
                                )}
                              >
                                  {displayTask.includes(' ')
                                    ? displayTask.split(' ').map((w, i) => <span key={i} className="block whitespace-nowrap">{w}</span>)
                                    : displayTask}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex w-full max-w-[1060px] justify-end pr-0 lg:pr-6">
          <p className="max-w-[23rem] text-left text-sm font-medium leading-[1.45] text-black/60">
            <span className="mr-1.5 font-bold">*</span>
            {PROGRAM_TRACKS_CAPTION}
          </p>
        </div>
      </div>
    </div>
  );
};

const AsciiCaseArt = ({ frames, className = "" }: { frames: string[]; className?: string }) => {
  const frame = frames[0];

  return (
    <>
      <pre className={cn(
        "md:hidden font-mono text-[7.5px] leading-[1.2] whitespace-pre bg-transparent font-light transition-opacity duration-300",
        className
      )}>
        {frame}
      </pre>
      <div className={cn(
        "hidden md:block font-mono text-[7px] leading-[1.2] whitespace-pre bg-transparent font-light",
        className
      )}>
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
    </>
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
        <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="group block border border-black/10 px-4 py-3 w-48 hover:border-black transition-colors bg-white">
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
type PricingPlan = {
  name: string;
  price: string;
  tag: string;
  tagHref?: string;
  highlight?: boolean;
  desc: React.ReactNode;
  features: React.ReactNode[];
  more: React.ReactNode[];
};

  const pricingPlans: PricingPlan[] = [
    {
      name: 'MAIN LAB',
      price: '590',
      tag: 'БАЗА',
      features: [
        <><strong>4 воркшопа</strong>, 4 коворкинга, 4 Q&A-сессии и гостевые лекции</>,
        <>закрытый чат участников</>,
        <>программа</>,
      ],
      desc: <>базовый формат для самостоятельной работы</>,
      more: [
        <>доступ к библиотеке материалов</>,
        <>возврат после первой недели без вопросов</>,
      ]
    },
    {
      name: 'ADVANCED',
      price: '890',
      tag: '+4 ЗАНЯТИЯ',
      highlight: true,
      features: [
        <>всё из MAIN LAB</>,
        <><strong>4 дополнительных занятия</strong></>,
        <>дополнительный чат advanced-участников</>,
        <>еженедельные закрытые разборы</>,
        <>приоритетная обратная связь</>,
      ],
      desc: <>углублённый формат для личных кейсов</>,
      more: [
        <>углубление в личные кейсы и доменные задачи</>,
      ]
    },
    {
      name: 'PREMIUM',
      price: '1490',
      tag: 'СВОЙ МАРШРУТ',
      features: [
        <>всё из ADVANCED</>,
        <><strong>индивидуальный маршрут</strong></>,
        <>приоритетная поддержка</>,
        <>персональный канал связи</>,
      ],
      desc: <>персональный формат под ваш контекст</>,
      more: [
        <>персональная стратегия под ваш контекст</>,
        <>фокус на реальные бизнес-задачи</>,
      ]
    },
  ];


export default function LabW26PageV3() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [labsDropdownOpen, setLabsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMobileCaseIndex, setActiveMobileCaseIndex] = useState<number | null>(null);
  const [theme, setTheme] = useState<'winter' | 'spring'>('winter');
  const [activeMindsetQuote, setActiveMindsetQuote] = useState(0);
  const [activePaymentPlan, setActivePaymentPlan] = useState<{ name: string; price: string } | null>(null);
  const [showPricingCue, setShowPricingCue] = useState(false);
  const [programFocusNonce, setProgramFocusNonce] = useState<number | undefined>(undefined);
  const [activeCaseFilter, setActiveCaseFilter] = useState('all');
  const [activeCaseToolFilter, setActiveCaseToolFilter] = useState('all');
  const [isCasesOverlayOpen, setIsCasesOverlayOpen] = useState(false);
  const [activeCaseIndex, setActiveCaseIndex] = useState<number | null>(null);
  const [hoveredCaseState, setHoveredCaseState] = useState<{ index: number; nonce: number } | null>(null);
  const [hoveredOverlayCaseState, setHoveredOverlayCaseState] = useState<{ index: number; nonce: number } | null>(null);
  const [playingCaseVideoKey, setPlayingCaseVideoKey] = useState<string | null>(null);
  const [activeMobileSpeakerIndex, setActiveMobileSpeakerIndex] = useState<number | null>(null);
  const [activeMobileSpeakerRowIndex, setActiveMobileSpeakerRowIndex] = useState<number | null>(null);
  const [activePageSectionId, setActivePageSectionId] = useState<string>('hero');
  const isTouchMobileViewport = useMediaQuery(TOUCH_MOBILE_VIEWPORT_QUERY);
  const isMdViewport = useMediaQuery(MD_VIEWPORT_QUERY);
  const isLgViewport = useMediaQuery(LG_VIEWPORT_QUERY);
  const paymentPopupVariant = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('payment')
    : null;
  const PaymentPopupComponent = paymentPopupVariant === 'dark'
    ? PricingPaymentPopupDark
    : paymentPopupVariant === 'v2'
      ? PricingPaymentPopupNeon
      : paymentPopupVariant === 'v3'
        ? PricingPaymentPopupDataline
        : paymentPopupVariant === 'v5'
        ? PricingPaymentPopupDatalineBold
        : paymentPopupVariant === 'v6'
          ? PricingPaymentPopupDatalineHeader
          : paymentPopupVariant === 'v7' || paymentPopupVariant === null
            ? (props: React.ComponentProps<typeof PricingPaymentPopupDatalineHeader>) => (
                <PricingPaymentPopupDatalineHeader {...props} presentation="v7" />
              )
            : PricingPaymentPopupDataline;
  const [philosophySectionRef, shouldLoadPhilosophyMedia] = useNearViewport<HTMLDivElement>(isTouchMobileViewport ? '900px 0px' : '200px 0px');
  const [mindsetArtRef, shouldLoadMindsetArt] = useNearViewport<HTMLDivElement>(isTouchMobileViewport ? '700px 0px' : '200px 0px');
  const mobileCaseCardRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const labsCloseTimeoutRef = useRef<number | null>(null);
  const sectionHashSyncLockRef = useRef<number | null>(null);
  const lastSyncedHashRef = useRef<string>('');
  const pendingMenuScrollTargetRef = useRef<string | null>(null);
  const bodyOverflowRestoreRef = useRef<string | null>(null);

  useEffect(() => {
    const isModalOpen = isMenuOpen || isCasesOverlayOpen || activeCaseIndex !== null;
    const body = document.body;

    if (isModalOpen) {
      if (bodyOverflowRestoreRef.current === null) {
        const scrollY = window.scrollY;
        bodyOverflowRestoreRef.current = scrollY.toString();
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.width = '100%';
        body.style.overflowY = 'scroll'; 
      }
    } else {
      if (bodyOverflowRestoreRef.current !== null) {
        const scrollY = parseInt(bodyOverflowRestoreRef.current, 10);
        body.style.position = '';
        body.style.top = '';
        body.style.width = '';
        body.style.overflowY = '';
        bodyOverflowRestoreRef.current = null;
        window.requestAnimationFrame(() => {
          window.scrollTo(0, scrollY);
        });
      }
    }
  }, [activeCaseIndex, isCasesOverlayOpen, isMenuOpen]);

  useEffect(() => {
    setPlayingCaseVideoKey(null);
  }, [activeCaseIndex]);

  useEffect(() => {
    if (isMenuOpen) return;
    const pendingTarget = pendingMenuScrollTargetRef.current;
    if (!pendingTarget) return;

    pendingMenuScrollTargetRef.current = null;
    const timeout = window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        scrollTo(pendingTarget);
      });
    }, 0);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isMenuOpen, isTouchMobileViewport]);

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
      if (sectionHashSyncLockRef.current !== null) {
        window.clearTimeout(sectionHashSyncLockRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!showPricingCue) return;
    const timeout = window.setTimeout(() => {
      setShowPricingCue(false);
    }, 2200);
    return () => window.clearTimeout(timeout);
  }, [showPricingCue]);

  useEffect(() => {
    const lockSectionHashSync = (duration = 900) => {
      if (sectionHashSyncLockRef.current !== null) {
        window.clearTimeout(sectionHashSyncLockRef.current);
      }
      sectionHashSyncLockRef.current = window.setTimeout(() => {
        sectionHashSyncLockRef.current = null;
      }, duration);
    };

    const scrollToHashTarget = (behavior: ScrollBehavior) => {
      const hash = window.location.hash;
      if (!hash) return;
      lastSyncedHashRef.current = hash;
      setActivePageSectionId(hash.slice(1));
      window.requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior, block: 'start' });
      });
    };

    const handleHashChange = () => {
      lockSectionHashSync();
      scrollToHashTarget(isTouchMobileViewport ? 'auto' : 'smooth');
    };

    scrollToHashTarget('auto');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isTouchMobileViewport]);

  useEffect(() => {
    if (isTouchMobileViewport) return;

    let ticking = false;

    const syncHashToVisibleSection = () => {
      ticking = false;
      if (sectionHashSyncLockRef.current !== null) return;

      const threshold = Math.min(220, window.innerHeight * 0.28);
      let activeSectionId: string | null = null;
      let nearestSectionId: string | null = null;
      let nearestDistance = Number.POSITIVE_INFINITY;

      for (const id of PAGE_SECTION_HASH_IDS) {
        const element = document.getElementById(id);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top - threshold);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestSectionId = id;
        }

        if (rect.top <= threshold && rect.bottom > threshold) {
          activeSectionId = id;
        }
      }

      const nextSectionId = activeSectionId ?? nearestSectionId;
      if (!nextSectionId) return;

      const nextHash = `#${nextSectionId}`;
      if (lastSyncedHashRef.current === nextHash && window.location.hash === nextHash) return;

      setActivePageSectionId(nextSectionId);
      lastSyncedHashRef.current = nextHash;
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${nextHash}`);
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(syncHashToVisibleSection);
    };

    syncHashToVisibleSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isTouchMobileViewport]);

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

  const filteredCases = CASE_CARDS
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => activeCaseFilter === 'all' || card.filters.includes(activeCaseFilter))
    .filter(({ card }) => activeCaseToolFilter === 'all' || getCaseTools(card).includes(activeCaseToolFilter));
  const visibleCases = filteredCases.slice(0, 8);
  const displayedCases = isTouchMobileViewport ? visibleCases.slice(0, 4) : visibleCases;
  const activeCase = activeCaseIndex === null ? null : CASE_CARDS[activeCaseIndex];
  const activeCaseVisualIndex = activeCaseIndex ?? 0;

  useEffect(() => {
    setActiveMobileCaseIndex(null);
  }, [isTouchMobileViewport, visibleCases]);

  const renderCaseMediaPanel = ({
    index,
    mode,
    animate = false,
    activated = false,
    animateNonce = 0,
  }: {
    index: number;
    mode: 'card' | 'modal';
    animate?: boolean;
    activated?: boolean;
    animateNonce?: number;
  }) => {
    const isCompact = mode === 'card';

    if (!isMdViewport || isTouchMobileViewport) {
      return (
        <div
          className={cn(
            "relative flex items-center justify-center overflow-hidden rounded-[2px] z-0",
            isCompact ? "h-[118px]" : "h-[14rem]",
            CASE_MEDIA_BASE_BACKGROUND_CLASS
          )}
        >
          {/* Grid mesh and green glows are inside the above class */}
          <div className="absolute inset-[10%] flex items-center justify-center z-10 scale-[2.0]">
            <CaseVisualGraphic
              index={index}
              className={getCaseVisualToneClassName(index)}
              animate={false}
              activated
            />
          </div>
        </div>
      );
    }

    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-[2px]",
          isCompact ? "h-[118px] md:h-[100px]" : "h-[14rem] md:h-full md:min-h-[24rem]",
          isCompact
            ? activated
              ? "bg-[#8DC63F]"
              : cn(CASE_MEDIA_BASE_BACKGROUND_CLASS, "md:group-hover:bg-[#8DC63F]")
            : CASE_DARK_VARIANTS.has(index)
              ? CASE_MEDIA_BASE_BACKGROUND_CLASS
              : "bg-white",
        )}
      >
        <div
          className={cn(
            "absolute inset-0",
            isCompact
              ? activated
                ? "opacity-0"
                : "md:group-hover:opacity-0"
              : "",
            mode === 'modal'
              ? CASE_DARK_VARIANTS.has(index)
                ? CASE_MEDIA_BASE_BACKGROUND_CLASS
                : "bg-[linear-gradient(90deg,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:18px_18px]"
              : CASE_MEDIA_BASE_BACKGROUND_CLASS,
          )}
        />

        {mode === 'card' && CASE_DARK_VARIANTS.has(index) ? (
          <>
            <div className={cn("absolute inset-x-3 top-[2rem] h-[0.5px] bg-white/12", activated ? "opacity-0" : "md:group-hover:opacity-0")} />
            <div className={cn("absolute bottom-1 left-3 h-12 w-20 bg-[#b7ff6a]/18 blur-[28px]", activated ? "opacity-0" : "md:group-hover:opacity-0")} />
            <div className={cn("absolute right-2 top-4 h-10 w-12 bg-[#d7ff9a]/10 blur-[24px]", activated ? "opacity-0" : "md:group-hover:opacity-0")} />
          </>
        ) : null}

        <div
          className={cn(
            "absolute",
            getCaseVisualFrameClassName(index),
            mode === 'modal'
              ? CASE_DARK_VARIANTS.has(index)
                ? "mix-blend-screen opacity-100"
                : "mix-blend-multiply opacity-82"
              : activated
                ? "opacity-100 mix-blend-screen text-white"
                : cn("opacity-100 mix-blend-screen md:group-hover:text-white", getCaseVisualColorClassName(index)),
          )}
        >
          <CaseVisualGraphic
            index={index}
            className={getCaseVisualToneClassName(index)}
            animate={mode === 'card' ? animate : false}
            activated={mode === 'card' ? activated : false}
            animateNonce={animateNonce}
          />
        </div>

        {mode === 'card' && CASE_DARK_VARIANTS.has(index) ? (
          <>
            <div className={cn("absolute left-[14%] top-[48%] h-12 w-24 -translate-y-1/2 bg-[#d8ff90]/10 blur-[30px]", activated ? "opacity-0" : "md:group-hover:opacity-0")} />
            <div className={cn("absolute right-[12%] top-[24%] h-10 w-16 bg-[#d8ff90]/8 blur-[22px]", activated ? "opacity-0" : "md:group-hover:opacity-0")} />
          </>
        ) : null}
      </div>
    );
  };

  const renderCaseProductVideo = (card: CaseCard, className?: string, frameClassName?: string) => {
    const videoStartSeconds = card.productVideoStartSeconds ?? 0;
    const videoKey = card.productVideoId ? `${card.productVideoId}-${videoStartSeconds}` : null;
    const embedUrl = card.productVideoId ? getYoutubeEmbedUrl(card.productVideoId, videoStartSeconds) : null;
    const isPlaying = videoKey !== null && playingCaseVideoKey === videoKey;

    if (!embedUrl || !card.productImageSrc || !videoKey) return null;

    return (
      <div className={cn("space-y-2", className)}>
        {isPlaying ? (
          <div
            className={cn(
              "relative aspect-video overflow-hidden rounded-[2px] border border-black/10 bg-black",
              frameClassName
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <iframe
              title={`Видео-фрагмент ${card.title}`}
              src={embedUrl}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setPlayingCaseVideoKey(videoKey);
            }}
            className={cn(
              "group relative block aspect-video w-full overflow-hidden rounded-[2px] border border-black/10 bg-black text-left transition-colors hover:border-black/24",
              frameClassName
            )}
            aria-label={`Смотреть видеофрагмент кейса ${card.title}`}
          >
            <img
              src={card.productImageSrc}
              alt=""
              loading="lazy"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-72 transition-transform duration-500 group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-black/36" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/50 bg-white/14 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                <CirclePlay size={30} strokeWidth={1.8} />
              </span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white">
              <span>youtube fragment</span>
            </div>
          </button>
        )}
      </div>
    );
  };

  const renderCaseProductMedia = (card: CaseCard) => {
    if (!card.productImageSrc) return null;

    return (
      <div className="flex min-h-[14rem] flex-col gap-3 md:h-full md:min-h-0">
        <figure className="relative min-h-[14rem] overflow-hidden rounded-[2px] border border-black/10 bg-[#f6f7f2] md:min-h-0 md:flex-[1.04]">
          <img
            src={card.productImageSrc}
            alt={card.productImageAlt ?? `${card.title} product screenshot`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </figure>

        {renderCaseProductVideo(card, "hidden md:flex md:min-h-0 md:flex-[0.86] md:flex-col", "md:aspect-auto md:flex-1")}
      </div>
    );
  };

  const renderCaseCard = (
    card: CaseCard,
    index: number,
    hovered: boolean,
    hoverNonce: number,
    setHovered: (
      value:
        | { index: number; nonce: number }
        | null
        | ((current: { index: number; nonce: number } | null) => { index: number; nonce: number } | null)
    ) => void,
    keyPrefix: string,
    options?: { showTools?: boolean; descriptionLines?: 2 | 3; cardRef?: (node: HTMLButtonElement | null) => void },
  ) => {
    const isMobileScrollActivated = false;
    const shouldAnimate = hovered || isMobileScrollActivated;
    const isVisualActive = shouldAnimate;

    return (
    <button
      key={`${keyPrefix}-${card.title}-${index}`}
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        setActiveCaseIndex(index);
      }}
      onPointerEnter={() => setHovered((current) => ({ index, nonce: current?.index === index ? current.nonce + 1 : 0 }))}
      onPointerLeave={() => setHovered((current) => (current?.index === index ? null : current))}
      onFocus={() => setHovered((current) => ({ index, nonce: current?.index === index ? current.nonce + 1 : 0 }))}
      onBlur={() => setHovered((current) => (current?.index === index ? null : current))}
      ref={options?.cardRef}
      className={cn(
        "group relative mx-auto flex h-full w-full flex-col overflow-hidden rounded-[2px] border px-3 pb-3 pt-2 text-left transition-all duration-300 md:min-h-[226px] md:max-w-[16.1rem]",
        isVisualActive ? "border-[#8DC63F] bg-[#8DC63F]" : "border-black/15 bg-white md:border-black/10 md:bg-white md:hover:border-[#8DC63F] md:hover:bg-[#8DC63F]",
      )}
    >
      <div className={cn("mb-4 shrink-0 md:mb-2.5 w-full overflow-hidden", !isMdViewport ? "min-h-[118px] bg-[#111411] rounded-[1px]" : "bg-transparent")}>
        {renderCaseMediaPanel({ index, mode: 'card', animate: shouldAnimate, activated: isVisualActive, animateNonce: hoverNonce })}
      </div>

      <h4 className={cn("mb-1.5 max-w-none text-[15px] font-black uppercase leading-[0.94] tracking-[-0.04em] transition-none md:max-w-[10.6rem] md:text-[15px]", isVisualActive ? "text-white" : "text-black md:group-hover:text-white")}>
        {card.title}
      </h4>

      <p className={cn(
        "mb-2 text-[12px] font-normal leading-[1.34] transition-none md:text-[12px]",
        isVisualActive ? "text-white/90" : "text-black/78 md:group-hover:text-white/90",
        options?.descriptionLines === 3 ? "min-h-[4.45rem]" : "min-h-[2.9rem]",
      )}>
        {card.desc}
      </p>

      <div className={cn("mt-auto truncate font-mono text-[11px] md:text-[10px] leading-[1.1] tracking-[0.02em] transition-none whitespace-nowrap overflow-hidden", isVisualActive ? "text-white/72" : "text-black/60 md:group-hover:text-white/72")}>
        {card.author}, {card.role.toLowerCase()}
      </div>

      {options?.showTools ? (
        <div className="mt-2 flex h-[1.65rem] items-center gap-1.5 overflow-hidden whitespace-nowrap">
          {getCaseFeaturedTools(card).map((tool) => (
            <span
              key={`${keyPrefix}-tool-${card.title}-${tool}`}
              className={cn(
                "shrink-0 rounded-[2px] border px-1.5 py-[3px] font-mono text-[8.5px] uppercase tracking-[0.12em] transition-none md:text-[9px]",
                isVisualActive
                  ? "border-white/50 bg-white/20 font-bold text-white"
                  : "border-black/10 bg-black/[0.03] text-black/70 md:group-hover:border-white/50 md:group-hover:bg-white/20 md:group-hover:font-bold md:group-hover:text-white",
              )}
            >
              {tool}
            </span>
          ))}
        </div>
      ) : null}
    </button>
    );
  };

  const cycleMindsetQuote = (direction: -1 | 1) => {
    setActiveMindsetQuote((prev) => (prev + direction + MINDSET_QUOTES.length) % MINDSET_QUOTES.length);
  };

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const el = document.querySelector(id);
    if (el) {
      if (sectionHashSyncLockRef.current !== null) {
        window.clearTimeout(sectionHashSyncLockRef.current);
      }
      sectionHashSyncLockRef.current = window.setTimeout(() => {
        sectionHashSyncLockRef.current = null;
      }, 900);
      setActivePageSectionId(id.replace(/^#/, ''));
      lastSyncedHashRef.current = id;
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${id}`);
      el.scrollIntoView({ behavior: isTouchMobileViewport ? 'auto' : 'smooth', block: 'start' });
    }
  };

  const scrollToProgramFromPricing = () => {
    setProgramFocusNonce((prev) => (prev ?? 0) + 1);
    scrollTo('#program');
  };

  const scrollToPricingWithCue = () => {
    scrollTo('#pricing');
  };

  const queueMobileMenuScroll = (id: string) => {
    pendingMenuScrollTargetRef.current = id;
    setIsMenuOpen(false);
  };

  const openMobileMenu = (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    event?.stopPropagation();
    setIsMenuOpen(true);
  };

  const closeMobileMenu = (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    event?.stopPropagation();
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

  const toggleMobileSpeaker = (index: number, rowSize: number) => {
    const rowIndex = Math.floor(index / rowSize);
    if (activeMobileSpeakerIndex === index) {
      setActiveMobileSpeakerIndex(null);
      setActiveMobileSpeakerRowIndex(null);
      return;
    }

    setActiveMobileSpeakerIndex(index);
    setActiveMobileSpeakerRowIndex(rowIndex);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden md:overflow-x-visible bg-[#f9f9f7] font-mono text-[#181616] selection:bg-[#8DC63F] selection:text-white">
      
      {/* Sidebar (Desktop) */}
      <aside className={`fixed top-0 left-0 w-full md:w-[18%] h-screen border-r border-black/10 px-10 pt-10 pb-8 z-[300] hidden md:flex flex-col bg-[#f9f9f7] transition-all duration-700 ease-in-out ${scrolled ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none -translate-x-full'}`}>
        <div className="mb-16 flex cursor-pointer items-center gap-2" onClick={() => scrollTo('#hero')}>
          <div className="relative w-8 h-8">
             <img src={LOGO_TRANSPARENT_SRC} className="absolute inset-0 h-full w-full object-contain brightness-0" alt="" />
          </div>
          <div className="font-black text-xs tracking-tighter uppercase">AI MINDSET</div>
        </div>
        <div className="mb-6 text-[10px] uppercase tracking-[0.28em] text-black/30 text-left">разделы сайта</div>
        <nav className="flex flex-col gap-4 text-[11px] font-bold uppercase tracking-widest">
          <button
            type="button"
            onClick={() => scrollTo('#hero')}
            className="group flex w-fit items-center gap-2 text-left opacity-50 whitespace-nowrap transition-opacity hover:text-black hover:opacity-100"
          >
            <MenuStrikeText>ГЛАВНАЯ</MenuStrikeText>
          </button>
          <div className="relative flex items-center gap-2 w-fit" onMouseEnter={openLabsDropdown} onMouseLeave={closeLabsDropdown}>
            <div className="group flex items-center gap-2 opacity-50 whitespace-nowrap hover:text-black hover:opacity-100 transition-opacity cursor-pointer">
              <MenuStrikeText>{`{labs}`}</MenuStrikeText>
            </div>
            <AnimatePresence>
              {labsDropdownOpen && <LabsHoverMenu />}
            </AnimatePresence>
          </div>
          {PRIMARY_MENU_LINKS.map((link) => (
            link.href ? (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="group flex items-center gap-2 opacity-50 whitespace-nowrap hover:text-black hover:opacity-100 transition-opacity w-fit">
                <MenuStrikeText>{link.label}</MenuStrikeText>
              </a>
            ) : (
              <span key={link.label} aria-disabled="true" className="group flex w-fit cursor-default items-center gap-2 whitespace-nowrap opacity-35">
                <MenuStrikeText>{link.label}</MenuStrikeText>
              </span>
            )
          ))}
        </nav>
        <div className="mt-24 flex flex-col items-end text-right">
          <div className="mb-6 text-[10px] uppercase tracking-[0.28em] text-black/30">разделы страницы</div>
          <div className="relative flex flex-col items-end gap-[0.95rem]">
            {/* Vertical path line centered exactly behind 3.5px dots */}
            <div className="absolute right-[1.75px] top-[6px] bottom-[6px] w-[0.5px] bg-black/10 pointer-events-none" />
            {PAGE_SECTION_LINKS.map((link) => (
              <div key={link.label} className="flex w-full items-center justify-end">
                <span
                  aria-hidden="true"
                  className={cn(
                    "mr-2.5 h-px w-6 translate-y-[0.02rem] self-center transition-colors",
                    activePageSectionId === link.href.slice(1) ? "bg-[#8DC63F]" : "bg-transparent",
                  )}
                />
                <button
                  type="button"
                  onClick={() => scrollTo(link.href)}
                  className={cn(
                    "group inline-flex items-center justify-end gap-[0.22rem] text-right font-mono text-[12px] font-medium lowercase tracking-[0.09em] leading-none transition-colors",
                    activePageSectionId === link.href.slice(1) ? "text-[#7eb335]" : "text-black/60 hover:text-black",
                  )}
                >
                  <span>{link.label}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "ml-[3px] inline-flex h-[3.5px] w-[3.5px] translate-y-[0.08em] self-center rounded-full transition-colors duration-150",
                      activePageSectionId === link.href.slice(1)
                        ? "bg-current"
                        : "bg-current group-hover:opacity-100",
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <a
            href="#pricing"
            onClick={(e) => { e.preventDefault(); scrollToPricingWithCue(); }}
            className={`${DARK_CTA_BUTTON_CLASS} box-border mx-[calc(-10px-1vw)] w-[calc(100%+20px+2vw)] max-w-none whitespace-nowrap px-4 py-[15px] text-center`}
          >
            /хочу на лабу
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
            transition={{ duration: isTouchMobileViewport ? 0.18 : 0.26, ease: 'easeOut' }}
            className="fixed inset-0 z-[10005] flex flex-col p-8 overflow-y-auto md:hidden"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            <div className="flex justify-between items-center mb-12">
              <div className="text-xl font-bold uppercase tracking-widest">НАВИГАЦИЯ //</div>
              <button
                type="button"
                onClick={closeMobileMenu}
                className="p-2 hover:bg-current/5 rounded-full border border-current"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid gap-12">
              <div>
                <div className="text-[10px] opacity-40 uppercase tracking-widest mb-6 border-b border-current/10 pb-2">разделы текущей страницы</div>
                <div className="flex flex-col gap-4">
                  {PAGE_SECTION_LINKS.map((link) => (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => queueMobileMenuScroll(link.href)}
                      className="text-4xl font-black uppercase tracking-tighter hover:line-through text-left"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] opacity-60 uppercase tracking-widest mb-5 border-b-2 border-current/20 pb-3">меню сайта</div>
                <div className="flex flex-col gap-4">
                  <a
                    href="#hero"
                    onClick={(e) => { e.preventDefault(); queueMobileMenuScroll('#hero'); }}
                    className="text-xl font-bold uppercase tracking-tight text-black hover:line-through"
                  >
                    Главная
                  </a>

                  <a
                    href="#hero"
                    onClick={(e) => { e.preventDefault(); queueMobileMenuScroll('#hero'); }}
                    className="text-xl font-bold uppercase tracking-tight text-black hover:line-through"
                  >
                    Labs
                  </a>

                  {LAB_MENU_LINKS.slice(0, 3).map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className="pl-5 text-[1.35rem] font-bold uppercase tracking-tight opacity-40 hover:line-through"
                    >
                      {link.label}
                    </a>
                  ))}

                  {PRIMARY_MENU_LINKS.map((link) => (
                    link.href ? (
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
                    ) : (
                      <span
                        key={link.label}
                        aria-disabled="true"
                        className="cursor-default text-xl font-bold uppercase tracking-tight text-black/35"
                      >
                        {link.label}
                      </span>
                    )
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
          className={`md:hidden fixed left-0 top-[16px] z-[350] box-border flex w-full items-center justify-between border-b border-current/10 px-4 py-[0.625rem] transition-transform duration-500 ${isMenuOpen ? '-translate-y-24' : 'translate-y-0'}`}
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
           <div className="flex items-center">
              <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }} className="flex items-center gap-2">
                <img src={LOGO_TRANSPARENT_SRC} className="h-[21px] w-[21px] shrink-0 object-contain brightness-0" alt="AI Mindset logo" />
                <span className="text-[9px] font-medium uppercase tracking-[0.25rem] translate-y-[0.5px]">AI MINDSET</span>
              </a>
           </div>
           <div className="flex items-center">
             <button
               type="button"
               onClick={openMobileMenu}
               className="z-10 pointer-events-auto p-1 hover:bg-current/5 transition-colors flex items-center justify-center"
             >
               <Menu size={22} strokeWidth={2.2} />
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
          [ AI MINDSET ] // NOT A COURSE ABOUT TOOLS . BUILD AN AI OPERATING SYSTEM FOR YOUR WORK . ATTENTION IS MORE THAN PROMPTS . SYSTEMS ARE MORE THAN HACKS . MINDSET IS MORE THAN TOOLS .
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
                  {!isLgViewport ? (
                  <div className="lg:hidden mb-12 flex w-full justify-center overflow-hidden">
                     <InvertedVoxelLogoFace className="w-full max-w-[392px] mx-auto" scale={1.4} />
                  </div>
                  ) : null}

                  <p className="max-w-md mx-auto lg:mx-0 text-sm leading-relaxed font-normal md:font-bold opacity-70 mb-7 md:mb-12">
                     Лаборатория, которая научит вас работе с ИИ: от сбора контекста до создания персональной ИИ-операционной системы.
                  </p>
                  <div className="flex w-full flex-col items-center justify-center gap-6 sm:flex-row sm:justify-center lg:items-start lg:justify-start">
                    {/* Desktop Button: Restored to original static position */}
                    <div className="hidden md:block w-full md:w-auto">
                      <div className="md:static flex w-full justify-center">
                        <a
                          href="#pricing"
                          onClick={(e) => { e.preventDefault(); scrollToPricingWithCue(); }}
                          className={cn(
                            DARK_CTA_BUTTON_CLASS,
                            "w-full max-w-[22rem] px-10 py-5 text-center sm:w-auto sm:min-w-[18rem] md:min-w-[22rem] md:px-14 md:py-6",
                          )}
                        >
                          /хочу на лабу
                        </a>
                      </div>
                    </div>
                    {/* Mobile: Space reserved, floating button handled globally */}
                    <div className="md:hidden h-4" />
                  </div>
               </div>
               
               {/* DESKTOP LOGO */}
               {isLgViewport ? (
               <div className="hidden lg:block w-full lg:w-2/5">
                  <InvertedVoxelLogoFace className="w-full max-w-md mx-auto" scale={1.2} />
               </div>
               ) : null}
            </div>
          </Container>
        </section>

         <div className="md:ml-[18%] md:w-[82%] w-full relative">
            {/* Mobile Sticky CTA: Naturally scrolls up and catches at the bottom edge */}
            <div className="md:hidden sticky bottom-[calc(env(safe-area-inset-bottom,0px)+24px)] z-[340] flex w-full justify-center px-4 -mb-8 pointer-events-none">
              <a
                href="#pricing"
                onClick={(e) => { e.preventDefault(); scrollToPricingWithCue(); }}
                className={cn(
                  DARK_CTA_BUTTON_CLASS,
                  "pointer-events-auto w-full max-w-[22rem] px-10 py-5 text-center sm:w-auto sm:min-w-[18rem] md:min-w-[22rem] md:px-14 md:py-6 shadow-2xl",
                )}
              >
                /хочу на лабу
              </a>
            </div>


            <section className="py-20 md:py-24 relative bg-black/[0.03]">
              <Container>
                <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-x-24 gap-y-7 md:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] md:grid-rows-[auto_auto] md:items-end md:gap-y-5">
                  <div>
                    <div className="max-w-[33rem] text-left text-3xl font-black uppercase tracking-[-0.05em] leading-[0.92] sm:text-4xl md:text-5xl md:leading-[0.88]">
                      лаборатория <br />
                      нового мышления <br />
                      в эпоху AI
                    </div>
                  </div>

                  <div>
                    <p className="max-w-[35rem] text-left text-[13px] uppercase leading-[1.42] tracking-[0.03em] opacity-70 sm:text-sm md:text-[13px]">
                      AI mindset winter lab w26 — это лаборатория, пространство для экспериментов. здесь вы не изучаете, а создаёте: персональных ассистентов, AI-first процессы, новую версию себя. от хаоса промптов к персональной AI-операционной системе.
                    </p>
                  </div>

                  <div>
                    <div className="inline-flex items-baseline gap-3 self-start border border-black/10 bg-black/[0.03] px-3 py-1 text-[10px] font-bold leading-none tracking-[0.18em] opacity-60">
                      <div className="h-2 w-2 self-center rounded-full bg-current animate-pulse" />
                      базовое обучение, старт раз в квартал
                    </div>
                  </div>

                  <div className="md:-translate-y-[3px]">
                    <div className="whitespace-nowrap text-left text-[13px] font-black uppercase leading-none tracking-[0.16em] md:text-[14px]">
                      19 января — 16 февраля · 4 недели
                    </div>
                  </div>
                </div>
              </Container>
            </section>

            <div className="py-4 md:hidden">
              <Container>
                <div className="mx-auto h-[1px] w-full bg-black/10" />
              </Container>
            </div>

            <section id="program" className="pt-20 md:pt-32 pb-16 md:pb-20">
              <Container>
                <EditorialSectionHeader eyebrow="контур лаборатории" title="программа" className="mb-16 md:mb-24 text-left" />

                <div className="mb-12 md:mb-16 text-left">
                  <h2 className={BLOCK_SUBTITLE_CLASS}>19 января – 16 февраля • 4 недели</h2>
                  <p className="max-w-[18rem] md:max-w-3xl text-[11px] md:text-sm opacity-60 leading-relaxed mt-[5px]">
                    не курс, а лаборатория с чёткой траекторией: за месяц собираешь работающую систему усиления интеллекта. основная программа дает фундамент, а треки — это углубление.
                  </p>
                </div>

                {!isMdViewport ? (
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
                ) : null}

                {isMdViewport ? (
                <div className="hidden md:block">
                  <DesktopTechUiV5
                    forcedOpenIndex={programFocusNonce === undefined ? undefined : 0}
                    forcedOpenNonce={programFocusNonce}
                  />
                </div>
                ) : null}


                <div className="mt-2 flex justify-end md:hidden">
                  <p className="max-w-[18rem] text-left text-[11px] leading-[1.45] text-black/46">
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
            <div className="mr-2 text-[10px] md:text-[11px] font-black tracking-[0.12em] text-black/42">
              Кем сделано:
            </div>
            {CASE_FILTERS.map((filter) => {
              const isActive = activeCaseFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveCaseFilter(filter.id)}
                  className={cn(
                    "rounded-[2px] px-3 py-2 text-left text-[9px] md:text-[10px] font-black uppercase leading-[1.15] tracking-[0.18em] transition-colors",
                    isActive
                      ? "bg-black text-white"
                      : "border border-black/10 bg-white/60 text-black/55 hover:border-[#8DC63F] hover:bg-[#8DC63F] hover:text-black",
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div className="mx-auto grid max-w-[68rem] auto-rows-fr grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {displayedCases.map(({ card, index }, visibleIndex) => (
              <div
                key={`main-case-slot-${index}`}
                className={cn("h-full", visibleIndex >= 4 ? "hidden md:block" : "")}
              >
                {renderCaseCard(card, index, hoveredCaseState?.index === index, hoveredCaseState?.index === index ? hoveredCaseState.nonce : 0, setHoveredCaseState, 'main', {
                  showTools: true,
                  descriptionLines: 3,
                  cardRef: (node) => {
                    mobileCaseCardRefs.current[index] = node;
                  },
                })}
              </div>
            ))}
          </div>

          {filteredCases.length > 0 ? (
            <div className="mt-10 flex items-center justify-center w-full">
              <button
                type="button"
                onClick={() => setIsCasesOverlayOpen(true)}
                className="group flex min-w-0 flex-row items-center justify-center gap-3 border border-black/10 bg-transparent px-8 py-3 text-black/60 transition-colors hover:border-black/60 hover:bg-transparent"
                aria-haspopup="dialog"
                aria-label="Посмотреть все кейсы"
              >
                <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] transition-colors">
                  Посмотреть все
                </span>
                <ChevronDown className="h-5 w-5 -rotate-90 text-black/72 transition-colors group-hover:text-black" />
              </button>
            </div>
          ) : null}
        </Container>
      </section>

      {/* Team Section */}
      <SlashDivider />
      <section id="team" className="py-20 md:py-32">
        <Container>
          <div id="speakers" className="relative -top-24" aria-hidden="true" />
          <EditorialSectionHeader eyebrow="команда лаборатории" title="Спикеры" className="mb-16" />
          <div className="mb-16 max-w-3xl">
            <p className="text-sm md:text-base opacity-70 leading-relaxed">
              ниже — проводники, которые будут рядом на всём протяжении лаборатории.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5 md:hidden">
            {TEAM_MEMBERS.map((member, index) => {
              const currentRowIndex = Math.floor(index / 2);
              const isLastInRow = index % 2 === 1 || index === TEAM_MEMBERS.length - 1;
              const isActive = activeMobileSpeakerIndex === index;
              const dimmed = activeMobileSpeakerIndex !== null && !isActive;

              return (
                <div key={member.name} className="contents">
                  <article className={cn('flex flex-col gap-3 transition-opacity duration-300', dimmed && 'opacity-40')}>
                    <button type="button" onClick={() => toggleMobileSpeaker(index, 2)} className="group text-left">
                      <div className="relative aspect-square overflow-hidden border border-[#332b2b]/10 bg-[#332b2b]/5">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        <div className={cn('absolute inset-0 transition-colors duration-300', isActive ? 'bg-black/16' : dimmed ? 'bg-black/42' : 'bg-black/6 group-hover:bg-black/12')} />
                        <div className="absolute right-3 bottom-3 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
                          <ArrowRight size={20} strokeWidth={2.25} className={cn('transition-transform duration-300', isActive && 'rotate-90')} />
                        </div>
                      </div>
                    </button>

                    <div>
                      <h3 className="text-[12px] font-bold uppercase tracking-tight leading-tight text-black/92">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-[8px] opacity-40 uppercase tracking-widest">
                        {member.role}
                      </p>
                    </div>
                  </article>

                  {isLastInRow ? (
                    <div className="col-span-2">
                      <AnimatePresence initial={false}>
                        {activeMobileSpeakerIndex !== null && activeMobileSpeakerRowIndex === currentRowIndex ? (
                          <motion.div
                            key={`speaker-detail-mobile-${currentRowIndex}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-0.5 overflow-hidden bg-[#faf8f3]"
                          >
                            <div className="px-1 pt-2 pb-3 text-[12px] leading-[1.6] text-black/72">
                              {renderSpeakerDescription(
                                TEAM_MEMBERS[activeMobileSpeakerIndex].name,
                                TEAM_MEMBERS[activeMobileSpeakerIndex].description,
                              )}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="hidden md:grid md:grid-cols-2 md:justify-items-center md:gap-x-10 md:gap-y-8 lg:grid-cols-3 lg:gap-x-10 xl:grid-cols-4 xl:gap-x-10">
            {TEAM_MEMBERS.map((member, index) => (
              <article key={member.name} className="group relative flex h-full w-full flex-col pb-3 pt-0">
                <div className={cn("mx-auto mb-6 w-full relative aspect-[4/5]", SPEAKER_FRAME_WIDTH_CLASS)}>
                  <SpeakerCornerFrame corners={SPEAKER_CORNER_VARIANTS[index % SPEAKER_CORNER_VARIANTS.length]} />
                  <div className="flex items-center justify-center h-full p-[12px]">
                    <div className={cn("relative overflow-hidden bg-black/10 shadow-sm aspect-[4/5]", SPEAKER_PHOTO_WIDTH_CLASS, SPEAKER_PHOTO_RADIUS_CLASS)}>
                      <img
                        src={member.image}
                        alt={member.name}
                        className={cn("h-full w-full object-cover grayscale transition duration-500 group-hover:scale-[1.05] group-hover:grayscale-0", SPEAKER_PHOTO_RADIUS_CLASS)}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className={cn("pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(0,0,0,0.08)_100%)]", SPEAKER_PHOTO_RADIUS_CLASS)} />
                    </div>
                  </div>
                </div>

                <div className={cn("mx-auto flex w-full flex-1 flex-col", SPEAKER_FRAME_WIDTH_CLASS)}>
                  <div className="mb-1 min-h-[3rem]">
                    <h3 className="mb-1 text-[16px] font-bold uppercase tracking-tight leading-tight text-black/92">
                      {member.name.toUpperCase()}
                    </h3>
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-black/38">
                      {member.role.toUpperCase()}
                    </p>
                  </div>

                  <p className="text-[13px] leading-[1.58] text-black/68">
                    {renderSpeakerDescription(member.name, member.description)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <SlashDivider />
      <section id="philosophy" className="pt-20 md:pt-28 pb-0 md:pb-0 overflow-hidden">
        <Container>
          <div ref={philosophySectionRef} />
          <EditorialSectionHeader eyebrow="Что внутри" title="Философия" className="mb-12 text-left" />
          <div className="mt-10 grid grid-cols-1 gap-6 md:mt-[64px] md:grid-cols-3 md:gap-3">
            {PHILOSOPHY_PILLARS.map((item) => (
              <div key={item.title} className="bg-white/10 h-full min-h-[280px] md:min-h-[260px] flex flex-col items-center p-6 lg:p-8">
                <div className="flex h-[176px] w-full max-w-[13.75rem] flex-none items-end justify-center py-2 md:h-[228px] md:max-w-[17rem] md:items-center md:py-0">
                  <PhilosophyPillarArt art={item.art} deferHeavyMedia={isTouchMobileViewport && !shouldLoadPhilosophyMedia} />
                </div>
                <div className="mt-1.5 md:mt-7 flex w-full flex-col items-center gap-1 md:gap-2">
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

      <div className="py-3 md:py-4">
        <Container>
          <div className="mx-auto h-[0.5px] max-w-sm bg-black/5" />
        </Container>
      </div>

      <section id="mindset" className="pt-1 pb-10 md:pt-2 lg:pt-3 md:pb-24">
        <Container>
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto] gap-0 md:gap-16 items-center">
            <div className="w-full lg:w-auto flex justify-center lg:justify-end shrink-0 order-1 lg:order-2 translate-y-10 md:translate-y-[3.5rem] lg:translate-y-[5rem] overflow-hidden">
              <div ref={mindsetArtRef} className="relative flex h-[16rem] w-[16rem] items-center justify-center overflow-hidden md:h-[20rem] md:w-[20rem] lg:h-[24rem] lg:w-[24rem]">
                {shouldLoadMindsetArt || !isTouchMobileViewport ? (
                  <MindsetDynamicArt className="scale-[1.45] md:scale-[1.12] lg:scale-[1.2]" />
                ) : null}
              </div>
            </div>
            <div className="w-full h-[24rem] md:h-[29rem] lg:h-[33rem] order-2 lg:order-1">
              <div className="relative flex flex-col justify-end h-full py-0">
                <div className="flex-1 flex items-end pb-[8rem] md:pb-24 lg:pb-20">
                  <motion.h2
                    key={activeMindsetQuote}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full pr-0 md:pr-4 text-3xl md:text-5xl font-black tracking-tight leading-tight text-left normal-case"
                  >
                    {MINDSET_QUOTES[activeMindsetQuote].text}
                  </motion.h2>
                </div>

                <div className="absolute bottom-[4.25rem] md:bottom-6 lg:bottom-7 left-0 right-0 flex h-[4.5rem] items-center">
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
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Schedule Section */}
      {false && <ProgramScheduleGrid />}

      {/* Pricing Section */}
      <SlashDivider />
      <section id="pricing" className="pt-10 pb-20 md:py-32">
        <Container>
          <EditorialSectionHeader
            eyebrow="Форматы участия"
            title="Тарифы"
            className="mb-16"
            titleAddon={
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border border-[#8DC63F]/50 bg-[#8DC63F]/10 text-[#56771f] transition-all duration-500 md:h-11 md:w-11 ${
                  showPricingCue ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-1 scale-90 opacity-0'
                }`}
                aria-hidden={!showPricingCue}
              >
                <ChevronDown size={18} strokeWidth={2.4} className="md:h-6 md:w-6" />
              </span>
            }
          />

          <div className="pb-3 md:pb-0">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pricingPlans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                className="w-full"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
              >
                <div className="flex h-full flex-col rounded-[0.4rem] border border-black/10 bg-white/80 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] md:p-6">
                  <div className="mb-2 flex min-h-[1.1rem] items-start justify-end">
                    {plan.tagHref ? (
                      <button
                        type="button"
                        onClick={scrollToProgramFromPricing}
                        className="inline-flex min-h-[0.9rem] items-center bg-black/[0.04] px-2.5 py-[0.28rem] text-right uppercase tracking-[0.18em] text-black/42 transition-colors hover:bg-black/8 hover:text-black/68"
                      >
                        <span className="text-[10px] font-bold leading-none">{plan.tag}</span>
                      </button>
                    ) : plan.tag ? (
                      <div
                        className="inline-flex min-h-[0.9rem] items-center bg-black/[0.04] px-2.5 py-[0.28rem] text-right uppercase tracking-[0.18em] text-black/42"
                      >
                        <span className="text-[10px] font-bold leading-none">{plan.tag}</span>
                      </div>
                    ) : <div />}
                  </div>

                  <div className="mb-3 flex min-h-[8.25rem] flex-col justify-start md:min-h-[8.75rem]">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-xl font-black uppercase leading-none tracking-tight text-black/42 md:text-[23px]">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline gap-2">
                         <span className="text-[50px] font-black leading-[0.88] tracking-[-0.045em] text-black md:text-[72px]">€{plan.price}</span>
                      </div>
                      <div className="mt-2">
                        <div className="inline-flex bg-black/[0.05] px-2 py-1 text-[12px] font-semibold leading-[1.25] tracking-[0.01em] text-black/70 md:text-[13px]">
                          {plan.desc}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-1">
                    <div className="mb-2 md:min-h-[8.75rem] lg:min-h-[9.75rem] xl:min-h-[10.5rem]">
                      <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8DC63F]">
                        что включено:
                      </div>
                      <div className="space-y-2.5 md:space-y-2.5">
                        {plan.features.map((feature, featureIdx) => (
                          <div key={`feature-${plan.name}-${featureIdx}`} className="flex items-start gap-3 text-[13px] leading-[1.42] text-black/78 md:text-[14px] md:leading-[1.34]">
                            <span className="mt-[0.14rem] shrink-0 text-[12px] font-bold leading-none text-[#8DC63F]">›</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6 border-t border-black/8 pt-4">
                      <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8DC63F]">
                        что получаешь
                      </div>
                      <div className="space-y-2.5 md:space-y-2.5">
                        {plan.more.map((item, itemIdx) => (
                          <div key={`more-${plan.name}-${itemIdx}`} className="flex items-start gap-3 text-[13px] leading-[1.42] text-black/70 md:text-[14px] md:leading-[1.34]">
                            <span className="mt-[0.14rem] shrink-0 text-[12px] font-bold leading-none text-[#8DC63F]">›</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setActivePaymentPlan({ name: plan.name, price: plan.price })}
                      className={`${PRICING_CTA_BUTTON_CLASS} h-12 w-full px-6`}
                    >
                      /присоединиться
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          </div>

          <div className="mt-8 max-w-3xl">
            <p className="text-[11px] md:text-[13px] leading-[1.45] text-black/46">
              скидки: Alumni (-20%), Bring a Friend (-10% каждому). возврат после первой недели — без вопросов. возможна оплата в рублях.
            </p>
          </div>


        </Container>
      </section>

      <SlashDivider />
      <section id="reviews">
        <ReviewsSection mode="live" />
      </section>

      <section id="manifesto" className="py-24 md:py-32 overflow-hidden">
        <Container>
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
        </Container>
      </section>

      <SlashDivider />
      <section id="faq" className="bg-[#f3f3f5] py-10 md:py-14">
        <Container>
          <FooterFaqBlock title="вопросы и ответы" versionLabel={null} mode="live" />
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
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-[0.035] md:items-center md:opacity-[0.045]">
          <div className="translate-y-[0.15rem] whitespace-nowrap text-[clamp(118px,31vw,240px)] font-black leading-none uppercase tracking-[-0.06em] select-none text-white md:translate-y-0 md:text-[clamp(88px,16vw,240px)]">
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
                <span aria-disabled="true">ОФЕРТА</span>
                <span aria-disabled="true">ПОЛИТИКА</span>
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
        {isCasesOverlayOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10008] flex items-end justify-center bg-black/55 p-3 backdrop-blur-md md:items-center md:p-6"
            onClick={() => setIsCasesOverlayOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="relative flex h-[calc(100vh-1.5rem)] w-full max-w-[92rem] flex-col overflow-hidden rounded-lg border border-black/10 bg-[#f8f8f5] text-black shadow-2xl md:h-[min(50rem,calc(100vh-3rem))]"
              onClick={() => setIsCasesOverlayOpen(false)}
            >
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:22px_22px] opacity-70" />
              <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),transparent_70%)]" />
              <div className="relative z-10 flex items-start justify-between gap-4 border-b border-black/8 px-5 py-4 md:px-7 md:py-5">
                <div className="min-w-0">
                  <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight md:text-3xl">Все кейсы</h3>
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-sm p-2 text-black/40 transition-colors hover:bg-black/5 hover:text-black"
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsCasesOverlayOpen(false);
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden">
                <div className="border-b border-black/8 px-5 py-4 md:px-7">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3">
                      <div className="mr-2 text-[10px] md:text-[11px] font-black tracking-[0.12em] text-black/42">
                        Кем сделано:
                      </div>
                      {CASE_FILTERS.map((filter) => {
                        const isActive = activeCaseFilter === filter.id;
                        return (
                          <button
                            key={`overlay-${filter.id}`}
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setActiveCaseFilter(filter.id);
                            }}
                            className={cn(
                              "rounded-sm px-3 py-2 text-left text-[9px] md:text-[10px] font-black uppercase leading-[1.15] tracking-[0.18em] transition-colors",
                              isActive
                                ? "bg-black text-white"
                                : "border border-black/10 bg-white/72 text-black/55 hover:border-[#8DC63F] hover:bg-[#8DC63F] hover:text-black",
                            )}
                          >
                            {filter.label}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 md:gap-3">
                      <div className="mr-2 text-[10px] md:text-[11px] font-black tracking-[0.12em] text-black/42">
                        Инструменты:
                      </div>
                      {CASE_TOOL_FILTERS.map((tool) => {
                        const isActive = activeCaseToolFilter === tool;
                        const label = tool === 'all' ? 'все' : tool;
                        return (
                          <button
                            key={`overlay-tool-${tool}`}
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setActiveCaseToolFilter(tool);
                            }}
                            className={cn(
                              "rounded-sm border px-2.5 py-1.5 text-left font-mono text-[8px] uppercase leading-[1.15] tracking-[0.14em] transition-colors md:text-[9px]",
                              isActive
                                ? "border-black bg-black text-white"
                                : "border-black/10 bg-white/72 text-black/55 hover:border-[#8DC63F] hover:bg-[#8DC63F] hover:text-black",
                            )}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="min-h-0 overflow-y-auto px-5 py-5 md:px-7 md:py-6">
                  <div className="mx-auto grid max-w-[88rem] auto-rows-fr grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                    {filteredCases.map(({ card, index }) =>
                      renderCaseCard(card, index, hoveredOverlayCaseState?.index === index, hoveredOverlayCaseState?.index === index ? hoveredOverlayCaseState.nonce : 0, setHoveredOverlayCaseState, 'overlay', {
                        showTools: true,
                        descriptionLines: 2,
                      })
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeCase ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10010] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md md:p-6"
            onClick={() => setActiveCaseIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 22 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="flex max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-black/12 bg-white text-black shadow-2xl overscroll-contain md:h-[min(46rem,calc(100vh-3rem))]"
              // Use onClick to distinguish between tap (to close) and swipe (to scroll)
              onClick={(event) => {
                const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches;
                if (isMobile) {
                  setActiveCaseIndex(null);
                } else {
                  event.stopPropagation();
                }
              }}
            >
              {/* Sticky header to ensure close button is ALWAYS at the top of the container */}
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-black/8 bg-white px-5 py-4 md:px-7 md:py-5">
                <div className="min-w-0">
                  <h3 className="text-[20px] font-black uppercase tracking-tighter leading-tight md:text-3xl">{activeCase.title}</h3>
                  <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] uppercase tracking-[0.16em]">
                    <span className="font-black text-black/62">{activeCase.author}</span>
                    <span className="font-black text-black/28">·</span>
                    <span className="text-black/42">{activeCase.role}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="shrink-0 -mr-2 -mt-2 rounded-full p-4 text-black/40 transition-colors hover:bg-black/5 hover:text-black md:p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCaseIndex(null);
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid min-h-0 flex-1 gap-0 overflow-y-auto md:grid-cols-[minmax(280px,0.95fr)_minmax(0,1.15fr)] md:overflow-hidden">
                <div className="flex min-h-0 flex-col overflow-y-auto border-b border-black/8 bg-[#f5f7f2] p-5 overscroll-contain md:border-b-0 md:border-r md:border-black/8 md:p-7">
                  <div
                    className={cn(
                      "min-h-[14rem] md:min-h-0 md:flex-1",
                    )}
                  >
                    {activeCase.productImageSrc
                      ? renderCaseProductMedia(activeCase)
                      : renderCaseMediaPanel({ index: activeCaseVisualIndex, mode: 'modal' })}
                  </div>
                  {activeCase.filters.length ? (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {activeCase.filters.map((filterId) => {
                        const isActive = activeCaseFilter === filterId;
                        return (
                          <button
                            key={`modal-filter-${activeCase.title}-${filterId}`}
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setActiveCaseFilter(filterId);
                            }}
                            className={cn(
                              "rounded-[2px] border px-2 py-1 text-left font-mono text-[8px] uppercase tracking-[0.14em] transition-colors",
                              isActive
                                ? "border-black bg-black text-white"
                                : "border-black/10 bg-black/[0.03] text-black/54 hover:border-[#8DC63F] hover:bg-[#8DC63F] hover:text-black",
                            )}
                            aria-pressed={isActive}
                          >
                            {CASE_FILTER_LABELS[filterId]}
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
                <div className="min-h-0 overflow-y-auto px-5 py-5 md:px-7 md:py-6 overscroll-behavior-contain">
                  <div className="space-y-5 pb-8">
                    <section>
                      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black/36">решение</div>
                      <p className="text-[14px] leading-[1.7] text-black/78 md:text-[15px]">
                        {activeCase.details}
                      </p>
                    </section>

                    <section>
                      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black/36">инструменты</div>
                      <div className="rounded-[4px] border border-black/8 bg-black/[0.03] px-4 py-3 text-[13px] leading-[1.6] text-black/72 md:text-[14px]">
                        {activeCase.tools}
                      </div>
                    </section>

                    <section>
                      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black/36">результат</div>
                      <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#56771f] md:text-[14px]">
                        {activeCase.metric}
                      </div>
                    </section>

                    {activeCase.productVideoId ? (
                      <section className="md:hidden">
                        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black/36">демо</div>
                        {renderCaseProductVideo(activeCase)}
                      </section>
                    ) : null}

                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <PaymentPopupComponent
        isOpen={activePaymentPlan !== null}
        plan={activePaymentPlan}
        onClose={() => setActivePaymentPlan(null)}
      />
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
  const handleDismissConsent = (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    event?.stopPropagation();
    dismissConsent();
  };
  return (
    <div className="fixed bottom-4 left-4 right-4 z-[10000] w-auto bg-white border-2 border-black p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] md:bottom-6 md:left-auto md:right-6 md:w-[min(380px,calc(100vw-48px))] md:px-7 md:py-5 md:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)]">
        <button
          type="button"
          onClick={handleDismissConsent}
          className="absolute top-3 right-3 z-10 pointer-events-auto p-1 text-black/50 hover:text-black transition-colors"
          aria-label="Закрыть уведомление о cookies"
        >
          <X size={14} />
        </button>
        <div className="text-[8px] md:text-[9px] font-black opacity-30 mb-2 md:mb-3 uppercase tracking-widest">SYSTEM NOTICE</div>
        <p className="text-[9px] md:text-[10px] font-bold leading-relaxed mb-4 md:mb-4 uppercase text-black">МЫ ИСПОЛЬЗУЕМ КУКИ ДЛЯ ВАШЕЙ AI-СИНХРОНИЗАЦИИ.</p>
        <button type="button" onClick={handleDismissConsent} className={`${DARK_CTA_BUTTON_CLASS} w-full px-4 py-3 text-[12px]`}>понятно</button>
    </div>
  );
};
