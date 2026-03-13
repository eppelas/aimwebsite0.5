import React from 'react';
import { motion } from 'framer-motion';

// --- Components ---

const DiagonalLine = ({ className }: { className?: string }) => (
  <div className={`absolute border-t border-[#B0B0B0] w-[200%] origin-bottom-left -rotate-45 pointer-events-none ${className}`} />
);

const BigLetter = ({ text }: { text: string }) => (
  <h2 className="text-6xl md:text-8xl font-light text-[#2A2A2A] tracking-tighter">
    {text}
  </h2>
);

const ContentBlock = ({ 
  title, 
  author, 
  desc, 
  linkText = "Читать",
  align = "left"
}: { 
  title?: string; 
  author?: string; 
  desc: string; 
  linkText?: string;
  align?: "left" | "right" 
}) => (
  <div className={`max-w-xs ${align === "right" ? "text-right ml-auto" : "text-left"}`}>
    <div className="text-sm font-serif leading-relaxed text-[#2A2A2A] mb-4">
      «{desc}»
      {author && <div className="mt-2 text-gray-500">{author}</div>}
    </div>
    <a href="#" className="inline-block border-b border-[#2A2A2A] text-sm pb-0.5 hover:opacity-50 transition-opacity">
      {linkText}
    </a>
  </div>
);

// --- Main Page ---

export default function DiagonalGridPage() {
  return (
    <div className="min-h-screen bg-[#F2F2F2] text-[#2A2A2A] font-sans overflow-hidden relative selection:bg-[#2A2A2A] selection:text-white">
      
      {/* Background Grid Lines */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        {/* We simulate the diagonal grid using a large SVG for better control */}
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="diagonal-grid" width="400" height="400" patternUnits="userSpaceOnUse">
              <path d="M-100,500 L500,-100" stroke="#A0A0A0" strokeWidth="0.5" fill="none" />
              <path d="M-100,-100 L500,500" stroke="#A0A0A0" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-grid)" />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 p-8 flex justify-between items-start z-50 text-xs uppercase tracking-widest font-medium">
        <div className="flex gap-8">
          <a href="#" className="hover:opacity-50">стынет</a>
          <a href="#" className="hover:opacity-50">авторы</a>
          <a href="#" className="hover:opacity-50">сесть за стол</a>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="/assets/ai-mindset-logo.png"
            alt="AI Mindset logo"
            className="h-4 w-auto object-contain opacity-80"
          />
          <span>AI MINDSET LAB W26</span>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="relative z-10 pt-32 pb-20 px-6 md:px-20 max-w-7xl mx-auto">
        
        {/* Section 1: Prompt */}
        <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
          <div className="relative">
             <ContentBlock 
               desc="AI как интерфейс мышления. Chain-of-Thought, Few-Shot Learning. Создание первых персональных ассистентов."
               author="Александр Поваляев"
             />
          </div>
          <div className="flex justify-center md:justify-start">
             <BigLetter text="P.E." />
          </div>
        </div>

        {/* Section 2: Context */}
        <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
          <div className="flex justify-center md:justify-end order-2 md:order-1">
             <BigLetter text="C.E." />
          </div>
          <div className="relative order-1 md:order-2">
             <ContentBlock 
               desc="Автоматизация и агенты. Управление контекстом: Obsidian + MCP + Claude."
               author="Сергей Хабаров"
             />
          </div>
        </div>

        {/* Section 3: Mind */}
        <div className="grid md:grid-cols-3 gap-12 items-center mb-32">
          <div className="col-span-1">
            <ContentBlock 
               desc="Продуктивность и ритуалы. AI для коучинга, рефлексии и трекинга привычек."
               author="Анна Лозицкая"
             />
          </div>
          <div className="col-span-1 flex justify-center">
            <BigLetter text="M.E." />
          </div>
          <div className="col-span-1 text-right">
             <div className="inline-block p-4 border border-[#2A2A2A] rounded-full hover:bg-[#2A2A2A] hover:text-white transition-colors cursor-pointer">
               <span className="text-xs uppercase">Save to Mind</span>
             </div>
          </div>
        </div>

        {/* Section 4: Life */}
        <div className="grid md:grid-cols-2 gap-20 items-center mb-40">
          <div className="flex justify-center md:justify-end">
             <BigLetter text="L.E." />
          </div>
          <div className="relative">
             <ContentBlock 
               desc="Творчество и реализация. Vibe-coding с Cursor. От идеи до прототипа."
               author="Анка Ставенски"
             />
          </div>
        </div>

        {/* Form Section ("Sit at the table") */}
        <div className="grid md:grid-cols-2 gap-12 border-t border-[#A0A0A0] pt-20">
          <div>
            <div className="text-sm font-serif max-w-xs mb-8">
              мы приглашаем вас за стол поделиться впечатлением от услышанных историй
            </div>
            {/* Sketchy Image Placeholder */}
            <div className="w-full aspect-square relative opacity-50 mix-blend-multiply">
               <svg viewBox="0 0 200 200" className="w-full h-full">
                 <path d="M50,150 Q40,100 60,80 Q80,60 100,70 Q120,80 110,130" fill="none" stroke="#A0A0A0" strokeWidth="1" />
                 <path d="M60,80 Q60,40 80,30 Q100,20 110,60" fill="none" stroke="#A0A0A0" strokeWidth="1" />
                 <path d="M100,150 L120,180" fill="none" stroke="#A0A0A0" strokeWidth="1" />
                 <circle cx="150" cy="150" r="20" fill="none" stroke="#A0A0A0" strokeWidth="1" />
               </svg>
            </div>
          </div>

          <div className="space-y-12">
            <div className="text-xs text-gray-400 max-w-xs">
              после заполнения формы ваш комментарий отобразится на главной проекта
            </div>

            <form className="space-y-12">
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-[#2A2A2A] py-2 focus:outline-none focus:border-black transition-colors"
                  placeholder=" "
                />
                <label className="absolute top-0 left-0 text-lg text-gray-500 pointer-events-none -translate-y-6">
                  Имя
                </label>
              </div>

              <div className="relative">
                <textarea 
                  rows={1}
                  className="w-full bg-transparent border-b border-[#2A2A2A] py-2 focus:outline-none focus:border-black transition-colors resize-none"
                  placeholder=" "
                />
                <label className="absolute top-0 left-0 text-lg text-gray-500 pointer-events-none -translate-y-6">
                  Ваши мысли
                </label>
              </div>

              <button className="w-full bg-[#2A2A2A] text-white py-6 rounded-full text-lg hover:bg-black transition-colors">
                Отправить
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
