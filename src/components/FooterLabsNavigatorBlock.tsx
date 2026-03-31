import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const cn = (...classes: (string | boolean | undefined | null)[]) => classes.filter(Boolean).join(' ');

const ECOSYSTEM_CONTENT = [
  {
    id: 'spring-lab',
    titleLines: ['SPRING', 'MAIN LAB'],
    desc: 'Практический клуб AI-практиков',
    icon: (
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <motion.span
          animate={{ opacity: [0.75, 1, 0.8], y: [1, -1, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="font-mono text-[12px] md:text-[14px] tracking-[0.12em] font-black text-[#8DC63F] whitespace-nowrap"
          style={{ textShadow: '0 0 10px rgba(141,198,63,0.45)' }}
        >
          ∑ EXE: 10%
        </motion.span>
      </div>
    ),
  },
  {
    id: 'ai-native-orgs',
    titleLines: ['AI-NATIVE', 'ORGS'],
    desc: 'AI-трансформация команд',
    icon: (
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <motion.span
          animate={{ opacity: [0.7, 1, 0.72], letterSpacing: ['0.18em', '0.26em', '0.18em'] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="font-mono text-[12px] md:text-[14px] font-black text-[#C084FC] whitespace-nowrap"
          style={{ textShadow: '0 0 10px rgba(192,132,252,0.45)' }}
        >
          [ ====== ]
        </motion.span>
      </div>
    ),
  },
  {
    id: 'health-sprint',
    titleLines: ['HEALTH', 'SPRINT'],
    desc: 'Агентная инфраструктура',
    icon: (
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <motion.span
          animate={{ opacity: [0.76, 1, 0.76], scale: [0.98, 1.04, 0.98] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="font-mono text-[15px] md:text-[17px] tracking-[0.12em] font-black text-[#C084FC] whitespace-nowrap"
          style={{ textShadow: '0 0 10px rgba(192,132,252,0.42)' }}
        >
          I BvF I
        </motion.span>
      </div>
    ),
  },
  {
    id: 'summer-lab',
    titleLines: ['SUMMER', 'MAIN LAB'],
    desc: 'Платформа обучения',
    icon: (
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <motion.span
          animate={{ opacity: [0.76, 1, 0.8], x: [-1, 1, -1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="font-mono text-[13px] md:text-[15px] tracking-[0.16em] font-black text-[#8DC63F] whitespace-nowrap"
          style={{ textShadow: '0 0 10px rgba(141,198,63,0.45)' }}
        >
          [ DATA ]
        </motion.span>
      </div>
    ),
  },
];

const TABS = [
  { id: 0, label: 'ТЕКУЩИЕ' },
  { id: 1, label: 'БУДУЩИЕ' },
  { id: 2, label: 'АРХИВ' },
];

export function FooterLabsNavigatorBlock() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full font-sans">
      <div className="w-full bg-transparent text-black flex flex-col relative overflow-hidden">
        <div className="flex flex-col p-5 md:p-8 relative">
          <div className="flex items-center justify-between gap-4 mb-5 md:mb-6 relative z-10 w-full overflow-x-auto scrollbar-hide">
            <div className="font-sans text-[14px] md:text-[16px] font-black lowercase tracking-tight text-black shrink-0">
              другие лаборатории:
            </div>

            <div className="flex gap-2 shrink-0">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'font-mono text-[8.5px] md:text-[9.5px] font-bold tracking-[0.14em] uppercase px-2.5 py-1.5 md:px-4 md:py-2 transition-all outline-none shrink-0 whitespace-nowrap',
                    activeTab === tab.id
                      ? 'bg-black text-white border border-black'
                      : 'bg-transparent text-black/50 border border-transparent hover:text-black hover:border-black/20',
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative z-10 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="w-full flex justify-center"
              >
                {activeTab === 0 ? (
                  <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4 w-full justify-items-start">
                    {ECOSYSTEM_CONTENT.map((card) => (
                      <div key={card.id} className="relative group w-full max-w-[184px] aspect-[0.92] bg-white border border-black/10 px-4 py-4 md:px-[18px] md:py-[18px] flex flex-col hover:border-black/20 hover:shadow-[0_12px_22px_rgba(0,0,0,0.04)] transition-all cursor-pointer">
                        <div className="flex justify-start items-start w-full">
                          <div className="text-left">
                            {card.titleLines.map((line) => (
                              <span
                                key={line}
                                className="block whitespace-nowrap font-sans text-[15px] md:text-[16px] font-black tracking-[-0.045em] uppercase text-black leading-[0.92] group-hover:text-[#8DC63F] transition-colors"
                              >
                                {line}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex-1 flex items-center justify-center py-2 md:py-2.5">
                          {card.icon}
                        </div>

                        <div className="mt-auto min-h-[2.85rem] flex items-end">
                          <p className="font-mono text-[10px] md:text-[11px] leading-[1.34] text-black/62 group-hover:text-black transition-colors text-left">
                            {card.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full min-h-[220px] bg-white border border-black/10 flex flex-col items-center justify-center p-6 text-center">
                    <div className="text-[22px] md:text-[24px] font-black text-black mb-2 uppercase tracking-[0.06em]">WINTER MAIN LAB</div>
                    <div className="font-mono text-[11px] uppercase text-black/40 tracking-[0.18em]">архив потока w26</div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
