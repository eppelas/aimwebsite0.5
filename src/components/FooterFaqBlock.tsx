import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type FooterFaqBlockProps = {
  title?: string;
  versionLabel?: string | null;
  mode?: 'default' | 'live';
};

const FAQ_DATA = [
  {
    category: 'ОРГАНИЗАЦИЯ И ПРОЦЕССЫ',
    items: [
      { q: 'Наш подход к обучению', a: 'Практика прежде всего: реальные кейсы, практические задания и чеклисты в каждом модуле. Гибкость: программа подстраивается под динамику и интересы группы. Актуальность: следим за последними трендами в AI и обновляем контент. Философское осмысление: размышляем об этике и влиянии AI на будущее. Коллаборация: поощряем обмен идеями и опытом между участниками.', highlights: ['Практика прежде всего', 'реальные кейсы', 'Гибкость', 'Актуальность', 'Коллаборация'] },
      { q: 'Будет ли возможность пообщаться с авторами курса лично?', a: 'Да, в рамках лаборатории предусмотрены коворкинги и Office Hours специально для разбора ваших вопросов авторами курса и кураторами. На воркшопах тоже предусмотрена возможность задавать вопросы.', highlights: ['коворкинги', 'Office Hours', 'разбора ваших вопросов', 'задавать вопросы'] },
      { q: 'Как будет организовано общение и взаимодействие участников?', a: 'Мы создадим закрытый Telegram-чат для участников. Этот чат и сами занятия — эффективные площадки для обсуждений, взаимной поддержки и обмена опытом.', highlights: ['закрытый Telegram-чат', 'эффективные площадки', 'взаимной поддержки', 'обмена опытом'] },
    ],
  },
  {
    category: 'ОЖИДАНИЯ И РЕЗУЛЬТАТ',
    items: [
      { q: 'Кому лаборатория подходит, а кому нет?', a: 'Подходит: предприниматели, менеджеры, аналитики, преподаватели, криэйторы, исследователи и философы и все, кто интересуется будущим и своей эффективностью. Технический уровень: от начального до продвинутого. Вы готовы разбираться в новом, инвестировать время и силы. НЕ для вас, если: вы не готовы самостоятельно решать технические сложности, не готовы оплатить необходимые инструменты (AI-модели), ждёте готовые решения и не хотите думать самостоятельно.', highlights: ['Подходит', 'Технический уровень: от начального до продвинутого', 'НЕ для вас', 'AI-модели', 'готовые решения'] },
      { q: 'Инструменты, которые мы освоим', a: 'Текстовые LLM: ChatGPT, Custom GPTs, GPT Canvas, Claude, Claude Artefacts, Google Gemini, Groq, OpenRouter. Софт с интеграцией AI: Claude Code, WindSurf, Cursor, Taskade, Tactiq, Krisp, Ollama, LMStudio, MSTY, Obsidian. Автоматизация и ресерч: Perplexity, Consensus, DeepResearches, Elicit, Elevenlabs, SuperWhisper, WisprFlow, n8n, make, Vapi, AutoGPT, AIDER. Графические и видео инструменты: Midjourney, Runway ML, Dream Machine, Heygen, Stable Diffusion, Pika.', highlights: ['Текстовые LLM', 'Софт с интеграцией AI', 'Автоматизация и ресерч', 'Графические и видео инструменты'] },
      { q: 'Нужен ли технический бэкграунд для участия в лаборатории?', a: 'Нет, мы будем использовать готовые плагины и инструменты, доступные даже для новичков. Главное — ваше желание учиться и экспериментировать.', highlights: ['Нет', 'готовые плагины и инструменты', 'доступные даже для новичков', 'ваше желание учиться и экспериментировать'] },
      { q: 'Ваши обязательства для максимального результата', a: 'Присутствие на live-сессиях с включенной камерой и активное участие. Самостоятельная оплата необходимых AI-инструментов. Выполнение практических заданий (минимум 2-3 часа в неделю). Готовность экспериментировать.', highlights: ['Присутствие на live-сессиях', 'активное участие', 'Самостоятельная оплата', 'минимум 2-3 часа в неделю', 'Готовность экспериментировать'] },
      { q: 'Что вы получите?', a: 'Системное понимание AI как партнера для мышления. Практические навыки: промпт-инжиниринг, контекст-инжиниринг, агенты и автоматизации. Собственные AI-ассистенты, настроенные на ваш контекст. AI-ритуалы для повышения продуктивности и креативности. Сообщество практиков.', highlights: ['Системное понимание AI', 'Практические навыки', 'Собственные AI-ассистенты', 'AI-ритуалы', 'Сообщество практиков'] },
    ],
  },
  {
    category: 'ОПЛАТА И УСЛОВИЯ',
    items: [
      { q: 'Какие варианты оплаты?', a: 'Принимаем рубли, криптовалюты, евро и доллары по SWIFT, Paypal и другим сервисам.', highlights: ['рубли', 'криптовалюты', 'евро и доллары', 'SWIFT', 'Paypal'] },
      { q: 'Можете ли выставить счёт?', a: 'Да, можем выставить счёт на консультационные услуги от юрлица в Армении.', highlights: ['Да', 'счёт', 'консультационные услуги', 'юрлица в Армении'] },
      { q: 'Почему компании стоит купить этот курс для сотрудника?', a: 'Специальный тариф FOR TEAMS, экономия времени сотрудника, стоимость ниже найма нового специалиста, передача навыков коллегам, удобное совмещение с работой, автоматизация процессов.', highlights: ['FOR TEAMS', 'экономия времени', 'стоимость ниже найма', 'передача навыков коллегам', 'автоматизация процессов'] },
      { q: 'Есть ли скидки для команд или возможность персонального консалтинга?', a: 'Да, есть тариф FOR TEAMS и расширенный пакет VISIONARY (индивидуальный трекинг, консультации, прямой доступ к авторам).', highlights: ['FOR TEAMS', 'VISIONARY', 'индивидуальный трекинг', 'консультации', 'прямой доступ к авторам'] },
      { q: 'Возможен ли возврат, если мне не подойдет формат лаборатории?', a: 'Да, возврат после первой недели без вопросов (за вычетом комиссий платежных систем).', highlights: ['Да', 'возврат после первой недели', 'без вопросов'] },
      { q: 'А как мне податься как Non-profit?', a: 'Мы предлагаем 3 бесплатных места на основе конкурса мотивационных писем для представителей некоммерческих и творческих организаций. Напишите нам для подачи заявки.', highlights: ['3 бесплатных места', 'конкурса мотивационных писем', 'некоммерческих и творческих организаций', 'Напишите нам'] },
    ],
  },
];

const renderHighlightedAnswer = (text: string, highlights: string[]) => {
  if (!highlights.length) return text;

  const escaped = highlights
    .slice()
    .sort((left, right) => right.length - left.length)
    .map((item) => item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const matcher = new RegExp(`(${escaped.join('|')})`, 'g');
  const parts = text.split(matcher);

  return parts.map((part, index) =>
    highlights.includes(part) ? <strong key={`${part}-${index}`} className="font-normal text-black/82">{part}</strong> : part,
  );
};

const EXPANDED_QUESTION_CLASS_NAME = 'inline-flex w-fit items-start rounded-none border border-black/16 bg-transparent px-2.5 py-1';

export function FooterFaqBlock({
  title = 'вопросы и ответы',
  versionLabel = null,
  mode = 'default',
}: FooterFaqBlockProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const isLiveMode = mode === 'live';
  const liveCategoryClassName =
    'flex w-full max-w-[17.2rem] items-center justify-between gap-3 px-0 py-3 text-[13px] text-black/66 md:max-w-[18rem] md:py-3.5 md:text-[14px]';

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
          <h2 className="font-black uppercase tracking-[0.06em] text-2xl md:text-5xl/[0.92] text-right text-black whitespace-nowrap">
            {title}
          </h2>
        </div>

        <div className="text-[10px] font-mono text-[#8DC63F] lowercase tracking-widest mt-4 mb-8 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-[#8DC63F]" />
          [f.a.q. module]
        </div>

        <div className="flex flex-col">
          {FAQ_DATA.map((category, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={category.category}
                className={`overflow-hidden transition-colors ${isLiveMode ? 'pb-2 md:pb-3' : 'border-b border-black/8 last:border-b-0'}`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className={`text-left font-mono font-semibold lowercase tracking-[0.02em] transition-colors ${
                    isLiveMode
                      ? `${liveCategoryClassName} ${isOpen ? 'border-b-0 text-black/82' : 'border-b border-black/12 text-black/66'}`
                      : 'w-full flex items-center justify-start gap-3 px-1 py-3 text-[13px] text-black/74 md:px-2 md:py-3.5 md:text-[14px]'
                  }`}
                >
                  <span className={`min-w-0 ${isOpen ? 'text-black' : undefined}`}>{category.category.toLowerCase()}</span>
                  <span className={`text-[18px] leading-none shrink-0 ${isOpen ? 'text-black' : 'text-black/22'}`}>
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
                      className="overflow-hidden bg-transparent"
                    >
                      <div
                        onClick={() => setOpenIdx(null)}
                        className={`${isLiveMode ? 'pt-6 px-0 pb-7 md:pt-7 md:pb-9' : 'pt-2 px-1 pb-5 md:px-2 md:pb-6'} flex cursor-pointer flex-col ${isLiveMode ? 'gap-10 md:gap-12' : 'gap-5'}`}
                      >
                        {category.items.map((item) => (
                          <div key={item.q} className={`mx-auto flex w-full max-w-full flex-col lg:mx-0 lg:max-w-[74%] xl:max-w-[70%] 2xl:max-w-[66%] ${isLiveMode ? 'gap-2' : 'gap-1.5'}`}>
                            <div className="inline-flex w-fit items-baseline gap-[0.18rem]">
                              <span className={`font-mono select-none text-[#8DC63F] font-bold lowercase leading-none ${isLiveMode ? 'text-[12px] md:text-[13px] tracking-[0.04em]' : 'text-[14px] md:text-[15px] tracking-tight'}`}>q:</span>
                              <span className={`${EXPANDED_QUESTION_CLASS_NAME} ${isLiveMode ? 'px-0 py-0 border-0 border-b border-black/6 text-[13px] md:text-[14px] text-black/84 font-semibold tracking-[0.015em]' : 'text-[14px] md:text-[15px] text-black font-bold tracking-tight'} font-mono lowercase leading-none`}>
                                {item.q.toLowerCase()}
                              </span>
                            </div>
                            <div lang="ru" className={`${isLiveMode ? 'mx-auto w-full text-[13px] leading-[2] tracking-[0.01em] text-black/62 md:mx-0 md:text-[14px] md:pl-[16px]' : 'text-[14px] md:text-[15px] text-black/72 leading-[1.6] pl-[20px] md:pl-[22px]'} font-sans text-left md:text-justify [hyphens:auto] [overflow-wrap:anywhere] [word-break:normal]`}>
                              {renderHighlightedAnswer(item.a, item.highlights)}
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
