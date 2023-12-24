import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ClientEntity,
  TokenEntity,
  BillEntity,
  BillItemEntity,
  UserEntity,
} from '@lumi/database';

import { BillResolver } from './bill.resolver';
import { BillService } from './bill.service';
import { ClientService } from '../client/client.service';
import { AuthService } from '../auth/auth.service';
import { BillItemService } from '../bill_item/bill_item.service';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientEntity,
      TokenEntity,
      BillEntity,
      BillItemEntity,
      UserEntity,
    ]),
  ],
  providers: [
    BillResolver,
    TokenService,
    BillService,
    AuthService,
    BillItemService,
    ClientService,
    UserService,
  ],
  exports: [],
})
export class BillModule {}
