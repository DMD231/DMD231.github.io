import type { Metadata } from "next";
import { Unbounded, Manrope, JetBrains_Mono } from "next/font/google";
import BottomBar from "@/components/BottomBar";
import "./globals.css";

const display = Unbounded({
  variable: "--font-display",
  subsets: ["cyrillic", "latin"],
  weight: ["500", "600", "700", "800"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Сборка — конструктор FPV-дронов, каталог и гайды",
  description: "Подбор совместимых комплектующих, цены магазинов РФ, гайды по сборке, прошивки Betaflight, INAV, ArduPilot, ELRS.",
};

const links = [
  { href: "/constructor", label: "Конструктор" },
  { href: "/catalog", label: "Каталог" },
  { href: "/ready", label: "Готовые дроны" },
  { href: "/guides", label: "Гайды" },
  { href: "/firmware", label: "Прошивки" },
  { href: "/stores", label: "Магазины" },
];

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#e4e2dd] bg-[#f6f6f4]/95 backdrop-blur">
      <div className="container-x flex h-14 items-center gap-3 sm:h-[60px] sm:gap-6">
        <a href="/" className="flex items-center gap-2.5 sm:gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#131416] text-[15px] font-bold text-white">С</span>
          <span className="whitespace-nowrap text-[15px] font-bold leading-none tracking-tight">СБОРКА</span>
          <span className="spec-mono hidden text-[10px] uppercase tracking-[0.14em] text-[#676c76] lg:block">fpv · каталог · гайды</span>
        </a>
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="rounded-md px-3 py-2 text-[14px] font-medium text-[#131416] hover:bg-[#e9e8e4]">
              {l.label}
            </a>
          ))}
        </nav>
        <a href="/constructor" className="btn-primary ml-auto hidden !py-2 sm:inline-flex md:ml-0">Собрать дрон</a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-[#e4e2dd] bg-white">
      <div className="container-x grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="text-[15px] font-bold">СБОРКА</p>
          <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-[#676c76]">
            Независимый каталог для самостоятельной сборки. Совместимость, цены магазинов РФ, гайды и прошивки в одном месте.
          </p>
          <p className="spec-mono mt-4 text-[11px] uppercase tracking-[0.12em] text-[#676c76]">База: 32 детали · 12 магазинов · 2026</p>
        </div>
        <div>
          <p className="eyebrow">Разделы</p>
          <ul className="mt-3 space-y-2 text-[14px]">
            <li><a className="hover:underline" href="/constructor">Конструктор</a></li>
            <li><a className="hover:underline" href="/catalog">Каталог деталей</a></li>
            <li><a className="hover:underline" href="/guides">Гайды по сборке</a></li>
            <li><a className="hover:underline" href="/firmware">Прошивки</a></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Железо</p>
          <ul className="mt-3 space-y-2 text-[14px]">
            <li><a className="hover:underline" href="/catalog">Рамы 5&quot; / 7&quot; / 65мм</a></li>
            <li><a className="hover:underline" href="/catalog">Стеки и полетники</a></li>
            <li><a className="hover:underline" href="/catalog">VTX 2.5–10 Вт</a></li>
            <li><a className="hover:underline" href="/catalog">ELRS 2.4 / 868</a></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Важно</p>
          <ul className="mt-3 space-y-2 text-[14px] text-[#676c76]">
            <li>БПЛА от 150 г — учет в Росавиации</li>
            <li>Частоты и мощность VTX — по закону РФ</li>
            <li>Цены ориентировочные, проверяй наличие</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#e4e2dd]">
        <div className="container-x flex flex-col gap-2 py-4 text-[12px] text-[#676c76] md:flex-row md:items-center">
          <span>© 2026 Сборка. Сделано для пилотов. Фото товаров — официальные сайты производителей.</span>
          <span className="md:ml-auto spec-mono">Betaflight · INAV · ArduPilot · ELRS</span>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html       lang="ru"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <div className="flex-1 pb-[76px] md:pb-0">{children}</div>
        <Footer />
        <BottomBar />
      </body>
    </html>
  );
}
