export const ENGINE_EVENT_TYPES = [
  'challenge_started',
  'interaction_recorded',
  'hint_requested',
  'attempt_submitted',
  'attempt_failed',
  'attempt_retried',
  'feedback_shown',
  'recovery_triggered',
  'challenge_completed',
  'competency_updated',
  'mastery_checked',
  'transfer_started',
  'transfer_completed',
  'confusion_detected',
] as const;

export type EngineEventType = (typeof ENGINE_EVENT_TYPES)[number];

export interface TelemetryEvent {
  type: EngineEventType;
  timestamp: number;
  payload: Record<string, unknown>;
}

export interface TelemetryRecorder {
  record(event: Omit<TelemetryEvent, 'timestamp'>): void;
  getEvents(): TelemetryEvent[];
}

export class InMemoryTelemetryRecorder implements TelemetryRecorder {
  private events: TelemetryEvent[] = [];

  record(event: Omit<TelemetryEvent, 'timestamp'>): void {
    this.events.push({
      ...event,
      timestamp: Date.now(),
    });
  }

  getEvents(): TelemetryEvent[] {
    return [...this.events];
  }
}
