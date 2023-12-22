import { TestBed } from '@automock/jest';

import { DownloadService } from '../download.service';

jest.mock('firebase-admin');

describe('DownloadService', () => {
  let downloadService: DownloadService;

  beforeEach(async () => {
    const { unit } = TestBed.create(DownloadService).compile();

    downloadService = unit;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('download', () => {
    it('should download a file', async () => {
      const mockFirebaseStorage = {
        bucket: jest.fn(() => ({
          file: jest.fn(() => ({
            download: jest.fn().mockResolvedValue(true),
          })),
        })),
      };

      require('../../firebase').firebase = {
        storage: jest.fn().mockReturnValue(mockFirebaseStorage),
      };

      const file = expect.any(String);
      const res = await downloadService.download(file);

      expect(res).toEqual(
        expect.objectContaining({
          path: expect.any(String),
          id: expect.any(Number),
        }),
      );
    });

    it('should handle errors during download', async () => {
      const mockFirebaseStorage = {
        bucket: jest.fn(() => ({
          file: jest.fn(() => ({
            download: jest
              .fn()
              .mockRejectedValue(new Error(expect.any(String))),
          })),
        })),
      };

      require('../../firebase').firebase = {
        storage: jest.fn().mockReturnValue(mockFirebaseStorage),
      };

      const file = expect.any(String);

      try {
        await downloadService.download(file);
      } catch (error) {
        const res = error as Error;

        expect(res.message).toBe('file not found');
      }
    });
  });
});
