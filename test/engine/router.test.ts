import { describe, it } from 'node:test';
import assert from 'node:assert';
import { determineNextAction, RoutingRules } from '../../src/engine/router';
import { ContentUnit } from '../../src/domain/content-unit';
import { createInitialState, incrementRetryCount, recordMistake } from '../../src/engine/learner-state';
import { MasteryResult } from '../../src/engine/mastery';
import { AssessmentResult } from '../../src/engine/assessment';

describe('Router', () => {
  const rules: RoutingRules = { recoveryThreshold: 3, retryLimit: 5 };
  const baseUnit = {
    recoveryPath: { targetedDrillId: 'drill-1' },
    nextRecommendedUnitIds: ['next-1']
  } as ContentUnit;

  it('proceeds on mastery', () => {
    const decision = determineNextAction(
      createInitialState(),
      baseUnit,
      { type: 'SUCCESS' },
      { type: 'MASTERED' },
      rules
    );
    assert.strictEqual(decision.type, 'PROCEED');
    assert.strictEqual(decision.nextUnitId, 'next-1');
  });

  it('transfers on transfer required', () => {
    const decision = determineNextAction(
      createInitialState(),
      baseUnit,
      { type: 'SUCCESS' },
      { type: 'TRANSFER_REQUIRED' },
      rules
    );
    assert.strictEqual(decision.type, 'TRANSFER');
    assert.strictEqual(decision.nextUnitId, 'next-1');
  });

  it('retries on incorrect below threshold', () => {
    const decision = determineNextAction(
      createInitialState(),
      baseUnit,
      { type: 'INCORRECT' },
      { type: 'NOT_MASTERED' },
      rules
    );
    assert.strictEqual(decision.type, 'RETRY');
  });

  it('triggers recovery on repeated mistakes above threshold', () => {
    let state = createInitialState();
    state = recordMistake(state, 'error1');
    state = recordMistake(state, 'error1');
    state = recordMistake(state, 'error1'); // 3 mistakes

    const decision = determineNextAction(
      state,
      baseUnit,
      { type: 'INCORRECT', matchedMistakePattern: 'error1' },
      { type: 'NOT_MASTERED' },
      rules
    );
    assert.strictEqual(decision.type, 'RECOVERY');
    assert.strictEqual(decision.nextUnitId, 'drill-1');
  });

  it('triggers recovery on generic retries above limit', () => {
    let state = createInitialState();
    for(let i=0; i<5; i++) {
      state = incrementRetryCount(state);
    }

    const decision = determineNextAction(
      state,
      baseUnit,
      { type: 'INCORRECT' },
      { type: 'NOT_MASTERED' },
      rules
    );
    assert.strictEqual(decision.type, 'RECOVERY');
    assert.strictEqual(decision.nextUnitId, 'drill-1');
  });
});
