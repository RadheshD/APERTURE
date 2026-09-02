'use client';

import React from 'react';
import {
  BuilderCanvasState,
  ContainerId,
  ElementEmphasis,
  GridSpacing,
} from '../../domain/phase-3-builder-data';

interface BuilderControlsProps {
  state: BuilderCanvasState;
  onReorder: (fromIndex: number, toIndex: number) => void;
  onUpdateEmphasis: (elementId: string, emphasis: ElementEmphasis) => void;
  onUpdateSpacing: (elementId: string, spacingBelow: GridSpacing) => void;
  onUpdateContainer: (elementId: string, containerId: ContainerId) => void;
}

export const BuilderControls: React.FC<BuilderControlsProps> = ({
  state,
  onReorder,
  onUpdateEmphasis,
  onUpdateSpacing,
  onUpdateContainer,
}) => {
  const { elements, selectedElementId } = state;

  const selectedIdx = elements.findIndex((el) => el.id === selectedElementId);
  const selectedElement = selectedIdx !== -1 ? elements[selectedIdx] : null;

  if (!selectedElement) {
    return (
      <aside
        aria-label="Element Properties Panel"
        style={{
          padding: 'calc(var(--grid-unit, 8px) * 2.5)',
          borderRadius: 'calc(var(--grid-unit, 8px) * 1.5)',
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          color: 'var(--text-muted, #94a3b8)',
          fontSize: '0.9rem',
          textAlign: 'center',
        }}
      >
        Select an element on the canvas to inspect and edit its properties.
      </aside>
    );
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.altKey && e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectedIdx > 0) {
        onReorder(selectedIdx, selectedIdx - 1);
      }
    } else if (e.altKey && e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectedIdx < elements.length - 1) {
        onReorder(selectedIdx, selectedIdx + 1);
      }
    }
  };

  const buttonStyle = (active: boolean): React.CSSProperties => ({
    padding: '6px 12px',
    borderRadius: '6px',
    border: active ? '1px solid var(--accent, #3b82f6)' : '1px solid rgba(255, 255, 255, 0.15)',
    backgroundColor: active ? 'var(--accent, #3b82f6)' : 'rgba(255, 255, 255, 0.05)',
    color: active ? '#ffffff' : 'var(--foreground)',
    fontWeight: active ? 600 : 400,
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  });

  return (
    <aside
      aria-label={`Properties for ${selectedElement.label}`}
      onKeyDown={handleKeyDown}
      style={{
        padding: 'calc(var(--grid-unit, 8px) * 2.5)',
        borderRadius: 'calc(var(--grid-unit, 8px) * 1.5)',
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'calc(var(--grid-unit, 8px) * 2)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>
          Properties: <span style={{ color: 'var(--accent, #3b82f6)' }}>{selectedElement.label}</span>
        </h3>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted, #94a3b8)' }}>
          Shortcut: Alt+Up / Alt+Down to reorder
        </span>
      </div>

      {/* Reorder Controls */}
      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted, #94a3b8)', marginBottom: '8px' }}>
          Position & Order
        </legend>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            disabled={selectedIdx <= 0}
            onClick={() => onReorder(selectedIdx, selectedIdx - 1)}
            aria-label={`Move ${selectedElement.label} Up`}
            style={{
              ...buttonStyle(false),
              opacity: selectedIdx <= 0 ? 0.4 : 1,
              cursor: selectedIdx <= 0 ? 'not-allowed' : 'pointer',
            }}
          >
            ↑ Move Up
          </button>
          <button
            type="button"
            disabled={selectedIdx >= elements.length - 1}
            onClick={() => onReorder(selectedIdx, selectedIdx + 1)}
            aria-label={`Move ${selectedElement.label} Down`}
            style={{
              ...buttonStyle(false),
              opacity: selectedIdx >= elements.length - 1 ? 0.4 : 1,
              cursor: selectedIdx >= elements.length - 1 ? 'not-allowed' : 'pointer',
            }}
          >
            ↓ Move Down
          </button>
        </div>
      </fieldset>

      {/* Emphasis Controls */}
      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted, #94a3b8)', marginBottom: '8px' }}>
          Visual Emphasis
        </legend>
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['low', 'medium', 'high'] as ElementEmphasis[]).map((emp) => (
            <button
              key={emp}
              type="button"
              onClick={() => onUpdateEmphasis(selectedElement.id, emp)}
              aria-pressed={selectedElement.emphasis === emp}
              aria-label={`Set emphasis to ${emp}`}
              style={buttonStyle(selectedElement.emphasis === emp)}
            >
              {emp.charAt(0).toUpperCase() + emp.slice(1)}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Grid Spacing Below Controls */}
      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted, #94a3b8)', marginBottom: '8px' }}>
          Spacing Below (8px Grid)
        </legend>
        <div style={{ display: 'flex', gap: '8px' }}>
          {([8, 16, 24, 32] as GridSpacing[]).map((space) => (
            <button
              key={space}
              type="button"
              onClick={() => onUpdateSpacing(selectedElement.id, space)}
              aria-pressed={selectedElement.spacingBelow === space}
              aria-label={`Set spacing below to ${space} pixels`}
              style={buttonStyle(selectedElement.spacingBelow === space)}
            >
              {space}px
            </button>
          ))}
        </div>
      </fieldset>

      {/* Container Grouping Controls */}
      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted, #94a3b8)', marginBottom: '8px' }}>
          Container Grouping
        </legend>
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['card_a', 'card_b', 'none'] as ContainerId[]).map((cId) => (
            <button
              key={cId}
              type="button"
              onClick={() => onUpdateContainer(selectedElement.id, cId)}
              aria-pressed={selectedElement.containerId === cId}
              aria-label={`Assign to container ${cId}`}
              style={buttonStyle(selectedElement.containerId === cId)}
            >
              {cId === 'card_a' ? 'Card A' : cId === 'card_b' ? 'Card B' : 'Standalone'}
            </button>
          ))}
        </div>
      </fieldset>
    </aside>
  );
};
