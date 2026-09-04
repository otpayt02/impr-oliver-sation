import test from 'node:test';
import assert from 'node:assert/strict';
import { createEntities, getEntityState, phaseProgress } from '../src/signal-model.js';

test('the generated score is deterministic', () => {
  assert.deepEqual(createEntities(8, 42), createEntities(8, 42));
  assert.notDeepEqual(createEntities(8, 42), createEntities(8, 43));
});

test('scroll phases clamp to their declared range', () => {
  assert.equal(phaseProgress(-1, 0.1, 0.5), 0);
  assert.ok(Math.abs(phaseProgress(0.3, 0.1, 0.5) - 0.5) < Number.EPSILON);
  assert.equal(phaseProgress(2, 0.1, 0.5), 1);
});

test('one entity completes the binary to notation to particle story', () => {
  const entity = createEntities(1, 7)[0];
  const start = getEntityState(entity, 0);
  const middle = getEntityState(entity, 0.5);
  const end = getEntityState(entity, 1);

  assert.equal(start.binary, 1);
  assert.equal(start.notation, 0);
  assert.equal(start.particle, 0);
  assert.ok(middle.notation > 0.5);
  assert.ok(end.particle > 0.99);
  assert.ok(end.x > start.x);
});
