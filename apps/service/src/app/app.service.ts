import { Injectable } from '@nestjs/common';

import { DownloadService } from './download/download.service';
import { ExtractService } from './extract/extract.service';

@Injectable()
export class AppService {
  constructor(
    private readonly downloadService: DownloadService,
    private readonly extractService: ExtractService,
  ) {}

  async parser() {
    const file = await this.downloadService.download('3001165684-11-2023.pdf');

    return await this.extractService.extract(file.path);
  }
}
