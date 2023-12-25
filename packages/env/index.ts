import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {
    POSTGRES_POST: z.string().default('5232'),
    POSTGRES_USER: z.string().min(1),
    POSTGRES_HOST: z.string().min(1),
    POSTGRES_PASSWORD: z.string().min(1),
    POSTGRES_DB: z.string().min(1),
    DATABASE_TYPE: z.string().min(1),
    TOKEN_SECRET: z.string().min(1),
    API_URL: z.string().optional(),
    ADMIN_EMAIL: z.string().email(),
    ADMIN_PASSWORD: z.string().min(1),
    APP_API_PORT: z.string().min(1),
    PORT: z.string().optional(),
    APP_SERVICE_PORT: z.string().min(1),
    APP_WEB_URL: z.string().min(1),
    STORAGE_KEY: z.string().default('@lumi/storage'),
    NODE_ENV: z.string().default('development'),
    FIREBASE_STORAGE_BUCKET: z.string().min(1),
    NEXT_PUBLIC_APP_API_URL: z.string().url().min(1),
    NEXT_PUBLIC_APP_SERVICE_URL: z.string().url().min(1),
  },
  isServer: true,
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
