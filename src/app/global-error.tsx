'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <html>
      <body>
        <div style={{ fontFamily: 'sans-serif', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1rem', backgroundColor: '#F7F9FC' }}>
            <div style={{ fontSize: '4rem', lineHeight: '1', color: '#0F2A44' }}>⚠️</div>
            <h1 style={{ marginTop: '1.5rem', fontSize: '1.875rem', fontWeight: 'bold', color: '#0F2A44' }}>
                Something went wrong
            </h1>
            <p style={{ marginTop: '0.5rem', fontSize: '1.125rem', color: '#6B7A90' }}>
                An unexpected error occurred. Please try again.
            </p>
            <button 
              onClick={() => reset()} 
              style={{ marginTop: '2rem', backgroundColor: '#0F2A44', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', border: 'none', fontSize: '1rem' }}
            >
                Try Again
            </button>
        </div>
      </body>
    </html>
  );
}
