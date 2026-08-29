import { ContentUnit } from '../domain/content-unit';
import { LearnerState } from './learner-state';
import { MasteryResult } from './mastery';
import { AssessmentResult } from './assessment';

export interface RoutingRules {
  recoveryThreshold: number; // e.g. 3 repeated mistakes
  retryLimit: number; // e.g. 5 retries on the same challenge
}

export type RoutingActionType = 'PROCEED' | 'RETRY' | 'RECOVERY' | 'TRANSFER' | 'STAY';

export interface RoutingDecision {
  type: RoutingActionType;
  nextUnitId?: string;
}

export function determineNextAction(
  learnerState: LearnerState,
  currentUnit: ContentUnit,
  assessmentResult: AssessmentResult,
  masteryResult: MasteryResult,
  rules: RoutingRules
): RoutingDecision {
  
  if (assessmentResult.type === 'SUCCESS') {
    if (masteryResult.type === 'TRANSFER_REQUIRED') {
      return { type: 'TRANSFER', nextUnitId: currentUnit.nextRecommendedUnitIds[0] };
    }
    
    if (masteryResult.type === 'MASTERED' || masteryResult.type === 'PRACTICE_REQUIRED') {
      return { type: 'PROCEED', nextUnitId: currentUnit.nextRecommendedUnitIds[0] };
    }
  }

  // Handle failure cases
  if (assessmentResult.type === 'INCORRECT' || assessmentResult.type === 'PARTIAL_SUCCESS') {
    // Check if recovery is triggered based on a specific mistake pattern
    if (assessmentResult.matchedMistakePattern) {
      const mistakeCount = learnerState.history.repeatedMistakes[assessmentResult.matchedMistakePattern] || 0;
      if (mistakeCount >= rules.recoveryThreshold) {
        if (currentUnit.recoveryPath?.targetedDrillId) {
          return { type: 'RECOVERY', nextUnitId: currentUnit.recoveryPath.targetedDrillId };
        }
      }
    }

    // Check generic retry limit
    if (learnerState.history.retryCount >= rules.retryLimit) {
      if (currentUnit.recoveryPath?.targetedDrillId) {
        return { type: 'RECOVERY', nextUnitId: currentUnit.recoveryPath.targetedDrillId };
      }
    }

    // Otherwise, allow retry
    return { type: 'RETRY' };
  }

  return { type: 'STAY' };
}
