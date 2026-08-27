'use client';

import React, { useState } from 'react';

interface HierarchyExerciseProps {
  onComplete: () => void;
}

export function HierarchyExercise({ onComplete }: HierarchyExerciseProps) {
  const [selected, setSelected] = useState<'A' | 'B' | null>(null);

  const handleSelect = (choice: 'A' | 'B') => {
    if (selected) return; // Prevent re-selection
    setSelected(choice);
    if (choice === 'B') {
      setTimeout(() => onComplete(), 600); // Allow time to see the selection state
    } else {
      setTimeout(() => setSelected(null), 1000);
    }
  };

  const articleContent = (
    <>
      <div style={{ width: '100%', height: '100px', backgroundColor: 'var(--surface-border)', borderRadius: '4px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', width: '100%' }}>
        <div style={{ width: '100%', height: '12px', backgroundColor: 'var(--surface-border)', borderRadius: '4px' }} />
        <div style={{ width: '90%', height: '12px', backgroundColor: 'var(--surface-border)', borderRadius: '4px' }} />
        <div style={{ width: '95%', height: '12px', backgroundColor: 'var(--surface-border)', borderRadius: '4px' }} />
      </div>
    </>
  );

  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 'var(--space-3)',
      width: '100%',
      padding: 'var(--space-2)'
    }}>
      {/* Card A: Flat */}
      <button 
        onClick={() => handleSelect('A')}
        aria-label="Design Option A"
        style={{
          width: '100%',
          maxWidth: '280px',
          padding: 'var(--space-3)',
          backgroundColor: 'var(--background)',
          border: `2px solid ${selected === 'A' ? 'var(--color-error)' : 'var(--surface-border)'}`,
          borderRadius: 'var(--space-2)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
          opacity: selected === 'B' ? 0.5 : 1,
          transition: 'transform var(--duration-fast) var(--ease-out-expo), opacity var(--duration-fast) var(--ease-out-expo), border-color var(--duration-fast) var(--ease-out-expo)',
          textAlign: 'left'
        }}
      >
        <span style={{ fontSize: 'var(--font-size-body)', fontWeight: 'var(--font-weight-normal)', color: 'var(--text-muted)' }}>The Future of Design</span>
        <span style={{ fontSize: 'var(--font-size-body)', fontWeight: 'var(--font-weight-normal)', color: 'var(--text-muted)' }}>Why perception matters more than tools</span>
        {articleContent}
      </button>

      {/* Card B: Structured */}
      <button 
        onClick={() => handleSelect('B')}
        aria-label="Design Option B"
        style={{
          width: '100%',
          maxWidth: '280px',
          padding: 'var(--space-3)',
          backgroundColor: 'var(--background)',
          border: `2px solid ${selected === 'B' ? 'var(--color-success)' : 'var(--surface-border)'}`,
          borderRadius: 'var(--space-2)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
          opacity: selected === 'A' ? 0.5 : 1,
          transition: 'transform var(--duration-fast) var(--ease-out-expo), opacity var(--duration-fast) var(--ease-out-expo), border-color var(--duration-fast) var(--ease-out-expo)',
          transform: selected === 'B' ? 'scale(1.05)' : 'scale(1)',
          textAlign: 'left'
        }}
      >
        <span style={{ fontSize: 'var(--font-size-h2)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)', lineHeight: 1.2 }}>The Future of Design</span>
        <span style={{ fontSize: 'var(--font-size-h3)', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)' }}>Why perception matters more than tools</span>
        {articleContent}
      </button>
    </div>
  );
}
