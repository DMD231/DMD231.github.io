import { guides } from '@/data/content';
import { StackDiagram, UartDiagram, FpvDiagram } from '@/components/wiring';

function Diagrams({ ids }: { ids: ('stack' | 'uart' | 'fpv')[] }) {
  return (
    <div className="grid gap-4">
      {ids.includes('stack') && <StackDiagram />}
      {ids.includes('uart') && <UartDiagram />}
      {ids.includes('fpv') && <FpvDiagram />}
    </div>
  );
}

export default function GuidesPage() {
  return (
    <main className="container-x py-10">
      <p className="eyebrow eyebrow-dot">Гайды · {guides.length} штук · со схемами пайки</p>
      <h1 className="h-display mt-2 text-[26px] sm:text-[32px] md:text-[46px]">Сборка по шагам, без магии</h1>
      <p className="mt-3 max-w-2xl text-[15px] text-[#6f6e69]">Схемы подключения — прямо в гайдах. Красный — плюс, черный — земля, желтый — сигнал. Паяем при отключенной батарее.</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {guides.map((g, i) => (
            <article key={g.id} id={g.id} className="card scroll-mt-24 overflow-hidden">
              <div className="flex flex-wrap items-center gap-3 border-b border-[#e3e1da] px-6 py-4">
                <span className="spec-mono rounded bg-[#141412] px-2 py-1 text-[11px] text-white">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="h-display text-[19px]">{g.title}</h2>
                <span className="spec-mono ml-auto text-[11px] uppercase tracking-[0.1em] text-[#6f6e69]">{g.level} · {g.time}</span>
              </div>
              <div className="grid gap-6 px-6 py-5">
                <div className="grid gap-6 md:grid-cols-[1fr_220px]">
                  <ol className="space-y-2.5">
                    {g.steps.map((s, k) => (
                      <li key={k} className="grid grid-cols-[28px_1fr] gap-3 text-[14px] leading-relaxed">
                        <span className="spec-mono text-[12px] font-bold text-[#ff4d00]">{String(k + 1).padStart(2, '0')}</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                  <aside className="h-fit rounded-2xl bg-[#f4f3f0] p-4">
                    <p className="eyebrow">Инструмент</p>
                    <ul className="mt-2 space-y-1.5 text-[13px]">
                      {g.tools.map((t) => (
                        <li key={t} className="border-b border-[#e3e1da] pb-1.5 last:border-0">— {t}</li>
                      ))}
                    </ul>
                  </aside>
                </div>
                {g.diagrams && g.diagrams.length > 0 && <Diagrams ids={g.diagrams} />}
                {g.hacks && (
                  <div className="rounded-2xl border border-[#e3e1da] bg-[#faf9f7] p-5">
                    <p className="eyebrow eyebrow-dot">Лайфхаки</p>
                    <ul className="mt-3 space-y-2 text-[14px]">
                      {g.hacks.map((h) => (
                        <li key={h} className="flex gap-2"><span className="font-bold text-[#ff4d00]">›</span>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {g.warnings && (
                  <div className="rounded-2xl border border-[#f0c9b3] bg-[#fff4ec] p-5">
                    <p className="eyebrow !text-[#b23400]">Нельзя</p>
                    <ul className="mt-3 space-y-2 text-[14px]">
                      {g.warnings.map((w) => (
                        <li key={w} className="flex gap-2"><span className="font-bold">✕</span>{w}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
        <aside className="space-y-5 lg:sticky lg:top-[76px] lg:self-start">
          <figure className="img-frame aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/workshop.jpg" alt="Сборка дрона на столе" loading="lazy" />
          </figure>
          <div className="card p-5">
            <p className="eyebrow">Содержание</p>
            <ul className="mt-3 space-y-2 text-[14px] font-semibold">
              {guides.map((g, i) => (
                <li key={g.id}><a href={`#${g.id}`} className="hover:text-[#ff4d00]"><span className="spec-mono mr-2 text-[12px] text-[#b23400]">{String(i + 1).padStart(2, '0')}</span>{g.title}</a></li>
              ))}
            </ul>
          </div>
          <div className="card bg-[#141412] !border-[#141412] p-5 text-white">
            <p className="eyebrow !text-white/50">Правило №1</p>
            <p className="mt-2 text-[15px] font-bold leading-snug">Первое включение — только через дым-стоппер и без пропов.</p>
            <a href="/firmware" className="mt-4 inline-block text-[14px] font-bold text-[#ff4d00]">К прошивкам →</a>
          </div>
        </aside>
      </div>
    </main>
  );
}
