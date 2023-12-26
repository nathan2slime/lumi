import { Column, Entity, ManyToOne, Relation } from 'typeorm';

import { BillItemTypeEnum } from '../enums/bill_type';
import { BaseModelEntity } from './base.model';
import { BillEntity } from './bill.model';

@Entity({
  name: 'bill_items',
  synchronize: true,
})
export class BillItemEntity extends BaseModelEntity {
  @Column('float')
  amount: number;

  @Column('float')
  unit_price: number;

  @Column('float')
  price: number;

  @Column('enum', {
    enum: BillItemTypeEnum,
  })
  type: BillItemTypeEnum;

  @ManyToOne(() => BillEntity, bill => bill.items)
  bill: Relation<BillEntity>;
}
