import type { Category } from './parts';

/** Резервные фото для товаров без точного снимка.
 *  У 28 из 31 товара — точное официальное фото (поле image в parts.ts). */
export const categoryImage: Record<Category, { src: string; pos: string; alt: string }> = {
  frame: { src: '/images/build-5.jpg', pos: '50% 40%', alt: 'Рама квадрокоптера' },
  props: { src: '/images/build-5.jpg', pos: '50% 72%', alt: 'Пропеллеры' },
  motor: { src: '/images/parts/motor-2207.jpg', pos: '50% 50%', alt: 'Бесколлекторный мотор' },
  stack: { src: '/images/electronics.jpg', pos: '50% 45%', alt: 'Стек полетного контроллера' },
  fc: { src: '/images/electronics.jpg', pos: '50% 70%', alt: 'Полетный контроллер' },
  esc: { src: '/images/electronics.jpg', pos: '25% 60%', alt: 'Регуляторы оборотов' },
  camera: { src: '/images/dji.jpg', pos: '50% 38%', alt: 'Камера для съемки' },
  goggles: { src: '/images/dji.jpg', pos: '50% 68%', alt: 'FPV-очки и видеолиния' },
  vtx: { src: '/images/parts/vtx-maten-25.jpg', pos: '50% 50%', alt: 'Видеопередатчик' },
  rx: { src: '/images/hero-drone.jpg', pos: '50% 58%', alt: 'Приемник радиолинка' },
  antenna: { src: '/images/hero-drone.jpg', pos: '82% 45%', alt: 'Антенны 5.8 ГГц' },
  battery: { src: '/images/parts/bat-6s-1100.jpg', pos: '50% 50%', alt: 'Аккумулятор LiPo' },
  gps: { src: '/images/workshop.jpg', pos: '50% 22%', alt: 'GPS-модуль' },
  radio: { src: '/images/workshop.jpg', pos: '50% 72%', alt: 'Пульт управления' },
};

/** Итоговое фото товара: точное при наличии, иначе резерв категории. */
export function resolveImage(p: { image?: string; category: Category }): { src: string; pos: string } {
  if (p.image) return { src: p.image, pos: '50% 50%' };
  const c = categoryImage[p.category];
  return { src: c.src, pos: c.pos };
}
