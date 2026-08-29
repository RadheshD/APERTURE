import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  createInitialState,
  incrementHintUsage,
  recordAttempt,
  recordMistake,
  updateCompetency,
  setActiveRecovery,
  clearMistakesForPattern
} from '../../src/engine/learner-state';

describe('LearnerState', () => {
  it('should create initial state', () => {
    const state = createInitialState();
    assert.deepStrictEqual(state.competencies, {});
    assert.strictEqual(state.history.hintUsageCount, 0);
  });

  it('should immutably update hint usage', () => {
    const state1 = createInitialState();
    const state2 = incrementHintUsage(state1);
    
    assert.strictEqual(state1.history.hintUsageCount, 0);
    assert.strictEqual(state2.history.hintUsageCount, 1);
  });

  it('should immutably record attempts', () => {
    let state = createInitialState();
    state = recordAttempt(state, 'unit-1', true);
    
    assert.strictEqual(state.history.recentAttempts.length, 1);
    assert.strictEqual(state.history.recentAttempts[0].success, true);
    assert.strictEqual(state.history.recentAttempts[0].unitId, 'unit-1');
  });

  it('should increment repeated mistakes', () => {
    let state = createInitialState();
    state = recordMistake(state, 'bad-spacing');
    state = recordMistake(state, 'bad-spacing');
    
    assert.strictEqual(state.history.repeatedMistakes['bad-spacing'], 2);
  });

  it('should update competency without degrading rung', () => {
    let state = createInitialState();
    state = updateCompetency(state, 'vis-spacing', 3, false);
    
    assert.strictEqual(state.competencies['vis-spacing'].currentRung, 3);
    assert.strictEqual(state.competencies['vis-spacing'].hasDemonstratedTransfer, false);

    // Attempting to degrade should not lower rung
    state = updateCompetency(state, 'vis-spacing', 1, false);
    assert.strictEqual(state.competencies['vis-spacing'].currentRung, 3);

    // Upgrading and setting transfer to true
    state = updateCompetency(state, 'vis-spacing', 5, true);
    assert.strictEqual(state.competencies['vis-spacing'].currentRung, 5);
    assert.strictEqual(state.competencies['vis-spacing'].hasDemonstratedTransfer, true);
  });

  it('should set active recovery', () => {
    let state = createInitialState();
    state = setActiveRecovery(state, 'recovery-drill-1');
    assert.strictEqual(state.activeRecovery.unitId, 'recovery-drill-1');
  });
  
  it('should clear mistakes for pattern', () => {
    let state = createInitialState();
    state = recordMistake(state, 'bad-spacing');
    state = clearMistakesForPattern(state, 'bad-spacing');
    assert.strictEqual(state.history.repeatedMistakes['bad-spacing'], undefined);
  });
});
