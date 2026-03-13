import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, MessageCircle, Mic, FileText, ExternalLink, Menu, X } from 'lucide-react';

const PublicStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap');
    
    .font-grotesk { font-family: 'Space Grotesk', sans-serif; }
    .font-inter { font-family: 'Inter', sans-serif; }
    
    .ticker-wrap {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
    }
    
    .ticker {
      display: inline-block;
      animation: ticker 30s linear infinite;
    }
    
    @keyframes ticker {
      0% { transform: translate3d(0, 0, 0); }
      100% { transform: translate3d(-100%, 0, 0); }
    }

    .public-blue { color: #0033FF; }
    .bg-public-blue { background-color: #0033FF; }
    .border-public-blue { border-color: #0033FF; }
    
    .hover-underline-animation {
      display: inline-block;
      position: relative;
    }

    .hover-underline-animation::after {
      content: '';
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: #0033FF;
      transform-origin: bottom right;
      transition: transform 0.25s ease-out;
    }

    .hover-underline-animation:hover::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  `}</style>
);

const Ticker = () => (
  <div className="fixed top-0 left-0 w-full bg-[#FEFEF5] border-b border-[#0033FF] py-2 z-50 text-[#0033FF] font-mono text-xs uppercase tracking-widest">
    <div className="ticker-wrap">
      <div className="ticker">
        AI MINDSET POS {`{SPRINT}`} — BATCH X26 — APPLICATIONS OPEN — MARCH 2-14 2026 — PERSONAL OPERATIONAL SYSTEM — AI MINDSET POS {`{SPRINT}`} — BATCH X26 — APPLICATIONS OPEN — MARCH 2-14 2026 — PERSONAL OPERATIONAL SYSTEM —
      </div>
    </div>
  </div>
);

const BigLink = ({ text, href = "#" }: { text: string, href?: string }) => (
  <a href={href} className="block text-[12vw] md:text-[5vw] leading-[0.9] font-grotesk font-bold text-[#0033FF] hover:italic transition-all duration-300 border-b border-[#0033FF] md:border-none pb-4 md:pb-0 mb-4 md:mb-0">
    {text}
  </a>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-4xl md:text-6xl font-grotesk font-bold text-[#0033FF] mb-8 leading-tight uppercase">
    {children}
  </h2>
);

const Paragraph = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`font-inter text-lg md:text-xl leading-relaxed mb-6 text-black/80 ${className}`}>
    {children}
  </div>
);

const MentorCard = ({ name, role, desc, link }: { name: string, role: string, desc: string, link: string }) => (
  <div className="border border-[#0033FF] p-6 hover:bg-[#0033FF] hover:text-white transition-colors group cursor-pointer">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-2xl font-bold font-grotesk uppercase">{name}</h3>
      <a href={link} target="_blank" rel="noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity">
        <ExternalLink size={20} />
      </a>
    </div>
    <div className="font-mono text-xs uppercase tracking-widest mb-4 opacity-60">{role}</div>
    <p className="font-inter text-sm leading-relaxed opacity-90">
      {desc}
    </p>
  </div>
);

export default function AiMindsetPublicPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FEFEF5] text-black font-inter selection:bg-[#0033FF] selection:text-white overflow-x-hidden" ref={containerRef}>
      <PublicStyles />
      <Ticker />

      <div className="flex flex-col md:flex-row pt-10">
        
        {/* Left Content Area */}
        <div className="w-full md:w-2/3 p-6 md:p-12 md:border-r border-[#0033FF] min-h-screen">
          
          {/* Hero */}
          <section className="min-h-[80vh] flex flex-col justify-center mb-24 relative">
            <div className="font-mono text-[#0033FF] mb-4">BATCH: SPRINT-X26 — APPLICATIONS: OPEN</div>
            <h1 className="text-[15vw] md:text-[8vw] leading-[0.85] font-grotesk font-bold text-[#0033FF] uppercase mb-12">
              AI Mindset<br/>
              POS {`{sprint}`}
            </h1>
            
            <div className="flex flex-col gap-8">
              <div className="max-w-xl">
                <Paragraph className="font-bold">
                  March 2 — March 14, 2026
                </Paragraph>
                <Paragraph>
                  In 2 weeks you will create your <span className="text-[#0033FF] font-bold">Personal Operational System</span>: 
                  a system of agents for managing attention, tasks, and knowledge. 
                  From the chaos of tools to a working AI system, tailored for you.
                </Paragraph>
              </div>
              
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#0033FF] mt-12"
              >
                <ArrowDown size={80} strokeWidth={3} />
              </motion.div>
            </div>

            {/* Scattered Images Effect (CSS/Divs) */}
            <div className="hidden md:block absolute top-10 right-10 w-32 h-40 bg-[#0033FF] rotate-12 opacity-10 mix-blend-multiply" />
            <div className="hidden md:block absolute bottom-40 right-20 w-48 h-48 rounded-full border-2 border-[#0033FF] -rotate-6 opacity-20" />
          </section>

          {/* What is POS */}
          <section className="mb-32" id="what-is-pos">
            <SectionTitle>What is POS?</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <Paragraph>
                  <strong>POS</strong> is not a tool, it is an operating system with a personal AI assistant. 
                  A layer of rules, context, and limitations that makes tools work.
                </Paragraph>
                <Paragraph>
                  Imagine:
                  <ul className="list-disc list-inside mt-4 space-y-2 text-base">
                    <li>Morning: Agent gives a day plan tailored to your energy.</li>
                    <li>Day: Reminds you of a meeting with a prepared brief.</li>
                    <li>Evening: Finds open tasks and blockers, gives a summary.</li>
                  </ul>
                </Paragraph>
              </div>
              <div className="bg-[#0033FF]/5 p-8 border border-[#0033FF] rotate-2">
                <h3 className="font-grotesk font-bold text-xl text-[#0033FF] mb-4 uppercase">Research</h3>
                <p className="text-sm font-inter">
                  For the last 6 months, we researched how founders build their POS. 
                  We analyzed architectures, stacks, and daily routines with AI agents.
                  <br/><br/>
                  We collected patterns and turned them into a sprint. 
                  Don't reinvent the wheel—take what works.
                </p>
              </div>
            </div>
          </section>

          {/* Results */}
          <section className="mb-32" id="results">
            <SectionTitle>Sprint Results</SectionTitle>
            <Paragraph className="text-2xl font-bold mb-12">
              You leave with a working system, not just notes.
            </Paragraph>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Collected Context", desc: "AI knows who you are, how you work, what matters." },
                { title: "Logical Architecture", desc: "Won't delete files without asking or buy useless courses." },
                { title: "Connected Tools", desc: "Claude Code / Cursor / Obsidian / MCP." },
                { title: "Working Skills", desc: "Automation of routine tasks and rules." }
              ].map((item, i) => (
                <div key={i} className="border-t-2 border-[#0033FF] pt-4">
                  <h3 className="font-grotesk font-bold text-xl mb-2 text-[#0033FF]">{item.title}</h3>
                  <p className="font-inter text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Mentors */}
          <section className="mb-32" id="mentors">
            <SectionTitle>Your Guides</SectionTitle>
            <Paragraph>
              We live in these processes every day — building systems, agents, skills.
            </Paragraph>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <MentorCard 
                name="Alexander Povalyaev" 
                role="Founder, Strategist" 
                desc="15+ years connecting tech, business, and people. Creating harmonious ecosystems that work for humans."
                link="https://t.me/alex_named_ai"
              />
              <MentorCard 
                name="Sergey Khabarov" 
                role="System Architect" 
                desc="6+ years in EdTech, 500+ trained specialists. Ex-CTO. Knows how processes work from the inside."
                link="https://t.me/alliknowisthatidontknownothing"
              />
              <MentorCard 
                name="Seryozha Ris" 
                role="AI Evangelist" 
                desc="Ex-Yandex. Builder and founder in @vibecod3rs. Claude Code streamer. Prince of vibecoding."
                link="https://t.me/ris_ai"
              />
            </div>
          </section>

          {/* Price */}
          <section className="mb-32" id="price">
            <SectionTitle>Price & Terms</SectionTitle>
            <div className="bg-[#0033FF] text-white p-8 md:p-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-white/30 pb-12">
                <div>
                  <h3 className="text-3xl font-bold font-grotesk mb-2">SPRINT X26</h3>
                  <p className="font-mono text-sm opacity-80">March 2 — March 14</p>
                </div>
                <div className="text-right mt-6 md:mt-0">
                  <div className="text-4xl font-bold font-grotesk">APPLY NOW</div>
                  <div className="font-mono text-sm opacity-80">Limited spots</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h4 className="font-bold mb-4 uppercase tracking-widest text-sm">Discounts</h4>
                  <ul className="space-y-2 font-inter text-sm opacity-90">
                    <li>• Alumni: -20%</li>
                    <li>• Bring a Friend: -10% each</li>
                    <li>• Payment in Rubles available</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4 uppercase tracking-widest text-sm">Guarantee</h4>
                  <p className="font-inter text-sm opacity-90">
                    Refund within the first 4 days — no questions asked.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-32" id="faq">
            <SectionTitle>FAQ</SectionTitle>
            <div className="space-y-4">
              {["Organization & Processes", "Expectations & Results", "Payment & Conditions", "Non-profit / Art Sphere?"].map((q, i) => (
                <div key={i} className="border border-[#0033FF] p-4 flex justify-between items-center cursor-pointer hover:bg-[#0033FF]/5">
                  <span className="font-bold font-grotesk text-[#0033FF]">{q}</span>
                  <ArrowDown size={20} className="text-[#0033FF]" />
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-[#0033FF] pt-12 pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-bold font-grotesk text-xl text-[#0033FF] mb-6">CONTACTS</h3>
                <div className="space-y-4 font-inter">
                  <a href="#" className="flex items-center gap-2 hover:text-[#0033FF]"><MessageCircle size={18}/> Telegram Channel</a>
                  <a href="#" className="flex items-center gap-2 hover:text-[#0033FF]"><Mic size={18}/> Podcast</a>
                  <a href="#" className="flex items-center gap-2 hover:text-[#0033FF]"><FileText size={18}/> Public Offer</a>
                </div>
              </div>
              <div>
                <h3 className="font-bold font-grotesk text-xl text-[#0033FF] mb-6">PROJECTS</h3>
                <div className="space-y-4 font-inter text-sm">
                  <a href="#" className="block hover:text-[#0033FF]">
                    <strong>AI Mindset {`{space}`}</strong><br/>
                    Practical club for founders.
                  </a>
                  <a href="#" className="block hover:text-[#0033FF]">
                    <strong>AI Mindset LAB</strong><br/>
                    Batch: Winter 26.
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-12 text-xs font-mono text-[#0033FF]/60 uppercase">
              Free your brain from operations. Leave resources for what matters.
            </div>
          </footer>

        </div>

        {/* Right Navigation Area (Sticky on Desktop) */}
        <div className="w-full md:w-1/3 p-6 md:p-12 md:h-screen md:sticky md:top-0 flex flex-col justify-between bg-[#FEFEF5]">
          <div className="hidden md:flex justify-end">
            <div className="bg-[#0033FF] text-white p-4 rounded-full">
              <Menu size={24} />
            </div>
          </div>

          <div className="flex flex-col justify-center h-full gap-2">
            <BigLink text="Program" href="#what-is-pos" />
            <BigLink text="Results" href="#results" />
            <BigLink text="Mentors" href="#mentors" />
            <BigLink text="Apply" href="#price" />
          </div>

          <div className="hidden md:block">
            <div className="text-[#0033FF] font-grotesk font-bold text-4xl mb-4">
              Let's chat!
            </div>
            <div className="grid grid-cols-2 gap-4">
               <img src="https://picsum.photos/seed/ai1/200/200" className="w-full h-auto border border-[#0033FF] rotate-2" alt="collage" />
               <img src="https://picsum.photos/seed/ai2/200/200" className="w-full h-auto border border-[#0033FF] -rotate-3" alt="collage" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
