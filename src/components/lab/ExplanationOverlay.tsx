'use client';

import React, { useEffect, useRef } from 'react';

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
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Focus the continue button for keyboard accessibility when the overlay opens
    buttonRef.current?.focus();
  }, []);

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="overlay-title"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'var(--color-overlay)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        animation: 'fadeIn var(--duration-normal) var(--ease-out-expo)'
      }}
    >
      <div 
        style={{
          width: '90%',
          maxWidth: '500px',
          padding: 'var(--space-6)',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--surface-border)',
          borderRadius: 'var(--space-2)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        }}
      >
        <h2 
          id="overlay-title"
          style={{ 
            color: 'var(--accent)', 
            fontSize: 'var(--font-size-small)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 'var(--font-weight-semibold)'
          }}
        >
          {explanation.concept}
        </h2>
        
        <p style={{
          fontSize: 'var(--font-size-h3)',
          lineHeight: 1.6,
          fontWeight: 'var(--font-weight-normal)'
        }}>
          {explanation.keyTakeaway}
        </p>
        
        <div style={{ marginTop: 'var(--space-2)' }}>
          <button 
            ref={buttonRef}
            onClick={onContinue}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              backgroundColor: 'var(--foreground)',
              color: 'var(--background)',
              fontWeight: 'var(--font-weight-medium)',
              borderRadius: 'var(--space-1)',
              width: '100%',
              fontSize: 'var(--font-size-body)',
              transition: 'transform var(--duration-fast) var(--ease-in-out-smooth), background-color var(--duration-fast) var(--ease-in-out-smooth)'
            }}
            onMouseOver={(e) => { e.currentTarget.style.opacity = '0.9'; }}
            onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; }}
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

