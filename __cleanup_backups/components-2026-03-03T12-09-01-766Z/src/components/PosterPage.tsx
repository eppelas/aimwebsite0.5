import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, Menu, X } from 'lucide-react';

// --- UI Components for Poster Style ---

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-full max-w-[720px] mx-auto px-6 ${className}`}>
    {children}
  </div>
);

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`py-12 border-t border-[rgba(0,0,0,0.08)] first:border-t-0 ${className}`}>
    <Container>
      {children}
    </Container>
  </section>
);

const Button = ({ children, href, variant = 'primary', className = "" }: { children: React.ReactNode; href?: string; variant?: 'primary' | 'secondary'; className?: string }) => {
  const baseStyles = "inline-flex items-center justify-center px-5 py-3 rounded-full text-[0.9rem] leading-none transition-all duration-150 ease-out hover:-translate-y-px active:translate-y-0 border border-transparent";
  const variants = {
    primary: "bg-[#ff4b4b] text-white border-[#ff4b4b] hover:bg-[#e13c3c] hover:border-[#e13c3c]",
    secondary: "bg-transparent text-[#111111] border-[rgba(0,0,0,0.16)] hover:border-[#111111]"
  };

  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{ duration: 0.4, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// --- Sections ---

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Философия', href: '#philosophy' },
    { name: 'Программа', href: '#program' },
    { name: 'Треки', href: '#tracks' },
    { name: 'Кейсы', href: '#cases' },
    { name: 'Тарифы', href: '#pricing' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[rgba(0,0,0,0.08)] py-5">
      <Container className="flex items-center justify-between">
        <a href="#" className="font-semibold text-[0.95rem] text-[#111111] no-underline">
          ●―● AI Mindset ●―●
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-[0.875rem] text-[#6f6f6f] hover:text-[#111111] hover:underline transition-colors">
              {link.name}
            </a>
          ))}
          <a href="https://join.aimindset.org/waitlist" className="text-[0.875rem] text-[#ff4b4b] hover:text-[#111111] hover:underline transition-colors font-medium">
            В лист ожидания
          </a>
        </nav>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden p-1" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-[rgba(0,0,0,0.08)]">
          <Container className="py-4 flex flex-col gap-3">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[0.95rem] py-2 border-b border-[rgba(0,0,0,0.04)] text-[#111111]"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a href="https://join.aimindset.org/waitlist" className="text-[#ff4b4b] font-medium py-2">
              В лист ожидания
            </a>
          </Container>
        </div>
      )}
    </header>
  );
};

const Hero = () => (
  <section className="py-16 md:py-24">
    <Container>
      <FadeIn>
        <div className="mb-6 text-[0.75rem] opacity-70 font-mono">
          ПОТОК: ЗИМА 26 / ЗАЯВКИ: ЗАКРЫТЫ / СЛЕДУЮЩИЙ: 20 АПР
        </div>
        <h1 className="text-[2.25rem] md:text-[3rem] font-semibold leading-[1.15] tracking-[0.02em] mb-6 text-[#111111]">
          AI Mindset Lab W26
        </h1>
        <p className="text-[1.0625rem] leading-[1.5] max-w-[60ch] mb-8 text-[#111111]">
          Лаборатория нового мышления в эпоху AI. Старт 19 января — завершение 16 февраля.
          От хаоса промптов к персональной AI-операционной системе.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <Button href="https://join.aimindset.org/waitlist">
            Подать заявку
          </Button>
          <a href="#program" className="text-[0.9rem] text-[#ff4b4b] hover:underline py-3 px-2">
            Изучить программу →
          </a>
        </div>
      </FadeIn>
    </Container>
  </section>
);

const Philosophy = () => (
  <Section id="philosophy">
    <FadeIn>
      <div className="mb-8">
        <p className="text-[0.875rem] tracking-[0.06em] opacity-80 mb-2">ФИЛОСОФИЯ:</p>
        <h2 className="text-[1.5rem] leading-[1.25] font-semibold mb-4">Мышление &gt; Инструменты</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <p className="text-[#111111]">
            Мы создаём пространство для экспериментов. Здесь вы не изучаете, а создаёте: 
            персональных ассистентов, AI-first процессы, новую версию себя.
          </p>
          <p className="text-[#6f6f6f] text-[0.9rem]">
            Технологии меняются, а новый способ мышления остаётся с вами.
          </p>
        </div>
        
        <ul className="space-y-4">
          {[
            "✦ Практика — главное: Каждая неделя — это эксперимент.",
            "✦ Сила сообщества: Вы учитесь друг у друга.",
            "✦ Персонализация: Углубляйтесь в то, что нужно вам."
          ].map((item, idx) => (
            <li key={idx} className="text-[0.95rem] text-[#111111]">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  </Section>
);

const Program = () => {
  const weeks = [
    {
      num: "01",
      dates: "19–25 ЯНВ",
      title: "Prompt Engineering",
      desc: "Освоение техник промптов: Chain-of-Thought, Few-Shot Learning. Создание первых ассистентов.",
      result: "Результат: Персональный GPT-ассистент, библиотека промптов."
    },
    {
      num: "02",
      dates: "26 ЯНВ – 1 ФЕВ",
      title: "Context Engineering",
      desc: "Управление контекстом: Obsidian + MCP + Claude. Автоматизация через n8n, Make.",
      result: "Результат: 2–3 работающие автоматизации, система знаний."
    },
    {
      num: "03",
      dates: "2–8 ФЕВ",
      title: "Mind Engineering",
      desc: "AI для коучинга, рефлексии, персональных ритуалов. Трекинг привычек с AI.",
      result: "Результат: Персональный AI-коуч, система трекинга."
    },
    {
      num: "04",
      dates: "9–15 ФЕВ",
      title: "Life Engineering",
      desc: "От идеи до прототипа. Vibe-coding с Cursor. Создание без технического бэкграунда.",
      result: "Результат: Рабочий прототип, задеплоенный проект."
    }
  ];

  return (
    <Section id="program">
      <FadeIn>
        <div className="mb-10">
          <p className="text-[0.875rem] tracking-[0.06em] opacity-80 mb-2">ПРОГРАММА:</p>
          <h2 className="text-[1.5rem] leading-[1.25] font-semibold">AI Lab (Main)</h2>
          <p className="mt-4 text-[#6f6f6f]">промпт &gt;&gt; контекст &gt;&gt; мышление &gt;&gt; жизнь</p>
        </div>

        <div className="space-y-10">
          {weeks.map((week, idx) => (
            <div key={idx} className="grid md:grid-cols-[100px_1fr] gap-4">
              <div className="font-mono text-[0.75rem] opacity-60 pt-1">
                {week.num} / {week.dates}
              </div>
              <div>
                <h3 className="text-[1.125rem] font-semibold mb-2">{week.title}</h3>
                <p className="text-[#111111] mb-2 max-w-[50ch]">{week.desc}</p>
                <p className="text-[0.85rem] text-[#6f6f6f]">{week.result}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
};

const Tracks = () => (
  <Section id="tracks">
    <FadeIn>
      <div className="mb-8">
        <p className="text-[0.875rem] tracking-[0.06em] opacity-80 mb-2">ADVANCED:</p>
        <h2 className="text-[1.5rem] leading-[1.25] font-semibold">Специализированные треки</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
        {[
          { title: "AI Coaching", desc: "Для тех, кто выгорел и ищет баланс. AI для коучинга и рефлексии." },
          { title: "AI Agents", desc: "Проектирование и запуск автономных AI-систем. MCP, n8n, Make." },
          { title: "Vibe-Coding", desc: "Творческое программирование. От идеи до прототипа за часы." },
          { title: "AI Creative", desc: "Для креативщиков. Генерация музыки, видео и визуального контента." }
        ].map((track, idx) => (
          <div key={idx}>
            <h3 className="text-[1.125rem] font-semibold mb-2">{track.title}</h3>
            <p className="text-[#6f6f6f] text-[0.95rem]">{track.desc}</p>
          </div>
        ))}
      </div>
    </FadeIn>
  </Section>
);

const Cases = () => (
  <Section id="cases">
    <FadeIn>
      <div className="mb-8">
        <p className="text-[0.875rem] tracking-[0.06em] opacity-80 mb-2">КЕЙСЫ:</p>
        <h2 className="text-[1.5rem] leading-[1.25] font-semibold">Проекты участников</h2>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
        {[
          "AI Coaching: Ассистент для терапии с голосом.",
          "AI Vision: Автоматическая сортировка контента.",
          "AI Summary: Транскрипция встреч + CRM.",
          "AI Knowledge: RAG-система для Obsidian.",
          "AI Project: PM-ассистент с автостатусами.",
          "AI Automation: Email-триаж и документооборот.",
          "AI Dev: Code Review и анализ PR."
        ].map((item, idx) => (
          <div key={idx} className="text-[0.95rem] text-[#111111] border-l border-[rgba(0,0,0,0.08)] pl-4">
            {item}
          </div>
        ))}
      </div>
    </FadeIn>
  </Section>
);

const Pricing = () => (
  <Section id="pricing">
    <FadeIn>
      <div className="mb-8">
        <p className="text-[0.875rem] tracking-[0.06em] opacity-80 mb-2">ПРИСОЕДИНЯЙТЕСЬ:</p>
        <h2 className="text-[1.5rem] leading-[1.25] font-semibold">Варианты участия</h2>
      </div>

      <div className="space-y-4">
        {[
          { 
            name: "Main Lab", 
            price: "€590", 
            desc: "Базовый формат. 4 live-воркшопа, коворкинги, чат, демо-день." 
          },
          { 
            name: "Advanced", 
            price: "€890", 
            desc: "Всё из Main Lab + 4 трека (Coaching, Agents, Coding, Creative)." 
          },
          { 
            name: "Premium", 
            price: "€1,490", 
            desc: "Всё из Advanced + индивидуальный план и сессии 1:1." 
          }
        ].map((plan, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white border border-[rgba(0,0,0,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-3 mb-1">
                <h3 className="text-[1.125rem] font-semibold">{plan.name}</h3>
                <span className="font-mono text-[1rem]">{plan.price}</span>
              </div>
              <p className="text-[#6f6f6f] text-[0.9rem]">{plan.desc}</p>
            </div>
            <Button href="https://join.aimindset.org/context" variant="secondary" className="shrink-0 text-[0.85rem]">
              Выбрать
            </Button>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-[rgba(0,0,0,0.08)]">
        <p className="text-[0.9rem] mb-2">
          <span className="text-[#6f6f6f]">Обучение для команды?</span> <a href="https://aimindset.org/ai-mindset-consulting" className="text-[#ff4b4b] hover:underline">Смотреть Team Premium →</a>
        </p>
      </div>
    </FadeIn>
  </Section>
);

const Footer = () => (
  <footer className="py-10 border-t border-[rgba(0,0,0,0.08)] bg-[#ffffff]">
    <Container>
      <div className="mb-6">
        <p className="text-[0.9rem] mb-2">Формируйте свой домен, шаг за шагом.</p>
        <p className="text-[0.75rem] text-[#6f6f6f]">© 2026 AI Mindset. Все права защищены.</p>
      </div>
      
      <div className="flex gap-5 text-[0.85rem]">
        <a href="https://t.me/ai_mind_set" className="text-[#ff4b4b] hover:underline">Telegram</a>
        <a href="https://www.youtube.com/@A-I-Mindset" className="text-[#ff4b4b] hover:underline">YouTube</a>
        <a href="#" className="text-[#6f6f6f] hover:text-[#111111]">Legal</a>
      </div>
    </Container>
  </footer>
);

export default function PosterPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#111111] font-[system-ui,-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Segoe_UI',Roboto,sans-serif] poster-theme selection:bg-[#ff4b4b] selection:text-white">
      <Header />
      <main>
        <Hero />
        <Philosophy />
        <Program />
        <Tracks />
        <Cases />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
