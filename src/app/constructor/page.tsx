'use client';
import { useMemo, useState } from 'react';
import { parts, Part, Category, categoryLabels } from '@/data/parts';
import { checkBuild, estimateFlight } from '@/lib/compatibility';
import { PartMini } from '@/components/ui';

const steps: Category[] = ['frame', 'motor', 'stack', 'camera', 'vtx', 'rx', 'battery', 'props', 'gps', 'radio', 'goggles', 'antenna'];

const goals = [
  { v: 'fpv', t: 'Фристайл 5″', d: '4–6S · аналог · ELRS' },
  { v: 'longrange', t: 'Дальнолет 7″', d: 'Li-Ion · GPS · 868' },
  { v: 'cinema', t: 'Съемка', d: 'DJI O3 / Walksnail' },
] as const;

export default function ConstructorPage() {
  const [goal, setGoal] = useState<'fpv' | 'longrange' | 'cinema'>('fpv');
  const [build, setBuild] = useState<Record<string, Part | undefined>>({});

  const filtered = useMemo(
    () => steps.map((cat) => ({ cat, items: parts.filter((p) => p.category === cat && p.purpose.includes(goal)) })),
    [goal]
  );
  const result = checkBuild(build as never);
  const picked = Object.values(build).filter(Boolean).length;

  const pick = (cat: string, id: string) => {
    const p = parts.find((x) => x.id === id);
    setBuild((b) => ({ ...b, [cat]: p }));
  };

  return (
    <main className="container-x py-10">
      <p className="eyebrow">Конструктор · проверка совместимости live</p>
      <h1 className="h-display mt-2 text-[34px] md:text-[48px]">Собери комплект без конфликтов</h1>

      <div className="card mt-6 grid sm:grid-cols-3">
        {goals.map((g) => (
          <button
            key={g.v}
            onClick={() => setGoal(g.v)}
            className={`border-b border-[#e4e2dd] px-5 py-4 text-left last:border-0 sm:border-b-0 sm:border-r sm:last:border-0 ${goal === g.v ? 'bg-[#131416] text-white' : 'hover:bg-[#fafaf9]'}`}
          >
            <span className={`spec-mono text-[11px] uppercase tracking-[0.12em] ${goal === g.v ? 'text-white/60' : 'text-[#676c76]'}`}>{g.d}</span>
            <span className="mt-1 block text-[16px] font-bold">{g.t}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          {filtered.map(({ cat, items }, idx) => (
            <section key={cat} className="card overflow-hidden">
              <div className="flex items-center gap-4 border-b border-[#e4e2dd] px-5 py-4">
                <span className="spec-mono grid h-8 w-8 place-items-center rounded-md bg-[#f6f6f4] text-[12px] font-bold">{String(idx + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="text-[16px] font-bold tracking-tight">{categoryLabels[cat]}</h2>
                  <p className="spec-mono text-[11px] uppercase tracking-[0.1em] text-[#676c76]">
                    {build[cat] ? `${build[cat]?.name} · ${build[cat]?.priceRub.toLocaleString('ru-RU')} ₽` : `${items.length} варианта`}
                  </p>
                </div>
              </div>
              <div className="divide-y divide-[#e4e2dd]">
                {items.length === 0 && <p className="px-5 py-4 text-[14px] text-[#676c76]">Для этой цели вариантов нет — смотри полный каталог.</p>}
                {items.map((p) => {
                  const active = build[cat]?.id === p.id;
                  return (
                    <label key={p.id} className={`grid cursor-pointer grid-cols-[20px_72px_1fr_auto] items-start gap-3 px-5 py-4 hover:bg-[#fafaf9] ${active ? 'bg-[#fff7f2]' : ''}`}>
                      <input type="radio" name={cat} checked={active} onChange={() => pick(cat, p.id)} className="mt-1 h-4 w-4 accent-[#ff4d00]" />
                      <PartMini part={p} />
                      <span>
                        <span className="block text-[15px] font-bold leading-snug">{p.name}</span>
                        <span className="spec-mono mt-1 block text-[12px] text-[#676c76]">
                          {Object.entries(p.specs).slice(0, 3).map(([k, v]) => `${k}: ${v}`).join(' · ')}
                        </span>
                      </span>
                      <span className="text-right">
                        <span className="block font-mono text-[15px] font-bold">{p.priceRub.toLocaleString('ru-RU')} ₽</span>
                        <span className="spec-mono block text-[11px] text-[#676c76]">★ {p.rating}</span>
                        <a href={`/catalog/${p.id}`} className="spec-mono mt-1 inline-block text-[11px] font-bold text-[#b23400] underline underline-offset-2">Карточка →</a>
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <aside className="card overflow-hidden lg:sticky lg:top-[76px]">
          <div className="bg-[#131416] p-5 text-white">
            <p className="spec-mono text-[11px] uppercase tracking-[0.14em] text-white/60">Смета · выбрано {picked}</p>
            <p className="mt-1 font-mono text-[32px] font-bold tracking-tight">{result.total.toLocaleString('ru-RU')} ₽</p>
            <p className="mt-1 text-[13px] text-white/60">Пульт, очки и зарядник — отдельно, если их еще нет.</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded bg-white/15">
              <div className="h-full bg-[#ff4d00] transition-all" style={{ width: `${Math.min(100, (picked / steps.length) * 100)}%` }} />
            </div>
            <p className="spec-mono mt-3 text-[12px] text-white/80">Полет: {estimateFlight(build.frame?.size, build.battery?.id)}</p>
          </div>
          <div className="space-y-2 p-5">
            {result.warnings.length === 0 ? (
              <p className="rounded-lg border border-[#e4e2dd] bg-[#f6f6f4] p-3 text-[13px]"><b>Совместимо.</b> Перед первым включением — прозвонка и дым-стоппер, без пропов.</p>
            ) : (
              result.warnings.map((w, i) => (
                <p key={i} className="rounded-lg border border-[#f0c9b3] bg-[#fff4ec] p-3 text-[13px]"><b>Проверка:</b> {w}</p>
              ))
            )}
            <div className="border-t border-[#e4e2dd] pt-3">
              {Object.entries(build).filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 py-1 text-[13px]">
                  <span className="text-[#676c76]">{categoryLabels[k as Category]}</span>
                  <span className="text-right font-medium">{v?.name.slice(0, 32)}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(JSON.stringify({ goal, total: result.total, items: Object.values(build).map((p) => p?.name) }, null, 2));
                alert('Сборка скопирована в буфер');
              }}
              className="btn-primary w-full"
            >
              Скопировать сборку
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
