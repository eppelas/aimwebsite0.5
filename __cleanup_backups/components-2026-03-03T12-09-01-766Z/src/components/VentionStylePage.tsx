import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

// --- Components ---

const QuestionBlock = ({ color, text, rotation = 0, className = "" }: { color: string; text: string; rotation?: number; className?: string }) => (
  <motion.div 
    whileHover={{ scale: 1.05, rotate: rotation + 2 }}
    className={`${color} p-8 md:p-16 flex items-center justify-center text-2xl md:text-4xl font-bold leading-tight tracking-tight text-black relative ${className}`}
    style={{ rotate: rotation }}
  >
    {text}
    {/* Speech bubble tail simulation */}
    <div className={`absolute bottom-0 left-12 w-12 h-12 ${color} translate-y-1/2 rotate-45`} />
  </motion.div>
);

const ResultCard = ({ number, title, desc, color }: { number: string; title: string; desc: string; color: string }) => (
  <div className={`${color} p-8 md:p-12 flex flex-col justify-between min-h-[300px] hover:brightness-110 transition-all cursor-default`}>
    <div className="text-6xl md:text-8xl font-medium tracking-tighter opacity-20 mb-8">{number}</div>
    <div>
      <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">{title}</h3>
      <p className="text-lg opacity-80 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const GuideItem = ({ name, role, link }: { name: string; role: string; link: string }) => (
  <div className="border-t border-white/20 py-8 md:py-12 group hover:bg-white/5 transition-colors">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <h3 className="text-3xl md:text-5xl font-medium tracking-tight group-hover:text-[#FF66FF] transition-colors">{name}</h3>
      <a href={link} className="flex items-center gap-2 text-sm uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
        Telegram <ArrowUpRight size={16} />
      </a>
    </div>
    <p className="mt-4 text-lg opacity-60 max-w-2xl">{role}</p>
  </div>
);

// --- Main Page ---

export default function VentionStylePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#111111] text-white font-sans selection:bg-[#CCFF00] selection:text-black overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 mix-blend-difference pointer-events-none">
        <div className="text-2xl font-bold tracking-tighter pointer-events-auto">AI Mindset</div>
        <div className="flex gap-8 text-sm font-bold uppercase tracking-widest pointer-events-auto">
          <a href="#" className="hover:text-[#FF66FF]">Program</a>
          <a href="#" className="hover:text-[#CCFF00]">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        style={{ y: yHero, scale: scaleHero }}
        className="min-h-screen flex flex-col justify-center px-4 md:px-12 pt-32 relative"
      >
        <div className="max-w-[90vw]">
          <h1 className="text-[14vw] leading-[0.8] font-medium tracking-tighter mb-12">
            PERSONAL<br/>
            <span className="text-[#FF66FF]">OPERATIONAL</span><br/>
            SYSTEM
          </h1>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/20 pt-8">
          <div className="text-2xl md:text-4xl font-medium max-w-xl leading-tight mb-8 md:mb-0">
            От хаоса инструментов к рабочей AI-системе, заточенной под тебя.
          </div>
          <div className="text-right">
            <div className="text-[#CCFF00] text-xl font-mono mb-2">SPRINT W26</div>
            <div className="text-4xl md:text-6xl font-medium">02.03 — 14.03</div>
          </div>
        </div>
      </motion.section>

      {/* "Questions" Section - Colorful Blocks */}
      <section className="px-4 md:px-12 py-32 bg-[#111111] relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-medium leading-none mb-24">
            But our AI future<br/>
            brings up other<br/>
            <span className="text-[#FF5733]">questions:</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative">
            <div className="space-y-8 md:space-y-32 pt-16">
              <QuestionBlock 
                color="bg-[#CCFF00]" 
                text="Will it organize my chaos?" 
                rotation={-3}
              />
               <div className="text-xl md:text-2xl leading-relaxed opacity-80 pl-4 border-l-2 border-[#CCFF00]">
                POS — это не инструмент, это операционная система с персональным AI-ассистентом. Слой правил, контекста и ограничений.
              </div>
            </div>

            <div className="space-y-8 md:space-y-32">
              <div className="text-xl md:text-2xl leading-relaxed opacity-80 pl-4 border-l-2 border-[#FF5733]">
                Представь: утром агент даёт план дня, днём готовит брифы, вечером подводит итоги.
              </div>
              <QuestionBlock 
                color="bg-[#FF5733]" 
                text="Can it manage my attention?" 
                rotation={2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results Grid - Vibrant Cards */}
      <section className="bg-white text-black py-32 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24">
            <h2 className="text-6xl md:text-9xl font-medium tracking-tighter mb-8">THE RESULT</h2>
            <p className="text-2xl md:text-3xl max-w-3xl leading-tight">
              Уходишь с работающей системой, а не с конспектом. Дистиллят реальных кейсов фаундеров.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResultCard 
              number="01" 
              title="Собранный контекст" 
              desc="AI знает кто ты, как работаешь, что тебе важно." 
              color="bg-[#FF66FF]" 
            />
            <ResultCard 
              number="02" 
              title="Логичная архитектура" 
              desc="Не удалит все файлы без спроса и не купит бесполезный курс." 
              color="bg-[#A4D4E3]" 
            />
            <ResultCard 
              number="03" 
              title="Связанные инструменты" 
              desc="Claude Code / Cursor / Obsidian / MCP — единый стек." 
              color="bg-[#CCFF00]" 
            />
            <ResultCard 
              number="04" 
              title="Работающие skills" 
              desc="Автоматизация рутинных задач и правил." 
              color="bg-[#FF5733]" 
            />
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="bg-[#111111] text-white py-32 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-medium mb-16">Твои проводники</h2>
          
          <div className="flex flex-col">
            <GuideItem 
              name="Александр Поваляев" 
              role="Основатель AI Mindset, стратег. 15+ лет соединяет технологии, инструменты, бизнес и людей."
              link="#"
            />
            <GuideItem 
              name="Сергей Хабаров" 
              role="Системный архитектор на стыке AI, бизнеса и обучения. 6+ лет в образовании."
              link="#"
            />
            <GuideItem 
              name="Серёжа Рис" 
              role="AI-евангелист, ex Yandex. Билдер и фаундер в комьюнити вайбкодеров. Claude Code стример."
              link="#"
            />
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <section className="bg-[#2A1B3D] text-white min-h-[80vh] flex flex-col justify-between p-4 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-5xl md:text-7xl font-medium leading-none mb-8">
              Освободи мозг от операционки.
            </h2>
            <p className="text-xl opacity-70 max-w-md">
              Оставь ресурсы на важное. Скидки для Alumni (-20%) и Bring a Friend (-10%).
            </p>
          </div>
          
          <div className="bg-[#FF66FF] text-black p-8 md:p-12 flex flex-col justify-center items-start">
            <h3 className="text-3xl font-bold mb-8">Join Sprint W26</h3>
            <button className="w-full bg-black text-white py-6 text-xl font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-4 group">
              Записаться <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            <div className="mt-6 text-sm opacity-60 font-mono">
              Возврат первые 4 дня — без вопросов.
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/20 pt-8 mt-12">
          <div className="text-[10vw] font-bold leading-none tracking-tighter text-[#FF66FF]">
            AI MINDSET
          </div>
          <div className="flex gap-8 mb-2 md:mb-4 text-sm font-mono uppercase opacity-50">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </section>

    </div>
  );
}
