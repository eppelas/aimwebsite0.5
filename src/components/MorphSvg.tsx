import { motion } from 'motion/react';
import { MORPH_FRAMES } from './MorphFrames';

export const MorphSvg = ({ week }: { week: number }) => {
  const targetFrame = MORPH_FRAMES[week] || MORPH_FRAMES[0];
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px) and (hover: none) and (pointer: coarse)').matches;

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      className="w-full h-full overflow-visible relative z-10 drop-shadow-2xl opacity-70"
      style={{ filter: "drop-shadow(0px 0px 40px rgba(163, 230, 53, 0.4))" }}
    >
      <g>
        {targetFrame.map((line, i) => {
          if (isTouch) {
            // High-performance static version for mobile
            return (
              <line
                key={`static-morph-line-${i}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                opacity={line.opacity * 0.9}
                stroke="#a3e635"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            );
          }
          
          // Full animated version for desktop
          return (
            <motion.line
              key={`morph-line-${i}`}
              initial={false}
              animate={{
                x1: line.x1,
                y1: line.y1,
                x2: line.x2,
                y2: line.y2,
                opacity: line.opacity * 0.9
              }}
              transition={{
                type: "spring", stiffness: 70, damping: 15, mass: 0.8,
                delay: i * 0.0005
              }}
              stroke="#a3e635"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          );
        })}
      </g>
    </svg>
  );
};
