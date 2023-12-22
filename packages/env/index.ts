import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_PORT: z.string().default('5232'),
    DATABASE_USER: z.string().min(1),
    DATABASE_HOST: z.string().min(1),
    DATABASE_NAME: z.string().min(1),
    DATABASE_PASSWORD: z.string().min(1),
    DATABASE_TYPE: z.string().min(1),
    TOKEN_HASH: z.string().min(1),
    API_URL: z.string().optional(),
    ADMIN_EMAIL: z.string().email(),
    ADMIN_PASSWORD: z.string().min(1),
    APP_API_PORT: z.string().min(1),
    APP_API_URL: z.string().url().min(1),
    APP_SERVICE_URL: z.string().url().min(1),
    APP_SERVICE_PORT: z.string().min(1),
    STORAGE_KEY: z.string().default('@lumi/storage'),
    NODE_ENV: z.string().default('development'),
    FIREBASE_STORAGE_BUCKET: z.string().min(1),
  },
  runtimeEnv: process.env,
  isServer: true,
  emptyStringAsUndefined: true,
});
