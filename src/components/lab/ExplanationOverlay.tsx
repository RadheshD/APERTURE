'use client';

import React from 'react';

interface Explanation {
  concept: string;
  visualDemonstration: string;
  keyTakeaway: string;
}

interface ExplanationOverlayProps {
  explanation: Explanation;
  onContinue: () => void;
}

export function ExplanationOverlay({ explanation, onContinue }: ExplanationOverlayProps) {
  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(13, 13, 13, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      <div 
        style={{
          maxWidth: '500px',
          padding: 'calc(var(--grid-unit) * 6)',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--surface-border)',
          borderRadius: 'calc(var(--grid-unit) * 2)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'calc(var(--grid-unit) * 3)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        }}
      >
        <h2 style={{ 
          color: 'var(--accent)', 
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontWeight: 600
        }}>
          {explanation.concept}
        </h2>
        
        <p style={{
          fontSize: '1.25rem',
          lineHeight: 1.6,
          fontWeight: 400
        }}>
          {explanation.keyTakeaway}
        </p>
        
        <div style={{ marginTop: 'calc(var(--grid-unit) * 2)' }}>
          <button 
            onClick={onContinue}
            style={{
              padding: 'calc(var(--grid-unit) * 1.5) calc(var(--grid-unit) * 3)',
              backgroundColor: 'var(--foreground)',
              color: 'var(--background)',
              fontWeight: 500,
              borderRadius: 'calc(var(--grid-unit) * 1)',
              width: '100%'
            }}
          >
            Continue
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
    </div>
  );
}
