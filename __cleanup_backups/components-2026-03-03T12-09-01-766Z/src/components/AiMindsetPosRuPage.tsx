import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Globe, Check } from 'lucide-react';

const CleanStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

    .font-inter { font-family: 'Inter', sans-serif; }
    .font-space { font-family: 'Space Grotesk', sans-serif; }

    .noise-sphere {
      background: radial-gradient(circle at 30% 30%, #ffffff, #d1d1d1, #8a8a8a, #2a2a2a);
      filter: contrast(1.2) brightness(1.1);
      position: relative;
      overflow: hidden;
    }
    
    .noise-sphere::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E");
      mix-blend-mode: overlay;
      border-radius: 50%;
    }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    
    .pill-button {
      transition: all 0.3s ease;
    }
    .pill-button:hover {
      transform: scale(1.05);
    }
  `}</style>
);

const RotatingSphere = () => (
  <motion.div 
    className="w-[40vw] h-[40vw] rounded-full noise-sphere shadow-2xl"
    animate={{ 
      rotate: 360,
      backgroundPosition: ['0% 0%', '100% 100%']
    }}
    transition={{ 
      duration: 20, 
      ease: "linear", 
      repeat: Infinity 
    }}
  />
);

export default function AiMindsetPosRuPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-[#F4F4F4] text-[#1A1A1A] selection:bg-[#1A1A1A] selection:text-white hide-scrollbar font-inter relative">
      <CleanStyles />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-8 py-8 flex justify-between items-center bg-[#F4F4F4]/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-none">
        <div className="flex items-center gap-2">
           <span className="font-space font-bold text-lg tracking-tight">AI Mindset</span>
           <span className="text-xl">🧠</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
           <a href="#" className="hover:opacity-60 transition-opacity">Программа</a>
           <a href="#" className="hover:opacity-60 transition-opacity">Результат</a>
           <a href="#" className="hover:opacity-60 transition-opacity">Тарифы</a>
        </nav>
        <button className="md:hidden">Menu</button>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 pt-24 pb-12 relative overflow-hidden">
        <div className="md:w-1/2 flex justify-center md:justify-start relative z-10 order-2 md:order-1 mt-12 md:mt-0">
           <RotatingSphere />
        </div>
        
        <div className="md:w-1/2 flex flex-col justify-center z-20 pl-0 md:pl-12 order-1 md:order-2">
           <div className="inline-flex items-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full border border-black/10 text-xs font-medium uppercase tracking-wider">batch: sprint-X26</span>
              <span className="px-3 py-1 rounded-full bg-[#1A1A1A] text-white text-xs font-medium uppercase tracking-wider">applications: open</span>
           </div>
           
           <h1 className="text-[10vw] md:text-[5vw] leading-[0.9] font-space font-bold tracking-tight mb-8">
             AI Personal<br/>
             Operational<br/>
             System <span className="italic font-serif font-normal">(POS)</span>
           </h1>
           
           <p className="text-lg md:text-xl leading-relaxed text-[#4A4A4A] max-w-md mb-8">
             За 2 недели ты создашь систему агентов для управления вниманием, задачами и знаниями. От хаоса инструментов к рабочей AI-системе.
           </p>
           
           <div className="flex flex-col gap-2">
              <span className="font-medium text-2xl font-space">2 марта — 14 марта 2026</span>
              <span className="text-sm text-[#4A4A4A] uppercase tracking-widest">Длительность: 2 недели</span>
           </div>
        </div>
      </section>

      {/* Concept Section */}
      <section className="py-24 px-6 md:px-16 bg-[#EAE8E4]">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
               <h2 className="text-[8vw] md:text-[4vw] leading-none font-space font-bold tracking-tight mb-8">
                  Что такое<br/>POS?
               </h2>
            </div>
            <div className="space-y-8 text-lg md:text-xl leading-relaxed text-[#1A1A1A]">
               <p>
                  <strong className="font-bold">POS</strong> — это не инструмент, это операционная система с персональным AI-ассистентом. Слой правил, контекста и ограничений, который заставляет инструменты работать.
               </p>
               <ul className="space-y-4">
                  <li className="flex gap-4 items-start">
                     <div className="mt-1.5 w-2 h-2 rounded-full bg-black shrink-0" />
                     <span>Утром агент даёт план дня под твой уровень энергии</span>
                  </li>
                  <li className="flex gap-4 items-start">
                     <div className="mt-1.5 w-2 h-2 rounded-full bg-black shrink-0" />
                     <span>Днём напоминает про встречу и готовит бриф</span>
                  </li>
                  <li className="flex gap-4 items-start">
                     <div className="mt-1.5 w-2 h-2 rounded-full bg-black shrink-0" />
                     <span>Вечером находит незакрытые задачи и даёт итоги</span>
                  </li>
               </ul>
            </div>
         </div>
      </section>

      {/* Result Section */}
      <section className="py-24 px-6 md:px-16 bg-[#F4F4F4]">
         <div className="mb-16">
            <h2 className="text-[8vw] md:text-[4vw] leading-none font-space font-bold tracking-tight">
               Результат спринта
            </h2>
            <p className="text-xl mt-4 text-[#4A4A4A]">Уходишь с работающей системой, а не с конспектом.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {[
               { title: "Собранный контекст", desc: "AI знает кто ты, как работаешь, что тебе важно." },
               { title: "Логичная архитектура", desc: "Не удалит все файлы без спроса и не купит бесполезный курс." },
               { title: "Связанные инструменты", desc: "Claude Code / Cursor / Obsidian / MCP — всё работает вместе." },
               { title: "Работающие skills", desc: "Автоматизация рутинных задач и правил." }
            ].map((item, i) => (
               <div key={i} className="group border-t border-black/10 pt-8">
                  <div className="text-sm font-mono mb-4 opacity-50">0{i + 1}</div>
                  <h3 className="text-3xl font-space font-medium mb-4 group-hover:translate-x-2 transition-transform duration-300">{item.title}</h3>
                  <p className="text-[#4A4A4A] leading-relaxed">{item.desc}</p>
               </div>
            ))}
         </div>
      </section>

      {/* Mentors Section */}
      <section className="py-24 px-6 md:px-16 bg-[#1A1A1A] text-[#F4F4F4]">
         <h2 className="text-[8vw] md:text-[4vw] leading-none font-space font-bold tracking-tight mb-16 text-white">
            Твои проводники
         </h2>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
               { name: "Александр Поваляев", role: "Основатель AI Mindset, стратег", desc: "15+ лет соединяет технологии, бизнес и людей." },
               { name: "Сергей Хабаров", role: "Системный архитектор", desc: "6+ лет в образовании, 500+ обученных специалистов." },
               { name: "Серёжа Рис", role: "AI-евангелист, ex Yandex", desc: "Билдер и фаундер в комьюнити вайбкодеров." }
            ].map((mentor, i) => (
               <div key={i} className="group cursor-pointer">
                  <div className="aspect-[3/4] bg-[#333] mb-6 rounded-lg overflow-hidden relative">
                     {/* Placeholder for mentor image */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
                     <div className="absolute bottom-4 left-4 font-space text-6xl font-bold opacity-10">{i + 1}</div>
                  </div>
                  <h3 className="text-2xl font-space font-medium mb-2 group-hover:text-white/80 transition-colors">{mentor.name}</h3>
                  <div className="text-sm uppercase tracking-widest opacity-60 mb-4">{mentor.role}</div>
                  <p className="text-white/60 text-sm leading-relaxed">{mentor.desc}</p>
               </div>
            ))}
         </div>
      </section>

      {/* Price Section */}
      <section className="py-24 px-6 md:px-16 bg-[#F4F4F4]">
         <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-black/10 pb-8">
            <h2 className="text-[8vw] md:text-[4vw] leading-none font-space font-bold tracking-tight">
               Price
            </h2>
            <div className="text-right mt-8 md:mt-0">
               <div className="text-sm uppercase tracking-widest opacity-60 mb-2">Скидки</div>
               <div className="font-medium">Alumni (-20%), Bring a Friend (-10%)</div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white p-8 md:p-12 rounded-3xl border border-black/5 shadow-sm flex flex-col justify-between min-h-[400px]">
                <div>
                   <div className="text-sm uppercase tracking-widest opacity-50 mb-4">Standard</div>
                   <div className="text-5xl font-space font-bold mb-8">₽ 45,000</div>
                   <ul className="space-y-4">
                      <li className="flex gap-3 items-center"><Check className="w-5 h-5" /> <span>Доступ к материалам</span></li>
                      <li className="flex gap-3 items-center"><Check className="w-5 h-5" /> <span>Общий чат участников</span></li>
                      <li className="flex gap-3 items-center"><Check className="w-5 h-5" /> <span>2 Q&A сессии</span></li>
                   </ul>
                </div>
                <button className="w-full bg-[#1A1A1A] text-white py-4 rounded-xl font-medium mt-8 hover:bg-black transition-colors">
                   Оставить заявку
                </button>
             </div>
             
             <div className="bg-[#1A1A1A] text-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col justify-between min-h-[400px] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                   <div className="text-sm uppercase tracking-widest opacity-50 mb-4">Personal</div>
                   <div className="text-5xl font-space font-bold mb-8">₽ 120,000</div>
                   <ul className="space-y-4">
                      <li className="flex gap-3 items-center"><Check className="w-5 h-5" /> <span>Всё из Standard</span></li>
                      <li className="flex gap-3 items-center"><Check className="w-5 h-5" /> <span>Личный менторинг (4 часа)</span></li>
                      <li className="flex gap-3 items-center"><Check className="w-5 h-5" /> <span>Аудит твоей системы</span></li>
                      <li className="flex gap-3 items-center"><Check className="w-5 h-5" /> <span>Помощь в настройке агентов</span></li>
                   </ul>
                </div>
                <button className="w-full bg-white text-black py-4 rounded-xl font-medium mt-8 hover:bg-gray-100 transition-colors relative z-10">
                   Оставить заявку
                </button>
             </div>
         </div>
      </section>

      {/* Footer Pill */}
      <div className="fixed bottom-8 right-8 z-50">
         <button className="bg-[#333] text-white px-6 py-3 rounded-full text-xs font-medium tracking-wide pill-button flex items-center gap-2 shadow-lg">
            AI Mindset <span className="font-serif italic">→</span> W26
         </button>
      </div>

    </div>
  );
}
