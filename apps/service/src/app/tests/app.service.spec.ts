import { TestBed } from '@automock/jest';

import { AppService } from '../app.service';
import { DownloadService } from '../download/download.service';
import { ExtractService } from '../extract/extract.service';
import { ExtractedData } from '../extract/extract.types';

describe('AppService', () => {
  let appService: AppService;
  let downloadService: DownloadService;
  let extractService: ExtractService;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AppService).compile();

    appService = unit;

    downloadService = unitRef.get<DownloadService>(DownloadService);
    extractService = unitRef.get<ExtractService>(ExtractService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(downloadService).toBeDefined();
    expect(appService).toBeDefined();
    expect(extractService).toBeDefined();
  });

  describe('parser', () => {
    it('should return extracted data', async () => {
      const fileName = expect.any(String);

      const file = {
        path: expect.any(String),
        id: expect.any(String),
      };

      const extractedData: ExtractedData = {
        [expect.any(String)]: {
          [expect.any(String)]: expect.any(String),
        },
      };

      jest.spyOn(downloadService, 'download').mockResolvedValue(file);
      jest.spyOn(extractService, 'extract').mockResolvedValue(extractedData);

      const res = await appService.parser(fileName);

      expect(downloadService.download).toHaveBeenCalledWith(fileName);
      expect(extractService.extract).toHaveBeenCalledWith(file.path);
      expect(res).toBe(extractedData);
    });
  });
});
