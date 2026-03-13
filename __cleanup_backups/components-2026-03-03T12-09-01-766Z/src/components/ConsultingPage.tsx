import React from 'react';
import { ArrowRight } from 'lucide-react';

// --- Components ---

const SlideContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-full max-w-[1600px] mx-auto px-8 md:px-16 py-12 ${className}`}>
    {children}
  </div>
);

const GradientBlob = ({ className = "" }: { className?: string }) => (
  <div className={`absolute rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob ${className}`} />
);

const BarGradient = () => (
  <div 
    className="absolute inset-0 w-full h-full opacity-80"
    style={{
      background: `repeating-linear-gradient(
        90deg,
        #FFB7B2 0px,
        #FFB7B2 20px,
        #FFDAC1 20px,
        #FFDAC1 40px,
        #E2F0CB 40px,
        #E2F0CB 60px,
        #B5EAD7 60px,
        #B5EAD7 80px,
        #C7CEEA 80px,
        #C7CEEA 100px
      )`,
      backgroundSize: '200% 100%',
      animation: 'gradientMove 20s linear infinite'
    }}
  />
);

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-[#F4F4F4]/90 backdrop-blur-sm border-b border-gray-200">
    <div className="max-w-[1600px] mx-auto px-8 h-16 flex items-center justify-between text-xs font-medium tracking-wide uppercase text-gray-500">
      <div className="text-black text-lg tracking-tight font-semibold">AI Mindset Template</div>
      <div className="hidden md:flex gap-12">
        <span>Client: You</span>
        <span>Date: Winter 2026</span>
        <span>Status: Confidential</span>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="min-h-screen pt-20 bg-[#F4F4F4] flex flex-col relative overflow-hidden">
    <SlideContainer className="flex-grow flex flex-col justify-between relative z-10">
      <div>
        <h1 className="text-6xl md:text-8xl font-light tracking-tight text-black mb-4">
          AI MINDSET <br/>
          STRATEGY
        </h1>
        <p className="max-w-xl text-gray-500 text-sm md:text-base leading-relaxed">
          Identify a high-level positioning for your personal operating system to help develop a visionary AI-first workflow with a consistent, compelling narrative.
        </p>
      </div>
    </SlideContainer>
    
    <div className="h-[40vh] relative w-full overflow-hidden">
       <BarGradient />
       <div className="absolute inset-0 bg-gradient-to-t from-[#F4F4F4] to-transparent" />
    </div>
  </section>
);

const Agenda = () => (
  <section className="min-h-screen bg-[#F4F4F4] flex items-center relative overflow-hidden border-t border-gray-200">
    <SlideContainer className="grid md:grid-cols-2 gap-12 items-center h-full">
      <div>
        <h2 className="text-5xl md:text-6xl font-light mb-16">Agenda</h2>
        
        <div className="space-y-6 font-mono text-sm text-gray-500">
          {[
            "The Problem: Chaos of Tools",
            "The Solution: Systemic Thinking",
            "01 > Prompt Engineering",
            "02 > Context Engineering",
            "03 > Mind Engineering",
            "04 > Life Engineering",
            "KPIs & Results",
            "Next Steps"
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-center group cursor-default">
              <span className="text-xs opacity-50">{(i + 1).toString().padStart(2, '0')}</span>
              <span className="text-black group-hover:translate-x-2 transition-transform duration-300">» {item}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative h-[500px] w-full bg-gray-100 rounded-sm overflow-hidden">
        <div className="absolute inset-0 bg-[#E6E6FA]"></div>
        <GradientBlob className="bg-purple-300 top-0 -left-4 w-72 h-72" />
        <GradientBlob className="bg-yellow-300 bottom-0 -right-4 w-72 h-72 animation-delay-2000" />
        <GradientBlob className="bg-pink-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 animation-delay-4000" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>
    </SlideContainer>
  </section>
);

const SectionDivider = ({ number, title }: { number: string, title: string }) => (
  <section className="h-[60vh] relative flex items-center justify-center overflow-hidden">
    {/* Background Gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-orange-100 via-red-100 to-pink-100 opacity-80"></div>
    <div className="absolute inset-0 backdrop-blur-xl"></div>
    
    {/* Content */}
    <div className="relative z-10 flex items-baseline gap-8">
      <span className="text-9xl font-light tracking-tighter">{number}</span>
      <span className="text-2xl font-light tracking-wide uppercase opacity-70">{title}</span>
    </div>
  </section>
);

const ContentSlide = () => (
  <section className="min-h-screen bg-[#F4F4F4] py-20 border-t border-gray-200">
    <SlideContainer>
      <div className="mb-12">
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Our Task</div>
        <h2 className="text-4xl font-light">University of New Mindset</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-12">
          <div>
            <h3 className="text-sm font-bold uppercase border-b border-gray-300 pb-2 mb-4">Foundation</h3>
            <p className="text-gray-600 leading-relaxed">
              Academic research meets practical application. We don't just teach prompts; we teach the underlying logic of Large Language Models and how to align them with human cognition.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-xs font-bold text-gray-400 mb-1">FOUNDED</div>
              <div className="text-xl">2026</div>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 mb-1">WORLD RANK</div>
              <div className="text-xl">#1 AI LAB</div>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 mb-1">KNOWN FOR</div>
              <div className="text-sm">Systemic approach, community, results.</div>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 mb-1">BRANDING</div>
              <div className="text-sm">Make History.</div>
            </div>
          </div>
        </div>

        <div className="relative h-[400px] bg-gray-200 overflow-hidden">
           {/* Abstract Building/Structure */}
           <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black"></div>
           <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-b from-pink-200 via-purple-200 to-indigo-200 opacity-80"></div>
           <div className="absolute bottom-8 left-8 text-white text-xs font-mono">
              FIG 1.1: ARCHITECTURE OF THOUGHT
           </div>
        </div>
      </div>
    </SlideContainer>
  </section>
);

const KpiSlide = () => (
  <section className="min-h-screen bg-[#F4F4F4] py-20 border-t border-gray-200">
    <SlideContainer>
      <div className="mb-16">
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Our Task</div>
        <h2 className="text-4xl font-light">Our KPI gets results.</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="h-[400px] w-full relative overflow-hidden rounded-sm">
           <BarGradient />
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-16 content-center">
          {[
            { val: "200%", label: "Productivity Increase", sub: "Forming from two of Australia's most reputable universities." },
            { val: "15mn", label: "Time Saved / Day", sub: "Forming from two of Australia's most reputable universities." },
            { val: "20+", label: "Prompts Created", sub: "Forming from two of Australia's most reputable universities." },
            { val: "4", label: "Agents Deployed", sub: "Forming from two of Australia's most reputable universities." }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-5xl md:text-6xl font-light mb-2">{stat.val}</div>
              <div className="text-sm font-bold uppercase mb-2">{stat.label}</div>
              <div className="text-xs text-gray-500 leading-relaxed max-w-[200px]">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideContainer>
  </section>
);

const PricingSlide = () => (
  <section className="min-h-screen bg-[#F4F4F4] py-20 border-t border-gray-200">
    <SlideContainer>
      <div className="mb-12">
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Investment</div>
        <h2 className="text-4xl font-light">Partnership Options</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "Main Lab", price: "€590", desc: "Standard engagement model." },
          { name: "Advanced", price: "€890", desc: "Strategic partnership model.", active: true },
          { name: "Premium", price: "€1,490", desc: "Executive sponsorship model." }
        ].map((plan, i) => (
          <div key={i} className={`p-8 border ${plan.active ? 'border-purple-300 bg-purple-50/50' : 'border-gray-200 bg-white'} flex flex-col justify-between h-[400px]`}>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Option {i + 1}</div>
              <h3 className="text-2xl font-light mb-2">{plan.name}</h3>
              <p className="text-sm text-gray-500">{plan.desc}</p>
            </div>
            
            <div>
              <div className="text-4xl font-light mb-6">{plan.price}</div>
              <a href="https://join.aimindset.org/context" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-purple-600 hover:border-purple-600 transition-colors">
                Select Option &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </SlideContainer>
  </section>
);

const EndSlide = () => (
  <section className="h-screen relative flex items-center justify-center overflow-hidden">
    {/* Background Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 opacity-80"></div>
    <div className="absolute inset-0 backdrop-blur-3xl"></div>
    
    <div className="relative z-10 text-center">
      <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
        End of the <br/>
        presentation.
      </h2>
      <a 
        href="https://join.aimindset.org/waitlist"
        className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Join Waitlist <ArrowRight size={16} />
      </a>
    </div>
  </section>
);

export default function ConsultingPage() {
  return (
    <div className="bg-[#F4F4F4] text-black font-sans selection:bg-purple-200 selection:text-black">
      <Header />
      <main>
        <Hero />
        <Agenda />
        <SectionDivider number="01" title="Philosophy" />
        <ContentSlide />
        <SectionDivider number="02" title="Results" />
        <KpiSlide />
        <PricingSlide />
        <EndSlide />
      </main>
    </div>
  );
}
