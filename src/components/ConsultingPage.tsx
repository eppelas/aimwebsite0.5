import { ArrowUpRight, ChevronLeft } from 'lucide-react';

const OFFERINGS = [
  'Обучение команды на реальных задачах компании',
  'AI-воркшопы и внедрение сценариев под ваш стек',
  'Разбор процессов, автоматизаций и внутренних ассистентов',
];

export default function ConsultingPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f7] text-[#181616]">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-10 md:px-10 md:py-16">
        <div className="flex items-center justify-between gap-4 border-b border-black/10 pb-6">
          <a
            href="/v3"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-black/60 transition-colors hover:text-black"
          >
            <ChevronLeft size={16} />
            Назад к лаборатории
          </a>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30">consulting</div>
        </div>

        <section className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:gap-12">
          <div className="space-y-6">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8DC63F]">For Teams</div>
            <h1 className="max-w-3xl text-4xl font-black uppercase tracking-tight text-black md:text-6xl">
              AI Mindset Consulting
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-black/70 md:text-lg">
              Эта страница сейчас в сборке. Пока держим здесь рабочую заглушку, чтобы основной сайт и маршрут
              `&nbsp;/v3&nbsp;` не падали из-за битого файла.
            </p>
          </div>

          <div className="rounded-[0.4rem] border border-black/10 bg-white/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <div className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-black/35">Что доступно сейчас</div>
            <div className="space-y-3">
              {OFFERINGS.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm leading-[1.45] text-black/72">
                  <span className="mt-[0.38rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#8DC63F]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <a
              href="https://t.me/A_I_Mindset_Support"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-black px-6 py-4 text-center text-[11px] font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#8DC63F]"
            >
              Обсудить проект
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
