import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronDown, CheckCircle, Circle, ArrowRight } from 'lucide-react';

const PROGRAM_TRACKS = [
  {
    id: '01',
    week: 'WEEK 1',
    title: 'Prompt Engineering',
    shortDescription: 'AI КАК ИНТЕРФЕЙС МЫШЛЕНИЯ',
    longDescription: 'Освоение техник промптов: Chain-of-Thought, Few-Shot Learning, Custom GPTs. Создание первых персональных ассистентов.',
    art: 'prompt',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '02',
    week: 'WEEK 2',
    title: 'Context Engineering',
    shortDescription: 'АВТОМАТИЗАЦИЯ И АГЕНТЫ',
    longDescription: 'Управление контекстом: Obsidian + MCP + Claude. Автоматизация через n8n, Make. AI-агенты и workflows.',
    art: 'context',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '03',
    week: 'WEEK 3',
    title: 'Mind Engineering',
    shortDescription: 'ПРОДУКТИВНОСТЬ И РИТУАЛЫ',
    longDescription: 'AI для коучинга, рефлексии, персональных ритуалов. Трекинг привычек и целей с поддержкой AI.',
    art: 'mind',
    image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '04',
    week: 'WEEK 4',
    title: 'Life Engineering',
    shortDescription: 'ТВОРЧЕСТВО И РЕАЛИЗАЦИЯ',
    longDescription: 'От идеи до прототипа. Vibe-coding с Cursor, Windsurf, Claude Projects. Создание без технического бэкграунда.',
    art: 'life',
    image: 'https://images.unsplash.com/photo-1618005192384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
  },
];

const ADVANCED_TRACKS = [
  { id: 'T1', week: 'WEEK 1', title: 'AI Coaching', description: 'Для тех, кто выгорел и ищет баланс. AI для коучинга, рефлексии.', speaker: 'Александр Поваляев' },
  { id: 'T2', week: 'WEEK 2', title: 'AI Agents', description: 'Автономные AI-системы. Проектирование и запуск AI-агентов.', speaker: 'Сергей Хабаров' },
  { id: 'T3', week: 'WEEK 3', title: 'Vibe-Coding', description: 'Творческое программирование. От идеи до прототипа за часы.', speaker: 'Анна Лозицкая' },
  { id: 'T4', week: 'WEEK 4', title: 'AI Creative', description: 'Для музыкантов, художников и креативщиков. Генерация визуального контента.', speaker: 'Анка Ставенски' },
];

const EditorialSectionHeader = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="flex items-end gap-6 md:gap-8 mb-12">
    <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 shrink-0">{eyebrow}</div>
    <div className="h-px flex-1 bg-black/10 mb-[0.28rem]" />
    <div className="font-black uppercase tracking-widest text-xl md:text-2xl text-right">{title}</div>
  </div>
);

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-24">
    {children}
  </div>
);

// ==========================================
// VARIANT A: Stepped Pipeline (Focus on Current)
// ==========================================
const VariantA_Pipeline = () => {
  const currentWeek = 2; // Simulating we are on Week 2 or looking at Week 2

  return (
    <div className="mb-32">
      <EditorialSectionHeader eyebrow="VARIANT A" title="Stepped Pipeline" />
      <p className="mb-8 text-sm opacity-60 uppercase max-w-2xl">
        Idea: Show the whole path but heavily emphasize the "current/active" step. Past steps are simplified to "completed" bars. Future steps are dashed and muted.
      </p>

      <div className="flex flex-col gap-4">
        {PROGRAM_TRACKS.map((track, idx) => {
          const step = idx + 1;
          const isPast = step < currentWeek;
          const isCurrent = step === currentWeek;
          const isFuture = step > currentWeek;

          return (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative border transition-all duration-300 ${
                isCurrent 
                  ? 'border-[#8DC63F] bg-[#8DC63F]/5 py-8 px-6 md:px-10' 
                  : isPast 
                    ? 'border-black/20 bg-black/5 py-4 px-6 opacity-60' 
                    : 'border-black/20 border-dashed py-6 px-6 opacity-40 hover:opacity-100 bg-white/30'
              }`}
            >
              <div className="flex flex-col md:flex-row gap-6 md:items-center">
                {/* Status Indicator */}
                <div className="flex items-center gap-4 w-full md:w-48 shrink-0">
                  {isPast && <CheckCircle className="w-5 h-5 opacity-50" />}
                  {isCurrent && <ArrowRight className="w-5 h-5 text-[#8DC63F] animate-pulse" />}
                  {isFuture && <Circle className="w-5 h-5 opacity-30" />}
                  
                  <span className={`font-mono text-[10px] tracking-widest font-bold ${isCurrent ? 'text-[#8DC63F]' : ''}`}>
                    {track.week}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className={`font-black uppercase tracking-tighter ${isCurrent ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>
                    {track.title}
                  </h3>
                  {isCurrent && (
                    <div className="mt-4 flex flex-col gap-2">
                      <div className="text-[10px] font-bold tracking-widest opacity-60 text-[#8DC63F]">{track.shortDescription}</div>
                      <p className="text-sm opacity-80 max-w-2xl leading-relaxed mt-2">{track.longDescription}</p>
                    </div>
                  )}
                  {!isCurrent && (
                    <div className="text-[9px] uppercase tracking-widest opacity-60 mt-1">{track.shortDescription}</div>
                  )}
                </div>
              </div>

              {/* Decorative side brackets for active state */}
              {isCurrent && (
                <>
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8DC63F]" />
                  <div className="absolute right-0 top-0 w-8 h-8 border-t-2 border-r-2 border-[#8DC63F] opacity-30" />
                  <div className="absolute right-0 bottom-0 w-8 h-8 border-b-2 border-r-2 border-[#8DC63F] opacity-30" />
                </>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// VARIANT B: Data Dashboard (Technical Grid)
// ==========================================
const VariantB_Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mb-32">
      <EditorialSectionHeader eyebrow="VARIANT B" title="Dashboard Tabs" />
      <p className="mb-8 text-sm opacity-60 uppercase max-w-2xl">
        Idea: A compact console-like interface. Left side acts as a navigation directory, right side acts as the active file/window. Avoids scrolling fatigue and clearly marks the "active" file.
      </p>

      <div className="flex flex-col md:flex-row border border-black/10 bg-white/40 min-h-[400px]">
        {/* Navigation Sidebar */}
        <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-black/10 flex flex-col bg-white/60">
          <div className="p-4 border-b border-black/10 font-mono text-[10px] opacity-40">
            {'>'} DIRECTORY_INDEX
          </div>
          {PROGRAM_TRACKS.map((track, idx) => (
            <button
              key={track.id}
              onClick={() => setActiveTab(idx)}
              className={`p-6 text-left border-b border-black/5 transition-all outline-none flex items-center justify-between ${
                activeTab === idx 
                  ? 'bg-white border-l-4 border-l-[#8DC63F] shadow-sm' 
                  : 'hover:bg-black/5 border-l-4 border-transparent'
              }`}
            >
              <div>
                <div className={`text-[10px] font-bold tracking-widest mb-1 ${activeTab === idx ? 'opacity-80 text-[#8DC63F]' : 'opacity-40'}`}>
                  {track.id} // {track.week}
                </div>
                <div className={`font-bold uppercase tracking-widest text-sm ${activeTab === idx ? 'text-black' : 'text-black/70'}`}>
                  {track.title}
                </div>
              </div>
              {activeTab === idx && <ChevronRight className="w-4 h-4 text-[#8DC63F]" />}
            </button>
          ))}
        </div>

        {/* Console Main Window */}
        <div className="md:w-2/3 p-6 md:p-10 relative overflow-hidden bg-[#F4F4F4]">
          <div className="absolute top-0 right-0 p-4 font-mono text-[10px] opacity-20">
            [ STATUS: ACTIVE ]
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full flex flex-col"
            >
              <div className="font-mono text-[#8DC63F] text-xs mb-8">
                $ init_module --target {PROGRAM_TRACKS[activeTab].id}
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">
                {PROGRAM_TRACKS[activeTab].title}
              </h2>
              <div className="inline-block bg-[#8DC63F]/20 text-[#4c6b22] px-3 py-1 text-[10px] font-bold tracking-widest w-max mb-8 border border-[#8DC63F]/30 rounded">
                {PROGRAM_TRACKS[activeTab].shortDescription}
              </div>
              
              <p className="text-lg opacity-80 leading-relaxed max-w-xl">
                {PROGRAM_TRACKS[activeTab].longDescription}
              </p>

              <div className="mt-auto pt-12">
                <div className="font-mono text-[10px] opacity-40 border-t border-dashed border-black/20 pt-4 flex justify-between">
                  <span>SYSTEM_READY</span>
                  <span>{PROGRAM_TRACKS[activeTab].week}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// VARIANT C: Terminal Accordion (Mobile first)
// ==========================================
const VariantC_Accordion = () => {
  return (
    <div className="mb-32">
       {/* Removed the original Variant C to replace it with C1, C2, C3 polished versions */}
    </div>
  )
}

// ==========================================
// VARIANT C1: Elevated Accordion (Clean & Premium)
// ==========================================
const VariantC1_ElevatedAccordion = () => {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <div className="mb-32">
      <EditorialSectionHeader eyebrow="VARIANT C1" title="Accordion: Elevated" />
      <p className="mb-8 text-sm opacity-60 uppercase max-w-2xl">
        Idea: Премиальный, светлый аккордеон. Активное состояние выделяется не заливкой кислотным цветом, а тонкой рамкой, тенью и раскрытием контента. Картинка становится большим красивым хеддером для недели. Четкое разделение Core и Advanced.
      </p>

      <div className="flex flex-col gap-3">
        {PROGRAM_TRACKS.map((track, idx) => {
          const advanced = ADVANCED_TRACKS[idx];
          const isOpen = openIdx === idx;
          
          return (
            <div key={track.id} className="relative">
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className={`w-full text-left p-6 md:p-8 flex items-center justify-between transition-all duration-300 rounded-2xl ${
                  isOpen 
                    ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 z-10 relative rounded-b-none' 
                    : 'bg-white/50 hover:bg-white border border-black/5 hover:border-black/10'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs font-bold tracking-widest ${isOpen ? 'text-[#8DC63F]' : 'opacity-40'}`}>
                      {track.week}
                    </span>
                    {isOpen && <div className="hidden md:block w-px h-4 bg-black/10" />}
                  </div>
                  <span className={`font-black uppercase tracking-tighter text-xl md:text-2xl transition-colors ${isOpen ? 'text-black' : 'text-black/70'}`}>
                    {track.title}
                  </span>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="hidden md:flex flex-col items-end opacity-40">
                    <span className="text-[9px] uppercase font-bold tracking-widest">Core + Advanced</span>
                    <span className="text-[9px] font-mono tracking-widest">{track.id} / 04</span>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-[#8DC63F]/10 text-[#8DC63F]' : 'bg-black/5 text-black/40'}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 rounded-b-2xl relative z-0"
                  >
                    <div className="p-6 md:p-8 pt-0 border-t border-black/5 mt-4 group">
                      
                      {/* Premium Header Image */}
                      <div className="w-full h-40 md:h-56 relative rounded-xl overflow-hidden mb-8 bg-[#f4f4f4]">
                         <img src={track.image} alt={track.title} className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply scale-105 transition-transform duration-1000 group-hover:scale-100" />
                         <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                         
                         <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-black/5 flex items-center gap-2 shadow-sm">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
                           <span className="text-[10px] font-mono tracking-widest font-bold uppercase">{track.shortDescription}</span>
                         </div>
                      </div>
                      
                      {/* Content Split */}
                      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                        
                        {/* Core Track */}
                        <div className="flex-1">
                          <h4 className="font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2 opacity-50">
                            <span className="w-px h-3 bg-black/40" /> Core Program
                          </h4>
                          <p className="text-base md:text-lg opacity-90 leading-relaxed font-light">
                            {track.longDescription}
                          </p>
                        </div>

                        {/* Divider */}
                        <div className="hidden lg:block w-px bg-black/5 self-stretch" />
                        <div className="block lg:hidden h-px bg-black/5 w-full" />

                        {/* Advanced Track Sidebar */}
                        <div className="w-full lg:w-[320px] shrink-0 bg-[#fbfbfb] p-6 rounded-xl border border-black/5">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold uppercase tracking-widest text-xs flex items-center gap-2 text-[#8DC63F]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" /> Advanced Track
                            </h4>
                            <span className="text-[9px] font-mono uppercase tracking-widest opacity-40 border border-black/10 px-1.5 py-0.5 rounded">Pro</span>
                          </div>
                          
                          <div className="mb-5">
                            <div className="font-bold text-lg mb-2 leading-tight">{advanced.title}</div>
                            <p className="text-sm opacity-60 leading-relaxed">{advanced.description}</p>
                          </div>
                          
                          <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                            <div className="w-10 h-10 rounded-full bg-white border border-black/10 shadow-sm flex items-center justify-center">
                              <span className="text-[10px] opacity-20">pic</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[9px] font-mono uppercase tracking-widest opacity-40 mb-0.5">Guest Speaker</span>
                              <span className="text-sm font-bold leading-none">{advanced.speaker}</span>
                            </div>
                          </div>
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
    </div>
  );
};

// ==========================================
// VARIANT C2: Minimalist Line Accordion
// ==========================================
const VariantC2_LineAccordion = () => {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <div className="mb-32">
      <EditorialSectionHeader eyebrow="VARIANT C2" title="Accordion: Minimal Lines" />
      <p className="mb-8 text-sm opacity-60 uppercase max-w-2xl">
        Idea: Сверх-минималистичный дизайн, опирающийся на типографику и тонкие линии (без плашек/карточек). Напоминает журнальную верстку или high-end fashion e-commerce. Изображение появляется деликатно сбоку.
      </p>

      <div className="border-t-2 border-black">
        {PROGRAM_TRACKS.map((track, idx) => {
          const advanced = ADVANCED_TRACKS[idx];
          const isOpen = openIdx === idx;
          
          return (
            <div key={track.id} className="border-b border-black/10">
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="w-full text-left py-6 md:py-8 flex items-center justify-between group"
              >
                <div className="flex items-baseline gap-4 md:gap-12">
                  <span className={`font-mono text-sm tracking-widest font-bold transition-opacity ${isOpen ? 'opacity-100 text-[#8DC63F]' : 'opacity-30 group-hover:opacity-60 text-black'}`}>
                    {track.id}
                  </span>
                  <span className={`font-black uppercase tracking-tighter text-2xl md:text-5xl transition-all ${isOpen ? 'text-black' : 'text-black/50 group-hover:text-black/80'}`}>
                    {track.title}
                  </span>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className={`text-[10px] font-bold uppercase tracking-widest hidden md:block transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                    {track.shortDescription}
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }}>
                    {isOpen ? (
                      <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center font-mono text-lg leading-none pb-1 hover:bg-black/5">×</div>
                    ) : (
                      <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center font-mono text-lg leading-none pb-1 hover:border-black/40">+</div>
                    )}
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-10 pt-4 flex flex-col md:flex-row gap-8 lg:gap-16">
                      
                      {/* Info Area */}
                      <div className="flex-1 max-w-2xl pl-0 md:pl-[4.5rem]">
                        <p className="text-xl md:text-2xl font-light opacity-90 leading-snug mb-10">
                          {track.longDescription}
                        </p>

                        {/* Advanced Track Inline Box */}
                        <div className="bg-[#f2f2f2] p-6 lg:p-8 rounded relative border-l-2 border-[#8DC63F]">
                          <div className="absolute top-0 right-0 bg-[#8DC63F] text-white text-[8px] uppercase tracking-widest font-bold px-2 py-1">Advanced</div>
                          <div className="font-bold text-xl mb-2">{advanced.title}</div>
                          <p className="text-sm opacity-70 mb-6 max-w-md">{advanced.description}</p>
                          
                          <div className="flex items-center gap-3">
                             <div className="w-6 h-6 rounded-full bg-black/10" />
                             <span className="text-[10px] uppercase font-bold tracking-widest">{advanced.speaker}</span>
                          </div>
                        </div>
                      </div>

                      {/* Art Area */}
                      <div className="w-full md:w-[300px] lg:w-[400px] shrink-0 h-64 md:h-auto min-h-[300px] relative rounded-lg overflow-hidden bg-black/5">
                        <img src={track.image} className="absolute inset-0 w-full h-full object-cover mix-blend-darken grayscale opacity-40 hover:grayscale-0 hover:opacity-80 transition-all duration-700" alt=""/>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};


// ==========================================
// VARIANT C3: Immersive Block Accordion
// ==========================================
const VariantC3_ImmersiveBlock = () => {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <div className="mb-32">
      <EditorialSectionHeader eyebrow="VARIANT C3" title="Accordion: Immersive Blocks" />
      <p className="mb-8 text-sm opacity-60 uppercase max-w-2xl">
        Idea: Картинка является фоном для всего раскрытого блока. Очень сочно, но весь текст внутри читается с плашек на фоне полу-прозрачного стекла (glassmorphism). Создает сильное визуальное впечатление.
      </p>

      <div className="flex flex-col gap-2">
        {PROGRAM_TRACKS.map((track, idx) => {
          const advanced = ADVANCED_TRACKS[idx];
          const isOpen = openIdx === idx;
          
          return (
            <div key={track.id} className="relative rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className={`w-full text-left flex items-center justify-between p-6 md:p-8 transition-colors duration-300 relative z-20 ${
                  isOpen ? 'bg-black/40 text-white backdrop-blur-sm' : 'bg-white border border-black/10 hover:bg-black/5'
                }`}
              >
                <div className="flex items-center gap-4 md:gap-8">
                  <span className={`font-mono text-[10px] md:text-sm font-bold tracking-widest ${isOpen ? 'text-white/60' : 'text-black/40'}`}>
                    {track.week}
                  </span>
                  <span className={`font-black uppercase tracking-tighter text-xl md:text-3xl ${isOpen ? 'text-white' : 'text-black'}`}>
                    {track.title}
                  </span>
                </div>
                
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-white/20 text-white' : 'bg-black/5 text-black'}`}>
                   <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10"
                  >
                    {/* Background Image spanning the entire expanded area */}
                    <div className="absolute inset-0 z-0">
                      <img src={track.image} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>

                    <div className="relative z-10 p-6 md:p-10 pt-4 flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                      
                      {/* Core Content Box - Glassmorphism */}
                      <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl">
                        <div className="text-[#8DC63F] font-mono text-[10px] uppercase font-bold tracking-widest mb-4 flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-[#8DC63F]" /> Main Program
                        </div>
                        <p className="text-white text-lg md:text-xl font-medium leading-relaxed drop-shadow-sm">
                          {track.longDescription}
                        </p>
                      </div>

                      {/* Advanced Track Box - Glassmorphism, slightly different styling */}
                      <div className="w-full md:w-[350px] bg-black/40 backdrop-blur-2xl border border-white/10 p-8 rounded-2xl shadow-2xl shrink-0 text-white relative overflow-hidden">
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-[shimmer_3s_infinite]" />
                        
                        <div className="text-white/60 font-mono text-[10px] uppercase tracking-widest mb-4 flex justify-between items-center">
                           <span>Advanced Track</span>
                           <span className="border border-white/20 px-1.5 py-0.5 rounded opacity-50">PRO</span>
                        </div>
                        
                        <h4 className="font-bold text-xl mb-3">{advanced.title}</h4>
                        <p className="text-sm opacity-70 leading-relaxed max-w-[90%] mb-6">{advanced.description}</p>
                        
                        <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                          <div className="w-8 h-8 rounded-full bg-white/20 border border-white/10" />
                          <div className="text-xs font-bold tracking-wider uppercase opacity-90">{advanced.speaker}</div>
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
    </div>
  );
};


// ==========================================
// VARIANT D: The Grid with Active Overlays 
// ==========================================
const VariantD_Grid = () => {
  return (
    <div className="mb-32">
      <EditorialSectionHeader eyebrow="VARIANT D" title="Structural Grid with Heavy Contrast" />
      <p className="mb-8 text-sm opacity-60 uppercase max-w-2xl">
        Idea: Keep the 4-column grid from V3, but use heavy contrast to show progression. The current week gets the #8DC63F background, previous weeks get a dark/muted background, future weeks are white/hollow. Very clear "you are here" map.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-black/20">
        {PROGRAM_TRACKS.map((track, idx) => {
          const step = idx + 1;
          const currentWeek = 2; // Simulating active week
          
          const isPast = step < currentWeek;
          const isCurrent = step === currentWeek;
          const isFuture = step > currentWeek;

          return (
            <div 
              key={track.id} 
              className={`relative border-r border-b border-black/20 p-6 md:p-8 min-h-[350px] flex flex-col transition-all group ${
                isCurrent 
                  ? 'bg-[#8DC63F] text-black shadow-[inset_0_0_40px_rgba(255,255,255,0.3)]' 
                  : isPast 
                    ? 'bg-[#e5e5e5] text-black shadow-inner' 
                    : 'bg-white hover:bg-black/5'
              }`}
            >
              <div className="flex justify-between items-start mb-12">
                <div className={`font-mono text-[10px] tracking-widest ${isPast ? 'opacity-40 text-black' : isCurrent ? 'opacity-80 font-bold' : 'opacity-40'}`}>
                  {track.week}
                </div>
                {isPast && (
                  <div className="bg-black/10 text-black px-2 py-0.5 text-[8px] font-mono whitespace-nowrap">
                    [ COMPLETED ]
                  </div>
                )}
                {isCurrent && (
                  <div className="bg-white text-black px-2 py-0.5 text-[8px] font-bold font-mono whitespace-nowrap animate-pulse shadow-sm">
                    [ ACTIVE_NODE ]
                  </div>
                )}
                {isFuture && (
                  <div className="bg-black/10 text-black px-2 py-0.5 text-[8px] font-mono whitespace-nowrap">
                    [ PENDING ]
                  </div>
                )}
              </div>

              <div className="mt-auto">
                <h3 className={`font-black uppercase tracking-tighter text-2xl mb-4 leading-tight ${isCurrent ? '' : isPast ? 'opacity-80' : ''}`}>
                  {track.title}
                </h3>
                
                {/* On current show description, on others show short desc */}
                {isCurrent || isPast ? (
                  <p className={`text-[12px] leading-relaxed ${isPast ? 'opacity-60 font-light' : 'opacity-90 font-medium'}`}>
                    {track.longDescription}
                  </p>
                ) : (
                  <p className="text-[10px] font-mono uppercase tracking-widest opacity-40">
                    {track.shortDescription}
                  </p>
                )}
              </div>

              {/* Progress Bar bottom indicator */}
              <div className="absolute bottom-0 left-0 h-1 bg-black/10 w-full overflow-hidden">
                 {isPast && <div className="h-full bg-black/40 w-full" />}
                 {isCurrent && <div className="h-full bg-white/70 w-[45%]" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


// ==========================================
// VARIANT E: Timeline Grid (Sprint Schedule style)
// ==========================================
const VariantE_TimelineGrid = () => {
  return (
    <div className="mb-32">
      <EditorialSectionHeader eyebrow="VARIANT E" title="Sprint Schedule (Timeline Grid + Advanced)" />
      <p className="mb-12 text-sm opacity-60 uppercase max-w-2xl">
        Idea: Combines a clear chronological vertical timeline with an horizontal event breakdown. Advanced track is strongly connected but visually distinct, indicating an optional upgrade path directly on the week's layout. Features visual animated blocks to serve as "art".
      </p>

      <div className="relative border border-black/10 bg-white text-black p-4 md:p-12 overflow-hidden shadow-2xl rounded-3xl">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative flex flex-col gap-16 md:gap-24 pl-8 md:pl-24">
          {/* Main timeline line */}
          <div className="absolute left-[15px] md:left-[47px] top-4 bottom-12 w-[1px] bg-black/10" />

          {PROGRAM_TRACKS.map((track, idx) => {
            const currentWeek = 2; // Simulation
            const isPast = idx + 1 < currentWeek;
            const isCurrent = idx + 1 === currentWeek;
            const isFuture = idx + 1 > currentWeek;
            const advanced = ADVANCED_TRACKS[idx];

            return (
              <div key={track.id} className="relative flex flex-col lg:flex-row gap-8 lg:gap-12 w-full pt-4">
                
                {/* Node indicator */}
                <div className="absolute -left-[30.5px] md:-left-[71.5px] top-6 z-10">
                  {isCurrent ? (
                    <div className="relative w-4 h-4 rounded-full bg-[#8DC63F]">
                      <div className="absolute inset-0 rounded-full bg-[#8DC63F] animate-ping opacity-50" />
                    </div>
                  ) : (
                    <div className={`w-3 h-3 rounded-full border-2 ${isPast ? 'bg-white/30 border-white/30' : 'bg-[#161616] border-white/20'}`} />
                  )}
                </div>

                {/* Left side: Core Info & Art */}
                <div className="flex-1 max-w-2xl">
                  <div className={`font-mono text-xs tracking-widest mb-3 ${isPast ? 'opacity-40' : isCurrent ? 'text-[#8DC63F] font-bold shadow-sm' : 'opacity-40'}`}>
                    {track.week.toLowerCase()} — {track.shortDescription}
                  </div>
                  <h3 className={`text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-4 leading-tight ${isPast ? 'opacity-60' : 'opacity-100'}`}>
                    {track.title}
                  </h3>
                  <p className={`text-sm md:text-base opacity-70 leading-relaxed mb-8 max-w-lg ${isPast ? 'opacity-40' : ''}`}>
                    {track.longDescription}
                  </p>

                  {/* Core Visual Art Block */}
                  <div className={`relative w-full h-40 md:h-56 border rounded-xl overflow-hidden flex items-center justify-center font-mono text-[10px] ${isCurrent ? 'bg-[#8DC63F]/10 border-[#8DC63F]/30 text-[#8DC63F] shadow-inner' : 'bg-black/5 border-black/10 text-black/50'}`}>
                    {/* Visual pattern for art block */}
                    {isCurrent && (
                      <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #8DC63F 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                    )}
                    {/* 3D abstract Image Background */}
                    <img src={track.image} alt={track.title} className={`absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-50 z-0 transition-transform duration-1000 ${isCurrent ? 'scale-100' : 'scale-105 saturate-0'}`} />

                    {isCurrent ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} className="z-10 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-[#8DC63F]/50 shadow-lg text-black font-bold text-xs uppercase tracking-widest">
                         [ CLUSTER_RENDERING ]
                      </motion.div>
                    ) : (
                      <div className="opacity-60 z-10 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-black/10">[ STATIC_DATA ]</div>
                    )}
                  </div>
                </div>

                {/* Right side: Advanced Integration & Tags */}
                <div className="flex-1 lg:max-w-md xl:max-w-lg flex flex-col relative mt-4 lg:mt-0 lg:pl-8 lg:border-l border-white/10">
                  {/* Calendar/Event Tags */}
                  <div className="flex flex-wrap gap-2 mb-8 items-center pt-1 lg:pt-0">
                     <div className="text-[10px] uppercase font-bold tracking-widest opacity-40 mr-2">EVENTS /</div>
                    <span className="text-[9px] font-mono tracking-widest px-2 py-1 bg-white/10 rounded uppercase">Lecture</span>
                    <span className="text-[9px] font-mono tracking-widest px-2 py-1 bg-[#8DC63F]/20 text-[#8DC63F] rounded uppercase">Workshop</span>
                    <span className="text-[9px] font-mono tracking-widest px-2 py-1 bg-white/10 rounded uppercase">Q&A</span>
                  </div>

                  {/* Advanced Track Highlight Block */}
                  <div className={`mt-auto relative p-6 rounded-2xl border transition-colors ${isCurrent ? 'border-[#8DC63F]/50 bg-[#8DC63F]/5 shadow-lg' : 'border-black/10 bg-black/5 hover:bg-black/10'}`}>
                    {isCurrent && (
                      <div className="absolute -top-3 right-6 bg-[#8DC63F] text-black text-[9px] font-mono px-3 py-1 uppercase font-bold tracking-widest rounded-full shadow-md border border-[#8DC63F]">
                        Available Upgrade
                      </div>
                    )}
                    
                    <div className="flex gap-2 items-center mb-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-[#8DC63F]' : 'bg-black/40'}`} />
                      <div className="font-mono text-[9px] uppercase tracking-widest opacity-60">Advanced Track</div>
                    </div>
                    
                    <h4 className="font-bold text-lg md:text-xl mb-3">{advanced.title}</h4>
                    <p className="text-sm opacity-70 leading-relaxed mb-6">{advanced.description}</p>
                    
                    <div className="flex items-center gap-3 pt-4 border-t border-black/10">
                      <div className="w-8 h-8 rounded-full bg-black/10 shrink-0" />
                      <div>
                        <div className="text-[9px] font-mono tracking-widest opacity-40 uppercase mb-0.5">Speaker</div>
                        <div className="text-xs font-bold font-sans">{advanced.speaker}</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// VARIANT F: Immersive Storytelling Sequence
// ==========================================
const VariantF_Storytelling = () => {
  return (
    <div className="mb-32">
      <EditorialSectionHeader eyebrow="VARIANT F" title="Storytelling Cinematic Sequence" />
      <p className="mb-12 text-sm opacity-60 uppercase max-w-2xl">
        Idea: Instead of a compact grid or list, each week is an immersive "cinematic" section that occupies significant screen real estate. Uses large imagery/gradients and distinct split layouts to contrast the Core Track with the Advanced Track. Perfect for a guided storytelling landing page.
      </p>

      <div className="flex flex-col gap-8 md:gap-16">
        {PROGRAM_TRACKS.map((track, idx) => {
          const currentWeek = 2; // Simulating Week 2
          const isCurrent = idx + 1 === currentWeek;
          const advanced = ADVANCED_TRACKS[idx];

          return (
            <div key={track.id} className={`relative w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-[#fafafa] text-black min-h-[500px] border transition-all ${isCurrent ? 'border-[#8DC63F]/50 shadow-[0_20px_60px_rgba(141,198,63,0.15)] scale-[1.01]' : 'border-black/5 opacity-90' } flex flex-col`}>
              
              {/* Background Visual Layer */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-multiply opacity-[0.03]">
                <img src={track.image} alt="" className="absolute inset-0 w-full h-full object-cover grayscale opacity-50" />
                {/* Animated gradient blob specifically for current active week */}
                {isCurrent && (
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-0 right-0 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-[#8DC63F] rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 mix-blend-normal" 
                  />
                )}
                <div className="absolute -left-[200px] -bottom-[200px] w-[500px] h-[500px] bg-black/10 rounded-full blur-[160px]" />
                
                {/* Abstract texture mask */}
                <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)', backgroundSize: '32px 32px' }} />
              </div>

              {/* Header / Meta */}
              <div className="relative z-10 w-full p-8 md:p-12 lg:p-16 flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 gap-6 bg-white/80 backdrop-blur-lg">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                     <div className="text-[12px] font-mono tracking-widest opacity-60 bg-black/5 px-3 py-1 rounded-full text-black">{track.week}</div>
                     {isCurrent && (
                       <div className="text-[#8DC63F] font-mono text-[10px] uppercase font-bold tracking-widest animate-pulse">
                         Live Progress
                       </div>
                     )}
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-black">{track.title}</h2>
                </div>
                {isCurrent && (
                   <div className="hidden md:flex bg-[#8DC63F] text-black px-6 py-3 font-mono text-xs uppercase tracking-widest rounded-full font-bold shadow-lg">
                     [ IN PROGRESS ]
                   </div>
                )}
              </div>

              {/* Content Split: Core vs Advanced */}
              <div className="relative z-10 flex-1 flex flex-col lg:flex-row w-full h-full">
                
                {/* CORE PATH */}
                <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col lg:border-r border-black/10 relative overflow-hidden">
                  {/* Heavy visual image for current week */}
                  {isCurrent && (
                    <div className="absolute top-8 right-8 w-48 h-48 rounded-full overflow-hidden blur-[0px] shadow-2xl animate-[spin_60s_linear_infinite] opacity-80 mix-blend-multiply border border-black/10">
                       <img src={track.image} alt="3d blob" className="w-full h-full object-cover scale-150" />
                    </div>
                  )}

                  <div className="font-mono text-[10px] tracking-widest opacity-40 uppercase mb-8 flex items-center gap-4 relative z-10">
                    <span className="h-px bg-black/20 w-8 inline-block"/> CORE LABORATORY PATH
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight leading-tight relative z-10">{track.shortDescription}</h3>
                  <p className="text-base lg:text-lg opacity-80 leading-relaxed max-w-lg mb-8 relative z-10">
                    {track.longDescription}
                  </p>
                  
                  {/* Dashboard/Visual Artifact representing the "Tool" */}
                  <div className="mt-auto border border-black/10 rounded-2xl p-6 md:p-8 bg-white/60 backdrop-blur-md max-w-lg shadow-xl relative z-10">
                    <div className="absolute top-0 right-0 px-3 py-1 bg-black/5 text-[8px] font-mono rounded-bl-lg opacity-50">NODE_MODULE</div>
                    <div className="flex items-center gap-2 mb-6 opacity-30">
                      <div className="w-2.5 h-2.5 rounded-full bg-black/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-black/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-black/60" />
                    </div>
                    <div className="font-mono text-[10px] text-[#4f7023] mb-4">{'<SYS> initializing artifact generation...'}</div>
                    <div className="space-y-3">
                      <div className="w-full h-12 bg-white rounded-lg border border-black/10 shadow-sm flex items-center px-4">
                        <div className="w-6 h-6 shrink-0 bg-[#8DC63F]/20 rounded mr-3" />
                         <div className="h-2 w-32 bg-black/10 rounded-full" />
                      </div>
                      <div className="w-full h-12 bg-white rounded-lg border border-black/10 shadow-sm flex items-center px-4">
                        <div className="w-6 h-6 shrink-0 bg-black/5 rounded mr-3" />
                         <div className="h-2 w-48 bg-black/10 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ADVANCED ADD-ON */}
                <div className="flex-[0.8] p-8 md:p-12 lg:p-16 flex flex-col bg-white">
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-black/10">
                    <div className="font-mono text-[10px] tracking-widest text-[#8DC63F] uppercase font-bold flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]"/> Advanced Track
                    </div>
                    <div className="text-[10px] font-mono px-3 py-1 border border-black/10 rounded-full opacity-60 bg-black/5">+ TIER 2 ONLY</div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">{advanced.title}</h3>
                  <p className="text-base opacity-70 leading-relaxed mb-12">
                    {advanced.description}
                  </p>

                  <div className="mt-auto flex items-center gap-5 bg-[#fbfbfb] p-4 md:p-6 rounded-2xl border border-black/5 hover:border-black/10 transition-colors shadow-sm cursor-default">
                    <div className="w-14 h-14 rounded-full bg-black/5 shrink-0" />
                    <div>
                      <div className="text-[10px] font-mono tracking-widest opacity-40 uppercase mb-1">Speaker & Curator</div>
                      <div className="text-lg font-bold">{advanced.speaker}</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// VARIANT G: Split Screen Sticky
// ==========================================
const VariantG_SplitScreen = () => {
  return (
    <div className="mb-32">
      <EditorialSectionHeader eyebrow="VARIANT G" title="Split Screen Sticky Anchor" />
      <p className="mb-12 text-sm opacity-60 uppercase max-w-2xl">
        Idea: The left side acts as a giant sticky anchor ("WEEK 1", "WEEK 2"), while the right side scrolls through the dense details of Core and Advanced. Excellent for reading-heavy content.
      </p>

      <div className="flex flex-col gap-24 relative">
        {PROGRAM_TRACKS.map((track, idx) => {
          const currentWeek = 2; // Simulating Week 2
          const isCurrent = idx + 1 === currentWeek;
          const advanced = ADVANCED_TRACKS[idx];

          return (
            <div key={track.id} className="flex flex-col md:flex-row gap-8 lg:gap-16">
              {/* Left sticky anchor */}
              <div className="w-full md:w-1/3 relative">
                <div className="md:sticky md:top-24">
                  <div className={`text-6xl lg:text-8xl font-black leading-none ${isCurrent ? 'text-[#8DC63F]' : 'text-black/10'}`}>W{idx+1}</div>
                  <div className="font-mono text-xs tracking-widest uppercase mt-4 opacity-40">{track.id} // {track.shortDescription}</div>
                  <h3 className="text-3xl font-black uppercase mt-2 leading-none">{track.title}</h3>
                </div>
              </div>
              
              {/* Right moving content */}
              <div className={`w-full md:w-2/3 flex flex-col gap-8 p-8 md:p-12 border transition-colors ${isCurrent ? 'border-[#8DC63F] bg-[#8DC63F]/5' : 'border-black/10 bg-white/40'}`}>
                 <div className="flex flex-col lg:flex-row gap-8">
                   <div className="flex-1">
                     <div className="font-mono text-[10px] tracking-widest opacity-40 mb-4 bg-black/5 px-2 py-1 inline-block">CORE SYSTEM</div>
                     <p className="opacity-80 leading-relaxed font-medium">{track.longDescription}</p>
                   </div>
                   <div className="flex-1 border-t lg:border-t-0 lg:border-l border-black/10 pt-6 lg:pt-0 lg:pl-8">
                     <div className="font-mono text-[10px] tracking-widest text-[#8DC63F] font-bold mb-4 flex items-center gap-2">
                       <div className="w-2 h-2 bg-[#8DC63F] rounded-full animate-pulse" /> ADVANCED INTEGRATION
                     </div>
                     <h4 className="font-bold text-xl mb-3">{advanced.title}</h4>
                     <p className="text-sm opacity-60 leading-relaxed mb-6">{advanced.description}</p>
                     
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-black/10 shrink-0" />
                       <div className="text-xs font-bold leading-tight">{advanced.speaker}</div>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// VARIANT H: Layered Sticky Cards
// ==========================================
const VariantH_LayeredCards = () => {
  return (
    <div className="mb-32">
      <EditorialSectionHeader eyebrow="VARIANT H" title="Layered Sticky Deck" />
      <p className="mb-12 text-sm opacity-60 uppercase max-w-2xl">
        Idea: Each week is a massive horizontal card that sticks to the top as you scroll. Overlap creates a physical sense of depth and progression, stacking past weeks behind the current one.
      </p>

      <div className="relative pb-32">
        {PROGRAM_TRACKS.map((track, idx) => {
          const currentWeek = 2; // Simulating Week 2
          const isCurrent = idx + 1 === currentWeek;
          const advanced = ADVANCED_TRACKS[idx];
          
          return (
            <div key={track.id} className="sticky w-full" style={{ top: `${(idx * 2) + 4}rem`, zIndex: idx, marginTop: idx === 0 ? 0 : '120px' }}>
              <div className={`relative w-full min-h-[400px] border shadow-2xl p-8 md:p-12 md:px-16 rounded-3xl transition-colors overflow-hidden ${isCurrent ? 'bg-white text-black border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)]' : 'bg-[#f4f4f4] text-black border-black/5'}`}>
                
                {/* Background image for current card */}
                {isCurrent && (
                  <img src={track.image} className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-10 mix-blend-multiply pointer-events-none grayscale sepia-[0.3] hue-rotate-[50deg] blur-sm" alt="Background" />
                )}

                <div className="relative z-10 flex justify-between items-start mb-12 border-b border-black/10 pb-6 opacity-80">
                  <div className="font-mono text-sm tracking-widest uppercase font-bold">{track.week}</div>
                  <div className={`font-mono text-[10px] py-1 px-4 border rounded-full tracking-widest ${isCurrent ? 'border-[#8DC63F] text-[#4f7023] bg-[#8DC63F]/10' : 'border-black/20 text-black/50'}`}>
                    {isCurrent ? 'ACTIVE PHASE // IN PROGRESS' : 'LOCKED'}
                  </div>
                </div>
                
                <h3 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-12">{track.title}</h3>
                
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                   <div>
                     <div className="font-mono text-[10px] tracking-widest uppercase mb-4 opacity-40">Core Program</div>
                     <p className="text-lg md:text-xl opacity-80 leading-relaxed font-medium">{track.longDescription}</p>
                   </div>
                   
                   <div className={`p-8 md:p-10 rounded-2xl border ${isCurrent ? 'bg-white border-[#8DC63F]/20 shadow-xl' : 'bg-black/5 border-transparent'}`}>
                      <div className="font-mono text-[10px] tracking-widest uppercase mb-6 opacity-60 text-[#8DC63F] font-bold">Advanced Upgrade</div>
                      <h4 className="text-2xl font-bold mb-4 tracking-tight">{advanced.title}</h4>
                      <p className="opacity-80 text-base mb-8 leading-relaxed">{advanced.description}</p>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full border border-black/10 bg-black/5 shrink-0" />
                        <div className="font-bold">{advanced.speaker}</div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// VARIANT I: Horizontal Native Scroll
// ==========================================
const VariantI_HorizontalScroll = () => {
  return (
    <div className="mb-32">
      <EditorialSectionHeader eyebrow="VARIANT I" title="Horizontal Native Gallery" />
      <p className="mb-12 text-sm opacity-60 uppercase max-w-2xl">
        Idea: Mimics native mobile horizontal scrolling (like stories or App Store cards). Very touch-friendly, forces user to focus on one card at a time in the center of the screen.
      </p>

      {/* Hide scrollbar with custom CSS class conceptually */}
      <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory mx-[-1rem] md:mx-[-3rem] px-[1rem] md:px-[3rem] hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
        {PROGRAM_TRACKS.map((track, idx) => {
          const currentWeek = 2; // Simulating Week 2
          const isCurrent = idx + 1 === currentWeek;
          const advanced = ADVANCED_TRACKS[idx];
          
          return (
            <div key={track.id} className={`shrink-0 w-[85vw] md:w-[500px] snap-center flex flex-col border rounded-xl overflow-hidden transition-all ${isCurrent ? 'border-[#8DC63F] shadow-[0_10px_40px_rgba(141,198,63,0.15)] bg-white scale-100' : 'border-black/10 bg-white/50 opacity-60 scale-[0.98]'}`}>
              
              <div className={`p-8 border-b ${isCurrent ? 'bg-[#8DC63F]/10 border-[#8DC63F]/20' : 'border-black/10'}`}>
                <div className="flex justify-between items-center mb-6">
                  <div className={`font-mono text-[10px] font-bold tracking-widest ${isCurrent ? 'text-[#8DC63F]' : ''}`}>{track.week}</div>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-[10px] ${isCurrent ? 'border-[#8DC63F] text-[#8DC63F] bg-[#8DC63F]/10' : 'border-black/20 text-black/40'}`}>
                    0{idx+1}
                  </div>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-3">{track.title}</h3>
                <div className="text-[10px] font-mono tracking-widest opacity-60">{track.shortDescription}</div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <p className="opacity-80 leading-relaxed text-sm md:text-base mb-8">{track.longDescription}</p>
                
                <div className="mt-auto border-t border-dashed border-black/20 pt-6">
                  <div className="font-mono text-[10px] text-[#8DC63F] mb-3 uppercase font-bold tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#8DC63F]" />
                    Advanced Track Included
                  </div>
                  <h4 className="font-bold text-lg mb-2">{advanced.title}</h4>
                  <p className="text-xs opacity-60 leading-relaxed mb-4">{advanced.description}</p>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// VARIANT J: Dynamic Bento Grid
// ==========================================
const VariantJ_BentoGrid = () => {
  return (
    <div className="mb-32">
      <EditorialSectionHeader eyebrow="VARIANT J" title="Dynamic Bento Dashboard" />
      <p className="mb-12 text-sm opacity-60 uppercase max-w-2xl">
        Idea: A masonry "bento box" grid layout. The Active week expands to consume massive real estate (2x2), while inactive weeks shrink to compact 1x1 summary tiles. Dynamic, scanning-optimized, and structurally beautiful.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[minmax(180px,auto)] max-w-5xl">
        {PROGRAM_TRACKS.map((track, idx) => {
          const currentWeek = 2; // Simulating Week 2
          const isCurrent = idx + 1 === currentWeek;
          const advanced = ADVANCED_TRACKS[idx];
          
          return (
            <div key={track.id} className={`group p-6 md:p-8 flex flex-col gap-6 rounded-2xl transition-all duration-500 overflow-hidden ${isCurrent ? 'md:col-span-2 md:row-span-2 bg-white text-black border border-black/10 shadow-2xl relative' : 'bg-[#fcfcfc] border border-black/10 hover:border-black/30'}`}>
               
               {/* Image background for active item */}
               {isCurrent && (
                 <img src={track.image} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-15 grayscale sepia-[0.2] transition-transform duration-1000 group-hover:scale-105 pointer-events-none" alt="" />
               )}

               <div className="flex justify-between items-start z-10 relative">
                 <div className={`font-mono text-[10px] tracking-widest ${isCurrent ? 'opacity-80 bg-black/5 px-3 py-1 rounded-full text-black font-bold' : 'opacity-40'}`}>{track.week}</div>
                 {isCurrent && <div className="animate-pulse bg-[#8DC63F]/20 text-[#618a2a] border border-[#8DC63F]/50 px-3 py-1 rounded-full text-[9px] font-bold font-mono tracking-widest uppercase">LIVE_NODE</div>}
               </div>

               <h3 className={`${isCurrent ? 'text-4xl lg:text-6xl text-black mt-auto' : 'text-xl'} font-black uppercase tracking-tighter leading-[0.9] z-10 relative`}>{track.title}</h3>
               
               {isCurrent && (
                 <p className="text-base md:text-lg opacity-80 leading-relaxed text-black/80 max-w-lg z-10 relative font-medium">
                   {track.longDescription}
                 </p>
               )}
               {!isCurrent && (
                 <div className="text-[10px] font-mono tracking-widest opacity-40 uppercase mt-auto">
                   {track.shortDescription}
                 </div>
               )}

               <div className={`z-10 relative ${isCurrent ? 'mt-8 p-6 bg-white/80 rounded-xl border border-black/10 backdrop-blur-md shadow-sm' : 'mt-auto p-4 border-t border-black/5 bg-black/5 rounded-xl'}`}>
                 <div className="flex items-center justify-between mb-3">
                   <div className={`text-[9px] font-mono tracking-widest uppercase ${isCurrent ? 'text-[#8DC63F] font-bold' : 'opacity-60'}`}>Advanced Protocol</div>
                   {!isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-black/20" />}
                   {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] animate-pulse" />}
                 </div>
                 <h4 className="text-black text-lg md:text-xl font-bold">{advanced.title}</h4>
                 {isCurrent && <p className="text-sm text-black/60 mt-3 leading-relaxed max-w-md">{advanced.description}</p>}
               </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// VARIANT K: Interactive Steps (Alpha: Classic Accordion)
// ==========================================
const VariantK_InteractiveStepsAlpha = () => {
  const [openCore, setOpenCore] = useState<string | null>(null);
  const [openAdv, setOpenAdv] = useState<string | null>(null);

  const toggleCore = (id: string, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.adv-zone')) return;
    setOpenCore(openCore === id ? null : id);
  };

  const toggleAdv = (id: string) => {
    setOpenAdv(openAdv === id ? null : id);
    if (openCore !== id) setOpenCore(id); // auto open core if adv is clicked
  };

  return (
    <div className="mb-32">
      <EditorialSectionHeader eyebrow="VARIANT K" title="Steps Alpha: Interactive Accordion" />
      <p className="mb-8 text-sm opacity-60 uppercase max-w-2xl">
        Idea (Alpha): Классический аккордеон на базе Variant A. Клик по строке открывает детали и картинку. Клик по кнопке "Advanced Track" справа плавно открывает блок с экспертом.
      </p>

      <div className="flex flex-col gap-4">
        {PROGRAM_TRACKS.map((track, idx) => {
          const advanced = ADVANCED_TRACKS[idx];
          const isCoreOpen = openCore === track.id;
          const isAdvOpen = openAdv === track.id;

          return (
            <motion.div
              layout
              key={track.id}
              onClick={(e) => toggleCore(track.id, e)}
              className={`relative border transition-all duration-500 cursor-pointer overflow-hidden ${
                isCoreOpen 
                  ? 'border-[#8DC63F] bg-white shadow-xl py-6 px-6 md:px-10' 
                  : 'border-black/10 bg-[#fbfbfb] hover:bg-white py-6 px-6 md:px-10 opacity-80 hover:opacity-100 hover:border-black/30 shadow-sm'
              }`}
            >
              <div className="flex flex-col md:flex-row gap-6 md:items-start min-h-[80px]">
                {/* Status Indicator */}
                <div className="flex items-center md:items-start gap-4 w-full md:w-32 shrink-0 pt-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${isCoreOpen ? 'bg-[#8DC63F] text-black' : 'bg-black/5 text-black/40'}`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCoreOpen ? 'rotate-180' : '-rotate-90'}`} />
                  </div>
                  <span className={`font-mono text-[10px] tracking-widest font-bold mt-1 ${isCoreOpen ? 'text-[#8DC63F]' : ''}`}>
                    {track.week}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className={`font-black uppercase tracking-tighter transition-all ${isCoreOpen ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                    {track.title}
                  </h3>
                  <div className="text-[10px] uppercase tracking-widest mt-1 font-bold opacity-60 text-black">{track.shortDescription}</div>
                  
                  <AnimatePresence>
                    {isCoreOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="pt-6 pb-2 border-t border-black/5 mt-6">
                           <p className="text-sm opacity-80 max-w-2xl leading-relaxed">{track.longDescription}</p>
                           
                           {/* 3D Visual Concept */}
                           <div className="mt-8 relative w-full h-48 md:h-64 rounded-2xl overflow-hidden border border-black/5 bg-[#f4f4f4] group">
                             <img src={track.image} alt="visual concept" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-60 grayscale scale-105 transition-all duration-[2s] group-hover:scale-100 group-hover:grayscale-0 group-hover:opacity-100" />
                             <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
                             <div className="absolute bottom-4 left-4 flex items-center gap-3">
                               <div className="w-2 h-2 rounded-full bg-[#8DC63F] animate-pulse" />
                               <span className="font-mono text-[9px] uppercase tracking-widest font-bold opacity-80 backdrop-blur-sm bg-white/50 px-2 py-0.5 rounded">Visual Module {track.id}</span>
                             </div>
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right Side: Advanced Track */}
                <div className="w-full md:w-64 shrink-0 adv-zone border-t md:border-t-0 md:border-l border-black/5 pt-4 md:pt-0 md:pl-6 flex flex-col justify-start">
                  <button onClick={() => toggleAdv(track.id)} className="w-full flex items-center justify-between text-left group p-2 -m-2 rounded hover:bg-black/5 transition-colors">
                    <span className={`font-mono text-[10px] uppercase tracking-widest font-bold transition-colors ${isAdvOpen ? 'text-[#8DC63F]' : 'group-hover:text-black opacity-60'}`}>
                      Advanced Track
                    </span>
                    <ChevronDown className={`w-4 h-4 opacity-40 transition-transform ${isAdvOpen ? 'rotate-180 text-[#8DC63F]' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isAdvOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="pt-4 mt-2">
                           <h4 className="font-bold text-lg mb-2 leading-tight">{advanced.title}</h4>
                           <p className="text-xs opacity-70 leading-relaxed mb-4">{advanced.description}</p>
                           <div className="flex items-center gap-3 bg-black/5 p-3 rounded-xl">
                             <div className="w-8 h-8 rounded-full bg-white border border-black/10 shrink-0 shadow-sm" />
                             <span className="text-[10px] font-bold uppercase">{advanced.speaker}</span>
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
              
              {/* Highlight bar */}
              {isCoreOpen && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#8DC63F]" />}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};


// ==========================================
// VARIANT L: Interactive Steps (Beta: Side Slide Over)
// ==========================================
const VariantL_InteractiveStepsBeta = () => {
  const [openCore, setOpenCore] = useState<string | null>(null);
  const [openAdv, setOpenAdv] = useState<string | null>(null);

  const toggleCore = (id: string, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.adv-zone')) return;
    if (openCore === id) {
      setOpenCore(null);
      setOpenAdv(null);
    } else {
      setOpenCore(id);
    }
  };

  const toggleAdv = (id: string) => {
    if (openAdv === id) {
      setOpenAdv(null);
    } else {
      setOpenAdv(id);
      setOpenCore(id); // Expand card if you expand advanced
    }
  };

  return (
    <div className="mb-32">
      <EditorialSectionHeader eyebrow="VARIANT L" title="Steps Beta: Slide Over Drawer" />
      <p className="mb-8 text-sm opacity-60 uppercase max-w-2xl">
        Idea (Beta): Клик по строке расширяет контент. Клик по кнопке "Advanced Track" элегантно выкатывает боковую панель прямо поверх правой части карточки анимированным drawer-ом.
      </p>

      <div className="flex flex-col gap-4">
        {PROGRAM_TRACKS.map((track, idx) => {
          const advanced = ADVANCED_TRACKS[idx];
          const isCoreOpen = openCore === track.id;
          const isAdvOpen = openAdv === track.id;

          return (
            <div key={track.id} className="relative group" style={{ perspective: '1000px' }}>
              <motion.div
                layout
                onClick={(e) => toggleCore(track.id, e)}
                className={`relative border transition-colors duration-500 cursor-pointer overflow-hidden rounded-2xl ${
                  isCoreOpen 
                    ? 'border-black/20 bg-white shadow-lg z-10' 
                    : 'border-black/10 bg-[#fdfdfd] hover:bg-white hover:border-black/30'
                }`}
              >
                <div className="flex flex-col md:flex-row relative z-10 w-full min-h-[100px]">
                  
                  {/* Left Content Area */}
                  <div className={`p-6 md:p-8 flex-1 transition-all duration-500 ${isAdvOpen ? 'md:pr-[350px] opacity-40 blur-[2px]' : ''}`}>
                    <div className="flex items-center gap-4 mb-3">
                      <span className={`font-mono text-[10px] tracking-widest font-bold ${isCoreOpen ? 'text-[#8DC63F]' : 'opacity-40'}`}>
                        {track.week}
                      </span>
                      {isCoreOpen && <span className="w-10 h-px bg-[#8DC63F]" />}
                    </div>
                    <h3 className={`font-black uppercase tracking-tighter transition-all ${isCoreOpen ? 'text-3xl md:text-5xl' : 'text-xl'}`}>
                      {track.title}
                    </h3>
                    <div className="text-[10px] uppercase tracking-widest mt-2 opacity-60 font-bold">{track.shortDescription}</div>
                    
                    <AnimatePresence>
                      {isCoreOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="pt-6 mt-6 relative z-10">
                            <p className="text-base opacity-80 max-w-xl leading-relaxed">{track.longDescription}</p>
                            
                            {/* Rich Visual Container */}
                            <div className="mt-8 relative w-full h-32 md:h-48 rounded-2xl overflow-hidden shadow-inner border border-black/5 bg-black/5">
                              <img src={track.image} className="absolute inset-0 w-full h-full object-cover transform scale-110 transition-transform duration-[5s] hover:scale-100 opacity-80" alt="visual" />
                              <div className="absolute inset-0 bg-gradient-to-tr from-[#8DC63F]/20 to-transparent mix-blend-multiply" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Right Fixed Advanced Button Area */}
                  <div className={`adv-zone md:absolute right-0 top-0 bottom-0 md:w-[240px] flex items-start justify-end p-6 md:p-8 z-20 ${isAdvOpen ? 'pointer-events-none' : ''}`}>
                    {!isAdvOpen && (
                       <button onClick={() => toggleAdv(track.id)} className="group flex items-center justify-between gap-3 bg-white border border-black/10 hover:border-[#8DC63F]/50 hover:bg-[#8DC63F]/5 px-4 py-2.5 rounded-full shadow-sm transition-all text-left mt-2 md:mt-0">
                         <span className="font-mono text-[9px] uppercase tracking-widest font-bold whitespace-nowrap opacity-70 group-hover:text-[#8DC63F]">Advanced Track</span>
                         <div className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-[#8DC63F] group-hover:text-white transition-colors">
                           <ChevronRight className="w-3 h-3" />
                         </div>
                       </button>
                    )}
                  </div>
                  
                </div>

                {/* Sliding Glass Drawer for Advanced Track */}
                <AnimatePresence>
                  {isAdvOpen && (
                    <motion.div 
                      initial={{ x: '100%' }} 
                      animate={{ x: 0 }} 
                      exit={{ x: '100%' }} 
                      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                      className="absolute top-0 right-0 bottom-0 w-full md:w-[350px] bg-white border-l border-black/10 shadow-[-20px_0_50px_rgba(0,0,0,0.05)] z-30 flex flex-col adv-zone"
                    >
                      <img src={track.image} className="absolute inset-0 w-full h-full object-cover opacity-5 grayscale pointer-events-none" alt="" />
                      <div className="p-8 flex-1 flex flex-col relative z-10 bg-gradient-to-b from-white via-white/95 to-white">
                        <div className="flex justify-between items-center mb-10">
                          <span className="font-mono text-[10px] uppercase font-bold text-[#8DC63F] tracking-widest border border-[#8DC63F]/30 bg-[#8DC63F]/10 px-3 py-1 rounded-full">Pro Upgrade</span>
                          <button onClick={() => setOpenAdv(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-black/60 transition-colors">
                            <span className="text-xs font-mono font-bold">X</span>
                          </button>
                        </div>
                        <h4 className="font-black text-2xl uppercase tracking-tighter mb-4">{advanced.title}</h4>
                        <p className="text-sm opacity-70 leading-relaxed mb-8">{advanced.description}</p>
                        
                        <div className="mt-auto bg-black/5 p-4 rounded-2xl flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full border border-black/10 bg-white" />
                          <div>
                            <div className="text-[9px] font-mono opacity-40 uppercase tracking-widest mb-0.5">Guest Speaker</div>
                            <div className="font-bold text-sm">{advanced.speaker}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


// ==========================================
// VARIANT M: Interactive Steps (Gamma: Cinematic Expand)
// ==========================================
const VariantM_InteractiveStepsGamma = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const toggleStep = (id: string, e: React.MouseEvent) => {
    setActiveStep(activeStep === id ? null : id);
  };

  return (
    <div className="mb-32">
      <EditorialSectionHeader eyebrow="VARIANT M" title="Steps Gamma: Cinematic Reveal" />
      <p className="mb-12 text-sm opacity-60 uppercase max-w-2xl">
        Idea (Gamma): Кинематографичное раскрытие. По умолчанию узкие плашки-список. По клику плашка красивой разворачивается в широкий дашборд с размытой картинкой (цветной burn overlay) на фоне. Advanced Track сразу виден как отдельный визуальный блок-карточка.
      </p>

      <div className="flex flex-col gap-2 relative">
        {PROGRAM_TRACKS.map((track, idx) => {
          const advanced = ADVANCED_TRACKS[idx];
          const isOpen = activeStep === track.id;

          return (
            <motion.div
              layout
              key={track.id}
              onClick={(e) => toggleStep(track.id, e)}
              className={`relative rounded-3xl cursor-pointer overflow-hidden transition-all duration-700 ease-in-out border ${
                isOpen 
                  ? 'bg-black text-white h-auto min-h-[500px] border-black shadow-2xl my-6' 
                  : 'bg-white hover:bg-black/[0.03] text-black h-[100px] border-black/10 flex items-center hover:shadow-md relative'
              }`}
            >
              {/* Cinematic Image Background - only shown when open */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0 pointer-events-none z-0">
                    <img src={track.image} alt={track.title} className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-40 blur-sm scale-105" />
                    {/* Add a dramatic color burn overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-[#8DC63F]/20 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-black/40" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Collapsed State Layout */}
              {!isOpen && (
                <div className="w-full flex items-center justify-between px-6 md:px-10 h-full">
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-xs font-bold opacity-40 tracking-widest">{track.week}</span>
                    <h3 className="font-black uppercase tracking-tighter text-xl md:text-2xl">{track.title}</h3>
                  </div>
                  <div className="hidden md:flex items-center gap-8">
                    <div className="font-mono text-[10px] uppercase opacity-40 tracking-widest font-bold">+ Advanced Track Upgrade</div>
                    <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center">
                      <ChevronDown className="w-4 h-4 opacity-50" />
                    </div>
                  </div>
                </div>
              )}

              {/* Expanded State Layout */}
              {isOpen && (
                <div className="relative z-10 w-full h-full p-8 md:p-14 lg:p-16 flex flex-col">
                  {/* Top Header */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="font-mono text-sm tracking-widest font-bold opacity-80 border-b border-white/20 pb-2 inline-block">
                      {track.week}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors">
                      <ChevronDown className="w-4 h-4 rotate-180" />
                    </div>
                  </div>
                  
                  {/* Core Content */}
                  <div className="flex-1 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
                    <div className="flex-1">
                      <div className="text-[#8DC63F] font-mono text-[10px] uppercase tracking-widest mb-4 font-bold inline-block bg-[#8DC63F]/20 px-3 py-1 rounded-full border border-[#8DC63F]/30 shadow-[0_0_15px_rgba(141,198,63,0.3)]">
                        Core Stream
                      </div>
                      <h3 className="font-black uppercase tracking-tighter text-4xl md:text-5xl lg:text-7xl mb-8 leading-[0.9]">
                        {track.title}
                      </h3>
                      <p className="text-lg md:text-xl opacity-80 leading-relaxed font-light mb-8 max-w-lg text-white/90">
                        {track.longDescription}
                      </p>
                    </div>

                    {/* Advanced Content Card */}
                    <div className="w-full lg:w-[400px] shrink-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-2 h-2 rounded-full bg-[#8DC63F] animate-pulse" />
                        <span className="font-mono text-[10px] uppercase tracking-widest font-bold opacity-70">Advanced Upgrade</span>
                      </div>
                      <h4 className="text-2xl font-bold mb-4">{advanced.title}</h4>
                      <p className="opacity-60 text-sm leading-relaxed mb-8">{advanced.description}</p>
                      <div className="border-t border-white/10 pt-6 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 shrink-0" />
                        <div className="text-sm font-bold opacity-90">{advanced.speaker}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// VARIANT N: Mobile Dashboard (Horizontal Tabs)
// ==========================================
const VariantN_DashboardHorizontal = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mb-32">
      <EditorialSectionHeader eyebrow="VARIANT N" title="Mobile Dashboard: Horizontal Tabs" />
      <p className="mb-8 text-sm opacity-60 uppercase max-w-2xl">
        Idea: Решает проблему Variant B на мобильных. Вместо вертикального списка слева, используется горизонтальный скроллируемый sticky-блок сверху (как в нативных приложениях iOS/Android).
      </p>

      <div className="flex flex-col border border-black/10 bg-white/40 shadow-sm rounded-xl overflow-hidden">
        {/* Navigation Topbar - Horizontal Scroll */}
        <div className="w-full border-b border-black/10 flex bg-white/60 overflow-x-auto no-scrollbar scroll-smooth sticky top-0 z-20">
          {PROGRAM_TRACKS.map((track, idx) => (
            <button
              key={track.id}
              onClick={() => setActiveTab(idx)}
              className={`px-6 md:px-8 py-4 text-left border-b-2 transition-all outline-none shrink-0 whitespace-nowrap flex flex-col items-start ${
                activeTab === idx 
                  ? 'bg-white border-b-[#8DC63F] shadow-sm' 
                  : 'hover:bg-black/5 border-b-transparent'
              }`}
            >
              <div className={`text-[10px] font-bold tracking-widest mb-1 ${activeTab === idx ? 'opacity-80 text-[#8DC63F]' : 'opacity-40'}`}>
                {track.id} // {track.week}
              </div>
              <div className={`font-bold uppercase tracking-widest text-xs md:text-sm ${activeTab === idx ? 'text-black' : 'text-black/70'}`}>
                {track.title}
              </div>
            </button>
          ))}
        </div>

        {/* Console Main Window */}
        <div className="p-6 md:p-10 relative overflow-hidden bg-[#F4F4F4] min-h-[400px] flex flex-col">
          <div className="absolute top-0 right-0 p-4 font-mono text-[10px] opacity-20 hidden md:block">
            [ STATUS: ACTIVE ]
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              layout
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col flex-1"
            >
              <div className="font-mono text-[#8DC63F] text-xs mb-8">
                $ init_module --target {PROGRAM_TRACKS[activeTab].id}
              </div>
              
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none text-black">
                    {PROGRAM_TRACKS[activeTab].title}
                  </h2>
                  <div className="inline-block bg-[#8DC63F]/20 text-[#4c6b22] px-3 py-1 text-[10px] font-bold tracking-widest w-max mb-6 border border-[#8DC63F]/30 rounded">
                    {PROGRAM_TRACKS[activeTab].shortDescription}
                  </div>
                  
                  <p className="text-lg opacity-80 leading-relaxed max-w-xl text-black">
                    {PROGRAM_TRACKS[activeTab].longDescription}
                  </p>
                </div>

                <div className="w-full lg:w-[320px] bg-white border border-black/10 rounded-2xl p-6 shadow-sm">
                  <div className="font-mono text-[10px] text-[#8DC63F] font-bold tracking-widest uppercase mb-4">Advanced Upgrade</div>
                  <h4 className="font-bold text-xl mb-2">{ADVANCED_TRACKS[activeTab].title}</h4>
                  <p className="text-sm opacity-70 mb-4">{ADVANCED_TRACKS[activeTab].description}</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                     <div className="w-8 h-8 rounded-full bg-black/5" />
                     <span className="text-xs font-bold leading-none">{ADVANCED_TRACKS[activeTab].speaker}</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-12">
                <div className="font-mono text-[10px] opacity-40 border-t border-dashed border-black/20 pt-4 flex justify-between">
                  <span>SYSTEM_READY</span>
                  <span>{PROGRAM_TRACKS[activeTab].week}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// VARIANT O: Mobile Dashboard (Dropdown Selector)
// ==========================================
const VariantO_DashboardSelect = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-32">
      <EditorialSectionHeader eyebrow="VARIANT O" title="Mobile Dashboard: Dropdown" />
      <p className="mb-8 text-sm opacity-60 uppercase max-w-2xl">
        Idea: Решает проблему места радикальнее через UI-паттерн "Dropdown/Select". На мобильных вместо вкладок мы видим большую кнопку, которая раскрывает список недель поверх контента.
      </p>

      <div className="flex flex-col border border-black/10 bg-white/40 shadow-sm rounded-xl overflow-visible relative z-10 w-full max-w-full">
        
        {/* Dropdown Selector */}
        <div className="relative z-30">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-white flex items-center justify-between p-6 border-b border-black/10 hover:bg-black/5 transition-colors rounded-t-xl"
          >
             <div className="flex flex-col items-start truncate overflow-hidden">
               <div className="text-[10px] font-mono tracking-widest opacity-40 text-left mb-1 truncate w-full">CURRENT MODULE</div>
               <div className="font-bold uppercase tracking-widest text-sm md:text-base text-black flex items-center gap-3 truncate w-full overflow-hidden text-left">
                 <span className="text-[#8DC63F] shrink-0 whitespace-nowrap">{PROGRAM_TRACKS[activeTab].week}</span>
                 <span className="truncate">{PROGRAM_TRACKS[activeTab].title}</span>
               </div>
             </div>
             <ChevronDown className={`shrink-0 w-5 h-5 transition-transform opacity-40 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 bg-white border border-black/10 border-t-0 shadow-2xl rounded-b-xl overflow-hidden flex flex-col min-w-full"
              >
                {PROGRAM_TRACKS.map((track, idx) => (
                  <button
                    key={track.id}
                    onClick={() => { setActiveTab(idx); setIsOpen(false); }}
                    className={`px-5 py-4 w-full text-left transition-all flex items-center justify-between border-b last:border-b-0 border-black/5 ${
                      activeTab === idx ? 'bg-[#8DC63F]/5 text-black' : 'hover:bg-black/5 opacity-60 hover:opacity-100'
                    }`}
                  >
                     <div className="flex flex-col overflow-hidden w-full">
                       <div className="text-[10px] font-mono tracking-widest font-bold text-[#8DC63F] mb-1 truncate">{track.week}</div>
                       <div className="font-bold text-sm uppercase tracking-widest truncate">{track.title}</div>
                     </div>
                     {activeTab === idx && <CheckCircle className="shrink-0 w-4 h-4 text-[#8DC63F] ml-2" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Console Main Window */}
        <div className="p-6 md:p-10 relative overflow-hidden bg-[#F4F4F4] min-h-[400px] flex flex-col z-0 rounded-b-xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              layout
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col flex-1"
            >
              
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 leading-none text-black break-words">
                    {PROGRAM_TRACKS[activeTab].title}
                  </h2>
                  <div className="inline-block bg-[#8DC63F]/20 text-[#4c6b22] px-3 py-1 text-[10px] font-bold tracking-widest w-max mb-6 border border-[#8DC63F]/30 rounded">
                    {PROGRAM_TRACKS[activeTab].shortDescription}
                  </div>
                  
                  <p className="text-base md:text-lg opacity-80 leading-relaxed max-w-xl text-black">
                    {PROGRAM_TRACKS[activeTab].longDescription}
                  </p>
                </div>
                
                {/* Visual Block inside */}
                <div className="w-full h-32 md:h-48 relative rounded-xl overflow-hidden mt-6 mb-8 group">
                   <img src={PROGRAM_TRACKS[activeTab].image} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-20 grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-40" alt=""/>
                </div>

                <div className="w-full bg-white border border-black/10 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="font-mono text-[10px] text-[#8DC63F] font-bold tracking-widest uppercase mb-2">Advanced Upgrade</div>
                    <h4 className="font-bold text-xl leading-tight">{ADVANCED_TRACKS[activeTab].title}</h4>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                     <div className="w-8 h-8 rounded-full bg-black/5" />
                     <div className="text-xs">
                        <span className="opacity-40 block text-[9px] uppercase font-mono tracking-widest">Speaker</span>
                        <span className="font-bold leading-none">{ADVANCED_TRACKS[activeTab].speaker}</span>
                     </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// VARIANT P: Mobile Dashboard (Bottom App Nav)
// ==========================================
const VariantP_DashboardAppNav = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mb-32">
      <EditorialSectionHeader eyebrow="VARIANT P" title="Mobile Dashboard: App Nav" />
      <p className="mb-8 text-sm opacity-60 uppercase max-w-2xl">
        Idea: Как мобильное приложение. Внизу прилипает панель табов (Bottom Navigation), которая управляет основным экраном сверху.
      </p>

      <div className="flex flex-col border border-black/10 bg-[#F4F4F4] shadow-sm rounded-xl overflow-hidden h-[600px] md:h-[500px] relative w-full">
        
        {/* Main Content Area */}
        <div className="flex-1 p-6 md:p-10 relative overflow-y-auto no-scrollbar w-full pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              layout
              key={activeTab}
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col pb-6"
            >
              <div className="font-mono text-[10px] font-bold text-[#8DC63F] tracking-widest mb-4 border border-[#8DC63F]/30 bg-[#8DC63F]/10 px-3 py-1 rounded-full w-max">
                {PROGRAM_TRACKS[activeTab].week}
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none text-black">
                {PROGRAM_TRACKS[activeTab].title}
              </h2>
              <div className="text-[10px] uppercase font-bold tracking-widest opacity-40 mb-8">{PROGRAM_TRACKS[activeTab].shortDescription}</div>
              
              <p className="text-base md:text-lg opacity-80 leading-relaxed max-w-xl text-black">
                {PROGRAM_TRACKS[activeTab].longDescription}
              </p>
              
              <div className="mt-12 bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
                 <h4 className="font-bold text-lg md:text-xl mb-2 flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-[#8DC63F] shrink-0" />
                   {ADVANCED_TRACKS[activeTab].title}
                 </h4>
                 <p className="text-sm opacity-70 mb-4 leading-relaxed">{ADVANCED_TRACKS[activeTab].description}</p>
                 <div className="text-[10px] font-mono uppercase tracking-widest opacity-50 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-black/10 inline-block" />
                    Curator: {ADVANCED_TRACKS[activeTab].speaker}
                 </div>
              </div>
              
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom App-like Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-black/10 flex justify-between px-2 pb-6 md:pb-2 pt-2 z-20 w-full overflow-x-auto no-scrollbar">
          {PROGRAM_TRACKS.map((track, idx) => (
            <button
              key={track.id}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 min-w-[70px] flex flex-col items-center justify-center py-3 px-1 rounded-xl transition-all ${
                activeTab === idx ? 'bg-[#8DC63F]/10 text-[#547924]' : 'text-black/40 hover:bg-black/5 hover:text-black'
              }`}
            >
              <div className={`font-mono text-xs font-bold mb-1 ${activeTab === idx ? 'opacity-100' : 'opacity-60'}`}>{track.id}</div>
              <div className="text-[8px] font-bold uppercase tracking-widest text-center truncate w-full px-1">Week</div>
            </button>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default function ProgramVariantsPage() {
  return (
    <div className="min-h-screen bg-[#F4F4F4] text-black pt-12 pb-24 font-sans selection:bg-[#8DC63F] selection:text-white overflow-x-hidden">
      <Container>
        <div className="mb-20 max-w-4xl">
          <div className="font-mono text-[10px] opacity-40 mb-6">/LAB/PROGRAM_PROTOTYPES</div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
            Program Block <br/> Explorations
          </h1>
          <p className="text-lg opacity-60 leading-relaxed">
            4 вариантов дизайна для расписания программы, решающих проблему ориентации.
            В каждом варианте учтена структура из 4 недель и фокус на то, чтобы "текущая неделя" или
            "активный блок" выделялся, чтобы пользователь не терялся.
          </p>
        </div>

        <VariantA_Pipeline />
        <VariantB_Dashboard />
        <VariantC_Accordion />
        <VariantC1_ElevatedAccordion />
        <VariantC2_LineAccordion />
        <VariantC3_ImmersiveBlock />
        
        <VariantD_Grid />
        <VariantE_TimelineGrid />
        <VariantF_Storytelling />
        <VariantG_SplitScreen />
        <VariantH_LayeredCards />
        <VariantI_HorizontalScroll />
        <VariantJ_BentoGrid />
        
        <VariantN_DashboardHorizontal />
        <VariantO_DashboardSelect />
        <VariantP_DashboardAppNav />
        
        <VariantK_InteractiveStepsAlpha />
        <VariantL_InteractiveStepsBeta />
        <VariantM_InteractiveStepsGamma />
      </Container>
    </div>
  );
}
