'use client';

import React, { useState } from 'react';

interface BuildItem {
  id: string;
  label: string;
  type: 'avatar' | 'name' | 'bio' | 'button';
}

interface BuildExerciseProps {
  onComplete: () => void;
}

export function BuildExercise({ onComplete }: BuildExerciseProps) {
  const [items, setItems] = useState<BuildItem[]>([
    { id: '1', label: '👨‍💻 Bio Description', type: 'bio' },
    { id: '2', label: '👤 Avatar Image', type: 'avatar' },
    { id: '3', label: '🔵 Follow Button', type: 'button' },
    { id: '4', label: '✨ User Name Heading', type: 'name' }
  ]);
  const [isDiscovered, setIsDiscovered] = useState(false);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (isDiscovered) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    
    setItems(newItems);
    
    // Check target state: avatar -> name -> bio -> button
    if (
      newItems[0].type === 'avatar' &&
      newItems[1].type === 'name' &&
      newItems[2].type === 'bio' &&
      newItems[3].type === 'button'
    ) {
      setIsDiscovered(true);
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
      maxWidth: '340px',
      padding: 'var(--space-2)'
    }}>
      <div style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: 'var(--font-size-small)' }}>
        Arrange elements in standard reading hierarchy:
      </div>

      <div 
        role="list"
        aria-label="Sortable profile card elements"
        style={{
          width: '100%',
          backgroundColor: 'var(--background)',
          border: '1px solid var(--surface-border)',
          borderRadius: 'var(--space-2)',
          padding: 'var(--space-3)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)'
        }}
      >
        {items.map((item, index) => (
          <div 
            key={item.id}
            role="listitem"
            style={{
              padding: 'calc(var(--space-1) * 1.5) var(--space-2)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--surface-border)',
              borderRadius: '6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              outline: isDiscovered ? '1px solid var(--color-success)' : 'none',
              transition: 'outline var(--duration-normal) var(--ease-out-expo), border-color var(--duration-fast) var(--ease-in-out-smooth)'
            }}
          >
            <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button 
                onClick={() => moveItem(index, 'up')} 
                disabled={index === 0 || isDiscovered}
                aria-label={`Move ${item.label} up`}
                style={{ 
                  padding: '4px 8px', 
                  backgroundColor: 'var(--background)', 
                  border: '1px solid var(--surface-border)',
                  borderRadius: '4px',
                  color: index === 0 ? 'var(--surface-border)' : 'var(--foreground)',
                  opacity: index === 0 ? 0.5 : 1
                }}
              >
                ↑
              </button>
              <button 
                onClick={() => moveItem(index, 'down')} 
                disabled={index === items.length - 1 || isDiscovered}
                aria-label={`Move ${item.label} down`}
                style={{ 
                  padding: '4px 8px', 
                  backgroundColor: 'var(--background)', 
                  border: '1px solid var(--surface-border)',
                  borderRadius: '4px',
                  color: index === items.length - 1 ? 'var(--surface-border)' : 'var(--foreground)',
                  opacity: index === items.length - 1 ? 0.5 : 1
                }}
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
