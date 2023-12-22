import { Test, TestingModule } from '@nestjs/testing';

import { DownloadModule } from '../download.module';

describe('DownloadModule', () => {
  let downloadModule: DownloadModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DownloadModule],
    }).compile();

    downloadModule = module.get<DownloadModule>(DownloadModule);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should have defined', () => {
    expect(downloadModule).toBeDefined();
  });
});
