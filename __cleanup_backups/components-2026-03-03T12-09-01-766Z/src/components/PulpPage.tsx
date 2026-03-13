import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, MapPin, Mail, Menu, X } from 'lucide-react';

// --- UI Components ---

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`py-16 md:py-24 border-b border-border-subtle ${className}`}>
    {children}
  </section>
);

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-full max-w-[1120px] mx-auto px-6 md:px-8 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, href, variant = 'primary', className = "" }: { children: React.ReactNode; href?: string; variant?: 'primary' | 'secondary' | 'outline'; className?: string }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ease-out hover:-translate-y-px";
  const variants = {
    primary: "bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow-md",
    secondary: "bg-bg-alt text-text-main border border-border-subtle hover:border-accent/30",
    outline: "border border-text-main text-text-main hover:bg-text-main hover:text-white"
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

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block px-3 py-1 rounded-full bg-bg-alt border border-border-subtle text-xs font-medium text-text-muted uppercase tracking-wider mb-4">
    {children}
  </span>
);

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
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
    { name: 'Команда', href: '#team' },
    { name: 'Тарифы', href: '#pricing' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-main/90 backdrop-blur-md border-b border-border-subtle">
      <Container className="flex items-center justify-between h-16 md:h-20">
        <a href="#" className="text-lg font-bold tracking-tight uppercase">AI Mindset</a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-text-main/80 hover:text-accent transition-colors">
              {link.name}
            </a>
          ))}
          <Button href="https://join.aimindset.org/waitlist" className="!py-2 !px-4 !text-xs">
            В лист ожидания
          </Button>
        </nav>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-bg-main border-b border-border-subtle overflow-hidden"
        >
          <Container className="py-6 flex flex-col gap-4">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-medium py-2 border-b border-border-subtle/50"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button href="https://join.aimindset.org/waitlist" className="w-full mt-4">
              В лист ожидания
            </Button>
          </Container>
        </motion.div>
      )}
    </header>
  );
};

const Hero = () => (
  <Section className="pt-32 md:pt-48 pb-16 md:pb-24 border-none">
    <Container>
      <FadeIn>
        <div className="flex flex-wrap gap-3 mb-6">
          <Badge>Поток: Зима 26</Badge>
          <Badge>Заявки: Закрыты</Badge>
          <Badge>След: 20 Апр</Badge>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-8">
          AI Mindset <br className="hidden md:block" />
          <span className="text-accent">LAB W26</span>
        </h1>
        <p className="text-lg md:text-xl text-text-main/80 max-w-2xl mb-10 leading-relaxed">
          Лаборатория нового мышления в эпоху AI. Старт 19 января — завершение 16 февраля.
          От хаоса промптов к персональной AI-операционной системе.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="https://join.aimindset.org/waitlist">
            Подать заявку <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button variant="secondary" href="#program">
            Изучить программу
          </Button>
        </div>
      </FadeIn>
    </Container>
  </Section>
);

const Philosophy = () => (
  <Section id="philosophy" className="bg-bg-alt">
    <Container>
      <div className="grid md:grid-cols-2 gap-12 md:gap-24">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl mb-6">Философия лаборатории</h2>
          <p className="text-text-muted text-lg">
            Мы создаём пространство для экспериментов. Здесь вы не изучаете, а создаёте: 
            персональных ассистентов, AI-first процессы, новую версию себя.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <ul className="space-y-8">
            {[
              { title: "Мышление > Инструменты", desc: "Технологии меняются, а новый способ мышления остаётся с вами." },
              { title: "Практика — главное", desc: "Каждая неделя — это эксперимент с реальными задачами и артефактами." },
              { title: "Сила сообщества", desc: "Вы учитесь не только у экспертов, но и друг у друга." },
              { title: "Персонализация", desc: "Углубляйтесь в то, что нужно именно вам через треки." }
            ].map((item, idx) => (
              <li key={idx} className="border-l-2 border-accent/20 pl-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-text-muted">{item.desc}</p>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </Container>
  </Section>
);

const Program = () => {
  const weeks = [
    {
      num: "01",
      dates: "19–25 ЯНВ",
      title: "Prompt Engineering",
      subtitle: "AI как интерфейс мышления",
      desc: "Освоение техник промптов: Chain-of-Thought, Few-Shot Learning, Custom GPTs. Создание первых персональных ассистентов.",
      result: "Персональный GPT-ассистент, библиотека промптов (20+).",
      tools: ["ChatGPT", "Claude", "Gemini", "Perplexity"]
    },
    {
      num: "02",
      dates: "26 ЯНВ – 1 ФЕВ",
      title: "Context Engineering",
      subtitle: "Автоматизация и агенты",
      desc: "Управление контекстом: Obsidian + MCP + Claude. Автоматизация через n8n, Make. AI-агенты и workflows.",
      result: "2–3 работающие автоматизации, система знаний, настройка агентов.",
      tools: ["Obsidian", "MCP", "n8n", "Make", "Claude Projects"]
    },
    {
      num: "03",
      dates: "2–8 ФЕВ",
      title: "Mind Engineering",
      subtitle: "Продуктивность и ритуалы",
      desc: "AI для коучинга, рефлексии, персональных ритуалов. Трекинг привычек и целей с поддержкой AI.",
      result: "Персональный AI-коуч, система трекинга привычек.",
      tools: ["Claude", "Notion", "Obsidian", "Taskade"]
    },
    {
      num: "04",
      dates: "9–15 ФЕВ",
      title: "Life Engineering",
      subtitle: "Творчество и реализация",
      desc: "От идеи до прототипа. Vibe-coding с Cursor, Windsurf. Создание без технического бэкграунда.",
      result: "Рабочий прототип, задеплоенный проект, vibe-coding workflow.",
      tools: ["Cursor", "Windsurf", "V0", "Replit"]
    }
  ];

  return (
    <Section id="program">
      <Container>
        <FadeIn>
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">AI Lab (Main)</h2>
            <p className="text-text-muted text-lg">
              Не курс, а лаборатория с чёткой траекторией: за месяц собираешь работающую систему усиления интеллекта.
            </p>
            <div className="mt-6 font-mono text-sm bg-bg-alt inline-block px-4 py-2 rounded border border-border-subtle">
              промпт &gt;&gt; контекст &gt;&gt; мышление &gt;&gt; жизнь
            </div>
          </div>
        </FadeIn>

        <div className="grid gap-12">
          {weeks.map((week, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="group grid md:grid-cols-[1fr_3fr] gap-6 md:gap-12 pb-12 border-b border-border-subtle last:border-0 hover:bg-bg-alt/50 transition-colors p-6 -mx-6 rounded-2xl">
                <div className="font-mono text-text-muted">
                  <div className="text-4xl font-bold text-accent/20 mb-2 group-hover:text-accent transition-colors">{week.num}</div>
                  <div className="text-sm uppercase tracking-wider">{week.dates}</div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{week.title}</h3>
                  <div className="text-accent font-medium mb-4">{week.subtitle}</div>
                  <p className="text-text-main/80 mb-6 max-w-2xl">{week.desc}</p>
                  
                  <div className="grid sm:grid-cols-2 gap-6 text-sm">
                    <div>
                      <strong className="block text-text-main mb-1">Результат:</strong>
                      <span className="text-text-muted">{week.result}</span>
                    </div>
                    <div>
                      <strong className="block text-text-main mb-1">Инструменты:</strong>
                      <div className="flex flex-wrap gap-2">
                        {week.tools.map(tool => (
                          <span key={tool} className="bg-bg-alt border border-border-subtle px-2 py-1 rounded text-xs text-text-muted">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
};

const Tracks = () => (
  <Section id="tracks" className="bg-bg-alt">
    <Container>
      <FadeIn>
        <h2 className="text-3xl md:text-4xl mb-6">Специализированные треки</h2>
        <p className="text-text-muted text-lg max-w-2xl mb-16">
          Основная программа даёт фундамент. Треки — это углубление в конкретный домен. 
          Каждый трек: live-сессия, материалы, чат поддержки.
        </p>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          { title: "AI Coaching", date: "Неделя 1", desc: "Для тех, кто выгорел и ищет баланс. AI для коучинга и рефлексии." },
          { title: "AI Agents", date: "Неделя 2", desc: "Проектирование и запуск автономных AI-систем. MCP, n8n, Make." },
          { title: "Vibe-Coding", date: "Неделя 3", desc: "Творческое программирование. От идеи до прототипа за часы." },
          { title: "AI Creative", date: "Неделя 4", desc: "Для креативщиков. Генерация музыки, видео и визуального контента." }
        ].map((track, idx) => (
          <FadeIn key={idx} delay={idx * 0.1}>
            <div className="bg-bg-main p-8 rounded-2xl border border-border-subtle h-full hover:border-accent/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{track.title}</h3>
                <span className="text-xs font-mono bg-bg-alt px-2 py-1 rounded border border-border-subtle">{track.date}</span>
              </div>
              <p className="text-text-muted">{track.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Container>
  </Section>
);

const Cases = () => (
  <Section id="cases">
    <Container>
      <FadeIn>
        <h2 className="text-3xl md:text-4xl mb-12">Что создают участники?</h2>
      </FadeIn>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {[
          { title: "AI Coaching", desc: "AI-ассистент для коучинга и терапии с голосовым интерфейсом." },
          { title: "AI Vision", desc: "Автоматическая сортировка и теггинг визуального контента." },
          { title: "AI Summary", desc: "Транскрипция встреч, Action items, синхронизация с CRM." },
          { title: "AI Knowledge", desc: "RAG-система для Obsidian. Семантический поиск по заметкам." },
          { title: "AI Project", desc: "PM-ассистент. Мониторинг прогресса с автостатусами." },
          { title: "AI Automation", desc: "Email-триаж, CRM-обновления, документооборот." },
          { title: "AI Content", desc: "Создание контента с сохранением brand voice." },
          { title: "AI Dev", desc: "Code Review. Анализ PR, выявление багов и уязвимостей." },
          { title: "AI Support", desc: "Служба поддержки. Классификация тикетов, автоответы." }
        ].map((item, idx) => (
          <FadeIn key={idx} delay={idx * 0.05}>
            <div className="border-l border-border-subtle pl-6 hover:border-accent transition-colors">
              <h4 className="font-bold mb-2 text-lg">{item.title}</h4>
              <p className="text-sm text-text-muted">{item.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Container>
  </Section>
);

const Team = () => (
  <Section id="team" className="bg-bg-alt">
    <Container>
      <FadeIn>
        <h2 className="text-3xl md:text-4xl mb-16">Команда</h2>
      </FadeIn>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {[
          { name: "Александр Поваляев", role: "Founder, Strategist", desc: "15+ лет соединяет технологии, бизнес и людей. Поможет увидеть «большую картину»." },
          { name: "Сергей Хабаров", role: "System Architect", desc: "Ведет Context Engineering. Знает, как структурировать знания, чтобы AI с ними работал." },
          { name: "Степан Гершуни", role: "Tech Strategist", desc: "Автор cybOS. Инвестор в Cyber Fund. Пишет про будущее: AI, web3, технологии." },
          { name: "Алексей Иванов", role: "Executive Coach", desc: "ICF PCC, ex-дизайн лид. Ведет advanced-трек: AI-coaching." },
          { name: "Серёжа Рис", role: "AI Evangelist", desc: "Ex Yandex. Билдер и фаундер @vibecod3rs. Ведёт advanced-трек: vibe-coding." },
          { name: "Анна Ставенски", role: "Product Architect", desc: "Ведет Life Engineering. Поможет собрать инструменты в единую систему." },
        ].map((member, idx) => (
          <FadeIn key={idx} delay={idx * 0.1}>
            <div>
              <div className="w-12 h-12 bg-border-subtle rounded-full mb-4"></div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <div className="text-xs font-mono text-accent uppercase tracking-wider mb-3">{member.role}</div>
              <p className="text-sm text-text-muted">{member.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Container>
  </Section>
);

const Testimonials = () => (
  <Section id="testimonials">
    <Container>
      <FadeIn>
        <h2 className="text-3xl md:text-4xl mb-12">Отзывы</h2>
      </FadeIn>
      
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {[
          { text: "После лабы я понял: это не просто инструменты, а новый способ мышления. Я офигел, когда Cursor сам нашел решение проблемы.", author: "Сергей Петров", role: "Unix developer" },
          { text: "Я боялась, что это слишком сложно для нетехнического человека. Но через 3 недели я уже создавала агентов и автоматизации.", author: "Екатерина Грачева", role: "HR-коммуникации, Avito" },
          { text: "После первой лекции по вайб-кодингу я не мог уснуть до 6 утра. Побежал делать. Это было мощно.", author: "Антон Мормышев" },
          { text: "Создал парсер Jira через Cursor за 1 день. Задача, которая вручную заняла бы недели.", author: "Сергей Петров" },
          { text: "Я на 30% начала думать AI-first в работе. Качественно изменилась подготовка обучающих материалов.", author: "Александра Гусева", role: "L&D, Avito" },
          { text: "Это не классическое обучение. Это технологическая инициация – опыт прозрения и трансформации.", author: "Екатерина Грачева" },
          { text: "Мне казалось, что подключить Cursor к Obsidian – это неподъёмная задача. Саша сказал: «Просто открой папку». Я открыла. ВСЁ.", author: "Екатерина Грачева" }
        ].map((review, idx) => (
          <FadeIn key={idx} delay={0}>
            <div className="break-inside-avoid bg-bg-alt p-6 rounded-2xl border border-border-subtle">
              <p className="text-text-main/90 mb-4 italic">"{review.text}"</p>
              <div className="text-sm font-medium">{review.author}</div>
              {review.role && <div className="text-xs text-text-muted">{review.role}</div>}
            </div>
          </FadeIn>
        ))}
      </div>
    </Container>
  </Section>
);

const Pricing = () => (
  <Section id="pricing" className="bg-bg-alt">
    <Container>
      <FadeIn>
        <h2 className="text-3xl md:text-4xl mb-6">Варианты участия</h2>
        <p className="text-text-muted mb-12">Скидки: Alumni (-20%), Bring a Friend (-10%). Возврат после первой недели — без вопросов.</p>
      </FadeIn>

      <div className="grid lg:grid-cols-3 gap-8">
        {[
          { 
            name: "Main Lab", 
            price: "€590", 
            desc: "Базовый формат для самостоятельной работы", 
            features: ["4 live-воркшопа", "4 коворкинга + office hours", "Закрытый чат участников", "Демо-день и защита", "Доступ к библиотеке"],
            cta: "Выбрать Base"
          },
          { 
            name: "Advanced", 
            price: "€890", 
            desc: "Для тех, кто строит полный AI-стек", 
            features: ["Всё из Main Lab", "+4 Advanced трека", "Приоритетные Buddy slots", "Еженедельные разборы с менторами", "Приоритетная обратная связь"],
            cta: "Выбрать Advanced",
            highlight: true
          },
          { 
            name: "Premium", 
            price: "€1,490", 
            desc: "Индивидуальный маршрут (Limited)", 
            features: ["Всё из Advanced", "Индивидуальный план", "2 сессии 1:1 (стратегия)", "Аудит процессов", "Персональный канал поддержки"],
            cta: "Выбрать Premium"
          }
        ].map((plan, idx) => (
          <FadeIn key={idx} delay={idx * 0.1}>
            <div className={`relative h-full p-8 rounded-3xl border ${plan.highlight ? 'bg-bg-main border-accent shadow-lg' : 'bg-bg-alt border-border-subtle'} flex flex-col`}>
              {plan.highlight && <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">POPULAR</div>}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-3xl font-mono mb-4">{plan.price}</div>
              <p className="text-text-muted text-sm mb-8">{plan.desc}</p>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button href="https://join.aimindset.org/context" variant={plan.highlight ? 'primary' : 'secondary'} className="w-full">
                {plan.cta}
              </Button>
            </div>
          </FadeIn>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-text-muted text-sm mb-2">Нужно обучение для команды?</p>
        <a href="https://aimindset.org/ai-mindset-consulting" className="text-accent hover:underline font-medium">Узнать про Team Premium →</a>
      </div>
    </Container>
  </Section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const items = [
    { q: "Как проходит обучение?", a: "Обучение проходит в формате live-воркшопов, коворкингов и самостоятельной работы. Все записи сохраняются." },
    { q: "Сколько времени нужно уделять?", a: "Мы рекомендуем выделять 4-6 часов в неделю для прохождения материалов и выполнения заданий." },
    { q: "Нужны ли технические навыки?", a: "Нет, программа построена так, что подойдет как новичкам, так и опытным пользователям. Мы начинаем с основ." },
    { q: "Можно ли оплатить в рублях?", a: "Да, возможна оплата в рублях. Напишите нам для получения реквизитов." }
  ];

  return (
    <Section id="faq">
      <Container className="max-w-3xl">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl mb-12 text-center">FAQ</h2>
        </FadeIn>
        
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={idx} className="border-b border-border-subtle pb-4">
              <button 
                className="flex justify-between items-center w-full text-left py-2 font-medium text-lg hover:text-accent transition-colors"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                {item.q}
                <span className="text-2xl font-light ml-4">{openIndex === idx ? '−' : '+'}</span>
              </button>
              {openIndex === idx && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="overflow-hidden"
                >
                  <p className="text-text-muted py-2">{item.a}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center text-text-muted">
          Остались вопросы? Пиши основателю проекта <a href="https://t.me/alex_named" className="text-text-main underline hover:text-accent">@alex_named</a>
        </div>
      </Container>
    </Section>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-border-subtle bg-bg-alt text-sm text-text-muted">
    <Container>
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="space-y-4">
          <div className="text-text-main font-bold uppercase tracking-wider">AI Mindset</div>
          <p className="max-w-xs">Лаборатория нового мышления. Строим системы, которые работают на человека.</p>
        </div>
        
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-text-main mb-2">Контакты</h4>
          <a href="https://t.me/ai_mind_set" className="hover:text-accent">Telegram Channel</a>
          <a href="https://www.youtube.com/@A-I-Mindset" className="hover:text-accent">YouTube Podcast</a>
        </div>
        
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-text-main mb-2">Legal</h4>
          <a href="#" className="hover:text-accent">Договор-оферта</a>
          <a href="#" className="hover:text-accent">Политика конфиденциальности</a>
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-border-subtle/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>© AI Mindset 2026</div>
        <div className="text-xs">Designed with PULP UI principles</div>
      </div>
    </Container>
  </footer>
);

export default function PulpPage() {
  return (
    <div className="min-h-screen bg-bg-main text-text-main selection:bg-accent selection:text-white pulp-theme">
      <Header />
      <main>
        <Hero />
        <Philosophy />
        <Program />
        <Tracks />
        <Cases />
        <Team />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
