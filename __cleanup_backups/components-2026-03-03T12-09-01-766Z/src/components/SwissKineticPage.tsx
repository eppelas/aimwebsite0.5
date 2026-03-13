import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check, Globe, Send } from 'lucide-react';

// --- Components ---

const Marquee = ({ text, direction = 1 }: { text: string; direction?: number }) => (
  <div className="overflow-hidden border-y border-black bg-white py-4 md:py-6">
    <motion.div 
      animate={{ x: direction > 0 ? [0, -1000] : [-1000, 0] }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      className="whitespace-nowrap flex gap-8 text-4xl md:text-6xl font-serif italic tracking-tight"
    >
      {[...Array(8)].map((_, i) => (
        <span key={i} className="flex items-center gap-8">
          {text} <span className="w-4 h-4 bg-[#CCFF00] rounded-full inline-block" />
        </span>
      ))}
    </motion.div>
  </div>
);

const RotatingBadge = () => (
  <motion.div 
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
    className="w-32 h-32 md:w-40 md:h-40 bg-[#CCFF00] rounded-full flex items-center justify-center relative z-10"
  >
    <svg viewBox="0 0 100 100" className="w-full h-full p-2">
      <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
      <text className="text-[14px] font-mono uppercase font-bold tracking-widest">
        <textPath href="#curve">
          Apply Now • Sprint W26 • Apply Now •
        </textPath>
      </text>
    </svg>
    <ArrowRight className="absolute inset-0 m-auto w-8 h-8" />
  </motion.div>
);

const SectionHeader = ({ number, title }: { number: string; title: string }) => (
  <div className="flex items-baseline gap-4 mb-8 md:mb-12">
    <span className="font-mono text-sm md:text-base opacity-50">({number})</span>
    <h2 className="text-3xl md:text-5xl font-serif italic">{title}</h2>
  </div>
);

const GuideCard = ({ name, role, link }: { name: string; role: string; link: string }) => (
  <div className="border border-black p-6 hover:bg-white transition-colors group relative overflow-hidden">
    <div className="absolute top-0 right-0 w-16 h-16 bg-[#CCFF00] rounded-bl-full transform translate-x-full translate-y-[-100%] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
    <h3 className="text-xl font-bold uppercase mb-2">{name}</h3>
    <p className="text-sm font-mono opacity-70 mb-4">{role}</p>
    <a href={link} className="text-xs uppercase tracking-widest border-b border-black hover:bg-[#CCFF00] transition-colors">Telegram</a>
  </div>
);

// --- Main Page ---

export default function SwissKineticPage() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div className="min-h-screen bg-[#F2F2F2] text-black font-sans selection:bg-[#CCFF00] selection:text-black">
      
      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full flex justify-between items-center px-4 md:px-8 py-4 z-50 mix-blend-difference text-white md:text-black md:mix-blend-normal">
        <div className="font-mono text-xs uppercase">
          AI Mindset POS {`{sprint}`}
        </div>
        <div className="font-mono text-xs uppercase hidden md:block">
          batch: sprint-X26
        </div>
        <div className="font-mono text-xs uppercase">
          applications: open
        </div>
      </div>

      {/* Hero */}
      <motion.section 
        style={{ scale }}
        className="min-h-screen flex flex-col justify-center px-4 md:px-12 pt-20 pb-12 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24">
            <h1 className="text-[12vw] leading-[0.8] font-serif italic tracking-tighter">
              Personal<br/>
              Operational<br/>
              System
            </h1>
            <div className="mt-8 md:mt-0 text-right">
              <div className="text-xl md:text-3xl font-mono mb-2">2 марта — 14 марта 2026</div>
              <div className="text-sm md:text-base opacity-60 max-w-xs ml-auto">
                Система агентов для управления вниманием, задачами и знаниями.
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end border-t border-black pt-8">
            <div className="hidden md:block max-w-md text-lg leading-tight">
              От хаоса инструментов к рабочей AI-системе, заточенной под тебя.
            </div>
            <RotatingBadge />
          </div>
        </div>
      </motion.section>

      <Marquee text="ATTENTION • TASKS • KNOWLEDGE • AGENTS" />

      {/* What is POS */}
      <section className="px-4 md:px-12 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <SectionHeader number="01" title="Что такое POS?" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg md:text-xl leading-relaxed">
            <p>
              <strong className="bg-[#CCFF00] px-1">POS</strong> — это не инструмент, это операционная система с персональным AI-ассистентом. Слой правил, контекста и ограничений, который заставляет инструменты работать.
            </p>
            <div>
              <p className="mb-6">Представь:</p>
              <ul className="space-y-4 font-mono text-sm md:text-base">
                <li className="flex items-start gap-3">
                  <Check size={16} className="mt-1" />
                  Утром агент даёт план дня под твой уровень энергии.
                </li>
                <li className="flex items-start gap-3">
                  <Check size={16} className="mt-1" />
                  Днём напоминает про встречу, бриф к которой он подготовил.
                </li>
                <li className="flex items-start gap-3">
                  <Check size={16} className="mt-1" />
                  Вечером находит незакрытые задачи и блокеры.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Program / Result */}
      <section className="bg-white px-4 md:px-12 py-24 md:py-32 border-y border-black">
        <div className="max-w-6xl mx-auto">
          <SectionHeader number="02" title="Результат спринта" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Собранный контекст", desc: "AI знает кто ты, как работаешь, что тебе важно." },
              { title: "Логичная архитектура", desc: "Не удалит все файлы без спроса и не купит бесполезный курс." },
              { title: "Связанные инструменты", desc: "Claude Code / Cursor / Obsidian / MCP." },
              { title: "Работающие skills", desc: "Автоматизация рутинных задач и правил." }
            ].map((item, i) => (
              <div key={i} className="group p-8 bg-[#F2F2F2] hover:bg-black hover:text-white transition-colors duration-300">
                <div className="text-4xl mb-4 font-serif italic">{i + 1}.</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="opacity-70 font-mono text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="px-4 md:px-12 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <SectionHeader number="03" title="Твои проводники" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GuideCard 
              name="Александр Поваляев" 
              role="Основатель AI Mindset, стратег. 15+ лет соединяет технологии и бизнес."
              link="#"
            />
            <GuideCard 
              name="Сергей Хабаров" 
              role="Системный архитектор. 6+ лет в образовании, 500+ обученных специалистов."
              link="#"
            />
            <GuideCard 
              name="Серёжа Рис" 
              role="AI-евангелист, ex Yandex. Билдер и фаундер в комьюнити вайбкодеров."
              link="#"
            />
          </div>
        </div>
      </section>

      <Marquee text="CLAUDE CODE • CURSOR • OBSIDIAN • MCP" direction={-1} />

      {/* Pricing / Footer */}
      <section className="px-4 md:px-12 py-24 md:py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[8vw] font-serif italic mb-8">Join the Sprint</h2>
          <p className="text-xl md:text-2xl font-mono mb-12 opacity-70">
            Освободи мозг от операционки. Оставь ресурсы на важное.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
            <button className="bg-[#CCFF00] text-black px-8 py-4 text-lg font-bold uppercase tracking-widest hover:bg-white transition-colors">
              Записаться на спринт
            </button>
            <button className="border border-white text-white px-8 py-4 text-lg font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
              Программа
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left border-t border-white/20 pt-12 font-mono text-xs uppercase tracking-widest">
            <div>
              <div className="opacity-50 mb-2">Скидки</div>
              <div>Alumni (-20%)</div>
              <div>Bring a Friend (-10%)</div>
            </div>
            <div>
              <div className="opacity-50 mb-2">Гарантии</div>
              <div>Возврат первые 4 дня</div>
              <div>Без вопросов</div>
            </div>
            <div>
              <div className="opacity-50 mb-2">Контакты</div>
              <a href="#" className="block hover:text-[#CCFF00]">Telegram Channel</a>
              <a href="#" className="block hover:text-[#CCFF00]">Podcast</a>
            </div>
            <div>
              <div className="opacity-50 mb-2">Legal</div>
              <a href="#" className="block hover:text-[#CCFF00]">Оферта</a>
              <a href="#" className="block hover:text-[#CCFF00]">Privacy Policy</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
