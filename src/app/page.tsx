import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      gap: 'calc(var(--grid-unit) * 3)'
    }}>
      <h1 style={{ 
        fontSize: 'calc(var(--grid-unit) * 6)', 
        fontWeight: 600, 
        letterSpacing: '-0.02em' 
      }}>
        APERTURE
      </h1>
      <p style={{ 
        color: 'var(--text-muted)', 
        maxWidth: '400px', 
        textAlign: 'center',
        marginBottom: 'calc(var(--grid-unit) * 4)'
      }}>
        An interactive design laboratory that teaches complete beginners to see, think, and build like designers.
      </p>
      
      <div style={{ display: 'flex', gap: 'calc(var(--grid-unit) * 2)', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/lab"
          style={{
            display: 'inline-block',
            padding: 'calc(var(--grid-unit) * 2) calc(var(--grid-unit) * 4)',
            backgroundColor: 'var(--foreground)',
            color: 'var(--background)',
            textDecoration: 'none',
            fontWeight: 500,
            borderRadius: 'calc(var(--grid-unit) * 1)',
            transition: 'transform 0.2s ease, opacity 0.2s ease'
          }}
        >
          Begin First Contact
        </Link>
        <Link
          href="/builder"
          style={{
            display: 'inline-block',
            padding: 'calc(var(--grid-unit) * 2) calc(var(--grid-unit) * 4)',
            backgroundColor: 'transparent',
            color: 'var(--foreground)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textDecoration: 'none',
            fontWeight: 500,
            borderRadius: 'calc(var(--grid-unit) * 1)',
            transition: 'transform 0.2s ease, opacity 0.2s ease'
          }}
        >
          Enter the Builder
        </Link>
      </div>
    </main>
  );
}
