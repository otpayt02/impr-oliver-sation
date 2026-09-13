import { useEffect, useRef, useState } from 'react';
import { SignalField } from './SignalField.jsx';
import { choosePhrase, servicePhrases } from './service-phrases.js';
import './service-landing.css';

// The canvas is decorative. The h1 keeps the exact phrase in the accessibility tree.
// Sampling the letter mask lets real notation/HTML glyphs make both its edge and face.
const clamp = value => Math.max(0, Math.min(1, value));
const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
const seeded = value => { const x = Math.sin(value * 12.9898) * 43758.5453; return x - Math.floor(x); };

// One deterministic notation plan is derived from each word mask. Scroll only
// changes arrival, so reverse-scroll and refresh-at-position reconstruct cleanly.
function GlyphWord({ children, tone, compact = false, progress = 1, start = 0, end = 1 }) {
  const canvas = useRef(null);
  useEffect(() => {
    const element = canvas.current;
    const draw = () => {
      const bounds = element.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.ceil(bounds.width * pixelRatio));
      const height = Math.max(1, Math.ceil(bounds.height * pixelRatio));
      element.width = width; element.height = height;
      const context = element.getContext('2d');
      context.clearRect(0, 0, width, height);
      context.scale(pixelRatio, pixelRatio);
      const mask = document.createElement('canvas');
      mask.width = width; mask.height = height;
      const maskContext = mask.getContext('2d');
      maskContext.scale(pixelRatio, pixelRatio);
      const fontSize = bounds.height * (compact ? .82 : .86);
      // Match the buyer-facing service subtitles, then let notation fill the
      // much larger letter mask in the hero.
      const font = `600 ${fontSize}px "Segoe UI", sans-serif`;
      maskContext.font = font;
      maskContext.textBaseline = 'middle';
      maskContext.fillStyle = '#fff';
      maskContext.fillText(children, 0, bounds.height * .53);
      const pixels = maskContext.getImageData(0, 0, width, height).data;
      const color = getComputedStyle(element).color;
      const glyphs = ['♪', '♩', '♫', '♬', '𝄞', '#'];
      const density = compact ? 9 : 10;
      const wordProgress = smooth((progress - start) / Math.max(.01, end - start));
      context.font = `${Math.max(9, density + 3)}px "Segoe UI", sans-serif`;
      context.textAlign = 'center'; context.textBaseline = 'middle';
      context.fillStyle = color;
      let point = 0;
      for (let y = density / 2; y < bounds.height; y += density) {
        for (let x = density / 2; x < bounds.width; x += density) {
          const px = Math.min(width - 1, Math.floor(x * pixelRatio));
          const py = Math.min(height - 1, Math.floor(y * pixelRatio));
          const inside = pixels[(py * width + px) * 4 + 3] > 80;
          if (!inside) continue;
          const neighbors = [[-1, 0], [1, 0], [0, -1], [0, 1]];
          const edge = neighbors.some(([dx, dy]) => {
            const nx = Math.max(0, Math.min(width - 1, px + dx * Math.ceil(pixelRatio * density)));
            const ny = Math.max(0, Math.min(height - 1, py + dy * Math.ceil(pixelRatio * density)));
            return pixels[(ny * width + nx) * 4 + 3] <= 80;
          });
          context.globalAlpha = edge ? 1 : .78;
          const delay = seeded(point + children.length * 19) * .46;
          const arrive = smooth((wordProgress - delay) / Math.max(.08, 1 - delay));
          const sourceX = x + (seeded(point * 2 + 11) - .5) * bounds.width * 1.4;
          const sourceY = y + (seeded(point * 2 + 17) - .5) * bounds.height * 1.45;
          const drawX = sourceX + (x - sourceX) * arrive;
          const drawY = sourceY + (y - sourceY) * arrive;
          context.globalAlpha *= .12 + arrive * .88;
          const glyph = arrive < .62 ? glyphs[(point + 5) % glyphs.length] : glyphs[point % 5];
          context.fillText(glyph, drawX, drawY);
          point++;
        }
      }
      context.globalAlpha = 1;
    };
    const observer = new ResizeObserver(draw);
    observer.observe(element); draw();
    return () => observer.disconnect();
  }, [children, compact, end, progress, start]);
  return <span className={`glyph-word glyph-word--${tone} phrase-${tone}${compact ? ' is-compact' : ''}`}><canvas ref={canvas} aria-hidden="true" /><span className="sr-only">{children}</span></span>;
}

export function ServiceLanding({ reduced }) {
  const runway = useRef(null);
  const history = useRef([0]);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const next = () => {
    const index = choosePhrase(history.current);
    history.current = [...history.current.slice(-6), index];
    setPhraseIndex(index);
  };
  useEffect(() => {
    if (reduced || paused) return;
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(runway.current);
    const timer = setInterval(() => { if (visible && !document.hidden) next(); }, 5800);
    return () => { clearInterval(timer); observer.disconnect(); };
  }, [reduced, paused]);
  useEffect(() => {
    let frame = 0, top = 0, distance = 1;
    const update = () => { frame = 0; setProgress(Math.max(0, Math.min(1, (scrollY - top) / distance))); };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    const measure = () => { const el = runway.current; top = el.getBoundingClientRect().top + scrollY; distance = Math.max(1, el.offsetHeight - innerHeight); queue(); };
    const observer = new ResizeObserver(measure);
    observer.observe(runway.current); measure();
    window.addEventListener('scroll', queue, { passive: true }); window.addEventListener('resize', measure);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', queue); window.removeEventListener('resize', measure); };
  }, []);
  const [verb, object, ending, domain] = servicePhrases[phraseIndex];
  return <section id="top" ref={runway} className={`minimal-runway ${reduced ? 'is-reduced' : ''}`}>
    <div className="minimal-viewport" data-domain={domain}>
      <header className="minimal-header"><a href="#top" className="minimal-brand" aria-label="AP Music and Audio home">ap<span>.</span><small>MUSIC<br />& AUDIO</small></a><a href="#book">Start a conversation ↗</a></header>
      <div className="minimal-composition">
        <div className="minimal-copy"><p className="minimal-byline">Oliver Payton & Alexander Say</p>
          <h1 className="glyph-title" key={phraseIndex} aria-label={`${verb} your ${object} ${ending}`}><GlyphWord tone="action" progress={reduced ? 1 : progress} start={.06} end={.42}>{verb}</GlyphWord> <GlyphWord tone="your" progress={reduced ? 1 : progress} start={.18} end={.55}>your</GlyphWord><br /><GlyphWord tone="object" progress={reduced ? 1 : progress} start={.34} end={.72}>{object}</GlyphWord><br /><GlyphWord tone="ending" progress={reduced ? 1 : progress} start={.5} end={.9}>{ending}</GlyphWord></h1>
          <div className="minimal-controls"><span>{domain === 'music' ? 'Music / the feeling' : 'Audio / the detail'}</span><button onClick={() => setPaused(!paused)} aria-pressed={!paused} disabled={reduced}>{reduced ? 'Motion reduced' : paused ? 'Motion off' : 'Motion on'}</button><button onClick={next} aria-label="Show another service phrase">Next ↗</button></div>
        </div>
        <div className="minimal-signal"><SignalField progress={reduced ? 1 : progress} animate={!reduced && !paused} reactive={false} arrival /><div className="minimal-signal-caption"><span>{progress < .55 && !reduced ? 'A little possibility.' : 'A little more intention.'}</span><span aria-hidden="true"># → ♩</span></div></div>
      </div>
      <div className="minimal-bottom"><p>From the first idea<br />to something you can hear.</p><nav aria-label="Explore services"><a href="#music-make"><i className="link-green" />Create & record <span>↗</span></a><a href="#music-refine"><i className="link-blue" />Learn & refine <span>↗</span></a><a href="#audio-present"><i className="link-purple" />Perform & be heard <span>↗</span></a></nav><a className="minimal-scroll" href="#services">Explore the studio ↓</a></div>
      <div className="minimal-progress" aria-hidden="true"><span style={{ transform: `scaleX(${reduced ? 1 : progress})` }} /></div>
    </div>
  </section>;
}
