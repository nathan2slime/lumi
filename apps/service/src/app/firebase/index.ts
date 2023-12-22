import { env } from '@lumi/env';
import * as admin from 'firebase-admin';

const config = {
  production: '@lumi/firebase/firebase.prod.json',
  test: '@lumi/firebase/firebase.example.json',
  dev: '@lumi/firebase/firebase.dev.json',
};

export const firebase = admin.initializeApp({
  credential: admin.credential.cert(require(config[env.NODE_ENV])),
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
});
