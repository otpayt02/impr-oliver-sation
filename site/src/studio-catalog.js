export const people = {
  oliver: { name: 'Oliver Payton', short: 'Oliver', note: 'Explore a musical idea with Oliver.' },
  alex: { name: 'Alexander Say', short: 'Alexander', note: 'Explore a sound or production idea with Alexander.' },
};

export const services = [
  { id: 'music-make', domain: 'Music', layer: 'Make', title: 'Give your idea a voice.', subtitle: 'Piano parts · arrangements · musical sampling', detail: 'Start with a reference or a feeling. Shape a part that belongs in your song.', mode: 'Live + digital', symbol: '♩', example: 'A part with a purpose', sample: 'Reference → harmonic sketch → piano response → one focused revision.', result: 'A playable musical direction', lead: 'oliver' },
  { id: 'music-refine', domain: 'Music', layer: 'Refine', title: 'Hear it. Understand it. Play it.', subtitle: 'Song transcription · lessons · ear training', detail: 'Find the chords, unlock a passage, or learn to recognize what your ear already loves. Curated study and workout playlists are being shaped as a future practice aid.', mode: 'Lessons + digital', symbol: '♯', example: 'From sound to a chord map', sample: 'Example only: Cmaj7 → Am7 → Dm7 → G7. Hear the movement, then try a new voicing.', result: 'A chart, practice plan, or future playlist request', lead: 'oliver' },
  { id: 'music-present', domain: 'Music', layer: 'Present', title: 'Make the performance yours.', subtitle: 'Piano · bass · drums · accompaniment · rehearsal', detail: 'Shape the repertoire, transitions, and feel around the people who will be listening.', mode: 'Live', symbol: '𝄐', example: 'A performance has an arc', sample: 'Opening atmosphere → featured moment → change of energy → a considered ending.', result: 'A performance or rehearsal plan', lead: 'shared' },
  { id: 'audio-make', domain: 'Audio', layer: 'Make', title: 'Start with a clean signal.', subtitle: 'Recording setup · capture · production workflow', detail: 'Make the path from microphone or instrument to recording easier to understand and use.', mode: 'Live + digital', symbol: '</>', example: 'Follow the signal', sample: 'Source → microphone / DI → interface → recording track → monitoring. Check each handoff.', result: 'A practical recording setup', lead: 'alex' },
  { id: 'audio-refine', domain: 'Audio', layer: 'Refine', title: 'Find what the sound needs.', subtitle: 'Audio audits · mix feedback · routing lessons', detail: 'Listen for balance, clarity, noise, and space. Turn what feels off into an actionable next step.', mode: 'Digital + lessons', symbol: '#', example: 'An audit you can act on', sample: 'Listen at matched volume → isolate the issue → prioritize three changes → compare again.', result: 'Focused notes and next steps', lead: 'alex' },
  { id: 'audio-present', domain: 'Audio', layer: 'Present', title: 'Let the whole room hear it.', subtitle: 'Live sound · event setup · playback · technical rehearsal', detail: 'Work through inputs, monitoring, transitions, and playback before the moment arrives.', mode: 'Live', symbol: '⌁', example: 'Before the room fills', sample: 'Input list → routing check → monitor check → playback rehearsal → backup plan.', result: 'A room-ready technical plan', lead: 'shared' },
];

export const story = [
  { id: 'input', name: 'Input', words: ['Bring', 'your idea', 'to life.'], colors: ['music-make', 'music-make', 'audio-make'], title: 'Every good thing starts with a little possibility.', detail: 'A voice memo. A song you love. A room that could sound better. Start where you are.', output: 'Your idea is the starting point.' },
  { id: 'hear', name: 'Hear', words: ['Hear', 'the detail.', 'Find the way.'], colors: ['music-refine', 'audio-refine', 'music-refine'], title: 'Listen for what is really there.', detail: 'Harmony, rhythm, balance, signal. We help turn an instinct into something you can work with.', output: 'A clearer musical or technical direction.' },
  { id: 'play', name: 'Play', words: ['Shape', 'your sound.', 'Make it yours.'], colors: ['music-make', 'audio-make', 'music-present'], title: 'Let the idea become something you can play.', detail: 'A piano response, a chord map, or a recording session. The right tool follows the idea.', output: 'A part, a map, or a recording approach.' },
  { id: 'teach', name: 'Learn', words: ['Learn', 'the language.', 'Trust your ear.'], colors: ['music-refine', 'music-refine', 'audio-refine'], title: 'Make the next step feel possible.', detail: 'Song-led lessons and practical audio guidance connect understanding with doing.', output: 'One useful skill to take into your next session.' },
  { id: 'make', name: 'Make', words: ['Build', 'the moment.', 'Let it resonate.'], colors: ['audio-make', 'music-present', 'audio-present'], title: 'Bring the musical and technical sides together.', detail: 'From arrangement to signal flow, every choice should serve the people listening.', output: 'A plan for the record, rehearsal, or room.' },
  { id: 'book', name: 'Begin', words: ['Find', 'your people.', 'Start something.'], colors: ['music-make', 'music-present', 'audio-present'], title: 'Two people. A shared curiosity for sound.', detail: 'Choose Oliver, Alexander, or both. Tell us what you want to make possible.', output: 'Start with First Listen, or build a custom brief.' },
];

export const practiceOffers = [
  { id: 'first-listen', name: 'First Listen', price: '95.00', detail: 'Piano response, key + chord map, one focused revision.' },
  { id: 'transcription', name: 'Transcription Map', price: '60.00', detail: 'A starting-price rehearsal for a chart or notation request. Final scope varies.' },
];

export function googlePayRequest(offer) {
  if (!practiceOffers.some(item => item.id === offer.id && item.price === offer.price)) throw new Error('Unknown practice offer');
  return {
    apiVersion: 2, apiVersionMinor: 0,
    allowedPaymentMethods: [{ type: 'CARD', parameters: { allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'], allowedCardNetworks: ['VISA', 'MASTERCARD', 'AMEX', 'DISCOVER'] }, tokenizationSpecification: { type: 'PAYMENT_GATEWAY', parameters: { gateway: 'example', gatewayMerchantId: 'exampleGatewayMerchantId' } } }],
    merchantInfo: { merchantName: 'AP Music & Audio — practice' },
    transactionInfo: { totalPriceStatus: 'FINAL', totalPrice: offer.price, currencyCode: 'USD', countryCode: 'US' },
  };
}
