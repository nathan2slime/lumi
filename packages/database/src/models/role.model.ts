import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  Relation,
} from 'typeorm';

import { BaseModelEntity } from './base.model';
import { PermissionEntity } from './permission.model';
import { UserEntity } from './user.model';

@Entity({
  name: 'roles',
  synchronize: true,
})
export class RoleEntity extends BaseModelEntity {
  @Column()
  name: string;

  @ManyToOne(() => UserEntity, user => user.roles)
  user: Relation<UserEntity>;

  @ManyToMany(() => PermissionEntity)
  @JoinTable()
  permissions: Relation<PermissionEntity[]>;
}
