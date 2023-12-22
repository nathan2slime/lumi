import { logger } from '@lumi/log';
import { Injectable } from '@nestjs/common';
import Parser, { Text } from 'pdf2json';
import fs from 'fs';

import { ExtractedData } from './extract.types';
import { fieldParserByRegex, fields } from './utils';

@Injectable()
export class ExtractService {
  constructor() {}

  async extract(file: string): Promise<ExtractedData> {
    const pdfParser = new Parser();
    await pdfParser.loadPDF(file);

    const res = await (async () =>
      new Promise<ExtractedData>((res, rej) => {
        pdfParser.on('pdfParser_dataError', err => {
          logger.error('error when parsing PDF');

          rej(err);
        });

        pdfParser.on('pdfParser_dataReady', async data => {
          const texts = data.Pages[0].Texts;
          
          res(this.parser(texts));
        });
      }))();

    fs.unlinkSync(file);

    logger.info('data was extracted from PDF');

    return res;
  }

  parser(texts: Text[]): ExtractedData {
    try {
      const extract: ExtractedData = {};

      logger.info('extracting data from PDF');

      fields.forEach(field => {
        extract[field.name] = {};

        Object.entries(field.data).forEach(([key, value]) => {
          const uri = texts[value.index].R[0].T;

          const text = value.regex
            ? fieldParserByRegex(uri, value.regex)
            : decodeURIComponent(uri).trim();

          extract[field.name][key] = text && text.replace(',', '.');
        });
      });

      return extract;
    } catch (error) {
      logger.error((error as Error).message);
      new Error('unable to extract data');
    }
  }
}
