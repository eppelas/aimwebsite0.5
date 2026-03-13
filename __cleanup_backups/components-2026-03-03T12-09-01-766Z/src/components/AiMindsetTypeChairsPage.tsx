import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const TypeChairsStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;900&display=swap');

    .font-inter { font-family: 'Inter', sans-serif; }
    
    .vertical-text {
      writing-mode: vertical-rl;
      text-orientation: mixed;
    }

    .hover-invert {
      transition: all 0.3s ease;
    }
    .hover-invert:hover {
      background-color: white;
      color: black;
    }
  `}</style>
);

const CircleBadge = () => (
  <div className="fixed top-8 left-8 z-50 w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center text-center p-4 text-black cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg hidden md:flex">
    <span className="text-xs font-bold uppercase leading-tight mb-1">POS {`{sprint}`}</span>
    <span className="text-[10px] uppercase leading-tight">Winter 26</span>
    <div className="mt-2 flex items-center gap-1 text-xs font-medium">
      more <ArrowRight size={12} />
    </div>
  </div>
);

const VerticalNav = () => (
  <div className="fixed top-0 right-0 h-screen w-16 flex flex-col justify-between py-8 items-center z-40 mix-blend-difference text-white hidden md:flex">
    <div className="vertical-text text-xs font-bold tracking-widest uppercase hover:text-gray-400 cursor-pointer">
      <a href="https://t.me/ai_mind_set" target="_blank" rel="noreferrer">Telegram</a>
    </div>
    <div className="vertical-text text-xs font-bold tracking-widest uppercase hover:text-gray-400 cursor-pointer">
      <a href="https://www.youtube.com/@A-I-Mindset" target="_blank" rel="noreferrer">YouTube</a>
    </div>
    <div className="vertical-text text-xs font-bold tracking-widest uppercase hover:text-gray-400 cursor-pointer">
      <a href="https://aimindset.org" target="_blank" rel="noreferrer">Website</a>
    </div>
  </div>
);

const BigLetter = ({ char, label, sub }) => (
  <div className="flex flex-col items-center justify-center p-8 border border-white/10 min-h-[300px] hover:bg-white/5 transition-colors group">
    <span className="text-[12rem] md:text-[16rem] font-black leading-none tracking-tighter group-hover:scale-105 transition-transform duration-500">
      {char}
    </span>
    <div className="mt-4 text-center">
      <p className="text-sm font-bold uppercase tracking-widest">{label}</p>
      <p className="text-xs text-gray-400 mt-1">{sub}</p>
    </div>
  </div>
);

export default function AiMindsetTypeChairsPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white font-inter selection:bg-white selection:text-black overflow-x-hidden">
      <TypeChairsStyles />
      <CircleBadge />
      <VerticalNav />

      {/* Hero Section - Scattered Type */}
      <section className="min-h-screen flex flex-col justify-center pt-24 pb-12 px-4 md:px-16 relative">
        <div className="border-t-4 border-white w-full mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          <div className="col-span-1 md:col-span-2 lg:col-span-2 flex items-end p-4">
             <h1 className="text-4xl md:text-6xl font-bold uppercase leading-none tracking-tighter">
               AI Mindset<br/>POS {`{sprint}`}
             </h1>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col justify-end p-4 text-right">
             <p className="text-sm uppercase tracking-widest mb-2">Batch: Winter 26</p>
             <p className="text-sm uppercase tracking-widest">Applications: Open</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 mt-12 border-b-4 border-white">
           <div className="border-r border-white/20 aspect-square flex items-center justify-center text-[10vw] font-black hover:bg-white hover:text-black transition-colors cursor-default">P</div>
           <div className="border-r border-white/20 aspect-square flex items-center justify-center text-[10vw] font-black hover:bg-white hover:text-black transition-colors cursor-default">O</div>
           <div className="border-r border-white/20 aspect-square flex items-center justify-center text-[10vw] font-black hover:bg-white hover:text-black transition-colors cursor-default">S</div>
           <div className="aspect-square flex items-center justify-center text-[10vw] font-black hover:bg-white hover:text-black transition-colors cursor-default">&</div>
        </div>
        
        <div className="mt-8 max-w-2xl">
          <p className="text-xl md:text-2xl leading-relaxed font-light">
            <strong className="font-bold">POS</strong> — это не инструмент, это операционная система с персональным AI-ассистентом. Слой правил, контекста и ограничений, который заставляет инструменты работать.
          </p>
        </div>
      </section>

      {/* Gold Section - Context */}
      <section className="bg-[#B8860B] text-white py-24 px-4 md:px-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-4 bg-white"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
           <div>
              <h2 className="text-[15vw] leading-none font-black opacity-20 select-none absolute top-12 left-0 pointer-events-none">
                SYSTEM
              </h2>
              <div className="relative z-10">
                <h3 className="text-4xl md:text-6xl font-bold mb-8 uppercase">
                  От хаоса<br/>к системе
                </h3>
                <p className="text-lg md:text-xl mb-6 max-w-md">
                  Представь: утром агент даёт план дня под твой уровень энергии. Днём напоминает про встречу и готовит бриф. Вечером подводит итоги.
                </p>
                <div className="flex gap-4">
                   <div className="border border-white px-6 py-3 rounded-full uppercase text-sm font-bold hover:bg-white hover:text-[#B8860B] transition-colors cursor-pointer">
                      Context
                   </div>
                   <div className="border border-white px-6 py-3 rounded-full uppercase text-sm font-bold hover:bg-white hover:text-[#B8860B] transition-colors cursor-pointer">
                      Agents
                   </div>
                   <div className="border border-white px-6 py-3 rounded-full uppercase text-sm font-bold hover:bg-white hover:text-[#B8860B] transition-colors cursor-pointer">
                      Rules
                   </div>
                </div>
              </div>
           </div>
           
           <div className="relative z-10 border-l-2 border-white pl-8 md:pl-16">
              <h4 className="text-2xl font-bold mb-6 uppercase">Программа Спринта</h4>
              <ul className="space-y-6">
                 <li className="group cursor-pointer">
                    <span className="block text-xs uppercase tracking-widest opacity-70 mb-1">Module 01</span>
                    <span className="text-3xl font-bold group-hover:underline decoration-2 underline-offset-4">Собранный контекст</span>
                    <p className="text-sm mt-2 opacity-80">AI знает кто ты, как работаешь, что тебе важно.</p>
                 </li>
                 <li className="group cursor-pointer">
                    <span className="block text-xs uppercase tracking-widest opacity-70 mb-1">Module 02</span>
                    <span className="text-3xl font-bold group-hover:underline decoration-2 underline-offset-4">Логичная архитектура</span>
                    <p className="text-sm mt-2 opacity-80">Не удалит файлы без спроса и не купит бесполезный курс.</p>
                 </li>
                 <li className="group cursor-pointer">
                    <span className="block text-xs uppercase tracking-widest opacity-70 mb-1">Module 03</span>
                    <span className="text-3xl font-bold group-hover:underline decoration-2 underline-offset-4">Связанные инструменты</span>
                    <p className="text-sm mt-2 opacity-80">Claude Code / Cursor / Obsidian / MCP.</p>
                 </li>
              </ul>
           </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-4 bg-white"></div>
      </section>

      {/* Grid Section - Mentors/Tools */}
      <section className="py-24 px-4 md:px-16 bg-black">
         <div className="flex justify-between items-end mb-12 border-b-4 border-white pb-4">
            <h2 className="text-4xl md:text-6xl font-black uppercase">Mentors &<br/>Tools</h2>
            <p className="text-right text-sm uppercase tracking-widest hidden md:block">
               Winter 26<br/>Batch
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
            <BigLetter char="A" label="Alex Povalyaev" sub="Strategist / Founder" />
            <BigLetter char="S" label="Sergey Khabarov" sub="System Architect" />
            <BigLetter char="R" label="Seryozha Ris" sub="AI Evangelist" />
            <BigLetter char="C" label="Claude" sub="Anthropic AI" />
            <BigLetter char="O" label="Obsidian" sub="Knowledge Base" />
            <BigLetter char="M" label="MCP" sub="Model Context Protocol" />
            <BigLetter char="V" label="Vibe Coding" sub="Methodology" />
            <BigLetter char="L" label="The Lab" sub="Community" />
         </div>
      </section>

      {/* Footer / Pricing */}
      <section className="bg-white text-black py-24 px-4 md:px-16">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
               <h2 className="text-6xl md:text-8xl font-black uppercase leading-none mb-8">
                  Join<br/>The<br/>Sprint
               </h2>
               <p className="text-xl font-medium max-w-md mb-8">
                  Освободи мозг от операционки. Оставь ресурсы на важное.
               </p>
               <div className="flex flex-col gap-4 items-start">
                  <button className="bg-black text-white px-8 py-4 text-xl font-bold uppercase hover:bg-[#B8860B] transition-colors flex items-center gap-2">
                     Apply Now <ArrowUpRight />
                  </button>
                  <p className="text-sm opacity-60">
                     Скидки: Alumni (-20%), Bring a Friend (-10%).
                  </p>
               </div>
            </div>
            
            <div className="flex flex-col justify-between">
               <div className="border-t-4 border-black pt-8">
                  <h3 className="text-2xl font-bold uppercase mb-4">FAQ</h3>
                  <ul className="space-y-4">
                     <li className="flex justify-between items-center border-b border-black/20 pb-2 cursor-pointer hover:pl-2 transition-all">
                        <span>Организация и процессы</span>
                        <ArrowRight size={16} />
                     </li>
                     <li className="flex justify-between items-center border-b border-black/20 pb-2 cursor-pointer hover:pl-2 transition-all">
                        <span>Ожидания и результат</span>
                        <ArrowRight size={16} />
                     </li>
                     <li className="flex justify-between items-center border-b border-black/20 pb-2 cursor-pointer hover:pl-2 transition-all">
                        <span>Оплата и условия</span>
                        <ArrowRight size={16} />
                     </li>
                  </ul>
               </div>
               
               <div className="mt-12 md:mt-0">
                  <div className="flex gap-4 text-sm font-bold uppercase tracking-widest">
                     <a href="#" className="hover:underline">Podcast</a>
                     <a href="#" className="hover:underline">Telegram</a>
                     <a href="#" className="hover:underline">Offer</a>
                  </div>
                  <p className="text-xs mt-4 opacity-50">
                     © 2026 AI Mindset. All rights reserved.
                  </p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
