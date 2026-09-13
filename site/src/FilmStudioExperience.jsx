import { useEffect, useRef, useState, useCallback } from 'react';
import { SignalField } from './SignalField.jsx';
import { people, services, story } from './studio-catalog.js';
import { PracticeCheckout } from './PracticeCheckout.jsx';
import './tokens.css';
import './studio.css';
import './film-hero.css';

function useReducedMotion() {
  const queryText = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(queryText).matches;
  });
  useEffect(() => {
    const query = window.matchMedia(queryText);
    const change = () => setReduced(query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);
  return reduced;
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'navy';
    const stored = localStorage.getItem('ap-theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'navy' : 'cream';
  });
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ap-theme', theme);
  }, [theme]);
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'navy' ? 'cream' : 'navy');
  }, []);
  
  return { theme, toggleTheme };
}

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={theme === 'navy' ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={theme === 'navy'}
    >
      <svg className="icon-sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      <svg className="icon-moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}

function PersonPicker({ person, onChange }) {
  return (
    <div className="person-picker" aria-label="Preferred collaborator" role="tablist">
      {Object.entries(people).map(([key, value]) => (
        <button
          key={key}
          type="button"
          role="tab"
          aria-selected={person === key}
          aria-pressed={person === key}
          onClick={() => onChange(key)}
          className={person === key ? 'is-active' : ''}
        >
          <span className={`person-mark person-${key}`}>
            {key === 'oliver' ? 'OP' : 'AS'}
          </span>
          <span>
            {value.name}
            <small>{key === 'oliver' ? 'Explore with Oliver' : 'Explore with Alexander'}</small>
          </span>
          <span className="person-arrow" aria-hidden="true">↗</span>
        </button>
      ))}
    </div>
  );
}

function FilmHero({ person, onPerson, reduced, theme, onThemeToggle }) {
  const runway = useRef(null);
  const [progress, setProgress] = useState(0);
  const [motionOff, setMotionOff] = useState(false);
  const [manualStage, setManualStage] = useState(0);
  const staticMode = reduced || motionOff;
  const active = staticMode ? manualStage : Math.min(5, Math.floor(progress * 6));
  const scene = story[active];
  
  const updateProgress = useCallback(() => {
    const el = runway.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const length = Math.max(1, el.offsetHeight - window.innerHeight);
    const next = Math.max(0, Math.min(1, (window.scrollY - top) / length));
    setProgress(current => Math.abs(current - next) > 0.001 ? next : current);
  }, []);
  
  const queueUpdate = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(updateProgress);
    }
  }, [updateProgress]);
  
  const measure = useCallback(() => {
    updateProgress();
  }, [updateProgress]);
  
  useEffect(() => {
    if (!runway.current) return;
    
    let frame = 0;
    let top = 0;
    let length = 1;
    
    const update = () => {
      frame = 0;
      const el = runway.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      top = rect.top + window.scrollY;
      length = Math.max(1, el.offsetHeight - window.innerHeight);
      queueUpdate();
    };
    
    const observer = new ResizeObserver(update);
    observer.observe(runway.current);
    
    update();
    window.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', measure);
    
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', queueUpdate);
      window.removeEventListener('resize', measure);
    };
  }, [queueUpdate, measure]);
  
  const jump = (index) => {
    setManualStage(index);
    if (!staticMode && runway.current) {
      const el = runway.current;
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const length = Math.max(1, el.offsetHeight - window.innerHeight);
      window.scrollTo({
        top: top + length * (index === 0 ? 0 : (index + 0.2) / 6),
        behavior: 'smooth'
      });
    }
  };
  
  const progressPercent = staticMode ? (active + 1) / 6 : progress;
  
  return (
    <section 
      id="top" 
      ref={runway} 
      className={`film-runway ${staticMode ? 'is-static' : ''}`}
      aria-label="From an idea to a shared sound"
      style={{ '--film-progress': progress }}
    >
      <div className="film-stage">
        {/* Progress bar at top */}
        <div className="film-progress" aria-hidden="true" role="progressbar" 
             aria-valuenow={Math.round(progressPercent * 100)} aria-valuemin={0} aria-valuemax={100}>
          <span style={{ transform: `scaleX(${progressPercent})` }} />
        </div>
        
        {/* Frame counter */}
        <div className="film-meta" aria-hidden="true">
          <span>FRAME</span>
          <b data-frame>{String(Math.round(progressPercent * 2400)).padStart(4, '0')}</b>
          <span>/ 2400</span>
        </div>
        
        {/* Chapter dots */}
        <ol className="chapter-dots" aria-label="Story chapters" role="tablist">
          {story.map((item, index) => (
            <li 
              key={item.id} 
              role="tab" 
              aria-selected={active === index}
              aria-label={`${item.name} chapter`}
              onClick={() => jump(index)}
              className={active === index ? 'is-active' : ''}
            >
              <span className="dot" aria-hidden="true" />
              <span className="dot-label" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            </li>
          ))}
        </ol>
        
        {/* Scene 1: Logo/Orbit - The Brand */}
        <article className={`scene logo-scene ${active === 0 ? 'active' : ''}`} data-scene data-index="0">
          <div className="vortex-field" aria-hidden="true" />
          <div className="seal-orbit">
            <div className="logo-stack">
              <div className="logo-seal" aria-hidden="true">
                <svg viewBox="0 0 200 200" width="180" height="180" aria-hidden="true">
                  <defs>
                    <radialGradient id="sealGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor={theme === 'navy' ? '#d4a843' : '#d84a4d'} stopOpacity="0.3" />
                      <stop offset="70%" stopColor={theme === 'navy' ? '#d4a843' : '#d84a4d'} stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="100" cy="100" r="95" fill="url(#sealGlow)" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke={theme === 'navy' ? '#d4a843' : '#d84a4d'} strokeWidth="1.5" opacity="0.6" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke={theme === 'navy' ? '#d4a843' : '#d84a4d'} strokeWidth="1" opacity="0.3" strokeDasharray="8 4" />
                  <text x="100" y="108" fontFamily="Georgia, serif" fontSize="48" fontWeight="400" fill={theme === 'navy' ? '#f5f0e8' : '#242a2a'} textAnchor="middle" dominantBaseline="middle">ap</text>
                </svg>
              </div>
              <span className="torch-flare" aria-hidden="true" />
            </div>
            <div className="seal-center">
              <p data-beat>Oliver Payton & Alexander Say · Louisville + Remote</p>
              <h1 data-beat>
                Music for the feeling.<br />
                <em>Audio for the way it reaches you.</em>
              </h1>
            </div>
          </div>
        </article>
        
        {/* Scene 2: Portrait - Oliver at Piano */}
        <article className={`scene scene--portrait ${active === 1 ? 'active' : ''}`} data-scene data-index="1" style={{ '--position': '50% 65%' }}>
          <div className="scene-media">
            <div className="media-placeholder" aria-hidden="true">
              <svg viewBox="0 0 400 600" aria-hidden="true">
                <rect fill={theme === 'navy' ? '#162a48' : '#e8e3da'} width="400" height="600" />
                <text x="200" y="300" fontFamily="Georgia, serif" fontSize="24" fill={theme === 'navy' ? '#3a6494' : '#a5acb7'} textAnchor="middle" dominantBaseline="middle">Oliver at Piano</text>
                <path d="M100 450 Q200 380 300 450" stroke={theme === 'navy' ? '#d4a843' : '#d84a4d'} strokeWidth="2" fill="none" opacity="0.5" />
                <circle cx="150" cy="420" r="30" fill="none" stroke={theme === 'navy' ? '#d4a843' : '#d84a4d'} strokeWidth="1.5" opacity="0.4" />
                <circle cx="250" cy="420" r="30" fill="none" stroke={theme === 'navy' ? '#d4a843' : '#d84a4d'} strokeWidth="1.5" opacity="0.4" />
              </svg>
            </div>
          </div>
          <span className="scene-credit">Photography by Oliver Payton</span>
          <div className="scene-copy">
            <div className="story-line" data-beat>
              <p className="scene-kicker">02 · INPUT</p>
              <h2>Bring your idea<br />to <em>life.</em></h2>
            </div>
          </div>
          <div className="story-line secondary" data-beat>
            <strong>A voice memo. A song you love. A feeling.</strong>
            <p>We listen for key, tempo, texture, structure, and intent. The starting point is whatever you have.</p>
          </div>
        </article>
        
        {/* Scene 3: Ribbon - Alexander at Console */}
        <article className={`scene scene--ribbon ${active === 2 ? 'active' : ''}`} data-scene data-index="2" style={{ '--position': '50% 55%' }}>
          <div className="scene-media">
            <div className="media-placeholder" aria-hidden="true">
              <svg viewBox="0 0 600 400" aria-hidden="true">
                <rect fill={theme === 'navy' ? '#162a48' : '#e8e3da'} width="600" height="400" />
                <text x="300" y="200" fontFamily="Georgia, serif" fontSize="24" fill={theme === 'navy' ? '#3a6494' : '#a5acb7'} textAnchor="middle" dominantBaseline="middle">Alexander at Console</text>
                <rect x="150" y="120" width="300" height="160" rx="8" fill="none" stroke={theme === 'navy' ? '#27b9b2' : '#27b9b2'} strokeWidth="2" opacity="0.5" />
                <rect x="170" y="140" width="80" height="20" rx="3" fill={theme === 'navy' ? '#27b9b2' : '#27b9b2'} opacity="0.6" />
                <rect x="260" y="140" width="80" height="20" rx="3" fill={theme === 'navy' ? '#27b9b2' : '#27b9b2'} opacity="0.4" />
                <rect x="350" y="140" width="80" height="20" rx="3" fill={theme === 'navy' ? '#27b9b2' : '#27b9b2'} opacity="0.5" />
                <line x1="200" y1="280" x2="400" y2="280" stroke={theme === 'navy' ? '#6fc7a5' : '#6fc7a5'} strokeWidth="2" opacity="0.6" />
                <polyline points="200,280 250,260 300,270 350,255 400,280" fill="none" stroke={theme === 'navy' ? '#6fc7a5' : '#6fc7a5'} strokeWidth="1.5" opacity="0.7" />
              </svg>
            </div>
          </div>
          <span className="scene-credit">Photography by Alexander Say</span>
          <div className="scene-copy">
            <div className="story-line" data-beat>
              <p className="scene-kicker">03 · HEAR</p>
              <h2>Hear the detail.<br /><em>Find the way.</em></h2>
            </div>
          </div>
          <div className="story-line secondary" data-beat>
            <strong>Perfect pitch. Twenty years at the piano.</strong>
            <p>Harmony, rhythm, balance, signal. We turn an instinct into something you can work with — a chord map, a routing diagram, a clearer direction.</p>
          </div>
        </article>
        
        {/* Scene 4: Portrait - Collaborative */}
        <article className={`scene scene--portrait ${active === 3 ? 'active' : ''}`} data-scene data-index="3" style={{ '--position': '50% 68%' }}>
          <div className="scene-media">
            <div className="media-placeholder" aria-hidden="true">
              <svg viewBox="0 0 400 600" aria-hidden="true">
                <rect fill={theme === 'navy' ? '#162a48' : '#e8e3da'} width="400" height="600" />
                <text x="200" y="280" fontFamily="Georgia, serif" fontSize="24" fill={theme === 'navy' ? '#3a6494' : '#a5acb7'} textAnchor="middle" dominantBaseline="middle">Collaborative Session</text>
                <circle cx="160" cy="400" r="40" fill="none" stroke={theme === 'navy' ? '#d4a843' : '#d84a4d'} strokeWidth="2" opacity="0.5" />
                <circle cx="240" cy="400" r="40" fill="none" stroke={theme === 'navy' ? '#6fc7a5' : '#27b9b2'} strokeWidth="2" opacity="0.5" />
                <line x1="160" y1="360" x2="240" y2="360" stroke={theme === 'navy' ? '#d4a843' : '#d84a4d'} strokeWidth="1.5" opacity="0.6" strokeDasharray="8 4" />
                <text x="200" y="480" fontFamily="Georgia, serif" fontSize="16" fill={theme === 'navy' ? '#a8e4c8' : '#6fc7a5'} textAnchor="middle">Music + Audio</text>
              </svg>
            </div>
          </div>
          <span className="scene-credit">Session documentation</span>
          <div className="scene-copy">
            <div className="story-line" data-beat>
              <p className="scene-kicker">04 · PLAY</p>
              <h2>Shape your sound.<br /><em>Make it yours.</em></h2>
            </div>
          </div>
          <div className="story-line secondary" data-beat>
            <strong>Piano parts. Chord maps. Recording sessions.</strong>
            <p>The right tool follows the idea. A custom piano response, a transcription, a recording setup — shaped around your song, your room, your people.</p>
          </div>
        </article>
        
        {/* Scene 5: Ribbon - Room/Event */}
        <article className={`scene scene--ribbon ${active === 4 ? 'active' : ''}`} data-scene data-index="4" style={{ '--position': '50% 58%' }}>
          <div className="scene-media">
            <div className="media-placeholder" aria-hidden="true">
              <svg viewBox="0 0 600 400" aria-hidden="true">
                <rect fill={theme === 'navy' ? '#102038' : '#d6d0c5'} width="600" height="400" />
                <text x="300" y="180" fontFamily="Georgia, serif" fontSize="24" fill={theme === 'navy' ? '#5ab08f' : '#6fc7a5'} textAnchor="middle" dominantBaseline="middle">Event Space / Recording Room</text>
                <ellipse cx="300" cy="280" rx="180" ry="60" fill="none" stroke={theme === 'navy' ? '#d4a843' : '#d84a4d'} strokeWidth="1.5" opacity="0.4" />
                <line x1="120" y1="320" x2="480" y2="320" stroke={theme === 'navy' ? '#d4a843' : '#d84a4d'} strokeWidth="1" opacity="0.3" />
                <circle cx="200" cy="260" r="15" fill={theme === 'navy' ? '#d4a843' : '#d84a4d'} opacity="0.6" />
                <circle cx="400" cy="260" r="15" fill={theme === 'navy' ? '#6fc7a5' : '#27b9b2'} opacity="0.6" />
                <circle cx="300" cy="240" r="12" fill={theme === 'navy' ? '#9771e8' : '#9771e8'} opacity="0.6" />
              </svg>
            </div>
          </div>
          <span className="scene-credit">Venue documentation</span>
          <div className="scene-copy">
            <div className="story-line" data-beat>
              <p className="scene-kicker">05 · MAKE</p>
              <h2>Build the moment.<br /><em>Let it resonate.</em></h2>
            </div>
          </div>
          <div className="story-line secondary" data-beat>
            <strong>Live sound. Playback. Technical rehearsal.</strong>
            <p>From arrangement to signal flow, every choice serves the people listening. Louisville venues, private events, remote sessions — the room is part of the instrument.</p>
          </div>
        </article>
        
        {/* Scene 6: Generated/CTA - Begin */}
        <article className={`scene scene--generated ${active === 5 ? 'active' : ''}`} data-scene data-index="5" style={{ '--position': '50% 70%' }}>
          <div className="scene-media">
            <div className="media-placeholder" aria-hidden="true">
              <svg viewBox="0 0 600 400" aria-hidden="true">
                <rect fill={theme === 'navy' ? '#0a1628' : '#f3f1e9'} width="600" height="400" />
                <circle cx="300" cy="200" r="80" fill="none" stroke={theme === 'navy' ? '#d4a843' : '#d84a4d'} strokeWidth="2" opacity="0.3" />
                <circle cx="300" cy="200" r="50" fill="none" stroke={theme === 'navy' ? '#6fc7a5' : '#27b9b2'} strokeWidth="1.5" opacity="0.5" strokeDasharray="12 8" />
                <text x="300" y="195" fontFamily="Georgia, serif" fontSize="36" fontWeight="400" fill={theme === 'navy' ? '#f5f0e8' : '#242a2a'} textAnchor="middle" dominantBaseline="middle">Begin</text>
                <text x="300" y="240" fontFamily="DM Sans, sans-serif" fontSize="14" fill={theme === 'navy' ? '#a8e4c8' : '#6fc7a5'} textAnchor="middle" letter-spacing="0.15em" textTransform="uppercase">Start with First Listen</text>
              </svg>
            </div>
          </div>
          <span className="scene-credit">Your first step</span>
          <div className="scene-copy">
            <div className="story-line" data-beat>
              <p className="scene-kicker">06 · BEGIN</p>
              <h2>Find your people.<br /><em>Start something.</em></h2>
            </div>
          </div>
          <div className="story-line secondary cta-line" data-beat>
            <strong>Two people. A shared curiosity for sound.</strong>
            <p>Choose Oliver, Alexander, or both. Tell us what you want to make possible.</p>
            <a className="film-cta" href="#services">Explore services <span aria-hidden="true">↗</span></a>
          </div>
        </article>
        
        {/* Scroll invitation */}
        <div className="scroll-invitation" aria-hidden="true">
          <span>{staticMode ? 'CHOOSE A CHAPTER' : 'SCROLL TO UNFOLD'}</span>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
        
        {/* Header overlay */}
        <header className="film-header" role="banner">
          <a className="film-brand" href="#top" aria-label="AP Music & Audio - Home">
            <span>ap<span className="brand-dot">.</span></span>
            <small>MUSIC<br />& AUDIO</small>
          </a>
          <nav aria-label="Main navigation" className="film-nav">
            <a href="#services">The studio</a>
            <a href="#work">Our approach</a>
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <a className="header-book" href="#book">Start something <span aria-hidden="true">↗</span></a>
          </nav>
        </header>
        
        {/* Person picker in film (below header) */}
        <div className="film-person-row">
          <p>Independent minds.<br /><span>A shared love of sound.</span></p>
          <PersonPicker person={person} onChange={onPerson} />
        </div>
        
        {/* SignalField in the logo scene area */}
        <div className="film-signal-field" aria-hidden="true">
          <SignalField 
            progress={staticMode ? 1 : progress} 
            animate={!staticMode} 
            reactive={!staticMode && !reduced} 
            arrival={!staticMode}
          />
        </div>
        
        {/* Legend */}
        <div className="film-legend" aria-label="Service color key">
          <div>
            <strong>Music</strong>
            {services.filter(x => x.domain === 'Music').map(x => (
              <a key={x.id} href={`#${x.id}`} className={x.id}>
                <i style={{ background: `var(--${x.id.replace('-', '-')})` }} />
                {x.layer}
              </a>
            ))}
          </div>
          <div>
            <strong>Audio</strong>
            {services.filter(x => x.domain === 'Audio').map(x => (
              <a key={x.id} href={`#${x.id}`} className={x.id}>
                <i style={{ background: `var(--${x.id.replace('-', '-')})` }} />
                {x.layer}
              </a>
            ))}
          </div>
          <button 
            aria-pressed={motionOff || reduced} 
            onClick={() => setMotionOff(!motionOff)}
            className="motion-toggle-btn"
          >
            {staticMode ? 'Motion off' : 'Motion on'} 
            <span aria-hidden="true">{staticMode ? '○' : '◉'}</span>
          </button>
        </div>
        
        {/* Journey deck - current stage detail */}
        <div className="film-journey" key={scene.id}>
          <p className="studio-eyebrow">{scene.name} / {scene.output}</p>
          <h2>{scene.title}</h2>
          <p>{scene.detail}</p>
        </div>
      </div>
      
      {/* Skip link */}
      <a href="#services" className="studio-skip">Skip to services</a>
    </section>
  );
}

export function StudioExperience() {
  const [person, setPerson] = useState('oliver');
  const [selected, setSelected] = useState('');
  const reduced = useReducedMotion();
  const { theme, toggleTheme } = useTheme();
  
  const selectService = (title) => {
    setSelected(title);
    document.getElementById('book')?.scrollIntoView({ 
      behavior: reduced ? 'instant' : 'smooth' 
    });
  };
  
  return (
    <main className="ap-studio">
      <FilmHero 
        person={person} 
        onPerson={setPerson} 
        reduced={reduced}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      <ServiceColumns person={person} onPerson={setPerson} onSelect={selectService} />
      <Approach />
      <section className="studio-first-listen" id="offer">
        <p className="studio-eyebrow">One clear place to begin</p>
        <h2>First Listen<span>.</span></h2>
        <div>
          <p>One reference. A piano response.<br />A key and chord map. A focused revision.</p>
          <a className="studio-button" href="#checkout">Try the $95 practice order ↗</a>
          <button className="text-button" onClick={() => selectService('First Listen')}>Discuss First Listen</button>
          <small>Draft offer · confirm scope and timing before a real booking.</small>
        </div>
      </section>
      <Inquiry person={person} selected={selected} />
      <PracticeCheckout />
      <footer className="studio-footer">
        <a href="#top" className="footer-monogram">ap.</a>
        <p>Oliver Payton & Alexander Say<br /><span>Music / audio / the space between.</span></p>
        <a href="#checkout">Practice checkout ↗</a>
        <a href="#top">Back to the beginning ↑</a>
      </footer>
    </main>
  );
}

// Re-export other components from StudioExperience.jsx
import { ServiceColumns } from './StudioExperience.jsx';
import { Approach } from './StudioExperience.jsx';
import { Inquiry } from './StudioExperience.jsx';