import { TestBed } from '@automock/jest';
import fs from 'fs';
import Parser, { Text } from 'pdf2json';

import { ExtractService } from '../extract.service';
import { ExtractedData } from '../extract.types';

describe('ExtractService', () => {
  let extractService: ExtractService;
  let parser: Parser;

  beforeEach(async () => {
    const { unit } = TestBed.create(ExtractService).compile();

    extractService = unit;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('extract', () => {
    beforeEach(() => {
      parser = new Parser();
    });

    it('should extract data from a PDF file', async () => {
      const payload: ExtractedData = {
        [expect.any(String)]: {
          [expect.any(String)]: expect.any(String),
        },
      };
      const texts = { Pages: [{ Texts: [] }] };

      jest
        .spyOn(extractService, 'parser')
        .mockImplementation((_texts: Text[]) => payload);
      jest.spyOn(fs, 'unlinkSync').mockImplementationOnce(() => {});
      jest
        .spyOn(parser, 'on')
        .mockImplementation((event: string, callback: any) => {
          const data = {
            pdfParser_dataReady: () => callback(texts),
            pdfParser_dataError: () => {},
          };

          return data[event]();
        });

      const file = expect.any(String);

      const res = await extractService.extract(file);

      expect(res).toEqual(payload);
      expect(extractService.parser).toHaveBeenCalledWith(texts.Pages[0].Texts);
      expect(fs.unlinkSync).toHaveBeenCalledWith(file);
    });

    it('should deal with errors during PDF data extraction', async () => {
      const payload: ExtractedData = {
        [expect.any(String)]: {
          [expect.any(String)]: expect.any(String),
        },
      };

      jest
        .spyOn(extractService, 'parser')
        .mockImplementation((_texts: Text[]) => payload);
      jest.spyOn(fs, 'unlinkSync').mockImplementationOnce(() => {});
      jest
        .spyOn(parser, 'on')
        .mockImplementation((event: string, callback: any) => {
          const data = {
            pdfParser_dataReady: () => {},
            pdfParser_dataError: () => callback('error when parsing PDF'),
          };

          return data[event]();
        });

      const file = expect.any(String);

      try {
        await extractService.extract(file);
      } catch (error) {
        expect(error).toEqual('error when parsing PDF');
      }

      expect(extractService.parser).not.toHaveBeenCalled();
      expect(fs.unlinkSync).not.toHaveBeenCalled();
    });
  });
});
