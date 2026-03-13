import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDown, Smartphone, Check } from 'lucide-react';

const OrangeSwissStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

    .font-inter { font-family: 'Inter', sans-serif; }
    .font-grotesk { font-family: 'Space Grotesk', sans-serif; }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    .flow-box {
      border: 1px solid black;
      padding: 12px 24px;
      border-radius: 999px;
      background: transparent;
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      transition: all 0.2s ease;
    }
    
    .flow-box:hover {
      background: black;
      color: #FF4400;
    }

    .flow-rect {
      border: 1px solid black;
      padding: 16px;
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      background: transparent;
    }

    .inktrap-text {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(60px, 15vw, 200px);
      line-height: 0.9;
      letter-spacing: -0.04em;
    }
  `}</style>
);

const FlowArrow = ({ direction = 'down' }: { direction?: 'down' | 'right' }) => (
  <div className={`flex items-center justify-center ${direction === 'down' ? 'h-12 w-full' : 'w-12 h-full'}`}>
    {direction === 'down' ? <ArrowDown size={16} /> : <ArrowRight size={16} />}
  </div>
);

export default function AiMindsetOrangeSwissPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-[#FF4400] text-black selection:bg-black selection:text-[#FF4400] hide-scrollbar font-inter relative">
      <OrangeSwissStyles />

      {/* Navigation */}
      <nav className="px-6 py-8 md:px-12 flex justify-between items-baseline sticky top-0 z-50 mix-blend-multiply pointer-events-none">
        <div className="text-2xl md:text-4xl font-grotesk font-medium tracking-tight pointer-events-auto flex items-center gap-3">
          <span className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-black/70 bg-black/5 inline-flex items-center justify-center">
            <img
              src="/assets/ai-mindset-logo.png"
              alt="AI Mindset logo"
              className="h-4 md:h-5 w-auto object-contain"
            />
          </span>
          <span>AI MINDSET</span>
        </div>
        <div className="hidden md:flex gap-8 text-2xl md:text-4xl font-grotesk font-medium tracking-tight pointer-events-auto">
          <a href="#context" className="hover:underline decoration-2 underline-offset-4">CONTEXT</a>
          <a href="#system" className="hover:underline decoration-2 underline-offset-4">SYSTEM</a>
          <a href="#about" className="hover:underline decoration-2 underline-offset-4">ABOUT</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-12 pt-12 pb-32 min-h-[80vh] flex flex-col justify-between">
        <div className="max-w-4xl">
           <h1 className="text-6xl md:text-9xl font-grotesk font-medium leading-[0.9] tracking-tighter mb-12">
             PERSONAL<br/>
             OPERATIONAL<br/>
             SYSTEM
           </h1>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-black pt-8">
              <div>
                <p className="text-lg font-medium mb-2">Batch: Sprint-X26</p>
                <p className="text-lg opacity-60">2 March — 14 March 2026</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl leading-tight">
                  From chaos to a working AI system tailored for you. A layer of rules, context, and constraints that makes tools work.
                </p>
              </div>
           </div>
        </div>
      </section>

      {/* User Stories / Concept */}
      <section id="context" className="px-6 md:px-12 py-24 border-t border-black">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
           <div className="md:col-span-4">
              <h2 className="text-4xl underline decoration-2 underline-offset-8 mb-12 font-grotesk">User Stories</h2>
              <div className="space-y-12">
                 <div>
                    <span className="text-xl font-bold block mb-2">#1</span>
                    <p className="text-2xl md:text-3xl leading-tight font-light">
                      "As a founder, I want my AI agent to plan my day based on my energy levels, not just my calendar."
                    </p>
                 </div>
                 <div>
                    <span className="text-xl font-bold block mb-2">#2</span>
                    <p className="text-2xl md:text-3xl leading-tight font-light">
                      "As a creative, I want a system that captures my context so I don't have to explain myself to AI every time."
                    </p>
                 </div>
              </div>
           </div>

           {/* Flowchart Visualization */}
           <div className="md:col-span-8 flex flex-col items-center justify-center py-12">
              <div className="w-full max-w-2xl">
                 <div className="flow-rect bg-black text-[#FF4400]">User Input / Chaos</div>
                 <FlowArrow />
                 <div className="flow-box">Context Layer</div>
                 <FlowArrow />
                 <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center">
                       <div className="flow-box w-full">Claude Code</div>
                       <FlowArrow />
                       <div className="flow-rect w-full">Code</div>
                    </div>
                    <div className="flex flex-col items-center">
                       <div className="flow-box w-full">Obsidian</div>
                       <FlowArrow />
                       <div className="flow-rect w-full">Knowledge</div>
                    </div>
                    <div className="flex flex-col items-center">
                       <div className="flow-box w-full">MCP Server</div>
                       <FlowArrow />
                       <div className="flow-rect w-full">Action</div>
                    </div>
                 </div>
                 <FlowArrow />
                 <div className="flow-rect bg-black text-[#FF4400]">System Output / Order</div>
              </div>
           </div>
        </div>
      </section>

      {/* Typography Showcase */}
      <section className="py-32 px-6 md:px-12 border-t border-black overflow-hidden">
         <div className="mb-12">
            <p className="text-sm uppercase tracking-widest mb-2">System Typography</p>
            <p className="text-xl font-medium">Space Grotesk + Inter</p>
         </div>
         
         <div className="text-center">
            <motion.div style={{ y }} className="inktrap-text">
               System
            </motion.div>
            <div className="inktrap-text opacity-50">
               Architecture
            </div>
         </div>

         <div className="flex justify-center gap-8 mt-16 font-mono text-sm md:text-base flex-wrap">
            <span>Aa Bb Cc Dd</span>
            <span>Ee Ff Gg Hh</span>
            <span>Ii Jj Kk Ll</span>
            <span>Mm Nn Oo Pp</span>
            <span>Qq Rr Ss Tt</span>
            <span>Uu Vv Ww Xx</span>
            <span>Yy Zz</span>
         </div>
      </section>

      {/* Mockups / Tools */}
      <section id="system" className="px-6 md:px-12 py-24 border-t border-black bg-[#EAEAEA]">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Phone 1 */}
            <div className="flex flex-col items-center">
               <div className="w-[300px] h-[600px] border-4 border-black rounded-[40px] bg-white p-6 flex flex-col relative overflow-hidden shadow-2xl">
                  <div className="w-32 h-6 bg-black absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl"></div>
                  <div className="mt-12 mb-8">
                     <h3 className="text-2xl font-bold mb-2">Morning Brief</h3>
                     <p className="text-sm text-gray-500">08:00 AM</p>
                  </div>
                  <div className="space-y-4">
                     <div className="p-4 bg-gray-100 rounded-xl">
                        <div className="text-xs uppercase text-gray-400 mb-1">Priority</div>
                        <div className="font-medium">Review Q1 Strategy</div>
                     </div>
                     <div className="p-4 bg-gray-100 rounded-xl">
                        <div className="text-xs uppercase text-gray-400 mb-1">Meeting</div>
                        <div className="font-medium">Team Sync @ 10:00</div>
                     </div>
                     <div className="p-4 bg-[#FF4400]/10 border border-[#FF4400] rounded-xl">
                        <div className="text-xs uppercase text-[#FF4400] mb-1">Agent Note</div>
                        <div className="font-medium text-sm">I've prepared the brief for the sync based on yesterday's notes.</div>
                     </div>
                  </div>
               </div>
               <p className="mt-8 font-mono text-sm uppercase tracking-widest">Fig 1. Agent Daily Plan</p>
            </div>

            {/* Phone 2 */}
            <div className="flex flex-col items-center md:mt-24">
               <div className="w-[300px] h-[600px] border-4 border-black rounded-[40px] bg-black text-white p-6 flex flex-col relative overflow-hidden shadow-2xl">
                  <div className="w-32 h-6 bg-[#222] absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl"></div>
                  <div className="mt-12 flex-1 flex flex-col justify-center items-center text-center">
                     <div className="w-24 h-24 rounded-full border-2 border-[#FF4400] flex items-center justify-center mb-6 animate-pulse">
                        <div className="w-20 h-20 rounded-full bg-[#FF4400]"></div>
                     </div>
                     <h3 className="text-2xl font-bold mb-2">Listening...</h3>
                     <p className="text-sm text-gray-400">Capturing Context</p>
                  </div>
                  <div className="h-32 flex items-end justify-center gap-1">
                     {[1,2,3,4,5,4,3,2,1].map((h, i) => (
                        <div key={i} className="w-2 bg-[#FF4400]" style={{ height: `${h * 10}%` }}></div>
                     ))}
                  </div>
               </div>
               <p className="mt-8 font-mono text-sm uppercase tracking-widest">Fig 2. Context Capture</p>
            </div>

            {/* Phone 3 */}
            <div className="flex flex-col items-center">
               <div className="w-[300px] h-[600px] border-4 border-black rounded-[40px] bg-white p-6 flex flex-col relative overflow-hidden shadow-2xl">
                  <div className="w-32 h-6 bg-black absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl"></div>
                  <div className="mt-12 mb-6">
                     <h3 className="text-2xl font-bold">Knowledge Graph</h3>
                  </div>
                  <div className="flex-1 border border-dashed border-gray-300 rounded-xl relative">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4 flex items-center justify-center text-[#FF4400] font-bold">POS</div>
                        <div className="text-xs text-gray-500">Connecting 1,240 nodes</div>
                     </div>
                     {/* Decorative nodes */}
                     <div className="absolute top-12 left-8 w-8 h-8 border border-black rounded-full"></div>
                     <div className="absolute bottom-24 right-12 w-12 h-12 border border-black rounded-full"></div>
                     <div className="absolute top-32 right-8 w-6 h-6 bg-gray-200 rounded-full"></div>
                  </div>
               </div>
               <p className="mt-8 font-mono text-sm uppercase tracking-widest">Fig 3. Obsidian Graph</p>
            </div>
         </div>
      </section>

      {/* Mentors */}
      <section id="about" className="px-6 md:px-12 py-24 border-t border-black">
         <h2 className="text-4xl md:text-6xl font-grotesk font-bold mb-16">THE GUIDES</h2>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black border border-black">
            {[
              { name: "Alexander Povalyaev", role: "Strategist", desc: "Founder of AI Mindset. 15+ years connecting tech & people." },
              { name: "Sergey Khabarov", role: "Architect", desc: "System Architect. 500+ students trained." },
              { name: "Seryozha Ris", role: "Evangelist", desc: "Ex-Yandex. Builder & Founder of Vibecoders." }
            ].map((mentor, i) => (
               <div key={i} className="bg-[#FF4400] p-8 md:p-12 hover:bg-black hover:text-[#FF4400] transition-colors duration-300 group h-full flex flex-col justify-between">
                  <div>
                     <div className="w-full aspect-square bg-black mb-8 grayscale group-hover:grayscale-0 transition-all overflow-hidden relative">
                        <img 
                           src={`https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=800&auto=format&fit=crop`} 
                           className="w-full h-full object-cover opacity-80"
                           alt=""
                        />
                     </div>
                     <h3 className="text-3xl font-bold mb-2">{mentor.name}</h3>
                     <p className="font-mono text-sm uppercase tracking-widest mb-4 opacity-70">{mentor.role}</p>
                  </div>
                  <p className="text-lg leading-relaxed">{mentor.desc}</p>
               </div>
            ))}
         </div>
      </section>

      {/* Pricing */}
      <section className="px-6 md:px-12 py-24 border-t border-black">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-black p-8 md:p-12 flex flex-col justify-between min-h-[400px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-shadow">
               <div>
                  <h3 className="text-4xl font-bold mb-4">Standard</h3>
                  <div className="text-6xl font-grotesk font-bold mb-8">₽ 45,000</div>
                  <ul className="space-y-3 text-lg">
                     <li className="flex items-center gap-3"><Check size={20} /> Access to materials</li>
                     <li className="flex items-center gap-3"><Check size={20} /> Community chat</li>
                     <li className="flex items-center gap-3"><Check size={20} /> 2 Q&A sessions</li>
                  </ul>
               </div>
               <button className="w-full py-4 bg-black text-[#FF4400] font-bold uppercase tracking-widest mt-12 hover:bg-white hover:text-black border border-transparent hover:border-black transition-all">
                  Apply Now
               </button>
            </div>

            <div className="bg-black text-[#FF4400] p-8 md:p-12 flex flex-col justify-between min-h-[400px] hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)] transition-shadow">
               <div>
                  <h3 className="text-4xl font-bold mb-4">Personal</h3>
                  <div className="text-6xl font-grotesk font-bold mb-8">₽ 120,000</div>
                  <ul className="space-y-3 text-lg">
                     <li className="flex items-center gap-3"><Check size={20} /> Everything in Standard</li>
                     <li className="flex items-center gap-3"><Check size={20} /> Personal Mentoring (4h)</li>
                     <li className="flex items-center gap-3"><Check size={20} /> System Audit</li>
                  </ul>
               </div>
               <button className="w-full py-4 bg-[#FF4400] text-black font-bold uppercase tracking-widest mt-12 hover:bg-white transition-all">
                  Apply Now
               </button>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-12 border-t border-black flex flex-col md:flex-row justify-between items-end">
         <div>
            <h2 className="text-[12vw] leading-[0.8] font-grotesk font-bold tracking-tighter">
               AI MINDSET
            </h2>
         </div>
         <div className="text-right mt-8 md:mt-0">
            <p className="font-mono text-sm uppercase tracking-widest">© 2026</p>
            <p className="font-mono text-sm uppercase tracking-widest">All Rights Reserved</p>
         </div>
      </footer>

    </div>
  );
}
