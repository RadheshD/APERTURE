'use client';

import React, { useState, useEffect } from 'react';

interface FixExerciseProps {
  onComplete: () => void;
}

export function FixExercise({ onComplete }: FixExerciseProps) {
  const [padding, setPadding] = useState(4);
  const [contrast, setContrast] = useState(1); // 1 is low contrast, 5 is high contrast
  const [hierarchy, setHierarchy] = useState('inverted'); // 'inverted' or 'correct'
  const [isDiscovered, setIsDiscovered] = useState(false);

  useEffect(() => {
    if (padding === 16 && contrast >= 4 && hierarchy === 'correct' && !isDiscovered) {
      setIsDiscovered(true);
      setTimeout(() => onComplete(), 1000);
    }
  }, [padding, contrast, hierarchy, isDiscovered, onComplete]);

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
      {/* Target UI to fix */}
      <div style={{
        width: '100%',
        backgroundColor: 'var(--background)',
        border: '1px solid var(--surface-border)',
        borderRadius: 'var(--space-2)',
        padding: `${padding}px`,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        transition: 'padding var(--duration-fast) var(--ease-out-expo)'
      }}>
        <div style={{ 
          padding: '12px', 
          backgroundColor: 'var(--surface)', 
          color: contrast >= 4 ? 'var(--foreground)' : '#444444',
          borderRadius: 'var(--space-1)',
          transition: 'color var(--duration-fast) var(--ease-in-out-smooth)'
        }}>
          <h3 style={{ fontSize: 'var(--font-size-h3)', fontWeight: 'var(--font-weight-semibold)' }}>Headline Text</h3>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: 'var(--space-2)',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {hierarchy === 'correct' ? (
            <>
              <button style={{ padding: '8px 16px', fontSize: 'var(--font-size-small)', color: 'var(--text-muted)' }}>
                Cancel
              </button>
              <button style={{ padding: '8px 16px', fontSize: 'var(--font-size-small)', backgroundColor: 'var(--accent)', color: 'var(--background)', fontWeight: 'var(--font-weight-semibold)', borderRadius: '4px' }}>
                Submit
              </button>
            </>
          ) : (
            <>
              <button style={{ padding: '12px 24px', fontSize: 'var(--font-size-body)', backgroundColor: 'var(--color-error)', color: 'white', fontWeight: 'bold', borderRadius: '4px' }}>
                Cancel
              </button>
              <button style={{ padding: '4px 8px', fontSize: '0.75rem', backgroundColor: '#e0e0e0', color: 'black', borderRadius: '2px' }}>
                Submit
              </button>
            </>
          )}
        </div>
      </div>

      {/* Repair Panel */}
      <div style={{ 
        width: '100%', 
        backgroundColor: 'var(--background)', 
        padding: 'var(--space-3)',
        borderRadius: 'var(--space-1)',
        border: '1px solid var(--surface-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-small)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Fix Spacing (Padding): {padding}px</span>
            {padding === 16 && <span style={{ color: 'var(--color-success)', fontWeight: 'var(--font-weight-medium)' }}>✓ Fixed</span>}
          </div>
          <input 
            id="fix-padding-slider"
            aria-label="Fix container padding slider"
            type="range" 
            min="4" 
            max="24" 
            step="4" 
            value={padding} 
            onChange={(e) => setPadding(parseInt(e.target.value))}
            disabled={isDiscovered}
            style={{ width: '100%', cursor: isDiscovered ? 'default' : 'ew-resize' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-small)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Fix Contrast: {contrast < 4 ? 'Low' : 'Good'}</span>
            {contrast >= 4 && <span style={{ color: 'var(--color-success)', fontWeight: 'var(--font-weight-medium)' }}>✓ Fixed</span>}
          </div>
          <input 
            id="fix-contrast-slider"
            aria-label="Fix text contrast slider"
            type="range" 
            min="1" 
            max="5" 
            value={contrast} 
            onChange={(e) => setContrast(parseInt(e.target.value))}
            disabled={isDiscovered}
            style={{ width: '100%', cursor: isDiscovered ? 'default' : 'ew-resize' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-small)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Button Hierarchy</span>
            {hierarchy === 'correct' && <span style={{ color: 'var(--color-success)', fontWeight: 'var(--font-weight-medium)' }}>✓ Fixed</span>}
          </div>
          <select 
            id="fix-hierarchy-select"
            aria-label="Fix button hierarchy select option"
            value={hierarchy} 
            onChange={(e) => setHierarchy(e.target.value)}
            disabled={isDiscovered}
            style={{
              backgroundColor: 'var(--surface)',
              color: 'var(--foreground)',
              border: '1px solid var(--surface-border)',
              padding: '8px',
              borderRadius: '4px',
              outline: 'none',
              cursor: isDiscovered ? 'default' : 'pointer'
            }}
          >
            <option value="inverted">Inverted (Secondary dominates)</option>
            <option value="correct">Correct (Primary dominates)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
