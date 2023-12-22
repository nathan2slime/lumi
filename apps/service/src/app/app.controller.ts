import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { AppService } from './app.service';
import { ParserFile } from './app.types';
import { ExtractData } from './extract/extract.types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('parser')
  async parser(@Body() data: ParserFile): Promise<ExtractData | HttpException> {
    try {
      return await this.appService.parser(data.filename);
    } catch (error) {
      return new HttpException((error as Error).message, HttpStatus.NOT_FOUND);
    }
  }
}
