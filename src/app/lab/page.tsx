import { PhaseZeroContainer } from '@/components/lab/PhaseZeroContainer';

export default function LabPage() {
  return (
    <main style={{ 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <PhaseZeroContainer />
    </main>
  );
}
