import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

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
  user: UserEntity;

  @ManyToMany(() => PermissionEntity)
  @JoinTable()
  permissions: PermissionEntity[];
}
