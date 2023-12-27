import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity, UserEntity } from '@lumi/database';

import { ClientService } from './client.service';
import { ClientResolver } from './client.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, UserEntity])],
  providers: [ClientService, ClientResolver],
  exports: [ClientService],
})
export class ClientModule {}
