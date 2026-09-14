// Buyer-facing phrase grammar: green subject → blue method → purple reason.
// Each domain starts with 20 candidates per role (8,000 triples); tag matching
// keeps only combinations that describe a real Music or Audio service outcome.
const music = {
  subjects: [
    ['Your song', ['create', 'perform']], ['Your melody', ['create', 'learn']], ['Your harmony', ['create', 'learn']], ['Your piano part', ['create', 'perform']], ['Your arrangement', ['create', 'perform']],
    ['Your performance', ['perform']], ['Your rehearsal', ['perform']], ['Your chord map', ['learn']], ['Your ear', ['learn']], ['Your practice', ['learn']],
    ['Your next section', ['create']], ['Your musical idea', ['create']], ['Your reference', ['create', 'learn']], ['Your voice', ['create', 'perform']], ['Your feeling', ['create']],
    ['Your progression', ['create', 'learn']], ['Your accompaniment', ['perform']], ['Your repertoire', ['perform', 'learn']], ['Your first draft', ['create']], ['Your next session', ['create', 'learn', 'perform']],
  ],
  predicates: [
    ['takes shape', ['create']], ['finds its voice', ['create', 'perform']], ['gets a clear direction', ['create', 'learn']], ['becomes playable', ['create', 'perform']], ['comes into focus', ['create', 'learn']],
    ['lands with intention', ['perform']], ['moves with confidence', ['perform', 'learn']], ['makes musical sense', ['create', 'learn']], ['opens up', ['create']], ['gets heard', ['perform']],
    ['becomes yours', ['create', 'perform']], ['finds the right part', ['create']], ['builds from the feeling', ['create']], ['connects the notes', ['learn']], ['gains a useful map', ['learn']],
    ['holds the room', ['perform']], ['turns into a direction', ['create']], ['makes the next step clear', ['learn']], ['has somewhere to go', ['create', 'perform']], ['starts with listening', ['create', 'learn', 'perform']],
  ],
  purposes: [
    ['for the room.', ['perform']], ['for the part that belongs.', ['create']], ['with a fresh ear.', ['learn']], ['at the keys.', ['learn', 'perform']], ['in the next rehearsal.', ['perform']],
    ['in your own hands.', ['learn']], ['for the people listening.', ['perform']], ['from a real reference.', ['create']], ['one note at a time.', ['learn']], ['with intention.', ['create', 'perform']],
    ['beyond the chords.', ['learn']], ['for a new feeling.', ['create']], ['before the moment arrives.', ['perform']], ['from the first idea.', ['create']], ['for the song you hear.', ['create', 'learn']],
    ['through the whole set.', ['perform']], ['with a part to play.', ['create', 'perform']], ['for the next take.', ['create']], ['with more to trust.', ['learn']], ['where the music leads.', ['create', 'perform']],
  ],
};

const audio = {
  subjects: [
    ['Your signal', ['capture', 'route']], ['Your recording', ['capture', 'mix']], ['Your mix', ['mix']], ['Your room', ['live']], ['Your playback', ['live', 'route']],
    ['Your setup', ['capture', 'route']], ['Your microphone path', ['capture', 'route']], ['Your monitor mix', ['live', 'mix']], ['Your session', ['capture', 'mix']], ['Your input path', ['live', 'route']],
    ['Your event', ['live']], ['Your technical plan', ['live', 'route']], ['Your source', ['capture']], ['Your routing', ['route']], ['Your balance', ['mix']],
    ['Your next listen', ['mix']], ['Your live sound', ['live']], ['Your interface', ['capture', 'route']], ['Your soundcheck', ['live']], ['Your next room', ['live', 'capture']],
  ],
  predicates: [
    ['stays clear', ['capture', 'mix']], ['finds the right path', ['route']], ['gets room to breathe', ['mix']], ['holds together', ['live', 'route']], ['starts clean', ['capture']],
    ['moves with purpose', ['route']], ['gets heard clearly', ['live', 'mix']], ['makes sense end to end', ['route', 'capture']], ['lands where it should', ['live']], ['finds its balance', ['mix']],
    ['has a reliable route', ['route']], ['becomes easier to trust', ['capture', 'live']], ['works before the room fills', ['live']], ['turns into a usable plan', ['route', 'live']], ['keeps the detail intact', ['capture', 'mix']],
    ['comes into focus', ['mix']], ['has a cleaner handoff', ['route', 'capture']], ['supports the performance', ['live']], ['makes the next change clear', ['mix', 'route']], ['starts with listening', ['capture', 'mix', 'route', 'live']],
  ],
  purposes: [
    ['for the room.', ['live']], ['from source to speaker.', ['route']], ['with a fresh ear.', ['mix']], ['before the room fills.', ['live']], ['for the next take.', ['capture']],
    ['through every handoff.', ['route']], ['with less guesswork.', ['capture', 'mix']], ['for the people listening.', ['live']], ['at matched volume.', ['mix']], ['from the first input.', ['capture', 'route']],
    ['with a backup plan.', ['live']], ['for the signal you trust.', ['capture']], ['before the moment arrives.', ['live']], ['with the balance intact.', ['mix']], ['for the session ahead.', ['capture']],
    ['through the whole system.', ['route']], ['with every change explained.', ['mix', 'route']], ['for a cleaner capture.', ['capture']], ['where the detail matters.', ['mix']], ['with intention.', ['capture', 'mix', 'route', 'live']],
  ],
};

const sharesTag = (left, right) => left.some(tag => right.includes(tag));
const buildDomainPhrases = (grammar, domain) => grammar.subjects.flatMap(([subject, subjectTags]) =>
  grammar.predicates.flatMap(([predicate, predicateTags]) =>
    grammar.purposes.flatMap(([purpose, purposeTags]) =>
      sharesTag(subjectTags, predicateTags) && sharesTag(predicateTags, purposeTags)
        ? [[subject, predicate, purpose, domain]] : [],
    ),
  ),
);

export const heroPhrases = [...buildDomainPhrases(music, 'music'), ...buildDomainPhrases(audio, 'audio')];

export function chooseHeroPhrase(history, random = Math.random) {
  const recent = new Set(history.slice(-8));
  const candidates = heroPhrases.map((_, index) => index).filter(index => !recent.has(index));
  return candidates[Math.floor(random() * candidates.length)];
}
