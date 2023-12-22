import { NestFactory } from '@nestjs/core';
import { logger } from '@lumi/log';
import { env } from '@lumi/env';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

const port = env.APP_SERVICE_PORT || 9393;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'fatal'],
  });

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('PDF Data Extractor')
    .setDescription(
      'This service extracts data from PDFs saved in Firebase Storage',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);
};

bootstrap().then(() =>
  logger.info(
    `service successfully started: http://localhost:${port}/api/health`,
  ),
);
