import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { CURRICULUM_PHASES, CURRICULUM_PHASE_DEFINITIONS } from '../src/domain/curriculum';
import {
  TRANSFORMATION_TIERS,
  TRANSFORMATION_RUNGS,
  ASSESSMENT_COMPETENCIES,
  COMPETENCY_NODES,
} from '../src/domain/competency';
import { ContentUnitSchema } from '../src/domain/content-unit';
import { PHASE_0_FIRST_THIRTY_MINUTES } from '../src/domain/phase-0-data';

describe('Curriculum Architecture Domain Model', () => {
  it('should define all 7 curriculum phases accurately', () => {
    assert.equal(CURRICULUM_PHASES.length, 7);
    assert.equal(CURRICULUM_PHASES[0], 'PHASE_0_FIRST_CONTACT');
    assert.equal(CURRICULUM_PHASES[6], 'PHASE_6_INDEPENDENT');
    assert.equal(CURRICULUM_PHASE_DEFINITIONS.PHASE_0_FIRST_CONTACT.numericPhase, 0);
  });
});

describe('Competency & Learner Transformation Model', () => {
  it('should define 4 tiers and all 13 transformation rungs (0 to 12)', () => {
    assert.equal(TRANSFORMATION_TIERS.length, 4);
    assert.deepEqual(TRANSFORMATION_TIERS, ['PERCEIVE', 'UNDERSTAND', 'BUILD', 'OWN']);
    
    const rungKeys = Object.keys(TRANSFORMATION_RUNGS).map(Number);
    assert.equal(rungKeys.length, 13);
    assert.equal(TRANSFORMATION_RUNGS[0].label, 'I know nothing');
    assert.equal(TRANSFORMATION_RUNGS[12].label, 'I can approach new work alone');
  });

  it('should define 6 assessment competencies', () => {
    assert.equal(ASSESSMENT_COMPETENCIES.length, 6);
    assert.deepEqual(ASSESSMENT_COMPETENCIES, [
      'RECOGNITION',
      'DIAGNOSIS',
      'MANIPULATION',
      'CREATION',
      'REASONING',
      'TRANSFER',
    ]);
  });

  it('should have valid prerequisite graph relationships in competency nodes', () => {
    for (const [nodeId, node] of Object.entries(COMPETENCY_NODES)) {
      for (const prereqId of node.prerequisiteNodeIds) {
        assert.ok(
          COMPETENCY_NODES[prereqId],
          `Prerequisite node '${prereqId}' referenced by '${nodeId}' must exist in COMPETENCY_NODES`
        );
      }
    }
  });
});

describe('CONTENT_UNIT Contract & Runtime Validation', () => {
  it('should accept valid CONTENT_UNIT objects', () => {
    const validUnit = PHASE_0_FIRST_THIRTY_MINUTES[0];
    const parseResult = ContentUnitSchema.safeParse(validUnit);
    assert.equal(parseResult.success, true);
  });

  it('should reject invalid CONTENT_UNIT objects missing required fields', () => {
    const invalidUnit = {
      id: 'invalid-unit',
      phaseId: 'INVALID_PHASE',
      objective: '',
    };
    const parseResult = ContentUnitSchema.safeParse(invalidUnit);
    assert.equal(parseResult.success, false);
  });

  it('should validate that all Phase 0 First 30 Minutes data units conform to the schema contract', () => {
    assert.equal(PHASE_0_FIRST_THIRTY_MINUTES.length, 7);
    for (const unit of PHASE_0_FIRST_THIRTY_MINUTES) {
      const parseResult = ContentUnitSchema.safeParse(unit);
      assert.ok(
        parseResult.success,
        `Phase 0 unit '${unit.id}' failed Zod validation: ${JSON.stringify(
          !parseResult.success ? parseResult.error.format() : {}
        )}`
      );
    }
  });
});
