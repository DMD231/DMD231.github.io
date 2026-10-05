import { stores } from '@/data/stores';

export default function StoresPage() {
  return (
    <main className="container-x py-10">
      <p className="eyebrow">Магазины · {stores.length} точек · Москва + доставка по РФ</p>
      <h1 className="h-display mt-2 text-[28px] sm:text-[34px] md:text-[48px]">Где брать детали</h1>
      <div className="card mt-8 overflow-hidden">
        <div className="hidden grid-cols-[180px_1fr_220px_90px_120px] gap-4 border-b border-[#e4e2dd] bg-[#f6f6f4] px-6 py-3 md:grid">
          <span className="eyebrow">Магазин</span>
          <span className="eyebrow">Что брать</span>
          <span className="eyebrow">Доставка</span>
          <span className="eyebrow">Оценка</span>
          <span />
        </div>
        {stores.map((s) => (
          <div key={s.id} className="grid gap-2 border-b border-[#e4e2dd] px-6 py-5 last:border-0 md:grid-cols-[180px_1fr_220px_90px_120px] md:items-center md:gap-4">
            <div>
              <p className="text-[15px] font-bold">{s.name}</p>
              <p className="spec-mono mt-1 text-[11px] text-[#676c76]">{s.city}</p>
            </div>
            <div>
              <p className="text-[14px]">{s.categories.join(' · ')}</p>
              <p className="mt-1 text-[13px] text-[#676c76]">{s.features}</p>
            </div>
            <p className="text-[13px] text-[#676c76]">{s.delivery}</p>
            <p className="font-mono text-[14px] font-bold">★ {s.rating}</p>
            <a href={s.url} target="_blank" className="btn-ghost !px-3 !py-2 text-center">Открыть →</a>
          </div>
        ))}
      </div>
      <div className="card mt-6 grid gap-6 p-6 md:grid-cols-[1fr_320px]">
        <div>
          <p className="eyebrow">Как покупать</p>
          <p className="mt-2 text-[15px] font-bold">Оригинал — в спецах, расход — на маркетах</p>
          <ul className="mt-3 space-y-2 text-[14px] text-[#676c76]">
            <li>— Рамы, моторы, стеки: MyDrone / iDrone / Dronextech — там же подбор и сервис.</li>
            <li>— Мощные VTX 2.5–10 Вт: Чистый небосвод, опт и юрлица.</li>
            <li>— KIT 7&quot; за 30 500 ₽: VoltsPro. Whoop-платы: FNSmart.</li>
            <li>— Пропы и мелочи десятками: RaceQuad + Ozon. Пульт и очки б/у — только с проверкой линка.</li>
          </ul>
        </div>
        <figure>
          <div className="img-frame aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dji.jpg" alt="Дрон для съемки на закате" />
          </div>
          <figcaption className="spec-mono mt-2 text-[11px] uppercase tracking-[0.12em] text-[#676c76]">Цифра для съемки — CopterTime / iDrone</figcaption>
        </figure>
      </div>
    </main>
  );
}
