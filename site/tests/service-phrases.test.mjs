import test from 'node:test';
import assert from 'node:assert/strict';
import { choosePhrase, servicePhrases } from '../src/service-phrases.js';
test('all curated phrases have three distinct semantic roles and a domain', () => {
  assert.equal(servicePhrases.length,12);
  assert.equal(new Set(servicePhrases.map(p=>p.join(' '))).size,12);
  for(const [verb,object,ending,domain] of servicePhrases){assert.ok(verb&&object&&ending.endsWith('.'));assert.ok(['music','audio'].includes(domain));}
});
test('random selection never repeats any of the six recent phrases', () => {
  let history=[0];
  for(let i=0;i<1000;i++){const index=choosePhrase(history,()=>((i*17)%100)/100);assert.ok(!history.slice(-6).includes(index));history.push(index);}
});
