import Link from 'next/link';
import { notFound } from 'next/navigation';
import { parts, categoryLabels, Part } from '@/data/parts';
import { resolveImage } from '@/data/images';

export function generateStaticParams() {
  return parts.map((p) => ({ id: p.id }));
}

const together: Record<string, string[]> = {
  frame: ['motor', 'stack', 'props'],
  motor: ['esc', 'props', 'battery'],
  stack: ['motor', 'rx', 'battery'],
  fc: ['esc', 'gps', 'rx'],
  esc: ['motor', 'battery', 'fc'],
  props: ['motor', 'frame', 'battery'],
  camera: ['vtx', 'goggles', 'antenna'],
  vtx: ['camera', 'antenna', 'battery'],
  rx: ['radio', 'gps', 'battery'],
  battery: ['radio', 'goggles', 'props'],
  gps: ['fc', 'rx', 'battery'],
  radio: ['rx', 'goggles', 'battery'],
  goggles: ['vtx', 'camera', 'antenna'],
  antenna: ['vtx', 'goggles', 'rx'],
};

function Bundle({ part }: { part: Part }) {
  const cats = together[part.category] ?? [];
  const items = cats
    .map((c) => parts.find((p) => p.category === c && p.purpose.some((x) => part.purpose.includes(x))))
    .filter((p): p is Part => Boolean(p));
  if (items.length === 0) return null;
  return (
    <section className="card mt-6 p-6">
      <p className="eyebrow eyebrow-dot">Часто берут вместе</p>
      <div className="mt-4 space-y-3">
        {items.map((p) => {
          const img = resolveImage(p);
          return (
            <Link key={p.id} href={`/catalog/${p.id}`} className="flex items-center gap-3 rounded-xl border border-[#e3e1da] p-2 hover:border-[#141412]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={p.name} loading="lazy" style={{ objectPosition: img.pos }} className="h-12 w-16 rounded-lg object-cover" />
              <span className="min-w-0">
                <span className="block truncate text-[14px] font-bold">{p.name}</span>
                <span className="spec-mono text-[11px] text-[#6f6e69]">{categoryLabels[p.category]}</span>
              </span>
              <span className="ml-auto whitespace-nowrap font-mono text-[13px] font-bold sm:text-[14px]">{p.priceRub.toLocaleString('ru-RU')} ₽</span>
            </Link>
          );
        })}
      </div>
      <Link href="/constructor" className="btn-primary mt-5 w-full">Собрать комплект в конструкторе</Link>
    </section>
  );
}

export default async function PartPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const part = parts.find((p) => p.id === id);
  if (!part) notFound();
  const img = resolveImage(part);
  const related = parts.filter((p) => p.category === part.category && p.id !== part.id).slice(0, 3);

  return (
    <main className="container-x py-10">
      <nav className="spec-mono text-[12px] uppercase tracking-[0.1em] text-[#6f6e69]">
        <Link href="/" className="hover:underline">Главная</Link> / <Link href="/catalog" className="hover:underline">Каталог</Link> / {categoryLabels[part.category]}
      </nav>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="img-frame aspect-[16/10]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={part.name} style={{ objectPosition: img.pos }} className="h-full w-full object-cover" />
          </div>
          <p className="spec-mono mt-2 text-[11px] uppercase tracking-[0.12em] text-[#6f6e69]">
            {part.image ? 'Фото: официальный сайт производителя' : 'Фото: иллюстрация категории'} · цены РФ-магазинов 2026
          </p>
        </div>

        <div className="card h-fit p-6 lg:sticky lg:top-[76px]">
          <span className="chip bg-[#f4f3f0] text-[#141412]">{categoryLabels[part.category]}</span>
          <h1 className="h-display mt-3 text-[26px] md:text-[30px]">{part.name}</h1>
          <p className="spec-mono mt-2 text-[12px] text-[#6f6e69]">★ {part.rating} · {part.reviews} отзывов</p>
          <p className="mt-4 font-mono text-[32px] font-bold tracking-tight">{part.priceRub.toLocaleString('ru-RU')} ₽</p>
          <div className="mt-4 space-y-2">
            {part.officialUrl && (
              <a href={part.officialUrl} target="_blank" className="btn-ghost w-full">Страница производителя →</a>
            )}
            {part.stores.map((s) => (
              <a key={s.store} href={s.url} target="_blank" className="btn-primary w-full">Купить: {s.store} →</a>
            ))}
          </div>
          <p className="mt-5 border-l-2 border-[#ff4d00] pl-3 text-[14px] italic text-[#6f6e69]">«{part.reviewSnippet}»</p>
          <p className="spec-mono mt-1 pl-[14px] text-[10px] uppercase tracking-[0.1em] text-[#6f6e69]">Вердикт редакции</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="card h-fit p-6">
          <p className="eyebrow eyebrow-dot">Характеристики</p>
          <dl className="mt-4 divide-y divide-[#e3e1da] border-y border-[#e3e1da]">
            {Object.entries(part.specs).map(([k, v]) => (
              <div key={k} className="grid grid-cols-[118px_1fr] gap-3 py-2.5 text-[14px] sm:grid-cols-[160px_1fr]">
                <dt className="text-[#6f6e69]">{k.replaceAll('_', ' ')}</dt>
                <dd className="font-semibold break-words">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            {part.size && <span className="chip bg-[#f4f3f0]">{part.size}</span>}
            {part.voltage && <span className="chip bg-[#f4f3f0]">{part.voltage}</span>}
            {part.mount && <span className="chip bg-[#f4f3f0]">{part.mount}</span>}
            {part.system && <span className="chip bg-[#f4f3f0]">{part.system}</span>}
            {part.protocol && <span className="chip bg-[#f4f3f0]">{part.protocol}</span>}
          </div>
        </section>
        <Bundle part={part} />
      </div>

      <section className="mt-10">
        <h2 className="h-display text-[22px]">Отзывы владельцев</h2>
        {(part.quotes ?? []).length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {(part.quotes ?? []).map((q, i) => (
              <blockquote key={i} className="card p-5">
                <p className="text-[15px] leading-relaxed">«{q.text}»</p>
                <cite className="spec-mono mt-3 block text-[11px] uppercase not-italic tracking-[0.1em] text-[#6f6e69]">— {q.source}</cite>
              </blockquote>
            ))}
          </div>
        ) : (
          <p className="mt-4 max-w-2xl rounded-2xl border border-dashed border-[#e3e1da] p-5 text-[14px] text-[#6f6e69]">
            Открытых отзывов именно на эту модель не нашли — если летал на ней, расскажи в чате пилотов.
            Пока ориентируйся на вердикт редакции и рейтинг {part.rating} ({part.reviews} оценок).
          </p>
        )}
      </section>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="h-display text-[22px]">Похожие: {categoryLabels[part.category].toLowerCase()}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {related.map((p) => {
              const ri = resolveImage(p);
              return (
                <Link key={p.id} href={`/catalog/${p.id}`} className="card card-hover overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ri.src} alt={p.name} loading="lazy" style={{ objectPosition: ri.pos }} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="truncate text-[14px] font-bold">{p.name}</p>
                    <p className="mt-1 font-mono text-[15px] font-bold">{p.priceRub.toLocaleString('ru-RU')} ₽</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
