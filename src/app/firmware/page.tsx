import { firmwares } from '@/data/content';

export default function FirmwarePage() {
  return (
    <main className="container-x py-10">
      <p className="eyebrow">Прошивки · только официальные релизы</p>
      <h1 className="h-display mt-2 text-[28px] sm:text-[34px] md:text-[48px]">Софт, который шьем</h1>
      <p className="mt-3 max-w-2xl text-[15px] text-[#676c76]">Перед обновлением — бэкап: <span className="font-mono">diff all</span> в Betaflight / INAV. ELRS — одна binding-фраза на пульте и приемнике.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {firmwares.map((f) => (
          <article key={f.id} className="card flex flex-col p-6">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-[19px] font-bold tracking-tight">{f.name}</h2>
              <span className="spec-mono rounded bg-[#f6f6f4] px-2 py-1 text-[11px]">{f.version}</span>
            </div>
            <dl className="mt-4 space-y-2 text-[14px]">
              <div className="grid grid-cols-[110px_1fr] gap-3"><dt className="text-[#676c76]">Назначение</dt><dd className="font-medium">{f.use}</dd></div>
              <div className="grid grid-cols-[110px_1fr] gap-3"><dt className="text-[#676c76]">Платы</dt><dd className="font-medium">{f.boards}</dd></div>
            </dl>
            <p className="mt-4 rounded-lg border border-[#f0c9b3] bg-[#fff4ec] p-3 text-[13px]">{f.notes}</p>
            <a href={f.link} target="_blank" className="btn-ghost mt-4">Скачать с GitHub →</a>
          </article>
        ))}
      </div>
      <div className="card mt-6 grid gap-4 p-6 md:grid-cols-[auto_1fr] md:items-center">
        <p className="spec-mono text-[12px] uppercase tracking-[0.12em] text-[#676c76]">Софт на ПК</p>
        <p className="font-mono text-[13px]">Betaflight Configurator · INAV Configurator · Mission Planner / QGC · ELRS Configurator · OpenVTX Configurator · Zadig</p>
      </div>
    </main>
  );
}
