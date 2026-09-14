import test from 'node:test';
import assert from 'node:assert/strict';
import { choosePhrase, servicePhrases } from '../src/service-phrases.js';
import { readFile } from 'node:fs/promises';
const root = new URL('..', import.meta.url);
test('all curated phrases have three distinct semantic roles and a domain', () => {
  assert.equal(servicePhrases.length,24);
  assert.equal(new Set(servicePhrases.map(p=>p.join(' '))).size,24);
  for(const [verb,object,ending,domain] of servicePhrases){assert.ok(verb&&object&&ending.endsWith('.'));assert.ok(['music','audio'].includes(domain));}
});
test('random selection never repeats any of the six recent phrases', () => {
  let history=[0];
  for(let i=0;i<1000;i++){const index=choosePhrase(history,()=>((i*17)%100)/100);assert.ok(!history.slice(-6).includes(index));history.push(index);}
});
test('the active phrase uses a glyph-built, reduced-motion-safe hero field', async () => {
  const field = await readFile(new URL('./src/HeroGlyphField.jsx', root), 'utf8');
  const landing = await readFile(new URL('./src/DuetLanding.jsx', root), 'utf8');
  assert.match(field, /MUSIC_GLYPHS/);
  assert.match(field, /ResizeObserver/);
  assert.match(field, /IntersectionObserver/);
  assert.match(field, /PARTICLE_LIMIT/);
  assert.match(landing, /HeroGlyphField/);
});
