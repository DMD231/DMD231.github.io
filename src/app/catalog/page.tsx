'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { parts, categoryLabels, Category } from '@/data/parts';
import { PartThumb } from '@/components/ui';

export default function CatalogPage() {
  const [cat, setCat] = useState<Category | 'all'>('all');
  const [q, setQ] = useState('');
  const list = useMemo(
    () => parts.filter((p) => (cat === 'all' || p.category === cat) && (q === '' || p.name.toLowerCase().includes(q.toLowerCase()))),
    [cat, q]
  );

  return (
    <main className="container-x py-10">
      <p className="eyebrow">Каталог · {parts.length} позиций · цены РФ 2026</p>
      <h1 className="h-display mt-2 text-[28px] sm:text-[34px] md:text-[48px]">Детали с характеристиками и отзывами</h1>
      <p className="mt-3 max-w-2xl text-[15px] text-[#676c76]">Ручная база: проверяли карточки MyDrone, iDrone, Dronextech и Чистого небосвода. Наличие уточняй по кнопке магазина.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-[240px_1fr]">
        <aside className="h-fit md:sticky md:top-[76px]">
          <div className="card p-4">
            <p className="eyebrow">Поиск</p>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ELRS, H743, 5 дюймов…"
              className="mt-2 w-full rounded-lg border border-[#e4e2dd] bg-[#f6f6f4] px-3 py-2.5 text-[14px] outline-none focus:border-[#131416]"
            />
            <p className="eyebrow mt-5">Категория</p>
            <div className="mt-2 flex flex-wrap gap-1.5 md:grid md:gap-0 md:space-y-1">
              <button onClick={() => setCat('all')} className={`flex items-center gap-2 rounded-full border border-[#e4e2dd] px-3 py-1.5 text-[13px] md:w-full md:items-center md:justify-between md:rounded-lg md:px-3 md:py-2 md:text-[14px] ${cat === 'all' ? '!border-[#131416] bg-[#131416] font-semibold text-white' : 'bg-white hover:bg-[#ecebe7]'}`}>
                Все <span className="spec-mono text-[12px] opacity-60">{parts.length}</span>
              </button>
              {(Object.keys(categoryLabels) as Category[]).map((c) => {
                const n = parts.filter((p) => p.category === c).length;
                return (
                  <button key={c} onClick={() => setCat(c)} className={`flex items-center gap-2 rounded-full border border-[#e4e2dd] px-3 py-1.5 text-[13px] md:w-full md:items-center md:justify-between md:rounded-lg md:px-3 md:py-2 md:text-[14px] ${cat === c ? '!border-[#131416] bg-[#131416] font-semibold text-white' : 'bg-white hover:bg-[#ecebe7]'}`}>
                    {categoryLabels[c]} <span className="spec-mono text-[12px] opacity-60">{n}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div>
          <p className="spec-mono text-[12px] uppercase tracking-[0.12em] text-[#676c76]">Найдено: {list.length}</p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {list.map((p) => (
              <article key={p.id} className="card card-hover group flex flex-col overflow-hidden">
                <Link href={`/catalog/${p.id}`}>
                  <PartThumb category={p.category} label={categoryLabels[p.category]} src={p.image} />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <Link href={`/catalog/${p.id}`} className="text-[16px] font-bold leading-snug tracking-tight hover:text-[#ff4d00]">{p.name}</Link>
                  </div>
                  <p className="spec-mono mt-2 text-[11px] uppercase tracking-[0.1em] text-[#676c76]">★ {p.rating} · {p.reviews} отзывов</p>
                  <p className="mt-3 font-mono text-[19px] font-bold tracking-tight">{p.priceRub.toLocaleString('ru-RU')} ₽</p>
                  <dl className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[#e4e2dd] bg-[#e4e2dd]">
                    {Object.entries(p.specs).slice(0, 4).map(([k, v]) => (
                      <div key={k} className="bg-white px-3 py-2">
                        <dt className="spec-mono text-[10px] uppercase tracking-[0.1em] text-[#676c76]">{k}</dt>
                        <dd className="mt-0.5 text-[13px] font-semibold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-3 border-l-2 border-[#ff4d00] pl-3 text-[13px] leading-relaxed text-[#676c76]">{p.reviewSnippet}</p>
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-[#e4e2dd] pt-4">
                    {p.officialUrl && (
                      <a href={p.officialUrl} target="_blank" className="rounded-md border border-[#e3e1da] px-3 py-1.5 text-[13px] font-semibold hover:border-[#141412]">
                        Производитель →
                      </a>
                    )}
                    {p.stores.map((s) => (
                      <a key={s.store} href={s.url} target="_blank" className="rounded-md bg-[#131416] px-3 py-1.5 text-[13px] font-semibold text-white hover:bg-black">
                        {s.store} →
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
