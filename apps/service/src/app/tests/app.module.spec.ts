import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { DownloadService } from '../download/download.service';
import { ExtractService } from '../extract/extract.service';

jest.mock('firebase-admin');

describe('AppModule', () => {
  let module: TestingModule;
  let appController: AppController;
  let appService: AppService;
  let downloadService: DownloadService;
  let extractService: ExtractService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        DownloadService,
        ExtractService,
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
    downloadService = module.get<DownloadService>(DownloadService);
    extractService = module.get<ExtractService>(ExtractService);
  });

  it('should have defined the app controller', () => {
    expect(appController).toBeDefined();
  });

  it('should have defined the download service', () => {
    expect(downloadService).toBeDefined();
  });

  it('should have defined the app service', () => {
    expect(appService).toBeDefined();
  });

  it('should have defined the extract service', () => {
    expect(extractService).toBeDefined();
  });
});
