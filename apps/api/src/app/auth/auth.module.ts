import { Module } from '@nestjs/common';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
