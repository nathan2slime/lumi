import { Entity, Column } from 'typeorm';

import { BaseModelEntity } from './base.model';
import { PermissionEnum } from '../enums';

@Entity({
  name: 'permissions',
  synchronize: true,
})
export class PermissionEntity extends BaseModelEntity {
  @Column('enum', {
    enum: PermissionEnum,
    unique: true,
  })
  name: PermissionEnum;
}
