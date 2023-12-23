import { createLogger, format, transports } from 'winston';

const { metadata } = format;

export const logger = createLogger({
  defaultMeta: {
    label: 'app',
  },
  transports: [
    new transports.Console({
      format: metadata(),
    }),
  ],
});
