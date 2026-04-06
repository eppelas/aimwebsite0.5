import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined | null)[]) => classes.filter(Boolean).join(' ');

interface Review {
  id: string;
  name: string;
  role: string;
  quote: string;
  tg: string;
}

interface ReviewsSectionProps {
  mode?: 'default' | 'live';
}

const reviews: Review[] = [
  {
    id: "01",
    name: "Дмитрий Твердохлебов",
    role: "EX-ДИРЕКТОР ИИ МТС | EX-CPO AI VK",
    quote: "снова иду учиться к упоротым на практике чувакам из AI Mindset. Все, как мы любим: 20% теории, 80% практики. Дипломы не дают, выпускников на работу не устраивают.",
    tg: "tg ->"
  },
  {
    id: "02",
    name: "Дмитрий Лаухин",
    role: "ЕВАНГЕЛИСТ OBSIDIAN | SECOND BRAIN",
    quote: "Редко что-то советую от себя, но здесь тот самый случай. AI вплетается в жизнь не как магический инструмент, а как часть системы мышления. Это не про хайп.",
    tg: "tg ->"
  },
  {
    id: "03",
    name: "Оля Еремина",
    role: "ПРЕДПРИНИМАТЕЛЬ",
    quote: "использовать ИИ – это не писать промпт. Использовать ИИ – это самому создавать контекст. За то, что они говорят на понятном языке.",
    tg: "tg ->"
  },
  {
    id: "04",
    name: "Олег Цербаев",
    role: "ИСТОРИК | APPLE / AVITO / DEUTSCHE BANK",
    quote: "Был удивлен. Сильно. Ребята нашли уникальную нишу, стиль и интонацию, которые предельно точно попадают в нерв сегодняшнего и завтрашнего дня.",
    tg: "tg ->"
  },
  {
    id: "05",
    name: "Вероника Долгих",
    role: "COO | SETTERS AGENCY",
    quote: "я офигела, как клод четко прописал мне схему планирования, чтобы не выпадать из режима, избегать выгораний. оооочень круто вытащил поведенческие паттерны.",
    tg: "tg ->"
  },
  {
    id: "06",
    name: "Александра Гусева",
    role: "L&D | AVITO",
    quote: "Произошел shift. Я на 30% начала думать AI-first: где я могу ускориться за счет того, что AI начнет помогать. Это реально меняет продуктивность.",
    tg: "tg ->"
  },
  {
    id: "07",
    name: "Иван Смирнов",
    role: "HEAD OF PRODUCT | OZONE",
    quote: "Очень крутой подход к обучению. Без воды, сразу в дело. Поменял свой воркфлоу полностью за две недели. Рекомендую.",
    tg: ""
  },
  {
    id: "08",
    name: "Екатерина Лебедева",
    role: "DESIGN LEAD",
    quote: "Сначала думала, что это очередной курс по промптам, но оказалась глубокая перестройка процессов. Теперь вместо того, чтобы рисовать интерфейсы с нуля, мы собираем логику с ИИ, а потом докручиваем. Экономит кучу времени.",
    tg: "tg ->"
  },
  {
    id: "09",
    name: "Алексей Соколов",
    role: "ОСНОВАТЕЛЬ СТАРТАПА",
    quote: "Невероятно полезный курс. Окупился в первый же день. Мы автоматизировали часть саппорта и маркетинга, которую собирались отдавать на аутсорс. Ребята просто дали систему, как думать правильно.",
    tg: "tg ->"
  },
  {
    id: "10",
    name: "Мария Волкова",
    role: "MARKETING MANAGER",
    quote: "Полезно, но сложно. Нужно быть готовым к интенсивной нагрузке. Если вы ищете легкий контент 'послушать на фоне' – это не сюда. Здесь придется работать головой.",
    tg: ""
  },
  {
    id: "11",
    name: "Антон Медведев",
    role: "FULLSTACK DEVELOPER",
    quote: "Пришел за конкретикой по агентам, получил даже больше. Отличный фреймворк для быстрого прототипирования новых идей. AI Mindset действительно меняет фокус с написания кода на решение задачи бизнеса.",
    tg: "tg ->"
  },
  {
    id: "12",
    name: "Юлия Морозова",
    role: "CONTENT STRATEGIST",
    quote: "Ребята, это просто пушка. Вся рутина по генерации текстов ушла. Теперь я занимаюсь только стратегией, а нейронки работают по моим шаблонам и Tone of Voice.",
    tg: ""
  }
];

export const ReviewsSection = ({ mode = 'default' }: ReviewsSectionProps) => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);
  const isLiveMode = mode === 'live';

  const toggleExpanded = () => {
    if (isExpanded) {
      if (!isMobile && sectionRef.current) {
        const yOffset = sectionRef.current.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: yOffset, behavior: 'smooth' });
      }
      if (isMobile) {
        setIsExpanded(false);
      } else {
        // Wait for smooth scroll to finish before removing elements from the flow
        setTimeout(() => {
          setIsExpanded(false);
        }, 400);
      }
    } else {
      setIsExpanded(true);
      if (!isMobile) {
        // Wait for React to render the extra elements before scrolling
        setTimeout(() => {
          if (sectionRef.current) {
            const yOffset = sectionRef.current.getBoundingClientRect().top + window.scrollY - 50;
            window.scrollTo({ top: yOffset, behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const previewCount = isMobile ? 2 : 3;
  const visibleReviews = isExpanded ? reviews : reviews.slice(0, previewCount);
  const renderLiveRole = (role: string) => role;

  return (
    <section id="reviews" ref={sectionRef} className="py-20 px-6 md:px-24 bg-[#f9f9f7] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* REFINED HEADER - MOBILE CLEANUP */}
        <div className="mb-20 flex items-end gap-4 md:gap-10">
          <div className="text-[11px] md:text-[13px] font-bold uppercase tracking-[0.2em] opacity-40 shrink-0 mb-[0.15rem] md:mb-[0.25rem]">
            <span className="hidden sm:inline">[06] </span>
            FEEDBACK_LOG
            <span className="hidden sm:inline"> // 2026</span>
          </div>
          <div className="h-px flex-1 bg-black/10 mb-[0.45rem] md:mb-[0.75rem]" />
          <div className="font-black uppercase tracking-widest text-2xl md:text-5xl/none text-right">
            ОТЗЫВЫ
          </div>
        </div>

        <div
          className={`transition-all duration-500 w-full ${
            isExpanded 
              ? 'columns-1 md:columns-3 lg:columns-4 gap-4 md:gap-5' 
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5'
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div 
              key={isExpanded ? 'expanded' : 'collapsed'}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="contents"
            >
              {visibleReviews.map((review) => (
                <div
                  key={review.id}
                  className={`group relative flex flex-col justify-between transition-all ${
                    isExpanded
                      ? isLiveMode
                        ? 'break-inside-avoid mb-3 md:mb-4 h-auto border border-transparent bg-transparent px-3 py-3 md:px-4 md:py-4 lg:px-5 lg:py-5 hover:border-black/10 hover:bg-white hover:shadow-[0_14px_32px_rgba(0,0,0,0.04)]'
                        : 'break-inside-avoid mb-4 md:mb-5 h-auto bg-white px-5 py-5 md:px-6 md:pt-6 md:pb-5 lg:px-8 lg:pt-8 lg:pb-6 border border-black/5 hover:border-black/10 hover:shadow-sm'
                      : 'h-full bg-white px-5 py-5 md:px-6 md:pt-6 md:pb-5 lg:px-8 lg:pt-8 lg:pb-6 border border-black/5 hover:border-black/10 hover:shadow-sm'
                  }`}
                >
                  <div className={`flex justify-between items-start gap-3 ${isExpanded ? (isLiveMode ? 'mb-2.5' : 'mb-3') : 'mb-2'}`}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/5 overflow-hidden relative">
                        <img 
                          src={`https://i.pravatar.cc/150?u=AIMindsetReview${review.id}`} 
                          alt={review.name}
                          className="w-full h-full object-cover grayscale mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity" 
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="font-mono text-[9px] bg-black text-white px-2 py-0.5 tracking-wider uppercase font-bold text-left inline-block">
                          {review.name}
                        </span>
                      </div>
                    </div>
                    <div className="font-mono text-[10px] sm:text-[11px] font-black tracking-widest text-black/15 group-hover:text-[#8DC63F] transition-colors select-none">
                      ///
                    </div>
                  </div>

                  <div className="flex-grow">
                    <p className={`font-mono ${isExpanded ? 'text-[13px] md:text-[14px]' : isMobile ? 'text-[13px]' : 'text-[12px] md:text-[13px]'} ${isExpanded && isLiveMode ? 'mb-3' : 'mb-4'} leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity whitespace-pre-line`}>
                      <span className="text-[#8DC63F] mr-1">{'»'}</span>
                      {review.quote}
                    </p>
                  </div>
                  
                  <div className={`mt-auto border-t border-dashed border-black/10 ${isExpanded && isLiveMode ? 'pt-3' : 'pt-4'}`}>
                    <div className={isExpanded && isLiveMode ? 'flex flex-col items-start gap-1 text-left' : 'flex justify-between items-end gap-3 text-left'}>
                      <div className="min-w-0 flex-1">
                        <p className={cn(
                          "font-mono text-[11px] md:text-[10px] uppercase tracking-[0.02em] leading-tight text-black/40 line-clamp-2",
                          isExpanded && isLiveMode && "text-[11px] md:text-[10px] text-black/50"
                        )}>
                          {`[ ${review.role} ]`}
                        </p>
                      </div>
                      {review.tg && (
                        isLiveMode ? (
                          <a
                            href="https://t.me/ai_mind_set"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-fit items-center self-end rounded-[999px] border border-transparent bg-transparent px-2 py-1 font-mono text-[10px] font-black uppercase tracking-tighter text-[#8DC63F] transition-colors group-hover:bg-[#dfffaa]/70 group-hover:text-[#5d831f] hover:text-[#5d831f]"
                          >
                            <span>{review.tg}</span>
                          </a>
                        ) : (
                          <span className="shrink-0 font-mono text-[10px] font-black text-[#8DC63F] uppercase tracking-tighter">
                            {review.tg}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="mt-10 flex items-center justify-center w-full">
          <button
            type="button"
            onClick={toggleExpanded}
            className="group flex flex-row items-center justify-center gap-3 border border-black/10 bg-transparent px-8 py-3 transition-colors hover:border-black/60 hover:bg-transparent text-black/60 min-w-0"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Свернуть отзывы' : 'Открыть все отзывы'}
          >
            <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] transition-colors">
              {isExpanded ? 'свернуть отзывы' : 'открыть все отзывы'}
            </span>
            <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
