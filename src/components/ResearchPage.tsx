import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Menu, X, Database, Globe, BrainCircuit } from 'lucide-react';
import { DesktopSidebar } from './DesktopSidebar';

const SectionLabel = ({ text, number }: { text: string, number?: string }) => (
  <div className="flex items-center gap-4 mb-20">
    <div className="text-[10px] font-black tracking-[0.4em] opacity-30 uppercase">{number || '00'} // SECTION</div>
    <div className="h-[1px] flex-grow bg-black/10" />
    <div className="text-[10px] font-black tracking-[0.4em] uppercase opacity-80">{text}</div>
  </div>
);

const EditorialSectionHeader = ({ eyebrow, title, className = "" }: { eyebrow: string; title: string; className?: string }) => (
  <div className={`flex items-end gap-3 md:gap-8 mb-16 ${className}`}>
    <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 shrink-0 mb-[0.35rem]">{eyebrow}</div>
    <div className="h-px min-w-[20px] flex-1 bg-black/10 mb-[0.55rem]" />
    <div className="font-black uppercase tracking-tighter text-2xl md:text-5xl text-right shrink-0 leading-[0.9]">{title}</div>
  </div>
);

export default function ResearchPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobileMenuOpen]);

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] font-sans text-black selection:bg-[#8DC63F] selection:text-black">
      
      <DesktopSidebar />

      <main className="flex-1 w-full min-w-0 bg-[#FAFAFA]">
        
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-6 border-b border-black/10 sticky top-0 bg-[#FAFAFA]/90 backdrop-blur-md z-40">
           <div className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-black" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                 <path d="M12 3V21" stroke="currentColor" strokeWidth="2" />
                 <circle cx="8" cy="12" r="1.5" fill="currentColor" />
                 <path d="M16 12C16 10.5 15 9.5 15 9.5M16 12C16 13.5 15 14.5 15 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="font-black tracking-tighter text-[12px] uppercase">AI MINDSET</span>
           </div>
           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 border border-black/10 rounded-full">
             {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
           </button>
        </div>

        {/* Hero Section */}
        <section className="min-h-[85vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24 relative overflow-hidden border-b border-black/10">
           <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#8DC63F]/10 blur-[100px] pointer-events-none" />
           
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="max-w-4xl relative z-10"
           >
             <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-white/50 rounded-[4px] border border-black/10 backdrop-blur-sm shadow-sm">
               <div className="w-2 h-2 rounded-[2px] bg-black animate-pulse" />
               <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold opacity-60">
                 Experimental Lab
               </span>
             </div>

             <h1 className="text-[56px] md:text-[80px] lg:text-[120px] font-black uppercase leading-[0.8] tracking-tighter mb-12">
               AI MINDSET <br/>
               <span className="text-black/20 block mt-2 text-[48px] md:text-[72px] lg:text-[96px]">{'{RESEARCH}'}</span>
             </h1>

             <p className="text-xl md:text-3xl opacity-80 max-w-2xl leading-[1.3] font-medium tracking-tight mb-8">
               Экспериментальная лаборатория на стыке искусственного интеллекта и когнитивистики.
             </p>
             
             <p className="text-sm md:text-base opacity-60 max-w-xl leading-relaxed font-mono">
               Мы исследуем, как AI меняет паттерны мышления, привычки и рабочие процессы людей. Мы не просто пишем код, мы изучаем психофизиологию взаимодействия человека с машиной.
             </p>

             <div className="mt-16">
               <a href="http://t.me/prod_ai_mind_set_bot?start=Research" target="_blank" className="inline-flex items-center gap-4 bg-black text-white px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black/80 hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-[2px] group">
                 СТАТЬ ЧАСТЬЮ КОМАНДЫ
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </a>
             </div>
           </motion.div>
        </section>

        {/* Vectors of Research */}
        <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
           <div className="max-w-[1200px] mx-auto w-full">
             <SectionLabel text="Исследовательские векторы" number="01" />
             <EditorialSectionHeader eyebrow="НАШ ФОКУС" title="НАПРАВЛЕНИЯ" />

             <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-16">
               {[
                 {
                   icon: <BrainCircuit className="w-8 h-8 opacity-40 mb-6" />,
                   title: 'AI как когнитивный процесс',
                   desc: 'Изучение влияния LLM на нейропластичность и способность к самостоятельному решению проблем.',
                   tag: 'Cognitive'
                 },
                 {
                   icon: <Database className="w-8 h-8 opacity-40 mb-6" />,
                   title: 'Технологии расширения интеллекта',
                   desc: 'Прототипирование инструментов для экзокортекса: автономные агенты, RAG-системы для персональных баз знаний.',
                   tag: 'Engineering'
                 },
                 {
                   icon: <Globe className="w-8 h-8 opacity-40 mb-6" />,
                   title: 'Психофизиология взаимодействия',
                   desc: 'Исследование эмоциональной привязанности к AI, снижение уровня стресса при передаче рутины алгоритмам.',
                   tag: 'Psychology'
                 }
               ].map((item, idx) => (
                 <div key={idx} className="bg-white border border-black/10 p-10 rounded-sm hover:-translate-y-1 transition-transform shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col">
                   {item.icon}
                   <div className="text-[10px] font-mono tracking-widest text-black/50 font-bold uppercase mb-4">{item.tag} // 0{idx+1}</div>
                   <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-[1.1] mb-4">{item.title}</h3>
                   <p className="opacity-70 text-sm leading-relaxed mt-auto font-medium">{item.desc}</p>
                 </div>
               ))}
             </div>
           </div>
        </section>

        {/* Current Projects */}
        <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-white border-y border-black/10">
           <div className="max-w-[1200px] mx-auto w-full">
             <SectionLabel text="Актуальные проекты" number="02" />
             <EditorialSectionHeader eyebrow="R&D LAB" title="ТЕКУЩИЕ ИССЛЕДОВАНИЯ" />

             <div className="flex flex-col gap-4 mt-16">
               {[
                 {
                   title: 'Neuro-AI Синтез',
                   status: 'Active',
                   category: 'Bio/Tech',
                   desc: 'Исследование связи биоритмов и эффективности AI-подсказок. Анализируем данные с пульсометров во время сессий программирования с AI.',
                   timeline: 'Q1-Q3 2026'
                 },
                 {
                   title: 'Vibe Coding Patterns',
                   status: 'Data Gathering',
                   category: 'Development',
                   desc: 'Масштабный сбор данных о том, как эмоциональное состояние влияет на генерацию кода и взаимодействие с AI-ассистентами.',
                   timeline: 'Q2 2026'
                 },
                 {
                   title: 'Collective Intelligence',
                   status: 'Prototyping',
                   category: 'Agents',
                   desc: 'Построение ролевых моделей мульти-агентных систем для решения креативных задач дизайн-команд.',
                   timeline: 'Q3-Q4 2026'
                 }
               ].map((project, idx) => (
                 <div key={idx} className="flex flex-col md:flex-row group bg-[#FAFAFA] border border-black/10 hover:border-black/30 transition-colors rounded-[2px] overflow-hidden">
                   {/* Abstract ASCII representation block on left */}
                   <div className="hidden md:flex w-48 bg-black/5 border-r border-black/10 items-center justify-center font-mono opacity-20 text-[8px] leading-[8px] p-6 whitespace-pre overflow-hidden group-hover:bg-[#8DC63F]/10 group-hover:text-[#8DC63F] group-hover:opacity-100 transition-all duration-500">
                      {`
01001010
11010101
00101010
10101011
01011100
11001010
                      `}
                   </div>
                   
                   <div className="flex-1 p-8 flex flex-col lg:flex-row gap-8 lg:items-center justify-between relative">
                     <div className="flex-1">
                       <div className="flex items-center gap-3 mb-3">
                         <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-black/40">{project.category}</span>
                         <span className="w-1.5 h-1.5 bg-[#8DC63F] rounded-[1px]" />
                         <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#8DC63F]">{project.status}</span>
                       </div>
                       <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 pr-4">{project.title}</h3>
                       <p className="text-sm opacity-60 max-w-xl font-medium leading-relaxed">{project.desc}</p>
                     </div>

                     <div className="hidden lg:flex w-48 flex-col items-end text-right border-l border-black/10 pl-8">
                       <div className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold opacity-40 mb-2">TIMELINE</div>
                       <div className="font-bold">{project.timeline}</div>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </section>

        {/* Action Panel */}
        <section className="py-32 px-6 md:px-16 lg:px-24">
           <div className="max-w-[1200px] mx-auto bg-black text-[#FAFAFA] p-12 md:p-20 flex flex-col md:flex-row justify-between items-center gap-12 rounded-[2px] relative overflow-hidden">
             
             {/* Diagonal stripe BG pattern */}
             <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #ffffff 10px, #ffffff 11px)' }} />

             <div className="relative z-10 max-w-xl">
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
                 ПРИСОЕДИНИТЬСЯ К ИССЛЕДОВАНИЯМ
               </h2>
               <p className="opacity-60 text-sm md:text-base font-medium max-w-md leading-relaxed font-mono">
                 Мы открыты к коллаборациям с университетами, лабораториями и независимыми исследователями.
               </p>
             </div>
             
             <div className="relative z-10 shrink-0">
               <a href="http://t.me/prod_ai_mind_set_bot?start=Research" target="_blank" className="bg-[#8DC63F] hover:bg-[#9ee047] text-black px-12 py-6 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-[2px]">
                 ЗАПОЛНИТЬ АНКЕТУ
                 <ArrowRight className="w-5 h-5" />
               </a>
             </div>
           </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-black/10 text-center text-[10px] font-mono uppercase tracking-[0.3em] font-bold opacity-30 mt-auto">
          © 2026 AI MINDSET // RESEARCH DIVISION
        </footer>

      </main>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FAFAFA] flex flex-col p-8 pt-24">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 p-2">
            <X className="w-6 h-6" />
          </button>
          
          <nav className="flex flex-col gap-8 font-black uppercase text-2xl tracking-tighter">
            <a href="/research" className="text-black">Research</a>
            <a href="/non-profit" className="text-black/40">Non-Profit</a>
            <a href="/ai-mindset-community" className="text-black/40">Community</a>
            <a href="/ai-mindset-consulting" className="text-black/40">For Teams</a>
          </nav>

          <div className="mt-auto">
             <button className="w-full py-4 bg-black text-[#8DC63F] text-[10px] uppercase font-black tracking-[0.2em]">
               ЗАПИСАТЬСЯ
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
