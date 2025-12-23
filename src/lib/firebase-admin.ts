import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    // In a deployed environment, `applicationDefault` should find the credentials.
    // For local development, you need to set up the GOOGLE_APPLICATION_CREDENTIALS
    // environment variable to point to your service account key file.
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  } catch (e) {
    console.error('Firebase Admin initialization error', e);
  }
}

export const firestoreAdmin = admin.firestore();
export { admin };
