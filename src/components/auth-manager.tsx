'use client';

import { useEffect } from 'react';
import { useAuth, useUser } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/auth-mutations';

/**
 * An invisible component that manages the user's authentication state.
 * It ensures that a user is silently signed in anonymously if they are not already.
 */
export function AuthManager() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    // If the initial auth check is still happening, do nothing.
    if (isUserLoading) {
      return;
    }

    // If there is no user, initiate a non-blocking anonymous sign-in.
    if (!user) {
      initiateAnonymousSignIn(auth);
    }
  }, [user, isUserLoading, auth]);

  // This component does not render anything.
  return null;
}
