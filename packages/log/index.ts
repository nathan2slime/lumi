import { createLogger, format, transports } from 'winston';

const { combine, timestamp, simple } = format;

export const logger = createLogger({
  defaultMeta: {
    label: 'app',
  },
  transports: [
    new transports.Console({
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        simple(),
      ),
    }),
  ],
});
