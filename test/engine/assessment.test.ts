import { describe, it } from 'node:test';
import assert from 'node:assert';
import { evaluateAttempt, LearnerAttempt, AssessmentContext } from '../../src/engine/assessment';
import { ContentUnit } from '../../src/domain/content-unit';
import { createInitialState } from '../../src/engine/learner-state';

describe('Assessment', () => {
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
    recoveryPath: { triggerCondition: '', targetedDrillId: '' },
    assessmentCriteria: { competencyType: 'MANIPULATION', rubric: [''] },
    masteryCriteria: { minimumRung: 5, requiresUnaidedSuccess: false },
    nextRecommendedUnitIds: []
  };

  const context: AssessmentContext = {
    unit: mockUnit,
    learnerState: createInitialState(),
  };

  it('evaluates success correctly', () => {
    const attempt: LearnerAttempt = { state: { padding: 16 }, actionType: 'SUBMIT', elapsedTimeMs: 1000 };
    const result = evaluateAttempt(context, attempt);
    assert.strictEqual(result.type, 'SUCCESS');
  });

  it('evaluates specific mistake correctly', () => {
    const attempt: LearnerAttempt = { state: { mistake: 'padding-too-small' }, actionType: 'SUBMIT', elapsedTimeMs: 1000 };
    const result = evaluateAttempt(context, attempt);
    assert.strictEqual(result.type, 'INCORRECT');
    assert.strictEqual(result.matchedMistakePattern, 'padding-too-small');
    assert.strictEqual(result.feedback?.whatIDid, 'Applied state matching "padding-too-small"');
  });

  it('evaluates unknown failure with fallback feedback', () => {
    const attempt: LearnerAttempt = { state: { padding: 99 }, actionType: 'SUBMIT', elapsedTimeMs: 1000 };
    const result = evaluateAttempt(context, attempt);
    assert.strictEqual(result.type, 'INCORRECT');
    assert.ok(result.feedback?.principle.includes('Spacing groups elements.'));
  });
});
