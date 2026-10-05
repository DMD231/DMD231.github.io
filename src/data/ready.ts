export type ReadyQuote = { text: string; source: string };

export type ReadyDrone = {
  id: string;
  name: string;
  kind: 'BNF' | 'RTF';
  purpose: string;
  priceRub: number;
  image: string;
  officialUrl: string;
  stores: { store: string; url: string }[];
  specs: Record<string, string>;
  note: string;
  quotes?: ReadyQuote[];
};

// BNF = докупить пульт/очки/АКБ; RTF = всё в коробке.
// Характеристики — с официальных страниц (проверено 10.2026). Цены — ориентиры РФ.

export const readyDrones: ReadyDrone[] = [
  {
    id: 'rtf-mobula6',
    name: 'Happymodel Mobula6 2024 V3 (ELRS)',
    kind: 'BNF',
    purpose: 'Вуп для дома и первых полетов',
    priceRub: 13990,
    image: '/images/ready/rtf-mobula6.jpg',
    officialUrl: 'https://www.happymodel.cn/index.php/2025/12/11/mobula6-2024-v3-1s-65mm-ultra-light-micro-fpv-whoop/',
    stores: [{ store: 'FNSmart', url: 'https://fnsmart.ru/' }, { store: 'MyDrone', url: 'https://mydrone.ru/' }],
    specs: { Вес: '17.6 г', Размер: '65 мм (81x81x37)', Моторы: 'SE0702 28000KV', Плата: 'CrazybeeG473 AIO 5-в-1', Связь: 'ELRS 2.4 встроен', Камера: 'Nano5 1200TVL', VTX: 'OpenVTX PIT-400 мВт', Пропы: 'Gemfan 31 мм + HQPROP в комплекте', Разъем: 'A30 (совместим BT2.0)', Полет: '~2-2.5 мин на 1S 300mAh', АКБ_в_комплекте: 'нет' },
    note: 'Докупить: пульт ELRS, очки, паки 1S и зарядник. Бьется о стены — почти не ломается.',
    quotes: [{ text: 'Из трех вупчиков сегодня я бы точно взял Mobula6: баланс качества, ремонта и задела на будущее.', source: 'DIYFPV, сравнение Air65/Meteor65/Mobula6' }],
  },
  {
    id: 'rtf-cinelog30',
    name: 'GEPRC Cinelog30 V3 O4 Pro',
    kind: 'BNF',
    purpose: 'Тихий синевуп для съемки',
    priceRub: 49990,
    image: '/images/ready/rtf-cinebot30.jpg',
    officialUrl: 'https://geprc.com/product/geprc-cinelog30-v3-o4-pro-quadcopter/',
    stores: [{ store: 'iDrone', url: 'https://idrone.ru/' }, { store: 'MyDrone', url: 'https://mydrone.ru/' }],
    specs: { Вес: '187 г без АКБ', База: '128 мм', Моторы: 'SPEEDX2 1404 3850KV', Стек: 'TAKER F722 45A AIO', Видео: 'DJI O4 Pro, запись 4K/120', Пропы: 'HQProp 76 мм x3', АКБ: 'LiHV 4S 660-720mAh', Полет: '8 мин 10 сек', Приемник: 'ELRS 2.4 / TBS / PNP' },
    note: 'Летает рядом с людьми спокойнее, чем 5". Для квартиры все равно велик.',
  },
  {
    id: 'rtf-darkstar25',
    name: 'GEPRC DarkStar25 O4 Pro',
    kind: 'BNF',
    purpose: 'Синевуп 2.5" на каждый день',
    priceRub: 52990,
    image: '/images/ready/rtf-darkstar25.jpg',
    officialUrl: 'https://geprc.com/product/geprc-darkstar25-o4-pro-cinewhoop-quadcopter/',
    stores: [{ store: 'iDrone', url: 'https://idrone.ru/' }],
    specs: { Вес: '180 г без АКБ (<250 г с АКБ)', База: '115 мм', Моторы: 'SPEEDX2 1404 4600KV', Стек: 'TAKER F722 35A AIO', Видео: 'DJI O4 Pro, запись 4K/120', Пропы: 'HQProp 63 мм x3', АКБ: '4S 700-850mAh', Полет: '6:20-8:30 мин', GPS: 'опция GEP-M10 Nano' },
    note: 'Золотая середина: влазит в рюкзак, снимает 4K.',
  },
  {
    id: 'rtf-cinelog35',
    name: 'GEPRC Cinebot35 O4 Pro',
    kind: 'BNF',
    purpose: 'Синевуп 3.5" для коммерческих съемок',
    priceRub: 56990,
    image: '/images/ready/rtf-cinelog35.jpg',
    officialUrl: 'https://geprc.com/product/geprc-cinebot35-o4-pro-quadcopter/',
    specs: { Вес: '388 г без АКБ', База: '167 мм', Моторы: 'SPEEDX2 2105.5 2450KV', Стек: 'TAKER H743 Mini + 60A ESC', Видео: 'DJI O4 Pro, запись 4K/120', Пропы: 'HQProp 90 мм x3', АКБ: '6S 1300-1550mAh', Полет: '10-11 мин', GPS: 'GEP-M10Q' },
    stores: [{ store: 'iDrone', url: 'https://idrone.ru/' }, { store: 'MyDrone', url: 'https://mydrone.ru/' }],
    note: 'Таскает GoPro. Учет в Росавиации нужен (тяжелее 150г).',
  },
  {
    id: 'rtf-mark5',
    name: 'GEPRC MARK5 O4 Pro DC',
    kind: 'BNF',
    purpose: 'Фристайл 5" из коробки',
    priceRub: 64990,
    image: '/images/ready/rtf-mark5.jpg',
    officialUrl: 'https://geprc.com/product/geprc-mark5-o4-pro-dc-fpv-drone/',
    stores: [{ store: 'iDrone', url: 'https://idrone.ru/' }, { store: 'MyDrone', url: 'https://mydrone.ru/' }],
    specs: { Вес: '433 г без АКБ', База: '230 мм (DC)', Моторы: 'SPEEDX2 2107.5 1960KV', Стек: 'F722-BT-HD V3 + BL32 50A', Видео: 'DJI O4 Pro, запись 4K/120', Пропы: 'Gemfan 5136', АКБ: '6S 1050-1550mAh', Полет: '6-8 мин', GPS: 'опция' },
    note: 'Дешевле самосбора на 6S-комплекте. Пропы и рама — расходники, докупи сразу.',
  },
  {
    id: 'rtf-moz7',
    name: 'GEPRC MOZ7 V2 O4 Pro',
    kind: 'BNF',
    purpose: 'Дальнолет 7" для маршрутов',
    priceRub: 79990,
    image: '/images/ready/rtf-moz7.jpg',
    officialUrl: 'https://geprc.com/product/geprc-moz7-v2-o4-pro-long-range-fpv/',
    stores: [{ store: 'Air-Hobby', url: 'https://air-hobby.ru' }, { store: 'iDrone', url: 'https://idrone.ru/' }],
    specs: { Вес: '750 г без АКБ', База: '336 мм', Моторы: 'SPEEDX2 2809 1280KV', Стек: 'TAKER H743 + 65A ESC', Видео: 'DJI O4 Pro, 4K/120, 15 км', Пропы: 'HQ 7.5x3.7x3', АКБ: '6S 3300 LiPo / 6S2P 8000 Li-Ion', Полет: '25 мин', GPS: 'GEP-M1025' },
    note: 'Проверь RTH и failsafe до первого дальняка. Li-Ion паки докупать отдельно.',
    quotes: [{ text: 'MOZ7 V2 выделяется как один из лучших 7-дюймовых дронов на рынке.', source: 'Oscar Liang, обзор MOZ7 V2' }],
  },
  {
    id: 'rtf-avata2',
    name: 'DJI Avata 2 (Fly More)',
    kind: 'RTF',
    purpose: 'FPV для новичков: всё в коробке',
    priceRub: 169990,
    image: '/images/ready/rtf-avata2.jpg',
    officialUrl: 'https://www.dji.com/global/avata-2',
    stores: [{ store: 'CopterTime', url: 'https://coptertime.ru' }, { store: 'Ozon', url: 'https://ozon.ru/' }],
    specs: { Вес: '377 г', Полет: '23 мин / вис 21 мин / 13 км', Камера: '1/1.3", 12 МП, FOV 155°', Видео_4K: '4K 4:3/16:9 @30/50/60/100fps', Slow_mo: '4K/100, 2.7K/120, 1080p/120', Цвет: 'D-Log M, RockSteady', Сенсоры: 'низ + зад (ToF)', Дальность: 'O4 до 13 км, задержка от 24 мс', Режимы: 'Normal/Sport/Manual + Easy Acro + RTH', АКБ: '2150 мАч, 145 г', Память: '46 ГБ + microSD' },
    note: 'Единственный FPV, который прощает ошибки: сенсоры и возврат домой.',
    quotes: [{ text: 'Изящный и отзывчивый дрон делает плавный FPV-полет удивительно легким и веселым.', source: 'Wired, обзор Avata 2' }],
  },
  {
    id: 'rtf-mini4pro',
    name: 'DJI Mini 4 Pro',
    kind: 'RTF',
    purpose: 'Походная камера: <249г без учета',
    priceRub: 109990,
    image: '/images/ready/rtf-mini4pro.jpg',
    officialUrl: 'https://www.dji.com/global/mini-4-pro',
    stores: [{ store: 'CopterTime', url: 'https://coptertime.ru' }, { store: 'Ozon', url: 'https://ozon.ru/' }],
    specs: { Вес: '<249 г (Plus-версия тяжелее)', Полет: '34 мин / 45 мин (Plus)', Камера: '1/1.3", 48 МП, f/1.7', Видео_4K: '4K @24/25/30/48/50/60/100fps', Видео_FHD: '1080p @24-200fps', Slow_mo: '4K/100, FHD/200', Цвет: 'HDR, HLG / D-Log M 10-бит', Битрейт: '150 Мбит/с', Сенсоры: 'всенаправленные + APAS', Дальность: 'O4 до 20 км', Фишки: 'ActiveTrack 360°, Waypoints', АКБ: '2590 / Plus 3850 мАч' },
    note: 'До 249г — без учета в Росавиации. Идеальный первый съемочный.',
    quotes: [{ text: 'Круговой обход препятствий, вертикальное видео и вес без регистрации делают его лучшим ультралайтом.', source: 'PCMag, обзор Mini 4 Pro' }],
  },
  {
    id: 'rtf-mavic3',
    name: 'DJI Mavic 3 Pro',
    kind: 'RTF',
    purpose: 'Флагманская съемка: 3 камеры',
    priceRub: 249990,
    image: '/images/ready/rtf-mavic3.jpg',
    officialUrl: 'https://www.dji.com/global/mavic-3-pro',
    stores: [{ store: 'CopterTime', url: 'https://coptertime.ru' }],
    specs: { Вес: '958 г', Полет: '43 мин / вис 37 мин / 28 км', Камера_осн: 'Hasselblad 4/3, 20 МП', Видео_осн: '5.1K @24-50, 4K @24-120, FHD @24-200', Теле_70мм: '4K @24-60', Теле_166мм: '4K @24-60 (7x)', Цвет: 'D-Log / HLG 10-бит (+ProRes у Cine)', Дальность: 'O3+ до 15 км', Сенсоры: 'всенаправленные + APAS', АКБ: '5000 мАч, 335 г', Память: '8 ГБ (Cine 1 ТБ)' },
    note: 'Учет обязателен. Для работы — окупается за сезон.',
    quotes: [{ text: 'Тройная камера снимает всё видимое с воздуха, а GPS и круговые сенсоры обеспечивают безопасный полет.', source: 'PCMag, обзор Mavic 3 Pro' }],
  },
];
