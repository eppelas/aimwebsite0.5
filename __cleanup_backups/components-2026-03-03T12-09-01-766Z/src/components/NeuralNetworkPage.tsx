import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Brain, Network, Cpu, Layers, Zap } from 'lucide-react';

const NeuralStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
    
    .font-inter { font-family: 'Inter', sans-serif; }
    .font-mono { font-family: 'Space Mono', monospace; }
    
    .neural-bg {
      background-color: #030014;
      background-image: 
        radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 0% 0%, rgba(56, 189, 248, 0.05) 0%, transparent 30%),
        radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.05) 0%, transparent 30%);
    }
    
    .glass-card {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    }
    
    .text-glow {
      text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
    }
  `}</style>
);

const NetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const particleCount = 50;
    const connectionDistance = 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(139, 92, 246, 0.5)';
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-50" />;
};

const LevelCard = ({ level, title, range, description, icon: Icon, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="glass-card p-8 rounded-2xl relative overflow-hidden group hover:border-violet-500/30 transition-colors duration-500"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon size={100} />
    </div>
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-6">
        <span className="font-mono text-xs text-violet-400 border border-violet-500/30 px-2 py-1 rounded">
          {level}
        </span>
        <span className="font-mono text-xs text-white/40">{range}</span>
      </div>
      <h3 className="text-2xl font-inter font-semibold text-white mb-4 group-hover:text-violet-200 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-white/60 leading-relaxed">
        {description}
      </p>
    </div>
    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </motion.div>
);

export default function NeuralNetworkPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  return (
    <div className="min-h-screen neural-bg text-white font-inter selection:bg-violet-500/30 overflow-x-hidden" ref={containerRef}>
      <NeuralStyles />
      <NetworkBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border border-violet-400/50 bg-violet-500/10 flex items-center justify-center">
            <img
              src="/assets/ai-mindset-logo.png"
              alt="AI Mindset logo"
              className="h-3 w-auto object-contain"
            />
          </div>
          <span className="font-mono text-xs tracking-widest text-white/80">AI MINDSET POS</span>
        </div>
        <div className="flex gap-6 font-mono text-xs text-white/60">
          <span className="hover:text-white cursor-pointer transition-colors">INDEX</span>
          <span className="hover:text-white cursor-pointer transition-colors">APPLY</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center relative z-10 px-4">
        <motion.div 
          style={{ y }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8 inline-block"
          >
            <span className="font-mono text-xs text-violet-400 tracking-[0.2em] border border-violet-500/30 px-4 py-2 rounded-full bg-violet-500/10">
              SYSTEM UPGRADE AVAILABLE
            </span>
          </motion.div>
          
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
            POS <span className="font-mono italic font-normal text-violet-400">{'{Sprint}'}</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Batch: Sprint-X26 <span className="mx-4 text-violet-500">•</span> Mar 02 — Mar 14, 2026
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-4"
        >
          <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Initialize System</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-violet-500 to-transparent" />
        </motion.div>
      </section>

      {/* Definition Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-light leading-tight mb-12"
          >
            Not a tool. <span className="text-violet-400 font-mono">An operating system.</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="glass-card p-8 rounded-xl">
              <div className="font-mono text-xs text-red-400 mb-4 flex items-center gap-2">
                <Zap size={14} /> INPUT
              </div>
              <p className="text-white/70">Chaos of tools, scattered notes, missed deadlines. The noise of the modern workflow.</p>
            </div>
            <div className="glass-card p-8 rounded-xl">
              <div className="font-mono text-xs text-emerald-400 mb-4 flex items-center gap-2">
                <Brain size={14} /> OUTPUT
              </div>
              <p className="text-white/70">Structured context, automated briefs, clear focus. A unified AI system tailored to your mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Levels Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <h2 className="text-4xl font-bold">System Architecture</h2>
            <div className="hidden md:block w-1/3 h-[1px] bg-white/10" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <LevelCard 
              level="LVL 01"
              title="Context"
              range="Day 1-3"
              description="AI learns who you are, how you work, and what matters to you. Establishing the baseline."
              icon={Brain}
              delay={0.1}
            />
            <LevelCard 
              level="LVL 02"
              title="Architecture"
              range="Day 4-7"
              description="Building the logical structure. Protecting data. Setting boundaries and protocols."
              icon={Layers}
              delay={0.2}
            />
            <LevelCard 
              level="LVL 03"
              title="Tools"
              range="Day 8-10"
              description="Connecting Claude Code, Cursor, Obsidian, and MCP into a unified neural network."
              icon={Cpu}
              delay={0.3}
            />
            <LevelCard 
              level="LVL 04"
              title="Skills"
              range="Day 11-14"
              description="Automating routine. Creating agents that think like you. achieving autonomy."
              icon={Network}
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Architects Section */}
      <section className="py-32 px-6 relative z-10 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Architects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alexander Povalyaev", role: "Strategist", desc: "15+ years connecting tech, business & people." },
              { name: "Sergey Khabarov", role: "System Architect", desc: "6+ years in EdTech. 500+ students trained." },
              { name: "Seryozha Ris", role: "AI Evangelist", desc: "Ex-Yandex. Founder of @vibecod3rs. Claude Code streamer." }
            ].map((mentor, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-32 h-32 rounded-full border-2 border-white/10 p-1 mb-6 group-hover:border-violet-500 transition-colors duration-500 relative">
                  <div className="w-full h-full rounded-full bg-white/5 overflow-hidden flex items-center justify-center">
                    <span className="font-mono text-2xl text-white/20 group-hover:text-white transition-colors">{i + 1}</span>
                  </div>
                  <div className="absolute inset-0 border border-violet-500/50 rounded-full scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">{mentor.name}</h3>
                <span className="font-mono text-xs text-violet-400 mb-4 uppercase tracking-widest">{mentor.role}</span>
                <p className="text-sm text-white/50 max-w-xs">{mentor.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-[60vh] flex flex-col justify-center items-center px-6 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 to-transparent pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl relative z-10"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Free your mind.
          </h2>
          <p className="text-xl text-white/60 mb-12 font-light">
            Leave the ops to AI. Join the sprint and build your second brain.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-8 py-4 bg-white text-black font-mono font-bold uppercase tracking-wider hover:bg-violet-200 transition-colors rounded-lg">
              Apply for Sprint
            </button>
            <button className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-sm font-mono font-bold uppercase tracking-wider hover:bg-white/10 transition-colors rounded-lg">
              Read Manifesto
            </button>
          </div>
          
          <div className="mt-16 flex flex-wrap justify-center gap-8 font-mono text-xs text-white/30">
            <span className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500 rounded-full" /> Alumni -20%</span>
            <span className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500 rounded-full" /> Bring a Friend -10%</span>
            <span className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500 rounded-full" /> Money-back Guarantee</span>
          </div>
        </motion.div>
      </section>
      
      <footer className="py-8 border-t border-white/5 text-center font-mono text-[10px] text-white/20 uppercase tracking-widest relative z-10">
        AI MINDSET POS • 2026
      </footer>
    </div>
  );
}
