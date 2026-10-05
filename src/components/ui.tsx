import { Category } from '@/data/parts';
import { categoryImage, resolveImage } from '@/data/images';

/** Фото детали: точный снимок товара, иначе резерв категории. */
export function PartThumb({ category, label, src }: { category: Category; label?: string; src?: string }) {
  const fb = categoryImage[category];
  const url = src ?? fb.src;
  const pos = src ? '50% 50%' : fb.pos;
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e7e5df]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={label ?? fb.alt}
        loading="lazy"
        style={{ objectPosition: pos }}
        className="h-full w-full object-cover transition duration-500 hover:scale-[1.04]"
      />
      <span className="chip absolute left-3 top-3 bg-[#141412]/90 text-white backdrop-blur">
        {label ?? category}
      </span>
      {src && (
        <span className="spec-mono absolute bottom-3 right-3 rounded bg-white/90 px-2 py-0.5 text-[10px] text-[#6f6e69]">
          фото производителя
        </span>
      )}
    </div>
  );
}

/** Маленькое фото для строк конструктора. */
export function PartMini({ part }: { part: { image?: string; category: Category; name: string } }) {
  const { src, pos } = resolveImage(part);
  return (
    <span className="block h-12 w-14 shrink-0 overflow-hidden rounded-lg border border-[#e3e1da] bg-[#e7e5df] sm:h-14 sm:w-[72px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={part.name} loading="lazy" style={{ objectPosition: pos }} className="h-full w-full object-cover" />
    </span>
  );
}

export function SectionHead({ eyebrow, title, text, link }: { eyebrow: string; title: string; text?: string; link?: { href: string; label: string } }) {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <div className="max-w-2xl">
        <p className="eyebrow eyebrow-dot">{eyebrow}</p>
        <h2 className="h-display mt-3 text-[26px] md:text-[34px]">{title}</h2>
        {text && <p className="mt-3 text-[15px] leading-relaxed text-[#6f6e69]">{text}</p>}
      </div>
      {link && (
        <a href={link.href} className="ml-auto text-[14px] font-bold underline decoration-[#ff4d00] decoration-2 underline-offset-4">
          {link.label}
        </a>
      )}
    </div>
  );
}
