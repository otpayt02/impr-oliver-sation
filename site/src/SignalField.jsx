import { useEffect, useMemo, useRef } from 'react';
import { createEntities } from './signal-model.js';

const ASCII_DITHER = ['.', ':', '+', '#'];
const HTML_GLYPHS = ['#', '<', '>', '/>', '{', '}', '01', '</>'];
const MUSIC_GLYPHS = ['♪', '♩', '♫', '♬'];
const CHAOS_PALETTE = ['#9bbda8', '#92b5d2', '#b3a3c8'];
const ORDERED_PALETTE = ['#b1cbb8', '#accbe1', '#c0afda'];
const clamp = x => Math.max(0, Math.min(1, x));
const smooth = x => { const t = clamp(x); return t * t * (3 - 2 * t); };

function wavePosition(x, width, height, wave, time, progress) {
  const u = x / width;
  const settle = smooth(u * 1.05 + progress * 1.2 - .18);
  const t = time * .0003;
  const burst = .45 + .55 * Math.pow(Math.sin(u * 17 + wave * 1.8 + t), 2);
  const chaos = (Math.sin(u * 49 + t * 5 + wave * 2) * .14 + Math.cos(u * 113 - t * 3 + wave) * .085 + Math.sin(u * 197 + t * 7) * .035) * burst;
  const ordered = Math.sin(u * Math.PI * 3.5 + t + wave * .7) * .05;
  return { settle, y: height * (.31 + wave * .083 + chaos * (1 - settle) + ordered * settle) };
}

function drawWaveFamilies(ctx, width, height, time, progress) {
  for (let wave = 0; wave < 5; wave++) {
    ctx.beginPath(); ctx.strokeStyle = ORDERED_PALETTE[wave % 3]; ctx.globalAlpha = .25; ctx.lineWidth = .85;
    for (let x = 0; x <= width; x += 3) { const { y } = wavePosition(x, width, height, wave, time, progress); if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
    ctx.stroke();
  }
}

export function SignalField({ progress = 0, animate = true }) {
  const canvasRef = useRef(null);
  const scene = useRef({ progress, animate });
  scene.current = { progress, animate };
  const entities = useMemo(() => createEntities(120, 2084), []);
  useEffect(() => {
    const canvas = canvasRef.current, ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0, visible = true, width = 1, height = 1, dpr = 1, last = -Infinity;
    const draw = (time = 0) => {
      frame = 0;
      const state = scene.current;
      if (time - last >= 32 || !state.animate) {
        last = time;
        const t = state.animate ? time : 0;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, width, height);
        drawWaveFamilies(ctx, width, height, t, state.progress);
        for (let index = 0; index < entities.length; index++) {
          const entity = entities[index], x = width * (.025 + entity.route * .95);
          const { y, settle } = wavePosition(x, width, height, index % 5, t, state.progress);
          const drift = Math.sin(t * .001 + entity.drift) * height * .06 * (1 - settle);
          ctx.font = (11 + (index % 3) * 2) + 'px ' + (settle > .6 ? 'Georgia' : 'monospace');
          ctx.fillStyle = (settle > .6 ? ORDERED_PALETTE : CHAOS_PALETTE)[index % 3];
          ctx.globalAlpha = index % 3 === 0 ? .8 : .3;
          // Notation follows the resolving wave instead of piling onto staff lines.
          const glyph = settle > .6 ? (index % 3 === 0 ? MUSIC_GLYPHS[index % 4] : '·') : HTML_GLYPHS[index % 8];
          ctx.fillText(glyph, x, y + drift);
          if (settle < .6 && index % 2 === 0) { ctx.globalAlpha = .18 * (1 - settle); ctx.fillText(ASCII_DITHER[index % 4], x, y + height * .14 * Math.sin(entity.drift)); }
        }
        ctx.globalAlpha = 1;
      }
      if (state.animate && visible && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const resume = () => { cancelAnimationFrame(frame); last = -Infinity; if (visible && !document.hidden) draw(performance.now()); };
    const measure = () => { width = Math.max(1, canvas.clientWidth); height = Math.max(1, canvas.clientHeight); dpr = Math.min(2, devicePixelRatio || 1); canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); resume(); };
    const resize = new ResizeObserver(measure); resize.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); }); intersection.observe(canvas);
    document.addEventListener('visibilitychange', resume); measure();
    return () => { cancelAnimationFrame(frame); resize.disconnect(); intersection.disconnect(); document.removeEventListener('visibilitychange', resume); };
  }, [animate, entities]);
  return <canvas ref={canvasRef} className="signal-field" role="img" aria-label="Chaotic music notation resolving into organized sine and cosine wave families as you scroll" />;
}
