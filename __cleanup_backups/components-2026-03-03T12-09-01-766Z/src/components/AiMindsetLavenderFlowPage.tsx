import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDown, X, Check, Circle, Square, MousePointer2 } from 'lucide-react';

const LavenderStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

    .font-inter { font-family: 'Inter', sans-serif; }
    .font-grotesk { font-family: 'Space Grotesk', sans-serif; }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    .flow-node {
      background: white;
      border-radius: 8px;
      padding: 16px 24px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      min-width: 140px;
      position: relative;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .flow-node:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .flow-diamond {
      background: white;
      width: 120px;
      height: 120px;
      transform: rotate(45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      margin: 20px;
    }

    .flow-diamond-inner {
      transform: rotate(-45deg);
      text-align: center;
      font-size: 13px;
      font-weight: 500;
      line-height: 1.2;
    }

    .sketch-border {
      border: 2px solid black;
      border-radius: 2px 255px 3px 25px / 255px 5px 225px 3px;
    }
    
    .sketch-box {
      border: 2px solid black;
      border-radius: 2% 6% 5% 4% / 1% 1% 2% 4%;
      background: white; 
      position: relative;
    }

    .sketch-line {
      height: 2px;
      background: black;
      border-radius: 50%;
      transform: rotate(-0.5deg);
    }
  `}</style>
);

const Connector = ({ vertical = false, length = 60 }: { vertical?: boolean, length?: number }) => (
  <div className={`flex items-center justify-center ${vertical ? 'flex-col h-full' : 'w-full'}`} style={{ [vertical ? 'height' : 'width']: length }}>
    <div className={`${vertical ? 'w-px h-full' : 'h-px w-full'} bg-white/50`}></div>
    {vertical ? <ArrowDown size={14} className="text-white -mt-2" /> : <ArrowRight size={14} className="text-white -ml-2" />}
  </div>
);

export default function AiMindsetLavenderFlowPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-[#C4B5FD] text-black selection:bg-black selection:text-[#C4B5FD] hide-scrollbar font-inter relative">
      <LavenderStyles />

      {/* Navigation */}
      <nav className="px-6 py-8 md:px-12 flex justify-between items-start sticky top-0 z-50 pointer-events-none">
        <div className="text-xl font-grotesk font-bold tracking-tight pointer-events-auto">
          AI MINDSET
        </div>
        <div className="hidden md:flex gap-12 text-4xl font-grotesk font-normal tracking-tight pointer-events-auto">
          <a href="#flow" className="hover:opacity-60 transition-opacity">DIGITAL</a>
          <a href="#sketch" className="hover:opacity-60 transition-opacity">GRAPHIC</a>
          <a href="#about" className="hover:opacity-60 transition-opacity">ABOUT</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-12 pt-20 pb-32 min-h-[60vh] flex flex-col justify-center items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
           <h1 className="text-6xl md:text-[10vw] font-grotesk font-medium leading-[0.9] tracking-tighter mb-8">
             SYSTEM<br/>
             FLOW
           </h1>
           <p className="text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
             POS {`{sprint}`} — From chaos to a working AI system. <br/>
             <span className="font-medium">2 March — 14 March 2026</span>
           </p>
        </motion.div>
      </section>

      {/* Flowchart Section */}
      <section id="flow" className="px-6 md:px-12 py-24 overflow-x-auto">
        <div className="min-w-[1000px] flex flex-col items-center">
           
           {/* Level 1 */}
           <div className="flow-node">Start: Chaos</div>
           <Connector vertical length={40} />
           
           {/* Level 2 */}
           <div className="flex items-center gap-8">
              <div className="flow-diamond">
                 <div className="flow-diamond-inner">Has<br/>Context?</div>
              </div>
              <Connector length={60} />
              <div className="flow-node bg-red-100 text-red-900">Manual Loop</div>
           </div>

           <div className="flex h-12">
              <div className="w-px bg-white/50 h-full"></div>
           </div>

           {/* Level 3 */}
           <div className="grid grid-cols-3 gap-16">
              <div className="flex flex-col items-center">
                 <div className="flow-node w-full">Obsidian Vault</div>
                 <Connector vertical length={30} />
                 <div className="text-xs uppercase tracking-widest mb-2 opacity-60">Knowledge</div>
              </div>
              <div className="flex flex-col items-center">
                 <div className="flow-node w-full font-bold border-2 border-black">AI Agent</div>
                 <Connector vertical length={30} />
                 <div className="text-xs uppercase tracking-widest mb-2 opacity-60">Processing</div>
              </div>
              <div className="flex flex-col items-center">
                 <div className="flow-node w-full">Calendar / Task</div>
                 <Connector vertical length={30} />
                 <div className="text-xs uppercase tracking-widest mb-2 opacity-60">Action</div>
              </div>
           </div>

           <div className="flex h-12 items-center justify-center w-full relative">
              {/* Connecting lines */}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
                 <path d="M300 0 V 24 H 700 V 0" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                 <path d="M500 0 V 48" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              </svg>
           </div>

           {/* Level 4 */}
           <div className="flow-diamond">
              <div className="flow-diamond-inner">Output<br/>Valid?</div>
           </div>

           <Connector vertical length={40} />

           {/* Level 5 */}
           <div className="flow-node bg-black text-white">
              Operational System
           </div>

        </div>
      </section>

      {/* Sketch / Wireframe Section */}
      <section id="sketch" className="px-6 md:px-12 py-32 bg-white text-black relative overflow-hidden">
         {/* Background Grid */}
         <div className="absolute inset-0 opacity-10" 
              style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
         </div>

         <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-4xl font-grotesk font-bold mb-16">THE BLUEPRINT</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
               
               {/* Sketch 1: Dashboard */}
               <div className="sketch-box p-6 h-[400px] flex flex-col gap-4 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="flex justify-between items-center border-b-2 border-black pb-2">
                     <span className="font-mono text-sm">DASHBOARD.v1</span>
                     <div className="w-4 h-4 rounded-full border-2 border-black"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="sketch-border h-24 bg-gray-50"></div>
                     <div className="sketch-border h-24 bg-gray-50"></div>
                  </div>
                  <div className="sketch-border flex-1 bg-gray-50 p-4">
                     <div className="w-1/2 h-2 bg-black mb-4 rounded-full"></div>
                     <div className="w-full h-1 bg-gray-300 mb-2"></div>
                     <div className="w-full h-1 bg-gray-300 mb-2"></div>
                     <div className="w-3/4 h-1 bg-gray-300"></div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 font-handwriting text-blue-600 transform -rotate-12 font-mono text-sm">
                     Needs more context!
                  </div>
               </div>

               {/* Sketch 2: Mobile App */}
               <div className="sketch-box p-8 h-[400px] flex flex-col items-center justify-center transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="w-[200px] h-[350px] border-4 border-black rounded-[30px] p-4 flex flex-col gap-4 relative">
                     <div className="w-16 h-1 bg-black mx-auto rounded-full"></div>
                     <div className="w-12 h-12 rounded-full border-2 border-black mx-auto mt-4"></div>
                     <div className="space-y-2 mt-4">
                        <div className="h-8 border-2 border-black rounded w-full"></div>
                        <div className="h-8 border-2 border-black rounded w-full"></div>
                        <div className="h-8 border-2 border-black rounded w-full"></div>
                     </div>
                     <div className="mt-auto flex justify-around">
                        <div className="w-6 h-6 border-2 border-black rounded-full"></div>
                        <div className="w-6 h-6 border-2 border-black rounded-full"></div>
                        <div className="w-6 h-6 border-2 border-black rounded-full"></div>
                     </div>
                  </div>
               </div>

               {/* Sketch 3: Notes */}
               <div className="sketch-box p-6 h-[400px] transform rotate-3 hover:rotate-0 transition-transform duration-300 bg-[#fffdca]">
                  <div className="flex justify-between items-center mb-6">
                     <span className="font-mono text-sm uppercase">Notes</span>
                     <span className="font-mono text-xs opacity-50">02/03/26</span>
                  </div>
                  <ul className="space-y-4 font-mono text-sm leading-relaxed">
                     <li className="flex gap-3">
                        <div className="w-4 h-4 border border-black flex-shrink-0"></div>
                        <span>Define agent persona</span>
                     </li>
                     <li className="flex gap-3">
                        <div className="w-4 h-4 border border-black flex-shrink-0 bg-black"></div>
                        <span className="line-through opacity-50">Connect Obsidian API</span>
                     </li>
                     <li className="flex gap-3">
                        <div className="w-4 h-4 border border-black flex-shrink-0"></div>
                        <span>Setup MCP server for local files</span>
                     </li>
                     <li className="flex gap-3">
                        <div className="w-4 h-4 border border-black flex-shrink-0"></div>
                        <span>Test context window limits</span>
                     </li>
                  </ul>
                  <div className="mt-8 border-t-2 border-black pt-4">
                     <p className="font-bold">REMEMBER:</p>
                     <p className="text-sm mt-2">The system must work for YOU, not the other way around.</p>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* Mentors / Guides */}
      <section id="about" className="px-6 md:px-12 py-24">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
               <h2 className="text-5xl font-grotesk font-bold mb-8 leading-none">
                  YOUR<br/>GUIDES
               </h2>
               <p className="text-xl leading-relaxed max-w-md">
                  We live in these processes every day. We build systems, agents, and skills. We are sharing the distillate of real cases.
               </p>
            </div>
            <div className="space-y-8">
               {[
                 { name: "Alexander Povalyaev", role: "Strategist", icon: <Circle size={24} /> },
                 { name: "Sergey Khabarov", role: "Architect", icon: <Square size={24} /> },
                 { name: "Seryozha Ris", role: "Evangelist", icon: <MousePointer2 size={24} /> }
               ].map((guide, i) => (
                  <div key={i} className="flex items-center gap-6 group cursor-pointer">
                     <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-transparent group-hover:border-black transition-all shadow-lg">
                        {guide.icon}
                     </div>
                     <div>
                        <h3 className="text-2xl font-bold group-hover:translate-x-2 transition-transform">{guide.name}</h3>
                        <p className="font-mono text-sm opacity-60 uppercase tracking-widest">{guide.role}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 md:px-12 py-24 border-t border-black/10">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl hover:scale-[1.02] transition-transform duration-300">
               <div className="flex justify-between items-start mb-8">
                  <h3 className="text-3xl font-bold">Standard</h3>
                  <span className="px-4 py-1 bg-[#C4B5FD] rounded-full text-sm font-bold">POS</span>
               </div>
               <div className="text-5xl font-grotesk font-bold mb-8">₽ 45,000</div>
               <div className="space-y-4 mb-12">
                  <div className="flex items-center gap-3"><Check size={18} /> Access to materials</div>
                  <div className="flex items-center gap-3"><Check size={18} /> Community chat</div>
                  <div className="flex items-center gap-3"><Check size={18} /> 2 Q&A sessions</div>
               </div>
               <button className="w-full py-4 rounded-xl border-2 border-black font-bold hover:bg-black hover:text-white transition-colors">
                  JOIN BATCH
               </button>
            </div>

            <div className="bg-black text-white rounded-[32px] p-8 md:p-12 shadow-xl hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#C4B5FD] rounded-full blur-[60px] opacity-50"></div>
               
               <div className="flex justify-between items-start mb-8 relative z-10">
                  <h3 className="text-3xl font-bold">Personal</h3>
                  <span className="px-4 py-1 bg-white text-black rounded-full text-sm font-bold">VIP</span>
               </div>
               <div className="text-5xl font-grotesk font-bold mb-8 relative z-10">₽ 120,000</div>
               <div className="space-y-4 mb-12 relative z-10 text-gray-300">
                  <div className="flex items-center gap-3"><Check size={18} className="text-[#C4B5FD]" /> Everything in Standard</div>
                  <div className="flex items-center gap-3"><Check size={18} className="text-[#C4B5FD]" /> Personal Mentoring (4h)</div>
                  <div className="flex items-center gap-3"><Check size={18} className="text-[#C4B5FD]" /> System Audit</div>
               </div>
               <button className="w-full py-4 rounded-xl bg-[#C4B5FD] text-black font-bold hover:bg-white transition-colors relative z-10">
                  APPLY NOW
               </button>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-12 flex justify-between items-end">
         <div className="text-[10vw] leading-none font-grotesk font-bold opacity-20 select-none pointer-events-none">
            POS {`{X26}`}
         </div>
         <div className="text-right">
            <p className="font-bold">AI MINDSET</p>
            <p className="text-sm opacity-60">© 2026</p>
         </div>
      </footer>

    </div>
  );
}
