import { env } from '@lumi/env';
import * as admin from 'firebase-admin';

export const firebase = admin.initializeApp({
  credential: admin.credential.cert(require('@lumi/firebase/firebase.json')),
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
});
