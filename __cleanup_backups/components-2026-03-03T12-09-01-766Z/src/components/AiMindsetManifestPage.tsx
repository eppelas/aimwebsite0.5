import React, { useState, useEffect } from 'react';

const ManifestStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@300;400;500&display=swap');
    
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    .font-sans { font-family: 'Inter', sans-serif; }
    
    .text-manifest-red { color: #E53935; }
    .bg-manifest-red { background-color: #E53935; }
    .border-manifest-red { border-color: #E53935; }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    .blinking-cursor::after {
      content: '_';
      animation: blink 1s step-end infinite;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    /* Subtle dot grid for the hero section */
    .hero-grid-light {
      background-image: radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px);
      background-size: 24px 24px;
    }
    .hero-grid-dark {
      background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
      background-size: 24px 24px;
    }
  `}</style>
);

const CodeBlock = ({ code, isDark, title = "Improve v1→v2 >" }: { code: string, isDark: boolean, title?: string }) => (
  <div className={`p-6 relative font-mono text-sm leading-relaxed ${isDark ? 'bg-[#0A0A0A] border border-white/10 text-gray-300' : 'bg-[#F9F9F9] border border-black/5 text-black'}`}>
    {title && (
      <div className={`absolute top-4 right-4 text-[10px] px-2 py-1 border ${isDark ? 'text-manifest-red border-manifest-red/30' : 'text-manifest-red border-manifest-red/20'} hover:bg-manifest-red hover:text-white transition-colors cursor-pointer`}>
        {title}
      </div>
    )}
    <pre className="whitespace-pre-wrap mt-4">
      <code dangerouslySetInnerHTML={{ 
        __html: code
          .replace(/("[^"]*")/g, isDark ? '<span class="text-gray-500">$1</span>' : '<span class="text-gray-400">$1</span>')
          .replace(/(prompt|model|return|capture|distill|store|retrieve|agents)/g, '<span class="text-manifest-red">$1</span>') 
      }} />
    </pre>
  </div>
);

export default function AiMindsetManifestPage() {
  const [isDark, setIsDark] = useState(true);

  // Terminal animation state
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const fullTerminal = [
    "> initializing context_engine.sh",
    "> mounting memory modules... [OK]",
    "> establishing attention loops... [OK]",
    "> connecting agents...",
    "> SYS.READY. awaiting prompt."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < fullTerminal.length) {
        setTerminalLines(prev => [...prev, fullTerminal[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const themeClasses = {
    bg: isDark ? 'bg-[#050505]' : 'bg-white',
    text: isDark ? 'text-white' : 'text-black',
    textMuted: isDark ? 'text-gray-400' : 'text-gray-500',
    border: isDark ? 'border-white/10' : 'border-black/10',
    borderStrong: isDark ? 'border-white/20' : 'border-black/20',
    grid: isDark ? 'hero-grid-dark' : 'hero-grid-light',
    cardHover: isDark ? 'hover:bg-white/5' : 'hover:bg-black/5',
    nodeBg: isDark ? 'bg-[#050505]' : 'bg-white',
  };

  return (
    <div className={`h-screen overflow-y-scroll font-sans selection:bg-[#E53935] selection:text-white hide-scrollbar transition-colors duration-500 ${themeClasses.bg} ${themeClasses.text}`}>
      <ManifestStyles />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 backdrop-blur-md border-b border-transparent" style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
        <div className="flex items-center gap-3 font-mono text-sm font-medium">
          <div className={`w-3 h-3 ${isDark ? 'bg-white' : 'bg-black'}`} style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
          <img
            src="/assets/ai-mindset-logo.png"
            alt="AI Mindset logo"
            className="h-4 w-auto object-contain"
          />
          <span>AI_MINDSET {'{manifest}'}</span>
        </div>
        <div className="flex gap-4 font-mono text-xs items-center">
          <button 
            onClick={() => setIsDark(!isDark)}
            className={`px-3 py-1 border transition-colors ${isDark ? 'border-white/30 hover:border-white text-white' : 'border-black/30 hover:border-black text-black'}`}
          >
            {isDark ? 'LIGHT_MODE' : 'DARK_MODE'}
          </button>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-manifest-red/50 text-manifest-red">EN</button>
            <button className={`px-3 py-1 border transition-colors ${isDark ? 'border-white/30 hover:border-white text-white' : 'border-black/30 hover:border-black text-black'}`}>RU</button>
          </div>
        </div>
      </nav>

      {/* SECTION 1: TECH HERO */}
      <section className={`min-h-screen pt-32 px-6 md:px-12 flex flex-col justify-center relative ${themeClasses.grid}`}>
        {/* Subtle gradient overlay to make text readable over the grid */}
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]' : 'bg-gradient-to-b from-white/80 via-transparent to-white'} pointer-events-none`}></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
          
          {/* Left: Typography & Concept */}
          <div>
            <div className="inline-flex items-center gap-2 border border-manifest-red text-manifest-red px-2 py-1 text-[10px] font-mono uppercase tracking-widest mb-8">
              <span className="w-2 h-2 bg-manifest-red animate-pulse rounded-full"></span>
              SYS.CORE // ECOSYSTEM
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-mono mb-6 tracking-tight leading-none">
              AI Mindset<br/>
              <span className="text-manifest-red blinking-cursor">{'{Manifest}'}</span>
            </h1>
            
            <p className={`text-xl md:text-2xl max-w-2xl leading-relaxed mb-12 ${themeClasses.textMuted}`}>
              Build an AI operating system: prompt → attention → mind → life <span className="font-mono text-lg opacity-70">{'{engineering}'}</span>. Start with a <span className={`border-b ${isDark ? 'border-white text-white' : 'border-black text-black'}`}>Context Engine</span> — then scale into automation and teams.
            </p>

            {/* Pipeline Visualization */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <div className={`px-3 py-1 border ${themeClasses.border}`}>[ai_tools]</div>
              <span className="text-manifest-red">→</span>
              <div className="px-3 py-1 border border-manifest-red text-manifest-red bg-manifest-red/10">[{'{space}'}]</div>
              <span className="text-manifest-red">→</span>
              <div className={`px-3 py-1 border ${themeClasses.border}`}>[attention]</div>
              <span className="text-manifest-red">→</span>
              <div className={`px-3 py-1 border ${themeClasses.border}`}>[creative]</div>
              <span className="text-manifest-red">→</span>
              <div className={`px-3 py-1 border ${themeClasses.border}`}>[teams]</div>
            </div>
          </div>

          {/* Right: Terminal / Code */}
          <div className="flex flex-col gap-6">
            {/* Terminal Window */}
            <div className={`border ${themeClasses.border} rounded-sm overflow-hidden backdrop-blur-sm ${isDark ? 'bg-black/80 shadow-[0_0_30px_rgba(229,57,53,0.1)]' : 'bg-white/90 shadow-xl'}`}>
              <div className={`flex items-center gap-2 px-4 py-2 border-b ${themeClasses.border} ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className={`ml-2 text-[10px] font-mono ${themeClasses.textMuted}`}>root@aimindset:~</span>
              </div>
              <div className="p-6 font-mono text-xs md:text-sm leading-loose min-h-[200px]">
                {terminalLines.map((line, i) => (
                  <div key={i} className={line.includes('[OK]') ? 'text-green-500' : line.includes('SYS.READY') ? 'text-manifest-red' : themeClasses.textMuted}>
                    {line}
                  </div>
                ))}
                <div className="blinking-cursor mt-2"></div>
              </div>
            </div>

            {/* Code Block */}
            <CodeBlock 
              isDark={isDark}
              code={`// AI MINDSET MANIFEST (v1)
prompt = "make my week clearer";
return model(prompt);`} 
            />
          </div>

        </div>
      </section>

      {/* SECTION 2: PRODUCT MAP */}
      <section className={`py-32 px-6 md:px-12 max-w-7xl mx-auto border-t ${themeClasses.border}`}>
        <h2 className="text-5xl md:text-7xl font-mono mb-6 tracking-tight">
          <span className="text-manifest-red/40">{'{'}</span>Product map<span className="text-manifest-red/40">{'}'}</span>
        </h2>
        <p className={`text-xl md:text-2xl mb-20 ${themeClasses.textMuted}`}>Simple human language. Clear entry points. Links to everything.</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: List */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {[
              { title: "AI Mindset {space}", meta: "COMMUNITY · WEEKLY · FREE" },
              { title: "Winter Lab W26", meta: "SEASONAL · 4 WEEKS · JAN-FEB", active: true },
              { title: "Spring Lab X26", meta: "SEASONAL · 4 WEEKS · APR-MAY" },
              { title: "Summer Lab S26", meta: "SEASONAL · 4 WEEKS · JUL-AUG" },
              { title: "Fall Lab F26", meta: "SEASONAL · 4 WEEKS · OCT-NOV" },
              { title: "Sprint Labs", meta: "2 WEEKS · DOMAIN SKILLS" },
              { title: "Personal Consulting", meta: "€200/HOUR · DEEP WORK", highlight: true },
              { title: "Visionary Path", meta: "6-12 MONTHS · FULL ACCESS" },
              { title: "Team Track", meta: "3-5 PEOPLE · SHARED ENGINE" },
            ].map((item, i) => (
              <div key={i} className={`p-5 border transition-colors cursor-pointer ${item.active ? 'border-manifest-red bg-manifest-red/10' : item.highlight ? `border-manifest-red/40 ${themeClasses.cardHover}` : `${themeClasses.border} ${themeClasses.cardHover}`}`}>
                <h4 className="font-mono text-sm mb-2">{item.title}</h4>
                <p className={`text-[10px] font-mono uppercase tracking-widest ${themeClasses.textMuted}`}>{item.meta}</p>
              </div>
            ))}
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Timeline */}
            <div className={`border ${themeClasses.border} p-12 flex items-center justify-center ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#F9F9F9]'}`}>
              <div className="flex items-center w-full max-w-xl justify-between relative">
                <div className={`absolute left-0 right-0 h-[1px] border-b border-dashed top-1/2 -translate-y-1/2 z-0 ${themeClasses.borderStrong}`} />
                {[
                  { label: '{space}', active: false },
                  { label: 'seasonal', active: true },
                  { label: 'sprints', active: false },
                  { label: 'support', active: false },
                  { label: 'premium', active: false, top: 'consulting' },
                  { label: 'teams', active: false, top: 'visionary' },
                ].map((node, i) => (
                  <div key={i} className={`relative z-10 flex flex-col items-center gap-3 px-2 ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#F9F9F9]'}`}>
                    {node.top && <span className={`absolute -top-6 text-[9px] font-mono ${themeClasses.textMuted}`}>{node.top}</span>}
                    <div className={`w-3 h-3 rounded-full border ${node.active ? 'bg-manifest-red border-manifest-red' : `${themeClasses.nodeBg} border-manifest-red`}`} />
                    <span className={`text-[9px] font-mono ${themeClasses.textMuted}`}>{node.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detail Card */}
            <div className={`border ${themeClasses.border} p-8 md:p-12`}>
              <div className="flex gap-2 mb-8">
                <span className="px-2 py-1 border border-manifest-red text-manifest-red text-[10px] font-mono">SEASONAL</span>
                <span className={`px-2 py-1 border ${themeClasses.borderStrong} text-[10px] font-mono`}>4 WEEKS</span>
                <span className={`px-2 py-1 border ${themeClasses.borderStrong} text-[10px] font-mono`}>W26</span>
              </div>
              
              <h3 className={`text-lg md:text-xl mb-10 leading-relaxed ${themeClasses.textMuted}`}>
                <span className="text-manifest-red font-medium">Winter Lab W26:</span> 19 jan — 16 feb 2026. Review · planning · {'{context}'}. Базовый стек + 3 трека: coaching, creative, vibe-coding.
              </h3>

              <div className="grid grid-cols-[80px_1fr] gap-y-3 gap-x-4 text-xs font-mono mb-10">
                <div className="text-manifest-red">STACK</div>
                <div className={themeClasses.textMuted}>ChatGPT/Claude · Obsidian · Cursor · n8n/Make · Suno · Midjourney</div>
                <div className="text-manifest-red">FRAMES</div>
                <div className={themeClasses.textMuted}>prompt → context → mind → life {'{engineering}'}</div>
                <div className={`mt-4 col-span-2 text-[10px] opacity-50 ${themeClasses.textMuted}`}>Legend: community · seasonal · sprints · support · premium · teams</div>
              </div>

              <CodeBlock 
                isDark={isDark}
                code={`// WINTER LAB W26 (v1)
dates = "19 jan — 16 feb 2026"
price = €590 (early) / €690 (regular)`} 
              />

              <div className="flex gap-4 mt-8">
                <button className={`px-6 py-3 border font-mono text-xs transition-colors ${isDark ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}>JOIN W26</button>
                <button className={`px-6 py-3 border font-mono text-xs transition-colors ${themeClasses.borderStrong} ${isDark ? 'hover:border-white' : 'hover:border-black'}`}>BASE</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT IS AI MINDSET */}
      <section className={`py-32 px-6 md:px-12 max-w-7xl mx-auto border-t ${themeClasses.border}`}>
        <h2 className="text-5xl md:text-7xl font-mono mb-16 tracking-tight text-center md:text-left">
          <span className="text-manifest-red">{'{'}</span>What is AI Mindset<span className="text-manifest-red">{'}'}</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left */}
          <div>
            <p className={`text-2xl md:text-3xl leading-relaxed mb-12 ${themeClasses.textMuted}`}>
              Not a course about tools. A practice environment where you build an AI operating system for your work — one loop at a time.
            </p>
            <p className={`leading-relaxed mb-8 ${themeClasses.textMuted}`}>
              Core craft: <span className={`border-b pb-1 ${isDark ? 'text-white border-white/30' : 'text-black border-black/30'}`}>attention systems</span> (context engines) that make prompts, workflows, and agents reliable.
            </p>
            <p className={`leading-relaxed mb-8 ${themeClasses.textMuted}`}>
              A <span className={`border-b pb-1 ${isDark ? 'text-white border-white/30' : 'text-black border-black/30'}`}>Context Engine</span> turns messy signals into structured context + queryable memory — so automation is not a lottery.
            </p>
            <p className={`leading-relaxed ${themeClasses.textMuted}`}>
              You leave with artifacts: a dataset, operating principles, and a clear mind.
            </p>
          </div>
          
          {/* Right */}
          <div className="space-y-12">
            <div className={`border-t pt-8 ${themeClasses.border}`}>
              <h3 className="text-xl font-mono mb-4">Attention <span className="text-manifest-red">&gt;</span> Prompts</h3>
              <p className={`leading-relaxed ${themeClasses.textMuted}`}>
                A prompt without attention is a lottery. Reliability starts when AI sees your decisions, calendar, and constraints.
              </p>
            </div>
            <div className={`border-t pt-8 ${themeClasses.border}`}>
              <h3 className="text-xl font-mono mb-4">Systems <span className="text-manifest-red">&gt;</span> Hacks</h3>
              <p className={`leading-relaxed ${themeClasses.textMuted}`}>
                We build stable loops: input → context → action. Prompts are the UI; memory + agents are the system.
              </p>
            </div>
            <div className={`border-t pt-8 ${themeClasses.border}`}>
              <h3 className="text-xl font-mono mb-4">Meaning <span className="text-manifest-red">&gt;</span> Noise</h3>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CONTEXT ENGINES */}
      <section className={`py-32 px-6 md:px-12 max-w-7xl mx-auto border-t ${themeClasses.border}`}>
        <div className="inline-block border border-manifest-red text-manifest-red px-2 py-1 text-[10px] font-mono uppercase tracking-widest mb-12">
          ATTENTION · ENGINES
        </div>
        
        <h2 className="text-5xl md:text-7xl font-mono mb-12 tracking-tight">
          <span className="text-manifest-red">{'{'}</span>Context engines<span className="text-manifest-red">{'}'}</span>
        </h2>
        
        <p className={`text-2xl mb-20 max-w-3xl leading-relaxed ${themeClasses.textMuted}`}>
          A Context Engine is your attention system: it turns messy signals into structured context, repeatable decisions, and agent-ready memory.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left */}
          <div>
            <div className={`border-t pt-8 mb-16 ${themeClasses.border}`}>
              <h4 className="text-xl font-mono mb-6">4 layers</h4>
              <ul className={`space-y-4 font-mono text-sm ${themeClasses.textMuted}`}>
                <li className="flex gap-4"><span className="text-manifest-red">&gt;</span> <span><span className={`border-b pb-1 ${isDark ? 'text-white border-white/30' : 'text-black border-black/30'}`}>Capture</span> — signals → Inbox</span></li>
                <li className="flex gap-4"><span className="text-manifest-red">&gt;</span> <span><span className={`border-b pb-1 ${isDark ? 'text-white border-white/30' : 'text-black border-black/30'}`}>Distill</span> — summary → decisions</span></li>
                <li className="flex gap-4"><span className="text-manifest-red">&gt;</span> <span><span className={`border-b pb-1 ${isDark ? 'text-white border-white/30' : 'text-black border-black/30'}`}>Store</span> — KB + dataset</span></li>
                <li className="flex gap-4"><span className="text-manifest-red">&gt;</span> <span><span className={`border-b pb-1 ${isDark ? 'text-white border-white/30' : 'text-black border-black/30'}`}>Retrieve & act</span> — agents → outcomes</span></li>
              </ul>
            </div>

            <div className={`border-t pt-8 ${themeClasses.border}`}>
              <h4 className="text-xl font-mono mb-6">Why it matters</h4>
              <p className={`leading-relaxed ${themeClasses.textMuted}`}>
                Prompts are fragile. Context engines are upgradeable. Agents become safe and useful only when they are grounded in your engine.
              </p>
            </div>
          </div>
          
          {/* Right */}
          <div>
            <CodeBlock 
              isDark={isDark} 
              code={`// CONTEXT ENGINE (v1)
capture = inbox.pull("signals");
distill = model.summarize(capture);
store   = kb.write(distill);
retrieve = memory.query(store);

agents.attach(retrieve);
return decisions.make(retrieve);`} 
            />
          </div>
        </div>
      </section>

      {/* SECTION 5: CREATIVE TRACK */}
      <section className={`py-32 px-6 md:px-12 max-w-7xl mx-auto border-t ${themeClasses.border}`}>
        <div className="inline-block border border-manifest-red text-manifest-red px-2 py-1 text-[10px] font-mono uppercase tracking-widest mb-12">
          CREATIVE · ART/MUSIC
        </div>
        
        <h2 className="text-5xl md:text-7xl font-mono mb-12 tracking-tight">
          <span className="text-manifest-red/40">{'{'}</span>Creative track<span className="text-manifest-red/40">{'}'}</span>
        </h2>
        
        <p className={`text-2xl mb-20 max-w-3xl leading-relaxed ${themeClasses.textMuted}`}>
          Use art and music as an attention engine: ship artifacts, not content.<br/>
          (Lamp of music.)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left */}
          <div>
            <div className={`border-t pt-8 mb-16 ${themeClasses.border}`}>
              <h4 className="text-xl font-mono mb-6">What you build</h4>
              <ul className={`space-y-4 font-sans text-sm ${themeClasses.textMuted}`}>
                <li className="flex gap-4"><span className="text-manifest-red font-mono">&gt;</span> <span>1–3 creative artifacts (music / visuals / narrative demos)</span></li>
                <li className="flex gap-4"><span className="text-manifest-red font-mono">&gt;</span> <span>A repeatable loop: idea → prompt → artifact → critique → iterate</span></li>
                <li className="flex gap-4"><span className="text-manifest-red font-mono">&gt;</span> <span>A small library of prompts + templates</span></li>
              </ul>
            </div>

            <div className={`border-t pt-8 ${themeClasses.border}`}>
              <h4 className="text-xl font-mono mb-6">Stack + frames</h4>
              <p className={`leading-relaxed mb-6 ${themeClasses.textMuted}`}>
                Stack: Suno/ElevenLabs · Midjourney/Runway · Obsidian (ideas + datasets) · Cursor (demos).
              </p>
              <p className={`leading-relaxed ${themeClasses.textMuted}`}>
                Frames: constraints → iteration → publish. Make it small, then make it real.
              </p>
            </div>
          </div>
          
          {/* Right */}
          <div className="flex flex-col gap-8">
            <div className={`border p-12 flex items-center justify-center ${themeClasses.border} ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#F9F9F9]'}`}>
              <div className="flex items-center w-full max-w-sm justify-between relative">
                <div className={`absolute left-0 right-0 h-[1px] border-b border-dashed top-1/2 -translate-y-1/2 z-0 ${themeClasses.borderStrong}`} />
                {[
                  { label: 'idea', active: false },
                  { label: 'prompt', active: false },
                  { label: 'artifact', active: false },
                  { label: 'publish', active: false },
                ].map((node, i) => (
                  <div key={i} className={`relative z-10 flex flex-col items-center gap-3 px-2 ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#F9F9F9]'}`}>
                    <div className={`w-3 h-3 rounded-full border border-manifest-red ${themeClasses.nodeBg}`} />
                    <span className={`text-[9px] font-mono ${themeClasses.textMuted}`}>{node.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <CodeBlock 
              isDark={isDark}
              code={`// CREATIVE (v1)
prompt = "make a song";
return model(prompt);`} 
            />
          </div>
        </div>
      </section>

      {/* SECTION 6: B2B TEAMS */}
      <section className={`py-32 px-6 md:px-12 max-w-7xl mx-auto border-t ${themeClasses.border}`}>
        <div className="inline-block border border-manifest-red text-manifest-red px-2 py-1 text-[10px] font-mono uppercase tracking-widest mb-12">
          FOR TEAMS
        </div>
        
        <h2 className="text-5xl md:text-7xl font-mono mb-12 tracking-tight">
          <span className="text-manifest-red">{'{'}</span>B2B is <span className="text-manifest-red">teams mode{'}'}</span>
        </h2>
        
        <p className={`text-2xl mb-16 max-w-3xl leading-relaxed ${themeClasses.textMuted}`}>
          Not a separate corporate course. Pilot-first teams programs layered on labs: shared context engine, reusable workflows, working prototypes.
        </p>

        <div className="mb-16">
          <CodeBlock 
            isDark={isDark} 
            code={`// PILOT-FIRST
+pilot(team = 3..10)
+ → deliverables (processes, agents, templates)
+ → scale(org)
+
+focus = "AI Operating System"  // not "AI tools training"`} 
          />
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 border-t pt-16 ${themeClasses.border}`}>
          <div>
            <h4 className="text-xl font-mono mb-4">Team Track</h4>
            <p className={`leading-relaxed ${themeClasses.textMuted}`}>3–5+ people go through the lab together. Extra team sessions. Shared artifacts.</p>
          </div>
          <div>
            <h4 className="text-xl font-mono mb-4">Pilot</h4>
            <p className={`leading-relaxed ${themeClasses.textMuted}`}>Start small. Prove ROI. Then scale.</p>
          </div>
          <div className={`border-t pt-8 ${themeClasses.border}`}>
            <h4 className="text-xl font-mono mb-4">Contact</h4>
            <p className={`leading-relaxed mb-4 ${themeClasses.textMuted}`}>Email: <span className="text-manifest-red">info@aimindset.org</span></p>
            <a href="#" className="text-manifest-red border-b border-manifest-red/30 pb-1 text-sm font-mono hover:border-manifest-red transition-colors">Contact founder →</a>
          </div>
        </div>
      </section>

      {/* SECTION 7: HOW TO START */}
      <section className={`py-32 px-6 md:px-12 max-w-7xl mx-auto border-t ${themeClasses.border}`}>
        <h2 className="text-5xl md:text-7xl font-mono mb-12 tracking-tight">
          <span className="text-manifest-red">{'{'}</span>How to start<span className="text-manifest-red">{'}'}</span>
        </h2>
        
        <p className={`text-2xl mb-24 max-w-3xl leading-relaxed ${themeClasses.textMuted}`}>
          Pick your entry: {'{space}'} (free) → seasonal lab → sprints. Then scale to premium or teams.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
          <div className={`border-t pt-6 ${themeClasses.borderStrong}`}>
            <h4 className="text-xl font-mono mb-4">New to AI</h4>
            <p className={`leading-relaxed ${themeClasses.textMuted}`}>Start with {'{space}'} → Summer Lab S26 (basic track) → sprints by interest.</p>
          </div>
          <div className="border-t border-manifest-red pt-6">
            <h4 className="text-xl font-mono mb-4">Practitioners</h4>
            <p className={`leading-relaxed ${themeClasses.textMuted}`}>Winter Lab W26 → agents sprint → Spring Lab X26.</p>
          </div>
          <div className={`border-t pt-6 ${themeClasses.borderStrong}`}>
            <h4 className="text-xl font-mono mb-4">Creative</h4>
            <p className={`leading-relaxed ${themeClasses.textMuted}`}>Winter Lab (creative track) → art & music sprint → Summer Lab.</p>
          </div>
          <div className="hidden md:block"></div> {/* Empty cell for alignment */}
          
          <div className={`border-t pt-6 ${themeClasses.borderStrong}`}>
            <h4 className="text-xl font-mono mb-4">Loyalty</h4>
            <p className={`leading-relaxed mb-8 ${themeClasses.textMuted}`}>Alumni: 20% on all labs forever. Referral: 10% cashback + 10% discount for friend. Team: 15% for 3+ people.</p>
            <div className="flex gap-4">
              <button className={`px-4 py-2 border font-mono text-[10px] uppercase tracking-widest transition-colors ${themeClasses.borderStrong} ${isDark ? 'hover:border-white' : 'hover:border-black'}`}>TELEGRAM</button>
              <button className={`px-4 py-2 border font-mono text-[10px] uppercase tracking-widest transition-colors ${themeClasses.borderStrong} ${isDark ? 'hover:border-white' : 'hover:border-black'}`}>YOUTUBE</button>
            </div>
          </div>
          
          <div className="border-t border-manifest-red pt-6">
            <h4 className="text-xl font-mono mb-4">Start now</h4>
            <p className={`leading-relaxed mb-8 ${themeClasses.textMuted}`}>Join {'{space}'}, register for Winter Lab W26, or contact the founder.</p>
            <div className="flex flex-wrap gap-4">
              <button className={`px-4 py-2 border font-mono text-[10px] uppercase tracking-widest transition-colors ${isDark ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}>JOIN {'{SPACE}'}</button>
              <button className={`px-4 py-2 border font-mono text-[10px] uppercase tracking-widest transition-colors ${themeClasses.borderStrong} ${isDark ? 'hover:border-white' : 'hover:border-black'}`}>WINTER LAB W26</button>
              <button className={`px-4 py-2 border font-mono text-[10px] uppercase tracking-widest transition-colors ${themeClasses.borderStrong} ${isDark ? 'hover:border-white' : 'hover:border-black'}`}>WAITLIST 2026</button>
              <button className={`px-4 py-2 border font-mono text-[10px] uppercase tracking-widest transition-colors ${themeClasses.borderStrong} ${isDark ? 'hover:border-white' : 'hover:border-black'}`}>CONTACT FOUNDER</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`p-6 border-t flex justify-end ${themeClasses.border}`}>
        <div className={`font-mono text-[10px] ${themeClasses.textMuted}`}>
          manifest v3 · hover to inspect stack
        </div>
      </footer>

    </div>
  );
}
