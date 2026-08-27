'use client';

import React, { useState, useEffect } from 'react';

interface CuriosityExerciseProps {
  onComplete: () => void;
}

export function CuriosityExercise({ onComplete }: CuriosityExerciseProps) {
  const [scale, setScale] = useState(1);
  const [isDiscovered, setIsDiscovered] = useState(false);

  useEffect(() => {
    if (scale >= 1.5 && !isDiscovered) {
      setIsDiscovered(true);
      setTimeout(() => onComplete(), 500); // Small delay for tactile feel
    }
  }, [scale, isDiscovered, onComplete]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: 'var(--space-5)',
      width: '100%',
      padding: 'var(--space-3)'
    }}>
      {/* The UI Card */}
      <div style={{
        width: '100%',
        maxWidth: '320px',
        backgroundColor: 'var(--background)',
        border: '1px solid var(--surface-border)',
        borderRadius: 'var(--space-2)',
        padding: 'var(--space-3)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }}>
        <div style={{ width: '100%', height: '120px', backgroundColor: 'var(--surface)', borderRadius: 'var(--space-1)' }} />
        <div style={{ width: '60%', height: '24px', backgroundColor: 'var(--surface-border)', borderRadius: '4px' }} />
        <div style={{ width: '90%', height: '16px', backgroundColor: 'var(--surface)', borderRadius: '4px' }} />
        <div style={{ width: '80%', height: '16px', backgroundColor: 'var(--surface)', borderRadius: '4px' }} />
        
        <button 
          aria-label="Continue Button"
          style={{
            marginTop: 'var(--space-2)',
            padding: 'calc(var(--space-1) * 1.5)',
            backgroundColor: 'var(--foreground)',
            color: 'var(--background)',
            fontWeight: 'var(--font-weight-semibold)',
            borderRadius: 'var(--space-1)',
            transform: `scale(${scale})`,
            transformOrigin: 'center',
            transition: 'transform var(--duration-fast) var(--ease-out-expo), background-color var(--duration-normal) var(--ease-in-out-smooth)',
            ...(isDiscovered ? { backgroundColor: 'var(--accent)' } : {})
          }}
        >
          Continue
        </button>
      </div>

      {/* The Interaction Control */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', alignItems: 'center', width: '100%' }}>
        <label 
          htmlFor="emphasis-slider"
          style={{ 
            fontSize: 'var(--font-size-small)', 
            color: 'var(--text-muted)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em' 
          }}
        >
          Adjust Emphasis
        </label>
        <input 
          id="emphasis-slider"
          type="range" 
          min="1" 
          max="2" 
          step="0.05" 
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))}
          disabled={isDiscovered}
          style={{ width: '100%', maxWidth: '200px', cursor: isDiscovered ? 'default' : 'ew-resize' }}
        />
      </div>
    </div>
  );
}
