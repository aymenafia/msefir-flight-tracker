
'use client';
import {
  Auth,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  FirebaseError,
} from 'firebase/auth';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  signInAnonymously(authInstance);
}

/** Initiate Google sign-in and handle popup closure. */
export function initiateGoogleSignIn(authInstance: Auth): void {
  const provider = new GoogleAuthProvider();
  signInWithPopup(authInstance, provider).catch((error: FirebaseError) => {
    // Handle common popup errors
    if (error.code === 'auth/popup-closed-by-user') {
      // User closed the popup, this is a normal action, so we can safely ignore.
      console.log('Google Sign-In popup closed by user.');
    } else if (error.code === 'auth/popup-blocked') {
      // The browser blocked the popup. This can happen for various security reasons.
      // We can fall back to a redirect-based sign-in method which is more reliable.
      console.warn(
        'Google Sign-In popup was blocked by the browser. Falling back to redirect method.'
      );
      signInWithRedirect(authInstance, provider);
    } else {
      // For other errors, log them for debugging.
      console.error('Google Sign-In Error:', error);
    }
  });
}

/** Initiate sign-out (non-blocking). */
export function initiateSignOut(authInstance: Auth): void {
  signOut(authInstance);
}
