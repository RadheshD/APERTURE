import { describe, it } from 'node:test';
import assert from 'node:assert';
import { evaluateMastery } from '../../src/engine/mastery';
import { ContentUnit } from '../../src/domain/content-unit';
import { createInitialState } from '../../src/engine/learner-state';

describe('Mastery Evaluation', () => {
  const baseUnit: ContentUnit = {
    id: 'u1',
    phaseId: 'PHASE_1_TRAIN_THE_EYE',
    competencyNodeIds: ['vis-spacing'],
    objective: '',
    prerequisites: [],
    initialExperience: { type: 'INTERACT', prompt: '', initialState: {} },
    explanation: { concept: '', visualDemonstration: '', keyTakeaway: '' },
    guidedPractice: { task: '', scaffoldingLevel: 'LOW', targetState: {} },
    independentPractice: { task: '', unsupportedSuccessCriteria: [] },
    commonMistakes: [],
    hints: [],
    recoveryPath: { triggerCondition: '', targetedDrillId: '' },
    assessmentCriteria: { competencyType: 'MANIPULATION', rubric: [''] },
    masteryCriteria: { minimumRung: 3, requiresUnaidedSuccess: false },
    nextRecommendedUnitIds: []
  };

  it('returns NOT_MASTERED if assessment is not success', () => {
    const result = evaluateMastery(baseUnit, createInitialState(), { type: 'INCORRECT' });
    assert.strictEqual(result.type, 'NOT_MASTERED');
  });

  it('requires transfer for new mastery', () => {
    // Succeeded on a MANIPULATION task
    const result = evaluateMastery(baseUnit, createInitialState(), { type: 'SUCCESS' });
    assert.strictEqual(result.type, 'TRANSFER_REQUIRED');
    assert.strictEqual(result.rungAchieved, 3);
    assert.strictEqual(result.transferSuccess, false);
  });

  it('grants mastery on successful transfer unit', () => {
    const transferUnit = { ...baseUnit, assessmentCriteria: { competencyType: 'TRANSFER' as const, rubric: [''] } };
    const result = evaluateMastery(transferUnit, createInitialState(), { type: 'SUCCESS' });
    
    assert.strictEqual(result.type, 'MASTERED');
    assert.strictEqual(result.transferSuccess, true);
  });
});
