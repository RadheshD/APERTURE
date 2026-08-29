import { ContentUnit } from '../domain/content-unit';
import { LearnerState } from './learner-state';

export interface ScaffoldingState {
  guidanceLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  availableHints: number;
  constraints: string[];
}

export function deriveScaffolding(learnerState: LearnerState, unit: ContentUnit): ScaffoldingState {
  // Base level comes from the current challenge definition
  let level = unit.guidedPractice?.scaffoldingLevel || 'MEDIUM';

  // Deterministic rule-based adjustment
  const maxRepeatedMistakes = Object.values(learnerState.history.repeatedMistakes).reduce((max, count) => Math.max(max, count), 0);
  
  // If the learner is struggling heavily across recent history, bump support to HIGH
  if (level !== 'HIGH' && (maxRepeatedMistakes >= 2 || learnerState.history.retryCount >= 3)) {
    level = 'HIGH';
  }

  // If the learner is succeeding independently very fast, we could reduce scaffolding, 
  // but for safety in Stage 4 we mostly escalate on failure.
  
  // Number of hints allowed before we force a recovery drill
  const availableHints = level === 'HIGH' ? 3 : (level === 'MEDIUM' ? 1 : 0);
  const constraints = level === 'HIGH' ? ['restrict-unrelated-tools'] : [];

  return {
    guidanceLevel: level,
    availableHints,
    constraints,
  };
}
