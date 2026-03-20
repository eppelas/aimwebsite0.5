import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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
  const [currentPage, setCurrentPage] = useState(0);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemsPerPage = isMobile ? 2 : 3;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  // Reset page if it exceeds total pages after resize
  React.useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(0);
    }
  }, [totalPages, currentPage]);

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  const currentReviews = reviews.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

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

        {/* FEEDBACK GRID - MOBILE REFINEMENT (2 ITEMS, BRIGHTER DIVIDERS) */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${isMobile ? 'gap-0.5 bg-black/20' : 'gap-px bg-black/5'} border border-black/5 h-auto lg:h-[320px] overflow-hidden`}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPage}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="contents"
            >
              {currentReviews.map((review, idx) => (
                <div
                  key={review.id}
                  className={`group relative flex flex-col bg-[#f9f9f7] p-6 transition-all hover:bg-white ${isMobile ? 'h-[220px]' : 'h-[320px]'}`}
                >
                  {/* Card Header/ID */}
                  <div className={`flex justify-between items-center ${isMobile ? 'mb-2' : 'mb-6'}`}>
                    <span className="font-mono text-[9px] bg-black text-white px-1.5 py-0.5 tracking-tighter">
                      ID::{review.id}
                    </span>
                    <div className="flex gap-1.5">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-1 h-1 rounded-full bg-black/10 group-hover:bg-[#8DC63F]/40" />
                      ))}
                    </div>
                  </div>

                  {/* Quote - Scrollable if text overflows fixed height */}
                  <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                    <p className={`font-mono ${isMobile ? 'text-[11px]' : 'text-[12px] md:text-[13px]'} leading-relaxed mb-4 opacity-80 group-hover:opacity-100 transition-opacity whitespace-pre-line`}>
                      <span className="text-[#8DC63F] mr-1">{'»'}</span>
                      {review.quote}
                    </p>
                  </div>
                  
                  {/* Metadata - Dense */}
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
                      <motion.span 
                        whileHover={{ x: 3 }}
                        className="shrink-0 font-mono text-[10px] font-black text-[#8DC63F] uppercase tracking-tighter cursor-pointer"
                      >
                        {'LINK ->'}
                      </motion.span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* UNIFIED NAVIGATION - RECTANGULAR & CENTERED UNIT */}
        <div className="mt-8 flex items-center justify-center w-full">
          <div className="flex items-center gap-6 w-full max-w-2xl px-4">
            {/* Left Progress Line */}
            <div className="flex-1 h-px bg-black/5 relative overflow-hidden hidden md:block">
              <motion.div 
                animate={{ 
                  scaleX: currentPage === 0 ? 1 : 0,
                  originX: 1
                }}
                className="absolute inset-0 bg-[#8DC63F]/20"
              />
            </div>

            {/* Navigation Unit */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                aria-label="Previous reviews"
                onClick={prevPage}
                className="h-7 w-12 border border-black/5 bg-[#f9f9f7] flex items-center justify-center text-black/30 hover:text-black hover:bg-white transition-all group lg:w-16 h-8"
              >
                <span className="font-mono text-sm group-active:scale-95 transition-transform">{'<'}</span>
              </button>

              <div className="font-mono text-[11px] font-bold opacity-30 tracking-[0.2em] whitespace-nowrap min-w-[50px] text-center">
                {currentPage + 1} / {totalPages}
              </div>

              <button
                type="button"
                aria-label="Next reviews"
                onClick={nextPage}
                className="h-7 w-12 border border-black/5 bg-[#f9f9f7] flex items-center justify-center text-black/30 hover:text-black hover:bg-white transition-all group lg:w-16 h-8"
              >
                <span className="font-mono text-sm group-active:scale-95 transition-transform">{'>'}</span>
              </button>
            </div>

            {/* Right Progress Line */}
            <div className="flex-1 h-px bg-black/5 relative overflow-hidden hidden md:block">
              <motion.div 
                animate={{ 
                  scaleX: currentPage === 1 ? 1 : 0,
                  originX: 0
                }}
                className="absolute inset-0 bg-[#8DC63F]/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
