import { env } from '@lumi/env';
import { initializeApp } from 'firebase-admin';

export const firebase =  initializeApp({
  credential: require('@lumi/firebase/firebase.json'),
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
});
