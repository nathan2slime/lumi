import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';

import { BaseModelEntity } from './base.model';
import { UserEntity } from './user.model';


@Entity({
  name: 'clients',
  synchronize: true,
})
export class ClientEntity extends BaseModelEntity {
  @Column({ unique: true })
  number: number;

  @Column({ unique: true })
  installation: number;

  @ManyToOne(() => UserEntity, user => user.clients)
  user: UserEntity;

  @Column({ nullable: true })
  address: string;
}
