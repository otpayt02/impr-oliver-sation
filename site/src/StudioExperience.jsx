import { useEffect, useRef, useState } from 'react';
import { SignalField } from './SignalField.jsx';
import { people, services, story } from './studio-catalog.js';
import { PracticeCheckout } from './PracticeCheckout.jsx';
import './studio.css';
import { ServiceLanding as StoryHero } from './ServiceLanding.jsx';

export function useReducedMotion() {
  const queryText = '(prefers-reduced-motion: reduce), (max-width: 760px) and (max-height: 759px)';
  const [reduced, setReduced] = useState(() => window.matchMedia(queryText).matches);
  useEffect(() => { const query = window.matchMedia(queryText); const change = () => setReduced(query.matches); query.addEventListener('change', change); return () => query.removeEventListener('change', change); }, []);
  return reduced;
}

function useAtmosphericDepth(reduced) {
  useEffect(() => {
    if (reduced) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      document.querySelectorAll('[data-parallax]').forEach(section => {
        const rect = section.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const shift = Math.max(-1, Math.min(1, (innerHeight / 2 - center) / Math.max(innerHeight, rect.height))) * 22;
        section.style.setProperty('--parallax-shift', `${shift.toFixed(2)}px`);
      });
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    queue();
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', queue); removeEventListener('resize', queue); };
  }, [reduced]);
}

function usePointerDepth(reduced) {
  useEffect(() => {
    if (reduced || !matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const cards = [...document.querySelectorAll('[data-tilt-card]')];
    const clean = card => {
      card.style.removeProperty('--tilt-x'); card.style.removeProperty('--tilt-y');
      card.style.removeProperty('--pointer-x'); card.style.removeProperty('--pointer-y');
    };
    const entries = cards.map(card => {
      const move = event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        card.style.setProperty('--tilt-x', `${((.5 - y) * 2).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${((x - .5) * 2).toFixed(2)}deg`);
        card.style.setProperty('--pointer-x', `${(x * 100).toFixed(1)}%`);
        card.style.setProperty('--pointer-y', `${(y * 100).toFixed(1)}%`);
      };
      const leave = () => clean(card);
      card.addEventListener('pointermove', move); card.addEventListener('pointerleave', leave);
      return [card, move, leave];
    });
    return () => entries.forEach(([card, move, leave]) => { card.removeEventListener('pointermove', move); card.removeEventListener('pointerleave', leave); clean(card); });
  }, [reduced]);
}

function useCinematicReveal() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) { document.querySelectorAll('.cinematic-reveal').forEach(target => target.classList.add('is-visible')); return; }
    const targets = document.querySelectorAll(
      '.studio-services, .studio-approach, .studio-first-listen, .studio-inquiry, .practice-section, .studio-footer'
    );
    if (!('IntersectionObserver' in window)) {
      targets.forEach(t => t.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    targets.forEach(t => {
      t.classList.add('cinematic-reveal');
      observer.observe(t);
    });
    return () => observer.disconnect();
  }, [reduced]);
}

export function PersonPicker({ person, onChange }) {
  return <div className="person-picker" aria-label="Your guide">{Object.entries(people).map(([key, value]) => <button key={key} type="button" aria-pressed={person === key} onClick={() => onChange(key)}><span className={`person-mark person-${key}`}>OP</span><span>{value.name}<small>Explore with Oliver</small></span><span className="person-arrow" aria-hidden="true">↗</span></button>)}</div>;
}

function LegacyStoryHero({ person, onPerson, reduced }) {
  const runway = useRef(null);
  const [progress, setProgress] = useState(0);
  const [motionOff, setMotionOff] = useState(false);
  const [manualStage, setManualStage] = useState(0);
  const staticMode = reduced || motionOff;
  const active = staticMode ? manualStage : Math.min(5, Math.floor(progress * 6));
  const scene = story[active];
  useEffect(() => {
    let frame = 0;
    let top = 0;
    let length = 1;
    const update = () => { frame = 0; setProgress(Math.max(0, Math.min(1, (window.scrollY - top) / length))); };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    const measure = () => { const el = runway.current; top = el.getBoundingClientRect().top + window.scrollY; length = Math.max(1, el.offsetHeight - window.innerHeight); queue(); };
    const observer = new ResizeObserver(measure); observer.observe(runway.current);
    measure(); window.addEventListener('scroll', queue, { passive: true }); window.addEventListener('resize', measure);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', queue); window.removeEventListener('resize', measure); };
  }, []);
  const jump = index => {
    setManualStage(index);
    if (!staticMode) { const el = runway.current; window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top + Math.max(0, el.offsetHeight - window.innerHeight) * (index === 0 ? 0 : (index + 0.25) / 6), behavior: 'smooth' }); }
  };
  return <section id="top" ref={runway} className={`studio-runway ${staticMode ? 'is-static' : ''}`} aria-label="From an idea to a shared sound">
    <div className="studio-viewport">
      <header className="studio-header"><a className="studio-brand" href="#top"><span>ap<span className="brand-dot">.</span></span><small>MUSIC<br />& AUDIO</small></a><nav aria-label="Main navigation"><a href="#services">The studio</a><a href="#work">Our approach</a><a className="header-book" href="#book">Start something <span>↗</span></a></nav></header>
      <div className="studio-person-row"><p>Independent minds.<br /><span>A shared love of sound.</span></p><PersonPicker person={person} onChange={onPerson} /></div>
      <div className="studio-stage">
        <div className="studio-hero-copy"><p className="studio-eyebrow">Oliver Payton & Alexander Say · Louisville + remote</p><h1 key={scene.id}>{scene.words.map((word, index) => <span className={scene.colors[index]} key={word}>{word}</span>)}</h1><p className="studio-hero-summary">Music for the feeling.<br />Audio for the way it reaches you.</p><a className="studio-button" href="#services">Find your kind of help <span>↗</span></a></div>
        <div className="studio-art"><div className="art-caption"><span>{String(active + 1).padStart(2, '0')} / THE SHAPE OF A SOUND</span><span aria-hidden="true">[ # → ♩ ]</span></div><SignalField progress={staticMode ? 1 : progress} animate={!staticMode} reactive={!staticMode} arrival />
          <div className="art-word" aria-hidden="true">{scene.name.toLowerCase()}<span>.</span></div><div className="studio-journey" key={scene.id}><p className="studio-eyebrow">{scene.name} / {scene.output}</p><h2>{scene.title}</h2><p>{scene.detail}</p></div>
          <nav className="studio-orbits" aria-label="Three ways into the studio"><a href="#music-make"><span>PLAY · PIANO · BASS · DRUMS · </span><b>01</b></a><a href="#music-refine"><span>LEARN · EAR · LESSONS · </span><b>02</b></a><a href="#audio-present"><span>MAKE · AUDIO · EVENTS · </span><b>03</b></a></nav>
        </div>
      </div>
      <div className="studio-legend" aria-label="Service color key"><div><strong>Music</strong>{services.filter(x => x.domain === 'Music').map(x => <a className={x.id} key={x.id} href={`#${x.id}`}><i />{x.layer}</a>)}</div><div><strong>Audio</strong>{services.filter(x => x.domain === 'Audio').map(x => <a className={x.id} key={x.id} href={`#${x.id}`}><i />{x.layer}</a>)}</div><button aria-pressed={motionOff} onClick={() => setMotionOff(!motionOff)}>{staticMode ? 'Motion off' : 'Motion on'} <span aria-hidden="true">{staticMode ? '○' : '◉'}</span></button></div>
      <div className="studio-story-nav"><span className="scroll-invitation">{staticMode ? 'CHOOSE A CHAPTER' : 'SCROLL TO UNFOLD'} <span aria-hidden="true">↓</span></span><nav aria-label="Story chapters">{story.map((item, index) => <button key={item.id} aria-current={active === index ? 'step' : undefined} onClick={() => jump(index)}><small>0{index + 1}</small>{item.name}</button>)}</nav><a href="#services" className="skip-story">Skip to services ↘</a></div>
      <div className="studio-progress" aria-hidden="true"><span style={{ transform: `scaleX(${staticMode ? (active + 1) / 6 : progress})` }} /></div>
    </div>
  </section>;
}

export function ServiceColumns({ person, onPerson, onSelect, domain: controlledDomain, onDomain }) {
  const [localDomain, setLocalDomain] = useState('Music');
  const domain = controlledDomain ?? localDomain;
  const chooseDomain = nextDomain => { if (onDomain) onDomain(nextDomain); else setLocalDomain(nextDomain); };
  return <section className="studio-services" id="services" data-domain={domain.toLowerCase()} data-person={person}><div className="section-heading"><div><p className="studio-eyebrow">Two sides of the same sound</p><h2>What are you<br /><em>here to make?</em></h2></div><div><p>Play it, understand it, share it. Or capture it, shape it, and make it heard. Bring the work forward.</p><PersonPicker person={person} onChange={onPerson} /><p className="person-context">{people[person].note}</p></div></div>
    <div className="service-tabs" role="group" aria-label="Choose a service focus">{['Music', 'Audio'].map(item => <button key={item} type="button" aria-pressed={domain === item} onClick={() => chooseDomain(item)}><span>{item}</span><small>{item === 'Music' ? 'Play and learn' : 'Capture and shape'}</small></button>)}</div>
    <div className="service-duet">{['Music', 'Audio'].map(item => <div className={`service-domain domain-${item.toLowerCase()} ${domain === item ? 'is-foreground' : 'is-background'}`} key={item}>
      <div className="domain-title"><h3>{item}<span>.</span></h3><p>{item === 'Music' ? 'The notes. The hands. The feeling.' : 'The signal. The space. The detail.'}</p></div>
      {services.filter(service => service.domain === item).map(service => <article key={service.id} id={service.id} data-tilt-card className={`studio-service ${service.id} ${service.lead === person ? 'is-in-focus' : ''}`}>
        <div className="service-label"><span><i />{service.layer}</span><span>{service.mode}</span></div>
        <h4>{service.title}</h4><p className="service-subtitle">{service.subtitle}</p><p>{service.detail}</p>
        <p className="service-collaborator">With Oliver<small>Scope and fit are confirmed before work begins.</small></p>
        <details><summary>Inside the approach <span aria-hidden="true">+</span></summary><div className="service-example"><span aria-hidden="true">{service.symbol}</span><div><strong>{service.example}</strong><p>{service.sample}</p><small>Illustrative process · not a client case study</small></div></div></details>
        <div className="service-bottom"><span>{service.result}</span><button onClick={() => onSelect(service.title)}>Explore with {people[person].short} ↗</button></div>
      </article>)}
    </div>)}</div>
  </section>;
}

export function Approach() {
  return <section id="work" className="studio-approach"><p className="studio-eyebrow">A closer look / the work behind the work</p><div className="approach-intro"><h2>Good sound comes<br />from <em>good decisions.</em></h2><p>Before a finished piece, there is listening, trying, and choosing. Here is the kind of thinking we bring to a session.</p></div><div className="approach-score" aria-label="Illustrative music and audio workflow"><div className="score-music"><p>MUSIC / A HARMONIC SKETCH</p><div aria-label="C major seven, A minor seven, D minor seven, G dominant seven">C<span>maj7</span><b>→</b>A<span>m7</span><b>→</b>D<span>m7</span><b>→</b>G<span>7</span></div><small>A simple starting point. Change the voicing; change the feeling.</small></div><div className="score-audio"><p>AUDIO / A SIGNAL PATH</p><ol><li>Source</li><li>Capture</li><li>Shape</li><li>Listen</li></ol><small>Check each handoff. Make every adjustment with a reason.</small></div></div><p className="approach-caption">Process examples created for this site. Finished recordings and project credits will follow as they are ready to share.</p><div className="coming-next"><span>On the workbench</span><p>Custom music tools, interactive ear-training exercises, and session templates.</p><span>In development</span></div></section>;
}

export function Inquiry({ person, selected }) {
  const form = useRef(null);
  const [goal, setGoal] = useState('');
  const [reply, setReply] = useState('');
  const [brief, setBrief] = useState('');
  const [copy, setCopy] = useState('');
  useEffect(() => { if (selected) { setGoal(`${selected}\n`); setBrief(''); setReply(''); } }, [selected]);
  const prepare = event => {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    const text = `AP Music & Audio\nPreferred collaborator: ${people[person].name}\nName: ${data.get('name')}\nContact: ${data.get('email')}\nGoal: ${goal.trim()}\nTimeline: ${data.get('timeline')}\nBudget: ${data.get('budget')}`;
    setBrief(text); setCopy(''); setReply('Yes—let’s explore it. Your brief is ready. Oliver can work through the approach, scope, and timing with you. A new idea is welcome, even when it needs a little discovery first.');
  };
  return <section className="studio-inquiry" id="book"><div><p className="studio-eyebrow">A song. A question. A possibility.</p><h2>Tell us what<br />you’re <em>hearing.</em></h2><p>Choose a starting point or bring something we haven’t thought of yet.</p><div className="inquiry-person"><span className={`person-mark person-${person}`}>OP</span><div>Start with {people[person].name}<small>A local brief starts the conversation.</small></div></div></div><form ref={form} onSubmit={prepare} onChange={() => { setBrief(''); setReply(''); setCopy(''); }}><div className="form-pair"><label>Your name<input name="name" required autoComplete="name" maxLength={120} /></label><label>Email<input name="email" type="email" required autoComplete="email" maxLength={254} /></label></div><label>What would you love to make possible?<textarea name="goal" required minLength={8} maxLength={3000} value={goal} onChange={event => setGoal(event.target.value)} placeholder="A piano part for my song. A mix I can't get right. A lesson around something I love…" /></label><div className="form-pair"><label>Timing<select name="timeline"><option>Just exploring</option><option>Within a month</option><option>I have a specific date</option></select></label><label>Budget range<select name="budget"><option>Help me scope it</option><option>Under $100</option><option>$100–$300</option><option>$300+</option></select></label></div><button className="studio-button" type="submit">Shape my request <span>↗</span></button><p className="inquiry-note">Preview mode: your brief stays in this browser. Nothing is sent.</p>{reply && <div className="concierge-reply" role="status"><small>AUTOMATED BRIEF HELPER · LOCAL REPLY</small><p>{reply}</p><details><summary>Review your prepared brief</summary><pre>{brief}</pre></details><button type="button" onClick={async () => { try { await navigator.clipboard.writeText(brief); setCopy('Brief copied. Nothing has been sent.'); } catch { setCopy('Clipboard unavailable. Select and copy your brief above.'); } }}>Copy prepared brief ↗</button><p>{copy}</p></div>}</form></section>;
}

export function StudioExperience() {
  const [person, setPerson] = useState('oliver');
  const [domain, setDomain] = useState('Music');
  const [selected, setSelected] = useState('');
  const reduced = useReducedMotion();
  useAtmosphericDepth(reduced);
  usePointerDepth(reduced);
  useCinematicReveal();
  const selectService = title => { setSelected(title); document.getElementById('book')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' }); };
  return <main className="ap-studio"><a className="studio-skip" href="#services">Skip to services</a><StoryHero person={person} onPerson={setPerson} reduced={reduced} /><ServiceColumns person={person} onPerson={setPerson} onSelect={selectService} domain={domain} onDomain={setDomain} /><Approach /><section data-parallax className="studio-first-listen" id="offer"><p className="studio-eyebrow">One clear place to begin</p><h2>First Listen<span>.</span></h2><div><p>One reference. A piano response.<br />A key and chord map. A focused revision.</p><a className="studio-button" href="#checkout">Try the $95 practice order ↗</a><button className="text-button" onClick={() => selectService('First Listen')}>Discuss First Listen</button><small>Draft offer · confirm scope and timing before a real booking.</small></div></section><Inquiry person={person} selected={selected} /><PracticeCheckout /><footer className="studio-footer"><a href="#top" className="footer-monogram">ap.</a><p>Oliver Payton & Alexander Say<br /><span>Music / audio / the space between.</span></p><a href="#checkout">Practice checkout ↗</a><a href="#top">Back to the beginning ↑</a></footer></main>;
}
