import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  UNIT_3_1_HIERARCHY,
  UNIT_3_2_SPACING,
  UNIT_3_3_SYNTHESIS,
} from '../../src/domain/phase-3-builder-data';
import { createInitialState } from '../../src/engine/learner-state';
import { InMemoryTelemetryRecorder } from '../../src/engine/telemetry';
import { ChallengeEngine } from '../../src/engine/orchestrator';
import { deriveScaffolding } from '../../src/engine/scaffolding';

describe('Phase 3 Builder & Stage 4 ChallengeEngine Integration', () => {
  const telemetry = new InMemoryTelemetryRecorder();
  const engine = new ChallengeEngine(telemetry, {
    routingRules: { recoveryThreshold: 3, retryLimit: 5 },
  });

  it('processes successful Unit 1 attempt and routes to TRANSFER', () => {
    const initialState = createInitialState();
    const successfulAttempt = {
      state: {
        hierarchyCorrect: true,
        primaryActionDominant: true,
      },
      actionType: 'SUBMIT' as const,
      elapsedTimeMs: 1000,
    };

    const response = engine.processAttempt(UNIT_3_1_HIERARCHY, initialState, successfulAttempt);
    assert.equal(response.assessmentResult.type, 'SUCCESS');
    assert.equal(response.masteryResult.type, 'TRANSFER_REQUIRED');
    assert.equal(response.routingDecision.type, 'TRANSFER');
    assert.equal(response.routingDecision.nextUnitId, 'UNIT_3_2_SPACING');
  });

  it('processes successful Unit 3 (Transfer) attempt and routes to PROCEED', () => {
    const initialState = createInitialState();
    const successfulAttempt = {
      state: {
        hierarchyCorrect: true,
        primaryActionDominant: true,
        spatialRhythmCorrect: true,
        groupingCorrect: true,
      },
      actionType: 'SUBMIT' as const,
      elapsedTimeMs: 1500,
    };

    const response = engine.processAttempt(UNIT_3_3_SYNTHESIS, initialState, successfulAttempt);
    assert.equal(response.assessmentResult.type, 'SUCCESS');
    assert.equal(response.masteryResult.type, 'MASTERED');
    assert.equal(response.routingDecision.type, 'PROCEED');
  });

  it('triggers RECOVERY routing upon reaching repeated mistake threshold', () => {
    let state = createInitialState();
    const failedAttempt = {
      state: { mistake: 'inverted_hierarchy' },
      actionType: 'SUBMIT' as const,
      elapsedTimeMs: 800,
    };

    for (let i = 0; i < 3; i++) {
      const response = engine.processAttempt(UNIT_3_1_HIERARCHY, state, failedAttempt);
      state = response.state;
      if (i === 2) {
        assert.equal(response.routingDecision.type, 'RECOVERY');
        assert.equal(response.routingDecision.nextUnitId, 'DRILL_HIERARCHY_RECOVERY');
      }
    }
  });

  it('escalates scaffolding level to HIGH when learner struggles', () => {
    let state = createInitialState();
    const failedAttempt = {
      state: { mistake: 'loose_internal_spacing' },
      actionType: 'SUBMIT' as const,
      elapsedTimeMs: 900,
    };

    assert.equal(deriveScaffolding(state, UNIT_3_2_SPACING).guidanceLevel, 'MEDIUM');

    state = engine.processAttempt(UNIT_3_2_SPACING, state, failedAttempt).state;
    state = engine.processAttempt(UNIT_3_2_SPACING, state, failedAttempt).state;

    assert.equal(deriveScaffolding(state, UNIT_3_2_SPACING).guidanceLevel, 'HIGH');
  });
});
