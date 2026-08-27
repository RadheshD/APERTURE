'use client';

import React, { useState } from 'react';

interface ReflectionExerciseProps {
  onComplete: () => void;
}

export function ReflectionExercise({ onComplete }: ReflectionExerciseProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const choices = [
    "Design is subjective; there are no real rules.",
    "Design is about styling elements to look fancy at the end.",
    "Design decisions are grounded in structured visual perception principles."
  ];

  const handleSelect = (choice: string) => {
    setSelected(choice);
    if (choice === choices[2]) {
      setTimeout(() => onComplete(), 1000);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: 'var(--space-3)', 
      width: '100%', 
      maxWidth: '400px', 
      padding: 'var(--space-2)' 
    }}>
      <div style={{ 
        fontSize: 'var(--font-size-h3)', 
        fontWeight: 'var(--font-weight-medium)', 
        textAlign: 'center', 
        marginBottom: 'var(--space-2)' 
      }}>
        What is your key takeaway from this laboratory session?
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', width: '100%' }}>
        {choices.map((choice) => {
          const isSelected = selected === choice;
          const isCorrect = choice === choices[2];
          return (
            <button
              key={choice}
              onClick={() => handleSelect(choice)}
              style={{
                width: '100%',
                padding: 'var(--space-2)',
                backgroundColor: 'var(--background)',
                border: `1px solid ${isSelected ? (isCorrect ? 'var(--color-success)' : 'var(--color-error)') : 'var(--surface-border)'}`,
                borderRadius: 'var(--space-1)',
                color: 'var(--foreground)',
                textAlign: 'left',
                transition: 'border-color var(--duration-fast) var(--ease-in-out-smooth), background-color var(--duration-fast) var(--ease-in-out-smooth)',
                cursor: 'pointer'
              }}
            >
              {choice}
            </button>
          );
        })}
      </div>
    </div>
  );
}
