import { ContentUnit } from '../domain/content-unit';
import { LearnerState } from './learner-state';

export interface LearnerAttempt {
  state: Record<string, unknown>; // UI canvas state
  actionType: 'SUBMIT' | 'CHANGE';
  elapsedTimeMs: number;
}

export interface AssessmentContext {
  unit: ContentUnit;
  learnerState: LearnerState;
}

export interface FeedbackSequence {
  whatIDid: string;
  whatHappened: string;
  whyItHappened: string;
  principle: string;
  whatToTryNext: string;
}

export type AssessmentResultType = 'SUCCESS' | 'PARTIAL_SUCCESS' | 'INCORRECT' | 'RECOVERY_REQUIRED';

export interface AssessmentResult {
  type: AssessmentResultType;
  feedback?: FeedbackSequence;
  matchedMistakePattern?: string;
}

/**
 * Deterministically evaluates an attempt against the content unit's schema.
 */
export function evaluateAttempt(context: AssessmentContext, attempt: LearnerAttempt): AssessmentResult {
  const { unit } = context;

  // 1. Check for success based on targetState
  const targetState = unit.guidedPractice?.targetState;
  if (targetState) {
    const targetKeys = Object.keys(targetState);
    if (targetKeys.length > 0) {
      let matchCount = 0;
      for (const key of targetKeys) {
        if (JSON.stringify(targetState[key]) === JSON.stringify(attempt.state[key])) {
          matchCount++;
        }
      }

      if (matchCount === targetKeys.length) {
        return { type: 'SUCCESS' };
      } else if (matchCount > 0) {
        return { type: 'PARTIAL_SUCCESS' };
      }
    }
  }

  // 2. Check for common mistakes
  if (unit.commonMistakes && unit.commonMistakes.length > 0) {
    for (const mistake of unit.commonMistakes) {
      const isMatch = attempt.state['mistake'] === mistake.pattern || attempt.state[mistake.pattern] !== undefined;
      
      if (isMatch) {
        return {
          type: 'INCORRECT',
          matchedMistakePattern: mistake.pattern,
          feedback: {
            whatIDid: `Applied state matching "${mistake.pattern}"`,
            whatHappened: 'This triggered a known design violation.',
            whyItHappened: mistake.explanation,
            principle: unit.explanation?.keyTakeaway || 'Review the core concept.',
            whatToTryNext: unit.hints && unit.hints.length > 0 ? unit.hints[0] : 'Check the guidelines and try again.'
          }
        };
      }
    }
  }

  // 3. Fallback incorrect feedback
  return {
    type: 'INCORRECT',
    feedback: {
      whatIDid: 'Submitted an incorrect state',
      whatHappened: 'The interface did not behave as expected.',
      whyItHappened: 'The elements are not aligned with the design principle.',
      principle: unit.explanation?.keyTakeaway || 'Review the core concept.',
      whatToTryNext: 'Look closely at the visual hierarchy and try again.'
    }
  };
}
