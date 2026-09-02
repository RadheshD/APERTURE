'use client';

import React, { useState, useMemo } from 'react';
import {
  BuilderCanvasState,
  BuilderElement,
  ContainerId,
  ElementEmphasis,
  GridSpacing,
  deriveCanvasAssessmentState,
  reorderElements,
  updateElementContainer,
  updateElementEmphasis,
  updateElementSpacing,
  UNIT_3_1_HIERARCHY,
  UNIT_3_2_SPACING,
  UNIT_3_3_SYNTHESIS,
} from '../../domain/phase-3-builder-data';

import { ContentUnit } from '../../domain/content-unit';
import { createInitialState, LearnerState } from '../../engine/learner-state';
import { InMemoryTelemetryRecorder } from '../../engine/telemetry';
import { ChallengeEngine } from '../../engine/orchestrator';
import { deriveScaffolding } from '../../engine/scaffolding';
import { AssessmentResult } from '../../engine/assessment';
import { RoutingDecision } from '../../engine/router';
import { BuilderCanvas } from './BuilderCanvas';
import { BuilderControls } from './BuilderControls';

const UNIT_MAP: Record<string, ContentUnit> = {
  UNIT_3_1_HIERARCHY,
  UNIT_3_2_SPACING,
  UNIT_3_3_SYNTHESIS,
};

export const BuilderContainer: React.FC = () => {
  const [currentUnitId, setCurrentUnitId] = useState<string>('UNIT_3_1_HIERARCHY');
  const currentUnit = UNIT_MAP[currentUnitId] || UNIT_3_1_HIERARCHY;

  const [learnerState, setLearnerState] = useState<LearnerState>(() => createInitialState());

  const initialElements = useMemo(() => {
    return (currentUnit.initialExperience.initialState.elements as BuilderElement[]) || [];
  }, [currentUnit]);

  const [builderState, setBuilderState] = useState<BuilderCanvasState>(() => ({
    elements: initialElements,
    selectedElementId: initialElements[0]?.id || null,
  }));

  const loadUnit = (unitId: string) => {
    const unit = UNIT_MAP[unitId];
    if (unit) {
      setCurrentUnitId(unitId);
      const els = (unit.initialExperience.initialState.elements as BuilderElement[]) || [];
      setBuilderState({
        elements: els,
        selectedElementId: els[0]?.id || null,
      });
      setAssessmentResult(null);
      setRoutingDecision(null);
    }
  };

  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [routingDecision, setRoutingDecision] = useState<RoutingDecision | null>(null);

  const { engine } = useMemo(() => {
    const telemetry = new InMemoryTelemetryRecorder();
    const eng = new ChallengeEngine(telemetry, {
      routingRules: { recoveryThreshold: 3, retryLimit: 5 },
    });
    return { engine: eng };
  }, []);

  const scaffolding = deriveScaffolding(learnerState, currentUnit);

  const handleSelectElement = (elementId: string) => {
    setBuilderState((prev) => ({ ...prev, selectedElementId: elementId }));
  };

  const handleReorder = (fromIdx: number, toIdx: number) => {
    setBuilderState((prev) => reorderElements(prev, fromIdx, toIdx));
  };

  const handleUpdateEmphasis = (elementId: string, emphasis: ElementEmphasis) => {
    setBuilderState((prev) => updateElementEmphasis(prev, elementId, emphasis));
  };

  const handleUpdateSpacing = (elementId: string, spacingBelow: GridSpacing) => {
    setBuilderState((prev) => updateElementSpacing(prev, elementId, spacingBelow));
  };

  const handleUpdateContainer = (elementId: string, containerId: ContainerId) => {
    setBuilderState((prev) => updateElementContainer(prev, elementId, containerId));
  };

  const handleSubmitAttempt = () => {
    const derivedAssessment = deriveCanvasAssessmentState(builderState, currentUnit.id);

    const attempt = {
      state: derivedAssessment as unknown as Record<string, unknown>,
      actionType: 'SUBMIT' as const,
      elapsedTimeMs: 1200,
    };

    const response = engine.processAttempt(currentUnit, learnerState, attempt);

    setLearnerState(response.state);
    setAssessmentResult(response.assessmentResult);
    setRoutingDecision(response.routingDecision);
  };

  const handleNextUnit = () => {
    if (routingDecision?.nextUnitId && UNIT_MAP[routingDecision.nextUnitId]) {
      loadUnit(routingDecision.nextUnitId);
    } else {
      setAssessmentResult(null);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'calc(var(--grid-unit, 8px) * 3)',
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: 'calc(var(--grid-unit, 8px) * 3)',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          paddingBottom: 'calc(var(--grid-unit, 8px) * 2)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent, #3b82f6)',
            }}
          >
            Phase 3: Interface Builder • Unit Progression
          </span>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '4px 0 0 0' }}>{currentUnit.objective}</h1>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {Object.keys(UNIT_MAP).map((uId, idx) => (
            <button
              key={uId}
              type="button"
              onClick={() => loadUnit(uId)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: currentUnitId === uId ? '1px solid var(--accent, #3b82f6)' : '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: currentUnitId === uId ? 'var(--accent, #3b82f6)' : 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                fontWeight: currentUnitId === uId ? 600 : 400,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              Unit {idx + 1}
            </button>
          ))}
        </div>
      </header>

      <section
        aria-label="Guided Task Prompt"
        style={{
          padding: 'calc(var(--grid-unit, 8px) * 2)',
          borderRadius: 'calc(var(--grid-unit, 8px) * 1.5)',
          backgroundColor: 'rgba(59, 130, 246, 0.08)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <strong style={{ color: 'var(--accent, #3b82f6)' }}>Task: </strong>
          {currentUnit.guidedPractice.task}
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: scaffolding.guidanceLevel === 'HIGH' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.1)',
            color: scaffolding.guidanceLevel === 'HIGH' ? '#f87171' : 'var(--text-muted, #94a3b8)',
          }}
        >
          Scaffolding: {scaffolding.guidanceLevel}
        </span>
      </section>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'calc(var(--grid-unit, 8px) * 3)',
          alignItems: 'start',
        }}
      >
        <BuilderCanvas state={builderState} onSelectElement={handleSelectElement} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--grid-unit, 8px) * 2)' }}>
          <BuilderControls
            state={builderState}
            onReorder={handleReorder}
            onUpdateEmphasis={handleUpdateEmphasis}
            onUpdateSpacing={handleUpdateSpacing}
            onUpdateContainer={handleUpdateContainer}
          />

          <button
            type="button"
            onClick={handleSubmitAttempt}
            style={{
              padding: 'calc(var(--grid-unit, 8px) * 2)',
              borderRadius: 'calc(var(--grid-unit, 8px) * 1)',
              backgroundColor: 'var(--foreground)',
              color: 'var(--background)',
              fontWeight: 600,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.15s ease',
            }}
          >
            Submit Layout
          </button>
        </div>
      </div>

      <div aria-live="polite" className="sr-only">
        {assessmentResult &&
          (assessmentResult.type === 'SUCCESS'
            ? 'Assessment Succeeded! Layout meets design principles.'
            : 'Assessment failed. Review feedback to adjust layout.')}
      </div>

      {assessmentResult && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-title"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(9, 13, 22, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '16px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '520px',
              padding: 'calc(var(--grid-unit, 8px) * 3)',
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: assessmentResult.type === 'SUCCESS' ? '1px solid #10b981' : '1px solid #ef4444',
              borderRadius: 'calc(var(--grid-unit, 8px) * 2)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <h2
              id="feedback-title"
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: assessmentResult.type === 'SUCCESS' ? '#34d399' : '#f87171',
                margin: 0,
              }}
            >
              {assessmentResult.type === 'SUCCESS' ? 'Layout Verified!' : 'Adjustment Needed'}
            </h2>

            {assessmentResult.feedback && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
                <div><strong>Observation:</strong> {assessmentResult.feedback.whatHappened}</div>
                <div><strong>Reasoning:</strong> {assessmentResult.feedback.whyItHappened}</div>
                <div><strong>Principle:</strong> {assessmentResult.feedback.principle}</div>
                <div><strong>Next Steps:</strong> {assessmentResult.feedback.whatToTryNext}</div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => setAssessmentResult(null)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                Adjust Layout
              </button>
              {assessmentResult.type === 'SUCCESS' && routingDecision?.nextUnitId && (
                <button
                  type="button"
                  onClick={handleNextUnit}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: 'var(--accent, #3b82f6)',
                    color: '#ffffff',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Proceed to Next Unit →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
