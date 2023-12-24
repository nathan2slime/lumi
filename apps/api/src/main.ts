import { NestFactory } from '@nestjs/core';
import { env } from '@lumi/env';
import { logger } from '@lumi/log';

import 'reflect-metadata';

import { AppModule } from './app/app.module';

const port = env.PORT || env.APP_API_PORT || 9292;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'fatal'],
  });
  const globalPrefix = 'graphql';

  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: env.NODE_ENV == 'production' ? env.APP_WEB_URL : true,
  });

  await app.listen(port);
};

bootstrap().then(() =>
  logger.info(`app successfully started: http://localhost:${port}/graphql`),
);
