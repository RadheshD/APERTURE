import { describe, it } from 'node:test';
import assert from 'node:assert';
import { ChallengeEngine } from '../../src/engine/orchestrator';
import { InMemoryTelemetryRecorder } from '../../src/engine/telemetry';
import { createInitialState } from '../../src/engine/learner-state';
import { ContentUnit } from '../../src/domain/content-unit';

describe('ChallengeEngine Orchestrator', () => {
  const telemetry = new InMemoryTelemetryRecorder();
  const engine = new ChallengeEngine(telemetry, { routingRules: { recoveryThreshold: 3, retryLimit: 5 } });

  const mockUnit: ContentUnit = {
    id: 'unit-1',
    phaseId: 'PHASE_1_TRAIN_THE_EYE',
    competencyNodeIds: ['vis-spacing'],
    objective: 'Test',
    prerequisites: [],
    initialExperience: { type: 'INTERACT', prompt: 'prompt', initialState: {} },
    explanation: { concept: 'Spacing', visualDemonstration: 'url', keyTakeaway: 'Spacing groups elements.' },
    guidedPractice: {
      task: 'Fix spacing',
      scaffoldingLevel: 'HIGH',
      targetState: { padding: 16 }
    },
    independentPractice: { task: 'Test', unsupportedSuccessCriteria: [] },
    commonMistakes: [
      {
        pattern: 'padding-too-small',
        explanation: 'Not enough whitespace'
      }
    ],
    hints: [],
    recoveryPath: { triggerCondition: '', targetedDrillId: 'drill-1' },
    assessmentCriteria: { competencyType: 'MANIPULATION', rubric: [''] },
    masteryCriteria: { minimumRung: 5, requiresUnaidedSuccess: false },
    nextRecommendedUnitIds: ['next-1']
  };

  it('completes the full loop for a success', () => {
    let state = createInitialState();
    
    const response = engine.processAttempt(mockUnit, state, { state: { padding: 16 }, actionType: 'SUBMIT', elapsedTimeMs: 1000 });
    
    assert.strictEqual(response.assessmentResult.type, 'SUCCESS');
    assert.strictEqual(response.masteryResult.type, 'TRANSFER_REQUIRED');
    assert.strictEqual(response.routingDecision.type, 'TRANSFER');
    assert.strictEqual(response.routingDecision.nextUnitId, 'next-1');
    
    assert.strictEqual(response.state.competencies['vis-spacing'].currentRung, 5);
    
    const events = telemetry.getEvents();
    assert.ok(events.find(e => e.type === 'challenge_completed'));
    assert.ok(events.find(e => e.type === 'mastery_checked'));
    assert.ok(events.find(e => e.type === 'competency_updated'));
    assert.ok(events.find(e => e.type === 'transfer_started'));
  });
});
