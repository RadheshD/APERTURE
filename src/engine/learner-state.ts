import { RungNumber } from '../domain/competency';

export interface CompetencyEvidence {
  nodeId: string;
  currentRung: RungNumber;
  hasDemonstratedTransfer: boolean;
}

export interface AttemptRecord {
  unitId: string;
  success: boolean;
  timestamp: number;
}

export interface LearnerState {
  competencies: Record<string, CompetencyEvidence>;
  history: {
    recentAttempts: AttemptRecord[];
    repeatedMistakes: Record<string, number>;
    hintUsageCount: number;
    retryCount: number;
  };
  activeRecovery: {
    unitId: string | null;
  };
}

export function createInitialState(): LearnerState {
  return {
    competencies: {},
    history: {
      recentAttempts: [],
      repeatedMistakes: {},
      hintUsageCount: 0,
      retryCount: 0,
    },
    activeRecovery: {
      unitId: null,
    },
  };
}

export function incrementHintUsage(state: LearnerState): LearnerState {
  return {
    ...state,
    history: {
      ...state.history,
      hintUsageCount: state.history.hintUsageCount + 1,
    },
  };
}

export function incrementRetryCount(state: LearnerState): LearnerState {
  return {
    ...state,
    history: {
      ...state.history,
      retryCount: state.history.retryCount + 1,
    },
  };
}

export function recordAttempt(state: LearnerState, unitId: string, success: boolean): LearnerState {
  const newAttempt: AttemptRecord = { unitId, success, timestamp: Date.now() };
  return {
    ...state,
    history: {
      ...state.history,
      recentAttempts: [...state.history.recentAttempts, newAttempt].slice(-50), // keep last 50
    },
  };
}

export function recordMistake(state: LearnerState, mistakePattern: string): LearnerState {
  const currentCount = state.history.repeatedMistakes[mistakePattern] || 0;
  return {
    ...state,
    history: {
      ...state.history,
      repeatedMistakes: {
        ...state.history.repeatedMistakes,
        [mistakePattern]: currentCount + 1,
      },
    },
  };
}

export function updateCompetency(
  state: LearnerState,
  nodeId: string,
  newRung: RungNumber,
  transferSuccess: boolean
): LearnerState {
  const existing = state.competencies[nodeId] || { nodeId, currentRung: 0, hasDemonstratedTransfer: false };
  
  // Rungs are cumulative, don't degrade
  const maxRung = Math.max(existing.currentRung, newRung) as RungNumber;
  
  return {
    ...state,
    competencies: {
      ...state.competencies,
      [nodeId]: {
        nodeId,
        currentRung: maxRung,
        hasDemonstratedTransfer: existing.hasDemonstratedTransfer || transferSuccess,
      },
    },
  };
}

export function setActiveRecovery(state: LearnerState, unitId: string | null): LearnerState {
  return {
    ...state,
    activeRecovery: { unitId },
  };
}

export function clearMistakesForPattern(state: LearnerState, mistakePattern: string): LearnerState {
  const newMistakes = { ...state.history.repeatedMistakes };
  delete newMistakes[mistakePattern];
  return {
    ...state,
    history: {
      ...state.history,
      repeatedMistakes: newMistakes,
    },
  };
}
