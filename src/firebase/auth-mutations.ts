'use client';
import {
  Auth,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
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
    // This error occurs when the user closes the popup.
    // We can safely ignore it, as it's a normal user action.
    if (error.code !== 'auth/popup-closed-by-user') {
      console.error('Google Sign-In Error:', error);
    }
  });
}

/** Initiate sign-out (non-blocking). */
export function initiateSignOut(authInstance: Auth): void {
  signOut(authInstance);
}
