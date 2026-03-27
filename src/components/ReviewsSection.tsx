import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  role: string;
  quote: string;
  tg: string;
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
  }
];

export const ReviewsSection = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const previewCount = isMobile ? 2 : 3;
  const visibleReviews = isExpanded ? reviews : reviews.slice(0, previewCount);

  const expandedLayoutClass = (idx: number) => {
    const variants = [
      'md:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[24rem]',
      'md:col-span-2 lg:col-span-1 min-h-[19rem]',
      'md:col-span-2 lg:col-span-2 min-h-[22rem]',
      'md:col-span-2 lg:col-span-1 min-h-[18rem]',
      'md:col-span-2 lg:col-span-1 min-h-[20rem]',
      'md:col-span-4 lg:col-span-2 min-h-[18rem]',
    ];

    return variants[idx % variants.length];
  };

  return (
    <section id="reviews" className="py-20 px-6 md:px-24 bg-[#f9f9f7] overflow-hidden">
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
          className={`grid grid-cols-1 md:grid-cols-2 ${
            isExpanded ? 'lg:grid-cols-4 auto-rows-[minmax(12rem,auto)] gap-3 md:gap-4' : 'lg:grid-cols-3 gap-0.5 md:gap-px'
          } ${isExpanded ? '' : 'bg-black/5 border border-black/5'} h-auto overflow-hidden transition-all duration-500`}
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
              {visibleReviews.map((review, idx) => (
                <div
                  key={review.id}
                  className={`group relative flex flex-col bg-[#f9f9f7] p-6 md:p-7 transition-all hover:bg-white border border-black/5 ${
                    isExpanded
                      ? expandedLayoutClass(idx)
                      : isMobile
                        ? 'min-h-[220px]'
                        : 'min-h-[320px]'
                  }`}
                >
                  <div className={`flex justify-between items-start gap-4 ${isExpanded ? 'mb-5' : isMobile ? 'mb-2' : 'mb-6'}`}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-black/68">
                        {review.name
                          .split(' ')
                          .slice(0, 2)
                          .map((part) => part[0])
                          .join('')}
                      </div>
                      <span className="font-mono text-[9px] bg-black text-white px-1.5 py-0.5 tracking-tighter">
                      ID::{review.id}
                      </span>
                    </div>
                    <div className="flex gap-1.5">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-1 h-1 rounded-full bg-black/10 group-hover:bg-[#8DC63F]/40" />
                      ))}
                    </div>
                  </div>

                  <div className={`flex flex-wrap gap-2 ${isExpanded ? 'mb-5' : 'mb-4'}`}>
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/36">
                      feedback log
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#8DC63F]">
                      practice-first
                    </span>
                  </div>

                  <div className="flex-grow">
                    <p className={`font-mono ${isExpanded ? 'text-[12px] md:text-[14px]' : isMobile ? 'text-[11px]' : 'text-[12px] md:text-[13px]'} leading-relaxed mb-4 opacity-80 group-hover:opacity-100 transition-opacity whitespace-pre-line`}>
                      <span className="text-[#8DC63F] mr-1">{'»'}</span>
                      {review.quote}
                    </p>
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-dashed border-black/10">
                    <div className="flex justify-between items-end gap-4 text-left">
                      <div className="min-w-0">
                        <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider truncate mb-0.5">
                          {review.name}
                        </h3>
                        <p className="font-mono text-[9px] opacity-40 uppercase tracking-tight truncate">
                          {`[ ${review.role} ]`}
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-[10px] font-black text-[#8DC63F] uppercase tracking-tighter">
                        {review.tg}
                      </span>
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
            onClick={() => setIsExpanded((prev) => !prev)}
            className="group flex flex-col items-center gap-3 text-black/42 hover:text-black transition-colors"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Свернуть отзывы' : 'Открыть все отзывы'}
          >
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em]">
              {isExpanded ? 'свернуть отзывы' : 'открыть все отзывы'}
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white group-hover:border-black/24 group-hover:bg-black group-hover:text-white transition-all">
              <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
