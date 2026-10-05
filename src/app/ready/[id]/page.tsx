import Link from 'next/link';
import { notFound } from 'next/navigation';
import { readyDrones } from '@/data/ready';

export function generateStaticParams() {
  return readyDrones.map((d) => ({ id: d.id }));
}

export default async function ReadyCard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const d = readyDrones.find((x) => x.id === id);
  if (!d) notFound();
  const others = readyDrones.filter((x) => x.id !== d.id && x.kind === d.kind).slice(0, 3);

  return (
    <main className="container-x py-10">
      <nav className="spec-mono text-[12px] uppercase tracking-[0.1em] text-[#6f6e69]">
        <Link href="/" className="hover:underline">Главная</Link> / <Link href="/ready" className="hover:underline">Готовые дроны</Link> / {d.kind}
      </nav>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="img-frame aspect-[16/10]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.image} alt={d.name} className="h-full w-full object-cover" />
          </div>
          <p className="spec-mono mt-2 text-[11px] uppercase tracking-[0.12em] text-[#6f6e69]">Фото: официальный сайт производителя</p>
        </div>

        <div className="card h-fit p-6 lg:sticky lg:top-[76px]">
          <span className={`chip ${d.kind === 'RTF' ? 'bg-[#ff4d00] text-white' : 'bg-[#141412] text-white'}`}>
            {d.kind === 'RTF' ? 'RTF · всё включено' : 'BNF · нужен пульт и очки'}
          </span>
          <h1 className="h-display mt-3 text-[26px] md:text-[30px]">{d.name}</h1>
          <p className="mt-2 text-[14px] text-[#6f6e69]">{d.purpose}</p>
          <p className="mt-4 font-mono text-[32px] font-bold tracking-tight">{d.priceRub.toLocaleString('ru-RU')} ₽</p>
          <div className="mt-4 space-y-2">
            <a href={d.officialUrl} target="_blank" className="btn-ghost w-full">Страница производителя →</a>
            {d.stores.map((s) => (
              <a key={s.store} href={s.url} target="_blank" className="btn-primary w-full">Купить: {s.store} →</a>
            ))}
          </div>
          <p className="mt-5 border-l-2 border-[#ff4d00] pl-3 text-[14px] text-[#6f6e69]">{d.note}</p>
        </div>
      </div>

      {(d.quotes ?? []).length > 0 && (
        <section className="mt-10">
          <h2 className="h-display text-[22px]">Отзывы и обзоры</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {(d.quotes ?? []).map((q, i) => (
              <blockquote key={i} className="card p-5">
                <p className="text-[15px] leading-relaxed">«{q.text}»</p>
                <cite className="spec-mono mt-3 block text-[11px] uppercase not-italic tracking-[0.1em] text-[#6f6e69]">— {q.source}</cite>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      <section className="card mt-6 h-fit p-6">
        <p className="eyebrow eyebrow-dot">Характеристики</p>
        <dl className="mt-4 grid gap-x-8 md:grid-cols-2">
          {Object.entries(d.specs).map(([k, v]) => (
            <div key={k} className="grid grid-cols-[118px_1fr] gap-3 border-b border-[#e3e1da] py-2.5 text-[14px] sm:grid-cols-[160px_1fr]">
              <dt className="text-[#6f6e69]">{k}</dt>
              <dd className="font-semibold break-words">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {others.length > 0 && (
        <section className="mt-10">
          <h2 className="h-display text-[22px]">Другие {d.kind}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.id} href={`/ready/${o.id}`} className="card card-hover overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={o.image} alt={o.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="truncate text-[14px] font-bold">{o.name}</p>
                  <p className="mt-1 font-mono text-[15px] font-bold">{o.priceRub.toLocaleString('ru-RU')} ₽</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
