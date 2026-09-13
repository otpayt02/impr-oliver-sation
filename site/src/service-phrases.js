// Complete sentences are curated together; randomizing individual words breaks meaning.
export const servicePhrases = [
  ['Shape', 'sound', 'for the room.', 'audio'],
  ['Bring', 'song', 'to life.', 'music'],
  ['Find', 'clarity', 'in the mix.', 'audio'],
  ['Build', 'confidence', 'at the keys.', 'music'],
  ['Trace', 'signal', 'from the source.', 'audio'],
  ['Turn', 'ideas', 'into music.', 'music'],
  ['Prepare', 'setup', 'for the stage.', 'audio'],
  ['Explore', 'harmony', 'beyond the chords.', 'music'],
  ['Refine', 'recording', 'with a fresh ear.', 'audio'],
  ['Develop', 'ear', 'one note at a time.', 'music'],
  ['Connect', 'equipment', 'with intention.', 'audio'],
  ['Arrange', 'melody', 'for a new feeling.', 'music'],
];

export function choosePhrase(history, random = Math.random) {
  const recent = history.slice(-6);
  const candidates = servicePhrases.map((_, index) => index).filter(index => !recent.includes(index));
  return candidates[Math.min(candidates.length - 1, Math.floor(random() * candidates.length))];
}
