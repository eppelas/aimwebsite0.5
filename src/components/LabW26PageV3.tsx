import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  ChevronRight,
  FlaskConical
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
    logoLeft.src = '/assets/ai-mindset-logo.png';
    let logoLoaded = false;
    logoLeft.onload = () => { logoLoaded = true; };

    const draw = () => {
      ctx.clearRect(0, 0, 600, 600);
      if (logoLoaded) {
         ctx.drawImage(logoLeft, startX, startY, (width / 2) * total, height * total);
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
  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="absolute left-full top-0 ml-4 bg-[#f9f9f7] border border-black/10 p-6 flex flex-col xl:flex-row gap-4 shadow-2xl z-50">
    <div className="absolute top-[-24px] left-0 text-[9px] tracking-widest opacity-40 uppercase">LABS · HOVER MENU</div>
    
    <a href="https://aimindset.org/ai-mindset" target="_blank" className="block border border-black/10 p-4 w-48 hover:border-black transition-colors bg-white">
       <div className="text-[9px] uppercase tracking-widest opacity-40 mb-4">CURRENT</div>
       <div className="text-xs font-bold uppercase tracking-widest">SPRING MAIN LAB</div>
    </a>
    <a href="https://aimindset.org/sprint-pos" target="_blank" className="block border border-black/10 p-4 w-48 hover:border-black transition-colors bg-white">
       <div className="text-[9px] uppercase tracking-widest opacity-40 mb-4">CURRENT</div>
       <div className="text-xs font-bold uppercase tracking-widest">{`{PERSONAL OS}`}</div>
    </a>
    <a href="https://ai-native.aimindset.org/" target="_blank" className="block border border-black/10 p-4 w-48 hover:border-black transition-colors bg-white">
       <div className="text-[9px] uppercase tracking-widest opacity-40 mb-4">CURRENT</div>
       <div className="text-xs font-bold uppercase tracking-widest">{`{AI-NATIVE ORGS}`}</div>
    </a>
    <div className="block border border-black/5 p-4 w-48 opacity-30 bg-transparent border-dashed">
       <div className="text-[9px] uppercase tracking-widest mb-4">FUTURE</div>
       <div className="text-xs font-bold uppercase tracking-widest">MULTI-AGENTS</div>
    </div>
  </motion.div>
);

// --- MAIN PAGE ---

export default function LabW26PageV3() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [labsDropdownOpen, setLabsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.3);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsSidebarOpen(false);
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
        <nav className="flex flex-col gap-6 text-[11px] font-bold uppercase tracking-widest opacity-60">
          <div className="relative group flex items-center gap-2 w-fit" onMouseEnter={() => setLabsDropdownOpen(true)} onMouseLeave={() => setLabsDropdownOpen(false)}>
            <div className="flex items-center gap-2 hover:text-black hover:opacity-100 transition-opacity cursor-pointer">
              {`{labs}`} <span className="opacity-30">|</span>
            </div>
            <AnimatePresence>
              {labsDropdownOpen && <LabsHoverMenu />}
            </AnimatePresence>
          </div>
          <a href="https://aimindset.org/ai-mindset-community" target="_blank" className="flex items-center gap-2 hover:text-black hover:opacity-100 transition-opacity w-fit">
            COMMUNITY {`{SPACE}`} <span className="opacity-30">|</span>
          </a>
          <a href="https://aimindset.org/ai-mindset-consulting" target="_blank" className="flex items-center gap-2 hover:text-black hover:opacity-100 transition-opacity w-fit">
            {`{FOR-TEAMS}`} <span className="opacity-30">|</span>
          </a>
          <a href="https://aimindset.org/" target="_blank" className="flex items-center gap-2 hover:text-black hover:opacity-100 transition-opacity w-fit">
            NON-PROFIT <span className="opacity-30">|</span>
          </a>
        </nav>
        <div className="mt-auto">
          <a href="https://join.aimindset.org/waitlist" className="bg-[#8DC63F] text-white p-6 text-[10px] font-black uppercase tracking-widest text-center block hover:bg-black transition-colors rounded-sm">ЗАПИСАТЬСЯ</a>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[400] md:hidden" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed top-0 left-0 w-[85%] h-full bg-[#f9f9f7] z-[450] p-10 flex flex-col md:hidden shadow-2xl">
              <nav className="flex flex-col gap-8 text-sm font-black uppercase tracking-[0.2em] mt-20">
                {SIDEBAR_NAV.map(link => (
                  <button key={link.label} onClick={() => scrollTo(link.href)} className="text-left">{link.label}</button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="w-full min-h-screen relative">
        {/* Mobile Header */}
        <header className={`md:hidden fixed top-0 left-0 w-full h-16 bg-white border-b border-black/10 flex items-center justify-between px-6 z-[350] transition-opacity duration-700 ease-in-out ${scrolled ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
           <button onClick={() => setIsSidebarOpen(true)} className="pointer-events-auto"><Menu size={20} /></button>
           <div className="flex items-center gap-2">
              <img src="/assets/ai-mindset-logo.png" className="h-5 w-5 object-contain" alt="LOGO" />
              <div className="text-[10px] font-black tracking-tighter uppercase">AI MINDSET</div>
           </div>
           <a href="https://join.aimindset.org/waitlist" className="bg-[#8DC63F] text-white px-3 py-2 text-[9px] font-black uppercase rounded-sm pointer-events-auto">JOIN</a>
        </header>

        {/* Header Ticker */}
        <header className={`fixed top-16 md:top-0 right-0 w-full md:w-[80%] h-12 bg-white border-b border-black/10 flex items-center px-10 z-[250] overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out ${scrolled ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'}`}>
            <div className="text-[9px] font-black uppercase tracking-[0.6em] flex items-center gap-8 animate-marquee">
               <span>AI MINDSET LAB W26</span> <span className="opacity-40">.</span> <span>BATCH: WINTER 26</span> <span className="opacity-40">.</span> <span>APPLICATIONS: CLOSE</span> <span className="opacity-40">.</span> <span>NEXT BATCH: 20 APRIL</span> <span className="opacity-40">.</span>
               <span>AI MINDSET LAB W26</span> <span className="opacity-40">.</span> <span>BATCH: WINTER 26</span> <span className="opacity-40">.</span> <span>APPLICATIONS: CLOSE</span> <span className="opacity-40">.</span> <span>NEXT BATCH: 20 APRIL</span> <span className="opacity-40">.</span>
            </div>
        </header>

        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center pt-32 pb-12">
          <Container>
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
               <div className="w-full lg:w-3/5 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-8 opacity-40 text-[10px] font-black uppercase tracking-widest"><FlaskConical size={14} /> FOUNDATION // LAB W26</div>
                  <h1 className="text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.9] mb-12 uppercase">
                    <span className="whitespace-nowrap">AI Mindset</span> Main Lab W26
                  </h1>
                  
                  {/* MODAL ORDER FOR MOBILE: LOGO BETWEEN TITLE AND DESCRIPTION */}
                  <div className="lg:hidden mb-12">
                     <VoxelLogoFace className="w-full max-w-[280px] mx-auto" scale={1} />
                  </div>

                  <p className="max-w-md mx-auto lg:mx-0 text-sm uppercase leading-relaxed font-bold opacity-70 mb-12">От единого контекста к персональной AI-операционной системе.</p>
                  <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6">
                     <a href="https://join.aimindset.org/waitlist" className="bg-black text-white px-10 py-6 text-xs font-black uppercase tracking-widest hover:bg-[#8DC63F] transition-all text-center">ПОДАТЬ ЗАЯВКУ</a>
                  </div>
               </div>
               
               {/* DESKTOP LOGO */}
               <div className="hidden lg:block w-full lg:w-2/5">
                  <VoxelLogoFace className="w-full max-w-md mx-auto" />
               </div>
            </div>
          </Container>
        </section>

         {/* Other Content - Nested in a wrapper to avoid full width overlap with sidebar once scrolled */}
         <div className="md:ml-[20%] md:w-[80%] w-full">
            <section id="philosophy" className="py-32 border-t border-black/10">
              <Container>
                <SectionLabel text="ФИЛОСОФИЯ" number="01" />
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1">
                   {['MINDSET > TOOLS', 'PRACTICE FIRST', 'SYSTEM FLOW', 'VIBE CODING'].map((t, i) => (
                     <div key={i} className="p-10 border border-black/10 hover:border-black transition-colors group">
                        <div className="text-[10px] opacity-20 mb-10">0{i+1}</div>
                        <h3 className="text-xl font-black uppercase tracking-tighter mb-4">{t}</h3>
                     </div>
                   ))}
                </div>
              </Container>
            </section>
            
            <footer className="py-20 border-t border-black/10 px-12 opacity-40 text-[10px] font-black flex justify-between uppercase">
                <span>© AI MINDSET LAB 2026</span>
                <div className="flex gap-4"><span>TG</span><span>YT</span><span>IG</span></div>
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
    <div className="fixed bottom-6 right-6 z-[600] max-w-[320px] w-[calc(100%-48px)] bg-white border-2 border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="text-[9px] font-black opacity-30 mb-4 uppercase tracking-widest">SYSTEM NOTICE</div>
        <p className="text-[10px] font-bold leading-relaxed mb-6 uppercase text-black">МЫ ИСПОЛЬЗУЕМ КУКИ ДЛЯ ВАШЕЙ AI-СИНХРОНИЗАЦИИ.</p>
        <button onClick={() => { localStorage.setItem('cookie-consent', 'true'); setShow(false); }} className="w-full bg-black text-white py-4 text-[10px] font-black uppercase hover:bg-[#8DC63F] transition-colors">ПОНЯТНО</button>
    </div>
  );
};
