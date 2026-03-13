import React, { useState, useEffect, useRef } from 'react';
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
  Zap,
  FlaskConical
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
const DESKTOP_PAGE_NAV: NavItem[] = PAGE_NAV.slice(0, 2);

const STANDARD_MENU_LINKS: NavItem[] = [
  { label: 'community {space}', href: 'https://aimindset.org/ai-mindset-community', isExternal: true },
  { label: '{for-teams}', href: 'https://aimindset.org/ai-mindset-consulting', isExternal: true },
  { label: 'non-profit', href: 'https://aimindset.org/', isExternal: true },
];

const SIDEBAR_NAV: NavItem[] = [
  { label: 'AI Mindset', href: 'https://aimindset.org/', isExternal: true },
  { label: '{LAB}', href: 'https://aimindset.org/ai-mindset', isExternal: true },
  { label: '{personal OS}', href: 'https://aimindset.org/sprint-pos', isExternal: true },
  { label: '{ai-native orgs}', href: 'https://ai-native.aimindset.org/', isExternal: true },
  { label: '{space}', href: 'https://aimindset.org/ai-mindset-community', isExternal: true },
  { label: '{for-teams}', href: 'https://aimindset.org/ai-mindset-consulting', isExternal: true },
];

// --- COMPONENTS ---

export const Container = ({ children, className = '' }: any) => (
  <div className={`w-full max-w-5xl mx-auto px-6 lg:px-12 xl:px-16 ${className}`}>
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
    `,
    large_diamond: `
            .            
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
    <div className="relative z-10 h-full">
      {children}
    </div>
  </div>
);

const SectionLabel = ({ text, id, number = "01" }: { text: string; id?: string; number?: string }) => (
  <div className="flex flex-col items-start mb-32 md:mb-48 group" id={id}>
    <div className="flex items-baseline gap-4 md:gap-8 w-full border-b-2 border-current pb-8 md:pb-12">
      <div className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] transition-transform group-hover:translate-x-4 duration-500">
        {text}
      </div>
      <div className="text-2xl md:text-5xl font-mono opacity-20 font-light ml-auto">
        ({number})
      </div>
    </div>
    <div className="mt-6 flex items-center gap-4 text-[10px] md:text-xs font-bold opacity-30 uppercase tracking-[0.4em]">
      <div className="px-2 py-1 border border-current">SECTION</div>
      <div>AIMINDSET // W26 // 2026</div>
    </div>
  </div>
);

const Tag = ({ text }: { text: string }) => (
  <span className="px-2 py-0.5 border border-current/20 rounded-full text-[8px] font-bold uppercase tracking-widest">
    {text}
  </span>
);

const Sidebar = ({ isOpen, toggle, colors, scrollTo, gridActive, setGridActive, crazyMode, setCrazyMode, logoSrc }: any) => {
  return (
    <div className={`fixed top-0 left-0 h-full z-50 p-6 md:p-8 flex flex-col transition-transform duration-500 border-r md:border-current/10 
      ${isOpen ? 'w-[85vw] md:w-1/6 translate-x-0 bg-white md:bg-transparent' : '-translate-x-full md:translate-x-0 md:w-1/6'} bg-transparent text-current`}
    >
      <div className="flex items-center gap-3 mb-16">
        <img src={logoSrc} alt="logo" className="h-6 w-6 object-contain filter " />
        <div className="leading-tight">
          <div className="text-[10px] md:text-xs font-black uppercase tracking-tighter">AI MINDSET</div>
          <div className="text-[7px] text-[#8DC63F] opacity-100 uppercase tracking-widest">LAB W26</div>
        </div>
      </div>

      <nav className="flex flex-col gap-4 mb-auto">
        {SIDEBAR_NAV.map((link) => {
          if (link.label === '{LAB}') {
            const [labsOpen, setLabsOpen] = useState(false);
            return (
              <div key={link.label} className="flex flex-col">
                <button
                  onClick={() => setLabsOpen(!labsOpen)}
                  className="flex items-center group text-left text-current"
                >
                  <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    {link.label} <ChevronDown size={12} className={`transition-transform ${labsOpen ? 'rotate-180' : ''}`} />
                  </span>
                  <span className="ml-2 font-light opacity-20 transition-opacity group-hover:opacity-100">|</span>
                </button>
                <AnimatePresence>
                  {labsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col gap-3 pl-3 border-l border-current/20 ml-[3px] mt-4 mb-2 overflow-hidden"
                    >
                      <a href="https://join.aimindset.org/context" className="text-[9px] uppercase font-bold tracking-widest opacity-40 hover:opacity-100 transition-opacity">W26 Main Lab</a>
                      <a href="https://aimindset.org/sprint-pos" className="text-[9px] uppercase font-bold tracking-widest opacity-40 hover:opacity-100 transition-opacity">{'{personal OS}'}</a>
                      <a href="https://ai-native.aimindset.org/" className="text-[9px] uppercase font-bold tracking-widest opacity-40 hover:opacity-100 transition-opacity">AI-native Org</a>
                      <a href="https://aimindset.org/" className="text-[9px] uppercase font-bold tracking-widest opacity-40 hover:opacity-100 transition-opacity">Past Cohorts</a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }
          return (
            <button
              key={link.label}
              onClick={() => link.isExternal ? window.open(link.href, '_blank') : scrollTo(link.href)}
              className="flex items-center group text-left text-current"
            >
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                {link.label}
              </span>
              <span className="ml-2 font-light opacity-20 transition-opacity group-hover:opacity-100">|</span>
            </button>
          );
        })}
      </nav>

      <div className="flex flex-col gap-6 pt-12">
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => setGridActive(!gridActive)}
            className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest hover:opacity-100 transition-opacity opacity-60"
          >
            <div className={`w-3 h-3 rounded-full ${gridActive ? 'bg-[#8DC63F]' : 'border border-current'}`} />
            GRID
          </button>
          <button 
            onClick={() => setCrazyMode(!crazyMode)}
            className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest hover:opacity-100 transition-opacity opacity-60"
          >
            <div className={`w-3 h-3 rounded-full ${crazyMode ? 'bg-[#8DC63F]' : 'border border-current'}`} />
            CRAZY
          </button>
        </div>

        <a
          href="https://join.aimindset.org/waitlist"
          className="bg-[#8DC63F] text-white px-4 py-4 md:px-6 md:py-4 rounded-full text-center text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg mt-4"
        >
          ЗАПИСАТЬСЯ
        </a>
      </div>
    </div>
  );
};



const SlashDivider = () => (
  <div className="w-full overflow-hidden whitespace-nowrap text-[10px] opacity-10 py-4 select-none">
    {Array(200).fill("/").join("")}
  </div>
);

// --- VOXEL COMPONENTS ---
const useOrientation = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        setTilt({ x: (e.gamma / 35) * 50, y: ((e.beta - 45) / 35) * 50 });
      }
    };
    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);
  return tilt;
};

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

const VoxelLogoFace = ({ scale = 1, opacity = 1 }: { scale?: number; opacity?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const interactionRef = useRef({ x: -999, y: -999, tiltX: 0, tiltY: 0 });
  const logoSrc = `${import.meta.env.BASE_URL}assets/ai-mindset-logo.png`;

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        interactionRef.current.tiltX = (e.gamma / 35) * 50;
        interactionRef.current.tiltY = ((e.beta - 45) / 35) * 50;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        // Calculate logical coordinates in 600x600 canvas space accounting for scale
        const scaleX = 600 / rect.width;
        const scaleY = 600 / rect.height;
        interactionRef.current.x = (e.clientX - rect.left) * scaleX;
        interactionRef.current.y = (e.clientY - rect.top) * scaleY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (canvasRef.current && e.touches.length > 0) {
        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = 600 / rect.width;
        const scaleY = 600 / rect.height;
        interactionRef.current.x = (e.touches[0].clientX - rect.left) * scaleX;
        interactionRef.current.y = (e.touches[0].clientY - rect.top) * scaleY;
      }
    };

    const handleMouseOut = () => {
      interactionRef.current.x = -999;
      interactionRef.current.y = -999;
    };

    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission().then((s: string) => {
        if (s === 'granted') window.addEventListener('deviceorientation', handleOrientation);
      }).catch(console.error);
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('touchend', handleMouseOut);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('touchend', handleMouseOut);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    canvas.width = 600;
    canvas.height = 600;
    const voxels: any[] = [];
    
    // Pixel sizing logic
    const size = 11;
    const gap = 3;
    const total = size + gap;

    const width = AI_MINDSET_LOGO_MAP[0].length;
    const height = AI_MINDSET_LOGO_MAP.length;
    
    // Center the map in the 600x600 canvas
    // Needs tweaking to perfectly overlay the masked image
    const mapRenderWidth = width * total;
    const mapRenderHeight = height * total;
    const startX = 300 - mapRenderWidth / 2;
    const startY = 300 - mapRenderHeight / 2;

    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        if (AI_MINDSET_LOGO_MAP[r][c] === '1') {
          // RENDER EXACTLY HALF (RIGHT HALF)
          if (c >= width / 2 - 1) { // included middle column to look complete
            const bx = startX + c * total;
            const by = startY + r * total;
            
            const colDist = c - (width / 2); // 0, 1, 2...
            const firmness = 0.04 + Math.max(0, 5 - colDist) * 0.1; // 0.54 down to 0.04
            
            voxels.push({
              homeX: bx,
              homeY: by,
              x: bx + (Math.random()) * 400 + 40, // spawn mostly right side
              y: by + (Math.random() - 0.5) * 600,
              vx: 0,
              vy: 0,
              firmness,
              offset: Math.random() * 10
            });
          }
        }
      }
    }

    const logoLeft = new Image();
    logoLeft.src = `${import.meta.env.BASE_URL}assets/logo-left.png`;
    let logoLoaded = false;
    logoLeft.onload = () => { logoLoaded = true; };

    let aId: number;
    const draw = () => {
      ctx.clearRect(0, 0, 600, 600);
      frame++;

      // Draw left half from PNG or Fallback
      if (logoLoaded && logoLeft.width > 24) { // 24 bytes check roughly
        const halfWidth = (width / 2) * total;
        ctx.drawImage(logoLeft, startX, startY, halfWidth, mapRenderHeight);
      } else {
        // Fallback: Draw static left half from map
        ctx.fillStyle = '#181616';
        ctx.globalAlpha = 0.9;
        for (let r = 0; r < height; r++) {
          for (let c = 0; c < width / 2 - 1; c++) {
            if (AI_MINDSET_LOGO_MAP[r][c] === '1') {
              const bx = startX + c * total;
              const by = startY + r * total;
              ctx.beginPath();
              ctx.roundRect(bx, by, size, size, 2);
              ctx.fill();
            }
          }
        }
      }

      const mx = interactionRef.current.x;
      const my = interactionRef.current.y;
      const tiltX = interactionRef.current.tiltX || 0;
      const tiltY = interactionRef.current.tiltY || 0;
      
      voxels.forEach(v => {
        let dx = 0, dy = 0, dist = 9999;

        if (mx > -100 && mx < 700) {
          dx = v.x - mx;
          dy = v.y - my;
          dist = Math.sqrt(dx * dx + dy * dy) || 1;
        }

        if (dist < 120) {
          const force = (120 - dist) / 120;
          v.vx += (dx / dist) * force * 5;
          v.vy += (dy / dist) * force * 5;
        }

        v.vx += tiltX * 0.08;
        v.vy += tiltY * 0.08;

        v.vx += (v.homeX - v.x) * v.firmness;
        v.vy += (v.homeY - v.y) * v.firmness;

        v.vx *= 0.85;
        v.vy *= 0.85;

        v.x += v.vx;
        v.y += v.vy;

        const boundaryX = startX + (width / 2 - 1) * total - 2;
        if (v.x < boundaryX && v.homeX >= boundaryX) {
           v.x = boundaryX + 2;
           v.vx *= -0.5;
        }

        if (isNaN(v.x) || isNaN(v.y)) {
          v.x = v.homeX;
          v.y = v.homeY;
          v.vx = 0;
          v.vy = 0;
        }

        ctx.fillStyle = '#000000';
        ctx.globalAlpha = 1.0;
        
        const vxAbs = Math.abs(v.vx);
        const vyAbs = Math.abs(v.vy);
        const stretchX = size * (1 + vxAbs * 0.05);
        const stretchY = size * (1 + vyAbs * 0.05);

        ctx.beginPath();
        ctx.roundRect(v.x, v.y, stretchX, stretchY, 2);
        ctx.fill();
      });
      aId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(aId);
  }, []);

  return (
    <div 
      className="relative flex items-center justify-center pointer-events-auto w-full max-w-[600px] aspect-square mx-auto"
      style={{ transform: `scale(${scale})`, opacity }}
    >
      <canvas ref={canvasRef} width={600} height={600} className="w-full h-full object-contain z-20" />
    </div>
  );
};

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

// --- MAIN PAGE COMPONENT ---

export default function LabW26PageV2() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAllFeedback, setShowAllFeedback] = useState(false);
  const [theme, setTheme] = useState<'winter' | 'spring'>('winter');
  const [gridActive, setGridActive] = useState(true);
  const [crazyMode, setCrazyMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [flippedPricing, setFlippedPricing] = useState<Record<string, boolean>>({});
  const logoSrc = `${import.meta.env.BASE_URL}assets/ai-mindset-logo.png`;

  // Theme colors
  const colors = {
    winter: {
      bg: '#f9f9f7',
      text: '#181616',
      accent: '#181616',
      card: 'bg-white shadow-sm border border-current/10',
      grid: 'opacity-[0.03]'
    },
    spring: {
      bg: '#f0f7f0',
      text: '#2b3d2b',
      accent: '#88b04b',
      card: 'bg-white shadow-sm border border-current/10',
      grid: 'opacity-[0.05]'
    }
  }[theme];

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

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

  const visibleFeedback = showAllFeedback
    ? feedbackData
    : isMobile
      ? feedbackData.slice(0, 2)
      : feedbackData;

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

  return (
    <div
      className="min-h-screen font-mono selection:bg-[var(--theme-text)] selection:text-[var(--theme-bg)] overflow-x-hidden relative transition-colors duration-700"
      style={{ 
        backgroundColor: colors.bg, 
        color: colors.text,
        '--theme-bg': colors.bg,
        '--theme-text': colors.text 
      } as React.CSSProperties}
    >
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
        colors={colors}
        scrollTo={scrollTo}
        theme={theme}
        setTheme={setTheme}
        gridActive={gridActive}
        setGridActive={setGridActive}
        crazyMode={crazyMode}
        setCrazyMode={setCrazyMode}
        logoSrc={logoSrc}
      />

      {/* Original Mobile Header Restored */}
      <header className={`md:hidden fixed top-6 left-0 w-full z-50 px-4 py-4 flex justify-between items-center bg-white/10 border-b border-current/10 transition-transform duration-500 ${isSidebarOpen ? '-translate-y-24' : 'translate-y-0'}`} style={{ backgroundColor: theme === 'winter' ? '#f9f9f7' : '#f2f9f2' }}>
        <div className="flex gap-4 items-center">
          <a href="#" className="font-bold leading-none flex items-center gap-2">
            <img src={logoSrc} alt="AI Mindset logo" className="h-6 w-6 object-contain" />
            <span className="text-[10px] tracking-[0.4em] font-light border-l border-current pl-4">MINDSET</span>
          </a>
        </div>
        <div className="flex gap-4 items-center">
          <a
            href="https://join.aimindset.org/waitlist"
            className="flex border border-current px-3 py-1 text-[9px] items-center gap-2 hover:bg-current hover:text-(--theme-bg) transition-colors cursor-pointer"
          >
            <span className="font-bold">ЗАПИСАТЬСЯ</span>
          </a>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-current/5 transition-colors"
          >
            <FlaskConical size={20} />
          </button>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-current/5 transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[100] flex flex-col p-8 overflow-y-auto"
            style={{ backgroundColor: colors.bg }}
          >
            <div className="flex justify-between items-center mb-12">
              <div className="text-xl font-bold uppercase tracking-widest">MENU // NAVIGATION</div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-current/5 rounded-full border border-current">
                <X size={24} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="text-[10px] opacity-40 uppercase tracking-widest mb-6 border-b border-current/10 pb-2">PAGE SECTIONS</div>
                <div className="flex flex-col gap-4">
                  {PAGE_NAV.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => { scrollTo(link.href); setIsMenuOpen(false); }}
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
                    href="#apply"
                    onClick={(e) => { e.preventDefault(); scrollTo('#apply'); setIsMenuOpen(false); }}
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

      <motion.div
        animate={{ 
          x: isSidebarOpen && isMobile ? '85vw' : '0%',
          scale: isSidebarOpen && isMobile ? 0.95 : 1,
          rotateY: isSidebarOpen && isMobile ? -5 : 0
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`md:ml-[16.666667%] w-full md:w-[83.333333%] min-h-screen relative z-10 origin-left 
          ${isSidebarOpen && isMobile ? 'pointer-events-none' : ''}`}
      >
        {/* Grid Overlay */}
        {gridActive && (
          <div className={`absolute inset-0 pointer-events-none z-0 ${colors.grid}`}
            style={{ backgroundImage: `radial-gradient(${colors.text} 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
        )}

        {/* Ticker Top */}
        <div className="fixed top-0 left-0 w-full z-[100] border-b border-current/5 py-2.5 overflow-hidden whitespace-nowrap text-[8px] md:text-[9px] font-medium uppercase tracking-[0.3em] select-none bg-[var(--theme-bg)] flex justify-center items-center gap-4" style={{ backgroundColor: colors.bg }}>
          <span>AI MINDSET LAB W26</span>
          <span className="opacity-20 text-[12px]">•</span>
          <span>BATCH: WINTER 26</span>
          <span className="opacity-20 text-[12px]">•</span>
          <span className="opacity-50">APPLICATIONS: CLOSE</span>
          <span className="opacity-20 text-[12px]">•</span>
          <span>NEXT BATCH: 20 APRIL</span>
        </div>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center relative overflow-hidden pt-24 md:pt-0">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8 w-full pl-[calc(1rem+20px)] md:pl-[calc(1.5rem+20px)] lg:pl-[calc(2rem+20px)] pr-4 md:pr-12 lg:pr-16"
            >
              {/* Main Text Content on Left */}
              <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left relative z-30">
<>
                  {/* BATCH info moved below */}
                </>

                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9] mb-12 whitespace-nowrap">
                  AI Mindset Main Lab W26
                </h1>
                
                <div className="flex items-center gap-5 mb-4 max-w-lg">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-current/20 rounded-full relative group">
                        <div className="w-2.5 h-2.5 bg-current rounded-full" />
                        <motion.div 
                          className="absolute inset-0 border border-current rounded-full"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                    <p className="text-sm md:text-lg font-bold tracking-widest leading-snug text-left opacity-80 uppercase">
                      от единого контекста <br/> к агентной ai-системе.
                    </p>
                </div>
              </div>
              
              {/* Voxel Element on Right */}
              <div className="w-full lg:w-2/5 flex justify-center lg:justify-end opacity-90 z-20">
                <VoxelLogoFace scale={0.9} opacity={1} />
              </div>
            </motion.div>

          {/* Dynamic Background Hook */}
          <motion.div 
            animate={{ y: [0, -20, 0], opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-0 lg:right-32 top-1/2 -translate-y-1/2 h-full opacity-[0.05] pointer-events-none hidden lg:flex items-center"
          >
            <AsciiArt type="large_diamond" className="text-[12px] md:text-[24px] tracking-[0.5em] leading-[1.5em]" />
          </motion.div>
        </section>

        {/* Secondary Description Block ("пониже") */}
        <section className="py-20 md:py-32 relative bg-current/5 border-y border-current/10">
          <Container>
            {/* CTAs Moved Here */}
            <div className="flex flex-col items-center gap-6 mb-24 md:mb-32">
                  {/* BATCH INFO FROM HERO */}
                  <div className="text-[10px] md:text-xs tracking-[0.4em] opacity-40 uppercase font-bold mb-4 border-b border-current/10 pb-4 w-full text-center">
                    BATCH: WINTER 26 Main Lab // STATUS: CLOSED
                  </div>
                  
                  <div className="text-[10px] md:text-sm uppercase font-mono opacity-40 font-bold tracking-[0.3em] text-center mb-2">
                    следующий поток: 20 апреля
                  </div>
                  <a
                    href="https://join.aimindset.org/context"
                    className="flex items-center justify-center gap-4 md:gap-8 px-12 md:px-20 py-6 md:py-8 hover:bg-current hover:text-[var(--theme-bg)] transition-all duration-500 font-mono uppercase text-xs md:text-sm font-black tracking-widest group border border-current w-full sm:w-auto text-center rounded-sm"
                    style={{ backgroundColor: colors.bg, color: colors.text }} 
                  >
                    [ ПОДАТЬ ЗАЯВКУ НА X26 MAIN LAB ] <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </a>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-12 md:gap-24 w-full max-w-5xl mx-auto">
              <div className="flex flex-col gap-6 max-w-xl">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9]">
                  лаборатория <br />
                  нового мышления <br />
                  в эпоху AI
                </div>
                <div className="flex items-center gap-3 text-[10px] md:text-xs font-bold opacity-60 uppercase tracking-widest bg-current/5 px-3 py-1 self-start border border-current/10">
                  <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  FOUNDATION // W26
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-6">
                <p className="text-sm md:text-md uppercase leading-relaxed opacity-70">
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
       {/* Eye Rest Block 1 */}
      <section className="py-24 md:py-32 border-b border-current/10 overflow-hidden">
        <Container>
          <div className="flex items-center justify-between mb-24">
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">РАЗДЕЛ (II)</div>
            <div className="font-black uppercase tracking-widest text-xl md:text-2xl text-right">Философия</div>
          </div>
          <div className="grid md:grid-cols-2 gap-16 md:gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl leading-tight mb-12">
                Mindset важнее инструментов — технологии меняются, а новый способ мышления остаётся с вами.
              </h2>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full border border-current/20 flex items-center justify-center text-[10px] font-bold">01</div>
                <div className="w-12 h-12 rounded-full border border-current/20 flex items-center justify-center text-[10px] font-bold">02</div>
              </div>
            </div>
            <div className="flex justify-center md:justify-end text-[#8DC63F]">
              <div className="w-56 h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 relative flex items-center justify-center text-[8px] leading-[8px]">
                <AsciiArt type="large_diamond" className="scale-125 md:scale-150" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-20 md:py-32 relative">
        <Container>
          <SectionLabel text="ФИЛОСОФИЯ" number="01" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'MINDSET > TOOLS', desc: 'технологии меняются, а новый способ мышления остаётся с вами', art: 'mindset' },
              { title: 'PRACTICE', desc: 'каждая неделя это эксперимент с реальными задачами и артефактами', art: 'practice' },
              { title: 'COMMUNITY', desc: 'вы учитесь не только у экспертов, но и друг у друга', art: 'community' },
              { title: 'PERSONALIZATION', desc: 'углубляйтесь в то, что нужно именно вам через треки', art: 'personal' },
            ].map((item, i) => (
              <SymbolBorder key={i} className={`p-8 flex flex-col gap-6 backdrop-blur-sm h-full ${colors.card}`}>
                <div className="flex justify-between items-start">
                  <div className="text-[10px] opacity-40">0{i + 1} // CORE</div>
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
      <section id="program" className="py-20 md:py-32 bg-[#332b2b]/5 relative">
        <Container>
          <SectionLabel text="PROGRAM // MAIN & ADVANCED" number="02" />

          <div className="mb-16 text-center">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4">19 января – 16 февраля • 4 недели</h2>
            <p className="max-w-3xl mx-auto text-sm opacity-60 uppercase">
              не курс, а лаборатория с чёткой траекторией: за месяц собираешь работающую систему усиления интеллекта.
            </p>
            <div className="mt-8 text-xl md:text-3xl font-black opacity-20 tracking-[0.2em]">
              prompt {" >> "} context {" >> "} mind {" >> "} life {" {engineering}"}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-l border-y border-current/10">
            {[
              {
                id: '01',
                title: 'Prompt Engineering',
                subtitle: 'AI КАК ИНТЕРФЕЙС МЫШЛЕНИЯ',
                desc: 'Освоение техник промптов: Chain-of-Thought, Few-Shot Learning, Custom GPTs. Создание первых персональных ассистентов.',
                result: 'персональный GPT-ассистент, библиотека промптов (20+), понимание основ AI',
                tools: ['ChatGPT', 'Claude', 'Custom GPTs', 'Gemini'],
                speaker: 'Александр Поваляев',
                week: '19–25 JAN',
                art: 'mindset'
              },
              {
                id: '02',
                title: 'Context Engineering',
                subtitle: 'АВТОМАТИЗАЦИЯ И АГЕНТЫ',
                desc: 'Управление контекстом: Obsidian + MCP + Claude. Автоматизация через n8n, Make. AI-агенты и workflows.',
                result: '2–3 работающие автоматизации, интегрированная система знаний, настройка агентов',
                tools: ['Obsidian', 'MCP', 'n8n', 'Make'],
                speaker: 'Сергей Хабаров',
                week: '26 JAN – 1 FEB',
                art: 'diamond'
              },
              {
                id: '03',
                title: 'Mind Engineering',
                subtitle: 'ПРОДУКТИВНОСТЬ И РИТУАЛЫ',
                desc: 'AI для коучинга, рефлексии, персональных ритуалов. Трекинг привычек и целей с поддержкой AI.',
                result: 'персональный AI-коуч, система трекинга привычек, ритуалы рефлексии',
                tools: ['Claude', 'Notion', 'Taskade'],
                speaker: 'Анна Лозицкая',
                week: '2–8 FEB',
                art: 'neural'
              },
              {
                id: '04',
                title: 'Life Engineering',
                subtitle: 'ТВОРЧЕСТВО И РЕАЛИЗАЦИЯ',
                desc: 'От идеи до прототипа. Vibe-coding с Cursor, Windsurf, Claude Projects. Создание без технического бэкграунда.',
                result: 'рабочий прототип, задеплоенный проект, vibe-coding workflow',
                tools: ['Cursor', 'Windsurf', 'v0', 'Replit'],
                speaker: 'Анка Ставенски',
                week: '9–15 FEB',
                art: 'logic'
              },
            ].map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <div className={`h-[400px] flex flex-col justify-between border-r border-current/10 group overflow-hidden relative transition-colors bg-[var(--color-bg)]`}>
                  
                  {/* Default State */}
                  <div className="absolute inset-0 p-8 flex flex-col h-full z-10 bg-[var(--color-bg)] transition-opacity duration-300 group-hover:opacity-0 group-hover:pointer-events-none">
                    <div className="w-8 h-8 rounded-full border border-current/20 shrink-0"></div>
                    <div className="flex-1 flex items-center justify-center -mx-4 text-[#8DC63F]">
                       <AsciiArt type={item.art} className="opacity-80 scale-75" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Week {idx+1}</h3>
                      <div className="text-[9px] font-bold opacity-40 uppercase tracking-widest leading-relaxed">
                        {item.title}.<br/>{item.subtitle}.
                      </div>
                    </div>
                  </div>

                  {/* Hover State */}
                  <div className="absolute inset-0 p-8 flex flex-col bg-[#8DC63F] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20">
                    <div className="w-8 h-8 rounded-full border border-white/40 shrink-0 mb-6 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <div className="text-[10px] uppercase tracking-widest font-bold mb-6">ПОДРОБНЕЕ —</div>
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                      <p className="text-sm font-bold leading-relaxed mb-6">{item.desc}</p>
                      <ul className="text-xs space-y-2 mb-6 opacity-90">
                        {item.result.split(', ').map((r, i) => <li key={i}>• {r}</li>)}
                      </ul>
                      <div className="text-xs">
                        <span className="opacity-60">Инструменты: </span>
                        {item.tools.join(', ')}
                      </div>
                    </div>
                    <div className="text-[8px] uppercase tracking-widest opacity-40 mt-6 shrink-0">
                      AI MINDSET LAB © 2026
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Advanced Tracks ASCII Connectors */}
          <div className="grid grid-cols-1 md:grid-cols-4 hidden md:grid opacity-30 mt-4 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-center text-current">
                <pre className="text-[10px] leading-[10px] text-center font-bold">
                  {`\\     /
 \\   / 
  \\ /  
   v   `}
                </pre>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-l border-y border-current/10">
            {[
              {
                id: 'T1',
                title: 'AI Coaching',
                date: '21 Jan',
                desc: 'Для тех, кто выгорел и ищет баланс. AI для коучинга, рефлексии.',
                result: 'персональные AI-коучи, ритуалы продуктивности, трекинг целей',
                tools: ['Claude', 'Notion', 'Obsidian'],
                speaker: 'Анна Лозицкая',
                art: 'practice'
              },
              {
                id: 'T2',
                title: 'AI Agents',
                date: '28 Jan',
                desc: 'Автономные AI-системы. Проектирование и запуск агентов.',
                result: 'автономные агенты, MCP-интеграции, workflows',
                tools: ['Claude', 'MCP', 'n8n', 'Make'],
                speaker: 'Сергей Х., Александр П.',
                art: 'structure'
              },
              {
                id: 'T3',
                title: 'Vibe-Coding',
                date: '4 Feb',
                desc: 'Творческое программирование. От идеи до прототипа за часы.',
                result: 'vibe-coding workflow, проекты',
                tools: ['Cursor', 'Windsurf', 'v0'],
                speaker: 'Серёжа Рис',
                art: 'community'
              },
              {
                id: 'T4',
                title: 'AI Creative',
                date: '11 Feb',
                desc: 'Для музыкантов, художников и креативщиков.',
                result: 'генерация музыки (Suno), визуал (Midjourney)',
                tools: ['Suno', 'Midjourney', 'Runway ML'],
                speaker: 'Анка Ставенски',
                art: 'personal'
              },
            ].map((track, idx) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <div className={`h-[400px] flex flex-col justify-between border-r border-current/10 group overflow-hidden relative transition-colors ${track.id==='T1'?'bg-[#8DC63F]/5':'bg-[var(--color-bg)]'}`}>
                  
                  {/* Default State */}
                  <div className="absolute inset-0 p-8 flex flex-col h-full z-10 bg-[var(--color-bg)] transition-opacity duration-300 group-hover:opacity-0 group-hover:pointer-events-none">
                    <div className="flex justify-between items-start mb-8 text-[10px] font-bold uppercase tracking-widest">
                      <div className="opacity-40">{track.date}</div>
                      <div className="border border-current/30 bg-current/5 px-2 py-0.5 rounded font-bold">ADVANCED (+₽)</div>
                    </div>
                    <div className="flex-1 flex items-center justify-center -mx-4 text-[#8DC63F]">
                       <AsciiArt type={track.art} className="opacity-60 scale-75" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black uppercase mb-2 leading-tight">{track.title}</h3>
                      <div className="text-[9px] font-bold opacity-40 uppercase tracking-widest leading-relaxed">
                        {track.speaker}
                      </div>
                    </div>
                  </div>

                  {/* Hover State */}
                  <div className="absolute inset-0 p-8 flex flex-col bg-black text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20">
                    <div className="text-[10px] uppercase tracking-widest font-bold mb-6 flex justify-between">
                      <span>ПОДРОБНЕЕ —</span>
                      <span>{track.date}</span>
                    </div>
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                      <p className="text-sm font-bold leading-relaxed mb-6">{track.desc}</p>
                      <ul className="text-xs space-y-2 mb-6 opacity-90">
                        {track.result.split(', ').map((r, i) => <li key={i}>• {r}</li>)}
                      </ul>
                      <div className="text-xs">
                        <span className="opacity-60">Инструменты: </span>
                        {track.tools.join(', ')}
                      </div>
                    </div>
                    <div className="text-[8px] uppercase tracking-widest opacity-60 mt-6 shrink-0 flex justify-between">
                      <span>{track.speaker}</span>
                      <span>ADVANCED TRACK</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <ProgramScheduleGrid />

      {/* Cases Section */}
      <SlashDivider />
      <section id="cases" className="py-20 md:py-32 bg-[#332b2b]/5">
        <Container>
          <SectionLabel text="CASES" number="03" />
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

      {/* Eye Rest Block 2 */}
      <section className="py-24 md:py-32 border-[var(--color-bg)] bg-white/5 border-y border-current/10 overflow-hidden">
        <Container>
          <div className="flex items-center justify-between mb-24 flex-row-reverse">
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">РАЗДЕЛ (III)</div>
            <div className="font-black uppercase tracking-widest text-xl md:text-2xl text-right">Экспертиза</div>
          </div>
          <div className="grid md:grid-cols-2 gap-16 md:gap-8 items-center">
            <div className="flex justify-center md:justify-start text-[#8DC63F] md:order-1 order-2">
              <div className="w-56 h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 relative flex items-center justify-center text-[8px] leading-[8px]">
                <AsciiArt type="neural" className="scale-125 md:scale-150" />
              </div>
            </div>
            <div className="text-right md:order-2 order-1">
              <h2 className="text-3xl md:text-5xl leading-tight mb-12">
                Мы не учим кодить — мы учим собирать системы, многократно усиливающие ваши возможности.
              </h2>
              <div className="flex gap-4 justify-end">
                <div className="w-12 h-12 rounded-full border border-current/20 flex items-center justify-center text-[10px] font-bold">03</div>
                <div className="w-12 h-12 rounded-full border border-current/20 flex items-center justify-center text-[10px] font-bold">04</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 md:py-32">
        <Container>
          <SectionLabel text="WHO WE ARE" number="05" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4">
            {[
              {
                name: 'Александр Поваляев',
                role: 'Основатель, стратег',
                desc: '15+ лет соединяет технологии, бизнес и людей.',
                tg: 'alex_named_ai',
                photo: 'https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/65d18cfa-068c-41be-84e1-71fb9061e483/image/w=1920,quality=90,fit=scale-down'
              },
              {
                name: 'Сергей Хабаров',
                role: 'Системный архитектор',
                desc: '6+ лет в образовании, 500+ обученных.',
                tg: 'alliknowisthatidontknownothing',
                photo: 'https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/60092ff1-af15-4fa1-94a3-70431999739a/image/w=1920,quality=90,fit=scale-down'
              },
              {
                name: 'Степан Гершуни',
                role: 'Founder, тех-стратег',
                desc: 'Автор cybOS. Инвестор. Построил Credentia.',
                tg: 'cryptoEssay',
                photo: 'https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/d28cb095-3c81-4633-b608-9a3f4d6d02d5/0b9e2c9f-8eb2-4e87-899f-919341b68082/w=1920,quality=90,fit=scale-down'
              },
              {
                name: 'Алексей Иванов',
                role: 'Executive-коуч',
                desc: 'ICF PCC, ex-дизайн лид. Помогает фаундерам.',
                tg: 'ponchiknews',
                photo: 'https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/80776b2f-5e06-416e-b6ef-7ef73f71cbf8/2026-01-16_15.04.52/w=1920,quality=90,fit=scale-down'
              },
              {
                name: 'Серёжа Рис',
                role: 'AI-евангелист',
                desc: 'Билдер в @vibecod3rs. Клод-код стример.',
                tg: 'ris_ai',
                photo: 'https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/83ec9f32-8032-4691-8ccd-b035b688b08c/cleanshot_2026-01-15_at_15.18.012x/w=1920,quality=90,fit=scale-down'
              },
              {
                name: 'Анка Ставенски',
                role: 'Продуктовый архитектор',
                desc: 'PO в стартапах и визуальный сторителлер.',
                tg: 'anca_log',
                photo: 'https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/735c6a27-9f9b-4740-8eb9-d0c0ab495288/image/w=1920,quality=90,fit=scale-down'
              },
            ].map((member, i) => (
              <div key={i} className="flex flex-col gap-3 group">
                <div className="w-full aspect-square bg-[#332b2b]/5 border-2 border-transparent group-hover:border-current mix-blend-luminosity overflow-hidden relative">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-10"><User size={48} /></div>
                  )}
                  <div className="absolute inset-0 bg-current/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center p-4">
                    <p className="text-[10px] text-[var(--color-bg)] uppercase leading-relaxed text-center">{member.desc}</p>
                    <a href={`https://t.me/${member.tg}`} target="_blank" rel="noreferrer" className="mt-4 text-[9px] text-[var(--color-bg)] font-bold text-center underline tracking-widest">TELEGRAM</a>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-tight leading-tight">{member.name}</h3>
                  <p className="text-[9px] opacity-40 uppercase tracking-widest leading-none mt-1">{member.role}</p>
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
          <SectionLabel text="FEEDBACK" number="06" />
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
                  <p className="text-sm md:text-base leading-relaxed opacity-80 mb-6 flex-grow">«{f.text}»</p>
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

      {/* Pricing Section */}
      <SlashDivider />
      <section id="pricing" className="py-20 md:py-32">
        <Container>
          <SectionLabel text="PRICE" number="07" />
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
                <div className={`flex flex-col h-full transition-all duration-500 border-2 border-current ${plan.highlight ? 'bg-[var(--theme-text)] text-[var(--theme-bg)]' : 'bg-transparent text-current hover:bg-black/5'}`}>
                  <button
                    type="button"
                    onClick={() => isMobile && setFlippedPricing((prev) => ({ ...prev, [plan.name]: !prev[plan.name] }))}
                    className="w-full text-left p-6 md:p-8 flex flex-col h-full"
                  >
                    <motion.div
                      animate={{ rotateY: isMobile && flippedPricing[plan.name] ? 180 : 0 }}
                      transition={{ duration: 0.45 }}
                      style={{ transformStyle: 'preserve-3d' }}
                      className="relative flex flex-col h-full"
                    >
                      <div style={{ backfaceVisibility: 'hidden' }} className={isMobile && flippedPricing[plan.name] ? 'opacity-0 h-0 overflow-hidden' : ''}>
                        <div className="flex justify-between items-start mb-8">
                          <div className={`text-[10px] font-bold border px-2 py-0.5 uppercase ${plan.highlight ? 'border-[var(--theme-bg)]' : 'border-current'}`}>{plan.tag}</div>
                          {plan.highlight && <Zap size={20} className="text-[var(--theme-bg)]" />}
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

                        <div className="text-[10px] opacity-40 uppercase mb-8">{plan.desc}</div>

                        <a
                          href="https://join.aimindset.org/context"
                          className={`w-full py-4 text-center font-black uppercase text-sm border-2 transition-all hover:opacity-80 
                            ${plan.highlight ? 'bg-[var(--theme-bg)] text-[var(--theme-text)] border-[var(--theme-bg)]' : 'bg-[var(--theme-text)] text-[var(--theme-bg)] border-[var(--theme-text)]'}
                          `}
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
                </div>
              </motion.div>
            ))}
          </div>

          {/* Team Plan (Redesigned Strip) */}
          <div className="mt-8 border-2 border-current p-6 flex flex-col md:flex-row justify-between items-center gap-6 bg-transparent text-current hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)] transition-colors cursor-pointer group" onClick={() => window.open('https://aimindset.org/ai-mindset-consulting', '_blank')}>
            <div className="flex items-center gap-4 text-center md:text-left">
              <span className="text-[10px] font-bold border border-current group-hover:border-[var(--theme-bg)] px-2 py-1 uppercase hidden md:inline-block">FOR TEAMS</span>
              <span className="text-xl md:text-2xl font-black uppercase tracking-tighter">TEAM PREMIUM</span>
            </div>
            <div className="text-[10px] md:text-xs uppercase opacity-70 text-center max-w-sm">
              Корпоративное обучение под задачи бизнеса (от 3 чел.) с поддержкой тех-архитекторов
            </div>
            <div className="flex items-center gap-6">
              <span className="text-2xl font-black md:mr-4">€3,500+</span>
              <span className="font-bold underline text-[10px] uppercase tracking-widest hover:no-underline hidden md:inline-block flex items-center gap-2">УЗНАТЬ БОЛЬШЕ <ExternalLink size={14} /></span>
            </div>
          </div>
        </Container>
      </section>

      {/* Application Form Section */}
      <SlashDivider />
      <section id="apply" className="py-20 md:py-32 relative overflow-hidden" style={{ backgroundColor: colors.bg, color: colors.text }}>
        <Container>
          <SectionLabel text="ЗАЯВКА" number="08" />

          <div className="max-w-2xl mx-auto border-2 border-current p-8 md:p-12 relative bg-transparent">
            {/* Semantic ascii corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current" />
            
            <form className="space-y-0 flex flex-col">
              <input
                type="text"
                placeholder="ИМЯ"
                className="w-full bg-transparent border-b-2 border-current/20 px-4 py-4 text-sm tracking-[0.16em] uppercase placeholder:text-current/40 focus:outline-none focus:border-current transition-colors"
                required
              />
              <input
                type="email"
                placeholder="EMAIL"
                className="w-full bg-transparent border-b-2 border-current/20 px-4 py-4 text-sm tracking-[0.16em] uppercase placeholder:text-current/40 focus:outline-none focus:border-current transition-colors"
                required
              />
              <input
                type="text"
                placeholder="ТЕЛЕГРАМ НИК"
                className="w-full bg-transparent border-b-2 border-current/20 px-4 py-4 text-sm tracking-[0.16em] uppercase placeholder:text-current/40 focus:outline-none focus:border-current transition-colors"
                required
              />
              
              <div className="grid md:grid-cols-2 border-b-2 border-current/20">
                <select
                  className="w-full bg-transparent border-r-0 md:border-r-2 border-current/20 px-4 py-4 text-xs tracking-[0.12em] uppercase focus:outline-none focus:bg-current/5 appearance-none rounded-none"
                  required
                >
                  <option value="" disabled>ВЫБРАТЬ ТРЕК</option>
                  <option value="main-lab">MAIN LAB</option>
                  <option value="ai-coaching">AI COACHING</option>
                  <option value="ai-agents">AI AGENTS</option>
                  <option value="vibe-coding">VIBE-CODING</option>
                  <option value="ai-creative">AI CREATIVE</option>
                </select>
                
                <select
                  className="w-full bg-transparent px-4 py-4 text-xs tracking-[0.12em] uppercase focus:outline-none focus:bg-current/5 appearance-none rounded-none border-t-2 border-current/20 md:border-t-0"
                  required
                >
                  <option value="" disabled>ВЫБРАТЬ ПЛАН</option>
                  <option value="base">MAIN LAB (BASE)</option>
                  <option value="advanced">ADVANCED (+4 TRACKS)</option>
                  <option value="premium">PREMIUM (LIMITED)</option>
                </select>
              </div>

              <textarea
                rows={3}
                placeholder="ПОЧЕМУ ВЫ ХОТИТЕ НА ЛАБОРАТОРИЮ?"
                className="w-full bg-transparent px-4 py-4 text-sm tracking-[0.16em] uppercase placeholder:text-current/40 focus:outline-none focus:border-current transition-colors resize-none border-b-2 border-current/20"
                required
              />

              <div className="relative mt-8">
                <button type="submit" className="w-full bg-[var(--theme-text)] text-[var(--theme-bg)] py-6 font-black uppercase tracking-[0.1em] text-lg hover:opacity-80 transition-colors">
                  ОТПРАВИТЬ ЗАЯВКУ
                </button>
              </div>
            </form>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-24 relative overflow-hidden bg-black text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
          <div className="text-[100px] md:text-[22vw] font-black opacity-[0.05] uppercase whitespace-nowrap tracking-tighter">AI MINDSET</div>
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

      {/* Persistent Floating Button */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[80] w-auto px-4 md:hidden">
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
      <CookieConsent />
      </motion.div>
    </div >
  );
}

const CookieConsent = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-8 right-8 z-[200] max-w-sm w-[calc(100vw-64px)]"
    >
      <div className="relative p-0.5 bg-black/5 backdrop-blur-xl group">
        <div className="absolute inset-0 border border-current opacity-20 group-hover:opacity-40 transition-opacity" />
        <div className="relative bg-[var(--theme-bg)] text-current p-6 border border-current shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="text-[9px] font-black tracking-[0.3em] opacity-40 uppercase">Cookie Notice // System 2026</div>
            <div className="flex gap-1">
              {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-[#8DC63F]" />)}
            </div>
          </div>
          <p className="text-[10px] md:text-xs leading-relaxed mb-6 uppercase font-bold">
            Мы используем куки (и частицы своего настроения), чтобы сделать ваш опыт в лаборатории идеальным. Продолжая, вы соглашаетесь с условиями.
          </p>
          <div className="flex items-center gap-6">
            <button 
              onClick={accept}
              className="bg-[#8DC63F] text-white px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              [ ПРИНЯТЬ ]
            </button>
            <button 
              onClick={() => setShow(false)}
              className="text-[9px] font-bold uppercase opacity-30 hover:opacity-100 transition-opacity underline decoration-1 underline-offset-4"
            >
              закрыть
            </button>
          </div>
          
          <div className="absolute -bottom-2 -right-2 opacity-5 pointer-events-none">
             <AsciiArt type="diamond" className="scale-50" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
