/* Схемы подключения для гайдов. Цвета проводов: красный — плюс, черный — земля,
   желтый/белый — сигнал, зеленый/синий — I2C. Читать: паяем при ОТКЛЮЧЕННОЙ батарее. */

function Legend() {
  return (
    <g fontFamily="monospace" fontSize="10">
      <circle cx="14" cy="14" r="5" fill="#c62f2f" />
      <text x="24" y="17" fill="#141412">плюс</text>
      <circle cx="84" cy="14" r="5" fill="#141412" />
      <text x="94" y="17" fill="#141412">земля</text>
      <circle cx="162" cy="14" r="5" fill="#d9a400" />
      <text x="172" y="17" fill="#141412">сигнал</text>
      <circle cx="240" cy="14" r="5" fill="#2f7dc6" />
      <text x="250" y="17" fill="#141412">I2C / телеметрия</text>
    </g>
  );
}

const wire = { fill: 'none', strokeWidth: 3, strokeLinecap: 'round' } as const;

/** Стек: батарея → конденсатор → ESC → моторы M1-M4, шлейф к FC. */
export function StackDiagram() {
  return (
    <figure className="card overflow-hidden">
      <svg viewBox="0 0 560 340" className="h-auto w-full bg-[#faf9f7]" role="img" aria-label="Схема стека">
        <Legend />
        {/* АКБ */}
        <rect x="20" y="120" width="90" height="120" rx="8" fill="#fff" stroke="#141412" strokeWidth="2" />
        <text x="65" y="140" textAnchor="middle" fontFamily="monospace" fontSize="11" fontWeight="bold">АКБ</text>
        <text x="65" y="156" textAnchor="middle" fontFamily="monospace" fontSize="11">4-6S</text>
        <text x="65" y="200" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#c62f2f">XT60 +</text>
        <text x="65" y="216" textAnchor="middle" fontFamily="monospace" fontSize="11">XT60 −</text>
        {/* Конденсатор */}
        <rect x="150" y="150" width="60" height="60" rx="6" fill="#fff" stroke="#141412" strokeWidth="2" />
        <text x="180" y="172" textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight="bold">470мкФ</text>
        <text x="180" y="186" textAnchor="middle" fontFamily="monospace" fontSize="10">35В+</text>
        <text x="180" y="200" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#c62f2f">полоса → +</text>
        {/* ESC */}
        <rect x="250" y="90" width="290" height="180" rx="10" fill="#fff" stroke="#141412" strokeWidth="2.5" />
        <text x="395" y="110" textAnchor="middle" fontFamily="monospace" fontSize="12" fontWeight="bold">ESC 4в1 (низ стека)</text>
        {/* BAT пады */}
        <circle cx="270" cy="140" r="7" fill="#c62f2f" />
        <text x="270" y="128" textAnchor="middle" fontFamily="monospace" fontSize="10">BAT+</text>
        <circle cx="270" cy="180" r="7" fill="#141412" />
        <text x="270" y="202" textAnchor="middle" fontFamily="monospace" fontSize="10">GND</text>
        {/* Моторы */}
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <circle cx={330 + i * 62} cy="150" r="6" fill="none" stroke="#141412" strokeWidth="2" />
            <text x={330 + i * 62} y="138" textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight="bold">M{i + 1}</text>
            <text x={330 + i * 62} y="172" textAnchor="middle" fontFamily="monospace" fontSize="9">3 провода</text>
          </g>
        ))}
        <text x="395" y="230" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#6f6e69">порядок — по схеме Betaflight, реверс — в конфигураторе</text>
        <text x="395" y="250" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#6f6e69">винты НЕ должны касаться обмоток!</text>
        {/* Провода */}
        <path d="M110 195 C130 195 130 165 150 165" {...wire} stroke="#c62f2f" />
        <path d="M110 210 C130 210 130 185 150 185" {...wire} stroke="#141412" />
        <path d="M210 165 C230 165 240 150 250 145" {...wire} stroke="#c62f2f" />
        <path d="M210 185 C230 185 240 170 250 175" {...wire} stroke="#141412" />
        {/* Шлейф к FC */}
        <rect x="250" y="285" width="290" height="36" rx="6" fill="#141412" />
        <text x="395" y="308" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#fff">↑ шлейф 8-pin к FC (питание + сигналы DShot)</text>
      </svg>
      <figcaption className="spec-mono border-t border-[#e3e1da] px-4 py-2 text-[11px] text-[#6f6e69]">
        Схема 1 — силовая: АКБ → конденсатор → ESC → моторы. Конденсатор паяем как можно ближе к падам BAT.
      </figcaption>
    </figure>
  );
}

/** UART-периферия: ELRS-приемник, GPS, SmartAudio VTX. */
export function UartDiagram() {
  return (
    <figure className="card overflow-hidden">
      <svg viewBox="0 0 560 360" className="h-auto w-full bg-[#faf9f7]" role="img" aria-label="Схема UART">
        <Legend />
        {/* FC */}
        <rect x="200" y="60" width="160" height="260" rx="10" fill="#fff" stroke="#141412" strokeWidth="2.5" />
        <text x="280" y="82" textAnchor="middle" fontFamily="monospace" fontSize="12" fontWeight="bold">FC</text>
        {/* UART2 RX */}
        <text x="208" y="120" fontFamily="monospace" fontSize="10">UART2:</text>
        <circle cx="212" cy="136" r="5" fill="none" stroke="#141412" strokeWidth="2" /><text x="224" y="139" fontFamily="monospace" fontSize="10">TX2</text>
        <circle cx="212" cy="154" r="5" fill="none" stroke="#141412" strokeWidth="2" /><text x="224" y="157" fontFamily="monospace" fontSize="10">RX2</text>
        <circle cx="212" cy="172" r="5" fill="#c62f2f" /><text x="224" y="175" fontFamily="monospace" fontSize="10">5V</text>
        <circle cx="212" cy="190" r="5" fill="#141412" /><text x="224" y="193" fontFamily="monospace" fontSize="10">GND</text>
        {/* UART1 VTX */}
        <text x="208" y="222" fontFamily="monospace" fontSize="10">UART1:</text>
        <circle cx="212" cy="238" r="5" fill="none" stroke="#141412" strokeWidth="2" /><text x="224" y="241" fontFamily="monospace" fontSize="10">TX1→SA</text>
        {/* GPS */}
        <text x="208" y="268" fontFamily="monospace" fontSize="10">UART3+I2C:</text>
        <circle cx="212" cy="284" r="5" fill="none" stroke="#141412" strokeWidth="2" /><text x="224" y="287" fontFamily="monospace" fontSize="10">TX/RX</text>
        <circle cx="212" cy="302" r="5" fill="#2f7dc6" /><text x="224" y="305" fontFamily="monospace" fontSize="10">SDA/SCL</text>
        {/* ELRS RX */}
        <rect x="20" y="100" width="120" height="110" rx="8" fill="#fff" stroke="#141412" strokeWidth="2" />
        <text x="80" y="120" textAnchor="middle" fontFamily="monospace" fontSize="11" fontWeight="bold">ELRS RX</text>
        <text x="80" y="136" textAnchor="middle" fontFamily="monospace" fontSize="9">RX→TX, TX→RX!</text>
        <text x="80" y="150" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#c62f2f">крест-накрест</text>
        <text x="80" y="164" textAnchor="middle" fontFamily="monospace" fontSize="9">антенны наружу</text>
        <text x="80" y="196" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6f6e69">915: подальше от</text>
        <text x="80" y="208" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6f6e69">карбона и VTX</text>
        {/* GPS модуль */}
        <rect x="20" y="240" width="120" height="80" rx="8" fill="#fff" stroke="#141412" strokeWidth="2" />
        <text x="80" y="260" textAnchor="middle" fontFamily="monospace" fontSize="11" fontWeight="bold">GPS+компас</text>
        <text x="80" y="276" textAnchor="middle" fontFamily="monospace" fontSize="9">стрелка → нос</text>
        <text x="80" y="290" textAnchor="middle" fontFamily="monospace" fontSize="9">дальше от силовых</text>
        <text x="80" y="304" textAnchor="middle" fontFamily="monospace" fontSize="9">и VTX</text>
        {/* VTX SA */}
        <rect x="420" y="190" width="120" height="80" rx="8" fill="#fff" stroke="#141412" strokeWidth="2" />
        <text x="480" y="210" textAnchor="middle" fontFamily="monospace" fontSize="11" fontWeight="bold">VTX</text>
        <text x="480" y="226" textAnchor="middle" fontFamily="monospace" fontSize="9">SA ← TX1</text>
        <text x="480" y="240" textAnchor="middle" fontFamily="monospace" fontSize="9">питание с BAT</text>
        <text x="480" y="254" textAnchor="middle" fontFamily="monospace" fontSize="9">через свой BEC</text>
        {/* Провода RX */}
        <path d="M140 130 C170 130 170 136 200 136" {...wire} stroke="#d9a400" />
        <path d="M140 145 C170 145 170 154 200 154" {...wire} stroke="#d9a400" />
        <path d="M140 160 C165 160 165 172 200 172" {...wire} stroke="#c62f2f" />
        <path d="M140 175 C165 175 165 190 200 190" {...wire} stroke="#141412" />
        {/* GPS */}
        <path d="M140 270 C170 270 170 284 200 284" {...wire} stroke="#d9a400" />
        <path d="M140 285 C170 285 170 302 200 302" {...wire} stroke="#2f7dc6" />
        {/* VTX SA */}
        <path d="M360 238 C390 238 390 220 420 220" {...wire} stroke="#d9a400" />
      </svg>
      <figcaption className="spec-mono border-t border-[#e3e1da] px-4 py-2 text-[11px] text-[#6f6e69]">
        Схема 2 — цифра: приемник всегда крест-накрест (TX→RX), GPS — стрелкой к носу и подальше от помех.
      </figcaption>
    </figure>
  );
}

/** Видеотракт: камера → FC (OSD) → VTX → антенна. */
export function FpvDiagram() {
  return (
    <figure className="card overflow-hidden">
      <svg viewBox="0 0 560 300" className="h-auto w-full bg-[#faf9f7]" role="img" aria-label="Схема видеотракта">
        <Legend />
        {/* Камера */}
        <rect x="20" y="120" width="110" height="100" rx="8" fill="#fff" stroke="#141412" strokeWidth="2" />
        <text x="75" y="142" textAnchor="middle" fontFamily="monospace" fontSize="11" fontWeight="bold">Камера</text>
        <text x="75" y="158" textAnchor="middle" fontFamily="monospace" fontSize="9">5V / GND</text>
        <text x="75" y="172" textAnchor="middle" fontFamily="monospace" fontSize="9">Video OUT →</text>
        <text x="75" y="190" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6f6e69">PAL выбери</text>
        <text x="75" y="204" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6f6e69">до пайки</text>
        {/* FC OSD */}
        <rect x="200" y="100" width="160" height="140" rx="10" fill="#fff" stroke="#141412" strokeWidth="2.5" />
        <text x="280" y="122" textAnchor="middle" fontFamily="monospace" fontSize="12" fontWeight="bold">FC (OSD-чип)</text>
        <text x="280" y="142" textAnchor="middle" fontFamily="monospace" fontSize="10">CAM_S ← вход</text>
        <text x="280" y="160" textAnchor="middle" fontFamily="monospace" fontSize="10">CAM_C → выход</text>
        <text x="280" y="182" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6f6e69">камеру питай от</text>
        <text x="280" y="196" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6f6e69">5V FC, не от VTX</text>
        <text x="280" y="216" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#c62f2f">GND — общий!</text>
        {/* VTX */}
        <rect x="430" y="120" width="110" height="100" rx="8" fill="#fff" stroke="#141412" strokeWidth="2" />
        <text x="485" y="142" textAnchor="middle" fontFamily="monospace" fontSize="11" fontWeight="bold">VTX</text>
        <text x="485" y="158" textAnchor="middle" fontFamily="monospace" fontSize="9">Video IN ←</text>
        <text x="485" y="172" textAnchor="middle" fontFamily="monospace" fontSize="9">BAT 7-36V</text>
        <text x="485" y="190" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#c62f2f">без антенны</text>
        <text x="485" y="204" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#c62f2f">НЕ ВКЛЮЧАТЬ</text>
        {/* Провода */}
        <path d="M130 165 C165 165 165 135 200 135" {...wire} stroke="#d9a400" />
        <path d="M360 135 C395 135 395 150 430 150" {...wire} stroke="#d9a400" />
        {/* Антенна */}
        <line x1="485" y1="120" x2="485" y2="70" stroke="#141412" strokeWidth="3" />
        <circle cx="485" cy="62" r="8" fill="none" stroke="#141412" strokeWidth="2.5" />
        <path d="M463 88 Q485 68 507 88 M455 98 Q485 70 515 98" fill="none" stroke="#141412" strokeWidth="1.6" />
        <text x="485" y="280" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#6f6e69">антенна той же поляризации, что в очках (RHCP↔RHCP)</text>
      </svg>
      <figcaption className="spec-mono border-t border-[#e3e1da] px-4 py-2 text-[11px] text-[#6f6e69]">
        Схема 3 — видео: камера → OSD на FC → VTX. Черный экран = проверь PAL/NTSC и общий GND.
      </figcaption>
    </figure>
  );
}
