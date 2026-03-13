import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain, Sparkles } from 'lucide-react';

// --- Assets & Styles ---

const NeonFont = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Nimbus+Sans+L:wght@400;700&family=Arial:wght@400;700&display=swap');
    .font-nimbus { font-family: 'Nimbus Sans L', 'Arial', sans-serif; }
    
    .neon-yellow {
      color: #D4FF00;
    }
    .bg-neon-yellow {
      background-color: #D4FF00;
    }
    .fill-neon-yellow {
      fill: #D4FF00;
    }
    
    .dotted-underline {
      background-image: linear-gradient(to right, white 33%, rgba(255,255,255,0) 0%);
      background-position: bottom;
      background-size: 8px 2px;
      background-repeat: repeat-x;
      padding-bottom: 4px;
    }

    .sidebar-scroll::-webkit-scrollbar {
      width: 4px;
    }
    .sidebar-scroll::-webkit-scrollbar-track {
      background: #111;
    }
    .sidebar-scroll::-webkit-scrollbar-thumb {
      background: #333;
    }
  `}</style>
);

// --- Components ---

const SidebarItem = ({ text, active, onClick }: { text: string, active: boolean, onClick: () => void }) => (
  <div 
    onClick={onClick}
    className={`
      cursor-pointer py-1 text-sm md:text-base uppercase tracking-wide transition-colors flex items-center gap-2
      ${active ? 'text-white' : 'text-gray-500 hover:text-white'}
    `}
  >
    {active && (
      <motion.div 
        layoutId="active-indicator"
        className="w-3 h-3 md:w-4 md:h-4 text-[#D4FF00]"
      >
        <Sparkles size="100%" fill="currentColor" />
      </motion.div>
    )}
    <span className={active ? 'ml-0' : 'ml-5 md:ml-6'}>{text}</span>
  </div>
);

// --- Main Page ---

export default function NeonMinimalPage() {
  const [activeSection, setActiveSection] = useState('POS SPRINT');

  const menuItems = [
    "POS SPRINT",
    "WHAT IS POS?",
    "THE STACK",
    "PROGRAM",
    "WORKSHOPS",
    "MANIFESTO",
    "SPEAKERS",
    "PRICE",
    "FAQ",
    "CONTACT",
    "VOLUNTEERING",
    "COLLABORATE",
    "PRESS"
  ];

  return (
    <div className="min-h-screen bg-black text-white font-nimbus flex flex-col overflow-hidden selection:bg-[#D4FF00] selection:text-black">
      <NeonFont />

      {/* Header */}
      <header className="h-16 border-b border-white flex justify-between items-center px-4 md:px-8 shrink-0 z-20 bg-black">
        <div className="flex items-center gap-2 text-lg md:text-xl uppercase tracking-wider cursor-pointer hover:text-[#D4FF00] transition-colors">
          <ArrowLeft size={24} />
          <span>Back</span>
        </div>
        
        <div className="text-2xl md:text-3xl font-bold tracking-tighter">
          AI MINDSET<span className="text-[#D4FF00]">.</span>
        </div>

        <div className="text-lg md:text-xl uppercase tracking-wider cursor-pointer hover:text-[#D4FF00] transition-colors">
          Apply
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 lg:w-1/5 border-b md:border-b-0 md:border-r border-white p-6 md:p-8 overflow-y-auto sidebar-scroll bg-black z-10 h-1/3 md:h-auto">
          <div className="flex flex-col gap-2 md:gap-3">
            {menuItems.map((item) => (
              <SidebarItem 
                key={item} 
                text={item} 
                active={activeSection === item} 
                onClick={() => setActiveSection(item)}
              />
            ))}
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 relative flex flex-col items-center justify-center p-8 md:p-16 text-center">
          
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mb-12 text-[#D4FF00]"
          >
            <Brain size={120} strokeWidth={1} className="md:w-40 md:h-40" />
          </motion.div>

          {/* Main Typography */}
          <div className="flex flex-col gap-4 md:gap-8 items-center z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-8xl font-bold uppercase tracking-tight leading-none"
            >
              <span className="dotted-underline pb-2 md:pb-4">From Chaos</span>
            </motion.h1>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-8xl font-bold uppercase tracking-tight leading-none"
            >
              <span className="dotted-underline pb-2 md:pb-4">To System!</span>
            </motion.h1>
          </div>

          {/* Floating Details */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 md:mt-24 font-mono text-sm md:text-base text-gray-400 max-w-md"
          >
            <p className="mb-2">BATCH X26 • MAR 02-14</p>
            <p>BUILD YOUR PERSONAL OPERATIONAL SYSTEM</p>
          </motion.div>

          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
             <motion.div 
               animate={{ 
                 x: [0, 10, -10, 0],
                 y: [0, -10, 10, 0],
               }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-1/4 right-1/4 w-2 h-2 bg-white rounded-full opacity-20"
             />
             <motion.div 
               animate={{ 
                 x: [0, -20, 20, 0],
                 y: [0, 20, -20, 0],
               }}
               transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
               className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-[#D4FF00] rounded-full opacity-20"
             />
          </div>

        </main>
      </div>

    </div>
  );
}
