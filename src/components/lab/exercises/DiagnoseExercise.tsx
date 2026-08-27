'use client';

import React, { useState } from 'react';

interface DiagnoseExerciseProps {
  onComplete: () => void;
}

export function DiagnoseExercise({ onComplete }: DiagnoseExerciseProps) {
  const [foundFlaws, setFoundFlaws] = useState<{ [key: string]: boolean }>({
    contrast: false,
    hierarchy: false,
    padding: false
  });

  const allFound = foundFlaws.contrast && foundFlaws.hierarchy && foundFlaws.padding;

  const handleDiagnose = (flaw: string) => {
    if (allFound) return;
    setFoundFlaws(prev => {
      const updated = { ...prev, [flaw]: true };
      if (updated.contrast && updated.hierarchy && updated.padding) {
        setTimeout(() => onComplete(), 1000);
      }
      return updated;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, flaw: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDiagnose(flaw);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: 'var(--space-3)', 
      width: '100%', 
      maxWidth: '340px',
      padding: 'var(--space-2)'
    }}>
      <div 
        aria-live="polite"
        style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: 'var(--font-size-small)' }}
      >
        Flaws Found: {Object.values(foundFlaws).filter(Boolean).length} / 3
      </div>

      <div 
        role="button"
        tabIndex={0}
        aria-label="Cramped container padding flaw"
        onClick={() => handleDiagnose('padding')}
        onKeyDown={(e) => handleKeyDown(e, 'padding')}
        style={{
          width: '100%',
          backgroundColor: 'var(--background)',
          border: '1px solid var(--surface-border)',
          borderRadius: 'var(--space-2)',
          padding: '4px', // Cramped padding flaw (the bug itself)
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          position: 'relative',
          cursor: 'crosshair',
          outline: foundFlaws.padding ? '2px solid var(--color-success)' : 'none',
          transition: 'outline var(--duration-fast) var(--ease-out-expo)'
        }}
      >
        <div 
          role="button"
          tabIndex={0}
          aria-label="Low contrast text flaw"
          onClick={(e) => { e.stopPropagation(); handleDiagnose('contrast'); }}
          onKeyDown={(e) => { e.stopPropagation(); handleKeyDown(e, 'contrast'); }}
          style={{ 
            padding: '8px', 
            backgroundColor: '#ffffff', // Extremely light background
            color: '#e0e0e0', // Low contrast flaw
            borderRadius: '4px',
            outline: foundFlaws.contrast ? '2px solid var(--color-success)' : 'none',
            transition: 'outline var(--duration-fast) var(--ease-out-expo)'
          }}
        >
          <h3 style={{ fontSize: 'var(--font-size-body)', fontWeight: 'var(--font-weight-light)' }}>Low Contrast Title</h3>
        </div>

        <div 
          role="button"
          tabIndex={0}
          aria-label="Inverted button hierarchy flaw"
          onClick={(e) => { e.stopPropagation(); handleDiagnose('hierarchy'); }}
          onKeyDown={(e) => { e.stopPropagation(); handleKeyDown(e, 'hierarchy'); }}
          style={{ 
            display: 'flex', 
            gap: '4px',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px',
            outline: foundFlaws.hierarchy ? '2px solid var(--color-success)' : 'none',
            transition: 'outline var(--duration-fast) var(--ease-out-expo)'
          }}
        >
          {/* Inverted Hierarchy Flaw: Huge red secondary button, tiny white primary */}
          <button 
            tabIndex={-1} // Prevent inner button tab since parent is the clickable bug element
            style={{ 
              padding: '8px', 
              fontSize: '1.25rem', 
              backgroundColor: 'var(--color-error)', 
              color: 'white', 
              fontWeight: 'bold', 
              borderRadius: '4px',
              cursor: 'crosshair'
            }}
          >
            Cancel (Huge secondary)
          </button>
          <button 
            tabIndex={-1}
            style={{ 
              padding: '4px', 
              fontSize: '0.75rem', 
              backgroundColor: '#e0e0e0', 
              color: 'black', 
              borderRadius: '2px',
              cursor: 'crosshair'
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
