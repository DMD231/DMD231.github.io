import { parts } from '@/data/parts';
import { stores } from '@/data/stores';
import { SectionHead } from '@/components/ui';

const brands = ['GEPRC', 'Foxeer', 'BrotherHobby', 'RUSHFPV', 'HGLRC', 'RadioMaster', 'HQProp', 'Gemfan', 'iFlight', 'TBS', 'Walksnail', 'DJI O3'];

const builds = [
  {
    name: 'Городской фристайл 5″',
    img: '/images/build-5.jpg',
    spec: '4S · 2207 2550KV · аналог',
    price: 'от 59 000 ₽ без пульта и очков',
    href: '/constructor',
  },
  {
    name: 'Дальнолет 7″ на Li-Ion',
    img: '/images/hero-drone.jpg',
    spec: '6S · 900KV · ELRS 868 · GPS',
    price: 'от 78 000 ₽ · KIT 30 500 ₽',
    href: '/constructor',
  },
  {
    name: 'Съемка 5″ цифра',
    img: '/images/dji.jpg',
    spec: 'DJI O3 · 6S · тихий сетап',
    price: 'от 95 000 ₽',
    href: '/constructor',
  },
];

export default function Home() {
  return (
    <main>
      {/* HERO — темный, крупная типографика, коллаж из фото */}
      <section className="bg-[#141412] text-white">
        <div className="container-x grid gap-10 py-12 md:grid-cols-[1.05fr_0.95fr] md:py-20">
          <div className="flex flex-col justify-center">
            <p className="eyebrow eyebrow-dot !text-white/60">Конструктор · Каталог · Гайды · Прошивки</p>
            <h1 className="h-display mt-5 text-[38px] md:text-[60px]">
              Собери дрон,
              <br />
              который полетит
              <br />
              <span className="text-[#ff4d00]">с первого пака.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/70">
              Проверяем совместимость рамы, моторов, стека, видео и приемника. {parts.length} деталей
              с ценами магазинов РФ, пошаговые сборки и прошивки — без воды.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/constructor" className="btn-accent">Подобрать сборку →</a>
              <a href="/catalog" className="btn-ghost !border-white/20 !bg-transparent !text-white hover:!border-white">Смотреть каталог</a>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
              <div>
                <dt className="eyebrow !text-white/50">Деталей</dt>
                <dd className="h-display mt-1 text-[26px]">{parts.length}</dd>
              </div>
              <div>
                <dt className="eyebrow !text-white/50">Магазинов РФ</dt>
                <dd className="h-display mt-1 text-[26px]">{stores.length}</dd>
              </div>
              <div>
                <dt className="eyebrow !text-white/50">Гайдов</dt>
                <dd className="h-display mt-1 text-[26px]">4</dd>
              </div>
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <figure className="img-frame col-span-2 aspect-[16/9] !border-white/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/hero-drone.jpg" alt="FPV-дрон в полете" />
            </figure>
            <figure className="img-frame aspect-[4/3] !border-white/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/build-5.jpg" alt="Фристайл-сборка 5 дюймов" />
            </figure>
            <figure className="img-frame aspect-[4/3] !border-white/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/electronics.jpg" alt="Электроника дрона крупным планом" />
            </figure>
            <div className="col-span-2 flex items-center justify-between rounded-2xl bg-[#ff4d00] px-5 py-4">
              <p className="text-[14px] font-bold">KIT 7″ под ключ — 30 500 ₽</p>
              <a href="/stores" className="text-[14px] font-bold underline underline-offset-4">Где брать →</a>
            </div>
          </div>
        </div>
        {/* бегущая строка брендов */}
        <div className="overflow-hidden border-t border-white/15 py-4">
          <div className="marquee-track gap-10 pr-10">
            {[...brands, ...brands].map((b, i) => (
              <span key={i} className="spec-mono whitespace-nowrap text-[12px] uppercase tracking-[0.2em] text-white/45">{b} ✦</span>
            ))}
          </div>
        </div>
      </section>

      {/* СБОРКИ */}
      <section className="container-x py-14 md:py-20">
        <SectionHead
          eyebrow="Готовые направления"
          title="Три проверенные сборки"
          text="Начни с цели. Конструктор сам отсечет несовместимое: монтаж, вольтаж, аналог/цифру и диапазон ELRS."
          link={{ href: '/constructor', label: 'Открыть конструктор' }}
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {builds.map((b) => (
            <a key={b.name} href={b.href} className="card card-hover group overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.img} alt={b.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
              </div>
              <div className="p-6">
                <p className="spec-mono text-[11px] uppercase tracking-[0.12em] text-[#6f6e69]">{b.spec}</p>
                <h3 className="h-display mt-2 text-[20px]">{b.name}</h3>
                <p className="mt-1 text-[14px] text-[#6f6e69]">{b.price}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-bold">Собрать такой <span className="grid h-7 w-7 place-items-center rounded-full bg-[#141412] text-[13px] text-white transition group-hover:bg-[#ff4d00]">→</span></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ГОТОВЫЕ ДРОНЫ */}
      <section className="border-b border-[#e3e1da] bg-white">
        <div className="container-x py-14 md:py-20">
          <SectionHead
            eyebrow="BNF · RTF · 9 моделей"
            title="Не хочешь паять — бери готовый"
            text="Связаны и настроены: BNF — докупить пульт и очки, RTF — всё в коробке."
            link={{ href: '/ready', label: 'Все готовые дроны' }}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <a href="/ready" className="card card-hover group overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/ready/rtf-mobula6.jpg" alt="Happymodel Mobula6" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
              </div>
              <div className="p-6">
                <p className="spec-mono text-[11px] uppercase tracking-[0.12em] text-[#6f6e69]">BNF · от 13 990 ₽</p>
                <h3 className="h-display mt-2 text-[20px]">Вупы для дома</h3>
                <p className="mt-1 text-[14px] text-[#6f6e69]">Mobula6 — первый FPV за вечер.</p>
              </div>
            </a>
            <a href="/ready" className="card card-hover group overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/ready/rtf-mark5.jpg" alt="GEPRC MARK5" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
              </div>
              <div className="p-6">
                <p className="spec-mono text-[11px] uppercase tracking-[0.12em] text-[#6f6e69]">BNF · 50–80 тыс ₽</p>
                <h3 className="h-display mt-2 text-[20px]">GEPRC из коробки</h3>
                <p className="mt-1 text-[14px] text-[#6f6e69]">MARK5, MOZ7, Cinebot — летай сразу.</p>
              </div>
            </a>
            <a href="/ready" className="card card-hover group overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/ready/rtf-mini4pro.jpg" alt="DJI Mini 4 Pro" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
              </div>
              <div className="p-6">
                <p className="spec-mono text-[11px] uppercase tracking-[0.12em] text-[#6f6e69]">RTF · всё включено</p>
                <h3 className="h-display mt-2 text-[20px]">DJI для съемки</h3>
                <p className="mt-1 text-[14px] text-[#6f6e69]">Avata 2, Mini 4 Pro, Mavic 3 Pro.</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ПРОЦЕСС + ФОТО */}
      <section className="border-y border-[#e3e1da] bg-white">
        <div className="container-x grid gap-10 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="eyebrow eyebrow-dot">Процесс</p>
            <h2 className="h-display mt-3 text-[28px] md:text-[36px]">От идеи до первого армирования — 3 шага</h2>
            <ol className="mt-8">
              {[
                ['01', 'Цель и бюджет', 'Фристайл 5″, вупик 65 мм для дома, дальнолет 7″ или съемка на цифре.'],
                ['02', 'Железо без конфликтов', 'Монтаж 30.5 / 20 / 25.5, 4S vs 6S, SmartAudio/TRAMP, ELRS-фраза одна везде.'],
                ['03', 'Пайка, настройка, облет', 'Дым-стоппер, Betaflight/INAV, failsafe, hover на 1 метре. Гайды приложены.'],
              ].map(([n, t, d]) => (
                <li key={n} className="rule grid grid-cols-[56px_1fr] gap-4 py-6">
                  <span className="h-display text-[15px] text-[#ff4d00]">{n}</span>
                  <span>
                    <span className="block text-[17px] font-bold tracking-tight">{t}</span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-[#6f6e69]">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/guides" className="btn-primary">Читать гайды</a>
              <a href="/firmware" className="btn-ghost">Прошивки</a>
            </div>
          </div>
          <div>
            <figure className="img-frame aspect-[16/10]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/electronics.jpg" alt="Полетный контроллер крупным планом" loading="lazy" />
            </figure>
            <p className="spec-mono mt-3 text-[11px] uppercase tracking-[0.12em] text-[#6f6e69]">Стек F722 · пайка и порядок моторов решают</p>
            <div className="grid grid-cols-2 gap-4">
              <figure className="img-frame mt-4 aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/workshop.jpg" alt="Рабочее место для сборки" loading="lazy" />
              </figure>
              <figure className="img-frame mt-4 aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dji.jpg" alt="Съемочный дрон на закате" loading="lazy" />
              </figure>
            </div>
            <p className="spec-mono mt-3 text-[11px] uppercase tracking-[0.12em] text-[#6f6e69]">Минимум: паяльник 60 Вт, мультиметр, дым-стоппер</p>
          </div>
        </div>
      </section>

      {/* МАГАЗИНЫ */}
      <section className="container-x py-14 md:py-20">
        <SectionHead
          eyebrow={`В наличии · ${stores.length} магазинов`}
          title="Где брать детали в РФ"
          text="Оригинал — в спецмагазинах, расходники — на маркетплейсах, пульт и очки можно б/у с проверкой."
          link={{ href: '/stores', label: 'Все магазины' }}
        />
        <div className="card mt-8 overflow-hidden">
          <div className="hidden grid-cols-[1.2fr_2fr_1fr_auto] gap-4 border-b border-[#e3e1da] bg-[#f4f3f0] px-6 py-3 md:grid">
            <span className="eyebrow">Магазин</span>
            <span className="eyebrow">Что брать</span>
            <span className="eyebrow">Город</span>
            <span className="eyebrow">Рейтинг</span>
          </div>
          {stores.slice(0, 6).map((s) => (
            <a key={s.id} href={s.url} target="_blank" className="grid gap-1 border-b border-[#e3e1da] px-6 py-4 last:border-0 hover:bg-[#faf9f7] md:grid-cols-[1.2fr_2fr_1fr_auto] md:items-center md:gap-4">
              <span className="text-[15px] font-bold tracking-tight">{s.name}</span>
              <span className="text-[13px] text-[#6f6e69]">{s.categories.slice(0, 4).join(' · ')}</span>
              <span className="spec-mono text-[12px] text-[#6f6e69]">{s.city}</span>
              <span className="spec-mono text-[12px] font-bold">★ {s.rating}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
