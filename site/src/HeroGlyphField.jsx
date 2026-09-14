import { useEffect, useRef } from 'react';

const MUSIC_GLYPHS = ['♪', '♩', '♫', '♬', '𝄞', '𝄢', '𝄫', '𝄪'];
const PARTICLE_LIMIT = 240;
const SAMPLE_STEP = 6;

function seededUnit(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function makeParticle(index, width, height) {
  const angle = seededUnit(index + 11) * Math.PI * 2;
  const distance = Math.max(width, height) * (.58 + seededUnit(index + 37) * .38);
  return {
    glyph: MUSIC_GLYPHS[index % MUSIC_GLYPHS.length],
    x: width / 2 + Math.cos(angle) * distance,
    y: height / 2 + Math.sin(angle) * distance,
    targetX: width / 2,
    targetY: height / 2,
    color: '#454b9b',
    size: 8 + seededUnit(index + 71) * 4,
    delay: seededUnit(index + 101) * 240,
    active: false,
  };
}

function getTargets(maskContext, width, height, ratio, words) {
  maskContext.clearRect(0, 0, width, height);
  const wordMetrics = [];
  words.forEach(({ element, color }) => {
    const style = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    const parentRect = element.closest('.duet-intro').getBoundingClientRect();
    const fontSize = Number.parseFloat(style.fontSize);
    maskContext.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize}/${style.lineHeight} ${style.fontFamily}`;
    maskContext.textBaseline = 'alphabetic';
    maskContext.fillStyle = '#000';
    // Canvas needs a baseline; center against the browser's line box, which keeps
    // targets aligned when the heading wraps at the mobile breakpoint.
    const x = rect.left - parentRect.left;
    const y = rect.top - parentRect.top + (rect.height + fontSize) / 2 - fontSize * .12;
    maskContext.fillText(element.textContent, x, y);
    wordMetrics.push({ color, x, y, width: rect.width, height: rect.height });
  });

  const pixels = maskContext.getImageData(0, 0, Math.ceil(width * ratio), Math.ceil(height * ratio)).data;
  const targets = [];
  for (let y = 0; y < height; y += SAMPLE_STEP) {
    for (let x = 0; x < width; x += SAMPLE_STEP) {
      const pixelX = Math.min(Math.floor(x * ratio), Math.ceil(width * ratio) - 1);
      const pixelY = Math.min(Math.floor(y * ratio), Math.ceil(height * ratio) - 1);
      if (pixels[(pixelY * Math.ceil(width * ratio) + pixelX) * 4 + 3] < 100) continue;
      const metric = wordMetrics.find(item => x >= item.x && x <= item.x + item.width && y >= item.y - item.height && y <= item.y + item.height);
      if (metric) targets.push({ x, y, color: metric.color });
    }
  }
  return targets;
}

// Decorative canvas only. The adjacent h1 retains the complete phrase for
// assistive technology while this field turns the same words into note glyphs.
export function HeroGlyphField({ phraseIndex, animate, reduced }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const targetRef = useRef([]);
  const runningRef = useRef(true);
  const startRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const intro = canvas?.closest('.duet-intro');
    if (!canvas || !intro) return undefined;
    const context = canvas.getContext('2d');
    const mask = document.createElement('canvas');
    const maskContext = mask.getContext('2d', { willReadFrequently: true });
    let frame = 0;
    let ratio = 1;
    let width = 1;
    let height = 1;
    let draw = () => {};
    const resume = () => {
      if (runningRef.current && !frame) frame = requestAnimationFrame(draw);
    };

    const buildTargets = () => {
      const rect = intro.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.ceil(width * ratio);
      canvas.height = Math.ceil(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      mask.width = Math.ceil(width * ratio);
      mask.height = Math.ceil(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      maskContext.setTransform(ratio, 0, 0, ratio, 0, 0);
      const words = [
        { element: intro.querySelector('.duet-cycle-action'), color: '#3e4a92' },
        { element: intro.querySelector('.duet-cycle-join'), color: '#fff' },
        { element: intro.querySelector('.duet-cycle-subject'), color: '#454b9b' },
        { element: intro.querySelector('.duet-cycle-ending'), color: '#735aa8' },
      ].filter(item => item.element);
      targetRef.current = getTargets(maskContext, width, height, ratio, words);
      const pool = particlesRef.current;
      while (pool.length < PARTICLE_LIMIT) pool.push(makeParticle(pool.length, width, height));
      pool.forEach((particle, index) => {
        const target = targetRef.current[index % Math.max(targetRef.current.length, 1)];
        particle.active = Boolean(target);
        particle.targetX = target?.x ?? width / 2;
        particle.targetY = target?.y ?? height / 2;
        particle.color = target?.color ?? '#454b9b';
        if (reduced) { particle.x = particle.targetX; particle.y = particle.targetY; }
      });
      startRef.current = performance.now();
    };

    const observer = new ResizeObserver(buildTargets);
    observer.observe(intro);
    const visibility = new IntersectionObserver(([entry]) => { runningRef.current = entry.isIntersecting && !document.hidden; resume(); }, { threshold: .05 });
    visibility.observe(intro);
    const documentVisibility = () => { runningRef.current = !document.hidden; resume(); };
    document.addEventListener('visibilitychange', documentVisibility);
    buildTargets();

    draw = now => {
      frame = 0;
      context.clearRect(0, 0, width, height);
      const progress = reduced || !animate ? 1 : Math.min(1, (now - startRef.current) / 720);
      const eased = 1 - Math.pow(1 - progress, 4);
      particlesRef.current.forEach((particle, index) => {
        if (!particle.active) return;
        const stagger = reduced || !animate ? 1 : Math.max(0, Math.min(1, (now - startRef.current - particle.delay) / 470));
        const settled = 1 - Math.pow(1 - stagger, 3);
        particle.x += (particle.targetX - particle.x) * (reduced || !animate ? 1 : .16 + settled * .2);
        particle.y += (particle.targetY - particle.y) * (reduced || !animate ? 1 : .16 + settled * .2);
        context.globalAlpha = .32 + Math.min(1, (eased + settled) * .7);
        context.fillStyle = particle.color;
        context.font = `${particle.size}px Georgia, serif`;
        context.fillText(particle.glyph, particle.x, particle.y);
      });
      context.globalAlpha = 1;
      resume();
    };
    resume();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      document.removeEventListener('visibilitychange', documentVisibility);
    };
  }, [phraseIndex, animate, reduced]);

  return <canvas ref={canvasRef} className="duet-glyph-field" aria-hidden="true" />;
}
