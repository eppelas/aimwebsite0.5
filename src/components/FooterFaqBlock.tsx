import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type FooterFaqBlockProps = {
  title?: string;
  versionLabel?: string | null;
};

const FAQ_DATA = [
  {
    category: 'ОРГАНИЗАЦИЯ И ПРОЦЕССЫ',
    items: [
      { q: 'Наш подход к обучению', a: 'Практика прежде всего: реальные кейсы, практические задания и чеклисты в каждом модуле. Гибкость: программа подстраивается под динамику и интересы группы. Актуальность: следим за последними трендами в AI и обновляем контент. Философское осмысление: размышляем об этике и влиянии AI на будущее. Коллаборация: поощряем обмен идеями и опытом между участниками.' },
      { q: 'Будет ли возможность пообщаться с авторами курса лично?', a: 'Да, в рамках лаборатории предусмотрены коворкинги и Office Hours специально для разбора ваших вопросов авторами курса и кураторами. На воркшопах тоже предусмотрена возможность задавать вопросы.' },
      { q: 'Как будет организовано общение и взаимодействие участников?', a: 'Мы создадим закрытый Telegram-чат для участников. Этот чат и сами занятия — эффективные площадки для обсуждений, взаимной поддержки и обмена опытом.' },
    ],
  },
  {
    category: 'ОЖИДАНИЯ И РЕЗУЛЬТАТ',
    items: [
      { q: 'Кому лаборатория подходит, а кому нет?', a: 'Подходит: предприниматели, менеджеры, аналитики, преподаватели, криэйторы, исследователи и философы и все, кто интересуется будущим и своей эффективностью. Технический уровень: от начального до продвинутого. Вы готовы разбираться в новом, инвестировать время и силы. НЕ для вас, если: вы не готовы самостоятельно решать технические сложности, не готовы оплатить необходимые инструменты (AI-модели), ждёте готовые решения и не хотите думать самостоятельно.' },
      { q: 'Инструменты, которые мы освоим', a: 'Текстовые LLM: ChatGPT, Custom GPTs, GPT Canvas, Claude, Claude Artefacts, Google Gemini, Groq, OpenRouter. Софт с интеграцией AI: Claude Code, WindSurf, Cursor, Taskade, Tactiq, Krisp, Ollama, LMStudio, MSTY, Obsidian. Автоматизация и ресерч: Perplexity, Consensus, DeepResearches, Elicit, Elevenlabs, SuperWhisper, WisprFlow, n8n, make, Vapi, AutoGPT, AIDER. Графические и видео инструменты: Midjourney, Runway ML, Dream Machine, Heygen, Stable Diffusion, Pika.' },
      { q: 'Нужен ли технический бэкграунд для участия в лаборатории?', a: 'Нет, мы будем использовать готовые плагины и инструменты, доступные даже для новичков. Главное — ваше желание учиться и экспериментировать.' },
      { q: 'Ваши обязательства для максимального результата', a: 'Присутствие на live-сессиях с включенной камерой и активное участие. Самостоятельная оплата необходимых AI-инструментов. Выполнение практических заданий (минимум 2-3 часа в неделю). Готовность экспериментировать.' },
      { q: 'Что вы получите?', a: 'Системное понимание AI как партнера для мышления. Практические навыки: промпт-инжиниринг, контекст-инжиниринг, агенты и автоматизации. Собственные AI-ассистенты, настроенные на ваш контекст. AI-ритуалы для повышения продуктивности и креативности. Сообщество практиков.' },
    ],
  },
  {
    category: 'ОПЛАТА И УСЛОВИЯ',
    items: [
      { q: 'Какие варианты оплаты?', a: 'Принимаем рубли, криптовалюты, евро и доллары по SWIFT, Paypal и другим сервисам.' },
      { q: 'Можете ли выставить счёт?', a: 'Да, можем выставить счёт на консультационные услуги от юрлица в Армении.' },
      { q: 'Почему компании стоит купить этот курс для сотрудника?', a: 'Специальный тариф FOR TEAMS, экономия времени сотрудника, стоимость ниже найма нового специалиста, передача навыков коллегам, удобное совмещение с работой, автоматизация процессов.' },
      { q: 'Есть ли скидки для команд или возможность персонального консалтинга?', a: 'Да, есть тариф FOR TEAMS и расширенный пакет VISIONARY (индивидуальный трекинг, консультации, прямой доступ к авторам).' },
      { q: 'Возможен ли возврат, если мне не подойдет формат лаборатории?', a: 'Да, возврат после первой недели без вопросов (за вычетом комиссий платежных систем).' },
      { q: 'А как мне податься как Non-profit?', a: 'Мы предлагаем 3 бесплатных места на основе конкурса мотивационных писем для представителей некоммерческих и творческих организаций. Напишите нам для подачи заявки.' },
    ],
  },
];

export function FooterFaqBlock({
  title = 'вопросы и ответы',
  versionLabel = null,
}: FooterFaqBlockProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="w-full px-5 py-10 md:px-8 md:py-12">
      <div className="w-full flex flex-col">
        <div className="flex items-end gap-4 md:gap-10">
          <div className="text-[11px] md:text-[13px] font-bold uppercase tracking-[0.2em] text-black/32 shrink-0 mb-[0.15rem] md:mb-[0.25rem]">
            <span className="hidden sm:inline">[06] </span>
            FAQ_LOG
            {versionLabel ? <span className="hidden sm:inline"> {`// ${versionLabel}`}</span> : <span className="hidden sm:inline"> // 2026</span>}
          </div>
          <div className="h-px flex-1 bg-black/10 mb-[0.45rem] md:mb-[0.75rem]" />
          <h2 className="font-black uppercase tracking-[0.08em] text-2xl md:text-5xl/none text-right text-black">
            {title}
          </h2>
        </div>

        <div className="text-[10px] font-mono text-[#8DC63F] lowercase tracking-widest mt-4 mb-8 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-[#8DC63F]" />
          [f.a.q. module]
        </div>

        <div className="flex flex-col border border-black/10 bg-white">
          {FAQ_DATA.map((category, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div key={category.category} className="border-b border-black/10 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className={`w-full flex items-center justify-between px-5 py-4 text-left font-mono text-[14px] md:text-[15px] lowercase font-bold tracking-[0.04em] transition-colors ${isOpen ? 'bg-black text-white' : 'hover:bg-black/[0.035] text-black'}`}
                >
                  <span>{category.category.toLowerCase()}</span>
                  <span className={`${isOpen ? 'text-white' : 'text-black/35'} text-[18px] leading-none`}>
                    {isOpen ? '—' : '+'}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'circOut' }}
                      className="overflow-hidden bg-white"
                    >
                      <div className="px-6 py-6 flex flex-col gap-6 border-t border-black/10 md:px-7">
                        {category.items.map((item) => (
                          <div key={item.q} className="flex flex-col gap-1.5 max-w-[95%]">
                            <div className="text-[14px] md:text-[15px] text-black font-mono font-bold lowercase tracking-tight flex items-start gap-2">
                              <span className="text-[#8DC63F] font-mono select-none">q:</span>
                              <span>{item.q.toLowerCase()}</span>
                            </div>
                            <div className="text-[14px] md:text-[15px] text-black/72 leading-[1.55] font-sans pl-[20px] md:pl-[22px]">
                              {item.a}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
