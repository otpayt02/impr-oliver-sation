import { useEffect, useRef } from 'react';
import './note-glyph-field.css';

const NOTE_GLYPHS = ['♩', '♪', '♫', '♬', '𝄞', '𝄢', '♭', '♮', '♯'];
const BACKGROUND_COUNT = 72;
const randomOutsideEdge = (width, height) => {
  const edge = Math.floor(Math.random() * 4);
  const offset = 20 + Math.random() * 40;
  if (edge === 0) return { x: -offset, y: Math.random() * height };
  if (edge === 1) return { x: width + offset, y: Math.random() * height };
  if (edge === 2) return { x: Math.random() * width, y: -offset };
  return { x: Math.random() * width, y: height + offset };
};

// One decorative canvas keeps the individual notes alive between phrases. The
// surrounding h1 owns the readable phrase, so assistive tech never reads sprites.
export function NoteGlyphField({ phrase, domain = 'music', reduced = false }) {
  const canvas = useRef(null);
  const phraseRef = useRef(phrase);
  const domainRef = useRef(domain);
  const engineRef = useRef(null);
  phraseRef.current = phrase;
  domainRef.current = domain;
  const phraseKey = phrase.join('|');

  useEffect(() => {
    if (reduced) return undefined;
    const element = canvas.current;
    const context = element.getContext('2d');
    const state = {
      active: true, visible: !document.hidden, intersecting: true, frame: 0,
      width: 1, height: 1, ratio: 1, particles: [], background: [], targets: [],
      particleLimit: 220, previousTime: 0, slowFrames: 0, phrase: phraseRef.current, phraseKey,
    };
    engineRef.current = state;

    const linesFor = ([subject, predicate, purpose]) => [subject, predicate, purpose];
    const measure = () => {
      const bounds = element.getBoundingClientRect();
      state.width = Math.max(1, bounds.width);
      state.height = Math.max(1, bounds.height);
      state.ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      element.width = Math.ceil(state.width * state.ratio);
      element.height = Math.ceil(state.height * state.ratio);
      context.setTransform(state.ratio, 0, 0, state.ratio, 0, 0);
    };
    const sample = (value) => {
      const mask = document.createElement('canvas');
      mask.width = element.width;
      mask.height = element.height;
      const maskContext = mask.getContext('2d');
      maskContext.scale(state.ratio, state.ratio);
      const fontSize = Math.min(state.width * 0.13, state.height * 0.29);
      const lineHeight = fontSize * 0.84;
      const lines = linesFor(value);
      maskContext.font = `bold ${fontSize}px Georgia`;
      maskContext.fillStyle = '#fff';
      maskContext.textBaseline = 'alphabetic';
      const targets = [];
      lines.forEach((line, tone) => {
        maskContext.clearRect(0, 0, state.width, state.height);
        maskContext.fillText(line, 0, fontSize + tone * lineHeight);
        const pixels = maskContext.getImageData(0, 0, mask.width, mask.height).data;
        for (let y = 3; y < state.height; y += 6) {
          for (let x = 3; x < state.width; x += 6) {
            const pixelX = Math.min(mask.width - 1, Math.floor(x * state.ratio));
            const pixelY = Math.min(mask.height - 1, Math.floor(y * state.ratio));
            if (pixels[(pixelY * mask.width + pixelX) * 4 + 3] > 128) targets.push({ x, y, tone });
          }
        }
      });
      return targets.sort(() => Math.random() - 0.5);
    };
    const resetBackground = () => {
      state.background = Array.from({ length: BACKGROUND_COUNT }, (_, index) => ({
        x: Math.random() * state.width, y: Math.random() * state.height,
        glyph: NOTE_GLYPHS[index % NOTE_GLYPHS.length], size: 9 + Math.random() * 8,
        seed: Math.random() * Math.PI * 2, green: index % 2 === 0,
      }));
    };
    const remap = (value, scatter) => {
      state.targets = sample(value);
      if (!state.targets.length) return;
      const desired = Math.min(state.targets.length, state.particleLimit);
      if (!state.particles.length) {
        state.particles = Array.from({ length: desired }, (_, index) => {
          const point = randomOutsideEdge(state.width, state.height);
          return { ...point, vx: 0, vy: 0, glyph: NOTE_GLYPHS[index % NOTE_GLYPHS.length], size: 11 + Math.random() * 8 };
        });
      } else if (state.particles.length < desired) {
        for (let index = state.particles.length; index < desired; index += 1) {
          const target = state.targets[index % state.targets.length];
          state.particles.push({ x: target.x, y: target.y, vx: 0, vy: 0, glyph: NOTE_GLYPHS[index % NOTE_GLYPHS.length], size: 11 + Math.random() * 8 });
        }
      }
      const centroid = state.targets.reduce((total, target) => ({ x: total.x + target.x, y: total.y + target.y }), { x: 0, y: 0 });
      centroid.x /= state.targets.length; centroid.y /= state.targets.length;
      state.particles.forEach((particle, index) => {
        particle.target = state.targets[index % state.targets.length];
        if (!scatter) return;
        let dx = particle.x - centroid.x;
        let dy = particle.y - centroid.y;
        const length = Math.hypot(dx, dy) || 1;
        if (length === 1) { dx = Math.cos(index); dy = Math.sin(index); }
        const impulse = 2 + Math.random() * 3;
        particle.vx += (dx / length) * impulse;
        particle.vy += (dy / length) * impulse;
      });
    };
    state.remap = remap;
    const draw = (time) => {
      if (!state.active || !state.visible || !state.intersecting) return;
      const delta = state.previousTime ? time - state.previousTime : 16.7;
      state.previousTime = time;
      state.slowFrames = delta > 20 ? state.slowFrames + 1 : 0;
      if (state.slowFrames >= 60 && state.particleLimit > 28) {
        state.particleLimit = Math.max(28, Math.floor(state.particleLimit / 2));
        state.particles.length = Math.min(state.particles.length, state.particleLimit);
        state.slowFrames = 0;
        remap(state.phrase, false);
      }
      context.clearRect(0, 0, state.width, state.height);
      context.textAlign = 'center'; context.textBaseline = 'middle';
      state.background.forEach((particle) => {
        const velocityX = Math.sin(time * 0.00018 + particle.seed) * 0.16;
        const velocityY = Math.cos(time * 0.00015 + particle.seed) * 0.13;
        particle.x = (particle.x + velocityX + state.width) % state.width;
        particle.y = (particle.y + velocityY + state.height) % state.height;
        context.font = `${particle.size}px Georgia`;
        context.globalAlpha = 0.2;
        context.fillStyle = particle.green ? '#4ade80' : '#60a5fa';
        context.fillText(particle.glyph, particle.x, particle.y);
      });
      context.fillStyle = '#a855f7'; context.globalAlpha = 1;
      state.particles.forEach((particle, index) => {
        const target = particle.target;
        if (!target) return;
        particle.vx += (target.x - particle.x) * 0.02;
        particle.vy += (target.y - particle.y) * 0.02;
        particle.vx *= 0.86; particle.vy *= 0.86;
        particle.x += particle.vx; particle.y += particle.vy;
        context.font = `${particle.size}px Georgia`;
        context.fillStyle = particle.target.tone === 0
          ? (domainRef.current === 'audio' ? '#34d399' : '#4ade80')
          : particle.target.tone === 1 ? '#60a5fa' : '#c084fc';
        context.fillText(particle.glyph, particle.x, particle.y);
      });
      context.globalAlpha = 1;
      state.frame = requestAnimationFrame(draw);
    };
    const start = () => {
      if (!state.frame && state.active && state.visible && state.intersecting) state.frame = requestAnimationFrame(draw);
    };
    const stop = () => { if (state.frame) cancelAnimationFrame(state.frame); state.frame = 0; };
    const resize = () => { measure(); resetBackground(); remap(state.phrase, false); };
    const visibility = () => { state.visible = !document.hidden; if (state.visible) { state.previousTime = 0; start(); } else stop(); };
    const intersection = new IntersectionObserver(([entry]) => { state.intersecting = entry.isIntersecting; if (state.intersecting) { state.previousTime = 0; start(); } else stop(); });
    const resizeObserver = new ResizeObserver(resize);
    measure(); resetBackground(); remap(state.phrase, false); intersection.observe(element); resizeObserver.observe(element); document.addEventListener('visibilitychange', visibility); start();
    return () => { state.active = false; stop(); intersection.disconnect(); resizeObserver.disconnect(); document.removeEventListener('visibilitychange', visibility); engineRef.current = null; };
  }, [reduced]);

  // Phrase updates are dispatched as an event so the rAF-owned particle pool is never recreated.
  useEffect(() => {
    const state = engineRef.current;
    if (!state || reduced || state.phraseKey === phraseKey) return;
    state.phrase = phraseRef.current;
    state.phraseKey = phraseKey;
    // The prior pool is retained; its velocity impulse fades under the same
    // 0.86 damping used for normal attraction, creating the short reshuffle.
    state.remap(state.phrase, true);
  }, [phraseKey, reduced]);

  if (reduced) return <span className="note-glyph-static" data-domain={domain} aria-hidden="true"><span>{phrase[0]}</span><span>{phrase[1]}</span><span>{phrase[2]}</span></span>;
  return <canvas ref={canvas} className="note-glyph-field" aria-hidden="true" />;
}
