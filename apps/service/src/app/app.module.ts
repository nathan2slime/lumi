import { Module } from '@nestjs/common';
import { FirebaseModule } from 'nestjs-firebase';
import { env } from '@lumi/env';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HealthModule } from './health/health.module';
import { DownloadModule } from './download/download.module';
import { DownloadService } from './download/download.service';
import { ExtractModule } from './extract/extract.module';
import { ExtractService } from './extract/extract.service';

@Module({
  imports: [
    FirebaseModule.forRoot({
      googleApplicationCredential: require('@lumi/firebase/firebase.json'),
      storageBucket: env.FIREBASE_STORAGE_BUCKET
    }),
    HealthModule,
    ExtractModule,
    DownloadModule
  ],
  controllers: [AppController],
  providers: [AppService, DownloadService, ExtractService],
})
export class AppModule {}
