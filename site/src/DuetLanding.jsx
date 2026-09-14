import { useEffect, useRef, useState } from 'react';
import { ServiceColumns, Approach, Inquiry } from './StudioExperience.jsx';
import { PracticeCheckout } from './PracticeCheckout.jsx';
import { choosePhrase, servicePhrases } from './service-phrases.js';
import { HeroGlyphField } from './HeroGlyphField.jsx';
import './duet.css';

// These are illustrations of the work, not recordings or client deliverables.
function SoundDrawing({ audio = false }) {
  return <svg className="duet-drawing" viewBox="0 0 520 190" fill="none" aria-hidden="true">
    {audio ? <>
      {[38, 76, 114, 152].map(y => <path key={y} d={`M20 ${y}H500`} className="drawing-guide" />)}
      <path d="M20 95H83C100 95 94 35 112 35S127 155 145 155S157 55 176 55S191 135 211 135S225 75 246 75S269 111 293 111S313 87 340 87S362 95 392 95H500" className="drawing-line" />
      <circle cx="83" cy="95" r="5" fill="currentColor" /><circle cx="392" cy="95" r="5" fill="currentColor" />
      <path d="M83 178V167M246 178V167M392 178V167" stroke="currentColor" />
    </> : <>
      {[49, 70, 91, 112, 133].map(y => <path key={y} d={`M20 ${y}H500`} className="drawing-guide" />)}
      <path d="M50 136C110 155 153 22 218 35S312 156 377 122S451 65 495 50" className="drawing-line" />
      {[[94,112],[175,70],[267,91],[368,112],[452,49]].map(([x,y]) => <g key={x}><ellipse cx={x} cy={y} rx="10" ry="7" transform={`rotate(-22 ${x} ${y})`} fill="currentColor" /><path d={`M${x+9} ${y}v-47`} stroke="currentColor" strokeWidth="2" /></g>)}
    </>}
  </svg>;
}

// This release defaults to motion at every viewport size. Only an explicit OS
// reduced-motion preference freezes the cycling header and scroll behavior.
function useDuetReducedMotion() {
  const queryText = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() => window.matchMedia(queryText).matches);
  useEffect(() => {
    const query = window.matchMedia(queryText);
    const change = () => setReduced(query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);
  return reduced;
}

export function DuetLanding() {
  const [person, setPerson] = useState('oliver');
  const [selected, setSelected] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const phraseHistory = useRef([0]);
  const reduced = useDuetReducedMotion();
  const nextPhrase = () => {
    const index = choosePhrase(phraseHistory.current);
    phraseHistory.current = [...phraseHistory.current.slice(-8), index];
    setPhraseIndex(index);
  };
  useEffect(() => {
    if (reduced || !motionEnabled) return undefined;
    const timer = window.setInterval(() => {
      if (!document.hidden) nextPhrase();
    }, 5800);
    return () => window.clearInterval(timer);
  }, [motionEnabled, reduced]);
  const selectService = title => {
    setSelected(title);
    document.getElementById('book')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' });
  };
  return <main className="ap-studio ap-duet">
    <a className="studio-skip" href="#services">Skip to services</a>
    <header className="duet-header" id="top">
      <a className="duet-brand" href="#top" aria-label="AP Music and Audio home">ap<span>.</span><small>MUSIC<br />& AUDIO</small></a>
      <nav aria-label="Main navigation"><a href="#music-make">Music</a><a href="#audio-make">Audio</a><a href="#offer">First Listen</a></nav>
      <a className="duet-contact" href="#book">Start a conversation <span aria-hidden="true">↗</span></a>
    </header>
    <section className="duet-intro" aria-labelledby="duet-title">
      <p className="duet-byline">Oliver Payton · Music & Audio</p>
      <h1 id="duet-title" className={`duet-cycle-title ${reduced ? 'is-reduced' : ''}`} key={phraseIndex} aria-label={servicePhrases[phraseIndex].slice(0, 3).join(' ')}>
        <span className="duet-cycle-action">{servicePhrases[phraseIndex][0]}</span>{' '}
        <span className="duet-cycle-join">your</span>{' '}<br className="duet-mobile-break" />
        <span className="duet-cycle-subject">{servicePhrases[phraseIndex][1]}</span>{' '}
        <em className="duet-cycle-ending">{servicePhrases[phraseIndex][2]}</em>
      </h1>
      <HeroGlyphField phraseIndex={phraseIndex} animate={motionEnabled && !reduced} reduced={reduced} />
      <p>From the first idea to something you can hear.</p>
      <div className="duet-motion-controls" aria-label="Header phrase controls">
        <button type="button" aria-pressed={motionEnabled && !reduced} disabled={reduced} onClick={() => setMotionEnabled(enabled => !enabled)}>
          {reduced ? 'Motion reduced' : motionEnabled ? 'Motion on' : 'Motion off'}
        </button>
        <button type="button" onClick={nextPhrase}>Next phrase ↗</button>
      </div>
    </section>
    <section className="duet-offers" aria-label="Music and Audio services">
      <article className="duet-offer duet-music" aria-labelledby="music-offer-title">
        <div className="duet-offer-top"><span>THE NOTES. THE HANDS. THE FEELING.</span><span aria-hidden="true">♮</span></div>
        <h2 id="music-offer-title">Music<span>.</span></h2>
        <p className="duet-offer-lede">Play it. Understand it.<br />Make the performance yours.</p>
        <SoundDrawing />
        <div className="duet-offer-bottom"><p>Piano parts & arrangements<br />Lessons & transcription<br />Performance & accompaniment</p><a href="#music-make">Explore Music <span aria-hidden="true">↗</span></a></div>
      </article>
      <article className="duet-offer duet-audio" aria-labelledby="audio-offer-title">
        <div className="duet-offer-top"><span>THE SIGNAL. THE SPACE. THE DETAIL.</span><span aria-hidden="true">↔</span></div>
        <h2 id="audio-offer-title">Audio<span>.</span></h2>
        <p className="duet-offer-lede">Capture it. Shape it.<br />Make it heard.</p>
        <SoundDrawing audio />
        <div className="duet-offer-bottom"><p>Recording & production<br />Mix feedback & signal flow<br />Live sound & room setup</p><a href="#audio-make">Explore Audio <span aria-hidden="true">↗</span></a></div>
      </article>
    </section>
    <div className="duet-bridge"><p>One practice. Music, audio, and the space between.</p><a href="#offer">One clear place to begin: First Listen <span aria-hidden="true">↗</span></a></div>
    <ServiceColumns person={person} onPerson={setPerson} onSelect={selectService} />
    <Approach />
    <section className="studio-first-listen" id="offer"><p className="studio-eyebrow">One clear place to begin</p><h2>First Listen<span>.</span></h2><div><p>One reference. A piano response.<br />A key and chord map. A focused revision.</p><a className="studio-button" href="#checkout">Try the $95 practice order ↗</a><button className="text-button" onClick={() => selectService('First Listen')}>Discuss First Listen</button><small>Draft offer · confirm scope and timing before a real booking.</small></div></section>
    <Inquiry person={person} selected={selected} />
    <PracticeCheckout />
    <footer className="studio-footer"><a href="#top" className="footer-monogram" aria-label="AP home">ap.</a><p>Oliver Payton<br /><span>Music / audio / the space between.</span></p><a href="#checkout">Practice checkout ↗</a><a href="#top">Back to the beginning ↑</a></footer>
  </main>;
}
