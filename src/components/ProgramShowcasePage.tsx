import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ArrowRight, Circle, CheckCircle, Tag, Star, RotateCcw, User, Plus } from 'lucide-react';

const PROGRAM_TRACKS = [
  {
    id: '01',
    week: 'НЕДЕЛЯ 1',
    title: 'Prompt Engineering',
    shortDescription: 'ИИ как интерфейс мышления',
    longDescription: 'Освоение техник промптов: Chain-of-Thought, Few-Shot Learning, Custom GPTs. Создание первых персональных ассистентов.',
    events: ['Лекция', 'Воркшоп', 'Q&A', 'Коворкинг'],
    image: 'https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/65d18cfa-068c-41be-84e1-71fb9061e483/image/w=1920,quality=90,fit=scale-down',
  },
  {
    id: '02',
    week: 'НЕДЕЛЯ 2',
    title: 'Context Engineering',
    shortDescription: 'Автоматизация и агенты',
    longDescription: 'Управление контекстом: Obsidian + MCP + Claude. Автоматизация через n8n, Make. AI-агенты и workflows.',
    events: ['Лекция', 'Воркшоп', 'Q&A'],
    image: 'https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/60092ff1-af15-4fa1-94a3-70431999739a/image/w=1920,quality=90,fit=scale-down',
  },
  {
    id: '03',
    week: 'НЕДЕЛЯ 3',
    title: 'Mind Engineering',
    shortDescription: 'Продуктивность и ритуалы',
    longDescription: 'AI для коучинга, рефлексии, персональных ритуалов. Трекинг привычек и целей с поддержкой AI.',
    events: ['Лекция', 'Разбор кейсов', 'Q&A'],
    image: 'https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/d28cb095-3c81-4633-b608-9a3f4d6d02d5/0b9e2c9f-8eb2-4e87-899f-919341b68082/w=1920,quality=90,fit=scale-down',
  },
  {
    id: '04',
    week: 'НЕДЕЛЯ 4',
    title: 'Life Engineering',
    shortDescription: 'Творчество и реализация',
    longDescription: 'От идеи до прототипа. Vibe-coding с Cursor, Windsurf, Claude Projects. Создание без технического бэкграунда.',
    events: ['Лекция', 'Воркшоп', 'Демо-день'],
    image: 'https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/80776b2f-5e06-416e-b6ef-7ef73f71cbf8/2026-01-16_15.04.52/w=1920,quality=90,fit=scale-down',
  },
];

const ADVANCED_TRACKS = [
  { id: 'T1', week: 'НЕДЕЛЯ 1', title: 'AI Coaching', description: 'Для тех, кто выгорел и ищет баланс. AI для коучинга, рефлексии.', speaker: 'Александр Поваляев' },
  { id: 'T2', week: 'НЕДЕЛЯ 2', title: 'AI Agents', description: 'Автономные AI-системы. Проектирование и запуск AI-агентов.', speaker: 'Сергей Хабаров' },
  { id: 'T3', week: 'НЕДЕЛЯ 3', title: 'Vibe-Coding', description: 'Творческое программирование. От идеи до прототипа за часы.', speaker: 'Анна Лозицкая' },
  { id: 'T4', week: 'НЕДЕЛЯ 4', title: 'AI Creative', description: 'Для музыкантов, художников и креативщиков. Генерация визуального контента.', speaker: 'Анка Ставенски' },
];

const ProgramSectionHeader = () => (
  <div className="flex flex-col mb-16 md:mb-24 px-4 md:px-0 mt-8">
    <div className="flex items-center gap-4 mb-16 text-xs font-mono uppercase tracking-widest font-bold">
      <div className="opacity-40 whitespace-nowrap">AI MINDSET LAB</div>
      <div className="h-[1px] w-8 md:w-16 bg-black/20" />
      <div className="whitespace-nowrap">ПРОГРАММА</div>
    </div>
    <div className="flex flex-col items-center text-center">
      <h2 className="text-3xl md:text-5xl lg:text-5xl font-black uppercase tracking-tighter mb-6 md:mb-8">
        19 ЯНВАРЯ — 16 ФЕВРАЛЯ &bull; 4 НЕДЕЛИ
      </h2>
      <p className="text-sm md:text-lg font-mono uppercase tracking-widest opacity-40 max-w-3xl leading-relaxed md:leading-loose">
        НЕ КУРС, А ЛАБОРАТОРИЯ С ЧЁТКОЙ ТРАЕКТОРИЕЙ: ЗА МЕСЯЦ СОБИРАЕШЬ РАБОТАЮЩУЮ СИСТЕМУ УСИЛЕНИЯ ИНТЕЛЛЕКТА.
      </p>
    </div>
  </div>
);

const EditorialSectionHeader = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="flex items-end gap-6 md:gap-8 mb-12">
    <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 shrink-0">{eyebrow}</div>
    <div className="h-px flex-1 bg-black/10 mb-[0.28rem]" />
    <div className="font-black uppercase tracking-widest text-2xl md:text-3xl lg:text-4xl text-right leading-none">{title}</div>
  </div>
);

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-24">
    {children}
  </div>
);

// ============================================================================
// ANIMATIONS & 3D COMPONENTS FROM LOCAL BRAND ASSETS
// ============================================================================

const WireframeStyles = () => (
  <style>{`
    .wireframe-container {
      perspective: 1000px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .cube {
      width: 100px;
      height: 100px;
      position: relative;
      transform-style: preserve-3d;
      animation: rotate-3d 20s infinite linear;
    }

    .cube-face {
      position: absolute;
      width: 100px;
      height: 100px;
      border: 1px solid rgba(0, 0, 0, 0.05);
      background: rgba(0, 0, 0, 0.02);
    }

    .face-front  { transform: rotateY(  0deg) translateZ(50px); }
    .face-back   { transform: rotateY(180deg) translateZ(50px); }
    .face-right  { transform: rotateY( 90deg) translateZ(50px); }
    .face-left   { transform: rotateY(-90deg) translateZ(50px); }
    .face-top    { transform: rotateX( 90deg) translateZ(50px); }
    .face-bottom { transform: rotateX(-90deg) translateZ(50px); }

    @keyframes rotate-3d {
      from { transform: rotateX(0deg) rotateY(0deg); }
      to { transform: rotateX(360deg) rotateY(360deg); }
    }

    .sphere {
      width: 100px;
      height: 100px;
      position: relative;
      transform-style: preserve-3d;
      animation: rotate-3d 25s infinite linear;
    }
    .sphere-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 1px solid rgba(0, 0, 0, 0.05);
      border-radius: 50%;
    }

    .torus {
      width: 100px;
      height: 100px;
      position: relative;
      transform-style: preserve-3d;
      animation: rotate-3d 20s infinite linear;
    }
    .torus-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 1px solid rgba(0, 0, 0, 0.05);
      border-radius: 50%;
    }

    .neural-node {
      width: 10px;
      height: 10px;
      background: rgba(0,0,0,0.1);
      border-radius: 50%;
      position: relative;
    }
    .neural-line {
      position: absolute;
      height: 1px;
      background: linear-gradient(90deg, rgba(0,0,0,0.1), transparent);
      transform-origin: left center;
    }
  `}</style>
);

const Cube = ({ size = 100, className = "" }: { size?: number, className?: string }) => (
  <div className={`wireframe-container ${className}`}>
    <div className="cube" style={{ width: size, height: size, transform: `scale(${size/100})` }}>
      <div className="cube-face face-front" />
      <div className="cube-face face-back" />
      <div className="cube-face face-right" />
      <div className="cube-face face-left" />
      <div className="cube-face face-top" />
      <div className="cube-face face-bottom" />
    </div>
  </div>
);

const Torus = ({ size = 100, className = "" }: { size?: number, className?: string }) => (
  <div className={`wireframe-container ${className}`}>
    <div className="torus" style={{ width: size, height: size }}>
      {[0, 20, 40, 60, 80, 100, 120, 140, 160].map((deg) => (
        <div
          key={deg}
          className="torus-ring"
          style={{
            transform: `rotateY(${deg}deg) translateZ(${size * 0.3}px)`,
            width: size * 0.6,
            height: size * 0.6,
            left: '20%',
            top: '20%',
          }}
        />
      ))}
    </div>
  </div>
);

const Sphere = ({ size = 100, className = "" }: { size?: number, className?: string }) => (
  <div className={`wireframe-container ${className}`}>
    <div className="sphere" style={{ width: size, height: size }}>
      {[0, 30, 60, 90, 120, 150].map((deg) => (
        <React.Fragment key={deg}>
          <div className="sphere-ring" style={{ transform: `rotateY(${deg}deg)` }} />
          <div className="sphere-ring" style={{ transform: `rotateX(${deg}deg)` }} />
        </React.Fragment>
      ))}
    </div>
  </div>
);

const NeuralNetwork = ({ className = "" }: { className?: string }) => (
  <div className={`wireframe-container flex items-center justify-center relative ${className}`}>
    <div className="relative w-full h-full min-w-[100px] min-h-[100px]">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute neural-node border shadow-xl"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
        >
          {[...Array(3)].map((_, j) => (
            <div
              key={j}
              className="neural-line"
              style={{
                width: `${30 + Math.random() * 60}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: 0.5,
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  </div>
);

// ============================================================================
// UX IDEA 1: THE ACCORDION (Expandable Rows with 3D Graphics & PRO Tags)
// ============================================================================

// ----------------------------------------------------
// A1: Grid Mesh (Refined)
// ----------------------------------------------------
const Showcase_A1_GridMesh = ({ overlayGrid = false }: { overlayGrid?: boolean }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="mb-32">
      <ProgramSectionHeader />

      <div className="bg-[#fcfdfc] relative overflow-hidden py-4 md:py-8 border-t border-black/10">
        {overlayGrid && (
          <div
            className="absolute inset-0 z-30 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.18) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />
        )}
        <div className={`relative flex flex-col ${overlayGrid ? 'z-10' : ''}`}>
          {PROGRAM_TRACKS.map((track, idx) => {
            const advanced = ADVANCED_TRACKS[idx];
            const isOpen = openIdx === idx;
            
            return (
              <div key={track.id} className="bg-transparent border-b border-black/5 overflow-hidden transition-all group relative">
                
                {/* Background 3D Image when open */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute right-0 top-0 bottom-0 w-1/2 md:w-1/3 pointer-events-none overflow-hidden opacity-5 mix-blend-multiply"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent mix-blend-multiply" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left py-6 md:py-8 flex items-center justify-between gap-6 relative z-10"
                >
                  {/* Left content: Week & Title */}
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12 flex-1">
                    <div className="flex flex-col">
                       <span className="font-mono text-sm tracking-widest opacity-60 uppercase font-black shrink-0 md:w-28 text-black">
                         {track.week}
                       </span>
                       <span className="text-[10px] uppercase font-bold tracking-widest opacity-40 mt-1 md:hidden">{track.shortDescription}</span>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold tracking-widest opacity-40 mb-1 hidden md:block">{track.shortDescription}</span>
                      <h3 className="font-medium tracking-tight text-3xl md:text-5xl text-black/90 group-hover:text-black transition-colors py-1">
                        {track.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right content: Toggle Icon */}
                  <div className="flex items-center gap-6 justify-end pr-2 md:pr-4">
                    <div className={`w-10 h-10 md:w-12 md:h-12 border rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'border-black bg-black text-white rotate-45' : 'border-black/20 text-black/60 group-hover:bg-black/5'}`}>
                      <Plus strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                     <motion.div
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: 'auto', opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       transition={{ duration: 0.4 }}
                       className="overflow-hidden relative z-10"
                     >
                       <div className="pb-12 md:pb-16 flex flex-col md:flex-row gap-12 lg:gap-24 items-start md:pl-[calc(7rem+48px)] pr-4 md:pr-12 mt-4 md:mt-0">
                          
                          {/* Core Track Info */}
                          <div className="flex-1 max-w-xl">
                            <p className="text-base md:text-lg opacity-80 leading-relaxed font-light mb-8">
                              {track.longDescription}
                            </p>
                            
                            <div className="text-sm font-mono tracking-widest text-black/80 font-bold flex flex-wrap gap-4">
                              <span className="text-black/40 font-normal uppercase text-xs flex items-center">Events:</span>
                              {track.events.map((evt, eIdx) => (
                                <span key={eIdx}>{evt}</span>
                              ))}
                            </div>
                          </div>

                          {/* Advanced Track Info (STRICTLY RIGHT ALIGNED) */}
                          <div className="w-full md:w-[320px] lg:w-[400px] shrink-0 border-l mb-8 md:mb-0 border-black/10 pl-0 md:pl-10 flex flex-col items-end text-right mt-8 md:mt-0 self-stretch justify-center">
                            <div className="flex items-center gap-3 mb-6">
                              <span className="text-[10px] font-mono tracking-widest opacity-50 uppercase">Advanced Track</span>
                              <span className="bg-[#8DC63F] text-black text-[9px] font-mono tracking-widest px-2 py-0.5 rounded font-bold">PRO</span>
                            </div>
                            
                            <h4 className="font-bold text-xl md:text-2xl mb-3">
                              {advanced.title}
                            </h4>
                            <p className="text-sm opacity-70 leading-relaxed mb-8 max-w-[280px]">
                              {advanced.description}
                            </p>
                            
                            <div className="text-right w-full">
                                <div className="text-[9px] uppercase tracking-widest font-mono opacity-40 mb-1">Куратор PRO-трека</div>
                                <div className="text-sm font-bold">{advanced.speaker}</div>
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
    </div>
  );
};



// ----------------------------------------------------
// A3: Simplified Clean Minimal (Replaced Neumorphism)
// ----------------------------------------------------
const Showcase_A3_TechNeo = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="mb-32">
      <ProgramSectionHeader />
       <ProgramSectionHeader />
       <EditorialSectionHeader eyebrow="ПРОГРАММА / PROGRAM" title="Soft Minimal" />
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>

      <div className="bg-[#f8f9fa] p-4 md:p-8 rounded-3xl flex flex-col gap-4">
        {PROGRAM_TRACKS.map((track, idx) => {
          const advanced = ADVANCED_TRACKS[idx];
          const isOpen = openIdx === idx;
          
          return (
            <div key={track.id} className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-md border border-black/10' : 'shadow-sm border border-transparent hover:border-black/5'}`}>
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 relative"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center font-mono tracking-widest font-bold text-lg transition-colors ${isOpen ? 'bg-[#8DC63F]/10 text-[#8DC63F]' : 'bg-[#f4f5f7] text-black/40'}`}>
                    W{idx + 1}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[10px] font-mono tracking-widest opacity-40 uppercase font-bold">{track.shortDescription}</div>
                    <h3 className="font-bold text-xl md:text-2xl uppercase tracking-tighter text-black/90">{track.title}</h3>
                  </div>
                </div>
                
                <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-black text-white' : 'bg-[#f4f5f7] text-black/40'}`}>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <AnimatePresence>
                 {isOpen && (
                   <motion.div
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     transition={{ duration: 0.4, ease: 'easeInOut' }}
                     className="overflow-hidden"
                   >
                     <div className="px-6 pb-8 md:px-8 md:pb-8 flex flex-col gap-8 pt-4">
                        
                        <div className="h-px w-full bg-black/5" />

                        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
                          
                          {/* Left: Text & Events */}
                          <div className="flex-[3]">
                            <p className="opacity-80 leading-relaxed text-base font-medium mb-6">
                              {track.longDescription}
                            </p>
                            
                            <div className="text-[10px] font-mono uppercase tracking-widest text-black/60 bg-[#f8f9fa] p-4 rounded-xl flex flex-wrap gap-3">
                              <span className="font-bold text-black/40">Форматы:</span> 
                              {track.events.map((evt, eIdx) => (
                                <span key={eIdx}>{evt}</span>
                              ))}
                            </div>
                          </div>

                          {/* Right: PRO Module (Strictly Right Aligned) */}
                          <div className="flex-[2] bg-[#fbfbfb] border border-black/5 text-black rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between items-end text-right">
                             <div className="flex items-center justify-end gap-2 mb-4 w-full">
                               <div className="font-mono text-[10px] uppercase tracking-widest font-bold opacity-50">Advanced Track</div>
                               <span className="bg-[#8DC63F] text-black px-2 py-0.5 rounded text-[10px] font-mono tracking-widest font-bold">PRO</span>
                             </div>
                             
                             <h4 className="font-black text-xl mb-2">{advanced.title}</h4>
                             <p className="text-xs opacity-60 leading-relaxed mb-6 max-w-[250px] ml-auto">{advanced.description}</p>
                             
                             <div className="flex items-center gap-3 mt-auto pt-4 border-t border-black/5 w-full justify-end">
                               <div className="text-right">
                                 <div className="text-[9px] uppercase tracking-widest font-mono opacity-40">Куратор PRO-трека</div>
                                 <div className="text-xs font-bold">{advanced.speaker}</div>
                               </div>
                               <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center">
                                 <User className="w-4 h-4 opacity-50" />
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

// ----------------------------------------------------
// A4: Cinematic Collapse (Large Imagery, Heavy impact)
// ----------------------------------------------------
const Showcase_A4_CinematicCollapse = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="mb-32">
      <ProgramSectionHeader />
       <ProgramSectionHeader />
       <EditorialSectionHeader eyebrow="ПРОГРАММА / PROGRAM" title="Cinematic Collapse" />
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>

      <div className="flex flex-col gap-2">
        {PROGRAM_TRACKS.map((track, idx) => {
          const advanced = ADVANCED_TRACKS[idx];
          const isOpen = openIdx === idx;
          
          return (
            <div key={track.id} className={`rounded-[2rem] overflow-hidden transition-all duration-700 relative border border-black/5 ${isOpen ? 'h-auto shadow-lg bg-white' : 'h-[100px] md:h-[120px] bg-black/5 hover:bg-black/10'}`}>
              
              {/* Abstract Light Background when open */}
              {isOpen && (
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#fdfdfd] via-[#f7f8fa] to-[#f0f2f5] overflow-hidden">
                   <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8DC63F]/10 blur-[120px] rounded-full pointer-events-none" />
                </div>
              )}

              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className={`w-full text-left h-[100px] md:h-[120px] px-8 md:px-12 flex flex-col md:flex-row md:items-center justify-between relative z-20 ${isOpen ? 'text-black border-b border-black/5' : 'text-black'}`}
              >
                 <div className="flex items-center gap-6 h-full">
                   <span className={`font-mono text-lg tracking-widest ${isOpen ? 'text-[#8DC63F] font-bold' : 'opacity-40'}`}>{track.week}</span>
                   <span className="font-black uppercase tracking-tighter text-2xl md:text-4xl">{track.title}</span>
                 </div>
                 
                 <div className={`hidden md:flex w-12 h-12 rounded-full items-center justify-center backdrop-blur-md border transition-colors ${isOpen ? 'border-black/10 bg-black/5' : 'border-black/10 bg-black/5'}`}>
                   <ChevronDown className={`w-6 h-6 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                 </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="relative z-10"
                  >
                    <div className="p-8 md:p-12 text-black flex flex-col gap-12">
                      <div className="flex flex-col md:flex-row gap-12">
                        {/* Content */}
                        <div className="flex-1 flex flex-col justify-center">
                          <p className="text-xl md:text-3xl font-light leading-snug mb-8 max-w-4xl text-black/80">
                             {track.longDescription}
                          </p>

                          {/* Events */}
                          <div className="text-xs font-mono uppercase tracking-widest text-[#8DC63F] font-bold flex flex-wrap gap-4">
                             <span className="text-black/40 font-normal">Events (Форматы):</span>
                             {track.events.map((evt, eIdx) => (
                               <span key={eIdx}>{evt}</span>
                             ))}
                          </div>
                        </div>
                      </div>

                      {/* Advanced Track PRO bar - Full width at bottom, right aligned text */}
                      <div className="w-full bg-white border border-black/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
                        
                        {/* Main program currator (Left side) */}
                        <div className="flex items-center gap-4 opacity-60">
                           <div className="flex flex-col">
                             <span className="text-[10px] font-mono tracking-widest uppercase mb-1">Основная программа</span>
                             <span className="font-bold text-sm">Команда AI Mindset</span>
                           </div>
                        </div>

                        {/* PRO Track strictly on the right */}
                        <div className="flex flex-col items-end text-right flex-1 border-t md:border-t-0 md:border-l border-black/10 pt-6 md:pt-0 pl-0 md:pl-8 mt-6 md:mt-0">
                           <div className="flex items-center gap-3 mb-4 justify-end w-full">
                             <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Advanced Track</span>
                             <span className="bg-white text-black font-black px-2 py-0.5 rounded text-[10px] tracking-widest">PRO</span>
                           </div>
                           <h4 className="font-black text-2xl uppercase tracking-tighter mb-2">{advanced.title}</h4>
                           <p className="text-sm opacity-70 max-w-sm ml-auto mb-6 leading-relaxed">{advanced.description}</p>
                           
                           <div className="flex items-center gap-3 w-full justify-end">
                             <div className="text-right">
                               <div className="text-[10px] uppercase font-bold tracking-widest opacity-40 mb-1">Куратор PRO-трека</div>
                               <div className="text-sm font-bold">{advanced.speaker}</div>
                             </div>
                             <div className="w-10 h-10 rounded-full bg-black/5 hidden md:flex items-center justify-center">
                               <User className="w-5 h-5 opacity-40" />
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


// ============================================================================
// UX IDEA 2: HORIZONTAL SCROLL CARDS (Native feeling variants)
// ============================================================================

// ----------------------------------------------------
// B1: Core & Pro Cards (One separator, clear split)
// ----------------------------------------------------
const Showcase_B1_HorizontalSplit = () => {
  return (
    <div className="mb-32">
      
      <ProgramSectionHeader />
       <ProgramSectionHeader />
       <EditorialSectionHeader eyebrow="HORIZONTAL V1" title="Cards: Split Context" />
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
      <ProgramSectionHeader />

      <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory mx-[-1rem] md:mx-[-3rem] px-[1rem] md:px-[3rem] hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
        {PROGRAM_TRACKS.map((track, idx) => {
          const advanced = ADVANCED_TRACKS[idx];
          
          return (
            <div key={track.id} className="shrink-0 w-[85vw] md:w-[450px] snap-center flex flex-col border border-black/10 shadow-sm rounded-[2rem] overflow-hidden bg-white relative">
              
              {/* Top Banner Image */}
              <div className="w-full h-48 relative bg-black/5">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-[#8DC63F]/20 to-transparent opacity-60 mix-blend-multiply" />
                
                {/* Overlay Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/90 backdrop-blur-md text-black px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest font-bold shadow-sm">
                    {track.week}
                  </span>
                </div>
              </div>

              {/* Core Content */}
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-3xl font-black uppercase tracking-tighter leading-[0.9] mb-4">{track.title}</h3>
                <p className="opacity-80 leading-relaxed text-sm md:text-base font-light mb-6">
                  {track.longDescription}
                </p>

                {/* Events list inline */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {track.events.map((evt, eIdx) => (
                    <span key={eIdx} className="text-[9px] font-mono uppercase tracking-widest px-2 py-1 bg-[#f4f4f4] text-black/60 rounded">
                      {evt}
                    </span>
                  ))}
                </div>
                
                {/* ONE Separator for Advanced Track (STRICTLY RIGHT ALIGNED) */}
                <div className="mt-auto border-t border-black/10 pt-6 relative bg-gradient-to-b from-transparent to-[#fafafa] -mx-8 -mb-8 px-8 pb-8 flex flex-col items-end text-right">
                  <div className="flex items-center justify-end gap-2 mb-3">
                     <div className="font-mono text-[10px] uppercase font-bold tracking-widest opacity-40">Advanced Track</div>
                     <span className="bg-[#8DC63F] text-black text-[9px] px-2 py-0.5 rounded tracking-widest uppercase font-bold">PRO</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1 leading-tight">{advanced.title}</h4>
                  <p className="text-xs opacity-60 leading-relaxed max-w-[90%] mb-4">{advanced.description}</p>
                  
                  <div className="flex justify-between items-end w-full mt-2 pt-4 border-t border-black/5">
                    <div className="text-left w-1/2">
                      <div className="text-[9px] uppercase tracking-widest font-mono opacity-40 mb-1">Куратор основной программы</div>
                      <div className="text-xs font-bold">Команда AI Mindset</div>
                    </div>
                    
                    <div className="text-right w-1/2">
                      <div className="text-[9px] uppercase tracking-widest font-mono opacity-40 mb-1">Куратор PRO-трека</div>
                      <div className="text-xs font-bold">{advanced.speaker}</div>
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



// ============================================================================
// UX IDEA 3: BOTTOM TAB CARDS (Mobile-First / Presentation Style)
// ============================================================================

// ----------------------------------------------------
// C1: Clean Tab Card (Faithful to Screenshot)
// ----------------------------------------------------
const Showcase_C1_CleanTabCard = () => {
  const [activeWeek, setActiveWeek] = useState(0);
  const track = PROGRAM_TRACKS[activeWeek];
  const advanced = ADVANCED_TRACKS[activeWeek];

  return (
    <div className="mb-32">
      <ProgramSectionHeader />
       <ProgramSectionHeader />
       <EditorialSectionHeader eyebrow="TABBED V1" title="Cards: Clean Interface" />
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
      

      <div className="w-full max-w-sm mx-auto md:max-w-3xl">
         <div className="bg-[#fcfcfc] border border-black/10 rounded-2xl flex flex-col overflow-hidden shadow-sm">
            
            {/* Top Content Area */}
            <div className="p-8 flex-1 flex flex-col md:flex-row gap-8">
               <div className="flex-1">
                 <div className="inline-block border border-[#8DC63F]/40 bg-[#8DC63F]/5 text-[#6c9c27] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase font-mono mb-6">
                   {track.week}
                 </div>
                 
                 <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-4 text-[#1a1a1a]">
                   {track.title}
                 </h3>
                 <div className="text-[10px] uppercase font-bold tracking-widest opacity-40 mb-8">{track.shortDescription}</div>
                 
                 <p className="text-sm md:text-base opacity-80 leading-relaxed font-medium text-black/80 max-w-md">
                   {track.longDescription}
                 </p>
               </div>
               
               {/* Decorative Graphic area - replacing the empty space */}
               <div className="hidden md:flex w-48 shrink-0 flex-col items-end">
                 <div className="w-full h-48 rounded-xl overflow-hidden bg-black/5 mb-4 shadow-inner border border-black/5">
                   <div className="w-full h-full bg-gradient-to-bl from-black/10 via-transparent to-transparent opacity-60 mix-blend-multiply" />
                 </div>
               </div>
            </div>

            {/* Advanced Track / PRO Block - RIGHT ALIGNED */}
            <div className="mx-8 mb-8 bg-white border border-black/5 rounded-xl p-6 shadow-sm flex flex-col items-end text-right">
               <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-40">Advanced Track</span>
                  <span className="bg-[#8DC63F] text-black px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    PRO
                  </span>
               </div>
               <h4 className="font-bold text-lg mb-2">{advanced.title}</h4>
               <p className="text-sm opacity-70 leading-relaxed max-w-xs mb-4">{advanced.description}</p>
               
               <div className="flex flex-col items-end gap-1 text-right border-t border-black/5 w-full pt-3">
                 <span className="text-[10px] uppercase font-mono tracking-widest opacity-40">Куратор PRO-трека</span>
                 <span className="text-xs font-bold">{advanced.speaker}</span>
               </div>
            </div>

            {/* Bottom Tabs */}
            <div className="flex border-t border-black/5 bg-white p-2 gap-2">
               {PROGRAM_TRACKS.map((t, i) => {
                 const isActive = activeWeek === i;
                 return (
                   <button 
                     key={t.id}
                     onClick={() => setActiveWeek(i)}
                     className={`flex-1 py-3 px-2 flex flex-col items-center justify-center rounded-lg transition-colors ${isActive ? 'bg-[#f4faeb] text-[#8DC63F]' : 'text-black/40 hover:bg-black/5'}`}
                   >
                     <span className={`text-[10px] sm:text-sm font-black mb-1 ${isActive ? 'opacity-100' : 'opacity-60'}`}>{t.id}</span>
                     <span className={`text-[8px] uppercase tracking-widest font-bold ${isActive ? 'opacity-100' : 'opacity-40'}`}>Week</span>
                   </button>
                 )
               })}
            </div>

         </div>
      </div>
    </div>
  )
};

// ----------------------------------------------------
// C2: Graphic Split Tab (Visual heavy top half)
// ----------------------------------------------------
const Showcase_C2_GraphicSplitTab = () => {
  const [activeWeek, setActiveWeek] = useState(0);
  const track = PROGRAM_TRACKS[activeWeek];
  const advanced = ADVANCED_TRACKS[activeWeek];

  return (
    <div className="mb-32">
      <ProgramSectionHeader />
       <ProgramSectionHeader />
       <EditorialSectionHeader eyebrow="TABBED V2" title="Cards: Graphic Split" />
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
      

      <div className="w-full max-w-sm mx-auto md:max-w-4xl">
         
         <AnimatePresence mode="wait">
           <motion.div 
             key={activeWeek}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             transition={{ duration: 0.3 }}
             className="bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 flex flex-col md:flex-row"
           >
              
              {/* Massive Image Zone */}
              <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-black shrink-0">
                 <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/5 to-[#fcfcfc] opacity-80" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                 
                 <div className="absolute bottom-6 left-6 right-6 text-white">
                   <div className="text-[10px] font-mono tracking-widest uppercase mb-2 opacity-60">{track.week}</div>
                   <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">{track.title}</h3>
                 </div>
              </div>

              {/* Content Zone */}
              <div className="flex-1 p-8 md:p-10 flex flex-col">
                 <div className="flex flex-wrap gap-2 mb-6">
                    {track.events.map((evt, eIdx) => (
                       <span key={eIdx} className="text-[9px] font-bold uppercase tracking-widest text-[#8DC63F] bg-[#8DC63F]/10 px-2 py-1 rounded">
                         {evt}
                       </span>
                    ))}
                 </div>

                 <p className="opacity-80 text-sm md:text-base leading-relaxed mb-10 max-w-md">
                   {track.longDescription}
                 </p>

                 {/* Right Aligned PRO Block */}
                 <div className="mt-auto border-t border-black/10 pt-6">
                    <div className="flex flex-col items-end text-right">
                       <div className="flex items-center gap-2 mb-1 justify-end">
                         <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">Advanced Track</span>
                         <span className="bg-[#8DC63F] text-black px-2 py-0.5 rounded text-[10px] font-black uppercase shadow-md">PRO</span>
                       </div>
                       <h4 className="font-bold text-xl mb-2">{advanced.title}</h4>
                       <p className="text-xs opacity-60 max-w-[280px] leading-relaxed mb-4">{advanced.description}</p>
                       <div className="flex flex-col border-t border-black/5 pt-2 w-full items-end mt-2">
                         <div className="text-[9px] font-mono tracking-widest uppercase opacity-40 mb-1">Куратор PRO-трека</div>
                         <div className="text-black font-bold text-xs">{advanced.speaker}</div>
                       </div>
                    </div>
                 </div>
              </div>

           </motion.div>
         </AnimatePresence>

         {/* Detached Bottom Tabs */}
         <div className="flex justify-center mt-6 gap-2 md:gap-4 flex-wrap">
            {PROGRAM_TRACKS.map((t, i) => {
              const isActive = activeWeek === i;
              return (
                <button 
                  key={t.id}
                  onClick={() => setActiveWeek(i)}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${isActive ? 'bg-black text-white shadow-lg' : 'bg-white text-black/50 border border-black/10 hover:bg-black/5'}`}
                >
                  {t.week}
                </button>
              )
            })}
         </div>

      </div>
    </div>
  )
};

// ----------------------------------------------------
// C3: Light Neon Tab (Light mode execution)
// ----------------------------------------------------
const Showcase_C3_DarkNeonTab = () => {
  const [activeWeek, setActiveWeek] = useState(0);
  const track = PROGRAM_TRACKS[activeWeek];
  const advanced = ADVANCED_TRACKS[activeWeek];

  return (
    <div className="mb-32">
      <ProgramSectionHeader />
       <ProgramSectionHeader />
       <EditorialSectionHeader eyebrow="TABBED V3" title="Cards: Light Tech UI" />
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
      

      <div className="w-full max-w-sm mx-auto md:max-w-2xl">
         <div className="bg-white text-black border border-black/10 rounded-3xl flex flex-col overflow-hidden shadow-2xl relative">
            
            {/* Subtle background glow */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-[#8DC63F]/20 rounded-full blur-[80px] transition-transform duration-1000 ${activeWeek % 2 === 0 ? 'translate-x-12 translate-y-12' : '-translate-x-12 -translate-y-12'}`} />

            <div className="p-8 pb-12 relative z-10 flex flex-col min-h-[460px]">
               
               <AnimatePresence mode="wait">
                 <motion.div 
                   key={activeWeek}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.3 }}
                   className="flex col flex-col h-full"
                 >
                   <div className="flex items-center justify-between mb-8">
                     <div className="flex items-center gap-3">
                       <span className="text-[#8DC63F] font-mono text-xl md:text-2xl font-black">{track.id}</span>
                       <span className="text-[10px] font-bold tracking-widest uppercase opacity-50 px-2 py-1 border border-black/10 rounded-full">Module</span>
                     </div>
                     <span className="text-[10px] uppercase font-mono tracking-widest opacity-30">Status: Active</span>
                   </div>

                   <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
                     {track.title}
                   </h3>
                   <p className="text-sm opacity-70 leading-relaxed max-w-sm mb-12">
                     {track.longDescription}
                   </p>

                   {/* Right Aligned Adv Block in Light Mode */}
                   <div className="mt-auto self-end w-full md:w-3/4 bg-gradient-to-l from-[#8DC63F]/5 to-transparent border-r-2 border-[#8DC63F] p-5 rounded-l-xl text-right">
                      <div className="flex items-center justify-end gap-2 mb-2">
                         <span className="text-[9px] uppercase tracking-widest font-mono opacity-60">Advanced Track</span>
                         <span className="bg-white text-black font-black px-2 py-0.5 rounded text-[8px] tracking-widest">PRO</span>
                      </div>
                      <h4 className="font-bold text-lg mb-2 text-black/90">{advanced.title}</h4>
                      <div className="text-[10px] tracking-widest font-mono uppercase opacity-40">
                         Куратор PRO-трека: <span className="text-black font-bold">{advanced.speaker}</span>
                      </div>
                   </div>
                 </motion.div>
               </AnimatePresence>

            </div>

            {/* Light Bottom Tabs */}
            <div className="flex bg-black/5 border-t border-black/10 relative z-10">
               {PROGRAM_TRACKS.map((t, i) => {
                 const isActive = activeWeek === i;
                 return (
                   <button 
                     key={t.id}
                     onClick={() => setActiveWeek(i)}
                     className="flex-1 py-4 flex items-center justify-center relative overflow-hidden group"
                   >
                     {/* Active Indicator Line */}
                     {isActive && <motion.div layoutId="lightTabIndicator" className="absolute top-0 left-0 right-0 h-0.5 bg-[#8DC63F]" />}
                     
                     <span className={`text-xs font-mono font-bold tracking-widest transition-colors ${isActive ? 'text-[#8DC63F]' : 'text-black/30 group-hover:text-black/60'}`}>
                       WK{i+1}
                     </span>
                   </button>
                 )
               })}
            </div>

         </div>
      </div>
    </div>
  )
};

// ----------------------------------------------------
// C4: Immersive Swipe Tab (Full graphical background)
// ----------------------------------------------------
const Showcase_C4_ImmersiveSwipeTab = () => {
  const [activeWeek, setActiveWeek] = useState(0);
  const track = PROGRAM_TRACKS[activeWeek];
  const advanced = ADVANCED_TRACKS[activeWeek];

  return (
    <div className="mb-32">
      <ProgramSectionHeader />
       <ProgramSectionHeader />
       <EditorialSectionHeader eyebrow="TABBED V4" title="Cards: Immersive Vision" />
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
      

      <div className="w-full max-w-sm mx-auto md:max-w-3xl">
         
         <div className="rounded-[2rem] overflow-hidden shadow-2xl relative h-[600px] border border-black/10 bg-white">
            
            <AnimatePresence mode="wait">
               <motion.div
                 key={activeWeek}
                 initial={{ opacity: 0, scale: 1.05 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.6 }}
                 className="absolute inset-0 z-0"
               >
                 <div className="absolute top-0 right-[-10%] w-[120%] h-[80%] bg-gradient-to-bl from-[#8DC63F]/20 via-transparent to-transparent blur-[80px] rounded-full pointer-events-none" />
                 <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/80 to-[#fcfcfc]" />
               </motion.div>
            </AnimatePresence>

            {/* Content Layer */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10 text-black">
               
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeWeek}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.4, delay: 0.1 }}
                   className="flex flex-col gap-6"
                 >
                    {/* Header line */}
                    <div className="flex items-center gap-3">
                       <span className="bg-black text-white font-black px-3 py-1 rounded text-[10px] tracking-widest">{track.week}</span>
                       <span className="text-[10px] uppercase font-mono tracking-widest opacity-60">{track.shortDescription}</span>
                    </div>

                    <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] drop-shadow-sm">
                      {track.title}
                    </h3>

                    {/* Pro Right-Aligned Glass Panel */}
                    <div className="mt-4 self-end w-full md:w-[350px] bg-white/60 backdrop-blur-xl border border-white/80 shadow-lg p-6 rounded-2xl flex flex-col items-end text-right">
                       <div className="flex items-center gap-2 mb-3">
                         <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Advanced Track</span>
                         <span className="bg-white text-black font-black px-2 py-0.5 rounded text-[9px] tracking-widest">PRO</span>
                       </div>
                       <h4 className="font-bold text-xl mb-1">{advanced.title}</h4>
                       <p className="text-xs opacity-70 mb-4">{advanced.description}</p>
                       <div className="flex flex-col border-t border-black/5 w-full items-end mt-2 pt-3">
                         <span className="text-[10px] font-mono tracking-widest flex uppercase opacity-40">Куратор PRO-трека:</span>
                         <span className="text-xs font-bold pt-1">{advanced.speaker}</span>
                       </div>
                    </div>
                 </motion.div>
               </AnimatePresence>
            </div>

            {/* In-Card Glass Tabs */}
            <div className="absolute top-6 left-6 right-6 flex gap-2 z-20">
               {PROGRAM_TRACKS.map((t, i) => {
                 const isActive = activeWeek === i;
                 return (
                   <button 
                     key={t.id}
                     onClick={() => setActiveWeek(i)}
                     className={`flex-1 h-2 rounded-full transition-all duration-300 ${isActive ? 'bg-[#8DC63F]' : 'bg-black/10 hover:bg-black/20 backdrop-blur-md'}`}
                     aria-label={`Go to ${t.week}`}
                   />

                 )
               })}
            </div>

         </div>

      </div>
    </div>
  )
};

// ----------------------------------------------------
// C5: Calendar Schedule Tab (Weekly Workload)
// ----------------------------------------------------
const Showcase_C5_CalendarSchedule = () => {
  const [activeWeek, setActiveWeek] = useState(0);
  const track = PROGRAM_TRACKS[activeWeek];
  const advanced = ADVANCED_TRACKS[activeWeek];

  // Simulated calendar schedule based on user's workload description
  const weekSchedule = [
    { day: 'ПН', event: 'Лекция', type: 'main' },
    { day: 'ВТ', event: 'Сессия', type: 'practice' },
    { day: 'СР', event: 'Advanced', type: 'pro' },
    { day: 'ЧТ', event: '', type: 'empty' },
    { day: 'ПТ', event: 'Лекция', type: 'main' },
    { day: 'СБ', event: 'Q&A', type: 'practice' },
    { day: 'ВС', event: '', type: 'empty' },
  ];

  return (
    <div className="mb-32">
      <ProgramSectionHeader />
       <ProgramSectionHeader />
       <EditorialSectionHeader eyebrow="TABBED V5" title="Cards: Weekly Calendar" />
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
      

      <div className="w-full max-w-sm mx-auto md:max-w-4xl">
         <div className="bg-white border border-black/10 rounded-3xl flex flex-col shadow-lg overflow-hidden relative">
            
            {/* Soft decorative background element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#8DC63F]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Top Section: Info & Pro Block */}
            <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 relative z-10">
               
               <div className="flex-1">
                 <div className="flex items-center gap-3 mb-6">
                    <span className="bg-black text-white font-mono font-bold px-3 py-1 rounded-full text-xs tracking-widest uppercase">
                      {track.week}
                    </span>
                 </div>
                 
                 <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
                   {track.title}
                 </h3>
                 <p className="text-sm md:text-base opacity-70 leading-relaxed font-medium text-black/80 max-w-md mb-8">
                   {track.longDescription}
                 </p>
               </div>

               {/* Right Aligned PRO Block */}
               <div className="w-full md:w-72 shrink-0 bg-[#f9f9f9] border border-black/5 rounded-2xl p-6 flex flex-col items-end text-right self-start mt-4 md:mt-0 shadow-sm relative overflow-hidden">
                 {/* subtle pro accent */}
                 <div className="absolute top-0 right-0 w-16 h-16 bg-[#8DC63F]/20 blur-2xl" />
                 
                 <div className="flex items-center gap-2 mb-3 relative z-10">
                   <span className="text-[9px] uppercase font-bold tracking-widest opacity-40">Advanced Track</span>
                   <span className="bg-white text-black font-black px-2 py-0.5 rounded text-[10px] tracking-widest">PRO</span>
                 </div>
                 <h4 className="font-bold text-lg mb-2 relative z-10">{advanced.title}</h4>
                 <p className="text-xs opacity-60 leading-relaxed mb-4 relative z-10">{advanced.description}</p>
                 <div className="flex flex-col font-mono tracking-widest uppercase opacity-80 pt-2 border-t border-black/5 w-full items-end mt-2">
                   <span className="text-[9px] opacity-50 block mb-1">Куратор PRO-трека:</span>
                   <span className="font-bold text-xs text-black">{advanced.speaker}</span>
                 </div>
               </div>

            </div>

            {/* Bottom Section: Calendar Schedule */}
            <div className="border-t border-black/5 bg-[#fcfcfc] p-6 md:p-8 relative z-10">
               <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-4 px-2">Weekly Workload</div>
               
               <div className="overflow-x-auto pb-4 hide-scrollbar">
                 <div className="grid grid-cols-3 gap-2 md:gap-3 min-w-[300px] md:min-w-0">
                    {weekSchedule.map((day, dIdx) => {
                       // Determine styling based on event type
                       let bgClass = 'bg-white border-black/5';
                       let textClass = 'text-black/30';
                       let eventColor = '';

                       if (day.type === 'main') {
                         bgClass = 'bg-[#8DC63F] border-[#8DC63F] shadow-sm';
                         textClass = 'text-white';
                         eventColor = 'text-white/90';
                       } else if (day.type === 'practice') {
                         bgClass = 'bg-white border-black/10 shadow-sm';
                         textClass = 'text-black';
                         eventColor = 'text-black/60';
                       } else if (day.type === 'pro') {
                         bgClass = 'bg-[#f8fdf1] border border-[#8DC63F]/40 shadow-[0_4px_12px_rgba(141,198,63,0.15)] ring-1 ring-[#8DC63F]';
                         textClass = 'text-black/60';
                         eventColor = 'text-[#8DC63F] font-black';
                       }

                       return (
                         <div key={dIdx} className={`flex flex-col border rounded-xl overflow-hidden transition-all ${bgClass} h-16 md:h-20`}>
                            <div className={`text-[10px] md:text-xs font-mono font-bold text-center py-2 ${day.type === 'empty' ? 'opacity-50' : ''} ${textClass}`}>
                              {day.day}
                            </div>
                            
                            <div className={`flex-1 flex items-center justify-center p-1 md:p-2 text-center text-[9px] md:text-[10px] font-black uppercase tracking-tight leading-none ${eventColor}`}>
                              {day.event}
                            </div>
                         </div>
                       )
                    })}
                 </div>
               </div>

               {/* Legend */}
               <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6 px-2 text-[9px] font-bold uppercase tracking-widest opacity-50">
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-[#8DC63F]" /> Main Lecture</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded border border-black/20 bg-white" /> Practice/Q&A</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-black" /> Pro Track</div>
               </div>
            </div>

         </div>

         {/* Extruded Bottom Tabs (Week Selector) */}
         <div className="flex justify-center mt-6 gap-2">
            {PROGRAM_TRACKS.map((t, i) => {
              const isActive = activeWeek === i;
              return (
                <button 
                  key={t.id}
                  onClick={() => setActiveWeek(i)}
                  className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${isActive ? 'bg-black text-white shadow-md' : 'bg-transparent text-black/40 hover:bg-black/5'}`}
                >
                  {t.week}
                </button>
              )
            })}
         </div>

      </div>
    </div>
  )
};

// ============================================================================
// UX IDEA 4: VERTICAL ACCORDIONS & TIMELINE (Scrolling Journey)
// ============================================================================

// ----------------------------------------------------
// D1: Refined Accordion List (Hidden PRO, Smooth Open)
// ----------------------------------------------------
const Showcase_D1_SmoothAccordion = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(prev => prev === idx ? null : idx);
  };

  return (
    <div className="mb-32">
       <ProgramSectionHeader />
       <ProgramSectionHeader />
       <EditorialSectionHeader eyebrow="VERTICAL V1" title="Accordion: Refined List" />
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
       

       <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
          {PROGRAM_TRACKS.map((track, idx) => {
             const advanced = ADVANCED_TRACKS[idx];
             const isExpanded = expandedIndex === idx;

             return (
               <div 
                 key={track.id} 
                 className={`border transition-all duration-300 rounded-2xl overflow-hidden ${isExpanded ? 'bg-white border-black/10 shadow-[0_10px_40px_rgba(0,0,0,0.06)]' : 'bg-[#fcfcfc] border-black/5 hover:border-black/10 hover:bg-white'}`}
               >
                  {/* Clickable Header Area */}
                  <div 
                    className="p-6 md:p-8 flex flex-col md:flex-row gap-4 md:items-center cursor-pointer select-none"
                    onClick={() => toggleExpand(idx)}
                  >
                     <div className="flex items-center gap-4 md:w-1/4 shrink-0">
                       <button className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${isExpanded ? 'bg-black text-white border-black' : 'bg-transparent text-black/40 border-black/10'}`}>
                         <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                       </button>
                       <span className="font-mono text-xs font-bold tracking-widest uppercase opacity-60">WK {idx + 1}</span>
                     </div>
                     
                     <div className="flex-1">
                       <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tighter transition-colors ${isExpanded ? 'text-black' : 'text-black/70'}`}>
                         {track.title}
                       </h3>
                     </div>

                     <div className="hidden md:block text-[10px] font-bold uppercase tracking-widest opacity-40 md:w-1/4 text-right">
                       {track.shortDescription}
                     </div>
                  </div>

                  {/* Expandable Content Area using AnimatePresence for smooth height transition */}
                  <AnimatePresence>
                     {isExpanded && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: "auto", opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                       >
                         <div className="px-6 pb-8 md:px-8 md:pb-10 pt-0 border-t border-black/5 mt-2">
                            
                            <div className="pt-6 flex flex-col md:flex-row gap-8">
                               <div className="flex-1 text-sm md:text-base opacity-80 leading-relaxed font-medium">
                                 {track.longDescription}
                                 
                                 <div className="flex flex-wrap gap-2 mt-6">
                                    {track.events.map((evt, eIdx) => (
                                      <span key={eIdx} className="text-[9px] font-bold uppercase tracking-widest bg-black/5 px-2 py-1 rounded">
                                        {evt}
                                      </span>
                                    ))}
                                 </div>
                               </div>

                               {/* Right Aligned PRO Block inside the expanded view */}
                               <div className="w-full md:w-64 shrink-0 bg-[#f9f9f9] border border-black/5 p-5 rounded-xl flex flex-col items-end text-right">
                                  <div className="mb-2 text-[9px] font-mono tracking-widest uppercase opacity-40">Advanced Track</div>
                                  <h4 className="font-bold text-base mb-2">{advanced.title}</h4>
                                  <p className="text-xs opacity-60 mb-4">{advanced.description}</p>
                                  <div className="mt-auto pt-3 border-t border-black/5 w-full flex justify-between items-center">
                                    <span className="bg-[#8DC63F] text-black text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">PRO</span>
                                    <div className="text-[10px] opacity-40 font-mono tracking-widest uppercase text-right">Куратор: <br/><span className="text-black font-bold opacity-100">{advanced.speaker}</span></div>
                                  </div>
                               </div>
                            </div>

                         </div>
                       </motion.div>
                     )}
                  </AnimatePresence>
               </div>
             )
          })}

          {/* Special Demo Day Node */}
          <div className="mt-4 border border-[#8DC63F]/40 bg-[#8DC63F]/5 rounded-2xl max-w-sm ml-auto p-4 flex flex-col items-center text-center shadow-sm">
             <div className="w-8 h-8 rounded-full bg-[#8DC63F] text-white flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(141,198,63,0.4)] mb-2">
                <Star className="w-4 h-4" />
             </div>
             <h3 className="text-lg font-black uppercase tracking-tighter text-[#6c9c27] mb-1">Demo Day</h3>
             <p className="text-[10px] opacity-80 font-medium leading-relaxed">Вечерняя сессия. День, когда мы показываем друг другу всё, что получилось за время программы.</p>
          </div>

       </div>
    </div>
  )
}

// ----------------------------------------------------
// D2: Connected Timeline (Dots and connecting lines)
// ----------------------------------------------------
const Showcase_D2_ConnectedTimeline = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(prev => prev === idx ? null : idx);
  };

  return (
    <div className="mb-32">
       <ProgramSectionHeader />
       <ProgramSectionHeader />
       <EditorialSectionHeader eyebrow="VERTICAL V2" title="Cards: Connected Timeline" />
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
       

       <div className="w-full max-w-3xl mx-auto relative pl-6 md:pl-10">
          
          {/* Continuous vertical line connecting all dots */}
          <div className="absolute left-[11px] md:left-[19px] top-10 bottom-10 w-[2px] bg-black/10 z-0" />

          {PROGRAM_TRACKS.map((track, idx) => {
             const advanced = ADVANCED_TRACKS[idx];
             const isExpanded = expandedIndex === idx;

             return (
               <div key={track.id} className="relative mb-8 z-10">
                  
                  {/* Timeline Node Dot */}
                  <div 
                    className={`absolute -left-[30px] md:-left-[35px] top-6 w-5 h-5 rounded-full border-4 transition-colors duration-300 z-20 ${isExpanded ? 'bg-[#8DC63F] border-white shadow-[0_0_0_2px_#8DC63F]' : 'bg-white border-black/20'}`}
                  />

                  <div 
                    className={`border transition-all duration-300 rounded-2xl overflow-hidden ${isExpanded ? 'bg-white border-black/20 shadow-[0_10px_40px_rgba(0,0,0,0.06)] scale-[1.01]' : 'bg-[#fcfcfc] border-black/5 hover:border-black/10'}`}
                  >
                     {/* Header Area */}
                     <div 
                       className="p-6 flex flex-col md:flex-row gap-2 md:gap-6 md:items-end cursor-pointer select-none"
                       onClick={() => toggleExpand(idx)}
                     >
                        <div className="font-mono text-[10px] uppercase font-bold tracking-widest opacity-40 pt-1 md:w-16">
                          W_0{idx + 1}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none transition-colors ${isExpanded ? 'text-black' : 'text-black/80'}`}>
                            {track.title}
                          </h3>
                        </div>

                        <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 shrink-0">
                          {isExpanded ? '— Close' : '+ Expand'}
                        </div>
                     </div>

                     {/* Expandable Content Area */}
                     <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                          >
                            <div className="px-6 md:px-[88px] pb-8 pt-2">
                               <p className="text-sm md:text-base opacity-80 leading-relaxed font-medium mb-6">
                                 {track.longDescription}
                               </p>

                               {/* Immersive Image if present */}
                               <div className="w-full h-32 rounded-xl bg-black/5 overflow-hidden mb-6 relative">
                                 <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-[#8DC63F]/10 via-transparent to-transparent mix-blend-multiply opacity-50" />
                               </div>

                               <div className="flex justify-end mt-6">
                                 <div className="w-full md:w-[80%] bg-[#fbfbfb] text-black p-5 rounded-xl border border-black/5 flex flex-col items-end text-right">
                                    <div className="flex items-center justify-between w-full mb-3">
                                      <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Advanced Track</span>
                                      <span className="bg-white text-black font-black px-2 py-0.5 rounded text-[8px] tracking-widest shadow-[0_2px_10px_rgba(141,198,63,0.3)]">PRO</span>
                                    </div>
                                    <h4 className="font-bold text-lg mb-2 text-black/90">{advanced.title}</h4>
                                    <p className="text-xs opacity-60 mb-5">{advanced.description}</p>
                                    
                                    <div className="flex items-center justify-between w-full pt-4 border-t border-black/5 flex-row-reverse">
                                      <div className="flex flex-col text-right">
                                        <span className="text-[8px] font-bold uppercase tracking-widest opacity-30 mb-0.5">Куратор PRO-трека</span>
                                        <span className="text-xs font-bold opacity-80">{advanced.speaker}</span>
                                      </div>
                                      <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center text-black/40">
                                        <User className="w-3 h-3" />
                                      </div>
                                    </div>
                                 </div>
                               </div>

                            </div>
                          </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
               </div>
             )
          })}

          {/* Special Demo Day Node */}
          <div className="relative mt-8 z-10 flex justify-end">
              <div className="hidden md:flex absolute -left-[32px] md:-left-[39px] top-6 w-6 h-6 rounded-full bg-white border-4 border-black z-20 flex items-center justify-center">
                 <div className="w-2 h-2 rounded-full bg-[#8DC63F]" />
              </div>

              <div className="border border-black/10 bg-[#f9f9f9] text-black p-4 rounded-xl flex flex-col gap-2 w-full max-w-sm relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#8DC63F]/20 to-transparent pointer-events-none opacity-50"/>
                 <div className="flex items-center justify-between relative z-10">
                   <h3 className="text-lg font-black uppercase tracking-tighter text-black/90 flex items-center gap-2">
                     <Star className="w-3 h-3 text-[#8DC63F]" /> Demo Day
                   </h3>
                   <span className="font-mono text-[9px] uppercase font-bold tracking-widest px-2 py-1 border border-black/10 rounded">
                     Final
                   </span>
                 </div>
                 <p className="text-[10px] opacity-60 font-medium text-black leading-relaxed relative z-10">
                   Вечерняя сессия. День, когда мы собираемся вместе и показываем всё, что получилось за время программы.
                 </p>
              </div>
          </div>

       </div>
    </div>
  )
}

// ----------------------------------------------------
// D3: Flipping Journey (3D Card Interaction)
// ----------------------------------------------------
const Showcase_D3_FlippingJourney = () => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const toggleFlip = (idx: number) => {
    setFlippedIndex(prev => prev === idx ? null : idx);
  };

  return (
    <div className="mb-32">
       <ProgramSectionHeader />
       <ProgramSectionHeader />
       <EditorialSectionHeader eyebrow="VERTICAL V3" title="Cards: 3D Flipping Journey" />
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
       

       <div className="w-full max-w-3xl mx-auto relative pl-6 md:pl-10">
          
          {/* Continuous vertical line connecting all dots */}
          <div className="absolute left-[11px] md:left-[19px] top-10 bottom-10 w-[2px] bg-black/10 z-0" />

          {PROGRAM_TRACKS.map((track, idx) => {
             const advanced = ADVANCED_TRACKS[idx];
             const isFlipped = flippedIndex === idx;

             return (
               <div key={track.id} className="relative mb-6 z-10 [perspective:1200px]">
                  
                  {/* Timeline Node Dot */}
                  <div 
                    className={`absolute -left-[30px] md:-left-[35px] top-6 w-5 h-5 rounded-full border-4 transition-colors duration-500 z-20 ${isFlipped ? 'bg-black border-[#8DC63F] shadow-[0_0_0_2px_black]' : 'bg-white border-black/20'}`}
                  />

                  {/* 3D Flipping Container */}
                  <motion.div 
                    onClick={() => toggleFlip(idx)}
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.7, type: "spring", stiffness: 200, damping: 20 }}
                    className="relative w-full cursor-pointer group"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                     
                     {/* FRONT SIDE (Main Track) */}
                     <div 
                       className={`w-full bg-gradient-to-br from-[#ffffff] to-[#f9fcf5] border border-black/5 rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow flex flex-col ${isFlipped ? 'pointer-events-none' : ''}`}
                       style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                     >
                        <div className="flex flex-col md:flex-row gap-4 md:items-start justify-between mb-8">
                           
                           <div className="flex-1">
                             <div className="font-mono text-[10px] uppercase font-bold tracking-widest opacity-40 mb-3">
                               Неделя {idx + 1}
                             </div>
                             <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none mb-4 text-black/90">
                               {track.title}
                             </h3>
                             <p className="text-sm md:text-base opacity-70 leading-relaxed font-medium max-w-lg mb-6">
                               {track.longDescription}
                             </p>
                             <div className="flex flex-wrap gap-2">
                                {track.events.map((evt, eIdx) => (
                                  <span key={eIdx} className="text-[9px] font-bold uppercase tracking-widest bg-black/5 px-2 py-1 rounded">
                                    {evt}
                                  </span>
                                ))}
                             </div>
                           </div>

                        </div>

                        {/* Flip Hint */}
                        <div className="self-end mt-auto flex items-center gap-2 bg-[#f4f5f7] text-black/60 hover:bg-[#ebecef] hover:text-black/90 px-5 py-2.5 rounded-full transition-colors font-mono uppercase tracking-widest text-[10px] font-bold">
                           <span>Advanced Track Info</span>
                           <RotateCcw className="w-3.5 h-3.5 opacity-60" />
                        </div>
                     </div>

                     {/* BACK SIDE (Advanced Track) */}
                     <div 
                       className={`absolute inset-0 w-full h-full bg-[#111] text-white border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] ${!isFlipped ? 'pointer-events-none' : ''}`}
                       style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                     >
                        <div className="flex flex-col h-full relative items-end text-right">
                           {/* Decorative background visual */}
                           <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-[60px] pointer-events-none" />

                           <div className="flex justify-between items-center mb-6 relative z-10 w-full">
                              <span className="bg-white text-black font-black px-2 py-0.5 rounded text-[10px] tracking-widest uppercase">PRO</span>
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] shadow-[0_0_10px_rgba(141,198,63,0.5)] animate-pulse" />
                                <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">Advanced Track</span>
                              </div>
                           </div>

                           <div className="flex-1 relative z-10 flex flex-col justify-center max-w-md items-end">
                             <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 text-white line-clamp-2 drop-shadow-sm">
                               {advanced.title}
                             </h4>
                             <p className="text-sm opacity-90 leading-relaxed text-white/80 line-clamp-3">
                               {advanced.description}
                             </p>
                           </div>

                           <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center relative z-10 w-full">
                              <div className="flex items-center gap-2 text-white/50 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full" onClick={(e) => {e.stopPropagation(); toggleFlip(idx);}}>
                                <RotateCcw className="w-3 h-3" /> ВЕРНУТЬСЯ
                              </div>
                              <div className="flex flex-col text-[10px] font-mono tracking-widest uppercase text-white/60 text-right">
                                <span className="text-white/40 mb-0.5">Куратор PRO-трека:</span>
                                <span className="text-white font-bold">{advanced.speaker}</span>
                              </div>
                           </div>
                        </div>
                     </div>

                  </motion.div>
               </div>
             )
          })}

          {/* Demo Day Node */}
          <div className="relative mt-12 z-10">
              <div className="absolute -left-[32px] md:-left-[39px] top-6 w-6 h-6 rounded-full bg-white border-4 border-black z-20 flex items-center justify-center">
                 <div className="w-2 h-2 rounded-full bg-[#8DC63F]" />
              </div>

              <div className="border border-black bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-6 md:p-8 rounded-2xl flex flex-col md:flex-row gap-4 md:items-center transform transition-transform hover:-translate-y-1">
                 <div className="flex-1">
                   <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black mb-2 leading-none">Demo Day</h3>
                   <p className="text-sm opacity-80 font-medium text-black max-w-sm">
                     Вечерняя сессия. День, когда мы собираемся вместе и показываем друг другу всё, что у нас получилось за время программы.
                   </p>
                 </div>
                 <div className="shrink-0 pt-4 md:pt-0">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 bg-[#8DC63F] text-black rounded-sm shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      Final presentation
                    </span>
                 </div>
              </div>
          </div>

       </div>
    </div>
  )
}

// ----------------------------------------------------
// D4: Clean Timeline Accordion (Based on User Screenshot)
// ----------------------------------------------------
const Showcase_E1_MinimalBlueprint = () => {
  return (
    <div className="mb-32">
      <ProgramSectionHeader />
      <ProgramSectionHeader />
       <EditorialSectionHeader eyebrow="RESTORED VARIANT" title="Minimal Blueprint (Grid + Advanced)" />
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
      
      <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
         {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
            <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
            </div>
         ))}
      </div>

      <div className="relative border border-black/10 bg-white text-black p-4 md:p-12 overflow-hidden shadow-2xl rounded-3xl w-full max-w-5xl mx-auto">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative flex flex-col gap-16 md:gap-24 pl-8 md:pl-24">
          {/* Main timeline line */}
          <div className="absolute left-[15px] md:left-[47px] top-4 bottom-12 w-[1px] bg-black/10" />

          {PROGRAM_TRACKS.map((track, idx) => {
            const currentWeek = 1; 
            const isPast = idx + 1 < currentWeek;
            const isCurrent = idx + 1 === currentWeek;
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
                    <div className={`w-3 h-3 rounded-full border-2 ${isPast ? 'bg-black/10 border-black/10' : 'bg-[#f4f4f4] border-black/20'}`} />
                  )}
                </div>

                {/* Left side: Core Info & Art */}
                <div className="flex-1 max-w-2xl text-left">
                  <div className={`font-mono text-[10px] uppercase tracking-widest mb-3 ${isPast ? 'opacity-40' : isCurrent ? 'text-black/40 font-bold' : 'opacity-40'}`}>
                    week {idx + 1} — {track.shortDescription}
                  </div>
                  <h3 className={`text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight mb-4 leading-tight text-black/80`}>
                    {track.title}
                  </h3>
                  <p className={`text-sm md:text-base opacity-90 leading-relaxed mb-8 max-w-lg text-black/80`}>
                    {track.longDescription}
                  </p>

                  {/* Core Visual Art Block */}
                  <div className={`relative w-full h-40 md:h-56 border rounded-2xl overflow-hidden flex items-center justify-center font-mono text-[10px] bg-[#f8f9fa] border-black/5`}>
                    <img src={track.image} alt={track.title} className={`absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-[0.65] z-0 transition-transform duration-1000 grayscale`} />
                    <div className="opacity-60 z-10 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-black/10 font-bold tracking-widest">[ STATIC_DATA ]</div>
                  </div>
                </div>

                {/* Right side: Advanced Integration & Tags */}
                <div className="flex-1 lg:max-w-md xl:max-w-lg flex flex-col relative mt-4 lg:mt-0 lg:pl-8 text-left border-l border-transparent lg:border-black/5">
                  {/* Calendar/Event Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 items-center pt-1 lg:pt-0">
                     <div className="text-[10px] uppercase font-bold tracking-widest opacity-40 mr-2">EVENTS /</div>
                    <span className="text-[9px] font-mono tracking-widest px-2 py-1 rounded uppercase font-bold text-black/80">Lecture</span>
                    <span className="text-[9px] font-mono tracking-widest px-2 py-1 bg-[#8DC63F]/20 text-[#8DC63F] rounded uppercase font-bold">Workshop</span>
                    <span className="text-[9px] font-mono tracking-widest px-2 py-1 rounded uppercase font-bold text-black/80">Q&A</span>
                  </div>

                  {/* Advanced Track Highlight Block */}
                  <div className={`mt-0 lg:mt-auto relative p-6 pb-12 rounded-[1.25rem] border border-black/5 transition-colors bg-[#fbfbfb] shadow-sm`}>
                    
                    <div className="flex gap-2 items-center mb-4">
                      <div className={`w-1.5 h-1.5 rounded-full bg-black/40`} />
                      <div className="font-mono text-[9px] uppercase tracking-widest opacity-50 font-bold">Advanced Track</div>
                    </div>
                    
                    <h4 className="font-bold text-lg md:text-xl mb-3 text-black">{advanced.title}</h4>
                    <p className="text-sm opacity-80 leading-relaxed text-black/80">{advanced.description}</p>
                    
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

// ----------------------------------------------------
// D4: Clean Timeline Accordion (Based on User Screenshot)
// ----------------------------------------------------
const Showcase_D4_RefinedTimelineAccordion = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(prev => prev === idx ? null : idx);
  };

  return (
    <div className="mb-32">
       <ProgramSectionHeader />
       <ProgramSectionHeader />
       <EditorialSectionHeader eyebrow="VERTICAL V4" title="Accordion: Clean White Timeline" />
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
       

       <div className="w-full max-w-3xl mx-auto relative pl-4 md:pl-10">
          
          {/* Continuous vertical line connecting all dots */}
          <div className="absolute left-[34px] md:left-[58px] top-10 bottom-10 w-[2px] bg-black/[0.04] z-0" />

          {PROGRAM_TRACKS.map((track, idx) => {
             const advanced = ADVANCED_TRACKS[idx];
             const isExpanded = expandedIndex === idx;

             return (
               <div key={track.id} className="relative mb-6 z-10 flex gap-4 md:gap-8 group">
                  
                  {/* Timeline Node Dot Column */}
                  <div className="w-10 pt-8 shrink-0 flex justify-center relative z-20">
                    <div 
                      className={`w-3.5 h-3.5 rounded-full border-[3px] transition-colors duration-500 bg-white ${isExpanded ? 'border-black' : 'border-black/20 group-hover:border-black/40'}`}
                    />
                  </div>

                  {/* Card Column */}
                  <div 
                    className={`flex-1 bg-white border border-black/5 rounded-[24px] overflow-hidden transition-all duration-500 ease-out will-change-transform ${isExpanded ? 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] scale-[1.01]' : 'shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-black/10'}`}
                  >
                     {/* Header Area (Clickable) */}
                     <div 
                       className="p-6 md:p-8 cursor-pointer select-none relative"
                       onClick={() => toggleExpand(idx)}
                     >
                        <div className="flex flex-col md:flex-row gap-4 justify-between md:items-end w-full">
                           <div className="flex-1">
                             {/* Small Week Label */}
                             <div className="font-mono text-[10px] uppercase tracking-widest font-bold opacity-30 mb-3 flex items-center gap-2">
                               {track.week}
                               {isExpanded && <motion.div layoutId="active-dot" className="w-1.5 h-1.5 rounded-full bg-black" />}
                             </div>
                             
                             {/* Main Title */}
                             <h3 className="text-2xl md:text-[28px] font-bold tracking-tight mb-2 text-black/90 leading-none">
                               {track.title}
                             </h3>
                             
                             {/* Subtitle / Short Description */}
                             <p className="text-xs font-bold uppercase tracking-widest opacity-40">
                               {track.shortDescription}
                             </p>
                           </div>

                           {/* The "Pill" Interaction Button */}
                           <div className={`mt-4 md:mt-0 inline-flex items-center gap-3 px-4 py-2.5 rounded-full border transition-all duration-300 md:self-end ${isExpanded ? 'bg-[#f4faeb] text-[#6c9c27] border-[#8DC63F]/30' : 'bg-transparent text-black/60 border-black/10 group-hover:bg-black/[0.02]'}`}>
                              <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                                {isExpanded ? 'Close Details' : 'View Track & PRO'}
                              </span>
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-[#8DC63F]/20' : 'bg-black/5'}`}>
                                <ChevronDown className="w-3 h-3" />
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Expandable Content Area */}
                     <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          >
                            {/* Inner Padding container to prevent margin collapsing issues during animation */}
                            <div className="px-6 md:px-8 pb-8 pt-2">
                               <div className="h-px w-full bg-black/5 mb-6" />
                               
                               <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                                  {/* Left: Main Track Info */}
                                  <div className="flex-1">
                                     <p className="text-sm md:text-base opacity-70 leading-relaxed font-medium mb-6">
                                       {track.longDescription}
                                     </p>
                                     <div className="flex flex-wrap gap-2">
                                        {track.events.map((evt, eIdx) => (
                                          <div key={eIdx} className="flex items-center gap-1.5 bg-[#f5f5f7] px-2.5 py-1.5 rounded-md">
                                            <div className="w-1 h-1 rounded-full bg-black/30" />
                                            <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">
                                              {evt}
                                            </span>
                                          </div>
                                        ))}
                                     </div>
                                  </div>

                                  {/* Right: Beautifully Packed PRO Box */}
                                  <div className="w-full md:w-64 shrink-0 bg-[#fbfbfb] border border-black/5 rounded-2xl overflow-hidden relative group/pro flex flex-col text-right">
                                     {/* Subtle styling flourish */}
                                     <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#8DC63F]/20 to-transparent opacity-0 group-hover/pro:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                     
                                     <div className="p-5 flex flex-col items-end">
                                        <div className="flex justify-between items-center mb-4 w-full">
                                           <div className="text-[9px] font-mono tracking-widest uppercase opacity-40">Advanced Track</div>
                                           <span className="bg-white text-black font-black px-2 py-0.5 rounded text-[9px] tracking-widest uppercase shadow-[0_2px_10px_rgba(141,198,63,0.3)]">PRO</span>
                                        </div>
                                        
                                        <h4 className="font-bold text-lg mb-2 text-black/90 leading-tight">
                                           {advanced.title}
                                        </h4>
                                        <p className="text-xs opacity-60 leading-relaxed mb-6">
                                           {advanced.description}
                                        </p>
                                        
                                        <div className="pt-4 border-t border-black/5 flex items-center justify-between w-full flex-row-reverse">
                                          <div className="flex flex-col text-right">
                                            <span className="text-[8px] font-bold uppercase tracking-widest opacity-30 mb-0.5">Куратор PRO-трека</span>
                                            <span className="text-xs font-bold opacity-80">{advanced.speaker}</span>
                                          </div>
                                          <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center text-black/40">
                                            <User className="w-3 h-3" />
                                          </div>
                                        </div>
                                     </div>
                                  </div>
                               </div>

                            </div>
                          </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
               </div>
             )
          })}

          {/* Demo Day Node */}
          <div className="relative mt-8 flex gap-4 md:gap-8 z-10 w-full">
              <div className="w-10 pt-6 shrink-0 flex justify-center relative z-20">
                <div className="w-5 h-5 rounded-full bg-black shadow-[0_0_0_4px_white] flex items-center justify-center">
                  <Star className="w-2.5 h-2.5 text-white" />
                </div>
              </div>

              <div className="flex-1 bg-white border border-black/10 text-black p-6 md:p-8 rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.05)] flex flex-col md:flex-row gap-4 md:items-center">
                 <div className="flex-1">
                   <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-[#8DC63F] mb-2 leading-none">Demo Day</h3>
                   <p className="text-sm opacity-80 font-medium text-black/80 max-w-sm">
                     Вечерняя сессия. День, когда мы собираемся вместе и показываем друг другу всё, что у нас получилось за время программы.
                   </p>
                 </div>
                 <div className="shrink-0 pt-2 md:pt-0">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 border border-black/10 rounded-full inline-flex items-center gap-2 hover:bg-black/5 transition-colors cursor-default text-black/70">
                      Final presentation <CheckCircle className="w-3 h-3 text-[#8DC63F]" />
                    </span>
                 </div>
              </div>
          </div>

       </div>
    </div>
  )
}

// ----------------------------------------------------
// D5: Split Track Timeline (Main vs Advanced layout)
// ----------------------------------------------------
const Showcase_D5_SplitTrackTimeline = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(prev => prev === idx ? null : idx);
  };

  return (
    <div className="mb-32">
       <ProgramSectionHeader />
       <ProgramSectionHeader />
       <EditorialSectionHeader eyebrow="VERTICAL V5" title="Cards: Split Track Timeline" />
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
       <div className="flex flex-wrap gap-2 mb-12 justify-center w-full max-w-3xl mx-auto">
          {["Лекция", "Воркшоп", "Коворкинг", "Q&A сессия"].map(tag => (
             <div key={tag} className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full border border-black/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{tag}</span>
             </div>
          ))}
       </div>
       

       <div className="w-full max-w-4xl mx-auto relative pl-6 md:pl-12">
          
          <div className="absolute left-[17px] md:left-[35px] top-10 bottom-10 w-[2px] bg-black/10 z-0" />

          {PROGRAM_TRACKS.map((track, idx) => {
             const advanced = ADVANCED_TRACKS[idx];
             const isExpanded = expandedIndex === idx;

             return (
               <div key={track.id} className="relative mb-6 z-10 flex gap-4 md:gap-8 group">
                  
                  {/* Timeline Node Dot */}
                  <div className="w-8 pt-8 shrink-0 flex justify-center relative z-20">
                    <div 
                      className={`absolute w-3 h-3 md:w-4 md:h-4 rounded-full border-2 transition-all duration-300 bg-white ${isExpanded ? 'border-black scale-125' : 'border-black/30 group-hover:border-black/60'}`}
                    />
                  </div>

                  <div 
                    className={`flex-1 bg-white border border-black/10 rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-[0_10px_40px_rgba(0,0,0,0.06)]' : 'shadow-none hover:border-black/20'}`}
                  >
                     {/* Header */}
                     <div 
                       className="p-6 md:p-8 cursor-pointer select-none relative"
                       onClick={() => toggleExpand(idx)}
                     >
                        <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
                           <div>
                             <div className="font-mono text-[10px] uppercase font-bold tracking-widest opacity-40 mb-2">
                               {track.week}
                             </div>
                             <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-black/90">
                               {track.title}
                             </h3>
                           </div>
                           
                           <div className="flex items-center">
                               <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'bg-black text-white rotate-180' : 'bg-black/5 text-black hover:bg-black/10'}`}>
                                 <ChevronDown className="w-4 h-4" />
                               </div>
                           </div>
                        </div>
                     </div>

                     <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                          >
                            <div className="px-6 md:px-8 pb-8 pt-2">
                               <div className="h-px border-t border-dashed border-black/20 w-full mb-8" />

                               <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                                  {/* MAIN TRACK */}
                                  <div className="flex-[3] pr-0 lg:pr-8 lg:border-r border-black/10">
                                     <h4 className="font-mono text-[10px] tracking-widest uppercase opacity-40 mb-4 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-black/30 rounded-full" /> Main Track
                                     </h4>
                                     <p className="text-sm md:text-base opacity-80 leading-relaxed font-medium mb-6">
                                       {track.longDescription}
                                     </p>
                                     <div className="flex flex-wrap gap-2">
                                        {track.events.map((evt, eIdx) => (
                                          <span key={eIdx} className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-black/5">
                                            {evt}
                                          </span>
                                        ))}
                                     </div>
                                  </div>

                                  {/* ADVANCED TRACK */}
                                  <div className="flex-[2] bg-[#fbfbfb] border border-black/5 text-black p-6 md:p-8 rounded-xl flex flex-col pt-8 md:pt-6 relative overflow-hidden text-right items-end">
                                     {/* Background glow decoration */}
                                     <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#8DC63F]/10 rounded-full blur-3xl pointer-events-none" />

                                     <h4 className="font-mono text-[10px] tracking-widest uppercase opacity-40 mb-4 flex items-center justify-end gap-2 z-10 w-full">
                                        Advanced Track
                                        <span className="bg-[#8DC63F] text-black font-black px-1.5 py-0.5 rounded text-[8px] tracking-widest shadow-[0_2px_10px_rgba(141,198,63,0.3)]">PRO</span>
                                     </h4>
                                     
                                     <h5 className="font-bold text-lg mb-2 text-black/90 z-10 leading-tight">
                                        {advanced.title}
                                     </h5>
                                     <p className="text-xs opacity-60 leading-relaxed mb-6 z-10 text-black/80 text-right">
                                        {advanced.description}
                                     </p>

                                     <div className="mt-auto pt-4 border-t border-black/5 flex items-center justify-end gap-3 z-10 w-full flex-row-reverse">
                                       <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                                          <User className="w-4 h-4 opacity-40" />
                                       </div>
                                       <div className="flex flex-col text-right">
                                         <span className="text-[8px] uppercase tracking-widest opacity-40">Куратор PRO-трека</span>
                                         <span className="text-xs font-bold font-sans tracking-wide text-black/80">{advanced.speaker}</span>
                                       </div>
                                     </div>
                                  </div>
                               </div>

                            </div>
                          </motion.div>
                        )}
                     </AnimatePresence>
                  </div>

               </div>
             )
          })}

          <div className="relative mt-8 flex gap-4 md:gap-8 z-10 w-full group">
              <div className="w-8 pt-6 shrink-0 flex justify-center relative z-20">
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-black shadow-[0_0_0_4px_white] flex items-center justify-center">
                  <Star className="w-2.5 h-2.5 text-[#8DC63F]" />
                </div>
              </div>

              <div className="flex-1 bg-[#8DC63F]/10 border border-[#8DC63F]/30 p-4 rounded-2xl flex flex-col md:flex-row gap-4 md:items-center">
                 <div className="flex-1">
                   <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-[#6c9c27] mb-1 leading-none">Demo Day</h3>
                   <p className="text-xs opacity-80 font-medium text-black max-w-sm">
                     Вечерняя сессия. День, когда мы собираемся вместе и показываем друг другу всё, что у нас получилось за время программы.
                   </p>
                 </div>
                 <div className="shrink-0 pt-2 md:pt-0">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-widest px-4 py-2 bg-[#8DC63F] text-white rounded-full inline-flex items-center gap-2 shadow-sm">
                      Final presentation <CheckCircle className="w-3 h-3" />
                    </span>
                 </div>
              </div>
          </div>

       </div>
    </div>
  )
}

// ============================================================================
// PAGE EXPORT
// ============================================================================

export default function ProgramShowcasePage() {
  return (
    <div className="min-h-screen bg-[#F4F4F4] text-black pt-12 pb-24 font-sans selection:bg-[#8DC63F] selection:text-white overflow-x-hidden">
      <WireframeStyles />
      <Container>
        <div className="mb-20 max-w-4xl">
          <div className="font-mono text-[10px] opacity-40 mb-6 font-bold tracking-widest">/LAB/DESIGN_VARIANTS_FINAL</div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
            Final Layout <br/> Showcase
          </h1>
          <p className="text-lg opacity-60 leading-relaxed max-w-2xl">
            8 проработанных вариантов для секции расписания программы. Разделены на 2 направления: Аккордеон (4 варианта) и Горизонтальные Карточки (4 варианта). Все версии адаптированы, включают PRO-тэги справа и богатую графику.
          </p>
        </div>

        {/* --- UX IDEA 1 --- */}
        <div className="mb-12 border-b-4 border-black pb-4 mt-32">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Direction 1: The Accordion</h2>
        </div>
        
        <Showcase_A1_GridMesh />
        <Showcase_A1_GridMesh overlayGrid />
        <Showcase_A3_TechNeo />
        <Showcase_A4_CinematicCollapse />

        {/* --- UX IDEA 2 --- */}
        <div className="mb-12 border-b-4 border-black pb-4 mt-32">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Direction 2: Horizontal Cards</h2>
        </div>

        <Showcase_B1_HorizontalSplit />

        {/* --- UX IDEA 3 --- */}
        <div className="mb-12 border-b-4 border-black pb-4 mt-32">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Direction 3: Tabbed Cards</h2>
        </div>

        <Showcase_C1_CleanTabCard />
        <Showcase_C2_GraphicSplitTab />
        <Showcase_C3_DarkNeonTab />
        <Showcase_C5_CalendarSchedule />

        {/* --- UX IDEA 4 --- */}
        <div className="mb-12 border-b-4 border-black pb-4 mt-32">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Direction 4: Vertical Timeline</h2>
        </div>

        <Showcase_D1_SmoothAccordion />
        <Showcase_E1_MinimalBlueprint />
        <Showcase_D2_ConnectedTimeline />
        <Showcase_D3_FlippingJourney />
        <Showcase_D4_RefinedTimelineAccordion />
        <Showcase_D5_SplitTrackTimeline />

      </Container>
    </div>
  );
}
