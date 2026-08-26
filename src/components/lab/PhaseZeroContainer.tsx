'use client';

import React, { useState } from 'react';
import { PHASE_0_FIRST_THIRTY_MINUTES } from '@/domain/phase-0-data';
import { ExerciseCanvas } from './ExerciseCanvas';
import { ExplanationOverlay } from './ExplanationOverlay';

export function PhaseZeroContainer() {
  const [stepIndex, setStepIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentUnit = PHASE_0_FIRST_THIRTY_MINUTES[stepIndex];

  if (!currentUnit) {
    return (
      <div style={{ padding: 'calc(var(--grid-unit) * 4)' }}>
        <h2>Phase 0 Complete</h2>
        <p>You have finished the first 30 minutes.</p>
      </div>
    );
  }

  const handleDiscovery = () => {
    // Reveal the explanation overlay once the interaction succeeds
    setShowExplanation(true);
  };

  const handleNextStep = () => {
    setShowExplanation(false);
    setStepIndex((prev) => prev + 1);
  };

  return (
    <div style={{ flex: 1, position: 'relative', display: 'flex' }}>
      {/* 
        The ExerciseCanvas is responsible for rendering the correct interactive 
        elements based on the unit's initialExperience payload.
      */}
      <ExerciseCanvas 
        key={currentUnit.id} 
        unit={currentUnit} 
        onDiscovery={handleDiscovery} 
      />

      {showExplanation && (
        <ExplanationOverlay 
          explanation={currentUnit.explanation} 
          onContinue={handleNextStep} 
        />
      )}
    </div>
  );
}
