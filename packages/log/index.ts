import { createLogger } from 'bunyan';

export const logger = createLogger({
  name: 'app',
  stream: process.stdout,
});
