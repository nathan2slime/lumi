import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ParserFile {
  @ApiProperty()
  @IsNotEmpty()
  filename: string;
}
