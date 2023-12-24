import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { PermissionEntity, RoleEntity, UserEntity } from '@lumi/database';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedService } from './seed.service';
import { SeedCommand } from './seed.command';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, PermissionEntity]),
    CommandModule,
  ],
  controllers: [],
  providers: [SeedService, SeedCommand],
})
export class SeedModule {}
