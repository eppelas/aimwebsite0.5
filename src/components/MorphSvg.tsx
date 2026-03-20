import { motion } from 'motion/react';
import { MORPH_FRAMES } from './MorphFrames';

export const MorphSvg = ({ week }: { week: number }) => {
  // Ensure we don't crash if week is out of bounds
  const targetFrame = MORPH_FRAMES[week] || MORPH_FRAMES[0];

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      className="w-full h-full overflow-visible relative z-10 drop-shadow-2xl opacity-70"
      style={{ filter: "drop-shadow(0px 0px 40px rgba(163, 230, 53, 0.4))" }}
    >
      {/* We can skip the strict SVG filter glow to keep performance high with 400 animated lines,
          using a CSS drop-shadow on the SVG container instead if needed */}
      <g>
        {targetFrame.map((line, i) => (
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
              type: "spring",
              stiffness: 70,
              damping: 15,
              mass: 0.8,
              delay: i * 0.0005
            }}
            stroke="#a3e635"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        ))}
      </g>
    </svg>
  );
};
