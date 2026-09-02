'use client';

import React from 'react';
import { BuilderCanvasState, BuilderElement, ContainerId } from '../../domain/phase-3-builder-data';

interface BuilderCanvasProps {
  state: BuilderCanvasState;
  onSelectElement: (elementId: string) => void;
}

export const BuilderCanvas: React.FC<BuilderCanvasProps> = ({ state, onSelectElement }) => {
  const { elements, selectedElementId } = state;

  // Group elements by container
  const containerMap: Record<ContainerId, BuilderElement[]> = {
    card_a: [],
    card_b: [],
    none: [],
  };

  elements.forEach((el) => {
    const cId = el.containerId || 'none';
    if (containerMap[cId]) {
      containerMap[cId].push(el);
    } else {
      containerMap['none'].push(el);
    }
  });

  const renderElementItem = (element: BuilderElement, index: number) => {
    const isSelected = element.id === selectedElementId;

    // Visual styling mapped to emphasis
    let fontSize = '1rem';
    let fontWeight = 400;
    let opacity = 0.8;
    let background = 'transparent';
    let color = 'var(--foreground)';

    if (element.type === 'heading') {
      fontSize = element.emphasis === 'high' ? '1.75rem' : element.emphasis === 'medium' ? '1.35rem' : '1.1rem';
      fontWeight = element.emphasis === 'high' ? 700 : 500;
      opacity = 1;
    } else if (element.type === 'subheading') {
      fontSize = element.emphasis === 'high' ? '1.25rem' : '1rem';
      fontWeight = 600;
      opacity = 0.9;
    } else if (element.type === 'body_text') {
      fontSize = '0.95rem';
      fontWeight = 400;
      opacity = element.emphasis === 'high' ? 1 : element.emphasis === 'medium' ? 0.85 : 0.65;
    } else if (element.type === 'primary_button') {
      background = element.emphasis === 'high' ? 'var(--foreground)' : 'var(--accent, #3b82f6)';
      color = 'var(--background)';
      fontWeight = 600;
      opacity = element.emphasis === 'low' ? 0.6 : 1;
    } else if (element.type === 'secondary_button') {
      background = 'transparent';
      color = 'var(--foreground)';
      fontWeight = element.emphasis === 'high' ? 600 : 400;
      opacity = element.emphasis === 'high' ? 1 : 0.7;
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelectElement(element.id);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const globalIdx = elements.findIndex((el) => el.id === element.id);
        if (globalIdx < elements.length - 1) {
          onSelectElement(elements[globalIdx + 1].id);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const globalIdx = elements.findIndex((el) => el.id === element.id);
        if (globalIdx > 0) {
          onSelectElement(elements[globalIdx - 1].id);
        }
      }
    };

    return (
      <div
        key={element.id}
        role="option"
        tabIndex={0}
        aria-selected={isSelected}
        aria-label={`${element.label} (${element.type}, emphasis: ${element.emphasis}, spacing below: ${element.spacingBelow}px)`}
        onClick={() => onSelectElement(element.id)}
        onKeyDown={handleKeyDown}
        style={{
          marginBottom: `${element.spacingBelow}px`,
          padding: 'calc(var(--grid-unit, 8px) * 1.5)',
          borderRadius: 'calc(var(--grid-unit, 8px) * 0.75)',
          border: isSelected ? '2px solid var(--accent, #3b82f6)' : '1px dashed rgba(255, 255, 255, 0.15)',
          outline: isSelected ? '2px solid var(--accent, #3b82f6)' : 'none',
          outlineOffset: '2px',
          backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.08)' : background,
          color,
          fontSize,
          fontWeight,
          opacity,
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          display: element.type.includes('button') ? 'inline-block' : 'block',
          marginRight: element.type.includes('button') ? 'calc(var(--grid-unit, 8px) * 1.5)' : 0,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
          <span>{element.label}</span>
          <span
            style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: '2px 6px',
              borderRadius: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'var(--text-muted, #94a3b8)',
            }}
          >
            {element.type.replace('_', ' ')}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section
      aria-label="Interface Builder Canvas"
      role="listbox"
      style={{
        width: '100%',
        maxWidth: '640px',
        margin: '0 auto',
        padding: 'calc(var(--grid-unit, 8px) * 3)',
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(12px)',
        borderRadius: 'calc(var(--grid-unit, 8px) * 2)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'calc(var(--grid-unit, 8px) * 2)',
      }}
    >
      {(['card_a', 'card_b', 'none'] as ContainerId[]).map((cId) => {
        const containerElements = containerMap[cId];
        if (containerElements.length === 0 && cId === 'none') return null;

        return (
          <div
            key={cId}
            style={{
              padding: cId !== 'none' ? 'calc(var(--grid-unit, 8px) * 2)' : 0,
              borderRadius: 'calc(var(--grid-unit, 8px) * 1.5)',
              backgroundColor:
                cId === 'card_a'
                  ? 'rgba(255, 255, 255, 0.03)'
                  : cId === 'card_b'
                  ? 'rgba(59, 130, 246, 0.04)'
                  : 'transparent',
              border: cId !== 'none' ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
            }}
          >
            {cId !== 'none' && (
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted, #94a3b8)',
                  marginBottom: 'calc(var(--grid-unit, 8px) * 1.5)',
                }}
              >
                Container: {cId === 'card_a' ? 'Card A (Content)' : 'Card B (Actions)'}
              </div>
            )}
            {containerElements.map((el, idx) => renderElementItem(el, idx))}
          </div>
        );
      })}
    </section>
  );
};
