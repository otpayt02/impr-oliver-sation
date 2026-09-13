import { useEffect, useRef, useState } from 'react';
import { SignalField } from './SignalField.jsx';
import { choosePhrase, servicePhrases } from './service-phrases.js';
import './service-landing.css';

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
          <h1 key={phraseIndex}><span className="phrase-action">{verb}</span> <span className="phrase-your">your</span><br /><span className="phrase-object">{object}</span><br /><span className="phrase-ending">{ending}</span></h1>
          <div className="minimal-controls"><span>{domain === 'music' ? 'Music / the feeling' : 'Audio / the detail'}</span><button onClick={() => setPaused(!paused)} aria-pressed={paused} disabled={reduced}>{reduced ? 'Motion reduced' : paused ? 'Resume motion' : 'Pause motion'}</button><button onClick={next} aria-label="Show another service phrase">Next ↗</button></div>
        </div>
        <div className="minimal-signal"><SignalField progress={reduced ? 1 : progress} animate={!reduced && !paused} reactive={false} arrival /><div className="minimal-signal-caption"><span>{progress < .55 && !reduced ? 'A little possibility.' : 'A little more intention.'}</span><span aria-hidden="true"># → ♩</span></div></div>
      </div>
      <div className="minimal-bottom"><p>From the first idea<br />to something you can hear.</p><nav aria-label="Explore services"><a href="#music-make"><i className="link-green" />Create & record <span>↗</span></a><a href="#music-refine"><i className="link-blue" />Learn & refine <span>↗</span></a><a href="#audio-present"><i className="link-purple" />Perform & be heard <span>↗</span></a></nav><a className="minimal-scroll" href="#services">Explore the studio ↓</a></div>
      <div className="minimal-progress" aria-hidden="true"><span style={{ transform: `scaleX(${reduced ? 1 : progress})` }} /></div>
    </div>
  </section>;
}
