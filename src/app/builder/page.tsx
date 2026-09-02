import Link from 'next/link';
import { BuilderContainer } from '../../components/builder/BuilderContainer';

export const metadata = {
  title: 'Interface Builder | APERTURE Design Laboratory',
  description: 'Manipulate visual hierarchy, spatial rhythm, and container grouping in an interactive design canvas.',
};

export default function BuilderPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--background, #090d16)',
        color: 'var(--foreground, #f8fafc)',
        padding: 'calc(var(--grid-unit, 8px) * 3)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          paddingBottom: 'calc(var(--grid-unit, 8px) * 2)',
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted, #94a3b8)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          ← Back to Laboratory Home
        </Link>
      </div>

      <BuilderContainer />
    </main>
  );
}
