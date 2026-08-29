import { ContentUnit } from '../domain/content-unit';
import { LearnerState } from './learner-state';
import { AssessmentResult } from './assessment';
import { RungNumber } from '../domain/competency';

export type MasteryResultType = 
  | 'MASTERED' 
  | 'TRANSFER_REQUIRED' 
  | 'PRACTICE_REQUIRED' 
  | 'NOT_MASTERED';

export interface MasteryResult {
  type: MasteryResultType;
  rungAchieved?: RungNumber;
  transferSuccess?: boolean;
}

export function evaluateMastery(
  unit: ContentUnit, 
  state: LearnerState, 
  assessmentResult: AssessmentResult
): MasteryResult {
  if (assessmentResult.type !== 'SUCCESS') {
    return { type: 'NOT_MASTERED' };
  }

  const isTransferUnit = unit.assessmentCriteria.competencyType === 'TRANSFER';
  const targetRung = unit.masteryCriteria.minimumRung as RungNumber;

  // Let's check current state across all nodes this unit teaches
  let allNodesMeetRung = true;
  let allNodesHaveTransfer = true;

  for (const nodeId of unit.competencyNodeIds) {
    const comp = state.competencies[nodeId];
    if (!comp) {
      allNodesMeetRung = false;
      allNodesHaveTransfer = false;
      continue;
    }
    if (comp.currentRung < targetRung) {
      allNodesMeetRung = false;
    }
    if (!comp.hasDemonstratedTransfer) {
      allNodesHaveTransfer = false;
    }
  }

  if (isTransferUnit) {
    // If it's a transfer unit and they succeeded, they achieve transfer!
    return { 
      type: 'MASTERED', 
      rungAchieved: targetRung, 
      transferSuccess: true 
    };
  }

  // Not a transfer unit. If they already had transfer and meet the rung, they stay mastered.
  if (allNodesMeetRung && allNodesHaveTransfer) {
    return { type: 'MASTERED', rungAchieved: targetRung, transferSuccess: true };
  }

  // If they meet the target rung requirement but haven't demonstrated transfer, require transfer.
  // Assuming a success here pushes them to the targetRung.
  return { 
    type: 'TRANSFER_REQUIRED', 
    rungAchieved: targetRung, 
    transferSuccess: false 
  };
}
