import { describe, it } from 'node:test';
import assert from 'node:assert';
import { InMemoryTelemetryRecorder } from '../../src/engine/telemetry';

describe('TelemetryRecorder', () => {
  it('should record events with a timestamp', () => {
    const recorder = new InMemoryTelemetryRecorder();
    
    recorder.record({
      type: 'challenge_started',
      payload: { unitId: 'unit-1' }
    });

    const events = recorder.getEvents();
    assert.strictEqual(events.length, 1);
    assert.strictEqual(events[0].type, 'challenge_started');
    assert.deepStrictEqual(events[0].payload, { unitId: 'unit-1' });
    assert.ok(typeof events[0].timestamp === 'number');
  });

  it('should return a copy of events array', () => {
    const recorder = new InMemoryTelemetryRecorder();
    recorder.record({ type: 'hint_requested', payload: {} });
    
    const events = recorder.getEvents();
    events.push({ type: 'challenge_started', timestamp: 0, payload: {} }); // Should not affect internal state

    assert.strictEqual(recorder.getEvents().length, 1);
  });
});
