import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- Components ---

const CornerText = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={`absolute text-xs md:text-sm font-sans leading-tight z-30 ${className}`}>
    {children}
  </div>
);

const EdgeLabel = ({ text, side }: { text: string; side: 'left' | 'right' }) => (
  <div 
    className={`absolute top-1/2 -translate-y-1/2 ${side === 'left' ? 'left-4 md:left-8' : 'right-4 md:right-8'} z-30 hidden md:block`}
  >
    <span className="text-xs font-sans uppercase tracking-widest">{text}</span>
  </div>
);

const BigLetter = ({ char, className }: { char: string; className?: string }) => (
  <span className={`font-serif font-black italic text-[40vw] leading-none select-none pointer-events-none absolute text-black ${className}`}>
    {char}
  </span>
);

const SliderMarker = ({ 
  label, 
  sub, 
  active, 
  onClick 
}: { 
  label: string; 
  sub: string; 
  active: boolean; 
  onClick: () => void 
}) => (
  <div 
    className="flex flex-col items-center gap-4 cursor-pointer group"
    onClick={onClick}
  >
    <div className="text-[10px] font-mono uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
      {label}
    </div>
    <div className={`text-2xl font-serif italic transition-all duration-300 ${active ? 'scale-125 font-bold' : 'opacity-30'}`}>
      {sub}
    </div>
    <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${active ? 'bg-black' : 'bg-gray-300 group-hover:bg-gray-400'}`} />
  </div>
);

// --- Main Page ---

export default function FlowerTypographyPage() {
  const [activeWeek, setActiveWeek] = useState(0);

  const weeks = [
    { id: '01', title: 'Prompt', desc: 'Engineering' },
    { id: '02', title: 'Context', desc: 'Architecture' },
    { id: '03', title: 'Mind', desc: 'Engineering' },
    { id: '04', title: 'Life', desc: 'Design' },
  ];

  return (
    <div className="min-h-screen bg-[#F2F0E9] text-[#1A1A1A] font-sans relative overflow-hidden selection:bg-blue-200 selection:text-black">
      
      {/* --- Top Navigation --- */}
      <CornerText className="top-6 left-6 md:top-12 md:left-12 max-w-[200px]">
        <div className="font-bold text-xl mb-2">AI Mindset</div>
        <p className="opacity-60">
          A laboratory for new thinking in the AI era. Based between Moscow and the Cloud.
        </p>
      </CornerText>

      <CornerText className="top-6 left-1/2 -translate-x-1/2 hidden md:block">
        <nav className="flex gap-6 opacity-60">
          <a href="#" className="hover:opacity-100 hover:underline">Program</a>
          <a href="#" className="hover:opacity-100 hover:underline">Tracks</a>
          <a href="#" className="hover:opacity-100 hover:underline">More</a>
        </nav>
      </CornerText>

      <CornerText className="top-6 right-6 md:top-12 md:right-12 text-right">
        <div className="mb-2">join.aimindset.org</div>
        <a href="https://join.aimindset.org/context" className="bg-black text-white px-3 py-1 uppercase text-[10px] font-bold tracking-widest hover:bg-blue-600 transition-colors">
          Apply Now
        </a>
      </CornerText>

      {/* --- Side Labels --- */}
      <EdgeLabel text="Curriculum" side="left" />
      <EdgeLabel text="Services" side="right" />

      {/* --- Centerpiece --- */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        {/* Typography Layer (Behind) */}
        <div className="relative w-full h-full flex items-center justify-center">
          <BigLetter char="A" className="left-[15%] md:left-[20%]" />
          <BigLetter char="I" className="right-[15%] md:right-[20%]" />
        </div>

        {/* Flower Layer (Overlay) */}
        {/* Using mix-blend-multiply to knock out the white background of the image */}
        <div className="absolute inset-0 flex items-center justify-center z-20 mix-blend-multiply opacity-90">
          <img 
            src="https://images.unsplash.com/photo-1596436598228-e4909d949931?q=80&w=2000&auto=format&fit=crop" 
            alt="Blue Flower" 
            className="w-[80vw] md:w-[40vw] h-auto object-contain filter contrast-110 saturate-120"
          />
        </div>
      </div>

      {/* --- Bottom Slider --- */}
      <div className="absolute bottom-12 left-0 right-0 z-30 px-6 md:px-12">
        
        {/* Timeline Line */}
        <div className="w-full h-px bg-gray-300 absolute top-[60%] left-0 -z-10" />

        <div className="max-w-5xl mx-auto flex justify-between items-end pb-8">
           {/* Left Footer Text */}
           <div className="hidden md:block w-1/4 text-xs opacity-60">
             <h3 className="font-bold text-lg mb-1">Batch W26</h3>
             <p>Hello, welcome to the lab. Stay as long as you wish. You'll find something.</p>
           </div>

           {/* Slider Markers */}
           <div className="flex-1 flex justify-center gap-12 md:gap-32">
             {weeks.map((week, index) => (
               <div key={week.id}>
                 <SliderMarker 
                   label={week.id}
                   sub={week.title}
                   active={activeWeek === index}
                   onClick={() => setActiveWeek(index)}
                 />
               </div>
             ))}
           </div>

           {/* Right Footer Text */}
           <div className="hidden md:block w-1/4 text-right text-xs opacity-60">
             <p>I enjoy: prompt engineering, building agents, vibe-coding, touching grass, surround sound.</p>
           </div>
        </div>
        
        {/* Email Footer */}
        <div className="text-center mt-8">
           <a href="mailto:alex@aimindset.org" className="text-2xl md:text-4xl font-sans hover:text-blue-600 transition-colors">
             alex@aimindset.org
           </a>
        </div>
      </div>

    </div>
  );
}
