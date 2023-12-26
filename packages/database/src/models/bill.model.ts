import { Column, Entity, ManyToOne, OneToMany, Relation } from 'typeorm';

import { BaseModelEntity } from './base.model';
import { ClientEntity } from './client.model';
import { BillItemEntity } from './bill_item.model';

@Entity({
  name: 'bills',
  synchronize: true,
})
export class BillEntity extends BaseModelEntity {
  @Column('float')
  total_price: number;

  @ManyToOne(() => ClientEntity, client => client.bills)
  client: Relation<ClientEntity>;

  @OneToMany(() => BillItemEntity, bill_item => bill_item.bill)
  items: Relation<BillItemEntity[]>;

  @Column()
  due_date: Date;

  @Column()
  date: Date;

  @Column('float', { nullable: true })
  public_lighting_contribution: number;

  @Column()
  file: string;
}
