export const PALETTE = ['#79906f', '#86809c', '#a66568', '#ac9983', '#6e7f7a'];

export function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6D2B79F5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function easeInOutCubic(value) {
  const t = Math.min(1, Math.max(0, value));
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function phaseProgress(progress, start, end) {
  if (end <= start) return progress >= end ? 1 : 0;
  return Math.min(1, Math.max(0, (progress - start) / (end - start)));
}

export function createEntities(count = 240, seed = 2084) {
  const random = seededRandom(seed);
  return Array.from({ length: count }, (_, index) => {
    const staffBand = index % 11;
    return {
      bit: random() > 0.5 ? '1' : '0',
      note: ['♪', '♩', '♫', '♬'][index % 4],
      color: PALETTE[index % PALETTE.length],
      sourceX: 0.02 + random() * 0.28,
      sourceY: 0.24 + random() * 0.66,
      noteX: 0.38 + random() * 0.26,
      noteY: 0.37 + staffBand * 0.018 + (random() - 0.5) * 0.024,
      finalX: 0.66 + random() * 0.36,
      finalY: 0.26 + random() * 0.65,
      size: 0.7 + random() * 1.35,
      drift: random() * Math.PI * 2,
      route: index / Math.max(1, count - 1),
    };
  });
}

export function getEntityState(entity, progress, time = 0) {
  // Each entity starts at a different point in the left-to-right pipeline,
  // while scrolling advances the whole score toward its resolved state.
  const routedProgress = Math.min(1, progress + entity.route * 0.9);
  const intoNotation = easeInOutCubic(phaseProgress(routedProgress, 0.08, 0.56));
  const intoMusic = easeInOutCubic(phaseProgress(routedProgress, 0.48, 0.94));
  const firstX = entity.sourceX + (entity.noteX - entity.sourceX) * intoNotation;
  const firstY = entity.sourceY + (entity.noteY - entity.sourceY) * intoNotation;
  const shimmer = Math.sin(time * 0.0007 + entity.drift) * 0.0035 * intoMusic;
  return {
    x: firstX + (entity.finalX - firstX) * intoMusic,
    y: firstY + (entity.finalY - firstY) * intoMusic + shimmer,
    notation: intoNotation * (1 - intoMusic * 0.82),
    particle: intoMusic,
    binary: 1 - intoNotation,
  };
}
