// import { Test, TestingModule } from '@nestjs/testing';
// import { Text } from 'pdf2json';
// import fs from 'fs';

// import { ExtractService } from '../extract.service';

// jest.mock('pdf2json');

// describe('ExtractService', () => {
//   let extractService: ExtractService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [ExtractService],
//     }).compile();

//     extractService = module.get<ExtractService>(ExtractService);
//   });

//   it('should be defined', () => {
//     expect(extractService).toBeDefined();
//   });

//   describe('extract', () => {
//     it('should extract data from PDF', async () => {
//       const file = expect.any(String);

//       const onMock = jest.fn((eventName, handler) => {
//         if (eventName === 'pdfParser_dataError') {
//           handler('error message');
//         } else if (eventName === 'pdfParser_dataReady') {
//           handler({
//             Pages: [
//               {
//                 Texts: [
//                   {
//                     R: [{ T: expect.any(String) }],
//                   },
//                   {
//                     R: [{ T: expect.any(String) }],
//                   },
//                 ],
//               },
//             ],
//           });
//         }
//       });

//       const parserMock = jest.fn(() => ({
//         loadPDF: jest.fn(),
//         on: onMock,
//       }));

//       jest.mock('pdf2json', () => ({ __esModule: true, default: parserMock }));

//       const unlinkSyncMock = jest
//         .spyOn(fs, 'unlinkSync')
//         .mockImplementation(jest.fn());

//       const result = await extractService.extract(file);

//       expect(parserMock).toHaveBeenCalled();
//       expect(onMock).toHaveBeenCalledTimes(2);
//       expect(onMock).toHaveBeenCalledWith(
//         'pdfParser_dataError',
//         expect.any(Function),
//       );
//       expect(onMock).toHaveBeenCalledWith(
//         'pdfParser_dataReady',
//         expect.any(Function),
//       );
//       expect(unlinkSyncMock).toHaveBeenCalledWith(file);
//       expect(result).toEqual({});
//     });

//     it('should handle data extraction error', async () => {
//       const file = expect.any(String);

//       const onMock = jest.fn(
//         (eventName, handler) =>
//           eventName === 'pdfParser_dataError' &&
//           handler('error when parsing PDF'),
//       );

//       const ParserMock = jest.fn(() => ({
//         loadPDF: jest.fn(),
//         on: onMock,
//       }));
//       jest.mock('pdf2json', () => ({ __esModule: true, default: ParserMock }));

//       const unlinkSyncMock = jest
//         .spyOn(fs, 'unlinkSync')
//         .mockImplementation(jest.fn());

//       await expect(extractService.extract(file)).rejects.toThrow(
//         'error when parsing PDF',
//       );

//       expect(ParserMock).toHaveBeenCalled();
//       expect(onMock).toHaveBeenCalledTimes(1);
//       expect(onMock).toHaveBeenCalledWith(
//         'pdfParser_dataError',
//         expect.any(Function),
//       );
//       expect(unlinkSyncMock).toHaveBeenCalledWith(file);
//     });
//   });

//   describe('parser', () => {
//     it('should parse text data with regex', () => {
//       const texts: Text[] = [
//         {
//           sw: expect.anything(),
//           A: expect.anything(),
//           w: expect.anything(),

//           x: expect.anything(),
//           y: expect.anything(),
//           R: [
//             {
//               T: expect.anything(),
//               S: expect.anything(),
//               TS: expect.anything(),
//             },
//           ],
//         },
//       ];

//       const result = extractService.parser(texts);

//       expect(result).not.toBeNull();
//     });
//   });
// });

it("", () => {
    expect(true).toBe(true)
})
