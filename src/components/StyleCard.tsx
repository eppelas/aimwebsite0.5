import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GenerativeStyle } from '../data/generativeStyles';
import { StyleGenerator } from './StyleGenerator';
import { Hash } from 'lucide-react';

interface StyleCardProps {
  styleData: GenerativeStyle;
  categoryName: string;
}

export const StyleCard: React.FC<StyleCardProps> = ({ styleData, categoryName }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col h-[280px] w-full bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-all duration-300 overflow-hidden text-black dark:text-white"
    >
      {/* Top Meta Bar */}
      <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start z-10 pointer-events-none">
        <div className="font-mono text-[9px] font-medium tracking-wider uppercase opacity-30 flex items-center gap-1">
          <Hash className="w-2.5 h-2.5" />
          {styleData.id.toString().padStart(3, '0')}
        </div>
        <div className="font-sans text-[9px] font-bold tracking-widest uppercase opacity-20 text-right max-w-[60%] leading-tight truncate">
          {categoryName}
        </div>
      </div>

      {/* Graphic Generation Area - Pure aesthetic monochrome */}
      <div className="flex-1 w-full bg-[#fcfcfc] dark:bg-[#0a0a0a] relative flex items-center justify-center p-6 text-black dark:text-white">
        <div className="w-full h-full relative" style={{ color: "currentColor" }}>
            <StyleGenerator styleId={styleData.id} categoryId={styleData.categoryId} isHovered={isHovered} />
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="p-4 border-t border-black/5 dark:border-white/5 bg-white dark:bg-[#111]">
        <h3 className="font-sans font-bold text-sm leading-tight group-hover:text-[#8DC63F] transition-colors duration-300">
          {styleData.name}
        </h3>
        
        <div className={`mt-2 font-mono text-[9px] text-[#8DC63F] overflow-hidden whitespace-nowrap transition-all duration-300 ${isHovered ? 'max-h-8 opacity-100' : 'max-h-0 opacity-0'}`}>
          {`> RENDER_NODE_(\${styleData.id})`}
        </div>
      </div>
      
    </motion.div>
  );
};
