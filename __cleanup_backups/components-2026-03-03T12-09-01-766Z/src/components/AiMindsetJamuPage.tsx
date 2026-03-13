import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDown, Check, Circle, Square, MousePointer2 } from 'lucide-react';

const JamuStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

    .font-inter { font-family: 'Inter', sans-serif; }
    .font-grotesk { font-family: 'Space Grotesk', sans-serif; }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    .jamu-bg { background-color: #F3F4F1; }
    .text-deep-green { color: #024D3C; }
    .bg-deep-green { background-color: #024D3C; }
    .text-lavender { color: #E4B7EB; }
    .bg-lavender { background-color: #E4B7EB; }
    .text-jamu-yellow { color: #F5AA00; }
    .bg-jamu-yellow { background-color: #F5AA00; }
    .text-bright-yellow { color: #F5E000; }
    .bg-bright-yellow { background-color: #F5E000; }
    
    .flow-diamond {
      width: 80px;
      height: 80px;
      transform: rotate(45deg);
      border: 1.5px solid #024D3C;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F3F4F1;
      z-index: 10;
    }
    
    .flow-diamond-inner {
      transform: rotate(-45deg);
      text-align: center;
      font-size: 10px;
      font-weight: 500;
      color: #024D3C;
      line-height: 1.1;
    }

    .flow-rect {
      border: 1.5px solid #024D3C;
      padding: 12px 20px;
      font-size: 12px;
      font-weight: 500;
      color: #024D3C;
      background: #F3F4F1;
      z-index: 10;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .flow-rect.filled {
      background: #024D3C;
      color: white;
    }

    .flow-rect.lavender {
      background: #E4B7EB;
      border-color: #E4B7EB;
      color: #024D3C;
    }

    .organic-shape {
      border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
      transition: border-radius 0.5s ease;
    }
    .organic-shape:hover {
      border-radius: 60% 40% 30% 70% / 50% 30% 50% 60%;
    }
  `}</style>
);

const Ingredient = ({ color, name, path }: { color: string, name: string, path: string }) => (
  <div className="flex flex-col items-center gap-4 group cursor-pointer">
    <div className={`w-32 h-32 ${color} organic-shape flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
       <svg viewBox="0 0 100 100" className="w-full h-full fill-current p-4">
          <path d={path} />
       </svg>
    </div>
    <span className={`text-sm font-medium ${color.replace('bg-', 'text-')}`}>{name}</span>
  </div>
);

export default function AiMindsetJamuPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll jamu-bg text-black selection:bg-[#E4B7EB] selection:text-[#024D3C] hide-scrollbar font-inter relative">
      <JamuStyles />

      {/* Navigation */}
      <nav className="px-6 py-8 md:px-12 flex justify-between items-baseline sticky top-0 z-50 pointer-events-none mix-blend-multiply">
        <div className="text-4xl font-grotesk font-normal tracking-tight pointer-events-auto">
          POS {`{X26}`}
        </div>
        <div className="hidden md:flex gap-12 text-4xl font-grotesk font-normal tracking-tight pointer-events-auto text-[#111]">
          <a href="#stories" className="hover:text-[#024D3C] transition-colors">STORIES</a>
          <a href="#logic" className="hover:text-[#024D3C] transition-colors">LOGIC</a>
          <a href="#system" className="hover:text-[#024D3C] transition-colors">SYSTEM</a>
        </div>
      </nav>

      {/* Hero / User Stories */}
      <section id="stories" className="px-6 md:px-12 pt-20 pb-32 min-h-screen relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
           {/* Left Column - Large Organic Shape */}
           <div className="md:col-span-5 relative min-h-[60vh] flex items-center justify-center">
              <svg viewBox="0 0 200 600" className="h-[80vh] w-auto fill-[#024D3C]">
                 <path d="M100,0 C120,50 80,100 100,150 C130,220 90,280 105,350 C115,400 95,450 100,500 C105,550 90,580 100,600 C110,580 130,550 125,500 C120,450 140,400 130,350 C115,280 150,220 130,150 C110,100 140,50 100,0 Z" />
                 <path d="M100,150 L140,120 L135,160 Z" />
                 <path d="M105,250 L70,230 L80,270 Z" />
                 <path d="M100,400 L130,380 L125,420 Z" />
              </svg>
           </div>

           {/* Right Column - Text */}
           <div className="md:col-span-7 space-y-24">
              <div>
                 <span className="text-[#024D3C] text-xl mb-4 block">1</span>
                 <p className="text-3xl md:text-5xl text-[#024D3C] leading-tight font-normal">
                   "As a founder, I want to access my own context without having to explain myself, so that I can make sure the AI understands what I'm looking for before having to write a prompt."
                 </p>
              </div>
              
              <div className="relative">
                 {/* Decorative Lavender Shape behind text */}
                 <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#E4B7EB] opacity-50 rounded-full blur-3xl -z-10"></div>
                 
                 <span className="text-[#024D3C] text-xl mb-4 block">2</span>
                 <p className="text-3xl md:text-5xl text-[#024D3C] leading-tight font-normal">
                   "As a creative, I want there to be a variety of agent personas, so that I can choose the right 'brain' for the specific task at hand."
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Logic Flowchart */}
      <section id="logic" className="px-6 md:px-12 py-32 bg-[#F3F4F1] relative overflow-hidden">
         <div className="absolute top-0 right-0 p-12 text-6xl md:text-8xl font-grotesk opacity-5 pointer-events-none">
            LOGIC
         </div>
         
         <div className="max-w-5xl mx-auto relative h-[800px]">
            {/* SVG Lines Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
               <path d="M400,50 V150" stroke="#024D3C" strokeWidth="1.5" fill="none" />
               <path d="M400,200 V250" stroke="#024D3C" strokeWidth="1.5" fill="none" />
               <path d="M400,300 V350" stroke="#024D3C" strokeWidth="1.5" fill="none" />
               
               {/* Branching */}
               <path d="M400,350 H200 V400" stroke="#024D3C" strokeWidth="1.5" fill="none" />
               <path d="M400,350 H600 V400" stroke="#024D3C" strokeWidth="1.5" fill="none" />
               
               <path d="M200,450 V500" stroke="#024D3C" strokeWidth="1.5" fill="none" />
               <path d="M600,450 V500" stroke="#024D3C" strokeWidth="1.5" fill="none" />
               
               <path d="M200,550 V650 H350" stroke="#024D3C" strokeWidth="1.5" fill="none" />
               <path d="M600,550 V650 H450" stroke="#024D3C" strokeWidth="1.5" fill="none" />
               
               <path d="M400,650 V720" stroke="#024D3C" strokeWidth="1.5" fill="none" />
            </svg>

            {/* Nodes Layer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
               <div className="flow-rect lavender">User Input</div>
            </div>

            <div className="absolute top-[150px] left-1/2 -translate-x-1/2">
               <div className="flow-rect filled">Context Agent</div>
            </div>

            <div className="absolute top-[250px] left-1/2 -translate-x-1/2">
               <div className="flow-diamond">
                  <div className="flow-diamond-inner">Has<br/>Data?</div>
               </div>
            </div>

            {/* Left Branch */}
            <div className="absolute top-[400px] left-[200px] -translate-x-1/2">
               <div className="flow-diamond">
                  <div className="flow-diamond-inner">By<br/>Task</div>
               </div>
            </div>
            <div className="absolute top-[500px] left-[200px] -translate-x-1/2">
               <div className="flow-rect">Obsidian</div>
            </div>

            {/* Right Branch */}
            <div className="absolute top-[400px] left-[600px] -translate-x-1/2">
               <div className="flow-diamond">
                  <div className="flow-diamond-inner">By<br/>Time</div>
               </div>
            </div>
            <div className="absolute top-[500px] left-[600px] -translate-x-1/2">
               <div className="flow-rect">Calendar</div>
            </div>

            {/* Convergence */}
            <div className="absolute top-[720px] left-1/2 -translate-x-1/2">
               <div className="flow-rect lavender">Action Plan</div>
            </div>
         </div>
      </section>

      {/* Ingredients / System Components */}
      <section className="px-6 md:px-12 py-32">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <Ingredient 
               color="bg-deep-green" 
               name="Context" 
               path="M50,10 Q80,10 80,40 Q80,70 50,70 Q20,70 20,40 Q20,10 50,10 Z M50,20 Q40,30 50,40 Q60,30 50,20" 
            />
            <Ingredient 
               color="bg-lavender" 
               name="Logic" 
               path="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z" 
            />
            <Ingredient 
               color="bg-jamu-yellow" 
               name="Action" 
               path="M10,50 L30,30 L70,30 L90,50 L70,70 L30,70 Z" 
            />
            <Ingredient 
               color="bg-bright-yellow" 
               name="Energy" 
               path="M50,10 L60,40 L90,40 L65,60 L75,90 L50,70 L25,90 L35,60 L10,40 L40,40 Z" 
            />
         </div>
      </section>

      {/* Mockups / System */}
      <section id="system" className="px-6 md:px-12 py-32 bg-[#F3F4F1] overflow-hidden">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            
            {/* Phone 1 - Yellow */}
            <div className="flex justify-center">
               <div className="w-[300px] h-[600px] bg-jamu-yellow rounded-[40px] border-4 border-[#111] p-6 relative shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#111] rounded-b-xl"></div>
                  <div className="mt-12 text-center">
                     <h3 className="text-2xl font-grotesk font-bold text-[#111]">Daily Brief</h3>
                     <div className="mt-8 relative h-64 w-full">
                        {/* Abstract flower shape */}
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-lavender opacity-80">
                           <path d="M50,50 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0" />
                           <path d="M50,50 m-30,-30 l60,60 m-60,0 l60,-60" stroke="#024D3C" strokeWidth="2" />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#024D3C] text-white px-4 py-2 rounded-full text-sm font-bold">
                           Start Now
                        </div>
                     </div>
                     <p className="mt-8 text-sm font-medium text-[#111] px-4">
                        Your energy is high this morning. Let's tackle the strategy doc.
                     </p>
                  </div>
               </div>
            </div>

            {/* Phone 2 - Lavender */}
            <div className="flex justify-center md:mt-24">
               <div className="w-[300px] h-[600px] bg-lavender rounded-[40px] border-4 border-[#111] p-6 relative shadow-2xl rotate-[2deg] hover:rotate-0 transition-transform duration-500">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#111] rounded-b-xl"></div>
                  <div className="mt-12">
                     <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-[#024D3C]">Menu</h3>
                        <div className="w-6 h-6 rounded-full border-2 border-[#024D3C]"></div>
                     </div>
                     <div className="space-y-4">
                        {['Context', 'Tasks', 'Knowledge', 'Settings'].map((item, i) => (
                           <div key={i} className="border-b border-[#024D3C]/20 pb-4">
                              <span className="text-3xl font-grotesk text-[#024D3C] hover:pl-4 transition-all cursor-pointer block">{item}</span>
                           </div>
                        ))}
                     </div>
                     <div className="mt-12">
                        <div className="w-full h-32 bg-[#024D3C] rounded-2xl flex items-center justify-center">
                           <span className="text-white font-bold text-lg">Sync Active</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Phone 3 - Green */}
            <div className="flex justify-center">
               <div className="w-[300px] h-[600px] bg-deep-green rounded-[40px] border-4 border-[#111] p-6 relative shadow-2xl rotate-[-1deg] hover:rotate-0 transition-transform duration-500">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#111] rounded-b-xl"></div>
                  <div className="mt-12 text-white text-center">
                     <h3 className="text-2xl font-grotesk font-bold mb-2">Knowledge</h3>
                     <p className="text-white/60 text-sm mb-8">1,240 Nodes Connected</p>
                     
                     <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-square bg-jamu-yellow rounded-2xl flex items-center justify-center text-[#111] font-bold">POS</div>
                        <div className="aspect-square bg-lavender rounded-2xl flex items-center justify-center text-[#111] font-bold">AI</div>
                        <div className="aspect-square bg-bright-yellow rounded-2xl flex items-center justify-center text-[#111] font-bold">Code</div>
                        <div className="aspect-square bg-white/10 rounded-2xl flex items-center justify-center text-white font-bold">+</div>
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </section>

      {/* Typography & Color */}
      <section className="px-6 md:px-12 py-32 bg-[#F3F4F1]">
         <div className="mb-24">
            <p className="mb-8 font-medium">Typography</p>
            <h2 className="text-[15vw] leading-none font-grotesk text-center">Moderat</h2>
            <div className="text-center mt-8 font-inter text-lg tracking-widest">
               Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
            </div>
         </div>

         <div>
            <p className="mb-8 font-medium">Colour</p>
            <div className="grid grid-cols-2 md:grid-cols-5 h-64 w-full">
               <div className="bg-jamu-yellow flex items-end p-4 text-xs font-mono">#F5AA00</div>
               <div className="bg-bright-yellow flex items-end p-4 text-xs font-mono">#F5E000</div>
               <div className="bg-deep-green flex items-end p-4 text-xs font-mono text-white">#024D3C</div>
               <div className="bg-[#8BAAC6] flex items-end p-4 text-xs font-mono">#8BAAC6</div>
               <div className="bg-lavender flex items-end p-4 text-xs font-mono">#E4B7EB</div>
            </div>
         </div>
      </section>

      {/* Pricing / CTA */}
      <section className="px-6 md:px-12 py-32 bg-bright-yellow text-[#111]">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
               <h2 className="text-6xl font-grotesk font-bold mb-8">Muggnpfiffer</h2>
               <p className="text-xl leading-relaxed max-w-md">
                  Muggnpfiffer is a group of puppeteers that write, build and perform plays for children with humorous themes such as friendship, environmental protection and solidarity.
               </p>
               <p className="text-xl leading-relaxed max-w-md mt-4 font-bold">
                  (Just kidding, this is the AI Mindset POS Sprint. But we like the vibe.)
               </p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm font-medium border-t border-black pt-8">
               <div>
                  <p className="underline mb-2">Role</p>
                  <p>System Architect</p>
                  <p>AI Engineer</p>
               </div>
               <div>
                  <p className="underline mb-2">Tools</p>
                  <p>Obsidian</p>
                  <p>Claude Code</p>
               </div>
               <div>
                  <p className="underline mb-2">Client</p>
                  <p>Your Future Self</p>
               </div>
               <div>
                  <p className="underline mb-2">Year</p>
                  <p>2026</p>
               </div>
            </div>
         </div>
         
         <div className="mt-24 flex flex-col md:flex-row gap-8">
             <button className="bg-deep-green text-white px-12 py-6 rounded-full text-xl font-bold hover:bg-[#03634d] transition-colors">
                Join Batch X26
             </button>
             <button className="border-2 border-deep-green text-deep-green px-12 py-6 rounded-full text-xl font-bold hover:bg-deep-green hover:text-white transition-colors">
                View Syllabus
             </button>
         </div>
      </section>

    </div>
  );
}
