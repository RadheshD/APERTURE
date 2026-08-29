import { ContentUnit } from '../domain/content-unit';
import { 
  LearnerState, 
  recordAttempt, 
  recordMistake, 
  incrementRetryCount, 
  updateCompetency, 
  setActiveRecovery 
} from './learner-state';
import { TelemetryRecorder } from './telemetry';
import { evaluateAttempt, LearnerAttempt, AssessmentResult } from './assessment';
import { evaluateMastery, MasteryResult } from './mastery';
import { determineNextAction, RoutingRules, RoutingDecision } from './router';

export interface EngineConfig {
  routingRules: RoutingRules;
}

export interface EngineResponse {
  state: LearnerState;
  assessmentResult: AssessmentResult;
  masteryResult: MasteryResult;
  routingDecision: RoutingDecision;
}

export class ChallengeEngine {
  constructor(
    private telemetry: TelemetryRecorder,
    private config: EngineConfig
  ) {}

  public processAttempt(unit: ContentUnit, state: LearnerState, attempt: LearnerAttempt): EngineResponse {
    this.telemetry.record({ type: 'attempt_submitted', payload: { unitId: unit.id, attempt } });

    // 1. Evaluate Attempt
    const assessmentResult = evaluateAttempt({ unit, learnerState: state }, attempt);

    // 2. Evaluate Mastery
    const masteryResult = evaluateMastery(unit, state, assessmentResult);

    // 3. Update Learner State immutably
    let nextState = recordAttempt(state, unit.id, assessmentResult.type === 'SUCCESS');

    if (assessmentResult.type === 'INCORRECT' || assessmentResult.type === 'PARTIAL_SUCCESS') {
      nextState = incrementRetryCount(nextState);
      if (assessmentResult.matchedMistakePattern) {
        nextState = recordMistake(nextState, assessmentResult.matchedMistakePattern);
      }
      this.telemetry.record({ type: 'attempt_failed', payload: { unitId: unit.id, result: assessmentResult } });
    } else if (assessmentResult.type === 'SUCCESS') {
      this.telemetry.record({ type: 'challenge_completed', payload: { unitId: unit.id } });
    }

    if (assessmentResult.feedback) {
      this.telemetry.record({ type: 'feedback_shown', payload: { unitId: unit.id, feedback: assessmentResult.feedback } });
    }

    if (masteryResult.type === 'MASTERED' || masteryResult.type === 'TRANSFER_REQUIRED') {
      this.telemetry.record({ type: 'mastery_checked', payload: { unitId: unit.id, result: masteryResult } });
      if (masteryResult.rungAchieved !== undefined) {
        for (const nodeId of unit.competencyNodeIds) {
          nextState = updateCompetency(nextState, nodeId, masteryResult.rungAchieved, masteryResult.transferSuccess || false);
          this.telemetry.record({ type: 'competency_updated', payload: { nodeId, newRung: masteryResult.rungAchieved, transfer: masteryResult.transferSuccess }});
        }
      }
    }

    // 4. Route deterministically
    const routingDecision = determineNextAction(nextState, unit, assessmentResult, masteryResult, this.config.routingRules);
    
    if (routingDecision.type === 'RECOVERY' && routingDecision.nextUnitId) {
      this.telemetry.record({ type: 'recovery_triggered', payload: { unitId: unit.id, nextUnitId: routingDecision.nextUnitId } });
      nextState = setActiveRecovery(nextState, routingDecision.nextUnitId);
    } else if (routingDecision.type === 'TRANSFER' && routingDecision.nextUnitId) {
      this.telemetry.record({ type: 'transfer_started', payload: { unitId: unit.id, nextUnitId: routingDecision.nextUnitId } });
    }

    return {
      state: nextState,
      assessmentResult,
      masteryResult,
      routingDecision,
    };
  }
}
