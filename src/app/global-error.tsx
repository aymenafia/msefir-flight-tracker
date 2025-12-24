
'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{ fontFamily: 'sans-serif', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1rem' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: '#dc2626' }}
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
            <h1 style={{ marginTop: '1.5rem', fontSize: '1.875rem', fontWeight: 'bold', color: '#dc2626' }}>
                Something went wrong
            </h1>
            <p style={{ marginTop: '0.5rem', fontSize: '1.125rem', color: '#6b7280' }}>
                An unexpected error occurred. Please try again.
            </p>
            <button 
              onClick={() => reset()} 
              style={{ marginTop: '2rem', backgroundColor: '#111827', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', cursor: 'pointer' }}
            >
                Try Again
            </button>
        </div>
      </body>
    </html>
  );
}
