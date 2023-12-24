import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillEntity, BillItemEntity } from '@lumi/database';

import { BillItemService } from './bill_item.service';

@Module({
  imports: [TypeOrmModule.forFeature([BillEntity, BillItemEntity])],
  providers: [BillItemService],
  exports: [BillItemService],
})
export class BillItemModule {}
