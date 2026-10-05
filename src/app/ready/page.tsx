import Link from 'next/link';
import { readyDrones } from '@/data/ready';
import { SectionHead } from '@/components/ui';

export default function ReadyPage() {
  const bnf = readyDrones.filter((d) => d.kind === 'BNF');
  const rtf = readyDrones.filter((d) => d.kind === 'RTF');
  return (
    <main className="container-x py-10">
      <p className="eyebrow eyebrow-dot">Готовые дроны · {readyDrones.length} моделей · фото производителей</p>
      <h1 className="h-display mt-2 text-[26px] sm:text-[32px] md:text-[46px]">Не хочешь паять — взлетай из коробки</h1>
      <p className="mt-3 max-w-2xl text-[15px] text-[#6f6e69]">
        <b>BNF</b> — дрон связан и настроен, докупить пульт, очки и АКБ. <b>RTF</b> — полный комплект в коробке.
        Цены — ориентиры РФ, наличие проверяй в магазинах.
      </p>

      <div className="mt-10">
        <SectionHead eyebrow="Bind-And-Fly" title="Летай, но паять не надо" text="Для тех, у кого уже есть пульт и очки — или кто готов их докупить." />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bnf.map((d) => (
            <article key={d.id} className="card card-hover group flex flex-col overflow-hidden">
              <Link href={`/ready/${d.id}`} className="relative block aspect-[16/10] overflow-hidden bg-[#e7e5df]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                <span className="chip absolute left-3 top-3 bg-[#141412]/90 text-white">{d.kind}</span>
                <span className="spec-mono absolute bottom-3 right-3 rounded bg-white/90 px-2 py-0.5 text-[10px] text-[#6f6e69]">фото производителя</span>
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <p className="spec-mono text-[11px] uppercase tracking-[0.1em] text-[#6f6e69]">{d.purpose}</p>
                <Link href={`/ready/${d.id}`} className="mt-1 text-[17px] font-bold tracking-tight hover:text-[#ff4d00]">{d.name}</Link>
                <p className="mt-2 font-mono text-[20px] font-bold">{d.priceRub.toLocaleString('ru-RU')} ₽</p>
                <dl className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#e3e1da] bg-[#e3e1da]">
                  {Object.entries(d.specs).slice(0, 4).map(([k, v]) => (
                    <div key={k} className="bg-white px-3 py-2">
                      <dt className="spec-mono text-[10px] uppercase tracking-[0.1em] text-[#6f6e69]">{k}</dt>
                      <dd className="mt-0.5 text-[13px] font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 border-l-2 border-[#ff4d00] pl-3 text-[13px] text-[#6f6e69]">{d.note}</p>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-[#e3e1da] pt-4">
                  <a href={d.officialUrl} target="_blank" className="rounded-md border border-[#e3e1da] px-3 py-1.5 text-[13px] font-semibold hover:border-[#141412]">Производитель →</a>
                  {d.stores.map((s) => (
                    <a key={s.store} href={s.url} target="_blank" className="rounded-md bg-[#141412] px-3 py-1.5 text-[13px] font-semibold text-white">{s.store} →</a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <SectionHead eyebrow="Ready-To-Fly" title="Полный комплект в коробке" text="Пульт, очки (для FPV), батареи и зарядник уже внутри. Открыл — полетел." />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rtf.map((d) => (
            <article key={d.id} className="card card-hover group flex flex-col overflow-hidden">
              <Link href={`/ready/${d.id}`} className="relative block aspect-[16/10] overflow-hidden bg-[#e7e5df]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                <span className="chip absolute left-3 top-3 bg-[#ff4d00] text-white">{d.kind} · всё включено</span>
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <p className="spec-mono text-[11px] uppercase tracking-[0.1em] text-[#6f6e69]">{d.purpose}</p>
                <Link href={`/ready/${d.id}`} className="mt-1 text-[17px] font-bold tracking-tight hover:text-[#ff4d00]">{d.name}</Link>
                <p className="mt-2 font-mono text-[20px] font-bold">{d.priceRub.toLocaleString('ru-RU')} ₽</p>
                <dl className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#e3e1da] bg-[#e3e1da]">
                  {Object.entries(d.specs).slice(0, 4).map(([k, v]) => (
                    <div key={k} className="bg-white px-3 py-2">
                      <dt className="spec-mono text-[10px] uppercase tracking-[0.1em] text-[#6f6e69]">{k}</dt>
                      <dd className="mt-0.5 text-[13px] font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 border-l-2 border-[#ff4d00] pl-3 text-[13px] text-[#6f6e69]">{d.note}</p>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-[#e3e1da] pt-4">
                  <a href={d.officialUrl} target="_blank" className="rounded-md border border-[#e3e1da] px-3 py-1.5 text-[13px] font-semibold hover:border-[#141412]">Производитель →</a>
                  {d.stores.map((s) => (
                    <a key={s.store} href={s.url} target="_blank" className="rounded-md bg-[#141412] px-3 py-1.5 text-[13px] font-semibold text-white">{s.store} →</a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="card mt-10 grid gap-6 p-6 md:grid-cols-[1fr_320px]">
        <div>
          <p className="eyebrow eyebrow-dot">Где брать готовые</p>
          <p className="h-display mt-2 text-[22px]">Магазины готовых дронов</p>
          <ul className="mt-3 space-y-2 text-[14px] text-[#6f6e69]">
            <li>— <b>CopterTime</b> — официальная розница DJI, съемочные дроны с гарантией.</li>
            <li>— <b>4Vision</b> (4vision.ru) — DJI-дилер, Avata/Mini/Mavic в наличии.</li>
            <li>— <b>MyDrone / iDrone</b> — BNF от GEPRC и BetaFPV, плюс настройка.</li>
            <li>— <b>FNSmart</b> — вупы Happymodel и BetaFPV для дома.</li>
          </ul>
          <a href="/stores" className="btn-primary mt-5">Все магазины РФ</a>
        </div>
        <figure>
          <div className="img-frame aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/ready/rtf-avata2.jpg" alt="DJI Avata 2" loading="lazy" />
          </div>
          <figcaption className="spec-mono mt-2 text-[11px] uppercase tracking-[0.12em] text-[#6f6e69]">Avata 2 — FPV без паяльника</figcaption>
        </figure>
      </div>
    </main>
  );
}
