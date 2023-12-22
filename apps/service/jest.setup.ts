jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn().mockImplementation(() => ({})),
  credential: { cert: jest.fn().mockImplementation(() => ({})) },
}));
jest.mock('pdf2json');
jest.mock('@lumi/env', () => ({ env: process.env }));
