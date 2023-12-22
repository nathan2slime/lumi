import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from '../app.controller';

import { AppService } from '../app.service';
import { DownloadService } from '../download/download.service';
import { ExtractService } from '../extract/extract.service';
import { ExtractData } from '../extract/extract.types';

jest.mock('firebase-admin');

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  const mockPayload: ExtractData = {
    energy_without_icms_value: {
      amount: '1.007',
      unit_price: '0.86613683',
      price: '652.55',
    },
    compensed_energy: {
      amount: '1.007',
      unit_price: '0.86613683',
      price: '-620.00',
    },
    energy: {
      amount: '50',
      unit_price: '0.86613683',
      price: '43.28',
    },
    data: {
      total_price: null,
      client: null,
      expiresIn: null,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        DownloadService,
        ExtractService,
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('parser', () => {
    it('must return values extracted from the PDF', async () => {
      jest.spyOn(appService, 'parser').mockResolvedValue(mockPayload);

      const data = await appController.parser({ filename: expect.anything() });

      expect(data).toBe(mockPayload);
      expect(appService.parser).toHaveBeenCalled();
    });

    it('should return error if file is not found', async () => {
      jest
        .spyOn(appService, 'parser')
        .mockRejectedValue(new Error('file not found'));

      const data = await appController.parser({ filename: expect.anything() });

      expect(data.message).toBe('file not found');
      expect(appService.parser).toHaveBeenCalled();
    });
  });
});
