import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HealthModule } from './health/health.module';
import { DownloadModule } from './download/download.module';
import { DownloadService } from './download/download.service';
import { ExtractModule } from './extract/extract.module';
import { ExtractService } from './extract/extract.service';

@Module({
  imports: [HealthModule, ExtractModule, DownloadModule],
  controllers: [AppController],
  providers: [AppService, DownloadService, ExtractService],
})
export class AppModule {}
