import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// --- Assets & Styles ---

const SummitFont = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    .font-summit { font-family: 'Inter', sans-serif; }
    
    .text-outline {
      -webkit-text-stroke: 1px #FF4D4D;
      color: transparent;
    }
    
    .text-outline-white {
      -webkit-text-stroke: 1px white;
      color: transparent;
    }

    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

// --- Components ---

const TiltedCard = () => (
  <motion.div 
    className="bg-[#FF4D4D] text-white p-6 w-64 h-80 absolute top-10 right-10 md:right-32 shadow-xl border border-white/20"
    initial={{ rotate: 5, y: 50, opacity: 0 }}
    whileInView={{ rotate: -5, y: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: "backOut" }}
  >
    <div className="grid grid-cols-2 h-full gap-px bg-white/20 border border-white/20">
      {['КУЛЬТУРА', 'КИНО', 'МЕДИА', 'ПОЛИТИКА', 'МОДА', 'ЕДА', 'ТЕХНОЛОГИИ', 'МУЗЫКА', 'УРБАНИСТИКА', 'ЭКОЛОГИЯ'].map((item, i) => (
        <div key={i} className="bg-[#FF4D4D] flex items-center justify-center p-2 text-[10px] uppercase tracking-wider font-medium hover:bg-white hover:text-[#FF4D4D] transition-colors cursor-default">
          {item}
        </div>
      ))}
    </div>
  </motion.div>
);

const FormField = ({ label, type = "text" }: { label: string, type?: string }) => (
  <div className="mb-6 group">
    <label className="block text-[#FF4D4D] text-sm uppercase mb-1 opacity-60 group-focus-within:opacity-100 transition-opacity">{label}</label>
    <input 
      type={type} 
      className="w-full border-b border-[#FF4D4D]/30 py-2 text-[#FF4D4D] bg-transparent focus:outline-none focus:border-[#FF4D4D] transition-colors font-medium text-lg"
    />
  </div>
);

// --- Main Page ---

export default function SummitZ8Page() {
  return (
    <div className="min-h-screen bg-white font-summit selection:bg-[#FF4D4D] selection:text-white overflow-x-hidden">
      <SummitFont />

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left: Red Block */}
        <div className="bg-[#FF4D4D] p-8 md:p-16 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="z-10">
            <h1 className="text-5xl md:text-7xl font-medium leading-tight mb-8">
              Каким будет<br />
              завтра?
            </h1>
            <h2 className="text-3xl md:text-5xl font-medium leading-tight opacity-80">
              What will tomorrow<br />
              be like?
            </h2>
          </div>
          
          <div className="z-10 mt-12">
            <div className="inline-block border border-white px-4 py-2 rounded-full uppercase text-sm tracking-widest hover:bg-white hover:text-[#FF4D4D] transition-colors cursor-pointer">
              Open Call
            </div>
          </div>

          {/* Decorative Circle */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 md:w-96 md:h-96 rounded-full border border-white/20" />
        </div>

        {/* Right: Info Block */}
        <div className="bg-white p-8 md:p-16 flex flex-col justify-center relative">
          <div className="max-w-md">
            <div className="flex justify-between items-baseline mb-12 border-b border-[#FF4D4D]/20 pb-4">
              <span className="text-[#FF4D4D] text-xl font-medium">О проекте</span>
              <span className="text-[#FF4D4D] text-xl underline decoration-1 underline-offset-4 cursor-pointer">Open Call</span>
            </div>

            <p className="text-[#FF4D4D] text-lg md:text-xl leading-relaxed mb-8">
              <span className="font-bold">22 августа 2020</span> в рамках Лета на «Стрелке» при поддержке Porsche Russland состоится <span className="font-bold">Summit Z8</span>.
            </p>
            <p className="text-[#FF4D4D] text-lg md:text-xl leading-relaxed mb-8">
              Представители поколения Z уже сегодня влияют на перемены в современном мире, а завтра будут полностью определять правила игры.
            </p>
            <p className="text-[#FF4D4D] text-lg md:text-xl leading-relaxed">
              «Афиша Daily» дает возможность молодым людям в возрасте от 18 до 25 лет быть услышанными и рассказать, каким будет завтрашний день.
            </p>
          </div>

          <TiltedCard />
        </div>
      </div>

      {/* Pattern Banner */}
      <div className="bg-white overflow-hidden py-12 md:py-24 border-y border-[#FF4D4D]">
        <div className="whitespace-nowrap flex animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="text-8xl md:text-[10rem] font-bold text-black leading-none mx-8 tracking-tighter">
              Z8 2020
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#FF4D4D]">
        <div className="p-8 md:p-16 border-b md:border-b-0 md:border-r border-[#FF4D4D] flex flex-col justify-center items-center text-center">
          <div className="text-6xl md:text-8xl font-bold text-black mb-4">Summit Z8</div>
          <div className="text-3xl md:text-5xl font-medium text-black">22 August, 2020</div>
          
          <svg className="w-full max-w-sm mt-8" viewBox="0 0 300 100">
            <ellipse cx="150" cy="50" rx="140" ry="40" fill="none" stroke="#FF4D4D" strokeWidth="4" transform="rotate(-5 150 50)" />
          </svg>
        </div>
        
        <div className="p-8 md:p-16 flex flex-col justify-between bg-[#FAFAFA]">
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-black pb-4">
              <span className="text-xl font-bold uppercase">афиша Daily</span>
              <ArrowRight className="w-6 h-6" />
            </div>
            <div className="flex justify-between items-center border-b border-black pb-4">
              <span className="text-xl font-bold uppercase">STRELKA</span>
              <ArrowRight className="w-6 h-6" />
            </div>
            <div className="flex justify-between items-center border-b border-black pb-4">
              <span className="text-xl font-bold uppercase">INSTITUTE</span>
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Open Call Form Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#FAFAFA]">
        {/* Left: Typography */}
        <div className="p-8 md:p-16 flex flex-col justify-between min-h-[50vh] lg:min-h-screen border-b lg:border-b-0 lg:border-r border-[#FF4D4D]">
          <div>
            <h2 className="text-6xl md:text-8xl font-medium text-outline uppercase leading-none mb-4">
              Open<br />Call
            </h2>
          </div>
          
          <div>
            <div className="text-6xl md:text-9xl font-medium text-outline tracking-tighter">
              1.06–<br />1.07
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="p-8 md:p-16 bg-white">
          <div className="max-w-md mx-auto">
            <h3 className="text-[#FF4D4D] text-xl md:text-2xl font-medium mb-12">
              в рамках секции «Будущее: Porsche x Afisha Daily».
            </h3>

            <form>
              <FormField label="ФИО" />
              <FormField label="Дата рождения" />
              <div className="mb-6">
                <label className="block text-[#FF4D4D] text-sm uppercase mb-1 opacity-60">Тема выступления</label>
                <select className="w-full border-b border-[#FF4D4D]/30 py-2 text-[#FF4D4D] bg-transparent focus:outline-none focus:border-[#FF4D4D] font-medium text-lg appearance-none">
                  <option>Выберите тему...</option>
                  <option>Экология</option>
                  <option>Технологии</option>
                  <option>Урбанистика</option>
                </select>
              </div>
              <FormField label="Место проживания" />
              <FormField label="Место обучения" />
              <FormField label="Телефон" />
              <FormField label="Email" type="email" />
              
              <button className="w-full bg-[#FF4D4D] text-white py-4 mt-8 text-lg font-medium hover:bg-[#E04444] transition-colors uppercase tracking-wide">
                Отправить
              </button>

              <div className="mt-8 text-[#FF4D4D] text-sm">
                По любым вопросам пишите на почту <a href="#" className="underline decoration-1 underline-offset-2">summitZ8@afisha.ru</a>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}
