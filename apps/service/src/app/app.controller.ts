import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { AppService } from './app.service';
import { ParserFile } from './app.dto';
import { ExtractedData } from './extract/extract.types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('parser')
  async parser(@Body() data: ParserFile): Promise<ExtractedData | HttpException> {
    try {
      return await this.appService.parser(data.file_name);
    } catch (error) {
      return new HttpException((error as Error).message, HttpStatus.NOT_FOUND);
    }
  }
}
