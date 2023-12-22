jest.mock('firebase-admin');
jest.mock('pdf2json');
jest.mock('@lumi/firebase/firebase.json');
jest.mock('@lumi/env', () => ({ env: process.env }));
