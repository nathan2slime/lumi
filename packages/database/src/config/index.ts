import { DataSourceOptions } from 'typeorm';
import { env } from '@lumi/env';

import { entities } from '../models';

const isDev = env.NODE_ENV == 'development';

export const config: DataSourceOptions = {
  type: env.DATABASE_TYPE as 'postgres',
  port: parseInt(env.DATABASE_PORT),
  host: env.DATABASE_HOST,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities,
  ssl: isDev
    ? false
    : {
        rejectUnauthorized: true,
      },
  synchronize: isDev,
};
