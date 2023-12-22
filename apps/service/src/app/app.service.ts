import { Injectable } from '@nestjs/common';

import { DownloadService } from './download/download.service';
import { ExtractService } from './extract/extract.service';
import { ExtractData } from './extract/extract.types';

@Injectable()
export class AppService {
  constructor(
    private readonly downloadService: DownloadService,
    private readonly extractService: ExtractService,
  ) {}

  async parser(filename: string): Promise<ExtractData> {
    const file = await this.downloadService.download(filename);

    return await this.extractService.extract(file.path);
  }
}
