import { Column, Entity, ManyToOne, OneToMany, Relation } from 'typeorm';

import { BaseModelEntity } from './base.model';
import { UserEntity } from './user.model';
import { BillEntity } from './bill.model';

@Entity({
  name: 'clients',
  synchronize: true,
})
export class ClientEntity extends BaseModelEntity {
  @Column({ unique: true })
  number: string;

  @Column({ nullable: true })
  installation: number;

  @ManyToOne(() => UserEntity, user => user.clients)
  user: Relation<UserEntity>;

  @OneToMany(() => BillEntity, bill => bill.client)
  bills: Relation<BillEntity[]>;

  @Column({ nullable: true })
  address: string;
}
