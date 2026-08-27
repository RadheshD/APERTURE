'use client';

import React from 'react';
import type { ContentUnit } from '@/domain/content-unit';

import { CuriosityExercise } from './exercises/CuriosityExercise';
import { HierarchyExercise } from './exercises/HierarchyExercise';
import { SpacingExercise } from './exercises/SpacingExercise';
import { DiagnoseExercise } from './exercises/DiagnoseExercise';
import { FixExercise } from './exercises/FixExercise';
import { BuildExercise } from './exercises/BuildExercise';
import { ReflectionExercise } from './exercises/ReflectionExercise';

interface ExerciseCanvasProps {
  unit: ContentUnit;
  onDiscovery: () => void;
}

export function ExerciseCanvas({ unit, onDiscovery }: ExerciseCanvasProps) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', height: '100%' }}>
      <div style={{
        padding: 'var(--space-3) var(--space-4)',
        borderBottom: '1px solid var(--surface-border)',
        backgroundColor: 'var(--background)'
      }}>
        <h1 
          style={{ 
            fontSize: 'var(--font-size-body)', 
            color: 'var(--text-muted)',
            fontWeight: 'var(--font-weight-normal)',
            maxWidth: '800px',
            lineHeight: 1.5
          }}
        >
          {unit.initialExperience.prompt}
        </h1>
      </div>
      
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'var(--surface)',
        position: 'relative',
        overflow: 'auto',
        padding: 'var(--space-4)'
      }}>
        {unit.id === 'p0-unit-0-curiosity' && <CuriosityExercise onComplete={onDiscovery} />}
        {unit.id === 'p0-unit-1-hierarchy' && <HierarchyExercise onComplete={onDiscovery} />}
        {unit.id === 'p0-unit-2-spacing' && <SpacingExercise onComplete={onDiscovery} />}
        {unit.id === 'p0-unit-3-diagnose' && <DiagnoseExercise onComplete={onDiscovery} />}
        {unit.id === 'p0-unit-4-fix' && <FixExercise onComplete={onDiscovery} />}
        {unit.id === 'p0-unit-5-build-tiny-screen' && <BuildExercise onComplete={onDiscovery} />}
        {unit.id === 'p0-unit-6-reflection' && <ReflectionExercise onComplete={onDiscovery} />}
      </div>
    </div>
  );
}
