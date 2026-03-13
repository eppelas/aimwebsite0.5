import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';

// --- Styles ---
const ObysStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');

    .font-inter { font-family: 'Inter', sans-serif; }
    .font-playfair { font-family: 'Playfair Display', serif; }

    body {
      background-color: #050505;
      color: #E0E0E0;
    }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    .char-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      transform-style: preserve-3d;
    }
    
    .char-span {
      position: absolute;
      top: 0;
      left: 0;
      transform-origin: 0 0;
      backface-visibility: hidden;
    }
  `}</style>
);

// --- Components ---

interface TextRingProps {
  text: string;
  radius: number;
  direction?: 1 | -1;
  scrollYProgress: MotionValue<number>;
  speed?: number;
  className?: string;
}

const TextRing = ({ text, radius, direction = 1, scrollYProgress, speed = 1, className = "" }: TextRingProps) => {
  const characters = text.split('');
  const angleStep = 360 / characters.length;
  
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360 * direction * speed]);

  return (
    <motion.div 
      className={`char-ring ${className}`}
      style={{ rotate }}
    >
      {characters.map((char, i) => (
        <span
          key={i}
          className="char-span font-playfair"
          style={{
            height: `${radius}px`,
            transform: `rotate(${i * angleStep}deg) translateY(-${radius}px)`
          }}
        >
          {char}
        </span>
      ))}
    </motion.div>
  );
};

const GlyphRing = ({ count, radius, direction = 1, scrollYProgress, speed = 1 }: { count: number, radius: number, direction?: 1 | -1, scrollYProgress: MotionValue<number>, speed?: number }) => {
  const items = Array(count).fill('II');
  const angleStep = 360 / count;
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360 * direction * speed]);

  return (
    <motion.div 
      className="char-ring text-white/80 font-playfair text-xl"
      style={{ rotate }}
    >
      {items.map((item, i) => (
        <span
          key={i}
          className="char-span"
          style={{
            height: `${radius}px`,
            transform: `rotate(${i * angleStep}deg) translateY(-${radius}px)`
          }}
        >
          {item}
        </span>
      ))}
    </motion.div>
  );
};

const SectionHeader = ({ number, title }: { number: string, title: string }) => (
  <div className="flex items-baseline gap-4 mb-12 border-b border-white/20 pb-4">
    <span className="font-inter text-xs tracking-widest uppercase opacity-60">Chapter ({number})</span>
    <h2 className="font-playfair text-4xl italic">{title}</h2>
  </div>
);

// --- Main Page ---

export default function AiMindsetObysDarkPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  // Smooth scroll progress for animations
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-[#050505] text-[#E0E0E0] selection:bg-white selection:text-black hide-scrollbar font-inter relative overflow-x-hidden">
      <ObysStyles />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 mix-blend-difference">
        <div className="font-playfair italic text-xl flex items-center gap-2">
          <img
            src="/assets/ai-mindset-logo.png"
            alt="AI Mindset logo"
            className="h-4 w-auto object-contain"
          />
          <span>Ai mindset</span>
        </div>
        <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-medium">
          <a href="#concept" className="hover:line-through decoration-1">Concept</a>
          <a href="#results" className="hover:line-through decoration-1">Results</a>
          <a href="#pricing" className="hover:line-through decoration-1">Pricing</a>
        </div>
        <div className="text-xs uppercase tracking-widest">Sprint X26</div>
      </nav>

      {/* Hero / Animation Section */}
      <section className="h-[120vh] relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 md:opacity-100">
           {/* The "Form" changing animation - concentric rings */}
           <div className="relative w-[800px] h-[800px] flex items-center justify-center scale-[0.6] md:scale-100">
              {/* Outer Ring - Text */}
              <TextRing 
                text="PERSONAL OPERATIONAL SYSTEM • AI MINDSET • SPRINT X26 • " 
                radius={380} 
                scrollYProgress={smoothProgress} 
                speed={0.5}
                className="text-xs tracking-[0.2em] uppercase opacity-40"
              />
              
              {/* Middle Ring - Glyphs */}
              <GlyphRing 
                count={60} 
                radius={300} 
                direction={-1} 
                scrollYProgress={smoothProgress} 
                speed={0.8} 
              />
              
              {/* Inner Ring - Glyphs */}
              <GlyphRing 
                count={40} 
                radius={220} 
                direction={1} 
                scrollYProgress={smoothProgress} 
                speed={1.2} 
              />

              {/* Core Text */}
              <TextRing 
                text="CONTEXT • AGENTS • SYSTEM • ARCHITECTURE • " 
                radius={140} 
                direction={-1} 
                scrollYProgress={smoothProgress} 
                speed={1.5}
                className="text-xs tracking-[0.3em] font-bold"
              />
           </div>
        </div>

        <div className="relative z-10 text-center mix-blend-difference">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.5 }}
           >
             <h1 className="text-6xl md:text-9xl font-playfair italic mb-6">POS</h1>
             <p className="text-xs md:text-sm uppercase tracking-[0.3em] font-light">
               Personal Operational System
             </p>
             <p className="mt-4 text-xs font-mono opacity-60">
               2 марта — 14 марта 2026
             </p>
           </motion.div>
        </div>
      </section>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-6 pb-32 relative z-20">
        
        {/* Chapter I: Concept */}
        <section id="concept" className="mb-40 pt-20">
          <SectionHeader number="I" title="The Concept" />
          
          <div className="grid md:grid-cols-2 gap-16">
            <div className="text-xl md:text-2xl font-light leading-relaxed">
              <p className="mb-8">
                <span className="font-playfair italic text-white">POS</span> — это не инструмент, это операционная система с персональным AI-ассистентом.
              </p>
              <p className="text-white/60 text-lg">
                Слой правил, контекста и ограничений, который заставляет инструменты работать. От хаоса к системе.
              </p>
            </div>
            <div className="space-y-8 font-mono text-sm text-white/50">
              <div className="flex items-start gap-4 border-t border-white/10 pt-4">
                <span className="text-white">01</span>
                <p>Утром агент даёт план дня под твой уровень энергии и приоритеты.</p>
              </div>
              <div className="flex items-start gap-4 border-t border-white/10 pt-4">
                <span className="text-white">02</span>
                <p>Днём напоминает про встречу, бриф к которой он подготовил.</p>
              </div>
              <div className="flex items-start gap-4 border-t border-white/10 pt-4">
                <span className="text-white">03</span>
                <p>Вечером находит незакрытые задачи и блокеры, даёт итоги.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter II: Results */}
        <section id="results" className="mb-40">
          <SectionHeader number="II" title="The Outcome" />
          
          <div className="grid grid-cols-1 gap-px bg-white/10 border border-white/10">
            {[
              { title: "Собранный контекст", desc: "AI знает кто ты, как работаешь, что тебе важно." },
              { title: "Логичная архитектура", desc: "Не удалит все файлы без спроса и не купит бесполезный курс." },
              { title: "Связанные инструменты", desc: "Claude Code / Cursor / Obsidian / MCP." },
              { title: "Работающие skills", desc: "Автоматизация рутинных задач и правил." }
            ].map((item, i) => (
              <div key={i} className="bg-[#050505] p-8 md:p-12 hover:bg-[#0A0A0A] transition-colors group">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <h3 className="text-2xl font-playfair italic group-hover:text-white transition-colors text-white/80">
                    {item.title}
                  </h3>
                  <p className="font-mono text-xs text-white/40 max-w-xs text-right">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Chapter III: Mentors */}
        <section className="mb-40">
          <SectionHeader number="III" title="The Guides" />
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Александр Поваляев", role: "Strategist", desc: "Основатель AI Mindset. 15+ лет соединяет технологии и людей." },
              { name: "Сергей Хабаров", role: "Architect", desc: "Системный архитектор. 6+ лет в образовании, 500+ обученных." },
              { name: "Серёжа Рис", role: "Evangelist", desc: "AI-евангелист, ex Yandex. Билдер и фаундер вайбкодеров." }
            ].map((mentor, i) => (
              <div key={i} className="relative group">
                <div className="aspect-[3/4] border border-white/10 mb-6 flex items-center justify-center overflow-hidden">
                   <span className="font-playfair text-9xl opacity-10 italic group-hover:scale-110 transition-transform duration-700">
                     {i + 1}
                   </span>
                </div>
                <h3 className="text-lg font-medium mb-1">{mentor.name}</h3>
                <div className="text-xs font-mono text-white/40 uppercase mb-3">{mentor.role}</div>
                <p className="text-sm text-white/60 leading-relaxed">{mentor.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Chapter IV: Pricing */}
        <section id="pricing" className="mb-20">
          <SectionHeader number="IV" title="Investment" />
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Standard */}
            <div className="border border-white/20 p-8 md:p-12 flex flex-col justify-between min-h-[400px] hover:border-white/40 transition-colors">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest mb-6 text-white/50">Standard</div>
                <div className="text-5xl font-playfair italic mb-8">₽ 45,000</div>
                <ul className="space-y-4 text-sm text-white/70 font-light">
                  <li className="flex items-center gap-3"><Plus size={12} /> Доступ к материалам</li>
                  <li className="flex items-center gap-3"><Plus size={12} /> Общий чат участников</li>
                  <li className="flex items-center gap-3"><Plus size={12} /> 2 Q&A сессии</li>
                </ul>
              </div>
              <button className="w-full py-4 border border-white/20 mt-12 hover:bg-white hover:text-black transition-all uppercase tracking-widest text-xs font-medium">
                Apply Now
              </button>
            </div>

            {/* Personal */}
            <div className="bg-white text-black p-8 md:p-12 flex flex-col justify-between min-h-[400px]">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest mb-6 opacity-50">Personal</div>
                <div className="text-5xl font-playfair italic mb-8">₽ 120,000</div>
                <ul className="space-y-4 text-sm opacity-80 font-light">
                  <li className="flex items-center gap-3"><Plus size={12} /> Всё из Standard</li>
                  <li className="flex items-center gap-3"><Plus size={12} /> Личный менторинг (4 часа)</li>
                  <li className="flex items-center gap-3"><Plus size={12} /> Аудит твоей системы</li>
                  <li className="flex items-center gap-3"><Plus size={12} /> Помощь в настройке</li>
                </ul>
              </div>
              <button className="w-full py-4 bg-black text-white mt-12 hover:bg-black/80 transition-all uppercase tracking-widest text-xs font-medium">
                Apply Now
              </button>
            </div>
          </div>
          
          <div className="mt-12 text-center">
             <p className="font-mono text-xs text-white/40">
               Скидки: Alumni (-20%), Bring a Friend (-10%)
             </p>
          </div>
        </section>

      </div>
    </div>
  );
}
