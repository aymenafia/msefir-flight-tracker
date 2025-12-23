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
};

export function postMessage(
  db: Firestore,
  flightNumber: string,
  payload: NewMessagePayload
) {
  const messagesColRef = collection(db, 'rooms', flightNumber, 'messages');

  const data = {
    ...payload,
    flightNumber,
    createdAt: serverTimestamp(),
    helpfulCount: 0,
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
  flightNumber: string,
  messageId: string
) {
  const messageRef = doc(db, 'rooms', flightNumber, 'messages', messageId);

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
