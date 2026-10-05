'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Icon({ d, active }: { d: string; active?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const P_HOME = 'M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9z';
const P_CATALOG = 'M4 4h7v7H4zM13 4h7v4h-7zM13 11h7v9h-7zM4 14h7v6H4z';
const P_WRENCH = 'M14.5 6.5a4 4 0 0 0-5.6 5.1L4 16.5V20h3.5l4.9-4.9a4 4 0 0 0 5.1-5.6l-3 3-2.5-.5-.5-2.5 3-3z';
const P_BOX = 'M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12l8-4.5M12 12v9M12 12L4 7.5';
const P_DOTS = 'M5 12h.01M12 12h.01M19 12h.01';

export default function BottomBar() {
  const path = usePathname();
  const [more, setMore] = useState(false);

  const tab = (href: string, label: string, icon: string, isActive: boolean) => (
    <Link
      key={href}
      href={href}
      className={`flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-semibold ${isActive ? 'text-[#ff4d00]' : 'text-[#6f6e69]'}`}
    >
      <Icon d={icon} active={isActive} />
      {label}
    </Link>
  );

  const moreActive = path.startsWith('/guides') || path.startsWith('/firmware') || path.startsWith('/stores');

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-[#e3e1da] bg-white/95 backdrop-blur md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="flex items-stretch px-1">
          {tab('/', 'Главная', P_HOME, path === '/')}
          {tab('/catalog', 'Каталог', P_CATALOG, path.startsWith('/catalog'))}
          <Link href="/constructor" className="flex flex-1 flex-col items-center gap-1 py-1.5" aria-label="Собрать дрон">
            <span className={`grid h-11 w-11 place-items-center rounded-full text-white shadow-lg ${path.startsWith('/constructor') ? 'bg-[#141412]' : 'bg-[#ff4d00]'}`}>
              <Icon d={P_WRENCH} />
            </span>
            <span className={`text-[10px] font-bold ${path.startsWith('/constructor') ? 'text-[#141412]' : 'text-[#ff4d00]'}`}>Собрать</span>
          </Link>
          {tab('/ready', 'Дроны', P_BOX, path.startsWith('/ready'))}
          <button
            onClick={() => setMore(true)}
            className={`flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-semibold ${moreActive ? 'text-[#ff4d00]' : 'text-[#6f6e69]'}`}
          >
            <Icon d={P_DOTS} active={moreActive} />
            Ещё
          </button>
        </div>
      </nav>

      {more && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMore(false)} />
          <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-white p-5 pb-8" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 20px)' }}>
            <div className="mx-auto mb-4 h-1 w-10 rounded bg-[#e3e1da]" />
            <p className="eyebrow">Разделы</p>
            {[
              { href: '/guides', t: 'Гайды по сборке', d: 'Пайка, Betaflight, ELRS, INAV, ремонт' },
              { href: '/firmware', t: 'Прошивки', d: 'Betaflight, INAV, ArduPilot, ELRS' },
              { href: '/stores', t: 'Магазины РФ', d: '13 точек: детали и готовые дроны' },
            ].map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMore(false)} className="mt-2 flex items-center gap-3 rounded-2xl border border-[#e3e1da] p-4">
                <span>
                  <span className="block text-[15px] font-bold">{l.t}</span>
                  <span className="block text-[13px] text-[#6f6e69]">{l.d}</span>
                </span>
                <span className="ml-auto text-[18px]">→</span>
              </Link>
            ))}
            <button onClick={() => setMore(false)} className="btn-ghost mt-4 w-full">Закрыть</button>
          </div>
        </div>
      )}
    </>
  );
}
