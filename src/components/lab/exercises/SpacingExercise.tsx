'use client';

import React, { useState, useEffect } from 'react';

interface SpacingExerciseProps {
  onComplete: () => void;
}

export function SpacingExercise({ onComplete }: SpacingExerciseProps) {
  const [padding, setPadding] = useState(2);
  const [gap, setGap] = useState(0);
  const [isDiscovered, setIsDiscovered] = useState(false);

  useEffect(() => {
    if (padding === 16 && gap === 8 && !isDiscovered) {
      setIsDiscovered(true);
      setTimeout(() => onComplete(), 800);
    }
  }, [padding, gap, isDiscovered, onComplete]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: 'var(--space-4)', 
      width: '100%', 
      maxWidth: '400px',
      padding: 'var(--space-2)'
    }}>
      <div style={{
        width: '100%',
        backgroundColor: 'var(--background)',
        border: '1px solid var(--surface-border)',
        borderRadius: 'var(--space-2)',
        padding: `${padding}px`,
        transition: 'padding var(--duration-fast) var(--ease-out-expo)',
        display: 'flex',
        flexDirection: 'column',
        gap: `${gap}px`
      }}>
        <div style={{ display: 'flex', gap: `${gap}px`, alignItems: 'center' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--surface-border)', flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ width: '50%', height: '16px', backgroundColor: 'var(--foreground)', borderRadius: '4px' }} />
            <div style={{ width: '30%', height: '12px', backgroundColor: 'var(--text-muted)', borderRadius: '4px' }} />
          </div>
        </div>
        <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--surface-border)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ width: '100%', height: '12px', backgroundColor: 'var(--surface-border)', borderRadius: '4px' }} />
          <div style={{ width: '90%', height: '12px', backgroundColor: 'var(--surface-border)', borderRadius: '4px' }} />
        </div>
      </div>

      <div style={{ 
        width: '100%', 
        backgroundColor: 'var(--background)', 
        padding: 'var(--space-3)',
        borderRadius: 'var(--space-1)',
        border: '1px solid var(--surface-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        marginTop: 'var(--space-2)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-small)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Padding: {padding}px</span>
            {padding === 16 && <span style={{ color: 'var(--color-success)', fontWeight: 'var(--font-weight-medium)' }}>✓ 8px Grid Aligned</span>}
          </div>
          <input 
            id="padding-range"
            aria-label="Padding adjustment range"
            type="range" 
            min="2" 
            max="32" 
            step="2" 
            value={padding} 
            onChange={(e) => setPadding(parseInt(e.target.value))}
            disabled={isDiscovered}
            style={{ width: '100%', cursor: isDiscovered ? 'default' : 'ew-resize' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-small)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Element Gap: {gap}px</span>
            {gap === 8 && <span style={{ color: 'var(--color-success)', fontWeight: 'var(--font-weight-medium)' }}>✓ 8px Grid Aligned</span>}
          </div>
          <input 
            id="gap-range"
            aria-label="Element gap adjustment range"
            type="range" 
            min="0" 
            max="24" 
            step="2" 
            value={gap} 
            onChange={(e) => setGap(parseInt(e.target.value))}
            disabled={isDiscovered}
            style={{ width: '100%', cursor: isDiscovered ? 'default' : 'ew-resize' }}
          />
        </div>
      </div>
    </div>
  );
}
