import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// --- Components ---

const TopBar = () => (
  <div className="w-full border-b-2 border-black py-2 px-4 md:px-8 grid grid-cols-2 md:grid-cols-5 gap-4 text-[10px] md:text-xs font-medium uppercase tracking-tight leading-tight">
    <div className="hidden md:block">
      AI Mindset Lab<br/>
      Batch W26
    </div>
    <div className="hidden md:block">
      Документация процесса<br/>
      Системная Архитектура
    </div>
    <div className="hidden md:block">
      Теоретико-практическое исследование<br/>
      Взаимозависимость: Человек и ИИ
    </div>
    <div className="hidden md:block">
      Академия Нового Мышления<br/>
      Глобальный Кампус
    </div>
    <div className="col-span-2 md:col-span-1 flex justify-between md:block">
      <span>Статус: Набор открыт</span>
      <span className="md:hidden">W26</span>
    </div>
  </div>
);

const TableHeader = () => (
  <div className="w-full border-b-2 border-black py-2 px-4 md:px-8 grid grid-cols-12 gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 sticky top-0 bg-white z-10">
    <div className="col-span-2 md:col-span-1">No°</div>
    <div className="col-span-10 md:col-span-5">Раздел</div>
    <div className="hidden md:block md:col-span-6">Название / Описание</div>
  </div>
);

const TableRow = ({ 
  num, 
  section, 
  title, 
  description, 
  note 
}: { 
  num: string; 
  section: string; 
  title: string; 
  description: string;
  note?: string;
}) => {
  return (
    <motion.div 
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group w-full border-b border-black grid grid-cols-12 gap-4 px-4 md:px-8 py-8 md:py-12 cursor-pointer transition-colors duration-300 hover:bg-black hover:text-white relative overflow-hidden"
    >
      {/* Number */}
      <div className="col-span-2 md:col-span-1 font-medium text-4xl md:text-6xl tracking-tighter leading-none">
        {num}
      </div>

      {/* Section */}
      <div className="col-span-10 md:col-span-5 flex flex-col justify-center">
        <h2 className="text-4xl md:text-7xl font-medium tracking-tighter leading-[0.9] uppercase break-words">
          {section}
        </h2>
        {note && (
          <div className="mt-2 text-xs font-mono max-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity delay-100">
            (*) {note}
          </div>
        )}
      </div>

      {/* Title / Desc (Desktop) */}
      <div className="col-span-12 md:col-span-6 flex flex-col justify-between mt-4 md:mt-0 pl-0 md:pl-8 border-l-0 md:border-l border-transparent group-hover:border-white/20 transition-colors">
        <div>
          <h3 className="text-xl md:text-3xl font-medium uppercase mb-2 leading-tight">
            {title}
          </h3>
          <p className="text-sm md:text-base opacity-70 max-w-md leading-relaxed">
            {description}
          </p>
        </div>
        <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
          <span className="text-xs font-mono uppercase">Изучить модуль</span>
          <ArrowUpRight size={16} />
        </div>
      </div>
    </motion.div>
  );
};

const Marquee = () => (
  <div className="overflow-hidden border-b-2 border-black py-4 bg-black text-white">
    <motion.div 
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      className="whitespace-nowrap flex gap-8 text-sm font-mono uppercase tracking-widest"
    >
      {[...Array(10)].map((_, i) => (
        <React.Fragment key={i}>
          <span>Промпт-инжиниринг</span>
          <span>•</span>
          <span>Контекст-инжиниринг</span>
          <span>•</span>
          <span>Майнд-инжиниринг</span>
          <span>•</span>
          <span>Лайф-инжиниринг</span>
          <span>•</span>
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

// --- Main Page ---

export default function SwissInternationalPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      
      {/* Navigation / Brand */}
      <div className="p-4 md:p-8 flex justify-between items-end">
        <h1 className="text-5xl md:text-9xl font-bold tracking-tighter leading-[0.8] uppercase">
          AI Mindset<br/>
          Lab W26
        </h1>
        <div className="hidden md:block text-right">
          <div className="text-xs font-bold uppercase tracking-widest mb-1">Даты</div>
          <div className="text-xl">19 ЯНВ — 16 ФЕВ</div>
        </div>
      </div>

      <TopBar />
      <TableHeader />

      {/* Table Content */}
      <div className="flex flex-col">
        <TableRow 
          num="01" 
          section="ПРОМПТ" 
          title="Инжиниринг / ИИ как Интерфейс"
          description="От хаотичных запросов к структурированному диалогу. Мастерство Chain-of-Thought и Few-Shot Learning. Переход от пользователя к архитектору."
          note="Архитектура диалога."
        />
        <TableRow 
          num="02" 
          section="КОНТЕКСТ" 
          title="Инжиниринг / Автоматизация и Агенты"
          description="Создание 'второго мозга'. Obsidian + MCP. Автономные воркфлоу на n8n. Превращение базы знаний в активного агента."
          note="От хранения к действию."
        />
        <TableRow 
          num="03" 
          section="МАЙНД" 
          title="Инжиниринг / Продуктивность и Ритуалы"
          description="ИИ для коучинга и рефлексии. Проектирование личных ритуалов с обратной связью. Когнитивная аугментация."
          note="Расширение сознания."
        />
        <TableRow 
          num="04" 
          section="ЛАЙФ" 
          title="Инжиниринг / Творчество и Реализация"
          description="Вайб-кодинг с Cursor. Прототипирование и деплой идей с нуля. Смерть фразы 'я не умею кодить'."
          note="Техническая свобода."
        />
        <TableRow 
          num="05" 
          section="ФИНАЛ" 
          title="Демо-День / Защита проектов"
          description="Публичная защита личных операционных систем и артефактов, созданных в лаборатории."
          note="Презентация артефактов."
        />
      </div>

      <Marquee />

      {/* Footer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-16">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Манифест</h4>
          <p className="text-xl md:text-2xl font-medium leading-tight max-w-xl">
            Мы не просто изучаем инструменты. Мы строим новую операционную систему для жизни и работы. От хаоса к структуре. От потребителя к творцу.
          </p>
        </div>
        <div className="flex flex-col justify-between items-start md:items-end">
          <div className="text-right hidden md:block">
            <div className="text-xs font-bold uppercase tracking-widest mb-1">Локация</div>
            <div>Worldwide / Online</div>
          </div>
          <button className="mt-8 md:mt-0 bg-black text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#FF3300] transition-colors w-full md:w-auto">
            Подать заявку на W26
          </button>
        </div>
      </div>

    </div>
  );
}
