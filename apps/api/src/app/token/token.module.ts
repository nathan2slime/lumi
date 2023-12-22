import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from '@lumi/database';
import { JwtService } from '@nestjs/jwt';

import { TokenService } from './token.service';

@Module({
  imports: [TypeOrmModule.forFeature([TokenEntity])],
  providers: [TokenService, JwtService],
  exports: [TokenService],
})
export class TokenModule {}
