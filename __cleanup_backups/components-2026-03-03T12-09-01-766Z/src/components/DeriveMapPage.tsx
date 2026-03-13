import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, MapPin } from 'lucide-react';

// --- Assets & Styles ---

const DeriveFont = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&display=swap');
    .font-serif-display { font-family: 'Playfair Display', serif; }
    .font-sans-clean { font-family: 'Inter', sans-serif; }
    
    .map-pattern {
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }

    .jagged-line {
      clip-path: polygon(
        0% 0%, 100% 0%, 100% 100%, 
        95% 90%, 90% 100%, 85% 90%, 80% 100%, 
        75% 90%, 70% 100%, 65% 90%, 60% 100%, 
        55% 90%, 50% 100%, 45% 90%, 40% 100%, 
        35% 90%, 30% 100%, 25% 90%, 20% 100%, 
        15% 90%, 10% 100%, 5% 90%, 0% 100%
      );
    }
  `}</style>
);

// --- Components ---

const MapMarker = ({ number, label, x, y }: { number: string, label: string, x: string, y: string }) => (
  <div className="absolute group cursor-pointer" style={{ left: x, top: y }}>
    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white bg-black flex items-center justify-center text-xs md:text-sm font-sans-clean group-hover:bg-white group-hover:text-black transition-colors">
      {number}
    </div>
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs bg-black px-2 py-1 border border-white/20">
      {label}
    </div>
  </div>
);

const VideoCard = ({ title, duration }: { title: string, duration: string }) => (
  <div className="relative group cursor-pointer overflow-hidden border border-black/10">
    <div className="aspect-video bg-gray-200 relative">
      <img 
        src={`https://picsum.photos/seed/${title}/600/400?grayscale`} 
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white flex items-center justify-center backdrop-blur-sm">
          <Play fill="white" className="ml-1 w-5 h-5 md:w-8 md:h-8" />
        </div>
      </div>
      <div className="absolute bottom-2 right-2 text-white text-xs font-mono bg-black/50 px-1">
        {duration}
      </div>
    </div>
    <div className="p-4 bg-white">
      <h3 className="font-serif-display text-lg md:text-xl italic">{title}</h3>
    </div>
  </div>
);

// --- Main Page ---

export default function DeriveMapPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans-clean selection:bg-black selection:text-white">
      <DeriveFont />

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row min-h-screen border-b border-black">
        
        {/* Left: Typography */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-black">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif-display leading-[0.85] tracking-tight mb-12">
              DÉRIVE<br/>
              <span className="italic">IN</span> BERLIN
            </h1>
            
            <div className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed max-w-xl">
              <p className="mb-8">
                Flâneurs went walking in Berlin, following routes mentioned in <span className="border border-black px-2 py-0.5 inline-block mx-1">Franz Hessel's</span> book, "Walking in Berlin."
              </p>
              <p>
                Their impressions were captured in <span className="underline decoration-1 underline-offset-4">flows</span> of images, audio notes, videos, <span className="underline decoration-1 underline-offset-4">stories</span>, and a <span className="underline decoration-1 underline-offset-4">musical piece</span>.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right: Map */}
        <div className="w-full lg:w-1/2 bg-[#111] text-white relative overflow-hidden map-pattern">
          <div className="absolute inset-0 opacity-30" 
               style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
          />
          
          {/* Abstract Map Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M10,10 Q30,50 50,30 T90,80" fill="none" stroke="white" strokeWidth="0.2" />
            <path d="M20,90 Q40,60 60,80 T80,20" fill="none" stroke="white" strokeWidth="0.2" />
            <path d="M5,50 L95,50" fill="none" stroke="white" strokeWidth="0.1" strokeDasharray="2 2" />
          </svg>

          {/* Markers */}
          <MapMarker number="I" label="Charlottenburg" x="15%" y="25%" />
          <MapMarker number="II" label="Bayernviertel" x="35%" y="65%" />
          <MapMarker number="III" label="Schöneberg" x="45%" y="75%" />
          <MapMarker number="IV" label="Kurfürstendamm" x="25%" y="45%" />
          <MapMarker number="V" label="Kreuzberg" x="65%" y="55%" />
          <MapMarker number="VI" label="Alt Berlin" x="75%" y="35%" />
          <MapMarker number="VII" label="Dorotheenstadt" x="55%" y="25%" />
          <MapMarker number="VIII" label="Neukölln" x="85%" y="85%" />
          
          <div className="absolute bottom-8 left-8">
            <h3 className="font-serif-display italic text-2xl mb-4">The Routes</h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm opacity-70 font-mono">
              <li>I. Charlottenburg</li>
              <li>II. Bayernviertel</li>
              <li>III. Schöneberg</li>
              <li>IV. Kurfürstendamm</li>
              <li>V. Kreuzberg</li>
              <li>VI. Alt Berlin</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-black">
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-black flex flex-col justify-between">
          <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center mb-8">
            <span className="font-serif-display italic">I</span>
          </div>
          <p className="text-lg leading-relaxed">
            The flâneur reads the street, and human faces, displays, window dressings, café terraces, trains, cars, and trees become letters that yield the words.
          </p>
          <div className="mt-8 text-sm opacity-50 font-mono">— Franz Hessel, 1929</div>
        </div>

        <div className="p-8 md:p-12 border-b md:border-b-0 lg:border-r border-black bg-[#F5F5F0]">
          <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center mb-8">
            <span className="font-serif-display italic">IV</span>
          </div>
          <p className="text-lg leading-relaxed">
            Unlike Parisians, who arrive at the theatre after dinner satisfied, the Berliners come hungry and critical.
          </p>
          <div className="mt-8 text-sm opacity-50 font-mono">— Franz Hessel, 1929</div>
        </div>

        <div className="p-0 md:border-l border-black lg:border-l-0">
          <VideoCard title="A Mouse!" duration="0:07" />
          <div className="border-t border-black">
             <VideoCard title="Reportage..." duration="0:20" />
          </div>
        </div>
      </div>

      {/* Dark Section */}
      <div className="bg-[#111] text-white p-8 md:p-16 lg:p-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-8">
             <div className="w-16 h-1 bg-white" />
             <h2 className="text-4xl md:text-6xl font-serif-display uppercase tracking-wider">Berlin Drift</h2>
          </div>
          
          <p className="text-xl md:text-2xl font-light leading-relaxed opacity-80 mb-12">
            Alex Nadzharov montaged the Drift sounds into the psychogeographic musical piece "Berlin Drift". This is a sound-route through the city. Construction of interacting fragments put various places in one linear perception of Berlin.
          </p>

          <button className="flex items-center gap-4 group">
            <div className="w-16 h-16 rounded-full border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
              <Play className="ml-1" />
            </div>
            <span className="text-xl underline decoration-1 underline-offset-8">Watch Video</span>
          </button>
        </div>

        {/* Jagged Lines Decoration */}
        <svg className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none" viewBox="0 0 100 100">
          <polyline points="10,10 20,30 15,50 40,40 60,80 90,20" fill="none" stroke="white" strokeWidth="0.5" />
          <polyline points="50,10 60,40 40,60 80,90" fill="none" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Footer */}
      <footer className="p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-black">
        <div>
          <h3 className="font-serif-display text-2xl mb-4">Credits</h3>
          <ul className="space-y-2 text-sm opacity-70">
            <li>Project Curator: Denis Esakov</li>
            <li>Editor: Andrew Freeburg</li>
            <li>Designer: Dima Dewinn</li>
          </ul>
        </div>
        <div className="text-right">
          <div className="text-sm opacity-50 mb-2">© 2020 Eshkolot</div>
          <div className="font-serif-display italic text-xl">Metropolis Festival</div>
        </div>
      </footer>

    </div>
  );
}
