import { describe, it } from 'node:test';
import assert from 'node:assert';
import { deriveScaffolding } from '../../src/engine/scaffolding';
import { createInitialState, incrementRetryCount, recordMistake } from '../../src/engine/learner-state';
import { ContentUnit } from '../../src/domain/content-unit';

describe('Scaffolding', () => {
  const baseUnit = {
    guidedPractice: { scaffoldingLevel: 'MEDIUM' }
  } as ContentUnit;

  it('uses default level from unit', () => {
    const state = createInitialState();
    const scaffold = deriveScaffolding(state, baseUnit);
    assert.strictEqual(scaffold.guidanceLevel, 'MEDIUM');
    assert.strictEqual(scaffold.availableHints, 1);
  });

  it('escalates to HIGH on repeated mistakes', () => {
    let state = createInitialState();
    state = recordMistake(state, 'error1');
    state = recordMistake(state, 'error1'); // 2 times

    const scaffold = deriveScaffolding(state, baseUnit);
    assert.strictEqual(scaffold.guidanceLevel, 'HIGH');
    assert.strictEqual(scaffold.availableHints, 3);
  });

  it('escalates to HIGH on retries', () => {
    let state = createInitialState();
    state = incrementRetryCount(state);
    state = incrementRetryCount(state);
    state = incrementRetryCount(state); // 3 retries

    const scaffold = deriveScaffolding(state, baseUnit);
    assert.strictEqual(scaffold.guidanceLevel, 'HIGH');
  });
});
