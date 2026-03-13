import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu } from 'lucide-react';

const KarolineStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    
    .font-grotesk { font-family: 'Space Grotesk', sans-serif; }
    
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .blob-shape {
      background: radial-gradient(circle at 30% 30%, #C4B5FD, #8B5CF6, #4C1D95);
      filter: blur(40px);
      mix-blend-mode: hard-light;
      opacity: 0.8;
    }
    
    .iridescent-blob {
      background: 
        radial-gradient(at 20% 20%, rgba(200, 180, 255, 0.9) 0px, transparent 50%),
        radial-gradient(at 80% 0%, rgba(150, 200, 255, 0.9) 0px, transparent 50%),
        radial-gradient(at 0% 50%, rgba(255, 200, 220, 0.9) 0px, transparent 50%),
        radial-gradient(at 80% 50%, rgba(200, 200, 255, 0.9) 0px, transparent 50%),
        radial-gradient(at 0% 100%, rgba(200, 180, 255, 0.9) 0px, transparent 50%),
        radial-gradient(at 80% 100%, rgba(180, 200, 255, 0.9) 0px, transparent 50%),
        radial-gradient(at 0% 0%, rgba(255, 255, 255, 0.9) 0px, transparent 50%);
      filter: blur(20px) contrast(150%) brightness(110%);
      mix-blend-mode: exclusion;
    }
  `}</style>
);

const Marquee = ({ text, direction = 1, speed = 20 }: { text: string, direction?: number, speed?: number }) => (
  <div className="border-y-2 border-black py-2 overflow-hidden whitespace-nowrap bg-[#E6E1EB] flex">
    <motion.div 
      className="flex gap-4 font-grotesk text-sm md:text-base uppercase tracking-widest font-medium"
      animate={{ x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      {[...Array(10)].map((_, i) => (
        <span key={i}>{text} &nbsp; . &nbsp; </span>
      ))}
    </motion.div>
  </div>
);

const TextBand = ({ text, delay = 0 }: { text: string, delay?: number }) => (
  <div className="border-b-2 border-black py-8 md:py-16 overflow-hidden whitespace-nowrap bg-[#E6E1EB] relative group hover:bg-[#DED8E3] transition-colors">
    <motion.div 
      className="font-grotesk text-4xl md:text-7xl lg:text-8xl uppercase tracking-tight text-black px-4"
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      {text}
    </motion.div>
    <div className="absolute top-1/2 right-8 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-[#E6E1EB]">
            <span className="text-2xl">↓</span>
        </div>
    </div>
  </div>
);

const Blob = () => (
  <motion.div 
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full iridescent-blob z-10 pointer-events-none"
    animate={{ 
      scale: [1, 1.2, 0.9, 1.1, 1],
      rotate: [0, 90, 180, 270, 360],
      borderRadius: ["50%", "40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "50%"]
    }}
    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
  />
);

export default function AiMindsetKarolineRuPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-[#E6E1EB] text-black selection:bg-black selection:text-[#E6E1EB] hide-scrollbar font-grotesk">
      <KarolineStyles />
      
      {/* Top Marquee */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#E6E1EB]">
        <Marquee text="AI MINDSET POS {SPRINT} . BATCH X26 . ПЕРСОНАЛЬНАЯ ОПЕРАЦИОННАЯ СИСТЕМА . 2 МАРТА — 14 МАРТА" speed={40} />
      </div>

      <main className="pt-12">
        
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex flex-col justify-center items-center border-b-2 border-black overflow-hidden">
          <Blob />
          
          <div className="relative z-20 text-center mix-blend-difference text-[#E6E1EB] pointer-events-none">
             <h1 className="text-[12vw] leading-[0.8] font-bold tracking-tighter">
               AI MINDSET
             </h1>
             <h2 className="text-[8vw] leading-[0.8] font-light italic">
               POS {`{SPRINT}`}
             </h2>
          </div>

          <div className="absolute bottom-8 left-0 right-0 text-center z-20">
             <p className="text-sm md:text-base uppercase tracking-[0.3em] font-bold">
                От хаоса инструментов к рабочей системе
             </p>
          </div>
        </section>

        {/* Content Bands */}
        <section>
          <div className="border-b-2 border-black py-4 px-4 text-xs uppercase tracking-widest font-bold">
            4 Столпа POS
          </div>
          
          <TextBand text="Контекст . Context . Контекст ." delay={0.1} />
          <div className="px-4 py-8 md:px-12 md:py-12 border-b-2 border-black bg-[#E6E1EB] text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-center">
             AI знает кто ты, как работаешь, что тебе важно. Глубокое понимание твоего рабочего процесса.
          </div>

          <TextBand text="Архитектура . Architecture ." delay={0.1} />
          <div className="px-4 py-8 md:px-12 md:py-12 border-b-2 border-black bg-[#E6E1EB] text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-center">
             Система, которая не удалит файлы без спроса. Структурированная, безопасная и масштабируемая.
          </div>

          <TextBand text="Инструменты . Tools . Инструменты ." delay={0.1} />
          <div className="px-4 py-8 md:px-12 md:py-12 border-b-2 border-black bg-[#E6E1EB] text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-center">
             Бесшовная интеграция с Claude Code, Cursor, Obsidian и MCP. Твой стек, объединенный.
          </div>

          <TextBand text="Навыки . Skills . Навыки . Skills ." delay={0.1} />
          <div className="px-4 py-8 md:px-12 md:py-12 border-b-2 border-black bg-[#E6E1EB] text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-center">
             Автоматизация рутинных задач. Агенты, которые делают грязную работу, чтобы ты мог сосредоточиться на стратегии.
          </div>
        </section>

        {/* Guides Section */}
        <section className="border-b-2 border-black">
           <div className="border-b-2 border-black py-4 px-4 text-xs uppercase tracking-widest font-bold flex justify-between">
             <span>Твои Проводники</span>
             <span>Batch X26</span>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black">
              {[
                { name: "Александр Поваляев", role: "Основатель", desc: "Стратег. 15+ лет соединяет технологии, бизнес и людей." },
                { name: "Сергей Хабаров", role: "Архитектор", desc: "Системный архитектор. 6+ лет в EdTech и AI." },
                { name: "Серёжа Рис", role: "Евангелист", desc: "AI-евангелист. Ex-Yandex. Принц вайбкодинга." }
              ].map((guide, i) => (
                <div key={i} className="p-8 md:p-12 hover:bg-[#DED8E3] transition-colors group relative overflow-hidden">
                   <div className="text-[10rem] leading-none font-bold opacity-5 absolute -bottom-12 -right-12 select-none group-hover:scale-110 transition-transform duration-500">
                      {i + 1}
                   </div>
                   <h3 className="text-2xl font-bold uppercase mb-2 relative z-10">{guide.name}</h3>
                   <div className="w-12 h-1 bg-black mb-6 relative z-10"></div>
                   <p className="text-sm font-bold uppercase tracking-widest mb-4 relative z-10">{guide.role}</p>
                   <p className="text-lg leading-relaxed relative z-10">{guide.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Pricing / CTA */}
        <section className="relative py-24 md:py-48 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
           <div className="absolute inset-0 opacity-30">
              <Blob />
           </div>
           
           <h2 className="text-6xl md:text-9xl font-bold mb-8 relative z-10 mix-blend-multiply">
              $499
           </h2>
           <p className="text-xl md:text-2xl max-w-2xl mb-12 relative z-10">
              Уходишь с работающей системой, а не с конспектом. <br/>
              Возврат в первые 4 дня — без вопросов.
           </p>
           
           <button className="relative z-10 bg-black text-[#E6E1EB] px-12 py-4 rounded-full text-lg font-bold uppercase tracking-widest hover:scale-105 transition-transform">
              Записаться на Спринт
           </button>
        </section>

        {/* Footer Marquee */}
        <div className="border-t-2 border-black">
          <Marquee text="ЛИСТАЙ НИЖЕ . ЛИСТАЙ НИЖЕ . ЛИСТАЙ НИЖЕ" direction={-1} speed={30} />
        </div>
        
        <footer className="py-12 px-8 flex justify-between items-end">
           <div className="text-xs font-bold uppercase tracking-widest">
              AI Mindset © 2026
           </div>
           <div className="flex gap-4">
              <Menu className="w-6 h-6" />
           </div>
        </footer>

      </main>
    </div>
  );
}
