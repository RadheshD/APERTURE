'use client';

import React, { useState, useEffect } from 'react';
import type { ContentUnit } from '@/domain/content-unit';

interface ExerciseCanvasProps {
  unit: ContentUnit;
  onDiscovery: () => void;
}

export function ExerciseCanvas({ unit, onDiscovery }: ExerciseCanvasProps) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{
        padding: 'calc(var(--grid-unit) * 4)',
        borderBottom: '1px solid var(--surface-border)',
        backgroundColor: 'var(--background)'
      }}>
        <p style={{ 
          fontSize: '1.125rem', 
          color: 'var(--text-muted)',
          maxWidth: '800px'
        }}>
          {unit.initialExperience.prompt}
        </p>
      </div>
      
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'var(--surface)',
        position: 'relative',
        overflow: 'hidden'
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

function CuriosityExercise({ onComplete }: { onComplete: () => void }) {
  const [scale, setScale] = useState(1);
  const [isDiscovered, setIsDiscovered] = useState(false);

  useEffect(() => {
    if (scale >= 1.5 && !isDiscovered) {
      setIsDiscovered(true);
      setTimeout(() => onComplete(), 500); // Small delay for tactile feel
    }
  }, [scale, isDiscovered, onComplete]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'calc(var(--grid-unit) * 8)' }}>
      {/* The UI Card */}
      <div style={{
        width: '320px',
        backgroundColor: 'var(--background)',
        border: '1px solid var(--surface-border)',
        borderRadius: 'calc(var(--grid-unit) * 2)',
        padding: 'calc(var(--grid-unit) * 3)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'calc(var(--grid-unit) * 2)'
      }}>
        <div style={{ width: '100%', height: '120px', backgroundColor: 'var(--surface)', borderRadius: 'calc(var(--grid-unit) * 1)' }} />
        <div style={{ width: '60%', height: '24px', backgroundColor: 'var(--surface-border)', borderRadius: '4px' }} />
        <div style={{ width: '90%', height: '16px', backgroundColor: 'var(--surface)', borderRadius: '4px' }} />
        <div style={{ width: '80%', height: '16px', backgroundColor: 'var(--surface)', borderRadius: '4px' }} />
        
        <button style={{
          marginTop: 'calc(var(--grid-unit) * 2)',
          padding: 'calc(var(--grid-unit) * 1.5)',
          backgroundColor: 'var(--foreground)',
          color: 'var(--background)',
          fontWeight: 600,
          borderRadius: 'calc(var(--grid-unit) * 1)',
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          transition: 'transform 0.1s ease-out, background-color 0.3s ease',
          ...(isDiscovered ? { backgroundColor: 'var(--accent)' } : {})
        }}>
          Continue
        </button>
      </div>

      {/* The Interaction Control */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--grid-unit) * 1)', alignItems: 'center' }}>
        <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Adjust Emphasis
        </label>
        <input 
          type="range" 
          min="1" 
          max="2" 
          step="0.05" 
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))}
          disabled={isDiscovered}
          style={{ width: '200px', cursor: isDiscovered ? 'default' : 'ew-resize' }}
        />
      </div>
    </div>
  );
}

function HierarchyExercise({ onComplete }: { onComplete: () => void }) {
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ width: '100%', height: '12px', backgroundColor: 'var(--surface-border)', borderRadius: '4px' }} />
        <div style={{ width: '90%', height: '12px', backgroundColor: 'var(--surface-border)', borderRadius: '4px' }} />
        <div style={{ width: '95%', height: '12px', backgroundColor: 'var(--surface-border)', borderRadius: '4px' }} />
      </div>
    </>
  );

  return (
    <div style={{ display: 'flex', gap: 'calc(var(--grid-unit) * 6)' }}>
      {/* Card A: Flat */}
      <button 
        onClick={() => handleSelect('A')}
        style={{
          width: '280px',
          padding: 'calc(var(--grid-unit) * 3)',
          backgroundColor: 'var(--background)',
          border: `2px solid ${selected === 'A' ? 'red' : 'var(--surface-border)'}`,
          borderRadius: 'calc(var(--grid-unit) * 2)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'calc(var(--grid-unit) * 2)',
          opacity: selected === 'B' ? 0.5 : 1,
          transition: 'all 0.3s ease',
          textAlign: 'left'
        }}
      >
        <div style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-muted)' }}>The Future of Design</div>
        <div style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-muted)' }}>Why perception matters more than tools</div>
        {articleContent}
      </button>

      {/* Card B: Structured */}
      <button 
        onClick={() => handleSelect('B')}
        style={{
          width: '280px',
          padding: 'calc(var(--grid-unit) * 3)',
          backgroundColor: 'var(--background)',
          border: `2px solid ${selected === 'B' ? 'var(--accent)' : 'var(--surface-border)'}`,
          borderRadius: 'calc(var(--grid-unit) * 2)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'calc(var(--grid-unit) * 2)',
          opacity: selected === 'A' ? 0.5 : 1,
          transition: 'all 0.3s ease',
          transform: selected === 'B' ? 'scale(1.05)' : 'scale(1)',
          textAlign: 'left'
        }}
      >
        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--foreground)', lineHeight: 1.2 }}>The Future of Design</div>
        <div style={{ fontSize: '1.125rem', fontWeight: 500, color: 'var(--text-muted)' }}>Why perception matters more than tools</div>
        {articleContent}
      </button>
    </div>
  );
}

function SpacingExercise({ onComplete }: { onComplete: () => void }) {
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'calc(var(--grid-unit) * 4)', width: '100%', maxWidth: '400px' }}>
      <div style={{
        width: '100%',
        backgroundColor: 'var(--background)',
        border: '1px solid var(--surface-border)',
        borderRadius: 'calc(var(--grid-unit) * 2)',
        padding: `${padding}px`,
        transition: 'padding 0.2s ease-out',
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
        padding: 'calc(var(--grid-unit) * 2)',
        borderRadius: 'calc(var(--grid-unit) * 1)',
        border: '1px solid var(--surface-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'calc(var(--grid-unit) * 2)',
        marginTop: 'calc(var(--grid-unit) * 2)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Padding: {padding}px</span>
            {padding === 16 && <span style={{ color: 'var(--accent)' }}>✓ 8px Grid Aligned</span>}
          </div>
          <input 
            type="range" 
            min="2" 
            max="32" 
            step="2" 
            value={padding} 
            onChange={(e) => setPadding(parseInt(e.target.value))}
            disabled={isDiscovered}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Element Gap: {gap}px</span>
            {gap === 8 && <span style={{ color: 'var(--accent)' }}>✓ 8px Grid Aligned</span>}
          </div>
          <input 
            type="range" 
            min="0" 
            max="24" 
            step="2" 
            value={gap} 
            onChange={(e) => setGap(parseInt(e.target.value))}
            disabled={isDiscovered}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}

function DiagnoseExercise({ onComplete }: { onComplete: () => void }) {
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'calc(var(--grid-unit) * 4)', width: '100%', maxWidth: '340px' }}>
      <div style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        Flaws Found: {Object.values(foundFlaws).filter(Boolean).length} / 3
      </div>

      <div style={{
        width: '100%',
        backgroundColor: 'var(--background)',
        border: '1px solid var(--surface-border)',
        borderRadius: 'calc(var(--grid-unit) * 2)',
        padding: '4px', // Cramped padding flaw
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        position: 'relative',
        cursor: 'crosshair',
        outline: foundFlaws.padding ? '2px solid var(--accent)' : 'none'
      }} onClick={() => handleDiagnose('padding')}>
        <div style={{ 
          padding: '8px', 
          backgroundColor: '#ffffff', // Extremely light background, low contrast text
          color: '#e0e0e0', // Low contrast flaw
          borderRadius: '4px',
          outline: foundFlaws.contrast ? '2px solid var(--accent)' : 'none'
        }} onClick={(e) => { e.stopPropagation(); handleDiagnose('contrast'); }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 300 }}>Low Contrast Title</h3>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '4px',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px',
          outline: foundFlaws.hierarchy ? '2px solid var(--accent)' : 'none'
        }} onClick={(e) => { e.stopPropagation(); handleDiagnose('hierarchy'); }}>
          {/* Inverted Hierarchy Flaw: Huge red secondary button, tiny white primary */}
          <button style={{ padding: '8px', fontSize: '1.25rem', backgroundColor: '#ff3b30', color: 'white', fontWeight: 'bold', borderRadius: '4px' }}>
            Cancel (Huge secondary)
          </button>
          <button style={{ padding: '4px', fontSize: '0.75rem', backgroundColor: '#e0e0e0', color: 'black', borderRadius: '2px' }}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

function FixExercise({ onComplete }: { onComplete: () => void }) {
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'calc(var(--grid-unit) * 4)', width: '100%', maxWidth: '340px' }}>
      {/* Target UI to fix */}
      <div style={{
        width: '100%',
        backgroundColor: 'var(--background)',
        border: '1px solid var(--surface-border)',
        borderRadius: 'calc(var(--grid-unit) * 2)',
        padding: `${padding}px`,
        display: 'flex',
        flexDirection: 'column',
        gap: 'calc(var(--grid-unit) * 2)',
        transition: 'all 0.2s ease'
      }}>
        <div style={{ 
          padding: '12px', 
          backgroundColor: 'var(--surface)', 
          color: contrast >= 4 ? 'var(--foreground)' : '#444444',
          borderRadius: 'calc(var(--grid-unit) * 1)',
          transition: 'all 0.2s ease'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Headline Text</h3>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: 'calc(var(--grid-unit) * 2)',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {hierarchy === 'correct' ? (
            <>
              <button style={{ padding: '8px 16px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Cancel
              </button>
              <button style={{ padding: '8px 16px', fontSize: '0.875rem', backgroundColor: 'var(--accent)', color: 'var(--background)', fontWeight: 600, borderRadius: '4px' }}>
                Submit
              </button>
            </>
          ) : (
            <>
              <button style={{ padding: '12px 24px', fontSize: '1.125rem', backgroundColor: '#ff3b30', color: 'white', fontWeight: 'bold', borderRadius: '4px' }}>
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
        padding: 'calc(var(--grid-unit) * 2)',
        borderRadius: 'calc(var(--grid-unit) * 1)',
        border: '1px solid var(--surface-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'calc(var(--grid-unit) * 2)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Fix Spacing (Padding): {padding}px</span>
            {padding === 16 && <span style={{ color: 'var(--accent)' }}>✓ Fixed</span>}
          </div>
          <input 
            type="range" 
            min="4" 
            max="24" 
            step="4" 
            value={padding} 
            onChange={(e) => setPadding(parseInt(e.target.value))}
            disabled={isDiscovered}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Fix Contrast: {contrast < 4 ? 'Low' : 'Good'}</span>
            {contrast >= 4 && <span style={{ color: 'var(--accent)' }}>✓ Fixed</span>}
          </div>
          <input 
            type="range" 
            min="1" 
            max="5" 
            value={contrast} 
            onChange={(e) => setContrast(parseInt(e.target.value))}
            disabled={isDiscovered}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Button Hierarchy</span>
            {hierarchy === 'correct' && <span style={{ color: 'var(--accent)' }}>✓ Fixed</span>}
          </div>
          <select 
            value={hierarchy} 
            onChange={(e) => setHierarchy(e.target.value)}
            disabled={isDiscovered}
            style={{
              backgroundColor: 'var(--surface)',
              color: 'var(--foreground)',
              border: '1px solid var(--surface-border)',
              padding: '8px',
              borderRadius: '4px'
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

interface BuildItem {
  id: string;
  label: string;
  type: 'avatar' | 'name' | 'bio' | 'button';
}

function BuildExercise({ onComplete }: { onComplete: () => void }) {
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'calc(var(--grid-unit) * 4)', width: '100%', maxWidth: '340px' }}>
      <div style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        Arrange elements in standard reading hierarchy:
      </div>

      <div style={{
        width: '100%',
        backgroundColor: 'var(--background)',
        border: '1px solid var(--surface-border)',
        borderRadius: 'calc(var(--grid-unit) * 2)',
        padding: 'calc(var(--grid-unit) * 3)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'calc(var(--grid-unit) * 2)'
      }}>
        {items.map((item, index) => (
          <div 
            key={item.id}
            style={{
              padding: 'calc(var(--grid-unit) * 1.5) calc(var(--grid-unit) * 2)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--surface-border)',
              borderRadius: '6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              outline: isDiscovered ? '1px solid var(--accent)' : 'none',
              transition: 'outline 0.3s ease'
            }}
          >
            <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button 
                onClick={() => moveItem(index, 'up')} 
                disabled={index === 0 || isDiscovered}
                style={{ 
                  padding: '4px 8px', 
                  backgroundColor: 'var(--background)', 
                  border: '1px solid var(--surface-border)',
                  borderRadius: '4px',
                  color: index === 0 ? 'var(--surface-border)' : 'var(--foreground)'
                }}
              >
                ↑
              </button>
              <button 
                onClick={() => moveItem(index, 'down')} 
                disabled={index === items.length - 1 || isDiscovered}
                style={{ 
                  padding: '4px 8px', 
                  backgroundColor: 'var(--background)', 
                  border: '1px solid var(--surface-border)',
                  borderRadius: '4px',
                  color: index === items.length - 1 ? 'var(--surface-border)' : 'var(--foreground)'
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

function ReflectionExercise({ onComplete }: { onComplete: () => void }) {
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'calc(var(--grid-unit) * 4)', width: '100%', maxWidth: '400px', padding: 'calc(var(--grid-unit) * 2)' }}>
      <div style={{ fontSize: '1.125rem', fontWeight: 500, textAlign: 'center', marginBottom: 'calc(var(--grid-unit) * 2)' }}>
        What is your key takeaway from this laboratory session?
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--grid-unit) * 2)', width: '100%' }}>
        {choices.map((choice) => {
          const isSelected = selected === choice;
          const isCorrect = choice === choices[2];
          return (
            <button
              key={choice}
              onClick={() => handleSelect(choice)}
              style={{
                width: '100%',
                padding: 'calc(var(--grid-unit) * 2)',
                backgroundColor: 'var(--background)',
                border: `1px solid ${isSelected ? (isCorrect ? 'var(--accent)' : 'red') : 'var(--surface-border)'}`,
                borderRadius: 'calc(var(--grid-unit) * 1.5)',
                color: 'var(--foreground)',
                textAlign: 'left',
                transition: 'all 0.2s ease',
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
