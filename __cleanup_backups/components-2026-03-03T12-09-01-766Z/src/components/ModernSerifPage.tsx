import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const RotatingCircle = () => (
  <motion.div 
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
    className="relative w-[400px] h-[400px] md:w-[600px] md:h-[600px] flex items-center justify-center rounded-full"
  >
    <svg viewBox="0 0 300 300" className="w-full h-full">
      <defs>
        <path id="circlePath" d="M 150, 150 m -100, 0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0" />
      </defs>
      <text fill="currentColor" className="text-[24px] font-serif uppercase tracking-widest">
        <textPath href="#circlePath" startOffset="0%">
          Промпт • Контекст • Майнд • Лайф • Промпт • Контекст • Майнд • Лайф •
        </textPath>
      </text>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-9xl font-serif">+</span>
    </div>
  </motion.div>
);

const GlyphGrid = () => {
  const glyphs = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "&", "@", "#"
  ];

  return (
    <div className="grid grid-cols-8 md:grid-cols-13 gap-4 md:gap-8 font-serif text-xl md:text-2xl opacity-80">
      {glyphs.map((g, i) => (
        <div key={i} className="flex justify-center items-center hover:scale-150 transition-transform cursor-default">
          {g}
        </div>
      ))}
    </div>
  );
};

export default function ModernSerifPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="min-h-screen bg-[#F3F0E7] text-black font-serif overflow-hidden">
      
      {/* Header */}
      <header className="fixed top-0 w-full p-6 flex justify-between text-[10px] md:text-xs font-sans tracking-widest uppercase z-50 mix-blend-difference text-[#C490FF]">
        <div>AI Mindset Lab</div>
        <div>Batch W26</div>
        <div>Apply Now</div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-12 min-h-[80vh] flex flex-col justify-center items-center text-center">
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[18vw] leading-[0.8] font-medium tracking-tight mb-8"
        >
          Синтез
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-3xl text-[#C490FF] max-w-2xl font-light italic"
        >
          Современный взгляд на архитектуру<br/>искусственного интеллекта.
        </motion.p>
      </section>

      {/* Circular Section */}
      <section className="relative py-20 overflow-hidden flex justify-center items-center bg-[#F3F0E7]">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-[#F3F0E7]" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#C490FF]" />
        <div className="relative z-10 text-black mix-blend-multiply">
          <RotatingCircle />
        </div>
      </section>

      {/* Purple Section */}
      <section className="bg-[#C490FF] text-black px-4 md:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          
          {/* Big Year/Number */}
          <div className="relative mb-32">
            <span className="text-[20vw] leading-none font-medium opacity-20 select-none absolute -top-20 -left-10">
              2025
            </span>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 pt-20">
              <div className="font-sans text-sm md:text-base leading-relaxed max-w-md">
                <strong className="block mb-4 uppercase tracking-widest">Исторический контекст</strong>
                В 2025 году, после десятилетий узкой специализации, мы возвращаемся к универсальному знанию. Искусственный интеллект становится не просто инструментом, а экзокортексом — расширением человеческого разума.
              </div>
              <div className="font-serif text-3xl md:text-5xl leading-tight">
                Битва за внимание окончена. <br/>
                <span className="italic text-white">Началась эра смыслов.</span>
              </div>
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-32 border-t border-black/10 pt-12">
            <div>
              <h3 className="font-bold mb-4 text-lg">+ Промпт</h3>
              <p className="text-sm font-sans opacity-80">
                Искусство формулирования намерений. Переход от командной строки к диалогу с сущностью, обладающей контекстом всей человеческой культуры.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-lg">+ Контекст</h3>
              <p className="text-sm font-sans opacity-80">
                Управление знаниями. Создание персональных баз данных, которые питают нейросеть, превращая её из общего справочника в личного ассистента.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-lg">+ Майнд</h3>
              <p className="text-sm font-sans opacity-80">
                Когнитивная архитектура. Использование ИИ для рефлексии, планирования и преодоления когнитивных искажений.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-lg text-white italic">Нейро-Роман</h3>
              <p className="text-sm font-sans opacity-80">
                Новый стиль мышления, объединяющий логику алгоритмов и интуицию человека. Гибридный интеллект.
              </p>
            </div>
          </div>

          {/* Glyph Grid */}
          <div className="border-t border-black/10 pt-12">
            <GlyphGrid />
          </div>

        </div>
      </section>

      {/* Footer */}
      <section className="bg-[#F3F0E7] py-24 px-4 md:px-12 flex flex-col items-center text-center">
        <div className="w-48 h-48 bg-black rounded-full flex items-center justify-center text-white p-8 mb-12 hover:scale-105 transition-transform cursor-pointer">
          <div className="text-center">
            <div className="text-sm font-sans uppercase tracking-widest mb-2 text-[#C490FF]">Внимание</div>
            <div className="font-serif text-xl leading-tight">
              Вы входите в зону<br/>глубокого погружения
            </div>
            <div className="mt-4 text-2xl">↓</div>
          </div>
        </div>
        
        <h2 className="text-[10vw] leading-none font-serif mb-8">
          AI Mindset
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8 font-sans text-xs uppercase tracking-widest">
          <a href="#" className="hover:text-[#C490FF] transition-colors">Instagram</a>
          <a href="#" className="hover:text-[#C490FF] transition-colors">Telegram</a>
          <a href="#" className="hover:text-[#C490FF] transition-colors">Apply for W26</a>
        </div>
      </section>

    </div>
  );
}
