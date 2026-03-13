import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Assets & Styles ---

const EditorialFont = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;700;900&display=swap');
    
    .font-serif-text { font-family: 'EB Garmond', 'Times New Roman', serif; }
    .font-sans-bold { font-family: 'Inter', sans-serif; }
    
    .drop-cap::first-letter {
      float: left;
      font-size: 4.5rem;
      line-height: 0.8;
      font-weight: 400;
      margin-right: 0.5rem;
      margin-top: 0.5rem;
    }
  `}</style>
);

// --- Components ---

const SectionNumber = ({ num }: { num: string }) => (
  <div className="hidden md:block absolute left-4 md:left-12 top-0 text-4xl md:text-6xl font-serif-text font-light border-r-2 border-black pr-4 leading-none select-none opacity-50">
    {num}
  </div>
);

const PullQuote = ({ children }: { children: React.ReactNode }) => (
  <div className="text-3xl md:text-5xl lg:text-6xl font-serif-text leading-tight my-12 md:my-24 pl-0 md:pl-12 border-l-0 md:border-l-4 border-black/10">
    {children}
  </div>
);

// --- Main Page ---

export default function BlackOnBlackPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDFDFD] text-[#111] font-serif-text selection:bg-black selection:text-white overflow-x-hidden">
      <EditorialFont />

      {/* Header / Intro Section (Inverted) */}
      <div className="bg-black text-white min-h-[80vh] flex flex-col justify-between p-8 md:p-16 relative">
        <div className="max-w-4xl">
          <h1 className="font-sans-bold text-7xl md:text-9xl tracking-tighter leading-[0.8] mb-12">
            Black<br/>
            <span className="text-transparent stroke-white" style={{ WebkitTextStroke: '2px white' }}>on</span><br/>
            Black
          </h1>
          
          <div className="max-w-xl text-lg md:text-xl font-sans-bold font-light leading-relaxed opacity-80">
            <p className="mb-6">
              Eugene Thacker is the author of several books, including <span className="italic">In The Dust Of This Planet</span> (Zero Books, 2011). He teaches at The New School in New York.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm opacity-50 font-sans-bold mt-12 border-t border-white/20 pt-8">
          <div>
            <div className="uppercase tracking-widest mb-2 text-xs">A note on the type</div>
            <p>Set in Wremena by Roman Gornitsky. Times New Roman by Stanley Morison used for body.</p>
          </div>
          <div>
            <div className="uppercase tracking-widest mb-2 text-xs">Original Essay</div>
            <p className="underline cursor-pointer">publicdomainreview.org</p>
          </div>
          <div>
            <div className="uppercase tracking-widest mb-2 text-xs">Made with</div>
            <p>Readymag by Pavel Kedich in 2020</p>
          </div>
        </div>
      </div>

      {/* Section 2: Goethe */}
      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-40 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <SectionNumber num="2" />
        
        <div className="lg:col-start-3 lg:col-span-5">
          <p className="text-xl md:text-2xl leading-relaxed mb-8 drop-cap">
            But black proves to be a difficult colour to discuss for Goethe. In the opening sections of his treatise, "black" is often interchangeable with "dark" and "shadow", all three terms denoting a physiological state when the eye is deprived of light.
          </p>
          <p className="text-lg leading-relaxed opacity-80">
            For Goethe, black is not merely the absence of light, but a positive force that interacts with light to produce color. It is the "passive" principle, the darkness that allows the light to manifest as the visible spectrum.
          </p>
        </div>

        <div className="lg:col-span-4 flex flex-col items-center justify-center">
          <motion.div 
            className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-black/10 relative overflow-hidden bg-[#f0f0e0]"
            style={{ rotate }}
          >
             {/* Abstract Color Wheel Representation */}
             <div className="absolute inset-0" style={{ background: 'conic-gradient(from 0deg, #222, #444, #111, #333, #000, #222)' }} />
             <div className="absolute inset-[20%] bg-[#FDFDFD] rounded-full flex items-center justify-center text-center p-4 text-xs italic opacity-60">
               The Eye in Darkness
             </div>
          </motion.div>
          <span className="mt-4 text-sm italic opacity-50">Goethe's Color Wheel (Abstracted)</span>
        </div>

        <div className="lg:col-start-3 lg:col-span-9">
          <PullQuote>
            “If we keep the eyes open in a totally dark place, a certain sense of privation is experienced. The organ is abandoned to itself; it retires into itself.”
          </PullQuote>
        </div>
      </div>

      {/* Section 3: Fludd */}
      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-40 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-black/5">
        <SectionNumber num="3" />

        <div className="lg:col-start-3 lg:col-span-5">
          <p className="text-xl md:text-2xl leading-relaxed mb-8">
            It is this transition—from black as a colour you see, to black as a non-colour you don't see, to black as "nothing-to-see" (and you're seeing it)—it is this transition that Fludd encapsulates in his simple black square.
          </p>
          <p className="text-lg leading-relaxed opacity-80 mb-8">
            That black was for Fludd the "colour" of non-existence, of pre-existence, of an un-universe prior to its possibility. This idea has also come full circle in contemporary philosophy.
          </p>
        </div>

        <div className="lg:col-span-4 lg:col-start-9 relative">
           <motion.div 
             className="bg-black w-full aspect-square shadow-2xl flex items-center justify-center p-8 text-white/20 text-center text-sm font-serif-text italic"
             initial={{ rotate: 3 }}
             whileInView={{ rotate: -2 }}
             transition={{ duration: 1 }}
           >
             Et sic in infinitum
           </motion.div>
           <p className="mt-4 text-sm italic opacity-50 text-right">Robert Fludd, <span className="underline">Utriusque Cosmi</span>, 1617</p>
        </div>

         <div className="lg:col-start-3 lg:col-span-9">
          <PullQuote>
            It seems that we are brought back to Fludd’s cosmic black square, and the paradox of the flat abyss, the background that is a foreground.
          </PullQuote>
        </div>
      </div>

      {/* Section 4: The Abyss */}
      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-40 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-black/5">
        <SectionNumber num="4" />
        
        <div className="lg:col-start-3 lg:col-span-8">
          <h2 className="text-4xl md:text-6xl font-serif-text mb-12 italic">
            "Above all, black says this: I don’t bother you—don’t bother me."
          </h2>
          
          <div className="columns-1 md:columns-2 gap-12 text-lg leading-relaxed opacity-90">
            <p className="mb-8">
              In a short and opaque text entitled <span className="underline">"On the Black Universe"</span>, the French thinker François Laruelle extends this idea of black as a cosmological principle. Neither an absence of light nor a simple negation, black becomes the very foundation of a "universe of nothingness."
            </p>
            <p>
              This is the retinal pessimism of the nothing to see, that we see. It is a refusal of the correlation between the human mind and the world, a stepping back into a primordial indifference that existed before us and will persist after us.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black text-[#333] py-24 px-8 text-center font-sans-bold uppercase tracking-widest text-sm">
        End of Fragment
      </div>

    </div>
  );
}
