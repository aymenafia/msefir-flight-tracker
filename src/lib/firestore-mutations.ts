
'use client';
import {
  doc,
  addDoc,
  collection,
  serverTimestamp,
  Firestore,
  increment,
  updateDoc,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import type { MessageType } from './types';

type NewMessagePayload = {
  text: string;
  type: MessageType;
  userId: string;
  userDisplayName: string;
  userPhotoURL: string | null;
};

export function postMessage(
  db: Firestore,
  flightId: string,
  payload: NewMessagePayload
) {
  const messagesColRef = collection(db, 'rooms', flightId, 'messages');

  const data = {
    ...payload,
    flightId,
    createdAt: serverTimestamp(),
    helpfulCount: 0,
    unhelpfulCount: 0,
  };

  addDoc(messagesColRef, data).catch(async serverError => {
    const permissionError = new FirestorePermissionError({
      path: messagesColRef.path,
      operation: 'create',
      requestResourceData: data,
    });
    errorEmitter.emit('permission-error', permissionError);
  });
}

export function incrementHelpfulCount(
  db: Firestore,
  flightId: string,
  messageId: string
) {
  const messageRef = doc(db, 'rooms', flightId, 'messages', messageId);

  const data = { helpfulCount: increment(1) };

  updateDoc(messageRef, data).catch(async serverError => {
    const permissionError = new FirestorePermissionError({
      path: messageRef.path,
      operation: 'update',
      requestResourceData: data,
    });
    errorEmitter.emit('permission-error', permissionError);
  });
}

export function incrementUnhelpfulCount(
  db: Firestore,
  flightId: string,
  messageId: string
) {
  const messageRef = doc(db, 'rooms', flightId, 'messages', messageId);

  const data = { unhelpfulCount: increment(1) };

  updateDoc(messageRef, data).catch(async serverError => {
    const permissionError = new FirestorePermissionError({
      path: messageRef.path,
      operation: 'update',
      requestResourceData: data,
    });
    errorEmitter.emit('permission-error', permissionError);
  });
}
