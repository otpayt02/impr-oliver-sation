import { useEffect, useRef, useState } from 'react';
import { SignalField } from './SignalField.jsx';
import { bookingDestination, donationDestination } from './destination-config.js';
import { StudioExperience } from './StudioExperience.jsx';

const chapters = [
  { id: 'input', number: '01', verb: 'input', eyebrow: 'A sound, a moment, a rough idea.', title: 'Give us the thing in your head.', copy: 'Drop a reference, describe a feeling, or name the moment. We listen for key, tempo, texture, structure, and intent.' },
  { id: 'hear', number: '02', verb: 'hear', eyebrow: 'Ten seconds can be enough.', title: 'The ear finds the system.', copy: 'Perfect pitch and twenty years at the piano turn a reference into harmony, rhythm, voicing, and a playable map.' },
  { id: 'play', number: '03', verb: 'play', eyebrow: 'No genre box.', title: 'Then the map becomes music.', copy: 'Rap, hip-hop, emo, pop, gospel, classical, and the strange spaces between them—rebuilt by ear and shaped for your use.' },
  { id: 'teach', number: '04', verb: 'teach', eyebrow: 'Make the invisible repeatable.', title: 'Learn the way the song actually moves.', copy: 'Piano, drums, guitar, bass, improvisation, ear training, and favorite-song lessons—built around hearing, not memorizing disconnected rules.' },
  { id: 'make', number: '05', verb: 'make', eyebrow: 'From performance to signal.', title: 'Record it. Transcribe it. Engineer it.', copy: 'Custom piano tracks, sampling, production, sheet music, chord charts, MIDI, live sound, event audio, and small music software tools.' },
];

const journeyStages = [
  { id: 'input', number: '01', label: 'Send the starting point', title: 'Give us a song, voice memo, or rough idea.', value: 'You get a focused musical read: key, tempo, feel, and the clearest next move.' },
  { id: 'hear', number: '02', label: 'Hear what is inside it', title: 'Find the harmony, rhythm, and structure.', value: 'We turn the sound you are hearing into choices you can react to—not vague music talk.' },
  { id: 'play', number: '03', label: 'Make it playable', title: 'Get a version your hands or band can use.', value: 'Choose a chord map, transcription, notation, MIDI, or a custom piano response.' },
  { id: 'teach', number: '04', label: 'Make it repeatable', title: 'Practice the part that matters.', value: 'Use a goal-first lesson or plan built around the song, instrument, and result you want.' },
  { id: 'make', number: '05', label: 'Make the moment land', title: 'Record it, perform it, or run the room.', value: 'Bring in piano, production, recording support, or event sound sized to the people listening.' },
  { id: 'book', number: '06', label: 'Choose the people and scope', title: 'Start with the smallest useful session.', value: 'Pick First Listen, a playable map, or a one-to-one session, then tell us what needs to happen.' },
];

function PianoCue() {
  const [activeKey, setActiveKey] = useState(null);
  const keys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  return (
    <div className="piano-cue" aria-label="Seven-key visual piano cue">
      <div className="key-row">
        {keys.map((key) => (
          <button
            className={activeKey === key ? 'piano-key is-active' : 'piano-key'}
            key={key}
            type="button"
            aria-label={`Highlight ${key}`}
            onPointerDown={() => setActiveKey(key)}
            onPointerUp={() => setActiveKey(null)}
            onPointerLeave={() => setActiveKey(null)}
          />
        ))}
      </div>
      <div className="key-labels">{keys.map((key) => <span key={key}>{key}</span>)}</div>
    </div>
  );
}

function MotionControl({ motion, setMotion, gridReact, setGridReact }) {
  return (
    <div className="motion-controls" aria-label="Visual controls">
      <label><span>Motion</span><input type="checkbox" checked={motion} onChange={(event) => setMotion(event.target.checked)} /></label>
      <div className="control-readout"><span>Generated noise</span><strong>OFF</strong></div>
      <label><span>Grid react</span><input type="checkbox" checked={gridReact} onChange={(event) => setGridReact(event.target.checked)} /></label>
    </div>
  );
}

function StoryNav({ active, onStagePick }) {
  return (
    <nav className="story-nav" aria-label="AP Music process">
      {journeyStages.map((stage, index) => (
        <button className={index === active ? 'is-active' : ''} key={stage.id} type="button" onClick={() => onStagePick(index)}><span>{stage.number} / {stage.id}</span><i aria-hidden="true" /></button>
      ))}
    </nav>
  );
}

function JourneyDeck({ stage, director, setDirector }) {
  return (
    <aside className="journey-deck" aria-live="polite">
      <p className="journey-index">{stage.number} / 06 · {stage.label}</p>
      <h2>{stage.title}</h2>
      <p>{stage.value}</p>
      {stage.id === 'book' && (
        <div className="director-tabs" role="tablist" aria-label="Choose a studio focus">
          <button className={director === 'oliver' ? 'is-active' : ''} type="button" role="tab" aria-selected={director === 'oliver'} onClick={() => setDirector('oliver')}>
            <strong>Oliver</strong><span>Piano + musical direction</span>
          </button>
          <button className={director === 'alex' ? 'is-active' : ''} type="button" role="tab" aria-selected={director === 'alex'} onClick={() => setDirector('alex')}>
            <strong>Alex</strong><span>Audio + production direction</span>
          </button>
        </div>
      )}
      {stage.id === 'book' && <a className="journey-cta" href="#offer">Choose a service →</a>}
    </aside>
  );
}

const heroModes = [
  {
    id: 'idea',
    tab: 'I have an idea',
    label: 'START HERE / FIRST LISTEN',
    title: 'Turn one sound into a clear next step.',
    detail: 'A custom piano response, key + chord map, and one focused revision from one song, voice memo, or feeling.',
    meta: '$95 draft starting point',
    target: '#offer',
    cta: 'See First Listen',
  },
  {
    id: 'playable',
    tab: 'I need it playable',
    label: 'TRANSCRIPTION / LESSONS',
    title: 'Get the version your hands can use.',
    detail: 'Transcription, chord charts, MIDI, or goal-first lessons that make a song repeatable for you, your band, or your students.',
    meta: 'Blueprints + practice',
    target: '#services',
    cta: 'See playable work',
  },
  {
    id: 'room',
    tab: 'I need the room handled',
    label: 'PERFORMANCE / AUDIO',
    title: 'Make the moment land in the room.',
    detail: 'Live piano, recording, production, and event sound shaped to the people listening—not a generic package.',
    meta: 'Louisville + remote',
    target: '#services',
    cta: 'See room + studio work',
  },
];

// These are intentionally whole scenes instead of three independent word pools.
// Every shuffle is a service promise AP Music & Audio can actually fulfill.
const landingScenes = [
  { verb: 'Explore', subject: 'sound', predicate: 'through music.' },
  { verb: 'Share', subject: 'voice', predicate: 'in the room.' },
  { verb: 'Bring', subject: 'idea', predicate: 'into focus.' },
  { verb: 'Understand', subject: 'song', predicate: 'at the piano.' },
  { verb: 'Shape', subject: 'plan', predicate: 'into a playable map.' },
  { verb: 'Hear', subject: 'setup', predicate: 'in the mix.' },
  { verb: 'Build', subject: 'confidence', predicate: 'with a practice plan.' },
  { verb: 'Perform', subject: 'moment', predicate: 'for the people listening.' },
  { verb: 'Record', subject: 'story', predicate: 'with room to breathe.' },
  { verb: 'Make', subject: 'room', predicate: 'sound like it matters.' },
  { verb: 'Find', subject: 'next step', predicate: 'through a First Listen.' },
  { verb: 'Turn', subject: 'reference', predicate: 'into something playable.' },
];

function nextPhraseIndex(length, current) {
  if (length < 2) return 0;
  const candidate = Math.floor(Math.random() * (length - 1));
  return candidate >= current ? candidate + 1 : candidate;
}

function LandingPhrase({ motion }) {
  const [sceneIndex, setSceneIndex] = useState(0);

  useEffect(() => {
    if (!motion) return undefined;
    const interval = window.setInterval(() => {
      setSceneIndex((current) => nextPhraseIndex(landingScenes.length, current));
    }, 2200);
    return () => window.clearInterval(interval);
  }, [motion]);

  const scene = landingScenes[sceneIndex];
  const copy = `${scene.verb} your ${scene.subject} ${scene.predicate}`;
  return (
    <h1 className="landing-phrase" aria-label={copy}>
      <span className="landing-phrase-line" aria-hidden="true">
        <span className="phrase-word phrase-verb" key={`verb-${sceneIndex}`}>{scene.verb}</span>{' '}
        <span className="phrase-static">your</span>
      </span>
      <span className="landing-phrase-line" aria-hidden="true">
        <span className="phrase-word phrase-object" key={`subject-${sceneIndex}`}>{scene.subject}</span>{' '}
        <span className="phrase-word phrase-predicate" key={`predicate-${sceneIndex}`}>{scene.predicate}</span>
      </span>
    </h1>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [motion, setMotion] = useState(!reduceMotion);
  const [gridReact, setGridReact] = useState(true);
  const [heroMode, setHeroMode] = useState('idea');
  const [director, setDirector] = useState('oliver');
  const [arrival, setArrival] = useState(reduceMotion);
  const activeMode = heroModes.find((mode) => mode.id === heroMode) || heroModes[0];
  const activeStage = Math.min(journeyStages.length - 1, Math.floor(progress * journeyStages.length));

  const jumpToStage = (index) => {
    const element = heroRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const runway = Math.max(1, rect.height - window.innerHeight);
    window.scrollTo({ top: window.scrollY + rect.top + runway * (index / (journeyStages.length - 1)), behavior: 'smooth' });
  };

  useEffect(() => {
    let frame;
    const updateProgress = () => {
      const element = heroRef.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const runway = Math.max(1, rect.height - window.innerHeight);
      const next = Math.min(1, Math.max(0, -rect.top / runway));
      setProgress((current) => Math.abs(current - next) > 0.001 ? next : current);
      frame = window.requestAnimationFrame(updateProgress);
    };
    updateProgress();
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!motion) {
      setArrival(true);
      return undefined;
    }
    setArrival(false);
    const frame = window.requestAnimationFrame(() => setArrival(true));
    return () => window.cancelAnimationFrame(frame);
  }, [motion]);

  return (
    <section className="hero-runway" ref={heroRef} aria-label="Binary becomes music">
      <div className="hero-sticky" style={{ '--scroll-progress': progress }}>
        <header className="site-header">
          <a className="wordmark" href="#top">AP MUSIC &amp; AUDIO</a>
          <div className="header-actions"><span>Louisville + remote</span><a className="button quiet" href="#book">Book the work</a></div>
        </header>
        <div className="hero-copy" id="top">
          <p className="command"><span aria-hidden="true">&gt;</span> AP / music &amp; audio<span className="cursor" aria-hidden="true" /></p>
          <p className="hero-kicker">For artists, students, and event hosts.</p>
          <LandingPhrase motion={motion} />
          <p className="hero-summary">AP Music &amp; Audio helps artists, students, and event hosts turn a song, setup, or rough idea into piano performance, a playable map, recording support, or room-ready sound.</p>
          <div className="hero-path-picker" aria-label="Choose the result you need">
            <p className="hero-picker-label">What are you trying to make possible?</p>
            <div className="hero-mode-tabs" role="tablist" aria-label="Starting points">
              {heroModes.map((mode) => (
                <button
                  className={heroMode === mode.id ? 'hero-mode-tab is-active' : 'hero-mode-tab'}
                  key={mode.id}
                  type="button"
                  role="tab"
                  aria-selected={heroMode === mode.id}
                  onClick={() => setHeroMode(mode.id)}
                >
                  {mode.tab}
                </button>
              ))}
            </div>
            <div className="hero-mode-panel" key={activeMode.id} role="tabpanel">
              <div>
                <p className="hero-mode-label">{activeMode.label}</p>
                <h2>{activeMode.title}</h2>
                <p>{activeMode.detail}</p>
              </div>
              <div className="hero-mode-action">
                <span>{activeMode.meta}</span>
                <a className="button" href={activeMode.target}>{activeMode.cta}</a>
              </div>
            </div>
          </div>
        </div>
        <MotionControl motion={motion} setMotion={setMotion} gridReact={gridReact} setGridReact={setGridReact} />
        <SignalField progress={motion ? progress : 1} animate={motion} reactive={gridReact} arrival={arrival} />
        <div className="signal-labels" aria-hidden="true"><span>raw notation</span><span>playable signal</span><span>room-ready music</span></div>
        <PianoCue />
        <JourneyDeck stage={journeyStages[activeStage]} director={director} setDirector={setDirector} />
        <StoryNav active={activeStage} onStagePick={jumpToStage} />
        <p className="rotation-note">Don Toliver is in the rotation. <span aria-hidden="true">||||</span></p>
        <div className="scroll-meter" aria-hidden="true"><span style={{ width: `${progress * 100}%` }} /></div>
      </div>
    </section>
  );
}

function InputChapter() {
  const fileRef = useRef(null);
  const [fileName, setFileName] = useState('Drop audio here or choose a file');
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const selectAudio = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <section className="chapter chapter-input" id="input">
      <div className="chapter-index"><strong>01</strong><h2>input</h2><p>A sound, a moment,<br />a rough idea.</p></div>
      <div className="chapter-body input-grid">
        <div>
          <p className="field-label">Your sound or idea</p>
          <button className="audio-drop" type="button" onClick={() => fileRef.current?.click()}><span className="waveform" aria-hidden="true">▂▅▇▄▆▃▁▃▆▅▂</span><span>{fileName}</span></button>
          <input ref={fileRef} className="visually-hidden" type="file" accept="audio/*" onChange={selectAudio} />
          {previewUrl && (
            <div className="proof-preview" aria-live="polite">
              <p>Local proof check <span>nothing uploads from this preview</span></p>
              <audio controls preload="metadata" src={previewUrl}>Your browser cannot preview this audio file.</audio>
              <p className="proof-rights">Confirm original or owner-permitted rights before public release.</p>
            </div>
          )}
        </div>
        <label className="idea-field"><span>Or type what you just heard</span><textarea placeholder="melody in my head, drums I liked, lyrics, chord progression…" /></label>
        <div className="listen-list"><p>We listen for:</p><ul><li>key, mode, tempo, feel</li><li>melody, harmony, rhythm</li><li>structure, dynamics, intention</li></ul></div>
      </div>
    </section>
  );
}

function Chapter({ chapter }) {
  return (
    <section className="chapter" id={chapter.id}>
      <div className="chapter-index"><strong>{chapter.number}</strong><h2>{chapter.verb}</h2><p>{chapter.eyebrow}</p></div>
      <div className="chapter-body statement"><p className="chapter-kicker">{chapter.eyebrow}</p><h3>{chapter.title}</h3><p>{chapter.copy}</p></div>
    </section>
  );
}

const servicePillars = [
  {
    title: 'Hear the idea',
    audience: 'For a song, voice memo, or feeling you cannot quite name.',
    detail: 'First Listen turns one starting point into a custom piano response and a clear musical map you can react to.',
    outputs: ['custom piano response', 'key + chord map', 'one focused revision'],
    href: '#offer',
    cta: 'Start with First Listen',
  },
  {
    title: 'Make it playable',
    audience: 'For students, musicians, bands, and creators who need the blueprint.',
    detail: 'We translate what you hear into a lesson, chart, notation, or MIDI part that your hands and collaborators can use.',
    outputs: ['transcription or chord chart', 'MIDI when useful', 'goal-first practice plan'],
    href: '#offer',
    cta: 'See playable work',
  },
  {
    title: 'Make it heard',
    audience: 'For venues, private events, artists, and rooms that need the moment handled.',
    detail: 'We shape live piano, recording, production, and event sound around the people listening—not a generic package.',
    outputs: ['piano or session performance', 'recording + mix support', 'event sound + signal flow'],
    href: '#offer',
    cta: 'Plan the room or studio',
  },
];

function ServiceMatrix() {
  return (
    <section className="service-matrix" id="services" aria-labelledby="services-title">
      <div className="service-intro">
        <p className="chapter-kicker">The useful map</p>
        <h2 id="services-title">Choose the result you need.</h2>
        <div>
          <p>Start with the change you want to make. We scope the smallest useful session around that result.</p>
          <a className="scope-link" href="#offer">First Listen is the clearest paid starting point →</a>
        </div>
      </div>
      <div className="pillar-grid">
        {servicePillars.map((pillar) => (
          <article className="pillar-card" key={pillar.title}>
            <p className="pillar-audience">{pillar.audience}</p>
            <h3>{pillar.title}</h3>
            <p>{pillar.detail}</p>
            <p className="pillar-output-label">You leave with</p>
            <ul>{pillar.outputs.map((output) => <li key={output}>{output}</li>)}</ul>
            <a className="scope-link pillar-link" href={pillar.href}>{pillar.cta} <span aria-hidden="true">→</span></a>
          </article>
        ))}
      </div>
    </section>
  );
}

const contentLanes = [
  {
    number: '01',
    cadence: 'morning / draft format',
    title: 'Morning Prelude',
    detail: 'A short original improvisation for focus, coding, quiet rooms, or the first feeling of the day.',
    proof: 'performance + atmosphere',
  },
  {
    number: '02',
    cadence: 'weekly / draft format',
    title: 'Ten-Second Challenge',
    detail: 'Hear a melody once, name the system, and rebuild it at the piano without pretending the reference is public-ready.',
    proof: 'ear-to-hand + transcription',
  },
  {
    number: '03',
    cadence: 'weekend / draft format',
    title: 'Studio Walkthrough',
    detail: 'Show one honest decision about improvisation, chord maps, sampling, mixing, or signal flow so the listener can learn it too.',
    proof: 'teaching + engineering',
  },
];

function ContentSlate() {
  return (
    <section className="content-slate" id="channel" aria-labelledby="channel-title">
      <div className="content-intro">
        <p className="chapter-kicker">YouTube / draft slate</p>
        <h2 id="channel-title">Make the audience part of the ear.</h2>
        <div>
          <p>Three repeatable lanes turn real musical decisions into proof. This local prototype does not create a channel, schedule a live, or publish a clip.</p>
          <a className="scope-link" href="#offer">Every lane can lead to a First Listen brief →</a>
        </div>
      </div>
      <ol className="content-lane-list">
        {contentLanes.map((lane) => (
          <li className="content-lane" key={lane.number}>
            <span className="content-lane-number">{lane.number}</span>
            <div><span className="content-lane-cadence">{lane.cadence}</span><h3>{lane.title}</h3><p>{lane.detail}</p></div>
            <span className="content-lane-proof">{lane.proof}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

const leadRoutes = [
  {
    number: '01',
    status: 'research / no outreach',
    title: 'A room can be the first client.',
    detail: 'Varanese, The Brown Hotel, and The Seelbach are documented fit hypotheses—not openings or endorsements.',
    next: 'Prepare a venue brief',
    href: '#book',
  },
  {
    number: '02',
    status: 'copy-only / approval gate',
    title: 'A goal can arrive from anywhere.',
    detail: 'First Listen, transcription, lessons, and engineering start as one clear local brief before any provider is connected.',
    next: 'Choose an offer',
    href: '#offer',
  },
  {
    number: '03',
    status: 'YouTube / draft slate',
    title: 'A challenge can become trust.',
    detail: 'Morning Prelude, Ten-Second Challenge, and Studio Walkthrough make the work legible before a channel or schedule exists.',
    next: 'See the lanes',
    href: '#channel',
  },
];

function LeadMap() {
  return (
    <section className="lead-map" id="lead-map" aria-labelledby="lead-map-title">
      <div className="lead-map-intro">
        <p className="chapter-kicker">Lead map / draft routes</p>
        <h2 id="lead-map-title">Three places the next yes can come from.</h2>
        <p>One path starts in a Louisville room, one starts with an online brief, and one starts with proof. This map keeps the routes visible without pretending interest, availability, or a live channel.</p>
      </div>
      <div className="lead-route-grid">
        {leadRoutes.map((route) => (
          <a className="lead-route" href={route.href} key={route.number}>
            <div className="lead-route-head"><span>{route.number}</span><span>{route.status}</span></div>
            <h3>{route.title}</h3>
            <p>{route.detail}</p>
            <span className="lead-route-next">{route.next} <span aria-hidden="true">→</span></span>
          </a>
        ))}
      </div>
      <p className="lead-map-note">Draft only: this map creates no account, message, booking, or payment.</p>
    </section>
  );
}

function PortfolioProof() {
  const proofItems = [
    { kind: 'audio', title: 'Improvisation / mastered trim', detail: 'Owner-provided audio export · rights review pending', src: '/proof/improv-mastered-trimmed.mp3' },
    { kind: 'image', title: 'Notation output / page 01', detail: 'Score render · rights review pending', src: '/proof/notation-output-01.png' },
    { kind: 'image', title: 'Notation output / page 02', detail: 'Score render · rights review pending', src: '/proof/notation-output-02.png' },
    { kind: 'video', title: 'Piano performance / local cut', detail: 'Owner-provided video · rights review pending', src: '/proof/piano-performance.webm' },
  ];

  return (
    <section className="portfolio-proof" id="portfolio" aria-labelledby="portfolio-title">
      <div className="portfolio-intro">
        <p className="chapter-kicker">Local proof portfolio</p>
        <h2 id="portfolio-title">Show the work before you promise the work.</h2>
        <p>These owner-provided files are staged for local review only. Confirm original or owner-permitted rights before anything becomes public.</p>
      </div>
      <div className="proof-grid">
        {proofItems.map((item) => (
          <article className={`proof-card proof-${item.kind}`} key={item.src}>
            <div className="proof-card-head"><span>{item.kind}</span><span>rights review pending</span></div>
            {item.kind === 'audio' && <audio controls preload="metadata" src={item.src}>Your browser cannot play this audio file.</audio>}
            {item.kind === 'video' && <video controls preload="metadata" src={item.src}>Your browser cannot play this video file.</video>}
            {item.kind === 'image' && <img src={item.src} alt={item.title} loading="lazy" />}
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const offers = [
  {
    name: 'First Listen',
    label: 'For a song or rough idea',
    price: '$95',
    detail: 'A short custom piano response built from one song, voice memo, or feeling you cannot quite name.',
    outputs: ['piano performance', 'key + chord map', 'one focused revision'],
  },
  {
    name: 'Transcription Map',
    label: 'For something you need to play',
    price: 'from $60',
    detail: 'Turn a recording into the format your hands, band, DAW, or student can actually use.',
    outputs: ['chord chart or notation', 'MIDI when useful', 'delivery scope confirmed first'],
  },
  {
    name: 'One-to-One Session',
    label: 'For a room, record, or lesson',
    price: 'custom',
    detail: 'Lessons, live piano, event audio, recording support, or an improvised performance shaped around the room.',
    outputs: ['right-sized scope', 'Louisville + remote', 'goal-first brief'],
  },
];

function OfferLedger({ selectedOffer, onSelect }) {
  return (
    <section className="offer-ledger" id="offer" aria-labelledby="offer-title">
      <div className="offer-intro">
        <p className="chapter-kicker">The first paid move</p>
        <h2 id="offer-title">Start with what you heard.</h2>
        <p>One clear door in. The rest of the studio stays available once we know what the music needs to become.</p>
        <p className="draft-note">Draft launch pricing — confirm before public release.</p>
      </div>
      <div className="offer-list" aria-label="Draft service offers">
        {offers.map((offer, index) => (
          <article className={selectedOffer === offer.name ? 'offer-row is-selected' : 'offer-row'} key={offer.name}>
            <div className="offer-marker">0{index + 1}</div>
            <div className="offer-name"><p>{offer.label}</p><h3>{offer.name}</h3></div>
            <p className="offer-detail">{offer.detail}</p>
            <ul>{offer.outputs.map((output) => <li key={output}>{output}</li>)}</ul>
            <div className="offer-action"><strong>{offer.price}</strong><span>draft launch price</span>{offer.name === 'First Listen' && <a className="scope-link" href="/first-listen.html" target="_blank" rel="noreferrer">Review draft scope</a>}<a className="button" href="#book" onClick={() => onSelect(offer.name)}>Choose {offer.name}</a></div>
          </article>
        ))}
      </div>
      <p className="offer-receipt" role="status">{selectedOffer ? `${selectedOffer} selected — the booking brief is ready below.` : 'Select one starting point. Nothing is sent from this prototype.'}</p>
    </section>
  );
}

function LaunchPaths() {
  const paths = [
    {
      title: 'Book the work',
      detail: 'Send a focused brief for a performance, lesson, transcription, recording, or sound session.',
      destination: bookingDestination,
      action: 'Open booking destination',
    },
    {
      title: 'Support a new piece',
      detail: 'Keep the improvisation, experiments, and small music tools moving with a voluntary contribution.',
      destination: donationDestination,
      action: 'Open support destination',
    },
  ];

  return (
    <section className="launch-paths" id="paths" aria-labelledby="paths-title">
      <div className="launch-path-intro">
        <p className="chapter-kicker">The handoff</p>
        <h2 id="paths-title">Choose the next useful door.</h2>
        <p>These routes are intentionally disconnected in the local build. Add an owner-approved destination only when the offer, copy, and rights are ready to go public.</p>
      </div>
      <div className="path-grid">
        {paths.map((path) => (
          <article className="path-card" key={path.title}>
            <div className="path-card-head"><span>AP / {path.title === 'Book the work' ? '01' : '02'}</span><span>{path.destination ? 'destination ready' : 'approval gate'}</span></div>
            <h3>{path.title}</h3>
            <p>{path.detail}</p>
            {path.destination ? (
              <a className="button" href={path.destination} target="_blank" rel="noreferrer">{path.action}</a>
            ) : (
              <span className="destination-pending">Pending owner-approved destination</span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

const launchGates = [
  { number: '01', title: 'Proof rights', status: 'owner input needed', detail: 'Confirm which staged audio, video, and notation files are original or owner-permitted for public use.' },
  { number: '02', title: 'First Listen terms', status: 'draft for approval', detail: 'Approve the proposed $95 scope, five-day timing, one revision, and rights boundary.' },
  { number: '03', title: 'Booking or support destination', status: 'empty by default', detail: 'Choose one owned destination before any public button or contact handoff is enabled.' },
  { number: '04', title: 'First evidence', status: 'capture after acceptance', detail: 'Record a redacted accepted booking, payment, or donation confirmation in the local ledger.' },
];

function LaunchGate() {
  return (
    <section className="launch-gate" id="launch-gate" aria-labelledby="launch-gate-title">
      <div className="launch-gate-intro">
        <p className="chapter-kicker">Owner checkpoint</p>
        <h2 id="launch-gate-title">Four approvals to turn sound into a sale.</h2>
        <p>This is a local checklist, not a launch action. It keeps the next human decisions visible without pretending the first client or payment has happened.</p>
      </div>
      <ol className="gate-list">
        {launchGates.map((gate) => (
          <li className="gate-item" key={gate.number}>
            <span className="gate-number">{gate.number}</span>
            <div><h3>{gate.title}</h3><p>{gate.detail}</p></div>
            <span className="gate-status">{gate.status}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Booking({ selectedOffer }) {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [copyStatus, setCopyStatus] = useState('idle');
  const [goal, setGoal] = useState('');
  useEffect(() => {
    if (selectedOffer) setGoal(`${selectedOffer} — `);
  }, [selectedOffer]);
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const isReady = Boolean(data.get('name') && data.get('contact') && data.get('goal'));
    setStatus(isReady ? 'ready' : 'error');
    setCopyStatus('idle');
  };
  const copyBrief = async () => {
    if (status !== 'ready' || !formRef.current || !navigator.clipboard?.writeText) {
      setCopyStatus('error');
      return;
    }
    const data = new FormData(formRef.current);
    const brief = [
      'AP Music & Audio — booking brief',
      `Name: ${data.get('name')}`,
      `Contact: ${data.get('contact')}`,
      `Goal: ${data.get('goal')}`,
    ].join('\n');
    try {
      await navigator.clipboard.writeText(brief);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
  };
  return (
    <section className="chapter booking" id="book">
      <div className="chapter-index"><strong>06</strong><h2>book</h2><p>One clear next move.</p></div>
      <div className="chapter-body booking-grid">
        <div><p className="chapter-kicker">Louisville + remote</p><h3>What do you need the music to do?</h3><p>Tell Payton and Alex the goal. This prototype prepares the brief locally; it does not send anything yet.</p></div>
        <form ref={formRef} onSubmit={submit} noValidate>
          <label>Name<input name="name" autoComplete="name" /></label>
          <label>Email or phone<input name="contact" autoComplete="email" /></label>
          <label>Recording, lesson, event, transcription, or something stranger<textarea name="goal" value={goal} onChange={(event) => setGoal(event.target.value)} /></label>
          <div className="booking-actions">
            <button className="button" type="submit">Prepare the brief</button>
            <button className="button quiet" type="button" disabled={status !== 'ready'} onClick={copyBrief}>Copy local brief</button>
          </div>
          <p className={`form-status ${status}`} role="status">{status === 'ready' && 'Brief ready. Sending stays locked until contact details and approval are set.'}{status === 'error' && 'Add your name, a contact, and the music goal.'}</p>
          <p className={`copy-status ${copyStatus}`} role="status">{copyStatus === 'copied' && 'Copied locally. Paste it only into an approved destination.'}{copyStatus === 'error' && 'Clipboard unavailable; the brief remains local and unsent.'}</p>
        </form>
      </div>
    </section>
  );
}

export function LegacyStudio() {
  const [selectedOffer, setSelectedOffer] = useState('');
  return (
    <main>
      <Hero />
      <InputChapter />
      {chapters.slice(1).map((chapter) => <Chapter chapter={chapter} key={chapter.id} />)}
      <ServiceMatrix />
      <ContentSlate />
      <LeadMap />
      <PortfolioProof />
      <OfferLedger selectedOffer={selectedOffer} onSelect={setSelectedOffer} />
      <LaunchPaths />
      <LaunchGate />
      <Booking selectedOffer={selectedOffer} />
      <footer><span>AP Music &amp; Audio</span><a href="/card.html" target="_blank" rel="noreferrer">Printable business card</a><span>Piano / sound / code</span><span>© {new Date().getFullYear()} Payton + Alex</span></footer>
    </main>
  );
}

export function App() {
  return <StudioExperience />;
}
