import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity, UserEntity } from '@lumi/database';

import { ClientService } from './client.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, UserEntity])],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
