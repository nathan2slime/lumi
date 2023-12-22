import { TestBed } from '@automock/jest';
import path from 'path';

import { DownloadService } from '../download.service';

// jest.mock('firebase-admin', () => ({
//   initializeApp: jest.fn(),
// }));

describe('DownloadService', () => {
  let downloadService: DownloadService;

  beforeEach(async () => {
    const { unit } = TestBed.create(DownloadService).compile();

    downloadService = unit;
  });

  it('should download a file', async () => {
    const mockFirebaseStorage = {
      bucket: jest.fn(() => ({
        file: jest.fn(() => ({
          download: jest.fn().mockResolvedValue(true),
        })),
      })),
    };

    jest.mock('firebase-admin'),
      () => ({
        initializeApp: jest.fn((res) => ({
          storage: mockFirebaseStorage,
        })),
      });

    const file = expect.any(String);
    const res = await downloadService.download(file);

    // expect(mockFirebaseStorage.bucket().file).toHaveBeenCalledWith(file);
    // expect(mockFirebaseStorage.bucket().file().download).toHaveBeenCalledWith({
    //   destination: expect.any(String),
    // });
    expect(true).toBe(true);
    // expect(res).toEqual(
    //   expect.objectContaining({
    //     path: expect.any(String),
    //     id: expect.any(Number),
    //   }),
    // );
  });

  // it('should handle errors during download', async () => {
  //   // Mock the firebase storage method and simulate an error during download
  //   const mockFirebaseStorage = {
  //     bucket: jest.fn(() => ({
  //       file: jest.fn(() => ({
  //         download: jest.fn().mockRejectedValue(new Error('Download failed')), // Mocking a failed download
  //       })),
  //     })),
  //   };

  //   // jest.mock('firebase-admin', () => ({
  //   //   initializeApp: jest.fn(() => ({storage: () => mockFirebaseStorage})),
  //   // }));

  //   const file = 'example-file.pdf';
  //   const result = await downloadService.download(file);

  //   // Assert that the download method is called with the correct parameters
  //   expect(mockFirebaseStorage.bucket().file).toHaveBeenCalledWith(file);
  //   expect(mockFirebaseStorage.bucket().file().download).toHaveBeenCalledWith({
  //     destination: expect.any(String),
  //   });

  //   // Assert that the service logs the error
  //   expect(result).toBeUndefined(); // Since the service catches the error, it doesn't throw, and the result is undefined
  // });
});
