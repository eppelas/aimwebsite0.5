import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Menu, X, ArrowUpRight } from 'lucide-react';
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

export default function NonProfitPage() {
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
           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 border border-black/10 rounded-[2px] hover:bg-black hover:text-white transition-colors">
             {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
           </button>
        </div>

        {/* Hero Section */}
        <section className="min-h-[85vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24 relative overflow-hidden border-b border-black/10">
           
           {/* Abstract Geometric Shapes */}
           <div className="absolute top-[10%] right-[10%] w-[30vw] h-[30vw] border-[1px] border-black/5 rounded-full pointer-events-none" />
           <div className="absolute top-[15%] right-[15%] w-[20vw] h-[20vw] border-[1px] border-black/5 rounded-full pointer-events-none" />
           
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="max-w-4xl relative z-10"
           >
             <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-[#8DC63F]/10 text-[#8DC63F] rounded-[2px] border border-[#8DC63F]/20">
               <div className="w-2 h-2 rounded-[1px] bg-[#8DC63F] animate-pulse" />
               <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">
                 SPECIAL PROJECT LAB
               </span>
             </div>

             <h1 className="text-[56px] md:text-[80px] lg:text-[120px] font-black uppercase leading-[0.8] tracking-tighter mb-12">
               AI MINDSET <br/>
               <span className="text-black/20 block mt-2 text-[48px] md:text-[64px] lg:text-[80px]">{'{NON-PROFIT}'}</span>
             </h1>

             <p className="text-2xl md:text-4xl opacity-90 max-w-3xl leading-[1.2] font-black tracking-tighter uppercase mb-8">
               ПРИВЕТ, ДРУГ! ЕСЛИ ТЫ ЗДЕСЬ — ЗНАЧИТ, КАК И МЫ, ХОЧЕШЬ МЕНЯТЬ МИР К ЛУЧШЕМУ.
             </p>
             
             <p className="text-sm md:text-base opacity-60 max-w-xl leading-relaxed font-mono font-medium">
               Мы верим, что искусственный интеллект — мощный инструмент для усиления социального влияния. Это не просто технология, это способ мышления. Мы создаем сообщество для тех, кто решает важные общественные задачи.
             </p>

             <div className="mt-16 flex flex-wrap gap-6">
               <a href="http://t.me/prod_ai_mind_set_bot?start=NonProfit" target="_blank" className="inline-flex items-center gap-4 bg-black text-white px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black/80 transition-colors shadow-sm rounded-[2px]">
                 ПОДАТЬ ЗАЯВКУ В ЛАБОРАТОРИЮ
                 <ArrowUpRight className="w-4 h-4" />
               </a>
             </div>
           </motion.div>
        </section>

        {/* Offer vs Expectation - Brutalist Split Grid */}
        <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
           <div className="max-w-[1200px] mx-auto w-full">
             <SectionLabel text="Взаимодействие" number="01" />
             
             <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
               
               {/* Left Column: What we offer */}
               <div className="flex flex-col">
                 <EditorialSectionHeader eyebrow="Для НКО" title="ЧТО МЫ ПРЕДЛАГАЕМ" />
                 
                 <div className="flex flex-col gap-px bg-black/10 border border-black/10 rounded-[2px] overflow-hidden">
                   {[
                     'Бесплатное обучение для представителей НКО',
                     'Практические навыки работы с современными AI-инструментами',
                     'Доступ к сообществу практиков и экспертную поддержку',
                     'Возможность масштабировать социальное влияние через технологии'
                   ].map((text, i) => (
                     <div key={i} className="bg-white p-8 hover:bg-[#FAFAFA] transition-colors relative group overflow-hidden">
                       <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8DC63F] translate-x-[-100%] group-hover:translate-x-0 transition-transform" />
                       <div className="text-[10px] font-mono tracking-[0.3em] font-bold text-black/30 uppercase mb-4">Value 0{i+1}</div>
                       <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-[1.1]">{text}</h3>
                     </div>
                   ))}
                 </div>
               </div>

               {/* Right Column: What we expect */}
               <div className="flex flex-col">
                 <EditorialSectionHeader eyebrow="От участников" title="ЧТО ХОТИМ ВЗАМЕН" />
                 
                 <div className="flex flex-col gap-6 w-full">
                   {[
                     { title: 'АКТИВНАЯ ПОЗИЦИЯ',  desc: 'Вашу активную позицию и регулярное участие в занятиях.' },
                     { title: 'РЕАЛЬНЫЙ ПРОЕКТ', desc: 'Реальный проект, направленный на общественное благо.' },
                     { title: 'ЖЕЛАНИЕ ДЕЛИТЬСЯ', desc: 'Желание делиться опытом и помогать другим участникам.' },
                     { title: 'ПРАКТИКА', desc: 'Готовность применять полученные знания на практике.' },
                   ].map((item, idx) => (
                     <div key={idx} className="border-t border-black/10 pt-6">
                       <h3 className="text-[#8DC63F] text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2">{item.title}</h3>
                       <p className="opacity-60 text-sm md:text-base font-mono leading-relaxed">{item.desc}</p>
                     </div>
                   ))}
                 </div>
               </div>

             </div>
           </div>
        </section>

        {/* Giant ASCII Divider */}
        <div className="my-16 overflow-hidden w-full bg-black/5 border-y border-black/10 py-8 px-6 hidden md:block select-none">
           <div className="font-mono text-[8px] leading-[8px] opacity-20 whitespace-pre text-center tracking-widest font-black uppercase">
{`+-----------------------------------------------------------------------------------------------------------------------------------+
|     N    O    N    -    P    R    O    F    I    T        |        A    I        L    A    B    O    R    A    T    O    R    Y    |
+-----------------------------------------------------------------------------------------------------------------------------------+`}
           </div>
        </div>

        {/* Criteria Section - Large Typography Focus */}
        <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
           <div className="max-w-[1200px] mx-auto w-full">
             <SectionLabel text="Критерии отбора" number="02" />
             <EditorialSectionHeader eyebrow="Условия" title="КОГО МЫ ЖДЕМ" />
             
             <div className="flex flex-col gap-16 mt-20">
               {[
                 { title: 'Общественное благо', text: 'Ваша организация или инициатива должна быть направлена на общественное благо. Это могут быть социальные, культурные, образовательные проекты, правозащитные инициативы, развитие науки и технологий, или другие направления, создающие позитивные изменения.' },
                 { title: 'Проекты с применением AI', text: 'Мы приветствуем как опыт, так и искренний интерес к применению AI для улучшения ваших текущих программ. Важно иметь конкретные идеи по использованию AI или уже реализованные проекты.' },
                 { title: 'Готовность делиться', text: 'Мы ценим открытость к обмену опытом и активное участие в жизни сообщества. Вы должны быть готовы делиться своими успехами и неудачами, участвовать в групповых проектах.' },
                 { title: 'Вовлеченность в обучение', text: 'Курс нельзя "посмотреть в записи", хотя записи будут. Необходимо регулярно присутствовать на живых занятиях, выполнять практические задания и применять инструменты к своему проекту – это ваша сделка за участие.' },
               ].map((c, idx) => (
                 <div key={idx} className="flex flex-col md:flex-row gap-6 md:gap-16 border-b border-black/10 pb-16 last:border-b-0 last:pb-0">
                   <div className="text-black/10 text-[80px] md:text-[120px] font-black uppercase tracking-tighter leading-none shrink-0 w-32 md:w-48 text-right md:text-left hidden lg:block">
                     0{idx+1}
                   </div>
                   
                   <div className="flex-1 flex flex-col justify-center">
                     <h4 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-6">{c.title}</h4>
                     <p className="text-sm md:text-base opacity-70 leading-relaxed font-mono max-w-3xl border-l-2 border-[#8DC63F] pl-6 md:pl-8 py-2 bg-gradient-to-r from-[#8DC63F]/5 to-transparent">
                       {c.text}
                     </p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </section>

        {/* Final CTA Full Width Block */}
        <section className="bg-black text-white selection:bg-white selection:text-black min-h-[50vh] flex flex-col items-center justify-center p-12 md:p-24 text-center">
            <h3 className="text-[40px] md:text-[80px] font-black uppercase tracking-tighter mb-8 leading-[0.8]">
               КАК ПОДАТЬ<br/>
               <span className="text-[#8DC63F]">ЗАЯВКУ</span>
            </h3>
            
            <p className="font-mono text-sm md:text-base opacity-60 max-w-2xl leading-relaxed mb-12">
               Просто напиши нашему боту и расскажи о своем проекте и о том, как планируешь применять AI. Мест на потоках немного, но мы всегда ищем возможности помочь тем, кто действительно хочет созидать.
            </p>
            
            <a href="http://t.me/prod_ai_mind_set_bot?start=NonProfit" target="_blank" className="bg-white text-black px-12 py-6 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#8DC63F] transition-colors shadow-[0_0_40px_rgba(141,198,63,0.1)] rounded-[2px] flex items-center gap-4 group">
               НАПИСАТЬ БОТУ
               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-black text-[#FAFAFA] border-t border-white/10 text-center text-[10px] font-mono uppercase tracking-[0.3em] font-bold opacity-50">
          © 2026 AI MINDSET // NON-PROFIT DIVISION
        </footer>

      </main>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FAFAFA] flex flex-col p-8 pt-24">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 p-2 rounded-[2px] border border-black/10">
            <X className="w-6 h-6" />
          </button>
          
          <nav className="flex flex-col gap-8 font-black uppercase text-[32px] md:text-[48px] tracking-tighter">
            <a href="/research" className="text-black/30 hover:text-black transition-colors">Research</a>
            <a href="/non-profit" className="text-black hover:text-black transition-colors">Non-Profit</a>
            <a href="/ai-mindset-community" className="text-black/30 hover:text-black transition-colors">Community</a>
            <a href="/ai-mindset-consulting" className="text-black/30 hover:text-black transition-colors">For Teams</a>
          </nav>

          <div className="mt-auto">
             <button className="w-full py-5 bg-black text-white text-[10px] uppercase font-black tracking-[0.2em] rounded-[2px]">
               ЗАПИСАТЬСЯ
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
