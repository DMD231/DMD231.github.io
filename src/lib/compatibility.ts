import { Part } from '@/data/parts';

export type Build = Partial<Record<string, Part>>;

export function checkBuild(build: Build): { ok: boolean; warnings: string[]; total: number } {
  const warnings: string[] = [];
  let total = 0;
  Object.values(build).forEach((p) => {
    if (p) total += p.priceRub;
  });

  const frame = build.frame;
  const motor = build.motor;
  const stack = build.stack;
  const vtx = build.vtx;
  const rx = build.rx;
  const cam = build.camera;
  const bat = build.battery;

  if (frame?.size === '5"' && motor?.size && !['2207', '2306'].includes(motor.size)) {
    warnings.push(`Рама 5" + моторы ${motor.size} — неоптимально. Для 5" бери 2207/2306.`);
  }
  if (frame?.size === '7"' && motor?.voltage !== '6S') {
    warnings.push('Для 7" дальнолета лучше 6S + 900KV и Li-Ion, иначе будет жрать батарею.');
  }
  if (motor?.voltage && bat?.voltage && motor.voltage !== bat.voltage && motor.voltage !== '6S') {
    warnings.push(`Моторы ${motor.voltage} + АКБ ${bat.voltage} — проверь поддержку ESC (обычно берут одинаковые S).`);
  }
  if (stack?.mount && frame?.mount && stack.mount !== frame.mount) {
    warnings.push(`Стек ${stack.mount} не встанет в раму ${frame.mount} без адаптера. Ищи 20x20->30.5 переходник.`);
  }
  if (cam?.system === 'dji-o3' && vtx && vtx.system === 'analog') {
    warnings.push('DJI O3 — это уже камера+VTX в одном. Отдельный аналоговый VTX не нужен.');
  }
  if (rx?.protocol?.includes('868') && build.radio?.protocol?.includes('2.4')) {
    warnings.push('Приемник 868МГц + пульт 2.4ГГц без модуля — не свяжутся. Нужен один диапазон ELRS.');
  }
  if (vtx?.id.includes('10w') && (frame?.size === '5"' || frame?.size === '65мм')) {
    warnings.push('VTX 10Вт (110г) слишком тяжел для мелкой рамы — только на 7-10".');
  }
  if (total > 0 && total < 20000) warnings.push('Бюджет очень низкий — проверь, не забыл ли пульт/очки/АКБ (это +25-40к).');
  return { ok: warnings.length === 0, warnings, total };
}

export function estimateFlight(frameSize?: string, batId?: string): string {
  if (frameSize === '65мм') return '~4-5 мин на 1S 300mAh';
  if (frameSize === '5"') return batId?.includes('6s') ? '~5-7 мин фристайл / 8-10 спокойный' : '~5-6 мин';
  if (frameSize === '7"') return batId?.includes('lion') ? '~20-30 мин маршрут' : '~8-12 мин';
  return '~6-10 мин (зависит от стиля)';
}
