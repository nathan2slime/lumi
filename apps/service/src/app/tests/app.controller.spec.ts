import { TestBed } from '@automock/jest';

import { AppController } from '../app.controller';

import { AppService } from '../app.service';
import { ExtractedData } from '../extract/extract.types';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  const mockPayload: ExtractedData = {
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

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(AppController).compile();

    appController = unit;
    appService = unitRef.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should have defined', () => {
    expect(appService).toBeDefined();
    expect(appController).toBeDefined();
  });

  describe('parser', () => {
    it('must return values extracted from the PDF', async () => {
      jest.spyOn(appService, 'parser').mockResolvedValue(mockPayload);

      const data = await appController.parser({ file_name: expect.anything() });

      expect(data).toBe(mockPayload);
      expect(appService.parser).toHaveBeenCalled();
    });

    it('should return error if file is not found', async () => {
      jest
        .spyOn(appService, 'parser')
        .mockRejectedValue(new Error('file not found'));

      const data = await appController.parser({ file_name: expect.anything() });

      expect(data.message).toBe('file not found');
      expect(appService.parser).toHaveBeenCalled();
    });
  });
});
