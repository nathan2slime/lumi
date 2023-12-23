import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity, UserEntity } from '@lumi/database';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TokenEntity])],
  providers: [AuthResolver, AuthService, TokenService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
