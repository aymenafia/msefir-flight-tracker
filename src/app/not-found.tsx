
'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ fontFamily: 'sans-serif', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1rem', backgroundColor: '#F7F9FC' }}>
      <div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#0F2A44', marginTop: '1.5rem' }}>Page Not Found</h1>
        <p style={{ marginTop: '0.5rem', fontSize: '1.125rem', color: '#6B7A90' }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" style={{ display: 'inline-block', marginTop: '2rem', backgroundColor: '#0F2A44', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none', fontSize: '1rem' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
